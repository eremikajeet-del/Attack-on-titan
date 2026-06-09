import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Hero.css'

const stepVariant = {
  hidden: { opacity: 0, y: 48, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -36,
    filter: 'blur(12px)',
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
}

const subtleFade = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const steps = [
  {
    id: 'hero-1',
    className: 'hero__ch1',
    content: (
      <>
        <motion.div className="hero__eyebrow" variants={subtleFade}>
          <span className="hero__rule" />
          <span className="hero__eyebrow-txt">Year 845 · Wall Maria</span>
          <span className="hero__rule" />
        </motion.div>

        <motion.h1 className="hero__ch1-title" variants={stepVariant}>
          Beyond the <em>Walls</em><br />
          <span>lies the truth</span>
        </motion.h1>

        <motion.p className="hero__ch1-sub" variants={subtleFade}>
          Humanity's last refuge — three walls, one consuming dread.
        </motion.p>
      </>
    ),
  },
  {
    id: 'hero-2',
    className: 'hero__ch2',
    content: (
      <>
        <motion.p className="hero__ch2-title" variants={stepVariant}>
          SHINGEKI NO KYOJIN
        </motion.p>
        <motion.p className="hero__ch2-sub" variants={subtleFade}>
          — The day the wall was breached —
        </motion.p>
      </>
    ),
  },
  {
    id: 'hero-3',
    className: 'hero__ch3',
    content: (
      <>
        <motion.h2 className="hero__ch3-title" variants={stepVariant}>
          ATTACK<br />
          <span>ON TITAN</span>
        </motion.h2>
        <motion.p className="hero__ch3-sub" variants={subtleFade}>
          Dedicate your heart. Pledge your life.
        </motion.p>
      </>
    ),
  },
]

const Hero = () => {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 3200),
      window.setTimeout(() => setPhase(2), 6400),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  return (
    <section className="hero">
      <div className="hero__sticky">
        <video
          className="hero__video"
          src="/video/one.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <motion.div
          className="hero__overlay"
          initial={{ opacity: 0.72 }}
          animate={{ opacity: 0.28 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="hero__grain" />

        <AnimatePresence mode="wait">
          <motion.div
            key={steps[phase].id}
            className={`hero__chapter ${steps[phase].className}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariant}
          >
            {steps[phase].content}
          </motion.div>
        </AnimatePresence>

        <div className="hero__scroll-hint">
          <span />
        </div>
      </div>
    </section>
  )
}

export default Hero
