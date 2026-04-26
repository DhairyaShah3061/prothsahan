import React from 'react';
import Reveal from './Reveal';

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 8s-4-5-10-5S2 8 2 8s4 5 10 5 10-5 10-5z"/><circle cx="12" cy="8" r="3"/>
      </svg>
    ),
    title: 'Ad Strategy & Execution',
    desc: 'Meta, Instagram, and Google ad campaigns built to convert, not just reach. Tracked, tested, optimized.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    title: 'Brand Positioning',
    desc: "We find your brand's unfair advantage and make sure the market knows it — clearly and consistently.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    title: 'Funnel Optimization',
    desc: 'Map every touchpoint. Fix every leak. Build journeys that guide strangers into paying customers.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Creative & Messaging',
    desc: 'Copy, creatives, and hooks that actually stop the scroll — backed by psychology, not guesswork.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: 'Performance Analytics',
    desc: 'Real-time dashboards. Weekly reports. Decisions made from data, not gut feelings.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Branding & UI/UX',
    desc: 'Visual identity and interface design that builds trust before a word is read.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              SERVICES
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Everything You Need to Scale.
              <br />
              Nothing You Don't.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:[grid-auto-rows:1fr] gap-6 mt-14">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={((i % 3) + 1) as 0|1|2|3|4|5} className="h-full">
              <div className="group h-full min-h-[280px] bg-white/5 backdrop-blur-md border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden hover:border-[rgba(255,27,27,0.25)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1B1B] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 mb-5 bg-[rgba(255,27,27,0.1)] rounded-xl flex items-center justify-center text-[#FF1B1B]">
                  {service.icon}
                </div>
                <h3 className="font-['Playfair_Display'] text-lg mb-3">{service.title}</h3>
                <p className="text-sm text-[#A8A8A8] leading-[1.7]">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-12 flex justify-center">
          <a
            href="/services"
            className="inline-flex items-center px-8 py-[14px] bg-[#FF1B1B] text-white rounded-full text-[15px] font-medium no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] hover:shadow-[0_0_30px_rgba(255,27,27,0.6)] cursor-none"
          >
            Explore More
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
