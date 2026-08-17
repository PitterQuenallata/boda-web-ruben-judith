import { DATOS } from '../datos'
import { IconoPin, IconoReloj } from './iconos/Iconos'

// Tarjeta reusable para ceremonia / recepción.
function Tarjeta({ icono, evento }) {
  return (
    <article className="evento__tarjeta reveal">
      <img className="evento__icono evento__icono--animado" src={icono} alt="" aria-hidden="true" />
      <h3>{evento.titulo}</h3>
      <p className="evento__hora">
        <IconoReloj aria-hidden="true" /> {evento.hora}
      </p>
      <p className="evento__lugar">{evento.lugar}</p>
      <p className="evento__direccion">{evento.direccion}</p>
      <a className="boton boton--linea" href={evento.mapa} target="_blank" rel="noopener noreferrer">
        <IconoPin aria-hidden="true" /> Ver ubicación
      </a>
    </article>
  )
}

export default function Evento() {
  return (
    <section className="evento seccion">
      <img className="evento__flor evento__flor--izq" src="/assets/nuevos/flor-3.png" alt="" aria-hidden="true" loading="lazy" />
      <img className="evento__flor evento__flor--der" src="/assets/nuevos/flor-2.png" alt="" aria-hidden="true" loading="lazy" />
      <h2 className="titulo-seccion reveal">Celebramos nuestra unión</h2>
      <p className="evento__intro reveal">
        Será un gran honor para nosotros que nos acompañen a celebrar este día tan especial.
      </p>
      <div className="evento__grid">
        <Tarjeta icono="/assets/voga/icono-iglesia-cafe-dorado.gif" evento={DATOS.ceremonia} />
        <Tarjeta icono="/assets/voga/icono-recepcion-social-cafe-dorado.gif" evento={DATOS.recepcion} />
      </div>
    </section>
  )
}
