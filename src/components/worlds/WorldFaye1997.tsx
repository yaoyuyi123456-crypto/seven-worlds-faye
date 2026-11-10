import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';

interface WorldFaye1997Props {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
}

export const WorldFaye1997: React.FC<WorldFaye1997Props> = ({ onBackToCosmos, onSwitchWorld }) => {
  const world = SEVEN_WORLDS.find(w => w.id === 'faye1997')!;
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null);

  const toggleSoundscape = () => {
    if (isPlayingSoundscape) {
      fayeSoundscape.stop();
      setIsPlayingSoundscape(false);
    } else {
      fayeSoundscape.playWorldSoundscape('faye1997');
      setIsPlayingSoundscape(true);
    }
  };

  useEffect(() => {
    return () => fayeSoundscape.stop();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] relative overflow-x-hidden selection:bg-[#0f172a] selection:text-white">
      
      {/* 90s Minimalist Magazine Layout with Generous Whitespace */}
      <nav className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md border-b border-slate-300 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToCosmos}
          className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO COSMOS / 返回宇宙</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono-code">
          <span className="px-2 py-0.5 bg-black text-white font-bold">
            WORLD 03 // 1997
          </span>
          <span className="font-editorial text-sm font-bold tracking-widest text-slate-900">
            《王菲》 FAYE WONG 1997
          </span>
        </div>

        <button
          onClick={toggleSoundscape}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono-code font-bold rounded-full border transition-all cursor-pointer ${
            isPlayingSoundscape
              ? 'bg-black text-white border-black'
              : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-400'
          }`}
          title="概念性氛围声景实验"
        >
          {isPlayingSoundscape ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">
            {isPlayingSoundscape ? '概念声景：进行中' : '启动概念声景模拟'}
          </span>
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 relative z-10">
        
        {/* Editorial Monochrome Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono-code text-slate-500 tracking-widest uppercase block">
              WORLD 03 // INDEPENDENT FASHION MONOGRAPH & BRIT-POP HEYDAY
            </span>

            <h1 className="font-editorial text-6xl sm:text-8xl font-black text-slate-950 tracking-tight">
              王菲 1997
            </h1>

            <p className="font-editorial text-xl sm:text-2xl text-slate-700 leading-relaxed italic max-w-xl">
              “谁说爱人就该爱他的脾气，谁说相处就该规规矩矩；在黑白棋盘格里哼着你快乐所以我快乐。”
            </p>

            <div className="p-5 bg-white border border-slate-300 rounded-none text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-xl shadow-xs">
              {world.curatorialStatement}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] overflow-hidden border border-slate-900 bg-white group shadow-xl">
              <img
                src={world.heroPhoto}
                alt="Faye Wong 1997 Plaid Coat"
                className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-editorial text-base font-bold block">
                  黑白几何棋盘格大衣 · 短发眼泪妆
                </span>
                <span className="font-mono-code text-[11px] text-slate-300">
                  加盟百代首部同名大碟 · 极简独立女性成人礼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="mb-12">
          <div className="border-b border-slate-900 pb-3 mb-8 flex justify-between items-baseline">
            <div>
              <span className="font-mono-code text-xs text-slate-500 uppercase tracking-widest block">
                EDITORIAL TRACK ARCHIVE // 独立杂志式编排
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-slate-950">
                克制、冷静与柔韧声响
              </h2>
            </div>
            <span className="font-mono-code text-xs text-slate-400 hidden sm:inline">
              SELECT TRACK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {world.tracks.map((track) => {
              const isSelected = selectedTrack?.number === track.number;

              return (
                <div
                  key={track.number}
                  onClick={() => setSelectedTrack(isSelected ? null : track)}
                  className={`p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-950 text-white border-black shadow-lg'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono-code">
                      <span className={`px-2 py-0.5 font-bold ${isSelected ? 'bg-white text-black' : 'bg-slate-100 text-slate-900'}`}>
                        {track.number}
                      </span>
                      <span className="text-[10px] opacity-60">{track.tempoBpm} BPM</span>
                    </div>

                    <h4 className="font-editorial text-2xl font-bold">
                      《{track.title}》
                    </h4>

                    <p className="font-editorial text-xs opacity-75 italic line-clamp-3">
                      “{track.signatureLyric}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 mt-4 text-[10px] font-mono-code flex justify-between">
                    <span>曲：{track.composer}</span>
                    <span className="font-bold">{isSelected ? '收起 ▲' : '详情 ▼'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Selected Track Inspection Drawer */}
          {selectedTrack && (
            <div className="mt-8 p-6 sm:p-8 bg-white border border-slate-900 rounded-none space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-black text-white font-mono-code font-bold text-xs">
                    TRACK {selectedTrack.number}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-black text-slate-950">
                    《{selectedTrack.title}》
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://music.apple.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 bg-black text-white font-mono-code text-xs font-bold rounded-xs transition-colors"
                  >
                    <span>在官方平台聆听原声</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedTrack(null)}
                    className="px-2.5 py-1 bg-slate-200 font-mono-code text-xs border border-slate-400 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono-code text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    LYRICAL TEXTURE // 歌词文本片段
                  </span>
                  <div className="p-4 bg-slate-50 border border-slate-300 font-editorial text-sm leading-relaxed whitespace-pre-line text-slate-900">
                    {selectedTrack.extendedLyricSnippet}
                  </div>
                </div>

                <div className="space-y-4 font-mono-code text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
                    <span className="font-bold text-black uppercase block border-b border-slate-200 pb-1">
                      PRODUCTION CREDITS // 创作班底
                    </span>
                    <div className="flex justify-between">
                      <span className="text-slate-500">作曲</span>
                      <span className="text-slate-900 font-bold">{selectedTrack.composer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">作词</span>
                      <span className="text-slate-900 font-bold">{selectedTrack.lyricist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">编曲</span>
                      <span className="text-slate-900 font-bold">{selectedTrack.arranger}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-100 border border-slate-300 space-y-1 font-sans">
                    <span className="font-mono-code text-[11px] font-bold text-slate-800 uppercase block">
                      ARTISTIC NOTE // 艺术札记
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {selectedTrack.artisticNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Notice */}
        <div className="mt-16 pt-8 border-t border-slate-300 flex justify-between text-xs font-mono-code text-slate-500">
          <span>WORLD 03 // 王菲 (1997)</span>
          <span>UNOFFICIAL FAN-MADE DIGITAL EXPERIENCE</span>
        </div>

      </div>
    </div>
  );
};
