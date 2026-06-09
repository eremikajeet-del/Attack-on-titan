import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const defaultOptions = {
  duration: 0.78,
  ease: 'power3.out',
  stagger: 0,
}

export const fadeInUp = (target, options = {}) => {
  const config = { ...defaultOptions, ...options }
  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
    },
  )
}

export const slideInFromLeft = (target, options = {}) => {
  const config = { ...defaultOptions, ...options }
  return gsap.fromTo(
    target,
    { autoAlpha: 0, x: -24 },
    {
      autoAlpha: 1,
      x: 0,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
    },
  )
}

export const scrollFadeIn = (target, options = {}) => {
  const config = {
    duration: 0.84,
    start: 'top 80%',
    end: '+=120',
    once: true,
    ...options,
  }

  return gsap.fromTo(
    target,
    { autoAlpha: 0, y: 26 },
    {
      autoAlpha: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: target,
        start: config.start,
        end: config.end,
        toggleActions: 'play none none none',
        markers: false,
      },
    },
  )
}
