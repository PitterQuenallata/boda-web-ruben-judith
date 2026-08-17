import { DATOS } from '../datos'

export default function Vestimenta() {
  return (
    <section className="vestimenta seccion seccion--celeste">
      <h2 className="titulo-seccion reveal">{DATOS.vestimenta.titulo}</h2>
      <div className="vestimenta__iconos reveal" aria-hidden="true">
        <span><img src="/assets/voga/icono-dress-vestido-blanco.gif" alt="" /></span>
        <span><img src="/assets/voga/icono-dress-varon-blanco.gif" alt="" /></span>
      </div>
      <p className="vestimenta__texto reveal">{DATOS.vestimenta.texto}</p>
    </section>
  )
}
