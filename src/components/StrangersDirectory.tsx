import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import Topography from './effects/Topography';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import './StrangersDirectory.css';

interface Track { number: string; title: string; signatureLyric: string; extendedLyricSnippet: string; artisticNote: string }
const photos = Array.from({ length: 9 }, (_, i) => `/assets/strangers/photo-${String(i + 1).padStart(2, '0')}.jpg`);

function Exposure({ src, index, progress }: { src: string; index: number; progress: MotionValue<number> }) {
  const center = index / 8;
  const opacity = useTransform(progress, value => Math.max(0, 1 - Math.abs(value - center) * 8));
  const y = useTransform(progress, [0, 1], [index % 2 ? '2%' : '-2%', index % 2 ? '-2%' : '2%']);
  return <motion.img src={src} alt="" className="strangers-exposure" style={{ opacity, y }} fetchPriority={index === 0 ? 'high' : 'auto'} />;
}

export function StrangersDirectory({ tracks, onSelect, onHome }: { tracks: Track[]; onSelect: (track: Track) => void; onHome: () => void }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const count = useTransform(scrollYProgress, value => `${String(Math.round(value * 8) + 1).padStart(2, '0')} / 09`);
  return <main ref={root} className={`strangers-directory ${reduced ? 'strangers-reduced' : ''}`}>
    <div className="strangers-viewport">
      <div className="strangers-photography" aria-label="只爱陌生人原始摄影组图">
        {reduced ? <img className="strangers-exposure" src={photos[0]} alt="王菲《只爱陌生人》车厢摄影" /> : photos.map((src, index) => <Exposure key={src} src={src} index={index} progress={scrollYProgress} />)}
      </div>
      <div className="strangers-shade" />
      {!reduced && <div className="strangers-contours" aria-hidden="true"><Topography color="#e7c4b6" lineCount={16} lineWidth={.8} elevation={.65} speed={.13} morph={.14} glow={.12} opacity={.36} brightness={.8} fog={.5} hoverEffect="lift" mouseStrength={.4} parallax={.18} clickEffect="pulse" dpr={1} /></div>}
      <header className="strangers-header"><button onClick={onHome}>← HOME</button><span>王菲 · 1999</span></header>
      <motion.h1 className="strangers-heading" style={reduced ? undefined : { x: titleX }}>只爱<br /><span>陌生人</span><small>ONLY LOVE STRANGERS</small></motion.h1>
      <nav className="strangers-tracks" aria-label="只爱陌生人歌曲目录">
        {tracks.map(track => <button key={track.number} onClick={() => onSelect(track)}><span className="strangers-track-number">{track.number}</span><span className="strangers-track-name">{track.title}</span><span className="strangers-track-arrow" aria-hidden="true">↗</span></button>)}
      </nav>
      <footer className="strangers-footer"><span>向下漫游 · 点击歌名进入</span><motion.span>{reduced ? '01 / 09' : count}</motion.span></footer>
    </div>
    {reduced && <div className="strangers-still-gallery">{photos.slice(1).map((src, index) => <img key={src} src={src} alt={`《只爱陌生人》摄影 ${index + 2}`} loading="lazy" />)}</div>}
  </main>;
}
