/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface PsychedelicWorldBackgroundProps {
  imageSrc: string;
  altText: string;
  themeColor?: string;
  overlayOpacity?: number;
  chromaticStrength?: 'subtle' | 'medium';
  vignetteStyle?: 'cinematic' | 'dream' | 'analog';
  children?: React.ReactNode;
}

export const PsychedelicWorldBackground: React.FC<PsychedelicWorldBackgroundProps> = ({
  imageSrc,
  altText,
  themeColor = '#d4f43b',
  overlayOpacity = 0.35,
  chromaticStrength = 'subtle',
  vignetteStyle = 'cinematic',
  children
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine compositional dynamic flavor based on photo source
  const isSmokingImage = imageSrc.includes('IMG_5431');
  const isGreenSphereImage = imageSrc.includes('193_bb0fb6f3') || imageSrc.includes('192_42caa072');
  const isSunburnRainbow = imageSrc.includes('IMG_1634') || imageSrc.includes('fable_rainbow');
  const isHorseMountain = imageSrc.includes('IMG_5388');

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black select-none">
      
      {/* 1. Underlying Deep Ambient Base */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-40 scale-110"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />

      {/* 2. Main Fullscreen Background Photo with Slow Breathing Zoom & Tilt */}
      <motion.div
        className="absolute inset-[-4%] w-[108%] h-[108%]"
        animate={{
          scale: [1, 1.035, 1.012, 1],
          rotate: [0, 0.35, -0.25, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          x: mouseOffset.x * 0.8,
          y: mouseOffset.y * 0.8
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.05]"
        />
      </motion.div>

      {/* 3. Subtle Chromatic Aberration & Prismatic Halo Layer (轻微动态迷幻效果) */}
      <motion.div
        className="absolute inset-[-4%] w-[108%] h-[108%] mix-blend-screen opacity-25 pointer-events-none"
        animate={{
          x: [0, 2, -1.5, 0],
          y: [0, -1.5, 2, 0],
          opacity: [0.18, 0.32, 0.22, 0.18]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          filter: `drop-shadow(2px 0px 0px cyan) drop-shadow(-2px 0px 0px magenta)`
        }}
      >
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter blur-[0.6px]"
        />
      </motion.div>

      {/* 4. Composition-Specific Tailored Dynamic Effects */}
      {/* (A) Smoke Waft / Haze if smoking image */}
      {isSmokingImage && (
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.2],
            y: [0, -25, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-300/10 to-transparent blur-2xl pointer-events-none"
        />
      )}

      {/* (B) Rainbow Prismatic dispersion if Sunburn / Rainbow eyeshadow */}
      {isSunburnRainbow && (
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            x: [-10, 15, -10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[500px] h-24 bg-gradient-to-r from-cyan-400/20 via-pink-400/20 to-amber-300/20 blur-3xl pointer-events-none"
        />
      )}

      {/* (C) Celestial Green Orbit Ring if Green Sphere */}
      {isGreenSphereImage && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-emerald-400/10 pointer-events-none"
        />
      )}

      {/* (D) Mountain Wind Haze if Yesanpo Horseback */}
      {isHorseMountain && (
        <motion.div
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-emerald-950/20 blur-xl pointer-events-none"
        />
      )}

      {/* 5. Dreamlike Aura Tint & Vignette Breathing */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [overlayOpacity, overlayOpacity + 0.1, overlayOpacity]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: vignetteStyle === 'analog'
            ? `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(10,12,10,0.78) 100%)`
            : `radial-gradient(circle at 50% 45%, rgba(0,0,0,0.1) 0%, rgba(5,6,8,0.72) 80%, rgba(0,0,0,0.92) 100%)`
        }}
      />

      {/* 6. 1990s Analog Film Grain & Subtle Light Drift */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '4px 4px'
        }}
      />

      {/* 7. Subtle Color Bloom on Corners */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {children}
    </div>
  );
};
