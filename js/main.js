(function () {
  "use strict";

  // ============================================================
  // DOM READY
  // ============================================================
  document.addEventListener("DOMContentLoaded", function () {
    populateDynamicText();
    setupNavbarTheme();
    setupScrollDirection();
    setupDesktopMegaMenu();
    setupMobileMenu();
    setupMobileAccordions();
    setupFooterAccordion();
    setupFooterYear();
    setupFooter3DShowcase();
    setupIntersectionReveals();
    setupFeaturedClientsDragScroll();
    setupSmoothAnchorScroll();
  });

  // ============================================================
  // POPULATE DYNAMIC TEXT (per-char / per-word spans)
  // ============================================================
  function populateDynamicText() {
    // Hero: caption (per-char, 0.032s)
    setChars(
      "hero-caption",
      "Product Design and Development Agency",
      "hero__caption-char",
      0.032
    );

    // Hero: title (per-word, 0.089s)
    setWords(
      "hero-title",
      "We take brands, websites, and products to the next level.",
      "hero__title-word",
      0.089
    );

    // Hero: investors caption (per-char, 0.032s) — reveal-group wrapped
    setChars(
      "hero-investors-caption",
      "Designing products backed by top-tier investors",
      "hero__reveal-char",
      0.032
    );

    // Hero: stats caption (per-char, 0.032s)
    setChars(
      "hero-stats-caption",
      "phenomenon studio in numbers",
      "hero__reveal-char",
      0.032
    );

    // FeaturedClients: caption (per-char, 0.032s)
    setChars(
      "fc-caption",
      "Award-Winning Product Design and Development Agency",
      "featured-clients__caption-char",
      0.032
    );

    // FeaturedClients: title (per-word, 0.374s)
    setWords(
      "fc-title",
      "Our featured client wins",
      "featured-clients__title-word",
      0.374
    );

    // Intro: caption (per-char, 0.032s)
    setChars(
      "intro-caption",
      "Your Dedicated Product Design and Development Agency",
      "intro__caption-char",
      0.032
    );

    // Intro: title (per-word, 0.139s)
    setWords(
      "intro-title",
      "Building products is hard. Finding the right partner shouldn't be.",
      "intro__title-word",
      0.139
    );
  }

  function setChars(id, text, className, delayStep) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "";
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement("span");
      span.className = className;
      span.style.animationDelay = (i * delayStep).toFixed(3) + "s";
      span.textContent = text[i] === " " ? "\u00A0" : text[i];
      el.appendChild(span);
    }
  }

  function setWords(id, text, className, delayStep) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "";
    var words = text.split(" ");
    for (var i = 0; i < words.length; i++) {
      var span = document.createElement("span");
      span.className = className;
      span.style.animationDelay = (i * delayStep).toFixed(3) + "s";
      span.textContent = words[i];
      el.appendChild(span);
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    }
  }

  // ============================================================
  // NAVBAR THEME (dark/light from section data-navbar-theme)
  // ============================================================
  var currentSectionTheme = "dark";
  var activeDropdown = null;

  function setupNavbarTheme() {
    var sections = document.querySelectorAll("[data-navbar-theme]");
    if (!sections.length) return;
    var navbar = document.getElementById("navbar");
    var logoText = document.getElementById("navbar-logo-text");
    var hamburger = document.getElementById("hamburger");
    var links = document.querySelectorAll("#navbar-links .animated-link");
    var getInTouch = document.getElementById("get-in-touch");

    function update() {
      var navbarHeight = 82;
      var theme = "dark";
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= navbarHeight) {
          theme = section.getAttribute("data-navbar-theme");
        }
      });
      currentSectionTheme = theme;
      applyNavbarTheme();
    }

    function applyNavbarTheme() {
      if (!navbar) return;
      var theme = activeDropdown ? "light" : currentSectionTheme;

      if (theme === "light") {
        navbar.classList.add("navbar-light");
      } else {
        navbar.classList.remove("navbar-light");
      }

      if (logoText) {
        logoText.style.color = theme === "light" ? "#000000" : "#ffffff";
      }

      if (hamburger) {
        if (theme === "light") {
          hamburger.classList.add("hamburger-dark");
        } else {
          hamburger.classList.remove("hamburger-dark");
        }
      }

      links.forEach(function (link) {
        if (theme === "light") {
          link.classList.remove("text-white");
          link.classList.add("text-black");
        } else {
          link.classList.remove("text-black");
          link.classList.add("text-white");
        }
      });

      if (getInTouch) {
        var btnTheme = theme === "dark" ? "light" : "dark";
        getInTouch.classList.remove("get-in-touch--light", "get-in-touch--dark");
        getInTouch.classList.add("get-in-touch--" + btnTheme);
      }
    }

    window.addEventListener(
      "scroll",
      function () {
        update();
      },
      { passive: true }
    );

    update();
    window.__applyNavbarTheme = applyNavbarTheme;
  }

  // ============================================================
  // SCROLL DIRECTION (hide navbar on scroll down)
  // ============================================================
  function setupScrollDirection() {
    var lastScrollY = window.pageYOffset;
    var navbar = document.getElementById("navbar");

    function update() {
      var scrollY = window.pageYOffset;
      var delta = scrollY - lastScrollY;
      if (!navbar) return;

      if (Math.abs(delta) > 10) {
        if (delta > 0 && scrollY > 50) {
          navbar.classList.add("navbar-hidden");
        } else {
          navbar.classList.remove("navbar-hidden");
        }
      }

      if (scrollY > 50 && !activeDropdown) {
        navbar.classList.add("navbar-scrolled");
      } else if (!activeDropdown) {
        navbar.classList.remove("navbar-scrolled");
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    }

    window.addEventListener("scroll", update, { passive: true });
  }

  // ============================================================
  // DESKTOP MEGA MENU
  // ============================================================
  function setupDesktopMegaMenu() {
    var navbar = document.getElementById("navbar");
    var megaMenu = document.getElementById("mega-menu");
    if (!navbar || !megaMenu) return;

    var triggers = navbar.querySelectorAll("[data-dropdown]");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("mouseenter", function () {
        var name = trigger.getAttribute("data-dropdown");
        if (!name) {
          closeMegaMenu();
          return;
        }
        openMegaMenu(name);
      });
    });

    navbar.addEventListener("mouseleave", function () {
      closeMegaMenu();
    });
  }

  function openMegaMenu(name) {
    var megaMenu = document.getElementById("mega-menu");
    var navbar = document.getElementById("navbar");
    if (!megaMenu || !navbar) return;
    activeDropdown = name;
    megaMenu.classList.add("open");
    var all = megaMenu.querySelectorAll("[data-menu]");
    all.forEach(function (panel) {
      if (panel.getAttribute("data-menu") === name) {
        panel.style.display = "";
      } else {
        panel.style.display = "none";
      }
    });
    navbar.classList.add("navbar-scrolled");
    if (window.__applyNavbarTheme) window.__applyNavbarTheme();
  }

  function closeMegaMenu() {
    var megaMenu = document.getElementById("mega-menu");
    var navbar = document.getElementById("navbar");
    if (!megaMenu) return;
    activeDropdown = null;
    megaMenu.classList.remove("open");
    if (navbar && window.pageYOffset <= 50) {
      navbar.classList.remove("navbar-scrolled");
    }
    if (window.__applyNavbarTheme) window.__applyNavbarTheme();
  }

  // ============================================================
  // MOBILE MENU
  // ============================================================
  function setupMobileMenu() {
    var hamburger = document.getElementById("hamburger");
    var mobileMenu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mobile-close-btn");

    function openMenu() {
      if (hamburger) hamburger.classList.add("open");
      if (mobileMenu) mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      if (hamburger) hamburger.classList.remove("open");
      if (mobileMenu) mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (hamburger) {
      hamburger.addEventListener("click", function () {
        if (mobileMenu && mobileMenu.classList.contains("open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    var links = mobileMenu
      ? mobileMenu.querySelectorAll("a:not(.mobile-menu-item-header)")
      : [];
    links.forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    var headerLogo = document.getElementById("mobile-logo");
    if (headerLogo) headerLogo.addEventListener("click", closeMenu);

    var footerBtn = mobileMenu
      ? mobileMenu.querySelector(".mobile-menu-footer .get-in-touch-btn")
      : null;
    if (footerBtn) footerBtn.addEventListener("click", closeMenu);
  }

  // ============================================================
  // MOBILE ACCORDIONS (Services / Industries / Company)
  // ============================================================
  function setupMobileAccordions() {
    var items = document.querySelectorAll(".mobile-menu-item[data-accordion]");
    items.forEach(function (item) {
      var header = item.querySelector(".mobile-menu-item-header");
      if (!header) return;
      header.addEventListener("click", function () {
        var expanded = item.classList.contains("expanded");
        items.forEach(function (i) {
          i.classList.remove("expanded");
        });
        if (!expanded) item.classList.add("expanded");
      });
    });
  }

  // ============================================================
  // FOOTER ACCORDION (All services 21)
  // ============================================================
  function setupFooterAccordion() {
    var btn = document.getElementById("footer-accordion-btn");
    var panel = document.getElementById("footer-accordion-panel");
    var arrow = document.getElementById("footer-accordion-arrow");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      var open = panel.classList.contains("open");
      if (open) {
        panel.classList.remove("open");
        if (arrow) arrow.classList.remove("expanded");
        btn.setAttribute("aria-expanded", "false");
      } else {
        panel.classList.add("open");
        if (arrow) arrow.classList.add("expanded");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  // ============================================================
  // FOOTER YEAR
  // ============================================================
  function setupFooterYear() {
    var span = document.getElementById("footer-year");
    if (span) span.textContent = new Date().getFullYear();
  }

  // ============================================================
  // INTERSECTION OBSERVER REVEALS
  // ============================================================
  function setupIntersectionReveals() {
    var revealSelectors = [
      ".hero__reveal-group",
      ".featured-clients__reveal-group",
      ".intro__reveal-group",
    ];

    var elements = [];
    revealSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        elements.push(el);
      });
    });

    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ============================================================
  // FEATURED CLIENTS DRAG + LERP SCROLL (mobile horizontal)
  // ============================================================
  function setupFeaturedClientsDragScroll() {
    var grid = document.getElementById("fc-grid");
    if (!grid) return;

    var targetScroll = grid.scrollLeft;
    var currentScroll = grid.scrollLeft;
    var raf = null;
    var dragging = false;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function startLoop() {
      if (raf) return;
      var tick = function () {
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
    }

    function getLeft(clientX) {
      var rect = grid.getBoundingClientRect();
      return clientX - rect.left;
    }

    function isScrollable() {
      return grid.scrollWidth > grid.clientWidth;
    }

    grid.addEventListener("mousedown", function (e) {
      if (!isScrollable()) return;
      e.preventDefault();
      dragging = true;
      var startX = getLeft(e.clientX);
      var startScroll = targetScroll;

      function onMouseMove(ev) {
        if (!dragging) return;
        var x = getLeft(ev.clientX);
        targetScroll = startScroll - (x - startX);
        currentScroll = grid.scrollLeft;
        startLoop();
      }

      function onMouseUp() {
        dragging = false;
        grid.style.cursor = "grab";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }

      grid.style.cursor = "grabbing";
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    grid.addEventListener(
      "touchstart",
      function (e) {
        if (!isScrollable()) return;
        dragging = true;
        var startX = getLeft(e.touches[0].clientX);
        var startScroll = targetScroll;

        function onTouchMove(ev) {
          if (!dragging) return;
          var x = getLeft(ev.touches[0].clientX);
          targetScroll = startScroll - (x - startX);
          currentScroll = grid.scrollLeft;
          startLoop();
        }

        function onTouchEnd() {
          dragging = false;
          grid.removeEventListener("touchmove", onTouchMove);
          grid.removeEventListener("touchend", onTouchEnd);
        }

        grid.addEventListener("touchmove", onTouchMove, { passive: true });
        grid.addEventListener("touchend", onTouchEnd);
      },
      { passive: true }
    );
  }

  // ============================================================
  // SMOOTH ANCHOR SCROLL
  // ============================================================
  // ============================================================
  // SMOOTH ANCHOR SCROLL
  // ============================================================
  function setupSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href");
        if (!href || href === "#") return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 82;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }

  // ============================================================
  // FOOTER 3D SHOWCASE (Cube, Icosahedron, Octahedron canvas)
  // ============================================================
  function setupFooter3DShowcase() {
    var canvas = document.querySelector(".footer-3d-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var animationId;

    function normalize(v) {
      var x = v[0], y = v[1], z = v[2];
      var d = Math.sqrt(x * x + y * y + z * z);
      return d === 0 ? [0, 0, 0] : [x / d, y / d, z / d];
    }

    var shapesData = [
      {
        vertices: [
          [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5],
          [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5]
        ],
        edges: [
          [0, 1], [1, 3], [3, 2], [2, 0],
          [4, 5], [5, 7], [7, 6], [6, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ],
        color: '#863bff'
      },
      {
        vertices: (function () {
          var phi = (1 + Math.sqrt(5)) / 2;
          return [
            [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
            [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
            [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
          ].map(function (v) {
            var norm = normalize(v);
            return [norm[0] * 0.72, norm[1] * 0.72, norm[2] * 0.72];
          });
        })(),
        edges: [
          [0, 8], [0, 10], [0, 4], [0, 6], [0, 2],
          [1, 9], [1, 11], [1, 4], [1, 6], [1, 3],
          [2, 8], [2, 10], [2, 5], [2, 7], [2, 3],
          [3, 9], [3, 11], [3, 5], [3, 7],
          [4, 8], [4, 9], [4, 6],
          [5, 8], [5, 9], [5, 7],
          [6, 10], [6, 11],
          [7, 10], [7, 11],
          [8, 9], [10, 11]
        ],
        color: '#ab7fff'
      },
      {
        vertices: [
          [0.7, 0, 0], [-0.7, 0, 0],
          [0, 0.7, 0], [0, -0.7, 0],
          [0, 0, 0.7], [0, 0, -0.7]
        ],
        edges: [
          [0, 2], [2, 1], [1, 3], [3, 0],
          [4, 0], [4, 1], [4, 2], [4, 3],
          [5, 0], [5, 1], [5, 2], [5, 3]
        ],
        color: '#47bfff'
      }
    ];

    var state = [
      { rx: 0.1, ry: 0.2, speedX: 0.005, speedY: 0.007 },
      { rx: 0.3, ry: 0.1, speedX: 0.004, speedY: 0.006 },
      { rx: 0.2, ry: 0.3, speedX: 0.006, speedY: 0.005 }
    ];

    var mouse = { x: 0, y: 0, isHovered: false, activeShape: -1 };

    function resizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;

      var width = rect.width;
      var xPercent = mouse.x / width;
      if (xPercent < 0.38) {
        mouse.activeShape = 0;
      } else if (xPercent < 0.62) {
        mouse.activeShape = 1;
      } else {
        mouse.activeShape = 2;
      }
    });

    canvas.addEventListener("mouseleave", function () {
      mouse.isHovered = false;
      mouse.activeShape = -1;
    });

    function render() {
      var width = canvas.width / (window.devicePixelRatio || 1);
      var height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);

      // Draw blueprint grid background
      ctx.strokeStyle = mouse.isHovered ? '#e8e6eb' : '#f4f3f6';
      ctx.lineWidth = 1;
      var gridSize = 20;
      for (var x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (var y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw each shape
      shapesData.forEach(function (shape, index) {
        var rot = state[index];
        var isSelected = mouse.activeShape === index;

        if (isSelected) {
          var targetSpeedX = (mouse.y - height / 2) * 0.0002;
          var targetSpeedY = (mouse.x - (width * (index === 0 ? 0.22 : index === 1 ? 0.5 : 0.78))) * 0.0002;
          rot.speedX += (targetSpeedX - rot.speedX) * 0.1;
          rot.speedY += (targetSpeedY - rot.speedY) * 0.1;
        } else {
          rot.speedX += ((0.004 + index * 0.001) - rot.speedX) * 0.05;
          rot.speedY += ((0.005 - index * 0.001) - rot.speedY) * 0.05;
        }

        rot.rx += rot.speedX;
        rot.ry += rot.speedY;

        var centerX = width * 0.22;
        if (index === 1) centerX = width * 0.5;
        if (index === 2) centerX = width * 0.78;
        var centerY = height / 2;
        var size = Math.min(width / 3.5, height) * 0.42;

        var cx = Math.cos(rot.rx);
        var sx = Math.sin(rot.rx);
        var cy = Math.cos(rot.ry);
        var sy = Math.sin(rot.ry);

        var projected = shape.vertices.map(function (v) {
          var x = v[0], y = v[1], z = v[2];
          var x1 = x * cy - z * sy;
          var z1 = x * sy + z * cy;
          var y2 = y * cx - z1 * sx;
          var z2 = y * sx + z1 * cx;
          var depth = 2.0;
          var factor = depth / (depth + z2);
          return {
            x: centerX + x1 * factor * size,
            y: centerY + y2 * factor * size,
            z: z2
          };
        });

        // Draw Edges
        shape.edges.forEach(function (edge) {
          var p1 = projected[edge[0]];
          var p2 = projected[edge[1]];
          if (!p1 || !p2) return;

          var avgZ = (p1.z + p2.z) / 2;
          var depthAlpha = Math.max(0.15, Math.min(1.0, 1.0 - (avgZ + 0.5) / 1.5));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = isSelected ? 1.8 : 1.0;
          ctx.globalAlpha = depthAlpha * (isSelected ? 1.0 : 0.75);

          if (isSelected) {
            ctx.shadowColor = shape.color;
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        });

        // Draw Vertices
        projected.forEach(function (p) {
          var depthAlpha = Math.max(0.15, Math.min(1.0, 1.0 - (p.z + 0.5) / 1.5));
          var radius = (isSelected ? 3.5 : 2.0) * depthAlpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = shape.color;
          ctx.globalAlpha = depthAlpha;

          if (isSelected) {
            ctx.shadowColor = shape.color;
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        });
      });

      animationId = requestAnimationFrame(render);
    }

    render();
  }
})();
