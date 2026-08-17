// Spinner temático de boda: una flor de pétalos que gira y "florece",
// con texto y porcentaje de progreso opcionales.
export default function Cargando({ progreso, texto = 'Cargando…' }) {
  return (
    <div className="cargando" role="status" aria-live="polite">
      <div className="cargando__flor" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="cargando__petalo" style={{ '--i': i }} />
        ))}
        <span className="cargando__centro" />
      </div>
      <p className="cargando__texto">{texto}</p>
      {typeof progreso === 'number' && (
        <p className="cargando__progreso">{progreso}%</p>
      )}
    </div>
  )
}
