import { DATOS } from '../datos'
import { Separador } from './iconos/Iconos'

export default function Versiculo() {
  return (
    <section className="versiculo seccion">
      <blockquote className="reveal">
        <p>“{DATOS.versiculo.texto}”</p>
        <cite>({DATOS.versiculo.cita})</cite>
      </blockquote>
      <Separador className="separador reveal" aria-hidden="true" />
    </section>
  )
}
