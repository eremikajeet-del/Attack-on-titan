import { motion } from 'framer-motion'
import './Titansize.css'

const TITANS = [
  {
    id: 'human',
    name: 'Human',
    height: '1.7 m',
    color: '#c4a450',
    desc: 'Survey Corps soldier. The brave ones who dare to face the giants.',
    imgH: 5.8,
    imgW: 5.9,
    img: '/images/Human.png',
  },
  {
    id: 'pure',
    name: 'Pure Titan',
    height: '4 – 15 m',
    color: '#b0a090',
    desc: 'Mindless and relentless. The most common threat beyond the walls.',
    imgH: 14,
    imgW: 10,
    img: '/images/PureTitan.png',
  },
  {
    id: 'armored',
    name: 'Armored Titan',
    height: '15 m',
    color: '#8c8c8c',
    desc: 'Reiner Braun. Hardened plates make it nearly impenetrable.',
    imgH: 15.5,
    imgW: 9,
    img: '/images/ArmoredTitan.png',
  },
  {
    id: 'female',
    name: 'Female Titan',
    height: '14 m',
    color: '#c49090',
    desc: 'Annie Leonhart. Agile, crystalline, and terrifyingly intelligent.',
    imgH: 23.5,
    imgW: 12.5,
    img: '/images/FemaleTitan.png',
  },
  {
    id: 'beast',
    name: 'Beast Titan',
    height: '17 m',
    color: '#7a8c6a',
    desc: 'Zeke Yeager. Ape-like form with devastating projectile attacks.',
    imgH: 30.5,
    imgW: 18,
    img: '/images/BeastTitan.png',
  },
  {
    id: 'colossal',
    name: 'Colossal Titan',
    height: '60 m',
    color: '#c0522a',
    desc: 'Bertholdt Hoover. The one who broke the gate. Steam Incarnate.',
    imgH: 50,
    imgW: 28,
    img: '/images/col.png',
  },
]

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
}

const Titansize = () => {
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

        <div className="ts-stage">
          {TITANS.map((titan, index) => (
            <div key={titan.id} className="ts-titan-slot" style={{ '--color': titan.color }}>
              <motion.div
                className="ts-figure"
                custom={0.2 + index * 0.12}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={figureVariants}
              >
                <img
                  src={titan.img}
                  alt={titan.name}
                  className="ts-figure-img"
                  draggable={false}
                  style={{ height: `${titan.imgH}vh`, width: `${titan.imgW}vh` }}
                />
              </motion.div>

              <motion.div
                className="ts-measure-line"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 0.35, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.12 }}
                style={{ height: `${titan.imgH}vh` }}
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
          ))}
        </div>

        <div className="ts-wall-line">
          <span className="ts-wall-label">Wall Maria · 50 m</span>
        </div>

        <div className="ts-grain" />
      </div>
    </section>
  )
}

export default Titansize
