import React from 'react';
import Reveal from './Reveal';
import GeometricBlurMesh from './ui/geometric-blur-mesh';

const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-[#050505] text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <GeometricBlurMesh className="h-full w-full" />
      </div>

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