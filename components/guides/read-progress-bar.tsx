'use client'

import { useEffect, useState } from 'react'

export function ReadProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setProgress(Math.min(100, Math.max(0, pct * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="mt-[18px] h-[3px] overflow-hidden rounded-full bg-line"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
    >
      <div
        className="h-full rounded-full bg-green"
        style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
        aria-hidden
      />
    </div>
  )
}
