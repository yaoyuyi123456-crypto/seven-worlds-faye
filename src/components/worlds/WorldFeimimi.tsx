/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Flame, Disc3, Eye } from 'lucide-react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';
import { PsychedelicWorldBackground } from '../PsychedelicWorldBackground';
import { motion } from 'motion/react';

interface WorldFeimimiProps {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
}

export const WorldFeimimi: React.FC<WorldFeimimiProps> = ({ onBackToCosmos, onSwitchWorld }) => {
  const world = SEVEN_WORLDS.find(w => w.id === 'feimimizhinyin')!;
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(world.tracks[0]);
  const [bgMode, setBgMode] = useState<'contact_sheet' | 'autograph_portrait'>('contact_sheet');

  const bgImageSrc = bgMode === 'contact_sheet'
    ? '/assets/aistudio/IMG_1647_6ac420d2.JPG' // Explicitly titled "菲靡靡之音" in bottom-right corner!
    : '/assets/aistudio/d9e6a8bdb47286e97643bd0194102f16_d6ef450c.JPG'; // Autograph and dark lipstick portrait

  const toggleSoundscape = () => {
    if (isPlayingSoundscape) {
      fayeSoundscape.stop();
      setIsPlayingSoundscape(false);
    } else {
      fayeSoundscape.playWorldSoundscape('feimimizhinyin');
      setIsPlayingSoundscape(true);
    }
  };

  useEffect(() => {
    return () => fayeSoundscape.stop();
  }, []);

  return (
    <div className="min-h-screen text-rose-100 relative overflow-x-hidden selection:bg-[#b91c1c] selection:text-white">
      
      {/* 1. Fullscreen Photographic Psychedelic Background (菲靡靡之音背景 · 整个背景都是这个图) */}
      <PsychedelicWorldBackground
        imageSrc={bgImageSrc}
        altText="Faye Wong Decadent Sound of Faye Contact Sheet Crimson Background"
        themeColor="#b91c1c"
        overlayOpacity={0.42}
        chromaticStrength="subtle"
        vignetteStyle="analog"
      />

      {/* 2. Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-rose-500/20 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToCosmos}
          className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-rose-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO COSMOS / 返回艺术宇宙</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono-code">
          <span className="px-2.5 py-0.5 bg-[#b91c1c] text-white font-bold rounded-sm tracking-wider">
            WORLD 06 // 1995
          </span>
          <span className="font-editorial text-sm font-bold tracking-widest text-rose-200 hidden sm:inline">
            《菲靡靡之音》 翻唱史至高绝唱
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBgMode(prev => prev === 'contact_sheet' ? 'autograph_portrait' : 'contact_sheet')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-bold bg-white/10 hover:bg-white/20 border border-rose-400/30 rounded-full text-rose-200 transition-all cursor-pointer"
            title="切换菲靡靡之音背景原图"
          >
            <Eye className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">
              {bgMode === 'contact_sheet' ? '背景：菲靡靡之音宝丽来联页' : '背景：手迹与深红唇色'}
            </span>
          </button>

          <button
            onClick={toggleSoundscape}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono-code font-bold rounded-full border transition-all cursor-pointer ${
              isPlayingSoundscape
                ? 'bg-[#b91c1c] text-white border-rose-300 shadow-[0_0_15px_rgba(185,28,28,0.5)]'
                : 'bg-black/40 hover:bg-black/60 text-rose-300 border-rose-500/30'
            }`}
            title="丝绒气声与邓丽君绝世重构"
          >
            {isPlayingSoundscape ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">
              {isPlayingSoundscape ? '靡靡之音：绝美回响' : '启动绝代声景模拟'}
            </span>
          </button>
        </div>
      </nav>

      {/* 3. Main World Floating Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 relative z-10">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono-code text-rose-400 tracking-[0.3em] uppercase block flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>THE SIXTH UNIVERSE // DECADENT SOUND & SPILLED CRIMSON VELVET</span>
            </span>

            <h1 className="font-editorial text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              菲靡靡之音
            </h1>

            <p className="font-editorial text-2xl sm:text-3xl text-rose-200 font-light leading-relaxed italic max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              “所谓‘靡靡之音’，不过是俗世对不可方物之美的愚钝误解；但愿人长久，千里共婵娟。”
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 bg-black/65 border border-rose-500/30 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-rose-300 border-b border-rose-500/20 pb-2">
                <span>1995 翻唱史珠峰</span>
                <span className="text-[#f87171] font-bold">右下角原版印字珍品</span>
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
            <div className="flex items-center justify-between pb-2 border-b border-rose-400/20">
              <span className="text-xs font-mono-code uppercase tracking-wider text-rose-300 flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-rose-400" />
                <span>TRACKS // 绝代名作重铸</span>
              </span>
              <span className="text-[10px] font-mono-code text-zinc-400">1995 DECADENCE</span>
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
                        ? 'bg-rose-900/30 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] backdrop-blur-md'
                        : 'bg-black/40 hover:bg-black/60 border-white/10 text-zinc-300 hover:text-white backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`font-mono-code text-xs font-bold ${isSelected ? 'text-[#f87171]' : 'text-zinc-500'}`}>
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

                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/10 text-rose-300 shrink-0">
                      {track.duration || '03:40'}
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
                className="p-8 sm:p-10 bg-black/75 border border-rose-500/30 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rose-500/20 pb-6">
                  <div>
                    <span className="text-xs font-mono-code text-[#f87171] font-bold block uppercase tracking-widest">
                      TRACK {selectedTrack.number} // SIGNATURE
                    </span>
                    <h2 className="font-editorial text-4xl sm:text-5xl font-black text-white mt-1">
                      {selectedTrack.title}
                    </h2>
                  </div>

                  <div className="text-right font-mono-code text-xs text-zinc-400">
                    <p>编曲：{selectedTrack.arranger}</p>
                    <p className="text-rose-300">TEMPO: {selectedTrack.tempoBpm} BPM</p>
                  </div>
                </div>

                {/* Core Lyric Box */}
                <div className="p-6 bg-rose-950/40 border-l-4 border-rose-400 rounded-r-xl">
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-rose-400 block mb-2">
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
                  <p className="font-editorial text-sm sm:text-base text-rose-100 leading-relaxed whitespace-pre-line p-4 bg-white/5 rounded-xl border border-white/5">
                    {selectedTrack.extendedLyricSnippet}
                  </p>
                </div>

                {/* Curatorial Musical Note */}
                <div className="p-4 bg-black/40 rounded-xl border border-rose-500/20 space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                  <span className="text-[10px] font-mono-code text-rose-400 uppercase tracking-widest block font-bold">
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
                      className="px-3 py-1 bg-rose-400/10 border border-rose-400/30 text-rose-300 text-xs font-mono-code rounded-full"
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
