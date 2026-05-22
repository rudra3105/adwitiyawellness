/**
 * SERENITY SPA & WELLNESS — Main JavaScript
 * Powered by Webrise Global | www.webriseglobal.com
 */

'use strict';

/* ────────────────────────────────────────────
   UTILITY HELPERS
──────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ────────────────────────────────────────────
   NAVBAR: Scroll shrink + Active link
──────────────────────────────────────────── */
function initNavbar() {
  const navbar = $('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Set active link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial call
}

/* ────────────────────────────────────────────
   HAMBURGER MENU
──────────────────────────────────────────── */
function initHamburger() {
  const hamburger = $('.hamburger');
  const mobileMenu = $('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  };

  hamburger.addEventListener('click', toggle);

  // Close on link click
  $$('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggle();
    });
  });

  // Close on overlay click
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) toggle();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) toggle();
  });
}

/* ────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────── */
function initScrollReveal() {
  const targets = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ────────────────────────────────────────────
   BACK TO TOP
──────────────────────────────────────────── */
function initBackToTop() {
  const btn = $('.back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ────────────────────────────────────────────
   FAQ ACCORDION
──────────────────────────────────────────── */
function initFAQ() {
  const items = $$('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ────────────────────────────────────────────
   CONTACT FORM VALIDATION
──────────────────────────────────────────── */
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  const successMsg = form.nextElementSibling;

  const showError = (group, msg) => {
    group.classList.add('error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  };

  const clearError = group => {
    group.classList.remove('error');
  };

  // Live validation on blur
  $$('.form-group input, .form-group textarea, .form-group select', form).forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field.closest('.form-group')));
  });

  function validateField(field) {
    const group = field.closest('.form-group');
    const val   = field.value.trim();

    if (field.hasAttribute('required') && !val) {
      showError(group, 'This field is required.');
      return false;
    }

    if (field.type === 'email' && val) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        showError(group, 'Please enter a valid email address.');
        return false;
      }
    }

    if (field.type === 'tel' && val) {
      const telRe = /^[\d\s\+\-\(\)]{7,20}$/;
      if (!telRe.test(val)) {
        showError(group, 'Please enter a valid phone number.');
        return false;
      }
    }

    clearError(group);
    return true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    $$('.form-group input[required], .form-group textarea[required], .form-group select[required]', form).forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) return;

    // Simulate submission
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('show');
    }, 1200);
  });
}

/* ────────────────────────────────────────────
   SMOOTH SCROLL for anchor links
──────────────────────────────────────────── */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ────────────────────────────────────────────
   PAGE TRANSITION (fade in on load)
──────────────────────────────────────────── */
function initPageTransition() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // Fade out on link navigation (same-origin only)
  $$('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location = href; }, 350);
    });
  });
}

/* ────────────────────────────────────────────
   MARQUEE: duplicate items for seamless loop
──────────────────────────────────────────── */
function initMarquee() {
  const track = $('.marquee-track');
  if (!track) return;
  // Content is already duplicated in HTML for seamless loop
}

/* ────────────────────────────────────────────
   COUNTER ANIMATION (stats)
──────────────────────────────────────────── */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const end   = parseInt(el.dataset.count, 10);
      const dur   = 1800;
      const start = performance.now();

      const update = now => {
        const progress = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * end);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = end;
      };

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ────────────────────────────────────────────
   GALLERY LIGHTBOX (simple)
──────────────────────────────────────────── */
function initGallery() {
  const items = $$('.gallery-item');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.9);
    display:flex;align-items:center;justify-content:center;
    opacity:0;pointer-events:none;transition:opacity 0.3s ease;
    padding:20px;
  `;

  const img = document.createElement('img');
  img.style.cssText = `max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;`;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = `
    position:absolute;top:24px;right:28px;
    background:none;border:none;color:white;
    font-size:1.8rem;cursor:pointer;line-height:1;
  `;

  lb.append(closeBtn, img);
  document.body.appendChild(lb);

  const open = src => {
    img.src = src;
    lb.style.opacity = '1';
    lb.style.pointerEvents = 'all';
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.style.opacity = '0';
    lb.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  };

  items.forEach(item => {
    item.addEventListener('click', () => {
      const imgEl = item.querySelector('img');
      if (imgEl) open(imgEl.src);
    });
  });

  closeBtn.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ────────────────────────────────────────────
   INIT ALL
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initScrollReveal();
  initBackToTop();
  initFAQ();
  initContactForm();
  initSmoothScroll();
  initMarquee();
  initCounters();
  initGallery();
});

// Page transition last (after DOMContentLoaded to avoid flash)
initPageTransition();
