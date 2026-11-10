import MaskedHeading from './effects/MaskedHeading';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import RefineFrame from './effects/RefineFrame';
const PaperCrumple = lazy(() => import('./effects/PaperCrumple'));
import { AtmosphericTitle } from './typography/AtmosphericTitle';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import './StrangersSongSpace.css';
import { motion, useScroll, useTransform } from 'motion/react';
export function SongEmojiAtmosphere({ ants = false }: { ants?: boolean }) {
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress } = useScroll();
  const sunY = useTransform(scrollYProgress, [0, .45, 1], ['82vh', '5vh', '92vh']);
  const sunX = useTransform(scrollYProgress, [0, 1], ['-3vw', '87vw']);
  const daylight = useTransform(scrollYProgress, [0, .4, 1], [.04, .25, .02]);
  const dusk = useTransform(scrollYProgress, [0, .5, 1], [0, .02, .3]);
  const melt = useTransform(scrollYProgress, [0, 1], [1, .23]);
  const pool = useTransform(scrollYProgress, [0, 1], [.1, 1.4]);
  return <div className={`ss-emoji-field ${ants ? 'ss-ants' : 'ss-childhood'}`} aria-hidden="true">
    {!ants && <><motion.div className="ss-daylight" style={{ opacity: reduced ? .08 : daylight }} /><motion.div className="ss-dusk" style={{ opacity: reduced ? 0 : dusk }} /><motion.div className="ss-sun-journey" style={{ x: reduced ? '75vw' : sunX, y: reduced ? '12vh' : sunY }}>🌞</motion.div></>}
    {Array.from({ length: ants ? 32 : 14 }, (_, i) => <span key={i} className={!ants && i % 3 === 0 ? 'ss-melting-ice' : undefined} style={{ '--emoji-x': `${(i * 37 + 9) % 93}%`, '--emoji-y': `${(i * 23 + 13) % 92}%`, '--emoji-delay': `${-i * .8}s`, '--emoji-duration': `${7 + i % 7}s`, '--emoji-rotate': `${i % 2 ? 18 : -18}deg` } as React.CSSProperties}>{ants ? i % 2 ? '👀' : '🐜' : i % 3 === 0 ? <><motion.b className="ss-ice-scoop" style={{ scaleY: reduced ? 1 : melt }}>🍦</motion.b><i className="ss-ice-drip" /><motion.i className="ss-ice-pool" style={{ scaleX: reduced ? .5 : pool, opacity: reduced ? .25 : pool }} /></> : ['🍦','🪀','🍰'][i % 3]}</span>)}
  </div>;
}
interface Track { number: string; title: string; signatureLyric: string; extendedLyricSnippet: string; artisticNote: string }
export const STRANGERS_SONG_PHOTOS: Record<string, string> = {
  '开到荼靡': '/assets/strangers/photo-08.jpg', '当时的月亮': '/assets/strangers/photo-07.jpg',
  '催眠': '/assets/strangers/photo-06.jpg', '只爱陌生人': '/assets/strangers/photo-01.jpg',
  '百年孤寂': '/assets/strangers/photo-03.jpg', '邮差': '/assets/strangers/photo-09.jpg'
};
export function StrangersSongSpace({ track, tracks, onSelect, onBack, onHome }: { track: Track; tracks: Track[]; onSelect: (track: Track) => void; onBack: () => void; onHome: () => void }) {
  const reduced = useTypographyReducedMotion();
  const [status, setStatus] = useState('generating');
  const [paper, setPaper] = useState(false);
  useEffect(() => { if (reduced) {setStatus('complete');return;} const timer = window.setTimeout(() => setStatus('complete'), 650); return () => clearTimeout(timer); }, [reduced]);
  const photo = STRANGERS_SONG_PHOTOS[track.title];
  return <main className={`ss-song ${track.title==='邮差'?'ss-postman':''}`}>
    {(track.title === '开到荼靡' || track.title === '催眠') && <SongEmojiAtmosphere ants={track.title === '开到荼靡'} />}
    <div className="ss-background" aria-hidden="true"><RefineFrame status={status} radius={0} showStatus={false} width={2000} stageDuration={650}><img src={photo} alt="" /></RefineFrame></div>
    <div className="ss-content"><nav><button onClick={onBack}>← 只爱陌生人目录</button><button onClick={onHome}>HOME</button></nav>
      <header><small>1999 / {track.number}</small><h1>{track.title==='邮差'?<MaskedHeading text={track.title} src={photo} fillScale={1.3} parallax={34} reveal="scale" trigger="view" spotlight spotlightRadius={180} outline/>:<AtmosphericTitle text={track.title} />}</h1></header>
      <div className="ss-lyrics">{track.extendedLyricSnippet.split(/\s*\/\s*/).map((line, index) => <p key={index} className={line === '每一个人爱上所爱的人都心有余悸' ? 'ss-emphasis-line' : undefined}>{track.title==='邮差'?<MaskedHeading text={line} src={photo} fillScale={1.3} parallax={34} reveal="scale" trigger="view" spotlight spotlightRadius={180} outline/>:line === '每一个人爱上所爱的人都心有余悸' ? <strong>{Array.from(line).map((char, i) => <span key={i} style={{ animationDelay: `${i * .065}s` }}>{char}</span>)}</strong> : line}</p>)}</div>
      {track.title!=='邮差'&&<p className="ss-thought">{track.artisticNote}</p>}
      {!reduced && <><button className="ss-paper-toggle" aria-expanded={paper} onClick={() => setPaper(value => !value)}>{paper ? '收起摄影纸张' : '触碰这张摄影 · 揉皱与展开'} ↗</button>{paper && <Suspense fallback={<p>摄影纸张正在展开…</p>}><PaperCrumple src={photo} alt={`${track.title}摄影纸张，按住揉皱，松开展开`} width={640} height={480} sceneHeight={510} imageFit="contain" detail={32} crumpleAmount={.65} releaseDuration={1.2} /></Suspense>}</>}
      <nav className="ss-song-nav" aria-label="只爱陌生人歌曲">{tracks.map(item => <button key={item.number} onClick={() => onSelect(item)} aria-current={item.title === track.title ? 'page' : undefined}>{item.title}</button>)}</nav>
    </div>
  </main>;
}
