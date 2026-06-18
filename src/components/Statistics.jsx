import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import statsData from '../content/stats.json'
import './Statistics.css'

const Statistics = () => {
  return (
    <section className="statistics" id="stats">
      <div className="statistics__inner">
        {statsData.map((stat, i) => (
          <StatCounter key={stat.id} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}

const StatCounter = ({ stat, index }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = stat.value
      const duration = 2000
      const increment = end / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, stat.value])

  return (
    <motion.div 
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-card__value">
        {count}{stat.suffix}
      </div>
      <div className="stat-card__label">{stat.label}</div>
    </motion.div>
  )
}

export default Statistics
