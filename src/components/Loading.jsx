import { AnimatePresence, motion } from 'framer-motion'
import './Loading.css'

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      >
        <motion.div
          className="loading__panel"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loading__brand">
            <span>ATTACK</span>
            <strong>ON TITAN</strong>
          </div>
          <motion.div
            className="loading__progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Loading
