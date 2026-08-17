import { GALERIA } from '../datos'

// Teaser en la página principal: 4 fotos estilo mini-polaroid escalonadas
// y botón hacia el álbum completo.
export default function Galeria({ onVerAlbum }) {
  const teaser = GALERIA.slice(0, 4)
  return (
    <section className="galeria seccion seccion--celeste">
      <img className="galeria__icono reveal" src="/assets/voga/icono-camara-fotos-verde.gif" alt="" aria-hidden="true" loading="lazy" />
      <h2 className="titulo-seccion reveal">Nuestros momentos</h2>
      <div className="teaser reveal">
        {teaser.map((foto) => (
          <figure className="teaser__foto" key={foto.src}>
            <img src={foto.src} alt={foto.alt} loading="lazy" />
          </figure>
        ))}
      </div>
      <button type="button" className="boton galeria__boton reveal" onClick={onVerAlbum}>
        Ver álbum completo
      </button>
    </section>
  )
}
