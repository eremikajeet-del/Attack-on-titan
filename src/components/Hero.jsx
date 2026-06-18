import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const titleVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }
    }
  }

  return (
    <section ref={containerRef} className="hero">
      <motion.div className="hero__bg" style={{ y: yBg }}>
        <video
          className="hero__video"
          src="/video/one.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
      </motion.div>

      <motion.div 
        className="hero__content"
        style={{ opacity: opacityText, y: yText }}
      >
        <motion.div className="hero__eyebrow" initial="hidden" animate="visible" variants={subtitleVariants}>
          <span className="hero__rule" />
          <span className="hero__eyebrow-txt">The Final Season</span>
          <span className="hero__rule" />
        </motion.div>

        <motion.h1 
          className="hero__title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          ATTACK<br />
          <span className="hero__subtitle-outline">ON TITA<span className="hero__special-n">N</span></span>
        </motion.h1>

        <motion.p 
          className="hero__subtitle"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Beyond the walls lies the truth. Humanity's last stand begins now.
        </motion.p>

        <motion.div 
          className="hero__cta-group"
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
        >
          <a href="#story" className="hero__cta hero__cta--primary">
            Begin Story
          </a>
          <a href="#titans" className="hero__cta hero__cta--secondary">
            Explore Titans
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll-hint">
        <span />
      </div>

      <motion.div 
        className="hero__mikasa"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
      >
        --- For Mikasa
      </motion.div>
    </section>
  )
}

export default Hero
