import React from 'react';
import Reveal from './Reveal';
import { DitheringShader } from './ui/dithering-shader';

const points = [
  "We're obsessed with revenue, not reach.",
  "We combine the logic of a data analyst with the instinct of a storyteller.",
  "We understand regional markets — Anand, Gujarat, and beyond.",
  "We work like co-founders, not contractors.",
  "We only grow when you actually grow.",
];

const tiles = [
  { num: 'Revenue', desc: 'The only metric we care about' },
  { num: 'Strategy', desc: 'Data-backed blueprints' },
  { num: 'Story', desc: 'Psychology-driven messaging' },
];

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
        <DitheringShader
          shape="wave"
          type="8x8"
          colorBack="#02030a"
          colorFront="#ff1b1b"
          pxSize={2}
          speed={0.8}
          className="h-full w-full"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,27,27,0.26), transparent 52%), linear-gradient(180deg, rgba(0,0,0,0.62), rgba(0,0,0,0.86))',
        }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                WHY US
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                We're Not an Agency.
                <br />
                We're Your Growth Partner.
              </h2>
            </Reveal>

            <ul className="list-none mt-9 mb-8 flex flex-col gap-4">
              {points.map((point, i) => (
                <Reveal key={point} delay={(i + 2) as 0|1|2|3|4|5}>
                  <li className="flex items-start gap-3 text-[16px] text-[#A8A8A8] leading-[1.6]">
                    <span className="text-[#FF1B1B] flex-shrink-0 mt-[2px]">→</span>
                    {point}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={5}>
              <p className="text-[15px] text-[#6B6B6B] italic border-l-2 border-[#FF1B1B] pl-4 leading-[1.8]">
                While most agencies give you reports, we give you results. While they track impressions, we
                track income.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="hidden md:grid grid-cols-2 gap-4">
            {tiles.map((tile, i) => (
              <div
                key={tile.num}
                className={`bg-white/5 border border-white/[0.06] rounded-2xl p-7 text-center hover:border-[rgba(255,27,27,0.3)] transition-colors duration-300 ${i === 0 ? 'col-span-2' : ''}`}
              >
                <span className="font-['Playfair_Display'] text-[36px] font-black text-white block mb-1">
                  {tile.num}
                </span>
                <p className="text-[13px] text-[#6B6B6B]">{tile.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
