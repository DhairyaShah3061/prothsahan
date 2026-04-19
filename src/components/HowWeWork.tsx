import React from 'react';
import Reveal from './Reveal';

const steps = [
  { num: '01', title: 'Diagnose', desc: 'We audit your current positioning, messaging, ads, and funnel to find exactly where you\'re losing people.' },
  { num: '02', title: 'Strategize', desc: 'We build a custom growth blueprint — messaging framework, channel mix, funnel architecture, and 90-day roadmap.' },
  { num: '03', title: 'Execute', desc: 'We run campaigns, produce creatives, and deploy the strategy with speed and precision.' },
  { num: '04', title: 'Optimize', desc: "We track everything, cut what doesn't work, double down on what does. Every week." },
  { num: '05', title: 'Scale', desc: 'Once the system is proven, we scale it. More reach, more revenue, more brand equity.' },
];

const HowWeWork: React.FC = () => {
  return (
    <section id="how-we-work" className="py-24 bg-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              OUR PROCESS
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              From Invisible to Unavoidable.
              <br />
              Here's How.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col md:flex-row gap-0 mt-16 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-7 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[rgba(255,27,27,0.3)] to-transparent" />

          {steps.map((step, i) => (
            <Reveal key={step.num} delay={(i + 1) as 0|1|2|3|4|5} className="flex-1 text-center px-4 py-0 relative mb-8 md:mb-0">
              <div className="w-14 h-14 rounded-full border-2 border-[rgba(255,27,27,0.4)] flex items-center justify-center mx-auto mb-6 bg-black relative z-[1] hover:bg-[rgba(255,27,27,0.1)] hover:border-[#FF1B1B] transition-all duration-300">
                <span className="font-['JetBrains_Mono'] text-[13px] text-[#FF1B1B]">{step.num}</span>
              </div>
              <h3 className="font-['Playfair_Display'] text-lg mb-3">{step.title}</h3>
              <p className="text-sm text-[#A8A8A8] leading-[1.7]">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
