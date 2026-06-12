'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface MobileNavProps {
  items: NavItem[]
  labelOpen: string
  labelClose: string
  locale?: string
}

export function MobileNav({ items, labelOpen, labelClose, locale = 'fr' }: MobileNavProps) {
  const isFr = locale === 'fr'
  const [open, setOpen] = useState(false)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Burger button — mobile only */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labelOpen}
        aria-expanded={open}
        className="grid h-10 w-10 cursor-pointer place-items-center rounded-[9px] border border-line-2 bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink md:hidden"
      >
        <Menu size={18} aria-hidden />
      </button>

      {/* Overlay + drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[80] md:hidden"
          role="dialog"
          aria-modal
          aria-label={isFr ? 'Menu principal' : 'Main menu'}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgba(10,12,18,.5)] backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <nav className="absolute right-0 top-0 flex h-full w-[280px] flex-col bg-surface shadow-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-serif text-[17px] font-semibold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labelClose}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-line-2 bg-surface text-ink-2"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col gap-1 p-3" role="list">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-[15px] font-semibold text-ink-2 no-underline transition-colors hover:bg-bg-sunken hover:text-ink'
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Footer strip */}
            <div className="mt-auto border-t border-line px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-3">
                {isFr ? '18+ · Jouez responsable' : '18+ · Gamble responsibly'}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
