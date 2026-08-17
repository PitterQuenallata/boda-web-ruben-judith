import { DATOS } from '../datos'
import { RamaEucalipto } from './iconos/Iconos'

export default function Despedida() {
  return (
    <section className="despedida seccion">
      {/* Rama vectorial teñida de dorado (el PNG de hojas secas era casi
          invisible sobre fondo claro). */}
      <RamaEucalipto className="despedida__rama reveal" strokeWidth={2.4} aria-hidden="true" />
      <p className="despedida__texto reveal">
        Gracias por acompañarnos en uno de los días más especiales de nuestra historia. Su
        compañía, sus oraciones y su cariño son un regalo para nosotros. Agradecemos a Dios y
        a la vida por permitirnos celebrar este momento con nuestra familia y amigos más queridos.
      </p>
      <p className="despedida__cierre reveal">Con todo nuestro amor</p>
      <p className="despedida__nombres reveal">
        {DATOS.novios.el} &amp; {DATOS.novios.ella}
      </p>
    </section>
  )
}
