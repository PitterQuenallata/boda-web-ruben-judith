import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

// Scroll suave integrado con el ticker de GSAP.
export function useLenis(activo) {
  useEffect(() => {
    if (!activo) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [activo])
}
