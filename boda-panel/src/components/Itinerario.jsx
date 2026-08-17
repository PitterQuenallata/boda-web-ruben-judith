import { DATOS } from '../datos'
const ICONOS = [
  '/assets/voga/icono-iglesia-cafe-dorado.gif',
  '/assets/voga/icono-recepcion-social-cafe-dorado.gif',
  '/assets/voga/icono-cena-cafe.gif',
  '/assets/voga/icono-baile-novios-vals.gif',
]

export default function Itinerario() {
  return (
    <section className="itinerario seccion">
      <h2 className="titulo-seccion reveal">Itinerario</h2>
      <ol className="itinerario__lista">
        {DATOS.itinerario.map((paso, i) => {
          const icono = ICONOS[i % ICONOS.length]
          return (
            <li className="itinerario__paso reveal" key={paso.evento}>
              <article className="itinerario__contenido">
                <img className="itinerario__icono" src={icono} alt="" aria-hidden="true" loading="lazy" />
                <span className="itinerario__evento">{paso.evento}</span>
                <time className="itinerario__hora">{paso.hora}</time>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
