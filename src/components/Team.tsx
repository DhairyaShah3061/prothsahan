import React from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import { ProgressiveBlur } from './ui/progressive-blur';
import dhairyaPhoto from '../../dhairya.png';

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ChainIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 5"/>
    <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L14 19"/>
  </svg>
);

const members = [
  {
    name: 'Dhairya Shah',
    role: 'Founder',
    bio: 'Business strategist and digital growth architect. Combines statistical thinking with creative storytelling to build brands that actually convert.',
    photo: dhairyaPhoto,
    linkedin: 'https://www.linkedin.com/in/-dhairya-shah/',
    portfolio: 'https://dhairya-shah-portfolio.netlify.app/',
  },
  {
    name: 'Hitarth Thakkar',
    role: 'Co-Founder',
    bio: "Creative force behind Prothsahan's campaigns. Turns complex business problems into simple, powerful messaging that sticks.",
    linkedin: 'https://www.linkedin.com/in/hitarth-thakkar2510/',
    portfolio: '',
  },
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-black">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <Reveal>
            <span className="font-['JetBrains_Mono'] text-xs tracking-[3px] uppercase text-[#FF1B1B] mb-4 block">
              THE TEAM
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-['Playfair_Display']" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Built by Strategists.
              <br />
              Run by Obsessives.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1160px] mx-auto mt-16">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={(i + 2) as 0 | 1 | 2 | 3 | 4 | 5}>
              <motion.article
                className="group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-black shadow-[0_26px_70px_rgba(0,0,0,0.35)]"
                style={{ minHeight: '720px' }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="relative h-full min-h-[720px] bg-[#050505]">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,27,27,0.22),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(255,27,27,0.12),transparent_30%),linear-gradient(180deg,#111 0%,#050505 100%)]" />
                  )}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.94)_100%)]" />
                  <ProgressiveBlur
                    className="pointer-events-none absolute bottom-0 left-0 h-[48%] w-full opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
                    blurIntensity={0.55}
                    blurLayers={9}
                  />

                  <div className="absolute inset-0 flex items-end p-7 sm:p-9 lg:p-10">
                    <motion.div
                      className="w-full max-w-[520px] opacity-100 translate-y-0 md:opacity-0 md:translate-y-6 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span
                          className="rounded-full border border-[rgba(255,27,27,0.45)] bg-transparent px-4 py-2 font-['JetBrains_Mono'] text-[11px] tracking-[2px] uppercase text-[#FF1B1B]"
                        >
                          {member.role}
                        </span>
                      </div>

                      <h3 className="font-['Playfair_Display'] text-[32px] sm:text-[38px] leading-none mb-3 text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#E8E8E8] leading-[1.7] max-w-[400px] mb-6">
                        {member.bio}
                      </p>

                      <div className="flex gap-3">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener"
                          aria-label="LinkedIn"
                          className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center transition-colors no-underline cursor-none bg-transparent text-[#EAEAEA] hover:border-[#FF1B1B] hover:text-[#FF1B1B]"
                        >
                          <LinkedInIcon />
                        </a>
                        {member.portfolio ? (
                          <a
                            href={member.portfolio}
                            target="_blank"
                            rel="noopener"
                            aria-label="Portfolio"
                            className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#EAEAEA] hover:border-[#FF1B1B] hover:text-[#FF1B1B] transition-colors no-underline cursor-none bg-transparent"
                          >
                            <ChainIcon />
                          </a>
                        ) : (
                          <span
                            aria-label="Portfolio coming soon"
                            title="Portfolio coming soon"
                            className="w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-white/40 bg-transparent"
                          >
                            <ChainIcon />
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
