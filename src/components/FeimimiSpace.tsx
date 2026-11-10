import {useState} from 'react';
import { SEVEN_WORLDS } from '../data/sevenWorlds';
import GhostCursor from './effects/GhostCursor';
import HalftoneReveal from './effects/HalftoneReveal';
import ScrollReveal from './typography/ScrollReveal';
import './FeimimiSpace.css';
const tracks=SEVEN_WORLDS.find(world=>world.id==='feimimizhinyin')!.tracks.filter(track=>!['初恋的地方','翠湖寒'].includes(track.title));
const photographs:Record<string,string>={'但愿人长久':'/assets/feimimi/photo-01.jpg','南海姑娘':'/assets/feimimi/photo-02.jpg','又见炊烟':'/assets/feimimi/photo-03.jpg','雪中莲':'/assets/feimimi/photo-04.jpg'};
export function FeimimiSpace({onHome}:{onHome:()=>void}){
 const [selected,setSelected]=useState<string|null>(null);
 const track=tracks.find(item=>item.title===selected),src=track?photographs[track.title]:'/assets/feimimi/photo-03.jpg';
 const select=(title:string|null)=>{setSelected(title);window.scrollTo({top:0,behavior:'instant'})};
 return <main className={`fm-space ${track?'fm-song':'fm-directory'}`}>
  <div className="fm-background" key={src}><img src={src} alt={track?`王菲《${track.title}》摄影`:'王菲《菲靡靡之音》摄影'}/><HalftoneReveal src={src} mode="mono" shape="dot" cellSize={6} angle={45} inkColor="#f4f1ea" paperColor="#120f17" revealRadius={160}/><div className="fm-readable-shade"/></div>
  <GhostCursor color="#B497CF" size={80} trailLength={50} inertia={.5} turbulence={.5} drift={.3} bloomStrength={.6} grainIntensity={.05}/>
  <div className="fm-content"><nav><button onClick={track?()=>select(null):onHome}>{track?'← 返回《菲靡靡之音》目录':'← HOME'}</button>{track&&<button onClick={onHome}>HOME</button>}<span>1995 · THE DECADENT SOUND OF FAYE</span></nav>
  <header><p className="fm-edition">王菲 · 菲靡靡之音</p><h1>{track?track.title:'菲靡靡之音'}</h1>{!track&&<p className="fm-intro">把旧日的旋律，唱成此刻的回声。</p>}</header>
  {track?<section className="fm-song-lines" key={track.title} aria-label={`${track.title}歌词`}>{track.extendedLyricSnippet.split(/\s*\/\s*|\n/).filter(Boolean).map((line,index)=><ScrollReveal key={index} first={index===0} highlightColor={null} mode="scrub" splitBy="words" effect="fade" stagger={.05} duration={.8} smoothing={0} baseOpacity={.1} baseRotation={3} baseOffset={0} enableBlur blurStrength={4}>{line}</ScrollReveal>)}<p className="fm-note">{track.artisticNote}</p><p className="fm-credits">曲 / {track.composer} · 词 / {track.lyricist} · 编 / {track.arranger}</p></section>:null}
  <div className="fm-song-links" role="navigation" aria-label="菲靡靡之音歌曲目录">{tracks.map((item,index)=><button key={item.title} onClick={()=>select(item.title)} aria-current={track?.title===item.title?'page':undefined}><small>0{index+1}</small><span>{item.title}</span><i aria-hidden="true">↗</i></button>)}</div>
  {track&&<button className="fm-return" onClick={()=>select(null)}>← 返回专辑目录</button>}
  </div>
 </main>;
}
