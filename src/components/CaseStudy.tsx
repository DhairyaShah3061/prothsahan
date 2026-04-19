import React from 'react';
import Reveal from './Reveal';

const CaseStudy: React.FC = () => {
  return (
    <section id="case-study" className="py-24 bg-black">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              OUR WORK
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Real Brands. Real Growth.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={2} className="mt-14">
          <div className="bg-[#1A1A1A] border border-[rgba(255,27,27,0.2)] rounded-2xl p-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-center relative overflow-hidden">
            {/* Left accent bar */}
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#FF1B1B] to-transparent" />

            <div>
              <span className="inline-block font-['JetBrains_Mono'] text-[11px] tracking-[2px] text-[#FF1B1B] border border-[rgba(255,27,27,0.3)] px-3 py-1 rounded mb-4">
                CASE STUDY — D2C BRAND
              </span>
              <h3 className="font-['Playfair_Display'] text-2xl mb-4">
                From Zero to Market-Ready in 60 Days
              </h3>

              <div className="flex flex-col gap-3 my-5">
                {[
                  { label: 'Challenge', val: 'No digital presence, unclear positioning, and zero paid media history' },
                  { label: 'Solution', val: 'Full brand audit, messaging overhaul, and targeted Meta + Instagram campaign build' },
                  { label: 'Timeline', val: '60-day sprint with weekly optimization cycles' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#6B6B6B] min-w-[80px] mt-[2px]">
                      {row.label}
                    </span>
                    <span className="text-sm text-[#A8A8A8]">{row.val}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center px-8 py-[14px] bg-transparent text-[#F5F5F5] border-2 border-white/30 rounded-full text-sm font-medium no-underline hover:border-white/70 hover:bg-white/5 transition-all duration-200 mt-3 cursor-none"
              >
                Work With Us →
              </a>
            </div>

            <div className="text-center bg-[rgba(255,27,27,0.08)] border border-[rgba(255,27,27,0.2)] rounded-2xl p-9">
              <span
                className="font-['Playfair_Display'] font-black text-[#FF1B1B] block"
                style={{ fontSize: 56, textShadow: '0 0 30px rgba(255,27,27,0.4)' }}
              >
                2.4x
              </span>
              <div className="text-[13px] text-[#6B6B6B] mt-2">
                ROAS achieved
                <br />
                within 60 days
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={3} className="mt-12 text-center">
          <p className="font-['Playfair_Display'] text-2xl text-[#A8A8A8] mb-6 italic">
            Want to be our next success story?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-[14px] bg-[#FF1B1B] text-white rounded-full text-[15px] font-medium no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4)] cursor-none"
          >
            Let's Talk
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default CaseStudy;
