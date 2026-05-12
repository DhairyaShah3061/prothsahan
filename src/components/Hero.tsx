import React from 'react';
import { InteractiveGradientBackground } from '@/components/ui/interactive-gradient-background';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden p-0">
      <InteractiveGradientBackground
        className="min-h-screen"
        dark
        intensity={0.85}
        initialOffset={{ x: -80, y: 0 }}
      >
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="relative z-[4] text-center max-w-[900px] px-6">
        <h1
          className="text-[#F5F5F5] mb-6 font-['Playfair_Display'] font-black leading-[1.15]"
          style={{
            fontSize: 'clamp(44px, 8vw, 92px)',
            textShadow: '0 0 60px rgba(255,27,27,0.2)',
            animation: 'fadeUp 0.8s ease 0.15s forwards',
            opacity: 0,
          }}
        >
          We Don't Build Brands.
          <br />
          <em className="text-[#FF1B1B] not-italic">We Build Legacies.</em>
        </h1>

        <p
          className="text-[#A8A8A8] mb-10"
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            animation: 'fadeUp 0.8s ease 0.3s forwards',
            opacity: 0,
          }}
        >
          Growth-first marketing for businesses that are done being invisible.
        </p>

        <div
          className="flex gap-4 justify-center flex-wrap mb-14"
          style={{ animation: 'fadeUp 0.8s ease 0.45s forwards', opacity: 0 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-[14px] bg-[#FF1B1B] text-white rounded-full text-[15px] font-medium no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] cursor-none"
          >
            Start Growing
          </a>
          <a
            href="#case-study"
            className="inline-flex items-center px-8 py-[14px] bg-transparent text-[#F5F5F5] border-2 border-white/30 rounded-full text-[15px] font-medium no-underline hover:border-white/70 hover:bg-white/5 transition-all duration-200 cursor-none"
          >
            See Our Work
          </a>
        </div>

        <div
          className="flex gap-8 justify-center flex-wrap"
          style={{ animation: 'fadeUp 0.8s ease 0.6s forwards', opacity: 0 }}
        >
          {['50+ Brands Accelerated', '3x Avg. ROI Delivered', 'Based in Anand, Built for India'].map(
            (item) => (
              <span key={item} className="font-['JetBrains_Mono'] text-xs text-[#6B6B6B] tracking-[0.5px] flex items-center gap-2">
                <span className="text-[#FF1B1B] text-[8px]">●</span>
                {item}
              </span>
            )
          )}
        </div>
      </div>
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[4] text-[#6B6B6B]"
          style={{ animation: 'bounce 2s ease-in-out infinite' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(8px); }
          }
        `}</style>
        </div>
      </InteractiveGradientBackground>
    </section>
  );
};

export default Hero;
