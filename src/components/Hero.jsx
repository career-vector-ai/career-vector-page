import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Text Reveal
    gsap.set(".reveal-text", { y: "110%", opacity: 0 });
    tl.to(".reveal-text", 
      { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.2 }
    );

    // Ambient floating animations for Bauhaus elements
    gsap.to(".bauhaus-circle", { rotation: 90, scale: 1.05, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".bauhaus-arch", { y: -20, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".bauhaus-triangle", { rotation: -15, scale: 1.02, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // Mouse Magnetic Interaction
    const handleMouseMove = (e) => {
      const shapes = document.querySelectorAll('.bauhaus-hero-grid > div');
      shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const currentX = gsap.getProperty(shape, "x") || 0;
        const currentY = gsap.getProperty(shape, "y") || 0;
        
        // Calculate original center without transform
        const originX = rect.left - currentX + rect.width / 2;
        const originY = rect.top - currentY + rect.height / 2;
        
        const distX = e.clientX - originX;
        const distY = e.clientY - originY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        const maxDist = 400;
        
        if (distance < maxDist) {
          // Smooth interpolation: the closer the mouse, the stronger the pull
          const pullStrength = 0.5 * (1 - Math.pow(distance / maxDist, 2));
          
          gsap.to(shape, {
            x: distX * pullStrength,
            y: distY * pullStrength,
            duration: 1.5,
            ease: "power3.out",
            overwrite: "auto"
          });
        } else {
          // Smooth return to origin without aggressive elastic snapping
          gsap.to(shape, {
            x: 0,
            y: 0,
            duration: 2,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      {/* Authentic Bauhaus Interactive Background */}
      <div className="bauhaus-hero-grid">
        <div className="bauhaus-circle"></div>
        <div className="bauhaus-arch"></div>
        <div className="bauhaus-triangle"></div>
        <div className="bauhaus-line"></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            <div className="reveal-line"><span className="reveal-text">Career</span></div>
            <div className="reveal-line"><span className="reveal-text">Vector</span></div>
          </h1>
          <div className="hero-subtitle-container">
            <div className="reveal-line">
              <p className="hero-subtitle reveal-text">Clarity, engineered.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
