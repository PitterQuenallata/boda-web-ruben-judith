import { IconoAnillos } from './iconos/Iconos'

export default function Introduccion() {
  return (
    <section className="introduccion seccion">
      <IconoAnillos className="introduccion__anillos reveal" aria-hidden="true" />
      <p className="introduccion__titulo reveal">Nuestra promesa</p>
      <p className="introduccion__texto reveal">
        Elegimos caminar juntos, acompañarnos en cada paso y construir un hogar lleno de fe,
        respeto y amor.
      </p>
    </section>
  )
}
