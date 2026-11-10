import React, { useState } from 'react';
import { Sparkles, Sliders, Disc3, Play, Pause, RefreshCw, Send, ArrowRight, Compass } from 'lucide-react';
import { Song, ALBUMS } from '../data/fayeArchive';

interface MoodPlayerSectionProps {
  onPlayTrack: (trackId: string, rootFreq?: number, ambientType?: string) => void;
  isPlaying: boolean;
  currentTrackId: string | null;
  onNavigateToAlbum: (albumId: string) => void;
}

interface RecommendationItem {
  title: string;
  album: string;
  albumId?: string;
  year: number;
  composer?: string;
  lyricist?: string;
  arranger?: string;
  reason: string;
  tags: string[];
  frequencyResonance?: string;
}

export const MoodPlayerSection: React.FC<MoodPlayerSectionProps> = ({
  onPlayTrack,
  isPlaying,
  currentTrackId,
  onNavigateToAlbum
}) => {
  const [moodPrompt, setMoodPrompt] = useState('今天想一个人待着，但不想听太悲伤的歌。');
  const [dimensions, setDimensions] = useState({
    intimacy: 25,    // 0 = 疏离, 100 = 亲密
    intensity: 40,   // 0 = 冷静, 100 = 强烈
    ethereal: 20,    // 0 = 梦幻, 100 = 现实
    experimental: 35 // 0 = 实验, 100 = 流行
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState<string | null>(
    '针对你当下「想独自一人、避开过度哀伤」的心境：档案库为你调取了介于冷感与治愈之间的声音切片，以气声与梦幻吉他构筑起一道免受外界喧扰的透明声屏。'
  );
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([
    {
      title: '脸',
      album: '唱游 (1998)',
      albumId: 'changyou',
      year: 1998,
      composer: '王菲',
      lyricist: '林夕',
      arranger: '张亚东',
      reason: '张亚东编曲中如同雨丝般散开的失真吉他与王菲自如的气声转换，提供了一种抽离肉身的华丽孤独感，并不致人抑郁，反而充满自我沉溺的美感。',
      tags: ['实验迷幻', '华丽梦呓', '冷艳自持'],
      frequencyResonance: '92% 疏离美学'
    },
    {
      title: '浮躁',
      album: '浮躁 (1996)',
      albumId: 'fuzao',
      year: 1996,
      composer: '王菲',
      lyricist: '王菲',
      arranger: '张亚东',
      reason: '短促轻快的节拍与毫无说教意味的无字哼唱，像九月秋风吹散心底堆积的沉闷与杂念，让思绪在灵动声响中自由舒展。',
      tags: ['Brit-pop', 'Dream Pop', '灵动无拘'],
      frequencyResonance: '88% 随性解构'
    },
    {
      title: '新房客',
      album: '寓言 (2000)',
      albumId: 'yuyan',
      year: 2000,
      composer: '王菲',
      lyricist: '林夕',
      arranger: '张亚东',
      reason: '冰冷电音节拍与「一切都好，只缺烦恼」的漫不经心，恰如其分地划出社交安全距离，让人在独处中重获自洽。',
      tags: ['Trip-hop', '概念五部曲', '哲学思辨'],
      frequencyResonance: '95% 空间漫游'
    }
  ]);

  const presetPrompts = [
    '今天想一个人待着，但不想听太悲伤的歌。',
    '深夜坐末班双层巴士穿行在港岛霓虹雨夜，想彻底抽离。',
    '暗恋一个人，表面极度不在乎，心底却翻江倒海。',
    '厌倦了虚伪的社交寒暄，需要一阵彻骨清冷的电子声波。',
    '刚结束一段漫长的关系，不痛苦，只想感受虚无与释怀。'
  ];

  const handleRecommend = async () => {
    if (!moodPrompt.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/mood-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: moodPrompt,
          dimensions
        })
      });

      if (!res.ok) {
        throw new Error('API failed');
      }

      const data = await res.json();
      if (data.analysis) {
        setAnalysisText(data.analysis);
      }
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.warn('Fallback to local intelligence:', err);
      // Fallback: intelligent matching from ALBUMS tracks based on dimensions
      const allTracks: Song[] = [];
      ALBUMS.forEach(a => a.tracks.forEach(t => allTracks.push(t)));

      // Score tracks by distance in 4D space
      const scored = allTracks.map(t => {
        const dist = 
          Math.abs(t.dimensions.intimacy - dimensions.intimacy) +
          Math.abs(t.dimensions.intensity - dimensions.intensity) +
          Math.abs(t.dimensions.ethereal - dimensions.ethereal) +
          Math.abs(t.dimensions.experimental - dimensions.experimental);
        return { track: t, score: dist };
      });
      scored.sort((a, b) => a.score - b.score);

      const top3 = scored.slice(0, 3).map(s => ({
        title: s.track.title,
        album: `${s.track.albumTitle} (${s.track.year})`,
        albumId: s.track.albumId,
        year: s.track.year,
        composer: s.track.composer,
        lyricist: s.track.lyricist,
        arranger: s.track.arranger,
        reason: s.track.curatorNote || `这首歌在情感光谱上高度契合你所设定的偏好，通过气声与编曲的精妙平衡，唤醒恰到好处的心绪共振。`,
        tags: s.track.moodTags,
        frequencyResonance: `${Math.round(100 - s.score / 4)}% 坐标共振`
      }));

      setAnalysisText(`根据你所描述的「${moodPrompt}」及四维心理坐标，档案库检索到以下最契合你当下心境的声音切片。`);
      setRecommendations(top3);
    } finally {
      setIsLoading(false);
    }
  };

  // Find track data for playing
  const handlePlayRecommended = (item: RecommendationItem) => {
    for (const alb of ALBUMS) {
      const match = alb.tracks.find(t => t.title.toLowerCase().includes(item.title.toLowerCase()));
      if (match) {
        onPlayTrack(match.id, match.audioSignature.rootNote, match.audioSignature.ambientType);
        return;
      }
    }
    // Fallback to first track
    onPlayTrack('lian', 220, 'dream_pop');
  };

  return (
    <div className="min-h-screen pb-28 text-zinc-100 relative">
      <div className="absolute inset-0 bg-film-grain opacity-40 pointer-events-none" />

      {/* Header Deck */}
      <div className="border-b border-zinc-800 bg-[#0e0f13]/80 backdrop-blur-md px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#d4f43b] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>03 // MOOD PLAYER · AI NATIVE EMOTIONAL SONIC EXPLORER</span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            情绪音乐探索器
          </h1>

          <p className="font-editorial text-base md:text-lg text-zinc-300 max-w-3xl leading-relaxed">
            “用户不需要搜索歌名，而是描述自己的情绪。” AI 根据歌曲的主题、编曲氛围、词境隐喻与四维心理坐标，为你定制独一无二的声音解药。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Top Split: Input & 4D Spectrum Dimension Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Natural Language Emotion Input (Col 7) */}
          <div className="lg:col-span-7 bg-[#131418] border border-zinc-800 p-6 rounded-sm space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono-code text-xs text-zinc-400">
                STEP 1: 描述你此刻的情绪状态 / 场景心境
              </span>
              <span className="font-mono-code text-[11px] text-[#d4f43b]">
                NATURAL LANGUAGE PROMPT
              </span>
            </div>

            <div>
              <textarea
                value={moodPrompt}
                onChange={(e) => setMoodPrompt(e.target.value)}
                rows={3}
                placeholder="例如：今天想一个人待着，但不想听太悲伤的歌..."
                className="w-full bg-[#0a0b0d] border border-zinc-700 focus:border-[#d4f43b] p-3.5 text-sm md:text-base text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors rounded-sm font-sans"
              />
            </div>

            {/* Quick Inspiration Pills */}
            <div className="space-y-2">
              <span className="font-mono-code text-[11px] text-zinc-500 uppercase block">
                INSPIRATION PRESETS // 点击快速填入典型心绪：
              </span>
              <div className="flex flex-wrap gap-2">
                {presetPrompts.map((p, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => setMoodPrompt(p)}
                    className="text-left px-2.5 py-1 text-xs font-sans bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4D Emotional Coordinates Slider (Col 5) */}
          <div className="lg:col-span-5 bg-[#131418] border border-zinc-800 p-6 rounded-sm space-y-5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono-code text-xs text-zinc-400">
                STEP 2: 微调四维心理光谱坐标
              </span>
              <Sliders className="w-3.5 h-3.5 text-[#d4f43b]" />
            </div>

            <div className="space-y-4 text-xs font-mono-code">
              
              {/* Dim 1: 疏离 / 亲密 */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1.5">
                  <span className={dimensions.intimacy < 40 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    疏离 ({100 - dimensions.intimacy}%)
                  </span>
                  <span className={dimensions.intimacy > 60 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    亲密 ({dimensions.intimacy}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.intimacy}
                  onChange={(e) => setDimensions({ ...dimensions, intimacy: Number(e.target.value) })}
                  className="w-full accent-[#d4f43b] bg-zinc-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Dim 2: 冷静 / 强烈 */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1.5">
                  <span className={dimensions.intensity < 40 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    冷静 ({100 - dimensions.intensity}%)
                  </span>
                  <span className={dimensions.intensity > 60 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    强烈 ({dimensions.intensity}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.intensity}
                  onChange={(e) => setDimensions({ ...dimensions, intensity: Number(e.target.value) })}
                  className="w-full accent-[#d4f43b] bg-zinc-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Dim 3: 梦幻 / 现实 */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1.5">
                  <span className={dimensions.ethereal < 40 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    梦幻 ({100 - dimensions.ethereal}%)
                  </span>
                  <span className={dimensions.ethereal > 60 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    现实 ({dimensions.ethereal}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.ethereal}
                  onChange={(e) => setDimensions({ ...dimensions, ethereal: Number(e.target.value) })}
                  className="w-full accent-[#d4f43b] bg-zinc-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Dim 4: 实验 / 流行 */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1.5">
                  <span className={dimensions.experimental < 40 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    实验 ({100 - dimensions.experimental}%)
                  </span>
                  <span className={dimensions.experimental > 60 ? 'text-[#d4f43b] font-bold' : 'text-zinc-400'}>
                    流行 ({dimensions.experimental}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.experimental}
                  onChange={(e) => setDimensions({ ...dimensions, experimental: Number(e.target.value) })}
                  className="w-full accent-[#d4f43b] bg-zinc-800 h-1.5 rounded cursor-pointer"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              onClick={handleRecommend}
              disabled={isLoading}
              className="w-full py-3 bg-[#d4f43b] hover:bg-[#c2e22f] text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,244,59,0.2)] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI 正在扫描声学档案馆...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>计算情绪共振 · 生成作品推荐</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* AI Recommendations Output Area */}
        <div className="space-y-6 mb-16">
          
          {/* Curatorial Atmosphere Summary */}
          {analysisText && (
            <div className="bg-[#101217] border-l-2 border-[#d4f43b] p-5 rounded-r space-y-2">
              <span className="font-mono-code text-[11px] text-[#d4f43b] uppercase tracking-wider block">
                CURATORIAL EMOTION SYNTHESIS // 心理共振导言
              </span>
              <p className="font-editorial text-base text-zinc-200 leading-relaxed italic">
                “{analysisText}”
              </p>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item, idx) => {
              const matchedSong = ALBUMS.flatMap(a => a.tracks).find(t => t.title.toLowerCase().includes(item.title.toLowerCase()));
              const isThisPlaying = isPlaying && currentTrackId === matchedSong?.id;

              return (
                <div
                  key={idx}
                  className="bg-[#14151a] border border-zinc-800 hover:border-[#d4f43b]/80 p-6 rounded-sm flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-4">
                    
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[#d4f43b]">RESONANCE NO. 0{idx + 1}</span>
                      <span className="px-2 py-0.5 bg-zinc-800/80 text-zinc-300 text-[10px] rounded">
                        {item.frequencyResonance || '90% 情绪契合'}
                      </span>
                    </div>

                    {/* Title & Album */}
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#d4f43b] transition-colors">
                        《{item.title}》
                      </h3>
                      <p className="text-xs font-mono-code text-zinc-400 mt-1">
                        {item.album} · {item.year}
                      </p>
                    </div>

                    {/* Poetic Recommendation Reason */}
                    <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded">
                      <span className="font-mono-code text-[10px] text-zinc-500 uppercase block mb-1">
                        RECOMMENDATION RATIONALE // 推荐理由
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {item.reason}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono-code text-[10px] px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    
                    <button
                      onClick={() => handlePlayRecommended(item)}
                      className={`flex-1 py-2 px-3 text-xs font-mono-code font-medium rounded-sm border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isThisPlaying
                          ? 'bg-[#d4f43b] text-black border-[#d4f43b]'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                      }`}
                    >
                      {isThisPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>暂停模拟声景</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>试听模拟声景</span>
                        </>
                      )}
                    </button>

                    {item.albumId && (
                      <button
                        onClick={() => onNavigateToAlbum(item.albumId!)}
                        className="p-2 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white rounded-sm transition-colors"
                        title="查看完整专辑视觉空间"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
