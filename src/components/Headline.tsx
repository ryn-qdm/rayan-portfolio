import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'

export default function Headline() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const words = profile.headlineWords

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 3000)
    return () => clearInterval(t)
  }, [reduce, words.length])

  return (
    <h1 className="headline">
      <span className="sr-only">{profile.headlineStart} {words.join(' ')}</span>
      <span aria-hidden="true">{profile.headlineStart}</span>
      <span className="swap" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            className="swap-word"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-105%', opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  )
}
