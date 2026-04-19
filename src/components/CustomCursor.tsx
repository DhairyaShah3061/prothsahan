import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ mx: 0, my: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const animateTrail = () => {
      pos.current.tx += (pos.current.mx - pos.current.tx) * 0.15;
      pos.current.ty += (pos.current.my - pos.current.ty) * 0.15;
      trail.style.left = `${pos.current.tx}px`;
      trail.style.top = `${pos.current.ty}px`;
      rafRef.current = requestAnimationFrame(animateTrail);
    };

    rafRef.current = requestAnimationFrame(animateTrail);
    document.addEventListener('mousemove', onMouseMove);

    const onEnter = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      trail.style.width = '56px';
      trail.style.height = '56px';
    };
    const onLeave = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      trail.style.width = '40px';
      trail.style.height = '40px';
    };

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 bg-[#FF1B1B] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-[width,height,opacity] duration-200"
        style={{ transition: 'transform 0.08s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s' }}
      />
      <div
        ref={trailRef}
        className="fixed w-10 h-10 border border-[rgba(255,27,27,0.4)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'all 0.18s ease' }}
      />
    </>
  );
};

export default CustomCursor;
