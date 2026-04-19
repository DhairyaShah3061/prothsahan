import React, { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform int u_shape;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

mat3 rotateX(float angle) {
    float s = sin(angle); float c = cos(angle);
    return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c);
}
mat3 rotateY(float angle) {
    float s = sin(angle); float c = cos(angle);
    return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c);
}
mat3 rotateZ(float angle) {
    float s = sin(angle); float c = cos(angle);
    return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0);
}

vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    return p;
}

vec2 project(vec3 p) {
    float perspective = 2.0 / (2.0 - p.z);
    return p.xy * perspective;
}

float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a; vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
    float d = distToSegment(p, a, b);
    return smoothstep(thickness + blur, thickness - blur, d);
}

void getCubeVertices(out vec3 v[8]) {
    float s = 0.7;
    v[0]=vec3(-s,-s,-s); v[1]=vec3(s,-s,-s); v[2]=vec3(s,s,-s); v[3]=vec3(-s,s,-s);
    v[4]=vec3(-s,-s,s); v[5]=vec3(s,-s,s); v[6]=vec3(s,s,s); v[7]=vec3(-s,s,s);
}

float drawWireframe(vec2 p, int shape, mat3 rotation, float scale, float thickness, float blur) {
    float result = 0.0;
    vec3 v[8];
    getCubeVertices(v);
    for (int i = 0; i < 8; i++) v[i] = rotation * (v[i] * scale);
    result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
    result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
    result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
    result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
    result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
    result += drawLine(p, project(v[5]), project(v[6]), thickness, blur);
    result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
    result += drawLine(p, project(v[7]), project(v[4]), thickness, blur);
    result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
    result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
    result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
    result += drawLine(p, project(v[3]), project(v[7]), thickness, blur);
    return clamp(result, 0.0, 1.0);
}

void main() {
    vec2 st = coord(gl_FragCoord.xy);
    vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1.0, -1.0);
    float mouseDistance = length(st - mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
    float time = u_time * 0.2;
    mat3 rotation = rotateY(time + (mouse.x - 0.5) * mouseInfluence * 1.0) *
                    rotateX(time * 0.7 + (mouse.y - 0.5) * mouseInfluence * 1.0) *
                    rotateZ(time * 0.1);
    float scale = 0.35;
    float blur = mix(0.0001, 0.05, mouseInfluence);
    float thickness = mix(0.002, 0.003, mouseInfluence);
    float shape = drawWireframe(st, u_shape, rotation, scale, thickness, blur);
    vec3 color = vec3(0.86, 0.08, 0.2);
    float dimming = 1.0 - mouseInfluence * 0.25;
    color *= shape * dimming;
    float vignette = 1.0 - length(st) * 0.22;
    color *= vignette;
    color = pow(color, vec3(0.9));
    gl_FragColor = vec4(color, 1.0);
}
`;

const VERTEX_SHADER = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_texcoord;
void main() {
    gl_Position = vec4(a_position, 1.0);
    v_texcoord = a_uv;
}
`;

const Problem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const uniforms = {
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_shape: gl.getUniformLocation(program, 'u_shape'),
    };

    const vertices = new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,1,0]);
    const uvs = new Float32Array([0,0, 1,0, 0,1, 1,1]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(program, 'a_uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

    const mouse = { x: 0, y: 0 };
    const mouseDamped = { x: 0, y: 0 };
    let currentShape = 0;
    let startTime = Date.now();
    let rafId = 0;
    let lastTime = performance.now();
    let intervalId: ReturnType<typeof setInterval>;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      mouseDamped.x += (mouse.x - mouseDamped.x) * 8 * dt;
      mouseDamped.y += (mouse.y - mouseDamped.y) * 8 * dt;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform2f(uniforms.u_mouse, mouseDamped.x, mouseDamped.y);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_pixelRatio, dpr);
      gl.uniform1f(uniforms.u_time, elapsed);
      gl.uniform1i(uniforms.u_shape, currentShape);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    intervalId = setInterval(() => { currentShape = (currentShape + 1) % 8; }, 3000);
    resize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <section id="problem" className="py-24 bg-[#050505] text-center relative overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none bg-black" style={{ position: 'absolute', inset: 0 }} />
      <div className="max-w-[1200px] mx-auto px-6 relative z-[2]">
        <Reveal>
          <svg className="w-16 h-16 mx-auto mb-9 opacity-60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#FF1B1B" strokeWidth="1.5" strokeDasharray="4 4"/>
            <path d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#FF1B1B" strokeWidth="2" strokeLinecap="round"/>
            <path d="M44 32c0 6.627-5.373 12-12 12" stroke="#FF1B1B" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
            <line x1="32" y1="38" x2="32" y2="44" stroke="#FF1B1B" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="32" cy="48" r="2" fill="#FF1B1B"/>
          </svg>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="max-w-[800px] mx-auto mb-7 text-[#F5F5F5] font-['Playfair_Display']"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Your Product Is Great.
            <br />
            So Why Isn't It Selling?
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="max-w-[680px] mx-auto mb-8 text-[#A8A8A8] text-lg leading-[1.8]">
            Most businesses don't fail because of bad products. They fail because nobody knows how to talk
            about them. Weak positioning. Generic messaging. Ads that burn money instead of building trust.
            Sound familiar?
          </p>
        </Reveal>

        <Reveal delay={3}>
          <p className="font-['Playfair_Display'] italic text-[#FF1B1B]" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
            That's the exact problem Prothsahan was built to solve.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Problem;
