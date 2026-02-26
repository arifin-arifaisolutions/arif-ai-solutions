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

## Architecture

**Single file: `index.html`**

All CSS is in a `<style>` block at the top of `<head>`. All JS is in a `<script>` block at the bottom of `<body>`. Structure follows this order:

1. CSS custom properties (`:root`) — all brand tokens defined here
2. Section styles in the same top-to-bottom order as the HTML sections
3. `@media (max-width: 767px)` breakpoints co-located with their section styles
4. HTML sections: Navbar → Hero → Services → How We Work → About → Why Choose Us → Contact → Footer
5. JS: feature detection → hero load animation → scroll observer → scroll handler → hamburger → cursor → 3D tilt → magnetic buttons

## Brand Tokens (do not deviate)

| Token | Value |
|---|---|
| `--gold` | `#c8a800` |
| `--dark` | `#0a0a0a` (section backgrounds) |
| `--cream` | `#f4f1e8` (alternating light sections) |
| `--text-dark` | `#1a1a1a` |
| Font | Plus Jakarta Sans 300/500/700 (Google Fonts) |

Sections alternate dark/cream: Hero (dark) → Services (cream) → How We Work (dark) → About (cream) → Why Choose Us (dark) → Contact (cream) → Footer (dark).

## Logo SVG

The logo mark is an inline SVG: `viewBox="0 0 96 96"`, gold circle outline + 5 vertical bars (alternating white/gold). Used at three sizes — SM in navbar (`28×28`), XL animated in hero (`120×120`), XS in footer (`20×20`). The hero bars have individual `@keyframes` (`barBreath1`–`barBreath5`) with offset delays to create an asynchronous breathing pulse.

The wordmark pattern: `[` (gold, weight 300) + `arif` (white/#1a1a1a, weight 500) + `AI` (gold, weight 700) + `]` (gold, weight 300), with `solutions` in small uppercase spaced tracking below.

## Animations

- **Hero bars:** CSS `@keyframes` on `<line>` elements using `transform-origin: center center` + `transform-box: fill-box`
- **Hero word reveal:** `.hero-word` elements get `.revealed` class via staggered `setTimeout` on `window load`
- **Scroll fade-ins:** `.fade-in` class starts `opacity: 0; transform: translateY(28px)`. JS `IntersectionObserver` adds `.visible` when element enters viewport. Hero elements are triggered on `window load` with staggered `setTimeout` instead.
- **Stagger delays:** `.fade-in-delay-1/2/3/4` add `transition-delay` for sibling elements in a group.
- **Stat count-up:** `.stat-num[data-target]` elements animate from 0 to their `data-target` value (ease-out cubic, 1600ms) when they enter the viewport via the same `IntersectionObserver`.

## JavaScript Features

All motion effects gate on two feature flags at the top of the script:

```js
const IS_TOUCH   = window.matchMedia('(hover: none)').matches;
const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

- **Scroll progress bar:** `#scroll-bar` element scaled on X axis via `transform: scaleX(ratio)`.
- **Navbar state:** `.scrolled` class added to `#navbar` when `scrollY > 80`.
- **Scroll spy:** `.nav-active` class toggled on nav `<a>` elements matching the visible section. Sections tracked: `services`, `how-we-work`, `about`, `contact`.
- **Hero parallax:** `.hero-content` translates Y at 0.25× scroll and fades out — desktop only (`!IS_TOUCH`).
- **Custom cursor:** `#cursor-dot` (snaps instantly) + `#cursor-ring` (trails with 0.12 lerp factor). `.cursor-hover` class on ring when over `a, button, .service-card, .pillar`. Enabled desktop-only; `body.cursor-ready` class added to hide system cursor via CSS.
- **Cursor glow:** `--mouse-x` / `--mouse-y` CSS custom properties set on `:root` for use in CSS radial gradients.
- **3D card tilt:** `.service-card` elements rotate up to ±14deg on mousemove. Desktop only.
- **Magnetic buttons:** `.btn-primary` and `.btn-secondary` translate up to 25% of cursor offset on mousemove. Desktop only.

## Contact Form

The form uses a `mailto:` action (`action="mailto:hello@arifaisolutions.com" method="GET"`). Fields use the floating label pattern: each `.form-field` contains an `<input>` (or `<textarea>`) with `placeholder=" "` followed by a `<label>`, styled with `:placeholder-shown` to float the label when filled.

## Deployment

- **Repo:** `https://github.com/arifin-arifaisolutions/arif-ai-solutions` (branch: `main`)
- **Target domain:** `arifaisolutions.com`
- **Host:** Vercel (GitHub account: `arifin-arifaisolutions`) — static HTML, no build step, no `vercel.json` needed
- **DNS (at registrar):** `A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com`
