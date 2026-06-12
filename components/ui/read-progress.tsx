'use client'

import { useEffect, useRef } from 'react'

export function ReadProgress() {
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    function update() {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      const pct = Math.min(100, (window.scrollY / docH) * 100)
      if (bar) bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="mt-[14px] h-1 overflow-hidden rounded-[2px] bg-bg-sunken" aria-hidden>
      <i ref={barRef} className="block h-full w-0 rounded-[2px] bg-green transition-[width_0.1s]" />
    </div>
  )
}
