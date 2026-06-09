import { useState } from 'react'
import { motion } from 'framer-motion'
import CharacterCard from './CharacterCard'
import CharacterModal from './CharacterModal'
import { CHARACTER_IMAGE_CANDIDATES } from './characterImages'
import './CharacterSection.css'

const CHARACTERS = [
  {
    id: 'eren',
    name: 'Eren Yeager',
    initials: 'EY',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.eren,
    accent: '#9f0f18',
    role: 'Titan Shifter',
    badge: 'Founding Titan',
    tagline: 'Destiny, fury and the coordinate of war.',
    ability: 'Coordinate / Titan Control',
    strength: 'S+',
    intelligence: 'A',
    combat: 'S',
    fact: 'Wields three Titan inheritances — Attack, Founding and War Hammer.',
    titanForm: 'Attack Titan',
    portraitGradient: 'linear-gradient(180deg, rgba(193, 18, 31, 0.3), rgba(0, 0, 0, 0.55))',
    affiliation: 'Survey Corps / Yeagerists',
    age: '19',
    height: '170 cm',
    quote: 'I will destroy them all.',
    abilities: ['Attack Titan transformation', 'Coordinate resonance', 'War Hammer armor creation'],
    titanPower: 'Attack Titan, Founding Titan, War Hammer Titan, and Coordinate control.',
    biography:
      'Born in Shiganshina District, Eren becomes the fulcrum of humanity’s last stand. His rage and inherited Titan power set the course for the final battle.',
    combatRating: 'S+',
    intelligenceRating: 'A',
    leadershipRating: 'B+',
    famousQuotes: ['I will destroy them all.', 'If you win, you live. If you lose, you die. If you don’t fight, you can’t win.'],
  },
  {
    id: 'mikasa',
    name: 'Mikasa Ackerman',
    initials: 'MA',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.mikasa,
    accent: '#171b25',
    role: 'Elite Soldier',
    badge: 'Ackerman',
    tagline: 'Silent precision and lethal devotion.',
    ability: 'Ackerman Awakening',
    strength: 'S',
    intelligence: 'A',
    combat: 'S+',
    fact: 'Her bloodline grants inhuman reflexes and near-perfect combat instincts.',
    titanForm: 'No Titan Form',
    portraitGradient: 'linear-gradient(180deg, rgba(21, 27, 36, 0.7), rgba(74, 81, 90, 0.5))',
    affiliation: 'Survey Corps',
    age: '18',
    height: '170 cm',
    quote: 'I will kill you with my own hands.',
    abilities: ['ODM mastery', 'Hyperawareness', 'Titan slaying precision'],
    titanPower: 'N/A',
    biography:
      'Raised by the Yeager family, Mikasa is the last of the Ackerman line. She fights with unmatched focus to protect Eren and the world beyond the walls.',
    combatRating: 'S+',
    intelligenceRating: 'A',
    leadershipRating: 'B',
    famousQuotes: ['I will kill you with my own hands.', 'This world is cruel, and yet so beautiful.'],
  },
  {
    id: 'armin',
    name: 'Armin Arlert',
    initials: 'AA',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.armin,
    accent: '#847059',
    role: 'Strategist',
    badge: 'Colossal Titan',
    tagline: 'A mind that bends the battlefield.',
    ability: 'Tactical Genius',
    strength: 'B',
    intelligence: 'S+',
    combat: 'B+',
    fact: 'His plans have turned hopeless fights into legendary victories.',
    titanForm: 'Colossal Titan',
    portraitGradient: 'linear-gradient(180deg, rgba(139, 114, 79, 0.7), rgba(22, 18, 14, 0.5))',
    affiliation: 'Survey Corps',
    age: '18',
    height: '170 cm',
    quote: 'I want to live, too.',
    abilities: ['Battlefield analysis', 'Emotional clarity', 'Strategic foresight'],
    titanPower: 'Colossal Titan transformation with massive steam release.',
    biography:
      'Armin’s intelligence shapes humanity’s strategy. Though physically gentle, his tactical insight changes the fate of every confrontation.',
    combatRating: 'B+',
    intelligenceRating: 'S+',
    leadershipRating: 'A',
    famousQuotes: ['I want to live, too.', 'Even if we can’t change the world, we can make it better.'],
  },
  {
    id: 'levi',
    name: 'Levi Ackerman',
    initials: 'LA',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.levi,
    accent: '#1e2128',
    role: 'Captain',
    badge: 'Humanity’s Strongest Soldier',
    tagline: 'Blade precision perfected through battle.',
    ability: 'Blade Mastery',
    strength: 'S',
    intelligence: 'A+',
    combat: 'S+',
    fact: 'His speed, precision, and discipline have saved countless lives.',
    titanForm: 'No Titan Form',
    portraitGradient: 'linear-gradient(180deg, rgba(29, 29, 35, 0.7), rgba(79, 80, 91, 0.5))',
    affiliation: 'Survey Corps',
    age: '30',
    height: '160 cm',
    quote: 'If you don’t want to die, think.',
    abilities: ['Precision strike', 'Rapid evasion', 'Combat clarity'],
    titanPower: 'N/A',
    biography:
      'Levi is known throughout the walls for his surgical brutality and unmatched skill. He is the backbone of the Survey Corps’ deadliest missions.',
    combatRating: 'S+',
    intelligenceRating: 'A+',
    leadershipRating: 'A',
    famousQuotes: ['If you don’t want to die, think.', 'The only thing we can do is keep moving forward.'],
  },
  {
    id: 'reiner',
    name: 'Reiner Braun',
    initials: 'RB',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.reiner,
    accent: '#4b423d',
    role: 'Titan Warrior',
    badge: 'Armored Titan',
    tagline: 'Endurance armored by a fractured soul.',
    ability: 'Enduring Defense',
    strength: 'S+',
    intelligence: 'B+',
    combat: 'A',
    fact: 'Reiner carries the burden of brute force and broken loyalty.',
    titanForm: 'Armored Titan',
    portraitGradient: 'linear-gradient(180deg, rgba(79, 77, 73, 0.8), rgba(27, 23, 20, 0.55))',
    affiliation: 'Warrior Unit',
    age: '28',
    height: '185 cm',
    quote: 'I just wanted to protect my friends.',
    abilities: ['Armored striking', 'Charge impact', 'Tactical durability'],
    titanPower: 'Armored Titan form with near-impenetrable plating.',
    biography:
      'Raised as a Warrior candidate, Reiner’s identity is split between duty and guilt. His Armored Titan proves nearly unstoppable on the battlefield.',
    combatRating: 'A',
    intelligenceRating: 'B+',
    leadershipRating: 'B',
    famousQuotes: ['I just wanted to protect my friends.', 'There is no meaning when the world has ended for you.'],
  },
  {
    id: 'erwin',
    name: 'Erwin Smith',
    initials: 'ES',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.erwin,
    accent: '#3e2f23',
    role: 'Commander',
    badge: 'Survey Corps',
    tagline: 'A vision carved from sacrifice.',
    ability: 'Command Presence',
    strength: 'B',
    intelligence: 'S',
    combat: 'B',
    fact: 'His gamble to charge into the Beast Titan changed the war’s trajectory.',
    titanForm: 'No Titan Form',
    portraitGradient: 'linear-gradient(180deg, rgba(59, 44, 31, 0.75), rgba(13, 12, 11, 0.55))',
    affiliation: 'Survey Corps',
    age: '40',
    height: '183 cm',
    quote: 'The only thing we are allowed to do is to believe.',
    abilities: ['Visionary strategy', 'Unwavering resolve', 'Inspirational sacrifice'],
    titanPower: 'N/A',
    biography:
      'Erwin built the Survey Corps into a force that could face the Titans. His courage and willingness to sacrifice made him one of the walls’ greatest commanders.',
    combatRating: 'B',
    intelligenceRating: 'S',
    leadershipRating: 'S+',
    famousQuotes: ['The only thing we are allowed to do is to believe.', 'What is right? What is wrong?'],
  },
  {
    id: 'hange',
    name: 'Hange Zoe',
    initials: 'HZ',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.hange,
    accent: '#4a3b34',
    role: 'Scientist',
    badge: 'Titan Researcher',
    tagline: 'Curious, brilliant and terrifyingly bold.',
    ability: 'Titan Research',
    strength: 'B+',
    intelligence: 'S',
    combat: 'B',
    fact: 'Her obsession with Titans unlocked humanity’s greatest breakthroughs.',
    titanForm: 'No Titan Form',
    portraitGradient: 'linear-gradient(180deg, rgba(75, 61, 56, 0.75), rgba(16, 16, 24, 0.55))',
    affiliation: 'Survey Corps',
    age: '32',
    height: '160 cm',
    quote: 'My curiosity is stronger than my fear.',
    abilities: ['Experimental insight', 'Rapid adaptation', 'Analytical mind'],
    titanPower: 'N/A',
    biography:
      'Hange pursues Titan knowledge at any cost. Her experiments and reports are the keys to understanding the enemy’s greatest weakness.',
    combatRating: 'B',
    intelligenceRating: 'S',
    leadershipRating: 'A',
    famousQuotes: ['My curiosity is stronger than my fear.', 'If I’m going to die, I’m going to die trying to learn something.'],
  },
  {
    id: 'jean',
    name: 'Jean Kirstein',
    initials: 'JK',
    imageCandidates: CHARACTER_IMAGE_CANDIDATES.jean,
    accent: '#47362c',
    role: 'Squad Leader',
    badge: 'Loyalist',
    tagline: 'Realism tempered with sudden courage.',
    ability: 'Field Command',
    strength: 'B+',
    intelligence: 'A',
    combat: 'A',
    fact: 'He evolves from a reluctant fighter into a dependable leader.',
    titanForm: 'No Titan Form',
    portraitGradient: 'linear-gradient(180deg, rgba(69, 49, 42, 0.75), rgba(17, 16, 24, 0.55))',
    affiliation: 'Survey Corps',
    age: '18',
    height: '178 cm',
    quote: 'I’m not some hero. I’ll just keep surviving.',
    abilities: ['Instinctive command', 'Adaptable strategy', 'Steeled reflexes'],
    titanPower: 'N/A',
    biography:
      'Jean begins as a self-preserving cadet and becomes a dependable leader who fights for the people around him.',
    combatRating: 'A',
    intelligenceRating: 'A',
    leadershipRating: 'B+',
    famousQuotes: ['I’m not some hero. I’ll just keep surviving.', 'I’m not going to let Erwin die.'],
  },
]

const headingVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const CharacterSection = () => {
  const [activeCharacter, setActiveCharacter] = useState(null)

  return (
    <section className="character-section section section--characters" id="characters">
      <div className="character-section__wall" />
      <div className="character-section__fog" />
      <div className="character-section__particles" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <motion.div className="character-section__intro" variants={headingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <span className="section__eyebrow">Character Collection</span>
        <h2 className="section__title">Premium titan warriors and elite fighters.</h2>
        <p className="section__copy">
          Discover the most iconic members of the Survey Corps and their hidden power. Each profile feels collectible, cinematic, and battle-ready.
        </p>
      </motion.div>

      <div className="character-grid">
        {CHARACTERS.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={setActiveCharacter} />
        ))}
      </div>

      <CharacterModal character={activeCharacter} onClose={() => setActiveCharacter(null)} />
    </section>
  )
}

export default CharacterSection
