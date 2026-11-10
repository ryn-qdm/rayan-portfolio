import type { Motif as M } from '../data/projects'

/** Small line illustrations used as project visuals. Colors come from CSS (currentColor + --accent). */
export default function Motif({ kind }: { kind: M }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg className="motif" viewBox="0 0 200 140" role="img" aria-hidden="true">
      {kind === 'drain' && (
        <g {...p}>
          <rect x="40" y="30" width="120" height="86" rx="6" />
          {[62, 82, 102, 122, 142].map((x) => <path key={x} d={`M${x} 40V80`} />)}
          <path className="wave" d="M40 96q15-10 30 0t30 0t30 0t30 0" stroke="var(--accent)" strokeWidth="2.4" />
          <path d="M100 10v14m-6-6l6 6l6-6" stroke="var(--accent)" />
        </g>
      )}
      {kind === 'scan' && (
        <g {...p}>
          <ellipse cx="100" cy="70" rx="52" ry="60" />
          <path d="M100 12v116M60 40q40 24 80 0M56 98q44-22 88 0" />
          <circle className="pulse" cx="122" cy="60" r="10" stroke="var(--accent)" strokeWidth="2.4" />
        </g>
      )}
      {kind === 'sky' && (
        <g {...p}>
          <circle cx="100" cy="70" r="54" />
          <path d="M46 70h108M100 16v108" opacity=".4" />
          <path d="M70 50l24 14l18-22l26 36l-30 8l-20 24" />
          {[[70, 50], [94, 64], [112, 42], [138, 78], [108, 86], [88, 110]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.4" fill="var(--accent)" stroke="none" />)}
        </g>
      )}
      {kind === 'robot' && (
        <g {...p}>
          <rect x="62" y="20" width="76" height="62" rx="14" />
          <circle cx="84" cy="48" r="7" stroke="var(--accent)" strokeWidth="2.4" />
          <circle cx="116" cy="48" r="7" stroke="var(--accent)" strokeWidth="2.4" />
          <path d="M86 68h28M100 20V8M100 82v14M60 112h80M72 96h56v34H72z" />
        </g>
      )}
      {kind === 'coffee' && (
        <g {...p}>
          <path d="M52 56h82v34a30 30 0 01-30 30h-22a30 30 0 01-30-30z" />
          <path d="M134 64h12a14 14 0 010 28h-14" />
          <path className="steam" d="M78 44c-6-8 6-12 0-22M104 44c-6-8 6-12 0-22" stroke="var(--accent)" strokeWidth="2.4" />
          <path d="M70 128h64" />
        </g>
      )}
    </svg>
  )
}
