import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Pillars from './components/Pillars';
import Features from './components/Features';
import MinimalFooter from './components/MinimalFooter';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Hide default cursor site-wide
    document.body.style.cursor = 'none';

    // Setup Lenis
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: !prefersReducedMotion,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <main>
        <Hero />
        <Manifesto />
        <Pillars />
        <Features />
      </main>
      <MinimalFooter />
    </>
  );
}

export default App;
