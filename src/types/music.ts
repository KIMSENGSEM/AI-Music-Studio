export type InstrumentCategory =
  | 'drums'
  | 'bass'
  | 'piano'
  | 'guitar'
  | 'brass'
  | 'strings'
  | 'synth'
  | 'lead'
  | 'vocal'
  | 'other';

export interface MidiNote {
  id: string;
  midi: number; // 0 - 127
  time: number; // in seconds or bar units
  duration: number; // in seconds or bar units
  velocity: number; // 0 - 1
  name: string; // e.g. "C4", "F#3"
}

export interface TrackData {
  id: string;
  trackNumber: number;
  name: string;
  category: InstrumentCategory;
  channel: number; // 0 - 15 (MIDI 1-16)
  stylePart: YamahaStylePart;
  volume: number; // 0 - 100
  pan: number; // -50 to 50
  isMuted: boolean;
  isSolo: boolean;
  color: string;
  notes: MidiNote[];
}

export type YamahaStylePart =
  | 'Rhythm 1'
  | 'Rhythm 2'
  | 'Bass'
  | 'Chord 1'
  | 'Chord 2'
  | 'Pad'
  | 'Phrase 1'
  | 'Phrase 2';

export type StyleSection =
  | 'Intro A'
  | 'Intro B'
  | 'Intro C'
  | 'Main A'
  | 'Main B'
  | 'Main C'
  | 'Main D'
  | 'Fill In A'
  | 'Fill In B'
  | 'Fill In C'
  | 'Fill In D'
  | 'Break'
  | 'Ending A'
  | 'Ending B'
  | 'Ending C';

export interface StyleSectionConfig {
  section: StyleSection;
  startBar: number;
  barsLength: number;
  isActive: boolean;
}

export interface AudioMetadata {
  fileName: string;
  fileSize: number;
  format: string;
  duration: number;
  bpm: number;
  keySignature: string;
  timeSignature: [number, number];
  url?: string;
}

export interface ProjectState {
  id: string;
  title: string;
  createdAt: string;
  audio: AudioMetadata | null;
  tracks: TrackData[];
  selectedTrackId: string | null;
  sections: StyleSectionConfig[];
  targetKeyboard: 'Yamaha PSR-S970' | 'Yamaha PSR-SX' | 'Yamaha Genos' | 'Standard SMF';
  isAnalyzing: boolean;
  analysisProgress: number;
}
