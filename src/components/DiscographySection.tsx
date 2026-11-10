import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Pause, Play, ChevronDown } from 'lucide-react';
import { ALBUMS, Album, Song } from '../data/fayeArchive';

interface Props {
 selectedAlbumId?: string;
 onPlayTrack: (trackId: string, rootFreq?: number, ambientType?: string) => void;
 isPlaying: boolean;
 currentTrackId: string | null;
 onNavigateToMoodWithSong?: (song: Song) => void;
}
const VISUAL_NOTES: Record<string,string> = {
 didar:'潮湿的夜晚，失去方向的霓虹。',fuzao:'风穿过山坡，语言不再需要意义。',yuyan:'熟悉的世界，陌生的寓言。',changyou:'旅程尚未结束，告别已经发生。',strangers:'每一种靠近，都有另一种距离。',jiangai:'移动的城市，短暂的亲密。'
};
export const DiscographySection: React.FC<Props> = ({selectedAlbumId='changyou',onPlayTrack,isPlaying,currentTrackId}) => {
 const [albumId,setAlbumId]=useState(selectedAlbumId);
 const [songId,setSongId]=useState<string|null>(null);
 const [showNotes,setShowNotes]=useState(false);
 const [pointer,setPointer]=useState({x:0,y:0});
 useEffect(()=>setAlbumId(selectedAlbumId),[selectedAlbumId]);
 const album: Album=ALBUMS.find(a=>a.id===albumId)||ALBUMS[0];
 useEffect(()=>{setSongId(null);setShowNotes(false)},[albumId]);
 const song=album.tracks.find(t=>t.id===songId)||album.tracks[0];
 const accent=album.aestheticDna.accentColor;
 const visual=album.heroBgImage||album.coverImage;
 return <section className="rework-discography" style={{'--album-accent':accent} as React.CSSProperties}>
  <nav className="rework-album-rail" aria-label="选择专辑">{ALBUMS.map(a=><button key={a.id} className={a.id===albumId?'is-active':''} onClick={()=>setAlbumId(a.id)}><small>{a.year}</small><span>{a.title}</span></button>)}</nav>
  <div className="rework-album-hero" onPointerMove={e=>{if(e.pointerType==='mouse'){const r=e.currentTarget.getBoundingClientRect();setPointer({x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5})}}} onPointerLeave={()=>setPointer({x:0,y:0})}>
   <div className="rework-hero-photo" style={{backgroundImage:`linear-gradient(90deg,rgba(5,7,9,.64),rgba(5,7,9,.06)),url("${visual}")`,transform:`translate3d(${pointer.x*9}px,${pointer.y*9}px,0) scale(1.045)`}}/>
   <div className="rework-hero-inner"><div className="rework-kicker">FAYE / ARCHIVE <span>№ {String(ALBUMS.indexOf(album)+1).padStart(2,'0')}</span></div>
    <h1>{album.title}</h1><div className="rework-hero-sub"><span>{album.englishTitle} / {album.year}</span><span>SCROLL TO EXPLORE ↓</span></div>
    <p className="rework-hero-thought">{VISUAL_NOTES[album.id]||album.aestheticDna.tagline}</p>
   </div><div className="rework-hero-vertical">A DIFFERENT KIND OF LISTENING</div>
  </div>
  <div className="rework-record-layout">
   <div className="rework-record-index"><div className="rework-section-number">01 / TRACK INDEX</div><h2>一张唱片<br/><i>多种距离</i></h2><p>选择一首歌，进入它的另一面。</p><div className="rework-index-art" style={{backgroundImage:`url("${album.coverImage}")`}} aria-hidden="true"/></div>
   <div className="rework-track-list" aria-label="专辑歌曲">{album.tracks.map((t,i)=><button key={t.id} onClick={()=>{setSongId(t.id);setShowNotes(false)}} className={`rework-track ${song?.id===t.id?'selected':''}`}><span className="rework-track-n">{String(i+1).padStart(2,'0')}</span><span className="rework-track-name">{t.title}</span><span className="rework-track-mood">{t.moodTags[0]}</span><ArrowUpRight size={18}/></button>)}</div>
  </div>
  {song&&<div className="rework-song-stage" key={song.id}>
    <div className="rework-song-top"><span>02 / CLOSE LISTENING</span><span>{album.title} · {album.year}</span></div>
    <div className="rework-song-content"><div className="rework-song-art" style={{backgroundImage:`url("${visual}")`}}><span>{String(album.tracks.indexOf(song)+1).padStart(2,'0')}</span></div><div className="rework-song-copy"><div className="rework-song-vertical">SELECTED WORK</div><h2>《{song.title}》</h2><p className="rework-song-tags">{song.moodTags.slice(0,3).join('　/　')}</p><div className="rework-song-pull">{song.keyLyric ? '歌词片段请以已核实原文为准' : '一首等待被重新听见的歌'}</div><div className="rework-song-actions"><button onClick={()=>onPlayTrack(song.id,song.audioSignature.rootNote,song.audioSignature.ambientType)}>{isPlaying&&currentTrackId===song.id?<Pause size={16}/>:<Play size={16}/>} {isPlaying&&currentTrackId===song.id?'暂停合成声景':'聆听合成声景'}</button><button onClick={()=>setShowNotes(v=>!v)} aria-expanded={showNotes}>个人策展笔记 <ChevronDown size={16} style={{transform:showNotes?'rotate(180deg)':'none'}}/></button></div></div></div>
    {showNotes&&<aside className="rework-notes"><span>CURATORIAL ARCHIVE / 个人解读</span><p>{song.curatorNote}</p><p className="rework-credit">词：{song.lyricist}　曲：{song.composer}　编：{song.arranger}</p><small>原项目中的歌词数据保留在源文件中；此页面不默认展示未经核实的歌词。</small></aside>}
  </div>}
 </section>
};
