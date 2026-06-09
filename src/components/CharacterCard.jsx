import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const CharacterCard = ({ character, onSelect }) => {
  const [flipped, setFlipped] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const imageCandidates = character.imageCandidates ?? []
  const imageSrc = imageCandidates[imageIndex]

  useEffect(() => {
    setImageFailed(false)
    setImageIndex(0)
  }, [character.imageCandidates])

  useEffect(() => {
    const media = window.matchMedia('(hover: hover)')
    setSupportsHover(media.matches)
    const listener = (event) => setSupportsHover(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const handleImageError = () => {
    if (imageIndex < imageCandidates.length - 1) {
      setImageIndex((current) => current + 1)
      return
    }
    setImageFailed(true)
  }

  const handleTap = () => {
    if (supportsHover) {
      if (flipped) {
        onSelect(character)
      } else {
        setFlipped(true)
      }
    } else {
      setFlipped((current) => !current)
    }
  }

  const handleCloseFlip = () => {
    if (!supportsHover) return
    setFlipped(false)
  }

  const accentStyle = useMemo(
    () => ({ '--card-accent': character.accent }),
    [character.accent],
  )

  return (
    <motion.article
      className="character-card"
      style={accentStyle}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={supportsHover ? { y: -8 } : undefined}
      onClick={handleTap}
      onMouseLeave={handleCloseFlip}
    >
      <div className={`card-shell ${flipped ? 'is-flipped' : ''}`}>
        <div className="card-face card-face--front">
          <div className="card-portrait" aria-hidden="true">
            {imageSrc && !imageFailed ? (
              <img
                src={imageSrc}
                alt={character.name}
                className="card-portrait-img"
                onError={handleImageError}
                draggable={false}
              />
            ) : (
              <div className="card-portrait__label">{character.initials}</div>
            )}
            <div className="card-portrait__glow" />
          </div>

          <div className="card-body">
            <div className="card-meta">
              <span className="card-badge card-badge--elite">{character.badge}</span>
              <span className="card-badge card-badge--role">{character.role}</span>
            </div>
            <h3>{character.name}</h3>
            <p>{character.tagline}</p>
          </div>

          <div className="card-footer">
            <span className="card-sigil">⸸</span>
            <span className="card-hint">Tap to flip / click for details</span>
          </div>
        </div>

        <div className="card-face card-face--back">
          <div className="card-body card-body--back">
            <p className="card-title">Titan Ability</p>
            <strong>{character.ability}</strong>
            <div className="card-stats">
              <div>
                <span>Strength</span>
                <strong>{character.strength}</strong>
              </div>
              <div>
                <span>Intelligence</span>
                <strong>{character.intelligence}</strong>
              </div>
              <div>
                <span>Combat</span>
                <strong>{character.combat}</strong>
              </div>
            </div>
            <div className="card-fact">
              <span>Special Fact</span>
              <p>{character.fact}</p>
            </div>
          </div>
          <div className="card-back-image" aria-hidden="true">
            <span>{character.titanForm}</span>
          </div>
          <button
            type="button"
            className="card-action"
            onClick={(event) => {
              event.stopPropagation()
              onSelect(character)
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default CharacterCard
