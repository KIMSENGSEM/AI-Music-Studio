'use client';

import React from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Radio } from 'lucide-react';
import { TrackData, YamahaStylePart } from '@/types/music';
import { YAMAHA_DEFAULT_STYLE_MAPPINGS } from '@/lib/yamaha/constants';

interface InstrumentTrackListProps {
  tracks: TrackData[];
  selectedTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
  onUpdateTrack: (trackId: string, updates: Partial<TrackData>) => void;
}

const STYLE_PARTS: YamahaStylePart[] = [
  'Rhythm 1',
  'Rhythm 2',
  'Bass',
  'Chord 1',
  'Chord 2',
  'Pad',
  'Phrase 1',
  'Phrase 2',
];

export const InstrumentTrackList: React.FC<InstrumentTrackListProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  onUpdateTrack,
}) => {
  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white">Instrument Separation & Yamaha Mapping</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual AI extracted tracks assigned to Yamaha PSR-S970 style channels.
          </p>
        </div>
        <span className="text-xs bg-[#151a28] text-purple-300 border border-[#252f48] px-2.5 py-1 rounded-lg">
          {tracks.length} MIDI Tracks
        </span>
      </div>

      <div className="space-y-2">
        {tracks.map((track) => {
          const isSelected = selectedTrackId === track.id;
          const stylePartInfo = YAMAHA_DEFAULT_STYLE_MAPPINGS[track.stylePart];

          return (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#151a2a] border-purple-500/50 shadow-md shadow-purple-950/20'
                  : 'bg-[#0a0d16] border-[#1a2032] hover:border-[#28324f]'
              }`}
            >
              {/* Track identity */}
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      Track {track.trackNumber}: {track.name}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-[#121624] px-1.5 py-0.2 rounded border border-slate-700">
                      {track.notes.length} notes
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Category: <span className="text-slate-300 capitalize">{track.category}</span>
                  </span>
                </div>
              </div>

              {/* Yamaha Style Assignment Selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Yamaha Part:</span>
                  <select
                    value={track.stylePart}
                    onChange={(e) =>
                      onUpdateTrack(track.id, { stylePart: e.target.value as YamahaStylePart })
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#121624] border border-[#232c45] text-xs text-purple-300 font-medium rounded-lg px-2 py-1 outline-none focus:border-purple-500"
                  >
                    {STYLE_PARTS.map((part) => (
                      <option key={part} value={part}>
                        {part} (Ch {YAMAHA_DEFAULT_STYLE_MAPPINGS[part].defaultChannel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Volume slider */}
                <div className="flex items-center gap-2 w-28" onClick={(e) => e.stopPropagation()}>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.volume}
                    onChange={(e) => onUpdateTrack(track.id, { volume: Number(e.target.value) })}
                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <span className="text-[10px] text-slate-400 w-6 font-mono">{track.volume}%</span>
                </div>

                {/* Mute and Solo Controls */}
                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onUpdateTrack(track.id, { isMuted: !track.isMuted })}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${
                      track.isMuted
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-[#141926] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    MUTE
                  </button>
                  <button
                    onClick={() => onUpdateTrack(track.id, { isSolo: !track.isSolo })}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${
                      track.isSolo
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-[#141926] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    SOLO
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
