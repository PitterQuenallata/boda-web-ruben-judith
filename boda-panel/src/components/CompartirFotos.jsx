import { useRef, useState } from 'react'
import { subirFotosInvitados } from '../api'

const MAX_FOTOS = 5
const MAX_BYTES = 10 * 1024 * 1024
// Solo fotos estándar (JPEG/PNG/WebP): nada de videos ni PDFs
const TIPOS_OK = ['image/jpeg', 'image/png', 'image/webp']

export default function CompartirFotos() {
  const inputRef = useRef(null)
  const [nombre, setNombre] = useState('')
  const [archivos, setArchivos] = useState([])
  const [estado, setEstado] = useState('idle')
  const [progreso, setProgreso] = useState(0)
  const [mensaje, setMensaje] = useState('')

  const seleccionar = (event) => {
    const elegidas = Array.from(event.target.files || []).slice(0, MAX_FOTOS)
    const invalidas = elegidas.some((foto) => !TIPOS_OK.includes(foto.type) || foto.size > MAX_BYTES)

    if (invalidas) {
      setArchivos([])
      setMensaje('Solo fotos JPEG, PNG o WebP de hasta 10 MB cada una.')
      return
    }

    setArchivos(elegidas)
    setMensaje(elegidas.length ? `${elegidas.length} foto${elegidas.length > 1 ? 's' : ''} seleccionada${elegidas.length > 1 ? 's' : ''}.` : '')
  }

  const subir = async () => {
    if (!archivos.length) {
      inputRef.current?.click()
      return
    }
    setEstado('subiendo')
    setMensaje('Subiendo tus recuerdos…')
    try {
      await subirFotosInvitados({ archivos, nombre, onProgreso: setProgreso })
      setEstado('ok')
      setMensaje('¡Gracias! Las fotografías se compartieron correctamente.')
      setArchivos([])
      if (inputRef.current) inputRef.current.value = ''
    } catch {
      setEstado('error')
      setMensaje('No pudimos subir las fotografías. Inténtalo nuevamente.')
    }
  }

  return (
    <section className="compartir-fotos seccion seccion--rosa">
      <div className="compartir-fotos__tarjeta reveal">
        <img src="/assets/voga/icono-camara-fotos-verde.gif" alt="" className="compartir-fotos__icono" aria-hidden="true" loading="lazy" />
        <h2>Comparte tus fotografías</h2>
        <p>Ayúdanos a guardar los momentos más especiales de este día vistos desde tu cámara.</p>

        <input
          className="compartir-fotos__nombre"
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="Tu nombre (opcional)"
          maxLength="80"
          autoComplete="name"
        />
        <input
          ref={inputRef}
          className="compartir-fotos__archivo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={seleccionar}
        />

        <div className="compartir-fotos__acciones">
          <button type="button" className="boton boton--linea" onClick={() => inputRef.current?.click()} disabled={estado === 'subiendo'}>
            Elegir fotos
          </button>
          <button type="button" className="boton" onClick={subir} disabled={estado === 'subiendo' || !archivos.length}>
            {estado === 'subiendo' ? `Subiendo ${progreso}%` : 'Compartir fotos'}
          </button>
        </div>

        {mensaje && <p className={`compartir-fotos__estado compartir-fotos__estado--${estado}`} role="status">{mensaje}</p>}
      </div>
    </section>
  )
}
