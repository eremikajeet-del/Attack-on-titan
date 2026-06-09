import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 36 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.25 } },
}

const CharacterModal = ({ character, onClose }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const imageCandidates = character?.imageCandidates ?? []
  const imageSrc = imageCandidates[imageIndex]

  useEffect(() => {
    if (!character) return
    setImageFailed(false)
    setImageIndex(0)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [character])

  const handleImageError = () => {
    if (imageIndex < imageCandidates.length - 1) {
      setImageIndex((current) => current + 1)
      return
    }
    setImageFailed(true)
  }

  return (
    <AnimatePresence>
      {character ? (
        <motion.div
          className="character-modal-backdrop"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
        <motion.div
          className="character-modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close profile">
            ✕
          </button>

          <div className="modal-head">
            <div className="modal-portrait" style={{ background: character.portraitGradient }}>
              {imageSrc && !imageFailed ? (
                <img
                  src={imageSrc}
                  alt={character.name}
                  className="modal-portrait-img"
                  onError={handleImageError}
                  draggable={false}
                />
              ) : (
                <span>{character.initials}</span>
              )}
            </div>
            <div>
              <p className="modal-label">{character.badge}</p>
              <h2>{character.name}</h2>
              <p className="modal-subtitle">{character.role}</p>
            </div>
          </div>

          <div className="modal-grid">
            <div className="modal-card">
              <h3>Affiliation</h3>
              <p>{character.affiliation}</p>
            </div>
            <div className="modal-card">
              <h3>Age</h3>
              <p>{character.age}</p>
            </div>
            <div className="modal-card">
              <h3>Height</h3>
              <p>{character.height}</p>
            </div>
            <div className="modal-card modal-card--quote">
              <h3>Quote</h3>
              <p>“{character.quote}”</p>
            </div>
          </div>

          <div className="modal-body-grid">
            <div className="modal-hero-block">
              <h3>Biography</h3>
              <p>{character.biography}</p>
            </div>

            <div className="modal-stats-block">
              <div className="modal-stat-row">
                <span>Combat</span>
                <strong>{character.combatRating}</strong>
              </div>
              <div className="modal-stat-row">
                <span>Intelligence</span>
                <strong>{character.intelligenceRating}</strong>
              </div>
              <div className="modal-stat-row">
                <span>Leadership</span>
                <strong>{character.leadershipRating}</strong>
              </div>
            </div>
          </div>

          <div className="modal-details">
            <div>
              <h3>Abilities</h3>
              <ul>
                {character.abilities.map((ability) => (
                  <li key={ability}>{ability}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Titan Powers</h3>
              <p>{character.titanPower}</p>
            </div>
          </div>

          <div className="modal-quotes">
            <h3>Famous Quotes</h3>
            <ul>
              {character.famousQuotes.map((quote) => (
                <li key={quote}>“{quote}”</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CharacterModal
