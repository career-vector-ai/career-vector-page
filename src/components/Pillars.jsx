import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../utils/TextReveal';
import './Pillars.css';

gsap.registerPlugin(ScrollTrigger);

const Pillars = () => {
  const containerRef = useRef(null);

  const pillars = [
    { num: '01', title: 'Upload your resume.' },
    { num: '02', title: 'Discover your gaps.' },
    { num: '03', title: 'Build your Career.' },
  ];

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.pillar-item');
    
    gsap.fromTo('.pillars-heading',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
          trigger: '.pillars-heading',
          start: "top 80%"
        }
      }
    );

    items.forEach((item) => {
      const line = item.querySelector('.pillar-line');

      gsap.fromTo(line, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1, 
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 85%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && t.vars.trigger.classList && t.vars.trigger.classList.contains('pillar-item')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="pillars" ref={containerRef}>
      <div className="container">
        <TextReveal as="h2" className="pillars-heading">Built for the future of employability.</TextReveal>
      </div>
      
      <div className="pillars-list">
        {pillars.map((p, i) => (
          <div className="pillar-item" key={i}>
            <div className="container">
              <div className="pillar-line"></div>
              <div className="pillar-content">
                <span className="pillar-num">{p.num}</span>
                <TextReveal as="h3" className="pillar-title">{p.title}</TextReveal>
              </div>
            </div>
          </div>
        ))}
        <div className="pillar-item">
          <div className="container">
            <div className="pillar-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
