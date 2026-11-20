/* Speaker navigation: dots, progress, current-section chip, keyboard,
   presentation mode, full screen, help overlay. */
(function () {
  const C = window.DEBUT;
  const sections = C.sections.map((s) => ({ ...s, el: document.getElementById(s.id) })).filter((s) => s.el);
  const body = document.body;
  const lenis = () => window.DEBUT_lenis;
  let active = 0;
  let pending = null; // target index while a jump is animating (makes rapid key presses predictable)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  /* ---------- dots ---------- */
  const dots = document.querySelector('.dots');
  dots.innerHTML = sections.map((s, i) => `<a href="#${s.id}" data-goto="${s.id}" aria-label="${s.num} ${s.label}"><span>${s.num} · ${s.label}</span><i></i></a>`).join('');
  const dotLinks = [...dots.querySelectorAll('a')];
  const chipN = document.querySelector('.chip-now__n');
  const chipL = document.querySelector('.chip-now__l');

  function setActive(i) {
    if (i === active && dotLinks[i].classList.contains('is-active')) return;
    active = i;
    dotLinks.forEach((a, k) => { a.classList.toggle('is-active', k === i); if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    chipN.textContent = sections[i].num;
    chipL.textContent = sections[i].label;
    body.classList.toggle('on-light', sections[i].el.dataset.theme === 'light');
    body.classList.toggle('past-hero', i > 0);
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo('.brand img', { rotate: -3, scale: 0.94 }, { rotate: 0, scale: 1, duration: 1.1, ease: 'power3.out', overwrite: true });
    }
  }

  /* ---------- active section tracking ---------- */
  function currentIndex() {
    const mid = innerHeight * 0.5;
    let idx = 0;
    sections.forEach((s, i) => { if (s.el.getBoundingClientRect().top <= mid) idx = i; });
    // hero is pinned: while its pin is active keep it as 00
    return idx;
  }
  const progress = document.querySelector('.progress span');
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    progress.style.transform = `scaleX(${p})`;
    if (pending === null) setActive(currentIndex());
  }
  if (lenis()) lenis().on('scroll', onScroll);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- go to ---------- */
  function topOf(i) {
    if (i === 0) return 0;
    return sections[i].el.getBoundingClientRect().top + scrollY;
  }
  function scrollToY(y, dist, done) {
    const l = lenis();
    if (l) l.scrollTo(y, { duration: Math.min(2.2, 0.9 + Math.abs(dist) / innerHeight * 0.18), force: true, onComplete: done });
    else { scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setTimeout(() => done && done(), 900); }
  }
  function go(i) {
    i = Math.max(0, Math.min(sections.length - 1, i));
    const y = topOf(i);
    pending = i;
    clearTimeout(go.t);
    go.t = setTimeout(() => { pending = null; onScroll(); }, 2600); // safety net
    scrollToY(y, y - scrollY, () => { if (pending === i) { pending = null; clearTimeout(go.t); } });
    setActive(i);
  }
  ['wheel', 'touchstart'].forEach((ev) => addEventListener(ev, () => { pending = null; }, { passive: true }));
  const here = () => (pending !== null ? pending : currentIndex());
  window.DEBUT_go = go;

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-goto]');
    if (!a) return;
    e.preventDefault();
    go(sections.findIndex((s) => s.id === a.dataset.goto));
  });

  /* smart step: scroll inside long sections first, then move on */
  function step(dir) {
    if (pending !== null) return go(pending + dir);
    const i = currentIndex();
    const vh = innerHeight;
    if (dir > 0) {
      if (i === 0) return go(1);
      const r = sections[i].el.getBoundingClientRect();
      if (r.bottom > vh + 40) return scrollToY(scrollY + Math.min(vh * 0.8, r.bottom - vh), vh);
      return go(i + 1);
    } else {
      const r = sections[i].el.getBoundingClientRect();
      if (i > 0 && r.top < -40) return scrollToY(scrollY + Math.max(-vh * 0.8, r.top), vh);
      return go(i - 1);
    }
  }

  /* ---------- presentation mode / full screen / help ---------- */
  const presentBtn = document.querySelector('[data-action="present"]');
  function togglePresent(force) {
    const on = typeof force === 'boolean' ? force : !body.classList.contains('presenting');
    body.classList.toggle('presenting', on);
    presentBtn.setAttribute('aria-pressed', on);
    try { localStorage.setItem('debut-present', on ? '1' : '0'); } catch (e) {}
  }
  try { if (localStorage.getItem('debut-present') === '1') togglePresent(true); } catch (e) {}

  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }
  const help = document.querySelector('.help');
  function toggleHelp(force) {
    const show = typeof force === 'boolean' ? force : help.hidden;
    help.hidden = !show;
    if (show) help.querySelector('.btn').focus();
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-action]');
    if (!b) return;
    const a = b.dataset.action;
    if (a === 'next') go(here() + 1);
    if (a === 'prev') go(here() - 1);
    if (a === 'present') togglePresent();
    if (a === 'fullscreen') toggleFull();
    if (a === 'help') toggleHelp();
    if (a === 'help-close') toggleHelp(false);
  });
  help.addEventListener('click', (e) => { if (e.target === help) toggleHelp(false); });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag) || e.target.isContentEditable) return;
    if ((e.key === ' ' || e.key === 'Enter') && ['button', 'a'].includes(tag)) return;

    if (e.key === 'Escape') {
      if (!help.hidden) return toggleHelp(false);
      if (window.DEBUT_closeOverlays && window.DEBUT_closeOverlays()) return;
      return;
    }
    if (!help.hidden || !document.querySelector('.lightbox').hidden) return;

    const k = e.key;
    let handled = true;
    if (k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) step(1);
    else if (k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)) step(-1);
    else if (k === 'ArrowRight') go(here() + 1);
    else if (k === 'ArrowLeft') go(here() - 1);
    else if (k === 'Home') go(0);
    else if (k === 'End') go(sections.length - 1);
    else if (/^Digit[0-9]$/.test(e.code)) { const n = +e.code.slice(5); go(e.shiftKey ? 10 + n : n); }
    else if (k === 'p' || k === 'P' || k === 'з' || k === 'З') togglePresent();
    else if (k === 'f' || k === 'F' || k === 'а' || k === 'А') toggleFull();
    else if (k === '?' || (k === '/' && e.shiftKey)) toggleHelp();
    else handled = false;
    if (handled) e.preventDefault();
  });

  scrollTo(0, 0);
  onScroll();
  setActive(0);
})();
