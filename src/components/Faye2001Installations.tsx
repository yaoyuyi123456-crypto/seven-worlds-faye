import Shuffle from './effects/Shuffle';
import {useState} from 'react';
import {WINGS_LYRICS,BIBLE_LYRICS} from '../data/faye2001Installations';
import {useTypographyReducedMotion} from './typography/useTypographyReducedMotion';
import './Faye2001Installations.css';
import Grainient from './effects/Grainient';
export const FAYE_2001_INSTALLATION_TITLES=['光之翼','两个人的圣经'];
function FallingVerse({text,title=false}:{text:string;title?:boolean}){
 const reduced=useTypographyReducedMotion();
 return <div className={`fi-falling ${title?'fi-falling-title':''}`}><Shuffle text={text} effect="slide" shuffleDirection="right" duration={.35} animationMode="evenodd" shuffleTimes={1} stagger={.03} threshold={.1} triggerOnce triggerOnHover respectReducedMotion/></div>;
}
export function Faye2001Installations({title,photo,onBack,onHome,onSelect}:{title:string;photo:string;onBack:()=>void;onHome:()=>void;onSelect:(title:string)=>void}){
 const wings=title==='光之翼',reduced=useTypographyReducedMotion();const [power,setPower]=useState(true);const [playing,setPlaying]=useState(true);
 const lyrics=(wings?WINGS_LYRICS:BIBLE_LYRICS).split('\n');
 return <main className={`fi-world ${wings?'fi-wings':'fi-bible'} ${playing?'fi-playing':'fi-paused'}`} style={{'--fi-wallpaper':`url("${photo}")`} as import('react').CSSProperties}>
 <div className="fi-photo" style={{backgroundImage:`url("${photo}")`}} aria-hidden="true"/><nav className="fi-nav"><button onClick={onBack}>← 王菲 2001 · 气球目录</button><button onClick={onHome}>HOME</button></nav>
 {wings?<>
  <div className="fi-digital-sky" aria-hidden="true"><i className="fi-moon"/><svg className="fi-wings-outline" viewBox="0 0 1000 600"><path d="M500 480Q100 260 100 70Q380 100 500 400Q620 100 900 70Q900 260 500 480ZM500 430Q240 230 160 140M500 430Q760 230 840 140"/></svg>{Array.from({length:18},(_,i)=><i className="fi-pixel-light" key={i} style={{left:`${(i*37+3)%96}%`,top:`${(i*23+11)%88}%`,animationDelay:`${-i*.7}s`}}/>)}</div>
  <section className="fi-computer" aria-label="光之翼电脑歌词装置"><div className="fi-monitor-bezel"><div className="fi-monitor-label"><span>FAYE / VIRTUAL CITY</span><button aria-pressed={power} aria-label={power?'关闭电脑屏幕':'打开电脑屏幕'} onClick={()=>setPower(v=>!v)}>⏻</button></div><div className={`fi-screen ${power?'fi-powered':''}`}><div className="fi-window-bar"><span>光之翼.exe</span><span>2001 ◇</span></div>{power?<><h1><FallingVerse title text={title}/></h1><div className="fi-computer-verses">{lyrics.map((line,i)=><FallingVerse text={line} key={i}/>)}</div><div className="fi-screen-status">光芒在线</div></>:<button className="fi-wake" onClick={()=>setPower(true)}>⏻ 轻触，重新点亮</button>}</div></div><div className="fi-monitor-neck"/><div className="fi-keyboard" aria-hidden="true">{Array.from({length:52},(_,i)=><i key={i}/>)}</div></section>
 </>:<>
  <Grainient colors={['#120f17','#2a0f0a','#9a3412','#f97316','#fed7aa']} angle={55} flow={.8} silk={.35} grainAmount={.08}/>
  <div className="fi-dharma-deck" aria-hidden="true"><div className="fi-orbit-ring"/><div className="fi-orbit-ring fi-orbit-ring-second"/><svg viewBox="0 0 1000 800"><g fill="none" stroke="currentColor" strokeWidth="1">{Array.from({length:12},(_,i)=><ellipse key={i} cx="500" cy="340" rx="85" ry="230" transform={`rotate(${i*30} 500 340)`}/>)}<circle cx="500" cy="340" r="250" strokeDasharray="1 20"/><path d="M100 690Q300 550 500 650Q700 550 900 690M200 730Q500 620 800 730"/></g></svg></div>
  <header className="fi-bible-heading"><p>ELECTRONIC SCRIPTURE · 2001</p><h1><FallingVerse title text={title}/></h1><button onClick={()=>setPlaying(v=>!v)} aria-pressed={playing}>{playing?'Ⅱ 暂停视觉节拍':'▷ 继续视觉节拍'}</button><div className="fi-equalizer" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i} style={{animationDelay:`${-i*.21}s`,height:`${15+i%5*7}px`}}/>)}</div></header>
  <section className="fi-bible-verses" aria-label="两个人的圣经完整歌词">{lyrics.map((line,i)=><div className={`fi-scripture-line fi-scripture-line-${i%3}`} key={i}><FallingVerse text={line}/></div>)}</section>
 </>}
 <footer className="fi-footer"><button onClick={onBack}>← 返回气球目录</button><button onClick={()=>{onSelect(wings?'两个人的圣经':'光之翼');window.scrollTo({top:0,behavior:'instant'})}}>进入《{wings?'两个人的圣经':'光之翼'}》 ↗</button></footer>
 </main>;
}
