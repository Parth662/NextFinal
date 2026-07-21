import { useEffect, useRef } from "react";
import logo1 from "../../assets/featured-clients-card-1.svg";
import logo2 from "../../assets/featured-clients-card-2.svg";
import logo3 from "../../assets/featured-clients-card-3.svg";
import logo4 from "../../assets/featured-clients-card-4.svg";
import logo5 from "../../assets/featured-clients-card-5.svg";
import logo6 from "../../assets/featured-clients-card-6.svg";
import logo7 from "../../assets/featured-clients-card-7.svg";
import logo8 from "../../assets/featured-clients-card-8.svg";
import ukFlag from "../../assets/uk-flag.svg";
import irelandFlag from "../../assets/ireland-flag.svg";
import usaFlag from "../../assets/usa-flag.svg";
import southAfricaFlag from "../../assets/south-africa-flag.svg";
import "./FeaturedClients.css";

const clients = [
  {
    name: "Airportr",
    logo: logo1,
    description:
      "Recognized as one of the top 5 most innovative UK transport tech firms by TransportTech 2023.",
    amount: "",
    industry: "Logistics",
    country: "UK",
    flag: ukFlag,
  },
  {
    name: "Nomupay",
    logo: logo2,
    description:
      "Nomupay raises €35.9 million to expand unified payments access in Asia market.",
    amount: "€35.9M",
    industry: "Fintech",
    country: "Ireland",
    flag: irelandFlag,
  },
  {
    name: "One Text",
    logo: logo3,
    description:
      "Y Combinator-backed SaaS startup enabling frictionless payments via SMS.",
    amount: "",
    industry: "Saas",
    country: "USA",
    flag: usaFlag,
  },
  {
    name: "Shaga",
    logo: logo4,
    description:
      "An emerging leader in cloud gaming, successfully raised $1M in a Pre-Seed funding round.",
    amount: "$1M",
    industry: "Web3",
    country: "USA",
    flag: usaFlag,
  },
  {
    name: "DoStuffMedia",
    logo: logo5,
    description:
      "A prominent entertainment platform with 2.5 million monthly website visits and 23 million monthly social impressions.",
    amount: "",
    industry: "Entertainment",
    country: "USA",
    flag: usaFlag,
  },
  {
    name: "Isora",
    logo: logo6,
    description:
      "A collaborative GRC risk assessment platform trusted by Berkeley, Yale, and other leading institutions. TechStars graduate.",
    amount: "",
    industry: "Saas",
    country: "USA",
    flag: usaFlag,
  },
  {
    name: "MyWisdom",
    logo: logo7,
    description:
      "After redesign, Wisdom raised $1.3M and partnered with Samsung Health & Galaxy Watch for AI gait and fall-prevention insights.",
    amount: "$1.3M",
    industry: "HealthTech",
    country: "USA",
    flag: usaFlag,
  },
  {
    name: "Qurtuba Online",
    logo: logo8,
    description:
      "Recognized as South Africa's top-performing EdTech institution in 2023.",
    amount: "",
    industry: "EdTech",
    country: "South Africa",
    flag: southAfricaFlag,
  },
];

export default function FeaturedClients() {
  const revealRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

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

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let targetScroll = grid.scrollLeft;
    let currentScroll = grid.scrollLeft;
    let raf = null;
    let dragging = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const startLoop = () => {
      if (raf) return;
      const tick = () => {
        currentScroll = lerp(currentScroll, targetScroll, 0.15);
        if (Math.abs(currentScroll - targetScroll) < 0.5) {
          currentScroll = targetScroll;
        }
        grid.scrollLeft = currentScroll;
        if (currentScroll !== targetScroll) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const getLeft = (clientX) => {
      const rect = grid.getBoundingClientRect();
      return clientX - rect.left;
    };

    const isScrollable = () => grid.scrollWidth > grid.clientWidth;

    const onMouseDown = (e) => {
      if (!isScrollable()) return;
      e.preventDefault();
      dragging = true;
      const startX = getLeft(e.clientX);
      const startScroll = targetScroll;

      const onMouseMove = (e) => {
        if (!dragging) return;
        const x = getLeft(e.clientX);
        targetScroll = startScroll - (x - startX);
        currentScroll = grid.scrollLeft;
        startLoop();
      };

      const onMouseUp = () => {
        dragging = false;
        grid.style.cursor = "grab";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      grid.style.cursor = "grabbing";
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onTouchStart = (e) => {
      if (!isScrollable()) return;
      dragging = true;
      const startX = getLeft(e.touches[0].clientX);
      const startScroll = targetScroll;

      const onTouchMove = (e) => {
        if (!dragging) return;
        const x = getLeft(e.touches[0].clientX);
        targetScroll = startScroll - (x - startX);
        currentScroll = grid.scrollLeft;
        startLoop();
      };

      const onTouchEnd = () => {
        dragging = false;
        grid.removeEventListener("touchmove", onTouchMove);
        grid.removeEventListener("touchend", onTouchEnd);
      };

      grid.addEventListener("touchmove", onTouchMove, { passive: true });
      grid.addEventListener("touchend", onTouchEnd);
    };

    grid.addEventListener("mousedown", onMouseDown);
    grid.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      grid.removeEventListener("mousedown", onMouseDown);
      grid.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <section className="featured-clients">
      <div className="featured-clients__container">
        <div className="featured-clients__reveal-group" ref={revealRef}>
          <p className="featured-clients__caption">
            {"Award-Winning Product Design and Development Agency"
              .split("")
              .map((char, i) => (
                <span
                  key={i}
                  className="featured-clients__caption-char"
                  style={{ animationDelay: `${i * 0.032}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </p>
          <h2 className="featured-clients__title">
            {"Our featured client wins".split(" ").map((word, i) => (
              <span
                key={i}
                className="featured-clients__title-word"
                style={{ animationDelay: `${i * 0.374}s` }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
        <div className="featured-clients__grid" ref={gridRef}>
          {clients.map((client) => (
            <div className="featured-clients__card" key={client.name}>
              <img
                src={client.logo}
                alt="Product Design and Development Agency"
              />
              <div className="featured-clients__card-overlay">
                <div className="featured-clients__card-inner">
                  <div className="featured-clients__card-name">
                    {client.name}
                  </div>
                  <div className="featured-clients__card-desc">
                    <p>{client.description}</p>
                  </div>
                  <div className="featured-clients__card-amount">
                    <div className="featured-clients__card-amount-value">
                      {client.amount}
                    </div>
                  </div>
                  <div className="featured-clients__card-tags">
                    <span className="featured-clients__card-tag">
                      {client.industry}
                    </span>
                    <span className="featured-clients__card-tag">
                      <img
                        src={client.flag}
                        alt="Product Design and Development Agency"
                      />
                      {client.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
