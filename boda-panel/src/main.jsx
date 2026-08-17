import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/kapakana/latin-300.css'
import '@fontsource/kapakana/latin-ext-300.css'
import '@fontsource/kapakana/latin-400.css'
import '@fontsource/kapakana/latin-ext-400.css'
import '@fontsource/pinyon-script/latin-400.css'
import '@fontsource/pinyon-script/latin-ext-400.css'
import '@fontsource/josefin-sans/latin-300.css'
import '@fontsource/josefin-sans/latin-ext-300.css'
import '@fontsource/josefin-sans/latin-300-italic.css'
import '@fontsource/josefin-sans/latin-ext-300-italic.css'
import '@fontsource/josefin-sans/latin-400.css'
import '@fontsource/josefin-sans/latin-ext-400.css'
import '@fontsource/josefin-sans/latin-600.css'
import '@fontsource/josefin-sans/latin-ext-600.css'
import '@fontsource/marcellus/latin-400.css'
import '@fontsource/marcellus/latin-ext-400.css'
import App from './App.jsx'
import Results from './paginas/Results.jsx'
import EventosFotos from './paginas/EventosFotos.jsx'
import './estilos.css'

// Rutas sin librería: /results (panel de confirmaciones con código) y
// /eventsfotos (subida de fotos durante la boda); el resto es la invitación.
const ruta = window.location.pathname
const Pagina = ruta.startsWith('/results')
  ? Results
  : ruta.startsWith('/eventsfotos')
    ? EventosFotos
    : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pagina />
  </React.StrictMode>,
)
