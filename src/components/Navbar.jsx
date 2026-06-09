import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Characters', href: '#characters' },
  { label: 'Titans', href: '#titans' },
  { label: 'Soldiers', href: '#soldiers' },
  { label: 'Walls', href: '#walls' },
  { label: 'Chronicle', href: '#chronicle' },
]

const drawerVariants = {
  hidden: { opacity: 0, y: -22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const itemTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] }

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(0)

  const sectionIds = useMemo(() => LINKS.map((link) => link.href.substring(1)), [])

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 50)

      const currentPosition = window.scrollY + window.innerHeight * 0.45
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
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner">
          <a href="#story" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <span className="navbar__logo-wings">⸸</span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">ATTACK</span>
              <span className="navbar__logo-sub">ON TITAN</span>
            </span>
            <span className="navbar__logo-wings">⸸</span>
          </a>

          <ul className="navbar__links">
            {LINKS.map((link, index) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeLink === index ? 'navbar__link--active' : ''}`}
                >
                  <span className="navbar__link-num">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#titans" className="navbar__cta">
            Explore
          </a>

          <button
            type="button"
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open mobile navigation"
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
            className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="navbar__drawer-inner">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="navbar__drawer-link"
                  transition={{ ...itemTransition, delay: index * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navbar__drawer-num">0{index + 1}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#titans"
                className="navbar__drawer-cta"
                transition={{ ...itemTransition, delay: 0.42 }}
                onClick={() => setMenuOpen(false)}
              >
                Explore Titans
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
