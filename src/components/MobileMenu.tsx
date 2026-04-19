import React from 'react';
import logo from '../assets/prothsahan_logo_web.png';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#case-study', label: 'Our Work' },
    { href: '#team', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div
      className={`fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <a href="#hero" onClick={onClose} className="inline-flex items-center no-underline cursor-none" aria-label="Prothsahan Home">
        <img
          src={logo}
          alt="Prothsahan"
          className="h-16 w-auto object-contain"
        />
      </a>

      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="font-['Playfair_Display'] text-[36px] text-[#F5F5F5] no-underline hover:text-[#FF1B1B] transition-colors cursor-none"
        >
          {link.label}
        </a>
      ))}
      <a
        href="#contact"
        onClick={onClose}
        className="inline-flex items-center px-8 py-3 font-medium text-white bg-[#FF1B1B] rounded-full no-underline cursor-none"
      >
        Let's Grow
      </a>
    </div>
  );
};

export default MobileMenu;
