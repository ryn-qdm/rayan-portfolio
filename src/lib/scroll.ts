import Lenis from 'lenis'

let lenis: Lenis | null = null
let frame = 0

/** Smooth scrolling (skipped automatically for reduced-motion users). */
export function initScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ lerp: 0.09 })
  const raf = (t: number) => {
    lenis?.raf(t)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)
  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.3 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
