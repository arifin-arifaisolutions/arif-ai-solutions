const IS_TOUCH = window.matchMedia('(hover: none)').matches

export function initServicesExpand() {
  if (!IS_TOUCH) return  // desktop: CSS hover handles it

  const cards = document.querySelectorAll('.service-card')

  function setExpanded(card, open) {
    const usecases = card.querySelector('.service-usecases')
    card.classList.toggle('expanded', open)
    if (usecases) usecases.setAttribute('aria-hidden', open ? 'false' : 'true')
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('expanded')
      // close all
      cards.forEach(c => setExpanded(c, false))
      // open this one if it was closed
      if (!isOpen) setExpanded(card, true)
    })
  })
}
