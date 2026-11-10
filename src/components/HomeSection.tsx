import React from 'react';
import { ArrowUpRight, Disc3, Radio, Sparkles, BookOpen, Layers, Terminal, ChevronRight, Music } from 'lucide-react';
import { ALBUMS } from '../data/fayeArchive';

interface HomeSectionProps {
  onNavigate: (tab: string, param?: string) => void;
  onPlayTrack: (trackId: string, rootFreq?: number, ambientType?: string) => void;
  isPlaying: boolean;
  currentTrackId: string | null;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  onPlayTrack,
  isPlaying,
  currentTrackId
}) => {
  return (
    <div className="relative min-h-screen pb-24 text-zinc-100 overflow-hidden">
      
      {/* Faye Wong Atmospheric Full Photographic Backdrop with Dark Vignette Scrim */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none scale-105 transition-all duration-1000"
        style={{
          backgroundImage: "url('/assets/faye/faye_didar.png')",
          filter: 'grayscale(60%) contrast(120%) blur(1px)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0e]/80 via-[#0b0c0e]/95 to-[#0b0c0e] pointer-events-none" />
      <div className="absolute inset-0 bg-film-grain opacity-40 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

      {/* Kinetic Lyric Marquee Ribbon Top (100% Verified Authentic Lyrics) */}
      <div className="border-y border-zinc-800 bg-[#0e1014]/90 backdrop-blur-sm overflow-hidden py-2 select-none relative z-10">
        <div className="animate-marquee font-mono-code text-[11px] tracking-widest text-zinc-400 uppercase flex items-center gap-8 whitespace-nowrap">
          <span className="text-[#d4f43b]">● FAYE WONG DIGITAL ARCHIVE</span>
          <span>「不要偷看你一秒 是害怕突然会偷笑 叫灵魂出窍 出窍 出窍」</span>
          <span className="text-[#10b981]">/ 1995 Di-Dar</span>
          <span>「有时候 有时候 我会相信一切有尽头 没有什么会永垂不朽」</span>
          <span className="text-[#fb923c]">/ 1998 红豆</span>
          <span>「每只蚂蚁 都有眼睛鼻子 它美不美丽 偏差有没有一毫厘 有何关系」</span>
          <span className="text-[#ec4899]">/ 1999 开到荼蘼</span>
          <span>「一面笑的天真无邪 一面看破一切 守著一个人的世界 流著两个人的血」</span>
          <span className="text-[#d4f43b]">/ 1996 分裂</span>
          <span>「我见过 一场海啸 没看过 你的微笑 一切很好 不缺烦恼」</span>
          <span className="text-[#818cf8]">/ 2000 新房客</span>
          <span>「时间是怎么样爬过了我皮肤 只有我自己最清楚」</span>
          <span className="text-[#818cf8]">/ 2000 笑忘书</span>
          <span>「坐你的车 听你的歌 假装我们 只是普通乘客」</span>
          <span className="text-[#f43f5e]">/ 2003 乘客</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-14 relative z-10">
        
        {/* Curatorial Header & Visual Wordmark with Faye Wong Authentic Photographic Hero Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono-code text-zinc-400">
              <span className="px-2 py-0.5 border border-[#d4f43b]/40 text-[#d4f43b] bg-[#d4f43b]/5">
                EXHIBITION NO. 01
              </span>
              <span>HONG KONG · BEIJING · 1990—2026</span>
              <span>·</span>
              <span className="text-zinc-500">AUTHENTIC PHOTOGRAPHY ARCHIVE</span>
            </div>

            <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]">
              FAYE <span className="text-[#d4f43b] text-acid-glow">/</span> 王菲
            </h1>

            <p className="font-editorial text-lg md:text-2xl text-zinc-200 max-w-2xl leading-relaxed">
              一个关于王菲音乐、视觉美学与情绪体验的<span className="text-white underline decoration-[#d4f43b] underline-offset-4 font-semibold">交互式数字档案馆</span>。
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono-code text-zinc-400">
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-200">1990s Hong Kong</span>
              <span>×</span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-200">Experimental Editorial</span>
              <span>×</span>
              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-200">Digital Nostalgia</span>
            </div>
          </div>

          {/* Right Column: Hero Faye Wong Authentic Photo Frame */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 p-4 rounded-sm backdrop-blur-md relative overflow-hidden group">
            
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 mb-4 bg-black">
              {/* Actual Faye Wong Photograph from user attachment */}
              <img
                src="/assets/faye/faye_didar.png"
                alt="Faye Wong Di-Dar Photographic Archive"
                className="w-full h-full object-cover object-center filter grayscale-[20%] contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 left-2 text-[10px] font-mono-code px-2 py-0.5 bg-black/70 border border-white/20 text-[#d4f43b]">
                FIG. 01 // 1995 DI-DAR ARCHIVE
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="font-editorial text-sm font-bold text-white block">
                  《Di-Dar》蜷缩旧沙发 · 灵魂出窍写真
                </span>
                <span className="font-mono-code text-[10px] text-zinc-400">
                  PHOTOGRAPHY BY 夏永康 (WING SHYA) · 1995 CINEPOLY
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-code border-t border-zinc-800/80 pt-3">
              <span className="text-zinc-400">FEATURING: DI-DAR · 唱游 · 寓言 · 浮躁</span>
              <button
                onClick={() => onPlayTrack('didar_track', 220, 'trip_hop')}
                className="px-3 py-1 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isPlaying && currentTrackId === 'didar_track' ? '暂停 Di-Dar' : '试听《Di-Dar》'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* 8-Photo Montage Strip Banner */}
        <div className="mb-16 bg-[#131418] border border-zinc-800 p-4 rounded-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-mono-code text-zinc-400">
            <span className="flex items-center gap-1.5 text-[#d4f43b]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              PHOTOGRAPHIC GALLERY CHRONICLE // 1994—2003 经典视觉切片
            </span>
            <span className="text-zinc-500">WING SHYA · ZING · WILLIAM CHANG</span>
          </div>

          <div className="overflow-hidden rounded-sm border border-zinc-800 relative group">
            <img
              src="/assets/faye/faye_strip_banner.png"
              alt="Faye Wong Master Visual Timeline Strip"
              className="w-full h-auto object-cover filter contrast-105"
            />
          </div>
        </div>

        {/* The 3 Core Feature Showcase Highlighted in the User's Specification */}
        <div className="mb-20">
          <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3 mb-8">
            <h2 className="font-editorial text-2xl md:text-3xl font-bold tracking-wide text-white flex items-center gap-3">
              <span>三大核心交互维度</span>
              <span className="font-mono-code text-xs text-[#d4f43b] font-normal tracking-widest uppercase">
                / THREE CORE INTERACTION SPACES
              </span>
            </h2>
            <span className="text-xs font-mono-code text-zinc-500 hidden sm:inline">SELECT TO ENTER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: Discography Space */}
            <div 
              onClick={() => onNavigate('home')}
              className="group relative bg-[#131418] border border-zinc-800 hover:border-[#d4f43b]/80 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-4">
                  <span className="text-[#d4f43b]">01 // DISCOGRAPHY</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4f43b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#d4f43b] transition-colors mb-2">
                  专辑独立视觉空间
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  “不要简单地排列专辑封面。每张专辑都是一个独立的视觉空间。” 点击专辑后，网页的色彩、字体、排版与声响随之彻底异变。
                </p>

                <div className="space-y-1.5 text-[11px] font-mono-code text-zinc-400 border-t border-zinc-800/80 pt-3">
                  <div className="flex justify-between">
                    <span>《Di-Dar》(1995)</span>
                    <span className="text-[#10b981]">英伦Trip-Hop · 灵魂出窍</span>
                  </div>
                  <div className="flex justify-between">
                    <span>《唱游》(1998)</span>
                    <span className="text-orange-400">晒伤彩妆 · 鲜艳拼贴</span>
                  </div>
                  <div className="flex justify-between">
                    <span>《寓言》(2000)</span>
                    <span className="text-indigo-400">冷峻 · 梦幻 · 太空超现实</span>
                  </div>
                  <div className="flex justify-between">
                    <span>《浮躁》(1996)</span>
                    <span className="text-[#d4f43b]">自由抽象 · 实验精神</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono-code text-zinc-400 group-hover:text-white">
                <span>进入八大唱片空间</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 2: Mood Player (AI Native) */}
            <div 
              onClick={() => onNavigate('mood')}
              className="group relative bg-[#131418] border border-zinc-800 hover:border-[#d4f43b]/80 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-4">
                  <span className="text-[#d4f43b]">02 // SONG INSTALLATIONS</span>
                  <div className="flex items-center gap-1 text-[10px] bg-[#d4f43b]/10 text-[#d4f43b] px-2 py-0.5 border border-[#d4f43b]/30">
                    <Sparkles className="w-3 h-3" />
                    <span>AI NATIVE</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#d4f43b] transition-colors mb-2">
                  歌曲意象装置
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  从专辑或视觉元素进入歌曲装置，让歌词、照片与动态意象组成彼此独立的空间。
                </p>

                <div className="space-y-1.5 text-[11px] font-mono-code text-zinc-400 border-t border-zinc-800/80 pt-3">
                  <div className="flex justify-between">
                    <span>只爱陌生人</span>
                    <span className="text-zinc-200">开到荼靡 · 催眠</span>
                  </div>
                  <div className="flex justify-between">
                    <span>浮躁</span>
                    <span className="text-zinc-200">野三坡 · 堕落</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Di-Dar</span>
                    <span className="text-zinc-200">假期</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono-code text-zinc-400 group-hover:text-white">
                <span>进入歌词意象装置</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 3: Visual Archive */}
            <div 
              onClick={() => onNavigate('visual')}
              className="group relative bg-[#131418] border border-zinc-800 hover:border-[#d4f43b]/80 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-4">
                  <span className="text-[#d4f43b]">03 // VISUAL ARCHIVE</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4f43b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#d4f43b] transition-colors mb-2">
                  视觉美学档案
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  实验性杂志排版 + 复古数字界面的设计语言。深入研究90年代另类时尚、夏永康胶片摄影、阿Zing妆容革命与香港流行文化交汇。
                </p>

                <div className="space-y-1.5 text-[11px] font-mono-code text-zinc-400 border-t border-zinc-800/80 pt-3">
                  <div className="flex justify-between">
                    <span>1995 Di-Dar</span>
                    <span className="text-[#10b981]">迷离短发旧沙发</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1998 唱游</span>
                    <span className="text-orange-300">亚洲晒伤妆先河</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1999 只爱陌生人</span>
                    <span className="text-pink-300">Helmut Lang漆皮</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono-code text-zinc-400 group-hover:text-white">
                <span>浏览视觉画廊与色板</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Discography Strip: Featuring Real Cropped Photos */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-editorial text-xl font-bold text-white">八大纪元唱片空间</h3>
              <p className="text-xs text-zinc-400 font-mono-code">CLICK ALBUM TO TRANSFORM VISUAL SPACE WITH AUTHENTIC FAYE PHOTOGRAPHS</p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-mono-code text-[#d4f43b] hover:underline"
            >
              RETURN TO HOME →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {ALBUMS.map((alb) => (
              <div
                key={alb.id}
                onClick={() => onNavigate('home', alb.id)}
                className="group bg-[#15161a] border border-zinc-800 hover:border-[#d4f43b] p-3 rounded-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-square mb-2.5 rounded-sm overflow-hidden relative border border-zinc-800 bg-black">
                    <img
                      src={alb.coverImage}
                      alt={alb.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1.5 font-mono-code text-[10px] text-white/90 px-1 bg-black/60 rounded-xs">
                      '{alb.year.toString().slice(-2)}
                    </span>
                  </div>

                  <h4 className="font-editorial text-sm font-bold text-white group-hover:text-[#d4f43b] transition-colors truncate">
                    《{alb.title}》
                  </h4>
                  <p className="text-[10px] font-mono-code text-zinc-400 truncate">
                    {alb.englishTitle}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono-code text-zinc-500">
                  <span>{alb.tracks.length} 首代表作</span>
                  <span className="group-hover:text-[#d4f43b]">进入空间</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional 2 Modules Portals: Lyrics Lab & Faye AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          <div 
            onClick={() => onNavigate('lyrics')}
            className="p-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer flex items-start gap-4"
          >
            <div className="p-3 bg-zinc-800 rounded text-[#d4f43b] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 mb-1">
                <span>05 // LYRICS LAB</span>
                <span>·</span>
                <span className="text-zinc-200">歌词意象实验室</span>
              </div>
              <h4 className="font-editorial text-lg font-bold text-white mb-1.5">
                以核心词意象探索歌曲命题
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                解构林夕、黄伟文与王菲自作词的意象网络：蝴蝶、荼蘼、红豆、月亮、寒武纪与孤岛乘客。
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('ai')}
            className="p-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer flex items-start gap-4"
          >
            <div className="p-3 bg-zinc-800 rounded text-[#d4f43b] shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 mb-1">
                <span>06 // FAYE AI</span>
                <span>·</span>
                <span className="text-zinc-200">AI 音乐文化导览</span>
              </div>
              <h4 className="font-editorial text-lg font-bold text-white mb-1.5">
                与 AI 对话，探索作品之间的渊源
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                基于深度音乐文化知识库，与专属 AI 策展人探讨 Cocteau Twins、张亚东交响编制及王菲唱腔演进。
              </p>
            </div>
          </div>

        </div>

        {/* Curatorial Footnote */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-zinc-500 gap-4">
          <div>
            <span>FAYE WONG DIGITAL ARCHIVE · 非商业数字艺术档案工程</span>
          </div>
          <div className="flex items-center gap-4">
            <span>SOUNDTRACK ENGINE: WEB AUDIO API</span>
            <span>·</span>
            <span>AI: GEMINI-3.8-FLASH</span>
          </div>
        </div>

      </div>
    </div>
  );
};
