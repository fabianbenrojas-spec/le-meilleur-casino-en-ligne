import { Search } from 'lucide-react'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import type { Locale } from '@/i18n/routing'
import { localizeHref } from '@/lib/i18n/routes'
import { MobileNav } from './mobile-nav'

interface SiteHeaderProps {
  locale: Locale
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const isFr = locale === 'fr'

  const navItems = [
    { label: isFr ? 'Casinos' : 'Casinos', href: localizeHref('/casinos/', locale) },
    { label: isFr ? 'Comparatifs' : 'Comparisons', href: localizeHref('/comparatifs/', locale) },
    { label: isFr ? 'Jeux' : 'Games', href: localizeHref('/jeux/', locale) },
    { label: isFr ? 'Bonus' : 'Bonuses', href: localizeHref('/bonus/', locale) },
    { label: isFr ? 'Guides' : 'Guides', href: localizeHref('/guides/', locale) },
  ]

  return (
    <header
      className="site-header-bg sticky top-0 z-[60] border-b border-line [backdrop-filter:saturate(150%)_blur(14px)]"
      style={{ height: 'var(--header-h)' }}
    >
      <div className="mx-auto flex h-full max-w-site items-center gap-[26px] px-[18px] md:px-8">
        {/* Logo */}
        <a
          href={locale === 'fr' ? '/' : '/en/'}
          className="flex shrink-0 items-center gap-[11px] font-bold leading-none tracking-[-0.01em] text-ink no-underline"
          aria-label="le meilleur casino — accueil"
        >
          <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green font-serif text-[18px] font-semibold text-white shadow-1">
            M
          </span>
          <span className="hidden whitespace-nowrap text-[15.5px] sm:block">
            le·<b className="text-green">meilleur</b>·casino
          </span>
        </a>

        {/* Main nav — desktop only */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-[13px] py-[9px] text-[14.5px] font-semibold text-ink-2 no-underline transition-[background,color] duration-150 hover:bg-bg-sunken hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Tools */}
        <div className="ml-auto flex items-center gap-2.5">
          {/* Search button */}
          <button
            type="button"
            aria-label={isFr ? 'Rechercher' : 'Search'}
            className="hidden h-10 w-10 cursor-pointer place-items-center rounded-[9px] border border-line-2 bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink md:grid"
          >
            <Search size={18} aria-hidden />
          </button>

          <ThemeToggle />

          <MobileNav
            items={navItems}
            labelOpen={isFr ? 'Ouvrir le menu' : 'Open menu'}
            labelClose={isFr ? 'Fermer le menu' : 'Close menu'}
          />
        </div>
      </div>
    </header>
  )
}
