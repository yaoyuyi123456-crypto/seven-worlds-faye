import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ALBUMS, Song } from '../../data/fayeArchive';
import { INITIAL_USER_INTERPRETATIONS } from '../../data/userInterpretations';
import { JIANGAI_PHOTOS } from '../../data/jiangaiArt';
import './JiangaiArt.css';
import CircularText from '../typography/CircularText';
import TextPressure from '../typography/TextPressure';
import { QuietWarpTitle } from '../typography/QuietWarpTitle';
import FaultyTerminal from '../effects/FaultyTerminal';
import { CarouselInstallation } from '../CarouselInstallation';

interface Props {
  onBackToCosmos: () => void;
  onSwitchWorld: (worldId: string) => void;
  onSelectSong?: (entryId: string) => void;
}

export const WorldJiangai: React.FC<Props> = ({ onBackToCosmos, onSelectSong }) => {
  const album = ALBUMS.find(item => item.id === 'jiangai')!;
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const background = '/assets/jiangai/directory-background.jpg';
  const [opening, setOpening] = useState<Song | null>(null);
  const [selected, setSelected] = useState<Song | null>(null);
  const pointer = useMotionValue(0);
  const wind = useSpring(pointer, { stiffness: 35, damping: 22 });
  const counterWind = useTransform(wind, value => -value * .6);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const paperColor = useTransform(scrollYProgress, [0, .65, 1], ['#aebba7', '#d5d7d0', '#bac6b6']);
  const paperShift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -70]);
  const photoSaturation = useTransform(scrollYProgress, [0, .8, 1], ['saturate(.75)', 'saturate(.05)', 'saturate(.25)']);
  const openSong = (song: Song) => { if (!opening) setOpening(song); };
  const finishOpening = () => {
    if (!opening) return;
    const entry = INITIAL_USER_INTERPRETATIONS.find(item => item.albumId === 'jiangai' && item.songTitle === opening.title);
    if (entry && onSelectSong) onSelectSong(entry.id);
    else { setSelected(opening); window.scrollTo({ top: 0, behavior: 'instant' }); }
    setOpening(null);
  };

  return <motion.div ref={ref} className="ja-art ja-directory" style={{ backgroundColor: reduced ? '#bec8b8' : paperColor, backgroundImage: `linear-gradient(#b8c2b2b0, #d3d7cebc), url("${background}")`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat' }} onPointerMove={e => {
    if (!reduced && e.pointerType !== 'touch') pointer.set((e.clientX / window.innerWidth - .5) * 14);
  }} onPointerLeave={() => pointer.set(0)}>
    <nav className="ja-nav" aria-label="将爱导航">
      <button onClick={onBackToCosmos}><ArrowLeft size={15} /> HOME</button>
      <span>将爱 / To Love · 2003</span>
      {selected && <button onClick={() => setSelected(null)}>返回专辑目录</button>}
    </nav>
    {selected ? <section className={`ja-other-song ${selected.title === '旋木' ? 'ja-carousel-song' : ''}`}>
      <span>To Love / {selected.year}</span><h1>{selected.title}</h1>
      {selected.title === '旋木' && <CarouselInstallation/>}
      <p>{selected.fullLyricsSnippet}</p><p>{selected.curatorNote}</p>
      <button onClick={() => setSelected(null)}>↖ 返回将爱</button>
    </section> : <>
      <header className="ja-directory-hero">
        <FaultyTerminal tint="#A7EF9E" glyphs="blocks" scale={1.5} digitSize={1.2} timeScale={.5} brightness={.75} glow={.5} persistence={.5} mouseStrength={.5} mouseGlow={.6} curvature={.1} vignette={.25} clickEffect="glitch" />
        <div className="ja-hero-photo"><motion.img src={background} alt="王菲《将爱》摄影" style={{ filter: reduced ? 'saturate(.5)' : photoSaturation }} /></div>
        <motion.div className="ja-tracing ja-tracing--hero" style={{ x: reduced ? 0 : wind, y: paperShift }} aria-hidden="true" />
        <p className="ja-eyebrow">The Art of Letting Go</p>
        <h1 className="ja-warp-heading"><QuietWarpTitle text="将爱" /></h1>
        <p className="ja-love-question">将爱进行到底<span>or</span>将爱情进行到底？</p>
        <div className="ja-hero-english"><TextPressure text="TO LOVE" minFontSize={22} smoothing={.85} idle="pulse" idleSpeed={.2} pressureColor="#68775c" /></div>
        <div className="ja-type-orbit"><CircularText text="THE ART OF LETTING GO · TO LOVE · " size={154} fontSize={11} fontWeight={400} spinDuration={120} onHover="slowDown" hoverTilt={3} ring><span>2003</span></CircularText></div>
        <p className="ja-quiet-note">把相遇留给时间。<br />把未说完的话，留在纸的背面。</p>
        <a href="#jiangai-index" className="ja-index-link">轻轻揭开 / 歌曲目录 ↘</a>
      </header>
      <section id="jiangai-index" className="ja-paper-index" aria-label="将爱歌曲目录">
        <div className="ja-index-intro"><h2>留下的，<br /><i>与交出去的。</i></h2><p>选择一层纸，进入一首歌。</p></div>
        <div className="ja-paper-cloud">
          {album.tracks.map((song, i) => <motion.button key={song.id} className={`ja-song-paper ja-song-paper--${i + 1}`} onClick={() => openSong(song)}
            style={{ x: reduced ? 0 : i % 2 ? counterWind : wind }}
            whileHover={reduced ? undefined : { y: -7, rotate: i % 2 ? 1 : -2 }} whileTap={reduced ? undefined : { scale: .99 }}
            aria-label={`进入《${song.title}》歌词空间`}>
            <span className="ja-paper-number">0{i + 1}</span>
            <span className="ja-paper-window" aria-hidden="true"><img src={song.title === '乘客' || song.title === '不留' ? JIANGAI_PHOTOS[0] : song.title === '阳宝' ? JIANGAI_PHOTOS[2] : song.title === '旋木' ? JIANGAI_PHOTOS[3] : JIANGAI_PHOTOS[1]} alt="" /></span>
            <span className="ja-paper-title">{song.title}</span><ArrowUpRight size={17} />
            <span className="ja-paper-concept">{song.title === '乘客' ? 'Passing Through' : song.title === '不留' ? 'What Remains' : song.title === '阳宝' ? 'A Sunflower in Silence' : 'To Love'}</span>
          </motion.button>)}
        </div>
      </section>
      <footer className="ja-directory-end"><span>To Love</span><p>有些空白，不必填满。</p></footer>
    </>}
    <AnimatePresence>{opening && <motion.div className="ja-unfold" aria-hidden="true" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      <img src={opening.title === '阳宝' ? JIANGAI_PHOTOS[2] : JIANGAI_PHOTOS[0]} alt="" />
      <motion.div className="ja-unfold-left" initial={{ x: 0 }} animate={{ x: '-105%' }} transition={{ duration: reduced ? 0 : 1.1, ease: [.22, 1, .36, 1] }} />
      <motion.div className="ja-unfold-right" initial={{ x: 0 }} animate={{ x: '105%' }} transition={{ duration: reduced ? 0 : 1.1, ease: [.22, 1, .36, 1] }} onAnimationComplete={finishOpening} />
      <span>{opening.title}</span>
    </motion.div>}</AnimatePresence>
  </motion.div>;
};
