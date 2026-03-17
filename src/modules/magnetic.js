export function initMagnetic() {
  const IS_TOUCH = window.matchMedia('(hover: none)').matches;

  if (!IS_TOUCH) {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.25;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Nav link subtle magnetic
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('mousemove', e => {
        const r  = link.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.08;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.08;
        link.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
      });
    });
  }
}
