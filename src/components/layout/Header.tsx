'use client';

import React from 'react';
import { Play, Pause, Save, Download, Sparkles } from 'lucide-react';
import { ProjectState } from '@/types/music';

interface HeaderProps {
  project: ProjectState;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSaveProject: () => void;
  onExportClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  project,
  isPlaying,
  onTogglePlay,
  onSaveProject,
  onExportClick,
}) => {
  return (
    <header className="min-h-16 bg-[#0a0c13] border-b border-[#191f30] px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
      {/* Title & Metadata */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xs md:text-sm font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </h2>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {project.audio ? `${project.audio.bpm} BPM` : '120 BPM'}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 hidden sm:inline-block">
              {project.audio ? project.audio.keySignature : 'C Minor'}
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] text-slate-400 mt-0.5">
            {project.tracks.length} Tracks • {project.sections.filter((s) => s.isActive).length} Sections
          </p>
        </div>
      </div>

      {/* Center Transport Controls */}
      <div className="flex items-center gap-2 bg-[#0d101a] border border-[#1d2538] px-2.5 py-1 rounded-xl">
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono px-1">
          <span>BAR</span>
          <span className="text-purple-400 font-bold">01.1</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSaveProject}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#131826] hover:bg-[#1a2133] text-slate-300 border border-[#222a3e] transition-colors"
        >
          <Save className="w-3.5 h-3.5 text-slate-400" />
          <span>Save</span>
        </button>

        <button
          onClick={onExportClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export .STY</span>
        </button>
      </div>
    </header>
  );
};
