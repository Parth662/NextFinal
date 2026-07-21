import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturedClients from './components/FeaturedClients/FeaturedClients';
import Cases from './components/Cases/Cases';
import Services from './components/services';
import Footer from './components/footer';
import TermsModal from './components/TermsModal';
import CookieModal from './components/CookieModal';
import './App.css';

export default function App() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);

  return (
    <>
      {/* Navigation Header */}
      <Navbar />

      <Routes>
        {/* Homepage Route with full Landing Page contents */}
        <Route path="/" element={
          <>
            {/* Background Decorative Grids & Blobs */}
            <div className="grid-overlay"></div>
            <div className="glow-blob glow-blob-1"></div>
            <div className="glow-blob glow-blob-2"></div>

            {/* Hero Section */}
            <Hero />

            {/* Featured Clients Section */}
            <FeaturedClients />

            {/* Services Component */}
            <main className="main-content">
              <Services />
            </main>

            {/* Tech Stack Highlights */}
            <section id="tech" className="tech-section">
              <div className="section-header">
                <span className="section-tagline">OUR ECOSYSTEM</span>
                <h2 className="section-title">Driven by modern technology</h2>
                <p className="section-desc">
                  We utilize cutting-edge tools and frameworks to guarantee speed, responsiveness, and premium visual fidelity.
                </p>
              </div>
              <div className="tech-grid">
                <div className="tech-card">
                  <h3>React & Next.js</h3>
                  <p>Component-driven UI framework for highly reactive, stateful web applications.</p>
                </div>
                <div className="tech-card">
                  <h3>Vite & ESM</h3>
                  <p>Instant hot module replacement (HMR) and optimized building pipelines.</p>
                </div>
                <div className="tech-card">
                  <h3>Figma & Spline</h3>
                  <p>High-fidelity UI designs, motion flows, and web-ready 3D scene creation.</p>
                </div>
                <div className="tech-card">
                  <h3>Core Web Vitals</h3>
                  <p>Focused on LCP, INP, and accessibility to deliver unmatched user retention.</p>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section id="cta" className="cta-section">
              <div className="cta-card">
                <div className="cta-card-glow"></div>
                <h2>Let's build something exceptional</h2>
                <p>
                  Ready to bring your vision to life? Connect with our team to discuss your project scope, design needs, or engineering challenges.
                </p>
                <div className="cta-actions">
                  <a href="mailto:hello@nextin.agency" className="btn btn-primary">
                    hello@nextin.agency
                  </a>
                  <span className="cta-or">or</span>
                  <a href="#" className="btn btn-secondary">
                    Schedule on Calendly
                  </a>
                </div>
              </div>
            </section>
          </>
        } />

        {/* Projects Route displaying Cases Component */}
        <Route path="/projects" element={<Cases />} />
      </Routes>

      {/* Site Footer */}
      <Footer onOpenTerms={() => setIsTermsOpen(true)} onOpenCookies={() => setIsCookiesOpen(true)} />

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Cookies Policy Modal */}
      <CookieModal isOpen={isCookiesOpen} onClose={() => setIsCookiesOpen(false)} />
    </>
  );
}
