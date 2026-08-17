import { useEffect, useState } from 'react'

// Precarga imágenes en caché del navegador reportando progreso.
// `urls` debe ser una constante de módulo (referencia estable).
// listo=true cuando todas terminaron, carguen o fallen (nunca bloquea).
export function usePrecarga(urls) {
  const [cargadas, setCargadas] = useState(0)
  const total = urls.length

  useEffect(() => {
    if (total === 0) return undefined
    let activo = true
    urls.forEach((url) => {
      const img = new Image()
      img.onload = img.onerror = () => {
        if (activo) setCargadas((n) => n + 1)
      }
      img.src = url
    })
    return () => {
      activo = false
    }
  }, [urls])

  return {
    cargadas,
    total,
    listo: total === 0 || cargadas >= total,
    progreso: total ? Math.round((cargadas / total) * 100) : 100,
  }
}
