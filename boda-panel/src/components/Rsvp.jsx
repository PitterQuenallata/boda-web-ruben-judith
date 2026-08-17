import { useState } from 'react'
import { enviarConfirmacion } from '../api'

const INICIAL = { nombre: '', asiste: 'si', acompanantes: 0, mensaje: '', trampa: '' }

export default function Rsvp() {
  const [form, setForm] = useState(INICIAL)
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error

  const cambia = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    if (form.trampa) return // honeypot anti-spam
    setEstado('enviando')
    try {
      await enviarConfirmacion(form)
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section className="rsvp seccion seccion--azul" id="rsvp">
      <img className="rsvp__icono reveal" src="/assets/voga/icono-sobre-cerrado-blanco-2.gif" alt="" aria-hidden="true" loading="lazy" />
      <h2 className="titulo-seccion reveal">Confirma tu asistencia</h2>
      <p className="rsvp__intro reveal">
        Nos encantará contar contigo. Por favor confirma antes del 20 de agosto de 2026.
      </p>

      {estado === 'ok' ? (
        <div className="rsvp__gracias reveal">
          <p>¡Gracias por confirmar, {form.nombre.split(' ')[0]}!</p>
          <p>Tu respuesta quedó registrada. Te esperamos con mucha alegría.</p>
        </div>
      ) : (
        <form className="rsvp__form reveal" onSubmit={enviar}>
          <label>
            Nombre y apellido
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={cambia}
              required
              maxLength={80}
              autoComplete="name"
            />
          </label>

          <fieldset>
            <legend>¿Nos acompañarás?</legend>
            <label className="radio">
              <input type="radio" name="asiste" value="si" checked={form.asiste === 'si'} onChange={cambia} />
              Sí, ahí estaré
            </label>
            <label className="radio">
              <input type="radio" name="asiste" value="no" checked={form.asiste === 'no'} onChange={cambia} />
              No podré asistir
            </label>
          </fieldset>

          {form.asiste === 'si' && (
            <label>
              Acompañantes (sin contarte)
              <input
                type="number"
                name="acompanantes"
                min="0"
                max="5"
                value={form.acompanantes}
                onChange={cambia}
              />
            </label>
          )}

          <label>
            Restricciones alimentarias o mensaje
            <textarea name="mensaje" rows="3" value={form.mensaje} onChange={cambia} maxLength={500} />
          </label>

          {/* Honeypot: invisible para humanos, visible para bots */}
          <label className="rsvp__trampa" aria-hidden="true">
            No llenar
            <input type="text" name="trampa" value={form.trampa} onChange={cambia} tabIndex={-1} autoComplete="off" />
          </label>

          <button type="submit" className="boton" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando…' : 'Confirmar asistencia'}
          </button>

          {estado === 'error' && (
            <p className="rsvp__error" role="alert">
              No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.
            </p>
          )}
        </form>
      )}
    </section>
  )
}
