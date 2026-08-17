import { useEffect, useState } from 'react'
import { DATOS } from '../datos'

function calcularRestante(objetivo) {
  const diff = Math.max(0, objetivo.getTime() - Date.now())
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor(diff / 3_600_000) % 24,
    minutos: Math.floor(diff / 60_000) % 60,
    segundos: Math.floor(diff / 1_000) % 60,
  }
}

export default function CuentaRegresiva() {
  const [t, setT] = useState(() => calcularRestante(DATOS.fechaBoda))

  useEffect(() => {
    const id = setInterval(() => setT(calcularRestante(DATOS.fechaBoda)), 1000)
    return () => clearInterval(id)
  }, [])

  const unidades = [
    [t.dias, 'Días'],
    [t.horas, 'Horas'],
    [t.minutos, 'Min'],
    [t.segundos, 'Seg'],
  ]
  const fecha = DATOS.fechaBoda
  const mes = new Intl.DateTimeFormat('es-BO', { month: 'long' }).format(fecha)
  const semana = new Intl.DateTimeFormat('es-BO', { weekday: 'long' }).format(fecha)
  const hora = new Intl.DateTimeFormat('es-BO', { hour: '2-digit', minute: '2-digit', hour12: false }).format(fecha)

  return (
    <section className="countdown seccion">
      <img className="countdown__flor" src="/assets/nuevos/flor-2.png" alt="" aria-hidden="true" loading="lazy" />
      <p className="countdown__invitacion reveal">Queremos que nos acompañes en nuestro día</p>
      <div className="countdown__fecha reveal">
        <span>{mes} {fecha.getFullYear()}</span>
        <strong>{fecha.getDate()}</strong>
        <span>{hora} h</span>
      </div>
      <p className="countdown__semana reveal">{semana}</p>
      <img className="countdown__rama reveal" src="/assets/nuevos/rama.png" alt="" aria-hidden="true" />
      <p className="countdown__faltan reveal">Faltan</p>
      <div className="countdown__tarjeta reveal">
        <div className="countdown__grid">
          {unidades.map(([valor, etiqueta]) => (
            <div className="countdown__unidad" key={etiqueta}>
              <span className="countdown__numero">{String(valor).padStart(2, '0')}</span>
              <span className="countdown__etiqueta">{etiqueta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
