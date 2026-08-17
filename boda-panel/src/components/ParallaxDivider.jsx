import { DATOS } from '../datos'

// Franja con foto a todo lo ancho con parallax y frase.
// focoMovil: object-position opcional para pantallas angostas
// (cada foto tiene a la pareja en distinto lugar del encuadre).
export default function ParallaxDivider({ frase, foto, focoMovil }) {
  return (
    <section
      className="divider"
      data-parallax-wrap
      aria-label={frase}
      style={focoMovil ? { '--foco-movil': focoMovil } : undefined}
    >
      <picture className="divider__media">
        <img src={foto} alt="" className="divider__foto" data-parallax="14" loading="lazy" />
      </picture>
      <div className="divider__velo" />
      <p className="divider__frase reveal">{frase}</p>
      <p className="divider__fecha reveal">{DATOS.fechaTexto}</p>
    </section>
  )
}
