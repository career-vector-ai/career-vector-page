import React, { useEffect, useRef } from 'react';

const NoiseOverlay = () => {
  const filterRef = useRef(null);

  useEffect(() => {
    let frameId;
    let seed = 0;

    const animateNoise = () => {
      // Animate seed every 2 frames
      seed += 1;
      if (seed % 2 === 0 && filterRef.current) {
        filterRef.current.setAttribute('seed', (Math.random() * 100).toFixed(0));
      }
      frameId = requestAnimationFrame(animateNoise);
    };

    frameId = requestAnimationFrame(animateNoise);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.035,
        mixBlendMode: 'multiply'
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
