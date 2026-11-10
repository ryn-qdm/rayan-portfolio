import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as RPE } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import portrait from '../assets/photos/rayan.png'
import { profile } from '../data/profile'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const G = 3000 // gravity (px/s²)
const TOP = -20 // lanyard is fixed just above the top edge of the stage

/**
 * Hanging ID card. A point mass (the clip) hangs from the lanyard anchor on a rope of fixed length.
 * The card itself rotates around the clip with its own spring, so it lags, swings and settles.
 * Drag = a soft spring pulling the clip to your pointer. Click without moving = flip.
 */
export default function IdCard() {
  const reduce = useReducedMotion()
  const stage = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const strap = useRef<SVGPathElement>(null)
  const stitch = useRef<SVGPathElement>(null)
  const [w, setW] = useState(270)
  const cw = useRef(270)
  const [flipped, setFlipped] = useState(false)
  const flippedRef = useRef(false)
  const flip = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const rotY = useTransform([flip, tiltY], ([a, b]) => (a as number) + (b as number))
  const s = useRef({ px: 0, py: 0, vx: 0, vy: 0, phi: 0, om: 0, drag: false, tx: 0, ty: 0, W: 0, H: 0, Ax: 0, L: 0 })
  const down = useRef({ x: 0, y: 0, ox: 0, oy: 0, moved: false })
  const wake = useRef<() => void>(() => { })

  const toggle = () => {
    flippedRef.current = !flippedRef.current
    setFlipped(flippedRef.current)
    animate(flip, flippedRef.current ? 180 : 0, reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 13 })
    wake.current()
  }

  useEffect(() => {
    const el = stage.current!
    const st = s.current
    let raf = 0
    let running = false
    let last = 0
    let calm = 0

    const draw = () => {
      const c = cw.current
      card.current!.style.transform = `translate3d(${st.px - c / 2}px,${st.py}px,0) rotate(${st.phi}rad)`
      const d = `M${st.Ax} ${TOP} L${st.px} ${st.py + 4}`
      strap.current?.setAttribute('d', d)
      stitch.current?.setAttribute('d', d)
    }

    const bounds = () => {
      const c = cw.current
      return { minX: c / 2 + 4, maxX: st.W - c / 2 - 4, maxY: st.H - c * 1.5 - 10 }
    }

    const step = (dt: number) => {
      const n = 2, h = dt / n, b = bounds()
      for (let i = 0; i < n; i++) {
        let ax = 0, ay = G
        if (st.drag) {
          const K = 420, C = 2 * Math.sqrt(K) * 0.85
          ax += (st.tx - st.px) * K - st.vx * C
          ay += (st.ty - st.py) * K - st.vy * C
        }
        const pvx = st.vx
        st.vx += ax * h
        st.vy += ay * h
        const damp = Math.pow(0.5, h)
        st.vx *= damp
        st.vy *= damp
        st.px += st.vx * h
        st.py += st.vy * h
        // rope: the clip can never be farther from the anchor than the lanyard length
        const len = st.L - TOP
        const dx = st.px - st.Ax, dy = st.py - TOP, d = Math.hypot(dx, dy)
        if (d > len) {
          const nx = dx / d, ny = dy / d
          st.px = st.Ax + nx * len
          st.py = TOP + ny * len
          const vr = st.vx * nx + st.vy * ny
          if (vr > 0) { st.vx -= vr * nx; st.vy -= vr * ny }
        }
        if (st.px < b.minX) { st.px = b.minX; st.vx = Math.max(0, st.vx) * 0.4 }
        if (st.px > b.maxX) { st.px = b.maxX; st.vx = Math.min(0, st.vx) * 0.4 }
        if (st.py > b.maxY) { st.py = b.maxY; st.vy = Math.min(0, st.vy) * 0.3 }
        // card rotation: spring toward the rope direction plus inertia from sideways acceleration
        const psi = -Math.atan2(st.px - st.Ax, st.py - TOP)
        const lat = (st.vx - pvx) / h
        st.om += (-(st.phi - psi) * 55 - st.om * 3.2 + lat * 0.0035) * h
        st.phi = clamp(st.phi + st.om * h, -1.2, 1.2)
      }
      tiltY.set(clamp(st.vx * 0.02, -18, 18))
      tiltX.set(clamp(-st.vy * 0.008, -10, 10))
      const moving = Math.abs(st.vx) + Math.abs(st.vy) > 4 || Math.abs(st.om) > 0.03
      calm = moving || st.drag ? 0 : calm + 1
    }

    const loop = (t: number) => {
      const dt = Math.min(0.033, (t - last) / 1000)
      last = t
      if (dt > 0) step(dt)
      draw()
      if (calm > 30) { running = false; return }
      raf = requestAnimationFrame(loop)
    }
    wake.current = () => {
      if (reduce || running) return
      running = true
      calm = 0
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const measure = () => {
      const r = el.getBoundingClientRect()
      const narrow = r.width < 640
      st.W = r.width
      st.H = r.height
      st.Ax = r.width * (narrow ? 0.7 : 0.72)
      st.L = clamp(r.height * (narrow ? 0.2 : 0.3), 110, 300)
      const nw = narrow ? clamp(r.width * 0.54, 184, 210) : r.width < 1024 ? 230 : 270
      cw.current = nw
      setW(nw)
      const b = bounds()
      st.px = clamp(st.px, b.minX, b.maxX)
      if (reduce) { st.px = st.Ax; st.py = st.L; st.phi = 0; draw() } else wake.current()
    }

    measure()
    if (!reduce) { st.px = st.Ax + 80; st.py = TOP + 30; draw(); wake.current() } // drops in on load

    const ro = new ResizeObserver(measure)
    ro.observe(el)

    // mouse brushing past the card nudges it
    let lx = 0, lt = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const vx = ((e.clientX - lx) / Math.max(1, now - lt)) * 1000
      lx = e.clientX; lt = now
      if (reduce || e.pointerType !== 'mouse' || st.drag || !card.current) return
      const r = card.current.getBoundingClientRect()
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) {
        st.vx += clamp(vx, -1500, 1500) * 0.05
        wake.current()
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointermove', onMove) }
  }, [reduce, tiltX, tiltY])

  const local = (e: RPE) => {
    const r = stage.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const onDown = (e: RPE) => {
    if (reduce) return
    card.current!.setPointerCapture(e.pointerId)
    const p = local(e), st = s.current
    down.current = { x: e.clientX, y: e.clientY, ox: p.x - st.px, oy: p.y - st.py, moved: false }
    st.drag = true; st.tx = st.px; st.ty = st.py
    wake.current()
  }
  const onMove = (e: RPE) => {
    const st = s.current
    if (!st.drag) return
    const p = local(e), d = down.current
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) d.moved = true
    st.tx = p.x - d.ox; st.ty = p.y - d.oy
  }
  const onUp = () => {
    const st = s.current
    if (!st.drag) return
    st.drag = false
    if (!down.current.moved) toggle()
    wake.current()
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }

  return (
    <div ref={stage} className="stage">
      <svg className="strap" aria-hidden="true">
        <path ref={strap} stroke="var(--violet-deep)" strokeWidth="21" fill="none" />
        <path ref={stitch} stroke="rgba(244,242,236,.55)" strokeWidth="1.8" strokeDasharray="6 7" fill="none" />
      </svg>
      <div
        ref={card}
        className="idcard"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Rayan's ID card. Drag to swing it, press Enter to flip it."
        style={{ width: w, height: w * 1.5, fontSize: Math.max(9.5, w / 20), transformOrigin: '50% 0' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClick={reduce ? toggle : undefined}
        onKeyDown={onKey}
      >
        <div className="clip" aria-hidden="true" />
        <motion.div className="idcard-body" style={{ rotateY: rotY, rotateX: tiltX }}>
          <div className="face front" aria-hidden={flipped}>
            <div className="slot" />
            <p className="idcard-org">Al al-Bayt University</p>
            <div className="idcard-photo"><img src={portrait} alt="Portrait of Rayan Abuqaddom" draggable={false} width={700} height={587} /></div>
            <p className="idcard-name">{profile.name}</p>
            <p className="idcard-title">{profile.shortTitle}</p>
          </div>
          <div className="face back" aria-hidden={!flipped}>
            <div className="slot" />
            <p className="idcard-about">{profile.about}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
