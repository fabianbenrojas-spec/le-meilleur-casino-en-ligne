import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { GuideSearchClient, type GuideCardData } from '@/components/guides/guide-search-client'
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
      ? 'Guides casino en ligne — légalité, RTP, paiements, stratégies'
      : 'Online Casino Guides — legality, RTP, payments, strategies',
    description: isFr
      ? 'Nos guides complets pour jouer intelligemment : légalité en France, comprendre le RTP, choisir vos paiements, jeu responsable.'
      : 'Our complete guides for smart play: legality, understanding RTP, choosing payments, responsible gambling.',
    alternates: { languages: buildHreflang('/guides/') },
  }
}

// ── Guide card data (for index only — slug page has full data) ────────────────

const GUIDE_CARDS: GuideCardData[] = [
  {
    slug: 'legalite',
    title: 'Légalité en France',
    desc: "Casino en ligne et loi française : ce qui est autorisé, le rôle de l'ANJ, et les risques réels.",
    readTime: 5,
    topic: 'legal',
    iconPath: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z',
  },
  {
    slug: 'methodologie',
    title: 'Notre méthodologie',
    desc: "Comment nous évaluons les casinos : 38 critères, tests à l'argent réel, re-tests tous les 90 jours.",
    readTime: 7,
    topic: 'securite',
    iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  },
  {
    slug: 'rtp',
    title: 'Comprendre le RTP',
    desc: 'Taux de redistribution, volatilité, avantage maison — décoder les chiffres qui comptent.',
    readTime: 8,
    topic: 'jeux',
    iconPath: 'M3 3v18h18M7 16l4-8 4 4 4-6',
  },
  {
    slug: 'paiements',
    title: 'Méthodes de paiement',
    desc: 'CB, e-wallets, crypto : délais de retrait réels, frais cachés et sécurité comparés.',
    readTime: 6,
    topic: 'paiements',
    iconPath: 'M2 5h20v14H2zM2 10h20',
  },
  {
    slug: 'bonus-casino',
    title: 'Choisir son bonus',
    desc: 'Bonus de bienvenue, cashback, tours gratuits : lire les conditions avant de réclamer.',
    readTime: 10,
    topic: 'bonus',
    iconPath: 'M4 9h16v11H4zM8 9V5a4 4 0 018 0v4',
  },
]

// Featured guide — bonus-casino (most actionable, highest traffic potential)
const FEATURED = GUIDE_CARDS.find((g) => g.slug === 'bonus-casino')!

// Topic tiles
const THEME_TILES = [
  {
    topic: 'bonus',
    label: 'Bonus',
    iconPath: 'M4 9h16v11H4zM8 9V5a4 4 0 018 0v4',
    count: 3,
    href: '/bonus/',
  },
  {
    topic: 'jeux',
    label: 'Jeux',
    iconPath: 'M3 3v18h18M7 16l4-8 4 4 4-6',
    count: 2,
    href: '/jeux/machines-a-sous/',
  },
  {
    topic: 'paiements',
    label: 'Paiements',
    iconPath: 'M2 5h20v14H2zM2 10h20',
    count: 1,
    href: '/guides/paiements/',
  },
  {
    topic: 'securite',
    label: 'Sécurité',
    iconPath: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z',
    count: 2,
    href: '/guides/methodologie/',
  },
]

export default async function GuidesHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'
  const base = isFr ? '' : 'en/'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Guides' : 'Guides' },
        ]}
      />

      {/* ── Hero + toolbar ───────────────────────────────────────────────── */}
      <section className="pb-2 pt-10" data-page-type="guides_index" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Guides essentiels · 2026' : 'Essential guides · 2026'}
          </div>
          <h1 className="mb-[14px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comprendre avant de <em className="italic text-green">jouer</em>
              </>
            ) : (
              <>
                Understand before you <em className="italic text-green">play</em>
              </>
            )}
          </h1>
          <p className="mb-[32px] max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Nos guides indépendants pour jouer en connaissance de cause — sans jargon, avec des chiffres vérifiés.'
              : 'Our independent guides for informed play — no jargon, with verified numbers.'}
          </p>
        </div>
      </section>

      {/* ── Featured guide ───────────────────────────────────────────────── */}
      <section className="pb-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <a
            href={`/${base}guides/${FEATURED.slug}/`}
            className="group grid grid-cols-1 overflow-hidden rounded-[16px] border border-line no-underline shadow-2 transition-[box-shadow,transform] duration-[180ms] hover:-translate-y-[2px] hover:shadow-3 md:grid-cols-[1.1fr_1fr]"
            data-event="guide_click"
            data-guide={FEATURED.slug}
            data-placement="guides_featured"
            data-page-type="guides_index"
            data-locale={locale}
          >
            {/* Artwork column */}
            <div
              className="relative flex min-h-[180px] items-center justify-center md:min-h-[240px]"
              style={{
                background:
                  'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 12px,var(--surface) 12px,var(--surface) 24px)',
              }}
              aria-hidden
            >
              {/* Featured badge */}
              <span
                className="absolute left-[14px] top-[14px] rounded-[6px] px-[10px] py-[4px] font-mono text-[10.5px] font-bold uppercase tracking-[0.07em] text-white"
                style={{ background: 'var(--gold)' }}
              >
                Guide vedette
              </span>
              {/* Icon */}
              <div className="grid h-[60px] w-[60px] place-items-center rounded-[16px] border border-line bg-surface shadow-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-[30px] w-[30px] text-green"
                  aria-hidden
                >
                  <path d={FEATURED.iconPath} />
                </svg>
              </div>
            </div>

            {/* Body column */}
            <div className="flex flex-col justify-between bg-surface p-[24px_26px_22px]">
              <div>
                <div className="mb-[8px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-green">
                  Bonus
                </div>
                <h2 className="mb-[10px] font-serif text-[clamp(20px,2.5vw,26px)] font-semibold leading-[1.18] text-ink group-hover:text-green">
                  {isFr ? 'Choisir son bonus casino' : 'Choosing your casino bonus'} — le guide
                  complet 2026
                </h2>
                <p className="mb-[16px] text-[14.5px] leading-[1.58] text-ink-2">
                  {isFr
                    ? 'Wager, mise max, jeux exclus, délai : les 5 clauses à vérifier avant de réclamer une offre. Notre simulateur calcule le coût statistique réel.'
                    : 'Wagering, max bet, excluded games, deadline: the 5 clauses to check before claiming an offer. Our simulator calculates the real statistical cost.'}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-[8px]">
                  <span className="inline-flex items-center gap-[6px] rounded-full border border-line bg-bg-sunken px-[10px] py-[4px] font-mono text-[11px] text-ink-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-[12px] w-[12px]"
                      aria-hidden
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l3.5 2" />
                    </svg>
                    {FEATURED.readTime} min
                  </span>
                  <span className="inline-flex items-center gap-[6px] rounded-full border border-line bg-bg-sunken px-[10px] py-[4px] font-mono text-[11px] text-ink-3">
                    Intermédiaire
                  </span>
                </div>
                <span className="font-mono text-[13px] font-bold text-green">Lire →</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── All guides (search + filter + grid) ─────────────────────────── */}
      <section className="pb-12 pt-2">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-[24px] font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Tous les guides' : 'All guides'}
          </h2>
          <GuideSearchClient guides={GUIDE_CARDS} locale={locale} />
        </div>
      </section>

      {/* ── Topic themes grid ────────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-[22px] font-serif text-[clamp(20px,2.5vw,26px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Parcourir par thème' : 'Browse by topic'}
          </h2>
          <div className="grid grid-cols-2 gap-[14px] lg:grid-cols-4">
            {THEME_TILES.map((tile) => (
              <a
                key={tile.topic}
                href={tile.href}
                className="group flex flex-col gap-[10px] rounded-[14px] border border-line bg-surface p-[18px_16px_16px] no-underline shadow-1 transition-[box-shadow,transform,border-color] duration-[160ms] hover:-translate-y-[2px] hover:border-ink-3 hover:shadow-2"
                data-event="guide_theme_click"
                data-topic={tile.topic}
                data-placement="guides_themes"
                data-page-type="guides_index"
                data-locale={locale}
              >
                <div className="grid h-[40px] w-[40px] place-items-center rounded-[10px] border border-[color-mix(in_srgb,var(--green)_20%,var(--line))] bg-[color-mix(in_srgb,var(--green)_9%,var(--surface))]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-[20px] w-[20px] text-green"
                    aria-hidden
                  >
                    <path d={tile.iconPath} />
                  </svg>
                </div>
                <div>
                  <div className="font-serif text-[16px] font-semibold text-ink group-hover:text-green">
                    {tile.label}
                  </div>
                  <div className="font-mono text-[11px] text-ink-3">
                    {tile.count} guide{tile.count > 1 ? 's' : ''}
                  </div>
                </div>
                <span className="mt-auto font-mono text-[11.5px] font-semibold text-green">
                  Voir →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-link banner ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
            {/* Card 1 — dark (Bonus hub) */}
            <a
              href={`/${base}bonus/`}
              className="flex flex-col justify-between rounded-[14px] p-[22px_22px_18px] no-underline"
              style={{ background: 'var(--ink)' }}
              data-event="internal_link"
              data-placement="guides_cross"
              data-page-type="guides_index"
              data-locale={locale}
            >
              <div>
                <div className="text-fade-50 mb-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em]">
                  Comparer
                </div>
                <h3
                  className="mb-[8px] font-serif text-[20px] font-semibold leading-[1.2]"
                  style={{ color: '#fff' }}
                >
                  {isFr ? 'Meilleurs bonus casino' : 'Best casino bonuses'}
                </h3>
                <p className="text-fade-60 mb-[16px] text-[13.5px] leading-[1.55]">
                  {isFr
                    ? 'Wager, montant réel, délai — tous vérifiés.'
                    : 'Wagering, real amount, deadline — all verified.'}
                </p>
              </div>
              <span
                className="inline-flex items-center gap-[6px] font-mono text-[12px] font-semibold"
                style={{ color: 'var(--green)' }}
              >
                Voir les bonus →
              </span>
            </a>

            {/* Card 2 — light (Avis casinos) */}
            <a
              href={`/${base}casinos/`}
              className="flex flex-col justify-between rounded-[14px] border border-line bg-surface p-[22px_22px_18px] no-underline shadow-1 transition-[border-color,shadow] hover:border-ink-3 hover:shadow-2"
              data-event="internal_link"
              data-placement="guides_cross"
              data-page-type="guides_index"
              data-locale={locale}
            >
              <div>
                <div className="mb-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  Top 10
                </div>
                <h3 className="mb-[8px] font-serif text-[20px] font-semibold leading-[1.2] text-ink">
                  {isFr ? 'Meilleurs casinos 2026' : 'Best casinos 2026'}
                </h3>
                <p className="mb-[16px] text-[13.5px] leading-[1.55] text-ink-2">
                  {isFr
                    ? "15 casinos testés à l'argent réel, re-notés tous les 90 jours."
                    : '15 casinos tested with real money, re-rated every 90 days.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-[6px] font-mono text-[12px] font-semibold text-green">
                Voir le comparatif →
              </span>
            </a>

            {/* Card 3 — light (Comparatifs) */}
            <a
              href={`/${base}comparatifs/`}
              className="flex flex-col justify-between rounded-[14px] border border-line bg-surface p-[22px_22px_18px] no-underline shadow-1 transition-[border-color,shadow] hover:border-ink-3 hover:shadow-2"
              data-event="internal_link"
              data-placement="guides_cross"
              data-page-type="guides_index"
              data-locale={locale}
            >
              <div>
                <div className="mb-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  Comparatifs
                </div>
                <h3 className="mb-[8px] font-serif text-[20px] font-semibold leading-[1.2] text-ink">
                  {isFr ? 'Casino A vs Casino B' : 'Casino A vs Casino B'}
                </h3>
                <p className="mb-[16px] text-[13.5px] leading-[1.55] text-ink-2">
                  {isFr
                    ? 'Comparez deux casinos côte à côte : bonus, RTP, paiements, support.'
                    : 'Compare two casinos side by side: bonus, RTP, payments, support.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-[6px] font-mono text-[12px] font-semibold text-green">
                Voir les comparatifs →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
