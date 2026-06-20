import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { categories } from '@/config/games'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Jeux de casino en ligne — machines à sous, roulette, blackjack, live'
      : 'Online Casino Games — slots, roulette, blackjack, live',
    description: isFr
      ? 'Guide complet des jeux de casino en ligne : machines à sous, roulette, blackjack, live, crash games. RTP, stratégies et meilleures variantes.'
      : 'Complete guide to online casino games: slots, roulette, blackjack, live, crash. RTP, strategies and best variants.',
    alternates: { languages: buildHreflang('/jeux/', '/games/') },
  }
}

const catIcons: Record<string, React.ReactNode> = {
  'machines-a-sous': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M16 4v16" />
    </svg>
  ),
  roulette: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  blackjack: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="5" y="3" width="11" height="15" rx="2" />
      <path d="M8 21h11a2 2 0 0 0 2-2V8" />
    </svg>
  ),
  live: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  crash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <path d="M3 19l7-7 4 4 7-9" />
      <path d="M21 7v5h-5" />
    </svg>
  ),
  'video-poker': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="2" y="5" width="8" height="11" rx="1.5" />
      <rect x="14" y="5" width="8" height="11" rx="1.5" />
      <path d="M10 10h4" />
    </svg>
  ),
  'jackpot-progressif': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8l-6.1 2.6 1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
  ),
  poker: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="3" y="5" width="9" height="13" rx="1.5" />
      <rect x="12" y="6" width="9" height="13" rx="1.5" />
      <path d="M6 9h3M6 12h2" />
    </svg>
  ),
  baccarat: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="3" y="7" width="10" height="13" rx="1.5" />
      <rect x="11" y="4" width="10" height="13" rx="1.5" />
    </svg>
  ),
  'game-shows': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9M12 12l7.8 4.5M12 12l-7.8 4.5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  megaways: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <path d="M4 18V10M8 18V6M12 18V4M16 18V8M20 18V13" />
      <path d="M2 18h20" />
    </svg>
  ),
  bingo: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-9 w-9 text-green"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
}

export default async function JeuxHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games' },
        ]}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Guides & analyses' : 'Guides & analyses'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                <em className="italic text-green">Jeux de casino</em> en ligne
              </>
            ) : (
              <>
                Online <em className="italic text-green">casino games</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'RTP, volatilité, stratégies : notre guide complet pour comprendre et choisir les meilleurs jeux de casino.'
              : 'RTP, volatility, strategies: our complete guide to understanding and choosing the best casino games.'}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((cat) => {
              const href = isFr ? `/jeux/${cat.slug}/` : `/en/games/${cat.slug}/`
              const label = isFr ? cat.label : cat.labelEn
              return (
                <a
                  key={cat.slug}
                  href={href}
                  className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-6 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
                  data-event="category_click"
                  data-category={cat.slug}
                >
                  <div className="grid h-14 w-14 place-items-center rounded-[13px] bg-green-50">
                    {catIcons[cat.slug]}
                  </div>
                  <div>
                    <h2 className="mb-1 font-serif text-[22px] font-semibold text-ink">{label}</h2>
                    <p className="font-mono text-[11px] text-ink-3">
                      {cat.count} {isFr ? 'titres' : 'titles'}
                    </p>
                  </div>
                  <p className="flex-1 text-[13.5px] leading-[1.5] text-ink-2">
                    {isFr ? cat.guideSummary : (cat.guideSummaryEn ?? cat.guideSummary)}
                  </p>
                  <span className="font-bold text-green">
                    {isFr
                      ? `Explorer ${label.toLowerCase()} →`
                      : `Explore ${label.toLowerCase()} →`}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
