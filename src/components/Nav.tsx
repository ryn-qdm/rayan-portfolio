import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from '../lib/scroll'

const items = ['home', 'work', 'about', 'experience', 'contact']

export default function Nav() {
  const [active, setActive] = useState('home')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    if (!onHome) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [onHome])

  const go = (id: string) => (onHome ? scrollToId(id) : nav('/', { state: { to: id } }))

  return (
    <nav className="nav" aria-label="Main">
      {items.map((id) => (
        <button key={id} onClick={() => go(id)} aria-current={onHome && active === id ? 'true' : undefined}>
          {onHome && active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
          <span>{id}</span>
        </button>
      ))}
    </nav>
  )
}
