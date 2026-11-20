/* Builds every section from window.DEBUT (js/content.js). */
(function () {
  const C = window.DEBUT;
  // section numbers follow the order in content.js → sections
  C.sections.forEach((s, i) => { s.num = String(i).padStart(2, '0'); });
  const N = (id) => C.sections.find((s) => s.id === id).num;
  const U = C.ui;
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const img = (src, alt, cls = '', eager = false) =>
    `<img class="${cls}" src="${src}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

  const isSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);

  /* Fluffy logo: transparent video where supported, transparent still elsewhere */
  function fluffy(cls = '', eager = false) {
    const still = C.logo.still;
    const canVideo = !isSafari && document.createElement('video').canPlayType('video/webm; codecs="vp9"');
    const media = canVideo
      ? `<video class="fluffy__media" autoplay muted loop playsinline preload="${eager ? 'auto' : 'none'}" poster="${still}" aria-hidden="true">
           <source src="${C.logo.video}" type="video/webm">
         </video>`
      : `<img class="fluffy__media" src="${still}" alt="" aria-hidden="true" ${eager ? '' : 'loading="lazy"'}>`;
    return `<div class="fluffy ${cls}" role="img" aria-label="DÉBUT"><div class="fluffy__float">${media}</div><div class="fluffy__shadow"></div></div>`;
  }
  window.DEBUT_fluffy = fluffy;

  const head = (num, title, extra = '') => `
    <header class="sec-head">
      <span class="sec-num" aria-hidden="true">${num}</span>
      <h2 class="sec-title split">${esc(title)}</h2>
      ${extra}
    </header>`;

  const ext = `<svg class="ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ------------------------------------------------------------ HERO */
  function hero() {
    const h = C.hero;
    return `
<section id="hero" class="scene scene--night hero" data-theme="dark" aria-label="${esc(h.title)}">
  <div class="hero__stage">
    <canvas class="hero__sky" aria-hidden="true"></canvas>
    <div class="hero__aurora" aria-hidden="true"></div>
    <div class="hero__top">
      <h1 class="hero__title"><span class="sr-only">${esc(h.title)}</span>
        <span class="hero__welcome" aria-hidden="true">${esc(h.welcome)}</span>
        ${fluffy('hero__logo', true)}
      </h1>
      <p class="hero__lead">${esc(h.lead)}</p>
      <p class="hero__small">${esc(h.small)}</p>
    </div>
    <div class="hero__layer hero__layer--far" aria-hidden="true">${window.DEBUT_SCENE.far()}</div>
    <div class="hero__layer hero__layer--mid" aria-hidden="true">${window.DEBUT_SCENE.mid()}</div>
    <div class="hero__layer hero__layer--near" aria-hidden="true">${window.DEBUT_SCENE.near()}</div>
    <div class="hero__portal" aria-hidden="true"></div>
    <a class="scroll-cue" href="#room" data-goto="room">${esc(h.scroll)} <span aria-hidden="true">↓</span></a>
  </div>
</section>`;
  }

  /* ------------------------------------------------------- 01 ROOM */
  function room() {
    const r = C.room;
    return `
<section id="room" class="scene scene--ivory room" data-theme="light" lang="en">
  <div class="wrap room__grid">
    <div class="room__intro">
      ${head(N('room'), r.title)}
      <p class="lead reveal">${esc(r.intro)}</p>
      <figure class="room__mascot reveal">
        ${img(C.logo.mascot, 'Debutik, the DÉBUT mascot, waving hello')}
        <figcaption>${esc(r.mascot)}</figcaption>
      </figure>
    </div>
    <ol class="prompts">
      ${r.prompts.map((p, i) => `<li class="prompt reveal" style="--i:${i}"><span class="prompt__n">${String(i + 1).padStart(2, '0')}</span><span class="prompt__q">${esc(p)}</span></li>`).join('')}
    </ol>
  </div>
  <p class="wrap room__note reveal"><span class="dot"></span>${esc(r.note)}</p>
</section>`;
  }

  /* --------------------------------------------------- 02 FOUNDERS */
  function founders() {
    const f = C.founders;
    return `
<section id="founders" class="scene scene--cream founders" data-theme="light">
  <div class="wrap">
    ${head(N('founders'), f.title)}
    <div class="founders__strip">
      ${f.photos.map((p, i) => `<figure class="founders__ph mask-reveal" style="--i:${i}">${img(p, `${f.photoAlt} ${i + 1}`)}</figure>`).join('')}
    </div>
    <div class="founders__text">
      <p class="founders__names reveal"><em>${esc(f.names)}</em><span>${esc(f.role)}</span></p>
      <div class="founders__copy">
        ${f.text.map((t) => `<p class="reveal">${esc(t)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>`;
  }

  /* ------------------------------------------------------- 03 TEAM */
  function person(p, big = false) {
    return `
      <article class="person ${big ? 'person--big' : ''} reveal">
        <div class="person__ph">${img(p.photo, `${p.name}, ${p.role}`)}</div>
        <div class="person__body">
          <p class="person__role">${esc(p.role)}</p>
          <h4 class="person__name">${esc(p.name)}${p.alias ? ` <span>/ ${esc(p.alias)}</span>` : ''}</h4>
          ${p.facts ? `<ul class="person__facts">${p.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
          ${p.teaser ? `<p class="person__teaser"><span class="spark">✦</span> ${esc(p.teaser)}</p>` : ''}
        </div>
      </article>`;
  }
  function team() {
    const t = C.team;
    return `
<section id="team" class="scene scene--navy team" data-theme="dark">
  <div class="wrap">
    ${head(N('team'), t.title, `<p class="lead reveal">${esc(t.lead)}</p>`)}
    ${t.groups.map((g) => `
      <div class="team__group ${g.duo ? 'team__group--duo' : ''}">
        <h3 class="team__label reveal"><span></span>${esc(g.name)}</h3>
        ${g.duo ? `
          <div class="duo reveal">
            <div class="duo__phs">${g.people.map((p, i) => `<figure class="duo__ph" style="--i:${i}">${img(p.photo, `${p.name}, ${p.role}`)}<figcaption>${esc(p.name)}</figcaption></figure>`).join('')}</div>
            <div class="duo__body">
              <p class="person__role">${esc(g.duoRole)}</p>
              <h4 class="person__name">${g.people.map((p) => esc(p.name)).join(' <i>и</i> ')}</h4>
              <p class="duo__text">${esc(g.duoText)}</p>
            </div>
          </div>` : `
          <div class="team__row team__row--${g.people.length}">${g.people.map((p) => person(p, g.people.length === 1)).join('')}</div>`}
      </div>`).join('')}
  </div>
</section>`;
  }

  /* ---------------------------------------------------- 04 CREATED */
  function created() {
    const c = C.created;
    return `
<section id="created" class="scene scene--ivory created" data-theme="light">
  <div class="wrap">
    ${head(N('created'), c.title, `<p class="lead reveal">${esc(c.lead)}</p>`)}
  </div>
  <div class="posters" aria-label="Анонсы Speaking Clubs">
    ${c.posters.map((p, i) => `<figure class="poster" style="--i:${i}" data-speed="${[0.06, -0.04, 0.09, -0.07, 0.03][i]}"><button class="poster__btn" data-lightbox="${p.src}" aria-label="${U.openImage}: ${esc(p.alt)}">${img(p.src, p.alt)}</button></figure>`).join('')}
  </div>
  <div class="wrap created__photos">
    <h3 class="created__sub reveal">${esc(c.photosTitle)}</h3>
    <div class="photo-grid">
      ${c.photos.map((p, i) => `<figure class="photo mask-reveal" style="--i:${i}"><button class="photo__btn" data-lightbox="${p.src}" aria-label="${U.openImage}: ${esc(p.alt)}">${img(p.src, p.alt)}</button></figure>`).join('')}
    </div>
  </div>
</section>`;
  }

  /* ---------------------------------------------------- REVIEWS
     Right after the interactive sites: clubs → sites → what people say */
  function reviews() {
    const r = C.reviews;
    const half = Math.ceil(r.items.length / 2);
    const rowA = r.items.slice(0, half), rowB = r.items.slice(half);
    const reviewRow = (arr, dir) => `
      <div class="marquee marquee--${dir}" tabindex="0" aria-label="${esc(r.title)}">
        <div class="marquee__track">
          ${[...arr, ...arr].map((src, i) => `<figure class="review" ${i >= arr.length ? 'aria-hidden="true"' : ''}>${img(src, r.alt)}</figure>`).join('')}
        </div>
      </div>`;
    return `
<section id="reviews" class="scene scene--ivory reviews" data-theme="light">
  <div class="wrap">
    ${head(N('reviews'), r.title, `<p class="lead reveal">${esc(r.lead)}</p>`)}
  </div>
  <div class="created__reviews">
    ${reviewRow(rowA, 'left')}
    ${reviewRow(rowB, 'right')}
  </div>
</section>`;
  }

  /* ------------------------------------------------------ 05 CLUBS */
  function clubs() {
    const c = C.clubs;
    return `
<section id="clubs" class="scene scene--cocoa clubs" data-theme="dark">
  <div class="wrap">
    ${head(N('clubs'), c.title, `<p class="lead reveal">${esc(c.lead)}</p>`)}
    <div class="clubs__top">
      <ul class="ingredients">
        ${c.ingredients.map((x, i) => `<li class="ingredient reveal" style="--i:${i}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(x)}</li>`).join('')}
      </ul>
      <div class="clubs__vocab">
        ${c.vocab.map((v, i) => `<button class="vocab vocab--${i} reveal" data-lightbox="${v.src}" aria-label="${U.openImage}: ${esc(v.alt)}">${img(v.src, v.alt)}</button>`).join('')}
      </div>
    </div>
    <p class="clubs__explain reveal">${esc(c.explain)}</p>
    <div class="sites">
      ${c.sites.map((s, i) => `
      <article class="site reveal" style="--i:${i}">
        <a class="site__link" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${U.openSite} ${esc(s.title)} в новой вкладке">
          <div class="site__browser">
            <div class="site__bar"><i></i><i></i><i></i><span>${esc(new URL(s.url).host)}</span></div>
            <div class="site__shots" data-count="${s.shots.length}">
              ${s.shots.map((sh, k) => img(sh, `Сайт ${s.title}, скриншот ${k + 1}`, `site__shot ${k === 0 ? 'is-on' : ''}`)).join('')}
            </div>
          </div>
          ${s.quiz ? `<div class="site__quiz">${img(s.quiz, `Квиз на сайте ${s.title}`)}</div>` : ''}
          <div class="site__meta">
            <span class="site__n">0${i + 1}</span>
            <h3 class="site__title">${esc(s.title)}</h3>
            ${s.tag ? `<span class="chip">${esc(s.tag)}</span>` : ''}
            <span class="site__open">${U.openSite} ${ext}</span>
          </div>
        </a>
      </article>`).join('')}
    </div>
  </div>
</section>`;
  }

  /* ----------------------------------------------------- 06 INSIDE */
  function inside() {
    const s = C.inside;
    return `
<section id="inside" class="scene scene--glass inside" data-theme="dark">
  <div class="inside__orbs" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="wrap">
    <header class="sec-head">
      <span class="sec-num" aria-hidden="true">${N('inside')}</span>
      <div class="inside__brand reveal">${img(C.logo.club, 'Логотип DÉBUT Closed Community Club')}<span>${esc(s.eyebrow)}</span></div>
      <h2 class="sec-title split">${esc(s.title)}</h2>
    </header>
    <div class="inside__tabs" role="tablist" aria-label="${esc(s.tabsLabel)}">
      ${s.items.map((it, i) => `<button role="tab" id="tab-${it.key}" class="itab ${i === 0 ? 'is-active' : ''}" aria-selected="${i === 0}" aria-controls="panel-${it.key}" data-tab="${it.key}"><span>${it.n}</span>${esc(it.title)}</button>`).join('')}
    </div>
    <div class="inside__panels">
      ${s.items.map((it, i) => `
      <div role="tabpanel" id="panel-${it.key}" aria-labelledby="tab-${it.key}" class="ipanel ${i === 0 ? 'is-active' : ''}" ${i === 0 ? '' : 'hidden'}>
        <div class="glass ipanel__text">
          <span class="ipanel__n">${it.n}</span>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
          ${it.steps ? `<ol class="steps">${it.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
          ${it.note ? `<p class="ipanel__note">${esc(it.note)}</p>` : ''}
        </div>
        <div class="ipanel__shots ipanel__shots--${it.shots.length || 0}">
          ${it.shots.length ? it.shots.map((sh, k) => `<button class="glass-shot" style="--k:${k}" data-lightbox="${sh.src}" aria-label="${U.openImage}: ${esc(sh.alt)}"><img src="${sh.src}" alt="${esc(sh.alt)}" decoding="async"></button>`).join('')
            : `<div class="placeholder glass"><strong>Нужен файл</strong><span>${esc(it.placeholder || it.title)}</span><small>Добавьте скриншот в assets/club/ и пропишите его в js/content.js → inside.items</small></div>`}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`;
  }

  /* ------------------------------------------------------ 07 WEEKS */
  function weeks() {
    const w = C.weeks;
    return `
<section id="weeks" class="scene scene--paper weeks" data-theme="light">
  <div class="wrap">
    ${head(N('weeks'), w.title, `<p class="lead reveal">${esc(w.levels)}</p>`)}
    <div class="weeks__grid">
      <div class="timeline">
        ${w.schedule.map((wk) => `
        <div class="tl-week reveal">
          <h3 class="tl-week__h">${esc(wk.week)}</h3>
          <ul>
            ${wk.items.map((it) => `
            <li class="tl-item">
              <span class="tl-item__day">${esc(it.day)}</span>
              <div class="tl-item__body">
                <p class="tl-item__title">${esc(it.title)}</p>
                ${it.sub ? `<p class="tl-item__sub">${esc(it.sub)}</p>` : ''}
              </div>
              <span class="tl-item__host">${U.host}<b>${esc(it.host)}</b></span>
            </li>`).join('')}
          </ul>
        </div>`).join('')}
        <p class="weeks__text reveal">${esc(w.text)}</p>
        <p class="weeks__access reveal"><span class="dot dot--live"></span>${esc(w.access)}</p>
      </div>
      <button class="weeks__img reveal" data-lightbox="${w.image}" aria-label="${U.openImage}: ${esc(w.imageAlt)}">${img(w.image, w.imageAlt)}</button>
    </div>
  </div>
</section>`;
  }

  /* -------------------------------------------------------- 08 FOR */
  function forWhom() {
    const f = C.forWhom;
    return `
<section id="for" class="scene scene--icy forwhom" data-theme="light">
  <div class="wrap">
    ${head(N('for'), f.title)}
    <ul class="fits">
      ${f.items.map((x, i) => `<li class="fit reveal" style="--i:${i}"><span class="fit__check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><p>${esc(x)}</p></li>`).join('')}
    </ul>
    <div class="level reveal">
      <div class="level__scale" aria-hidden="true">${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => `<span class="${l === 'A1' ? 'off' : ''}">${l}</span>`).join('')}</div>
      <div><p class="level__tag">${esc(f.level)}</p><p class="level__note">${esc(f.levelNote)}</p></div>
    </div>
  </div>
</section>`;
  }

  /* ------------------------------------------------------- 09 JOIN */
  /* manager's Telegram: big button + visible handle (screen-share viewers can't click) */
  function joinLink(cls = '') {
    const j = C.join;
    return `
      <div class="qa__join ${cls}">
        <a class="qa__cta" href="${j.url}" target="_blank" rel="noopener noreferrer">${esc(j.label)} <span class="qa__arrow" aria-hidden="true">→</span></a>
        <a class="qa__handle" href="${j.url}" target="_blank" rel="noopener noreferrer">Telegram · ${esc(j.handle)}</a>
      </div>`;
  }
  function join() {
    const j = C.join_section, p = C.price;
    return `
<section id="join" class="scene scene--night join" data-theme="dark">
  <div class="wrap">
    ${head(N('join'), j.title)}
    <div class="join__grid">
      <article class="card reveal">
        <div class="card__shine" aria-hidden="true"></div>
        <header class="card__head">
          <img class="card__logo" src="${C.logo.small}" alt="DÉBUT" loading="lazy">
          <span class="card__kind">${esc(j.cardKind)}</span>
        </header>
        <p class="card__price"><span class="card__amount">${esc(p.amount)}</span><span class="card__cur">${esc(p.currency)}</span><span class="card__per">/ ${esc(p.period)}</span></p>
        <ul class="card__list">${j.included.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </article>
      <div class="join__how">
        <h3 class="join__h reveal">${esc(j.howTitle)}</h3>
        <ol class="join__steps">${j.steps.map((s, i) => `<li class="reveal" style="--i:${i}"><span>${i + 1}</span>${esc(s)}</li>`).join('')}</ol>
        <div class="reveal">${joinLink('qa__join--left')}</div>
      </div>
    </div>
  </div>
</section>`;
  }

  /* ------------------------------------------------------- 10 NEXT */
  function next() {
    const n = C.next;
    return `
<section id="next" class="scene scene--cream nextsec" data-theme="light">
  <div class="wrap">
    ${head(N('next'), n.title, `<p class="lead reveal">${esc(n.lead)}</p>`)}
    <ul class="horizon">
      ${n.items.map((x, i) => `<li class="horizon__item reveal" style="--i:${i}"><span class="horizon__soon">${U.planned}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></li>`).join('')}
    </ul>
    <p class="horizon__foot reveal">${esc(n.footnote)}</p>
  </div>
</section>`;
  }

  /* --------------------------------------------------------- 11 QA */
  function qa() {
    const q = C.qa;
    return `
<section id="qa" class="scene scene--night qa" data-theme="dark">
  <canvas class="qa__sky" aria-hidden="true"></canvas>
  <div class="wrap qa__inner">
    <span class="sec-num" aria-hidden="true">${N('qa')}</span>
    ${fluffy('qa__logo')}
    <h2 class="qa__title split">${esc(q.title)}</h2>
    <p class="qa__lead reveal"><em>${esc(q.lead)}</em></p>
    <p class="qa__text reveal">${esc(q.text)}</p>
    <div class="reveal">${joinLink()}</div>
  </div>
</section>`;
  }

  document.getElementById('app').innerHTML =
    hero() + room() + founders() + team() + created() + clubs() + reviews() + inside() + weeks() + forWhom() + join() + next() + qa();
})();
