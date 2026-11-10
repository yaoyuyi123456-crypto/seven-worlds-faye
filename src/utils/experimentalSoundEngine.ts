/**
 * EXPERIMENTAL AMBIENT SOUNDSCAPE ENGINE
 * Notice: This generates algorithmic, conceptual ambient soundscapes inspired by the mood of each album.
 * It is NOT the original copyrighted recording.
 * Clear distinction is enforced across all UI.
 */

class FayeSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private currentWorldId: string | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private timer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playWorldSoundscape(worldId: string) {
    this.initCtx();
    if (!this.ctx) return;

    this.stop();
    this.isPlaying = true;
    this.currentWorldId = worldId;

    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.2, this.ctx.currentTime);
    master.connect(this.ctx.destination);
    this.gainNode = master;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.connect(master);
    this.filterNode = filter;

    const chordsByWorld: Record<string, { root: number; intervals: number[]; type: OscillatorType; tempo: number }> = {
      didar: { root: 110, intervals: [1, 1.2, 1.414, 1.68], type: 'sine', tempo: 4200 },
      fuzao: { root: 261.6, intervals: [1, 1.25, 1.5, 1.75, 2.0], type: 'triangle', tempo: 3000 },
      faye1997: { root: 164.8, intervals: [1, 1.333, 1.5, 1.875], type: 'sine', tempo: 3800 },
      changyou: { root: 220, intervals: [1, 1.25, 1.5, 1.875, 2.25], type: 'triangle', tempo: 2600 },
      yuyan: { root: 87.3, intervals: [1, 1.2, 1.5, 1.78], type: 'sine', tempo: 4800 },
      faye2001: { root: 146.8, intervals: [1, 1.333, 1.5, 2.0], type: 'sine', tempo: 3600 },
      feimimizhinyin: { root: 220, intervals: [1, 1.25, 1.5, 1.667, 1.875], type: 'sine', tempo: 4000 },
      strangers: { root: 130.8, intervals: [1, 1.189, 1.414, 1.682, 2.0], type: 'triangle', tempo: 3200 },
      jiangai: { root: 98, intervals: [1, 1.2, 1.414, 1.8], type: 'triangle', tempo: 3200 }
    };

    const config = chordsByWorld[worldId] || chordsByWorld.changyou;

    const playChordCycle = () => {
      if (!this.isPlaying || !this.ctx || !this.filterNode) return;
      const now = this.ctx.currentTime;
      this.clearOscs();

      config.intervals.forEach((ratio, idx) => {
        if (!this.ctx || !this.filterNode) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = config.type;
        osc.frequency.setValueAtTime(config.root * ratio, now + idx * 0.1);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.6 + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + (config.tempo / 1000) - 0.2);

        osc.connect(noteGain);
        noteGain.connect(this.filterNode);

        osc.start(now + idx * 0.08);
        osc.stop(now + (config.tempo / 1000));
        this.oscillators.push(osc);
      });
    };

    playChordCycle();
    this.timer = window.setInterval(playChordCycle, config.tempo);
  }

  private clearOscs() {
    this.oscillators.forEach(o => {
      try {
        o.stop();
        o.disconnect();
      } catch {
        // ignore
      }
    });
    this.oscillators = [];
  }

  public stop() {
    this.isPlaying = false;
    this.currentWorldId = null;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.clearOscs();
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentWorldId: this.currentWorldId,
    };
  }
}

export const fayeSoundscape = new FayeSoundscapeEngine();
