// Web Audio API Synthesizer Engine for AI Music Studio
// Provides low-latency zero-dependency playback on desktop and mobile browsers

class StudioAudioEngine {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.isInitialized = true;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pitch to frequency formula: 440 * 2^((midi - 69) / 12)
  public pitchToFreq(noteName: string): number {
    const noteMap: Record<string, number> = {
      C: 0,
      'C#': 1,
      Db: 1,
      D: 2,
      'D#': 3,
      Eb: 3,
      E: 4,
      F: 5,
      'F#': 6,
      Gb: 6,
      G: 7,
      'G#': 8,
      Ab: 8,
      A: 9,
      'A#': 10,
      Bb: 10,
      B: 11,
    };

    const match = noteName.match(/^([A-G]#?|Db|Eb|Gb|Ab|Bb)(\d)$/);
    if (!match) return 440;

    const note = match[1];
    const octave = parseInt(match[2], 10);
    const midi = 12 + octave * 12 + (noteMap[note] ?? 0);
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Play a single note preview (e.g. clicking keys on piano roll)
  public playNote(noteName: string, category = 'piano', duration = 0.4, velocity = 0.8) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freq = this.pitchToFreq(noteName);

      if (category === 'drums') {
        this.playDrumSound(noteName, now, velocity);
        return;
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Configure oscillator wave type by instrument category
      switch (category) {
        case 'bass':
          osc.type = 'sawtooth';
          break;
        case 'brass':
          osc.type = 'sawtooth';
          break;
        case 'strings':
          osc.type = 'triangle';
          break;
        case 'synth':
        case 'lead':
          osc.type = 'square';
          break;
        case 'piano':
        default:
          osc.type = 'triangle';
          break;
      }

      osc.frequency.setValueAtTime(freq, now);

      // ADSR Envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(velocity * 0.25, now + 0.03); // Attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Decay / Release

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Drum sound synthesizer (Kick & Snare)
  private playDrumSound(noteName: string, now: number, velocity: number) {
    if (!this.ctx) return;

    if (noteName.includes('C')) {
      // Kick drum: pitch sweep downward
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      gain.gain.setValueAtTime(velocity * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      // Snare drum: high frequency + noise burst
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(velocity * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  }
}

export const soundEngine = new StudioAudioEngine();
