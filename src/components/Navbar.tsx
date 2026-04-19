import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/prothsahan_logo_web.png';

interface NavbarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, onMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > 80) {
        setScrolled(true);
        if (current > lastScroll.current + 5) setHidden(true);
        else if (current < lastScroll.current - 5) setHidden(false);
      } else {
        setScrolled(false);
        setHidden(false);
      }
      lastScroll.current = current;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#case-study', label: 'Our Work' },
    { href: '#team', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/5 py-[14px]' : 'py-5'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="inline-flex items-center no-underline cursor-none"
            aria-label="Prothsahan Home"
          >
            <img
              src={logo}
              alt="Prothsahan"
              className="h-12 w-auto sm:h-14 object-contain"
            />
          </a>

          <ul className="hidden md:flex items-center gap-9 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#A8A8A8] no-underline text-sm font-medium tracking-[0.5px] hover:text-[#F5F5F5] transition-colors cursor-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-6 py-[11px] text-sm font-medium text-white bg-[#FF1B1B] rounded-full no-underline transition-all duration-200 hover:scale-[1.04] shadow-[0_0_20px_rgba(255,27,27,0.4),0_0_60px_rgba(255,27,27,0.15)] hover:shadow-[0_0_30px_rgba(255,27,27,0.6)] cursor-none"
          >
            Let's Grow
          </a>

          <button
            onClick={onMenuToggle}
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 cursor-none"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 origin-center ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F5F5F5] transition-all duration-300 origin-center ${
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
