import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { UserLyricEntry } from '../data/userInterpretations';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import './FocusedLyricLab.css';
import { AtmosphericTitle } from './typography/AtmosphericTitle';
import { SongEmojiAtmosphere } from './StrangersSongSpace';
import CurvedLoop from './typography/CurvedLoop';
import { RedBeanCircle } from './typography/RedBeanCircle';

export const FOCUSED_LAB_IDS = ['woaini_jiangai', 'red_bean_changyou', 'cuimian_stranger'];
function WindLetter({ letter, index, scattered, reduced }: { letter: string; index: number; scattered: boolean; reduced: boolean }) {
  return <motion.span animate={reduced ? { x: 0, y: 0, rotate: 0, opacity: 1 } : scattered ? { x: 25 + index * 7, y: -25 - index * 4, rotate: 8 + index * 2, opacity: .1 } : { x: 0, y: [0, -5, 0], rotate: 0, opacity: 1 }} transition={reduced ? { duration: 0 } : scattered ? { duration: 2.8, delay: index * .06 } : { y: { duration: 5 + index * .3, repeat: Infinity }, opacity: { duration: 1.5 }, x: { duration: 1.5 } }}>{letter}</motion.span>;
}
export function FocusedLyricLab({ entry, onSelect, onHome, onBack, backLabel = '← 回到唱游铁盒' }: { entry: UserLyricEntry; onSelect: (id: string) => void; onHome?: () => void; onBack?: () => void; backLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useTypographyReducedMotion();
  const [scattered, setScattered] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 35, damping: 18 });
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const opacityA = useTransform(progress, [0, .3, .6, 1], [1, .7, 0, 0]);
  const opacityB = useTransform(progress, [0, .25, .55, .8, 1], [0, 0, 1, .7, 0]);
  const opacityC = useTransform(progress, [0, .55, 1], [0, 0, 1]);
  const convergence = useTransform(progress, [0, .5, 1], [32, 0, 25]);
  const left = useTransform([x, convergence], ([pointer, distance]) => Number(pointer) - Number(distance));
  const right = useTransform([x, convergence], ([pointer, distance]) => -Number(pointer) + Number(distance));
  const exposure = useTransform(progress, [0, 1], ['saturate(.65) brightness(.65)', 'saturate(.15) brightness(.8)']);
  const love = entry.id === 'woaini_jiangai';
  const dream = entry.id === 'cuimian_stranger';
  const fragments = entry.rawLyric.split(/[，。；\n]/).filter(Boolean);
  return <div className={`fl-lab ${love ? 'fl-love' : dream ? 'fl-dream' : 'fl-bean'}`} ref={ref} onPointerMove={e => {
    if (!reduced && e.pointerType !== 'touch') x.set((e.clientX / window.innerWidth - .5) * 40);
  }} onPointerLeave={() => x.set(0)}>
    <nav className="fl-navigation" aria-label="意象实验歌曲">{FOCUSED_LAB_IDS.map((id, i) => <button key={id} onClick={() => onSelect(id)} aria-current={entry.id === id ? 'page' : undefined}>{['我爱你', '红豆', '催眠'][i]}</button>)}{onHome && <button onClick={onHome}>HOME</button>}</nav>
    {onBack && <button className="fl-back-to-tin" onClick={onBack}>{backLabel}</button>}
    {dream && <SongEmojiAtmosphere />}
    <div className="fl-photography" aria-hidden="true">
      {dream ? <>
        <motion.img src="/assets/aistudio/IMG_5409_4b4eb2dd.jpeg" alt="" style={{ opacity: reduced ? 1 : opacityA }} />
        <motion.img src="/assets/aistudio/IMG_5410_b15c8573.jpeg" alt="" style={{ opacity: reduced ? 0 : opacityB }} />
        <motion.img src="/assets/aistudio/IMG_5411_6b9d0810.jpeg" alt="" style={{ opacity: reduced ? 0 : opacityC }} />
      </> : <><motion.img src={entry.photoUrl} alt="" style={{ filter: reduced ? 'brightness(.7)' : exposure }} />{love && <motion.img className="fl-second-love" src="/assets/aistudio/IMG_5433_98f82a21.jpeg" alt="" style={{ opacity: reduced ? .15 : opacityB }} />}</>}
    </div>
    <div className="fl-writing"><header><h1><AtmosphericTitle text={entry.songTitle} /></h1>{!love && !dream && <div className="fl-bean-idea-loop"><RedBeanCircle text={entry.userInterpretation} /><p className="fl-bean-loop-hint">顺时针流转 · 可拖动圆环</p></div>}</header>
      {love ? <section className="fl-love-scene" aria-label="爱与哎的聚散">{['爱','哎','爱','哎'].map((char, i) => <motion.span key={i} style={{ x: reduced ? 0 : i % 2 ? right : left }} animate={reduced ? { y: 0 } : { y: [0, i % 2 ? 13 : -13, 0] }} transition={{ duration: 6 + i, repeat: Infinity }}>{char}</motion.span>)}</section>
      : dream ? fragments.map((line, i) => <section key={`${line}-${i}`} className="fl-dream-phrase"><motion.p style={{ x: reduced ? 0 : i % 2 ? right : left }}>{line}</motion.p></section>)
      : null}
      <footer>{(love || dream) && <p>{entry.userInterpretation}</p>}<button onClick={() => onSelect(FOCUSED_LAB_IDS[(FOCUSED_LAB_IDS.indexOf(entry.id) + 1) % 3])}>继续 ↗</button></footer>
    </div>
  </div>;
}
