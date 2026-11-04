'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  AudioWaveform,
  Layers,
  Music2,
  FileCode2,
  Sliders,
  FolderArchive,
  Settings,
  Disc3,
  Menu,
  X,
} from 'lucide-react';

export type NavItem =
  | 'dashboard'
  | 'audio-to-midi'
  | 'separation'
  | 'midi-editor'
  | 'midi-to-sty'
  | 'style-creator'
  | 'style-library'
  | 'settings';

interface SidebarProps {
  activeTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'audio-to-midi' as NavItem, label: 'Audio to MIDI', icon: AudioWaveform, badge: 'AI' },
    { id: 'separation' as NavItem, label: 'Separation', icon: Layers },
    { id: 'midi-editor' as NavItem, label: 'MIDI Editor', icon: Music2 },
    { id: 'midi-to-sty' as NavItem, label: 'MIDI to STY', icon: FileCode2, badge: 'Yamaha' },
    { id: 'style-creator' as NavItem, label: 'Style Creator', icon: Sliders },
    { id: 'style-library' as NavItem, label: 'Library', icon: FolderArchive },
    { id: 'settings' as NavItem, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top App Bar with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0c13] border-b border-[#191f30] px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow">
            <Disc3 className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <span className="font-bold text-xs tracking-wide text-white">AI MUSIC STUDIO</span>
          <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold border border-blue-500/30">
            S970
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-300 hover:text-white rounded-lg bg-[#141926] border border-[#232b3f]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 pt-14"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-[#0a0c13] border-r border-[#191f30] p-4 space-y-1 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#121624]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0a0c13] border-r border-[#191f30] flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
        <div>
          {/* Studio Brand */}
          <div className="h-16 flex items-center px-6 gap-3 border-b border-[#191f30] bg-[#07090e]">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <Disc3 className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                AI MUSIC STUDIO
              </h1>
              <p className="text-[10px] text-purple-400 font-medium tracking-wider uppercase">
                Yamaha PSR-S970 Engine
              </p>
            </div>
          </div>

          {/* Navigation list */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#121624]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        item.badge === 'Yamaha'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Target Arranger Hardware Info */}
        <div className="p-4 m-3 rounded-xl bg-[#0e121d] border border-[#1d2538] text-xs">
          <div className="flex items-center justify-between text-slate-300 mb-1.5">
            <span className="font-semibold text-[11px] text-slate-400">HARDWARE TARGET</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="font-bold text-slate-200 text-xs">Yamaha PSR-S970</p>
          <p className="text-[10px] text-slate-400 mt-0.5">SFF GE • 16 Accompaniment Ch</p>
        </div>
      </aside>
    </>
  );
};
