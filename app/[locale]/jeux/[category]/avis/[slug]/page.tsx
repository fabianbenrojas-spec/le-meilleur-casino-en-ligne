import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
import { categories, gameBySlug, games, type GameCategory } from '@/config/games'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return games.map((g) => ({ category: g.category, slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const game = gameBySlug.get(slug)
  if (!game) return {}

  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `${game.name} — Avis, RTP & où jouer (2026)`
      : `${game.name} — Review, RTP & where to play (2026)`,
    description: isFr
      ? `Avis ${game.name} de ${game.provider} : RTP ${game.rtp.toFixed(2)}%, volatilité ${game.volatility}, max win ${game.maxWin}. Nos casinos recommandés pour y jouer.`
      : `${game.name} by ${game.provider} review: RTP ${game.rtp.toFixed(2)}%, volatility ${game.volatility}, max win ${game.maxWin}. Our recommended casinos.`,
    alternates: {
      languages: buildHreflang(`/jeux/${game.category}/avis/${slug}/`),
    },
  }
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2 px-4 py-3 text-center">
      <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{label}</p>
      <p className="font-mono text-[15px] font-semibold text-ink">{value}</p>
    </div>
  )
}

export default async function FicheJeuPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>
}) {
  const { locale, category, slug } = await params
  const game = gameBySlug.get(slug)
  if (!game || game.category !== category) notFound()

  const cat = categories.find((c) => c.slug === (category as GameCategory))
  const isFr = locale === 'fr'
  const catLabel = isFr ? (cat?.label ?? category) : (cat?.labelEn ?? category)

  const casinos = TOP_10.slice(0, 5)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: '/jeux/' },
          { label: catLabel, href: `/jeux/${category}/` },
          { label: game.name },
        ]}
      />

      {/* Hero */}
      <section className="py-10" data-page-type="fiche_jeu" data-game={slug} data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-3 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {game.provider} · {catLabel}
              </div>
              <h1 className="mb-4 font-serif text-[clamp(30px,4vw,46px)] font-medium leading-tight tracking-[-0.02em] text-ink">
                {game.name}
              </h1>
              <p className="m-0 max-w-[60ch] text-[17px] leading-[1.6] text-ink-2">
                {game.description}
              </p>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatPill label="RTP" value={`${game.rtp.toFixed(2)}%`} />
                <StatPill label={isFr ? 'Volatilité' : 'Volatility'} value={game.volatility} />
                <StatPill label="Max Win" value={game.maxWin} />
                <StatPill label={isFr ? 'Mise min.' : 'Min bet'} value={`${game.minBet} €`} />
              </div>

              {/* Features */}
              <div className="mt-6">
                <h2 className="mb-3 text-[15px] font-bold text-ink">
                  {isFr ? 'Fonctionnalités' : 'Features'}
                </h2>
                <ul className="flex flex-col gap-[9px]">
                  {game.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[15px] text-ink-2">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-[16px] w-[16px] shrink-0 text-green"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        aria-hidden
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Game preview placeholder */}
            <div className="rounded-xl border border-line bg-surface-2 shadow-2">
              <div
                className="aspect-[4/3] rounded-t-xl border-b border-line bg-bg-sunken"
                aria-label={`Aperçu de ${game.name}`}
              />
              <div className="p-5">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                  {isFr ? 'Jouer à' : 'Play'} {game.name}
                </p>
                <CTAButton
                  href={TOP_10[0]!.affiliateUrl}
                  variant="primary"
                  block
                  arrow
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={TOP_10[0]!.slug}
                  data-placement="fiche_jeu_cta"
                  data-page-type="fiche_jeu"
                  data-locale={locale}
                >
                  {isFr ? 'Jouer sur Crésus Casino' : 'Play at Crésus Casino'}
                </CTAButton>
                <p className="mt-2 text-center text-[11px] text-ink-3">18+ · Jeu responsable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casino recommendations */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? `Meilleurs casinos pour jouer à ${game.name}`
              : `Best casinos to play ${game.name}`}
          </h2>
          <div className="flex flex-col gap-[14px]">
            {casinos.map((op, i) => (
              <ListingCard
                key={op.id}
                operator={op}
                isTop={i === 0}
                ga4={{ 'data-page-type': 'fiche_jeu', 'data-locale': locale }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
