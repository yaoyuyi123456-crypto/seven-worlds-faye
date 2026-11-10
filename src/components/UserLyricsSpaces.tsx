/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  UserLyricEntry, 
  loadUserInterpretations, 
  saveUserInterpretations, 
  resetUserInterpretations 
} from '../data/userInterpretations';
import {
  ArrowLeft,
  Sparkles, 
  Edit3, 
  RotateCcw, 
  Wind, 
  Compass, 
  ArrowRight,
  Eye,
  Sliders,
  X,
  BookOpen,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun
} from 'lucide-react';
import { FallingRedBeans } from './effects/FallingRedBeans';
import { motion, AnimatePresence } from 'motion/react';
import { fayeAudio } from '../utils/audioSynthesizer';
import { JiangaiLyricScene } from './JiangaiLyricScene';
import { JIANGAI_SONG_IDS } from '../data/jiangaiArt';
import { DidarArtSpace } from './DidarArtSpace';
import {usePageStart} from './typography/usePageStart';
import { FocusedLyricLab, FOCUSED_LAB_IDS } from './FocusedLyricLab';
import { WorldYuyan } from './worlds/WorldYuyan';

interface UserLyricsSpacesProps {
  onPlaySongSnippet?: (freq: number) => void;
  onNavigateToWorld?: (worldId: string) => void;
  initialEntryId?: string;
  entryIds?: string[];
  onBackToHome?: () => void;
}

export const UserLyricsSpaces: React.FC<UserLyricsSpacesProps> = ({
  onNavigateToWorld,
  initialEntryId,
  entryIds,
  onBackToHome
}) => {
  const [entries, setEntries] = useState<UserLyricEntry[]>(loadUserInterpretations);
  const [selectedEntryId, setSelectedEntryId] = useState<string>(initialEntryId || 'holiday_didar');
  usePageStart(selectedEntryId);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<UserLyricEntry | null>(null);
  
  // Dedicated drawer for Curator Notes & User Interpretations (UI 减负，不挤占主视觉)
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);

  // Dynamic interactive parameters per scene
  // 1. 假期 (Holiday): Horizon drift & sea breeze
  const [holidayDrift, setHolidayDrift] = useState(0);
  const [isBreezeActive, setIsBreezeActive] = useState(true);

  // 2. 乘客 (Passenger): Road speed & neon reflections
  const [passengerRoadOffset, setPassengerRoadOffset] = useState(0);

  // 3. 开到荼靡 (Last Blossom): Continuous scale morphing (0 = Micro Ant, 100 = Cosmos Universe)
  const [antCosmosScale, setAntCosmosScale] = useState<number>(35);

  // 4. 彼岸花 (Equinox): Nightfall darkness (0 = dusk, 1 = pitch black void)
  const [equinoxDarkness, setEquinoxDarkness] = useState<number>(0.85);

  // 5. 新房客 (New Tenant): Room light beam coordinate
  const [roomLightBeam, setRoomLightBeam] = useState({ x: 42, y: 38 });

  // 6. 野三坡 (Sanpo): Mountain wind breathing
  const [mountainWind, setMountainWind] = useState(true);

  // 7. 红豆 (Red Bean): Water ripple flow
  const [waterRipple, setWaterRipple] = useState(0);

  const visibleEntries = entryIds ? entries.filter(entry => entryIds.includes(entry.id)) : entries;
  const activeEntry = entries.find(e => e.id === selectedEntryId) || visibleEntries[0] || entries[0];
  const activeIdx = visibleEntries.findIndex(e => e.id === activeEntry.id);
  const isPaperSong = JIANGAI_SONG_IDS.some(id => id === activeEntry.id);

  // Continuous subtle motion loops (Gentle inertia & slow drift)
  useEffect(() => {
    if (isPaperSong || activeEntry.id === 'holiday_didar' || FOCUSED_LAB_IDS.includes(activeEntry.id) || activeEntry.id === 'new_tenant_yuyan' || activeEntry.id === 'equinox_yuyan') return;
    let animId: number;
    let t = 0;
    let lastFrame = 0;
    const loop = (now: number) => {
      if (document.hidden || now - lastFrame < 45) { animId = requestAnimationFrame(loop); return; }
      lastFrame = now;
      t += 0.025;
      setHolidayDrift(Math.sin(t * 0.4) * 8);
      setPassengerRoadOffset(prev => (prev + 0.35) % 100);
      setWaterRipple(prev => (prev + 0.15) % 100);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPaperSong, activeEntry.id]);

  const handleOpenEditor = (entry: UserLyricEntry) => {
    setEditingEntry({ ...entry });
    setIsEditorOpen(true);
  };

  const handleSaveEditor = () => {
    if (!editingEntry) return;
    const updated = entries.map(e => e.id === editingEntry.id ? editingEntry : e);
    setEntries(updated);
    saveUserInterpretations(updated);
    setIsEditorOpen(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('确认将所有歌曲与个人解读重置为初始纯正版本吗？')) {
      const def = resetUserInterpretations();
      setEntries(def);
      setIsEditorOpen(false);
    }
  };

  const handleSelectSong = (id: string) => {
    setSelectedEntryId(id);
    if (id === 'holiday_didar') fayeAudio.playTrackPreview('didar_holiday', 260, 'trip_hop');
    else if (id === 'passenger_jiangai') fayeAudio.playTrackPreview('jiangai_passenger', 210, 'ambient');
    else if (id === 'kaidaotumi_stranger') fayeAudio.playTrackPreview('stranger_tumi', 300, 'trip_hop');
    else if (id === 'equinox_yuyan') fayeAudio.playTrackPreview('yuyan_bihanhua', 246, 'ambient');
    else if (id === 'new_tenant_yuyan') fayeAudio.playTrackPreview('yuyan_xinfangke', 220, 'trip_hop');
    else if (id === 'sanpo_fuzao') fayeAudio.playTrackPreview('fuzao_sanpo', 320, 'ethereal');
    else if (id === 'red_bean_changyou') fayeAudio.playTrackPreview('changyou_redbean', 280, 'ambient');
  };

  if (FOCUSED_LAB_IDS.includes(activeEntry.id)) {
    return <FocusedLyricLab key={activeEntry.id} entry={activeEntry} onHome={onBackToHome}
      onBack={() => activeEntry.id === 'woaini_jiangai' ? onBackToHome?.() : onNavigateToWorld ? onNavigateToWorld(activeEntry.albumId) : onBackToHome?.()}
      backLabel={activeEntry.id === 'woaini_jiangai' ? '← 返回主页' : `← 返回《${activeEntry.albumTitle}》专辑目录`}
      onSelect={id => { setSelectedEntryId(id); window.scrollTo({ top: 0, behavior: 'instant' }); }} />;
  }

  if (activeEntry.id === 'new_tenant_yuyan' || activeEntry.id === 'equinox_yuyan') {
    return <WorldYuyan initialSong={activeEntry.songTitle} onBackToCosmos={() => onBackToHome?.()} onSwitchWorld={id => onNavigateToWorld?.(id)} />;
  }

  if (activeEntry.id === 'holiday_didar') {
    return <DidarArtSpace title="假期" originalPhoto={activeEntry.photoUrl}
      onOpenLove={() => { setSelectedEntryId('woaini_jiangai'); window.scrollTo({top:0,behavior:'instant'}); }}
      onBack={() => onNavigateToWorld ? onNavigateToWorld('didar') : onBackToHome?.()}
      onHome={onBackToHome} onSelect={title => { if (title !== '假期') onNavigateToWorld?.(`didar-song:${title}`); }} />;
  }

  if (isPaperSong) {
    return <JiangaiLyricScene
      key={activeEntry.id}
      entry={activeEntry}
      onBackToAlbum={() => onNavigateToWorld ? onNavigateToWorld('jiangai') : onBackToHome?.()}
      onHome={onBackToHome}
      onSelectSong={id => { setSelectedEntryId(id); window.scrollTo({ top: 0, behavior: 'instant' }); }}
    />;
  }

  return (
    <div className="relative text-zinc-100 font-sans selection:bg-rose-950 selection:text-white bg-[#070709] min-h-screen overflow-hidden">
      
      {/* ============================================================== */}
      {/* 1. ULTRA-LIGHTWEIGHT ARCHIVAL HEADER (减负，去除厚重卡片，留白与冷感) */}
      {/* ============================================================== */}
      <header className="relative z-40 border-b border-white/5 bg-[#070709]/80 backdrop-blur-md px-6 sm:px-12 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-[10px] tracking-[0.35em] text-zinc-400 uppercase">
              FAYE WONG // SEVEN LYRIC REALMS
            </span>
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            <span className="text-[11px] font-poetic text-zinc-400 tracking-wider">
              九个独立空间装置
            </span>
          </div>
          <h1 className="font-poetic text-2xl sm:text-3xl text-white font-light tracking-wide">
            九首歌曲 · 九种空间存在
          </h1>
        </div>

        {/* Minimalist Action Controls */}
        <div className="flex items-center gap-3">
          {onNavigateToWorld && activeEntry.id !== 'woaini_jiangai' && <button onClick={() => onNavigateToWorld(activeEntry.albumId)} className="text-xs px-3 py-2 border border-white/30 rounded-full">← 返回《{activeEntry.albumTitle}》专辑目录</button>}
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 border border-white/15 px-3 py-2 text-xs font-mono-code text-zinc-300 hover:border-rose-300/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回 HOME</span>
            </button>
          )}
          <button
            onClick={() => setIsNotesDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-poetic text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-300" />
            <span>策展手记与解读</span>
          </button>

          <button
            onClick={() => handleOpenEditor(activeEntry)}
            title="编辑当前歌曲解读"
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white bg-black/40 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. REFINED HAIRLINE GALLERY INDEX (轻量横向索引，告别厚重圆角按钮)  */}
      {/* ============================================================== */}
      <nav className="relative z-30 border-b border-white/5 px-6 sm:px-12 py-3 overflow-x-auto scrollbar-none bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-6 sm:gap-10 min-w-max">
          {visibleEntries.map((item, idx) => {
            const isSelected = item.id === selectedEntryId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSong(item.id)}
                className={`group py-2 flex items-baseline gap-2.5 transition-all cursor-pointer relative ${
                  isSelected ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span className={`font-mono-code text-[11px] tracking-widest ${
                  isSelected ? 'text-rose-400 font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}>
                  0{idx + 1}
                </span>
                <span className="font-poetic text-sm sm:text-base tracking-widest font-normal">
                  《{item.songTitle}》
                </span>
                <span className="text-[10px] font-mono-code text-zinc-600 hidden md:inline">
                  {item.albumTitle}
                </span>

                {/* Hairline Active Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTabHairline"
                    className="absolute -bottom-3 inset-x-0 h-[2px] bg-gradient-to-r from-rose-400 via-pink-300 to-transparent"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ============================================================== */}
      {/* 3. SEVEN BESPOKE SPATIAL INSTALLATIONS (非模板化 · 独立空间装置) */}
      {/* ============================================================== */}
      <main className="rework-lyric-installations relative z-20 min-h-[720px] lg:min-h-[820px] flex flex-col justify-between overflow-hidden">
        
        {/* ------------------------------------------------------------ */}
        {/* INSTALLATION 01: 《假期》—— 极度开阔、海风、夏末地平线与告别回望 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'holiday_didar' && (
          <div className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-gradient-to-b from-[#06101d] via-[#09182b] to-[#040810]">
            
            {/* Background Atmosphere: Vast horizon negative space */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Shifting Horizon Line */}
              <div 
                className="absolute inset-x-0 top-[48%] h-[1px] bg-gradient-to-r from-transparent via-sky-300/30 to-transparent transition-transform duration-700"
                style={{ transform: `translateY(${holidayDrift}px)` }}
              />
              {/* Distant Sea-Sky Radial Light */}
              <div className="absolute top-[30%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
              {/* Subtle Coastal Wind Drift Grid */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(125,211,252,0.4) 1px, transparent 1px)',
                  backgroundSize: '48px 48px'
                }}
              />
            </div>

            {/* Asymmetrical Photographic Bleed (超出版心，右侧非对称倾泻) */}
            <div className="absolute right-[-4%] bottom-[-8%] sm:right-[3%] sm:bottom-[-4%] w-[320px] sm:w-[440px] lg:w-[540px] pointer-events-none select-none z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative"
              >
                <img
                  src={activeEntry.photoUrl}
                  alt="Holiday Walking"
                  className="w-full h-auto object-cover filter contrast-110 brightness-90 shadow-2xl opacity-90 rounded-2xl"
                  style={{
                    maskImage: 'linear-gradient(to top, transparent 5%, black 40%, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 40%, black 90%, transparent 100%)'
                  }}
                />
                {/* Edge-hanging coordinate tag */}
                <div className="absolute top-8 -left-6 font-mono-code text-[10px] text-sky-300 tracking-widest bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-sky-400/20">
                  DI-DAR // 1995 · LAT 22.3° N
                </div>
              </motion.div>
            </div>

            {/* Lyric Layer: Staggered across 3 spatial tiers (字画交错，留白呼吸) */}
            <div className="relative z-20 max-w-4xl space-y-12 my-auto">
              {/* Tier 1: Ethereal upper fragment */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className="space-y-2"
              >
                <span className="font-mono-code text-[11px] text-sky-400/80 tracking-[0.4em] uppercase block">
                  01 · A TEMPORARY VOCATION
                </span>
                <p className="font-poetic text-2xl sm:text-4xl text-zinc-300 font-light tracking-[0.12em]">
                  随时预备旅程结束，
                </p>
              </motion.div>

              {/* Tier 2: Drifting melodic lilt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="pl-8 sm:pl-24"
              >
                <span className="font-editorial text-3xl sm:text-5xl text-sky-200/90 italic tracking-widest font-normal">
                  lalilala～～～
                </span>
              </motion.div>

              {/* Tier 3: Stark, poignant emotional anchor (回望过去的心动点睛之笔) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="pt-6 border-t border-sky-400/20 max-w-2xl"
              >
                <h2 className="font-poetic text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  我爱上过你。
                </h2>
                
                {/* Edge quote annotation */}
                <div className="mt-4 flex items-center gap-3 text-xs font-poetic text-sky-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span>旅程结束前的回望 · 将情感比喻成夏日终曲的假期</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Horizon Navigation Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                <span>作曲：C.Y. Kong / 作词：林夕 / 编曲：C.Y. Kong</span>
                <span className="hidden sm:inline text-sky-400/60">· 118 BPM</span>
              </div>
              <button
                onClick={() => setIsBreezeActive(!isBreezeActive)}
                className="text-sky-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>{isBreezeActive ? '海风拂动中' : '静息地平线'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 《乘客》《不留》《阳宝》复用上方 JiangaiLyricScene；以下保留其他歌曲。 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'kaidaotumi_stranger' && (
          <div className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-[#080509]">
            
            {/* Scale Morphing Radial Space */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at 60% 45%, #991b1b 0%, #450a0a ${antCosmosScale * 0.8}%, #000 95%)`,
                  opacity: 0.35 + (antCosmosScale / 100) * 0.4
                }}
              />
              
              {/* Planetary Orbital Rings or Micro Lens Crosshair */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30 transition-all duration-500"
                style={{
                  width: `${120 + antCosmosScale * 5}px`,
                  height: `${120 + antCosmosScale * 5}px`,
                  opacity: 0.4
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/15 transition-all duration-500"
                style={{
                  width: `${240 + antCosmosScale * 8}px`,
                  height: `${240 + antCosmosScale * 8}px`,
                  opacity: 0.25
                }}
              />
            </div>

            {/* Asymmetrical Photo: Scale zooms between micro texture and wide pose */}
            <div className="absolute right-[2%] bottom-[6%] w-[300px] sm:w-[460px] pointer-events-none select-none z-10">
              <div className="relative overflow-hidden rounded-2xl border border-red-500/30 shadow-2xl">
                <img
                  src={activeEntry.photoUrl}
                  alt="Avant-Garde Scale"
                  className="w-full h-auto object-cover filter contrast-125 brightness-90 transition-transform duration-700"
                  style={{
                    transform: `scale(${1 + (100 - antCosmosScale) * 0.005})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 font-mono-code text-[10px] text-red-300 bg-black/80 px-2 py-0.5 rounded border border-red-400/30">
                  {antCosmosScale < 50 ? 'MICROSCOPIC FIBER // 显微蚂蚁' : 'MACRO COSMOS // 宇宙心悸'}
                </div>
              </div>
            </div>

            {/* Interactive Scale Controller (无缝在微观与宏观之间伸缩) */}
            <div className="relative z-20 flex items-center gap-4 bg-black/75 backdrop-blur-md px-5 py-2.5 rounded-full border border-red-500/30 max-w-md">
              <button
                onClick={() => setAntCosmosScale(15)}
                className={`text-xs font-mono-code transition-colors cursor-pointer flex items-center gap-1 ${
                  antCosmosScale < 50 ? 'text-red-400 font-bold' : 'text-zinc-500'
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>微观蚂蚁</span>
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={antCosmosScale}
                onChange={(e) => setAntCosmosScale(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />

              <button
                onClick={() => setAntCosmosScale(85)}
                className={`text-xs font-mono-code transition-colors cursor-pointer flex items-center gap-1 ${
                  antCosmosScale >= 50 ? 'text-red-400 font-bold' : 'text-zinc-500'
                }`}
              >
                <ZoomOut className="w-3.5 h-3.5" />
                <span>宏观宇宙</span>
              </button>
            </div>

            {/* Lyric Layer: Dynamic Typographic Recombination based on Scale */}
            <div className="relative z-20 max-w-3xl my-auto space-y-6">
              <span className="font-mono-code text-[11px] text-red-400 tracking-[0.4em] uppercase block">
                03 · THE LAST BLOSSOM // 尺度视差
              </span>

              {/* Micro Phrase */}
              <motion.div
                animate={{
                  scale: antCosmosScale < 50 ? 1.05 : 0.95,
                  opacity: antCosmosScale < 50 ? 1 : 0.6
                }}
                className="space-y-2"
              >
                <h3 className="font-poetic text-2xl sm:text-4xl text-zinc-200 font-light tracking-[0.1em]">
                  每只蚂蚁都有眼睛鼻子，
                </h3>
              </motion.div>

              {/* Macro Phrase */}
              <motion.div
                animate={{
                  scale: antCosmosScale >= 50 ? 1.05 : 0.95,
                  opacity: antCosmosScale >= 50 ? 1 : 0.7
                }}
                className="border-l-2 border-red-500/60 pl-4 sm:pl-6 space-y-3"
              >
                <h2 className="font-poetic text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-[0.08em] leading-tight">
                  每一个人遇见所爱的人都心有余悸。
                </h2>
                <p className="font-poetic text-xs text-red-200/80 italic">
                  “自然界的规律在人的情感上复演。在庞大宇宙与昆虫微尘之间，恐惧与爱同频震荡。”
                </p>
              </motion.div>
            </div>

            {/* Bottom Strip */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4">
              <span>作曲：C.Y. Kong / 作词：林夕 / 编曲：C.Y. Kong · 1999</span>
              <span className="text-red-400">滑动滑块：体验蚂蚁微小生命与庞大情绪宇宙的尺度视差</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* INSTALLATION 04: 《彼岸花》—— 极致冷黑、极简留白、天黑与白发 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'equinox_yuyan' && (
          <div className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-[#030305]">
            
            {/* Absolute Deep Obsidian Void & Ethereal Silver Light */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 bg-black transition-opacity duration-500"
                style={{ opacity: equinoxDarkness }}
              />
              {/* Haunting Silver Hair Thread */}
              <div className="absolute inset-x-0 top-[40%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
              {/* Distant Blood Spider Lily Petal Glow */}
              <div className="absolute bottom-[20%] right-[30%] w-32 h-32 rounded-full bg-red-600/10 blur-[80px]" />
            </div>

            {/* Ghostly Photographic Revelation: Faye's rainbow eyes emerging from pure void */}
            <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[50%] pointer-events-none select-none z-10 flex items-center justify-end">
              <img
                src={activeEntry.photoUrl}
                alt="Fable Equinox"
                className="max-h-[80%] w-auto object-contain transition-all duration-700"
                style={{
                  filter: `grayscale(${equinoxDarkness * 100}%) contrast(${120 + equinoxDarkness * 40}%) brightness(${0.9 - equinoxDarkness * 0.4})`,
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                  opacity: 0.65
                }}
              />
            </div>

            {/* Top Minimal Indicator */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-purple-400 tracking-[0.4em] uppercase">
                04 · EQUINOX FLOWER // 东方宿命
              </span>
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 text-xs font-mono-code text-zinc-400">
                <Moon className="w-3.5 h-3.5 text-purple-400" />
                <span>黑夜深沉度: {Math.round(equinoxDarkness * 100)}%</span>
              </div>
            </div>

            {/* Lyric Sculpture: Stark, sharp, cold sentence slicing the darkness */}
            <div className="relative z-20 max-w-2xl my-auto space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="space-y-4"
              >
                <div className="font-poetic text-3xl sm:text-5xl text-zinc-400 font-light tracking-[0.2em]">
                  天黑
                </div>

                <h2 className="font-poetic text-5xl sm:text-7xl lg:text-8xl text-white font-extralight tracking-[0.1em] leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                  刷白了头发。
                </h2>

                <p className="font-poetic text-xs sm:text-sm text-zinc-400 pt-4 max-w-lg leading-relaxed italic">
                  “太美的意境。极致极简、黑白光影、东方宿命感。黑夜主动执笔将青丝染为雪白。”
                </p>
              </motion.div>
            </div>

            {/* Bottom Strip */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-500 border-t border-white/5 pt-4">
              <span>曲：王菲 / 词：林夕 / 编：张亚东 · 寓言终章</span>
              <input
                type="range"
                min="0.4"
                max="1"
                step="0.02"
                value={equinoxDarkness}
                onChange={(e) => setEquinoxDarkness(parseFloat(e.target.value))}
                className="w-32 accent-purple-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* INSTALLATION 05: 《新房客》—— 房间式空间、百叶窗影与无法透视的亲密 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'new_tenant_yuyan' && (
          <div 
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
              const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
              setRoomLightBeam({ x, y });
            }}
            className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-[#070b12] cursor-crosshair"
          >
            {/* Room Geometry: Door slits, Venetian shadow slats */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Slanted Room Shadow */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 20px, transparent 20px, transparent 40px)'
                }}
              />
              {/* Dynamic Light Beam cutting through the room */}
              <div 
                className="absolute inset-0 transition-all duration-75"
                style={{
                  background: `radial-gradient(circle 280px at ${roomLightBeam.x}% ${roomLightBeam.y}%, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.05) 50%, rgba(0,0,0,0.8) 80%)`
                }}
              />
            </div>

            {/* Asymmetrical Photo: Room door frame cutout */}
            <div className="absolute left-[5%] bottom-[8%] sm:left-[8%] sm:bottom-[10%] w-[260px] sm:w-[380px] pointer-events-none select-none z-10">
              <div className="relative border-l-2 border-cyan-400/40 pl-3">
                <img
                  src={activeEntry.photoUrl}
                  alt="New Tenant Room"
                  className="w-full h-auto object-cover filter contrast-125 brightness-80 rounded-r-xl"
                  style={{
                    maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
                  }}
                />
                <div className="font-mono-code text-[10px] text-cyan-300 mt-2">
                  UNPACKED ROOM // 无法透视的亲密客体
                </div>
              </div>
            </div>

            {/* Top Indicator */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-cyan-400 tracking-[0.4em] uppercase">
                05 · NEW TENANT // 房间装置
              </span>
              <span className="text-xs font-mono-code text-cyan-300/80">
                探照光锥：看见世界与无法穿透的人
              </span>
            </div>

            {/* Lyric Layer: Projected on room shadows */}
            <div className="relative z-20 max-w-3xl ml-auto text-right my-auto space-y-8 pr-2 sm:pr-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="font-poetic text-2xl sm:text-4xl text-zinc-300 font-light tracking-[0.08em]">
                  我见过一场海啸 没见过你的微笑；
                </p>
                <h2 className="font-poetic text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  我见过一只飞鸟，没见过你的羽毛。
                </h2>
              </motion.div>

              <div className="p-4 bg-black/60 rounded-xl border border-cyan-500/20 backdrop-blur-md max-w-md ml-auto text-left">
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  比喻想要了解一个人却怎么都看不透。看见了整个自然界的浩大，却无法看透面前亲密客体的微小真心。
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4">
              <span>曲：王菲 / 词：林夕 / 编：张亚东</span>
              <span className="text-cyan-300">移动光标：在暗室之中探寻微笑与羽毛的踪影</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* INSTALLATION 06: 《野三坡与堕落》—— 绿三坡、野风、呼吸与未定义状态 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'sanpo_fuzao' && (
          <div className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-transparent">
            
            <img className="song-stage-background" src={activeEntry.photoUrl} alt={activeEntry.photoTitle} />

            {/* Top Indicator */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-emerald-400 tracking-[0.4em] uppercase">
                06 · GREEN SANPO // 绿三坡与呼吸
              </span>
              <button
                onClick={() => setMountainWind(!mountainWind)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-xs font-poetic text-emerald-200 cursor-pointer hover:bg-emerald-900 transition-colors"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>{mountainWind ? '山野微风拂过' : '定格微风'}</span>
              </button>
            </div>

            {/* Lyric Layer: Loosely scattered across the mountain slopes (排版更松更散) */}
            <div className="relative z-20 max-w-3xl my-auto space-y-10 pl-2 sm:pl-6">
              <motion.div
                animate={{ y: mountainWind ? [0, -6, 0] : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="space-y-4"
              >
                <span className="font-poetic text-xs uppercase tracking-[0.3em] text-emerald-300 block">
                  山风、长笛与纵马的呼吸
                </span>

                <h3 className="font-poetic text-3xl sm:text-5xl text-zinc-200 font-light tracking-[0.1em] transform -rotate-1">
                  野三坡的风穿过山谷，不需要句子。
                </h3>
              </motion.div>

              <div className="pl-12 sm:pl-28">
                <span className="font-editorial text-4xl sm:text-6xl text-emerald-300 italic tracking-widest font-light">
                  啦啦啦，
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 max-w-xl"
              >
                <h2 className="font-poetic text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  没有字句的呼吸。
                </h2>
                <p className="font-poetic text-xs sm:text-sm text-emerald-200/80 pt-3 italic">
                  “王菲罕见的自然主义与私人状态。纯靠象声词与器乐呼吸，将歌词重负彻底抛下，回归原始自然。”
                </p>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4">
              <span>曲：窦唯 / 词：无字句哼唱 / 编：窦唯 · 浮躁</span>
              <span className="text-emerald-300">自然野性 · 逃离都市规训的喘息空间</span>
            </div>
          </div>
        )}

        {activeEntry.id === 'drop_fuzao' && (
          <section className="relative min-h-[740px] lg:min-h-[840px] overflow-hidden bg-transparent px-6 py-10 sm:px-14 lg:px-20 flex flex-col justify-between">
            <img className="song-stage-background" src={activeEntry.photoUrl} alt={activeEntry.photoTitle} />
            <div className="relative z-10 flex items-center justify-between gap-4 text-xs font-mono-code text-rose-200/80">
              <span>FUZAO / THE AFTER-HOURS FALL · 1996</span>
              <span className="hidden sm:inline">松弛、失序与夜色的回声</span>
            </div>
            <div className="relative z-10 my-auto max-w-3xl space-y-8">
              <span className="font-mono-code text-[11px] tracking-[0.35em] text-rose-100">FUZAO / TRACK 06</span>
              <h2 className="font-poetic text-5xl sm:text-7xl text-white font-light">逆流而上</h2>
              <p className="font-poetic text-xl sm:text-3xl leading-relaxed text-rose-100/90">绝望的逆流而上，<br />甘心的自投罗网。</p>
              <motion.p
                className="font-editorial text-4xl sm:text-6xl italic text-rose-200/80"
                animate={{ x: [0, 20, 0], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                哈哈哈哈 · 呜呜呜呜
              </motion.p>
            </div>
            <div className="relative z-10 border-t border-rose-100/15 pt-4 text-xs font-mono-code text-zinc-400">
              {activeEntry.photoTitle} · 《浮躁》独立意象装置
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* INSTALLATION 07: 《红豆》—— 东方纸本、相思红豆缓缓飘落与细水长流 */}
        {/* ------------------------------------------------------------ */}
        {activeEntry.id === 'red_bean_changyou' && (
          <div className="relative w-full min-h-[740px] lg:min-h-[840px] flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden bg-[#100705]">
            
            {/* Real Falling Red Beans Particle Physics */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #451a03 0%, #1c0a02 50%, #050201 100%)'
                }}
              />
              {/* Falling Red Beans (缓慢优美飘落) */}
              <FallingRedBeans count={40} />
            </div>

            {/* Asymmetrical Photo: Vintage autograph book / paper portrait */}
            <div className="absolute right-[4%] bottom-[5%] sm:right-[8%] sm:bottom-[8%] w-[280px] sm:w-[400px] pointer-events-none select-none z-10">
              <div className="relative p-2.5 bg-black/60 rounded-2xl border border-amber-600/30 backdrop-blur-md shadow-2xl">
                <img
                  src={activeEntry.photoUrl}
                  alt="Red Bean Memory"
                  className="w-full h-auto object-cover rounded-xl filter contrast-110 sepia-[0.15]"
                />
                <div className="font-mono-code text-[10px] text-amber-200 mt-2 px-1">
                  AUTOGRAPH & MEMORY // 纸本风化
                </div>
              </div>
            </div>

            {/* Top Indicator */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="font-mono-code text-[11px] text-amber-400 tracking-[0.4em] uppercase">
                07 · RED BEAN // 相思与时间风化
              </span>
              <span className="text-xs font-mono-code text-amber-300/80">
                相思红豆缓慢飘落 · 虚无与留恋
              </span>
            </div>

            {/* Lyric Layer: Letterpress Poetic Cadence */}
            <div className="relative z-20 max-w-3xl my-auto space-y-8 pl-2 sm:pl-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <span className="font-mono-code text-[10px] tracking-[0.3em] uppercase text-amber-400/90 block font-bold">
                  PHILOSOPHICAL ANCHOR
                </span>

                <h2 className="font-poetic text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  没有什么会永垂不朽。
                </h2>
              </motion.div>

              <div className="space-y-3 pt-2">
                <p className="font-poetic text-xl sm:text-3xl text-zinc-300 font-light tracking-[0.1em]">
                  可是我 有时候 宁愿选择留恋不放手
                </p>

                <p className="font-poetic text-2xl sm:text-4xl text-amber-200/90 font-light tracking-[0.1em]">
                  等到风景都看透 也许你会陪我 看细水长流。
                </p>
              </div>

              <div className="p-4 bg-black/60 rounded-xl border border-amber-500/20 backdrop-blur-md max-w-md">
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  《红豆》常被视作大众流行情歌，却不知正好呼应了“没有什么会永垂不朽”。以温润旋律包裹虚无主义的最高宣讲。
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4">
              <span>曲：柳重言 / 词：林夕 / 编：Alex San · 唱游</span>
              <span className="text-amber-300">红豆飘落时空 · 细水长流</span>
            </div>
          </div>
        )}


        {/* INSTALLATION 08: 催眠 · 流动的童年，三张纪实拼贴 */}
        {activeEntry.id === 'cuimian_stranger' && (
          <section className="dream-installation" aria-label="催眠：漂浮的童年">
            <div className="dream-grain" aria-hidden="true" />
            <div className="dream-heading"><span>08 / THE SOFT CLOCK</span><h2>催眠</h2><p>时间经过，万物仍在漂浮。</p></div>
            <div className="dream-collage">
              <motion.img className="dream-photo dream-photo-a" src="/assets/aistudio/IMG_5409_4b4eb2dd.jpeg" alt="车厢中的王菲" animate={{y:[0,-13,0],rotate:[-3,-1,-3]}} transition={{duration:11,repeat:Infinity,ease:'easeInOut'}} />
              <motion.img className="dream-photo dream-photo-b" src="/assets/aistudio/IMG_5410_b15c8573.jpeg" alt="橙红色舞台中的王菲" animate={{y:[0,18,0],rotate:[4,2,4]}} transition={{duration:13,repeat:Infinity,ease:'easeInOut'}} />
              <motion.img className="dream-photo dream-photo-c" src="/assets/aistudio/IMG_5411_6b9d0810.jpeg" alt="摇滚人群中的王菲" animate={{y:[0,-10,0],rotate:[-2,1,-2]}} transition={{duration:15,repeat:Infinity,ease:'easeInOut'}} />
              <motion.span className="dream-fragment dream-fragment-a" animate={{x:[0,12,0],y:[0,-15,0]}} transition={{duration:9,repeat:Infinity,ease:'easeInOut'}}>第一件玩具带来的安慰</motion.span>
              <motion.span className="dream-fragment dream-fragment-b" animate={{x:[0,-16,0],y:[0,13,0]}} transition={{duration:12,repeat:Infinity,ease:'easeInOut'}}>太阳上山，太阳下山，<br/>冰淇凌流泪。</motion.span>
              <motion.span className="dream-fragment dream-fragment-c" animate={{y:[0,-14,0]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut'}}>一二三岁，四五六岁，<br/><em>千秋万岁。</em></motion.span>
            </div>
            <span className="dream-footnote">A CHILDHOOD THAT NEVER STAYS STILL / 1999</span>
          </section>
        )}

        {/* INSTALLATION 09: 我爱你 · 两组字的引力与离心 */}
        {activeEntry.id === 'woaini_jiangai' && (
          <section className="love-installation" aria-label="我爱你：爱与哎的靠近和分离">
            <div className="love-portrait love-portrait-one" style={{backgroundImage:'url(/assets/aistudio/IMG_5432_ee2874af.jpeg)'}} />
            <div className="love-portrait love-portrait-two" style={{backgroundImage:'url(/assets/aistudio/IMG_5433_98f82a21.jpeg)'}} />
            <div className="love-intro"><span>09 / BETWEEN LOVE AND SIGH</span><h2>我爱你</h2></div>
            <div className="love-orbit" aria-label="爱 哎 爱 哎">
              {['爱','哎','爱','哎'].map((char,i)=><motion.span key={i} className={'love-glyph love-glyph-'+i} animate={{x:[i%2===0?-26:26,0,i%2===0?-26:26],opacity:[0.62,1,0.62]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut',delay:i*.15}}>{char}</motion.span>)}
            </div>
            <p className="love-caption">靠近时，是爱。远离时，是叹息。</p>
          </section>
        )}

      </main>

      {/* ============================================================== */}
      {/* 4. CURATOR NOTES & PERSONAL ARCHIVE DRAWER (整洁侧边抽屉，UI轻量化) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isNotesDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotesDrawerOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Sliding Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-xl h-full bg-[#0d0d12] border-l border-white/10 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <span className="font-mono-code text-[10px] tracking-widest text-rose-300 uppercase">
                      CURATOR & PERSONAL NOTES
                    </span>
                    <h3 className="font-poetic text-2xl text-white">
                      《{activeEntry.songTitle}》深度解读
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsNotesDrawerOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User's Raw Lyric Archive */}
                <div className="p-4 bg-black/50 rounded-2xl border border-rose-500/20 space-y-2">
                  <span className="font-mono-code text-[10px] text-rose-300 uppercase tracking-widest">
                    LYRIC FRAGMENTS // 歌词片段
                  </span>
                  <p className="font-poetic text-lg sm:text-xl text-white font-normal leading-relaxed">
                    “{activeEntry.rawLyric}”
                  </p>
                </div>

                {/* User's Personal Interpretation */}
                <div className="space-y-3">
                  <span className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-widest block">
                    MY PERSONAL INTERPRETATION // 我的独家解读
                  </span>
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <p className="font-sans text-sm text-zinc-200 leading-relaxed">
                      {activeEntry.userInterpretation}
                    </p>
                  </div>
                </div>

                {/* AI Open Perspectives */}
                <div className="space-y-4">
                  <span className="font-mono-code text-[11px] text-zinc-400 uppercase tracking-widest block">
                    OPEN PERSPECTIVES // 听觉与文学剖析
                  </span>
                  <div className="space-y-3">
                    {activeEntry.aiOpenPerspectives.map((p, idx) => (
                      <div key={idx} className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-1">
                        <span className="text-xs font-mono-code text-rose-300 font-bold block">
                          ✦ {p.lens}
                        </span>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {p.insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions inside drawer */}
              <div className="border-t border-white/10 pt-5 mt-8 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsNotesDrawerOpen(false);
                    handleOpenEditor(activeEntry);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 rounded-full text-xs font-mono-code cursor-pointer transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>编辑我的解读文字</span>
                </button>
                <span className="font-mono-code text-[10px] text-zinc-500">
                  EIGHT WORLDS // DIGITAL ARCHIVE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 5. MODAL FOR EDITING INTERPRETATION (保持用户自定义能力)          */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isEditorOpen && editingEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121016] border border-rose-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-poetic text-2xl text-white">
                  编辑《{editingEntry.songTitle}》解读
                </h3>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 mb-2">
                    歌词片段（保留原文）
                  </label>
                  <input
                    type="text"
                    disabled
                    value={editingEntry.rawLyric}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-zinc-400 font-poetic text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-rose-300 mb-2">
                    我的个人音乐解读 (可自由修改)
                  </label>
                  <textarea
                    rows={4}
                    value={editingEntry.userInterpretation}
                    onChange={(e) => setEditingEntry({ ...editingEntry, userInterpretation: e.target.value })}
                    className="w-full px-4 py-3 bg-black/70 border border-rose-400/30 focus:border-rose-400 rounded-xl text-white font-sans text-sm outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono-code text-zinc-300 hover:text-white"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveEditor}
                  className="px-6 py-2 rounded-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs font-mono-code shadow-lg"
                >
                  保存我的解读
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
