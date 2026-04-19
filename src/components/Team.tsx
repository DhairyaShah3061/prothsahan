import React from 'react';
import Reveal from './Reveal';

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const members = [
  {
    initial: 'D',
    name: 'Dhairya Shah',
    role: 'Founder',
    bio: 'Business strategist and digital growth architect. Combines statistical thinking with creative storytelling to build brands that actually convert.',
    linkedin: 'https://www.linkedin.com/company/prothasahan/?viewAsMember=true',
    instagram: 'https://www.instagram.com/prothsahan.co/',
  },
  {
    initial: 'H',
    name: 'Hitarth Thakkar',
    role: 'Co-Founder',
    bio: "Creative force behind Prothsahan's campaigns. Turns complex business problems into simple, powerful messaging that sticks.",
    linkedin: 'https://www.linkedin.com/company/prothasahan/?viewAsMember=true',
    instagram: 'https://www.instagram.com/prothsahan.co/',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[760px] mx-auto mt-14">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={(i + 2) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className="bg-white/5 backdrop-blur-md border border-white/[0.06] rounded-2xl p-9 text-center hover:border-[rgba(255,27,27,0.3)] hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center font-['Playfair_Display'] text-[28px] font-black text-white border-2 border-[rgba(255,27,27,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #3d0000, #FF1B1B)' }}
                >
                  {member.initial}
                </div>
                <div className="font-['Playfair_Display'] text-[22px] mb-1">{member.name}</div>
                <div className="font-['JetBrains_Mono'] text-[11px] tracking-[2px] text-[#FF1B1B] uppercase mb-4">
                  {member.role}
                </div>
                <p className="text-sm text-[#A8A8A8] leading-[1.7] mb-5">{member.bio}</p>
                <div className="flex gap-3 justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center text-[#6B6B6B] hover:border-[#FF1B1B] hover:text-[#FF1B1B] transition-colors no-underline cursor-none"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center text-[#6B6B6B] hover:border-[#FF1B1B] hover:text-[#FF1B1B] transition-colors no-underline cursor-none"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
