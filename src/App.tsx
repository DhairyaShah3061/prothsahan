import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import MobileMenu from './components/MobileMenu';
// Lazy-load below-the-fold sections to improve initial bundle and time-to-interactive
const Problem = React.lazy(() => import('./components/Problem'));
const WhatWeDo = React.lazy(() => import('./components/WhatWeDo'));
const Services = React.lazy(() => import('./components/Services'));
const HowWeWork = React.lazy(() => import('./components/HowWeWork'));
const Stats = React.lazy(() => import('./components/Stats'));
const WhyUs = React.lazy(() => import('./components/WhyUs'));
const CaseStudy = React.lazy(() => import('./components/CaseStudy'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Team = React.lazy(() => import('./components/Team'));
const Contact = React.lazy(() => import('./components/Contact'));
const FinalCTA = React.lazy(() => import('./components/FinalCTA'));
const Footer = React.lazy(() => import('./components/Footer'));
import { useMobileMenu } from './hooks/useMobileMenu';
import { GooeyLoader } from '@/components/ui/loader-10';
import ServicesPage from './pages/ServicesPage';

const SectionDivider: React.FC = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-red-800/20 to-transparent" />
);

const getCurrentRoute = (): 'home' | 'services' => {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const hash = window.location.hash;

  if (path === '/services' || hash === '#/services') {
    return 'services';
  }

  return 'home';
};

const App: React.FC = () => {
  const { isOpen, toggle, close } = useMobileMenu();
  const [route, setRoute] = useState<'home' | 'services'>(() => getCurrentRoute());

  // Loader overlay control
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const loaderMin = 2500; // minimum loader display (ms)
  const fadeDuration = 600; // fade out duration (ms)
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    const onLoaded = () => {
      const elapsed = Date.now() - startRef.current;
      const remain = Math.max(0, loaderMin - elapsed);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowLoader(false), fadeDuration);
      }, remain);
    };

    if (document.readyState === 'complete') onLoaded();
    else window.addEventListener('load', onLoaded);

    return () => window.removeEventListener('load', onLoaded);
  }, []);

  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute());

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const page =
    route === 'services' ? (
      <ServicesPage />
    ) : (
      <div className="bg-black text-[#F5F5F5] font-['DM_Sans'] text-[17px] leading-relaxed overflow-x-hidden cursor-none">
        <CustomCursor />
        <Navbar isMenuOpen={isOpen} onMenuToggle={toggle} />
        <MobileMenu isOpen={isOpen} onClose={close} />
        <Hero />

        <React.Suspense fallback={null}>
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
        </React.Suspense>
      </div>
    );

  return (
    <>
      {page}

      {showLoader && (
        <div
          className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-[600ms] ease-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <GooeyLoader primaryColor="#b91c1c" secondaryColor="#991b1b" borderColor="#0b0b0b" />
        </div>
      )}
    </>
  );
};

export default App;
