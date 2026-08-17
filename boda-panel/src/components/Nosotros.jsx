// Sección "Nosotros": foto estilo polaroid con leve rotación.
export default function Nosotros() {
  return (
    <section className="nosotros seccion">
      <h2 className="titulo-seccion reveal">Nosotros</h2>
      <figure className="polaroid reveal">
        <picture>
          <img src="/assets/fotos-elegidas/primeraFotoNosotrso.jpg" alt="Rubén y Judith riéndose juntos" loading="lazy" />
        </picture>
        <figcaption>Rubén &amp; Judith</figcaption>
      </figure>
    </section>
  )
}
