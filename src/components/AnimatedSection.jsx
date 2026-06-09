import { motion } from 'framer-motion'
import { staggerContainer } from '../animations'

const AnimatedSection = ({ children, className, ...props }) => {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection
