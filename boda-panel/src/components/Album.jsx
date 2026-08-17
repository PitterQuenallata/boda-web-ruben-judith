import { useEffect, useRef, useState } from 'react'
import { GALERIA } from '../datos'
import { IconoCerrar } from './iconos/Iconos'
import Cargando from './Cargando'
import { usePrecarga } from '../hooks/usePrecarga'

const FOTOS_ALBUM = GALERIA.map((f) => f.src)

// Página del álbum completo: todas las fotos con lightbox.
// Se muestra en lugar de la invitación (la música y los pétalos siguen).
// Primero precarga todas las fotos en caché mostrando el spinner floral;
// cuando están listas, la navegación y el lightbox se ven fluidos.
export default function Album({ onVolver }) {
  const [activa, setActiva] = useState(null)
  const { listo, progreso } = usePrecarga(FOTOS_ALBUM)
  // Inicio del gesto táctil (swipe) en el lightbox
  const toqueX = useRef(null)
  // Marca que el último gesto fue swipe, para que el click sintético
  // posterior no cierre el lightbox justo después de cambiar de foto
  const fueSwipe = useRef(false)

  const siguiente = () => setActiva((a) => (a + 1) % GALERIA.length)
  const anterior = () => setActiva((a) => (a - 1 + GALERIA.length) % GALERIA.length)

  const onTouchStart = (e) => {
    toqueX.current = e.touches[0].clientX
  }

  // Deslizar con el dedo en móviles: izquierda = siguiente, derecha = anterior
  const onTouchEnd = (e) => {
    if (toqueX.current === null) return
    const delta = e.changedTouches[0].clientX - toqueX.current
    toqueX.current = null
    if (Math.abs(delta) < 40) return
    fueSwipe.current = true
    if (delta < 0) siguiente()
    else anterior()
  }

  const cerrar = () => {
    if (fueSwipe.current) {
      fueSwipe.current = false
      return
    }
    setActiva(null)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiva(null)
      if (activa === null) return
      if (e.key === 'ArrowRight') setActiva((a) => (a + 1) % GALERIA.length)
      if (e.key === 'ArrowLeft') setActiva((a) => (a - 1 + GALERIA.length) % GALERIA.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activa])

  useEffect(() => {
    document.body.style.overflow = activa !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activa])

  if (!listo) {
    return (
      <div className="album album--cargando">
        <Cargando progreso={progreso} texto="Preparando el álbum" />
      </div>
    )
  }

  return (
    <div className="album">
      <header className="album__cabecera">
        <button type="button" className="album__volver" onClick={onVolver}>
          ‹ Volver a la invitación
        </button>
        <h1 className="titulo-seccion">Nuestro álbum</h1>
        <p className="album__nota">{GALERIA.length} fotos</p>
      </header>

      <div className="galeria__grid album__grid">
        {GALERIA.map((foto, i) => (
          <button
            type="button"
            className="galeria__item"
            key={foto.src}
            onClick={() => setActiva(i)}
            aria-label={`Ampliar foto ${i + 1}`}
          >
            <img src={foto.src} alt={foto.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {activa !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={cerrar}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lightbox__cerrar" aria-label="Cerrar">
            <IconoCerrar />
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--izq"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation()
              anterior()
            }}
          >
            ‹
          </button>
          <img
            src={GALERIA[activa].src}
            alt={GALERIA[activa].alt}
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox__nav lightbox__nav--der"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation()
              siguiente()
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
