import {useEffect,useRef} from 'react';
import {useTypographyReducedMotion} from '../typography/useTypographyReducedMotion';
export default function Grainient({colors=['#120f17','#2a0f0a','#9a3412','#f97316','#fed7aa'],angle=55,flow=.8,silk=.35,grainAmount=.08}:{colors?:string[];angle?:number;flow?:number;silk?:number;grainAmount?:number}){
 const ref=useRef<HTMLCanvasElement>(null),reduced=useTypographyReducedMotion(),palette=colors.join(',');
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;const rgb=palette.split(',').map(hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)));let frame=0,last=0,elapsed=0,w=240,h=160;const radians=angle*Math.PI/180;
 const paint=(time:number)=>{const image=ctx.createImageData(w,h),data=image.data;for(let y=0;y<h;y++){for(let x=0;x<w;x++){const u=x/w,v=y/h,a=u*Math.cos(radians)+v*Math.sin(radians);const wave=Math.sin(a*5+elapsed*.25+Math.sin(v*4-elapsed*.18)*silk*2);const bend=Math.cos(u*3-v*5+elapsed*.16);const t=Math.max(0,Math.min(.999,(wave+bend*.45+1.5)/3));const p=t*(rgb.length-1),i=Math.floor(p),mix=p-i;const noise=Math.sin(x*127.1+y*311.7+Math.floor(elapsed*10))*43758.5453;const grain=((noise-Math.floor(noise))-.5)*grainAmount*255;const index=(y*w+x)*4;for(let c=0;c<3;c++)data[index+c]=rgb[i][c]*(1-mix)+rgb[Math.min(i+1,rgb.length-1)][c]*mix+grain;data[index+3]=255}}ctx.putImageData(image,0,0)};
 const resize=()=>{const r=canvas.getBoundingClientRect();w=Math.min(360,Math.max(120,Math.round(r.width*.25)));h=Math.max(100,Math.round(w*r.height/Math.max(1,r.width)));canvas.width=w;canvas.height=h;paint(0)};
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();const tick=(now:number)=>{if(now-last>55){elapsed+=Math.min((now-(last||now))/1000,.1)*flow;last=now;paint(now)}frame=requestAnimationFrame(tick)};
 const visible=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&!reduced)frame=requestAnimationFrame(tick)};if(!reduced)frame=requestAnimationFrame(tick);document.addEventListener('visibilitychange',visible);return()=>{cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',visible)};
 },[palette,angle,flow,silk,grainAmount,reduced]);
 return <canvas ref={ref} className="fi-grainient" aria-hidden="true"/>;
}
