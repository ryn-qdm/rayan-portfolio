import { photosIn } from '../lib/photos'

/** Editorial mosaic of event photos. Add files to src/assets/photos/moments/, nothing else needed. */
export default function Moments() {
  const photos = photosIn('moments')
  if (!photos.length) return null
  return (
    <section className="section moments" aria-label="Photographs from events, programmes and university life">
      <div className="mosaic">
        {photos.map((p) => (
          <figure key={p.src}>
            <div><img src={p.src} alt={p.alt} loading="lazy" decoding="async" /></div>
            {p.caption && <figcaption>{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}
