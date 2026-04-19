import React from 'react';
import Reveal from './Reveal';

const FinalCTA: React.FC = () => {
  return (
    <section
      id="cta-final"
      className="py-24 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #5a0000 0%, #8B0000 40%, #FF1B1B 100%)' }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-[1]">
        <Reveal>
          <h2
            className="font-['Playfair_Display'] text-white mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
          >
            Your Business Has Potential.
            <br />
            Let's Make It Undeniable.
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <p className="text-white/75 text-lg max-w-[600px] mx-auto mb-10">
            Whether you're a local vendor, a growing D2C brand, or a business tired of being invisible —
            Prothsahan is built for you.
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-[14px] bg-white text-black rounded-full text-[15px] font-bold no-underline hover:scale-[1.04] hover:bg-[#f0f0f0] transition-all duration-200 cursor-none"
            >
              Book a Free Growth Call
            </a>
            <a
              href="mailto:prothsahan.counsulting@gmail.com"
              className="inline-flex items-center px-8 py-[14px] bg-transparent text-white border-2 border-white/40 rounded-full text-[15px] font-medium no-underline hover:border-white/70 hover:bg-white/10 transition-all duration-200 cursor-none"
            >
              Email Us Directly
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
