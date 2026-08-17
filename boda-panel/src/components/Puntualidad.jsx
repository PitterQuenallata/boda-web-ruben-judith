import { IconoReloj } from './iconos/Iconos'

export default function Puntualidad() {
  return (
    <aside className="puntualidad seccion seccion--compacta" aria-label="Aviso de puntualidad">
      <div className="puntualidad__tarjeta reveal">
        <IconoReloj className="puntualidad__reloj" aria-hidden="true" />
        <p>
          La celebración comenzará puntualmente. Queremos que disfrutes con nosotros cada
          momento; te agradeceremos mucho que llegues a tiempo.
        </p>
      </div>
    </aside>
  )
}
