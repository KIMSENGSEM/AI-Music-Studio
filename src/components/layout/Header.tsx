'use client';

import React from 'react';
import { Play, Pause, Save, Download, Keyboard, Music } from 'lucide-react';
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
    <header className="h-16 bg-[#0a0c13] border-b border-[#191f30] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white tracking-wide">
              {project.title}
            </h2>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {project.audio ? `${project.audio.bpm} BPM` : '120 BPM'}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {project.audio ? project.audio.keySignature : 'C Major'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {project.tracks.length} Tracks • {project.sections.filter((s) => s.isActive).length} Active Sections
          </p>
        </div>
      </div>

      {/* Center Transport Controls */}
      <div className="flex items-center gap-2 bg-[#0d101a] border border-[#1d2538] px-3 py-1.5 rounded-xl">
        <button
          onClick={onTogglePlay}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play Studio'}</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <div className="flex items-center gap-1 text-xs text-slate-300 font-mono px-2">
          <span>BAR</span>
          <span className="text-purple-400 font-bold">01.1</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSaveProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#131826] hover:bg-[#1a2133] text-slate-300 border border-[#222a3e] transition-colors"
        >
          <Save className="w-3.5 h-3.5 text-slate-400" />
          <span>Save</span>
        </button>

        <button
          onClick={onExportClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export STY / MIDI</span>
        </button>
      </div>
    </header>
  );
};
