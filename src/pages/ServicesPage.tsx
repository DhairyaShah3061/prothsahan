import React from 'react';
import logo from '../assets/prothsahan_logo_web.png';
import Reveal from '../components/Reveal';
import CustomCursor from '../components/CustomCursor';
import Footer from '../components/Footer';

type ServiceExperience = {
  title: string;
  tag: string;
  hook: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  investment: string;
  metric: string;
};

const coreServices: ServiceExperience[] = [
  {
    title: 'Ad Strategy & Execution',
    tag: 'Paid Growth Engine',
    hook: 'You need campaigns that translate spend into repeatable revenue, not random spikes.',
    summary: 'We build and run performance campaigns across Meta, Instagram, and Google with a weekly optimization cadence. The focus stays on profitable customer acquisition, not vanity click-through numbers.',
    outcomes: ['Stronger cost efficiency by audience and creative pairing', 'Clear testing rhythm with faster winner identification', 'Channel-level budget model for controlled scale'],
    deliverables: ['Audience architecture and campaign map', 'Creative brief and iteration library', 'Weekly optimization log + strategic decision sheet'],
    timeline: 'Ideal engagement: 8 to 16 weeks',
    investment: 'Best for brands spending monthly on ads and ready to scale with discipline.',
    metric: 'ROI Focus',
  },
  {
    title: 'Brand Positioning',
    tag: 'Market Differentiation',
    hook: 'If your message sounds generic, your offers feel optional. Positioning fixes that.',
    summary: 'We clarify what your brand should be known for and how it should be communicated across channels. Your positioning becomes a practical operating system for sales pages, ad copy, and founder communication.',
    outcomes: ['Clear category language your market understands instantly', 'Stronger trust and recall through consistency', 'More persuasive offer framing across every touchpoint'],
    deliverables: ['Positioning statement and value narrative', 'Messaging hierarchy from headline to proof', 'Competitor language map and differentiation angles'],
    timeline: 'Ideal engagement: 3 to 5 weeks',
    investment: 'Best for businesses that have traction but unclear brand perception.',
    metric: 'Clarity First',
  },
  {
    title: 'Funnel Optimization',
    tag: 'Conversion Systems',
    hook: 'Most brands do not have a traffic problem. They have a conversion leak problem.',
    summary: 'We map your entire customer journey from first click to final purchase and identify where intent is being lost. Then we redesign critical moments in the funnel so each stage moves users forward with less friction.',
    outcomes: ['Lower drop-off between landing and checkout', 'Improved lead quality from better intent routing', 'Cleaner handoff between marketing and sales conversations'],
    deliverables: ['Journey map with leak diagnosis', 'Landing page and checkout recommendations', 'A/B testing backlog prioritized by impact'],
    timeline: 'Ideal engagement: 6 to 10 weeks',
    investment: 'Best for teams driving traffic already but underperforming on conversion.',
    metric: 'Higher CVR',
  },
  {
    title: 'Creative & Messaging',
    tag: 'Attention Architecture',
    hook: 'Creative is not decoration. It is your first and most repeated sales conversation.',
    summary: 'We design message angles and creative systems for launch cycles, always-on ads, and founder-led storytelling. Every piece is built to stop the scroll and lead the audience to the next action.',
    outcomes: ['More consistent creative performance across campaigns', 'Stronger hooks built from audience tensions', 'Clear objection-handling messaging inside content'],
    deliverables: ['Hook bank and campaign angle matrix', 'Copy frameworks for ads, LPs, and retargeting', 'Creative direction for static, UGC, and short-form formats'],
    timeline: 'Ideal engagement: 4 to 12 weeks',
    investment: 'Best for brands facing creative fatigue or weak ad-to-page message match.',
    metric: 'More Attention',
  },
  {
    title: 'Performance Analytics',
    tag: 'Decision Intelligence',
    hook: 'Data should reduce confusion, not create more dashboards and less action.',
    summary: 'We build a reporting layer that highlights what actually matters: CAC, conversion, retention signals, and margin movement. Teams get clear priorities instead of drowning in metrics with no narrative.',
    outcomes: ['Faster decision cycles in weekly reviews', 'Confidence in channel and funnel priorities', 'Shared visibility between founders, marketing, and sales'],
    deliverables: ['Tracking and attribution health audit', 'KPI dashboard aligned to business goals', 'Weekly insights report with action recommendations'],
    timeline: 'Ideal engagement: 4 to 8 weeks',
    investment: 'Best for teams making decisions from fragmented or unreliable data.',
    metric: 'Data-Led',
  },
  {
    title: 'Branding & UI/UX',
    tag: 'Trust by Design',
    hook: 'Your design language should signal credibility before users read a single sentence.',
    summary: 'We refine brand identity and digital interfaces so your business looks premium, coherent, and conversion-ready. The result is a visual experience that supports your strategy and amplifies trust.',
    outcomes: ['Higher perceived value at first glance', 'Stronger mobile usability and readability', 'Brand consistency across acquisition and conversion assets'],
    deliverables: ['Identity refinement and systemized style rules', 'High-intent landing page and section design', 'UX improvement recommendations for key journeys'],
    timeline: 'Ideal engagement: 5 to 12 weeks',
    investment: 'Best for founders rebranding or scaling into a more premium market position.',
    metric: 'Trust Lift',
  },
];

const processSteps = [
  {
    id: '01',
    title: 'Deep Audit',
    desc: 'We map your brand, offers, ad account, and funnel to identify hidden growth blockers.',
  },
  {
    id: '02',
    title: 'Growth Blueprint',
    desc: 'You get a practical strategy: channel priorities, messaging angles, and weekly milestones.',
  },
  {
    id: '03',
    title: 'Build + Launch',
    desc: 'We execute campaigns, creatives, and pages with tight feedback cycles from day one.',
  },
  {
    id: '04',
    title: 'Scale Systematically',
    desc: 'Winning experiments are scaled with clear controls on CAC, margin, and cash-flow risk.',
  },
];

const faqs = [
  {
    q: 'Do you work with local businesses and D2C brands?',
    a: 'Yes. We work with both high-potential local businesses and growth-stage D2C brands that want predictable lead or revenue growth.',
  },
  {
    q: 'How soon can we start seeing movement?',
    a: 'Most clients see meaningful signal improvements in 2 to 4 weeks, while compounding growth usually becomes clearer over 6 to 12 weeks.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Absolutely. We can plug into your existing team, define a clean execution rhythm, and handle strategy + performance oversight.',
  },
  {
    q: 'What makes your approach different?',
    a: 'We combine positioning, performance, and funnel execution in one system, so channels do not operate in silos.',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-black text-[#F5F5F5] font-['DM_Sans'] overflow-x-hidden cursor-none">
      <CustomCursor />

      <header className="fixed top-0 left-0 right-0 z-[1000] bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a href="/" className="inline-flex items-center no-underline cursor-none" aria-label="Back to Home">
            <img src={logo} alt="Prothsahan" className="h-10 w-auto sm:h-12 object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-[#A8A8A8] no-underline hover:text-white transition-colors cursor-none">Home</a>
            <a href="#services-grid" className="text-sm text-white no-underline transition-colors cursor-none">What We Offer</a>
            <a href="#process" className="text-sm text-[#A8A8A8] no-underline hover:text-white transition-colors cursor-none">Process</a>
            <a href="#faq" className="text-sm text-[#A8A8A8] no-underline hover:text-white transition-colors cursor-none">FAQ</a>
          </nav>
          <a
            href="/#contact"
            className="inline-flex items-center px-6 py-[11px] text-sm font-medium text-white bg-[#FF1B1B] rounded-full no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] hover:shadow-[0_0_30px_rgba(255,27,27,0.6)] cursor-none"
          >
            Book a Strategy Call
          </a>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,#1b0000_0%,#000_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(120deg,transparent_0%,rgba(255,27,27,0.22)_35%,transparent_70%)] animate-[sheen_8s_linear_infinite]" />

        <div className="relative z-10 max-w-[1200px] mx-auto w-full">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-5 block">
              SERVICES PAGE
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-['Playfair_Display'] leading-[1.1] max-w-[900px]" style={{ fontSize: 'clamp(38px, 8vw, 84px)' }}>
              Services Built to
              <span className="text-[#FF1B1B]"> Grow Revenue,</span>
              <br />
              Not Just Vanity Metrics.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 text-[#A8A8A8] text-base sm:text-lg leading-[1.85] max-w-[760px]">
              You already know marketing noise is everywhere. Our job is to build a focused growth system
              that combines strategy, creative, ads, and funnel execution so your brand scales with confidence.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services-grid"
                className="inline-flex items-center px-8 py-[14px] bg-[#FF1B1B] text-white rounded-full text-[15px] font-medium no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] cursor-none"
              >
                Explore Services
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center px-8 py-[14px] bg-transparent text-[#F5F5F5] border-2 border-white/25 rounded-full text-[15px] font-medium no-underline hover:border-white/70 hover:bg-white/5 transition-all duration-200 cursor-none"
              >
                Discuss Your Growth Goals
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services-grid" className="py-24 bg-[#030303]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <Reveal>
              <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                CORE OFFERINGS
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Full-Stack Growth Services
              </h2>
            </Reveal>
          </div>

          <div className="space-y-12">
            {coreServices.map((service, i) => (
              <Reveal key={service.title} delay={((i % 4) + 1) as 0 | 1 | 2 | 3 | 4 | 5}>
                <article className="min-h-[76vh] bg-[linear-gradient(145deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.35)_100%)] border border-white/10 rounded-3xl p-7 sm:p-10 lg:p-12 relative overflow-hidden group hover:border-[rgba(255,27,27,0.35)] transition-all duration-300">
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_85%_15%,rgba(255,27,27,0.18),transparent_45%)]" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 h-full items-start">
                    <div>
                      <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B] mb-3">
                        {service.metric}
                      </p>
                      <h3 className="font-['Playfair_Display'] leading-[1.1] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}>
                        {service.title}
                      </h3>
                      <p className="font-['JetBrains_Mono'] text-[12px] tracking-[2px] uppercase text-[#B35C5C] mb-6">
                        {service.tag}
                      </p>

                      <p className="text-[#F0D9D9] text-base sm:text-lg leading-[1.8] mb-5 max-w-[760px]">{service.hook}</p>
                      <p className="text-[#B8B8B8] leading-[1.9] max-w-[760px]">{service.summary}</p>

                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                          <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B] mb-2">Execution Window</p>
                          <p className="text-sm text-[#C6C6C6] leading-[1.8]">{service.timeline}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                          <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B] mb-2">Who This Fits</p>
                          <p className="text-sm text-[#C6C6C6] leading-[1.8]">{service.investment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                        <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B] mb-4">Expected Outcomes</p>
                        <ul className="space-y-3 text-sm text-[#B8B8B8]">
                          {service.outcomes.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 leading-[1.75]">
                              <span className="text-[#FF1B1B] mt-[1px]">●</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                        <p className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B] mb-4">What You Receive</p>
                        <ul className="space-y-3 text-sm text-[#B8B8B8]">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 leading-[1.75]">
                              <span className="text-[#FF1B1B] mt-[1px]">●</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 bg-black border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <Reveal>
                <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                  HOW WE WORK
                </span>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="font-['Playfair_Display'] leading-[1.1]" style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}>
                  A Process Built for
                  <br />
                  Speed and Precision.
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="text-[#A8A8A8] leading-[1.85] mt-6 max-w-[430px]">
                  We run lean, measurable, and decisive. Every phase has deliverables, ownership, and clear outcomes.
                </p>
              </Reveal>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.id} delay={((i + 1) % 6) as 0 | 1 | 2 | 3 | 4 | 5}>
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-7 flex gap-5 items-start hover:border-[rgba(255,27,27,0.35)] transition-colors duration-200">
                    <span className="font-['JetBrains_Mono'] text-xs tracking-[2px] text-[#FF1B1B] pt-1 min-w-9">{step.id}</span>
                    <div>
                      <h3 className="font-['Playfair_Display'] text-2xl mb-2">{step.title}</h3>
                      <p className="text-[#A8A8A8] text-sm leading-[1.8]">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-[#030303]">
        <div className="max-w-[1000px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
                FREQUENTLY ASKED
              </span>
              <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(30px, 5vw, 50px)' }}>
                Questions Before You Commit
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={((i + 1) % 6) as 0 | 1 | 2 | 3 | 4 | 5}>
                <article className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-[rgba(255,27,27,0.32)] transition-colors duration-200">
                  <h3 className="font-['Playfair_Display'] text-[25px] leading-tight mb-2">{item.q}</h3>
                  <p className="text-[#A8A8A8] text-sm leading-[1.8]">{item.a}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-24 px-6 border-y border-[rgba(255,27,27,0.2)] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #5a0000 0%, #8B0000 40%, #FF1B1B 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          }}
        />
        <Reveal>
          <div className="max-w-[1000px] mx-auto text-center relative z-[1]">
            <h2 className="font-['Playfair_Display'] mb-4" style={{ fontSize: 'clamp(30px, 5vw, 54px)' }}>
              Ready to Build Your Next Growth Phase?
            </h2>
            <p className="text-[#E0E0E0] leading-[1.8] max-w-[700px] mx-auto mb-8 text-sm sm:text-base">
              If you want more than random marketing activity, we should talk. We will map a growth path you can actually execute.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center px-8 py-[14px] bg-[#FF1B1B] text-white rounded-full text-[15px] font-medium no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] cursor-none"
              >
                Start a Conversation
              </a>
              <a
                href="mailto:prothsahan.counsulting@gmail.com"
                className="inline-flex items-center px-8 py-[14px] bg-transparent text-[#F5F5F5] border-2 border-white/30 rounded-full text-[15px] font-medium no-underline hover:border-white/70 hover:bg-white/5 transition-all duration-200 cursor-none"
              >
                Email Us Directly
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        @keyframes sheen {
          0% { transform: translateX(-18%); }
          100% { transform: translateX(18%); }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
