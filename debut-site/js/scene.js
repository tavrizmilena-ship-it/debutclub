/* Original hero illustration, drawn as layered SVG for parallax.
   A person seen from behind at a warmly glowing laptop, stacks of books,
   a night meadow. Seeded randomness keeps it identical on every load. */
(function () {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const VB = 'viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax slice"';

  function far() {
    return `<svg ${VB}>
      <defs>
        <linearGradient id="hillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b4a5c"/><stop offset="1" stop-color="#10283a"/></linearGradient>
        <linearGradient id="hillB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#173a50"/><stop offset="1" stop-color="#0c1f2f"/></linearGradient>
      </defs>
      <path d="M0 470 C 180 400 330 430 470 410 C 640 385 760 440 900 420 C 1080 395 1230 380 1380 410 C 1480 430 1550 420 1600 410 L1600 640 L0 640Z" fill="url(#hillA)" opacity=".75"/>
      <path d="M0 520 C 220 470 380 500 560 480 C 760 458 920 500 1120 478 C 1300 460 1460 490 1600 470 L1600 640 L0 640Z" fill="url(#hillB)"/>
      ${Array.from({ length: 14 }, (_, i) => {
        const x = 40 + i * 118 + rnd() * 40, h = 30 + rnd() * 50, y = 495 - rnd() * 25;
        return `<path d="M${x} ${y} q 8 ${-h} 16 0 z" fill="#0d2233" opacity=".9"/>`;
      }).join('')}
    </svg>`;
  }

  function books(x, y, n, tilt = 0) {
    const cols = ['#7a4b2e', '#912A2D', '#357D77', '#c9a46a', '#203D57', '#5b3a29', '#a8743f'];
    let out = '', cy = y;
    for (let i = 0; i < n; i++) {
      const w = 120 + rnd() * 50, h = 16 + rnd() * 10, dx = (rnd() - 0.5) * 18;
      const c = cols[Math.floor(rnd() * cols.length)];
      out += `<g transform="rotate(${tilt + (rnd() - .5) * 3} ${x + dx} ${cy})">
        <rect x="${x + dx - w / 2}" y="${cy - h}" width="${w}" height="${h}" rx="2.5" fill="${c}" />
        <rect x="${x + dx - w / 2}" y="${cy - h}" width="${w}" height="${h}" rx="2.5" fill="url(#bookShade)" />
        <rect x="${x + dx - w / 2 + 6}" y="${cy - h + 3}" width="${w - 12}" height="2" fill="#f8e2b9" opacity=".18"/>
      </g>`;
      cy -= h + 1;
    }
    return out;
  }

  function mid() {
    seed = 11;
    return `<svg ${VB}>
      <defs>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14344a"/><stop offset="1" stop-color="#07131d"/></linearGradient>
        <linearGradient id="bookShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".55" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#ffcf7a" stop-opacity=".35"/></linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#08141f"/><stop offset=".7" stop-color="#132535"/><stop offset="1" stop-color="#5a4433"/></linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a121b"/><stop offset=".75" stop-color="#1d1a1c"/><stop offset="1" stop-color="#7a5232"/></linearGradient>
        <radialGradient id="screenGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".95"/><stop offset=".35" stop-color="#fbcb3e" stop-opacity=".35"/><stop offset="1" stop-color="#fbcb3e" stop-opacity="0"/></radialGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8e6"/><stop offset="1" stop-color="#ffd98a"/></linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
      </defs>
      <!-- meadow -->
      <path d="M0 560 C 260 535 520 548 800 540 C 1080 532 1340 546 1600 532 L1600 640 L0 640Z" fill="url(#ground)"/>
      <!-- glow pool -->
      <ellipse class="glow-pool" cx="990" cy="470" rx="420" ry="230" fill="url(#screenGlow)" opacity=".85"/>
      <!-- books left -->
      ${books(430, 556, 7, -1)}
      ${books(300, 560, 4, 1)}
      <!-- books right -->
      ${books(1250, 552, 9, 1)}
      ${books(1380, 558, 5, -1)}
      <!-- low table -->
      <rect x="820" y="520" width="330" height="10" rx="3" fill="#2b1d16"/>
      <rect x="840" y="530" width="10" height="34" fill="#1c130f"/><rect x="1120" y="530" width="10" height="34" fill="#1c130f"/>
      <!-- laptop -->
      <g class="laptop">
        <path d="M905 520 L1105 520 L1120 528 L890 528Z" fill="#3a2c22"/>
        <path d="M930 520 L944 400 L1090 400 L1080 520Z" fill="#1d1612"/>
        <path id="heroScreen" class="hero-screen" d="M940 513 L952 408 L1082 408 L1073 513Z" fill="url(#screen)"/>
        <path d="M940 513 L952 408 L1082 408 L1073 513Z" fill="#fff" opacity=".35" filter="url(#soft)"/>
        <g opacity=".55">
          <rect x="962" y="425" width="58" height="5" rx="2" fill="#c98b3c"/>
          <rect x="962" y="438" width="92" height="3" rx="1.5" fill="#d9a35a"/>
          <rect x="961" y="447" width="80" height="3" rx="1.5" fill="#d9a35a"/>
          <rect x="960" y="456" width="86" height="3" rx="1.5" fill="#d9a35a"/>
          <rect x="1004" y="470" width="48" height="30" rx="3" fill="#e9b867"/>
        </g>
      </g>
      <!-- mug -->
      <g><rect x="1132" y="494" width="22" height="26" rx="4" fill="#912A2D"/><path d="M1154 500 q 12 6 0 14" stroke="#912A2D" stroke-width="4" fill="none"/>
      <path class="steam" d="M1140 488 q -6 -12 2 -22 q 8 -10 0 -22" stroke="#f8e2b9" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/></g>
      <!-- person, seen from behind, turned slightly toward the screen -->
      <g class="person-fig">
        <!-- sweater / shoulders -->
        <path d="M704 566 C 700 506 708 462 742 442 C 764 430 786 424 806 424 C 830 424 854 430 874 444 C 902 464 908 510 906 566Z" fill="url(#body)"/>
        <!-- arm reaching to keyboard -->
        <path d="M880 468 C 906 486 926 502 950 515" stroke="#172b3c" stroke-width="20" stroke-linecap="round" fill="none"/>
        <path d="M886 458 C 910 474 930 490 952 505" stroke="#f3b25c" stroke-width="2.4" opacity=".5" fill="none" filter="url(#soft)"/>
        <path d="M874 446 C 896 462 906 500 906 560" stroke="#f3b25c" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round" filter="url(#soft)"/>
        <!-- neck -->
        <path d="M790 400 L 820 400 L 822 428 L 788 428Z" fill="#0d1924"/>
        <!-- long hair falling down the back -->
        <path d="M762 338 C 760 304 780 286 806 286 C 834 286 852 306 851 338 C 850 370 856 404 864 440 C 846 452 776 454 750 442 C 758 408 763 372 762 338Z" fill="url(#hair)"/>
        <path d="M790 300 C 784 340 786 400 778 446 M812 296 C 812 350 818 400 822 450" stroke="#2a2326" stroke-width="1.4" fill="none" opacity=".7"/>
        <path d="M842 304 C 852 330 850 372 856 404 C 858 420 862 432 864 440" stroke="#f3b25c" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round" filter="url(#soft)"/>
        <path d="M826 289 C 836 292 844 298 848 308" stroke="#ffd98a" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
      </g>
      <!-- cushion -->
      <ellipse cx="800" cy="566" rx="110" ry="16" fill="#0b1823"/>
    </svg>`;
  }

  function near() {
    seed = 23;
    const warm = ['#fbcb3e', '#f6a23c', '#f8e2b9', '#e8763a', '#ffd98a'];
    let stems = '', blooms = '';
    for (let i = 0; i < 110; i++) {
      const x = rnd() * 1600;
      const h = 60 + rnd() * 150;
      const bend = (rnd() - .5) * 60;
      const d = Math.abs(x - 990) / 800; // distance from the screen → less light
      const lit = Math.max(0, 1 - d);
      stems += `<path d="M${x} 650 q ${bend / 2} ${-h / 2} ${bend} ${-h}" stroke="${lit > .45 ? '#2f4a2f' : '#0f2230'}" stroke-width="${1.2 + rnd() * 1.6}" fill="none" opacity=".95"/>`;
      if (rnd() < .82) {
        const bx = x + bend, by = 650 - h;
        const c = warm[Math.floor(rnd() * warm.length)];
        const r = 3 + rnd() * 6;
        const op = (0.25 + lit * 0.75).toFixed(2);
        const petals = 5;
        let p = '';
        for (let k = 0; k < petals; k++) {
          const a = (k / petals) * Math.PI * 2 + rnd();
          p += `<circle cx="${(bx + Math.cos(a) * r * .9).toFixed(1)}" cy="${(by + Math.sin(a) * r * .9).toFixed(1)}" r="${(r * .7).toFixed(1)}"/>`;
        }
        blooms += `<g class="bloom" fill="${lit > .25 ? c : '#2a3f52'}" opacity="${op}">${p}<circle cx="${bx}" cy="${by}" r="${(r * .45).toFixed(1)}" fill="#7a4b2e"/></g>`;
      }
    }
    // grass blades
    let grass = '';
    for (let i = 0; i < 220; i++) {
      const x = rnd() * 1600, h = 20 + rnd() * 70, b = (rnd() - .5) * 30;
      grass += `<path d="M${x} 650 q ${b / 3} ${-h / 2} ${b} ${-h} q ${-b / 3} ${h / 2} ${-b / 2 + 3} ${h}" fill="#0a1a26"/>`;
    }
    return `<svg ${VB}><g class="sway">${stems}${blooms}</g>${grass}
      <rect x="0" y="600" width="1600" height="50" fill="#07131d"/></svg>`;
  }

  window.DEBUT_SCENE = { far, mid, near };
})();
