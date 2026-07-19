import React from 'react';
import './Navbar.css';

const AnimatedLink = ({ href, children, theme = 'dark', hasDropdown = false }) => {
  const textColorClass = theme === 'light' ? 'text-black' : 'text-white';
  
  return (
    <a href={href} className={`animated-link ${textColorClass}`}>
      <div className="animated-link-content">
        <span className="animated-link-text">
          {children}
          {hasDropdown && <ChevronDown />}
        </span>
        <span className="animated-link-text-hover">
          {children}
          {hasDropdown && <ChevronDown />}
        </span>
      </div>
    </a>
  );
};

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', marginTop: '2px' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default AnimatedLink;
