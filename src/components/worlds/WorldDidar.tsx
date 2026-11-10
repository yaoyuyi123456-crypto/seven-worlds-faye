/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Moon, Disc3, Heart } from 'lucide-react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';
import { PsychedelicWorldBackground } from '../PsychedelicWorldBackground';
import { motion } from 'motion/react';

interface WorldDidarProps {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
}

export const WorldDidar: React.FC<WorldDidarProps> = ({ onBackToCosmos, onSwitchWorld }) => {
  const world = SEVEN_WORLDS.find(w => w.id === 'didar')!;
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(world.tracks[1]); // Default to 《假期》!

  const toggleSoundscape = () => {
    if (isPlayingSoundscape) {
      fayeSoundscape.stop();
      setIsPlayingSoundscape(false);
    } else {
      fayeSoundscape.playWorldSoundscape('didar');
      setIsPlayingSoundscape(true);
    }
  };

  useEffect(() => {
    return () => fayeSoundscape.stop();
  }, []);

  return (
    <div className="min-h-screen text-emerald-100 relative overflow-x-hidden selection:bg-[#10b981] selection:text-black">
      
      {/* 1. Fullscreen Photographic Psychedelic Background (Di-Dar背景 · 整个背景都是这个图) */}
      <PsychedelicWorldBackground
        imageSrc="/assets/faye/faye_sky.png"
        altText="Faye Wong Di-Dar Cyan Gown Butterfly Mask Background"
        themeColor="#10b981"
        overlayOpacity={0.46}
        chromaticStrength="subtle"
        vignetteStyle="analog"
      />

      {/* 2. Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToCosmos}
          className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-emerald-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO COSMOS / 返回艺术宇宙</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono-code">
          <span className="px-2.5 py-0.5 bg-[#10b981] text-black font-bold rounded-sm tracking-wider">
            WORLD 03 // 1995
          </span>
          <span className="font-editorial text-sm font-bold tracking-widest text-emerald-200 hidden sm:inline">
            《Di-Dar》 粤语终极迷幻
          </span>
        </div>

        <button
          onClick={toggleSoundscape}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono-code font-bold rounded-full border transition-all cursor-pointer ${
            isPlayingSoundscape
              ? 'bg-[#10b981] text-black border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : 'bg-black/40 hover:bg-black/60 text-emerald-300 border-emerald-500/30'
          }`}
          title="中东音阶与深夜暗房声景"
        >
          {isPlayingSoundscape ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">
            {isPlayingSoundscape ? '中东迷幻：滴答中' : '启动Di-Dar沉浸声景'}
          </span>
        </button>
      </nav>

      {/* 3. Main World Floating Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 relative z-10">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono-code text-emerald-400 tracking-[0.3em] uppercase block flex items-center gap-2">
              <Moon className="w-4 h-4 text-emerald-400" />
              <span>THE THIRD UNIVERSE // MIDNIGHT TRIP-HOP & EMERALD SHADOWS</span>
            </span>

            <h1 className="font-editorial text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              Di-Dar
            </h1>

            <p className="font-editorial text-2xl sm:text-3xl text-emerald-200 font-light leading-relaxed italic max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              “随时预备旅程结束，lalilala～～～我爱上过你；不要偷看你一秒，叫灵魂出窍。”
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 bg-black/65 border border-emerald-500/30 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-emerald-300 border-b border-emerald-500/20 pb-2">
                <span>1995 粤语艺术高峰</span>
                <span className="text-[#34d399] font-bold">金色拉链蝴蝶意象</span>
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
            <div className="flex items-center justify-between pb-2 border-b border-emerald-400/20">
              <span className="text-xs font-mono-code uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-emerald-400" />
                <span>TRACKS // 港岛午夜暗涌</span>
              </span>
              <span className="text-[10px] font-mono-code text-zinc-400">DI-DAR ERA</span>
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
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md'
                        : 'bg-black/40 hover:bg-black/60 border-white/10 text-zinc-300 hover:text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`font-mono-code text-xs font-bold ${isSelected ? 'text-[#34d399]' : 'text-zinc-500'}`}>
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

                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/10 text-emerald-300 shrink-0">
                      {track.duration || '03:50'}
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
                className="p-8 sm:p-10 bg-black/75 border border-emerald-500/30 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-6">
                  <div>
                    <span className="text-xs font-mono-code text-[#34d399] font-bold block uppercase tracking-widest">
                      TRACK {selectedTrack.number} // SIGNATURE
                    </span>
                    <h2 className="font-editorial text-4xl sm:text-5xl font-black text-white mt-1">
                      {selectedTrack.title}
                    </h2>
                  </div>

                  <div className="text-right font-mono-code text-xs text-zinc-400">
                    <p>编曲：{selectedTrack.arranger}</p>
                    <p className="text-emerald-300">TEMPO: {selectedTrack.tempoBpm} BPM</p>
                  </div>
                </div>

                {/* Core Lyric Box with Special Emphasis on 《假期》 */}
                <div className={`p-6 rounded-r-xl border-l-4 ${
                  selectedTrack.title === '假期'
                    ? 'bg-emerald-950/60 border-[#d4f43b] shadow-[0_0_20px_rgba(212,244,59,0.15)]'
                    : 'bg-emerald-950/40 border-emerald-400'
                }`}>
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-emerald-400 block mb-2 flex items-center justify-between">
                    <span>CORE LYRIC INSCRIPTION</span>
                    {selectedTrack.title === '假期' && (
                      <span className="text-[#d4f43b] font-bold">★ 原始纯正歌词 · 旅程终结回望</span>
                    )}
                  </span>
                  <p className="font-editorial text-2xl sm:text-3xl text-white font-medium leading-relaxed italic">
                    “{selectedTrack.signatureLyric}”
                  </p>
                  {selectedTrack.title === '假期' && (
                    <p className="mt-3 text-xs font-mono-code text-[#d4f43b] border-t border-emerald-800/40 pt-2">
                      解读：“我爱上过你”作为整首歌的绝响，将情感比喻成短暂假期，回望过去，苍茫轻盈。
                    </p>
                  )}
                </div>

                {/* Extended Lyric Verse */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-zinc-400 block">
                    EXTENDED LYRIC SNIPPET // 唱片内页文字
                  </span>
                  <p className="font-editorial text-sm sm:text-base text-emerald-100 leading-relaxed whitespace-pre-line p-4 bg-white/5 rounded-xl border border-white/5">
                    {selectedTrack.extendedLyricSnippet}
                  </p>
                </div>

                {/* Curatorial Musical Note */}
                <div className="p-4 bg-black/40 rounded-xl border border-emerald-500/20 space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <span className="text-[10px] font-mono-code text-emerald-400 uppercase tracking-widest block font-bold">
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
                      className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono-code rounded-full"
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
