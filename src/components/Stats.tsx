import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

interface StatItemProps {
  target: number;
  suffix: string;
  label: string;
  note: string;
  animate: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ target, suffix, label, note, animate }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 1800;
    const start = performance.now();
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [animate, target]);

  return (
    <div className="text-center">
      <span
        className="font-['Playfair_Display'] font-black leading-none block text-[#FF1B1B]"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)', textShadow: '0 0 40px rgba(255,27,27,0.5)' }}
      >
        {value}{suffix}
      </span>
      <div className="text-base font-medium text-[#F5F5F5] mt-2 mb-1">{label}</div>
      <div className="font-['JetBrains_Mono'] text-[11px] text-[#6B6B6B] tracking-[1px]">{note}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Wave canvas animation
  useEffect(() => {
    const container = waveRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0, rafId = 0;
    let time = 0;
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
    const density = 46;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.tx = -1000; mouse.ty = -1000; };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;
      time += 0.012;
      const rows = Math.ceil(height / density) + 5;
      const cols = Math.ceil(width / density) + 5;

      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        let isFirst = true;
        for (let x = 0; x <= cols; x++) {
          const baseX = x * density - density * 2;
          const baseY = y * density - density * 2;
          const wave = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 18;
          const dx = baseX - mouse.x, dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (300 - dist) / 300);
          const finalY = baseY + wave - force * force * 90;
          if (isFirst) { ctx.moveTo(baseX, finalY); isFirst = false; }
          else ctx.lineTo(baseX, finalY);
        }
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, 'rgba(220,20,60,0.0)');
        grad.addColorStop(0.5, 'rgba(220,20,60,0.58)');
        grad.addColorStop(1, 'rgba(220,20,60,0.0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  const stats = [
    { target: 50, suffix: '+', label: 'Brands Accelerated', note: 'and counting' },
    { target: 3, suffix: 'x', label: 'Average ROI', note: 'across campaigns' },
    { target: 0, suffix: '', label: 'Vanity Metrics Tracked', note: 'we only track revenue' },
    { target: 100, suffix: '%', label: 'Growth-First Mindset', note: 'no exceptions' },
  ];

  return (
    <section id="stats" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div
        ref={waveRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.78), rgba(0,0,0,0.94))' }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 0%, #000 100%)', opacity: 0.75 }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[2]">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              RESULTS
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Numbers That Actually Matter.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={(i + 1) as 0|1|2|3|4|5}>
              <StatItem {...stat} animate={animate} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
