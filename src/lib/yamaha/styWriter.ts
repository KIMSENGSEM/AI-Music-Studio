import { TrackData, StyleSectionConfig } from '@/types/music';
import { YAMAHA_DEFAULT_STYLE_MAPPINGS } from './constants';

export interface StyValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  summary: {
    sectionsFound: string[];
    channelsMapped: number[];
    hasRhythmTrack: boolean;
    hasBassTrack: boolean;
    hasChordTrack: boolean;
  };
}

/**
 * Validates style configuration against Yamaha SFF (Style File Format) specifications.
 * Ensures the project adheres to PSR-S970 requirements before attempting generation.
 */
export function validateYamahaStyleProject(
  tracks: TrackData[],
  sections: StyleSectionConfig[],
  bpm: number
): StyValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const activeSections = sections.filter((s) => s.isActive);
  const sectionsFound = activeSections.map((s) => s.section);

  if (activeSections.length === 0) {
    errors.push('Yamaha Style requires at least one active section (e.g. Main A).');
  }

  const activeMain = activeSections.some((s) => s.section.startsWith('Main'));
  if (!activeMain) {
    warnings.push('It is highly recommended to have at least Main A defined for an arranger style.');
  }

  // Check channel mappings
  const mappedChannels = tracks.map((t) => YAMAHA_DEFAULT_STYLE_MAPPINGS[t.stylePart].defaultChannel);
  const uniqueChannels = new Set(mappedChannels);

  if (uniqueChannels.size < mappedChannels.length) {
    warnings.push('Some tracks share the same Yamaha Style channel. Channels 9-16 should ideally be unique per part.');
  }

  const hasRhythm = tracks.some((t) => t.stylePart === 'Rhythm 1' || t.stylePart === 'Rhythm 2');
  const hasBass = tracks.some((t) => t.stylePart === 'Bass');
  const hasChord = tracks.some((t) => t.stylePart === 'Chord 1' || t.stylePart === 'Chord 2');

  if (!hasRhythm) {
    warnings.push('No Rhythm track mapped (Channel 9/10). PSR-S970 style will lack percussion accompaniment.');
  }
  if (!hasBass) {
    warnings.push('No Bass track mapped (Channel 11). Accompanying chord engine will not play bass lines.');
  }
  if (!hasChord) {
    warnings.push('No Chord track mapped (Channel 12/13). Keyboard auto-accompaniment requires harmonic tracks.');
  }

  if (bpm < 30 || bpm > 280) {
    errors.push(`Tempo ${bpm} BPM is outside normal Yamaha arranger range (30 - 280 BPM).`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      sectionsFound,
      channelsMapped: Array.from(uniqueChannels),
      hasRhythmTrack: hasRhythm,
      hasBassTrack: hasBass,
      hasChordTrack: hasChord,
    },
  };
}

/**
 * Builds the CASM (Control Accompaniment Style Mechanism) binary chunk.
 * The CASM chunk instructs Yamaha arranger keyboards how notes in each MIDI channel
 * are transformed according to player chord inputs (Root, Chord Type, NTR, NTT rules).
 */
export function generateYamahaCASMChunk(tracks: TrackData[]): Uint8Array {
  // CASM header tag: "CASM" (4 bytes) + chunk length (4 bytes big-endian)
  // Inside CASM are CSEG (Chord Segment) sub-chunks for each accompaniment channel (9-16)
  const encoder = new TextEncoder();
  const casmTag = encoder.encode('CASM');

  // Minimal standard CASM payload for standard Yamaha PSR SFF1 format
  const payload: number[] = [];

  // For each assigned track, define SFF chord tracking rules
  for (const track of tracks) {
    const partInfo = YAMAHA_DEFAULT_STYLE_MAPPINGS[track.stylePart];
    const channelNibble = partInfo.zeroIndexedChannel; // e.g. 8 for Rhythm 1 (ch 9)

    // CSEG chunk header ('C', 'S', 'E', 'G')
    payload.push(0x43, 0x53, 0x45, 0x47);
    // CSEG length (placeholder for 16-byte minimal descriptor)
    payload.push(0x00, 0x00, 0x00, 0x10);

    // Channel assignment and NTR (Note Transposition Rule)
    // 0 = Root Transpose, 1 = Fixed (for Drums)
    const isDrum = track.stylePart.startsWith('Rhythm');
    const ntrRule = isDrum ? 0x01 : 0x00; 
    const nttRule = isDrum ? 0x00 : 0x01; // NTT: 0=Bypass, 1=Melody/Chord

    payload.push(channelNibble, ntrRule, nttRule, 0x00);
    // Chord bass limit & high key limit
    payload.push(0x3C, 0x54, 0x24, 0x60); // Middle C limits
    payload.push(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);
  }

  const length = payload.length;
  const result = new Uint8Array(8 + length);
  result.set(casmTag, 0);
  result[4] = (length >> 24) & 0xff;
  result[5] = (length >> 16) & 0xff;
  result[6] = (length >> 8) & 0xff;
  result[7] = length & 0xff;
  result.set(payload, 8);

  return result;
}
