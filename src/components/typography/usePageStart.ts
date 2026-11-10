import {useLayoutEffect} from 'react';
/** Reset after the new page is committed, so an old page's height cannot clamp it. */
export function usePageStart(pageKey: string | number | null){useLayoutEffect(()=>{const reset=()=>{window.scrollTo({top:0,left:0,behavior:'instant'});};reset();const frame=requestAnimationFrame(reset);return()=>cancelAnimationFrame(frame);},[pageKey]);}
