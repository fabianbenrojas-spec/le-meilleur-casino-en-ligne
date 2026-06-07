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
    <span className="inline-flex items-baseline align-baseline">
      <span
        className={cn(
          'font-italic inline-block whitespace-nowrap border-b-2 border-dotted pb-[2px] italic text-gold-ink',
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
