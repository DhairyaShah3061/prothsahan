'use client';

import { useEffect, useRef } from 'react';

type InteractiveGradientBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
  intensity?: number;
  interactive?: boolean;
  initialOffset?: { x?: number; y?: number };
  dark?: boolean;
};

export default function InteractiveGradientBackground({
  className = '',
  children,
  intensity = 1,
  interactive = true,
  initialOffset,
  dark = false,
}: InteractiveGradientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<PointerEvent | Touch | null>(null);

  const schedule = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const host = ref.current;
      const ev = pendingRef.current;
      if (!host || !ev) return;
      const rect = host.getBoundingClientRect();
      const px = ('clientX' in ev ? ev.clientX : 0) - rect.left - rect.width / 2;
      const py = ('clientY' in ev ? ev.clientY : 0) - rect.top - rect.height / 2;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const k = prefersReduced ? 0.1 : intensity;

      host.style.setProperty('--posX', String(px * k));
      host.style.setProperty('--posY', String(py * k));
    });
  };

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    host.style.setProperty('--posX', String(initialOffset?.x ?? 0));
    host.style.setProperty('--posY', String(initialOffset?.y ?? 0));

    if (!interactive) return;

    const onPointer = (e: PointerEvent) => {
      pendingRef.current = e;
      schedule();
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches.length) return;
      pendingRef.current = e.touches[0];
      schedule();
    };
    const reset = () => {
      host.style.setProperty('--posX', '0');
      host.style.setProperty('--posY', '0');
    };

    host.addEventListener('pointermove', onPointer, { passive: true });
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('pointerleave', reset);
    host.addEventListener('touchend', reset);
    host.addEventListener('touchcancel', reset);

    return () => {
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('pointerleave', reset);
      host.removeEventListener('touchend', reset);
      host.removeEventListener('touchcancel', reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive, intensity, initialOffset?.x, initialOffset?.y]);

  return (
    <div
      ref={ref}
      aria-label="Interactive gradient background"
      role="img"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        '--posX': '0',
        '--posY': '0',
      } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0 : 1,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(255 231 234), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(255 255 255), rgb(34 0 0)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(255 36 36), rgb(21 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(122 0 0), rgb(0 10 255)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(255 93 93), rgb(0 200 255)),
            linear-gradient(60deg, rgb(126 0 0), rgb(45 0 0))
          `,
          backgroundBlendMode: 'overlay, overlay, difference, difference, difference, normal',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 1 : 0,
          transition: 'opacity 0.5s ease',
          background: `
            linear-gradient(115deg, rgb(18 0 0), rgb(0 0 0)),
            radial-gradient(90% 100% at calc(50% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(92 0 0), rgb(10 0 25)),
            radial-gradient(100% 100% at calc(80% - var(--posX)*1px) calc(0% - var(--posY)*1px), rgb(158 0 0), rgb(15 0 0)),
            radial-gradient(150% 210% at calc(100% + var(--posX)*1px) calc(0% + var(--posY)*1px), rgb(84 0 0), rgb(0 5 120)),
            radial-gradient(100% 100% at calc(100% - var(--posX)*1px) calc(30% - var(--posY)*1px), rgb(183 28 28), rgb(0 100 140)),
            linear-gradient(60deg, rgb(127 29 29), rgb(45 0 0))
          `,
          backgroundBlendMode: 'overlay, overlay, difference, difference, difference, normal',
        }}
      />

      {children ? <div style={{ position: 'relative', zIndex: 1 }}>{children}</div> : null}
    </div>
  );
}

export { InteractiveGradientBackground };