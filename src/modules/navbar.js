// ── Feature detection ──
const IS_TOUCH   = window.matchMedia('(hover: none)').matches;
const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initNavbar() {
  const scrollBar = document.getElementById('scroll-bar');
  const navbarEl  = document.getElementById('navbar');
  const heroScrollEl = document.querySelector('.hero-scroll');

  // ── Hero instant fade-in on load ──
  window.addEventListener('load', () => {
    document.querySelectorAll('#hero .fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120);
    });
    // Word reveal
    document.querySelectorAll('.hero-word').forEach((w, i) => {
      setTimeout(() => w.classList.add('revealed'), 200 + i * 80);
    });
  });

  // ── Scroll-triggered fade-ins ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Section word reveal for headings
        entry.target.querySelectorAll('.section-word').forEach(sw => {
          sw.classList.add('section-word-revealed');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in:not(#hero .fade-in):not(.timeline-step)').forEach(el => {
    observer.observe(el);
  });

  // ── Section word observer (standalone headings without fade-in) ──
  const sectionWordObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.section-word').forEach(sw => {
          sw.classList.add('section-word-revealed');
        });
        sectionWordObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Observe headings that have section-word children but no fade-in
  document.querySelectorAll('[data-i18n-html="about.heading"]').forEach(el => {
    if (!el.classList.contains('fade-in')) sectionWordObserver.observe(el);
  });

  // ── Timeline observer ──
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineFill = document.querySelector('.timeline-line-fill');
  let visibleStepCount = 0;

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        visibleStepCount++;
        if (timelineFill && !IS_REDUCED) {
          timelineFill.style.height = (visibleStepCount / timelineSteps.length * 100) + '%';
        }
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  timelineSteps.forEach(step => timelineObserver.observe(step));

  // ── Count-up animation ──
  function animateCount(el) {
    const target = parseInt(el.dataset.countTarget, 10);
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const duration = 2000;
    const start = performance.now();
    el.classList.add('counted');
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        if (!IS_REDUCED) animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.result-number[data-count-target]').forEach(el => {
    countObserver.observe(el);
  });

  // ── Scroll: progress bar + navbar + scroll spy + parallax ──
  function handleNavbarScroll(t) {
    navbarEl.classList.toggle('scrolled', t > 80);
  }

  const NAV_SECTIONS = ['services','how-we-work','about','contact'];
  const navLinks = {};
  NAV_SECTIONS.forEach(id => {
    const a = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (a) navLinks[id] = a;
  });
  function handleScrollSpy(t) {
    let current = '';
    NAV_SECTIONS.forEach(id => {
      const s = document.getElementById(id);
      if (s && s.offsetTop - 130 <= t) current = id;
    });
    Object.entries(navLinks).forEach(([id, a]) =>
      a.classList.toggle('nav-active', id === current));
  }

  function handleHeroParallax(t) {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent || t > window.innerHeight) return;
    heroContent.style.transform = `translateY(${t * 0.25}px)`;
    heroContent.style.opacity   = 1 - (t / window.innerHeight) * 1.2;
  }

  const CREAM_SECTIONS = ['services', 'about', 'contact'];
  function handleCreamCursor(t) {
    const mid = t + window.innerHeight / 2;
    let isOnCream = false;
    CREAM_SECTIONS.forEach(id => {
      const s = document.getElementById(id);
      if (s && mid >= s.offsetTop && mid < s.offsetTop + s.offsetHeight) {
        isOnCream = true;
      }
    });
    document.body.classList.toggle('on-cream', isOnCream);
  }

  function onScroll() {
    const t = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.transform = `scaleX(${h > 0 ? t / h : 0})`;
    handleNavbarScroll(t);
    handleScrollSpy(t);
    if (!IS_TOUCH) handleHeroParallax(t);
    if (!IS_TOUCH) handleCreamCursor(t);
    if (heroScrollEl) heroScrollEl.style.opacity = t > 80 ? '0' : '';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  // initialise navbar state on load
  handleNavbarScroll(window.scrollY);

  // ── Mobile hamburger toggle ──
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  const mobileLinks = document.querySelectorAll('.mobile-link, #mobileMenu .btn-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
