import { useEffect, useRef, useState } from 'react'
import Overlay from './components/Overlay'
import Hero from './components/Hero'
import Introduccion from './components/Introduccion'
import CuentaRegresiva from './components/CuentaRegresiva'
import Padres from './components/Padres'
import Evento from './components/Evento'
import Puntualidad from './components/Puntualidad'
import ParallaxDivider from './components/ParallaxDivider'
import Itinerario from './components/Itinerario'
import Vestimenta from './components/Vestimenta'
import Consejeros from './components/Consejeros'
import Nosotros from './components/Nosotros'
import Galeria from './components/Galeria'
import CompartirFotos from './components/CompartirFotos'
import Album from './components/Album'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import Despedida from './components/Despedida'
import Petalos from './components/Petalos'
import BotonMusica from './components/BotonMusica'
import { useLenis } from './hooks/useLenis'
import { useAnimaciones } from './hooks/useAnimaciones'
import { usePrecarga } from './hooks/usePrecarga'
import { GALERIA } from './datos'

// Imágenes de la página principal que se precargan en caché detrás del
// overlay de entrada, para que al abrir la invitación todo fluya sin esperas.
const FOTOS_PRINCIPAL = [
  '/assets/fotos-elegidas/hero-principal.jpg',
  '/assets/fotos-elegidas/dos-vidas-un-solo-camino.jpg',
  '/assets/fotos-elegidas/DSC03398.jpg',
  '/assets/fotos-elegidas/celebremos-juntos.jpg',
  '/assets/fotos-elegidas/footer.jpg',
  '/assets/fotos-elegidas/DSC03332.jpg',
  '/assets/fotos-elegidas/DSC03340.jpg',
  '/assets/fotos-elegidas/primeraFotoNosotrso.jpg',
  ...GALERIA.slice(0, 4).map((f) => f.src),
  '/assets/nuevos/flor.png',
  '/assets/nuevos/flor-2.png',
  '/assets/nuevos/flor-3.png',
  '/assets/nuevos/rama.png',
  '/assets/nuevos/orma-1.png',
  '/assets/nuevos/fondo-repetir-3.png',
  '/assets/nuevos/fondo-modelo-marmol-portada.jpg',
  '/assets/voga/icono-iglesia-cafe-dorado.gif',
  '/assets/voga/icono-recepcion-social-cafe-dorado.gif',
  '/assets/voga/icono-cena-cafe.gif',
  '/assets/voga/icono-baile-novios-vals.gif',
  '/assets/voga/icono-camara-fotos-verde.gif',
  '/assets/voga/icono-dress-vestido-blanco.gif',
  '/assets/voga/icono-dress-varon-blanco.gif',
  '/assets/voga/icono-sobre-cerrado-blanco-2.gif',
]

export default function App() {
  // ?preview salta el overlay (útil para pruebas y capturas)
  const [abierto, setAbierto] = useState(
    () => new URLSearchParams(window.location.search).has('preview'),
  )
  const [sonando, setSonando] = useState(false)
  // Vista del álbum completo (#album): reemplaza la invitación sin perder
  // la música ni los pétalos; el botón atrás del navegador también funciona.
  const [album, setAlbum] = useState(() => window.location.hash === '#album')
  const audioRef = useRef(null)
  // Precarga en segundo plano: empieza apenas abre la página (detrás del overlay)
  const { listo, progreso } = usePrecarga(FOTOS_PRINCIPAL)

  useEffect(() => {
    const onPop = () => setAlbum(window.location.hash === '#album')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [album])

  const verAlbum = () => {
    history.pushState(null, '', '#album')
    setAlbum(true)
  }
  const volverDelAlbum = () => {
    history.pushState(null, '', window.location.pathname + window.location.search)
    setAlbum(false)
  }

  useEffect(() => {
    audioRef.current = new Audio('/assets/musica.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.55
    return () => audioRef.current?.pause()
  }, [])

  // Bloquear scroll mientras el overlay está visible
  useEffect(() => {
    document.body.style.overflow = abierto ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useLenis(abierto)
  // !album: al entrar al álbum la invitación se desmonta; sin esto GSAP
  // seguía apuntando a nodos viejos y al volver los divisores perdían
  // el parallax (la foto quedaba desencuadrada).
  useAnimaciones(abierto && !album)

  const abrir = () => {
    setAbierto(true)
    audioRef.current
      ?.play()
      .then(() => setSonando(true))
      .catch(() => setSonando(false))
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  const toggleMusica = () => {
    const audio = audioRef.current
    if (!audio) return
    if (sonando) {
      audio.pause()
      setSonando(false)
    } else {
      audio.play().then(() => setSonando(true)).catch(() => {})
    }
  }

  return (
    <>
      <Overlay onAbrir={abrir} abierto={abierto} listo={listo} progreso={progreso} />

      {abierto && (
        <>
          <Petalos />
          <BotonMusica sonando={sonando} onToggle={toggleMusica} />
        </>
      )}

      {album ? (
        <Album onVolver={volverDelAlbum} />
      ) : (
        <main className={abierto ? '' : 'main--oculto'} aria-hidden={!abierto}>
          <Hero />
          <Introduccion />
          <CuentaRegresiva />
          <Padres />
          <Evento />
          <Puntualidad />
          <ParallaxDivider frase="Dos vidas, un solo camino" foto="/assets/fotos-elegidas/dos-vidas-un-solo-camino.jpg" focoMovil="72% center" />
          <Itinerario />
          <Vestimenta />
          <Consejeros />
          <ParallaxDivider frase="Nuestra historia" foto="/assets/fotos-elegidas/DSC03398.jpg" />
          <Nosotros />
          <Galeria onVerAlbum={verAlbum} />
          <CompartirFotos />
          <ParallaxDivider frase="Un día para recordar" foto="/assets/fotos-elegidas/celebremos-juntos.jpg" />
          <Rsvp />
          <Despedida />
          <Footer />
        </main>
      )}
    </>
  )
}
