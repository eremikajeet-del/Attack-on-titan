import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp } from '../animations'
import { revealOptions } from '../utils/animationConfig'

const Reveal = ({
  children,
  className,
  variants = fadeUp,
  threshold = revealOptions.threshold,
  triggerOnce = revealOptions.triggerOnce,
  ...props
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      viewport={{ once: triggerOnce, amount: threshold }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
