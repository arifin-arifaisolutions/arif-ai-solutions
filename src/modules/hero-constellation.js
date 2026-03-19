const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initConstellation() {
  if (IS_REDUCED) return   // skip entirely for reduced-motion users

  const canvas = document.getElementById('hero-constellation')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const hero = document.getElementById('hero')

  const IS_MOBILE = window.matchMedia('(max-width: 767px)').matches
  const NUM_DOTS  = IS_MOBILE ? 18 : 30
  const MAX_DIST  = 150
  const SPEED     = 0.4

  function resize() {
    canvas.width  = hero.offsetWidth
    canvas.height = hero.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const dots = Array.from({ length: NUM_DOTS }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    r:  0.9 + Math.random() * 1.4,
  }))

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy
      if (d.x < 0 || d.x > canvas.width)  d.vx *= -1
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1
    })

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx   = dots[i].x - dots[j].x
        const dy   = dots[i].y - dots[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.strokeStyle = `rgba(200,168,0,${(1 - dist / MAX_DIST) * 0.32})`
          ctx.lineWidth = 1.0
          ctx.stroke()
        }
      }
    }

    dots.forEach(d => {
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(200,168,0,0.60)'
      ctx.fill()
    })

    requestAnimationFrame(drawFrame)
  }

  drawFrame()
}
