import React from 'react';
import logo from '../assets/prothsahan_logo_web.png';

const Footer: React.FC = () => {
  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '/#/services', label: 'Services' },
    { href: '#case-study', label: 'Our Work' },
    { href: '#team', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const serviceLinks = [
    'Ad Strategy',
    'Brand Positioning',
    'Funnel Optimization',
    'Creative & Messaging',
    'Performance Analytics',
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Prothsahan"
              className="h-14 w-auto mb-3 object-contain"
            />
            <p className="text-sm text-[#6B6B6B] leading-[1.6] mb-3">
              We don't build brands. We build legacies.
            </p>
            <p className="font-['JetBrains_Mono'] text-xs text-[#6B6B6B]">📍 Anand, Gujarat, India</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[2px] uppercase text-[#6B6B6B] mb-5">
              Navigation
            </h4>
            <ul className="list-none flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#555] no-underline hover:text-[#F5F5F5] transition-colors cursor-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[2px] uppercase text-[#6B6B6B] mb-5">
              Services
            </h4>
            <ul className="list-none flex flex-col gap-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="/#/services"
                    className="text-sm text-[#555] no-underline hover:text-[#F5F5F5] transition-colors cursor-none"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[2px] uppercase text-[#6B6B6B] mb-5">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  href: 'mailto:prothsahan.counsulting@gmail.com',
                  label: 'prothsahan.counsulting@gmail.com',
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                  href: 'https://www.instagram.com/prothsahan.co/',
                  label: '@prothsahan.co',
                  external: true,
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                  href: 'https://www.linkedin.com/company/prothasahan/?viewAsMember=true',
                  label: 'Prothsahan',
                  external: true,
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-2.5 items-start text-[13px] text-[#555]">
                  <span className="mt-[1px] flex-shrink-0">{item.icon}</span>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener' : undefined}
                    className="text-[#555] no-underline hover:text-[#FF1B1B] transition-colors cursor-none"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A1A1A] pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="font-['JetBrains_Mono'] text-xs text-[#6B6B6B]">
            © 2026 Prothsahan Consulting. All rights reserved.
          </p>
          <p className="font-['JetBrains_Mono'] text-xs text-[#6B6B6B]">
            Built with strategy. Designed with intent.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
