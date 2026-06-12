'use client'

import { useEffect, useRef, useState } from 'react'

type Locale = 'fr' | 'en'

interface LocaleSwitcherProps {
  currentLocale: Locale
  /** Map of locale → URL for the current page */
  localeUrls: Record<Locale, string>
}

const localeLabels: Record<Locale, { label: string; sublabel: string }> = {
  fr: { label: 'FR', sublabel: 'Français' },
  en: { label: 'EN', sublabel: 'English' },
}

function Flag({ locale }: { locale: Locale }) {
  if (locale === 'fr') {
    return (
      <span
        className="inline-block h-[14px] w-5 overflow-hidden rounded-[2px] [box-shadow:0_0_0_1px_rgba(0,0,0,.08)]"
        style={{ background: 'linear-gradient(90deg,#1d2e6b 0 33%,#fff 33% 66%,#cf2b3a 66%)' }}
        aria-hidden
      />
    )
  }
  return (
    <span
      className="inline-block h-[14px] w-5 overflow-hidden rounded-[2px] bg-[#00247d] [box-shadow:0_0_0_1px_rgba(0,0,0,.08)]"
      aria-hidden
    />
  )
}

export function LocaleSwitcher({ currentLocale, localeUrls }: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const otherLocales = (Object.keys(localeUrls) as Locale[]).filter((l) => l !== currentLocale)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Changer la langue"
        className="font-inherit inline-flex h-10 items-center gap-[7px] rounded-[9px] border border-line-2 bg-surface px-3 text-[13.5px] font-semibold text-ink transition-colors hover:border-ink-3"
        data-action="locale-toggle"
      >
        <Flag locale={currentLocale} />
        {localeLabels[currentLocale]?.label ?? currentLocale.toUpperCase()}
        <span className="text-[10px] text-ink-3">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choisir la langue"
          className="absolute right-0 top-12 z-50 min-w-[168px] rounded border border-line bg-surface p-[6px] shadow-3"
        >
          {/* Current locale (selected) */}
          <li
            role="option"
            aria-selected
            className="flex items-center gap-2.5 rounded-[7px] bg-bg-sunken px-[11px] py-[9px] text-[14px] font-medium text-ink"
          >
            <Flag locale={currentLocale} />
            {localeLabels[currentLocale]?.sublabel ?? currentLocale}
            <span className="ml-auto font-mono text-[11.5px] text-ink-3">✓</span>
          </li>

          {otherLocales.map((locale) => (
            <li key={locale} role="option" aria-selected={false}>
              <a
                href={localeUrls[locale]}
                className="flex items-center gap-2.5 rounded-[7px] px-[11px] py-[9px] text-[14px] font-medium text-ink no-underline transition-colors hover:bg-bg-sunken"
                onClick={() => setOpen(false)}
                data-event="locale_switch"
                data-from={currentLocale}
                data-to={locale}
              >
                <Flag locale={locale} />
                {localeLabels[locale]?.sublabel ?? locale}
                <span className="ml-auto font-mono text-[11.5px] text-ink-3">
                  {locale.toUpperCase()}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
