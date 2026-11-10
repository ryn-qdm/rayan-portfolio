import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Wrap any button or link: it drifts slightly toward the mouse. Disabled on touch and reduced motion. */
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
