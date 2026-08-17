import { useEffect, useState } from 'react'
import { obtenerConfirmaciones } from '../api'

const CLAVE_CODIGO = 'codigo-panel'

export default function Results() {
  const [codigo, setCodigo] = useState(() => sessionStorage.getItem(CLAVE_CODIGO) || '')
  const [confirmaciones, setConfirmaciones] = useState(null)
  const [error, setError] = useState('')

  const cargar = async (codigoIngresado) => {
    setError('')
    try {
      const datos = await obtenerConfirmaciones(codigoIngresado)
      sessionStorage.setItem(CLAVE_CODIGO, codigoIngresado)
      setConfirmaciones(datos)
    } catch (e) {
      sessionStorage.removeItem(CLAVE_CODIGO)
      setError(e.message === 'codigo' ? 'Código incorrecto. Intenta de nuevo.' : 'No se pudieron cargar los datos.')
    }
  }

  useEffect(() => {
    if (codigo) cargar(codigo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!confirmaciones) {
    return (
      <main className="panel">
        <form
          className="panel__acceso"
          onSubmit={(e) => {
            e.preventDefault()
            setCodigo(codigo.trim())
            cargar(codigo.trim())
          }}
        >
          <h1 className="panel__titulo">Confirmaciones</h1>
          <p>Ingresa el código para ver quiénes confirmaron.</p>
          <input
            type="password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código"
            autoComplete="off"
            required
          />
          <button type="submit" className="boton">Entrar</button>
          {error && <p className="panel__error" role="alert">{error}</p>}
        </form>
      </main>
    )
  }

  const asisten = confirmaciones.filter((c) => c.asiste === 'si')
  const noAsisten = confirmaciones.filter((c) => c.asiste === 'no')
  const totalPersonas = asisten.reduce((suma, c) => suma + 1 + c.acompanantes, 0)

  return (
    <main className="panel">
      <h1 className="panel__titulo">Confirmaciones</h1>

      <div className="panel__resumen">
        <div><strong>{asisten.length}</strong><span>confirmaron</span></div>
        <div><strong>{noAsisten.length}</strong><span>no asisten</span></div>
        <div><strong>{totalPersonas}</strong><span>personas en total</span></div>
      </div>

      <div className="panel__tabla-contenedor">
        <table className="panel__tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asiste</th>
              <th>Acompañantes</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {confirmaciones.map((c) => (
              <tr key={c.id} className={c.asiste === 'no' ? 'panel__fila--no' : ''}>
                <td>{c.nombre}</td>
                <td>{c.asiste === 'si' ? 'Sí' : 'No'}</td>
                <td>{c.asiste === 'si' ? c.acompanantes : '—'}</td>
                <td>{c.mensaje || '—'}</td>
                <td>{new Date(c.creado).toLocaleDateString('es-BO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {confirmaciones.length === 0 && <p className="panel__vacio">Aún no hay confirmaciones.</p>}
      </div>

      <button
        type="button"
        className="boton boton--linea panel__salir"
        onClick={() => {
          sessionStorage.removeItem(CLAVE_CODIGO)
          setConfirmaciones(null)
          setCodigo('')
        }}
      >
        Salir
      </button>
    </main>
  )
}
