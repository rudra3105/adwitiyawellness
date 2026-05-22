/**
 * ADWITIYA WELLNESS — Main JavaScript
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

/**
 * ADWITIYA WELLNESS — Enhanced Animations & Interactions
 */

/* ── Enhanced Reveal Observer ── */
function initEnhancedReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (!revealEls.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
          // Also mark section headers for line animation
          if (el.classList.contains('section-header')) {
            el.classList.add('in-view');
          }
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { 
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealEls.forEach(el => observer.observe(el));
}

/* ── Smooth Cursor Glow Effect ── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices
  
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);
  
  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(201,169,110,0.25);
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(trail);
  
  let mx = 0, my = 0;
  
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    setTimeout(() => {
      trail.style.left = mx + 'px';
      trail.style.top = my + 'px';
    }, 80);
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });
  
  // Expand on hover over interactive elements
  document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      trail.style.transform = 'translate(-50%, -50%) scale(2)';
      trail.style.borderColor = 'rgba(201,169,110,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      trail.style.transform = 'translate(-50%, -50%) scale(1)';
      trail.style.borderColor = 'rgba(201,169,110,0.25)';
    });
  });
}

/* ── Parallax Effect for Hero Image ── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  const pageBg = document.querySelector('.page-hero-bg img');
  
  const el = heroBg || pageBg;
  if (!el) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        el.style.transform = `scale(1.1) translateY(${scrolled * 0.25}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── Enhanced Counter Animation ── */
function initEnhancedCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 2500;
      const startTime = performance.now();
      
      const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(easedProgress * target);
        el.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
      
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  
  counters.forEach(el => observer.observe(el));
}

/* ── Staggered Card Animations ── */
function initStaggeredCards() {
  const grids = document.querySelectorAll('.services-grid, .treat-grid, .testimonials-slider');
  
  grids.forEach(grid => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const items = grid.querySelectorAll('.service-card, .treat-item, .testimonial-card');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 120);
        });
        observer.unobserve(grid);
      }
    }, { threshold: 0.1 });
    
    // Set initial state
    const items = grid.querySelectorAll('.service-card, .treat-item, .testimonial-card');
    items.forEach(item => {
      if (!item.classList.contains('reveal')) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    });
    
    observer.observe(grid);
  });
}

/* ── Smooth Hover Tilt for Cards ── */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  document.querySelectorAll('.service-card, .testimonial-card, .cta-block').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Marquee Speed on Hover ── */
function initMarqueeInteraction() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  
  const marqueeBar = document.querySelector('.marquee-bar');
  if (!marqueeBar) return;
  
  marqueeBar.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
    track.style.filter = 'brightness(1.1)';
  });
  
  marqueeBar.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
    track.style.filter = '';
  });
}

/* ── Initialize all enhancements ── */
function initEnhancements() {
  initEnhancedReveal();
  initParallax();
  initEnhancedCounters();
  initStaggeredCards();
  initCardTilt();
  initMarqueeInteraction();
  
  // Delay cursor glow to not block initial paint
  setTimeout(initCursorGlow, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
  initEnhancements();
}


/* ── Back to Top Visibility Fix ── */
(function() {
  const btn = document.querySelector('.back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
