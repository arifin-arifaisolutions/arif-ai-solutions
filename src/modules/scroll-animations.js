import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const IS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const IS_TOUCH   = window.matchMedia('(hover: none)').matches

export function initScrollAnimations() {
  if (IS_REDUCED || IS_TOUCH) {
    // Show all steps immediately
    document.querySelectorAll('.timeline-step').forEach(s => s.classList.add('step-active'))
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const section = document.querySelector('#how-we-work')
  const steps   = gsap.utils.toArray('.timeline-step')
  if (!section || !steps.length) return

  // Start steps at reduced opacity
  gsap.set(steps, { opacity: 0.4 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: true,
    }
  })

  steps.forEach((step, i) => {
    tl.to(step, {
      opacity: 1,
      onStart: () => step.classList.add('step-active'),
      onReverseComplete: () => step.classList.remove('step-active'),
    }, i * 0.25)
  })
}
