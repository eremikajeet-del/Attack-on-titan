import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { lenisConfig } from '../utils/animationConfig'

const LenisContext = createContext(null)

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null)
  const frameRef = useRef(0)

  const rafCallback = useCallback((time) => {
    if (lenisRef.current) {
      lenisRef.current.raf(time)
      frameRef.current = requestAnimationFrame(rafCallback)
    }
  }, [])

  useEffect(() => {
    lenisRef.current = new Lenis(lenisConfig)
    frameRef.current = requestAnimationFrame(rafCallback)

    return () => {
      cancelAnimationFrame(frameRef.current)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [rafCallback])

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>
}

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used inside a LenisProvider')
  }
  return context
}
