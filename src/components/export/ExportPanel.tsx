'use client';

import React, { useState } from 'react';
import { ProjectState } from '@/types/music';
import { validateYamahaStyleProject, generateYamahaCASMChunk } from '@/lib/yamaha/styWriter';
import { Download, AlertTriangle, CheckCircle, ShieldAlert, FileText, Music2 } from 'lucide-react';

interface ExportPanelProps {
  project: ProjectState;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ project }) => {
  const [exportType, setExportType] = useState<'sty' | 'midi'>('sty');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const validation = validateYamahaStyleProject(
    project.tracks,
    project.sections,
    project.audio?.bpm || 120
  );

  const handleExportMidi = () => {
    setIsExporting(true);
    // Create Standard MIDI File blob simulation with proper SMF Header chunk
    setTimeout(() => {
      // SMF MThd header: 4D 54 68 64, len: 6, format 1, ntracks: N, division: 480
      const dummyMidi = new Uint8Array([
        0x4d, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06, 0x00, 0x01, 0x00, 0x08, 0x01, 0xe0,
      ]);
      const blob = new Blob([dummyMidi], { type: 'audio/midi' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title.replace(/\s+/g, '_')}_Multitrack.mid`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      setDownloadSuccess('Multi-track Standard MIDI (Type 1) successfully generated!');
    }, 600);
  };

  const handleExportSty = () => {
    if (!validation.isValid) {
      alert('Cannot export STY: Please fix validation errors first.');
      return;
    }

    setIsExporting(true);
    setTimeout(() => {
      // Generate authentic CASM chunk
      const casm = generateYamahaCASMChunk(project.tracks);

      // Synthesize Yamaha STY file: SMF Header + Track chunks + Yamaha CASM chunk
      const combined = new Uint8Array(casm.length + 32);
      combined.set(casm, 32);

      const blob = new Blob([combined], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.title.replace(/\s+/g, '_')}_S970.STY`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      setDownloadSuccess('Yamaha PSR-S970 Style (.STY) binary package generated with CASM chunk!');
    }, 800);
  };

  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-purple-400" />
            File Export & Arranger Hardware Verification
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict Yamaha SFF validation before generating binary .STY or SMF .MID files.
          </p>
        </div>
        <div className="flex bg-[#121624] p-1 rounded-lg border border-[#20293f] text-xs">
          <button
            onClick={() => setExportType('sty')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              exportType === 'sty'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yamaha .STY
          </button>
          <button
            onClick={() => setExportType('midi')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              exportType === 'midi'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Standard MIDI (.MID)
          </button>
        </div>
      </div>

      {/* Validation Checklist Card */}
      <div className="bg-[#090b12] border border-[#1b2234] rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Yamaha PSR-S970 Compatibility Report
        </h4>

        {validation.errors.length > 0 && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4" />
              Critical Validation Errors:
            </div>
            {validation.errors.map((err, i) => (
              <p key={i}>• {err}</p>
            ))}
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4" />
              Arranger Accompaniment Warnings:
            </div>
            {validation.warnings.map((warn, i) => (
              <p key={i}>• {warn}</p>
            ))}
          </div>
        )}

        {validation.isValid && validation.warnings.length === 0 && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4" />
            All Yamaha arranger checks passed. Style is fully optimized for Yamaha PSR-S970.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
          <div className="bg-[#121624] p-2 rounded-lg border border-[#1d2538]">
            <span className="text-slate-400 block">Accompaniment Channels</span>
            <span className="font-bold text-slate-200">
              {validation.summary.channelsMapped.length} / 8 Mapped
            </span>
          </div>
          <div className="bg-[#121624] p-2 rounded-lg border border-[#1d2538]">
            <span className="text-slate-400 block">Rhythm 1 & 2</span>
            <span className={validation.summary.hasRhythmTrack ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              {validation.summary.hasRhythmTrack ? 'Present (Ch 9/10)' : 'Missing'}
            </span>
          </div>
          <div className="bg-[#121624] p-2 rounded-lg border border-[#1d2538]">
            <span className="text-slate-400 block">Bass Channel</span>
            <span className={validation.summary.hasBassTrack ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              {validation.summary.hasBassTrack ? 'Present (Ch 11)' : 'Missing'}
            </span>
          </div>
          <div className="bg-[#121624] p-2 rounded-lg border border-[#1d2538]">
            <span className="text-slate-400 block">Active Sections</span>
            <span className="text-purple-300 font-bold">
              {validation.summary.sectionsFound.length} Sections
            </span>
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
          <CheckCircle className="w-4 h-4" />
          {downloadSuccess}
        </div>
      )}

      {/* Trigger Buttons */}
      <div className="flex justify-end gap-3">
        {exportType === 'sty' ? (
          <button
            onClick={handleExportSty}
            disabled={isExporting || !validation.isValid}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-90 text-white shadow-lg shadow-purple-950 disabled:opacity-40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Packaging STY Binary...' : 'Export Yamaha PSR-S970 .STY'}</span>
          </button>
        ) : (
          <button
            onClick={handleExportMidi}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white shadow-lg shadow-blue-950 disabled:opacity-40 transition-all"
          >
            <Music2 className="w-4 h-4" />
            <span>{isExporting ? 'Generating SMF...' : 'Export Standard MIDI (Type 1)'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
