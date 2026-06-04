/* ============================================================
   ADWITIYA WELLNESS — shared chrome partials
   Injects loader, nav, mobile menu, footer, scroll-progress,
   back-to-top, tweaks fab + panel.
   Each page sets data-page, data-brand (optional), data-active (nav).
   ============================================================ */
(function () {
  const body = document.body;
  const active = body.dataset.active || body.dataset.page || '';

  const isActive = name => active === name ? ' is-active' : '';

  // -------- Loader --------
  const loaderHTML = `
    <div class="loader" aria-hidden="true">
      <div class="loader__brand">
        <img src="assets/logo-light.png" alt="Adwitiya Wellness" class="loader__logo">
      </div>
      <div class="loader__bar"><i></i></div>
      <div class="loader__num">000</div>
    </div>`;

  // -------- Scroll progress --------
  const progressHTML = `<div class="scroll-progress"></div>`;

  // -------- Nav --------
  const navHTML = `
    <header class="nav">
      <a href="index.html" class="nav__brand" aria-label="Adwitiya Wellness home">
        <img class="nav__logo nav__logo--light" src="assets/logo-light.png" alt="Adwitiya Wellness">
        <img class="nav__logo nav__logo--color" src="assets/logo-color.png" alt="Adwitiya Wellness">
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a class="nav__link${isActive('home')}" href="index.html">Home</a>
        <a class="nav__link${isActive('about')}" href="about.html">About</a>
        <a class="nav__link${isActive('ganga')}" href="ganga-spa.html">Ganga</a>
        <a class="nav__link${isActive('amore')}" href="amore-wellness.html">Amore</a>
        <a class="nav__link${isActive('sattva')}" href="sattva-wellness.html">Sattva</a>
        <a class="nav__link${isActive('careers')}" href="careers.html">Careers</a>
      </nav>
      <a class="btn btn--ghost nav__cta" href="contact.html" data-magnetic>
        Contact <span class="arrow">→</span>
      </a>
      <button class="nav__burger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </header>

    <aside class="menu" aria-label="Mobile navigation">
      <nav class="menu__list">
        <a class="menu__link" href="index.html"><span class="num">01</span> Home</a>
        <a class="menu__link" href="about.html"><span class="num">02</span> About</a>
        <a class="menu__link" href="ganga-spa.html"><span class="num">03</span> Ganga Spa</a>
        <a class="menu__link" href="amore-wellness.html"><span class="num">04</span> Amore Wellness</a>
        <a class="menu__link" href="sattva-wellness.html"><span class="num">05</span> Sattva Wellness</a>
        <a class="menu__link" href="careers.html"><span class="num">06</span> Careers</a>
        <a class="menu__link" href="contact.html"><span class="num">07</span> Contact</a>
      </nav>
      <div class="menu__foot">
        <div>Adwitiya Wellness · Rajkot, Gujarat</div>
        <div>hello@adwitiya.in · +91 99249 02909</div>
      </div>
    </aside>`;

  // -------- Footer --------
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div>
            <img src="assets/logo-light.png" alt="Adwitiya Wellness" class="footer__logo">
            <p class="body" style="color: var(--on-dark-mut); max-width: 32ch;">
              A house of three considered wellness brands. Crafted slowly. Made in the North East.
            </p>
            <div class="footer__socials" aria-label="Social media">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="YouTube">YT</a>
              <a href="#" aria-label="LinkedIn">LI</a>
            </div>
          </div>
          <div class="footer__col">
            <h5>Visit</h5>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="careers.html">Careers</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h5>Houses</h5>
            <ul>
              <li><a href="ganga-spa.html">Ganga Spa</a></li>
              <li><a href="amore-wellness.html">Amore Wellness</a></li>
              <li><a href="sattva-wellness.html">Sattva Wellness</a></li>
            </ul>
          </div>
          <div class="footer__col footer__newsletter">
            <h5>Quiet letters</h5>
            <p class="body" style="color: var(--on-dark-mut); font-size: 0.88rem; margin-bottom: 1rem;">
              One letter a season. Rituals, oils and the occasional invitation.
            </p>
            <form onsubmit="event.preventDefault(); this.querySelector('input').value=''; this.querySelector('button').textContent='Thank you ·';">
              <input type="email" placeholder="Your email" required>
              <button type="submit">Subscribe →</button>
            </form>
          </div>
        </div>

        <div class="footer__wordmark italic" aria-hidden="true">Adwitiya</div>

        <div class="footer__bottom">
          <div>© 2026 Adwitiya Wellness LLP · Sparsha Wellness LLP</div>
          <div>Rajkot, Gujarat — India</div>
        </div>
      </div>
    </footer>`;

  // -------- Back-to-top --------
  const totopHTML = `
    <button class="to-top" aria-label="Back to top" data-cursor>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>`;

  // -------- Tweaks --------
  const tweaksHTML = `
    <button class="tweaks__fab" aria-label="Open design tweaks">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
    <aside class="tweaks" aria-label="Design tweaks">
      <div class="tweaks__head">
        <span class="tweaks__title italic">Tweaks</span>
        <button class="tweaks__close" aria-label="Close">✕</button>
      </div>
      <div class="tweaks__group">
        <span class="tweaks__label">Palette</span>
        <div class="tweaks__row">
          <button class="tweaks__chip" data-set="palette" data-value="sandstone"><span class="swatch" style="background:#B0894F;"></span>Sandstone</button>
          <button class="tweaks__chip" data-set="palette" data-value="ember"><span class="swatch" style="background:#B85B3C;"></span>Ember</button>
          <button class="tweaks__chip" data-set="palette" data-value="verdant"><span class="swatch" style="background:#6E7F4F;"></span>Verdant</button>
          <button class="tweaks__chip" data-set="palette" data-value="onyx"><span class="swatch" style="background:#C9A867;"></span>Onyx</button>
        </div>
      </div>
      <div class="tweaks__group">
        <span class="tweaks__label">Typography</span>
        <div class="tweaks__row">
          <button class="tweaks__chip" data-set="type" data-value="cormorant">Cormorant</button>
          <button class="tweaks__chip" data-set="type" data-value="playfair">Playfair</button>
          <button class="tweaks__chip" data-set="type" data-value="italiana">Italiana</button>
        </div>
      </div>
      <div class="tweaks__group">
        <span class="tweaks__label">Desktop cursor</span>
        <div class="tweaks__toggle">
          <span>Custom cursor</span>
          <button class="tweaks__switch is-on" data-set="cursor" aria-label="Toggle cursor"></button>
        </div>
      </div>
    </aside>`;

  // Insert chrome that belongs at the TOP of <body> right now
  body.insertAdjacentHTML('afterbegin', loaderHTML + progressHTML + navHTML);

  // Footer + back-to-top + tweaks must go to the BOTTOM of body —
  // but partials.js runs before <main> has parsed, so we have to wait.
  function appendChrome() {
    document.body.insertAdjacentHTML('beforeend', footerHTML + totopHTML + tweaksHTML);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendChrome);
  } else {
    appendChrome();
  }
})();
