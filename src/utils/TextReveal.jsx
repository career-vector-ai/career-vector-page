import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, as: Component = 'div', className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We assume the children is a single string or an array of strings that we can split into words
    const text = containerRef.current.textContent || '';
    const words = text.trim().split(' ');
    
    // Clear current content and replace with wrapped words
    containerRef.current.innerHTML = '';
    
    words.forEach((word) => {
      const spanOuter = document.createElement('span');
      spanOuter.style.overflow = 'hidden';
      spanOuter.style.display = 'inline-block';
      spanOuter.style.verticalAlign = 'top';
      spanOuter.style.paddingBottom = '0.15em'; // prevent descender clipping
      spanOuter.style.marginBottom = '-0.15em'; // counteract padding

      const spanInner = document.createElement('span');
      spanInner.innerText = word;
      spanInner.style.display = 'inline-block';
      spanInner.style.transform = 'translateY(110%)';
      spanInner.style.opacity = '0';
      spanInner.className = 'word-inner';

      spanOuter.appendChild(spanInner);
      containerRef.current.appendChild(spanOuter);
      
      // Add a real space character so the browser can wrap lines naturally
      containerRef.current.appendChild(document.createTextNode(' '));
    });

    const innerSpans = containerRef.current.querySelectorAll('.word-inner');

    // Make parent visible before animating children
    gsap.set(containerRef.current, { visibility: 'visible' });

    gsap.to(innerSpans, {
      y: "0%",
      opacity: 1,
      stagger: 0.06,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, [children]);

  // We initially render the children hidden, then the effect replaces it
  return (
    <Component ref={containerRef} className={className} style={{ visibility: 'hidden', display: 'inline-block' }}>
      {children}
    </Component>
  );
};

export default TextReveal;
