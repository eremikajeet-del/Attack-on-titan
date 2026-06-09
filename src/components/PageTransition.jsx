import { AnimatePresence, motion } from 'framer-motion'
import { pageTransition } from '../animations'

const PageTransition = ({ children, isVisible = true }) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page-transition"
          className="page-transition"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
