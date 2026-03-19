const IS_TOUCH   = window.matchMedia('(hover: none)').matches
const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initFaqAnimate () {
  const section = document.getElementById('faq')
  const list    = section?.querySelector('.faq-list')
  const items   = section ? [...section.querySelectorAll('.faq-item')] : []
  if (!section || !list || !items.length) return

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
