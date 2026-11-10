import { BackgroundMusic } from './components/BackgroundMusic';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeCosmos } from './components/HomeCosmos';
import { WorldChangyou } from './components/worlds/WorldChangyou';
import { WorldFaye2001 } from './components/worlds/WorldFaye2001';
import { WorldDidar } from './components/worlds/WorldDidar';
import { WorldYuyan } from './components/worlds/WorldYuyan';
import { WorldFuzao, FuzaoEntrance } from './components/worlds/WorldFuzao';
import { WorldFeimimi } from './components/worlds/WorldFeimimi';
import { WorldStrangers } from './components/worlds/WorldStrangers';
import { WorldFaye1997 } from './components/worlds/WorldFaye1997';
import { WorldJiangai } from './components/worlds/WorldJiangai';
import { SevenWorldsNav } from './components/SevenWorldsNav';
import { UserLyricsSpaces } from './components/UserLyricsSpaces';
import { FayeAISection } from './components/FayeAISection';
import { AlbumSongSelection } from './components/AlbumSongSelection';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { fayeAudio } from './utils/audioSynthesizer';
import { AlbumTextEntrances } from './components/typography/AlbumTextEntrances';
import './components/typography/Faye2001Grotesque.css';
import { AlbumImageryLab } from './components/AlbumImageryLab';

export default function App() {
  const [currentWorld, setCurrentWorld] = useState<string>('cosmos');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [musicOpen,setMusicOpen] = useState(true);
  const [fuzaoEntrance, setFuzaoEntrance] = useState<FuzaoEntrance | null>(null);
  const handleEnterWorld = (worldId: string) => {
    if (worldId.startsWith('didar-song:')) {
      setCurrentWorld(worldId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (worldId === 'jiangai') {
      setCurrentWorld('jiangai');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (worldId === 'fuzao') {
      const card = document.querySelector<HTMLElement>('.circular-carousel__card[aria-label^="《浮躁》"]');
      const photo = card?.querySelector<HTMLImageElement>('img');
      const bounds = card?.getBoundingClientRect();
      setFuzaoEntrance(bounds && photo ? {
        left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height, src: photo.src
      } : null);
      setCurrentWorld('fuzao');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    setCurrentWorld(worldId === 'changyou' || worldId === 'yuyan' ? worldId : `album:${worldId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterInstallation = (entryId: string) => {
    setCurrentWorld(`installation:${entryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnCosmos = () => {
    setCurrentWorld('cosmos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentWorld('cosmos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Audio Playback handling via Web Audio API synth
  const handlePlayTrack = (trackId: string, rootFreq?: number, ambientType?: string) => {
    if (currentTrackId === trackId && isPlaying) {
      fayeAudio.stop();
      setIsPlaying(false);
    } else {
      setCurrentTrackId(trackId);
      const freq = rootFreq || 220;
      fayeAudio.playTrackPreview(trackId, freq, ambientType || 'dream_pop');
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => { fayeAudio.stop(); setIsPlaying(false); setMusicOpen(value=>!value); };

  const handleClosePlayer = () => {
    fayeAudio.stop();
    setIsPlaying(false);
    setCurrentTrackId(null);
  };

  const handleNavigateToAlbum = (albumId: string) => handleEnterWorld(albumId);

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 font-sans selection:bg-[#d4f43b] selection:text-black">
      <AlbumTextEntrances />
      
      {/* 1. Global Navigation Bar (When in Cosmos Orbit) */}
      {currentWorld === 'cosmos' && (
        <Navbar
          activeTab={activeTab}
          transparent={activeTab === 'home'}
          setActiveTab={handleTabChange}
          currentTrack={currentTrackId}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      )}

      {/* 2. Bespoke World Views (When inside one of the Seven Worlds) */}
      {currentWorld === 'changyou' && (
        <WorldChangyou
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
          onSelectSong={handleEnterInstallation}
        />
      )}

      {currentWorld === 'faye2001' && (
        <WorldFaye2001
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'didar' && (
        <WorldDidar
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'yuyan' && (
        <WorldYuyan
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'fuzao' && (
        <WorldFuzao
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
          onSelectSong={handleEnterInstallation}
          entrance={fuzaoEntrance}
        />
      )}

      {currentWorld === 'feimimizhinyin' && (
        <WorldFeimimi
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'strangers' && (
        <WorldStrangers
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'faye1997' && (
        <WorldFaye1997
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
        />
      )}

      {currentWorld === 'jiangai' && (
        <WorldJiangai
          onBackToCosmos={handleReturnCosmos}
          onSwitchWorld={handleEnterWorld}
          onSelectSong={handleEnterInstallation}
        />
      )}

      {currentWorld.startsWith('didar-song:') && (
        <AlbumSongSelection key={currentWorld} albumId="didar" initialSongTitle={currentWorld.slice('didar-song:'.length)} onBackToHome={handleReturnCosmos} onSelectSong={handleEnterInstallation} />
      )}

      {currentWorld.startsWith('album:') && (
        <AlbumSongSelection
          albumId={currentWorld.slice('album:'.length)}
          onBackToHome={handleReturnCosmos}
          onSelectSong={handleEnterInstallation}
        />
      )}

      {currentWorld.startsWith('installation:') && (
        <UserLyricsSpaces
          key={currentWorld}
          initialEntryId={currentWorld.slice('installation:'.length)}
          entryIds={[currentWorld.slice('installation:'.length)]}
          onBackToHome={handleReturnCosmos}
          onNavigateToWorld={handleEnterWorld}
        />
      )}

      {/* 3. Cosmos Multi-Module Views */}
      {currentWorld === 'cosmos' && (
        <main>
          {/* TAB 01: HOME (Immersive Fullscreen Faye Photo Cover + Seven Worlds Cosmos Orbit) */}
          {activeTab === 'home' && (
            <HomeCosmos
              onEnterWorld={handleEnterWorld}
              onEnterInstallation={handleEnterInstallation}
              onNavigateTab={handleTabChange}
            />
          )}

          {/* TAB 05: LYRIC REALMS & SPATIAL INSTALLATIONS */}
          {activeTab === 'lyrics' && (
            <AlbumImageryLab onEnterWorld={handleEnterWorld} onEnterInstallation={handleEnterInstallation}/>
          )}

          {/* TAB 06: FAYE AI (AI Cultural Guide) */}
          {activeTab === 'ai' && (
            <FayeAISection />
          )}
        </main>
      )}

      {/* Floating Spatial Teleportation Navigator (Always available) */}
      {currentWorld === 'cosmos' && activeTab === 'home' && (
        <SevenWorldsNav
          currentWorldId={null}
          onSelectWorld={handleEnterWorld}
          onReturnCosmos={handleReturnCosmos}
        />
      )}

      <BackgroundMusic open={musicOpen} onOpen={()=>setMusicOpen(true)} onClose={()=>setMusicOpen(false)}/>

    </div>
  );
}
