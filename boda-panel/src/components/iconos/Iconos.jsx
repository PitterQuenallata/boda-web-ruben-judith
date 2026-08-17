// Iconos SVG fine-line hechos a medida (trazo 1.5, estilo wedding elegante).
// Todos heredan color via currentColor.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconoIglesia = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 2.5v3M10.5 4h3" />
    <path d="M12 5.5 5 11v9.5h14V11l-7-5.5Z" />
    <path d="M12 20.5v-5a1.8 1.8 0 0 0-3.6 0v5M12 20.5v-5a1.8 1.8 0 0 1 3.6 0v5" transform="translate(-1.2 0)" />
    <path d="M3 20.5h18" />
  </svg>
)

export const IconoAnillos = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="9" cy="14" r="5.5" />
    <circle cx="15" cy="14" r="5.5" />
    <path d="M12 3.5 10 6.5h4L12 3.5Z" />
  </svg>
)

export const IconoCopas = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M6 3h6v4a3 3 0 0 1-6 0V3Z" />
    <path d="M9 10v6M6.5 19h5" transform="translate(0 -1)" />
    <path d="M14 5h5v3.2a2.5 2.5 0 0 1-5 0V5Z" />
    <path d="M16.5 10.7V17M14.5 19.5h4" transform="translate(0 -1.5)" />
  </svg>
)

export const IconoCalendario = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M8.5 13.5c.6-1.5 2.4-1.8 3.5-.6 1.1-1.2 2.9-.9 3.5.6.5 1.4-.5 2.7-3.5 4.6-3-1.9-4-3.2-3.5-4.6Z" />
  </svg>
)

export const IconoReloj = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const IconoPin = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 21s-6.5-5.3-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.8" r="2.3" />
  </svg>
)

export const IconoVestido = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M9 3.5c.5 1.5 1.4 2.3 3 2.3s2.5-.8 3-2.3" />
    <path d="M9.8 5.8 8.5 10l2 1.5L7 20h10l-3.5-8.5 2-1.5-1.3-4.2" />
  </svg>
)

export const IconoTraje = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M8 4 5.5 6.5 8 20h3l1-9 1 9h3l2.5-13.5L16 4l-2 3h-4L8 4Z" />
    <path d="M12 11v9" strokeDasharray="1 2.2" />
  </svg>
)

export const IconoSobre = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const IconoNotaMusical = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M9 18.5V6l10-2.5V16" />
    <ellipse cx="6.8" cy="18.5" rx="2.4" ry="1.9" />
    <ellipse cx="16.8" cy="16" rx="2.4" ry="1.9" />
  </svg>
)

export const IconoNotaSilencio = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M9 18.5V6l10-2.5V16" />
    <ellipse cx="6.8" cy="18.5" rx="2.4" ry="1.9" />
    <ellipse cx="16.8" cy="16" rx="2.4" ry="1.9" />
    <path d="M3.5 3.5l17 17" />
  </svg>
)

export const IconoCena = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M2.5 8v8M4.8 8v8M2.5 12h2.3M19.2 8v8M21.5 8c-1.2 1.5-1.8 3-1.8 4.5" />
  </svg>
)

export const IconoFiesta = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 3v2.5M5.6 5.6l1.8 1.8M18.4 5.6l-1.8 1.8M3 12h2.5M18.5 12H21" />
    <path d="M7 21c0-3.5 2.2-6 5-6s5 2.5 5 6" />
    <path d="M9.5 10.5c.8-1.2 1.7-1.2 2.5 0 .8-1.2 1.7-1.2 2.5 0" />
  </svg>
)

export const IconoFlechaAbajo = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M12 4v14M6.5 13 12 18.5 17.5 13" />
  </svg>
)

export const IconoCerrar = (props) => (
  <svg viewBox="0 0 24 24" {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

// ---- Ilustraciones florales vectoriales ----

export const RosaLinea = (props) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
    <path d="M50 88c0-14 0-24 2-34" />
    <path d="M50 72c-8-2-14-8-15-16 8 0 14 4 16 12M51 66c8-4 11-12 9-20-7 3-11 9-10 17" />
    <circle cx="52" cy="38" r="16" />
    <path d="M52 30a8 8 0 1 1-8 8" />
    <path d="M52 24a14 14 0 0 1 14 14M52 52a14 14 0 0 1-14-14" />
    <path d="M46 36a6 6 0 0 1 6-6" />
  </svg>
)

export const RamaEucalipto = (props) => (
  // viewBox con margen superior (-14): la hoja de la punta (cy=1, ry=13,
  // rotada) desbordaba y se veía cortada.
  <svg viewBox="0 -14 120 234" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <path d="M60 215C55 150 58 80 68 8" />
    {[180, 150, 120, 90, 60, 32].map((y, i) => (
      <g key={y}>
        <path d={`M${59 + i * 1.4} ${y} q -18 -6 -26 -20`} />
        <ellipse cx={31 - i} cy={y - 22} rx="9" ry="13" transform={`rotate(-30 ${31 - i} ${y - 22})`} />
        <path d={`M${61 + i * 1.4} ${y - 12} q 18 -4 27 -17`} />
        <ellipse cx={90 + i} cy={y - 31} rx="9" ry="13" transform={`rotate(28 ${90 + i} ${y - 31})`} />
      </g>
    ))}
  </svg>
)

// Separador: línea fina con rombo central (estilo invitación clásica)
export const Separador = (props) => (
  <svg viewBox="0 0 200 20" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
    <path d="M0 10h78M122 10h78" />
    <rect x="93" y="3.5" width="13" height="13" transform="rotate(45 99.5 10)" />
    <circle cx="100" cy="10" r="2" fill="currentColor" stroke="none" />
  </svg>
)
