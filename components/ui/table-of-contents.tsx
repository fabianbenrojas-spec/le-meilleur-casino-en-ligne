'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export interface TOCItem {
  id: string
  label: string
  level?: 2 | 3
}

interface TableOfContentsProps {
  items: TOCItem[]
  title?: string
  className?: string
  locale?: string
}

export function TableOfContents({ items, title, className, locale = 'fr' }: TableOfContentsProps) {
  const isFr = locale === 'fr'
  const resolvedTitle = title ?? (isFr ? 'Sommaire' : 'Contents')
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${64 + 20}px 0px -60% 0px`,
      }
    )

    headings.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [items])

  return (
    <nav
      aria-label={isFr ? 'Table des matières' : 'Table of contents'}
      className={cn('rounded-lg border border-line bg-surface px-2 py-4 shadow-1', className)}
    >
      <p className="mb-2 px-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3">
        {resolvedTitle}
      </p>
      <ul className="m-0 list-none p-0">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'true' : undefined}
              className={cn(
                'block rounded-[7px] border-l-2 px-3 py-2 text-[13.5px] font-medium leading-tight transition-[background,color,border-color] duration-150',
                item.level === 3 && 'pl-5 text-[13px]',
                activeId === item.id
                  ? 'border-l-green bg-green-50 text-green'
                  : 'border-l-transparent text-ink-2 hover:bg-bg-sunken hover:text-ink'
              )}
              data-event="toc_click"
              data-section={item.id}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
