import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MinimalFooter.css';

gsap.registerPlugin(ScrollTrigger);

const MinimalFooter = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const textLines = footerRef.current.querySelectorAll('.footer-cta div');
    
    gsap.fromTo(textLines, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === footerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <footer className="minimal-footer" ref={footerRef}>
      <div className="container">
        <div className="footer-cta-container">
          <h2 className="footer-cta">
            <div>Career</div>
            <div>Vector</div>
          </h2>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Career Vector.</p>
          <p>careervector.ai@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
