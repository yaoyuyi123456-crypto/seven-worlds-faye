/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Compass, 
  Eye, 
  Volume2, 
  Wind, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Flower2,
  Droplets,
  Layers,
  Cigarette,
  Flame,
  ArrowRight
} from 'lucide-react';
import { fayeAudio } from '../../utils/audioSynthesizer';

interface PoetryModalProps {
  songId: 'lian' | 'sejie' | 'xiaocongming';
  onClose: () => void;
  onSelectSong: (songId: 'lian' | 'sejie' | 'xiaocongming') => void;
}

// =========================================================================
// REALISTIC SMOKE CANVAS FOR 《脸》第二页（抽烟抽象面孔与动态烟雾）
// =========================================================================
interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  vRot: number;
}

const RealisticSmokeCanvas: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: SmokeParticle[] = [];
    let animId: number;

    // Faye's lips/cigarette approximate position in IMG_5431: ~66% X, 68% Y
    const getOrigin = () => ({
      x: width * 0.64,
      y: height * 0.66
    });

    const createParticle = (): SmokeParticle => {
      const origin = getOrigin();
      return {
        x: origin.x + (Math.random() - 0.5) * 14,
        y: origin.y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.6 - 0.8, // drifts upwards and slightly leftwards
        vy: -0.9 - Math.random() * 1.4,
        size: 16 + Math.random() * 20,
        opacity: 0.05 + Math.random() * 0.15,
        life: 0,
        maxLife: 160 + Math.random() * 100,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02
      };
    };

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Spawn new smoke wisps continuously
      if (tick % 2 === 0 && particles.length < 85) {
        particles.push(createParticle());
        if (Math.random() < 0.5) particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(tick * 0.02 + p.y * 0.01) * 0.45;
        p.y += p.vy;
        p.size += 0.42; // smoke expands as it rises
        p.rotation += p.vRot;

        // Alpha calculation: fade in, then fade out slowly
        const progress = p.life / p.maxLife;
        let alpha = p.opacity;
        if (progress < 0.15) {
          alpha = p.opacity * (progress / 0.15);
        } else {
          alpha = p.opacity * (1 - (progress - 0.15) / 0.85);
        }

        if (progress >= 1 || p.y < -50 || p.x < -50 || p.x > width + 50) {
          particles.splice(i, 1);
          continue;
        }

        // Draw soft volumetric smoke plume
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const radGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        radGrad.addColorStop(0, `rgba(226, 232, 240, ${alpha * 0.9 * intensity})`);
        radGrad.addColorStop(0.35, `rgba(203, 213, 225, ${alpha * 0.6 * intensity})`);
        radGrad.addColorStop(0.7, `rgba(148, 163, 184, ${alpha * 0.25 * intensity})`);
        radGrad.addColorStop(1, 'rgba(148, 163, 184, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
};

// =========================================================================
// SPACE 01: 《脸》 (Face) - DUAL CINEMATIC PAGES
// 页面 1：不断演变那海岸线长出了最哀艳的水仙；（交互式海岸线与水仙绽放）
// 页面 2：我搁浅我却要继续冒险。（抽烟抽象的脸 IMG_5431，真实动态烟雾漂浮）
// =========================================================================
export const SpaceLian: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Page 1: Coastline & Narcissus; Page 2: Smoking Abstract Face & Continuing Adventure
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [bloomCount, setBloomCount] = useState<number>(8);
  const touchPosRef = useRef({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef<number | null>(null);

  // Coastline wave canvas for Page 1
  useEffect(() => {
    if (currentPage !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface FlowerPoint {
      x: number;
      y: number;
      scale: number;
      opacity: number;
      targetScale: number;
      hue: number;
    }
    const flowers: FlowerPoint[] = [];

    for (let i = 0; i < 8; i++) {
      flowers.push({
        x: width * (0.12 + i * 0.11),
        y: height * 0.52,
        scale: 0.2 + Math.random() * 0.4,
        opacity: 0.4 + Math.random() * 0.5,
        targetScale: 0.6 + Math.random() * 0.4,
        hue: 45 + Math.random() * 15
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const targetY = touchPosRef.current.y * height;
      const targetX = touchPosRef.current.x * width;

      // Deep Oceanic Twilight Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#02182b');
      bgGrad.addColorStop(0.5, '#073b4c');
      bgGrad.addColorStop(1, '#06202a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Waves along coastline
      for (let w = 0; w < 4; w++) {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const speed = (w + 1) * 0.015;
        const amplitude = 26 + w * 10;

        for (let x = 0; x <= width; x += 15) {
          const distToTouch = Math.abs(x - targetX);
          const touchInfluence = Math.max(0, 1 - distToTouch / 260) * (targetY - height * 0.5) * 0.45;

          const y = height * (0.52 + w * 0.08) +
            Math.sin(x * 0.008 + time * speed * 2 + w) * amplitude +
            Math.cos(x * 0.015 - time) * (amplitude * 0.5) +
            touchInfluence;

          ctx.lineTo(x, y);

          // Spawn narcissus near touch
          if (distToTouch < 30 && Math.random() < 0.035 && flowers.length < 24) {
            flowers.push({
              x: x + (Math.random() - 0.5) * 20,
              y: y - 10,
              scale: 0.1,
              opacity: 0.1,
              targetScale: 0.8 + Math.random() * 0.5,
              hue: 45 + Math.random() * 20
            });
            setBloomCount(flowers.length);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = `rgba(${16 + w * 20}, ${120 + w * 30}, ${180 + w * 20}, ${0.28 - w * 0.05})`;
        ctx.strokeStyle = `rgba(186, 230, 253, ${0.7 - w * 0.15})`;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      }

      // Draw Narcissus Flowers
      flowers.forEach((flower) => {
        flower.scale += (flower.targetScale - flower.scale) * 0.04;
        flower.opacity += (0.9 - flower.opacity) * 0.04;

        ctx.save();
        ctx.translate(flower.x, flower.y);
        ctx.scale(flower.scale, flower.scale);
        ctx.globalAlpha = flower.opacity;

        // Stem
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(5, 25, 0, 45);
        ctx.stroke();

        // 6 White Delicate Petals
        for (let p = 0; p < 6; p++) {
          ctx.save();
          ctx.rotate((p * Math.PI) / 3 + Math.sin(time + flower.x) * 0.1);
          ctx.beginPath();
          ctx.ellipse(0, -18, 7, 18, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // Golden center
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${flower.hue}, 95%, 55%)`;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentPage]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    touchPosRef.current = { x, y };
  };

  const handleTriggerChime = () => {
    fayeAudio.playTrackPreview('track_lian', 261, 'dream_pop');
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-full min-h-[540px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-12 rounded-3xl overflow-hidden bg-[#031320] border border-sky-400/30 text-white select-none touch-none group"
    >
      {/* ------------------------------------------------------------- */}
      {/* PAGE 1 BACKGROUND: Interactive Coastline & Narcissus Flowers */}
      {/* ------------------------------------------------------------- */}
      {currentPage === 1 && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />
      )}

      {/* ------------------------------------------------------------- */}
      {/* PAGE 2 BACKGROUND: 抽烟抽象的脸 (IMG_5431) + 真实动态烟雾漂浮效果 */}
      {/* ------------------------------------------------------------- */}
      {currentPage === 2 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/aistudio/IMG_5431_cbb33e5c.jpeg"
            alt="Faye Wong Smoking Abstract Face"
            className="w-full h-full object-cover object-center filter contrast-125 brightness-85 saturate-95 scale-105"
          />
          {/* Moody Cinematic Vignette & Noir Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/70" />

          {/* REALISTIC RISING & CURLING SMOKE CANVAS */}
          <RealisticSmokeCanvas intensity={1.2} />

          {/* Analog Film Grain */}
          <div className="absolute inset-0 bg-film-grain opacity-35" />
        </div>
      )}

      {/* Top Bar: Editorial Badge & Page Switcher Tabs */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/25 border border-sky-400/50 text-sky-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
            01 ·《脸》 视觉诗歌空间
          </span>
          <span className="text-xs font-mono-code text-sky-300 font-bold hidden sm:inline">
            {currentPage === 1 ? 'PAGE 01 · 潮汐海岸与水仙' : 'PAGE 02 · 抽烟面孔与继续冒险'}
          </span>
        </div>

        {/* Cinematic Dual Page Tabs (拆开两页歌词，分别对应海岸与抽烟面孔) */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-full border border-white/20">
          <button
            onClick={() => {
              setCurrentPage(1);
              handleTriggerChime();
            }}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 1
                ? 'bg-sky-400 text-black font-bold shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>第一页 · 海岸水仙</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage(2);
              handleTriggerChime();
            }}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              currentPage === 2
                ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cigarette className="w-3.5 h-3.5 text-amber-500" />
            <span>第二页 · 抽烟冒险</span>
          </button>
        </div>
      </div>

      {/* Center: Split Distinct Lyrics for Each Page (绝不两页都一样，拆开来) */}
      <div className="relative z-20 max-w-3xl my-auto py-8">
        <AnimatePresence mode="wait">
          {currentPage === 1 ? (
            <motion.div
              key="page1_lyric"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-sky-400 block font-bold">
                PART 01 // 潮汐与水仙
              </span>

              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                不断演变那海岸线长出了最哀艳的水仙；
              </h2>

              <div className="p-4 bg-black/60 rounded-xl border border-sky-500/30 backdrop-blur-md space-y-1 max-w-xl">
                <span className="text-[10px] font-mono-code text-sky-300 uppercase tracking-widest block font-bold">
                  COASTLINE DYNAMICS // 潮汐触动
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                  轻触或滑动屏幕：潮汐随指尖起伏变形，清冷而哀艳的水仙花自波浪之中逐渐孕育绽放。
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="page2_lyric"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-amber-400 block font-bold">
                  PART 02 // 抽烟沉思与搁浅冒险
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
                我搁浅我却要继续冒险。
              </h2>

              <div className="p-4 bg-black/75 rounded-xl border border-amber-500/30 backdrop-blur-md space-y-1 max-w-xl">
                <span className="text-[10px] font-mono-code text-amber-300 uppercase tracking-widest block font-bold">
                  CINEMATIC SMOKE &amp; GAZE // 抽烟与迷幻烟雾
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                  王菲抽象抽烟面孔特写，青白冷光与烟圈在唇间缭绕升腾。即使情感搁浅于现实的迷惘雾气之中，孤绝的冒险旅程依然在眼波深处继续展开。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Curatorial Strip with Quick Flip Control */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：王菲 / 作词：林夕 / 编曲：周广斌</span>
        <button
          onClick={() => setCurrentPage(prev => (prev === 1 ? 2 : 1))}
          className="text-sky-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>{currentPage === 1 ? '翻至第二页：抽烟面孔与冒险' : '翻至第一页：海岸线与水仙'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// SPACE 02: 《色诫》 (Tempting Heart) - DUAL SPLIT PAGES
// 页面 1：不要以为眼角眉梢只是种点缀；（聚焦眼眸流转、金粉眼影与妆容）
// 页面 2：不要以为他的头发开不出蔷薇。（胶片重影与发丝盛开盛大蔷薇）
// =========================================================================
export const SpaceSejie: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [dragProgress, setDragProgress] = useState<number>(0.5);
  const [chromaticOffset, setChromaticOffset] = useState<number>(4);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setDragProgress(progress);
    setChromaticOffset(Math.abs(progress - 0.5) * 14 + 2);
  };

  const handleChime = () => {
    fayeAudio.playTrackPreview('track_sejie', 330, 'brit_rock');
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={handleChime}
      className="relative w-full h-full min-h-[540px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-12 rounded-3xl overflow-hidden bg-[#0c0507] border border-red-500/30 text-white select-none touch-none group"
    >
      {/* 1. Base Photographic Layer (Faye Portrait with Avant-garde Hair) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/aistudio/IMG_1634_002e42c6.JPG"
          alt="Faye Wong Editorial Portrait"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-75 scale-105"
        />

        {/* 2. Film Ghosting & Chromatic Aberration Layers */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-60 pointer-events-none transition-transform duration-75"
          style={{
            transform: `translate(${chromaticOffset}px, ${-chromaticOffset * 0.5}px)`,
            filter: 'hue-rotate(90deg) contrast(150%)'
          }}
        >
          <img
            src="/assets/aistudio/IMG_1634_002e42c6.JPG"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 3. Emerging Wild Roses in Hair Strands */}
        <svg
          viewBox="0 0 1000 700"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="roseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#991b1b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hair Roses: Highlighted particularly on Page 2 */}
          <g
            transform={`translate(320, 180) scale(${currentPage === 2 ? 0.6 + dragProgress * 0.8 : 0.3})`}
            opacity={currentPage === 2 ? 0.95 : 0.3}
            className="transition-all duration-300"
          >
            <circle cx="0" cy="0" r="45" fill="url(#roseGlow)" />
            <path d="M-20,-10 C-35,-35 0,-45 20,-20 C45,0 35,35 10,40 C-20,45 -35,20 -20,-10 Z" fill="#b91c1c" />
            <path d="M-10,-5 C-20,-20 0,-25 10,-10 C25,0 20,20 5,22 C-10,25 -20,10 -10,-5 Z" fill="#ef4444" />
            <circle cx="0" cy="0" r="6" fill="#fef08a" />
            <path d="M0,20 Q-30,80 -60,140 Q-80,180 -120,220" stroke="#15803d" strokeWidth="3" fill="none" />
          </g>

          <g
            transform={`translate(680, 240) scale(${currentPage === 2 ? 0.5 + dragProgress * 1.0 : 0.25})`}
            opacity={currentPage === 2 ? 0.95 : 0.25}
            className="transition-all duration-300"
          >
            <circle cx="0" cy="0" r="55" fill="url(#roseGlow)" />
            <path d="M-25,-15 C-45,-40 5,-55 25,-25 C55,0 45,45 15,50 C-25,55 -45,25 -25,-15 Z" fill="#991b1b" />
            <path d="M-15,-8 C-25,-25 0,-30 15,-15 C30,0 25,25 8,28 C-15,30 -25,15 -15,-8 Z" fill="#dc2626" />
            <circle cx="0" cy="0" r="8" fill="#fef08a" />
          </g>

          {/* Brow Shimmer Aura: Highlighted on Page 1 */}
          <g transform="translate(420, 280)" opacity={currentPage === 1 ? 0.9 : 0.35}>
            <ellipse cx="0" cy="0" rx="70" ry="15" fill="#f59e0b" opacity="0.4" filter="blur(8px)" />
            <circle cx="-30" cy="-5" r="4" fill="#ffffff" filter="blur(1px)" />
            <circle cx="30" cy="-5" r="4" fill="#ffffff" filter="blur(1px)" />
          </g>
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <span className="px-3 py-1 bg-red-600/30 border border-red-500/50 text-red-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
          02 ·《色诫》 视觉诗歌空间
        </span>

        {/* Dual Page Switcher */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-full border border-white/20">
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-red-500 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            第一页 · 眼角眉梢
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer ${
              currentPage === 2
                ? 'bg-red-500 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            第二页 · 发丝蔷薇
          </button>
        </div>
      </div>

      {/* Center: Split Distinct Lyrics */}
      <div className="relative z-20 max-w-3xl my-auto py-8">
        <AnimatePresence mode="wait">
          {currentPage === 1 ? (
            <motion.div
              key="sejie_p1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-red-400 block font-bold">
                PART 01 // 眼角眉梢的点缀
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                不要以为眼角眉梢只是种点缀；
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl">
                神色流转间的锋芒与冷傲，并非浮华装饰，而是洞察红尘的无声宣言。
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="sejie_p2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-rose-400 block font-bold">
                PART 02 // 发丝盛放的蔷薇
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                不要以为他的头发开不出蔷薇。
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl">
                左右滑动屏幕：胶片分色重影加剧，血红蔷薇从深黑发丝中破空绽放。
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：Adrian Chan / 作词：林夕 / 编曲：C.Y. Kong</span>
        <button
          onClick={() => setCurrentPage(prev => (prev === 1 ? 2 : 1))}
          className="text-red-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>{currentPage === 1 ? '翻至第二页：发丝开出蔷薇' : '翻至第一页：眼角眉梢点缀'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// SPACE 03: 《小聪明》 (Cleverness) - PHOTOREALISTIC LIQUID CAUSTIC METEOR
// 页面 1：把泪水看成流星，（真实折射透明液滴，拖拽划过留下发光真实流星尾焰）
// 页面 2：不言不语都是好风景。（流星划过沉淀转化为极具纵深与呼吸感的静谧星夜风景）
// =========================================================================
export const SpaceXiaocongming: React.FC<{ isFullscreen?: boolean }> = ({ isFullscreen = false }) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  interface LiquidDroplet {
    id: number;
    x: number;
    y: number;
    radius: number;
    wobble: number;
    wobbleSpeed: number;
    isStreaking: boolean;
    streakProgress: number;
    streakOrigin: { x: number; y: number };
    streakTarget: { x: number; y: number };
  }

  const dropletsRef = useRef<LiquidDroplet[]>([
    { id: 1, x: 0.22, y: 0.32, radius: 24, wobble: 0, wobbleSpeed: 0.05, isStreaking: false, streakProgress: 0, streakOrigin: { x: 0, y: 0 }, streakTarget: { x: 0, y: 0 } },
    { id: 2, x: 0.45, y: 0.24, radius: 28, wobble: 0.5, wobbleSpeed: 0.04, isStreaking: false, streakProgress: 0, streakOrigin: { x: 0, y: 0 }, streakTarget: { x: 0, y: 0 } },
    { id: 3, x: 0.68, y: 0.38, radius: 20, wobble: 1.2, wobbleSpeed: 0.06, isStreaking: false, streakProgress: 0, streakOrigin: { x: 0, y: 0 }, streakTarget: { x: 0, y: 0 } },
    { id: 4, x: 0.78, y: 0.28, radius: 26, wobble: 2.1, wobbleSpeed: 0.045, isStreaking: false, streakProgress: 0, streakOrigin: { x: 0, y: 0 }, streakTarget: { x: 0, y: 0 } },
    { id: 5, x: 0.36, y: 0.55, radius: 22, wobble: 1.8, wobbleSpeed: 0.055, isStreaking: false, streakProgress: 0, streakOrigin: { x: 0, y: 0 }, streakTarget: { x: 0, y: 0 } }
  ]);

  const [landscapeSerenity, setLandscapeSerenity] = useState<number>(0.2);

  // Realistic Fluid Teardrop & Meteor Physics Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }
    const sparks: Spark[] = [];
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Atmospheric Night Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (currentPage === 1) {
        skyGrad.addColorStop(0, '#040714');
        skyGrad.addColorStop(0.6, '#09152e');
        skyGrad.addColorStop(1, '#050a16');
      } else {
        // Serene Tranquil Landscape Atmosphere for Page 2
        skyGrad.addColorStop(0, '#060d24');
        skyGrad.addColorStop(0.5, '#13285c');
        skyGrad.addColorStop(0.85, '#2e1d4d');
        skyGrad.addColorStop(1, '#090514');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars and Celestial Dust
      for (let s = 0; s < 40; s++) {
        const sx = ((s * 137.5) % width);
        const sy = ((s * 93.3) % (height * 0.7));
        const sSize = (s % 3 === 0) ? 2 : 1;
        const twinkle = Math.sin(Date.now() * 0.003 + s) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(226, 232, 240, ${twinkle * (currentPage === 2 ? 0.9 : 0.6)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // If Page 2: Draw the quiet serene distant mountain landscape
      if (currentPage === 2) {
        // Distant gentle rolling hills
        ctx.fillStyle = '#0a1024';
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.quadraticCurveTo(width * 0.25, height * 0.72, width * 0.5, height * 0.78);
        ctx.quadraticCurveTo(width * 0.75, height * 0.84, width, height * 0.75);
        ctx.lineTo(width, height);
        ctx.fill();

        // Foreground Serene Horizon Shore
        ctx.fillStyle = '#050712';
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.quadraticCurveTo(width * 0.4, height * 0.85, width, height * 0.88);
        ctx.lineTo(width, height);
        ctx.fill();

        // Water reflection glow
        const waterGrad = ctx.createLinearGradient(0, height * 0.85, 0, height);
        waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
        waterGrad.addColorStop(1, 'rgba(10, 15, 30, 0.8)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, height * 0.85, width, height * 0.15);
      }

      // 3. Render Liquid Droplets and Meteor Streaks
      dropletsRef.current.forEach((d) => {
        d.wobble += d.wobbleSpeed;

        if (d.isStreaking) {
          d.streakProgress += 0.035;

          const currentX = d.streakOrigin.x + (d.streakTarget.x - d.streakOrigin.x) * d.streakProgress;
          const currentY = d.streakOrigin.y + (d.streakTarget.y - d.streakOrigin.y) * d.streakProgress;

          // Draw High-Velocity Meteor Flame & Light Tail
          const tailX = currentX - (d.streakTarget.x - d.streakOrigin.x) * 0.35;
          const tailY = currentY - (d.streakTarget.y - d.streakOrigin.y) * 0.35;

          const tailGrad = ctx.createLinearGradient(currentX, currentY, tailX, tailY);
          tailGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          tailGrad.addColorStop(0.2, 'rgba(125, 211, 252, 0.9)');
          tailGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.4)');
          tailGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');

          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 4.5;
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Core burning head
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Emit realistic fiery sparks
          if (Math.random() < 0.6) {
            sparks.push({
              x: currentX,
              y: currentY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 0,
              maxLife: 25 + Math.random() * 20,
              color: Math.random() < 0.5 ? '#e0f2fe' : '#7dd3fc'
            });
          }

          if (d.streakProgress >= 1) {
            d.isStreaking = false;
            d.streakProgress = 0;
            d.x = 0.15 + Math.random() * 0.7;
            d.y = 0.2 + Math.random() * 0.45;
            setLandscapeSerenity(prev => Math.min(1, prev + 0.25));
          }
        } else {
          // Render Realistic 3D Caustic Glass Liquid Droplet
          const px = d.x * width;
          const py = d.y * height;
          const rx = d.radius + Math.sin(d.wobble) * 1.5;
          const ry = d.radius + Math.cos(d.wobble) * 1.5;

          // Droplet Shadow & ambient occlusion
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 5;

          // Outer Refractive Caustic Rim
          const dropGrad = ctx.createRadialGradient(px - rx * 0.3, py - ry * 0.3, 2, px, py, rx);
          dropGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
          dropGrad.addColorStop(0.35, 'rgba(186, 230, 253, 0.35)');
          dropGrad.addColorStop(0.75, 'rgba(14, 165, 233, 0.15)');
          dropGrad.addColorStop(0.95, 'rgba(2, 132, 199, 0.45)');
          dropGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');

          ctx.fillStyle = dropGrad;
          ctx.beginPath();
          ctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Glass Specular Glint (Top-left high sheen)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.ellipse(px - rx * 0.35, py - ry * 0.35, rx * 0.25, ry * 0.15, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();

          // Bottom Secondary Caustic Reflection
          ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
          ctx.beginPath();
          ctx.ellipse(px + rx * 0.25, py + ry * 0.35, rx * 0.2, ry * 0.1, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Render Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.life++;
        sp.x += sp.vx;
        sp.y += sp.vy;
        const sAlpha = 1 - sp.life / sp.maxLife;
        if (sp.life >= sp.maxLife) {
          sparks.splice(s, 1);
          continue;
        }
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sAlpha;
        ctx.fillRect(sp.x, sp.y, 1.8, 1.8);
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentPage]);

  // Click / touch to trigger fluid droplet into burning shooting star
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    // Find nearest droplet
    const droplets = dropletsRef.current;
    let closestIndex = -1;
    let minDistance = 999;

    droplets.forEach((d, idx) => {
      if (d.isStreaking) return;
      const dx = d.x - clickX;
      const dy = d.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance && dist < 0.18) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== -1) {
      fayeAudio.playTrackPreview('track_xiaocongming', 440, 'dream_pop');
      const d = droplets[closestIndex];
      d.isStreaking = true;
      d.streakProgress = 0;
      d.streakOrigin = { x: d.x * rect.width, y: d.y * rect.height };
      d.streakTarget = {
        x: (d.x + 0.45 + Math.random() * 0.3) * rect.width,
        y: (d.y + 0.5 + Math.random() * 0.3) * rect.height
      };
    }
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-full min-h-[540px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-12 rounded-3xl overflow-hidden bg-[#040817] border border-cyan-400/30 text-white select-none touch-none group"
    >
      {/* Interactive Liquid Caustic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer z-0" />

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between flex-wrap gap-4">
        <span className="px-3 py-1 bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 font-mono-code text-[11px] font-bold rounded uppercase tracking-wider">
          03 ·《小聪明》 视觉诗歌空间
        </span>

        {/* Dual Page Switcher */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md p-1.5 rounded-full border border-white/20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer ${
              currentPage === 1
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            第一页 · 泪水与流星
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPage(2);
            }}
            className={`px-3.5 py-1.5 text-xs font-mono-code rounded-full transition-all cursor-pointer ${
              currentPage === 2
                ? 'bg-indigo-400 text-white font-bold shadow-[0_0_15px_rgba(129,140,248,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            第二页 · 静谧好风景
          </button>
        </div>
      </div>

      {/* Center: Split Distinct Lyrics */}
      <div className="relative z-20 max-w-3xl my-auto py-8">
        <AnimatePresence mode="wait">
          {currentPage === 1 ? (
            <motion.div
              key="xc_p1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-cyan-400 block font-bold">
                PART 01 // 泪水与流星
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                把泪水看成流星，
              </h2>
              <div className="p-4 bg-black/60 rounded-xl border border-cyan-500/30 backdrop-blur-md max-w-lg space-y-1">
                <span className="text-[10px] font-mono-code text-cyan-300 font-bold block uppercase tracking-wider">
                  PHYSICAL CAUSTIC DROPLETS // 真实透明液滴
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                  轻触画面中的透明液滴：液滴表面张力破裂，划破深空演化为一道逼真的燃烧流星轨迹。
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="xc_p2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <span className="text-[11px] font-mono-code tracking-[0.3em] uppercase text-indigo-300 block font-bold">
                PART 02 // 静默安宁的好风景
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                不言不语都是好风景。
              </h2>
              <div className="p-4 bg-black/60 rounded-xl border border-indigo-500/30 backdrop-blur-md max-w-lg space-y-1">
                <span className="text-[10px] font-mono-code text-indigo-200 font-bold block uppercase tracking-wider">
                  SERENE STARRY TRANQUILITY // 寂静山峦与水影
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                  流星滑落之后，深空沉淀为静默安宁的远山与水影星光。万般情绪在无声中化为辽阔风景。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-white/10 pt-4 flex-wrap gap-2">
        <span>作曲：柳重言 / 作词：林夕 / 编曲：Alex San</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentPage(prev => (prev === 1 ? 2 : 1));
          }}
          className="text-cyan-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>{currentPage === 1 ? '翻至第二页：不言不语好风景' : '翻至第一页：把泪水看成流星'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// FULLSCREEN POETRY MODAL (用于全屏深入交互)
// =========================================================================
export const PoetrySpaceModal: React.FC<PoetryModalProps> = ({ songId, onClose, onSelectSong }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 select-none overflow-hidden">
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-black/85 hover:bg-white text-white hover:text-black border border-white/30 rounded-full font-mono-code text-xs font-bold shadow-2xl transition-all cursor-pointer backdrop-blur-md"
      >
        <X className="w-4 h-4" />
        <span>退出全屏诗歌空间</span>
      </button>

      {/* Top Floating Song Switcher */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-mono-code">
        <button
          onClick={() => onSelectSong('lian')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            songId === 'lian' ? 'bg-sky-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          01 ·《脸》
        </button>
        <button
          onClick={() => onSelectSong('sejie')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            songId === 'sejie' ? 'bg-red-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          02 ·《色诫》
        </button>
        <button
          onClick={() => onSelectSong('xiaocongming')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            songId === 'xiaocongming' ? 'bg-cyan-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          03 ·《小聪明》
        </button>
      </div>

      <div className="w-full max-w-6xl h-[92vh] flex items-center justify-center">
        {songId === 'lian' && <SpaceLian isFullscreen />}
        {songId === 'sejie' && <SpaceSejie isFullscreen />}
        {songId === 'xiaocongming' && <SpaceXiaocongming isFullscreen />}
      </div>
    </div>
  );
};
