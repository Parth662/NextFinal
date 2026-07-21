import { useState, useEffect, useRef } from 'react';
import { projectsData } from '../../data/projectsData';
import './Cases.css';

const TABS = ['ALL PROJECTS', 'WEB APP', 'MOBILE APP', 'WEBSITE', 'BRANDING'];

const Cases = () => {
  const [activeTab, setActiveTab] = useState('ALL PROJECTS');
  const observerRef = useRef(null);
  
  // Instantly filter projects
  const filteredProjects = projectsData.filter((project) => 
    project.category.includes(activeTab)
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeTab]); // Re-run when activeTab changes because the DOM elements are recreated

  return (
    <section id="cases" className="cases-section">
      <div className="cases-container">
        
        <div className="cases-header-wrapper reveal-on-scroll">
          <div className="title-overflow">
            <h2 className="cases-title">Explore our projects</h2>
          </div>
        </div>

        <div className="sticky-tabs-container">
          <div className="cases-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`cases-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="tab-text">{tab}</span>
                <span className="tab-ripple"></span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-wrapper">
          {filteredProjects.map((project) => (
            <div
              key={`${project.id}-${activeTab}`}
              className="project-card reveal-on-scroll"
            >
              <div className="project-image-col">
                <div className="image-reveal-wrapper">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
              </div>

              <div className="project-info-col">
                <div className="project-tags">
                  {project.tags.join(' ')}
                </div>

                <div className="title-overflow">
                  <h3 className="project-heading">{project.title}</h3>
                </div>

                <div className="project-badges">
                  <span className="badge">{project.client}</span>
                  {project.location && (
                    <span className="badge location-badge">
                      <span className="flag-icon">🇺🇸</span> {project.location}
                    </span>
                  )}
                </div>

                <div className="project-divider"></div>

                <div className="project-meta-grid">
                  <div className="meta-col">
                    <span className="meta-label">TECH STACK</span>
                    <span className="meta-value">{project.techStack}</span>
                  </div>
                  <div className="meta-col">
                    <span className="meta-label">TIMELINE</span>
                    <span className="meta-value">{project.timeline}</span>
                  </div>
                </div>

                <div className="project-divider"></div>

                <div className="project-results">
                  <span className="meta-label">RESULTS</span>
                  <ul className="results-list">
                    {project.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
