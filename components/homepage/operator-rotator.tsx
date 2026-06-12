'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const NAMES = ['Cresus', 'Lucky8', 'Wild Sultan', 'Madnix', 'Magical Spin', 'Casinozer', 'Tortuga']
const INTERVAL_MS = 2500
const ANIM_MS = 420

export function OperatorRotator() {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return

    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % NAMES.length)
        setAnimating(false)
      }, ANIM_MS)
    }, INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  const name = NAMES[index] ?? NAMES[0]

  return (
    // inline-grid stacking: invisible spacer (longest name) reserves width → zero CLS
    <span className="relative inline-grid align-baseline">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-nowrap border-b-2 border-transparent pb-[2px] italic text-gold-ink"
      >
        Magical Spin
      </span>
      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'col-start-1 row-start-1 whitespace-nowrap border-b-2 border-dotted pb-[2px] italic text-gold-ink',
          'border-[color-mix(in_srgb,var(--gold)_55%,transparent)]',
          'transition-[opacity,transform] duration-[420ms] ease-[ease]',
          animating && '-translate-y-[0.32em] opacity-0'
        )}
      >
        {name}
      </span>
    </span>
  )
}
