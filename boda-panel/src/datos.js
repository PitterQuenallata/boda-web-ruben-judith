// Datos centralizados de la invitación — editar aquí cualquier texto.
export const DATOS = {
  novios: { el: 'Rubén', ella: 'Judith' },
  versiculo: {
    texto:
      'Así que no son ya más dos, sino una sola carne; por tanto lo que Dios juntó, no lo separe el hombre.',
    cita: 'Mateo 19:6',
  },
  // Santa Cruz de la Sierra, Bolivia (UTC-4)
  fechaBoda: new Date('2026-09-20T14:30:00-04:00'),
  fechaTexto: 'Domingo 20 de Septiembre de 2026',
  padres: {
    novio: ['Juan Francisco Sola', 'Delmira Limachi Mamani'],
    novia: ['Edwin E. Canaviri Canaviri', 'Estefania Sandoval Copa'],
  },
  ceremonia: {
    titulo: 'Ceremonia Religiosa',
    hora: '14:30 h',
    lugar: 'Iglesia Misión Adventista del Séptimo Día — Movimiento de Reforma',
    direccion: 'C/ Los Pinos, Av. 18 de Marzo, Plan 3000',
    mapa: 'https://maps.app.goo.gl/AtHqtHmkLfJqz4qz5?g_st=aw',
  },
  recepcion: {
    titulo: 'Recepción Social',
    hora: '17:00 h',
    lugar: 'La Quinta Eventos',
    direccion: 'Av. Prolongación Piraí, 5to Anillo N° 500',
    mapa: 'https://maps.app.goo.gl/TMy7ioawEAAwR7859?g_st=aw',
  },
  itinerario: [
    { hora: '14:30 h', evento: 'Ceremonia Religiosa' },
    { hora: '17:00 h', evento: 'Recepción Social' },
    { hora: '18:30 h', evento: 'Cena' }, // TODO: confirmar
    { hora: '20:00 h', evento: 'Celebración' }, // TODO: confirmar
  ],
  vestimenta: {
    titulo: 'Código de Vestimenta',
    texto: 'Formal',
  },
  consejeros: {
    religion: ['Pr. Franz Terceros', 'Francy Montaño'],
    civil: ['Pr. Rene A. Tarifa', 'Rilma Soliz'],
  },
  ciudad: 'Santa Cruz de la Sierra, Bolivia',
}

// Galería: versiones optimizadas servidas desde public/assets/fotos-elegidas.
// (Las fotos con nombre propio van en hero, divisores, polaroid y footer;
//  DSC03398 también está en el divisor "Nos casamos".)
const FOTOS_GALERIA = [
  'DSC03168.jpg', 'DSC03180.jpg', 'DSC03188.jpg', 'DSC03195.jpg', 'DSC03199.jpg',
  'DSC03211.jpg', 'DSC03215.jpg', 'DSC03236.jpg', 'DSC03238.jpg', 'DSC03248.jpg',
  'DSC03253.jpg', 'DSC03269.jpg', 'DSC03279.jpg', 'DSC03285.jpg', 'DSC03286.jpg',
  'DSC03290.jpg', 'DSC03291.jpg', 'DSC03294.jpg', 'DSC03305.jpg', 'DSC03313.jpg',
  'DSC03330.jpg', 'DSC03332.jpg', 'DSC03340.jpg', 'DSC03352.jpg', 'DSC03358-2.jpg',
  'DSC03362.jpg', 'DSC03370-2.jpg', 'DSC03373-2.jpg', 'DSC03384-2.jpg', 'DSC03393.jpg',
  'DSC03401.jpg', 'DSC03417.jpg', 'DSC03419.jpg', 'DSC03420-2.jpg', 'DSC03425-2.jpg',
  'DSC03426-2.jpg', 'DSC03431-2.jpg',
]

export const GALERIA = FOTOS_GALERIA.map((nombre, i) => ({
  src: `/assets/fotos-elegidas/${nombre}`,
  alt: `Rubén y Judith — foto ${i + 1}`,
}))
