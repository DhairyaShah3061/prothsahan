import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import WhatWeDo from './components/WhatWeDo';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import Stats from './components/Stats';
import WhyUs from './components/WhyUs';
import CaseStudy from './components/CaseStudy';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import MobileMenu from './components/MobileMenu';
import { useMobileMenu } from './hooks/useMobileMenu';
import ServicesPage from './pages/ServicesPage';

const SectionDivider: React.FC = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-red-800/20 to-transparent" />
);

const App: React.FC = () => {
  const { isOpen, toggle, close } = useMobileMenu();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/services') {
    return <ServicesPage />;
  }

  return (
    <div className="bg-black text-[#F5F5F5] font-['DM_Sans'] text-[17px] leading-relaxed overflow-x-hidden cursor-none">
      <CustomCursor />
      <Navbar isMenuOpen={isOpen} onMenuToggle={toggle} />
      <MobileMenu isOpen={isOpen} onClose={close} />
      <Hero />
      <SectionDivider />
      <Problem />
      <SectionDivider />
      <WhatWeDo />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <HowWeWork />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <WhyUs />
      <SectionDivider />
      <CaseStudy />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Team />
      <SectionDivider />
      <Contact />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default App;
