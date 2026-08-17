import { DATOS } from '../datos'

export default function Padres() {
  return (
    <section className="padres seccion seccion--rosa">
      <h2 className="titulo-seccion reveal">Con la bendición de Dios y de nuestros padres</h2>
      <div className="padres__grid">
        <div className="padres__lado reveal">
          {DATOS.padres.novio.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <div className="padres__lado reveal">
          {DATOS.padres.novia.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
