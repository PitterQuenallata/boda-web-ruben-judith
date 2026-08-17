// Cliente de la API propia (boda-api). Reemplaza a Firebase:
// mismo origen, rutas relativas — en producción Express sirve el frontend
// y en desarrollo Vite redirige /api y /uploads al backend (vite.config.js).

export async function enviarConfirmacion({ nombre, asiste, acompanantes, mensaje }) {
  const res = await fetch('/api/confirmaciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      asiste,
      acompanantes: Number(acompanantes) || 0,
      mensaje: mensaje || '',
    }),
  })
  if (!res.ok) throw new Error('No se pudo enviar la confirmación')
}

// XMLHttpRequest (en vez de fetch) para tener progreso real de subida.
export function subirFotosInvitados({ archivos, nombre, onProgreso }) {
  return new Promise((resolve, reject) => {
    const datos = new FormData()
    datos.append('nombre', nombre || '')
    archivos.forEach((archivo) => datos.append('fotos', archivo))

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/fotos')
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgreso?.(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status < 300) {
        onProgreso?.(100)
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(xhr.responseText || 'Error al subir'))
      }
    }
    xhr.onerror = () => reject(new Error('Error de red'))
    xhr.send(datos)
  })
}

export async function obtenerConfirmaciones(codigo) {
  const res = await fetch('/api/confirmaciones', {
    headers: { 'x-codigo-panel': codigo },
  })
  if (res.status === 401) throw new Error('codigo')
  if (!res.ok) throw new Error('Error al cargar las confirmaciones')
  return res.json()
}

export async function obtenerFotos() {
  const res = await fetch('/api/fotos')
  if (!res.ok) throw new Error('Error al cargar las fotos')
  return res.json()
}
