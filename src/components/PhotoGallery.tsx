import type { Photo } from '../lib/photos'

/** Editorial project gallery: one large feature photo, then a rhythm of smaller ones. */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <section className="pgallery" aria-label="Project photographs">
      <h2>Photographs</h2>
      <div className="pg-grid">
        {photos.map((p) => (
          <figure key={p.src} className={p.src.includes('cutout') ? 'contain' : undefined} tabIndex={0}>
            <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
            {p.caption && <figcaption>{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}
