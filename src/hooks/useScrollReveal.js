import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { revealOptions } from '../utils/animationConfig'

export const useScrollReveal = ({ threshold = revealOptions.threshold, triggerOnce = revealOptions.triggerOnce } = {}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return { ref, controls }
}
