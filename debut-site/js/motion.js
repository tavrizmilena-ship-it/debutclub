/* Motion language: smooth scroll, the hero's camera move into the glowing
   screen, staggered reveals, image masks, gentle parallax. */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  document.body.classList.remove('is-loading');

  /* ---------- graceful fallback: no GSAP → everything visible ---------- */
  if (!hasGSAP) { document.documentElement.classList.remove('js'); return; }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2), smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  window.DEBUT_lenis = lenis;

  /* ---------- split headings into words ---------- */
  document.querySelectorAll('.split').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true"><span>${w}</span></span>`).join(' ');
  });

  if (reduce) {
    document.documentElement.classList.remove('js');
    return; // static, readable presentation; nav.js still works
  }

  /* ---------- hero: intro ---------- */
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.hero__sky', { opacity: 0, duration: 2 }, 0)
    .from('.hero__layer--far', { yPercent: 12, opacity: 0, duration: 1.8 }, 0.1)
    .from('.hero__layer--mid', { yPercent: 10, opacity: 0, duration: 1.8 }, 0.25)
    .from('.hero__layer--near', { yPercent: 25, duration: 1.8 }, 0.35)
    .from('.hero__welcome', { y: 24, opacity: 0, duration: 1.2 }, 0.5)
    .from('.hero__logo', { y: 40, scale: 0.94, opacity: 0, filter: 'blur(10px)', duration: 1.6 }, 0.65)
    .from(['.hero__lead', '.hero__small'], { y: 20, opacity: 0, duration: 1.1, stagger: 0.15 }, 1.1)
    .from('.scroll-cue', { opacity: 0, y: 10, duration: 0.8 }, 1.6);

  /* ---------- hero: camera move into the screen ---------- */
  const stage = document.querySelector('.hero__stage');
  const mid = document.querySelector('.hero__layer--mid');
  const portal = document.querySelector('.hero__portal');
  const SCREEN = { x: 1012, y: 460 }; // screen centre in the SVG viewBox (1600×640, xMidYMax slice)
  let P = { x: 0, y: 0, r: 0 };
  function measure() {
    const W = mid.clientWidth, H = mid.clientHeight;
    const s = Math.max(W / 1600, H / 640);
    const lx = (W - 1600 * s) / 2 + SCREEN.x * s;
    const ly = H - 640 * s + SCREEN.y * s;
    const top = stage.clientHeight - H;
    P = { x: lx, y: top + ly, r: Math.hypot(Math.max(lx, stage.clientWidth - lx), Math.max(top + ly, stage.clientHeight - top - ly)) * 1.05 };
    gsap.set(mid, { transformOrigin: `${lx}px ${ly}px` });
    gsap.set('.hero__layer--far', { transformOrigin: `${lx}px ${ly}px` });
  }
  measure();
  const portalState = { r: 0 };
  const drawPortal = () => { portal.style.clipPath = `circle(${portalState.r}px at ${P.x}px ${P.y}px)`; };
  drawPortal();

  const heroTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '#hero', start: 'top top', end: '+=120%', pin: true, scrub: 0.7, anticipatePin: 1,
      onRefreshInit: measure, onRefresh: drawPortal,
    },
  });
  heroTl
    .to('.scroll-cue', { opacity: 0, duration: 0.08 }, 0)
    .to('.hero__top', { yPercent: -30, opacity: 0, duration: 0.45 }, 0)
    .to('.hero__sky', { opacity: 0.35, duration: 1 }, 0)
    .to('.hero__aurora', { opacity: 0, duration: 0.8 }, 0)
    .to('.hero__layer--far', { scale: 1.25, y: -20, duration: 1 }, 0)
    .to(mid, { scale: 2.6, duration: 1, ease: 'power1.in' }, 0)
    .to('.hero__layer--near', { yPercent: 55, scale: 1.25, duration: 0.8 }, 0)
    .to(portalState, { r: () => P.r, duration: 0.5, ease: 'power2.in', onUpdate: drawPortal }, 0.5);

  /* ---------- past-hero state (brand mark appears) ---------- */
  ScrollTrigger.create({
    trigger: '#room', start: 'top 60%',
    onToggle: (self) => document.body.classList.toggle('past-hero', self.isActive || self.progress > 0),
    onUpdate: (self) => document.body.classList.toggle('past-hero', self.progress > 0),
  });

  /* ---------- headings ---------- */
  document.querySelectorAll('.split').forEach((el) => {
    if (el.closest('#hero')) return;
    gsap.from(el.querySelectorAll('.w > span'), {
      yPercent: 110, rotate: 3, duration: 1.1, ease: 'power4.out', stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    });
  });

  /* ---------- reveals ---------- */
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%',
    onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, overwrite: true }),
  });
  ScrollTrigger.batch('.mask-reveal', {
    start: 'top 92%',
    onEnter: (b) => gsap.to(b, { clipPath: 'inset(0% 0 0 0 round 18px)', duration: 1.3, ease: 'expo.out', stagger: 0.12 }),
  });
  // safety net: anything above the fold after a jump gets revealed
  ScrollTrigger.addEventListener('refresh', () => {
    document.querySelectorAll('.reveal, .mask-reveal').forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) gsap.set(el, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 18px)' });
    });
  });

  /* ---------- parallax ---------- */
  gsap.utils.toArray('.founders__ph img').forEach((img, i) => {
    gsap.fromTo(img, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.utils.toArray('.poster').forEach((p) => {
    const s = parseFloat(p.dataset.speed || 0);
    gsap.to(p, { yPercent: s * -160, ease: 'none', scrollTrigger: { trigger: '.posters', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.from('.poster', { y: 120, opacity: 0, rotate: (i) => (i % 2 ? 6 : -6), duration: 1.2, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.posters', start: 'top 85%' } });
  gsap.utils.toArray('.vocab').forEach((v, i) => {
    gsap.fromTo(v, { y: 60 * (i + 1) }, { y: -30 * (i + 1), ease: 'none', scrollTrigger: { trigger: '.clubs__vocab', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.fromTo('.weeks__img', { y: 80, rotate: 5 }, { y: -40, rotate: 1.8, ease: 'none', scrollTrigger: { trigger: '.weeks__grid', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.card', { rotateX: 18, rotateY: -14, y: 80, opacity: 0, transformPerspective: 1200, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.card', start: 'top 85%' } });
  gsap.from('.qa__logo', { scale: 0.8, opacity: 0, y: 60, filter: 'blur(12px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '#qa', start: 'top 60%' } });

  /* tilt on the membership card */
  const card = document.querySelector('.card');
  if (card && matchMedia('(hover: hover)').matches) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      gsap.to(card, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8, transformPerspective: 1200, duration: 0.6 });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8 }));
  }

  /* pause videos off-screen to save CPU during screen sharing */
  document.querySelectorAll('video').forEach((v) => {
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { v.play().catch(() => {}); } else v.pause(); }).observe(v);
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();

/* ---------- non-motion interactions (always on) ---------- */
(function () {
  /* site previews: cycle screenshots while visible */
  document.querySelectorAll('.site__shots').forEach((box) => {
    const shots = box.querySelectorAll('.site__shot');
    if (shots.length < 2) return;
    let i = 0, timer = null;
    const step = () => { shots[i].classList.remove('is-on'); i = (i + 1) % shots.length; shots[i].classList.add('is-on'); };
    new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(step, 2800);
    }, { threshold: 0.3 }).observe(box);
  });

  /* glass tabs (section 06) */
  const tabs = [...document.querySelectorAll('.itab')];
  const select = (t, focus) => {
    tabs.forEach((x) => {
      const on = x === t;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(x.getAttribute('aria-controls'));
      panel.hidden = !on; panel.classList.toggle('is-active', on);
      if (on && window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(panel.querySelector('.ipanel__text'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
        gsap.fromTo(panel.querySelectorAll('.glass-shot, .placeholder'), { y: 50, opacity: 0, rotate: (k) => (k ? 6 : -6) }, { y: 0, opacity: 1, rotate: (k) => (k ? 3 : -3), duration: 0.9, ease: 'expo.out', stagger: 0.08, clearProps: 'rotate' });
      }
    });
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault(); e.stopPropagation();
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        select(tabs[n], true);
      }
    });
  });
  window.DEBUT_selectTab = (k) => { const t = tabs[k]; if (t) select(t); };

  /* lightbox */
  const lb = document.querySelector('.lightbox');
  const lbImg = lb.querySelector('img');
  let lastFocus = null;
  const open = (src, alt) => {
    lastFocus = document.activeElement;
    lbImg.src = src; lbImg.alt = alt || '';
    lb.hidden = false; window.DEBUT_lenis && window.DEBUT_lenis.stop();
    lb.querySelector('.lightbox__close').focus();
  };
  const close = () => { lb.hidden = true; lbImg.removeAttribute('src'); window.DEBUT_lenis && window.DEBUT_lenis.start(); lastFocus && lastFocus.focus(); };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lightbox]');
    if (t) { e.preventDefault(); open(t.dataset.lightbox, t.querySelector('img')?.alt); }
  });
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lightbox__close')) close(); });
  window.DEBUT_closeOverlays = () => { if (!lb.hidden) { close(); return true; } return false; };
})();
