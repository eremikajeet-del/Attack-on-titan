import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import timelineData from '../content/timeline.json'
import './Timeline.css'

const Timeline = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  return (
    <section className="timeline" id="timeline" ref={containerRef}>
      <div className="timeline__header">
        <span className="section__eyebrow">World History</span>
        <h2 className="section__title">The Chronicle</h2>
      </div>
      
      <div className="timeline__container">
        <motion.div 
          className="timeline__line-progress" 
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        />
        <div className="timeline__line-bg" />

        {timelineData.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

const TimelineItem = ({ item, index }) => {
  const itemRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 80%", "center 60%"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -50 : 50, 0])

  return (
    <div ref={itemRef} className={`timeline__item ${index % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
      <motion.div className="timeline__content" style={{ opacity, x }}>
        <span className="timeline__year">{item.year}</span>
        <h3 className="timeline__title">{item.title}</h3>
        <p className="timeline__desc">{item.desc}</p>
      </motion.div>
      <div className="timeline__node" />
    </div>
  )
}

export default Timeline
