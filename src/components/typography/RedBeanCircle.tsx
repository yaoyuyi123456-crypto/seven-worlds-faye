import { useEffect, useRef, useState } from 'react';
import CircularText from './CircularText';
export function RedBeanCircle({ text }: {text:string}) {
 const root=useRef<HTMLDivElement>(null);const [size,setSize]=useState(600);
 useEffect(()=>{if(!root.current)return;const observer=new ResizeObserver(entries=>setSize(Math.min(680,Math.max(270,entries[0].contentRect.width))));observer.observe(root.current);return()=>observer.disconnect()},[]);
 const chars=Array.from(text),middle=Math.ceil(chars.length/2);
 return <div ref={root} className="fl-redbean-circle" style={{height:size}}><CircularText text={chars.slice(0,middle).join('')} size={size} fontSize={Math.max(19,size*.045)} fontWeight={600} direction="clockwise" spinDuration={50} onHover="slowDown" draggable hoverTilt={8} /><div className="fl-inner-redbean-ring" style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><CircularText text={chars.slice(middle).join('')} size={size*.7} fontSize={Math.max(16,size*.037)} fontWeight={600} direction="clockwise" spinDuration={60} onHover="slowDown" draggable hoverTilt={6}/></div></div>;
}
