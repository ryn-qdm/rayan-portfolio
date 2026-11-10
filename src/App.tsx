import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import CaseStudy from './pages/CaseStudy'
import Home from './pages/Home'
import { initScroll, scrollTop } from './lib/scroll'
import { profile } from './data/profile'

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const first = useRef(true)
  useEffect(() => initScroll(), [])
  useEffect(() => { first.current = false }, [])

  return (
    <>
      <header className="top">
        <Link to="/" className="mark" aria-label={`${profile.name}, home`}><span aria-hidden="true">R</span>{profile.name}</Link>
      </header>
      {!reduce && !first.current && (
        <motion.div key={location.pathname} className="sweep" aria-hidden="true" initial={{ y: '100%' }} animate={{ y: ['100%', '0%', '0%', '-100%'] }} transition={{ duration: 1, times: [0, 0.4, 0.55, 1], ease: [0.76, 0, 0.24, 1] }} />
      )}
      <AnimatePresence mode="wait" onExitComplete={scrollTop}>
        <motion.main key={location.pathname} id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Nav />
    </>
  )
}
