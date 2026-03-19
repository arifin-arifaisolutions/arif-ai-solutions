# FAQ Dynamic Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add stagger slide-up entry animation and hover highlight effect to the FAQ section, keeping all answers visible.

**Architecture:** Remove the existing global `.fade-in` classes from `.faq-item` elements to avoid observer conflicts, then add a self-contained `faq-animate.js` module that owns both the entry stagger (IntersectionObserver) and the hover highlight (mouseenter/mouseleave, desktop-only). All animation state is managed via CSS classes toggled by JS.

**Tech Stack:** Vanilla JS (IntersectionObserver, mousemove events), CSS transitions — no new dependencies.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Modify lines 675, 685, 695, 705 | Remove `.fade-in` / `.fade-in-delay-*` from `.faq-item` elements |
| `src/styles/faq.css` | Modify | Add stagger entry states + hover highlight rules |
| `src/modules/faq-animate.js` | Create | Entry observer + hover listeners |
| `src/main.js` | Modify | Import + call `initFaqAnimate()` |

---

## Task 1: Remove `.fade-in` classes from FAQ items in HTML

**Files:**
- Modify: `index.html:675,685,695,705`

- [ ] **Step 1: Edit `index.html` — remove `.fade-in` and delay classes from all four `.faq-item` elements**

  Line 675 — change:
  ```html
  <div class="faq-item fade-in">
  ```
  to:
  ```html
  <div class="faq-item">
  ```

  Line 685 — change:
  ```html
  <div class="faq-item fade-in fade-in-delay-1">
  ```
  to:
  ```html
  <div class="faq-item">
  ```

  Line 695 — change:
  ```html
  <div class="faq-item fade-in fade-in-delay-2">
  ```
  to:
  ```html
  <div class="faq-item">
  ```

  Line 705 — change:
  ```html
  <div class="faq-item fade-in fade-in-delay-3">
  ```
  to:
  ```html
  <div class="faq-item">
  ```

- [ ] **Step 2: Verify in browser — FAQ items should now appear instantly on scroll (no animation yet)**

  ```bash
  npm run dev
  ```
  Scroll to the FAQ section. Items should be fully visible immediately — no fade-in. This confirms the global observer no longer controls them.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "refactor: remove fade-in classes from faq-items — animation ownership moved to faq-animate module"
  ```

---

## Task 2: Add stagger entry + hover CSS to `faq.css`

**Files:**
- Modify: `src/styles/faq.css`

- [ ] **Step 1: Add the new CSS rules to `src/styles/faq.css`**

  Append the following to the end of the file (before the closing `@media` block if you need to keep mobile styles last — or after the existing `@media` block is fine since none of these rules need mobile overrides):

  ```css
  /* ── FAQ stagger entry ── */
  .faq-item {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.45s ease, transform 0.45s ease, border-color 0.25s ease, padding-left 0.25s ease;
  }
  .faq-item:nth-child(2) { transition-delay: 80ms; }
  .faq-item:nth-child(3) { transition-delay: 160ms; }
  .faq-item:nth-child(4) { transition-delay: 240ms; }

  .faq-item--visible {
    opacity: 1;
    transform: none;
  }

  /* ── FAQ hover highlight ── */
  .faq-list--hovering .faq-item:not(.faq-item--hovered) {
    opacity: 0.7;
  }

  .faq-item--hovered {
    border-top-color: rgba(200, 168, 0, 0.5);
    padding-left: 8px;
  }

  .faq-item:last-child.faq-item--hovered {
    border-bottom-color: rgba(200, 168, 0, 0.5);
  }

  .faq-item--hovered .faq-q p {
    color: var(--gold);
  }

  /* ── Reduced motion overrides ── */
  @media (prefers-reduced-motion: reduce) {
    .faq-item {
      transition-duration: 0.01ms !important;
      transform: none;
    }
    .faq-item:nth-child(2),
    .faq-item:nth-child(3),
    .faq-item:nth-child(4) {
      transition-delay: 0ms;
    }
  }
  ```

  > **Note:** The existing `.faq-item` rule at line 14 sets `display`, `grid-template-columns`, `gap`, `align-items`, `padding`, and `border-top`. The new rules **add** `opacity`, `transform`, and `transition` to the same selector — CSS merges them. No conflict.

- [ ] **Step 2: Verify in browser — FAQ items should now be invisible on load**

  ```bash
  npm run dev
  ```
  Scroll to the FAQ section. All four items should be invisible (opacity 0, shifted down). This confirms the CSS base state is working. The JS module (Task 3) will reveal them.

- [ ] **Step 3: Commit**

  ```bash
  git add src/styles/faq.css
  git commit -m "style: add faq stagger entry and hover highlight css"
  ```

---

## Task 3: Create `faq-animate.js` module

**Files:**
- Create: `src/modules/faq-animate.js`

- [ ] **Step 1: Create the file `src/modules/faq-animate.js`**

  ```js
  const IS_TOUCH   = window.matchMedia('(hover: none)').matches
  const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  export function initFaqAnimate () {
    const section = document.getElementById('faq')
    const list    = section?.querySelector('.faq-list')
    const items   = section ? [...section.querySelectorAll('.faq-item')] : []
    if (!section || !items.length) return

    // ── 1. Stagger entry ──────────────────────────────────────────
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (IS_REDUCED) {
        items.forEach(el => el.classList.add('faq-item--visible'))
      } else {
        items.forEach((el, i) =>
          setTimeout(() => el.classList.add('faq-item--visible'), i * 80)
        )
      }
      observer.disconnect()
    }, { threshold: 0.15 })

    observer.observe(section)

    // ── 2. Hover highlight (desktop only) ────────────────────────
    if (IS_TOUCH) return

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        list.classList.add('faq-list--hovering')
        item.classList.add('faq-item--hovered')
      })
      item.addEventListener('mouseleave', () => {
        list.classList.remove('faq-list--hovering')
        item.classList.remove('faq-item--hovered')
      })
    })
  }
  ```

- [ ] **Step 2: Verify in browser — FAQ items should now stagger-reveal on scroll**

  ```bash
  npm run dev
  ```
  The module is not wired up yet (Task 4 does that), so items will still be invisible. This step is just confirming the file was saved correctly — no JS errors in the browser console when the page loads.

- [ ] **Step 3: Commit**

  ```bash
  git add src/modules/faq-animate.js
  git commit -m "feat: add faq-animate module — stagger entry observer and hover highlight"
  ```

---

## Task 4: Wire module into `main.js`

**Files:**
- Modify: `src/main.js`

- [ ] **Step 1: Add import and init call to `src/main.js`**

  Add the import after the existing `initScrollAnimations` import on line 25:
  ```js
  import { initFaqAnimate } from './modules/faq-animate.js'
  ```

  Add the init call after `initScrollAnimations()` on line 36:
  ```js
  initFaqAnimate()
  ```

- [ ] **Step 2: Verify the full feature in browser**

  ```bash
  npm run dev
  ```

  Test checklist:
  - [ ] Scroll to FAQ — items stagger slide up, 80ms apart
  - [ ] Hover row 1 — question text turns gold, top border turns gold, left indent nudges 8px
  - [ ] While hovering row 1 — rows 2, 3, 4 dim to ~70% opacity
  - [ ] Hover row 4 (last) — both top AND bottom border turn gold
  - [ ] Move mouse off — all rows return to normal
  - [ ] Check on mobile viewport (DevTools device toolbar) — hover effect absent, stagger entry works
  - [ ] Enable "Emulate CSS media feature prefers-reduced-motion" in DevTools — all items appear instantly with no animation

- [ ] **Step 3: Commit**

  ```bash
  git add src/main.js
  git commit -m "feat: wire initFaqAnimate into main.js"
  ```

---

## Task 5: Final check + push

- [ ] **Step 1: Run the dev build and do a full page scroll-through**

  ```bash
  npm run dev
  ```

  - Scroll through the full page to confirm no regressions in other sections
  - Check the FAQ section in both EN and BM (toggle language) — i18n content updates correctly, animations are unaffected

- [ ] **Step 2: Build for production and verify no errors**

  ```bash
  npm run build
  ```

  Expected: clean build, no warnings about `faq-animate.js`.

- [ ] **Step 3: Push branch**

  ```bash
  git push origin ui/premium-refinements
  ```
