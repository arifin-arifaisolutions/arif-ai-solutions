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
