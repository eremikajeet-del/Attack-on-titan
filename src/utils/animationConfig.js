export const ease = [0.22, 1, 0.36, 1]
export const defaultDuration = 0.75

export const lenisConfig = {
  duration: 1.25,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: true,
  touchMultiplier: 1.2,
  normalizeWheel: true,
}

export const revealOptions = {
  triggerOnce: true,
  threshold: 0.18,
}
