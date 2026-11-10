import React, { useEffect, useId, useRef } from 'react';
import { useTypographyReducedMotion } from './useTypographyReducedMotion';
import './CurvedLoop.css';
interface Props {marqueeText:string;shape?:string;speed?:number;curveAmount?:number;direction?:string;fontSize?:number;fontWeight?:number;letterSpacing?:number;separator?:string;outline?:boolean;scrollBoost?:number;edgeFade?:number;interactive?:boolean;pauseOnHover?:boolean;separatorColor?:string|null;color?:string|null}
export default function CurvedLoop({marqueeText,shape='arc',speed=2,curveAmount=400,direction='left',fontSize=96,fontWeight=700,letterSpacing=0,outline=false,interactive=true,pauseOnHover=false,color=null}:Props){
 const id=useId().replace(/:/g,''),root=useRef<HTMLDivElement>(null),text=useRef<SVGTextPathElement>(null),reduced=useTypographyReducedMotion();
 const control=useRef({offset:350,dragging:false,hover:false,lastX:0});
 useEffect(()=>{const host=root.current,path=text.current;if(!host||!path||reduced)return;let frame=0,last=0,visible=true,length=2000,disposed=false;
 const measure=()=>{if(disposed)return;length=path.getComputedTextLength()||2000};document.fonts.ready.then(measure);measure();
 const draw=(now:number)=>{const dt=Math.min((now-(last||now))/1000,.05);last=now;const c=control.current;if(!c.dragging&&!(pauseOnHover&&c.hover)){c.offset+=(direction==='left'?-1:1)*speed*30*dt;if(c.offset < -length)c.offset=2550;if(c.offset>2550)c.offset=-length;}path.setAttribute('startOffset',String(c.offset));frame=requestAnimationFrame(draw)};
 const wake=()=>{cancelAnimationFrame(frame);last=0;if(visible&&!document.hidden)frame=requestAnimationFrame(draw)};
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;wake()});observer.observe(host);document.addEventListener('visibilitychange',wake);wake();
 return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',wake)};
 },[marqueeText,reduced,speed,direction,pauseOnHover]);
 if(reduced)return <p className="curved-loop-static">{marqueeText}</p>;
 return <div ref={root} className="curved-loop" role="group" aria-label="个人想法，左右拖动阅读完整文字" tabIndex={interactive?0:undefined} onKeyDown={e=>{if(interactive&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();control.current.offset+=e.key==='ArrowLeft'?-100:100;}}} onPointerEnter={()=>{control.current.hover=true}} onPointerLeave={()=>{control.current.hover=false}} onPointerDown={e=>{if(!interactive)return;control.current.dragging=true;control.current.lastX=e.clientX;e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!control.current.dragging)return;control.current.offset+=(e.clientX-control.current.lastX)*1600/Math.max(1,e.currentTarget.clientWidth);control.current.lastX=e.clientX}} onPointerUp={()=>{control.current.dragging=false}} onPointerCancel={()=>{control.current.dragging=false}}>
 <svg viewBox="0 0 1600 460" role="img" aria-label={marqueeText}><defs><path id={id} d={shape==='arc'?`M -400 360 Q 800 ${360-curveAmount} 2000 360`:'M -400 230 L 2000 230'}/></defs><text fill={outline?'none':color||'currentColor'} stroke={outline?color||'currentColor':'none'} fontSize={fontSize} fontWeight={fontWeight} letterSpacing={letterSpacing}><textPath ref={text} href={`#${id}`} startOffset="350">{marqueeText}</textPath></text></svg>
 </div>;
}
