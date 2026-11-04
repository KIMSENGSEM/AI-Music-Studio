'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar, NavItem } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AudioUploader } from '@/components/audio/AudioUploader';
import { InstrumentTrackList } from '@/components/separation/InstrumentTrackList';
import { PianoRollEditor } from '@/components/midi/PianoRollEditor';
import { StyleSectionBuilder } from '@/components/style/StyleSectionBuilder';
import { ExportPanel } from '@/components/export/ExportPanel';
import { ProjectState, TrackData, StyleSection, MidiNote } from '@/types/music';
import { Disc3, Layers, Music, Sliders, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundEngine';

const INITIAL_TRACKS: TrackData[] = [
  {
    id: 'track-1',
    trackNumber: 1,
    name: 'Drums',
    category: 'drums',
    channel: 8,
    stylePart: 'Rhythm 1',
    volume: 85,
    pan: 0,
    isMuted: false,
    isSolo: false,
    color: '#f43f5e',
    notes: [
      { id: 'd1', name: 'C3', midi: 36, time: 0, duration: 0.5, velocity: 0.9 },
      { id: 'd2', name: 'D3', midi: 38, time: 1, duration: 0.5, velocity: 0.8 },
      { id: 'd3', name: 'C3', midi: 36, time: 2, duration: 0.5, velocity: 0.9 },
      { id: 'd4', name: 'D3', midi: 38, time: 3, duration: 0.5, velocity: 0.8 },
    ],
  },
  {
    id: 'track-2',
    trackNumber: 2,
    name: 'Electric Bass',
    category: 'bass',
    channel: 10,
    stylePart: 'Bass',
    volume: 80,
    pan: 0,
    isMuted: false,
    isSolo: false,
    color: '#eab308',
    notes: [
      { id: 'b1', name: 'C3', midi: 48, time: 0, duration: 1.0, velocity: 0.85 },
      { id: 'b2', name: 'G3', midi: 55, time: 1.5, duration: 0.5, velocity: 0.8 },
      { id: 'b3', name: 'F3', midi: 53, time: 2, duration: 1.0, velocity: 0.85 },
    ],
  },
  {
    id: 'track-3',
    trackNumber: 3,
    name: 'Grand Piano',
    category: 'piano',
    channel: 11,
    stylePart: 'Chord 1',
    volume: 75,
    pan: -15,
    isMuted: false,
    isSolo: false,
    color: '#3b82f6',
    notes: [
      { id: 'p1', name: 'C4', midi: 60, time: 0, duration: 2.0, velocity: 0.7 },
      { id: 'p2', name: 'E4', midi: 64, time: 0, duration: 2.0, velocity: 0.7 },
      { id: 'p3', name: 'G4', midi: 67, time: 0, duration: 2.0, velocity: 0.7 },
    ],
  },
  {
    id: 'track-4',
    trackNumber: 4,
    name: 'Acoustic Guitar',
    category: 'guitar',
    channel: 12,
    stylePart: 'Chord 2',
    volume: 70,
    pan: 15,
    isMuted: false,
    isSolo: false,
    color: '#10b981',
    notes: [
      { id: 'g1', name: 'C4', midi: 60, time: 0.5, duration: 0.5, velocity: 0.65 },
      { id: 'g2', name: 'G4', midi: 67, time: 1.5, duration: 0.5, velocity: 0.65 },
    ],
  },
  {
    id: 'track-5',
    trackNumber: 5,
    name: 'Brass Section',
    category: 'brass',
    channel: 14,
    stylePart: 'Phrase 1',
    volume: 72,
    pan: -25,
    isMuted: false,
    isSolo: false,
    color: '#f97316',
    notes: [
      { id: 'br1', name: 'C4', midi: 60, time: 2, duration: 1.5, velocity: 0.8 },
      { id: 'br2', name: 'D4', midi: 62, time: 3.5, duration: 0.5, velocity: 0.85 },
    ],
  },
  {
    id: 'track-6',
    trackNumber: 6,
    name: 'Symphonic Strings',
    category: 'strings',
    channel: 13,
    stylePart: 'Pad',
    volume: 68,
    pan: 20,
    isMuted: false,
    isSolo: false,
    color: '#8b5cf6',
    notes: [
      { id: 's1', name: 'C4', midi: 60, time: 0, duration: 4.0, velocity: 0.6 },
      { id: 's2', name: 'G4', midi: 67, time: 0, duration: 4.0, velocity: 0.6 },
    ],
  },
  {
    id: 'track-7',
    trackNumber: 7,
    name: 'Lead Melody',
    category: 'lead',
    channel: 15,
    stylePart: 'Phrase 2',
    volume: 82,
    pan: 0,
    isMuted: false,
    isSolo: false,
    color: '#ec4899',
    notes: [
      { id: 'l1', name: 'E4', midi: 64, time: 0, duration: 1.0, velocity: 0.9 },
      { id: 'l2', name: 'G4', midi: 67, time: 1, duration: 1.0, velocity: 0.9 },
    ],
  },
  {
    id: 'track-8',
    trackNumber: 8,
    name: 'Synth Pad',
    category: 'synth',
    channel: 9,
    stylePart: 'Rhythm 2',
    volume: 65,
    pan: 0,
    isMuted: false,
    isSolo: false,
    color: '#06b6d4',
    notes: [
      { id: 'sp1', name: 'C3', midi: 48, time: 1, duration: 0.5, velocity: 0.7 },
    ],
  },
];

export default function StudioApp() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [project, setProject] = useState<ProjectState>({
    id: 'proj-001',
    title: 'Khmer Romantic Ballad (AI Remix)',
    createdAt: new Date().toISOString(),
    audio: {
      fileName: 'romantic_ballad_master.wav',
      fileSize: 34102910,
      format: 'WAV',
      duration: 194,
      bpm: 124,
      keySignature: 'C Minor',
      timeSignature: [4, 4],
    },
    tracks: INITIAL_TRACKS,
    selectedTrackId: 'track-1',
    sections: [
      { section: 'Intro A', startBar: 1, barsLength: 4, isActive: true },
      { section: 'Intro B', startBar: 5, barsLength: 4, isActive: false },
      { section: 'Intro C', startBar: 9, barsLength: 8, isActive: false },
      { section: 'Main A', startBar: 1, barsLength: 4, isActive: true },
      { section: 'Main B', startBar: 5, barsLength: 4, isActive: true },
      { section: 'Main C', startBar: 9, barsLength: 4, isActive: false },
      { section: 'Main D', startBar: 13, barsLength: 4, isActive: false },
      { section: 'Fill In A', startBar: 1, barsLength: 1, isActive: true },
      { section: 'Fill In B', startBar: 2, barsLength: 1, isActive: true },
      { section: 'Fill In C', startBar: 3, barsLength: 1, isActive: false },
      { section: 'Fill In D', startBar: 4, barsLength: 1, isActive: false },
      { section: 'Break', startBar: 1, barsLength: 1, isActive: true },
      { section: 'Ending A', startBar: 1, barsLength: 4, isActive: true },
      { section: 'Ending B', startBar: 5, barsLength: 4, isActive: false },
      { section: 'Ending C', startBar: 9, barsLength: 8, isActive: false },
    ],
    targetKeyboard: 'Yamaha PSR-S970',
    isAnalyzing: false,
    analysisProgress: 0,
  });

  const selectedTrack = project.tracks.find((t) => t.id === project.selectedTrackId) || null;

  // Real-time audio sequencer playback loop
  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(0);
      return;
    }

    const stepIntervalMs = (60 / 124 / 2) * 1000; // 8th note timing at 124 BPM (~242ms)
    let step = 0;

    const interval = setInterval(() => {
      // Find all notes playing at this step (modulo 16 steps = 2 bars)
      const loopStep = step % 16;
      setCurrentStep(loopStep);

      const hasSolo = project.tracks.some((t) => t.isSolo);

      project.tracks.forEach((track) => {
        if (track.isMuted) return;
        if (hasSolo && !track.isSolo) return;

        track.notes.forEach((note) => {
          const noteStep = Math.floor(note.time * 2);
          if (noteStep === loopStep) {
            soundEngine.playNote(
              note.name,
              track.category,
              note.duration,
              (track.volume / 100) * note.velocity
            );
          }
        });
      });

      step++;
    }, stepIntervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, project.tracks]);

  const handleUpdateTrack = (trackId: string, updates: Partial<TrackData>) => {
    setProject((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) => (t.id === trackId ? { ...t, ...updates } : t)),
    }));
  };

  const handleUpdateNotes = (notes: MidiNote[]) => {
    if (!project.selectedTrackId) return;
    handleUpdateTrack(project.selectedTrackId, { notes });
  };

  const handleToggleSection = (sectionName: StyleSection) => {
    setProject((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.section === sectionName ? { ...s, isActive: !s.isActive } : s
      ),
    }));
  };

  const handleUpdateSectionBars = (sectionName: StyleSection, barsLength: number) => {
    setProject((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.section === sectionName ? { ...s, barsLength } : s
      ),
    }));
  };

  const handleStartAnalysis = () => {
    setProject((prev) => ({ ...prev, isAnalyzing: true, analysisProgress: 10 }));
    let progress = 10;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        clearInterval(interval);
        setProject((prev) => ({ ...prev, isAnalyzing: false, analysisProgress: 100 }));
      } else {
        setProject((prev) => ({ ...prev, analysisProgress: progress }));
      }
    }, 300);
  };

  return (
    <div className="flex min-h-screen bg-[#07080c]">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-14 md:pt-0">
        <Header
          project={project}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onSaveProject={() => alert('Project saved locally to workspace state!')}
          onExportClick={() => setActiveTab('midi-to-sty')}
        />

        <main className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          {/* View: Dashboard or Audio to MIDI */}
          {(activeTab === 'dashboard' || activeTab === 'audio-to-midi') && (
            <div className="space-y-6">
              <AudioUploader
                onAudioUploaded={(meta) => setProject((prev) => ({ ...prev, audio: meta }))}
                isAnalyzing={project.isAnalyzing}
                analysisProgress={project.analysisProgress}
                onStartAnalysis={handleStartAnalysis}
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <InstrumentTrackList
                  tracks={project.tracks}
                  selectedTrackId={project.selectedTrackId}
                  onSelectTrack={(id) => setProject((prev) => ({ ...prev, selectedTrackId: id }))}
                  onUpdateTrack={handleUpdateTrack}
                />
                <PianoRollEditor
                  track={selectedTrack}
                  onUpdateNotes={handleUpdateNotes}
                />
              </div>
            </div>
          )}

          {/* View: Instrument Separation */}
          {activeTab === 'separation' && (
            <div className="space-y-6">
              <InstrumentTrackList
                tracks={project.tracks}
                selectedTrackId={project.selectedTrackId}
                onSelectTrack={(id) => setProject((prev) => ({ ...prev, selectedTrackId: id }))}
                onUpdateTrack={handleUpdateTrack}
              />
            </div>
          )}

          {/* View: MIDI Editor */}
          {activeTab === 'midi-editor' && (
            <div className="space-y-6">
              <PianoRollEditor
                track={selectedTrack}
                onUpdateNotes={handleUpdateNotes}
              />
            </div>
          )}

          {/* View: MIDI to STY & Section Builder */}
          {(activeTab === 'midi-to-sty' || activeTab === 'style-creator') && (
            <div className="space-y-6">
              <StyleSectionBuilder
                sections={project.sections}
                onToggleSection={handleToggleSection}
                onUpdateSectionBars={handleUpdateSectionBars}
              />

              <ExportPanel project={project} />
            </div>
          )}

          {/* View: Style Library */}
          {activeTab === 'style-library' && (
            <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-8 text-center space-y-3">
              <Disc3 className="w-10 h-10 text-purple-400 mx-auto animate-spin-slow" />
              <h3 className="text-base font-semibold text-white">Yamaha PSR-S970 Style Library</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Store, preview, categorize, and download exported .STY arranger accompaniment files directly to your USB thumb drive for Yamaha keyboard performance.
              </p>
            </div>
          )}

          {/* View: Settings */}
          {activeTab === 'settings' && (
            <div className="bg-[#0e111a] border border-[#1c2335] rounded-xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-white">Studio & AI Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-3 bg-[#121624] rounded-lg border border-[#1d2538]">
                  <span className="font-semibold block text-slate-200 mb-1">Target Keyboard Hardware</span>
                  <span className="text-purple-400 font-mono">Yamaha PSR-S970 (SFF GE)</span>
                </div>
                <div className="p-3 bg-[#121624] rounded-lg border border-[#1d2538]">
                  <span className="font-semibold block text-slate-200 mb-1">Separation AI Backend</span>
                  <span className="text-blue-400 font-mono">Demucs v4 HTDemucs 8-stem</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
