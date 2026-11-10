import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SEVEN_WORLDS, TrackData } from '../data/sevenWorlds';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import './FeimimiSongSpaces.css';
import SideRays from './effects/SideRays';

type Props = { title: string; photo: string; onBack: () => void; onHome: () => void };
function Verse({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useTypographyReducedMotion();
  return <motion.div className={`fms-verse ${className}`} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .25, once: true }} transition={{ duration: 1.5 }}>{children}</motion.div>;
}
function Credits({ track }: { track: TrackData }) {
  return <footer className="fms-credits"><p>作曲 · {track.composer}　作词 · {track.lyricist}　编曲 · {track.arranger}</p><details><summary>关于这首歌</summary><p>{track.artisticNote}</p></details><span>王菲 · 菲靡靡之音 · 1995</span></footer>;
}
function Moon({ photo, track }: { photo: string; track: TrackData }) {
  const root = useRef<HTMLDivElement>(null); const reduced = useTypographyReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const moonY = useTransform(progress, [0, 1], [80, -110]);
  const approach = useTransform(progress, [0, .65], [-55, 0]);
  const reply = useTransform(progress, [0, .65], [65, 0]);
  return <div ref={root} className="fms-moon">
    <div className="fms-moon-art"><SideRays rayColor1="#FFC46B" rayColor2="#96c8ff" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse/><img src={photo} alt="王菲托腮微笑"/><motion.svg style={{ y: reduced ? 0 : moonY }} viewBox="0 0 300 300" aria-hidden="true"><defs><filter id="moon-paper"><feTurbulence baseFrequency=".035" numOctaves="4" seed="7"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs><circle cx="150" cy="150" r="127" fill="#a7a396" opacity=".14" filter="url(#moon-paper)"/><circle cx="150" cy="150" r="128" fill="none" stroke="currentColor" strokeWidth=".45"/></motion.svg></div>
    <section className="fms-moon-opening"><span className="fms-folio">苏轼 · 水调歌头</span><h1>但愿<br/>人长久</h1><Verse><p>明月几时有<br/>把酒问青天</p></Verse></section>
    <section className="fms-moon-distance"><Verse><p>不知天上宫阙<br/>今夕是何年</p></Verse><motion.p style={{ x: reduced ? 0 : approach }} className="fms-separated">人有悲欢离合</motion.p><motion.p style={{ x: reduced ? 0 : reply }} className="fms-reply">月有阴晴圆缺</motion.p><Verse><small>此事古难全</small></Verse></section>
    <section className="fms-moon-ending"><Verse><p>但愿人长久<br/><span>千里共婵娟</span></p></Verse></section>
  </div>;
}
function Sea({ photo }: { photo: string }) {
  const root = useRef<HTMLDivElement>(null); const reduced = useTypographyReducedMotion();
  useEffect(() => {
    root.current?.querySelectorAll('svg').forEach(svg => {
      if (reduced) svg.pauseAnimations(); else svg.unpauseAnimations();
    });
  }, [reduced]);
  const { scrollYProgress: progress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const warmth = useTransform(progress, [0, .3, .55, .85], [0, .8, .65, 0]);
  return <div className="fms-sea" ref={root} onPointerMove={event => { if (reduced) return; root.current?.style.setProperty('--wind', `${(event.clientX / window.innerWidth - .5) * 12}px`); }}>
    <div className="fms-sea-art"><SideRays rayColor1="#FFC46B" rayColor2="#96c8ff" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse/><img src={photo} alt="蓝绿色舞台服装的王菲"/><motion.div className="fms-sunset" style={{ opacity: reduced ? .25 : warmth }}/><svg className="fms-frond" viewBox="0 0 240 500" aria-hidden="true"><path d="M25 500Q30 220 220 0M54 350Q-35 240 10 145Q55 225 54 350M75 278Q150 280 225 190Q130 195 75 278M104 213Q55 130 99 55Q124 147 104 213M150 135Q214 135 240 63Q180 74 150 135" fill="none" stroke="currentColor" strokeWidth="7"/></svg></div>
    <section className="fms-sea-arrival"><h1>南海姑娘</h1><span className="fms-sea-edition">南 海 ／ 一 九 九 五</span><svg className="fms-wave-words" viewBox="0 0 700 180" role="img" aria-label="椰风挑动银浪"><defs><path id="fms-wave" d="M10 100Q180 15 350 100T690 100"><animate attributeName="d" dur="12s" repeatCount="indefinite" values="M10 100Q180 15 350 100T690 100;M10 100Q180 165 350 100T690 100;M10 100Q180 15 350 100T690 100"/></path></defs><text><textPath href="#fms-wave" startOffset="8%">椰风挑动银浪</textPath></text></svg></section>
    <section className="fms-sea-sunset"><Verse><p>夕阳披上彩霞</p><p>宛风吹动着她的发<br/>端详着她的眼睛</p></Verse></section>
    <section className="fms-sea-retreat"><Verse><p>为什么她在哭泣<br/>为什么泪如雨下</p><p className="fms-sea-last">南海姑娘<br/>谁在听你的心事</p></Verse></section>
  </div>;
}
function Smoke({ photo }: { photo: string }) {
  const root = useRef<HTMLDivElement>(null); const reduced = useTypographyReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const dusk = useTransform(progress, [0, .6, 1], [0, .12, .2]);
  const dissolve = useTransform(progress, [.72, .98], [1, 0]);
  return <div className="fms-smoke" ref={root}><div className="fms-smoke-art"><SideRays rayColor1="#FFC46B" rayColor2="#96c8ff" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse/><img src={photo} alt="短发浅色衣装的王菲"/><svg className="fms-smoke-ribbons" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="fms-smoke-flow" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".009 .016" numOctaves="3" seed="9"/><feDisplacementMap in="SourceGraphic" scale="110"/><feGaussianBlur stdDeviation="9"/></filter><linearGradient id="smoke-ink"><stop stopColor="#f5f1e8" stopOpacity="0"/><stop offset=".5" stopColor="#fffdf7" stopOpacity=".6"/><stop offset="1" stopColor="#e6ded0" stopOpacity="0"/></linearGradient></defs>{[0,1,2].map(i=><path key={i} className={`fms-smoke-ribbon ribbon-${i}`} d={`M${80+i*110} 1120C${600+i*90} 700 -200 600 ${300+i*100} 300S600 30 240 -200`} fill="none" stroke="url(#smoke-ink)" strokeWidth={130-i*24} filter="url(#fms-smoke-flow)"/>)}</svg><motion.div className="fms-dusk" style={{ opacity: reduced ? .08 : dusk }}/></div>
    <section className="fms-smoke-start"><h1>又见炊烟</h1><Verse><p>又见炊烟升起</p></Verse></section>
    <section className="fms-smoke-middle"><Verse><p>暮色罩大地</p></Verse><Verse className="fms-smoke-question"><p>想问阵阵炊烟<br/>你要去哪里</p></Verse></section>
    <section className="fms-smoke-end"><motion.div style={{ opacity: reduced ? 1 : dissolve }}><Verse><p>夕阳有诗情<br/>黄昏有画意</p><p>诗情画意虽然美丽<br/>我心中只有你</p></Verse></motion.div></section>
  </div>;
}
function Snow({ photo }: { photo: string }) {
  const root = useRef<HTMLDivElement>(null); const reduced = useTypographyReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const lotus = useTransform(progress, [0, .4, .72, 1], [0, 0, .42, .08]);
  const white = useTransform(progress, [.7, 1], [0, .88]);
  return <div className="fms-snow" ref={root}><div className="fms-snow-art"><SideRays rayColor1="#FFC46B" rayColor2="#96c8ff" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse/><img src={photo} alt="王菲短发蓝紫衣装托腮摄影"/><div className="fms-snowfall" aria-hidden="true">{Array.from({ length: 19 }, (_,i)=><i key={i} style={{ left: `${(i*37)%100}%`, animationDelay: `${-i*1.7}s`, animationDuration: `${18+i%7}s` }}/>)}</div><motion.svg className="fms-lotus" style={{ opacity: reduced ? .24 : lotus }} viewBox="0 0 500 450" aria-hidden="true"><defs><filter id="lotus-grain"><feTurbulence baseFrequency=".09" numOctaves="3" seed="12" result="grain"/><feComposite in="grain" in2="SourceGraphic" operator="in" result="texture"/><feBlend in="SourceGraphic" in2="texture" mode="soft-light"/></filter></defs><g filter="url(#lotus-grain)" fill="#b4b2c1" fillOpacity=".3" stroke="#827d99" strokeWidth=".7">{[-65,-42,-22,0,22,42,65].map(angle=><path key={angle} transform={`rotate(${angle} 250 335)`} d="M250 335C128 265 178 158 250 70C323 157 373 266 250 335Z"/>)}<path d="M250 335Q240 390 256 450" fill="none"/></g></motion.svg><motion.div className="fms-snow-white" style={{ opacity: reduced ? 0 : white }}/></div>
    <section className="fms-snow-entry"><h1>雪中莲</h1><span>一九九五 · 冬</span></section>
    <section className="fms-snow-verses"><Verse><p>雪花飘<br/>飘起了多少爱恋</p><p>雪花飞<br/>飞起了多少情缘</p></Verse></section>
    <section className="fms-snow-finish"><Verse><p>莲花开在雪中间</p><p>多少的希望<br/>多少的心愿</p></Verse></section>
  </div>;
}
export function FeimimiSongSpaces({ title, photo, onBack, onHome }: Props) {
  const track = SEVEN_WORLDS.find(world => world.id === 'feimimizhinyin')?.tracks.find(item => item.title === title);
  if (!track) return null;
  return <main className="fms-space" data-song={title}><nav className="fms-nav"><button onClick={onBack}>← 菲靡靡之音 · 目录</button><button onClick={onHome}>HOME ↗</button></nav>{title === '但愿人长久' ? <Moon photo={photo} track={track}/> : title === '南海姑娘' ? <Sea photo={photo}/> : title === '又见炊烟' ? <Smoke photo={photo}/> : <Snow photo={photo}/>}<Credits track={track}/></main>;
}
