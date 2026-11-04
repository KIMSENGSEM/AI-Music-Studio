import { YamahaStylePart } from '@/types/music';

export interface StylePartMapping {
  part: YamahaStylePart;
  defaultChannel: number; // 9-16 (standard 1-indexed MIDI channel notation)
  zeroIndexedChannel: number; // 8-15 for SMF byte stream
  description: string;
  recommendedInstruments: string[];
}

export const YAMAHA_DEFAULT_STYLE_MAPPINGS: Record<YamahaStylePart, StylePartMapping> = {
  'Rhythm 1': {
    part: 'Rhythm 1',
    defaultChannel: 9,
    zeroIndexedChannel: 8,
    description: 'Main standard drum kit (Kick, Snare, Hi-hat, Cymbals)',
    recommendedInstruments: ['Standard Kit', 'Live! Drums', 'Studio Kit'],
  },
  'Rhythm 2': {
    part: 'Rhythm 2',
    defaultChannel: 10,
    zeroIndexedChannel: 9,
    description: 'Auxiliary percussion (Tambourine, Congas, Shakers, Claps)',
    recommendedInstruments: ['Latin Percussion', 'Analog Kit', 'Pop Percussion'],
  },
  'Bass': {
    part: 'Bass',
    defaultChannel: 11,
    zeroIndexedChannel: 10,
    description: 'Bass line accompaniment tracking root and chord notes',
    recommendedInstruments: ['Acoustic Bass', 'Finger Bass', 'Pick Bass', 'Synth Bass'],
  },
  'Chord 1': {
    part: 'Chord 1',
    defaultChannel: 12,
    zeroIndexedChannel: 11,
    description: 'Primary harmonic accompaniment (Piano, Electric Piano)',
    recommendedInstruments: ['Concert Grand', 'Suitcase EP', 'Honky Tonk'],
  },
  'Chord 2': {
    part: 'Chord 2',
    defaultChannel: 13,
    zeroIndexedChannel: 12,
    description: 'Secondary harmonic rhythm (Acoustic/Electric Guitar strum)',
    recommendedInstruments: ['Steel Guitar', 'Clean Guitar', 'Jazz Guitar'],
  },
  'Pad': {
    part: 'Pad',
    defaultChannel: 14,
    zeroIndexedChannel: 13,
    description: 'Sustained chordal pad or string section backdrop',
    recommendedInstruments: ['Warm Pad', 'Symphonic Strings', 'Air Choir'],
  },
  'Phrase 1': {
    part: 'Phrase 1',
    defaultChannel: 15,
    zeroIndexedChannel: 14,
    description: 'Melodic obbligato, brass hit, or counter-melody',
    recommendedInstruments: ['Brass Section', 'Pop Trumpet', 'Tenor Sax'],
  },
  'Phrase 2': {
    part: 'Phrase 2',
    defaultChannel: 16,
    zeroIndexedChannel: 15,
    description: 'Second phrase, lead synth motif, or arpeggio fill',
    recommendedInstruments: ['Flute', 'Vibraphone', 'Square Lead'],
  },
};

export const YAMAHA_STYLE_SECTIONS = [
  'Intro A',
  'Intro B',
  'Intro C',
  'Main A',
  'Main B',
  'Main C',
  'Main D',
  'Fill In A',
  'Fill In B',
  'Fill In C',
  'Fill In D',
  'Break',
  'Ending A',
  'Ending B',
  'Ending C',
] as const;

export const SUPPORTED_KEYBOARDS = [
  { id: 'psr-s970', name: 'Yamaha PSR-S970 (Target)', format: 'SFF GE (Guitar Edition)' },
  { id: 'psr-sx900', name: 'Yamaha PSR-SX900 / SX700', format: 'SFF GE' },
  { id: 'genos', name: 'Yamaha Genos / Genos 2', format: 'SFF GE' },
  { id: 'generic-smf', name: 'Standard General MIDI SMF', format: 'SMF Type 1' },
];
