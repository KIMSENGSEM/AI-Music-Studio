'use client';

import React from 'react';
import { StyleSectionConfig, StyleSection } from '@/types/music';
import { SlidersHorizontal, CheckCircle2, Circle } from 'lucide-react';

interface StyleSectionBuilderProps {
  sections: StyleSectionConfig[];
  onToggleSection: (sectionName: StyleSection) => void;
  onUpdateSectionBars: (sectionName: StyleSection, barsLength: number) => void;
}

export const StyleSectionBuilder: React.FC<StyleSectionBuilderProps> = ({
  sections,
  onToggleSection,
  onUpdateSectionBars,
}) => {
  const mainSections = sections.filter((s) => s.section.startsWith('Main'));
  const introSections = sections.filter((s) => s.section.startsWith('Intro'));
  const fillSections = sections.filter((s) => s.section.startsWith('Fill') || s.section === 'Break');
  const endingSections = sections.filter((s) => s.section.startsWith('Ending'));

  const renderSectionGroup = (title: string, groupSections: StyleSectionConfig[]) => (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {groupSections.map((sec) => (
          <div
            key={sec.section}
            onClick={() => onToggleSection(sec.section)}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              sec.isActive
                ? 'bg-[#151a2a] border-purple-500/40 shadow-sm shadow-purple-950'
                : 'bg-[#0a0d16] border-[#181e2e] opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-100">{sec.section}</span>
              {sec.isActive ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600" />
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Length:</span>
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  value={sec.barsLength}
                  onChange={(e) => onUpdateSectionBars(sec.section, Number(e.target.value))}
                  className="bg-[#101422] border border-[#20283e] text-purple-300 font-mono rounded px-1.5 py-0.5 outline-none"
                >
                  <option value={1}>1 Bar</option>
                  <option value={2}>2 Bars</option>
                  <option value={4}>4 Bars</option>
                  <option value={8}>8 Bars</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
            Yamaha Arranger Style Section Builder
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Assemble style sections compliant with Yamaha PSR-S970 accompaniment engine.
          </p>
        </div>
        <span className="text-xs text-slate-400 bg-[#121624] px-2.5 py-1 rounded-lg border border-[#20293f]">
          Target: SFF Guitar Edition
        </span>
      </div>

      {renderSectionGroup('Main Variations', mainSections)}
      {renderSectionGroup('Intro Variations', introSections)}
      {renderSectionGroup('Fill-Ins & Breaks', fillSections)}
      {renderSectionGroup('Ending Variations', endingSections)}
    </div>
  );
};
