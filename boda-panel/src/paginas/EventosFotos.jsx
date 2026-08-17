import { useEffect, useRef, useState } from 'react'
import { obtenerFotos, subirFotosInvitados } from '../api'

const MAX_FOTOS = 10
const MAX_BYTES = 10 * 1024 * 1024

// /eventsfotos — página pública para que los invitados suban y vean
// las fotos durante la boda.
export default function EventosFotos() {
  const inputRef = useRef(null)
  const [nombre, setNombre] = useState('')
  const [archivos, setArchivos] = useState([])
  const [estado, setEstado] = useState('idle') // idle | subiendo | ok | error
  const [progreso, setProgreso] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [fotos, setFotos] = useState([])

  const cargarFotos = () =>
    obtenerFotos()
      .then(setFotos)
      .catch(() => {})

  useEffect(() => {
    cargarFotos()
  }, [])

  const seleccionar = (event) => {
    const elegidas = Array.from(event.target.files || []).slice(0, MAX_FOTOS)
    const invalidas = elegidas.some((foto) => !foto.type.startsWith('image/') || foto.size > MAX_BYTES)

    if (invalidas) {
      setArchivos([])
      setMensaje('Cada archivo debe ser una imagen de hasta 10 MB.')
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
      setMensaje('¡Gracias! Tus fotos ya están en la galería.')
      setArchivos([])
      if (inputRef.current) inputRef.current.value = ''
      cargarFotos()
    } catch {
      setEstado('error')
      setMensaje('No pudimos subir las fotos. Inténtalo nuevamente.')
    }
  }

  return (
    <main className="eventos-fotos">
      <section className="eventos-fotos__subir">
        <h1 className="panel__titulo">Fotos de la boda</h1>
        <p>Comparte los momentos que captures hoy. ¡Gracias por ser parte!</p>

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
          accept="image/*"
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
      </section>

      <section className="eventos-fotos__galeria">
        {fotos.length === 0 ? (
          <p className="panel__vacio">Aún no hay fotos. ¡Sé el primero en compartir!</p>
        ) : (
          fotos.map((foto) => (
            <figure key={foto.id}>
              <img src={foto.url} alt={`Foto de ${foto.nombre}`} loading="lazy" />
              <figcaption>{foto.nombre}</figcaption>
            </figure>
          ))
        )}
      </section>
    </main>
  )
}
