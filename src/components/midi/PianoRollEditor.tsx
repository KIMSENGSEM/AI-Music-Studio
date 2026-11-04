'use client';

import React, { useState } from 'react';
import { TrackData, MidiNote } from '@/types/music';
import { Plus, Trash2, ZoomIn, ZoomOut, Grid } from 'lucide-react';

interface PianoRollEditorProps {
  track: TrackData | null;
  onUpdateNotes: (notes: MidiNote[]) => void;
}

const PITCHES = [
  'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4',
  'B3', 'A#3', 'A3', 'G#3', 'G3', 'F#3', 'F3', 'E3', 'D#3', 'D3', 'C#3', 'C3',
];

export const PianoRollEditor: React.FC<PianoRollEditorProps> = ({
  track,
  onUpdateNotes,
}) => {
  const [quantize, setQuantize] = useState<'1/4' | '1/8' | '1/16' | '1/32'>('1/16');
  const [zoom, setZoom] = useState<number>(1);

  if (!track) {
    return (
      <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-8 text-center text-slate-500 text-sm">
        Select a track to open the Piano Roll Note Editor.
      </div>
    );
  }

  const handleAddNote = (pitchName: string, barIndex: number) => {
    const newNote: MidiNote = {
      id: `note-${Date.now()}-${Math.random()}`,
      name: pitchName,
      midi: 60, // default pitch
      time: barIndex * 0.5,
      duration: 0.5,
      velocity: 0.8,
    };
    onUpdateNotes([...track.notes, newNote]);
  };

  const handleDeleteNote = (noteId: string) => {
    onUpdateNotes(track.notes.filter((n) => n.id !== noteId));
  };

  return (
    <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl overflow-hidden flex flex-col">
      {/* Piano Roll Toolbar */}
      <div className="p-4 border-b border-[#1c2335] flex items-center justify-between bg-[#0a0d16]">
        <div className="flex items-center gap-3">
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: track.color }}
          />
          <div>
            <h4 className="text-sm font-semibold text-white">
              Piano Roll: {track.name}
            </h4>
            <span className="text-[11px] text-slate-400">
              Assigned to {track.stylePart} (Ch {track.channel + 1})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Quantization */}
          <div className="flex items-center gap-1.5 bg-[#121624] px-2.5 py-1 rounded-lg border border-[#20293f]">
            <Grid className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Snap:</span>
            <select
              value={quantize}
              onChange={(e) => setQuantize(e.target.value as any)}
              className="bg-transparent text-purple-300 font-medium outline-none cursor-pointer"
            >
              <option value="1/4">1/4 Bar</option>
              <option value="1/8">1/8 Note</option>
              <option value="1/16">1/16 Note</option>
              <option value="1/32">1/32 Note</option>
            </select>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#121624] p-1 rounded-lg border border-[#20293f]">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              className="p-1 hover:text-white text-slate-400"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 font-mono px-1">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.2))}
              className="p-1 hover:text-white text-slate-400"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Piano Roll Grid & Keys */}
      <div className="overflow-x-auto overflow-y-auto max-h-[420px] relative bg-[#07090f]">
        <div className="min-w-[800px] flex">
          {/* Left Piano Keyboard Keys */}
          <div className="w-16 shrink-0 sticky left-0 z-20 bg-[#0c0f18] border-r border-[#1e2538] shadow-lg">
            {PITCHES.map((pitch) => {
              const isSharp = pitch.includes('#');
              return (
                <div
                  key={pitch}
                  className={`h-7 px-2 text-[10px] font-mono flex items-center justify-end border-b select-none ${
                    isSharp
                      ? 'bg-[#121624] text-slate-300 border-[#1d2438]'
                      : 'bg-[#181f30] text-slate-100 font-bold border-[#20293e]'
                  }`}
                >
                  {pitch}
                </div>
              );
            })}
          </div>

          {/* Right Grid Canvas */}
          <div className="grow relative">
            {/* Timeline Header */}
            <div className="h-7 border-b border-[#1e2538] flex bg-[#0c0f18] text-[10px] font-mono text-slate-400">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                <div key={bar} className="w-24 border-r border-purple-500/20 px-2 flex items-center">
                  Bar {bar}
                </div>
              ))}
            </div>

            {/* Note Slots */}
            {PITCHES.map((pitch) => (
              <div
                key={pitch}
                className="h-7 border-b border-[#141926] flex divide-x divide-[#151c2d] hover:bg-[#111626]/40 transition-colors"
              >
                {[...Array(16)].map((_, stepIndex) => {
                  const activeNote = track.notes.find(
                    (n) => n.name === pitch && Math.floor(n.time * 2) === stepIndex
                  );

                  return (
                    <div
                      key={stepIndex}
                      onClick={() => {
                        if (activeNote) {
                          handleDeleteNote(activeNote.id);
                        } else {
                          handleAddNote(pitch, stepIndex);
                        }
                      }}
                      className="w-12 h-full relative cursor-pointer group"
                    >
                      {activeNote ? (
                        <div
                          className="absolute inset-y-1 inset-x-0.5 rounded flex items-center justify-between px-1 text-[9px] font-semibold text-white shadow"
                          style={{ backgroundColor: track.color }}
                        >
                          <span>{pitch}</span>
                          <span className="text-[8px] opacity-75">
                            {Math.round(activeNote.velocity * 100)}%
                          </span>
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-30 w-full h-full bg-purple-500/30 rounded" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
