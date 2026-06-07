import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
import { categories, getGamesByCategory, type GameCategory } from '@/config/games'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}): Promise<Metadata> {
  const { category, locale } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return {}

  const isFr = locale === 'fr'
  const label = isFr ? cat.label : cat.labelEn

  return {
    title: isFr
      ? `${label} en ligne — Meilleurs jeux & casinos (2026)`
      : `Online ${label} — Best Games & Casinos (2026)`,
    description: isFr
      ? `${cat.description} ${cat.count} jeux disponibles. Testés à l'argent réel. 18+ Jeu responsable.`
      : `${cat.description} ${cat.count} games available. Tested with real money. 18+ Gamble responsibly.`,
    alternates: {
      languages: buildHreflang(`/jeux/${category}/`, `/${category}/`),
    },
  }
}

export default async function GameCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}) {
  const { locale, category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  const isFr = locale === 'fr'
  const label = isFr ? cat.label : cat.labelEn
  const games = getGamesByCategory(category as GameCategory)

  // Casinos recommended for this category
  const recommendedCasinos = TOP_10.slice(0, 5)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: isFr ? '/jeux/' : '/en/games/' },
          { label },
        ]}
      />

      {/* Hero */}
      <section
        className="pb-2 pt-10"
        data-page-type="jeux_categorie"
        data-category={category}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? `Jeux de casino · ${cat.count} titres` : `Casino games · ${cat.count} titles`}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            <em className="italic not-italic text-green">{label}</em> {isFr ? 'en ligne' : 'online'}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {cat.description}
          </p>
        </div>
      </section>

      {/* Guide section */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {cat.guideTitle}
          </h2>
          <p className="m-0 max-w-[70ch] text-[16px] leading-[1.65] text-ink-2">
            {cat.guideSummary}
          </p>
        </div>
      </section>

      {/* Games grid */}
      {games.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-site px-8 sm:px-[18px]">
            <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? `Jeux populaires — ${label}` : `Popular ${label} games`}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {games.map((game) => (
                <a
                  key={game.slug}
                  href={`/jeux/${category}/avis/${game.slug}/`}
                  className="rounded-lg border border-line bg-surface p-5 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
                  data-event="game_click"
                  data-game={game.slug}
                >
                  {/* Thumbnail placeholder */}
                  <div
                    className="mb-4 aspect-[4/3] rounded border border-dashed border-line-2 bg-surface-2"
                    aria-hidden
                  />
                  <h3 className="mb-1 font-serif text-[18px] font-semibold text-ink">
                    {game.name}
                  </h3>
                  <p className="mb-3 text-[13px] text-ink-3">{game.provider}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                      RTP {game.rtp.toFixed(2)}%
                    </span>
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                      {isFr ? 'Vol.' : 'Vol.'} {game.volatility}
                    </span>
                    {game.popular && (
                      <span className="rounded-[5px] border border-[color-mix(in_srgb,var(--gold)_35%,var(--line))] bg-gold-50 px-2 py-[2px] font-mono text-[10px] text-gold-ink">
                        Populaire
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Casino recommendations for this category */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? `Meilleurs casinos pour les ${label.toLowerCase()}`
              : `Best casinos for ${label.toLowerCase()}`}
          </h2>
          <div className="flex flex-col gap-[14px]">
            {recommendedCasinos.map((op, i) => (
              <ListingCard
                key={op.id}
                operator={op}
                isTop={i === 0}
                ga4={{ 'data-page-type': 'jeux_categorie', 'data-locale': locale }}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <CTAButton
              href="/casinos/"
              variant="secondary"
              data-event="review_click"
              data-placement="jeux_categorie"
            >
              {isFr ? 'Voir tous les casinos' : 'See all casinos'}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
