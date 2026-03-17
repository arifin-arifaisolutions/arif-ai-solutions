export function initTilt() {
  const IS_TOUCH = window.matchMedia('(hover: none)').matches;

  if (!IS_TOUCH) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
        card.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
