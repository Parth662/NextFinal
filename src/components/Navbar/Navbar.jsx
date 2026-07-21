import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';
import AnimatedLink from './AnimatedLink';
import Dropdown from './Dropdown';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { mobileServicesData, mobileIndustriesData, mobileCompanyData } from '../../data/mobileMenuData';
import './Navbar.css';

const Navbar = () => {
  const { isScrolled } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // If a dropdown is open, OR we are on the white cases page, force the light theme
  const theme = (activeDropdown || location.pathname === '/projects') ? 'light' : 'dark';

  const navClass = `navbar ${theme === 'light' ? 'navbar-light' : ''} ${
    isScrolled && !activeDropdown ? 'navbar-scrolled' : ''
  }`;

  return (
    <>
      <nav className={navClass} onMouseLeave={() => setActiveDropdown(null)}>
        <div className="navbar-container">
          <div className="navbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Logo theme={theme} />
          </div>
          
          <div className="navbar-links">
            <div onMouseEnter={() => setActiveDropdown('services')}>
              <AnimatedLink href="/#services" theme={theme} hasDropdown={true}>Services</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown('industries')}>
              <AnimatedLink href="/#industries" theme={theme} hasDropdown={true}>Industries</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="/projects" theme={theme}>Cases</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown('company')}>
              <AnimatedLink href="/#company" theme={theme} hasDropdown={true}>Company</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="/#insights" theme={theme}>Insights</AnimatedLink>
            </div>
            <div onMouseEnter={() => setActiveDropdown(null)}>
              <AnimatedLink href="/#contacts" theme={theme}>Contacts</AnimatedLink>
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
        <div className="mobile-menu-inner">
          <div className="mobile-menu-header">
            <div className="navbar-logo" onClick={() => { navigate('/'); toggleMobileMenu(); }}>
              <Logo theme="light" />
            </div>
            <button className="mobile-close-btn" onClick={toggleMobileMenu}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="mobile-menu-links">
            <div className={`mobile-menu-item ${activeDropdown === 'mobile-services' ? 'expanded' : ''}`}>
              <div className="mobile-menu-item-header" onClick={() => setActiveDropdown(activeDropdown === 'mobile-services' ? null : 'mobile-services')}>
                <span>Services <span className="badge-count">30</span></span>
                <span className="mobile-chevron">
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="mobile-accordion-content">
                <div className="mobile-accordion-inner mobile-mega-menu-inner">
                  {mobileServicesData.map((section, idx) => (
                    <div key={idx} className="mobile-mega-section">
                      <div className="mobile-mega-title">{section.title}</div>
                      {section.links.map((link, lIdx) => (
                        <Link key={lIdx} to={link.href} className="mobile-mega-link" onClick={toggleMobileMenu}>
                          {link.name} 
                          <span className="mega-link-arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`mobile-menu-item ${activeDropdown === 'mobile-industries' ? 'expanded' : ''}`}>
              <div className="mobile-menu-item-header" onClick={() => setActiveDropdown(activeDropdown === 'mobile-industries' ? null : 'mobile-industries')}>
                <span>Industries <span className="badge-count">4</span></span>
                <span className="mobile-chevron">
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="mobile-accordion-content">
                <div className="mobile-accordion-inner">
                  {mobileIndustriesData.map((link, idx) => (
                    <Link key={idx} to={link.href} onClick={toggleMobileMenu} className="mobile-simple-link">{link.name}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-menu-item">
              <Link className="mobile-menu-item-header" to="/projects" onClick={toggleMobileMenu}>
                <span>Cases</span>
              </Link>
            </div>

            <div className={`mobile-menu-item ${activeDropdown === 'mobile-company' ? 'expanded' : ''}`}>
              <div className="mobile-menu-item-header" onClick={() => setActiveDropdown(activeDropdown === 'mobile-company' ? null : 'mobile-company')}>
                <span>Company <span className="badge-count">2</span></span>
                <span className="mobile-chevron">
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="mobile-accordion-content">
                <div className="mobile-accordion-inner">
                  {mobileCompanyData.map((link, idx) => (
                    <Link key={idx} to={link.href} onClick={toggleMobileMenu} className="mobile-simple-link">{link.name}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-menu-item">
              <Link className="mobile-menu-item-header" to="/#insights" onClick={toggleMobileMenu}>
                <span>Insights</span>
              </Link>
            </div>
            <div className="mobile-menu-item">
              <Link className="mobile-menu-item-header" to="/#contacts" onClick={toggleMobileMenu}>
                <span>Contacts</span>
              </Link>
            </div>
          </div>
          
          <div className="mobile-menu-footer">
            <button className="get-in-touch-btn btn-dark full-width">
              <span className="btn-text">Get in touch</span>
              <span className="btn-arrow">→</span>
            </button>
            <div className="mobile-social-row">
              <button className="social-square">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </button>
              <button className="social-square">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.533.26l.213-3.05 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.971z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
