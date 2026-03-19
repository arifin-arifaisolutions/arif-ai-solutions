# FAQ Section — Hover Highlight + Stagger Entry Design

**Date:** 2026-03-19
**Branch:** `ui/premium-refinements`
**Status:** Approved

---

## Overview

Enhance the existing FAQ section (`#faq`) from a fully static layout to a dynamic one using two complementary effects:

1. **Stagger slide-up entry** — items animate in with a staggered translateY reveal as the section scrolls into view
2. **Hover highlight + subtle dim** — hovering a row highlights it in gold while inactive rows dim to 70% opacity

All answers remain fully visible — no accordion collapse. No new dependencies.

---

## HTML Change (one targeted exception)

The four `.faq-item` elements in `index.html` currently carry `.fade-in` and `.fade-in-delay-*` classes. These must be **removed** from all four items, because the new `faq-animate.js` module takes full ownership of their entry animation. Leaving the classes in place would cause the global scroll observer (in `navbar.js`) to animate the same elements, creating a race condition.

This is the only HTML change. No structural or i18n changes.

---

## Behaviour

### 1. Stagger Slide-Up Entry

- Each `.faq-item` base state: `opacity: 0; transform: translateY(24px); transition: opacity 0.45s ease, transform 0.45s ease`
- `IntersectionObserver` on `#faq` (threshold `0.15`). On intersect, add `.faq-item--visible` to each item with a staggered `setTimeout` (80ms × item index)
- `.faq-item--visible` revealed state: `opacity: 1; transform: none`
- Observer disconnects after firing (one-shot)
- **Reduced motion:** If `IS_REDUCED` is true, skip `setTimeout` stagger entirely — add `.faq-item--visible` to all items synchronously within the observer callback. CSS `prefers-reduced-motion` overrides already collapse transition durations to `0.01ms`

### 2. Hover Highlight

Gated behind `!IS_TOUCH` — on touch devices, hover listeners are not attached (avoids persistent dim state on iOS Safari where `mouseleave` does not fire on tap-away).

A JS listener on each `.faq-item` manages two CSS classes:

| Class | Applied to | Effect |
|---|---|---|
| `.faq-list--hovering` | `.faq-list` | Parent signal that a row is active |
| `.faq-item--hovered` | The hovered `.faq-item` | Marks the active row |

**Hovered row (`.faq-item--hovered`):**
- `.faq-q p` color → `var(--gold)` (`#c8a800`)
- `border-top-color` → `rgba(200, 168, 0, 0.5)`
- `padding-left` → `8px` (subtle indent nudge)

**Last-child hovered (`.faq-item:last-child.faq-item--hovered`):**
- `border-bottom-color` → `rgba(200, 168, 0, 0.5)` (matches top border for visual consistency)

**Inactive rows (`.faq-list--hovering .faq-item:not(.faq-item--hovered)`):**
- `opacity: 0.7`

**All transitions:** `0.25s ease`

---

## Implementation Scope

### CSS changes (`src/styles/faq.css`)

- Add base hidden state to `.faq-item`: `opacity: 0; transform: translateY(24px); transition: opacity 0.45s ease, transform 0.45s ease`
- Add stagger delays: `.faq-item:nth-child(2)` → `transition-delay: 80ms`, `:nth-child(3)` → `160ms`, `:nth-child(4)` → `240ms`
- Add `.faq-item--visible`: `opacity: 1; transform: none`
- Add `.faq-list--hovering .faq-item:not(.faq-item--hovered)`: `opacity: 0.7`
- Add `.faq-item--hovered` highlight rules: `border-top-color`, `padding-left`, `.faq-q p` color
- Add `.faq-item:last-child.faq-item--hovered`: `border-bottom-color`
- Add `@media (prefers-reduced-motion: reduce)` override: transition durations `0.01ms`, no transform (covers both entry and hover transitions)

### JS — new module (`src/modules/faq-animate.js`)

Single exported `initFaqAnimate()` function:

```js
// Pseudocode
export function initFaqAnimate() {
  const IS_TOUCH   = window.matchMedia('(hover: none)').matches;
  const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const section    = document.getElementById('faq');
  const list       = section?.querySelector('.faq-list');
  const items      = section ? [...section.querySelectorAll('.faq-item')] : [];
  if (!section) return;

  // 1. Entry animation
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    if (IS_REDUCED) {
      items.forEach(el => el.classList.add('faq-item--visible'));
    } else {
      items.forEach((el, i) =>
        setTimeout(() => el.classList.add('faq-item--visible'), i * 80)
      );
    }
    observer.disconnect();
  }, { threshold: 0.15 });
  observer.observe(section);

  // 2. Hover highlight (desktop only)
  if (!IS_TOUCH) {
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        list.classList.add('faq-list--hovering');
        item.classList.add('faq-item--hovered');
      });
      item.addEventListener('mouseleave', () => {
        list.classList.remove('faq-list--hovering');
        item.classList.remove('faq-item--hovered');
      });
    });
  }
}
```

### `src/main.js`

Import and call `initFaqAnimate()`.

### `index.html`

Remove `.fade-in` and `.fade-in-delay-*` classes from all four `.faq-item` elements.

---

## What Does NOT Change

- HTML structure of `#faq` — only class attribute edits on `.faq-item` elements
- Two-column grid layout — unchanged
- i18n attributes — unchanged
- All answers remain fully visible — no accordion
- Mobile layout — existing `grid-template-columns: 1fr` breakpoint untouched

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Remove `.fade-in` / `.fade-in-delay-*` from four `.faq-item` elements |
| `src/styles/faq.css` | Add stagger entry + hover highlight CSS rules |
| `src/modules/faq-animate.js` | New module — entry observer + hover listeners |
| `src/main.js` | Import + call `initFaqAnimate()` |
