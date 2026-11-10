import { useEffect, useRef } from 'react';
import { useTypographyReducedMotion } from '../typography/useTypographyReducedMotion';

// Refract the supplied photograph, rather than drawing decorative rings over it.
export function PhotographicWater({ src }: { src: string }) {
 const ref=useRef<HTMLCanvasElement>(null), reduced=useTypographyReducedMotion();
 useEffect(()=>{
  if(reduced||!ref.current)return;
  const canvas=ref.current,gl=canvas.getContext('webgl',{alpha:true,antialias:false});if(!gl)return;
  const shaders:WebGLShader[]=[];
  const compile=(type:number,source:string)=>{const s=gl.createShader(type)!;gl.shaderSource(s,source);gl.compileShader(s);shaders.push(s);return s};
  const program=gl.createProgram()!;
  gl.attachShader(program,compile(gl.VERTEX_SHADER,'attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(program,compile(gl.FRAGMENT_SHADER,`precision mediump float; varying vec2 uv; uniform sampler2D photo; uniform vec2 size; uniform vec2 imageSize; uniform float time; uniform vec4 rings[8];
  void main(){vec2 u=vec2(uv.x,1.-uv.y);vec2 d=vec2(sin(u.y*15.+time*.6),cos(u.x*13.-time*.4))*.0015;
   for(int i=0;i<8;i++){vec2 v=(u-rings[i].xy)*vec2(size.x/size.y,1.);float radius=length(v);float age=time-rings[i].z;float envelope=exp(-abs(radius-age*.18)*28.)*exp(-age*.9)*step(0.,age)*rings[i].w;d+=normalize(v+vec2(.0001))*sin(radius*90.-age*19.)*.009*envelope;}
   float box=size.x/size.y;float image=imageSize.x/imageSize.y;vec2 cover=box>image?vec2(1.,image/box):vec2(box/image,1.);vec2 sampleUv=(u+d-.5)*cover+.5;
   vec3 c=texture2D(photo,clamp(sampleUv,.001,.999)).rgb;float light=(d.x+d.y)*2.;gl_FragColor=vec4(c+light,1.);}`));
  gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);return}gl.useProgram(program);
  const buffer=gl.createBuffer()!;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const pos=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const texture=gl.createTexture()!;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  const size=gl.getUniformLocation(program,'size'),imageSize=gl.getUniformLocation(program,'imageSize'),time=gl.getUniformLocation(program,'time'),ringUniform=gl.getUniformLocation(program,'rings[0]');
  let frame=0,ready=false,disposed=false,slot=0,previous=0;const start=performance.now(),rings=new Float32Array(32);
  const image=new Image();image.onload=()=>{if(disposed)return;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.uniform2f(imageSize,image.naturalWidth,image.naturalHeight);ready=true};image.src=src;
  const resize=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio,1.5);canvas.width=Math.max(1,r.width*d);canvas.height=Math.max(1,r.height*d);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(size,Math.max(1,r.width),Math.max(1,r.height))};const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  const ripple=(e:PointerEvent)=>{const now=performance.now();if(e.type==='pointermove'&&now-previous<100)return;const r=canvas.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;previous=now;const i=(slot++%8)*4;rings[i]=(e.clientX-r.left)/r.width;rings[i+1]=(e.clientY-r.top)/r.height;rings[i+2]=(now-start)/1000;rings[i+3]=1};
  const draw=(now:number)=>{if(ready){gl.uniform1f(time,(now-start)/1000);gl.uniform4fv(ringUniform,rings);gl.drawArrays(gl.TRIANGLES,0,6)}frame=requestAnimationFrame(draw)};
  const visibility=()=>{cancelAnimationFrame(frame);if(!document.hidden)frame=requestAnimationFrame(draw)};
  window.addEventListener('pointermove',ripple,{passive:true});window.addEventListener('pointerdown',ripple,{passive:true});document.addEventListener('visibilitychange',visibility);frame=requestAnimationFrame(draw);
  return()=>{disposed=true;image.onload=null;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',ripple);window.removeEventListener('pointerdown',ripple);document.removeEventListener('visibilitychange',visibility);gl.deleteTexture(texture);gl.deleteBuffer(buffer);shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program)};
 },[src,reduced]);
 return reduced?null:<canvas ref={ref} className="cy-photographic-water" aria-hidden="true"/>;
}
