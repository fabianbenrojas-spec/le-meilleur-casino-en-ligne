import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
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

function volLevel(v: string): number {
  return ({ basse: 1, moyenne: 2, haute: 4, 'très haute': 5 } as Record<string, number>)[v] ?? 3
}

function provSlug(provider: string): string {
  return provider.toLowerCase().replace(/[^a-z0-9]/g, '')
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
  const casinos = TOP_10.slice(0, 3)

  // Unique providers for toolbar pills
  const providers = Array.from(new Set(games.map((g) => g.provider)))

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: '/jeux/' },
          { label },
        ]}
      />

      {/* Category head */}
      <section
        className="pb-2 pt-[38px]"
        data-page-type="jeux_categorie"
        data-category={category}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? `Catégorie · ${label}` : `Category · ${label}`}
          </div>
          <h1 className="mb-[14px] font-serif text-[clamp(30px,4.4vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Les meilleures <em className="italic text-green">{label.toLowerCase()}</em> en ligne
              </>
            ) : (
              <>
                Best online <em className="italic text-green">{label.toLowerCase()}</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[64ch] text-[17px] leading-[1.6] text-ink-2">{cat.description}</p>
        </div>
      </section>

      {/* Toolbar + game grid */}
      <section className="pb-12 pt-2">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          {/* Toolbar */}
          <div className="mb-[6px] mt-6 flex flex-wrap items-center gap-[10px]">
            <div className="flex flex-wrap gap-2">
              <button
                className="cursor-pointer rounded-full border-[1.5px] border-green bg-green px-[15px] py-2 text-[13px] font-semibold text-white transition-colors"
                data-prov="all"
                data-event="comparison_filter_use"
                type="button"
                aria-pressed="true"
              >
                {isFr ? 'Tous' : 'All'}
              </button>
              {providers.map((prov) => (
                <button
                  key={prov}
                  className="cursor-pointer rounded-full border-[1.5px] border-line-2 bg-surface px-[15px] py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3"
                  data-prov={provSlug(prov)}
                  data-event="comparison_filter_use"
                  type="button"
                  aria-pressed="false"
                >
                  {prov}
                </button>
              ))}
            </div>
            {/* Sort */}
            <div className="ml-auto">
              <select
                className="cursor-pointer appearance-none rounded-[8px] border border-line-2 bg-surface px-[13px] py-[9px] pr-8 text-[13.5px] font-semibold text-ink"
                id="gameSort"
                aria-label={isFr ? 'Trier les jeux' : 'Sort games'}
                data-event="comparison_sort_use"
              >
                <option value="pop">{isFr ? 'Populaires' : 'Popular'}</option>
                <option value="rtp">{isFr ? 'RTP décroissant' : 'RTP descending'}</option>
                <option value="az">A → Z</option>
              </select>
            </div>
          </div>

          {/* Game grid — auto-fill minmax(196px, 1fr) */}
          {games.length > 0 && (
            <div
              id="gameGrid"
              className="mt-2 grid gap-[18px]"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))' }}
            >
              {games.map((game) => (
                <article
                  key={game.slug}
                  className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-3"
                  data-prov={provSlug(game.provider)}
                  data-rtp={game.rtp}
                  data-pop={game.popular ? '1' : '0'}
                  data-name={game.name}
                >
                  {/* Thumbnail — 1:1 aspect */}
                  <div
                    className="relative border-b border-line"
                    style={{
                      aspectRatio: '1/1',
                      background:
                        'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 9px,var(--surface-2) 9px,var(--surface-2) 18px)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {/* RTP badge — top right */}
                    <span className="absolute right-2 top-2 rounded-[5px] bg-green px-[7px] py-[3px] font-mono text-[10px] font-semibold text-white">
                      RTP {game.rtp.toFixed(1)}%
                    </span>
                    {/* Play button — center, visible on hover */}
                    <span className="grid h-[46px] w-[46px] scale-90 place-items-center rounded-full bg-white/90 opacity-0 shadow-2 transition-[opacity,transform] duration-[180ms] group-hover:scale-100 group-hover:opacity-100 [article:hover_&]:scale-100 [article:hover_&]:opacity-100">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-[2px] h-5 w-5 text-green"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    {/* Provider tag — bottom left */}
                    <span className="absolute bottom-2 left-2 rounded-[3px] border border-line bg-surface px-[6px] py-[2px] font-mono text-[9px] text-ink-3">
                      {game.provider}
                    </span>
                  </div>

                  {/* Game body */}
                  <div className="flex flex-1 flex-col gap-2 p-[13px_15px_15px]">
                    <div>
                      <div className="text-[15px] font-bold leading-[1.2] text-ink">
                        {game.name}
                      </div>
                      <div className="font-mono text-[11.5px] text-ink-3">{game.provider}</div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-[6px]">
                      <span className="rounded-[5px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2">
                        Max <strong className="text-ink">{game.maxWin}</strong>
                      </span>
                      <span className="rounded-[5px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2">
                        Vol. {volLevel(game.volatility)}/5
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-2 gap-[7px]">
                      <CTAButton
                        href={`/jeux/${category}/avis/${game.slug}/`}
                        variant="secondary"
                        size="sm"
                        data-event="game_demo_click"
                        data-placement="category_grid"
                        data-page-type="jeux_categorie"
                        data-locale={locale}
                      >
                        {isFr ? 'Démo' : 'Demo'}
                      </CTAButton>
                      <CTAButton
                        href={`/jeux/${category}/avis/${game.slug}/`}
                        variant="primary"
                        size="sm"
                        data-event="game_review_click"
                        data-placement="category_grid"
                        data-page-type="jeux_categorie"
                        data-locale={locale}
                      >
                        {isFr ? 'Avis' : 'Review'}
                      </CTAButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Casino recommendations — where-grid */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[24px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'Où jouer' : 'Where to play'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(24px,3vw,34px)] font-medium tracking-[-0.015em] text-ink">
              {isFr
                ? `Les meilleurs casinos pour les ${label.toLowerCase()}`
                : `Best casinos for ${label.toLowerCase()}`}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[14px] md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {casinos.map((op, i) => (
              <div
                key={op.id}
                className={`flex items-center gap-[14px] rounded-lg border bg-surface p-[16px_18px] shadow-1 transition-shadow hover:shadow-3 ${
                  i === 0
                    ? 'border-[color-mix(in_srgb,var(--gold)_36%,var(--line))]'
                    : 'border-line'
                }`}
              >
                {/* Logo placeholder */}
                <div className="grid h-9 w-[92px] shrink-0 place-items-center rounded border border-dashed border-line-2 bg-bg-sunken font-mono text-[10px] text-ink-3">
                  {op.name}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[17px] font-semibold text-ink">{op.name}</div>
                  <div className="text-[12px] text-ink-2">
                    {isFr ? 'Bonus' : 'Bonus'}{' '}
                    <strong className="text-green">
                      {op.bonusAmount}
                      {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                    </strong>
                  </div>
                </div>
                <CTAButton
                  href={op.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement="category_where_to_play"
                  data-bonus={op.bonusSlug}
                  data-page-type="jeux_categorie"
                  data-locale={locale}
                >
                  {isFr ? 'Jouer' : 'Play'}
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide section — max-width 760px */}
      <section className="py-12">
        <div className="mx-auto max-w-[760px] px-[18px] md:px-8">
          <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            {cat.guideTitle}
          </h2>
          <p className="mb-[14px] text-[16px] leading-[1.7] text-ink-2">{cat.guideSummary}</p>
          <p className="mt-[14px] text-[13px] leading-[1.6] text-ink-3">
            {isFr ? (
              <>
                Rappel : les jeux de casino sont des jeux de hasard. Aucune stratégie ne garantit de
                gain. Fixez-vous des limites et jouez pour le plaisir.{' '}
                <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                  Jeu responsable →
                </a>
              </>
            ) : (
              <>
                Reminder: casino games are games of chance. No strategy guarantees winnings. Set
                limits and play for enjoyment.{' '}
                <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                  Responsible gambling →
                </a>
              </>
            )}
          </p>
        </div>
      </section>
    </>
  )
}
