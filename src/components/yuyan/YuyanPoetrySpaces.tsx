import { YuyanFuzzyLyric } from '../typography/YuyanFuzzyLyric';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Maximize2,
  Sparkles,
  Camera,
  Layers,
  ArrowLeftRight,
  Eye,
  Sliders,
  Compass,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';
import { fayeAudio } from '../../utils/audioSynthesizer';

// =========================================================================
// SPACE 01: 《新房客》 (New Tenant)
// 策展哲学入口：我能否真正理解你？
// 歌词（字字保留）：我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。
// 解读：比喻想要了解一个人却怎么都看不透。看见了世界，却无法看透一个人。
// =========================================================================
export const SpaceXinfangke: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  const [focusDistance, setFocusDistance] = useState<number>(0.35); // 0 = 看见世界(海啸与飞鸟), 1 = 凝视你(微笑与羽毛)
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPointerPos({ x, y });
  };

  const handleTriggerChime = () => {
    fayeAudio.playTrackPreview('yuyan_xinfangke', 220, 'trip_hop');
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={handleTriggerChime}
      className="relative w-full h-full min-h-[520px] flex flex-col justify-between p-6 sm:p-10 rounded-3xl overflow-hidden bg-[#070b14] border border-cyan-500/30 text-white select-none touch-none group"
    >
      {/* 1. Base Layer: Newspaper Dress & Camera Photo (IMG_5420) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/aistudio/IMG_5420_3984ad28.jpeg"
          alt="Faye Wong Fable New Tenant Artwork"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-75 scale-105"
        />

        {/* 2. Newspaper Halftone & CRT Scanlines */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-50 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)`
          }}
        />

        {/* 3. Dynamic Cognitive Light Cone (探照光圈：看见世界 vs 凝视你) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-75"
          style={{
            background: `radial-gradient(circle 240px at ${pointerPos.x}% ${pointerPos.y}%, rgba(56,189,248,0.35) 0%, rgba(14,165,233,0.1) 45%, rgba(0,0,0,0.85) 85%)`
          }}
        />

        {/* 4. Tsunami Wave & Bird Feather Overlay Simulation */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
          preserveAspectRatio="none"
        >
          {/* Tsunami Crests */}
          <path
            d={`M0,450 Q250,${300 + Math.sin(pointerPos.x * 0.1) * 40} 500,420 T1000,${380 + Math.cos(pointerPos.y * 0.1) * 30} L1000,600 L0,600 Z`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            opacity={1 - focusDistance * 0.6}
          />
          {/* Flying Birds Silhouette */}
          <g transform={`translate(${pointerPos.x * 7 + 100}, ${pointerPos.y * 2 + 50}) scale(0.6)`} opacity={1 - focusDistance}>
            <path d="M0,0 Q20,-20 40,0 Q60,-20 80,0" stroke="#7dd3fc" strokeWidth="2.5" fill="none" />
            <path d="M60,-30 Q80,-50 100,-30 Q120,-50 140,-30" stroke="#7dd3fc" strokeWidth="2" fill="none" />
          </g>
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Top Bar: Philosophical Entrance */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-cyan-600/30 border border-cyan-400/50 text-cyan-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
            01 ·《新房客》 空间入口
          </span>
          <span className="text-xs font-mono-code text-cyan-300 font-bold hidden sm:inline">
            问：我能否真正理解你？
          </span>
        </div>

        {/* Interactive Mode Slider */}
        <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-mono-code">
          <span className={focusDistance < 0.5 ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
            宏观海啸与飞鸟
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="新房客：宏观海啸与微观微笑焦距"
            value={focusDistance}
            onChange={(e) => setFocusDistance(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className={focusDistance >= 0.5 ? 'text-amber-300 font-bold' : 'text-zinc-500'}>
            微观微笑与羽毛
          </span>
        </div>
      </div>

      {/* Center: Exact Lyric Preserved Word-for-Word */}
      <div className="relative z-20 max-w-3xl my-auto py-8">
        <motion.div
          animate={{ x: [0, (focusDistance - 0.5) * 10, 0] }}
          className="space-y-4"
        >
          <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-cyan-400 block font-bold">
            EXACT ORIGINAL LYRIC // 原始文本保护
          </span>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"><YuyanFuzzyLyric text="我见过一场海啸 没见过你的微笑；我见过一只飞鸟，没见过你的羽毛。"/></h2>

          <div className="p-4 bg-black/60 rounded-xl border border-cyan-500/30 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-mono-code text-cyan-300 uppercase tracking-widest block font-bold">
              USER INTERPRETATION // 个人解读
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
              比喻想要了解一个人却怎么都看不透。看见了世界，却无法看透一个人。
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curatorial Strip */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：王菲 / 作词：林夕 / 编曲：张亚东</span>
        <span className="text-cyan-300">移动探照光圈 · 看透世界与无法穿透的亲密客体</span>
      </div>
    </div>
  );
};

// =========================================================================
// SPACE 02: 《彼岸花》 (Equinox Flower)
// 策展哲学入口：美丽是否必然与消逝相伴？
// 歌词（字字保留）：天黑 刷白了头发。
// 解读：太美的意境。极致极简、黑白光影、东方宿命感。
// =========================================================================
export const SpaceBihanhua: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  const [nightProgress, setNightProgress] = useState<number>(0.65); // 0 = Daylight, 1 = Pitch Black & Pure White Hair
  const [activeVisualTheme, setActiveVisualTheme] = useState<'rainbow_eyes' | 'daisy_halter'>('rainbow_eyes');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setNightProgress(progress);
  };

  const handleTriggerChime = () => {
    fayeAudio.playTrackPreview('yuyan_bihanhua', 246, 'ambient');
  };

  const currentBgSrc = activeVisualTheme === 'rainbow_eyes'
    ? '/assets/faye/yuyan-floating-eyes.jpg'
    : '/assets/aistudio/IMG_1626_52f07706.JPG';

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={handleTriggerChime}
      className="relative w-full h-full min-h-[520px] flex flex-col justify-between p-6 sm:p-10 rounded-3xl overflow-hidden bg-black border border-purple-500/30 text-white select-none touch-none group"
    >
      {/* 1. Base Layer: Authentic Iconic Fable Visuals (彩虹眼影 / 雏菊彼岸花) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={currentBgSrc}
          src={currentBgSrc}
          alt="Faye Wong Fable Artwork"
          className="bihanhua-living-eyes w-full h-full object-cover object-center transition-all duration-500"
          style={{
            filter: `hue-rotate(${nightProgress * 100 - 35}deg) saturate(145%) contrast(105%)`
          }}
        />

        {/* 2. Nightfall Ink Shadow Overlay (天黑) */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-150 pointer-events-none"
          style={{ opacity: nightProgress * 0.18 }}
        />

        {/* 3. Silver Hair Strands & Equinox Bloom Petals (刷白了头发 · 曼珠沙华) */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Silver Hair Ray Curves emerging across darkness */}
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M${200 + i * 45},0 Q${350 + i * 30},${250 + (i % 3) * 60} ${450 + i * 35},600`}
              fill="none"
              stroke="#ffffff"
              strokeWidth={1 + (i % 3) * 1.5}
              opacity={Math.max(0, (nightProgress - 0.2) * 1.25) * (0.4 + (i % 5) * 0.12)}
              className="transition-all duration-200"
            />
          ))}

          {/* Equinox Flower (曼珠沙华细长反卷花瓣) */}
          <g transform="translate(750, 420)" opacity={0.3 + nightProgress * 0.7}>
            <circle cx="0" cy="0" r="15" fill="#dc2626" opacity="0.6" filter="blur(6px)" />
            {Array.from({ length: 8 }).map((_, p) => (
              <path
                key={p}
                d={`M0,0 Q${Math.cos((p * Math.PI) / 4) * 80},${Math.sin((p * Math.PI) / 4) * 80} ${Math.cos((p * Math.PI) / 4) * 140},${Math.sin((p * Math.PI) / 4) * 120}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                opacity={0.8}
              />
            ))}
          </g>
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 pointer-events-none" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-purple-600/30 border border-purple-400/50 text-purple-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
            02 ·《彼岸花》 空间入口
          </span>
          <span className="text-xs font-mono-code text-purple-300 font-bold hidden sm:inline">
            问：美丽是否必然与消逝相伴？
          </span>
        </div>

        {/* Visual Switcher & Progress */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs font-mono-code">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVisualTheme('rainbow_eyes');
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeVisualTheme === 'rainbow_eyes'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              彩虹眼影封面
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveVisualTheme('daisy_halter');
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeVisualTheme === 'daisy_halter'
                  ? 'bg-purple-500 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              雏菊挂脖大片
            </button>
          </div>

          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono-code text-purple-200">
            <Moon className="w-3.5 h-3.5 text-purple-400" />
            <span>天黑白发沉浸度: {Math.round(nightProgress * 100)}%</span>
            <input aria-label="彼岸花：天黑白发进度" type="range" min="0" max="1" step="0.01" value={nightProgress} onPointerMove={e => e.stopPropagation()} onChange={e => setNightProgress(Number(e.target.value))} className="w-20 accent-purple-300" />
          </div>
        </div>
      </div>

      {/* Center: Exact Lyric Preserved Word-for-Word */}
      <div className="relative z-20 max-w-3xl my-auto py-8">
        <motion.div
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-purple-400 block font-bold">
            EXACT ORIGINAL LYRIC // 原始文本保护
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]"><YuyanFuzzyLyric text="天黑 刷白了头发。"/></h2>

          <div className="p-4 bg-black/60 rounded-xl border border-purple-500/30 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-mono-code text-purple-300 uppercase tracking-widest block font-bold">
              USER INTERPRETATION // 个人解读
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
              太美的意境。极致极简、黑白光影、东方宿命感。
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curatorial Strip */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：王菲 / 作词：林夕 / 编曲：张亚东</span>
        <span className="text-purple-300">滑动屏幕：感受黑夜执笔 · 时空在青丝之间瞬息白头</span>
      </div>
    </div>
  );
};

// =========================================================================
// SPACE 03: 《香奈儿》 (Chanel) - DESIGNER / MODEL
// 策展哲学入口：在爱与被爱之间，究竟是谁塑造了谁？
// 歌词（字字保留）：你是模特儿；我是香奈儿。
// 解读：设计与被设计；爱与被爱。
// 升级要求：照片从单张升级为真实的【王菲（设计者）】与【模特（被设计者）】双摄影切换与对峙！
//  - 王菲（设计者）：IMG_5419 卷发蛇纹衫，背靠巨幅相机镜头，掌控镜头与构图
//  - 模特（被设计者）：IMG_1624 高定雪纺透视上衣、繁复花卉裙与红色高跟鞋，斜倚地毯，纯正先锋时装模特姿态
// 交互：
//  1. 左右拖拽滑块切换王菲与模特的曝光比例与双重重影
//  2. 独立一键切换【王菲视角 · 设计者】与【模特视角 · 被设计者】
//  3. “设计与被设计”与“爱与被爱”两组文字随视角流动对调
//  4. 体验亲密关系中主动与被动、塑造者与被塑造者的双向流动
// =========================================================================
export const SpaceXiangnaier: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  // splitPos: 0 to 100 percentage. Default 50%
  const [splitPos, setSplitPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // View mode: 'split' | 'designer_focus' | 'model_focus'
  const [viewMode, setViewMode] = useState<'split' | 'designer_focus' | 'model_focus'>('split');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active identity state based on slider position or mode
  const activeRole = viewMode === 'designer_focus'
    ? 'designer'
    : viewMode === 'model_focus'
    ? 'model'
    : splitPos <= 50 ? 'designer' : 'model';

  const updateSplitFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    setSplitPos(pos);
    setViewMode('split');
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSplitFromClientX(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSplitFromClientX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Switch to Faye Designer perspective
  const handleSelectDesigner = () => {
    fayeAudio.playTrackPreview('yuyan_xiangnaier', 293, 'trip_hop');
    setViewMode('designer_focus');
    setSplitPos(85); // reveal almost all Designer
  };

  // Switch to Model perspective
  const handleSelectModel = () => {
    fayeAudio.playTrackPreview('yuyan_xiangnaier', 293, 'trip_hop');
    setViewMode('model_focus');
    setSplitPos(15); // reveal almost all Model
  };

  // Swap perspectives
  const handleToggleSwap = () => {
    fayeAudio.playTrackPreview('yuyan_xiangnaier', 293, 'trip_hop');
    if (activeRole === 'designer') {
      handleSelectModel();
    } else {
      handleSelectDesigner();
    }
  };

  // Reset to balanced split
  const handleResetSplit = () => {
    setViewMode('split');
    setSplitPos(50);
  };

  // Subtle mirror offset calculation
  const mirrorOffsetX = (splitPos - 50) * 0.45;
  const mirrorOffsetY = (splitPos - 50) * -0.25;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-full min-h-[580px] flex flex-col justify-between p-6 sm:p-10 rounded-3xl overflow-hidden bg-[#0a0712] border border-fuchsia-500/40 text-white select-none touch-none group"
    >
      {/* 1. Underlying Dual Fashion Photography Spaces (王菲 vs 模特) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* PHOTO A / LEFT REGION: 王菲 (设计者 / DESIGNER) —— IMG_5419 掌控镜头与蛇纹 */}
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-300"
          style={{
            clipPath: `inset(0 ${100 - splitPos}% 0 0)`,
            opacity: viewMode === 'model_focus' ? 0.35 : 1
          }}
        >
          <img
            src="/assets/aistudio/IMG_5419_b796a387.jpeg"
            alt="Faye Wong - The Designer"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-95 saturate-90 scale-105"
            style={{
              transform: `scale(${1.04 + (100 - splitPos) * 0.001}) translate(${mirrorOffsetX * 0.3}px, 0)`
            }}
          />
          {/* Camera Viewfinder Crosshair & Lens Grid (设计者取景框) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/70 via-black/20 to-transparent">
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-fuchsia-400/50 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-l-2 border-fuchsia-400" />
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
            </div>
            {/* Viewfinder Telemetry Overlay */}
            <div className="absolute top-8 left-8 font-mono-code text-[11px] text-fuchsia-300 space-y-1 bg-black/60 p-2.5 rounded-lg border border-fuchsia-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                <span className="font-bold">SUBJECT: 王菲 · 设计者 (CREATOR)</span>
              </div>
              <div className="text-zinc-400 text-[10px]">LENS: 80mm f/2.8 · ISO 400 · 掌控凝视</div>
            </div>
          </div>
        </div>

        {/* PHOTO B / RIGHT REGION: 模特 (被设计者 / MODEL) —— IMG_1624 高定解构纱衣、花卉长裙与红高跟鞋 */}
        <div
          className="absolute inset-0 overflow-hidden transition-all duration-300"
          style={{
            clipPath: `inset(0 0 0 ${splitPos}%)`,
            opacity: viewMode === 'designer_focus' ? 0.35 : 1
          }}
        >
          <img
            src="/assets/aistudio/IMG_1624_ebcad229.JPG"
            alt="The Model - Haute Couture Pose"
            className="w-full h-full object-cover object-center filter contrast-130 brightness-85 saturate-110 scale-105"
            style={{
              transform: `scale(1.06) translate(${-mirrorOffsetX * 0.8}px, ${mirrorOffsetY}px)`
            }}
          />
          {/* Haute Couture Runway Spotlight & Model Tag (被设计者光斑) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/75 via-fuchsia-950/30 to-transparent">
            <div className="absolute top-8 right-8 font-mono-code text-[11px] text-pink-300 space-y-1 bg-black/60 p-2.5 rounded-lg border border-pink-500/30 backdrop-blur-md text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="font-bold">SUBJECT: 模特 · 被设计者 (MODEL)</span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              </div>
              <div className="text-zinc-400 text-[10px]">HAUTE COUTURE · 红鞋与雪纺 · 呈现镜面</div>
            </div>
          </div>
        </div>

        {/* Subtle Double Exposure Overlap Zone Indicator */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none mix-blend-screen opacity-40"
          style={{
            left: `${Math.max(0, splitPos - 8)}%`,
            width: '16%',
            background: 'linear-gradient(to right, transparent, rgba(236,72,153,0.5), transparent)'
          }}
        />

        {/* Film Shimmer & Grain */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* 2. Interactive Draggable Split Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-30 w-10 -ml-5 flex items-center justify-center cursor-ew-resize group/divider touch-none"
        style={{ left: `${splitPos}%` }}
        onPointerDown={handlePointerDown}
        role="slider"
        tabIndex={0}
        aria-label="香奈儿：双重摄影分界"
        aria-valuemin={10}
        aria-valuemax={90}
        aria-valuenow={Math.round(splitPos)}
        onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setViewMode('split'); setSplitPos(value => Math.max(10, Math.min(90, value + (e.key === 'ArrowRight' ? 5 : -5)))); } }}
      >
        <div className="w-[3px] h-full bg-gradient-to-b from-fuchsia-400 via-white to-pink-500 shadow-[0_0_20px_rgba(244,114,182,0.9)]" />
        {/* Handle Knob with Dynamic Active Indicator */}
        <div className="absolute w-12 h-12 rounded-full bg-black/90 border-2 border-white shadow-2xl flex items-center justify-center text-white text-xs group-hover/divider:scale-110 transition-transform">
          <ArrowLeftRight className="w-5 h-5 text-fuchsia-300" />
        </div>
      </div>

      {/* Top Bar: Philosophical Entrance & Dual Identity Switchers */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-fuchsia-600/30 border border-fuchsia-400/50 text-fuchsia-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
            03 ·《香奈儿》 空间入口
          </span>
          <span className="text-xs font-mono-code text-fuchsia-300 font-bold hidden sm:inline">
            问：在爱与被爱之间，究竟是谁塑造了谁？
          </span>
        </div>

        {/* Real Dual-Photo Identity Switcher Tabs (王菲 vs 模特 视角切换) */}
        <div className="flex items-center gap-2 bg-black/85 backdrop-blur-md p-1.5 rounded-full border border-white/20">
          <button
            onClick={handleSelectDesigner}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeRole === 'designer' && viewMode !== 'split'
                ? 'bg-fuchsia-500 text-black font-bold shadow-[0_0_15px_rgba(217,70,239,0.5)]'
                : activeRole === 'designer'
                ? 'bg-fuchsia-950/80 text-fuchsia-200 border border-fuchsia-400/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>王菲视角 · 设计者</span>
          </button>

          <button
            onClick={handleToggleSwap}
            title="对调身份与文字"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-fuchsia-300 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSelectModel}
            className={`px-3 sm:px-4 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              activeRole === 'model' && viewMode !== 'split'
                ? 'bg-pink-500 text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : activeRole === 'model'
                ? 'bg-pink-950/80 text-pink-200 border border-pink-400/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>模特视角 · 被设计者</span>
          </button>

          {viewMode !== 'split' && (
            <button
              onClick={handleResetSplit}
              className="px-2.5 py-1 text-[11px] font-mono-code text-zinc-400 hover:text-white underline cursor-pointer"
            >
              对等分屏
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Swapping Concept Words (设计与被设计 / 爱与被爱 两组文字随视角流动动态对调) */}
      <div className="relative z-20 flex items-center justify-between font-mono-code text-xs sm:text-sm uppercase tracking-widest px-2 my-2">
        <motion.div
          animate={{
            x: activeRole === 'designer' ? 0 : 25,
            scale: activeRole === 'designer' ? 1.05 : 0.95,
            opacity: activeRole === 'designer' ? 1 : 0.6
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 text-fuchsia-300"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#f472b6]" />
          <span className="font-bold">
            {activeRole === 'designer' ? '【主体 · 掌控者】设计与被设计' : '【镜像 · 呼应者】爱与被爱'}
          </span>
        </motion.div>

        <motion.div
          animate={{
            x: activeRole === 'model' ? 0 : -25,
            scale: activeRole === 'model' ? 1.05 : 0.95,
            opacity: activeRole === 'model' ? 1 : 0.6
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 text-pink-300"
        >
          <span className="font-bold">
            {activeRole === 'model' ? '【主体 · 被塑者】爱与被爱' : '【镜像 · 被凝视】设计与被设计'}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />
        </motion.div>
      </div>

      {/* Center: Exact Lyric Preserved Word-for-Word */}
      <div className="relative z-20 max-w-3xl my-auto py-6">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-fuchsia-400 block font-bold">
              EXACT ORIGINAL LYRIC // 原始文本保护
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/40">
              当前视角：{activeRole === 'designer' ? '王菲（镜头掌控者）' : '模特（时装呈现者）'}
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]"><YuyanFuzzyLyric text="你是模特儿；我是香奈儿。"/></h2>

          <div className="p-4 sm:p-5 bg-black/75 rounded-2xl border border-fuchsia-500/40 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-code text-fuchsia-300 border-b border-white/10 pb-2">
              <span className="font-bold">USER INTERPRETATION // 个人解读</span>
              <span className="text-pink-400 font-bold tracking-wider">
                {activeRole === 'designer' ? '设计与被设计 ➔ 爱与被爱' : '爱与被爱 ➔ 设计与被设计'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
              不要只把《香奈儿》理解为消费主义、品牌崇拜或都市时尚。它更值得探索的是亲密关系中身份、角色与主动权的转换。用户可以通过交互体验关系中主动与被动角色的流动，体现两者之间复杂、相互塑造的关系。
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curatorial Strip */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：王菲 / 作词：林夕 / 编曲：张亚东</span>
        <span className="text-fuchsia-300">
          点击上方按钮切换【王菲 · 设计者】与【模特 · 被设计者】｜ 拖拽分界线体验双向镜像渗透
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// FULLSCREEN POETRY MODAL FOR 《寓言》 THREE SPACES
// (适配 iPhone Safari 安全区与独立全屏体验)
// =========================================================================
interface YuyanModalProps {
  songId: 'xinfangke' | 'bihanhua' | 'xiangnaier';
  onClose: () => void;
  onSelectSong: (songId: 'xinfangke' | 'bihanhua' | 'xiangnaier') => void;
}

export const YuyanPoetryModal: React.FC<YuyanModalProps> = ({ songId, onClose, onSelectSong }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 overflow-hidden select-none">
      
      {/* Top Floating Exit Button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-black/85 hover:bg-white text-white hover:text-black border border-white/30 rounded-full font-mono-code text-xs font-bold shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        title="退出全屏探索"
      >
        <X className="w-4 h-4" />
        <span>退出全屏 / EXIT SPACE</span>
      </button>

      {/* Bottom Song Navigation Tabs */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/85 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl">
        <button
          onClick={() => onSelectSong('xinfangke')}
          className={`px-3.5 py-1.5 rounded-full font-mono-code text-xs font-bold transition-all cursor-pointer ${
            songId === 'xinfangke'
              ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          01.《新房客》 海啸与微笑
        </button>
        <button
          onClick={() => onSelectSong('bihanhua')}
          className={`px-3.5 py-1.5 rounded-full font-mono-code text-xs font-bold transition-all cursor-pointer ${
            songId === 'bihanhua'
              ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          02.《彼岸花》 天黑与白发
        </button>
        <button
          onClick={() => onSelectSong('xiangnaier')}
          className={`px-3.5 py-1.5 rounded-full font-mono-code text-xs font-bold transition-all cursor-pointer ${
            songId === 'xiangnaier'
              ? 'bg-fuchsia-400 text-black shadow-[0_0_15px_rgba(232,121,249,0.5)]'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          03.《香奈儿》 设计与被设计
        </button>
      </div>

      {/* Modal Container Body */}
      <div className="w-full h-full max-w-7xl max-h-[92vh] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
        <AnimatePresence mode="wait">
          {songId === 'xinfangke' && (
            <motion.div
              key="modal_xinfangke"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full"
            >
              <SpaceXinfangke isFullscreen />
            </motion.div>
          )}

          {songId === 'bihanhua' && (
            <motion.div
              key="modal_bihanhua"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full"
            >
              <SpaceBihanhua isFullscreen />
            </motion.div>
          )}

          {songId === 'xiangnaier' && (
            <motion.div
              key="modal_xiangnaier"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full"
            >
              <SpaceXiangnaier isFullscreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
