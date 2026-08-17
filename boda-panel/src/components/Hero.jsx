import { DATOS } from '../datos'
import { IconoFlechaAbajo } from './iconos/Iconos'

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__marco">
        <picture className="hero__media">
          <img src="/assets/fotos-elegidas/hero-principal.jpg" alt="Rubén y Judith" className="hero__foto" />
        </picture>
        <div className="hero__contenido">
          <img className="hero__flor" src="/assets/nuevos/flor.png" alt="" aria-hidden="true" />
          <p className="hero__pretitulo reveal">¡Nos casamos!</p>
          <h1 className="hero__nombres reveal">
            <span className="hero__nombre">{DATOS.novios.el}</span>
            <span className="hero__amp">&amp;</span>
            <span className="hero__nombre">{DATOS.novios.ella}</span>
          </h1>
          <img className="hero__ornamento reveal" src="/assets/nuevos/orma-1.png" alt="" aria-hidden="true" />
          <blockquote className="hero__versiculo reveal">
            <p>“{DATOS.versiculo.texto}”</p>
            <cite>{DATOS.versiculo.cita}</cite>
          </blockquote>
        </div>
      </div>
      <div className="hero__indicador" aria-hidden="true">
        <IconoFlechaAbajo />
      </div>
    </header>
  )
}
