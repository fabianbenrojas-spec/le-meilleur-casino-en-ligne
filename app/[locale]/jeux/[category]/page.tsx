import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ListingCard } from '@/components/ui/operator-card'
import {
  categories,
  getGamesByCategory,
  type GameCategory,
  type GameCategoryInfo,
} from '@/config/games'
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
      ? `${label} en ligne — Guide, RTP & meilleurs casinos (2026)`
      : `Online ${label} — Guide, RTP & Best Casinos (2026)`,
    description: isFr
      ? `${cat.description} ${cat.count} jeux disponibles. Avantages, stratégies, comparatif casinos. Testé à l'argent réel. 18+`
      : `${cat.description} ${cat.count} games. Advantages, strategies, casino comparison. Tested with real money. 18+`,
    alternates: { languages: buildHreflang(`/jeux/${category}/`) },
  }
}

function AdvantageCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 shadow-1">
      <span className="text-[28px] leading-none" aria-hidden>
        {icon}
      </span>
      <h3 className="font-serif text-[16px] font-semibold text-ink">{title}</h3>
      <p className="text-[14px] leading-[1.6] text-ink-2">{text}</p>
    </div>
  )
}

function CasinoComparisonTable({ cat, locale }: { cat: GameCategoryInfo; locale: string }) {
  const isFr = locale === 'fr'
  const casinos = TOP_10.slice(0, 6)
  const label = isFr ? cat.label.toLowerCase() : cat.labelEn.toLowerCase()

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-[13.5px]">
        <thead>
          <tr className="border-b border-line bg-bg-sunken">
            {[
              isFr ? 'Casino' : 'Casino',
              isFr ? 'Bonus' : 'Bonus',
              isFr ? 'Licence' : 'Licence',
              'RTP',
              isFr ? 'Note' : 'Rating',
              '',
            ].map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {casinos.map((op, i) => (
            <tr
              key={op.id}
              className="hover:bg-bg-sunken/60 border-b border-line transition-colors last:border-b-0"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {i === 0 && (
                    <span className="hidden rounded-[4px] bg-gold-50 px-[6px] py-[2px] font-mono text-[9.5px] font-semibold uppercase tracking-[0.05em] text-gold-ink sm:inline">
                      #{i + 1}
                    </span>
                  )}
                  <Link
                    href={`/casinos/${op.slug}/`}
                    className="font-semibold text-ink no-underline hover:text-green hover:underline"
                  >
                    {op.name}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-3 text-ink-2">
                <span className="font-semibold text-ink">{op.bonusAmount}</span>
                {op.bonusSuffix && <span className="ml-1 text-ink-3">{op.bonusSuffix}</span>}
              </td>
              <td className="px-4 py-3 font-mono text-[12px] uppercase text-ink-3">{op.licence}</td>
              <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-ink">
                {op.rtp.toFixed(1)}%
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-[13px] font-bold text-green">
                  {op.rating.toFixed(1)}
                </span>
                <span className="text-ink-3">/10</span>
              </td>
              <td className="px-4 py-3">
                <a
                  href={op.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block rounded-[6px] bg-green px-3 py-[6px] font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-white no-underline transition-opacity hover:opacity-80"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement={`jeux_categorie_table_${cat.slug}`}
                  data-page-type="jeux_categorie"
                >
                  {isFr ? 'Jouer' : 'Play'}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line bg-bg-sunken px-4 py-2 text-[11.5px] text-ink-3">
        {isFr
          ? `Comparatif des meilleurs casinos pour jouer aux ${label} · Classement basé sur notre notation indépendante · 18+ · Jeu responsable`
          : `Best casinos for ${label} · Ranking based on our independent rating · 18+ · Gamble responsibly`}
      </p>
    </div>
  )
}

function RelatedCategoryCard({ catSlug, locale }: { catSlug: GameCategory; locale: string }) {
  const isFr = locale === 'fr'
  const related = categories.find((c) => c.slug === catSlug)
  if (!related) return null

  const ICONS: Record<GameCategory, string> = {
    'machines-a-sous': '🎰',
    roulette: '🎡',
    blackjack: '♠️',
    live: '🎥',
    crash: '✈️',
    'video-poker': '🃏',
    jackpots: '💰',
  }

  return (
    <Link
      href={`/jeux/${catSlug}/`}
      className="hover:border-green/40 flex flex-col items-center gap-2 rounded-lg border border-line bg-surface px-5 py-6 text-center no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[2px] hover:shadow-3"
      data-event="game_click"
      data-game={catSlug}
    >
      <span className="text-[32px] leading-none" aria-hidden>
        {ICONS[catSlug] ?? '🎮'}
      </span>
      <span className="font-serif text-[15px] font-semibold text-ink">
        {isFr ? related.label : related.labelEn}
      </span>
      <span className="font-mono text-[11px] text-ink-3">
        {related.count} {isFr ? 'jeux' : 'games'}
      </span>
    </Link>
  )
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
  const recommendedCasinos = TOP_10.slice(0, 5)
  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? `Meilleurs jeux ${label} en ligne 2026` : `Best online ${label} games 2026`,
    itemListElement: games.slice(0, 10).map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${BASE_URL}${isFr ? '' : '/en'}/jeux/${g.category}/avis/${g.slug}/`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: isFr ? '/jeux/' : '/en/games/' },
          { label },
        ]}
        locale={locale}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="pb-2 pt-10"
        data-page-type="jeux_categorie"
        data-category={category}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? `${cat.count} jeux · 2026` : `${cat.count} games · 2026`}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            <em className="not-italic text-green">{label}</em> {isFr ? 'en ligne' : 'online'}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {cat.description}
          </p>
        </div>
      </section>

      {/* ── Advantages ──────────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? `Pourquoi jouer aux ${label.toLowerCase()} en ligne ?`
              : `Why play ${label.toLowerCase()} online?`}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cat.advantages.map((adv) => (
              <AdvantageCard key={adv.title} icon={adv.icon} title={adv.title} text={adv.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide éditorial ─────────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-sunken py-12" id="guide">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {cat.guideTitle}
          </h2>
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            {cat.guideBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Games grid ──────────────────────────────────────────────────── */}
      {games.length > 0 && (
        <section className="py-12" id="jeux">
          <div className="mx-auto max-w-site px-8 sm:px-[18px]">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
                {isFr ? `Jeux populaires — ${label}` : `Popular ${label} games`}
              </h2>
              <span className="font-mono text-[12px] text-ink-3">
                {games.length} {isFr ? 'jeux' : 'games'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {games.map((game) => (
                <Link
                  key={game.slug}
                  href={`/jeux/${category}/avis/${game.slug}/`}
                  className="group rounded-lg border border-line bg-surface p-5 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
                  data-event="game_click"
                  data-game={game.slug}
                >
                  <div className="mb-4 overflow-hidden rounded">
                    {game.imageUrl ? (
                      <Image
                        src={game.imageUrl}
                        alt={game.name}
                        width={400}
                        height={300}
                        className="w-full object-cover"
                      />
                    ) : (
                      <div
                        className="aspect-[4/3] border border-dashed border-line-2 bg-surface-2"
                        aria-hidden
                      />
                    )}
                  </div>
                  <h3 className="mb-1 font-serif text-[18px] font-semibold text-ink transition-colors group-hover:text-green">
                    {game.name}
                  </h3>
                  <p className="mb-1 text-[12px] text-ink-3">{game.provider}</p>
                  {game.theme && <p className="mb-3 text-[12px] italic text-ink-3">{game.theme}</p>}
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                      RTP {game.rtp.toFixed(2)}%
                    </span>
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                      Vol. {game.volatility}
                    </span>
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                      Max {game.maxWin}
                    </span>
                    {game.popular && (
                      <span className="rounded-[5px] border border-[color-mix(in_srgb,var(--gold)_35%,var(--line))] bg-gold-50 px-2 py-[2px] font-mono text-[10px] text-gold-ink">
                        {isFr ? 'Populaire' : 'Popular'}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-[11.5px] font-medium text-green">
                    {isFr ? "Voir l'avis →" : 'Read review →'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Casino comparison table ─────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-sunken py-12" id="casinos">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? `Comparatif casinos — où jouer aux ${label.toLowerCase()} ?`
              : `Casino comparison — where to play ${label.toLowerCase()}?`}
          </h2>
          <p className="mb-6 max-w-[65ch] text-[15px] leading-[1.6] text-ink-2">
            {isFr
              ? `Tous les casinos ci-dessous proposent les ${label.toLowerCase()} avec des licences reconnues. Triés par note éditoriale indépendante.`
              : `All casinos below offer ${label.toLowerCase()} with recognised licences. Sorted by independent editorial rating.`}
          </p>
          <CasinoComparisonTable cat={cat} locale={locale} />
          <div className="mt-8 flex flex-col gap-[14px]">
            {recommendedCasinos.map((op, i) => (
              <ListingCard
                key={op.id}
                operator={op}
                isTop={i === 0}
                ctaBonus={isFr ? 'Obtenir le bonus' : 'Get bonus'}
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

      {/* ── Related game types ──────────────────────────────────────────── */}
      <section className="py-12" id="alternatives">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Autres types de jeux' : 'Other game types'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cat.relatedCategories.map((slug) => (
              <RelatedCategoryCard key={slug} catSlug={slug} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-sunken py-14" id="faq">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? `Questions fréquentes — ${label}` : `FAQ — ${label}`}
          </h2>
          <FAQAccordion items={cat.faq} />
        </div>
      </section>
    </>
  )
}
