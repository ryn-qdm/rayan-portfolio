import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Photo } from '../lib/photos'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/**
 * Draggable 360° photo ring. Photos sit on a cylinder; drag (or swipe sideways) to spin it,
 * release to let it coast, and it drifts slowly on its own. Vertical swipes still scroll the page.
 * compact = used inside project cards (no caption, not a tab stop).
 */
export default function Ring3D({ photos, label, compact = false }: { photos: Photo[]; label: string; compact?: boolean }) {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const s = useRef({ rot: 0, vel: 0, drag: false, x: 0, t: 0, moved: 0, visible: true, R: 300 })
  const [front, setFront] = useState(0)
  const slots = Math.max(photos.length, 6)
  const step = 360 / slots

  useEffect(() => {
    const el = root.current!, st = s.current
    const measure = () => {
      const w = el.clientWidth, h = el.clientHeight
      const pw = clamp(Math.min(w * 0.42, (h * 0.78) / 0.75), 90, 420)
      st.R = (pw / 2 / Math.tan(Math.PI / slots)) * 1.12
      el.style.setProperty('--pw', `${pw}px`)
      el.style.setProperty('--R', `${st.R}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { st.visible = e.isIntersecting })
    io.observe(el)
    let raf = 0, last = performance.now(), shown = 0
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      if (st.visible) {
        if (!st.drag) {
          st.rot += st.vel * dt
          st.vel += ((reduce ? 0 : 7) - st.vel) * Math.min(1, dt * 1.6) // coast, then settle into a slow drift
        }
        ring.current!.style.transform = `translateZ(${-st.R}px) rotateX(-7deg) rotateY(${st.rot}deg)`
        const idx = ((Math.round(-st.rot / step) % slots) + slots) % slots
        if (idx !== shown) { shown = idx; setFront(idx) }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [reduce, slots, step])

  const down = (e: React.PointerEvent) => {
    const st = s.current
    st.drag = true; st.x = e.clientX; st.t = performance.now(); st.moved = 0; st.vel = 0
    root.current!.setPointerCapture(e.pointerId)
  }
  const move = (e: React.PointerEvent) => {
    const st = s.current
    if (!st.drag) return
    const now = performance.now(), dx = e.clientX - st.x
    st.rot += dx * 0.32
    st.vel = clamp((dx * 0.32) / Math.max(0.008, (now - st.t) / 1000), -420, 420)
    st.moved += Math.abs(dx); st.x = e.clientX; st.t = now
  }
  const up = () => { s.current.drag = false }
  const click = (e: React.MouseEvent) => {
    if (s.current.moved > 6) { e.preventDefault(); e.stopPropagation() } // a drag must not open the card link
  }
  const key = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') s.current.vel = 160
    if (e.key === 'ArrowLeft') s.current.vel = -160
  }

  return (
    <div className={`ring3d${compact ? ' compact' : ''}`}>
      <div
        ref={root}
        className="ring-stage"
        role="group"
        aria-roledescription="3D photo carousel"
        aria-label={`${label}: photographs. Drag or use arrow keys to rotate.`}
        tabIndex={compact ? -1 : 0}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClick={click}
        onKeyDown={key}
      >
        <div ref={ring} className="ring-spin">
          {photos.map((p, i) => (
            <figure key={p.src} className="ring-panel" style={{ transform: `translate(-50%,-50%) rotateY(${i * step}deg) translateZ(var(--R))` }}>
              <img src={p.src} alt={p.alt} loading="lazy" decoding="async" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
      {!compact && <p className="ring-cap" aria-live="polite">{photos[front]?.caption ?? ''}</p>}
    </div>
  )
}
