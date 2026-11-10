import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { SEVEN_WORLDS, TrackData } from '../../data/sevenWorlds';
import { INITIAL_USER_INTERPRETATIONS } from '../../data/userInterpretations';
import { fayeSoundscape } from '../../utils/experimentalSoundEngine';
import './WorldFuzao.css';

export interface FuzaoEntrance {
  left: number;
  top: number;
  width: number;
  height: number;
  src: string;
}
interface WorldFuzaoProps {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
  onSelectSong?: (entryId: string) => void;
  entrance?: FuzaoEntrance | null;
}

const PHOTOS = Array.from({ length: 6 }, (_, i) => `/assets/fuzao/photo-${String(i + 1).padStart(2, '0')}.jpg`);
const POSITIONS = [
  [7, 9, -9, 1.0], [49, 4, 6, 1.8], [24, 31, -5, 1.1], [67, 29, 11, .85],
  [4, 56, 4, 1.0], [48, 53, -8, 1.6], [18, 79, -3, 1.45], [70, 80, 7, 1.1]
];
// Fisher–Yates, once per visit. No render-time random positions or inaccessible links.
const shuffledPhotos = () => {
  const order = [...PHOTOS];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

function Photograph({ src }: { src: string }) {
  const [ratio, setRatio] = useState(0);
  return <div className="fz-photo-flow" style={{ '--fz-ratio': ratio } as React.CSSProperties}>
    <img src={src} alt="" draggable={false} onLoad={e => {
      const image = e.currentTarget;
      if (image.naturalWidth) setRatio(image.naturalHeight / image.naturalWidth);
    }} />
  </div>;
}

function SongSeed({ track, index, onSelect, reduced }: {
  track: TrackData; index: number; onSelect: () => void; reduced: boolean;
}) {
  const [x, y, angle, size] = POSITIONS[index % POSITIONS.length];
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const windX = useSpring(dx, { stiffness: 100, damping: 20 });
  const windY = useSpring(dy, { stiffness: 100, damping: 20 });
  return <motion.div className="fz-seed" style={{ left: `${x}%`, top: `${y}%`, x: windX, y: windY, fontSize: `clamp(${16 * size}px, ${2.4 * size}vw, ${34 * size}px)` }}>
    <motion.button
      onClick={onSelect}
      onPointerMove={e => {
        if (reduced || e.pointerType === 'touch') return;
        const bounds = e.currentTarget.getBoundingClientRect();
        dx.set((bounds.left + bounds.width / 2 - e.clientX) * .09);
        dy.set((bounds.top + bounds.height / 2 - e.clientY) * .09);
      }}
      onPointerLeave={() => { dx.set(0); dy.set(0); }}
      initial={reduced ? false : { opacity: 0, rotate: angle - 18, y: 32 }}
      animate={reduced ? { opacity: 1, rotate: angle, y: 0 } : { opacity: 1, rotate: [angle, angle + 2, angle], y: [0, -9, 3, 0] }}
      transition={reduced ? { duration: 0 } : { opacity: { delay: .8 + index * .09 }, rotate: { duration: 9 + index, repeat: Infinity }, y: { duration: 7 + index, repeat: Infinity, ease: 'easeInOut' } }}
      whileTap={reduced ? undefined : { scale: .94, rotate: -angle }}
      aria-label={`第${track.number}首 ${track.title}，进入歌曲空间`}
    ><small>{track.number}</small><span>{track.title}</span><ArrowUpRight size={16} /></motion.button>
  </motion.div>;
}

export const WorldFuzao: React.FC<WorldFuzaoProps> = ({ onBackToCosmos, onSelectSong, entrance }) => {
  const world = SEVEN_WORLDS.find(w => w.id === 'fuzao')!;
  const reduced = !!useReducedMotion();
  const [photos] = useState(shuffledPhotos);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [selected, setSelected] = useState<TrackData | null>(null);
  const [songPhoto, setSongPhoto] = useState(PHOTOS[0]);
  const [sound, setSound] = useState(false);
  const [exposure, setExposure] = useState(0);
  const [arriving, setArriving] = useState(!!entrance && !reduced);
  const detailRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const windX = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const windY = useSpring(pointerY, { stiffness: 45, damping: 20 });
  const { scrollYProgress } = useScroll({ target: detailRef, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [32, -48]);
  const counterDrift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-18, 35]);
  const isNature = selected?.title === '野三坡';
  const isDrop = selected?.title === '堕落';
  const linkedEntry = INITIAL_USER_INTERPRETATIONS.find(entry => entry.albumId === 'fuzao' && entry.songTitle === selected?.title);

  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(() => setPhotoIndex(i => (i + 1) % photos.length), 5500);
    return () => window.clearInterval(timer);
  }, [auto, photos.length]);
  useEffect(() => { const image = new Image(); image.src = photos[(photoIndex + 1) % photos.length]; }, [photos, photoIndex]);
  useEffect(() => () => fayeSoundscape.stop(), []);

  const selectSong = (track: TrackData) => {
    setSelected(track);
    // The final uploaded photograph is exclusive to every Yesanpo selection.
    setSongPhoto(track.title === '野三坡' ? PHOTOS[5] : PHOTOS[Math.floor(Math.random() * 5)]);
    window.requestAnimationFrame(() => {
      detailRef.current?.focus({ preventScroll: true });
      detailRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    });
  };

  return <div className="fz-world" ref={rootRef} onPointerMove={e => {
    if (reduced || e.pointerType === 'touch') return;
    const box = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX / Math.max(box.width, 1) - .5) * 15);
    pointerY.set((e.clientY / window.innerHeight - .5) * 10);
  }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <nav className="fz-nav" aria-label="浮躁空间导航">
      <button onClick={onBackToCosmos}><ArrowLeft size={15} /> HOME / 返回轨道</button>
      <span>FAYE · 1996 / 浮躁</span>
      <div>
        <button onClick={() => setAuto(value => !value)} aria-label={auto ? '暂停背景轮换' : '继续背景轮换'} aria-pressed={!auto}>{auto ? <Pause size={15} /> : <Play size={15} />}<span>{String(photoIndex + 1).padStart(2, '0')} / 06</span></button>
        <button onClick={() => {
          if (sound) fayeSoundscape.stop(); else fayeSoundscape.playWorldSoundscape('fuzao');
          setSound(!sound);
        }} aria-label={sound ? '关闭合成声景' : '播放合成声景'} aria-pressed={sound}>{sound ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>合成声景</span></button>
      </div>
    </nav>

    <div className="fz-canvas">
      <div className="fz-backdrop" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={photos[photoIndex]} className="fz-slide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 1.4 }}>
            <Photograph src={photos[photoIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="fz-foreground">
        <header className="fz-hero">
          <span className="fz-edition">无规则的呼吸 / A RECORD WITHOUT EDGES</span>
          <h1 aria-label="浮躁">
            <motion.span aria-hidden="true" initial={reduced ? false : { x: -100, y: 80, rotate: -30, clipPath: 'inset(100% 0 0)' }} animate={{ x: 0, y: 0, rotate: -8, clipPath: 'inset(0% 0 0)' }} transition={{ duration: 1.6, delay: .3, type: 'spring', damping: 21 }}>浮</motion.span>
            <motion.span aria-hidden="true" initial={reduced ? false : { x: 130, y: -100, rotate: 26 }} animate={{ x: 0, y: 0, rotate: 9 }} transition={{ duration: 1.8, delay: .55, type: 'spring', damping: 18 }}>躁</motion.span>
          </h1>
          <motion.span className="fz-english" style={{ x: reduced ? 0 : windX }}>RESTLESSNESS</motion.span>
          <span className="fz-year">19<br /><i>96</i></span>
          <p className="fz-note">风没有目录。<br />从一个名字，走向另一种呼吸。</p>
          <a className="fz-explore" href="#fuzao-songs">向下 / 寻找声音 ↘</a>
        </header>
        <section id="fuzao-songs" className="fz-song-field" aria-label="浮躁歌曲目录，按原有顺序排列">
          <div className="fz-field-label">声音散落于此 / {world.tracks.length} 个入口<br /><small>编号保留原目录顺序 · 点击曲名进入</small></div>
          {world.tracks.map((track, index) => <SongSeed key={track.number} track={track} index={index} reduced={reduced} onSelect={() => selectSong(track)} />)}
          <svg className="fz-orbit-line" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M50 95 Q270 10 350 190 T750 270 Q950 310 830 460 T190 540" /></svg>
        </section>
      </div>
    </div>

    <section ref={detailRef} className={`fz-detail ${isNature ? 'fz-detail--nature' : isDrop ? 'fz-detail--drop' : ''}`} aria-label="选中歌曲空间" tabIndex={-1}>
      <AnimatePresence mode="wait" initial={false}>
        {selected && <motion.div className="fz-song-scene" key={selected.number} initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)', rotate: -.5 }} animate={{ clipPath: 'inset(0 0% 0 0)', rotate: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] }}>
          <div className="fz-song-image" aria-hidden="true"><Photograph src={songPhoto} /></div>
          <div className="fz-song-ink">
            <div className="fz-song-toolbar"><a href="#fuzao-songs">↖ 返回声音散点</a><span>{selected.number} / {selected.title}</span></div>
            <motion.div className="fz-song-heading" style={{ y: drift, x: reduced ? 0 : windX }}>
              <span>{isNature ? '绿山坡' : isDrop ? 'NEGATIVE / 感官失序' : 'OPEN FREQUENCY / 自由频率'}</span>
              <h2>{isDrop ? <button onClick={() => setExposure(value => value + 1)} aria-label="堕落，触发一次文字错位">
                <motion.span key={exposure} style={{ display: 'inline-block' }} animate={reduced ? undefined : { x: [0, 9, -3, 0], skewX: [0, -5, 0] }} transition={{ duration: .45 }}>{selected.title}</motion.span>
              </button> : selected.title}</h2>
              {isDrop && <motion.span className="fz-echo" aria-hidden="true" style={{ y: counterDrift }}>堕 落 / FALL</motion.span>}
            </motion.div>
            {isNature && <div className="fz-green-slope-rain" aria-hidden="true">{Array.from({length:22},(_,i)=><span key={i} style={{left:`${(i*43+9)%97}%`,'--slope-delay':`${-i*2.7}s`,'--slope-duration':`${22+i%8*3}s`,'--slope-size':`${18+i%5*7}px`,'--slope-drift':`${(i%2?1:-1)*(20+i%4*15)}px`,'--slope-turn':`${i%2?9:-12}deg`} as React.CSSProperties}>绿山坡</span>)}</div>}
            <motion.div className="fz-song-copy" style={{ y: counterDrift, x: reduced ? 0 : windY }}>
              <p className="fz-inscription">{selected.signatureLyric}</p>
              {selected.extendedLyricSnippet !== selected.signatureLyric && <p className="fz-verse">{selected.extendedLyricSnippet}</p>}
              <p className="fz-art-note">{selected.artisticNote}</p>
              <div className="fz-credits">曲 / {selected.composer}<br />词 / {selected.lyricist}<br />编 / {selected.arranger}</div>
              <div className="fz-keywords">{selected.moodKeywords.map(word => <span key={word}>{word}</span>)}</div>
              {linkedEntry && onSelectSong && <button className="fz-original-link" onClick={() => onSelectSong(linkedEntry.id)}>进入原有歌词艺术空间 <ArrowUpRight size={16} /></button>}
            </motion.div>
            <div className="fz-neighbours" aria-label="切换歌曲">{world.tracks.map(track => <button key={track.number} aria-pressed={selected.number === track.number} onClick={() => selectSong(track)}>{track.number} {track.title}</button>)}</div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </section>

    {arriving && entrance && <motion.div className="fz-entrance" aria-hidden="true" initial={{ left: entrance.left, top: entrance.top, width: entrance.width, height: entrance.height, borderRadius: 12, opacity: 1 }} animate={{ left: 0, top: 0, width: '100vw', height: '100svh', borderRadius: 0, opacity: [1, 1, 0] }} transition={{ duration: 1.65, ease: [.22, 1, .36, 1], opacity: { times: [0, .58, 1], duration: 1.65 } }} onAnimationComplete={() => setArriving(false)}><img src={entrance.src} alt="" /></motion.div>}
  </div>;
};
