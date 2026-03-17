# arifAI Solutions — UI/UX Redesign Spec
**Date:** 2026-03-17
**Branch:** ui/premium-refinements
**Approach:** C — Full UX redesign with interactive narrative

---

## 1. Overview

### Problem
Visitors leave without booking a call because they don't understand what services are offered or whether those services apply to their business. The gap is both "what do you do" and "is this for me."

### Goal
Redesign the site to immediately communicate:
1. What problem we solve (outcome-first hero)
2. Who we solve it for (new "Who We Help" section)
3. What we specifically do (restructured Services cards with use cases)
4. Why we can be trusted (trust signals surfaced earlier, FAQ handling objections)

### Scope
Full codebase migration from a single `index.html` to a Vite + npm multi-file project. All existing functionality preserved. Two new sections added. Several existing sections enhanced.

---

## 2. Architecture

### Migration: Single file → Vite project

**Current:** everything inline in `index.html` (2672 lines)

**New structure:**
```
/
├── index.html               # entry point, section HTML only
├── package.json
├── vite.config.js
├── public/
│   ├── founder.png
│   ├── og-image.jpg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.js              # entry — imports all modules + styles
    ├── styles/
    │   ├── tokens.css       # :root custom properties (brand tokens)
    │   ├── base.css         # reset, typography, utilities, fade-in
    │   ├── navbar.css
    │   ├── hero.css
    │   ├── who-we-help.css  # NEW
    │   ├── services.css
    │   ├── marquee.css
    │   ├── how-we-work.css
    │   ├── about.css
    │   ├── why-choose-us.css
    │   ├── track-record.css
    │   ├── faq.css          # NEW
    │   ├── contact.css
    │   └── footer.css
    └── modules/
        ├── i18n.js          # TRANSLATIONS dict + applyLanguage + initLang
        ├── navbar.js        # scroll state, mobile menu, scroll spy
        ├── hero-constellation.js  # NEW — canvas constellation animation
        ├── cursor.js        # custom cursor + cursor glow
        ├── scroll-animations.js   # GSAP ScrollTrigger — How We Work narrative
        ├── services-expand.js     # NEW — hover expand use cases
        ├── contact-form.js  # Formspree AJAX
        ├── tilt.js          # 3D card tilt
        └── magnetic.js      # magnetic buttons
```

### Build & Deploy
- `vite build` → `dist/`
- `vercel.json` must be updated to add `buildCommand: "vite build"` and `outputDirectory: "dist"` alongside the existing security headers, otherwise Vercel will not know to run the build or where to serve from
- `public/` assets copied to `dist/` root automatically by Vite
- Existing security headers in `vercel.json` unchanged

### npm dependencies
- `gsap` — ScrollTrigger for How We Work scroll narrative
- `vite` (dev) — build tool

---

## 3. Page Structure

**Before:**
Navbar → Hero → Services → Marquee → How We Work → About → Why Choose Us → Track Record → Contact → Footer

**After:**
Navbar → Hero → **Who We Help** → Services → Marquee → How We Work → About → Why Choose Us → Track Record → **FAQ** → Contact → Footer

---

## 4. Background System

Applied consistently across all sections.

### Cream sections (Who We Help, About, Contact)
Option E — gold radial glow + corner grid:
- `radial-gradient` glow: top-right corner, `rgba(200,168,0,0.10)`, `500px` radius, blurred
- Faint gold grid lines: `80px` spacing, `rgba(200,168,0,0.10)`, masked via `radial-gradient` to top-right quadrant only

### Dark sections (How We Work, Why Choose Us, Track Record, Footer)
Options E + F combined:
- **Grain:** SVG `feTurbulence` noise overlay, `opacity: 0.04`, `mix-blend-mode: screen`
- **Dual corner glows:** bottom-left `rgba(200,168,0,0.10)` + top-right `rgba(200,168,0,0.07)`, both blurred ellipses
- **Dot grid:** `radial-gradient` dot pattern `36px` spacing, gold `0.1` opacity, masked to centre fade — same as hero but static (no `dotDrift` animation)

---

## 5. Section Designs

### 5.1 Hero

**Background:**
- Existing dot grid (`dotDrift` animation) — kept
- Existing two glowing orbs (`orbFloat1/2`) — kept
- **NEW: Constellation canvas** — `<canvas>` fills the hero absolutely, `z-index: 1`. 30 gold dots (`rgba(200,168,0,0.45)`) drift slowly. Lines drawn between dots within `150px`, opacity scales `0–0.18` with proximity. Density default 30 dots. Canvas resizes on window resize. If `prefers-reduced-motion` is active, canvas renders static dots at initial positions with no animation loop (`requestAnimationFrame` not called).
- Cursor glow (`--mouse-x/y` radial gradient) — kept

**Layout:** Two-column grid unchanged (`1fr 320px`, `gap: 72px`)

**Left column — updated copy:**
```
Headline (h1):   "Your business,
                  automated by AI."
                 [two lines, second line gold]

Sub (p):         "Practical AI solutions for Malaysian SMEs —
                  from custom apps to intelligent agents."
                 [single sentence, no more than 15 words]

CTAs:            [Book a Free Call] (btn-primary)   See how it works →
```
No credential strip, no stat blocks, no problem strip — maximum restraint.

**Right column:** Animated logo unchanged — breathing bars (`barBreath1–5`), ring pulse (`ringPulse`), concentric spinning rings (`hrfSpin1/2`), ambient glow div.

---

### 5.2 Who We Help (NEW)

**Background:** Cream (Option E treatment)
**Position:** Immediately after Hero

**Layout:** Two-column grid (`1fr 1fr`, `gap: 80px`)

**Left column:**
- Label tag: `WHO WE HELP` (gold, uppercase, underlined with gold border)
- Heading: `"Does any of this sound familiar?"` — `font-size: 42px`, with `em` styled italic/light for "sound familiar?"
- Pain-point list (`.pain-list`): 4 rows, each with:
  - Circle marker (20px, border `1.5px`): on hover → fills gold, dash icon turns dark
  - Text: 15px, plain sentence describing a real SME pain point
  - Row separated by `1px` hairlines top/bottom
  - Hover: marker fills gold, smooth transition

**Pain points (copy):**
1. "Your team spends hours every week manually compiling reports or updating spreadsheets"
2. "Customers ask the same questions repeatedly — and your staff handles every single one"
3. "Your business tools don't connect — data lives in silos and nothing syncs automatically"
4. "You know AI could help your business — but you don't know where to begin or who to trust"

**Right column:**
- Gold divider line (48px × 2px)
- Heading: `"You're in the right place."` — "right place." in gold
- Body copy (exact text):
  > "arifAI Solutions works with **Malaysian SMEs** to turn these exact frustrations into working AI solutions — practical, affordable, and built around how your business actually runs.
  >
  > No jargon. No enterprise contracts. Just **focused work that solves real problems** — from someone who has spent 13 years doing exactly that at PETRONAS and ExxonMobil."
- Service pills: `Custom AI Apps` · `Automation` · `AI Chatbots` · `Strategy & Consulting` — gold tint background, gold border, border-radius 20px
- CTA link: `See how we work →` — gold underline style, gap animates on hover
- Body copy uses `<strong>` tags → use `data-i18n-html` attribute for this element

**i18n:** All copy annotated with `data-i18n` / `data-i18n-html` keys. BM translations required for all strings.

---

### 5.3 Services (restructured)

**Background:** **Dark** (`#0a0a0a`). The Marquee ticker immediately after Services is also dark, but Marquee is a narrow full-bleed ticker band — not a content section — and is exempt from the alternation rule. This is consistent with the existing pattern where How We Work and Why Choose Us are also consecutive dark sections. The section sequence with backgrounds is: Hero(dark) → Who We Help(cream) → Services(dark) → Marquee(dark ticker band) → How We Work(dark) → About(cream).
**Layout:** 4-col grid unchanged, but each card redesigned

**Card design (Option B — expand on hover):**
- Background: `#111`, border `rgba(255,255,255,0.07)`
- Hover: border brightens to `rgba(200,168,0,0.35)`, dot grid fades in on card background
- Structure (top to bottom):
  1. SVG icon (32×32, gold stroke, `stroke-width: 1.5`)
  2. Service name (`font-size: 15px`, bold, white)
  3. One-line description (`font-size: 12px`, muted)
  4. **Use cases block** (hidden at rest, slides in on hover):
     - Label: `e.g.` (gold, small caps)
     - 3 bullet items: `→` prefix in gold, `font-size: 11px`, muted

**Use cases per service:**
- Custom AI Apps: auto-generated reports · invoice processing · inventory dashboards
- AI Agents & Chatbots: WhatsApp FAQ bot · HR policy assistant · booking agent
- Automation & Integration: sync CRM/accounting/ops · workflow triggers · reporting pipelines
- AI Consulting: AI opportunity mapping · build-vs-buy evaluation · 12-month roadmap

**Hover transition:** `max-height: 0 → 120px`, `opacity: 0 → 1`, `0.4s ease`

**Existing service card illustrations** (`.service-card-illustration`) — kept unchanged.

---

### 5.4 How We Work (enhanced)

**Background:** Dark (E + F treatment)
**Enhancement:** GSAP ScrollTrigger scroll-triggered step reveal

**DOM structure:** Unchanged from current. Existing `.step` elements are kept as-is. Only CSS classes and GSAP-driven behaviour are added — no HTML restructuring.

Each process step (`.step`) animates in sequence as the user scrolls through the section:
- **At rest:** step number muted, title muted, opacity reduced (`0.4`)
- **Becomes active:** step number highlights gold, title transitions to full white, opacity `1`, left border accent traces in via `scaleY` from `0→1`
- Steps activate one at a time in DOM order as `ScrollTrigger` scrub advances
- Uses `gsap.timeline()` with `ScrollTrigger` `{ scrub: true, start: "top 70%", end: "bottom 30%" }` on the section
- **Fallback:** `prefers-reduced-motion` or touch device → all steps rendered fully visible immediately, no GSAP applied

---

### 5.5 Track Record (enhanced)

**Background:** `#111111` with grain (existing)
**Enhancement:** Each `.result-stat` block gets a mini case study snippet below the number:

Structure per stat:
```
$60M+           ← .result-number (gold, large)
Value delivered ← .result-desc
─────────────── ← thin gold hairline (NEW)
"Automated..."  ← .result-case (italic, muted, 13px) (NEW)
PETRONAS        ← .result-source (gold, uppercase, low opacity)
```

**Case text copy (all three blocks):**

| Stat | Number | Desc | Case text | Source |
|---|---|---|---|---|
| 1 | `$60M+` | Value delivered | *"Engineered AI optimisation models that directly improved production economics across upstream operations"* | EXXONMOBIL |
| 2 | `13 yrs` | Enterprise AI experience | *"Led data science initiatives across exploration, production, and commercial functions at two of the world's largest energy companies"* | PETRONAS · EXXONMOBIL |
| 3 | `4–8 wks` | Typical project delivery | *"From discovery to working solution — built around your business, not a generic template"* | ARIFAI SOLUTIONS |

---

### 5.6 FAQ (NEW)

**Background:** Cream (Option E treatment)
**Position:** Between Track Record and Contact
**Layout:** Option C — editorial split

Structure:
- Label tag: `FAQ`
- Heading: `"Questions we always get asked"` — "always get asked" in italic light
- List of 4 items, each a two-column row (`1fr 1.4fr`, `gap: 48px`):
  - Left: question number (`01`–`04`, gold faint) + question text (bold, 16px)
  - Right: full answer (14px, muted, `line-height: 1.75`)
  - Rows separated by `1px` hairlines top/bottom

**Questions & answers:**
1. How long does a typical project take? → 4–8 weeks typical; chatbots/automations as fast as 2 weeks; complex apps 2–3 months; clear timeline given upfront.
2. Do I need technical knowledge? → No. We translate between business needs and technology. Plain language throughout.
3. What does it cost? → Simple automations from a few thousand ringgit. Custom apps scoped individually. First call always free.
4. Can you work with our existing tools? → Yes — Google Workspace, Microsoft 365, WhatsApp, accounting software, CRMs, and more.

**i18n:** FAQ question and answer text contains no HTML tags — use `data-i18n` (`textContent`) for both question and answer elements. BM translations required for all 4 Q&A pairs.

---

### 5.7 Contact (enhanced)

**Background:** Cream (Option E treatment) — unchanged layout

**Mobile sticky CTA bar (NEW):**
- Fixed bar at bottom of viewport on mobile (`≤767px`) only
- Contains: `Book a Free Call` button (full width, gold)
- Appears after user scrolls past hero (`scrollY > window.innerHeight`)
- Hidden when contact section is in viewport (avoid duplication)
- `z-index: 200`, `padding: 12px 20px`, dark background with gold top border

---

## 6. Mobile Enhancements

- Sticky CTA bar (see §5.7)
- Touch targets minimum `44px` height on all interactive elements
- Service cards: hover expand replaced with tap-to-toggle on touch devices (`IS_TOUCH` flag). Accordion behaviour — tapping a card opens it and closes any previously open card. A second tap on the same card closes it.
- Who We Help pain-point hover states: disabled on touch, items always visible
- Constellation canvas: reduced to 18 dots on mobile for performance

---

## 7. i18n

All new sections (Who We Help, FAQ) and updated copy must be added to `TRANSLATIONS.en` and `TRANSLATIONS.ms` in `src/modules/i18n.js`. The `applyLanguage` function applies to all `data-i18n*` attributes.

New key prefixes:
- `who.` — Who We Help section
- `faq.` — FAQ section
- `hero.headline`, `hero.sub` — updated hero copy

---

## 8. Preserved Functionality

All existing functionality carried over unchanged:
- GA4 analytics (`G-Y37N4RXFL1`)
- Formspree contact form (`mgoljdzp`)
- Custom cursor + cursor ring (desktop only)
- 3D card tilt on service cards (desktop only)
- Magnetic buttons (desktop only)
- Scroll progress bar (`#scroll-bar`)
- Navbar scroll spy + `.scrolled` state
- Hero parallax (`0.25×` scroll, desktop only)
- `prefers-reduced-motion` gates on all animations
- Marquee ticker with i18n regeneration
- Language toggle (EN/BM) — desktop + mobile
- Schema.org structured data
- `vercel.json` security headers
- `robots.txt` + `sitemap.xml`

---

## 9. Out of Scope

- Pricing page
- Blog / case studies page
- Authentication
- CMS integration
- CSP header (deferred — requires externalised scripts)
- LinkedIn / WhatsApp links (pending business account setup)
