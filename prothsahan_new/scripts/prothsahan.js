const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const contactForm = document.getElementById('contact-form');
let mx = 0;
let my = 0;
let tx = 0;
let ty = 0;
let lastScroll = 0;

if (cursor && trail) {
  document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    cursor.style.left = `${mx}px`;
    cursor.style.top = `${my}px`;
  });

  function animateTrail() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = `${tx}px`;
    trail.style.top = `${ty}px`;
    requestAnimationFrame(animateTrail);
  }

  animateTrail();

  document.querySelectorAll('a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      trail.style.width = '56px';
      trail.style.height = '56px';
    });

    element.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      trail.style.width = '40px';
      trail.style.height = '40px';
    });
  });
}

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
      if (currentScroll > lastScroll + 5) {
        navbar.classList.add('hidden');
      } else if (currentScroll < lastScroll - 5) {
        navbar.classList.remove('hidden');
      }
    } else {
      navbar.classList.remove('scrolled', 'hidden');
    }

    lastScroll = currentScroll;
  });
}

function closeMobileMenu() {
  if (!hamburger || !mobileMenu) {
    return;
  }

  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10);
  const suffix = element.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-value').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}

if (contactForm) {
  contactForm.addEventListener('submit', function submitHandler(event) {
    event.preventDefault();
    this.style.display = 'none';

    const successMessage = document.getElementById('form-success');
    if (successMessage) {
      successMessage.style.display = 'block';
    }
  });
}

const problemMeshContainer = document.getElementById('problem-geometric-mesh');

if (problemMeshContainer) {
  const fragmentShader = `
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
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
    );
}

mat3 rotateY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

mat3 rotateZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1.0
    );
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
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
    float d = distToSegment(p, a, b);
    return smoothstep(thickness + blur, thickness - blur, d);
}

void getCubeVertices(out vec3 v[8]) {
    float s = 0.7;
    v[0] = vec3(-s, -s, -s);
    v[1] = vec3( s, -s, -s);
    v[2] = vec3( s,  s, -s);
    v[3] = vec3(-s,  s, -s);
    v[4] = vec3(-s, -s,  s);
    v[5] = vec3( s, -s,  s);
    v[6] = vec3( s,  s,  s);
    v[7] = vec3(-s,  s,  s);
}

void getTetrahedronVertices(out vec3 v[4]) {
    float a = 1.0 / sqrt(3.0);
    v[0] = vec3( a,  a,  a);
    v[1] = vec3( a, -a, -a);
    v[2] = vec3(-a,  a, -a);
    v[3] = vec3(-a, -a,  a);
}

void getOctahedronVertices(out vec3 v[6]) {
    v[0] = vec3( 1.0,  0.0,  0.0);
    v[1] = vec3(-1.0,  0.0,  0.0);
    v[2] = vec3( 0.0,  1.0,  0.0);
    v[3] = vec3( 0.0, -1.0,  0.0);
    v[4] = vec3( 0.0,  0.0,  1.0);
    v[5] = vec3( 0.0,  0.0, -1.0);
}

void getIcosahedronVertices(out vec3 v[12]) {
    float t = (1.0 + sqrt(5.0)) / 2.0;
    float s = 1.0 / sqrt(1.0 + t * t);
    v[0] = vec3(-s, t * s, 0.0);
    v[1] = vec3( s, t * s, 0.0);
    v[2] = vec3(-s,-t * s, 0.0);
    v[3] = vec3( s,-t * s, 0.0);
    v[4] = vec3(0.0, -s, t * s);
    v[5] = vec3(0.0,  s, t * s);
    v[6] = vec3(0.0, -s,-t * s);
    v[7] = vec3(0.0,  s,-t * s);
    v[8] = vec3( t * s, 0.0, -s);
    v[9] = vec3( t * s, 0.0,  s);
    v[10] = vec3(-t * s, 0.0, -s);
    v[11] = vec3(-t * s, 0.0,  s);
}

float drawWireframe(vec2 p, int shape, mat3 rotation, float scale, float thickness, float blur) {
    float result = 0.0;
    if (shape == 0) {
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
    } else if (shape == 1) {
        vec3 v[4];
        getTetrahedronVertices(v);
        for (int i = 0; i < 4; i++) v[i] = rotation * (v[i] * scale);
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
    } else if (shape == 2) {
        vec3 v[6];
        getOctahedronVertices(v);
        for (int i = 0; i < 6; i++) v[i] = rotation * (v[i] * scale);
        result += drawLine(p, project(v[2]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
    } else if (shape == 3) {
        vec3 v[12];
        getIcosahedronVertices(v);
        for (int i = 0; i < 12; i++) v[i] = rotation * (v[i] * scale);
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[9]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
    } else {
        vec3 v[5];
        float s = 0.7;
        v[0] = vec3(-s, 0.0, -s);
        v[1] = vec3( s, 0.0, -s);
        v[2] = vec3( s, 0.0,  s);
        v[3] = vec3(-s, 0.0,  s);
        v[4] = vec3( 0.0, 1.0,  0.0);
        for (int i = 0; i < 5; i++) v[i] = rotation * (v[i] * scale);
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
    }
    return clamp(result, 0.0, 1.0);
}

vec3 render(vec2 st, vec2 mouse) {
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
    return color;
}

void main() {
    vec2 st = coord(gl_FragCoord.xy);
    vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1.0, -1.0);
    vec3 color = render(st, mouse);
    gl_FragColor = vec4(color, 1.0);
}
`;

  const vertexShader = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_texcoord;

void main() {
    gl_Position = vec4(a_position, 1.0);
    v_texcoord = a_uv;
}
`;

  const canvas = document.createElement('canvas');
  problemMeshContainer.appendChild(canvas);

  const gl = canvas.getContext('webgl', {
    antialias: true,
    alpha: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  });

  if (gl) {
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (vShader && fShader) {
      const program = gl.createProgram();
      if (program) {
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.useProgram(program);

          const uniforms = {
            u_mouse: gl.getUniformLocation(program, 'u_mouse'),
            u_resolution: gl.getUniformLocation(program, 'u_resolution'),
            u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
            u_time: gl.getUniformLocation(program, 'u_time'),
            u_shape: gl.getUniformLocation(program, 'u_shape'),
          };

          const vertices = new Float32Array([
            -1, -1, 0,
             1, -1, 0,
            -1,  1, 0,
             1,  1, 0,
          ]);

          const uvs = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            1, 1,
          ]);

          const positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
          const positionLocation = gl.getAttribLocation(program, 'a_position');
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

          const uvBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
          const uvLocation = gl.getAttribLocation(program, 'a_uv');
          gl.enableVertexAttribArray(uvLocation);
          gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

          const mouse = { x: 0, y: 0 };
          const mouseDamped = { x: 0, y: 0 };
          let currentShape = 0;
          let shapeIntervalId = 0;
          let startTime = Date.now();
          let animationFrameId = 0;
          let lastTime = performance.now();

          const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = problemMeshContainer.clientWidth;
            const height = problemMeshContainer.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
          };

          const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
          };

          const handleTouchMove = (event) => {
            if (!event.touches || !event.touches.length) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.touches[0].clientX - rect.left;
            mouse.y = event.touches[0].clientY - rect.top;
          };

          const handleClick = () => {
            currentShape = (currentShape + 1) % 8;
          };

          const animate = (now) => {
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now;

            mouseDamped.x += (mouse.x - mouseDamped.x) * 8 * deltaTime;
            mouseDamped.y += (mouse.y - mouseDamped.y) * 8 * deltaTime;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const elapsed = (Date.now() - startTime) / 1000;

            if (uniforms.u_mouse) gl.uniform2f(uniforms.u_mouse, mouseDamped.x, mouseDamped.y);
            if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
            if (uniforms.u_pixelRatio) gl.uniform1f(uniforms.u_pixelRatio, dpr);
            if (uniforms.u_time) gl.uniform1f(uniforms.u_time, elapsed);
            if (uniforms.u_shape) gl.uniform1i(uniforms.u_shape, currentShape);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(animate);
          };

          window.addEventListener('resize', resize);
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('touchmove', handleTouchMove);
          problemMeshContainer.addEventListener('click', handleClick);
          shapeIntervalId = window.setInterval(() => {
            currentShape = (currentShape + 1) % 8;
          }, 3000);
          resize();
          animationFrameId = requestAnimationFrame(animate);

          window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationFrameId);
            window.clearInterval(shapeIntervalId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            problemMeshContainer.removeEventListener('click', handleClick);
            if (positionBuffer) gl.deleteBuffer(positionBuffer);
            if (uvBuffer) gl.deleteBuffer(uvBuffer);
            gl.deleteProgram(program);
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
          });
        }
      }
    }
  }
}

const statsWaveContainer = document.getElementById('stats-iso-grid-canvas');

if (statsWaveContainer) {
  const canvas = document.createElement('canvas');
  canvas.className = 'stats-iso-canvas';
  statsWaveContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (ctx) {
    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    const density = 46;
    const speed = 1.2;
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let time = 0;

    const smoothMix = (a, b, t) => a + (b - a) * t;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = statsWaveContainer.clientWidth;
      height = statsWaveContainer.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = event.clientX - rect.left;
      mouse.targetY = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x = smoothMix(mouse.x, mouse.targetX, 0.1);
      mouse.y = smoothMix(mouse.y, mouse.targetY, 0.1);

      time += 0.01 * speed;

      const rows = Math.ceil(height / density) + 5;
      const cols = Math.ceil(width / density) + 5;

      for (let y = 0; y <= rows; y += 1) {
        ctx.beginPath();
        let isFirst = true;

        for (let x = 0; x <= cols; x += 1) {
          const baseX = (x * density) - (density * 2);
          const baseY = (y * density) - (density * 2);
          const wave = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 18;
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt((dx * dx) + (dy * dy));
          const maxDist = 300;
          const force = Math.max(0, (maxDist - dist) / maxDist);
          const interactionY = -((force * force) * 90);

          const finalX = baseX;
          const finalY = baseY + wave + interactionY;

          if (isFirst) {
            ctx.moveTo(finalX, finalY);
            isFirst = false;
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(220, 20, 60, 0.0)');
        gradient.addColorStop(0.5, 'rgba(220, 20, 60, 0.58)');
        gradient.addColorStop(1, 'rgba(220, 20, 60, 0.0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    statsWaveContainer.addEventListener('mousemove', handleMouseMove);
    statsWaveContainer.addEventListener('mouseleave', handleMouseLeave);

    resize();
    draw();

    window.addEventListener('beforeunload', () => {
      window.removeEventListener('resize', resize);
      statsWaveContainer.removeEventListener('mousemove', handleMouseMove);
      statsWaveContainer.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    });
  }
}

const shaderContainer = document.getElementById('shader-animation');

if (shaderContainer) {
  const fragmentShaderSource = `#version 300 es
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
  col.r-=smoke*1.05;
  col.g-=smoke*0.9;
  col.b-=smoke*0.82;

  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));
  float spread=fbm(uv*.22+vec2(T*.004,-T*.003));
  col=mix(col, vec3(1.), spread*0.42);
  col+=vec3(0.12,0.02,0.02)*spread*0.35;
  col=mix(vec3(.03,.03,.03),col,min(time*.1,1.));
  col=max(col, vec3(.03,.03,.03));
  col=clamp(col,0.,1.);
  O=vec4(col,1.);
}`;

  class SmokeRenderer {
    constructor(canvas, fragmentSource, color) {
      this.canvas = canvas;
      this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
      this.vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
      this.color = color;
      this.gl = canvas.getContext('webgl2');
      this.program = null;
      this.vs = null;
      this.fs = null;
      this.buffer = null;
      if (!this.gl) {
        return;
      }
      this.setup(fragmentSource);
      this.init();
    }

    compile(shader, source) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      }
    }

    updateScale() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      this.canvas.width = Math.floor(width * dpr);
      this.canvas.height = Math.floor(height * dpr);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    setup(fragmentSource) {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!this.vs || !this.fs || !program) {
        return;
      }
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, fragmentSource);
      gl.attachShader(program, this.vs);
      gl.attachShader(program, this.fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
      }
      this.program = program;
    }

    init() {
      const gl = this.gl;
      const program = this.program;
      if (!program) {
        return;
      }
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      this.resolutionUniform = gl.getUniformLocation(program, 'resolution');
      this.timeUniform = gl.getUniformLocation(program, 'time');
      this.colorUniform = gl.getUniformLocation(program, 'u_color');
    }

    render(now) {
      const gl = this.gl;
      const program = this.program;
      if (!program || !gl.isProgram(program)) {
        return;
      }
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.uniform2f(this.resolutionUniform, this.canvas.width, this.canvas.height);
      gl.uniform1f(this.timeUniform, now * 1e-3);
      gl.uniform3fv(this.colorUniform, this.color);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    dispose() {
      const gl = this.gl;
      if (!gl || !this.program) {
        return;
      }
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      if (this.buffer) {
        gl.deleteBuffer(this.buffer);
      }
      gl.deleteProgram(this.program);
      this.program = null;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'smoke-canvas';
  shaderContainer.appendChild(canvas);

  const smokeColor = [1.0, 0.08, 0.08];
  const renderer = new SmokeRenderer(canvas, fragmentShaderSource, smokeColor);

  if (renderer.gl) {
    renderer.updateScale();

    let animationFrameId = 0;
    const loop = (now) => {
      renderer.render(now);
      animationFrameId = requestAnimationFrame(loop);
    };

    const onWindowResize = () => {
      renderer.updateScale();
    };

    window.addEventListener('resize', onWindowResize, false);
    loop(0);

    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    });
  }
}

const partnerWaveContainer = document.getElementById('partner-wave-canvas');

if (partnerWaveContainer) {
  const vertexShaderSource = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

  const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pxSize;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.45);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 px = max(vec2(2.0), vec2(u_pxSize));
  vec2 snappedFragCoord = floor(gl_FragCoord.xy / px) * px + px * 0.5;
  vec2 uv = (snappedFragCoord - 0.5 * u_resolution) / u_resolution.y;
  float t = u_time * 0.65;

  float wave = sin(uv.x * 5.2 + t * 2.1) * 0.24;
  wave += sin(uv.x * 2.3 - t * 1.3) * 0.16;
  wave -= 0.52;

  float band = 1.0 - smoothstep(0.0, 0.92, abs(uv.y - wave));
  float glow = fbm(vec2(uv.x * 2.2, uv.y * 2.8 + t * 0.5));
  float streaks = smoothstep(0.45, 0.88, glow);
  float grain = noise(uv * 45.0 + t * 2.0);

  vec3 bg = vec3(0.0);
  vec3 crimson = vec3(0.86, 0.05, 0.18);
  vec3 deepCrimson = vec3(0.36, 0.0, 0.06);

  vec3 color = mix(bg, deepCrimson, band * 0.55);
  color = mix(color, crimson, band * 0.7 + streaks * 0.35);
  color += crimson * grain * band * 0.12;
  color = mix(color, vec3(0.0), smoothstep(0.72, 1.2, abs(uv.y)));

  fragColor = vec4(color, 1.0);
}
`;

  class ProblemWaveRenderer {
    constructor(canvas, fragmentSource) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl2');
      this.vertexShaderSource = vertexShaderSource;
      this.fragmentShaderSource = fragmentSource;
      this.program = null;
      this.vs = null;
      this.fs = null;
      this.buffer = null;
      this.timeUniform = null;
      this.resolutionUniform = null;
      this.pixelSizeUniform = null;
      if (!this.gl) {
        return;
      }
      this.setup();
      this.init();
    }

    compile(shader, source) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Wave shader compilation error:', gl.getShaderInfoLog(shader));
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (!this.vs || !this.fs || !program) {
        return;
      }
      this.compile(this.vs, this.vertexShaderSource);
      this.compile(this.fs, this.fragmentShaderSource);
      gl.attachShader(program, this.vs);
      gl.attachShader(program, this.fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Wave program linking error:', gl.getProgramInfoLog(program));
      }
      this.program = program;
    }

    init() {
      const gl = this.gl;
      const program = this.program;
      if (!program) {
        return;
      }
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      this.timeUniform = gl.getUniformLocation(program, 'u_time');
      this.resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
      this.pixelSizeUniform = gl.getUniformLocation(program, 'u_pxSize');
    }

    resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      this.canvas.width = Math.floor(width * dpr);
      this.canvas.height = Math.floor(height * dpr);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    render(now) {
      const gl = this.gl;
      const program = this.program;
      if (!program || !gl.isProgram(program)) {
        return;
      }
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.uniform1f(this.timeUniform, now * 1e-3);
      gl.uniform2f(this.resolutionUniform, this.canvas.width, this.canvas.height);
      gl.uniform1f(this.pixelSizeUniform, 14.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    dispose() {
      const gl = this.gl;
      if (!gl || !this.program) {
        return;
      }
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
      }
      if (this.buffer) {
        gl.deleteBuffer(this.buffer);
      }
      gl.deleteProgram(this.program);
      this.program = null;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'smoke-canvas';
  canvas.style.imageRendering = 'pixelated';
  partnerWaveContainer.appendChild(canvas);

  const renderer = new ProblemWaveRenderer(canvas, fragmentShaderSource);

  if (renderer.gl) {
    renderer.resize();

    let animationFrameId = 0;
    const loop = (now) => {
      renderer.render(now);
      animationFrameId = requestAnimationFrame(loop);
    };

    const onWindowResize = () => {
      renderer.resize();
    };

    window.addEventListener('resize', onWindowResize, false);
    loop(0);

    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    });
  }
}
