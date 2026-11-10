import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'
import Motif from './Motif'
import Ring3D from './Ring3D'
import { photosIn } from '../lib/photos'
import { projects } from '../data/projects'
import { education, experience, honors, profile, publication, skills } from '../data/profile'

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-h">
      <div className="section-head">
        <h2 id="work-h" className="display">Projects.</h2>
        <p className="aside">Research, hardware and AI systems built across Jordan, Spain, Saudi Arabia, and Egypt. Open a project for the full story.</p>
      </div>
      <div className="grid">
        {projects.map((p, i) => {
          const photos = photosIn(`projects/${p.slug}`)
          const cover = p.video ? `${import.meta.env.BASE_URL}media/${p.video.poster}` : (photos.find((f) => p.cover && f.src.includes(p.cover)) ?? photos[0])?.src
          return (
          <Link key={p.slug} to={`/work/${p.slug}`} className={`card span-${i < 3 ? 2 : 3} tone-${p.tone}`}>
            <div className="card-bar">
              <strong>{p.title.length > 34 ? p.title.split(/[:(]/)[0].slice(0, 34).trim() + '…' : p.title}</strong>
              <span>{p.tag}</span>
              <i className="dots" aria-hidden="true"><b /><b /><b /></i>
            </div>
            <motion.div className="card-panel" initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: (i % 3) * 0.08 }}>
              {p.visual === 'ring' && photos.length ? <Ring3D compact photos={photos} label={p.title} /> : cover ? <img className={`card-cover${p.coverFit ? ' contain' : ''}`} src={cover} alt={p.title} loading="lazy" decoding="async" /> : <Motif kind={p.motif} />}
              <p>{p.summary}</p>
            </motion.div>
          </Link>
          )
        })}
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="section-head">
        <h2 id="about-h" className="display">About.</h2>
      </div>
      <div className="split">
        <div>
          <p className="lead">{profile.about}</p>
          <p className="muted">Research interests: {profile.interests.join(', ').toLowerCase()}.</p>
          <h3 className="sub">Education</h3>
          <ul className="ledger">
            {education.map((e) => (
              <li key={e.title}><span className="when">{e.when}</span><div><strong>{e.title}</strong><span>{e.where}</span><p>{e.note}</p></div></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sub">Toolbox</h3>
          {skills.map((g) => (
            <div key={g.group} className="chips-row"><span className="muted">{g.group}</span><ul className="chips">{g.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
          <h3 className="sub">Publication</h3>
          <p className="muted cite">{publication.cite}</p>
          <h3 className="sub">Honors</h3>
          <ul className="plain">{honors.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-h">
      <div className="section-head">
        <h2 id="exp-h" className="display">Experience.</h2>
        <p className="aside">Research, leadership, community and the rooms I have learned in.</p>
      </div>
      {experience.map((g) => (
        <div key={g.group} className="exp-group">
          <h3 className="sub">{g.group}</h3>
          <ul className="ledger">
            {g.rows.map((r) => (
              <li key={r.role + r.org}><span className="when">{r.when}</span><div><strong>{r.role}</strong>{r.org && <span>{r.org}</span>}{r.text && <p>{r.text}</p>}</div></li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export function Contact() {
  const links = [
    { label: 'Email', href: `mailto:${profile.email}`, text: profile.email },
    { label: 'Phone', href: `tel:${profile.phone.replace(/\s/g, '')}`, text: profile.phone },
    profile.linkedin && { label: 'LinkedIn', href: profile.linkedin, text: 'Connect on LinkedIn' },
    profile.github && { label: 'GitHub', href: profile.github, text: 'See my code' },
  ].filter(Boolean) as { label: string; href: string; text: string }[]
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <h2 id="contact-h" className="display big">Let's build something useful.</h2>
      <ul className="contact-list">
        {links.map((l) => (
          <li key={l.label}><span className="muted">{l.label}</span><a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{l.text}</a></li>
        ))}
      </ul>
      <Magnetic><a className="btn solid" href={`${import.meta.env.BASE_URL}${profile.cv}`} download>Download CV</a></Magnetic>
      <p className="foot muted">© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
    </section>
  )
}
