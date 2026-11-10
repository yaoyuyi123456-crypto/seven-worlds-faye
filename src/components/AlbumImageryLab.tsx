import {useState} from 'react';
import {ALBUM_IMAGERY} from '../data/albumImagery';
import {useTypographyReducedMotion} from './typography/useTypographyReducedMotion';
import './AlbumImageryLab.css';
export function AlbumImageryLab({onEnterWorld,onEnterInstallation}:{onEnterWorld:(id:string)=>void;onEnterInstallation:(id:string)=>void}){
 const [index,setIndex]=useState(0),[released,setReleased]=useState(false);const reduced=useTypographyReducedMotion();const item=ALBUM_IMAGERY[index];
 const select=(value:number)=>{setIndex(value);setReleased(false)};
 return <section className={`ai-lab ai-theme-${item.id} ${released?'ai-released':''} ${reduced?'ai-reduced':''}`} aria-label="Eight album imagery experiments">
 <div className="ai-photo" key={item.photo} style={{backgroundImage:`url("${item.photo}")`}} aria-hidden="true"/><div className="ai-shade"/>
 <header className="ai-header"><p>IMAGERY LAB / EIGHT ALBUMS</p><h1>Eight sensibilities. One voice.</h1></header>
 <nav className="ai-album-nav" aria-label="Choose an album world">{ALBUM_IMAGERY.map((album,i)=><button key={album.id} aria-pressed={i===index} onClick={()=>select(i)}><small>0{i+1}</small>{album.title}</button>)}</nav>
 <div className="ai-art-field" key={item.id} onPointerMove={e=>{if(reduced||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--look-x',`${(e.clientX-r.left)/r.width*2-1}`);e.currentTarget.style.setProperty('--look-y',`${(e.clientY-r.top)/r.height*2-1}`)}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--look-x','0');e.currentTarget.style.setProperty('--look-y','0')}}>
  <div className="ai-motif" aria-hidden="true">
   {item.id==='yuyan'?<img className="ai-eyes" src="/assets/faye/yuyan-floating-eyes.jpg" alt=""/>:item.id==='feimimizhinyin'?<div className="ai-duet"><img src="/assets/feimimi/photo-04.jpg" alt=""/><div><img src="/assets/feimimi/teresa-dialogue.jpg" alt=""/></div></div>:item.id==='faye2001'?<div className="ai-balloons">{item.words.map((word,i)=><i key={word} style={{'--motif-i':i} as import('react').CSSProperties}>{word}</i>)}</div>:item.id==='jiangai'?<div className="ai-papers">{item.words.map((word,i)=><i key={word} style={{'--motif-i':i} as import('react').CSSProperties}>{word}</i>)}</div>:item.id==='didar'?<div className="ai-distance"><span>Near</span><i/><span>Distance</span></div>:item.id==='fuzao'?<div className="ai-wind-words">{['REST','LESS','WIND','AIR','NO','ORDER'].map((word,i)=><i key={i} style={{'--motif-i':i} as import('react').CSSProperties}>{word}</i>)}</div>:item.id==='strangers'?<div className="ai-city-slices"><img src="/assets/strangers/photo-01.jpg" alt=""/><img src="/assets/strangers/photo-08.jpg" alt=""/></div>:<div className="ai-keepsakes"><img src="/assets/changyou/tin.jpg" alt=""/>{['Memory','Depart','Echo'].map((word,i)=><i key={word} style={{'--motif-i':i} as import('react').CSSProperties}>{word}</i>)}</div>}
  </div>
  <div className="ai-reading"><p className="ai-year">{item.year} / {item.english}</p><h2>{item.title}</h2><div className="ai-words">{item.words.map(word=><span key={word}>{word}</span>)}</div><p className="ai-idea">{item.idea}</p><button className="ai-action" aria-pressed={released} onClick={()=>setReleased(v=>!v)}>{released?'↶ Gather again':`↗ ${item.action}`}</button><p className="ai-state" role="status">{released?item.active:item.rest}</p><button className="ai-enter-album" onClick={()=>onEnterWorld(item.id)}>Enter {item.title} ↗</button></div>
 </div>
 <footer className="ai-song-labs"><span>EXPLORE SONG STUDIES</span>{[['woaini_jiangai','I Love You'],['red_bean_changyou','Red Bean'],['cuimian_stranger','Hypnosis']].map(([id,title])=><button key={id} onClick={()=>onEnterInstallation(id)}>{title} ↗</button>)}</footer>
 </section>;
}
