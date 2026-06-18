import { Suspense, lazy, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PageTransition from './components/PageTransition'
import Loading from './components/Loading'
import AnimatedSection from './components/AnimatedSection'
import Reveal from './components/Reveal'
import CharacterSection from './components/CharacterSection'
import Footer from './components/Footer'

const TitanShowcase = lazy(() => import('./components/TitanShowcase'))
const TitanSize = lazy(() => import('./components/Titansize'))
const Timeline = lazy(() => import('./components/Timeline'))
const Statistics = lazy(() => import('./components/Statistics'))
const InteractiveFeatures = lazy(() => import('./components/InteractiveFeatures'))

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

        <Suspense fallback={<div className="loading-fallback" />}>
          <TitanShowcase />
        </Suspense>

        <AnimatedSection className="section section--story" id="story">
          <div className="section__eyebrow">Origin of the Walls</div>
          <h2 className="section__title">Fall of Wall Maria</h2>
          <p className="section__copy">
            A catastrophic event that shattered a century of peace. Humanity's darkest hour begins.
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

        <Suspense fallback={<div className="loading-fallback" />}>
          <Timeline />
        </Suspense>

        <AnimatedSection className="section section--soldiers" id="corps">
          <div className="section__eyebrow">Survey Corps</div>
          <h2 className="section__title">Dedicate Your Heart</h2>
          <p className="section__copy">
            Humanity's spear, riding forth into the unknown to reclaim our freedom.
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

        <Suspense fallback={<div className="loading-fallback" />}>
          <Statistics />
        </Suspense>

        <Suspense fallback={<div className="loading-fallback" />}>
          <InteractiveFeatures />
        </Suspense>

      </main>
      
      <Footer />
    </PageTransition>
  )
}

export default App
