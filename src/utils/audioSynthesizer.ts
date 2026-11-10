// Web Audio API Soundscape & Melody Synthesizer for Faye Wong Digital Archive
// Simulates 90s Dream Pop / Trip-Hop soundscapes with vintage vinyl crackle, lush chords, and tape delay

class FayeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private gainNode: GainNode | null = null;
  private crackleSource: AudioBufferSourceNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filterNode: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private loopInterval: number | null = null;
  private vinylEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public toggleVinyl(enabled: boolean) {
    this.vinylEnabled = enabled;
    if (!enabled && this.crackleSource) {
      try {
        this.crackleSource.stop();
      } catch {
        // ignore
      }
    }
  }

  public playTrackPreview(trackId: string, rootFreq: number = 220, ambientType: string = 'dream_pop') {
    this.initContext();
    if (!this.ctx || !this.analyser) return;

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.gainNode = masterGain;

    // Filter node for vintage warm/dreamy tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(ambientType === 'trip_hop' ? 800 : 1600, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);
    filter.connect(masterGain);
    this.filterNode = filter;

    // Create Vinyl Crackle Noise if enabled
    if (this.vinylEnabled) {
      this.startVinylNoise(masterGain);
    }

    // Play generative harmonic chord sequence
    this.playChordArpeggio(rootFreq, ambientType);
  }

  private startVinylNoise(targetNode: AudioNode) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Periodic clicks & random vinyl dust
      if (Math.random() < 0.0008) {
        output[i] = (Math.random() * 2 - 1) * 0.4;
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(targetNode);

    whiteNoise.start();
    this.crackleSource = whiteNoise;
  }

  private playChordArpeggio(root: number, type: string) {
    if (!this.ctx || !this.filterNode) return;

    // Intervals for Dream Pop: Root, Minor 3rd/Major 3rd, 5th, Major 7th, 9th
    const intervals = type === 'ambient' 
      ? [1, 1.25, 1.5, 1.875, 2.25] 
      : type === 'trip_hop'
      ? [1, 1.2, 1.414, 1.68, 2.0]
      : [1, 1.2, 1.5, 1.78, 2.0];

    const step = () => {
      if (!this.isPlaying || !this.ctx || !this.filterNode) return;

      const now = this.ctx.currentTime;
      // Stop previous oscs
      this.clearOscillators();

      // Sub-bass root
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(root / 2, now);
      subGain.gain.setValueAtTime(0.15, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + 3.8);
      subOsc.connect(subGain);
      subGain.connect(this.filterNode);
      subOsc.start(now);
      subOsc.stop(now + 4);
      this.oscillators.push(subOsc);

      // Pad chord notes
      intervals.forEach((ratio, idx) => {
        if (!this.ctx || !this.filterNode) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        const freq = root * ratio;
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        // subtle detune for dreamy chorus shimmer
        osc.detune.setValueAtTime((Math.random() - 0.5) * 14, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 0.5 + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

        osc.connect(noteGain);
        noteGain.connect(this.filterNode);

        osc.start(now + idx * 0.08);
        osc.stop(now + 3.8);
        this.oscillators.push(osc);
      });
    };

    step();
    this.loopInterval = window.setInterval(step, 3800);
  }

  private clearOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.oscillators = [];
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrackId = null;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.clearOscillators();
    if (this.crackleSource) {
      try {
        this.crackleSource.stop();
        this.crackleSource.disconnect();
      } catch {
        // ignore
      }
      this.crackleSource = null;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      vinylEnabled: this.vinylEnabled
    };
  }
}

export const fayeAudio = new FayeAudioEngine();
