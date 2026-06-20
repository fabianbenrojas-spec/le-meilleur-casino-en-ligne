import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { WithContext, Review } from 'schema-dts'

// Review pages: re-validate every 24h (bonus conditions may change)
export const revalidate = 86400

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CasinoLogo } from '@/components/ui/casino-logo'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { ScorePill } from '@/components/ui/score-pill'
import { StarRating } from '@/components/ui/star-rating'
import { ReviewSubNav } from '@/components/review/review-subnav'
import { ReviewStickyBar } from '@/components/review/review-sticky-bar'
import {
  operators,
  operatorBySlug,
  jurisdictionLicenceLabel,
  type GameType,
} from '@/config/operators'
import { getReviewData, type ReviewSection } from '@/config/review-content'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return operators.map((op) => ({ slug: op.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const op = operatorBySlug.get(slug)
  if (!op) return {}

  const rd = getReviewData(slug)

  return {
    title: op.hasBonus
      ? `Avis ${op.name} 2026 : test complet, bonus & retraits`
      : `Avis ${op.name} 2026 : test complet & retraits`,
    description: op.hasBonus
      ? `Notre avis complet sur ${op.name} : ${op.rating}/10. Bonus ${op.bonusAmount}${op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}, RTP ${op.rtp.toFixed(1)}%. Testé à l'argent réel. 18+`
      : `Notre avis complet sur ${op.name} : ${op.rating}/10. RTP ${op.rtp.toFixed(1)}%. Testé à l'argent réel. 18+`,
    alternates: {
      languages: buildHreflang(
        `/casinos/${slug}/`,
        locale === 'en' ? `/casinos/${slug}/` : undefined
      ),
    },
    other: {
      'review:schema': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: `Avis ${op.name}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: op.rating,
          bestRating: 10,
          worstRating: 0,
        },
        author: { '@type': 'Person', name: 'Julien Marchand' },
        reviewBody: rd.verdict,
        itemReviewed: {
          '@type': 'Casino',
          name: op.name,
          url: op.affiliateUrl,
        },
      } satisfies WithContext<Review>),
    },
  }
}

// ── TOC items ─────────────────────────────────────────────────────────────────

const TOC_BASE = [
  { id: 'verdict', label: 'Verdict' },
  { id: 'bonus', label: 'Bonus' },
  { id: 'jeux', label: 'Jeux' },
  { id: 'live', label: 'Live' },
  { id: 'paiements', label: 'Paiements' },
  { id: 'support', label: 'Support' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'vip', label: 'VIP' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'recap', label: 'Récap' },
  { id: 'methode', label: 'Méthode' },
]

const TOC_END = [
  { id: 'faq', label: 'FAQ' },
  { id: 'alternatives', label: 'Alternatives' },
]

// ── Méthode de test ───────────────────────────────────────────────────────────

const METHODE_STEPS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: 'Inscription & KYC',
    desc: 'Ouvrons un compte réel et soumettons les 3 pièces KYC standard (CNI recto-verso, justificatif de domicile < 3 mois, RIB) — mesurons le délai entre le premier envoi et la notification de validation.',
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    title: 'Dépôt & activation bonus',
    desc: "Déposons le minimum requis via carte bancaire puis e-wallet ; vérifions que le bonus s'active automatiquement en moins de 5 minutes et que le wager en conditions réelles correspond aux conditions affichées.",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    title: 'Ludothèque & RTP',
    desc: "Échantillonnons 50 jeux populaires et vérifions la version RTP servie par l'opérateur (certains fournisseurs comme Pragmatic Play proposent plusieurs versions du même jeu : 96 %, 94 %, 90 %) — signalons tout écart avec la version standard la plus généreuse.",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    title: 'Live casino & tables',
    desc: "Testons 4 catégories de tables en heure de pointe (roulette, blackjack, baccarat, game show) — mesurons le délai d'attente pour obtenir une place assise et la stabilité du flux vidéo sur connexion 20 Mbps pendant 30 minutes.",
    icon: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  {
    title: 'Retrait chronométré',
    desc: 'Trois retraits minutés en conditions réelles (CB, e-wallet, virement SEPA) à différents moments de la semaine — du clic « retirer » au crédit visible en compte bancaire.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'Support client',
    desc: "Soumettons 5 questions identiques (technique, bonus, KYC, paiement, jeu responsable) via chat en direct, e-mail et téléphone le cas échéant — mesurons le délai de première réponse et l'exactitude par canal.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: 'Mobile & ergonomie',
    desc: "Jouons 1 heure sur iOS Safari et Chrome Android, application native si disponible — évaluons 5 critères : zones tactiles conformes aux standards d'accessibilité, LCP < 2,5 s, lisibilité des cotes, navigation à une main, comportement au changement d'orientation.",
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </>
    ),
  },
  {
    title: 'Sécurité & licence',
    desc: "Consultons le registre officiel de l'émetteur (CGCB pour Curaçao, MGA pour Malte) pour confirmer la validité de la licence affichée — vérifions les en-têtes de sécurité HTTPS (HSTS, CSP) et la présence d'un audit RNG certifié par eCOGRA, GLI, iTech Labs ou BMM.",
    icon: (
      <>
        <path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 12 2a8 8 0 0 0-8 8.2c0 7.3 8 11.8 8 11.8z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
]

const SECTION_NUMBERS: Record<string, string> = {
  bonus: '01',
  jeux: '02',
  live: '03',
  paiements: '04',
  support: '05',
  mobile: '06',
  vip: '07',
  securite: '08',
}

function getSectionTitle(key: string, gameTypes: GameType[]): string {
  if (key === 'jeux') {
    if (gameTypes.includes('casino')) return 'Ludothèque & machines à sous'
    if (gameTypes.includes('poker')) return 'Poker en ligne'
    if (gameTypes.includes('sport')) return 'Paris sportifs'
    return 'Jeux disponibles'
  }
  if (key === 'live') {
    if (gameTypes.includes('casino')) return 'Jeux en live'
    return 'Suivi en direct'
  }
  const STATIC_TITLES: Record<string, string> = {
    bonus: 'Bonus de bienvenue',
    paiements: 'Paiements & retraits',
    support: 'Support client',
    mobile: 'Application & expérience mobile',
    vip: 'Programme VIP',
    securite: 'Sécurité & licence',
  }
  return STATIC_TITLES[key] ?? key
}

// ── Maillage band data ────────────────────────────────────────────────────────

const GAME_TYPES = [
  {
    label: 'Machines à sous',
    count: '2 000+',
    href: '/jeux/machines-a-sous/',
    icon: 'M3 4h18v16H3zM8 4v16M16 4v16',
    circle: false,
  },
  {
    label: 'Casino live',
    count: '150+',
    href: '/jeux/live/',
    icon: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    circle: true,
  },
  {
    label: 'Roulette',
    count: '40+',
    href: '/jeux/roulette/',
    icon: 'M12 2a10 10 0 1 0 0 20M12 8v4l3 3',
    circle: false,
  },
  {
    label: 'Blackjack',
    count: '30+',
    href: '/jeux/blackjack/',
    icon: 'M4 7h16v10H4zM4 11h16',
    circle: false,
  },
  {
    label: 'Poker',
    count: '20+',
    href: '/jeux/poker/',
    icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10C7.5 20.5 4 18 4 12V6z',
    circle: false,
  },
  {
    label: 'Jackpot progressif',
    count: '80+',
    href: '/jeux/jackpot-progressif/',
    icon: 'M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8l-6.1 2.6 1.4-6.8L2.2 9l6.9-.7z',
    circle: false,
  },
]

const POPULAR_GAMES: { name: string; slug: string; provider: string; rtp: string }[] = [
  { name: 'Book of Dead', slug: 'book-of-dead', provider: "Play'n GO", rtp: '96.21' },
  { name: 'Starburst', slug: 'starburst', provider: 'NetEnt', rtp: '96.09' },
  { name: 'Mega Moolah', slug: 'mega-moolah', provider: 'Microgaming', rtp: '88.12' },
  { name: "Gonzo's Quest", slug: 'gonzos-quest', provider: 'NetEnt', rtp: '95.97' },
  { name: 'Immortal Romance', slug: 'immortal-romance', provider: 'Microgaming', rtp: '96.86' },
  { name: 'Lightning Roulette', slug: 'lightning-roulette', provider: 'Evolution', rtp: '97.30' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

// Mini score ring for the hero fork card (64px — ScoreRing component is fixed 118px)
function MiniScoreRing({ score, label }: { score: number; label: string }) {
  const pct = Math.min(100, Math.max(0, score * 10))
  return (
    <div
      className="grid h-16 w-16 shrink-0 place-items-center rounded-full"
      style={{ background: `conic-gradient(var(--green) ${pct}%,var(--line) 0)` }}
      role="img"
      aria-label={`Note : ${score}/10 — ${label}`}
    >
      <div className="grid h-[50px] w-[50px] place-items-center rounded-full bg-surface text-center [box-shadow:inset_0_0_0_1px_var(--line)]">
        <p className="font-serif text-[19px] font-semibold leading-none text-ink">
          {score.toFixed(1)}
          <small className="font-sans text-[10px] text-ink-3">/10</small>
        </p>
      </div>
    </div>
  )
}

function ReviewSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="review-section pb-2 pt-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]"
    >
      <h2 className="mb-[14px] mt-[26px] font-serif text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
        <span className="mr-[10px] font-mono text-[14px] font-medium text-green">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function MiniCTA({
  label,
  buttonText,
  op,
  placement,
  locale,
}: {
  label: string
  buttonText: string
  op: NonNullable<ReturnType<typeof operatorBySlug.get>>
  placement: string
  locale: Locale
}) {
  return (
    <div className="my-[18px] mb-2 flex items-center justify-between gap-[18px] rounded border border-line bg-surface-2 px-[18px] py-[14px]">
      <div className="text-[14px] text-ink-2">
        <span
          dangerouslySetInnerHTML={{
            __html: label.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
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
        data-placement={`review_section_${placement}`}
        data-bonus={op.bonusSlug}
        data-page-type="review"
        data-locale={locale}
      >
        {buttonText}
      </CTAButton>
    </div>
  )
}

function ProfileCard({
  title,
  items,
  type,
}: {
  title: string
  items: string[]
  type: 'yes' | 'no'
}) {
  const isNo = type === 'no'
  return (
    <div
      className={`rounded-[14px] border bg-surface p-[18px] shadow-1${isNo ? 'border-[color-mix(in_srgb,var(--red)_25%,var(--line))]' : 'border-line'}`}
    >
      <div
        className={`mb-3 grid h-10 w-10 place-items-center rounded-full${isNo ? 'bg-[color-mix(in_srgb,var(--red)_10%,transparent)] text-[var(--red)]' : 'bg-green-50 text-green'}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="h-5 w-5"
          aria-hidden
        >
          {isNo ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M20 6 9 17l-5-5" />}
        </svg>
      </div>
      <h3 className="mb-[10px] font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-[9px] text-[14px] leading-[1.55] text-ink-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`mt-[3px] h-[14px] w-[14px] shrink-0${isNo ? 'text-[var(--red)]' : 'text-green'}`}
              aria-hidden
            >
              {isNo ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M20 6 9 17l-5-5" />}
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BandHeader({ title, seeAllHref }: { title: string; seeAllHref?: string }) {
  return (
    <div className="mb-[14px] flex items-baseline justify-between gap-4">
      <h2 className="font-serif text-[24px] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {seeAllHref && (
        <a
          href={seeAllHref}
          className="shrink-0 text-[13px] font-semibold text-green no-underline hover:underline"
          data-event="internal_link"
        >
          Voir tout →
        </a>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const op = operatorBySlug.get(slug)
  if (!op) notFound()

  const rd = getReviewData(slug)

  // 3 alternatives (exclude self)
  const altOps = Array.from(operatorBySlug.values())
    .filter((o) => o.slug !== slug)
    .slice(0, 3)

  // Same-jurisdiction operators for versus links
  const sameJurisdictionOps = Array.from(operatorBySlug.values())
    .filter((o) => o.slug !== slug && o.jurisdiction === op.jurisdiction)
    .slice(0, 2)

  const rank = operators.findIndex((o) => o.slug === slug) + 1
  const tocFiltered = TOC_BASE.filter((item) => {
    if (!op.hasBonus && (item.id === 'bonus' || item.id === 'vip')) return false
    if (!op.gameTypes.includes('casino') && item.id === 'live') return false
    return true
  })
  const tocItems = [
    ...tocFiltered,
    ...(rd.pourQui ? [{ id: 'pour-qui', label: 'Pour qui ?' }] : []),
    ...TOC_END,
  ]

  // Review JSON-LD
  const reviewSchema: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `Avis ${op.name}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(op.rating),
      bestRating: '10',
      worstRating: '0',
    },
    author: { '@type': 'Person', name: 'Julien Marchand' },
    reviewBody: rd.verdict,
    datePublished: '2026-06-07',
    itemReviewed: { '@type': 'LocalBusiness', name: op.name },
  }

  const wagerStat = op.hasBonus
    ? (op.bonusConditions.split('·')[0]?.trim() ?? op.bonusConditions)
    : null
  const paymentStat = op.paymentMethods.slice(0, 2).join(' / ')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Casinos en ligne', href: '/casinos/' },
          { label: op.name },
        ]}
      />

      {/* ── Editorial hero (Prop 2) ──────────────────────────────────────── */}
      <section
        className="pb-6 pt-[30px]"
        data-page-type="review"
        data-operator={op.slug}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div data-sticky-sentinel>
            <div className="grid grid-cols-1 items-center gap-9 xl:grid-cols-[1fr_360px]">
              {/* Left: identity */}
              <div>
                <p className="mb-[15px] inline-flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-[0.13em] text-green">
                  <span
                    className="inline-block h-[1px] w-[22px] shrink-0"
                    style={{ background: 'var(--gold)' }}
                    aria-hidden
                  />
                  Avis complet · {rd.foundedYear}
                </p>

                <h1 className="mb-0 font-serif text-[clamp(30px,4vw,46px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
                  {op.name}
                </h1>

                <div className="my-[14px] flex items-center gap-4">
                  <div>
                    <span className="font-serif text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink">
                      {op.rating.toFixed(1)}
                      <small className="font-sans text-[16px] text-ink-3">/10</small>
                    </span>
                    <span className="mt-[3px] block font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-green">
                      {op.ratingLabel}
                    </span>
                  </div>
                  <StarRating rating={rd.stars} reviewCount={rd.reviewCount} showNumeric={false} />
                </div>

                <p className="mb-4 max-w-[48ch] font-serif text-[20px] leading-[1.55] text-ink-2">
                  {rd.verdict}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    jurisdictionLicenceLabel(op.jurisdiction),
                    `Fondé en ${rd.foundedYear}`,
                    rd.currencies.join(' · '),
                    rd.languages.join(' · '),
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-[6px] rounded-[6px] border border-line bg-bg-sunken px-[10px] py-1 text-xs text-ink-2"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: fork card */}
              <div className="rounded-xl border border-line bg-surface p-6 shadow-3">
                <div className="mb-4 flex items-center gap-[13px]">
                  <MiniScoreRing score={op.rating} label={op.ratingLabel} />
                  <div className="min-w-0">
                    <div className="font-serif text-[19px] font-semibold text-ink">{op.name}</div>
                    {op.hasBonus && (
                      <div className="mt-[2px] text-[12.5px] text-ink-2">
                        <b className="font-semibold text-green">{op.bonusAmount}</b>
                        {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''} · {op.bonusConditions}
                      </div>
                    )}
                  </div>
                </div>

                <p className="mb-[11px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                  Votre choix
                </p>

                <CTAButton
                  href={op.affiliateUrl}
                  variant="primary"
                  block
                  arrow
                  className="mb-[9px]"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement="review_hero"
                  data-bonus={op.bonusSlug}
                  data-page-type="review"
                  data-locale={locale}
                >
                  {op.hasBonus ? 'Obtenir le bonus' : 'Voir le site'}
                </CTAButton>

                <p className="my-[7px] text-center text-[11px] text-ink-3">ou</p>

                <CTAButton
                  href="/casinos/"
                  variant="secondary"
                  block
                  size="sm"
                  data-event="internal_link"
                  data-target="casinos-listing"
                  data-page-type="review"
                  data-locale={locale}
                >
                  Comparer les alternatives
                </CTAButton>

                {/* Ministats */}
                <div className="mt-[14px] flex gap-[6px] border-t border-line pt-[14px]">
                  {[
                    { v: `${op.rtp.toFixed(1)}%`, l: 'RTP moy.' },
                    ...(wagerStat ? [{ v: wagerStat, l: 'Wager' }] : []),
                    { v: paymentStat || 'CB / Virement', l: 'Paiements' },
                  ].map(({ v, l }) => (
                    <div key={l} className="flex-1 text-center">
                      <div className="text-[13.5px] font-bold text-ink">{v}</div>
                      <div className="mt-[2px] font-mono text-[10px] text-ink-3">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AffiliateDisclosure variant="strip" />
      </section>

      {/* ── Horizontal sticky sub-nav (scroll-spy) ──────────────────────── */}
      <ReviewSubNav items={tocItems} />

      {/* ── Content — single column, max-w 880px ────────────────────────── */}
      <div className="mx-auto max-w-[880px] px-[18px] pb-16 md:px-8">
        {/* Verdict */}
        <section
          id="verdict"
          className="pb-2 pt-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]"
        >
          <div className="mb-7 rounded-lg border border-l-4 border-line border-l-green bg-surface p-[24px_26px] shadow-1">
            <p className="mb-[10px] font-mono text-[11px] uppercase tracking-[0.1em] text-green">
              Verdict express
            </p>
            <p className="m-0 font-serif text-[17.5px] leading-[1.6] text-ink">{rd.verdict}</p>
          </div>
          <ProsConsBox pros={op.pros} cons={op.cons} />
        </section>

        {/* Dynamic sections + maillage bands */}
        {(Object.entries(rd.sections) as [string, ReviewSection | undefined][])
          .filter((entry): entry is [string, ReviewSection] => entry[1] !== undefined)
          .map(([key, sec]) => {
            if (!op.hasBonus && (key === 'bonus' || key === 'vip')) return null
            return (
              <div key={key}>
                <ReviewSection
                  id={key}
                  number={SECTION_NUMBERS[key] ?? ''}
                  title={getSectionTitle(key, op.gameTypes)}
                >
                  {sec.prose.map((p, i) => (
                    <p
                      key={i}
                      className="mb-[14px] max-w-[68ch] text-[16px] leading-[1.68] text-ink-2"
                    >
                      {p}
                    </p>
                  ))}
                  {sec.highlights && (
                    <ul className="mb-4 flex list-none flex-col gap-[9px] p-0">
                      {sec.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-[11px] text-[15px] leading-[1.6] text-ink-2"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="mt-0.5 h-[17px] w-[17px] shrink-0 text-green"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.minicta && (
                    <MiniCTA
                      label={sec.minicta.label}
                      buttonText={sec.minicta.buttonText}
                      op={op}
                      placement={key}
                      locale={locale}
                    />
                  )}
                </ReviewSection>

                {/* Maillage: all 3 bands after securite */}
                {key === 'securite' && (
                  <>
                    {/* Band 1 — Types de jeux */}
                    {op.gameTypes.includes('casino') && (
                      <div className="my-[30px]">
                        <BandHeader title="Types de jeux disponibles" seeAllHref="/jeux/" />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {GAME_TYPES.map((gt) => (
                            <a
                              key={gt.label}
                              href={gt.href}
                              className="flex items-center gap-[13px] rounded border border-line bg-surface px-4 py-[14px] text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
                              data-event="internal_link"
                              data-target={gt.href}
                              data-placement="review_band_game_types"
                              data-page-type="review"
                              data-locale={locale}
                            >
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-green-50 text-green">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  aria-hidden
                                >
                                  {gt.circle && <circle cx="12" cy="12" r="10" />}
                                  <path d={gt.icon} />
                                </svg>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[14.5px] font-bold">{gt.label}</div>
                                <div className="font-mono text-[12px] text-ink-3">{gt.count}</div>
                              </div>
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4 shrink-0 text-ink-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                aria-hidden
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Band 2 — Jeux populaires */}
                    {op.gameTypes.includes('casino') && (
                      <div className="my-[30px]">
                        <BandHeader title={`Jeux populaires sur ${op.name}`} seeAllHref="/jeux/" />
                        <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3">
                          {POPULAR_GAMES.map((game) => (
                            <div
                              key={game.name}
                              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow] duration-[150ms] hover:-translate-y-[3px] hover:shadow-3"
                            >
                              <div
                                className="relative grid aspect-[16/10] place-items-center border-b border-line"
                                style={{
                                  background:
                                    'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 8px,var(--surface-2) 8px,var(--surface-2) 16px)',
                                }}
                              >
                                <span className="font-mono text-[10px] text-ink-3">
                                  {game.name}
                                </span>
                                <span className="absolute right-2 top-2 rounded-[5px] border border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-green-50 px-[6px] py-[2px] font-mono text-[10px] font-semibold text-green-ink">
                                  {game.rtp}%
                                </span>
                              </div>
                              <div className="flex flex-1 flex-col gap-1 p-[13px_15px_15px]">
                                <div className="text-[15px] font-bold text-ink">{game.name}</div>
                                <div className="font-mono text-[11.5px] text-ink-3">
                                  {game.provider}
                                </div>
                                <div className="mt-[11px] flex gap-2">
                                  <CTAButton
                                    href={`/jeux/${game.slug}/`}
                                    variant="secondary"
                                    size="sm"
                                    className="flex-1"
                                    data-event="internal_link"
                                    data-placement="review_band_jeux_pop"
                                    data-page-type="review"
                                    data-locale={locale}
                                  >
                                    Fiche
                                  </CTAButton>
                                  <CTAButton
                                    href={op.affiliateUrl}
                                    variant="primary"
                                    size="sm"
                                    className="flex-1"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    data-event="affiliate_click"
                                    data-operator={op.slug}
                                    data-placement={`review_jeux_pop_${game.slug}`}
                                    data-bonus={op.bonusSlug}
                                    data-page-type="review"
                                    data-locale={locale}
                                  >
                                    Jouer
                                  </CTAButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Band 3 — Comparatifs (4 links) */}
                    {sameJurisdictionOps.length >= 2 && (
                      <div className="my-[30px]">
                        <BandHeader title={`${op.name} dans nos comparatifs`} />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {/* Link 1 — position dans le top 15 */}
                          <a
                            href="/casinos/"
                            className="flex items-center gap-[13px] rounded border border-line bg-surface px-[17px] py-[15px] text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
                            data-event="internal_link"
                            data-placement="review_band_comparatifs_top15"
                            data-page-type="review"
                            data-locale={locale}
                          >
                            <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[9px] bg-green-50 text-green">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-[19px] w-[19px]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden
                              >
                                <path d="M18 20V10M12 20V4M6 20v-6" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[14.5px] font-bold">
                                Top 15 des casinos en ligne
                              </div>
                              <div className="mt-[1px] text-[12.5px] text-ink-3">
                                {op.name} classé N°{rank} dans notre sélection
                              </div>
                            </div>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 shrink-0 text-ink-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              aria-hidden
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </a>
                          {/* Links 2 & 3 — versus */}
                          {sameJurisdictionOps.map((alt) => {
                            const [slugA, slugB] = [op.slug, alt.slug].sort()
                            return (
                              <a
                                key={alt.slug}
                                href={`/comparatifs/${slugA}-vs-${slugB}/`}
                                className="flex items-center gap-[13px] rounded border border-line bg-surface px-[17px] py-[15px] text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
                                data-event="internal_link"
                                data-placement="review_band_comparatifs_versus"
                                data-page-type="review"
                                data-locale={locale}
                              >
                                <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[9px] bg-bg-sunken text-green">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="h-[19px] w-[19px]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    aria-hidden
                                  >
                                    <path d="M18 20V10M12 20V4M6 20v-6" />
                                  </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-[14.5px] font-bold">
                                    {op.name} vs {alt.name}
                                  </div>
                                  <div className="mt-[1px] text-[12.5px] text-ink-3">
                                    Notre analyse comparative
                                  </div>
                                </div>
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4 shrink-0 text-ink-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  aria-hidden
                                >
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </a>
                            )
                          })}
                          {/* Link 4 — page alternatives */}
                          <a
                            href="/casinos/alternatives/"
                            className="flex items-center gap-[13px] rounded border border-line bg-surface px-[17px] py-[15px] text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
                            data-event="internal_link"
                            data-placement="review_band_comparatifs_alternatives"
                            data-page-type="review"
                            data-locale={locale}
                          >
                            <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[9px] bg-bg-sunken text-green">
                              <svg
                                viewBox="0 0 24 24"
                                className="h-[19px] w-[19px]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden
                              >
                                <path d="M4 6h16M4 12h10M4 18h7" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[14.5px] font-bold">
                                Alternatives à {op.name}
                              </div>
                              <div className="mt-[1px] text-[12.5px] text-ink-3">
                                Tous les casinos similaires
                              </div>
                            </div>
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 shrink-0 text-ink-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              aria-hidden
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}

        {/* Recap table */}
        <section id="recap" className="py-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]">
          <h2 className="mb-4 font-serif text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
            Récapitulatif
          </h2>
          <div className="overflow-hidden rounded-lg border border-line shadow-1">
            <table className="w-full border-collapse bg-surface">
              <tbody>
                {rd.recapRows.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0">
                    <td className="w-[40%] bg-surface-2 px-[18px] py-[13px] text-[14.5px] font-semibold text-ink">
                      {row.label}
                    </td>
                    <td className="px-[18px] py-[13px] text-[14.5px] text-ink-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Méthode de test */}
        <section id="methode" className="py-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]">
          <h2 className="mb-2 font-serif text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
            Notre méthode de test
          </h2>
          <p className="mb-[22px] text-[15px] leading-[1.65] text-ink-2">
            Chaque casino de notre comparatif est testé à l&apos;argent réel selon 8 critères
            mesurables.
          </p>
          <div className="grid grid-cols-2 gap-[14px] xl:grid-cols-4">
            {METHODE_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-[14px] border border-line bg-surface p-[18px] shadow-1"
              >
                <div className="mb-[12px] grid h-10 w-10 place-items-center rounded-[10px] bg-green-50 text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    {step.icon}
                  </svg>
                </div>
                <p className="mb-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-green">
                  Étape {i + 1}
                </p>
                <h3 className="mb-[7px] font-sans text-[15px] font-bold leading-[1.2] text-ink">
                  {step.title}
                </h3>
                <p className="m-0 text-[13px] leading-[1.6] text-ink-3">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pour quel profil de joueur ? */}
        {rd.pourQui && (
          <section
            id="pour-qui"
            className="py-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]"
          >
            <h2 className="mb-4 font-serif text-[27px] font-medium tracking-[-0.015em] text-ink">
              Pour quel profil de joueur ?
            </h2>
            <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-3">
              <ProfileCard type="yes" title="Idéal si vous…" items={rd.pourQui.idealSi} />
              <ProfileCard type="yes" title="Bon choix si vous…" items={rd.pourQui.bonChoixSi} />
              <ProfileCard type="no" title="À éviter si vous…" items={rd.pourQui.aEviterSi} />
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="py-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]">
          <h2 className="mb-4 font-serif text-[27px] font-medium tracking-[-0.015em] text-ink">
            Questions fréquentes
          </h2>
          <FAQAccordion items={rd.faq} includeSchema />
        </section>

        {/* Author bio */}
        <AuthorBio
          name="Julien Marchand"
          role="Rédacteur en chef · 11 ans dans l'iGaming"
          credentials="Ex-analyste conformité · testé 200+ casinos"
          lastUpdated="2026-06-07"
          nextRetest="2026-09-01"
          className="my-6"
        />

        {/* Similar casinos + fork block */}
        <section
          id="alternatives"
          className="py-[14px] [scroll-margin-top:calc(var(--header-h)+56px)]"
        >
          <BandHeader title={`Casinos similaires à ${op.name}`} seeAllHref="/casinos/" />
          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
            {altOps.map((alt) => (
              <div
                key={alt.id}
                className="flex flex-col gap-[11px] rounded-lg border border-line bg-surface p-[18px] shadow-1 transition-[transform,box-shadow] duration-[150ms] hover:-translate-y-[3px] hover:shadow-3"
              >
                <div className="flex items-center gap-[10px]">
                  <CasinoLogo
                    slug={alt.slug}
                    logoUrl={alt.logoUrl}
                    name={alt.shortName ?? alt.name}
                    width={74}
                    height={28}
                  />
                  <ScorePill score={alt.rating} className="ml-auto text-[13px]" />
                </div>
                <div className="font-serif text-[17px] font-semibold text-ink">{alt.name}</div>
                <p className="m-0 flex-1 text-[12.5px] leading-[1.5] text-ink-2">{alt.tagline}</p>
                <div className="text-[12.5px] text-ink-2">
                  Bonus : <b className="font-semibold text-green">{alt.bonusAmount}</b>
                  {alt.bonusSuffix ? ` ${alt.bonusSuffix}` : ''}
                </div>
                <div className="flex gap-2">
                  <CTAButton
                    href={`/casinos/${alt.slug}/`}
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    data-event="review_click"
                    data-operator={alt.slug}
                    data-page-type="review"
                    data-locale={locale}
                  >
                    Avis
                  </CTAButton>
                  <CTAButton
                    href={alt.affiliateUrl}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    arrow
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={alt.slug}
                    data-placement="review_alternatives"
                    data-bonus={alt.bonusSlug}
                    data-page-type="review"
                    data-locale={locale}
                  >
                    Bonus
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fork block: bonus or alternative */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Dark panel: go */}
          <div className="flex flex-col gap-2 rounded-lg bg-ink p-[26px]">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white opacity-80">
              Prêt à jouer
            </p>
            <h3 className="mt-[2px] font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-white">
              Rejoindre {op.name}
            </h3>
            {op.hasBonus ? (
              <>
                <p className="mb-[14px] text-[14px] leading-[1.55] text-white opacity-[0.82]">
                  Accédez au bonus · {op.bonusConditions}
                </p>
                <div className="mb-3 font-serif text-[22px] font-semibold text-white">
                  <span style={{ color: 'var(--green-ink,var(--green))' }}>{op.bonusAmount}</span>
                  {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                </div>
              </>
            ) : (
              <p className="mb-[14px] text-[14px] leading-[1.55] text-white opacity-[0.82]">
                Inscrivez-vous et commencez à jouer sur {op.name}.
              </p>
            )}
            <CTAButton
              href={op.affiliateUrl}
              variant="primary"
              block
              arrow
              className="mt-auto"
              target="_blank"
              rel="noopener noreferrer nofollow"
              data-event="affiliate_click"
              data-operator={op.slug}
              data-placement="review_final_cta"
              data-bonus={op.bonusSlug}
              data-page-type="review"
              data-locale={locale}
            >
              {op.hasBonus ? 'Obtenir le bonus' : 'Voir le site'}
            </CTAButton>
            <p className="mt-2 text-[11px] text-white opacity-60">18+ · Jeu responsable</p>
          </div>

          {/* Light panel: alternatives */}
          <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-[26px] shadow-1">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
              Pas convaincu ?
            </p>
            <h3 className="mt-[2px] font-serif text-[24px] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
              Comparer les alternatives
            </h3>
            <p className="mb-[14px] text-[14px] leading-[1.55] text-ink-2">
              D&apos;autres casinos peuvent mieux correspondre à votre profil.
            </p>
            <div className="mb-[14px] flex flex-col gap-[7px]">
              {altOps.map((alt) => (
                <a
                  key={alt.slug}
                  href={`/casinos/${alt.slug}/`}
                  className="flex items-center gap-[9px] rounded border border-line px-[11px] py-2 text-[13.5px] font-semibold text-ink no-underline transition-[border-color,background] duration-[150ms] hover:border-green hover:bg-green-50"
                  data-event="review_click"
                  data-operator={alt.slug}
                  data-page-type="review"
                  data-locale={locale}
                >
                  <CasinoLogo
                    slug={alt.slug}
                    logoUrl={alt.logoUrl}
                    name={alt.shortName ?? alt.name}
                    width={30}
                    height={20}
                  />
                  {alt.name}
                  <ScorePill score={alt.rating} className="ml-auto text-[12px]" />
                </a>
              ))}
            </div>
            <CTAButton
              href="/casinos/"
              variant="secondary"
              block
              className="mt-auto"
              data-event="internal_link"
              data-target="casinos-listing"
              data-page-type="review"
              data-locale={locale}
            >
              Voir tous les casinos →
            </CTAButton>
          </div>
        </div>
      </div>

      {/* ── Sticky bonus bar ────────────────────────────────────────────── */}
      <ReviewStickyBar
        operatorName={op.name}
        operatorSlug={op.slug}
        rating={op.rating}
        bonusAmount={op.bonusAmount}
        bonusSuffix={op.bonusSuffix}
        bonusConditions={op.bonusConditions}
        bonusSlug={op.bonusSlug}
        affiliateUrl={op.affiliateUrl}
        locale={locale}
        hasBonus={op.hasBonus}
        isAffiliated={op.isAffiliated}
      />
    </>
  )
}
