import {useEffect,useRef,useState} from 'react';
import {useTypographyReducedMotion} from './useTypographyReducedMotion';
export function RetroTypewriter({text}:{text:string}){
 const ref=useRef<HTMLSpanElement>(null),reduced=useTypographyReducedMotion();const [count,setCount]=useState(0);const chars=Array.from(text);
 useEffect(()=>{if(reduced){setCount(chars.length);return}setCount(0);let timer=0,disposed=false;const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();let index=0;const tick=()=>{if(disposed)return;index+=1;setCount(index);if(index<chars.length)timer=window.setTimeout(tick,/\s/.test(chars[index]||'')?10:chars.length>100?17:65)};tick()},{threshold:.12});if(ref.current)observer.observe(ref.current);return()=>{disposed=true;observer.disconnect();clearTimeout(timer)};
 },[text,reduced]);
 return <span ref={ref} className={`fm-typewriter ${count<chars.length?'fm-is-typing':''}`} aria-label={text}>{chars.map((char,index)=><span key={index} aria-hidden="true" className={index<count?'fm-type-struck':''} style={{visibility:index<count?'visible':'hidden'}}>{char}</span>)}</span>;
}
