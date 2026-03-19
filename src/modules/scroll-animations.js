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

  const steps = gsap.utils.toArray('.timeline-step')
  if (!steps.length) return

  // Start steps at reduced opacity
  gsap.set(steps, { opacity: 0.4 })

  // Use per-step ScrollTrigger instances with onEnter/onLeaveBack
  // to avoid callback-skipping that can occur with scrub: true timelines
  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 75%',
      end: 'bottom 25%',
      onEnter: () => {
        gsap.to(step, { opacity: 1, duration: 0.4 })
        step.classList.add('step-active')
      },
      onLeaveBack: () => {
        gsap.to(step, { opacity: 0.4, duration: 0.4 })
        step.classList.remove('step-active')
      },
    })
  })
}
