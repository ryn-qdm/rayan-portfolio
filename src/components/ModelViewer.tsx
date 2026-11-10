import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Interactive GLB viewer (Google model-viewer, loaded only when this page opens). Drag to orbit, scroll or pinch to zoom. */
export default function ModelViewer({ src, label }: { src: string; label: string }) {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)
  useEffect(() => { import('@google/model-viewer').then(() => setReady(true)) }, [])
  return (
    <div className="model-wrap">
      {ready && (
        <model-viewer
          src={src}
          alt={`Interactive 3D model: ${label}`}
          camera-controls=""
          auto-rotate={reduce ? undefined : ''}
          auto-rotate-delay="2500"
          rotation-per-second="14deg"
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1"
          environment-image="neutral"
          interaction-prompt="none"
          touch-action="pan-y"
        >
          <div slot="progress-bar" className="mv-progress"><i /></div>
        </model-viewer>
      )}
      <p className="model-hint">Drag to rotate · scroll or pinch to zoom</p>
    </div>
  )
}
