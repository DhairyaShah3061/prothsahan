import React, { useMemo } from 'react';

export const CONFIG = {
  primaryColor: '127, 29, 29',
  secondaryColor: '185, 28, 28',
  sphereRotationDuration: '240s',
  gridPanDuration: '180s',
  coreGlowDuration: '25s',
  wireframeOpacity: 0.62,
  wireframeShadowIntensity: 60,
  coreBlur: 170,
  sphereDensity: 12,
};

export default function SphereHero() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const hazeRef = React.useRef<HTMLDivElement | null>(null);
  const coreRef = React.useRef<HTMLDivElement | null>(null);

  const sphereRings = useMemo(
    () =>
      Array.from({ length: CONFIG.sphereDensity }, (_, i) => {
        const step = 90 / (CONFIG.sphereDensity / 2);
        const angle = i * step;
        return (
          <div
            key={`ring-${i}`}
            className="geo-wireframe-line"
            style={{ transform: i % 2 === 0 ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)` }}
            aria-hidden="true"
          />
        );
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div ref={gridRef} className="absolute inset-0 geo-panning-grid" aria-hidden="true" />
      <div ref={hazeRef} className="absolute inset-0 geo-haze" aria-hidden="true" />

      <div className="absolute inset-0 geo-deep-base" aria-hidden="true">
        <div ref={coreRef} className="geo-core-light absolute left-1/2 top-1/2 rounded-full" aria-hidden="true" />
      </div>

      <div className="absolute left-1/2 top-1/2 geo-sphere-container -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div className="geo-sphere-rotation">
          {sphereRings}
        </div>
      </div>

      <div className="absolute inset-0 geo-bloom" aria-hidden="true" />
      <div className="absolute inset-0 geo-vignette" aria-hidden="true" />
    </div>
  );
}
