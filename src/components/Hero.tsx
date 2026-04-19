import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,#1a0000_0%,#000000_60%)] z-0" />

      {/* Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,0,0.5) 0%, rgba(255,27,27,0.15) 40%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center max-w-[900px] px-6">
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

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[3] text-[#6B6B6B]"
        style={{ animation: 'bounce 2s ease-in-out infinite' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
