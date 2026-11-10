import React, { useEffect, useRef } from 'react';
import { Volume2, Pause, Play, X, Disc3, Sparkles } from 'lucide-react';
import { fayeAudio } from '../utils/audioSynthesizer';
import { ALBUMS } from '../data/fayeArchive';

interface AudioPlayerBarProps {
  currentTrackId: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onOpenAlbum: (albumId: string) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrackId,
  isPlaying,
  onTogglePlay,
  onClose,
  onOpenAlbum
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Find current song
  let currentSong = null;
  let currentAlbum = null;
  if (currentTrackId) {
    for (const alb of ALBUMS) {
      const s = alb.tracks.find(t => t.id === currentTrackId);
      if (s) {
        currentSong = s;
        currentAlbum = alb;
        break;
      }
    }
  }

  // Draw real-time frequency waveform from Web Audio API Analyser
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = fayeAudio.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const renderWave = () => {
      animationFrameId.current = requestAnimationFrame(renderWave);
      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Subtle resting wave
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.003 + i * 0.2) * 12 + 16;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;
        ctx.fillStyle = isPlaying ? '#d4f43b' : '#52525b';
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };

    renderWave();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  if (!currentSong || !currentAlbum) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121316]/95 backdrop-blur-md border-t border-zinc-800 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-9 h-9 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
            <Disc3 className={`w-5 h-5 text-[#d4f43b] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-sm font-bold text-white tracking-wide truncate">
                《{currentSong.title}》
              </span>
              <button
                onClick={() => onOpenAlbum(currentAlbum.id)}
                className="font-mono-code text-[11px] text-[#d4f43b] hover:underline truncate"
              >
                [{currentAlbum.title} · {currentSong.year}]
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono-code truncate">
              曲：{currentSong.composer} · 词：{currentSong.lyricist} · 编：{currentSong.arranger}
            </p>
          </div>
        </div>

        {/* Dynamic Key Lyric Display */}
        <div className="hidden lg:flex items-center gap-2 text-zinc-300 font-editorial italic max-w-md truncate bg-zinc-900/60 px-3 py-1 border border-zinc-800">
          <span className="text-[#d4f43b] font-mono-code text-[10px] not-italic">LYRIC //</span>
          <span className="truncate">“{currentSong.keyLyric}”</span>
        </div>

        {/* Waveform Visualizer & Controls */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <canvas
              ref={canvasRef}
              width={100}
              height={22}
              className="w-[100px] h-[22px] rounded opacity-90"
            />
            <span className="font-mono-code text-[10px] text-zinc-500 uppercase">
              {currentSong.audioSignature.ambientType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTogglePlay}
              className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
              title={isPlaying ? '暂停声音氛围' : '播放声音氛围'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#d4f43b]" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="关闭播放条"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
