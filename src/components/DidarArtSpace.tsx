import React, { useRef } from 'react';
import {DidarButterflies} from './DidarButterflies';
import { ArrowLeft } from 'lucide-react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { DIDAR_ART_TITLES, DIDAR_PHOTOS, DIDAR_VERSES, DIDAR_HOLIDAY_PHOTO, DidarArtTitle } from '../data/didarArt';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import Aurora from './effects/Aurora';
import './DidarArtSpace.css';
import { HOLIDAY_LINES, HOLIDAY_INTERPRETATION } from '../data/holidayLyrics';
import ASCIIText from './typography/ASCIIText';
import CircularText from './typography/CircularText';
import FallingText from './effects/FallingText';

interface Props {
  title: DidarArtTitle;
  originalPhoto: string;
  onBack: () => void;
  onHome?: () => void;
  onSelect: (title: DidarArtTitle) => void;
}
const CONCEPTS = ['A Temporary Vacation', 'Chromatic Disorientation', 'Two Stars, Never Meeting', 'Almost Touching'];

export function DidarKineticText({ text }: { text: string }) {
  return <span className="dd-kinetic" aria-label={text}>{Array.from(text).map((letter, i) =>
    <span aria-hidden="true" key={i} style={{ '--glyph': i } as React.CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>
  )}</span>;
}

function useSpace() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const pointer = useMotionValue(0);
  const wind = useSpring(pointer, { stiffness: 32, damping: 22 });
  const move = (event: React.PointerEvent) => {
    if (!reduced && event.pointerType !== 'touch') pointer.set((event.clientX / window.innerWidth - .5) * 2);
  };
  return { ref, reduced, progress, wind, move, leave: () => pointer.set(0) };
}

function ScrollWords({ text, className = '', falling = false }: { text: string; className?: string; falling?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .94', 'end .18'] });
  const opacity = useTransform(scrollYProgress, [0, .28, .8, 1], [.15, 1, 1, .35]);
  return <motion.div ref={ref} className={`dd-words ${falling ? 'dd-falling-verse' : ''} ${className}`} style={{ opacity: reduced ? 1 : opacity }}>{falling && !reduced ? <FallingText text={text} split="letters" trigger={window.matchMedia('(hover: none)').matches ? 'click' : 'hover'} fontSize="clamp(23px, 3.2vw, 44px)" gravity={1} restoreDelay={2} /> : <DidarKineticText text={text} />}</motion.div>;
}

function MelodyCharacter({ letter, index, reduced }: { letter: string; index: number; reduced: boolean }) {
  const x = useSpring(0, { stiffness: 25, damping: 13 });
  const y = useSpring(0, { stiffness: 25, damping: 13 });
  return <motion.span className="dd-melody-char" style={{ x, y }} onPointerMove={e => {
    if (reduced || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((rect.left + rect.width / 2 - e.clientX) * .55);
    y.set((rect.top + rect.height / 2 - e.clientY) * .7 - 10);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <motion.span animate={reduced ? { y: 0, rotate: 0, scale: 1 } : { y: [0, -18 - index % 3 * 4, 5, 0], rotate: [-6, 7, -3, -6], scale: [1, 1.09, .98, 1] }} transition={reduced ? { duration: 0 } : { duration: 3.8 + index * .17, delay: index * .12, repeat: Infinity, ease: 'easeInOut' }}>{letter}</motion.span>
  </motion.span>;
}

function Vacation({ originalPhoto }: { originalPhoto: string }) {
  const { ref, reduced, progress, wind, move, leave } = useSpace();
  const photographFade = useTransform(progress, [0, .4, .74, 1], [1, .95, .7, .6]);
  const finalOpacity = useTransform(progress, [.55, .86, 1], [.1, 1, 1]);
  const photoY = useTransform(progress, [0, 1], [0, -45]);
  const drift = useTransform(wind, v => v * 9);
  return <div className="dd-story dd-vacation" ref={ref} onPointerMove={move} onPointerLeave={leave}>
    <div className="dd-sticky" aria-hidden="true">
      {!reduced && <div className="dd-aurora"><Aurora colorStops={['#163547', '#344766', '#1b3449']} speed={.12} amplitude={.25} brightness={.35} opacity={.3} mouseInteraction={false} intro={false} /></div>}
      <motion.div className="dd-vacation-photos" style={{ opacity: reduced ? .35 : photographFade, x: reduced ? 0 : drift, y: reduced ? 0 : photoY }}>
        <img src={DIDAR_HOLIDAY_PHOTO} alt="" className="dd-holiday-backdrop" />
        <img src={DIDAR_HOLIDAY_PHOTO} alt="" className="dd-holiday-afterimage" />
      </motion.div>
      <svg className="dd-holiday-pendulum" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="holiday-metal"><stop stopColor="#fff3d5"/><stop offset=".45" stopColor="#a9958b"/><stop offset="1" stopColor="#e3cbb1"/></linearGradient></defs><g className="dd-pendulum-swing"><path d="M850 -30 L850 465" stroke="url(#holiday-metal)" strokeWidth="2"/><circle cx="850" cy="495" r="31" fill="url(#holiday-metal)" fillOpacity=".25" stroke="#efdbb9" strokeWidth="1"/><circle cx="850" cy="495" r="22" fill="none" stroke="#f8e5d1" strokeOpacity=".35" strokeWidth=".6"/></g></svg>
    </div>
    <div className="dd-narrative">
      <section className="dd-holiday-thought"><p>{HOLIDAY_INTERPRETATION}</p><div className="dd-holiday-circle"><CircularText text="假期 · A TEMPORARY VACATION · " onHover="speedUp" direction="clockwise" spinDuration={20} size={200} fontSize={20} fontWeight={400} draggable hoverTilt={20} /></div></section>
      <div className="dd-holiday-complete" aria-label="假期完整歌词">{HOLIDAY_LINES.slice(0,-1).map((line,i)=><p className={`dd-holiday-line dd-holiday-line-${Math.floor(i/7)%3}`} key={i}><ASCIIText text={line} asciiFontSize={8} colors={['#ff6188','#fc9867','#ffd866']} textScale={1} blocks={.9} waves={1} waveSpeed={1} chroma={1} tilt={1} hueShift={1} scramble={.6} clickRipple idle interactive /></p>)}</div>
      <section className="dd-act dd-vacation-end"><motion.p className="dd-holiday-last" style={{ opacity: reduced ? 1 : finalOpacity }}><ASCIIText text="我爱上过你。" /></motion.p></section>
    </div>
  </div>;
}

function Lost({ originalPhoto }: { originalPhoto: string }) {
  const { ref, reduced, progress, wind, move, leave } = useSpace();
  const blue = useTransform(progress, [0, .12, .34, 1], [0, 0, .72, .72]);
  const direction = useTransform([progress, wind], ([p, w]) => {
    const t = Math.min(Number(p), .88); return reduced ? 0 : Math.sin(t * 12) * 14 + Number(w) * 7 * Math.max(0, 1 - t / .88);
  });
  const travel = useTransform(progress, [0, .32, .64, 1], [0, 0, 110, 110]);
  const photoBlend = useTransform(progress, [0, .3, .6, 1], [.2, .5, .3, .14]);
  const auroraTime = useTransform(progress, [0, .88, 1], [0, 16, 16]);
  return <div ref={ref} className="dd-story dd-lost" onPointerMove={move} onPointerLeave={leave}>
    <div className="dd-sticky" aria-hidden="true">
      <img className="dd-original-photo" src={originalPhoto} alt="" />
      <motion.div className="dd-lost-collage" style={{ x: reduced ? 0 : direction, opacity: photoBlend }}><img src={DIDAR_PHOTOS[0]} alt="" /><img src={DIDAR_PHOTOS[1]} alt="" /></motion.div>
      <div className="dd-yellow-direction" /><motion.div className="dd-blue-direction" style={{ opacity: reduced ? .45 : blue, x: reduced ? 0 : direction }} />
      {!reduced && <div className="dd-aurora dd-aurora--lost"><Aurora colorStops={['#66694d', '#4a6070', '#676552']} time={auroraTime} speed={.08} brightness={.4} opacity={.25} amplitude={.2} intro={false} mouseInteraction={false} /></div>}
      <svg className="dd-lost-path" viewBox="0 0 1000 700" preserveAspectRatio="none"><path d="M90 80 C800 120 80 250 550 310 S600 490 860 620" /></svg>
    </div>
    <div className="dd-narrative">{DIDAR_VERSES.迷路.map((line, i) => <section key={i} className={`dd-act dd-direction-act dd-direction-act--${i + 1}`}>
      <motion.div style={{ x: reduced ? 0 : i === 2 ? travel : direction }}><ScrollWords text={line} className={i > 2 ? `dd-signal dd-signal--${i === 4 ? 'green' : 'red'}` : i === 0 ? 'dd-damp-ink' : ''} /></motion.div>
    </section>)}</div>
  </div>;
}

function Stars({ originalPhoto }: { originalPhoto: string }) {
  const { ref, reduced, progress, wind, move, leave } = useSpace();
  // Separate x corridors enforce a gap of at least 340 / 1000 of the viewport,
  // even at the pointer extremes; their orbital motion can never cause contact.
  const x1 = useTransform([progress, wind], ([p, w]) => 220 + (reduced ? 0 : Math.sin(Number(p) * 9) * 55 + Number(w) * 35));
  const x2 = useTransform([progress, wind], ([p, w]) => 780 + (reduced ? 0 : Math.cos(Number(p) * 7) * 55 - Number(w) * 35));
  const y1 = useTransform(progress, [0, .5, 1], [260, 330, 285]);
  const y2 = useTransform(progress, [0, .5, 1], [430, 360, 410]);
  const glow = useTransform(progress, [0, .3, .48, .78, 1], [.25, .45, .9, .5, .8]);
  const connection = useTransform(progress, [0, .38, .56, .7, 1], [0, 0, .55, 0, 0]);
  return <div ref={ref} className="dd-story dd-stars" onPointerMove={move} onPointerLeave={leave}>
    <div className="dd-sticky" aria-hidden="true">
      <img className="dd-original-photo" src="/assets/didar/butterfly-source.png" alt="" /><DidarButterflies/>
      <svg className="dd-star-system" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <motion.line x1={x1} y1={reduced ? 285 : y1} x2={x2} y2={reduced ? 410 : y2} stroke="currentColor" strokeWidth=".7" style={{ opacity: reduced ? .2 : connection }} />
        {[{ x: x1, y: y1 }, { x: x2, y: y2 }].map((star, i) => <motion.g key={i} style={{ opacity: reduced ? .7 : glow }} className="dd-star-pulse">
          <motion.circle cx={star.x} cy={reduced ? i ? 410 : 285 : star.y} r="15" fill="currentColor" opacity=".06" />
          <motion.circle cx={star.x} cy={reduced ? i ? 410 : 285 : star.y} r="5" fill="currentColor" opacity=".3" />
          <motion.circle data-star={i} cx={star.x} cy={reduced ? i ? 410 : 285 : star.y} r="1.9" fill="currentColor" />
        </motion.g>)}
      </svg>
    </div>
    <div className="dd-narrative">{DIDAR_VERSES.流星.map((line, i) => <section key={line} className={`dd-act dd-star-act dd-star-act--${i + 1}`}><ScrollWords text={line} falling /></section>)}</div>
  </div>;
}

function NearWords() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const gap = useTransform(scrollYProgress, [0, .6, 1], [80, 24, 24]);
  return <motion.div className="dd-near-words" ref={ref} style={{ gap: reduced ? '1.5rem' : gap }}><span>越來越近</span><span>卻不接觸</span></motion.div>;
}

function AmbiguousVerse({ line, index }: { line: string; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useTypographyReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smokeOpacity = useTransform(scrollYProgress, [0, .3, .55, 1], [0, .25, .18, 0]);
  const smokeScale = useTransform(scrollYProgress, [0, 1], [.65, 1.35]);
  return <section ref={ref} className={`dd-act dd-ambiguous-act dd-ambiguous-act--${index + 1}`}>
    {index === 5 ? <NearWords /> : index === 20 ? <div className="dd-words dd-unfinished"><ScrollWords text="天早灰藍" falling /><ScrollWords text="想告別 偏未晚" falling /></div> : <ScrollWords text={line} falling />}
    {index === 2 && <motion.svg className="dd-smoke" viewBox="0 0 500 400" aria-hidden="true" style={{ opacity: reduced ? .15 : smokeOpacity, scale: reduced ? 1 : smokeScale }}><path d="M100 250C-50 10 480 0 350 240S20 360 130 180S480 160 350 330" /></motion.svg>}
    {index === 8 && <span className="dd-ghost-type" aria-hidden="true">從來未熱戀已相戀</span>}
  </section>;
}

function Ambiguous({ originalPhoto }: { originalPhoto: string }) {
  const { ref, reduced, progress, wind, move, leave } = useSpace();
  const tint = useTransform(progress, [0, .34, .5, .61, 1], ['#343d49', '#494849', '#344350', '#48494a', '#617386']);
  const warmth = useTransform(progress, [0, .25, .38, .52, .64, .78, 1], [.1, .09, 0, 0, .13, .04, 0]);
  const exposure = useTransform(progress, [0, .48, .6, .72, 1], [.15, .15, .48, .25, .1]);
  const drift = useTransform(wind, value => value * 7);
  return <div ref={ref} className="dd-story dd-ambiguous" onPointerMove={move} onPointerLeave={leave}>
    <motion.div className="dd-sticky" style={{ backgroundColor: reduced ? '#465564' : tint }} aria-hidden="true">
      <img className="dd-original-photo" src={originalPhoto} alt="" />
      <motion.div className="dd-ambiguous-collage" style={{ x: reduced ? 0 : drift, opacity: reduced ? .25 : exposure }}><img src={DIDAR_PHOTOS[3]} alt="" /><img src={DIDAR_PHOTOS[4]} alt="" /></motion.div>
      <motion.div className="dd-warmth" style={{ opacity: reduced ? .07 : warmth }} />
    </motion.div>
    <div className="dd-narrative">{DIDAR_VERSES.暧昧.map((line, i) => <AmbiguousVerse key={`${line}-${i}`} line={line} index={i} />)}</div>
  </div>;
}

export function DidarArtSpace({ title, originalPhoto, onBack, onHome, onSelect }: Props) {
  const reduced = useTypographyReducedMotion();
  return <main className="dd-art">
    <div className="dd-song-aurora" aria-hidden="true">{!reduced && <Aurora colorStops={['#5227FF','#7cff67','#5227FF']} amplitude={1} blend={.5} height={.45} speed={1} glow={.6}/>}</div>
    <nav className="dd-navigation" aria-label="Di-Dar 歌曲导航"><button onClick={onBack}><ArrowLeft size={14} /> Di-Dar 目录</button><div>{DIDAR_ART_TITLES.map(song => <button key={song} aria-current={title === song ? 'page' : undefined} onClick={() => { onSelect(song); window.scrollTo({ top: 0, behavior: 'instant' }); }}>{song}</button>)}</div>{onHome && <button onClick={onHome}>HOME</button>}</nav>
    <header className="dd-title"><span>{CONCEPTS[DIDAR_ART_TITLES.indexOf(title)]}</span><h1><DidarKineticText text={title} /></h1><span>Di-Dar / 1995</span></header>
    {title === '假期' ? <Vacation key={title} originalPhoto={originalPhoto} /> : title === '迷路' ? <Lost key={title} originalPhoto={DIDAR_PHOTOS[1]} /> : title === '流星' ? <Stars key={title} originalPhoto={DIDAR_PHOTOS[2]} /> : <Ambiguous key={title} originalPhoto={DIDAR_PHOTOS[4]} />}
    <footer className="dd-footer"><button onClick={onBack}>↖ 返回 Di-Dar 目录</button><button onClick={() => { onSelect(DIDAR_ART_TITLES[(DIDAR_ART_TITLES.indexOf(title) + 1) % 4]); window.scrollTo({ top: 0, behavior: 'instant' }); }}>下一空间 ↗</button></footer>
  </main>;
}
