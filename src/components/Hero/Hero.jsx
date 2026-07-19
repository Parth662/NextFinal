import { useEffect, useRef } from "react";
import hero_video from "../../assets/hero-video.mp4";
import l_1 from "../../assets/l_1.svg";
import l_2 from "../../assets/l_2.svg";
import l_3 from "../../assets/l_3.svg";
import "./Hero.css";

function RevealText({ text, className, charClass }) {
  return (
    <p className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={charClass}
          style={{ animationDelay: `${i * 0.032}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

export default function Hero() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero__container">
        <header className="hero__header">
          <p className="hero__caption">
            {"Product Design and Development Agency"
              .split("")
              .map((char, i) => (
                <span
                  key={i}
                  className="hero__caption-char"
                  style={{ animationDelay: `${i * 0.032}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </p>

          <h1 className="hero__title">
            {"We take brands, websites, and products to the next level."
              .split(" ")
              .map((word, i) => (
                <span
                  key={i}
                  className="hero__title-word"
                  style={{ animationDelay: `${i * 0.089}s` }}
                >
                  {word}
                </span>
              ))}
          </h1>

          <div className="hero__actions">
            <a className="hero__btn hero__btn--primary" href="#contact">
              <span className="hero__btn-arrow hero__btn-arrow--left">
                &rarr;
              </span>
              <span className="hero__btn-text">Let's talk</span>
              <span className="hero__btn-arrow hero__btn-arrow--right">
                &rarr;
              </span>
            </a>
            <a className="hero__btn hero__btn--outline" href="#cases">
              <span className="hero__btn-arrow hero__btn-arrow--left">
                &rarr;
              </span>
              <span className="hero__btn-text">View our cases</span>
              <span className="hero__btn-arrow hero__btn-arrow--right">
                &rarr;
              </span>
            </a>
          </div>
        </header>

        <div className="hero__body">
          <div className="hero__showreel-col">
            <div className="hero__showreel-video">
              <video autoPlay muted loop playsInline>
                <source src={hero_video} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="hero__info-col">
            <div className="hero__description">
              We work with teams who've outgrown what they've built — and need
              one partner to rethink, redesign, and ship it right. From the
              first strategy call to post-launch support, we own it end to end.
            </div>

            <div className="hero__investors">
              <div
                className="hero__reveal-group"
                ref={(el) => (revealRefs.current[0] = el)}
              >
                <RevealText
                  text="Designing products backed by top-tier investors"
                  className="hero__investors-caption hero__reveal-text"
                  charClass="hero__reveal-char"
                />
              </div>

              <div className="hero__logos">
                <div className="hero__logo">
                  <img src={l_1} alt="Investor logo" />
                </div>
                <div className="hero__logo">
                  <img src={l_2} alt="Investor logo" />
                </div>
                <div className="hero__logo">
                  <img src={l_3} alt="Investor logo" />
                </div>
                <div className="hero__logo">
                  <span className="hero__logo-more">and more</span>
                </div>
              </div>
            </div>

            <div className="hero__stats">
              <div
                className="hero__reveal-group"
                ref={(el) => (revealRefs.current[1] = el)}
              >
                <RevealText
                  text="phenomenon studio in numbers"
                  className="hero__stats-caption hero__reveal-text"
                  charClass="hero__reveal-char"
                />
              </div>

              <div className="hero__stats-grid">
                <div className="hero__stat">
                  <span className="hero__stat-value">500M+</span>
                  <span className="hero__stat-label">
                    investments raised by our clients
                  </span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-value">x2</span>
                  <span className="hero__stat-label">
                    avg projects per client — most come back
                  </span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-value">5.0</span>
                  <span className="hero__stat-label">
                    on clutch — 40+ reviews
                  </span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-value">35%</span>
                  <span className="hero__stat-label">
                    conversion lift — klickex case
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
