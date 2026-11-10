import { useEffect, useRef, useState } from 'react';
import { useTypographyReducedMotion } from './useTypographyReducedMotion';
interface Props {children:string;className?:string;effect?:string;radius?:number;strength?:number;trail?:number;duration?:number;speed?:number;scrambleChars?:string;clickBurst?:boolean;intro?:boolean}
export default function ScrambledText({children,className='',radius=100,strength=1,trail=.6,duration=1.2,speed=.5,scrambleChars='.:',clickBurst=true,intro=true}:Props){
 const root=useRef<HTMLSpanElement>(null),reduced=useTypographyReducedMotion();const [text,setText]=useState(children);const trigger=useRef<(x:number,all?:boolean)=>void>(()=>{});
 useEffect(()=>{if(reduced){setText(children);return}const host=root.current;if(!host)return;let frame=0,start=0,last=0,center=-1,all=false,disposed=false;const chars=Array.from(children);
 const animate=(now:number)=>{const elapsed=(now-start)/1000;const remaining=Math.max(0,1-elapsed/Math.max(.1,duration));if(now-last>45){last=now;setText(chars.map((char,i)=>{if(/\s/.test(char))return char;const near=all?1:Math.max(0,1-Math.abs((i+.5)/chars.length*host.clientWidth-center)/radius);const reveal=i/chars.length;return remaining*near*strength>(all?reveal*.7+.08:.18)&&Math.sin(i*7+now*.015*speed)>.1?scrambleChars[(i+Math.floor(now*.01))%Math.max(1,scrambleChars.length)]:char}).join(''))}if(remaining>0)frame=requestAnimationFrame(animate);else setText(children)};
 trigger.current=(x,burst=false)=>{center=x;all=burst;start=performance.now()-(!burst?trail*.1:0)*1000;cancelAnimationFrame(frame);frame=requestAnimationFrame(animate)};
 const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&intro){trigger.current(0,true);observer.disconnect()}},{threshold:.3});observer.observe(host);
 return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();trigger.current=()=>{}};
 },[children,reduced,radius,strength,trail,duration,speed,scrambleChars,intro]);
 return <span ref={root} className={`scrambled-text ${className}`} aria-label={children} tabIndex={0} onPointerMove={e=>{if(!reduced)trigger.current(e.clientX-e.currentTarget.getBoundingClientRect().left)}} onClick={()=>{if(clickBurst&&!reduced)trigger.current(0,true)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();trigger.current(0,true)}}}><span aria-hidden="true">{text}</span></span>;
}
