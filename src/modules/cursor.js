export function initCursor() {
  const IS_TOUCH = window.matchMedia('(hover: none)').matches;

  if (!IS_TOUCH) {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.body.classList.add('cursor-ready');

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      // Cursor glow via CSS custom properties
      document.documentElement.style.setProperty('--mouse-x',
        (e.clientX / window.innerWidth  * 100).toFixed(1) + '%');
      document.documentElement.style.setProperty('--mouse-y',
        (e.clientY / window.innerHeight * 100).toFixed(1) + '%');
    });

    const INTERACTIVE = 'a, button, .service-card, .pillar';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(INTERACTIVE)) ring.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(INTERACTIVE)) ring.classList.remove('cursor-hover');
    });

    (function tick() {
      dot.style.transform  = `translate(${mx}px,${my}px)`;
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      if (dot.style.opacity !== '1') { dot.style.opacity = ring.style.opacity = '1'; }
      requestAnimationFrame(tick);
    })();
  }
}
