import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Titansize.css'

const TITANS = [
  {
    id: 'human',
    name: 'Human',
    height: '1.7 m',
    color: '#c4a450',
    desc: 'Survey Corps soldier. The brave ones who dare to face the giants.',
    img: '/images/Human.png',
  },
  {
    id: 'pure',
    name: 'Pure Titan',
    height: '4 – 15 m',
    color: '#b0a090',
    desc: 'Mindless and relentless. The most common threat beyond the walls.',
    img: '/images/PureTitan.png',
  },
  {
    id: 'attack',
    name: 'Attack Titan',
    height: '15 m',
    color: '#28a745', // Green for subtle eye glow & aura
    desc: 'A titan that relentlessly pursues freedom across generations. Known for exceptional combat ability, adaptability, and the will to keep advancing regardless of obstacles.',
    img: '/images/Eren_Titan.png',
  },
  {
    id: 'armored',
    name: 'Armored Titan',
    height: '15 m',
    color: '#8c8c8c',
    desc: 'Reiner Braun. Hardened plates make it nearly impenetrable.',
    img: '/images/ArmoredTitan.png',
  },
  {
    id: 'female',
    name: 'Female Titan',
    height: '14 m',
    color: '#c49090',
    desc: 'Annie Leonhart. Agile, crystalline, and terrifyingly intelligent.',
    img: '/images/FemaleTitan.png',
  },
  {
    id: 'beast',
    name: 'Beast Titan',
    height: '17 m',
    color: '#7a8c6a',
    desc: 'Zeke Yeager. Ape-like form with devastating projectile attacks.',
    img: '/images/BeastTitan.png',
  },
  {
    id: 'colossal',
    name: 'Colossal Titan',
    height: '60 m',
    color: '#c0522a',
    desc: 'Bertholdt Hoover. The one who broke the gate. Steam Incarnate.',
    img: '/images/col.png',
  },
]

// Height-based scaling calculation (derived from canonical height)
// vh = height_in_meters * 0.75 + 4
const getScaleVH = (heightStr) => {
  const match = heightStr.match(/(\d+(?:\.\d+)?)/g);
  if (!match) return 15;
  const heightInMeters = Math.max(...match.map(Number));
  return heightInMeters * 0.75 + 4;
}

const figureVariants = {
  hidden: { opacity: 0, y: 110, filter: 'blur(6px)' },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const labelVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay + 0.12 },
  }),
}

const titleVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 } },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const mobileVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

const Titansize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < TITANS.length) {
      setPage([newPage, newDirection]);
    }
  };

  const activeTitan = TITANS[page];
  const calculatedVH = activeTitan ? getScaleVH(activeTitan.height) : 0;

  return (
    <section className="ts-section">
      <div className="ts-sticky">
        <div className="ts-sky" />
        <div className="ts-ground" />
        <div className="ts-fog" />

        <motion.div className="ts-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={titleVariants}>
          <span className="ts-header-rule" />
          <div>
            <p className="ts-header-eyebrow">Scale of Terror</p>
            <h2 className="ts-header-title">Titan Size Comparison</h2>
          </div>
          <span className="ts-header-rule" />
        </motion.div>

        {isMobile ? (
          <div className="ts-mobile-slider-container">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={mobileVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="ts-mobile-slide"
              >
                <div className="ts-mobile-figure">
                  {activeTitan.id === 'attack' && (
                    <>
                      <div className="ts-steam-effect ts-steam-left" />
                      <div className="ts-steam-effect ts-steam-right" />
                      <div className="ts-eye-glow" />
                    </>
                  )}
                  <img
                    src={activeTitan.img}
                    alt={activeTitan.name}
                    className="ts-figure-img"
                    draggable={false}
                    style={{ height: `${calculatedVH}vh`, width: 'auto' }}
                  />
                </div>

                <div className="ts-mobile-slide-details">
                  <span className="ts-label-height">{activeTitan.height}</span>
                  <span className="ts-label-name">{activeTitan.name}</span>
                  <span className="ts-label-desc">{activeTitan.desc}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
              className="ts-swipe-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                style={{ display: "inline-block" }}
              >
                ← Swipe to Compare Titans →
              </motion.span>
            </motion.div>

            <div className="ts-pagination">
              {TITANS.map((titan, index) => (
                <button
                  key={`dot-${titan.id}`}
                  type="button"
                  className={`ts-dot ${page === index ? 'is-active' : ''}`}
                  onClick={() => {
                    setPage([index, index > page ? 1 : -1]);
                  }}
                  aria-label={`Go to ${titan.name}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="ts-stage">
            {TITANS.map((titan, index) => {
              const calcVH = getScaleVH(titan.height);

              return (
                <div key={titan.id} className={`ts-titan-slot ts-titan-slot--${titan.id}`} style={{ '--color': titan.color }}>
                  <motion.div
                    className="ts-figure"
                    custom={0.2 + index * 0.12}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={figureVariants}
                  >
                    {titan.id === 'attack' && (
                      <>
                        <div className="ts-steam-effect ts-steam-left" />
                        <div className="ts-steam-effect ts-steam-right" />
                        <div className="ts-eye-glow" />
                      </>
                    )}
                    <img
                      src={titan.img}
                      alt={titan.name}
                      className="ts-figure-img"
                      draggable={false}
                      style={{ height: `${calcVH}vh`, width: 'auto' }}
                    />
                  </motion.div>

                  <motion.div
                    className="ts-measure-line"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 0.35, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.12 }}
                    style={{ height: `${calcVH}vh` }}
                  />

                  <motion.div
                    className="ts-label"
                    custom={0.2 + index * 0.12}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={labelVariants}
                  >
                    <span className="ts-label-height">{titan.height}</span>
                    <span className="ts-label-name">{titan.name}</span>
                    <span className="ts-label-desc">{titan.desc}</span>
                  </motion.div>
                </div>
              )
            })}
          </div>
        )}

        {!isMobile && (
          <div className="ts-wall-line">
            <span className="ts-wall-label">Wall Maria · 50 m</span>
          </div>
        )}

        <div className="ts-grain" />
      </div>
    </section>
  )
}

export default Titansize
