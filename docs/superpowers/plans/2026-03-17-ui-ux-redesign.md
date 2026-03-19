# UI/UX Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate arifAI Solutions from a single `index.html` to a Vite + npm multi-file project, add two new sections (Who We Help, FAQ), redesign the hero and services sections, and add GSAP scroll animations — all while keeping the live site uninterrupted.

**Architecture:** Single `index.html` splits into `src/styles/*.css` + `src/modules/*.js` entry-pointed from `src/main.js`. Vite bundles to `dist/`. Vercel is updated to run `vite build` and serve `dist/`. New sections (Who We Help, FAQ) are added to `index.html` HTML and styled/scripted in their own files.

**Tech Stack:** Vite 5, GSAP 3 (ScrollTrigger), vanilla JS, CSS custom properties, Formspree, Google Analytics 4

---

## Deployment Safety Rules

> These rules apply throughout the entire plan. Do NOT skip them.

1. **Never push a broken build to `main`.** All work stays on `ui/premium-refinements` until Task 12 (final merge).
2. **Run `npm run build` and verify `dist/` is clean before every commit.**
3. **Test on a Vercel preview URL** (auto-created for the branch) before merging to `main`.
4. **The live site (`arifaisolutions.com`) must not go dark at any point.** `main` is only updated in Task 12 after preview is verified.

---

## File Map

### Created
| File | Responsibility |
|---|---|
| `package.json` | npm deps — vite, gsap |
| `vite.config.js` | Vite config — root `index.html`, `src/` input |
| `src/main.js` | Entry point — imports all CSS + JS modules |
| `src/styles/tokens.css` | `:root` CSS custom properties (brand tokens) |
| `src/styles/base.css` | Reset, typography, utilities, fade-in, scroll bar |
| `src/styles/navbar.css` | Navbar + mobile menu + lang toggle |
| `src/styles/hero.css` | Hero section, logo animations, scroll cue |
| `src/styles/who-we-help.css` | NEW — Who We Help section |
| `src/styles/services.css` | Service cards (expand on hover redesign) |
| `src/styles/marquee.css` | Marquee ticker |
| `src/styles/how-we-work.css` | How We Work + GSAP step states |
| `src/styles/about.css` | About section |
| `src/styles/why-choose-us.css` | Why Choose Us pillars |
| `src/styles/track-record.css` | Track Record + case study snippets |
| `src/styles/faq.css` | NEW — FAQ section |
| `src/styles/contact.css` | Contact form + sticky mobile CTA |
| `src/styles/footer.css` | Footer |
| `src/modules/i18n.js` | TRANSLATIONS dict, applyLanguage, initLang |
| `src/modules/navbar.js` | Scroll state, mobile menu, scroll spy |
| `src/modules/hero-constellation.js` | NEW — canvas constellation animation |
| `src/modules/cursor.js` | Custom cursor + cursor glow |
| `src/modules/scroll-animations.js` | GSAP ScrollTrigger — How We Work narrative |
| `src/modules/services-expand.js` | NEW — hover/tap expand use cases on cards |
| `src/modules/contact-form.js` | Formspree AJAX |
| `src/modules/tilt.js` | 3D card tilt |
| `src/modules/magnetic.js` | Magnetic buttons |

### Modified
| File | Change |
|---|---|
| `index.html` | Remove inline `<style>` + `<script>`, add `<script type="module" src="/src/main.js">`, add Who We Help + FAQ HTML sections |
| `vercel.json` | Add `buildCommand` + `outputDirectory` |

### Moved (root → `public/`)
`founder.png`, `og-image.jpg`, `og-image.html`, `og-image.png`, `robots.txt`, `sitemap.xml`

---

## Task 1: Vite Scaffolding (Deployment Safety Gate)

> This task must be completed and verified on Vercel preview before any other tasks begin.

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `src/main.js`
- Modify: `vercel.json`
- Modify: `index.html`
- Move: `founder.png`, `og-image.jpg`, `og-image.html`, `og-image.png`, `robots.txt`, `sitemap.xml` → `public/`

- [ ] **Step 1: Install Vite and GSAP**

```bash
cd "/Users/qamarularifinbinabdmanan/Development Work/arif-ai-solutions"
npm init -y
npm install --save-dev vite
npm install gsap
```

- [ ] **Step 2: Create `vite.config.js`**

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
```

- [ ] **Step 3: Add build scripts to `package.json`**

Edit `package.json` scripts section:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 4: Create `src/main.js` (empty entry point)**

```js
// src/main.js
// CSS imports (added per task as files are created)

// Module imports (added per task as files are created)
```

- [ ] **Step 5: Add module script tag to `index.html`**

Add immediately before `</body>`:
```html
<script type="module" src="/src/main.js"></script>
```

Keep the existing inline `<script>` block for now — it will be removed in Task 3.

- [ ] **Step 6: Update `vercel.json` with build config**

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

- [ ] **Step 7: Move root assets to `public/`**

```bash
mkdir -p public
mv founder.png og-image.jpg og-image.html og-image.png robots.txt sitemap.xml public/
```

Vite serves `public/` at the root, so `https://arifaisolutions.com/og-image.jpg` continues to work.

- [ ] **Step 8: Verify local build succeeds**

```bash
npm run build
```

Expected: `dist/` created, `dist/index.html` exists, no errors.

- [ ] **Step 9: Verify dev server works**

```bash
npm run dev
```

Open `http://localhost:5173`. Site must look identical to current — no regressions. Check: navbar, hero logo animations, form, language toggle.

- [ ] **Step 10: Commit and push to branch**

```bash
git add package.json package-lock.json vite.config.js vercel.json src/main.js public/ index.html
git add -u  # stage moved files
git commit -m "feat: scaffold Vite project, move assets to public/"
git push origin ui/premium-refinements
```

- [ ] **Step 11: Verify Vercel preview deploy**

Vercel auto-creates a preview URL for `ui/premium-refinements`. Check the Vercel dashboard, open the preview URL, and confirm:
- Site loads correctly
- `https://<preview>.vercel.app/og-image.jpg` returns the image
- `https://<preview>.vercel.app/robots.txt` returns the file
- Security headers present (check DevTools → Network → Response Headers)

**🚦 GATE: Do not proceed to Task 2 until Vercel preview is confirmed working.**

---

## Task 2: Extract CSS — Tokens + Base

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Modify: `index.html` (remove corresponding inline styles)
- Modify: `src/main.js` (add imports)

- [ ] **Step 1: Create `src/styles/tokens.css`**

Cut `:root { ... }` block from `index.html` `<style>` and paste into this file. Content:
```css
:root {
  --gold: #c8a800;
  --gold-dim: rgba(200,168,0,0.2);
  --gold-glow: rgba(200,168,0,0.15);
  --dark: #0a0a0a;
  --body-bg: #1a1a1a;
  --cream: #f4f1e8;
  --white: #ffffff;
  --text-dark: #1a1a1a;
  --muted-dark: #555;
  --muted-light: #888;
  --muted-cream: #bbb;
  --mouse-x: 50%;
  --mouse-y: 50%;
}
```

- [ ] **Step 2: Create `src/styles/base.css`**

Cut from `index.html` `<style>`: reset block, `html/body`, `.section-pad`, `.container`, `.fade-in` rules, `@media (prefers-reduced-motion)` block, `#scroll-bar`. Paste into this file.

- [ ] **Step 3: Add imports to `src/main.js`**

```js
import './styles/tokens.css'
import './styles/base.css'
```

- [ ] **Step 4: Run dev server and verify no visual regressions**

```bash
npm run dev
```

Page should look identical. Check scroll bar appears on scroll.

- [ ] **Step 5: Run build**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 6: Commit**

```bash
git add src/styles/tokens.css src/styles/base.css src/main.js index.html
git commit -m "refactor: extract tokens and base CSS to src/styles/"
```

---

## Task 3: Extract Remaining CSS + JS Modules

**Files:**
- Create: all remaining `src/styles/*.css` files
- Create: all `src/modules/*.js` files
- Modify: `index.html` — remove inline `<style>` and `<script>` blocks entirely
- Modify: `src/main.js` — add all imports

- [ ] **Step 1: Create one CSS file per section**

For each section, cut the corresponding CSS rules from `index.html` `<style>` and paste into the matching file. Do them in order:
- `src/styles/navbar.css` — `#navbar`, `.nav-*`, `.btn-nav`, `.hamburger`, `.mobile-menu`, `.lang-*`
- `src/styles/hero.css` — `#hero`, `.hero-*`, `.btn-primary`, `.btn-secondary`, logo + animation keyframes
- `src/styles/services.css` — `#services`, `.service-card`, `.service-icon`, `.service-card-illustration`, `ill*` keyframes
- `src/styles/marquee.css` — `#marquee`, `.marquee-*`, `@keyframes marqueeScroll`
- `src/styles/how-we-work.css` — `#how-we-work`, `.step`, `.step-*`
- `src/styles/about.css` — `#about`, `.about-*`
- `src/styles/why-choose-us.css` — `#why`, `.pillars-*`, `.pillar`
- `src/styles/track-record.css` — `#testimonials`, `.results-*`, `.result-*`
- `src/styles/contact.css` — `#contact`, `.form-*`, `.form-success`
- `src/styles/footer.css` — `#footer`, `.footer-*`, `.lockup-xs`, `.lockup-sm`

- [ ] **Step 2: Create JS modules**

For each module, cut the corresponding JS from `index.html` `<script>` and paste:
- `src/modules/i18n.js` — `TRANSLATIONS` object, `applyLanguage`, `initLang` IIFE. Export `applyLanguage`.
- `src/modules/navbar.js` — scroll handler (navbar state + scroll spy + scroll progress bar + hero parallax + scroll cue hide). Export `initNavbar`.
- `src/modules/cursor.js` — cursor dot/ring lerp loop, `.cursor-hover` logic, mouse glow. Export `initCursor`.
- `src/modules/contact-form.js` — Formspree AJAX submit handler. Export `initContactForm`.
- `src/modules/tilt.js` — `.service-card` mousemove tilt. Export `initTilt`.
- `src/modules/magnetic.js` — `.btn-primary/.btn-secondary` magnetic translate. Export `initMagnetic`.

- [ ] **Step 3: Update `src/main.js` with all imports**

```js
// Styles
import './styles/tokens.css'
import './styles/base.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/services.css'
import './styles/marquee.css'
import './styles/how-we-work.css'
import './styles/about.css'
import './styles/why-choose-us.css'
import './styles/track-record.css'
import './styles/contact.css'
import './styles/footer.css'

// Modules
import { initNavbar } from './modules/navbar.js'
import { initCursor } from './modules/cursor.js'
import { initContactForm } from './modules/contact-form.js'
import { initTilt } from './modules/tilt.js'
import { initMagnetic } from './modules/magnetic.js'
import './modules/i18n.js'

// Init
initNavbar()
initCursor()
initContactForm()
initTilt()
initMagnetic()
```

- [ ] **Step 4: Remove inline `<style>` and `<script>` from `index.html`**

The `<style>` block and the inline `<script>` block at the bottom of `<body>` are now fully replaced by the Vite module system. Remove both.

- [ ] **Step 5: Run dev server — full regression check**

```bash
npm run dev
```

Check every section visually:
- Navbar scrolled state + mobile menu + lang toggle
- Hero logo animations (bars breathing, rings spinning)
- Service card illustrations animating
- Marquee scrolling
- About section fade-ins
- Contact form submits (use a test submission)
- Custom cursor visible on desktop
- EN/BM language toggle works

- [ ] **Step 6: Run build**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 7: Commit**

```bash
git add src/ index.html
git commit -m "refactor: extract all CSS and JS from index.html into src/ modules"
```

---

## Task 4: Background System

**Files:**
- Modify: `src/styles/tokens.css` — add background system tokens
- Modify: `src/styles/how-we-work.css`, `src/styles/why-choose-us.css`, `src/styles/track-record.css`, `src/styles/footer.css` — dark bg treatment
- Modify: `src/styles/about.css`, `src/styles/contact.css` — cream bg treatment

- [ ] **Step 1: Add background tokens to `src/styles/tokens.css`**

```css
:root {
  /* existing tokens ... */

  /* Background system */
  --bg-grain-url: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}
```

- [ ] **Step 2: Create shared background CSS classes in `src/styles/base.css`**

```css
/* ── Dark section background (E + F: grain + dual glows + dot grid) ── */
.bg-dark-rich {
  position: relative;
}
.bg-dark-rich::before {
  content: '';
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: var(--bg-grain-url);
  opacity: 0.04;
  mix-blend-mode: screen;
}
.bg-dark-rich::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 80% at 0% 100%, rgba(200,168,0,0.10) 0%, transparent 60%),
    radial-gradient(ellipse 40% 50% at 100% 0%, rgba(200,168,0,0.07) 0%, transparent 55%),
    radial-gradient(circle, rgba(200,168,0,0.1) 1px, transparent 1px);
  background-size: auto, auto, 36px 36px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 100%);
}
/* ensure section content sits above pseudo-elements */
.bg-dark-rich > * { position: relative; z-index: 1; }

/* ── Cream section background (E: gold radial glow + corner grid) ── */
.bg-cream-rich {
  position: relative;
}
.bg-cream-rich::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(200,168,0,0.10) 0%, transparent 65%);
  pointer-events: none; z-index: 0;
}
.bg-cream-rich::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(200,168,0,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,168,0,0.10) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 70% 60% at 80% 20%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 80% 20%, black 0%, transparent 70%);
}
.bg-cream-rich > * { position: relative; z-index: 1; }
```

- [ ] **Step 3: Apply classes in `index.html`**

Add `bg-dark-rich` to: `#how-we-work`, `#why`, `#testimonials`, `#footer`
Add `bg-cream-rich` to: `#about`, `#contact`

- [ ] **Step 4: Run dev server and verify backgrounds appear**

Open each section and confirm:
- Dark sections: faint dot grid visible in centre, subtle gold glows in corners
- Cream sections: faint gold radial glow top-right, faint grid lines top-right quadrant

- [ ] **Step 5: Build and commit**

```bash
npm run build
git add src/styles/ index.html
git commit -m "feat: apply dark/cream background system across all sections"
```

---

## Task 5: Hero Updates — Copy + Constellation

**Files:**
- Modify: `index.html` — hero headline, sub copy
- Create: `src/modules/hero-constellation.js`
- Modify: `src/styles/hero.css` — canvas positioning
- Modify: `src/main.js` — import constellation module

- [ ] **Step 1: Update hero copy in `index.html`**

Replace the existing `<h1>` and `<p.hero-sub>` content:

```html
<!-- h1 — keep .hero-word spans; data-i18n-headline re-sets innerHTML + re-adds .revealed -->
<h1 class="hero-headline" data-i18n-headline="hero.headline">
  <span class="hero-word">Your</span>
  <span class="hero-word">business,</span><br>
  <em><span class="hero-word">automated</span>
  <span class="hero-word">by</span>
  <span class="hero-word">AI.</span></em>
</h1>

<!-- sub -->
<p class="hero-sub" data-i18n="hero.sub">
  Practical AI solutions for Malaysian SMEs — from custom apps to intelligent agents.
</p>
```

- [ ] **Step 2: Add `hero.headline` and `hero.sub` keys to i18n**

The `data-i18n-headline` handler sets `innerHTML` then re-adds `.revealed` to all `.hero-word` spans inside the element. Translation values must therefore include the `.hero-word` spans so word-reveal works in both languages:

```js
// en
'hero.headline': '<span class="hero-word">Your</span> <span class="hero-word">business,</span><br><em><span class="hero-word">automated</span> <span class="hero-word">by</span> <span class="hero-word">AI.</span></em>',
'hero.sub': 'Practical AI solutions for Malaysian SMEs — from custom apps to intelligent agents.',

// ms
'hero.headline': '<span class="hero-word">Perniagaan</span> <span class="hero-word">anda,</span><br><em><span class="hero-word">diautomasikan</span> <span class="hero-word">dengan</span> <span class="hero-word">AI.</span></em>',
'hero.sub': 'Penyelesaian AI praktikal untuk PKS Malaysia — dari aplikasi tersuai hingga ejen pintar.',
```

- [ ] **Step 3: Add canvas element to hero HTML in `index.html`**

Inside `#hero`, immediately after the opening tag, before `.hero-content`:
```html
<canvas id="hero-constellation" aria-hidden="true"></canvas>
```

- [ ] **Step 4: Add canvas CSS to `src/styles/hero.css`**

```css
#hero-constellation {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
```

Ensure `.hero-content` has `z-index: 2` (already set as `z-index: 1` — bump to 2).

- [ ] **Step 5: Create `src/modules/hero-constellation.js`**

```js
const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initConstellation() {
  const canvas = document.getElementById('hero-constellation')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const hero = document.getElementById('hero')

  const IS_MOBILE = window.matchMedia('(max-width: 767px)').matches
  const NUM_DOTS  = IS_MOBILE ? 18 : 30
  const MAX_DIST  = 150
  const SPEED     = 0.4

  function resize() {
    canvas.width  = hero.offsetWidth
    canvas.height = hero.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const dots = Array.from({ length: NUM_DOTS }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r:  0.9 + Math.random() * 1.4,
  }))

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!IS_REDUCED) {
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1
      })
    }

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx   = dots[i].x - dots[j].x
        const dy   = dots[i].y - dots[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.strokeStyle = `rgba(200,168,0,${(1 - dist / MAX_DIST) * 0.18})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }

    dots.forEach(d => {
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(200,168,0,0.45)'
      ctx.fill()
    })

    if (!IS_REDUCED) requestAnimationFrame(drawFrame)
  }

  drawFrame()
}
```

- [ ] **Step 6: Import and call in `src/main.js`**

```js
import { initConstellation } from './modules/hero-constellation.js'
// in init section:
initConstellation()
```

- [ ] **Step 7: Run dev server and verify**

- Hero headline reads "Your business, automated by AI." with second line gold
- Sub is one sentence
- Constellation dots and lines animate in background
- Logo bars still breathe, rings still spin
- On mobile: fewer dots, everything still works

- [ ] **Step 8: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: update hero copy and add constellation canvas background"
```

---

## Task 6: Who We Help Section (New)

**Files:**
- Modify: `index.html` — add section HTML between `#hero` and `#services`
- Create: `src/styles/who-we-help.css`
- Modify: `src/styles/base.css` — add `.label-tag` utility if not present
- Modify: `src/modules/i18n.js` — add `who.*` keys
- Modify: `src/main.js` — import CSS

- [ ] **Step 1: Add Who We Help HTML to `index.html`**

Insert between `</section><!-- /#hero -->` and `<section id="services">`:

```html
<section id="who-we-help" class="section-pad bg-cream-rich">
  <div class="container">
    <div class="wwh-grid">

      <!-- Left: pain points -->
      <div class="wwh-left">
        <span class="label-tag" data-i18n="who.tag">Who We Help</span>
        <h2 class="wwh-heading fade-in">
          <span class="section-word" data-i18n="who.heading">Does any of this</span><br>
          <em><span class="section-word" data-i18n="who.heading-em">sound familiar?</span></em>
        </h2>
        <ul class="pain-list" role="list">
          <li class="pain-item fade-in fade-in-delay-1">
            <span class="pain-marker" aria-hidden="true"></span>
            <p class="pain-text" data-i18n="who.pain1">Your team spends hours every week manually compiling reports or updating spreadsheets</p>
          </li>
          <li class="pain-item fade-in fade-in-delay-2">
            <span class="pain-marker" aria-hidden="true"></span>
            <p class="pain-text" data-i18n="who.pain2">Customers ask the same questions repeatedly — and your staff handles every single one</p>
          </li>
          <li class="pain-item fade-in fade-in-delay-3">
            <span class="pain-marker" aria-hidden="true"></span>
            <p class="pain-text" data-i18n="who.pain3">Your business tools don't connect — data lives in silos and nothing syncs automatically</p>
          </li>
          <li class="pain-item fade-in fade-in-delay-4">
            <span class="pain-marker" aria-hidden="true"></span>
            <p class="pain-text" data-i18n="who.pain4">You know AI could help your business — but you don't know where to begin or who to trust</p>
          </li>
        </ul>
      </div>

      <!-- Right: resolution -->
      <div class="wwh-right fade-in fade-in-delay-2">
        <div class="wwh-divider" aria-hidden="true"></div>
        <h3 class="wwh-resolution-heading">
          <span data-i18n="who.res-heading">You're in the</span>
          <span class="wwh-gold" data-i18n="who.res-heading-gold">right place.</span>
        </h3>
        <p class="wwh-body" data-i18n-html="who.body1">
          arifAI Solutions works with <strong>Malaysian SMEs</strong> to turn these exact frustrations into working AI solutions — practical, affordable, and built around how your business actually runs.
        </p>
        <p class="wwh-body" data-i18n-html="who.body2">
          No jargon. No enterprise contracts. Just <strong>focused work that solves real problems</strong> — from someone who has spent 13 years doing exactly that at PETRONAS and ExxonMobil.
        </p>
        <div class="wwh-pills">
          <span class="wwh-pill" data-i18n="who.pill1">Custom AI Apps</span>
          <span class="wwh-pill" data-i18n="who.pill2">Automation</span>
          <span class="wwh-pill" data-i18n="who.pill3">AI Chatbots</span>
          <span class="wwh-pill" data-i18n="who.pill4">Strategy &amp; Consulting</span>
        </div>
        <a href="#how-we-work" class="wwh-cta-link" data-i18n="who.cta">
          See how we work
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <polyline points="9,3 14,8 9,13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/styles/who-we-help.css`**

```css
/* ── Who We Help ── */
#who-we-help { background: var(--cream); }

.wwh-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

/* label tag utility */
.label-tag {
  display: inline-block;
  font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--gold);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--gold);
  margin-bottom: 28px;
}

.wwh-heading {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 700; letter-spacing: -0.03em;
  line-height: 1.08; color: var(--text-dark);
  margin-bottom: 48px;
}
.wwh-heading em { font-style: italic; font-weight: 300; color: var(--muted-dark); }

/* Pain list */
.pain-list { list-style: none; }

.pain-item {
  display: grid; grid-template-columns: 28px 1fr;
  gap: 16px; align-items: start;
  padding: 18px 0;
  border-bottom: 1px solid rgba(26,26,26,0.1);
}
.pain-item:first-child { border-top: 1px solid rgba(26,26,26,0.1); }

.pain-marker {
  width: 20px; height: 20px; margin-top: 2px;
  border-radius: 50%;
  border: 1.5px solid rgba(26,26,26,0.2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.25s, background 0.25s;
  position: relative;
}
.pain-marker::after {
  content: '';
  display: block; width: 8px; height: 1.5px;
  background: rgba(26,26,26,0.35);
  border-radius: 1px;
  transition: background 0.25s;
}
.pain-item:hover .pain-marker {
  border-color: var(--gold);
  background: var(--gold);
}
.pain-item:hover .pain-marker::after { background: var(--dark); }

.pain-text {
  font-size: 15px; font-weight: 400;
  line-height: 1.55; color: var(--text-dark);
}

/* Resolution column */
.wwh-right { padding-top: 8px; }

.wwh-divider {
  width: 48px; height: 2px;
  background: var(--gold);
  margin-bottom: 32px;
}

.wwh-resolution-heading {
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.2; color: var(--text-dark);
  margin-bottom: 20px;
}
.wwh-gold { color: var(--gold); }

.wwh-body {
  font-size: 16px; font-weight: 400;
  line-height: 1.75; color: var(--muted-dark);
  margin-bottom: 16px;
}
.wwh-body strong { font-weight: 600; color: var(--text-dark); }

.wwh-pills {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin: 28px 0 32px;
}
.wwh-pill {
  font-size: 12px; font-weight: 500;
  color: var(--text-dark);
  background: rgba(200,168,0,0.1);
  border: 1px solid rgba(200,168,0,0.25);
  padding: 6px 14px; border-radius: 20px;
}

.wwh-cta-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--gold); text-decoration: none;
  border-bottom: 1px solid rgba(200,168,0,0.3);
  padding-bottom: 4px;
  transition: gap 0.2s, border-color 0.2s;
}
.wwh-cta-link:hover { gap: 14px; border-color: var(--gold); }
.wwh-cta-link svg { flex-shrink: 0; stroke: currentColor; }

/* Mobile */
@media (max-width: 767px) {
  .wwh-grid { grid-template-columns: 1fr; gap: 48px; }
  .pain-item { cursor: default; }
  .pain-item:hover .pain-marker { border-color: rgba(26,26,26,0.2); background: transparent; }
  .pain-item:hover .pain-marker::after { background: rgba(26,26,26,0.35); }
}
```

- [ ] **Step 3: Add `who.*` keys to `src/modules/i18n.js`**

Add to both `en` and `ms` objects. EN values match the HTML copy exactly. Provide BM translations:

```js
// en
'who.tag': 'Who We Help',
'who.heading': 'Does any of this',
'who.heading-em': 'sound familiar?',
'who.pain1': 'Your team spends hours every week manually compiling reports or updating spreadsheets',
'who.pain2': 'Customers ask the same questions repeatedly — and your staff handles every single one',
'who.pain3': 'Your business tools don\'t connect — data lives in silos and nothing syncs automatically',
'who.pain4': 'You know AI could help your business — but you don\'t know where to begin or who to trust',
'who.res-heading': 'You\'re in the',
'who.res-heading-gold': 'right place.',
'who.body1': 'arifAI Solutions works with <strong>Malaysian SMEs</strong> to turn these exact frustrations into working AI solutions — practical, affordable, and built around how your business actually runs.',
'who.body2': 'No jargon. No enterprise contracts. Just <strong>focused work that solves real problems</strong> — from someone who has spent 13 years doing exactly that at PETRONAS and ExxonMobil.',
'who.pill1': 'Custom AI Apps',
'who.pill2': 'Automation',
'who.pill3': 'AI Chatbots',
'who.pill4': 'Strategy &amp; Consulting',
'who.cta': 'See how we work',

// ms
'who.tag': 'Siapa Yang Kami Bantu',
'who.heading': 'Adakah ini',
'who.heading-em': 'kedengaran biasa?',
'who.pain1': 'Pasukan anda menghabiskan berjam-jam setiap minggu menyusun laporan atau mengemaskini hamparan secara manual',
'who.pain2': 'Pelanggan bertanya soalan yang sama berulang kali — dan kakitangan anda mengendalikan setiap satu',
'who.pain3': 'Alatan perniagaan anda tidak bersambung — data tersebar dan tiada yang disegerakkan secara automatik',
'who.pain4': 'Anda tahu AI boleh membantu perniagaan anda — tetapi tidak tahu dari mana hendak mulakan atau siapa yang boleh dipercayai',
'who.res-heading': 'Anda berada di',
'who.res-heading-gold': 'tempat yang betul.',
'who.body1': 'arifAI Solutions bekerjasama dengan <strong>PKS Malaysia</strong> untuk menukar kekecewaan ini kepada penyelesaian AI yang berfungsi — praktikal, mampu milik, dan dibina mengikut cara perniagaan anda sebenarnya berjalan.',
'who.body2': 'Tiada jargon. Tiada kontrak enterprise. Hanya <strong>kerja fokus yang menyelesaikan masalah sebenar</strong> — daripada seseorang yang telah melakukan ini selama 13 tahun di PETRONAS dan ExxonMobil.',
'who.pill1': 'Aplikasi AI Tersuai',
'who.pill2': 'Automasi',
'who.pill3': 'Chatbot AI',
'who.pill4': 'Strategi &amp; Perundingan',
'who.cta': 'Lihat cara kami bekerja',
```

- [ ] **Step 4: Import CSS in `src/main.js`**

```js
import './styles/who-we-help.css'
```

- [ ] **Step 5: Run dev server — verify section**

- Section appears between Hero and Services
- Pain point rows have hover interaction (marker fills gold)
- Pills display correctly
- Language toggle switches all text correctly
- Background treatment (cream E) visible

- [ ] **Step 6: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: add Who We Help section with i18n and pain-point interactions"
```

---

## Task 7: Services Cards Redesign

**Files:**
- Modify: `src/styles/services.css` — expand-on-hover card design
- Create: `src/modules/services-expand.js` — touch tap-to-toggle
- Modify: `src/main.js` — import module

- [ ] **Step 1: Update `src/styles/services.css`**

Replace existing `.service-card` styles with expand-on-hover design. Key additions:

```css
/* Services dark bg */
#services { background: var(--dark); }
#services.bg-dark-rich::before,
#services.bg-dark-rich::after { /* inherits from bg-dark-rich */ }

.service-card {
  background: #111;
  border: 1px solid rgba(255,255,255,0.07);
  padding: 28px 24px;
  position: relative; overflow: hidden;
  transition: border-color 0.25s, background 0.25s;
  cursor: default;
}
.service-card::before {
  content: '';
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(200,168,0,0.1) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 85% 70% at 50% 50%, black 10%, transparent 100%);
  opacity: 0; transition: opacity 0.3s;
  pointer-events: none; z-index: 0;
}
.service-card:hover {
  border-color: rgba(200,168,0,0.35);
  background: #131313;
}
.service-card:hover::before { opacity: 1; }

.service-card-content { position: relative; z-index: 1; }

/* Use cases block (hidden by default) */
.service-usecases {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.4s ease, opacity 0.3s ease;
}
.service-card:hover .service-usecases,
.service-card.expanded .service-usecases {
  max-height: 130px;
  opacity: 1;
}
.service-card:hover .service-card-desc,
.service-card.expanded .service-card-desc {
  margin-bottom: 14px;
}

.service-use-label {
  font-size: 9px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(200,168,0,0.6);
  margin-bottom: 8px;
}
.service-use-item {
  font-size: 11px; color: #777;
  padding: 3px 0;
  display: flex; gap: 8px; align-items: flex-start;
}
.service-use-item::before {
  content: '→'; color: var(--gold);
  flex-shrink: 0; font-size: 10px; margin-top: 1px;
}
```

- [ ] **Step 2: Update service card HTML in `index.html`**

For each of the 4 service cards, add a `.service-usecases` block inside `.service-card`. Example for Custom AI Apps:

```html
<div class="service-usecases" aria-hidden="true">
  <div class="service-use-label" data-i18n="services.use-label">e.g.</div>
  <div class="service-use-item" data-i18n="services.ai-apps.use1">Auto-generated weekly performance reports</div>
  <div class="service-use-item" data-i18n="services.ai-apps.use2">AI-powered invoice processing &amp; approval</div>
  <div class="service-use-item" data-i18n="services.ai-apps.use3">Smart inventory dashboards with alerts</div>
</div>
```

Repeat for all 4 cards with their respective use cases per the spec §5.3.

- [ ] **Step 3: Add i18n keys for use cases**

Add the following to both `en` and `ms` in `src/modules/i18n.js`:

```js
// en
'services.use-label': 'e.g.',
'services.ai-apps.use1': 'Auto-generated weekly performance reports',
'services.ai-apps.use2': 'AI-powered invoice processing & approval',
'services.ai-apps.use3': 'Smart inventory dashboards with alerts',
'services.chatbots.use1': 'Customer FAQ bot for WhatsApp or website',
'services.chatbots.use2': 'Internal HR & policy query assistant',
'services.chatbots.use3': 'Appointment booking & follow-up agent',
'services.automation.use1': 'Sync CRM, accounting & ops platforms',
'services.automation.use2': 'Auto-trigger workflows on form submissions',
'services.automation.use3': 'Cross-system reporting pipelines',
'services.consulting.use1': 'AI opportunity mapping workshop',
'services.consulting.use2': 'Build-vs-buy tool evaluation',
'services.consulting.use3': '12-month AI roadmap for your team',

// ms
'services.use-label': 'cth.',
'services.ai-apps.use1': 'Laporan prestasi mingguan yang dijana secara automatik',
'services.ai-apps.use2': 'Pemprosesan invois berkuasa AI & kelulusan',
'services.ai-apps.use3': 'Papan pemuka inventori pintar dengan amaran',
'services.chatbots.use1': 'Bot FAQ pelanggan untuk WhatsApp atau laman web',
'services.chatbots.use2': 'Pembantu pertanyaan dasar HR & dalaman',
'services.chatbots.use3': 'Ejen tempahan janji & susulan',
'services.automation.use1': 'Segerakkan platform CRM, perakaunan & operasi',
'services.automation.use2': 'Pencetus aliran kerja automatik pada penghantaran borang',
'services.automation.use3': 'Saluran pelaporan merentas sistem',
'services.consulting.use1': 'Bengkel pemetaan peluang AI',
'services.consulting.use2': 'Penilaian bina-vs-beli alatan',
'services.consulting.use3': 'Peta jalan AI 12 bulan untuk pasukan anda',
```

- [ ] **Step 4: Create `src/modules/services-expand.js`**

```js
const IS_TOUCH = window.matchMedia('(hover: none)').matches

export function initServicesExpand() {
  if (!IS_TOUCH) return  // desktop: CSS hover handles it

  const cards = document.querySelectorAll('.service-card')
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('expanded')
      // close all
      cards.forEach(c => c.classList.remove('expanded'))
      // open this one if it was closed
      if (!isOpen) card.classList.add('expanded')
    })
  })
}
```

- [ ] **Step 5: Add `bg-dark-rich` class to `#services` in `index.html`**

```html
<section id="services" class="section-pad bg-dark-rich">
```

- [ ] **Step 6: Import and init in `src/main.js`**

```js
import './styles/services.css'
import { initServicesExpand } from './modules/services-expand.js'
// init:
initServicesExpand()
```

- [ ] **Step 7: Run dev server — verify**

- Cards on desktop: hover reveals use cases with smooth transition
- Cards on mobile: tap toggles, second tap closes, tapping another closes previous
- Dot grid appears on card hover
- Service card illustrations still animate (existing CSS unchanged)

- [ ] **Step 8: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: redesign services cards with expand-on-hover use cases"
```

---

## Task 8: How We Work — GSAP Scroll Narrative

**Files:**
- Create: `src/modules/scroll-animations.js`
- Modify: `src/styles/how-we-work.css` — add step active states
- Modify: `src/main.js` — import module

- [ ] **Step 1: Add step inactive/active CSS to `src/styles/how-we-work.css`**

```css
/* GSAP scroll narrative states */
.step {
  opacity: 0.4;
  transition: opacity 0.3s;
}
.step.step-active {
  opacity: 1;
}
.step-active .step-num { color: var(--gold); }
.step-active .step-title { color: var(--white); }

/* Left border accent — traces in via GSAP scaleY */
.step { position: relative; padding-left: 20px; }
.step::before {
  content: '';
  position: absolute; left: 0; top: 0;
  width: 2px; height: 100%;
  background: var(--gold);
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.4s ease;
}
.step.step-active::before { transform: scaleY(1); }

/* prefers-reduced-motion: show all steps */
@media (prefers-reduced-motion: reduce) {
  .step { opacity: 1; }
  .step::before { transform: scaleY(1); }
}
```

- [ ] **Step 2: Create `src/modules/scroll-animations.js`**

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const IS_TOUCH   = window.matchMedia('(hover: none)').matches

export function initScrollAnimations() {
  if (IS_REDUCED || IS_TOUCH) {
    // Show all steps immediately
    document.querySelectorAll('.step').forEach(s => s.classList.add('step-active'))
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const section = document.querySelector('#how-we-work')
  const steps   = gsap.utils.toArray('.step')
  if (!section || !steps.length) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: true,
    }
  })

  steps.forEach((step, i) => {
    tl.to(step, {
      opacity: 1,
      onStart: () => step.classList.add('step-active'),
      onReverseComplete: () => step.classList.remove('step-active'),
    }, i * 0.25)
  })
}
```

- [ ] **Step 3: Import and init in `src/main.js`**

```js
import { initScrollAnimations } from './modules/scroll-animations.js'
// init:
initScrollAnimations()
```

- [ ] **Step 4: Run dev server — verify**

Scroll through How We Work section. Steps should:
- Start at 40% opacity
- Activate one by one as you scroll through the section
- Gold left border traces in on activation
- On mobile/reduced-motion: all steps fully visible immediately

- [ ] **Step 5: Build and commit**

```bash
npm run build
git add src/
git commit -m "feat: add GSAP scroll-triggered step narrative to How We Work"
```

---

## Task 9: Track Record — Case Study Snippets

**Files:**
- Modify: `index.html` — add `.result-case` to each stat block
- Modify: `src/styles/track-record.css` — add case snippet styles

- [ ] **Step 1: Update each stat block in `index.html`**

For each of the 3 `.result-stat` blocks, add after `.result-desc`:

```html
<!-- Stat 1: $60M+ -->
<div class="result-divider" aria-hidden="true"></div>
<p class="result-case" data-i18n="track.case1">
  "Engineered AI optimisation models that directly improved production economics across upstream operations"
</p>

<!-- Stat 2: 13 yrs -->
<div class="result-divider" aria-hidden="true"></div>
<p class="result-case" data-i18n="track.case2">
  "Led data science initiatives across exploration, production, and commercial functions at two of the world's largest energy companies"
</p>

<!-- Stat 3: 4–8 wks -->
<div class="result-divider" aria-hidden="true"></div>
<p class="result-case" data-i18n="track.case3">
  "From discovery to working solution — built around your business, not a generic template"
</p>
```

- [ ] **Step 2: Add styles to `src/styles/track-record.css`**

```css
.result-divider {
  width: 32px; height: 1px;
  background: rgba(200,168,0,0.35);
  margin: 14px 0;
}
.result-case {
  font-size: 13px;
  font-style: italic;
  line-height: 1.65;
  color: rgba(255,255,255,0.45);
}
```

- [ ] **Step 3: Add `track.case1/2/3` keys to i18n**

Add to `en` and `ms` in `src/modules/i18n.js`:

```js
// English
'track.case1': '"Engineered AI optimisation models that directly improved production economics across upstream operations"',
'track.case2': '"Led data science initiatives across exploration, production, and commercial functions at two of the world\'s largest energy companies"',
'track.case3': '"From discovery to working solution — built around your business, not a generic template"',

// Bahasa Malaysia
'track.case1': '"Merekabentuk model pengoptimuman AI yang secara langsung meningkatkan ekonomi pengeluaran dalam operasi hulu"',
'track.case2': '"Memimpin inisiatif sains data merentasi fungsi eksplorasi, pengeluaran, dan komersial di dua syarikat tenaga terbesar di dunia"',
'track.case3': '"Dari penemuan hingga penyelesaian yang berfungsi — dibina mengikut keperluan perniagaan anda, bukan templat generik"',
```

- [ ] **Step 4: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: add case study snippets to Track Record stats"
```

---

## Task 10: FAQ Section (New)

**Files:**
- Modify: `index.html` — add section between `#testimonials` and `#contact`
- Create: `src/styles/faq.css`
- Modify: `src/modules/i18n.js` — add `faq.*` keys
- Modify: `src/main.js` — import CSS

- [ ] **Step 1: Add FAQ HTML to `index.html`**

Insert between `</section><!-- /#testimonials -->` and `<section id="contact">`:

```html
<section id="faq" class="section-pad bg-cream-rich">
  <div class="container">
    <span class="label-tag" data-i18n="faq.tag">FAQ</span>
    <h2 class="faq-heading fade-in">
      <span class="section-word" data-i18n="faq.heading">Questions we</span>
      <em><span class="section-word" data-i18n="faq.heading-em">always get asked</span></em>
    </h2>
    <div class="faq-list">

      <div class="faq-item fade-in">
        <div class="faq-q">
          <span class="faq-num">01</span>
          <p data-i18n="faq.q1">How long does a typical project take?</p>
        </div>
        <div class="faq-a">
          <p data-i18n="faq.a1">Most projects go from discovery to a working solution in 4–8 weeks. A chatbot or automation can be live in as little as 2 weeks. Complex custom apps may take 2–3 months. We'll give you a clear timeline before we start.</p>
        </div>
      </div>

      <div class="faq-item fade-in fade-in-delay-1">
        <div class="faq-q">
          <span class="faq-num">02</span>
          <p data-i18n="faq.q2">Do I need technical knowledge to work with you?</p>
        </div>
        <div class="faq-a">
          <p data-i18n="faq.a2">Not at all. We translate between your business needs and the technology. You describe the problem; we figure out the solution. We keep you informed in plain language throughout.</p>
        </div>
      </div>

      <div class="faq-item fade-in fade-in-delay-2">
        <div class="faq-q">
          <span class="faq-num">03</span>
          <p data-i18n="faq.q3">What does it cost?</p>
        </div>
        <div class="faq-a">
          <p data-i18n="faq.a3">Pricing depends on scope. Simple automations start from a few thousand ringgit. Custom apps and agent deployments are scoped individually. The first call is always free — book it and we'll give you an honest estimate.</p>
        </div>
      </div>

      <div class="faq-item fade-in fade-in-delay-3">
        <div class="faq-q">
          <span class="faq-num">04</span>
          <p data-i18n="faq.q4">Can you work with the tools we already use?</p>
        </div>
        <div class="faq-a">
          <p data-i18n="faq.a4">Yes. We integrate with most common business tools — Google Workspace, Microsoft 365, WhatsApp, accounting software, CRMs, and more. We build around your existing stack, not around ours.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/styles/faq.css`**

```css
/* ── FAQ ── */
#faq { background: var(--cream); }

.faq-heading {
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 700; letter-spacing: -0.03em;
  line-height: 1.1; color: var(--text-dark);
  margin-bottom: 48px;
}
.faq-heading em { font-style: italic; font-weight: 300; color: var(--muted-dark); }

.faq-list { display: flex; flex-direction: column; }

.faq-item {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 48px; align-items: start;
  padding: 32px 0;
  border-top: 1px solid rgba(26,26,26,0.1);
}
.faq-item:last-child { border-bottom: 1px solid rgba(26,26,26,0.1); }

.faq-num {
  display: block;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.1em; color: rgba(200,168,0,0.6);
  margin-bottom: 8px;
}
.faq-q p {
  font-size: 16px; font-weight: 700;
  line-height: 1.4; color: var(--text-dark);
}
.faq-a p {
  font-size: 14px; line-height: 1.75;
  color: var(--muted-dark);
}

@media (max-width: 767px) {
  .faq-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
```

- [ ] **Step 3: Add `faq.*` keys to `src/modules/i18n.js`**

Add to `en` and `ms` (all plain text — no HTML tags):

```js
// English
'faq.tag': 'FAQ',
'faq.heading': 'Questions we',
'faq.heading-em': 'always get asked',
'faq.q1': 'How long does a typical project take?',
'faq.a1': 'Most projects go from discovery to a working solution in 4–8 weeks. A chatbot or automation can be live in as little as 2 weeks. Complex custom apps may take 2–3 months. We\'ll give you a clear timeline before we start.',
'faq.q2': 'Do I need technical knowledge to work with you?',
'faq.a2': 'Not at all. We translate between your business needs and the technology. You describe the problem; we figure out the solution. We keep you informed in plain language throughout.',
'faq.q3': 'What does it cost?',
'faq.a3': 'Pricing depends on scope. Simple automations start from a few thousand ringgit. Custom apps and agent deployments are scoped individually. The first call is always free — book it and we\'ll give you an honest estimate.',
'faq.q4': 'Can you work with the tools we already use?',
'faq.a4': 'Yes. We integrate with most common business tools — Google Workspace, Microsoft 365, WhatsApp, accounting software, CRMs, and more. We build around your existing stack, not around ours.',

// Bahasa Malaysia
'faq.tag': 'Soalan Lazim',
'faq.heading': 'Soalan yang',
'faq.heading-em': 'selalu kami terima',
'faq.q1': 'Berapa lama sesuatu projek biasanya mengambil masa?',
'faq.a1': 'Kebanyakan projek selesai dalam masa 4–8 minggu dari perbincangan awal hingga penyelesaian yang berfungsi. Chatbot atau automasi boleh siap dalam masa 2 minggu. Aplikasi tersuai yang lebih kompleks mungkin mengambil masa 2–3 bulan. Kami akan berikan jangka masa yang jelas sebelum memulakan.',
'faq.q2': 'Adakah saya perlu mempunyai pengetahuan teknikal untuk bekerja dengan anda?',
'faq.a2': 'Langsung tidak perlu. Kami bertindak sebagai jambatan antara keperluan perniagaan anda dan teknologi. Anda huraikan masalah; kami cari penyelesaiannya. Kami akan sentiasa maklumkan perkembangan dalam bahasa yang mudah difahami.',
'faq.q3': 'Berapakah kos yang diperlukan?',
'faq.a3': 'Harga bergantung kepada skop projek. Automasi ringkas bermula dari beberapa ribu ringgit. Aplikasi tersuai dan pelaksanaan ejen ditetapkan secara individu. Panggilan pertama sentiasa percuma — tempah sekarang dan kami akan berikan anggaran yang jujur.',
'faq.q4': 'Bolehkah anda bekerja dengan alatan yang kami sudah gunakan?',
'faq.a4': 'Ya. Kami berintegrasi dengan kebanyakan alatan perniagaan biasa — Google Workspace, Microsoft 365, WhatsApp, perisian perakaunan, CRM, dan banyak lagi. Kami bina penyelesaian mengikut sistem sedia ada anda, bukan sistem kami.',
```

- [ ] **Step 4: Import CSS in `src/main.js`**

```js
import './styles/faq.css'
```

- [ ] **Step 5: Run dev server — verify**

- Section appears between Track Record and Contact
- Editorial two-column layout renders correctly
- FAQ items have top/bottom hairline borders
- Language toggle switches all Q&A text
- On mobile: collapses to single column

- [ ] **Step 6: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: add FAQ section with editorial layout and i18n"
```

---

## Task 11: Mobile Sticky CTA Bar

**Files:**
- Modify: `index.html` — add sticky bar element
- Modify: `src/styles/contact.css` — add sticky bar styles
- Modify: `src/modules/navbar.js` — add sticky bar show/hide logic

- [ ] **Step 1: Add sticky CTA bar HTML to `index.html`**

Add immediately before `</body>`:

```html
<div id="sticky-cta" aria-hidden="true">
  <a href="#contact" class="btn-primary sticky-cta-btn" data-i18n="nav.cta">Book a Free Call</a>
</div>
```

- [ ] **Step 2: Add styles to `src/styles/contact.css`**

```css
/* ── Mobile sticky CTA bar ── */
#sticky-cta {
  display: none;  /* shown via JS on mobile only */
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 12px 20px;
  background: rgba(10,10,10,0.96);
  border-top: 1px solid rgba(200,168,0,0.3);
  z-index: 200;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
#sticky-cta.visible {
  transform: translateY(0);
}
.sticky-cta-btn {
  display: block; width: 100%; text-align: center;
  padding: 14px; font-size: 15px;
}

@media (max-width: 767px) {
  #sticky-cta { display: block; }
}
```

- [ ] **Step 3: Add sticky bar logic to `src/modules/navbar.js`**

In the scroll handler function, add:

```js
const stickyCta    = document.getElementById('sticky-cta')
const contactEl    = document.getElementById('contact')
const heroHeight   = document.getElementById('hero')?.offsetHeight ?? window.innerHeight

// in scroll handler:
if (stickyCta) {
  const contactRect = contactEl?.getBoundingClientRect()
  const contactVisible = contactRect && contactRect.top < window.innerHeight && contactRect.bottom > 0
  if (scrollY > heroHeight && !contactVisible) {
    stickyCta.classList.add('visible')
    stickyCta.setAttribute('aria-hidden', 'false')
  } else {
    stickyCta.classList.remove('visible')
    stickyCta.setAttribute('aria-hidden', 'true')
  }
}
```

- [ ] **Step 4: Run dev server on mobile viewport**

Open DevTools, set to 375px width. Scroll past the hero — sticky bar should slide up from bottom. Scroll to contact section — bar should hide. Tap the CTA — should smooth-scroll to contact form.

- [ ] **Step 5: Build and commit**

```bash
npm run build
git add src/ index.html
git commit -m "feat: add mobile sticky CTA bar that hides at contact section"
```

---

## Task 12: Final Verification + Merge to Main

**Files:**
- No new code. Verification and merge only.

- [ ] **Step 1: Full build + local verification**

```bash
npm run build
npm run preview
```

Open `http://localhost:4173`. Walk through every section:
- [ ] Navbar: scroll state, mobile menu, EN/BM toggle, scroll spy
- [ ] Hero: constellation running, logo animating, headline/sub copy correct
- [ ] Who We Help: pain-point hover interactions, pills, CTA link
- [ ] Services: expand on hover (desktop), tap-to-toggle (mobile)
- [ ] How We Work: scroll narrative activates steps sequentially
- [ ] About: fade-ins, founder photo loads
- [ ] Why Choose Us: pillar hover states
- [ ] Track Record: case snippets visible under stats
- [ ] FAQ: two-column layout, all 4 Q&As
- [ ] Contact: form submits, success state shows
- [ ] Footer: links, logo, social icon
- [ ] Mobile sticky CTA: appears after hero, hides at contact

- [ ] **Step 2: Test `prefers-reduced-motion`**

In DevTools → Rendering → "Emulate CSS media feature: prefers-reduced-motion: reduce". Confirm:
- Constellation canvas shows static dots, no animation
- How We Work: all steps fully visible, no GSAP
- All other animations disabled

- [ ] **Step 3: Check Vercel preview URL**

Push branch and confirm Vercel preview URL:
- Loads correctly
- `og-image.jpg`, `robots.txt`, `sitemap.xml` accessible at root paths
- Security headers present in response headers

- [ ] **Step 4: Merge to main**

```bash
git checkout main
git merge ui/premium-refinements --no-ff -m "feat: full UI/UX redesign — Vite migration, new sections, constellation hero, GSAP scroll animations"
git push origin main
```

- [ ] **Step 5: Verify live site**

Wait ~60 seconds for Vercel to deploy. Open `https://arifaisolutions.com`:
- Site loads (not a blank page)
- `https://arifaisolutions.com/og-image.jpg` returns image
- `https://arifaisolutions.com/robots.txt` returns file
- All sections render correctly
- GA4 still fires (check Real-Time in analytics.google.com)

**If Vercel deployment fails (blank page or build error):** Immediately revert the merge and push:
```bash
git revert HEAD --no-edit
git push origin main
```
This restores the previous working state while you diagnose the issue.

- [ ] **Step 6: Final commit — update CLAUDE.md**

Update `CLAUDE.md` to reflect the new multi-file architecture, new sections, and Vite build process.

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect Vite architecture and new sections"
git push origin main
```
