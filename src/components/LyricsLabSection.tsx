import React, {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {LYRIC_MOTIFS, ALBUMS} from '../data/fayeArchive';
interface Props {onPlayTrack:(trackId:string,rootFreq?:number,ambientType?:string)=>void;isPlaying:boolean;currentTrackId:string|null;onNavigateToAlbum:(albumId:string)=>void}
export const LyricsLabSection:React.FC<Props>=({onNavigateToAlbum})=>{
 const [active,setActive]=useState(LYRIC_MOTIFS[0]);
 const [open,setOpen]=useState(false);
 return <section className="rework-motifs"><div className="rework-motif-hero"><span>03 / POETIC ATLAS</span><h1>词与词之间<br/><i>还有空间</i></h1><p>选择一个意象，让它与其他歌曲相遇。</p></div>
 <div className="rework-motif-layout"><div className="rework-motif-list">{LYRIC_MOTIFS.map((m,i)=><button key={m.id} className={m.id===active.id?'selected':''} onClick={()=>{setActive(m);setOpen(false)}}><small>{String(i+1).padStart(2,'0')}</small><span>{m.name}</span><ArrowUpRight size={17}/></button>)}</div><div className="rework-motif-view" key={active.id}><span>SELECTED MOTIF / {active.englishName}</span><h2>{active.name}</h2><p className="rework-motif-symbolism">{active.symbolism}</p><button className="rework-open-notes" onClick={()=>setOpen(!open)}>{open?'收起文字':'阅读关联与解读'} ↗</button>{open&&<div className="rework-motif-detail"><p>{active.lyricistFocus}</p>{active.quotes.map((q,i)=><div key={i} className="rework-motif-quote"><span>《{q.song}》 / {q.year}</span><p>歌曲意象请对照已核实歌词阅读</p><button onClick={()=>{const a=ALBUMS.find(a=>a.title===q.album||a.tracks.some(t=>t.title===q.song));if(a)onNavigateToAlbum(a.id)}}>查看专辑 ↗</button></div>)}</div>}</div></div>
 </section>
};
