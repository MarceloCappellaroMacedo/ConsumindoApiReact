import React from 'react';
import '../../styles/HeroSection.css';

const HeroSection = ({ children }) => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        {children}
      </div>
    </div>
  );
};

export default HeroSection;