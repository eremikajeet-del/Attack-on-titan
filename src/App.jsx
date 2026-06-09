import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PageTransition from './components/PageTransition'
import Loading from './components/Loading'
import AnimatedSection from './components/AnimatedSection'
import Reveal from './components/Reveal'
import CharacterSection from './components/CharacterSection'

const TitanSize = lazy(() => import('./components/Titansize'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1400)
    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageTransition>
      <Navbar />

      <main className="app__main">
        <Hero />

        <AnimatedSection className="section section--story" id="story">
          <div className="section__eyebrow">Origin of the Walls</div>
          <h2 className="section__title">Humanity survives by a thread.</h2>
          <p className="section__copy">
            A cinematic fan experience built with layered depth, premium typography, and slow-burning tension.
          </p>
          <div className="section__cards">
            <Reveal className="section__card">
              <strong>Wall Maria</strong>
              <p>First line of defense, breached by terror. It sets the stakes for the experience.</p>
            </Reveal>
            <Reveal className="section__card">
              <strong>Wall Rose</strong>
              <p>The second hold, strengthened by sacrifice and ceremony.</p>
            </Reveal>
            <Reveal className="section__card">
              <strong>Wall Sina</strong>
              <p>The final protective ring where authority and secrets remain hidden.</p>
            </Reveal>
          </div>
        </AnimatedSection>

        <CharacterSection />

        <Suspense fallback={<div className="loading-fallback" />}> 
          <TitanSize />
        </Suspense>

        <AnimatedSection className="section section--soldiers" id="soldiers">
          <div className="section__eyebrow">Survey Corps</div>
          <h2 className="section__title">Precision, discipline, and fearless movement.</h2>
          <p className="section__copy">
            Each soldier honors a design language of sharp contrast, clinical controls, and hardened instincts.
          </p>
          <div className="section__grid">
            <Reveal className="section__card">
              <span className="section__card-label">Recon</span>
              <p>Stealth, timing, and a cold command of the terrain.</p>
            </Reveal>
            <Reveal className="section__card">
              <span className="section__card-label">Engage</span>
              <p>High-impact maneuvers with decisive, purpose-driven motion.</p>
            </Reveal>
            <Reveal className="section__card">
              <span className="section__card-label">Fortify</span>
              <p>Hold fast under pressure with layered defensive systems.</p>
            </Reveal>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section section--walls" id="walls">
          <div className="section__eyebrow">Steel and stone</div>
          <h2 className="section__title">Architectural fortification meets narrative tension.</h2>
          <div className="section__feature-grid">
            <Reveal className="section__feature">
              <h3>Massive silhouettes</h3>
              <p>Each wall conveys scale and purpose with premium shadow depth.</p>
            </Reveal>
            <Reveal className="section__feature">
              <h3>Textured surfaces</h3>
              <p>Subtle grain and steel touches create an immersive combat-ready aesthetic.</p>
            </Reveal>
          </div>
        </AnimatedSection>

        <AnimatedSection className="section section--chronicle" id="chronicle">
          <div className="section__eyebrow">Chronicle</div>
          <h2 className="section__title">The legend moves with every scroll.</h2>
          <p className="section__copy">
            A living timeline built to show measured, cinematic progress rather than scattershot motion.
          </p>
          <Reveal className="section__timeline-card">
            <span>Year 845</span>
            <p>A nomadic mission begins beyond the walls as the first titan breach unfolds.</p>
          </Reveal>
        </AnimatedSection>
      </main>
    </PageTransition>
  )
}

export default App
