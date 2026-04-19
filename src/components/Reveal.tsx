import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const delayMap: Record<number, string> = {
  0: 'transition-delay-[0ms]',
  1: 'transition-delay-[100ms]',
  2: 'transition-delay-[200ms]',
  3: 'transition-delay-[300ms]',
  4: 'transition-delay-[400ms]',
  5: 'transition-delay-[500ms]',
};

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base = 'opacity-0 translate-y-10 transition-all duration-700';
  const active = 'opacity-100 translate-y-0';

  return React.createElement(
    Tag as string,
    {
      ref,
      className: `${base} ${delayMap[delay]} ${visible ? active : ''} ${className}`,
    },
    children
  );
};

export default Reveal;
