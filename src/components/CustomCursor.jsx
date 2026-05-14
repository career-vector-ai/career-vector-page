import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  // Use refs to avoid closure stale state in rAF
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Layer 1: Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // Layer 2: Ring follows with lerp 0.10
      ring.current.x += (mouse.current.x - ring.current.x) * 0.10;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.10;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };
    
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkTouch);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseEnter = (e) => {
      setIsHovering(true);
    };

    const handleMouseLeave = (e) => {
      setIsHovering(false);
    };

    const setupElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, .bauhaus-feature-card, .bauhaus-arch, .bauhaus-circle, .bauhaus-triangle, .bauhaus-shape');
      
      interactiveElements.forEach((el) => {
        // Prevent adding multiple listeners
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return interactiveElements;
    };

    // Setup initially and observer for dynamic elements if needed
    const elements = setupElements();
    
    // Quick observer to catch dynamically added elements (like from features map)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
           setupElements(); // Rebind
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        if (el._onMouseMove) {
          el.removeEventListener('mousemove', el._onMouseMove);
        }
      });
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isHovering ? 'hover' : ''}`}
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isHovering ? 'hover' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
