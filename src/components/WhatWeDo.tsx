import React, { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const SMOKE_FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1.,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1.,.08,.08);
  uv*=vec2(.85,.95);
  float n=fbm(uv*.26-vec2(T*.008,0.));
  n=noise(uv*1.6+n*2.6);
  float smoke=fbm(uv*1.1+vec2(0.,T*.015)+n);
  col.r-=smoke*1.05; col.g-=smoke*0.9; col.b-=smoke*0.82;
  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));
  float spread=fbm(uv*.22+vec2(T*.004,-T*.003));
  col=mix(col, vec3(1.), spread*0.42);
  col+=vec3(0.12,0.02,0.02)*spread*0.35;
  col=mix(vec3(.03,.03,.03),col,min(time*.1,1.));
  col=max(col, vec3(.03,.03,.03));
  col=clamp(col,0.,1.);
  O=vec4(col,1.);
}`;

const SMOKE_VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const WhatWeDo: React.FC = () => {
  const shaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = shaderRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, SMOKE_VERT);
    const fs = compile(gl.FRAGMENT_SHADER, SMOKE_FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resU = gl.getUniformLocation(prog, 'resolution');
    const timeU = gl.getUniformLocation(prog, 'time');
    const colorU = gl.getUniformLocation(prog, 'u_color');

    const updateScale = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let rafId = 0;
    const loop = (now: number) => {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.uniform2f(resU, canvas.width, canvas.height);
      gl.uniform1f(timeU, now * 1e-3);
      gl.uniform3fv(colorU, [1.0, 0.08, 0.08]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(loop);
    };

    const onResize = () => updateScale();
    window.addEventListener('resize', onResize);
    updateScale();
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  const pillars = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      title: 'Data-Driven Decisions',
      desc: 'Every campaign is backed by statistical analysis, ad tracking, and customer behavior insights.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: 'Psychological Storytelling',
      desc: 'Messaging that triggers emotion, builds trust, and makes your audience choose you — repeatedly.',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      title: 'Full-Funnel Execution',
      desc: 'Attention to Interest to Trust to Conversion. We engineer the entire pipeline.',
    },
  ];

  return (
    <section id="what-we-do" className="py-24 relative overflow-hidden bg-black">
      {/* Shader background */}
      <div
        ref={shaderRef}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07), transparent 58%), linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.88))',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Copy */}
          <div className="relative">
            <Reveal>
              <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                WHAT WE DO
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                We Engineer Growth.
                <br />
                Not Just Attention.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-[#A8A8A8] mt-5 leading-[1.8]">
                Prothsahan is a growth-first business accelerator. We combine data-backed strategy with
                emotionally intelligent storytelling to build systems that move real revenue — not just
                likes and impressions.
              </p>
            </Reveal>

            <div className="flex flex-col gap-7 mt-9">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={(i + 2) as 0|1|2|3|4|5}>
                  <div className="flex gap-4 items-start p-5 bg-[rgba(3,7,18,0.48)] backdrop-blur-md border border-white/[0.06] rounded-2xl hover:border-[rgba(255,27,27,0.3)] hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 flex-shrink-0 bg-[rgba(255,27,27,0.12)] rounded-xl flex items-center justify-center text-[#FF1B1B]">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="font-['DM_Sans'] text-[15px] font-semibold mb-1">{pillar.title}</h4>
                      <p className="text-sm text-[#A8A8A8] leading-[1.6]">{pillar.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Visual */}
          <Reveal delay={3} className="flex items-center justify-center">
            <div
              className="w-[380px] h-[380px] rounded-full flex items-center justify-center relative border border-[rgba(255,27,27,0.44)]"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255,27,27,0.44), rgba(0,0,0,0.56) 42%, rgba(0,0,0,0.64) 72%)',
                animation: 'orbSpin 20s linear infinite',
              }}
            >
              <div
                className="absolute inset-5 rounded-full border border-dashed border-[rgba(255,27,27,0.28)]"
                style={{ animation: 'orbSpin 12s linear infinite reverse' }}
              />
              <div className="text-center z-[1]">
                <span
                  className="font-['Playfair_Display'] font-black leading-none block text-[#FF4A4A]"
                  style={{ fontSize: 72, textShadow: '0 0 40px rgba(255,27,27,0.45)' }}
                >
                  3x
                </span>
                <p className="text-sm text-[#6B6B6B] mt-1">Average ROI<br />across campaigns</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes orbSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;
