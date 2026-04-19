import React from 'react';
import Reveal from './Reveal';

const testimonials = [
  {
    text: 'Prothsahan completely changed how we talk about our business. Our sales inquiry rate tripled in the first month after they revamped our messaging and ad creatives.',
    name: 'Rajesh Patel',
    biz: 'Retail Business, Anand',
  },
  {
    text: "These guys don't just run ads — they understand your entire business. The growth blueprint they gave us became our operating manual for the next quarter.",
    name: 'Priya Mehta',
    biz: 'D2C Brand, Gujarat',
  },
  {
    text: 'I was skeptical at first, but the results proved everything. They delivered measurable revenue growth, not just reach. That\'s the difference with Prothsahan.',
    name: 'Karan Shah',
    biz: 'Local Vendor, Vadodara',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              WHAT CLIENTS SAY
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Don't Take Our Word for It.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i + 1) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className="bg-white/5 backdrop-blur-md border border-white/[0.06] rounded-2xl p-8 relative hover:border-[rgba(255,27,27,0.25)] hover:-translate-y-1 transition-all duration-300">
                <div className="text-[#FF1B1B] text-xs tracking-widest mb-3">★★★★★</div>
                <span
                  className="font-['Playfair_Display'] text-[64px] text-[#FF1B1B] leading-[0.6] mb-4 block opacity-70"
                >
                  "
                </span>
                <p className="text-[15px] text-[#A8A8A8] leading-[1.8] mb-6 italic">{t.text}</p>
                <div className="font-semibold text-sm text-[#F5F5F5]">{t.name}</div>
                <div className="font-['JetBrains_Mono'] text-[13px] text-[#6B6B6B] mt-0.5">{t.biz}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
