import { useEffect, useState } from 'react'
import { DATOS } from '../datos'

const FOTOS = [
  '/assets/fotos-elegidas/footer.jpg',
  '/assets/fotos-elegidas/DSC03332.jpg',
  '/assets/fotos-elegidas/DSC03340.jpg',
]

export default function Footer() {
  const [activa, setActiva] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = window.setInterval(() => setActiva((indice) => (indice + 1) % FOTOS.length), 3000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="footer__media">
        {FOTOS.map((foto, indice) => (
          <img
            src={foto}
            alt=""
            className={`footer__foto ${indice === activa ? 'footer__foto--activa' : ''}`}
            loading={indice === 0 ? 'eager' : 'lazy'}
            aria-hidden="true"
            key={foto}
          />
        ))}
      </div>
      <div className="footer__velo" />
      <div className="footer__contenido">
        <p className="footer__frase reveal">Te esperamos</p>
        <p className="footer__nombres reveal">
          {DATOS.novios.el} <span>&</span> {DATOS.novios.ella}
        </p>
        <p className="footer__fecha reveal">{DATOS.fechaTexto}</p>
        <p className="footer__ciudad reveal">{DATOS.ciudad}</p>
        <p className="footer__credito">
          Invitación digital creada por <strong>Pitter Quenallata</strong>
          <a href="https://blakor.tech" target="_blank" rel="noopener noreferrer">blakor.tech</a>
        </p>
      </div>
    </footer>
  )
}
