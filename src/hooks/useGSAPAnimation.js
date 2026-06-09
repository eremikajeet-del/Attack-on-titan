import { useEffect } from 'react'
import { gsap } from 'gsap'
import { fadeInUp, scrollFadeIn } from '../animations/gsapAnimations'

export const useGSAPAnimation = ({ targetRef, type = 'fadeInUp', options = {} }) => {
  useEffect(() => {
    const element = targetRef?.current
    if (!element) return undefined

    let animation
    if (type === 'scrollFadeIn') {
      animation = scrollFadeIn(element, options)
    } else {
      animation = fadeInUp(element, options)
    }

    return () => {
      if (animation?.kill) {
        animation.kill()
      }
      if (animation?.scrollTrigger) {
        animation.scrollTrigger.kill()
      }
    }
  }, [targetRef, type, options])
}
