import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__bg" />
      
      {/* Ambient Lighting Layer */}
      <div className="footer__radial-glow" />
      
      {/* Emblem Layer */}
      <div className="footer__emblem-container">
        <img 
          src="/images/wings-emblem.png" 
          alt="Wings of Freedom" 
          className="footer__emblem" 
        />
      </div>
      
      {/* Atmospheric Layers */}
      <div className="footer__fog" />
      <div className="footer__dust" />

      {/* Content Layer */}
      <div className="footer__inner">
        <div className="footer__content">
          <div className="footer__logo">
            <h2>ATTACK <span>ON TITAN</span></h2>
            <p>A cinematic web experience.</p>
          </div>
          <div className="footer__links">
            <a href="#story">Story</a>
            <a href="#titans">Titans</a>
            <a href="#characters">Characters</a>
            <a href="#timeline">Timeline</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Shingeki no Kyojin. Fan Experience. Not affiliated with Kodansha or MAPPA.</p>
          <motion.p 
            className="footer__credit"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            Crafted with dedication by <span>Jeet</span>
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
