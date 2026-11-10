import { useEffect, useRef } from 'react';
import { useTypographyReducedMotion } from '../typography/useTypographyReducedMotion';
export function PhotographicRain() {
 const ref=useRef<HTMLCanvasElement>(null), reduced=useTypographyReducedMotion();
 useEffect(()=>{
  if(reduced||!ref.current)return;
  const canvas=ref.current, ctx=canvas.getContext('2d'); if(!ctx)return;
  let w=0,h=0,frame=0,last=0,wind=-35;
  const drops=Array.from({length:160},()=>({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7}));
  const rings:{x:number;y:number;age:number}[]=[];
  const resize=()=>{w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio,1.5);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  const move=(e:PointerEvent)=>{wind=(e.clientX/innerWidth-.5)*100-35};
  const draw=(time:number)=>{const dt=Math.min((time-(last||time))/1000,.04);last=time;ctx.clearRect(0,0,w,h);
   drops.forEach(d=>{d.x+=wind*d.z*dt/Math.max(1,w);d.y+=(360+d.z*550)*dt/Math.max(1,h);if(d.y>1){if(rings.length<30)rings.push({x:d.x*w,y:h*(.88+Math.random()*.11),age:0});d.y=-.04;d.x=Math.random()}if(d.x<0)d.x=1;if(d.x>1)d.x=0;ctx.strokeStyle=`rgba(220,230,240,${.08+d.z*.25})`;ctx.lineWidth=.5+d.z*.7;ctx.beginPath();ctx.moveTo(d.x*w,d.y*h);ctx.lineTo(d.x*w-wind*.035,d.y*h-10-d.z*22);ctx.stroke()});
   for(let i=rings.length-1;i>=0;i--){const r=rings[i];r.age+=dt;if(r.age>.65){rings.splice(i,1);continue}ctx.strokeStyle=`rgba(224,230,241,${(1-r.age/.65)*.2})`;ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(r.x,r.y,2+r.age*24,1+r.age*5,0,0,Math.PI*2);ctx.stroke()}
   frame=requestAnimationFrame(draw)};
  const visible=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden)frame=requestAnimationFrame(draw)};
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',visible);frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visible)};
 },[reduced]);
 return reduced?null:<canvas ref={ref} className="yy-real-rain" aria-hidden="true"/>;
}
