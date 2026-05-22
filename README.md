# 🌿 SERENITY SPA & WELLNESS
### Premium Luxury Spa Website
**Powered by [Webrise Global](https://www.webriseglobal.com)**

---

## 📁 Folder Structure

```
serenity-spa/
├── index.html        → Homepage (Hero, Services, Why Us, Testimonials, Gallery, Offers)
├── about.html        → About Us (Brand Story, Mission, Philosophy, Team, Trust Signals)
├── pricing.html      → Services & Pricing (6 categories, Membership Plans)
├── contact.html      → Contact & Book (Form, Map, Hours, FAQ)
├── style.css         → Complete stylesheet (1600+ lines, mobile-first)
├── script.js         → All JavaScript functionality
└── README.md         → This file
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Open
Simply open `index.html` in any modern browser. All pages are fully self-contained with relative links.

### Option 2: Local Server (Recommended — avoids CORS issues with Google Fonts)
If you have Python installed:
```bash
cd serenity-spa
python3 -m http.server 8080
# Open: http://localhost:8080
```

With Node.js:
```bash
npx serve serenity-spa
# Or: npx live-server serenity-spa
```

With VS Code:
- Install "Live Server" extension → Right-click `index.html` → "Open with Live Server"

---

## ✅ Features Checklist

| Feature | Status |
|---|---|
| Mobile-first responsive design | ✅ |
| Sticky navbar with scroll shrink | ✅ |
| Mobile hamburger menu | ✅ |
| Smooth page transitions | ✅ |
| Scroll reveal animations | ✅ |
| Counter animations (stats) | ✅ |
| Marquee ticker bar | ✅ |
| Gallery with lightbox | ✅ |
| FAQ accordion | ✅ |
| Contact form with JS validation | ✅ |
| Back-to-top button | ✅ |
| SEO meta tags (all pages) | ✅ |
| Semantic HTML5 | ✅ |
| Accessible (ARIA labels) | ✅ |
| Google Fonts (Cormorant + Jost) | ✅ |
| CSS custom properties (design system) | ✅ |
| Print styles | ✅ |
| Reduced-motion support | ✅ |

---

## 🛠 Customization Guide

### Colors
Edit CSS variables in `style.css` at `:root {}`:
```css
--gold:   #C9A96E;   /* Primary accent */
--sage:   #8A9E85;   /* Secondary accent */
--cream:  #FAF7F2;   /* Background */
```

### Content
- **Business name**: Search & replace "Serenity" in all HTML files
- **Phone number**: Replace `+15551234567` in all files
- **Email**: Replace `hello@serenityspa.com`
- **Address**: Update in footer of each page
- **Images**: Replace Unsplash URLs with your own photos

### Google Maps
In `contact.html`, replace the iframe `src` with your real Google Maps embed code:
1. Go to Google Maps → Find your location → Share → Embed a map → Copy HTML

---

## 🌐 Hosting Options (Static Sites)

| Platform | Free Tier | Custom Domain | Speed |
|---|---|---|---|
| **Netlify** | ✅ Excellent | ✅ Free SSL | ⚡⚡⚡ |
| **Vercel** | ✅ Excellent | ✅ Free SSL | ⚡⚡⚡ |
| **GitHub Pages** | ✅ Good | ✅ Free SSL | ⚡⚡ |
| **Cloudflare Pages** | ✅ Excellent | ✅ Free SSL | ⚡⚡⚡ |
| **Firebase Hosting** | ✅ Good | ✅ Free SSL | ⚡⚡⚡ |

**Recommended**: Netlify — drag and drop the `serenity-spa/` folder to deploy instantly at [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🔮 Suggested Future Improvements

### Phase 2 — Business Features
- [ ] **Online Booking System** — Integrate Calendly, SimplyBook.me, or Acuity Scheduling
- [ ] **Gift Voucher Shop** — E-commerce integration (Stripe/Shopify)
- [ ] **WhatsApp Chat Widget** — Floating chat button
- [ ] **Cookie Consent Banner** — GDPR compliance
- [ ] **Google Analytics** — GA4 tracking setup

### Phase 3 — Enhanced UX
- [ ] **Blog / Wellness Articles** — SEO content marketing
- [ ] **Before & After Gallery** — Treatment results
- [ ] **Video Hero** — Ambient spa video background
- [ ] **Multi-language Support** — i18n for international guests
- [ ] **Dark Mode Toggle** — User preference

### Phase 4 — Performance & SEO
- [ ] **Image Optimization** — Convert to WebP, add lazy-loading
- [ ] **Service Worker** — Offline PWA capabilities
- [ ] **Schema Markup** — LocalBusiness structured data
- [ ] **Sitemap.xml** — Auto-generated for search engines
- [ ] **robots.txt** — Search engine directives

---

## 📄 License
This website template was created exclusively for client delivery by **Webrise Global**.
All design, code, and creative direction © 2025 Webrise Global.

🌐 [www.webriseglobal.com](https://www.webriseglobal.com)
