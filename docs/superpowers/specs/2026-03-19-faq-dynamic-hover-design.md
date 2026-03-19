# FAQ Section — Hover Highlight + Stagger Entry Design

**Date:** 2026-03-19
**Branch:** `ui/premium-refinements`
**Status:** Approved

---

## Overview

Enhance the existing FAQ section (`#faq`) from a fully static layout to a dynamic one using two complementary effects:

1. **Stagger slide-up entry** — items animate in with a staggered translateY reveal as the section scrolls into view
2. **Hover highlight + subtle dim** — hovering a row highlights it in gold while inactive rows dim to 70% opacity

No structural HTML changes. No new dependencies. No accordion collapse — all answers remain visible.

---

## Behaviour

### 1. Stagger Slide-Up Entry

- Each `.faq-item` starts at `opacity: 0; transform: translateY(24px)`
- On scroll entry (IntersectionObserver on `#faq`), items transition to `opacity: 1; transform: translateY(0)` in sequence
- Stagger delay: **80ms per item** (item 1 = 0ms, item 2 = 80ms, item 3 = 160ms, item 4 = 240ms)
- Transition: `opacity 0.45s ease, transform 0.45s ease`
- Fires once (observer disconnects after triggering)
- Respects `prefers-reduced-motion`: if reduced motion, items appear instantly with no transform

### 2. Hover Highlight

Triggered by `mouseenter` / `mouseleave` on each `.faq-item`. A JS listener on `.faq-list` manages two CSS classes:

| Class | Applied to | Effect |
|---|---|---|
| `.faq-list--hovering` | `.faq-list` | Signals that a row is active |
| `.faq-item--hovered` | The hovered `.faq-item` | Marks the active row |

**Hovered row (`.faq-item--hovered`):**
- `.faq-q p` color → `var(--gold)` (`#c8a800`)
- `border-top-color` → `rgba(200, 168, 0, 0.5)`
- `padding-left` → `8px` (subtle indent nudge)

**Inactive rows (`.faq-list--hovering .faq-item:not(.faq-item--hovered)`):**
- `opacity: 0.7`

**All transitions:** `0.25s ease`

**Touch / reduced-motion:** Hover effect is CSS-only once classes are toggled — on touch devices, `mouseleave` fires on tap-away naturally. No special handling needed.

---

## Implementation Scope

### CSS changes (`src/styles/faq.css`)

- Add `opacity: 0; transform: translateY(24px); transition: opacity 0.45s ease, transform 0.45s ease` to `.faq-item` base state
- Add `.faq-item.faq-item--visible` revealed state (`opacity: 1; transform: none`)
- Add stagger delay rules: `.faq-item:nth-child(2)`, `:nth-child(3)`, `:nth-child(4)` with `transition-delay`
- Add `.faq-list--hovering .faq-item:not(.faq-item--hovered)` dim rule
- Add `.faq-item--hovered` highlight rules (border, padding-left, question color)
- Add `@media (prefers-reduced-motion: reduce)` override: all durations `0.01ms`, no transform

### JS — new module (`src/modules/faq-animate.js`)

Single exported `initFaqAnimate()` function:

1. **Entry observer:** `IntersectionObserver` on `#faq` (threshold `0.15`). On intersect: add `.faq-item--visible` to each item with `setTimeout` stagger (80ms × index). Disconnect after firing.
2. **Hover listeners:** `mouseenter` → add `.faq-list--hovering` to list + `.faq-item--hovered` to item. `mouseleave` → remove both.

### `src/main.js`

Import and call `initFaqAnimate()`.

---

## What Does NOT Change

- HTML structure of `#faq` — no modifications
- Two-column grid layout — unchanged
- i18n attributes — unchanged
- All answers remain fully visible — no accordion
- Mobile styles — the existing `grid-template-columns: 1fr` breakpoint is untouched; hover effect still works on mobile tap

---

## Files Changed

| File | Change |
|---|---|
| `src/styles/faq.css` | Add stagger + hover CSS rules |
| `src/modules/faq-animate.js` | New module — entry observer + hover listeners |
| `src/main.js` | Import + call `initFaqAnimate()` |
