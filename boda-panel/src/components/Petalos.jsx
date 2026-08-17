import { useEffect, useRef } from 'react'

// Canvas de pétalos cayendo: rosa/blush/azul, con rotación, vaivén y viento suave.
const COLORES = ['#e3bec3', '#f3e2e2', '#d8a7b1', '#9fb4c7', '#c7d4e0']

export default function Petalos() {
  const ref = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = null
    let visible = true

    const esMovil = window.innerWidth < 768
    const N = esMovil ? 12 : 25

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const nuevoPetalo = (inicial) => ({
      x: Math.random() * window.innerWidth,
      y: inicial ? Math.random() * window.innerHeight : -30,
      r: 6 + Math.random() * 9,
      vy: 0.22 + Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.22,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.009,
      vaiven: Math.random() * Math.PI * 2,
      vVaiven: 0.004 + Math.random() * 0.007,
      amp: 20 + Math.random() * 30,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
      opacidad: 0.55 + Math.random() * 0.35,
    })

    let petalos = Array.from({ length: N }, () => nuevoPetalo(true))

    const dibujaPetalo = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacidad
      ctx.fillStyle = p.color
      // Pétalo: dos curvas bezier formando una lágrima suave
      ctx.beginPath()
      ctx.moveTo(0, -p.r)
      ctx.bezierCurveTo(p.r * 0.9, -p.r * 0.6, p.r * 0.7, p.r * 0.7, 0, p.r)
      ctx.bezierCurveTo(-p.r * 0.7, p.r * 0.7, -p.r * 0.9, -p.r * 0.6, 0, -p.r)
      ctx.fill()
      ctx.restore()
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      petalos = petalos.map((p) => {
        p.vaiven += p.vVaiven
        p.x += p.vx + Math.sin(p.vaiven) * (p.amp / 60)
        p.y += p.vy
        p.rot += p.vrot
        dibujaPetalo(p)
        return p.y > window.innerHeight + 40 ? nuevoPetalo(false) : p
      })
    }
    loop()

    const onVisibilidad = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibilidad)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilidad)
    }
  }, [])

  return <canvas ref={ref} className="petalos" aria-hidden="true" />
}
