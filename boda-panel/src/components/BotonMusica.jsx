import { IconoNotaMusical, IconoNotaSilencio } from './iconos/Iconos'

// Botón flotante para silenciar / reanudar la música.
export default function BotonMusica({ sonando, onToggle }) {
  return (
    <button
      type="button"
      className="boton-musica"
      onClick={onToggle}
      aria-label={sonando ? 'Silenciar música' : 'Reproducir música'}
      aria-pressed={sonando}
    >
      {sonando ? <IconoNotaMusical /> : <IconoNotaSilencio />}
    </button>
  )
}
