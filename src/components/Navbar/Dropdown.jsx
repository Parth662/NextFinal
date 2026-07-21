

const Dropdown = ({ isOpen, activeMenu }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'open' : ''}`}>
      <div className="mega-menu-container">
        {activeMenu === 'services' && (
          <div className="mega-menu-grid">
            <div className="mega-menu-column">
              <div className="mega-menu-item">
                <span className="mega-menu-title">Design</span>
                <ul>
                  <li><a href="#">Web design</a></li>
                  <li><a href="#">Mobile design</a></li>
                  <li><a href="#">Website design</a></li>
                  <li><a href="#">Website redesign</a></li>
                  <li><a href="#">Branding & identity</a></li>
                  <li><a href="#">Design prototype</a></li>
                </ul>
              </div>
              <div className="mega-menu-item mt-4">
                <span className="mega-menu-title">Launch</span>
                <ul>
                  <li><a href="#">Design prototype</a></li>
                  <li><a href="#">Product discovery</a></li>
                  <li><a href="#">Rapid MVP development</a></li>
                  <li><a href="#">Custom MVP development</a></li>
                  <li><a href="#">AI development</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mega-menu-column">
              <div className="mega-menu-item">
                <span className="mega-menu-title">Development</span>
                <ul>
                  <li><a href="#">Web development</a></li>
                  <li><a href="#">Mobile development</a></li>
                  <li><a href="#">Website development</a></li>
                  <li><a href="#">AI development</a></li>
                  <li><a href="#">Custom software development</a></li>
                </ul>
              </div>
              <div className="mega-menu-item mt-4">
                <span className="mega-menu-title">Evolve</span>
                <ul>
                  <li><a href="#">UX audit</a></li>
                  <li><a href="#">Product redesign</a></li>
                  <li><a href="#">Web app design</a></li>
                  <li><a href="#">Web app development</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mega-menu-image">
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" alt="Services" />
            </div>
          </div>
        )}

        {activeMenu === 'industries' && (
          <div className="mega-menu-grid industries-grid">
            <div className="mega-menu-column callout">
              <h3>Ready to bring your idea to life?</h3>
              <button className="btn-orange">Let's talk →</button>
            </div>
            
            <div className="mega-menu-column">
              <div className="mega-menu-item">
                <ul>
                  <li><a href="#">SaaS</a></li>
                  <li><a href="#">Healthcare</a></li>
                  <li><a href="#">Fintech</a></li>
                  <li><a href="#">Edtech</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mega-menu-image">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Industries" />
            </div>
          </div>
        )}

        {activeMenu === 'company' && (
          <div className="mega-menu-grid industries-grid">
            <div className="mega-menu-column callout">
              <h3>Ready to bring your idea to life?</h3>
              <button className="btn-orange">Let's talk →</button>
            </div>
            
            <div className="mega-menu-column">
              <div className="mega-menu-item">
                <ul>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mega-menu-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Company" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
