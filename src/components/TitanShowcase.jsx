import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import titansData from '../content/titans.json'
import './TitanShowcase.css'

const TitanShowcase = () => {
  return (
    <section className="titan-showcase" id="titans">
      <div className="titan-showcase__bg-texture" />
      <div className="titan-showcase__header">
        <span className="section__eyebrow">Nine Titans</span>
        <h2 className="section__title">Titan Power</h2>
      </div>
      <div className="titan-showcase__container">
        {titansData.map((titan, i) => (
          <TitanPanel key={titan.id} titan={titan} index={i} />
        ))}
      </div>
    </section>
  )
}

const TitanPanel = ({ titan, index }) => {
  const panelRef = useRef(null)
  const isAttackTitan = titan.id === 'attack'

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "center center"]
  })

  // Scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const cardX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : -100, 0])
  const titanX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  // Mouse Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX / innerWidth - 0.5)
      mouseY.set(e.clientY / innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={panelRef} className={`titan-panel ${index % 2 === 0 ? 'titan-panel--left' : 'titan-panel--right'} ${isAttackTitan ? 'titan-panel--hero' : ''}`}>
      <motion.div 
        className="titan-panel__visual" 
        style={{ scale, x: titanX, y: parallaxY }}
      >
        {isAttackTitan && <div className="titan-panel__rim-light" />}
        <motion.img 
          src={titan.img} 
          alt={titan.name} 
          className="titan-panel__img" 
          style={{ x: parallaxX }}
        />
        {isAttackTitan && (
          <>
            <div className="titan-panel__shadow" />
            <div className="titan-panel__fog" />
            <div className="titan-panel__steam titan-panel__steam--left" />
            <div className="titan-panel__steam titan-panel__steam--right" />
            {/* Extremely rough positioning for eyes, works best if image is known */}
            <div className="titan-panel__eyes-glow" />
          </>
        )}
      </motion.div>

      <motion.div className="titan-panel__info-container" style={{ opacity, x: cardX }}>
        <div className="titan-panel__info">
          <h3 className="titan-panel__name">{titan.name}</h3>
          <div className="titan-panel__meta">
            <span><strong className="accent-label">Height:</strong> {titan.height}</span>
            <span><strong className="accent-label">Shifter:</strong> {titan.shifter}</span>
            <span><strong className="accent-label">Trait:</strong> {titan.trait}</span>
          </div>
          <p className="titan-panel__desc">{titan.desc}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TitanShowcase
