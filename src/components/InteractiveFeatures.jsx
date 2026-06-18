import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import quotesData from '../content/quotes.json'
import './InteractiveFeatures.css'

const InteractiveFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesData.length)
  }

  return (
    <section className="quotes-section">
      <div className="quotes-container">
        <span className="section__eyebrow">Echoes of the Past</span>
        
        <div className="quotes-display">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="quote-content"
            >
              <p className="quote-text">"{quotesData[currentIndex].quote}"</p>
              <p className="quote-author">— {quotesData[currentIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="quote-btn" onClick={handleNext}>
          Another Memory
        </button>
      </div>
    </section>
  )
}

export default InteractiveFeatures
