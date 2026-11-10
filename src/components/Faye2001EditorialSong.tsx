import Shuffle from './effects/Shuffle';
import {motion} from 'motion/react';
import {useTypographyReducedMotion} from './typography/useTypographyReducedMotion';
import './Faye2001EditorialSong.css';
interface Track{number:string;title:string;signatureLyric:string;extendedLyricSnippet:string;artisticNote:string}
export function Faye2001EditorialSong({track,photo,tracks,onSelect,onBack,onHome}:{track:Track;photo:string;tracks:Track[];onSelect:(track:Track)=>void;onBack:()=>void;onHome:()=>void}){
 const reduced=useTypographyReducedMotion(),enchanted=track.title==='迷魂记',shoes=track.title==='流浪的红舞鞋';
 const lines=track.extendedLyricSnippet.split(/\n|\s*\/\s*/).filter(Boolean);
 return <main className={`fe-song ${enchanted?'fe-enchanted':shoes?'fe-redshoes':'fe-oneway'}`}>
  <nav><button onClick={onBack}>← 王菲 2001 · 气球目录</button><button onClick={onHome}>HOME</button></nav>
  {!enchanted&&<div className="fe-kinetic-scene" aria-hidden="true">{shoes?<div className="fe-dancer"><img src={photo} alt=""/><img className="fe-dancer-skirt" src={photo} alt=""/></div>:<><div className="fe-blue-projection"/><div className="fe-yellow-projection"/></>}</div>}
  <div className="fe-composition"><figure className="fe-photograph"><img src={photo} alt={`《${track.title}》指定摄影`}/></figure><div className="fe-writing"><header><small>FAYE WONG / 2001 · {track.number}</small><h1><Shuffle text={track.title}/></h1></header><div className="fe-lyrics">{lines.map((line,i)=><p key={i}><Shuffle text={line}/></p>)}</div><details><summary>关于这首歌</summary><p>{track.artisticNote}</p></details></div></div>
  {!enchanted&&<div className={shoes?'fe-red-thread':'fe-direction-line'} aria-hidden="true"/>}
  <footer><button onClick={onBack}>← 返回气球目录</button><div>{tracks.map(item=><button key={item.number} aria-current={item.title===track.title?'page':undefined} onClick={()=>onSelect(item)}>{item.title}</button>)}</div></footer>
 </main>;
}
