import express from 'express'
import multer from 'multer'
import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_NAME = 'boda',
  DB_USER = 'boda',
  DB_PASSWORD = 'boda',
  // Código para ver /results: nombre de los novios + año (minúsculas, sin espacios)
  CODIGO_PANEL = 'rubenyjudith2026',
  UPLOADS_DIR = path.join(__dirname, 'uploads'),
  PORT = '3000',
} = process.env

const PUBLIC_DIR = path.join(__dirname, 'public')
fs.mkdirSync(UPLOADS_DIR, { recursive: true })

// El contenedor de MySQL tarda unos segundos en aceptar conexiones: reintenta.
async function conectarConReintentos(intentos = 30) {
  let ultimoError
  for (let i = 0; i < intentos; i += 1) {
    try {
      const pool = mysql.createPool({
        host: DB_HOST,
        port: Number(DB_PORT),
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
      })
      await pool.query('SELECT 1')
      return pool
    } catch (error) {
      ultimoError = error
      console.log(`MySQL no responde aún (intento ${i + 1}/${intentos})…`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }
  throw ultimoError
}

const db = await conectarConReintentos()

await db.query(`
  CREATE TABLE IF NOT EXISTS confirmaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    asiste ENUM('si', 'no') NOT NULL,
    acompanantes TINYINT UNSIGNED NOT NULL DEFAULT 0,
    mensaje VARCHAR(500) NOT NULL DEFAULT '',
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)
await db.query(`
  CREATE TABLE IF NOT EXISTS fotos_invitados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL DEFAULT 'Anónimo',
    archivo VARCHAR(120) NOT NULL,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '100kb' }))

// --- Autenticación del panel (/results) ---
function codigoValido(codigo) {
  const esperado = Buffer.from(CODIGO_PANEL.trim().toLowerCase())
  const recibido = Buffer.from(String(codigo || '').trim().toLowerCase())
  return esperado.length === recibido.length && crypto.timingSafeEqual(esperado, recibido)
}

// --- Confirmaciones ---
app.post('/api/confirmaciones', async (req, res) => {
  const { nombre, asiste, acompanantes, mensaje } = req.body || {}
  if (!nombre || typeof nombre !== 'string' || !['si', 'no'].includes(asiste)) {
    return res.status(400).json({ error: 'Nombre y asistencia son obligatorios' })
  }
  await db.query(
    'INSERT INTO confirmaciones (nombre, asiste, acompanantes, mensaje) VALUES (?, ?, ?, ?)',
    [
      nombre.trim().slice(0, 80),
      asiste,
      Math.min(Math.max(Number(acompanantes) || 0, 0), 10),
      String(mensaje || '').slice(0, 500),
    ],
  )
  res.status(201).json({ ok: true })
})

app.get('/api/confirmaciones', async (req, res) => {
  if (!codigoValido(req.get('x-codigo-panel'))) {
    return res.status(401).json({ error: 'Código incorrecto' })
  }
  const [filas] = await db.query(
    'SELECT id, nombre, asiste, acompanantes, mensaje, creado FROM confirmaciones ORDER BY creado DESC',
  )
  res.json(filas)
})

// --- Fotos de invitados ---
const MAX_FOTOS_BYTES = 10 * 1024 * 1024
// Solo fotos estándar: nada de videos, PDFs ni HEIC (no se ven en todos los navegadores)
const TIPOS_FOTO = ['image/jpeg', 'image/png', 'image/webp']

const almacenamiento = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (req, archivo, cb) => {
    const extension = (archivo.originalname.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
    cb(null, `${crypto.randomUUID()}.${extension || 'jpg'}`)
  },
})
const subida = multer({
  storage: almacenamiento,
  limits: { fileSize: MAX_FOTOS_BYTES, files: 10 },
  fileFilter: (req, archivo, cb) => {
    if (TIPOS_FOTO.includes(archivo.mimetype)) return cb(null, true)
    cb(new Error('Solo se permiten fotos JPEG, PNG o WebP'))
  },
})

app.post('/api/fotos', subida.array('fotos', 10), async (req, res) => {
  const nombre = String(req.body.nombre || '').trim().slice(0, 80) || 'Anónimo'
  for (const archivo of req.files || []) {
    await db.query('INSERT INTO fotos_invitados (nombre, archivo) VALUES (?, ?)', [nombre, archivo.filename])
  }
  res.status(201).json({ ok: true, cantidad: (req.files || []).length })
})

app.get('/api/fotos', async (req, res) => {
  const [filas] = await db.query(
    'SELECT id, nombre, archivo, creado FROM fotos_invitados ORDER BY creado DESC',
  )
  res.json(filas.map((fila) => ({ ...fila, url: `/uploads/${fila.archivo}` })))
})

// Vaciar datos de prueba: borra confirmaciones, fotos y archivos subidos.
// Mismo código del panel (x-codigo-panel).
app.post('/api/admin/vaciar', async (req, res) => {
  if (!codigoValido(req.get('x-codigo-panel'))) {
    return res.status(401).json({ error: 'Código incorrecto' })
  }
  await db.query('TRUNCATE TABLE confirmaciones')
  await db.query('TRUNCATE TABLE fotos_invitados')
  for (const archivo of fs.readdirSync(UPLOADS_DIR)) {
    fs.unlinkSync(path.join(UPLOADS_DIR, archivo))
  }
  res.json({ ok: true })
})

// --- Estáticos: fotos subidas + frontend compilado (Vite -> public/) ---
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', immutable: true }))
app.use(express.static(PUBLIC_DIR))

// Fallback SPA: cualquier ruta que no sea /api ni archivo sirve index.html
app.get(/^\/(?!api\/).*/, (req, res, next) => {
  const index = path.join(PUBLIC_DIR, 'index.html')
  if (!fs.existsSync(index)) return next()
  res.sendFile(index)
})

app.use((req, res) => res.status(404).json({ error: 'No encontrado' }))

// Errores de multer (archivo muy grande, tipo inválido, etc.)
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'Cada foto puede pesar hasta 10 MB' })
  }
  console.error(error)
  res.status(400).json({ error: error.message || 'Error al procesar la solicitud' })
})

app.listen(Number(PORT), () => {
  console.log(`boda-api escuchando en http://localhost:${PORT}`)
})
