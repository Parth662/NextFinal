import { useEffect } from 'react';

export default function CookieModal({ isOpen, onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="terms-modal-header">
          <h2>Cookies Policy</h2>
          <button className="terms-modal-close" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="terms-modal-body">
          <p className="terms-effective-date"><strong>Last Updated:</strong> June 22, 2026</p>
          <p className="terms-intro-paragraph">
            This Cookies Policy explains how NextIn (Next Innovations) uses cookies and similar tracking technologies on our website. It details what these technologies are, why we use them, and your rights to control our use of them.
          </p>

          <hr className="terms-divider" />

          <div className="terms-section">
            <h3>1. What Are Cookies?</h3>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to make websites work, or work more efficiently, as well as to provide reporting information.
            </p>
          </div>

          <div className="terms-section">
            <h3>2. How We Use Cookies</h3>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, which we refer to as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties.
            </p>
          </div>

          <div className="terms-section">
            <h3>3. Types of Cookies We Use</h3>
            <p><strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</p>
            <br />
            <p><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use (for example, remembering your interactive 3D showcase states or scheduling selections on Calendly).</p>
            <br />
            <p><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you (such as Google Analytics and Mixpanel trackings).</p>
            <br />
            <p><strong>Targeting/Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</p>
          </div>

          <div className="terms-section">
            <h3>4. Controlling and Managing Cookies</h3>
            <p>
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </div>

          <div className="terms-section">
            <h3>5. Updates to this Policy</h3>
            <p>
              We may update this Cookies Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookies Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </div>

          <div className="terms-section">
            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us via our Contact page or email us at{' '}
              <a href="mailto:hello@nextin.agency" className="terms-email-link">
                hello@nextin.agency
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="terms-modal-footer">
          <button className="terms-modal-accept-btn" onClick={onClose}>
            Close & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
