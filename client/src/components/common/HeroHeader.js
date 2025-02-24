// client/src/components/common/HeroHeader.js
import React from 'react';
import './HeroHeader.css';

const HeroHeader = ({ title, subtitle, backgroundImage }) => {
  return (
    <header 
      className="hero-header" 
      style={{ backgroundImage: `url(${backgroundImage})`}}
    >
      <div className="hero-overlay">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
};

export default HeroHeader;