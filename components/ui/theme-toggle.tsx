'use client'

import { Moon, Sun } from 'lucide-react'

// No useState/useEffect — purely DOM-driven to avoid hydration mismatch.
// The anti-flash script in <head> sets data-theme before React hydrates,
// and CSS controls which icon is visible based on [data-theme="dark"] on <html>.
export function ThemeToggle({ locale = 'fr' }: { locale?: string }) {
  function toggle() {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    try {
      localStorage.setItem('mc-theme', next)
    } catch {
      // localStorage unavailable (private browsing)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={locale === 'fr' ? 'Basculer le mode sombre' : 'Toggle dark mode'}
      data-event="dark_mode_toggle"
      type="button"
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-[9px] border border-line-2 bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
    >
      {/* CSS shows/hides the correct icon via globals.css .theme-sun / .theme-moon */}
      <span className="theme-sun" aria-hidden>
        <Sun size={18} />
      </span>
      <span className="theme-moon" aria-hidden>
        <Moon size={18} />
      </span>
    </button>
  )
}
