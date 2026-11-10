import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';
import { PoetrySpaceModal } from '../changyou/ChangyouPoetrySpaces';
import { useTypographyReducedMotion } from '../typography/useTypographyReducedMotion';
import './WorldChangyou.css';
import { AtmosphericTitle } from '../typography/AtmosphericTitle';
import { PhotographicWater } from '../effects/PhotographicWater';
import { FocusedLyricLab } from '../FocusedLyricLab';
import { INITIAL_USER_INTERPRETATIONS } from '../../data/userInterpretations';
import FallingText from '../effects/FallingText';

type SongId = 'lian' | 'sejie' | 'xiaocongming';
const SONGS: SongId[] = ['lian', 'sejie', 'xiaocongming'];
const ROOT = '/assets/changyou/';
const BACKGROUNDS: Record<SongId, string> = { lian: 'planets.jpg', sejie: 'garden.jpg', xiaocongming: 'stars.jpg' };
const ACCESSORIES = [
  { id: 'cube', shape: '83,166 145,182 146,244 87,250 62,222', swing: 45, duration: 6.8, turn: 12 },
  { id: 'note', shape: '28,361 131,353 174,402 148,420 29,416', swing: 36, duration: 8.3, turn: -8 },
  { id: 'record', shape: '39,539 182,537 190,687 43,690', swing: 52, duration: 9.7, turn: 7 },
  { id: 'pendant', shape: '578,0 658,0 643,332 710,412 720,719 694,790 627,767 614,522 604,389 585,339', swing: 64, duration: 7.6, turn: -5 }
];

function SongFragment({ text, index, reduced, falling = false }: { text: string; index: number; reduced: boolean; falling?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], index % 2 ? [25, -35] : [-25, 35]);
  const turn = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const opacity = useTransform(scrollYProgress, [0, .3, .75, 1], [.12, 1, 1, .25]);
  const [echo, setEcho] = useState(false);
  return <motion.div ref={ref} className={`cy-song-fragment cy-song-fragment--${index + 1} ${falling ? 'cy-falling-lyric' : ''}`} style={{ x: reduced ? 0 : x, rotate: reduced ? 0 : turn, opacity: reduced ? 1 : opacity }}>
    {falling && !reduced ? <FallingText text={text} split="letters" trigger={window.matchMedia('(hover: none)').matches ? 'click' : 'hover'} fontSize="clamp(25px, 4vw, 56px)" gravity={1} restoreDelay={2} /> : <button onClick={() => setEcho(value => !value)} aria-pressed={echo} aria-label={`${text}，切换回声`}>
      {text}<span className="cy-word-echo" aria-hidden="true" style={{ opacity: echo ? .36 : 0 }}>{text}</span>
    </button>}
  </motion.div>;
}

function SongSpace({ songId, track, onBack, onHome, onSelect, onExplore }: {
  songId: SongId; track: TrackData; onBack: () => void; onHome: () => void;
  onSelect: (id: SongId) => void; onExplore: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useTypographyReducedMotion();
  const px = useMotionValue(0);
  const wind = useSpring(px, { stiffness: 28, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const flight = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbit = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  const titleFade = useTransform(scrollYProgress, [0, .3], [1, 0]);
  const otherPhoto = useTransform(scrollYProgress, [0, .45, .8, 1], [0, 0, .8, .9]);
  const lines = (songId === 'sejie' ? track.extendedLyricSnippet : track.signatureLyric).split(/[；。\/]/).map(line=>line.trim()).filter(Boolean);
  return <div className={`cy-song-space cy-song-space--${songId}`} ref={ref} onPointerMove={e => {
    if (!reduced && e.pointerType !== 'touch') px.set((e.clientX / window.innerWidth - .5) * 16);
  }} onPointerLeave={() => px.set(0)}>
    <nav className="cy-nav"><button onClick={onBack}><ArrowLeft size={15} /> 回到铁盒</button><span>唱游 / {track.title}</span><button onClick={onHome}>HOME</button></nav>
    <section className="cy-photographic-space">
      <img className="cy-main-song-photo" src={ROOT + BACKGROUNDS[songId]} alt={`王菲《${track.title}》摄影背景`} />
      <PhotographicWater src={ROOT + BACKGROUNDS[songId]} />
      {songId === 'sejie' && <motion.div className="cy-gaze-field" aria-hidden="true" style={{ x: reduced ? 0 : wind }}><svg viewBox="0 0 1000 700"><g className="cy-gaze-frame" fill="none" stroke="currentColor" strokeWidth=".8"><path d="M350 170h-40v40m340-40h40v40M310 450v40h40m340-40v40h-40"/><ellipse className="cy-gaze-orbit" cx="500" cy="325" rx="155" ry="190"/><path className="cy-gaze-trace" d="M430 292Q450 280 470 294M530 294Q550 280 570 292M500 306l-12 60h23M455 406q45 20 90 0"/></g>{[430,470,530,570,500,455,545].map((x,i)=><circle key={i} className="cy-gaze-point" cx={x} cy={i<4?293:i===4?360:406} r="1.6" fill="currentColor" style={{animationDelay:`${i*.6}s`}}/>)}</svg><i className="cy-gaze-sweep"/></motion.div>}
      <motion.img className="cy-second-song-photo" src={ROOT + 'collage.jpg'} alt="" style={{ opacity: reduced ? 0 : otherPhoto }} />
      <motion.h1 className="cy-free-title" style={{ x: reduced ? 0 : wind, y: reduced ? 0 : flight, rotate: reduced ? 0 : orbit, opacity: titleFade }}><AtmosphericTitle text={track.title} /></motion.h1>
      <span className="cy-song-year">1 9 9 8</span>
    </section>
    <div className="cy-song-stream">
      <motion.div className="cy-stream-trace" aria-hidden="true" style={{ x: reduced ? 0 : wind }} />
      {lines.map((line, index) => <SongFragment key={line} text={line} index={index} reduced={reduced} falling={songId === 'lian'} />)}
      <div className="cy-exploration"><details><summary>关于这首歌</summary><p>{track.artisticNote}</p></details><button onClick={onExplore}>继续漫游 <ArrowUpRight size={16} /></button></div>
      <div className="cy-song-crossings" aria-label="切换唱游歌曲">{SONGS.map((id, i) => <button key={id} onClick={() => onSelect(id)} aria-current={id === songId ? 'page' : undefined}>{['脸', '色诫', '小聪明'][i]} ↗</button>)}</div>
    </div>
  </div>;
}

interface Props { onBackToCosmos: () => void; onSwitchWorld: (id: string) => void; onSelectSong?: (id: string) => void }
export const WorldChangyou: React.FC<Props> = ({ onBackToCosmos, onSelectSong }) => {
  const world = SEVEN_WORLDS.find(item => item.id === 'changyou')!;
  const reduced = useTypographyReducedMotion();
  const uid = useId().replace(/:/g, '');
  const [selected, setSelected] = useState<SongId | null>(null);
  const [beanOpen, setBeanOpen] = useState(false);
  const [opening, setOpening] = useState<SongId | null>(null);
  const [portalPoint, setPortalPoint] = useState({ x: 50, y: 50 });
  const [archive, setArchive] = useState<SongId | null>(null);
  const [sound, setSound] = useState(false);
  const tinRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<SongId | null>(null);
  useEffect(() => () => fayeSoundscape.stop(), []);
  const choose = (id: SongId) => { setSelected(id); setOpening(null); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const open = (id: SongId, event: React.MouseEvent<HTMLButtonElement>) => {
    if (opening) return;
    returnRef.current = id;
    if (reduced) { choose(id); return; }
    const rect = event.currentTarget.getBoundingClientRect();
    setPortalPoint({ x: (rect.left + rect.width / 2) / window.innerWidth * 100, y: (rect.top + rect.height / 2) / window.innerHeight * 100 });
    setOpening(id);
  };
  const returnToTin = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.requestAnimationFrame(() => {
      const index = SONGS.indexOf(returnRef.current || 'lian') + 1;
      tinRef.current?.querySelector<HTMLButtonElement>(`.cy-tin-song--${index}`)?.focus({ preventScroll: true });
    });
  };

  if (beanOpen) return <FocusedLyricLab entry={INITIAL_USER_INTERPRETATIONS.find(entry => entry.id === 'red_bean_changyou')!} onSelect={id => { if (id !== 'red_bean_changyou') onSelectSong?.(id); }} onHome={onBackToCosmos} onBack={() => { setBeanOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} />;

  return <div className="cy-world">
    {selected ? <SongSpace key={selected} songId={selected} track={world.tracks[SONGS.indexOf(selected)]}
      onBack={returnToTin} onHome={onBackToCosmos} onSelect={choose} onExplore={() => setArchive(selected)} /> : <>
      <nav className="cy-nav"><button onClick={onBackToCosmos}><ArrowLeft size={15} /> HOME</button><span>唱 游 / 1998</span><button aria-pressed={sound} aria-label={sound ? '关闭合成声景' : '开启合成声景'} onClick={() => {
        if (sound) fayeSoundscape.stop(); else fayeSoundscape.playWorldSoundscape('changyou'); setSound(!sound);
      }}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}</button></nav>
      <section className="cy-tin-universe" aria-label="唱游铁盒歌曲入口">
        <div className="cy-tin-scene" ref={tinRef}>
          <button className="cy-red-bean" aria-label="红豆，进入已有歌词艺术空间" onClick={() => { setBeanOpen(true); window.scrollTo({ top: 0, behavior: 'instant' }); }}>🫘</button>
          <PhotographicWater src={ROOT + 'tin.jpg'} />
          <svg className="cy-tin-art" viewBox="0 0 768 953" role="img" aria-label="蓝色背景上的唱游铁盒与漂浮配饰">
            <defs>
              <mask id={`${uid}-objects`}><rect width="768" height="953" fill="white" />{ACCESSORIES.map(object => <polygon key={object.id} points={object.shape} fill="black" />)}</mask>
              {ACCESSORIES.map(object => <clipPath id={`${uid}-${object.id}`} key={object.id}><polygon points={object.shape} /></clipPath>)}
            </defs>
            <image href={ROOT + 'tin.jpg'} width="768" height="953" mask={`url(#${uid}-objects)`} />
            {ACCESSORIES.map((object, i) => <motion.g key={object.id}
              initial={false} animate={reduced ? { y: 0, rotate: 0 } : { y: [0, -object.swing, object.swing * .55, 0], rotate: [0, object.turn, -object.turn * .35, 0] }}
              transition={reduced ? { duration: 0 } : { duration: object.duration, repeat: Infinity, delay: i * .3, ease: 'easeInOut' }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <image href={ROOT + 'tin.jpg'} width="768" height="953" clipPath={`url(#${uid}-${object.id})`} />
            </motion.g>)}
          </svg>
          <div className="cy-tin-songs" aria-label="铁盒中的歌曲">{SONGS.map((id, index) => <motion.button key={id} className={`cy-tin-song cy-tin-song--${index + 1}`} onClick={event => open(id, event)}
            whileHover={reduced ? undefined : { y: -5, scale: 1.08 }} whileTap={reduced ? undefined : { scale: .95 }} aria-label={`打开铁盒中的《${world.tracks[index].title}》`}>
            <small>{world.tracks[index].number}</small><span>{world.tracks[index].title}</span>
          </motion.button>)}</div>
        </div>
        <p className="cy-tin-whisper">从盒子里，拾起一首歌。</p>
      </section>
    </>}
    <AnimatePresence>{opening && <motion.div className="cy-song-portal" aria-hidden="true"
      initial={{ clipPath: `circle(0% at ${portalPoint.x}% ${portalPoint.y}%)` }} animate={{ clipPath: `circle(150% at ${portalPoint.x}% ${portalPoint.y}%)` }} transition={{ duration: 1.05, ease: [.22, 1, .36, 1] }} onAnimationComplete={() => choose(opening)}>
      <img src={ROOT + BACKGROUNDS[opening]} alt="" />
    </motion.div>}</AnimatePresence>
    <AnimatePresence>{archive && <div className="cy-original-exploration"><PoetrySpaceModal songId={archive} onClose={() => setArchive(null)} onSelectSong={setArchive} /></div>}</AnimatePresence>
  </div>;
};
