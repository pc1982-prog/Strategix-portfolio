// src/components/hero/LightRays.jsx
"use client";

import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './LightRays.css'; // <-- tiny CSS (see below)

const DEFAULT_COLOR = '#00ffff';
const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left':   return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right':  return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left':       return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right':      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left':return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center':return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right':return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: // top-center
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const LightRays = ({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1.2,
  lightSpread = 0.75,
  rayLength = 1.8,
  pulsating = true,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.12,
  noiseAmount = 0.06,
  distortion = 0.04,
  className = '',
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animIdRef = useRef(null);
  const cleanupRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // ---- IntersectionObserver (lazy start) ----
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // ---- WebGL init / destroy ----
  useEffect(() => {
    if (!visible || !containerRef.current) return;

    const init = async () => {
      await new Promise(r => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
  containerRef.current.appendChild(gl.canvas);

      const vert = `attribute vec2 position; varying vec2 vUv; void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.,1.);}`;
      const frag = `precision highp float;
uniform float iTime; uniform vec2 iResolution; uniform vec2 rayPos; uniform vec2 rayDir;
uniform vec3 raysColor; uniform float raysSpeed; uniform float lightSpread; uniform float rayLength;
uniform float pulsating; uniform float fadeDistance; uniform float saturation;
uniform vec2 mousePos; uniform float mouseInfluence; uniform float noiseAmount; uniform float distortion;
varying vec2 vUv;
float noise(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float ray(vec2 src,vec2 dir,vec2 p,float s1,float s2,float spd){
  vec2 d=p-src; float len=length(d); vec2 nd=normalize(d);
  float ang=dot(nd,dir);
  ang+=distortion*sin(iTime*2.+len*.01)*.2;
  float spread=pow(max(ang,0.),1./max(lightSpread,.001));
  float maxDist=iResolution.x*rayLength;
  float lenFall=clamp((maxDist-len)/maxDist,0.,1.);
  float fadeFall=clamp((iResolution.x*fadeDistance-len)/(iResolution.x*fadeDistance),.5,1.);
  float pulse=pulsating>.5?(0.8+.2*sin(iTime*spd*3.)) : 1.;
  float base=clamp(.45+.15*sin(ang*s1+iTime*spd)+.3+.2*cos(-ang*s2+iTime*spd),0.,1.);
  return base*lenFall*fadeFall*spread*pulse;
}
void mainImage(out vec4 c,in vec2 f){
  vec2 p=vec2(f.x,iResolution.y-f.y);
  vec2 finalDir=rayDir;
  if(mouseInfluence>0.){
    vec2 mp=mousePos*iResolution; vec2 md=normalize(mp-rayPos);
    finalDir=normalize(mix(rayDir,md,mouseInfluence));
  }
  vec4 r1=vec4(1.)*ray(rayPos,finalDir,p,36.22,21.11,1.5*raysSpeed);
  vec4 r2=vec4(1.)*ray(rayPos,finalDir,p,22.4,18.02,1.1*raysSpeed);
  c=r1*.5+r2*.4;
  if(noiseAmount>0.){float n=noise(p*.01+iTime*.1);c.rgb*=(1.-noiseAmount+noiseAmount*n);}
  float bright=1.-p.y/iResolution.y;
  c.x*=.1+bright*.8; c.y*=.3+bright*.6; c.z*=.5+bright*.5;
  if(saturation!=1.){float g=dot(c.rgb,vec3(.299,.587,.114));c.rgb=mix(vec3(g),c.rgb,saturation);}
  c.rgb*=raysColor;
}
void main(){vec4 col;mainImage(col,gl_FragCoord.xy);gl_FragColor=col;}`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1 : 0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      meshRef.current = mesh;

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        const dpr = renderer.dpr;
        uniforms.iResolution.value = [w * dpr, h * dpr];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w * dpr, h * dpr);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

  const loop = (t) => {
        if (!rendererRef.current) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence) {
          const s = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
          smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        renderer.render({ scene: mesh });
        animIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener('resize', resize);
      resize();
      animIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        window.removeEventListener('resize', resize);
        const ext = gl.getExtension('WEBGL_lose_context');
        ext?.loseContext();
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    init();

    return () => cleanupRef.current?.();
  }, [
    visible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength,
    pulsating, fadeDistance, saturation, followMouse, mouseInfluence,
    noiseAmount, distortion,
  ]);

  // ---- Mouse tracking ----
  useEffect(() => {
    if (!followMouse) return;
  const onMove = (e) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`.trim()}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

export default LightRays;