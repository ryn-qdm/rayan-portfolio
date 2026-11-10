import { Link, Navigate, useParams } from 'react-router-dom'
import Motif from '../components/Motif'
import Ring3D from '../components/Ring3D'
import ModelViewer from '../components/ModelViewer'
import PhotoGallery from '../components/PhotoGallery'
import { photosIn } from '../lib/photos'
import { projects } from '../data/projects'

export default function CaseStudy() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) return <Navigate to="/" replace />
  const p = projects[i]
  const photos = photosIn(`projects/${p.slug}`)
  const base = import.meta.env.BASE_URL
  const next = projects[(i + 1) % projects.length]
  return (
    <article className="case">
      <Link to="/" state={{ to: 'work' }} className="back">Back to projects</Link>
      <header>
        <p className="muted">{p.tag}</p>
        <h1 className="display case-title">{p.title}</h1>
        <p className="lead">{p.summary}</p>
      </header>
      {p.visual === 'ring' && photos.length ? (
        <div className={`case-visual tone-${p.tone} has-ring`}><Ring3D photos={photos} label={p.title} /></div>
      ) : p.model ? (
        <div className={`case-visual tone-${p.tone} model`}><ModelViewer src={`${base}media/${p.model}`} label={p.title} /></div>
      ) : p.video ? (
        <div className="case-visual video"><video controls loop playsInline preload="metadata" poster={`${base}media/${p.video.poster}`} src={`${base}media/${p.video.src}`} aria-label={`${p.title}: video`} /></div>
      ) : !photos.length ? (
        <div className={`case-visual tone-${p.tone}`}><Motif kind={p.motif} /></div>
      ) : null}
      <dl className="meta">
        <div><dt>Role</dt><dd>{p.role}</dd></div>
        <div><dt>Status</dt><dd>{p.status}</dd></div>
        <div><dt>Built with</dt><dd><ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
      </dl>
      <div className="case-body">
        {p.sections.map((s) => (
          <section key={s.h}><h2>{s.h}</h2><p>{s.p}</p></section>
        ))}
        {p.process && (
          <section><h2>From waste to product</h2>
            <ol className="process">{p.process.map((s, n) => <li key={s.t}><span>{n + 1}</span><div><strong>{s.t}</strong><p>{s.d}</p></div></li>)}</ol>
          </section>
        )}
        <ul className="plain highlights">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      </div>
      {p.visual !== 'ring' && photos.length >= 3 && <PhotoGallery photos={photos} />}
      <Link to={`/work/${next.slug}`} className="next"><span className="muted">Next project</span><strong>{next.title}</strong></Link>
    </article>
  )
}
