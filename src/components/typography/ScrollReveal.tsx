import React,{useRef} from 'react';
import {motion,useScroll,useTransform,MotionValue} from 'motion/react';
import {useTypographyReducedMotion} from './useTypographyReducedMotion';
function RevealWord({word,index,total,progress,baseOpacity,blurStrength,baseRotation,baseOffset,enableBlur}:{word:string;index:number;total:number;progress:MotionValue<number>;baseOpacity:number;blurStrength:number;baseRotation:number;baseOffset:number;enableBlur:boolean}){
 const amount=useTransform(progress,v=>Math.max(0,Math.min(1,(v-.04-index/total*.22)*3.5)));
 const opacity=useTransform(amount,[0,1],[baseOpacity,1]),filter=useTransform(amount,[0,1],[`blur(${enableBlur?blurStrength:0}px)`,'blur(0px)']),rotate=useTransform(amount,[0,1],[baseRotation,0]),y=useTransform(amount,[0,1],[baseOffset,0]);
 return <motion.span aria-hidden="true" style={{opacity,filter,rotate,y,display:'inline-block',whiteSpace:'pre'}}>{word}</motion.span>;
}
export default function ScrollReveal({children,baseOpacity=.1,baseRotation=3,baseOffset=0,enableBlur=true,blurStrength=4,splitBy='words',first=false}:{children:string;highlightColor?:string|null;mode?:string;splitBy?:string;effect?:string;stagger?:number;duration?:number;smoothing?:number;baseOpacity?:number;baseRotation?:number;baseOffset?:number;enableBlur?:boolean;blurStrength?:number;first?:boolean}){
 const ref=useRef<HTMLParagraphElement>(null),reduced=useTypographyReducedMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start .98','end .25']});const words=splitBy==='words'&&children.includes(' ')?children.split(/(\s+)/):Array.from(children);
 return <p ref={ref} className="fm-scroll-lyric" aria-label={children}>{reduced||first?children:words.map((word,index)=><RevealWord key={index} word={word} index={index} total={words.length} progress={scrollYProgress} baseOpacity={baseOpacity} blurStrength={blurStrength} baseRotation={baseRotation} baseOffset={baseOffset} enableBlur={enableBlur}/>)}</p>;
}
