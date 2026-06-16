'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
}

export function ReviewSubNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState('')
  const ioRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-28% 0px -62% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) ioRef.current?.observe(el)
    })

    return () => ioRef.current?.disconnect()
  }, [items])

  return (
    <nav
      className="sticky-subnav-bg sticky top-[var(--header-h)] z-40 mb-6 border-b border-line"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      aria-label="Sections de l'avis"
      data-spy
    >
      <div className="mx-auto flex max-w-[880px] gap-1 overflow-x-auto px-[18px] [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden">
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              'whitespace-nowrap border-b-2 px-3 py-[13px] text-[13.5px] font-semibold no-underline transition-[color,border-color] hover:text-ink',
              activeId === id ? 'border-green text-green' : 'border-transparent text-ink-2'
            )}
            data-event="toc_click"
            data-target={id}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
