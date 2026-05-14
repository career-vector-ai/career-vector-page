import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../utils/TextReveal';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef(null);

  const cards = [
    {
      title: "Know exactly where you stand.",
      desc: "Real-time compatibility scores powered by AI-driven skill analysis."
    },
    {
      title: "Your skills. Matched against reality.",
      desc: "500+ curated industry profiles. 20 engineering career paths. One intelligent system."
    },
    {
      title: "More than a score.",
      desc: "CareerVector generates a personalized learning roadmap designed around your exact weaknesses."
    },
    {
      title: "LinkedIn, upgraded.",
      desc: "Our Chrome Extension analyzes job descriptions directly inside LinkedIn and shows compatibility scores, matched skills, and missing skills. Before you even apply."
    }
  ];

  useEffect(() => {
    const featureCards = featuresRef.current.querySelectorAll('.bauhaus-feature-card');
    
    featureCards.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    const calloutStats = featuresRef.current.querySelectorAll('.callout-stats span');
    gsap.fromTo(calloutStats,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
        scrollTrigger: {
          trigger: '.features-callout',
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section className="features" ref={featuresRef}>
      <div className="container">
        
        <div className="features-bauhaus">
          {cards.map((c, i) => (
            <div className={`bauhaus-feature-card card-${i + 1}`} key={i}>
              {/* Graphic element distinct to each card */}
              <div className={`bauhaus-shape shape-${i + 1}`}></div>
              
              <div className="card-content">
                <TextReveal as="h3" className="feature-title">{c.title}</TextReveal>
                <TextReveal as="p" className="feature-desc">{c.desc}</TextReveal>
              </div>
            </div>
          ))}
        </div>

        <div className="features-callout">
          <TextReveal as="h2" className="callout-title">From confusion to clarity.</TextReveal>
          <div className="callout-stats">
            <span>Structured growth.</span>
            <span>Focused preparation.</span>
            <span>Smarter career decisions.</span>
          </div>
        </div>

        <div className="features-footer">
          <TextReveal as="p">Designed for ambitious students. Built for the placement journey.</TextReveal>
          <TextReveal as="p">Not another job portal. A career navigation system.</TextReveal>
          <TextReveal as="p">The future of career preparation is personalized.</TextReveal>
        </div>
      </div>
    </section>
  );
};

export default Features;
