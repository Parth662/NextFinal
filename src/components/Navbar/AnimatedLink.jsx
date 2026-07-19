import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const AnimatedLink = ({ href, children, theme = 'dark', hasDropdown = false, onClick }) => {
  const textColorClass = theme === 'light' ? 'text-black' : 'text-white';
  
  const handleClick = (e) => {
    if (onClick) {
      onClick();
    }
  };

  // If it's a relative URL without hash, or it's /projects, use Link.
  // We'll just use Link for everything, but React Router's Link expects `to` instead of `href`.
  const isHash = href.startsWith('#');

  if (isHash) {
    return (
      <a href={href} className={`animated-link ${textColorClass}`} onClick={handleClick}>
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
  }

  return (
    <Link to={href} className={`animated-link ${textColorClass}`} onClick={handleClick}>
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
    </Link>
  );
};

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', marginTop: '2px' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default AnimatedLink;
