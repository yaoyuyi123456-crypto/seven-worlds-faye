import { useState } from 'react';
import { useTypographyReducedMotion } from './typography/useTypographyReducedMotion';
import './DidarEye.css';
export function DidarEye({ src }: { src: string }) {
 const [closed,setClosed]=useState(false), reduced=useTypographyReducedMotion();
 return <div className={`dd-eye ${closed?'dd-eye-closed':''}`} onClick={()=>setClosed(value=>!value)} style={{ '--eye-duration': reduced?'0ms':'850ms' } as React.CSSProperties}>
   <img src={src} alt="王菲《Di-Dar》眼睛摄影"/>
   <svg className="dd-eye-lid" viewBox="0 0 787 768" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs><linearGradient id="dd-lid-skin" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9c8773"/><stop offset="1" stopColor="#bba28b"/></linearGradient></defs>
    <g className="dd-eye-shutter"><path d="M220 486 Q365 302 596 418 Q570 544 397 554 Q284 549 220 486Z" fill="url(#dd-lid-skin)"/><path d="M220 486 Q394 560 596 418" fill="none" stroke="#48382c" strokeWidth="5"/><path d="M240 494l-6 12m28-2l-5 13m28-4l-3 14m29-8v14m29-10l2 15m30-15l3 14m28-18l5 13m28-20l6 12m25-22l8 11m21-25l9 11m19-27l10 9" stroke="#3b2d26" strokeWidth="2" fill="none"/></g>
   </svg>
   <button className="dd-eye-toggle" onClick={event=>{event.stopPropagation();setClosed(value=>!value)}} aria-pressed={closed} aria-label={closed?'睁开眼睛':'闭上眼睛'}>{closed?'睁眼':'闭眼'} ↗</button>
 </div>;
}
