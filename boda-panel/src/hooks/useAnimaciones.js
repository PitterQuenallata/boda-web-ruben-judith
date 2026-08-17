import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animaciones de scroll: reveals suaves, parallax y zoom con scrub.
// Convenciones de clases/atributos en el markup:
//   .reveal            → entra con fade + translateY (sin blur: repinta barato)
//   [data-parallax]    → se mueve más lento/rápido que el scroll (valor = intensidad)
//   .zoom-scroll       → escala 0.85 → 1.05 ligada al scroll
export function useAnimaciones(activo) {
  useEffect(() => {
    if (!activo) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.reveal', { opacity: 1, y: 0 })
        return
      }

      // Reveal suave de cada bloque
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })

      // Parallax (fotos de fondo y ramas)
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const intensidad = Number(el.dataset.parallax) || 12
        gsap.fromTo(
          el,
          { yPercent: -intensidad },
          {
            yPercent: intensidad,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('[data-parallax-wrap]') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Zoom on scroll (rosas / fotos divisorias)
      gsap.utils.toArray('.zoom-scroll').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.85 },
          {
            scale: 1.05,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [activo])
}
