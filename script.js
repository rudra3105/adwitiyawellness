/* ============================================================
   ADWITIYA WELLNESS — JS
   GSAP, ScrollTrigger, smooth nav, cursor, loader, tweaks
   ============================================================ */
(function () {
  'use strict';

  // ------- Loader -------
  function runLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) { document.body.classList.add('loaded'); return Promise.resolve(); }
    const bar  = loader.querySelector('.loader__bar i');
    const num  = loader.querySelector('.loader__num');
    const logo = loader.querySelector('.loader__logo');

    return new Promise(resolve => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loader, {
            yPercent: -101, duration: 1.1, ease: 'expo.inOut',
            onComplete: () => { loader.style.display = 'none'; resolve(); }
          });
        }
      });
      if (logo) {
        gsap.set(logo, { opacity: 0, y: 24 });
        tl.to(logo, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0);
      }
      tl.to(bar, { width: '100%', duration: 1.6, ease: 'power2.inOut' }, 0.15)
        .to(num, {
          textContent: 100, duration: 1.6, ease: 'power2.inOut',
          snap: { textContent: 1 },
          onUpdate() {
            num.textContent = Math.round(this.targets()[0].textContent).toString().padStart(3,'0');
          }
        }, 0.15)
        .to([bar, num, logo].filter(Boolean), { opacity: 0, duration: 0.4 }, '+=0.2');
    });
  }

  // ------- Custom cursor -------
  function initCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cur = document.createElement('div');
    cur.className = 'cursor';
    cur.innerHTML = `
      <div class="cursor__ring"><div class="cursor__label">View</div></div>
      <div class="cursor__dot"></div>`;
    document.body.appendChild(cur);

    const state = { x: 0, y: 0, tx: 0, ty: 0, rx: 0, ry: 0 };
    document.addEventListener('mousemove', e => { state.tx = e.clientX; state.ty = e.clientY; });
    const dot  = cur.querySelector('.cursor__dot');
    const ring = cur.querySelector('.cursor__ring');
    const label = cur.querySelector('.cursor__label');

    gsap.ticker.add(() => {
      state.x += (state.tx - state.x) * 0.9;
      state.y += (state.ty - state.y) * 0.9;
      state.rx += (state.tx - state.rx) * 0.18;
      state.ry += (state.ty - state.ry) * 0.18;
      dot.style.transform  = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${state.rx}px, ${state.ry}px) translate(-50%, -50%)`;
    });

    // hover targets + magnetic
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('a, button, [data-cursor]');
      if (!t) return;
      cur.classList.add('is-hover');
      if (t.matches('[data-cursor="view"], .masonry__item, .brand-card')) {
        cur.classList.add('is-label');
        label.textContent = t.dataset.cursorLabel || 'View';
      }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest('a, button, [data-cursor]');
      if (!t) return;
      cur.classList.remove('is-hover', 'is-label');
    });

    // magnetic buttons
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * 0.25, y: y * 0.35, duration: 0.5, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ------- Navbar -------
  function initNav() {
    const nav   = document.querySelector('.nav');
    const burger = document.querySelector('.nav__burger');
    const menu  = document.querySelector('.menu');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 30);
      const prog = document.querySelector('.scroll-progress');
      if (prog) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (window.scrollY / Math.max(h, 1) * 100) + '%';
      }
      const top = document.querySelector('.to-top');
      if (top) top.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && menu) {
      burger.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
          gsap.fromTo(menu.querySelectorAll('.menu__link'),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: 'expo.out', delay: 0.15 });
        }
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      }));
    }
  }

  // ------- Back to top -------
  function initToTop() {
    const btn = document.querySelector('.to-top');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ------- Hero entrance (per-page) -------
  function initHero() {
    const heroLines = document.querySelectorAll('[data-hero] .reveal-line > span');
    if (heroLines.length) {
      gsap.to(heroLines, { y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.1 });
    }
    const heroFade = document.querySelectorAll('[data-hero] .fade-in');
    gsap.to(heroFade, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.5 });

    const heroImg = document.querySelector('[data-hero] .hero__media img');
    if (heroImg) {
      gsap.to(heroImg, { scale: 1, duration: 1.8, ease: 'expo.out', delay: 0.0 });
      gsap.to(heroImg, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }

  // ------- Section reveals -------
  function initReveals() {
    // Headline word-mask lines
    document.querySelectorAll('[data-reveal-lines]').forEach(group => {
      const lines = group.querySelectorAll('.reveal-line > span');
      gsap.fromTo(lines,
        { y: '110%' },
        {
          y: '0%', duration: 1.1, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 80%' }
        });
    });

    // Generic fade-ins
    document.querySelectorAll('.fade-in').forEach(el => {
      if (el.closest('[data-hero]')) return;
      gsap.to(el, {
        y: 0, opacity: 1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Stagger groups
    document.querySelectorAll('[data-stagger]').forEach(group => {
      const items = group.children;
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 85%' }
        });
    });

    // Parallax images
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Image scale on scroll
    document.querySelectorAll('[data-scroll-zoom]').forEach(el => {
      gsap.fromTo(el,
        { scale: 1.15 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: true }
        });
    });

    // Counters
    document.querySelectorAll('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count);
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: end, duration: 2, ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

  // ------- Therapy card hover with cursor follower -------
  function initTherapyHover() {
    document.querySelectorAll('.therapy-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.therapy-card__index'), { color: 'var(--accent)', duration: 0.4 });
      });
    });
  }

  // ------- Lightbox -------
  function initLightbox() {
    const items = document.querySelectorAll('.masonry__item');
    if (!items.length) return;
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = `<button class="lightbox__close" aria-label="Close">✕</button><img alt="">`;
    document.body.appendChild(box);
    const img = box.querySelector('img');
    items.forEach(it => it.addEventListener('click', () => {
      const src = it.querySelector('img').dataset.full || it.querySelector('img').src;
      img.src = src;
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }));
    const close = () => { box.classList.remove('is-open'); document.body.style.overflow = ''; };
    box.querySelector('.lightbox__close').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // ------- Testimonials slider -------
  function initTSM() {
    document.querySelectorAll('.tsm').forEach(tsm => {
      const track = tsm.querySelector('.tsm__track');
      const slides = tsm.querySelectorAll('.tsm__slide');
      const prev = tsm.querySelector('[data-tsm="prev"]');
      const next = tsm.querySelector('[data-tsm="next"]');
      let idx = 0;
      const perView = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 720 ? 2 : 1;
      const max = () => Math.max(0, slides.length - perView());
      const update = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 24;
        track.style.transform = `translateX(-${idx * (slideWidth + gap)}px)`;
      };
      prev && prev.addEventListener('click', () => { idx = Math.max(0, idx - 1); update(); });
      next && next.addEventListener('click', () => { idx = Math.min(max(), idx + 1); update(); });
      window.addEventListener('resize', () => { idx = Math.min(idx, max()); update(); });
      update();
    });
  }

  // ------- Tweaks panel -------
  function initTweaks() {
    const fab = document.querySelector('.tweaks__fab');
    const panel = document.querySelector('.tweaks');
    if (!panel || !fab) return;

    // restore
    const saved = JSON.parse(localStorage.getItem('adw-tweaks') || '{}');
    if (saved.palette) document.documentElement.setAttribute('data-palette', saved.palette);
    if (saved.type) document.documentElement.setAttribute('data-type', saved.type);
    if (saved.cursor === false) document.body.classList.remove('cursor-on');
    else document.body.classList.add('cursor-on');

    const refreshChips = () => {
      panel.querySelectorAll('[data-set="palette"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.value === (document.documentElement.getAttribute('data-palette') || 'sandstone')));
      panel.querySelectorAll('[data-set="type"]').forEach(b =>
        b.classList.toggle('is-active', b.dataset.value === (document.documentElement.getAttribute('data-type') || 'cormorant')));
      const sw = panel.querySelector('[data-set="cursor"]');
      if (sw) sw.classList.toggle('is-on', document.body.classList.contains('cursor-on'));
    };
    refreshChips();

    const save = () => {
      const s = {
        palette: document.documentElement.getAttribute('data-palette') || 'sandstone',
        type:    document.documentElement.getAttribute('data-type') || 'cormorant',
        cursor:  document.body.classList.contains('cursor-on')
      };
      localStorage.setItem('adw-tweaks', JSON.stringify(s));
    };

    panel.addEventListener('click', e => {
      const chip = e.target.closest('[data-set]');
      if (!chip) return;
      if (chip.dataset.set === 'palette') {
        document.documentElement.setAttribute('data-palette', chip.dataset.value);
      } else if (chip.dataset.set === 'type') {
        document.documentElement.setAttribute('data-type', chip.dataset.value);
      } else if (chip.dataset.set === 'cursor') {
        document.body.classList.toggle('cursor-on');
      }
      refreshChips();
      save();
    });

    const open  = () => { panel.classList.add('is-open');  fab.classList.add('is-hidden'); };
    const close = () => { panel.classList.remove('is-open'); fab.classList.remove('is-hidden'); };
    fab.addEventListener('click', open);
    panel.querySelector('.tweaks__close').addEventListener('click', close);
  }

  // ------- Marquee duplicate -------
  function initMarquee() {
    document.querySelectorAll('.marquee__track').forEach(t => {
      t.innerHTML = t.innerHTML + t.innerHTML;
    });
  }

  // ------- Smooth in-page anchor scrolling -------
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }

  // ------- Boot -------
  async function boot() {
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    initTweaks();
    initNav();
    initToTop();
    initCursor();
    initMarquee();
    initAnchors();
    await runLoader();
    initHero();
    initReveals();
    initTherapyHover();
    initLightbox();
    initTSM();
    document.body.classList.add('loaded');
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
