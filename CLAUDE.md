# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

arifAI Solutions landing page — a single-file static website (`index.html`) with no build tools, frameworks, or dependencies. Everything lives inline: HTML structure, CSS, SVG icons, and vanilla JS.

## Development

Open the page directly in a browser — no server required:

```bash
open index.html
```

For live-reload during editing, use any simple static server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

A server is required to test Formspree form submission (AJAX POST won't fire from `file://`).

## Architecture

**Single file: `index.html`**

All CSS is in a `<style>` block at the top of `<head>`. All JS is in a `<script>` block at the bottom of `<body>`. Structure follows this order:

1. CSS custom properties (`:root`) — all brand tokens defined here
2. Section styles in the same top-to-bottom order as the HTML sections
3. `@media (max-width: 767px)` breakpoints co-located with their section styles
4. HTML sections: Navbar → Hero → Services → Marquee → How We Work → About → Why Choose Us → Track Record → Contact → Footer
5. JS: **i18n system** (TRANSLATIONS dict → applyLanguage → initLang) → feature detection → hero load animation → scroll observer → scroll handler → contact form AJAX → hamburger → cursor → 3D tilt → magnetic buttons

Section backgrounds alternate dark/cream:
- Hero `#0a0a0a` → Services `#f4f1e8` → Marquee gold → How We Work `#0a0a0a` → About `#f4f1e8` → Why `#0a0a0a` → Track Record `#111111` → Contact `#f4f1e8` → Footer `#0a0a0a`

**Assets at project root:**
- `founder.png` — founder photo used in the About section (`loading="lazy"`)
- `og-image.jpg` — branded 1200×630px social sharing image (do not delete; referenced in og:image meta tags)
- `og-image.html` — source template used to generate `og-image.jpg` (keep for future regeneration)
- `og-image.png` — intermediate full-res PNG (can be deleted, `og-image.jpg` is the live asset)
- `robots.txt` — allows all crawlers, references sitemap
- `sitemap.xml` — single-URL sitemap for `arifaisolutions.com`
- `vercel.json` — Vercel security headers config (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection)

## Brand Tokens (do not deviate)

| Token | Value |
|---|---|
| `--gold` | `#c8a800` |
| `--dark` | `#0a0a0a` (primary dark sections) |
| `--cream` | `#f4f1e8` (alternating light sections) |
| `--text-dark` | `#1a1a1a` |
| Font | Plus Jakarta Sans 300/500/700 (Google Fonts) |

## Logo SVG

The logo mark is an inline SVG: `viewBox="0 0 96 96"`, gold circle outline + 5 vertical bars (alternating white/gold). Used at three sizes — SM in navbar (`28×28`), XL animated in hero (`120×120`), XS in footer (`20×20`). The hero bars have individual `@keyframes` (`barBreath1`–`barBreath5`) with offset delays for an asynchronous breathing pulse.

The wordmark pattern: `[` (gold, weight 300) + `arif` (white/#1a1a1a, weight 500) + `AI` (gold, weight 700) + `]` (gold, weight 300), with `solutions` in small uppercase spaced tracking below.

## CSS Keyframe Namespacing

Two animation systems exist — keep their namespaces separate:

| Prefix | Used for |
|---|---|
| `barBreath1`–`barBreath5` | Hero logo bar pulse |
| `scrollCueFade`, `scrollBounce` | Hero scroll cue |
| `marqueeScroll` | Marquee ticker |
| `ill*` (`illBar1–4`, `illLineTrace`, `illDotPulse`, `illSignalMove`, `illTypeDot`) | Service card background illustrations |

Never reuse names across these groups.

## Animations

- **Hero bars:** CSS `@keyframes` on `<line>` elements using `transform-origin: center center` + `transform-box: fill-box`
- **Hero word reveal:** `.hero-word` elements get `.revealed` class via staggered `setTimeout` on `window load`
- **Hero scroll cue:** `.hero-scroll` fades in after 2s via `@keyframes scrollCueFade`; chevron bounces via `scrollBounce`; hidden via JS when `scrollY > 80`
- **Scroll fade-ins:** `.fade-in` starts `opacity: 0; transform: translateY(28px)`. `IntersectionObserver` adds `.visible`. Hero elements trigger on `window load` with staggered `setTimeout` instead.
- **Stagger delays:** `.fade-in-delay-1/2/3/4` add `transition-delay` for sibling elements.

All motion gates on:
```js
const IS_TOUCH   = window.matchMedia('(hover: none)').matches;
const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
`@media (prefers-reduced-motion: reduce)` sets all durations to `0.01ms` — this automatically disables all CSS animations including card illustrations.

## Internationalisation (i18n)

EN/BM language toggle implemented entirely in JS — no external libraries.

**Key pieces:**
- `TRANSLATIONS` object at the top of `<script>` — two keys `en` and `ms`, each containing ~60 string keys.
- `currentLang` module-level variable (default `'en'`); `applyLanguage(lang)` is the single entry point for all language switches.
- `localStorage` key `'lang'` persists the choice. `initLang()` IIFE at script bottom restores it synchronously.

**Attribute protocol — which attribute to use:**

| Attribute | Setter | Use when |
|---|---|---|
| `data-i18n="key"` | `textContent` | Plain text (no HTML tags in value) |
| `data-i18n-html="key"` | `innerHTML` | Rich text with `<br>`, `<em>`, `<strong>`, `<a>` |
| `data-i18n-headline="key"` | `innerHTML` + re-adds `.revealed` | Hero `<h1>` only (preserves word-reveal state) |
| `data-i18n-attr-label="key"` | `aria-label` attribute | Accessible labels |
| `data-i18n-attr-alt="key"` | `alt` attribute | Images |
| `data-i18n-attr-value="key"` | `value` attribute | Hidden form inputs |

**HTML entity rule:** Values set via `textContent` (`data-i18n`) must use literal `&`, not `&amp;`. Values set via `innerHTML` must use `&amp;` so the parser renders `&`.

**Marquee:** Not annotated with `data-i18n`. Instead, `applyLanguage` regenerates `.marquee-track` innerHTML from `marquee.1`–`marquee.8` keys (these use `&amp;` since they go into innerHTML).

**Toggle UI:** `#langToggle` (desktop, hidden at `≤767px`) and `#langToggleMobile` (inside `#mobileMenu`, hidden at `≥768px`) both use `.lang-btn[data-lang]` buttons. Clicking either calls `applyLanguage` and both toggles update together.

**Adding a new translatable string:**
1. Add the `data-i18n[-*]="my.key"` attribute to the element in HTML.
2. Add `'my.key': '...'` to both `TRANSLATIONS.en` and `TRANSLATIONS.ms`.

## JavaScript Features

- **Scroll progress bar:** `#scroll-bar` scaled on X via `transform: scaleX(ratio)`
- **Navbar state:** `.scrolled` class on `#navbar` when `scrollY > 80`
- **Scroll spy:** `.nav-active` toggled on nav links. Sections tracked: `services`, `how-we-work`, `about`, `contact`
- **Hero parallax:** `.hero-content` translates Y at 0.25× scroll, fades out — desktop only
- **Custom cursor:** `#cursor-dot` (snaps) + `#cursor-ring` (0.12 lerp). `.cursor-hover` when over `a, button, .service-card, .pillar`. `body.cursor-ready` hides system cursor
- **Cursor glow:** `--mouse-x` / `--mouse-y` on `:root` drive CSS radial gradients
- **3D card tilt:** `.service-card` rotates ±14deg on mousemove — desktop only
- **Magnetic buttons:** `.btn-primary` / `.btn-secondary` translate 25% of cursor offset — desktop only

## Service Cards

Four cards in a 4-col grid (→ 2-col at 900px → 1-col at 767px). Each `.service-card` has:
- A 40×40 inline SVG icon (`.service-icon`)
- A `.service-card-illustration` div — absolutely positioned bottom-right, `140×120px`, `z-index: 0`, `pointer-events: none`. Contains an inline SVG with CSS animations unique to each card:

| Card | Illustration | Animation keyframes |
|---|---|---|
| Custom AI Apps | Browser + 4 bar columns | `illBar1–4` (scaleY breathe, `transform-box: fill-box`) |
| AI Consulting | Axes + rising line chart | `illLineTrace` (stroke-dashoffset draw) + `illDotPulse` (endpoint pulse) |
| Automation & Integration | 4-node diamond with connectors | `illSignalMove` (stroke-dashoffset dot travel, `stroke-dasharray: 7 57`) |
| AI Agents & Chatbots | Chat bubbles + typing indicator | `illTypeDot` (translateY bounce, staggered) |

The illustration is masked via `mask-image: linear-gradient(to top left, black 0%, transparent 68%)` — visible at bottom-right, dissolves toward top-left. Opacity: `0.1` idle → `0.25` on `.service-card:hover`.

## About Section

Two-column layout. Left column (`.about-photo-side`):
1. `founder.png` in `.about-photo-frame` — gold `3px` left-border accent
2. Founder name + title (`.about-founder-title`, gold uppercase)
3. Credential pills (`.about-cred-pill`) — PETRONAS · ExxonMobil · 13 yrs Data Science

Right column (`.about-right`):
1. Tag → primary `h2` (`.about-heading`): "Enterprise expertise, built for everyone."
2. Subheading (`p.about-subheading`): "Built on wisdom. Delivered with care." — italic, gold, weight 300
3. Body copy (`.about-text`) — uses `<em>` for name/Arabic highlights, `<strong>` for mission close

## Track Record Section

HTML `id="testimonials"` is intentionally kept (section not in nav, but preserves any existing anchors). Three `.result-stat` blocks in a 3-col grid (→ 1-col at 900px), separated by gold hairline borders. Background `#111111` with grain texture.

Each stat: `.result-number` (large gold figure) → `.result-desc` → `.result-source` (gold uppercase, `opacity: 0.5`). Footer `.results-note` is italic, centred, muted. Numbers sourced from founder CV: $50M + $10M at ExxonMobil = $60M+. Replace with real client testimonials when available.

## Contact Form

Formspree AJAX submission. Form ID: `mgoljdzp` — action URL: `https://formspree.io/f/mgoljdzp`. Submissions go to `arifin@arifaisolutions.com`.

Floating label pattern: `.form-field` wraps `<input placeholder=" ">` + `<label>`, floated via `:placeholder-shown`. Success state: inline `.form-success` shown on 200 response; button restored on error.

## Analytics

Google Analytics 4 is wired into `<head>` — Measurement ID: `G-Y37N4RXFL1`. Both `gtag` script tags must stay in sync if the ID ever changes.

## Deployment

- **Repo:** `https://github.com/arifin-arifaisolutions/arif-ai-solutions` (branch: `main`)
- **Host:** Vercel (GitHub account: `arifin-arifaisolutions`) — auto-deploys on push to `main`, no build step
- **Live domain:** `https://arifaisolutions.com` (SSL active, Grade A security headers)
- **DNS (Squarespace Domains):** `A @ 216.198.79.1` + `CNAME www cname.vercel-dns.com`
- **Security headers:** configured in `vercel.json` — do not delete. CSP intentionally omitted (inline CSS/JS requires `unsafe-inline`; add as future hardening if styles/scripts are ever externalised)

## Remaining TODOs

- [ ] Submit `https://arifaisolutions.com/sitemap.xml` to Google Search Console
- [ ] Replace Track Record section stats with real client testimonials when available
- [ ] Add Content-Security-Policy header to `vercel.json` once CSS/JS are externalised (optional hardening — would move grade from A → A+)
