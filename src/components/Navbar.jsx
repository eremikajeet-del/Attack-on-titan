import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Titans', href: '#titans' },
  { label: 'Characters', href: '#characters' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Corps', href: '#corps' },
  { label: 'Stats', href: '#stats' },
]

const drawerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(0)

  const sectionIds = useMemo(() => LINKS.map((link) => link.href.substring(1)), [])

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 50)

      const currentPosition = window.scrollY + window.innerHeight * 0.4
      let current = 0
      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= currentPosition) {
          current = index
        }
      })
      setActiveLink(current)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [sectionIds])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <span className="navbar__logo-main">ATTACK</span>
            <span className="navbar__logo-sub">ON TITAN</span>
          </a>

          <ul className="navbar__links">
            {LINKS.map((link, index) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeLink === index ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#timeline" className="navbar__cta">
            Discover
          </a>

          <button
            type="button"
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="navbar__drawer-inner">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="navbar__drawer-link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
