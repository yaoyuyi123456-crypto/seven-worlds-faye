import { useEffect } from 'react';
import './AlbumTextEntrances.css';
export function AlbumTextEntrances(){useEffect(()=>{
 const selector='.ss-lyrics p,.yy-question,.yy-thought,.dd-words,.ja-passing-line,.ja-lyric-pair p,.ja-sun-verse p,.cy-song-fragment button,.fl-dream-phrase,.fl-writing h1,.cy-free-title,.dd-title h1,.ja-scene-heading h1,.yy-directory-field h1';
 const seen=new WeakSet<Element>();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('album-text-arrived');observer.unobserve(entry.target)}}),{threshold:.12});
 const scan=()=>document.querySelectorAll(selector).forEach(el=>{if(!seen.has(el)){seen.add(el);el.classList.add('album-text-enter');observer.observe(el)}});
 const mutation=new MutationObserver(scan);mutation.observe(document.body,{childList:true,subtree:true});scan();return()=>{observer.disconnect();mutation.disconnect()};
},[]);return null}
