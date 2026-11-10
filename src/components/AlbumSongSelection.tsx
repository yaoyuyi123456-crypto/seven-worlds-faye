import React from 'react';
import { usePageStart } from './typography/usePageStart';
import { DidarDirectory } from './DidarDirectory';
import { FeimimiSongSpaces } from './FeimimiSongSpaces';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_USER_INTERPRETATIONS } from '../data/userInterpretations';
import { SEVEN_WORLDS } from '../data/sevenWorlds';
import { ALBUMS } from '../data/fayeArchive';
import { DidarArtSpace, DidarKineticText } from './DidarArtSpace';
import { StrangersDirectory } from './StrangersDirectory';
import { StrangersSongSpace } from './StrangersSongSpace';
import { DidarEye } from './DidarEye';
import './FeimimiOriginalContrast.css';
import { Faye2001Balloons } from './Faye2001Balloons';
import { Faye2001Installations, FAYE_2001_INSTALLATION_TITLES } from './Faye2001Installations';
import { Faye2001EditorialSong } from './Faye2001EditorialSong';
import { FAYE2001_SONG_PHOTOS } from '../data/faye2001Installations';
import Aurora from './effects/Aurora';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import { DIDAR_ART_TITLES, DIDAR_DIRECTORY_PHOTO, DidarArtTitle } from '../data/didarArt';
import { RetroTypewriter } from './typography/RetroTypewriter';

interface DirectoryTrack {
  number: string;
  title: string;
  signatureLyric: string;
  extendedLyricSnippet: string;
  artisticNote: string;
}

interface DirectoryAlbum {
  id: string;
  title: string;
  chineseTitle: string;
  year: number;
  heroPhoto: string;
  accent: string;
  curatorialStatement: string;
  tracks: DirectoryTrack[];
}

interface AlbumSongSelectionProps {
  albumId: string;
  onBackToHome: () => void;
  onSelectSong: (entryId: string) => void;
  initialSongTitle?: string;
}

const directoryBackgrounds: Record<string, string> = {
  didar: DIDAR_DIRECTORY_PHOTO,
  fuzao: '/assets/aistudio/IMG_5421_f530edaa.png',
  jiangai: '/assets/aistudio/IMG_1638_159f9005.JPG'
};

const normalizeTitle = (title: string) => title.replace(/[《》\s]/g, '').replace('荼靡', '荼蘼');
const feimimiPhotos: Record<string, string> = { '但愿人长久': '/assets/feimimi/photo-01.jpg', '南海姑娘': '/assets/feimimi/photo-02.jpg', '又见炊烟': '/assets/feimimi/photo-03.jpg', '雪中莲': '/assets/feimimi/photo-04.jpg' };

export const AlbumSongSelection: React.FC<AlbumSongSelectionProps> = ({ albumId, onBackToHome, onSelectSong, initialSongTitle }) => {
  const reduced = useTypographyReducedMotion();
  const world = SEVEN_WORLDS.find(item => item.id === albumId);
  const archive = ALBUMS.find(item => item.id === albumId);
  const album: DirectoryAlbum | null = world
    ? {
        id: world.id,
        title: world.title,
        chineseTitle: world.chineseTitle,
        year: world.year,
        heroPhoto: world.heroPhoto,
        accent: world.visualDirection.colorPalette.primary,
        curatorialStatement: world.curatorialStatement,
        tracks: world.tracks.filter(track => (albumId !== 'didar' || !['Di-Dar', '或者'].includes(track.title)) && (albumId !== 'faye2001' || !['等等', '白痴', '流年'].includes(track.title)) && (albumId !== 'feimimizhinyin' || !['初恋的地方','翠湖寒'].includes(track.title))).map(track => ({
          number: track.number,
          title: track.title,
          signatureLyric: track.signatureLyric,
          extendedLyricSnippet: track.extendedLyricSnippet,
          artisticNote: track.artisticNote
        }))
      }
    : archive
      ? {
          id: archive.id,
          title: archive.englishTitle,
          chineseTitle: archive.title,
          year: archive.year,
          heroPhoto: archive.heroBgImage,
          accent: archive.aestheticDna.accentColor,
          curatorialStatement: archive.curatorOverview,
          tracks: archive.tracks.map((track, index) => ({
            number: String(index + 1).padStart(2, '0'),
            title: track.title,
            signatureLyric: track.keyLyric,
            extendedLyricSnippet: track.fullLyricsSnippet,
            artisticNote: track.curatorNote
          }))
        }
      : null;
  const [selectedTrack, setSelectedTrack] = React.useState<DirectoryTrack | null>(() => album?.tracks.find(track => track.title === initialSongTitle) || null);
  usePageStart(`${albumId}:${selectedTrack?.title || 'directory'}`);

  if (!album) return null;

  const background = directoryBackgrounds[albumId] || album.heroPhoto;
  const handleSelectTrack = (track: DirectoryTrack) => {
    if (albumId === 'strangers' || albumId === 'feimimizhinyin') { setSelectedTrack(track); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    const interpretation = INITIAL_USER_INTERPRETATIONS.find(entry =>
      entry.albumId === albumId && normalizeTitle(entry.songTitle) === normalizeTitle(track.title)
    );
    if (interpretation) {
      onSelectSong(interpretation.id);
      return;
    }
    setSelectedTrack(track);
  };

  if (selectedTrack && albumId === 'didar' && DIDAR_ART_TITLES.some(title => title === selectedTrack.title)) {
    return <DidarArtSpace title={selectedTrack.title as DidarArtTitle} originalPhoto={album.heroPhoto}
      onOpenLove={() => onSelectSong('woaini_jiangai')}
      onBack={() => { setSelectedTrack(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} onHome={onBackToHome}
      onSelect={title => { const track = album.tracks.find(item => item.title === title); if (track) handleSelectTrack(track); }}
    />;
  }

  if (selectedTrack && albumId === 'strangers') return <StrangersSongSpace key={selectedTrack.number} track={selectedTrack} tracks={album.tracks} onSelect={handleSelectTrack} onBack={() => { setSelectedTrack(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} onHome={onBackToHome} />;

  if (selectedTrack && albumId === 'faye2001' && FAYE_2001_INSTALLATION_TITLES.includes(selectedTrack.title)) return <Faye2001Installations key={selectedTrack.title} title={selectedTrack.title} photo={FAYE2001_SONG_PHOTOS[selectedTrack.title] || album.heroPhoto} onBack={() => { setSelectedTrack(null); window.scrollTo({top:0,behavior:'instant'}); }} onHome={onBackToHome} onSelect={title => { const track=album.tracks.find(item=>item.title===title);if(track)handleSelectTrack(track); }} />;
  if (selectedTrack && albumId === 'faye2001' && FAYE2001_SONG_PHOTOS[selectedTrack.title]) return <Faye2001EditorialSong key={selectedTrack.title} track={selectedTrack} photo={FAYE2001_SONG_PHOTOS[selectedTrack.title]} tracks={album.tracks} onSelect={track=>{handleSelectTrack(track);window.scrollTo({top:0,behavior:'instant'});}} onBack={()=>{setSelectedTrack(null);window.scrollTo({top:0,behavior:'instant'});}} onHome={onBackToHome}/>;

  if (selectedTrack && albumId === 'feimimizhinyin' && feimimiPhotos[selectedTrack.title]) return <FeimimiSongSpaces key={selectedTrack.title} title={selectedTrack.title} photo={feimimiPhotos[selectedTrack.title]} onBack={() => { setSelectedTrack(null); window.scrollTo({top:0,behavior:'instant'}); }} onHome={onBackToHome}/>;

  if (selectedTrack) {
    return (
      <main data-song={selectedTrack.title} className={`relative min-h-screen overflow-hidden bg-[#08090d] text-white ${albumId === 'didar' ? 'dd-legacy-song' : ''} ${albumId === 'feimimizhinyin' ? 'fm-original fm-original-song' : ''}`}>
        <img src={albumId === 'feimimizhinyin' ? feimimiPhotos[selectedTrack.title] || album.heroPhoto : selectedTrack.title === '不留' || selectedTrack.title === '阳宝' ? background : album.heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <header className="relative z-10 flex items-center justify-between border-b border-white/15 px-6 py-5 sm:px-12">
          <button onClick={() => setSelectedTrack(null)} className="flex items-center gap-2 text-xs font-mono-code text-zinc-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> 返回《{album.chineseTitle}》曲目目录
          </button>
          <button onClick={onBackToHome} className="text-xs font-mono-code text-zinc-500 hover:text-white">HOME</button>
        </header>
        <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
          <span className="font-mono-code text-xs tracking-[0.3em]" style={{ color: album.accent }}>
            {album.title} / {selectedTrack.number} · {album.year}
          </span>
          <motion.h1
            key={selectedTrack.number}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-4xl font-editorial text-5xl font-light sm:text-7xl"
          >
            {albumId === 'didar' ? <DidarKineticText text={`《${selectedTrack.title}》`} /> : albumId === 'feimimizhinyin' ? <RetroTypewriter text={`《${selectedTrack.title}》`}/> : `《${selectedTrack.title}》`}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-12 max-w-3xl border-l border-white/30 pl-5 font-poetic text-2xl leading-relaxed text-zinc-100 sm:text-4xl"
          >
            {albumId === 'feimimizhinyin' ? <RetroTypewriter text={selectedTrack.signatureLyric}/> : selectedTrack.signatureLyric}
          </motion.p>
          <p className="mt-10 max-w-2xl whitespace-pre-line font-poetic text-base leading-8 text-zinc-300">
            {albumId === 'feimimizhinyin' ? <RetroTypewriter text={selectedTrack.extendedLyricSnippet}/> : selectedTrack.extendedLyricSnippet}
          </p>
          <motion.p
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-14 max-w-2xl text-sm leading-7 text-zinc-400"
          >
            {selectedTrack.artisticNote}
          </motion.p>
        </section>
      </main>
    );
  }

  if (albumId === 'strangers') return <StrangersDirectory tracks={album.tracks} onSelect={handleSelectTrack} onHome={onBackToHome} />;
  if (albumId === 'faye2001') return <Faye2001Balloons tracks={album.tracks} photo={album.heroPhoto} onSelect={handleSelectTrack} onHome={onBackToHome} />;

  if (albumId === 'didar') return <DidarDirectory tracks={album.tracks} onSelect={handleSelectTrack} onHome={onBackToHome}/>;

  return (
    <main className={`relative min-h-screen overflow-hidden bg-[#08090d] px-6 py-6 text-white sm:px-12 sm:py-10 ${albumId === 'didar' ? 'dd-directory' : ''} ${albumId === 'feimimizhinyin' ? 'fm-original' : ''}`}>
      {albumId === 'didar' && !reduced && <div className="dd-directory-aurora" aria-hidden="true"><Aurora colorStops={['#5227FF','#7cff67','#5227FF']} amplitude={1} blend={.5} height={.45} speed={1} glow={.6} /></div>}
      <div className={`absolute inset-0 ${albumId === 'didar' ? 'dd-directory-backdrop' : 'pointer-events-none'}`}>
        {albumId === 'didar' ? <DidarEye src={background} /> : <img src={background} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      </div>
      {albumId === 'feimimizhinyin' && <figure className="fm-teresa-dialogue" aria-label="邓丽君摄影，与原有王菲摄影隔空呼应"><div className="fm-teresa-soft-edge"><img src="/assets/feimimi/teresa-dialogue.jpg" alt="邓丽君托腮微笑的摄影" /></div><figcaption>一段声音，穿过时间。</figcaption></figure>}
      <header className="relative z-10 flex items-center justify-between border-b border-white/15 pb-5">
        <button onClick={onBackToHome} className="flex items-center gap-2 text-xs font-mono-code text-zinc-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> 返回 HOME
        </button>
        <span className="font-mono-code text-xs text-zinc-500">TRACK INDEX / {album.year}</span>
      </header>

      <section className="relative z-10 max-w-6xl mx-auto pt-14 sm:pt-20">
        <p className="font-mono-code text-xs tracking-[0.35em] uppercase" style={{ color: album.accent }}>ALBUM INDEX · {album.title}</p>
        <h1 className="mt-3 font-editorial text-5xl font-light sm:text-7xl">{albumId === 'didar' ? <DidarKineticText text={`《${album.chineseTitle}》`} /> : albumId === 'feimimizhinyin' ? <RetroTypewriter text={`《${album.chineseTitle}》`}/> : `《${album.chineseTitle}》`}</h1>
        <p className="mt-3 max-w-2xl font-poetic text-sm leading-7 text-zinc-400 sm:text-base">{albumId === 'feimimizhinyin' ? <RetroTypewriter text={album.curatorialStatement}/> : album.curatorialStatement}</p>
        <div className="relative mt-10 flex flex-col gap-2 pb-12">
          {album.tracks.map((track, index) => (
            <motion.button
              key={track.number}
              onClick={() => handleSelectTrack(track)}
              initial={{ opacity: 0, x: index % 2 ? 26 : -26 }}
              animate={{ opacity: 1, x: 0, y: [0, index % 2 ? -5 : 6, 0], rotate: [0, index % 2 ? 0.25 : -0.25, 0] }}
              transition={{ opacity: { duration: 0.65, delay: index * 0.06 }, x: { duration: 0.65, delay: index * 0.06 }, y: { duration: 5 + index % 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.17 }, rotate: { duration: 7 + index % 2, repeat: Infinity, ease: 'easeInOut' } }}
              whileHover={{ x: index % 2 ? -7 : 7 }}
              className={`group relative flex min-h-24 w-full items-center gap-4 border-b border-white/15 py-5 text-left sm:min-h-28 sm:gap-8 ${index % 2 ? 'sm:ml-auto sm:max-w-[88%]' : 'sm:mr-auto sm:max-w-[94%]'}`}
            >
              <span className="w-12 shrink-0 font-mono-code text-xs text-zinc-500" style={{ color: album.accent }}>{track.number.padStart(2, '0')}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-poetic text-2xl text-zinc-100 transition-colors group-hover:text-white sm:text-4xl">{albumId === 'feimimizhinyin' ? <RetroTypewriter text={`《${track.title}》`}/> : `《${track.title}》`}</span>
                <span className="mt-1 block max-w-3xl truncate font-poetic text-xs text-zinc-400 sm:text-sm">{track.signatureLyric}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  );
};
