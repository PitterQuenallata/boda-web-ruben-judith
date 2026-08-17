import { DATOS } from '../datos'
import Cargando from './Cargando'

// Pantalla de entrada: foto a full, nombres y botón que abre la invitación
// (inicia música + pantalla completa, todo desde el gesto del usuario).
// Mientras las imágenes de la invitación se precargan en caché se muestra
// el spinner floral; al terminar aparece el botón.
export default function Overlay({ onAbrir, abierto, listo, progreso }) {
  return (
    <div className={`overlay ${abierto ? 'overlay--oculto' : ''}`} aria-hidden={abierto}>
      {/* Video de fondo (espejo, ~30 s): versiones comprimidas H.264 sin audio.
          Mientras no existan, se muestra la foto (poster). */}
      <video
        className="overlay__fondo"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/fotos-elegidas/hero-principal.jpg"
      >
        <source src="/assets/video-movil.mp4" media="(max-width: 768px)" />
        <source src="/assets/video.mp4" />
      </video>
      <div className="overlay__velo" />
      <div className="overlay__contenido">
        <p className="overlay__pretitulo">Nuestra Boda</p>
        <h1 className="overlay__nombres">
          {DATOS.novios.el} <span>&</span> {DATOS.novios.ella}
        </h1>
        <p className="overlay__fecha">{DATOS.fechaTexto}</p>
        {listo ? (
          <button type="button" className="boton boton--overlay" onClick={onAbrir}>
            Abrir invitación
          </button>
        ) : (
          <Cargando progreso={progreso} texto="Preparando la invitación" />
        )}
      </div>
    </div>
  )
}
