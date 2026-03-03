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
4. HTML sections: Navbar → Hero → Services → Marquee → How We Work → About → Why Choose Us → Testimonials → Contact → Footer
5. JS: feature detection → hero load animation → scroll observer → scroll handler → contact form AJAX → hamburger → cursor → 3D tilt → magnetic buttons

Section backgrounds alternate dark/cream:
- Hero `#0a0a0a` → Services `#f4f1e8` → Marquee gold → How We Work `#0a0a0a` → About `#f4f1e8` → Why `#0a0a0a` → Testimonials `#111111` → Contact `#f4f1e8` → Footer `#0a0a0a`

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
`@media (prefers-reduced-motion: reduce)` sets all durations to `0.01ms`.

## JavaScript Features

- **Scroll progress bar:** `#scroll-bar` scaled on X via `transform: scaleX(ratio)`
- **Navbar state:** `.scrolled` class on `#navbar` when `scrollY > 80`
- **Scroll spy:** `.nav-active` toggled on nav links. Sections tracked: `services`, `how-we-work`, `about`, `contact`
- **Hero parallax:** `.hero-content` translates Y at 0.25× scroll, fades out — desktop only
- **Custom cursor:** `#cursor-dot` (snaps) + `#cursor-ring` (0.12 lerp). `.cursor-hover` when over `a, button, .service-card, .pillar`. `body.cursor-ready` hides system cursor
- **Cursor glow:** `--mouse-x` / `--mouse-y` on `:root` drive CSS radial gradients
- **3D card tilt:** `.service-card` rotates ±14deg on mousemove — desktop only
- **Magnetic buttons:** `.btn-primary` / `.btn-secondary` translate 25% of cursor offset — desktop only

## Contact Form

Uses Formspree for submission. Form action: `https://formspree.io/f/REPLACE_WITH_YOUR_ID` (placeholder — must be replaced with real Formspree form ID).

AJAX handler prevents page redirect, shows inline `.form-success` on success, restores button on error. Fields use the floating label pattern: `.form-field` wraps `<input placeholder=" ">` + `<label>`, floated via `:placeholder-shown`.

## Testimonials Section

Three placeholder cards in a 3-col grid (collapses to 1-col at 900px). All quotes marked `<!-- PLACEHOLDER -->` — replace with real testimonials before launch. Section background is `#111111` (slightly lighter than `--dark`) with grain texture overlay.

## About Section

Two-column layout. Left column (`.about-photo-side`) displays:
1. Founder photo (`founder.png`) in `.about-photo-frame` — gold left-border accent (3px `--gold`)
2. Founder name (`.about-founder-name`) + title (`.about-founder-title`, gold uppercase)
3. Credential pills (`.about-cred-pill`) — PETRONAS · ExxonMobil · 13 yrs Data Science

Right column (`.about-right`) displays:
1. "About Us" tag (`.about-tag`)
2. Primary `h2` (`.about-heading`): "Enterprise expertise, built for everyone."
3. Subheading (`p.about-subheading`): "Built on wisdom. Delivered with care." — italic, gold, weight 300
4. Body copy (`.about-text`) — founder origin story; uses `<em>` for name/Arabic highlights, `<strong>` for mission statement

**Assets:** `founder.png` — Qamarul Arifin bin Abd Manan, founder photo. Lives at project root alongside `index.html`.

## Deployment

- **Repo:** `https://github.com/arifin-arifaisolutions/arif-ai-solutions` (branch: `main`)
- **Host:** Vercel (GitHub account: `arifin-arifaisolutions`) — auto-deploys on push to `main`, no build step, no `vercel.json` needed
- **Target domain:** `arifaisolutions.com`
- **DNS (at registrar):** `A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com`
