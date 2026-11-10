import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { UserLyricEntry } from '../data/userInterpretations';
import { JIANGAI_FIXED_PHOTOS, JIANGAI_SONG_IDS } from '../data/jiangaiArt';
import './worlds/JiangaiArt.css';
import ScrambledText from './typography/ScrambledText';
import { PassengerCity } from './PassengerCity';
import CircularText from './typography/CircularText';
import TextPressure from './typography/TextPressure';
import { QuietWarpTitle } from './typography/QuietWarpTitle';

interface Props {
  entry: UserLyricEntry;
  onBackToAlbum: () => void;
  onHome?: () => void;
  onSelectSong: (id: string) => void;
}

function LyricPair({ line, index, reduced }: { line: string; index: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .92', 'end .2'] });
  const leftOpacity = useTransform(scrollYProgress, [0, .22, .8, 1], [.08, 1, 1, .3]);
  const rightOpacity = useTransform(scrollYProgress, [0, .42, .85, 1], [0, .95, .95, .3]);
  const leftX = useTransform(scrollYProgress, [0, 1], [-22, 10]);
  const rightX = useTransform(scrollYProgress, [0, 1], [20, -12]);
  const spacing = useTransform(scrollYProgress, [0, 1], ['.06em', '.32em']);
  const tokenOpacity = useTransform(scrollYProgress, [0, .45, .85, 1], [0, .6, .5, 0]);
  const twelveOpacity = useTransform(scrollYProgress, [.3, .9], [.7, 0]);
  const parts = line.split(' ');
  const token = line.includes('照片') ? 'film' : line.includes('顏色') ? 'color' : line.includes('煙花') ? 'rays' : line.includes('電影票') ? 'ticket' : line.includes('水晶鞋') ? 'crystal' : '';
  return <div ref={ref} className={`ja-lyric-pair ja-lyric-pair--${token}`}>
    <span className="ja-pair-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <motion.p className="ja-given-you" style={{ opacity: reduced ? 1 : leftOpacity, x: reduced ? 0 : leftX, letterSpacing: line.includes('距離') && !reduced ? spacing : '.06em' }}>{parts[0]}</motion.p>
    {parts.length > 1 && <><span className="ja-hairline" aria-hidden="true" /><motion.p className="ja-given-him" style={{ opacity: reduced ? 1 : rightOpacity, x: reduced ? 0 : rightX }}>{parts.slice(1).join(' ')}</motion.p></>}
    {token && <motion.span className={`ja-object ja-object--${token}`} style={{ opacity: reduced ? .35 : tokenOpacity }} aria-hidden="true" />}
    {line.includes('日曆') && <span className="ja-calendar" aria-hidden="true"><i /><i /><i /></span>}
    {line.includes('十二點') && <motion.span className="ja-twelve" style={{ opacity: reduced ? .3 : twelveOpacity }} aria-hidden="true">00:00</motion.span>}
  </div>;
}

function PassingLine({ line, index, reduced, passenger = false }: { line: string; index: number; reduced: boolean; passenger?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .95', 'end .15'] });
  const opacity = useTransform(scrollYProgress, [0, .25, .7, 1], [.05, 1, 1, .16]);
  const x = useTransform(scrollYProgress, [0, 1], index % 2 ? [18, -22] : [-20, 24]);
  return <motion.p ref={ref} className={`ja-passing-line ja-passing-line--${index + 1}`} style={{ opacity: reduced || passenger && index === 0 ? 1 : opacity, x: reduced ? 0 : x }}>{passenger ? <ScrambledText radius={100} strength={1} trail={.6} duration={1.2} speed={.5} scrambleChars=".:" clickBurst intro>{line}</ScrambledText> : line}</motion.p>;
}

function SunlightVerse({ line, index, reduced }: { line: string; index: number; reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .95', 'end .15'] });
  const opacity = useTransform(scrollYProgress, [0, .4, 1], [.1, 1, 1]);
  const petalRotation = useTransform(scrollYProgress, [0, 1], [-10, 8]);
  const light = useTransform(scrollYProgress, [0, 1], [.02, .27]);
  return <section ref={ref} className={`ja-sun-verse ja-sun-verse--${index + 1}`}>
    <motion.div className="ja-sun-aperture" aria-hidden="true" style={{ rotate: reduced ? 0 : petalRotation, opacity: reduced ? .25 : light }}>
      {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ '--petal-angle': `${i * 40}deg` } as React.CSSProperties} />)}
    </motion.div>
    <motion.p style={{ opacity: 1 }}>{line}</motion.p>
  </section>;
}

export function JiangaiLyricScene({ entry, onBackToAlbum, onHome, onSelectSong }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const isBuliu = entry.id === 'buliu_jiangai';
  const isSun = entry.id === 'yangbao_jiangai';
  const photo = JIANGAI_FIXED_PHOTOS[entry.id as keyof typeof JIANGAI_FIXED_PHOTOS];
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const windX = useSpring(pointerX, { stiffness: 25, damping: 20 });
  const windY = useSpring(pointerY, { stiffness: 25, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const { scrollYProgress: ending } = useScroll({ target: endRef, offset: ['start end', 'end end'] });
  const background = useTransform(scrollYProgress, [0, .55, 1], isSun ? ['#909e90', '#bdc9af', '#dfe3ce'] : ['#a7b49e', '#c2c6bd', '#e2e5dd']);
  const photoFilter = useTransform(scrollYProgress, [0, 1], isSun ? ['saturate(.35) brightness(.75)', 'saturate(.75) brightness(1.1)'] : ['saturate(.65)', 'saturate(0)']);
  const paperFade = useTransform(ending, [0, .65, 1], [.65, .15, 0]);
  const pictureFade = useTransform(ending, [0, .7, 1], [1, .1, 0]);
  const layerShift = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const boundaryFade = useTransform(scrollYProgress, [0, .8, 1], [.7, .1, 0]);
  const warmLight = useTransform(scrollYProgress, [0, .3, .8, 1], [.01, .05, .22, .25]);
  const rawLines = entry.rawLyric.split('\n');
  const pairLines = rawLines.slice(0, 15);
  const endingLines = rawLines.slice(15);
  const passengerLines = entry.rawLyric.split(/[，。….]+/).filter(Boolean);
  const titles = ['乘客', '不留', '阳宝'];
  const index = JIANGAI_SONG_IDS.indexOf(entry.id as typeof JIANGAI_SONG_IDS[number]);
  const concept = isBuliu ? 'What Remains' : isSun ? 'A Sunflower in Silence' : 'Passing Through';

  return <motion.div key={entry.id} ref={ref} className={`ja-art ja-lyric-scene ${isBuliu ? 'ja-buliu' : isSun ? 'ja-yangbao' : 'ja-passenger'}`} style={{ backgroundColor: reduced ? '#c8d0bf' : background }} onPointerMove={e => {
    if (reduced || e.pointerType === 'touch') return;
    pointerX.set((e.clientX / window.innerWidth - .5) * 12);
    pointerY.set((e.clientY / window.innerHeight - .5) * 8);
  }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <nav className="ja-nav" aria-label="将爱歌曲导航">
      <button onClick={onBackToAlbum}><ArrowLeft size={15} /> 将爱目录</button>
      <div>{JIANGAI_SONG_IDS.map((id, i) => <button key={id} onClick={() => onSelectSong(id)} aria-current={id === entry.id ? 'page' : undefined}>{titles[i]}</button>)}</div>
      {onHome && <button onClick={onHome}>HOME</button>}
    </nav>
    <div className="ja-scene-photograph">
      <motion.img src={photo} alt={entry.photoTitle} style={{ filter: reduced ? 'saturate(.6)' : photoFilter }} />
      <motion.div className="ja-tracing ja-tracing--scene" aria-hidden="true" style={{ x: reduced ? 0 : windX, y: reduced ? 0 : layerShift }} />
      <header className="ja-scene-heading"><div className="ja-pressure-concept"><TextPressure text={concept} minFontSize={13} smoothing={.85} idle="none" pressureColor="#68775c" /></div><h1 className="ja-scene-warp"><QuietWarpTitle text={entry.songTitle} /></h1><p>To Love / 2003</p></header>
      <div className="ja-scene-type-orbit"><CircularText text={`${concept.toUpperCase()} · TO LOVE · `} size={138} fontSize={10} fontWeight={400} spinDuration={150} onHover="pause" direction="counterclockwise" ring><span>{entry.songTitle}</span></CircularText></div>
    </div>
    <div className="ja-lyric-body">
      <div className="ja-story-atmosphere" aria-hidden="true">
        <motion.div className="ja-story-photo" style={{ opacity: reduced ? .12 : pictureFade, filter: reduced ? 'grayscale(.5)' : photoFilter }}><img src={photo} alt="" /></motion.div>
        <motion.div className="ja-tracing ja-tracing--drift" style={{ x: reduced ? 0 : windX, y: reduced ? 0 : windY, opacity: reduced ? .3 : paperFade }} />
        {!isBuliu && !isSun && <PassengerCity />}
        {isBuliu && <motion.div className="ja-dual-region" style={{ opacity: reduced ? .25 : boundaryFade }}><span>你</span><span>他</span></motion.div>}
        {isSun && <motion.div className="ja-soft-light" style={{ opacity: reduced ? .18 : warmLight, x: reduced ? 0 : windX }} />}
      </div>
      <div className="ja-story-words">
        {isBuliu ? <>
          <div className="ja-pairs">{pairLines.map((line, i) => <LyricPair key={line} line={line} index={i} reduced={reduced} />)}</div>
          <section ref={endRef} className="ja-release" aria-label="不留的结尾">
            {endingLines.map((line, i) => <PassingLine key={line} line={line} index={i} reduced={reduced} />)}
          </section>
        </> : isSun ? <>
          {['需要阳光的宝贝', '我的向日葵', '只在阳光下灿烂', '善于激情中优美'].map((line, i) => <SunlightVerse key={line} line={line} index={i} reduced={reduced} />)}
          <section ref={endRef} className="ja-sun-rest" aria-label="安静的光" />
        </> : <>
          {passengerLines.map((line, i) => <PassingLine key={`${line}-${i}`} line={line} index={i} reduced={reduced} passenger />)}
          <section ref={endRef} className="ja-passing-rest" aria-label="旅程继续" />
        </>}
      </div>
    </div>
    {isSun && <div className="ja-sunflowers" aria-hidden="true">{Array.from({length:5},(_,i)=><span key={i}>🌻</span>)}</div>}
    <footer className="ja-song-footer">
      <details><summary>关于这首歌</summary><p>{entry.userInterpretation}</p></details>
      <button onClick={onBackToAlbum}><ArrowLeft size={15} /> 返回《将爱》</button>
      <button onClick={() => onSelectSong(JIANGAI_SONG_IDS[(index + 1) % JIANGAI_SONG_IDS.length])}>下一首 / {titles[(index + 1) % titles.length]} <ArrowRight size={15} /></button>
    </footer>
  </motion.div>;
}
