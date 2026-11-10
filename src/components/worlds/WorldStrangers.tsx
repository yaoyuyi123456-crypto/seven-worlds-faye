/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Radio, Disc3, Eye } from 'lucide-react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';
import { PsychedelicWorldBackground } from '../PsychedelicWorldBackground';
import { motion } from 'motion/react';

interface WorldStrangersProps {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
}

export const WorldStrangers: React.FC<WorldStrangersProps> = ({ onBackToCosmos, onSwitchWorld }) => {
  const world = SEVEN_WORLDS.find(w => w.id === 'strangers')!;
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(world.tracks[0]);
  const [bgMode, setBgMode] = useState<'vinyl_pink' | 'red_heels'>('vinyl_pink');

  const bgImageSrc = bgMode === 'vinyl_pink'
    ? '/assets/faye/faye_strangers.png' // Iconic Black Vinyl Shirt on Pink Wall
    : '/assets/aistudio/IMG_1624_ebcad229.JPG'; // Red Mary Jane Heels on Floor

  const toggleSoundscape = () => {
    if (isPlayingSoundscape) {
      fayeSoundscape.stop();
      setIsPlayingSoundscape(false);
    } else {
      fayeSoundscape.playWorldSoundscape('strangers');
      setIsPlayingSoundscape(true);
    }
  };

  useEffect(() => {
    return () => fayeSoundscape.stop();
  }, []);

  return (
    <div className="min-h-screen text-pink-100 relative overflow-x-hidden selection:bg-[#ec4899] selection:text-white">
      
      {/* 1. Fullscreen Photographic Psychedelic Background (只爱陌生人背景 · 整个背景都是这个图) */}
      <PsychedelicWorldBackground
        imageSrc={bgImageSrc}
        altText="Faye Wong Only Love Strangers Black Vinyl Shirt Background"
        themeColor="#ec4899"
        overlayOpacity={0.44}
        chromaticStrength="medium"
        vignetteStyle="cinematic"
      />

      {/* 2. Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-pink-500/20 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToCosmos}
          className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-pink-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO COSMOS / 返回艺术宇宙</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono-code">
          <span className="px-2.5 py-0.5 bg-[#ec4899] text-white font-bold rounded-sm tracking-wider">
            WORLD 07 // 1999
          </span>
          <span className="font-editorial text-sm font-bold tracking-widest text-pink-200 hidden sm:inline">
            《只爱陌生人》 世纪末冷艳神作
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBgMode(prev => prev === 'vinyl_pink' ? 'red_heels' : 'vinyl_pink')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold bg-white/10 hover:bg-white/20 border border-pink-400/30 rounded-full text-pink-200 transition-all cursor-pointer"
            title="切换只爱陌生人背景原图"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">
              {bgMode === 'vinyl_pink' ? '背景：黑色漆皮衬衫粉包墙' : '背景：先锋静卧红高跟鞋'}
            </span>
          </button>

          <button
            onClick={toggleSoundscape}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono-code font-bold rounded-full border transition-all cursor-pointer ${
              isPlayingSoundscape
                ? 'bg-[#ec4899] text-white border-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'bg-black/40 hover:bg-black/60 text-pink-300 border-pink-500/30'
            }`}
            title="开到荼靡扩音器失真与冷艳电音模拟"
          >
            {isPlayingSoundscape ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">
              {isPlayingSoundscape ? '冷艳摇滚：轰鸣中' : '启动荼靡冷艳声景'}
            </span>
          </button>
        </div>
      </nav>

      {/* 3. Main World Floating Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 relative z-10">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono-code text-pink-400 tracking-[0.3em] uppercase block flex items-center gap-2">
              <Radio className="w-4 h-4 text-pink-400" />
              <span>THE SEVENTH UNIVERSE // BLACK VINYL & DISCO ZEBRAPANTS SENSATION</span>
            </span>

            <h1 className="font-editorial text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              只爱陌生人
            </h1>

            <p className="font-editorial text-2xl sm:text-3xl text-pink-200 font-light leading-relaxed italic max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              “每只蚂蚁都有眼睛鼻子，每一个偶像都不外如此；当花开到荼靡，我只爱陌生人。”
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 bg-black/65 border border-pink-500/30 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-pink-300 border-b border-pink-500/20 pb-2">
                <span>1999 世纪末时尚冷艳</span>
                <span className="text-[#ec4899] font-bold">漆皮衬衫 & 斑马纹</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {world.curatorialStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Tracks Grid & Lyric Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Track Selection */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-pink-400/20">
              <span className="text-xs font-mono-code uppercase tracking-wider text-pink-300 flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-pink-400" />
                <span>TRACKS // 荼靡与世纪末名篇</span>
              </span>
              <span className="text-[10px] font-mono-code text-zinc-400">1999 STRANGERS</span>
            </div>

            <div className="space-y-2">
              {world.tracks.map((track) => {
                const isSelected = selectedTrack?.number === track.number;
                return (
                  <button
                    key={track.number}
                    onClick={() => setSelectedTrack(track)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-pink-900/30 border-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md'
                        : 'bg-black/40 hover:bg-black/60 border-white/10 text-zinc-300 hover:text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`font-mono-code text-xs font-bold ${isSelected ? 'text-[#ec4899]' : 'text-zinc-500'}`}>
                        {track.number}
                      </span>
                      <div className="truncate">
                        <span className="font-editorial text-base font-bold block truncate">
                          {track.title}
                        </span>
                        <span className="font-mono-code text-[11px] text-zinc-400">
                          {track.composer} 曲 / {track.lyricist} 词
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/10 text-pink-300 shrink-0">
                      {track.duration || '04:10'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Track Deep Dive */}
          <div className="lg:col-span-7">
            {selectedTrack && (
              <motion.div
                key={selectedTrack.number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 sm:p-10 bg-black/75 border border-pink-500/30 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-500/20 pb-6">
                  <div>
                    <span className="text-xs font-mono-code text-[#ec4899] font-bold block uppercase tracking-widest">
                      TRACK {selectedTrack.number} // SIGNATURE
                    </span>
                    <h2 className="font-editorial text-4xl sm:text-5xl font-black text-white mt-1">
                      {selectedTrack.title}
                    </h2>
                  </div>

                  <div className="text-right font-mono-code text-xs text-zinc-400">
                    <p>编曲：{selectedTrack.arranger}</p>
                    <p className="text-pink-300">TEMPO: {selectedTrack.tempoBpm} BPM</p>
                  </div>
                </div>

                {/* Core Lyric Box */}
                <div className="p-6 bg-pink-950/40 border-l-4 border-pink-400 rounded-r-xl">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-pink-400 block mb-2">
                    CORE LYRIC INSCRIPTION
                  </span>
                  <p className="font-editorial text-2xl sm:text-3xl text-white font-medium leading-relaxed italic">
                    “{selectedTrack.signatureLyric}”
                  </p>
                </div>

                {/* Extended Lyric Verse */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-400 block">
                    EXTENDED LYRIC SNIPPET // 唱片内页文字
                  </span>
                  <p className="font-editorial text-sm sm:text-base text-pink-100 leading-relaxed whitespace-pre-line p-4 bg-white/5 rounded-xl border border-white/5">
                    {selectedTrack.extendedLyricSnippet}
                  </p>
                </div>

                {/* Curatorial Musical Note */}
                <div className="p-4 bg-black/40 rounded-xl border border-pink-500/20 space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <span className="text-[10px] font-mono-code text-pink-400 uppercase tracking-widest block font-bold">
                    ARTISTIC ARCHIVE NOTE // 艺术解读
                  </span>
                  <p className="leading-relaxed">
                    {selectedTrack.artisticNote}
                  </p>
                </div>

                {/* Mood Keywords */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedTrack.moodKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-pink-400/10 border border-pink-400/30 text-pink-300 text-xs font-mono-code rounded-full"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
