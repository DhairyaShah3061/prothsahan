import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ mx: 0, my: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // update target on mouse move; apply transforms in rAF loop to avoid layout thrash
    const onMouseMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement) || null;
      if (target && target.closest && target.closest('a,button')) {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        trail.style.width = '56px';
        trail.style.height = '56px';
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement) || null;
      if (target && target.closest && target.closest('a,button')) {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        trail.style.width = '40px';
        trail.style.height = '40px';
      }
    };

    const animate = () => {
      pos.current.tx += (pos.current.mx - pos.current.tx) * 0.15;
      pos.current.ty += (pos.current.my - pos.current.ty) * 0.15;
      const cx = pos.current.mx;
      const cy = pos.current.my;
      const tx = pos.current.tx;
      const ty = pos.current.ty;
      // Use transform for GPU-accelerated movement
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    document.addEventListener('mousemove', onMouseMove);
    // delegate hover changes to document to avoid per-element listeners
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        className="fixed w-5 h-5 bg-[#FF1B1B] rounded-full pointer-events-none z-[9999] mix-blend-screen transition-[width,height,opacity] duration-200"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={trailRef}
        aria-hidden
        className="fixed w-10 h-10 border border-[rgba(255,27,27,0.4)] rounded-full pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
