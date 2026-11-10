/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { SEVEN_WORLDS, WorldDefinition } from '../data/sevenWorlds';
import { ALBUMS } from '../data/fayeArchive';
import { HOME_BACKGROUNDS } from '../data/homeBackgrounds';
import {
  ArrowUpRight,
  Compass,
  Sparkles,
  Volume2,
  Eye,
  ChevronDown,
  Layers,
  Music,
  BookOpen,
  Disc3,
  Sliders,
  Terminal,
  Camera,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CircularCarousel, { CircularCarouselItem } from './ReactBitsCircularCarousel';

interface HomeCosmosProps {
  onEnterWorld: (worldId: string) => void;
  onEnterInstallation: (entryId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const HomeCosmos: React.FC<HomeCosmosProps> = ({ onEnterWorld, onEnterInstallation, onNavigateTab }) => {
  const [hoveredWorld, setHoveredWorld] = useState<WorldDefinition | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeCoverIdx, setActiveCoverIdx] = useState(0);
  const [backgroundRatios, setBackgroundRatios] = useState<Record<string, number>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const armedAlbumIndex = useRef<number | null>(null);

  const coverMasters = HOME_BACKGROUNDS;

  const currentCover = coverMasters[activeCoverIdx];

  // Load the next image before its turn so crossfades stay continuous.
  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = coverMasters[(activeCoverIdx + 1) % coverMasters.length].path;
  }, [activeCoverIdx, coverMasters]);

  // 1. Automatic continuous background rotation (首页背景图不停切换)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveCoverIdx(prev => (prev + 1) % coverMasters.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, coverMasters.length]);

  // Slow reveal trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for cinematic scaling and text displacement
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax (restrained and subtle)
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (e.clientX / innerWidth - 0.5) * 20,
      y: (e.clientY / innerHeight - 0.5) * 20
    });
  };

  const albumCovers: Record<string, string> = {
    didar: ALBUMS.find(album => album.id === 'didar')!.coverImage,
    fuzao: '/assets/faye/faye_didar.png'
  };
  const carouselItems: CircularCarouselItem[] = [
    ...SEVEN_WORLDS.map((world) => ({
      id: world.id,
      src: albumCovers[world.id] || world.heroPhoto,
      alt: `王菲《${world.chineseTitle}》专辑视觉，${world.year}年`,
      title: `《${world.chineseTitle}》`,
      subtitle: `${world.title} · ${world.year}`,
      year: world.year,
      description: world.manifesto
    })),
    ...ALBUMS.filter(album => album.id === 'jiangai').map(album => ({
      id: album.id,
      src: album.coverImage,
      alt: `王菲《${album.title}》专辑视觉，${album.year}年`,
      title: `《${album.title}》`,
      subtitle: `${album.englishTitle} · ${album.year}`,
      year: album.year,
      description: album.manifesto
    }))
  ];

  const handleScrollToExhibition = () => {
    const el = document.getElementById('exhibition-cosmos-orbit');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculation for cover parallax and scroll effects
  const titleOpacity = Math.max(0, 1 - scrollY * 0.002);
  const titleTranslateY = scrollY * 0.4;

  // Staggered letters for FAYE WONG title (字母出现时间不一样)
  const fayeLetters = [
    { char: 'F', rot: '-1deg', delay: 0.1, y: 0 },
    { char: 'A', rot: '0deg', delay: 0.22, y: 6 },
    { char: 'Y', rot: '1deg', delay: 0.35, y: -4, highlight: true },
    { char: 'E', rot: '-2deg', delay: 0.48, y: 2 }
  ];

  const wongLetters = [
    { char: 'W', rot: '0deg', delay: 0.62, y: 0 },
    { char: 'O', rot: '2deg', delay: 0.74, y: 8 },
    { char: 'N', rot: '-2deg', delay: 0.86, y: -2 },
    { char: 'G', rot: '1deg', delay: 0.98, y: 4, highlight: true }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="home-unified relative isolate w-full min-h-screen bg-transparent text-zinc-100 select-none"
    >
      <div className="home-unified__background pointer-events-none relative z-0" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentCover.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="home-unified__slide"
            style={{ '--photo-ratio': backgroundRatios[currentCover.path] ?? 0 } as React.CSSProperties}
          >
            <img
              src={currentCover.path}
              alt=""
              className="home-unified__photo"
              draggable={false}
              fetchPriority="high"
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                if (!naturalWidth) return;
                setBackgroundRatios(previous => ({
                  ...previous,
                  [currentCover.path]: naturalHeight / naturalWidth
                }));
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="home-unified__shade absolute inset-0" />
      </div>

      <div className="home-unified__content relative z-10 w-full min-w-0">
      {/* ========================================================================= */}
      {/* SECTION 1: IMMERSIVE CONTINUOUSLY ROTATING COVER (首页背景图不停切换) */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-transparent">

        {/* Top Editorial Ribbon */}
        <div 
          className="relative z-20 flex items-center justify-between border-b border-white/15 pb-4"
          style={{ opacity: titleOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4f43b] animate-ping" />
            <span className="font-mono-code text-[11px] sm:text-xs text-[#d4f43b] tracking-[0.25em] uppercase font-bold">
              FAYE WONG / EIGHT WORLDS · 摄影漫游
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-code text-zinc-300">
            <span className="hidden sm:inline text-zinc-500">COVER CURATION:</span>
            <span className="text-white font-bold">{currentCover.era}</span>
            <span className="text-zinc-600">·</span>

            {/* Quick Hero Indicator / Pause Switch */}
            <div className="flex items-center gap-1.5 ml-2">
              <span className="font-mono-code text-[10px] text-white/75 tabular-nums">
                {String(activeCoverIdx + 1).padStart(2, '0')} / {String(coverMasters.length).padStart(2, '0')}
              </span>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                title={isAutoPlaying ? '暂停轮播' : '继续自动轮播'}
                className="ml-2 p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {isAutoPlaying ? <Pause className="w-3 h-3 text-[#d4f43b]" /> : <Play className="w-3 h-3 text-zinc-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Center: Layered Magazine Editorial Title (wong的g绝不在第二排，单行不折行 + 字母独立时间淡入) */}
        <div 
          className="relative z-20 my-auto py-8 max-w-6xl w-full"
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4 - titleTranslateY}px, 0)`,
            opacity: titleOpacity,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <div className="font-mono-code text-xs sm:text-sm tracking-[0.45em] text-zinc-400 uppercase mb-3 flex items-center gap-4">
            <span className="text-white font-bold">1994 — 2003</span>
            <span>·</span>
            <span className="text-[#d4f43b]">WONG KAR-WAI CINEMATIC ATMOSPHERE</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">AVANT-GARDE FASHION</span>
          </div>

          {/* FAYE WONG SINGLE LINE (whitespace-nowrap 绝不折行，各字母独立延时出现) */}
          <div className="w-full overflow-hidden">
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-black tracking-tight text-white leading-none drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)] whitespace-nowrap flex items-center select-none">
              
              {/* FAYE */}
              <span className="inline-flex items-center">
                {fayeLetters.map((l, i) => (
                  <motion.span
                    key={`faye_${l.char}_${i}`}
                    initial={{ opacity: 0, y: 24, rotate: -4 }}
                    animate={{ opacity: 1, y: l.y, rotate: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: l.delay,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${l.highlight ? 'text-[#d4f43b]' : 'text-white'}`}
                  >
                    {l.char}
                  </motion.span>
                ))}
              </span>

              {/* Slash Divider */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-white/40 mx-2 sm:mx-4 font-light text-4xl sm:text-6xl md:text-8xl inline-block"
              >
                /
              </motion.span>

              {/* WONG - All letters locked together on the exact same row */}
              <span className="inline-flex items-center">
                {wongLetters.map((l, i) => (
                  <motion.span
                    key={`wong_${l.char}_${i}`}
                    initial={{ opacity: 0, y: 24, rotate: 4 }}
                    animate={{ opacity: 1, y: l.y, rotate: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: l.delay,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${l.highlight ? 'text-[#d4f43b]' : 'text-white'}`}
                  >
                    {l.char}
                  </motion.span>
                ))}
              </span>

            </h1>
          </div>

          <div className="pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/20 mt-4">
            <div>
              <div className="font-editorial text-2xl sm:text-4xl md:text-5xl font-medium tracking-[0.18em] text-zinc-200 uppercase">
                EIGHT WORLDS
              </div>
              <p className="font-editorial text-sm sm:text-base text-zinc-300 italic mt-2 tracking-wider max-w-xl">
                “THE MUSIC IS NOT JUST HEARD. IT IS INHABITED.”
              </p>
              <div className="text-xs font-mono-code text-[#d4f43b] mt-1">
                八张专辑 · 八个独立的数字艺术宇宙
              </div>
            </div>

            {/* Quick Jump Buttons */}
            <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs">
              <button
                onClick={handleScrollToExhibition}
                className="px-5 py-3 bg-[#d4f43b] hover:bg-[#c2e22f] text-black font-bold rounded-sm flex items-center gap-2 cursor-pointer shadow-2xl transition-all hover:scale-105"
              >
                <span>探索八大音乐宇宙</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>

              {onNavigateTab && (
                <>
                  <button
                    onClick={() => onNavigateTab('lyrics')}
                    className="px-4 py-3 bg-black/70 hover:bg-black border border-white/20 text-white rounded-sm flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:border-[#d4f43b] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#d4f43b]" />
                    <span>意象实验</span>
                  </button>
                </>
              )}

              <button
                onClick={() => onEnterInstallation('woaini_jiangai')}
                className="group flex items-center gap-2 border border-rose-200/30 bg-black/65 px-2.5 py-2 text-left text-xs text-zinc-200 backdrop-blur-md transition-colors hover:border-rose-200/80 hover:text-white"
              >
                <img src="/assets/aistudio/IMG_5432_ee2874af.jpeg" alt="" className="h-9 w-8 object-cover grayscale transition group-hover:grayscale-0" />
                <span>《我爱你》<span className="ml-1 text-[10px] text-rose-200/70">进入装置</span></span>
              </button>

            </div>
          </div>
        </div>

        {/* Bottom Editorial Caption & Scroll Indicator */}
        <div 
          className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4"
          style={{ opacity: titleOpacity }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{currentCover.title}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">{currentCover.credit}</span>
          </div>

          <button
            onClick={handleScrollToExhibition}
            className="flex items-center gap-2 text-zinc-300 hover:text-[#d4f43b] cursor-pointer transition-colors"
          >
            <span className="tracking-widest uppercase">向下漫游进入展览</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CURATORIAL MANIFESTO & SPATIAL UNIVERSE TRANSITION */}
      {/* ========================================================================= */}
      <section 
        id="exhibition-cosmos-orbit"
        className="relative z-10 w-full min-h-0 overflow-hidden pt-16 sm:pt-20 px-6 sm:px-12 pb-12 bg-transparent"
      >

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto space-y-4 mb-14">
          <div className="flex items-center gap-3 font-mono-code text-xs text-[#d4f43b] tracking-[0.3em] uppercase">
            <span>COSMIC ORBITS // 星系坐标</span>
            <span>·</span>
            <span>8 BESPOKE WORLDS</span>
          </div>
          <h2 className="font-poetic text-4xl sm:text-6xl text-white font-light tracking-wide">
            八个音乐宇宙 · 星系展厅
          </h2>
          <p className="font-poetic text-base sm:text-lg text-zinc-400 max-w-2xl font-light">
            位置更疏散、自由漂浮的专辑星系门户。悬停即可触发三维弹出与光晕聚焦。
          </p>
        </div>

        <div className="relative z-10 h-[620px] w-full sm:h-[720px]">
          <CircularCarousel
            items={carouselItems}
            preset="orbit"
            intro="assemble"
            cardWidth={260}
            aspectRatio={0.85}
            autoplay="drift"
            speed={5}
            draggable
            momentum={0.65}
            snap
            pauseOnHover
            focusOnClick
            parallax={0.35}
            stretch={0.2}
            depthFade={0.35}
            fadeColor="#08090d"
            cornerRadius={12}
            captions
            className="circular-carousel--albums"
            onChange={(index) => {
              setActiveCarouselIndex(index);
              const activeId = carouselItems[index]?.id;
              setHoveredWorld(SEVEN_WORLDS.find((world) => world.id === activeId) || null);
            }}
            onItemClick={(item, index) => {
              if (index !== activeCarouselIndex) {
                armedAlbumIndex.current = index;
                return;
              }
              if (armedAlbumIndex.current === index) {
                armedAlbumIndex.current = null;
                if (item.id) onEnterWorld(item.id);
              } else {
                armedAlbumIndex.current = index;
              }
            }}
          />
        </div>

        {/* Floating Inspection HUD */}
        <div className="relative z-10 max-w-7xl mx-auto my-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-400 border border-white/10 bg-[#07080a]/90 backdrop-blur-md px-6 py-4 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4f43b] animate-ping" />
            <span className="text-white font-bold">
              {hoveredWorld ? `EXPLORING: WORLD ${hoveredWorld.number} · 《${hoveredWorld.chineseTitle}》 (${hoveredWorld.year})` : '点击任意星系入口，直接跳跃至专属专辑宇宙'}
            </span>
          </div>

          {hoveredWorld && (
            <div className="text-zinc-300 font-editorial italic truncate max-w-md hidden md:block">
              “{hoveredWorld.manifesto}”
            </div>
          )}

          <div className="text-[11px] text-zinc-500">
            UNOFFICIAL ART ARCHIVE · 1994—2003
          </div>
        </div>

      </section>

      </div>
    </div>
  );
};
