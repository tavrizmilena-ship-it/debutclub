/* Starry sky + floating warm particles on a canvas.
   Pauses when off-screen; draws a single static frame under reduced motion. */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function Sky(canvas, opts = {}) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w, h, stars = [], motes = [], running = false, raf = 0, t0 = performance.now();
    const density = opts.density || 1;
    let ox = 0, oy = 0; // pointer parallax offset

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 2600 * density);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h * (opts.skyHeight || 0.85),
        r: Math.random() < 0.06 ? 1.1 + Math.random() * 0.9 : 0.25 + Math.random() * 0.7,
        p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.6, z: Math.random(),
      }));
      motes = Array.from({ length: Math.round(28 * density) }, () => mote(true));
      if (!running) draw(performance.now());
    }
    function mote(initial) {
      return {
        x: Math.random() * w, y: initial ? h * (0.45 + Math.random() * 0.55) : h + 10,
        vx: (Math.random() - 0.5) * 0.12, vy: -(0.05 + Math.random() * 0.18),
        r: 0.8 + Math.random() * 1.8, life: Math.random(), warm: Math.random() < 0.75,
      };
    }
    function draw(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.s + s.p);
        ctx.globalAlpha = tw * (0.5 + s.z * 0.5);
        const x = s.x + ox * s.z * 10, y = s.y + oy * s.z * 6;
        ctx.fillStyle = s.r > 1 ? '#fff6dc' : '#dfe8f5';
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.3) {
          ctx.globalAlpha = tw * 0.15;
          ctx.beginPath(); ctx.arc(x, y, s.r * 4, 0, 6.283); ctx.fill();
        }
      }
      for (const m of motes) {
        if (!reduce) { m.x += m.vx + Math.sin(t * 0.6 + m.life * 9) * 0.08; m.y += m.vy; m.life += 0.002; }
        if (m.y < h * 0.25 || m.x < -10 || m.x > w + 10) Object.assign(m, mote(false));
        const a = Math.max(0, Math.sin(m.life * Math.PI * 2) * 0.5 + 0.5) * 0.8;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        const col = m.warm ? '251,203,62' : '223,232,245';
        g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`);
        ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 4, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function loop(now) { draw(now); raf = requestAnimationFrame(loop); }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '100px' }).observe(canvas);
    if (opts.pointer && !reduce) {
      addEventListener('pointermove', (e) => { ox = e.clientX / innerWidth - 0.5; oy = e.clientY / innerHeight - 0.5; }, { passive: true });
    }
    resize();
  }

  const heroSky = document.querySelector('.hero__sky');
  if (heroSky) Sky(heroSky, { pointer: true, skyHeight: 0.75 });
  const qaSky = document.querySelector('.qa__sky');
  if (qaSky) Sky(qaSky, { density: 0.8, skyHeight: 1 });
})();
