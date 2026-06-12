interface ScoreRingProps {
  score: number // 0–10
  label?: string // e.g. 'Excellent'
}

// Rendered as a Server Component — conic-gradient is computed at render time
export function ScoreRing({ score, label = 'Excellent' }: ScoreRingProps) {
  const pct = Math.min(100, Math.max(0, score * 10))

  return (
    <div
      className="relative grid h-[118px] w-[118px] flex-none place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--green) ${pct}%, var(--line) 0)`,
      }}
      role="img"
      aria-label={`Note : ${score}/10 — ${label}`}
    >
      <div className="grid h-24 w-24 place-items-center rounded-full bg-surface text-center [box-shadow:inset_0_0_0_1px_var(--line)]">
        <div>
          <p className="font-serif text-[32px] font-semibold leading-none text-ink">
            {score.toFixed(1)}
            <small className="font-sans text-sm text-ink-3">/10</small>
          </p>
          <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-green">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}
