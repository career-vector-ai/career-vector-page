import React from 'react';
import TextReveal from '../utils/TextReveal';
import './Manifesto.css';

const Manifesto = () => {
  return (
    <section className="manifesto">
      <div className="container">
        <TextReveal as="h2" className="manifesto-heading">
          Stop guessing. Start preparing.
        </TextReveal>
        <TextReveal as="p" className="manifesto-text">
          Measure how your skills align with real-world jobs before placements begin.
        </TextReveal>
      </div>
    </section>
  );
};

export default Manifesto;
