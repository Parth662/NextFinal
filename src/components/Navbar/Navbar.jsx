import React, { useState } from 'react';
import Logo from './Logo';
import AnimatedLink from './AnimatedLink';
import Dropdown from './Dropdown';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import './Navbar.css';

const Navbar = () => {
  const { scrollDirection, isScrolled } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // If a dropdown is open, force the light theme
  const theme = activeDropdown ? 'light' : 'dark';

  const navClass = `navbar ${theme === 'light' ? 'navbar-light' : ''} ${
    isScrolled && !activeDropdown ? 'navbar-scrolled' : ''
  }`;

  return (
    <>
      <nav className={navClass} onMouseLeave={() => setActiveDropdown(null)}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <Logo theme={theme} />
          </div>
          
          <div className="navbar-links">
            <div onMouseEnter={() => setActiveDropdown('services')}>
              <AnimatedLink href="#services" theme={theme} hasDropdown={true}>Services</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown('industries')}>
              <AnimatedLink href="#industries" theme={theme} hasDropdown={true}>Industries</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="#cases" theme={theme}>Cases</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown('company')}>
              <AnimatedLink href="#company" theme={theme} hasDropdown={true}>Company</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="#insights" theme={theme}>Insights</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="#contacts" theme={theme}>Contacts</AnimatedLink>
            </div>
          </div>

          <div className="navbar-actions">
            <button className={`get-in-touch-btn ${theme === 'light' ? 'btn-dark' : ''}`}>
              <span className="btn-text">Get in touch</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''} ${theme === 'light' ? 'hamburger-dark' : ''}`} onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        <Dropdown isOpen={!!activeDropdown} activeMenu={activeDropdown} />
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#services" onClick={toggleMobileMenu}>Services</a>
          <a href="#industries" onClick={toggleMobileMenu}>Industries</a>
          <a href="#cases" onClick={toggleMobileMenu}>Cases</a>
          <a href="#company" onClick={toggleMobileMenu}>Company</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
