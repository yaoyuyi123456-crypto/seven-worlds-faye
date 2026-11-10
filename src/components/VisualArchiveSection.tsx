/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  Camera, 
  Sparkles, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  ZoomOut,
  Layers, 
  Volume2, 
  ArrowRight, 
  Terminal, 
  Compass, 
  Disc3,
  Sliders,
  Share2
} from 'lucide-react';
import { AUTHENTIC_FAYE_PHOTOS, ArchivePhoto } from '../data/visualArchiveData';

interface VisualArchiveSectionProps {
  onNavigateToWorld?: (worldId: string) => void;
  onPlayAmbientSound?: (freq: number, type: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const VisualArchiveSection: React.FC<VisualArchiveSectionProps> = ({
  onNavigateToWorld,
  onPlayAmbientSound,
  onNavigateToTab
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeChapter, setActiveChapter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivePhoto | null>(AUTHENTIC_FAYE_PHOTOS[0]);
  const [lightboxPhoto, setLightboxPhoto] = useState<ArchivePhoto | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pinnedPhotoIds, setPinnedPhotoIds] = useState<string[]>([
    'photo_d9e6', 
    'photo_img0958', 
    'photo_img1626', 
    'photo_img1634'
  ]);
  const [scrollY, setScrollY] = useState(0);

  // Horizontal gallery scroll reference
  const horizontalGalleryRef = useRef<HTMLDivElement | null>(null);

  // Scroll position listener for parallax and reveals
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxPhoto(null);
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto]);

  const categories = [
    { id: 'all', label: '全部作品 // ALL (24张珍藏)' },
    { id: 'fashion_editorial', label: '先锋时装 // FASHION' },
    { id: 'stage_concert', label: '舞台神迹 // STAGE' },
    { id: 'album_art', label: '唱片艺术 // ALBUM' },
    { id: 'cinema_polaroid', label: '暗房宝丽来 // POLAROID' },
    { id: 'personal_moment', label: '私密真我 // MOMENTS' },
  ];

  const chapters = [
    { id: 'all', title: '全景展廊', sub: 'ALL CHAPTERS' },
    { id: 'I_NINETIES_UNDERGROUND', title: '第一章：九十年代地下与先锋解构', sub: '1994—1996' },
    { id: 'II_CHANGYOU_COSMOS', title: '第二章：唱游天体与阿Zing神迹', sub: '1998—1999' },
    { id: 'III_CENTURY_TURNING', title: '第三章：跨世纪新篇与黑色电影', sub: '2000—2001' },
    { id: 'IV_INTIMATE_SOLITUDE', title: '第四章：私密定格与潮汐恬淡', sub: '1997—2003' },
  ];

  const filteredPhotos = AUTHENTIC_FAYE_PHOTOS.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesChapter = activeChapter === 'all' || p.chapter === activeChapter;
    return matchesCat && matchesChapter;
  });

  const togglePin = (photoId: string) => {
    if (pinnedPhotoIds.includes(photoId)) {
      setPinnedPhotoIds(pinnedPhotoIds.filter(id => id !== photoId));
    } else {
      setPinnedPhotoIds([...pinnedPhotoIds, photoId]);
    }
  };

  const handleNextLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[nextIndex]);
    setIsZoomed(false);
  };

  const handlePrevLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxPhoto(filteredPhotos[prevIndex]);
    setIsZoomed(false);
  };

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (!horizontalGalleryRef.current) return;
    const offset = direction === 'left' ? -480 : 480;
    horizontalGalleryRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-32 text-zinc-100 relative bg-[#08090c]">
      <div className="absolute inset-0 bg-film-grain opacity-40 pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. HEADER DECK: HIGH-CONTRAST EDITORIAL MAGAZINE HEADLINE */}
      {/* ========================================================================= */}
      <div className="border-b border-zinc-800 bg-[#0c0d12]/95 backdrop-blur-md px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4f43b] mb-3 tracking-[0.25em] uppercase">
            <Layers className="w-4 h-4" />
            <span>04 // VISUAL ARCHIVE · 1990S HONG KONG EXPERIMENTAL EXHIBITION</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
                王菲视觉美学动态画廊
              </h1>
              <p className="font-editorial text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed italic">
                “非对称杂志排版 + 纯正胶片质感。夏永康镜头下的迷离光影、张叔平美术指引、阿Zing晒伤妆容与王菲独一无二的先锋骨相。”
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono-code text-zinc-400 border-l border-zinc-800 pl-6 shrink-0">
              <div>
                <span className="block text-3xl font-editorial font-bold text-white leading-none mb-1">
                  {AUTHENTIC_FAYE_PHOTOS.length}
                </span>
                <span className="text-zinc-500 text-[10px] uppercase">原版视觉切片</span>
              </div>
              <div>
                <span className="block text-3xl font-editorial font-bold text-[#d4f43b] leading-none mb-1">
                  {pinnedPhotoIds.length}
                </span>
                <span className="text-zinc-500 text-[10px] uppercase">已收录展板</span>
              </div>
              <div>
                <span className="block text-3xl font-editorial font-bold text-white leading-none mb-1">
                  4
                </span>
                <span className="text-zinc-500 text-[10px] uppercase">展演历史篇章</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* 2. CURATORIAL CONTROLS: CHAPTER STRIP & CATEGORY FILTERS */}
        {/* ========================================================================= */}
        <div className="space-y-4 border-b border-zinc-800/80 pb-6">
          
          {/* Chapter Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-wider shrink-0 mr-2">
              CHAPTERS:
            </span>
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`px-3.5 py-2 rounded text-xs font-mono-code transition-all cursor-pointer whitespace-nowrap border ${
                  activeChapter === ch.id
                    ? 'border-[#d4f43b] bg-[#d4f43b] text-black font-bold shadow-[0_0_20px_rgba(212,244,59,0.2)]'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{ch.title}</span>
                <span className="ml-2 text-[10px] opacity-70">({ch.sub})</span>
              </button>
            ))}
          </div>

          {/* Medium / Category Filters */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pt-2">
            <div className="flex items-center gap-2 shrink-0">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-mono-code rounded border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === c.id
                      ? 'border-[#d4f43b] bg-[#d4f43b]/15 text-[#d4f43b] font-bold'
                      : 'border-zinc-800/80 text-zinc-400 hover:text-zinc-200 bg-zinc-950/40'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <span className="font-mono-code text-xs text-zinc-500 shrink-0 hidden md:inline">
              REGISTRY INDEX: {filteredPhotos.length} / {AUTHENTIC_FAYE_PHOTOS.length} EXHIBITS
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. HORIZONTAL PANORAMIC STRIP (横向滚动影像展廊 - 模拟实体摄影大展巡礼) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4f43b] animate-pulse" />
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white">
                横向摄影全景展厅 // HORIZONTAL PANORAMA WALK
              </h3>
              <span className="text-xs font-mono-code text-zinc-400 hidden sm:inline">
                (横向滚动长廊 · 模拟画廊漫游)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollHorizontal('left')}
                className="p-2 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                title="向左滚动展廊"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollHorizontal('right')}
                className="p-2 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                title="向右滚动展廊"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Carousel Strip */}
          <div
            ref={horizontalGalleryRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-2 scrollbar-thin scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {AUTHENTIC_FAYE_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative group shrink-0 w-72 sm:w-84 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-[#d4f43b] bg-zinc-950 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-96 overflow-hidden bg-black/60">
                  <img
                    src={photo.path}
                    alt={photo.chineseTitle}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-black/80 text-[#d4f43b] border border-[#d4f43b]/40">
                    {photo.era}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxPhoto(photo);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded bg-black/70 hover:bg-black text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    title="全屏检视"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="font-editorial text-lg font-bold text-white group-hover:text-[#d4f43b] transition-colors truncate">
                      {photo.chineseTitle}
                    </div>
                    <div className="text-[11px] font-mono-code text-zinc-400 truncate">
                      {photo.photographer}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-zinc-400 truncate max-w-[160px]">
                    🎵 {photo.ambientSignature.moodName}
                  </span>
                  <span className="text-[#d4f43b] flex items-center gap-1 group-hover:underline">
                    <span>查阅</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ASYMMETRIC EDITORIAL SPREAD (非对称画报展厅：大幅跨页、微漂浮与节奏留白) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Asymmetric Editorial Gallery (Col 7) */}
          <div className="lg:col-span-7 space-y-16">
            <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest flex items-center justify-between border-b border-zinc-800 pb-2">
              <span>EDITORIAL MOSAIC // 非对称画报流 (70%—90% 跨页与留白交替)</span>
              <span>SCROLL TO REVEAL</span>
            </div>

            {/* Alternating Rhythmic Flow */}
            <div className="space-y-20">
              {filteredPhotos.map((photo, idx) => {
                const isSelected = selectedPhoto?.id === photo.id;
                const isPinned = pinnedPhotoIds.includes(photo.id);
                const isWideHero = photo.layoutStyle === 'wide_hero';
                const isFloating = photo.layoutStyle === 'floating_detail';
                const isStaggeredLeft = photo.layoutStyle === 'staggered_left';
                const isStaggeredRight = photo.layoutStyle === 'staggered_right';

                // Controlled subtle parallax offset
                const parallaxOffset = (idx % 2 === 0 ? 1 : -1) * Math.sin(scrollY * 0.002 + idx) * 8;

                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`relative transition-all duration-700 cursor-pointer ${
                      isWideHero 
                        ? 'w-full md:w-[96%] mx-auto' 
                        : isFloating
                        ? 'w-full sm:w-[68%] ml-auto'
                        : isStaggeredLeft
                        ? 'w-full sm:w-[82%] mr-auto'
                        : 'w-full sm:w-[82%] ml-auto'
                    }`}
                    style={{
                      transform: `translate3d(0, ${parallaxOffset}px, 0)`
                    }}
                  >
                    {/* Outer Frame with Asymmetric Magazine Styling */}
                    <div 
                      className={`relative rounded-xl overflow-hidden border transition-all duration-500 group ${
                        isSelected
                          ? 'border-[#d4f43b] shadow-[0_0_40px_rgba(212,244,59,0.22)] ring-1 ring-[#d4f43b]'
                          : 'border-zinc-800/90 hover:border-zinc-500 bg-zinc-950/70'
                      }`}
                    >
                      {/* Photo Container */}
                      <div className="relative overflow-hidden bg-black">
                        <img
                          src={photo.path}
                          alt={photo.chineseTitle}
                          loading="lazy"
                          className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 filter ${
                            isWideHero 
                              ? 'max-h-[520px] md:max-h-[620px]' 
                              : 'max-h-[460px] md:max-h-[520px]'
                          }`}
                        />

                        {/* Analog Film Grain & Atmospheric Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 opacity-75 group-hover:opacity-50 transition-opacity" />

                        {/* Top Metadata Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded text-[11px] font-mono-code font-bold bg-black/80 text-[#d4f43b] border border-[#d4f43b]/40 backdrop-blur-md">
                              PLATE #{photo.id.replace('photo_', '').toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-black/60 text-zinc-300 border border-white/10 backdrop-blur-md hidden sm:inline">
                              {photo.era}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pointer-events-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxPhoto(photo);
                              }}
                              title="全屏高清展厅"
                              className="p-2 rounded bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePin(photo.id);
                              }}
                              title={isPinned ? '已收录于展板' : '收录至我的展板'}
                              className="p-2 rounded bg-black/70 hover:bg-black text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors"
                            >
                              {isPinned ? (
                                <BookmarkCheck className="w-3.5 h-3.5 text-[#d4f43b]" />
                              ) : (
                                <Bookmark className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Bottom Overlay Title & Poetic Line */}
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <p className="font-editorial text-sm sm:text-base text-zinc-300 italic mb-1 line-clamp-1 drop-shadow">
                            “{photo.quote}”
                          </p>
                          <div className="font-editorial text-2xl sm:text-3xl font-bold text-white group-hover:text-[#d4f43b] transition-colors">
                            {photo.chineseTitle}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Credits & Action Link Ribbons */}
                      <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
                        <div className="flex items-center gap-4 text-zinc-400">
                          <span>摄影：{photo.photographer}</span>
                          <span className="hidden sm:inline">妆容：{photo.makeup}</span>
                        </div>

                        {/* Fast Action Buttons */}
                        <div className="flex items-center gap-3">
                          {onPlayAmbientSound && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onPlayAmbientSound(photo.ambientSignature.rootFreq, photo.ambientSignature.type);
                              }}
                              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 hover:border-[#d4f43b] flex items-center gap-1.5 cursor-pointer transition-colors"
                              title="试听该画面对应的音乐氛围"
                            >
                              <Volume2 className="w-3 h-3 text-[#d4f43b]" />
                              <span>声学氛围</span>
                            </button>
                          )}

                          {onNavigateToWorld && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToWorld(photo.linkedWorldId);
                              }}
                              className="px-2.5 py-1 bg-[#d4f43b]/10 hover:bg-[#d4f43b]/20 text-[#d4f43b] rounded border border-[#d4f43b]/40 flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <span>跳入专辑宇宙</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Natural Color Swatch Palette Line */}
                      <div className="h-1.5 flex w-full">
                        {photo.palette.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1 h-full"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Archival Dossier & Curatorial AI Inspector (Col 5) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            {selectedPhoto ? (
              <div className="bg-[#0f1116] border-2 border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
                
                {/* Dossier Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div>
                    <span className="font-mono-code text-[10px] text-[#d4f43b] uppercase tracking-wider block">
                      ARCHIVAL DOSSIER // 档案编号 #{selectedPhoto.id.toUpperCase()}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                      {selectedPhoto.chineseTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => setLightboxPhoto(selectedPhoto)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono-code rounded text-zinc-200 border border-zinc-700 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#d4f43b]" />
                    <span>展厅全屏</span>
                  </button>
                </div>

                {/* Inspecting Image Preview */}
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black">
                  <img
                    src={selectedPhoto.path}
                    alt={selectedPhoto.chineseTitle}
                    className="w-full max-h-[380px] object-contain mx-auto"
                  />
                  <div className="p-3 bg-black/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                    <span>年代：{selectedPhoto.year}</span>
                    <span className="text-[#d4f43b]">{selectedPhoto.title}</span>
                  </div>
                </div>

                {/* Poetic Line */}
                <div className="p-4 bg-zinc-900/60 border-l-3 border-[#d4f43b] rounded-r-lg">
                  <p className="font-editorial text-base sm:text-lg text-zinc-100 italic leading-relaxed">
                    “{selectedPhoto.quote}”
                  </p>
                </div>

                {/* Curator Editorial Analysis */}
                <div className="space-y-2">
                  <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-wider block flex items-center justify-between">
                    <span>EDITORIAL CRITIQUE // 策展人评析</span>
                    <span className="text-[10px] text-zinc-500">非客观事实 · 策展审美解读</span>
                  </span>
                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {selectedPhoto.editorialNote}
                  </p>
                </div>

                {/* Credits Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono-code border-t border-zinc-800 pt-4">
                  <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">摄影 / PHOTOGRAPHY</span>
                    <span className="text-zinc-200 font-bold">{selectedPhoto.photographer}</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">美术指导 / ART DIRECTION</span>
                    <span className="text-zinc-200 font-bold">{selectedPhoto.artDirection}</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">妆容 / MAKEUP</span>
                    <span className="text-zinc-200 font-bold">{selectedPhoto.makeup}</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded border border-zinc-800/80">
                    <span className="text-zinc-500 block mb-1">声学氛围 / AMBIENT</span>
                    <span className="text-zinc-200 font-bold">{selectedPhoto.ambientSignature.moodName}</span>
                  </div>
                </div>

                {/* Color Spectrum */}
                <div className="space-y-2 border-t border-zinc-800 pt-4">
                  <span className="font-mono-code text-xs text-zinc-400 uppercase tracking-wider block">
                    COLOR PALETTE // 画面色彩取样
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedPhoto.palette.map((hex, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div
                          className="h-8 rounded border border-white/10 shadow-inner mb-1"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="font-mono-code text-[10px] text-zinc-500">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-Module Action Links */}
                <div className="space-y-2 border-t border-zinc-800 pt-4">
                  <div className="text-xs font-mono-code text-zinc-400 mb-2">
                    跨模块深度探索 // CROSS-MODULE CONNECTION
                  </div>

                  <div className="flex flex-col gap-2">
                    {onNavigateToWorld && (
                      <button
                        onClick={() => onNavigateToWorld(selectedPhoto.linkedWorldId)}
                        className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-white/20 hover:border-[#d4f43b] text-white rounded text-xs font-mono-code flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-[#d4f43b]" />
                          <span>探索对应专辑宇宙 (World: {selectedPhoto.linkedWorldId.toUpperCase()})</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#d4f43b]" />
                      </button>
                    )}

                    {onNavigateToTab && (
                      <button
                        onClick={() => onNavigateToTab('ai')}
                        className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-white/20 hover:border-sky-400 text-white rounded text-xs font-mono-code flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-sky-400" />
                          <span>向 AI 深入探讨该视觉时期的文化与摄影语境</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-500 font-mono-code text-xs">
                在左侧画报中点击选择一张照片进行深度调阅
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. FULLSCREEN IMMERSIVE LIGHTBOX MODAL (全屏沉浸式展厅检视) */}
      {/* ========================================================================= */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-fade-in select-none">
          
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[#d4f43b] text-black font-mono-code text-xs font-bold rounded">
                LIGHTBOX EXHIBITION
              </span>
              <span className="font-editorial text-lg sm:text-2xl font-bold">
                {lightboxPhoto.chineseTitle}
              </span>
              <span className="text-xs font-mono-code text-zinc-400 hidden sm:inline">
                ({lightboxPhoto.year} · {lightboxPhoto.era})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 bg-zinc-900/80 hover:bg-zinc-800 rounded text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                title={isZoomed ? '缩小回原画' : '放大检视局部细节'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-2 bg-zinc-900/80 hover:bg-zinc-800 rounded text-zinc-300 hover:text-white border border-white/10 cursor-pointer"
                title="退出展厅 (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 cursor-pointer z-20 transition-all hover:scale-110"
            title="上一张 (← 键盘左键)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/20 cursor-pointer z-20 transition-all hover:scale-110"
            title="下一张 (→ 键盘右键)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Showcase Image */}
          <div className="max-w-6xl max-h-[82vh] overflow-auto flex items-center justify-center p-2">
            <img
              src={lightboxPhoto.path}
              alt={lightboxPhoto.chineseTitle}
              className={`max-h-[75vh] w-auto object-contain transition-transform duration-500 rounded shadow-2xl ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>

          {/* Bottom Captions & Index */}
          <div className="absolute bottom-6 left-6 right-6 text-center text-xs font-mono-code text-zinc-400 pointer-events-none">
            <span className="text-zinc-200 font-editorial text-sm sm:text-base italic mr-4 drop-shadow">
              “{lightboxPhoto.quote}”
            </span>
            <span className="text-zinc-500">
              [{filteredPhotos.findIndex(p => p.id === lightboxPhoto.id) + 1} / {filteredPhotos.length}] · 键盘左右键翻页 · Esc 退出
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
