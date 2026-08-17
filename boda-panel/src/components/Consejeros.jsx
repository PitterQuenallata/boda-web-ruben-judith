import { DATOS } from '../datos'

export default function Consejeros() {
  return (
    <section className="consejeros seccion seccion--rosa">
      <h2 className="titulo-seccion reveal">Nuestros consejeros</h2>
      <div className="consejeros__grid">
        <div className="consejeros__grupo reveal">
          <h3>De Religión</h3>
          {DATOS.consejeros.religion.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <div className="consejeros__grupo reveal">
          <h3>De Civil</h3>
          {DATOS.consejeros.civil.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
