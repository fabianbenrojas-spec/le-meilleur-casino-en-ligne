import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Shield, TrendingUp } from 'lucide-react'

// Homepage: re-validate every hour (operators data + rankings can change)
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { FeaturedCard, PodiumCard } from '@/components/ui/operator-card'
import { NewsletterCTA } from '@/components/ui/newsletter-cta'
import { StickyMobileCTA } from '@/components/ui/sticky-mobile-cta'
import { HomepageQuiz } from '@/components/homepage/homepage-quiz'
import { OperatorRotator } from '@/components/homepage/operator-rotator'
import { Top10Table } from '@/components/homepage/top10-table'
import type { Locale } from '@/i18n/routing'
import { TOP_10, TOP_3 } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? 'Top 10 Best Online Casinos 2026' : 'Top 10 Casinos en Ligne France 2026',
    itemListElement: TOP_10.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `${BASE_URL}${isEn ? '/en' : ''}/casinos/${op.slug}/`,
    })),
  }

  return {
    title: isEn
      ? 'Best Online Casino 2026 — Independent Comparison'
      : 'Meilleurs casinos en ligne 2026 — Comparatif indépendant',
    description: isEn
      ? '47 online casinos tested with real money. Expert ratings, verified bonuses, updated rankings. 18+ Gamble responsibly.'
      : 'Comparatif indépendant des meilleurs casinos en ligne en 2026. 47 opérateurs testés, notes /10, bonus vérifiés. 18+ Jeu responsable.',
    alternates: {
      languages: buildHreflang('/'),
    },
    other: {
      // JSON-LD schema — injected via script tag in the page body
      'schema:itemList': JSON.stringify(itemListSchema),
    },
  }
}

// ── Categories ──────────────────────────────────────────────────────────────

const categories = [
  {
    slug: 'machines-a-sous',
    label: 'Machines à sous',
    labelEn: 'Slot machines',
    count: '2 840 jeux',
    countEn: '2,840 games',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[34px] w-[34px] text-green"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 4v16M16 4v16" />
      </svg>
    ),
  },
  {
    slug: 'roulette',
    label: 'Roulette',
    labelEn: 'Roulette',
    count: '120 tables',
    countEn: '120 tables',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[34px] w-[34px] text-green"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    slug: 'blackjack',
    label: 'Blackjack',
    labelEn: 'Blackjack',
    count: '85 variantes',
    countEn: '85 variants',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[34px] w-[34px] text-green"
        aria-hidden
      >
        <rect x="5" y="3" width="11" height="15" rx="2" />
        <path d="M8 21h11a2 2 0 0 0 2-2V8" />
      </svg>
    ),
  },
  {
    slug: 'live',
    label: 'Casino live',
    labelEn: 'Live casino',
    count: '340 tables',
    countEn: '340 tables',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[34px] w-[34px] text-green"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    slug: 'crash',
    label: 'Crash games',
    labelEn: 'Crash games',
    count: '62 jeux',
    countEn: '62 games',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="h-[34px] w-[34px] text-green"
        aria-hidden
      >
        <path d="M3 19l7-7 4 4 7-9" />
        <path d="M21 7v5h-5" />
      </svg>
    ),
  },
]

// ── Guides ──────────────────────────────────────────────────────────────────

const guides = [
  {
    slug: 'legalite',
    title: 'Légalité en France',
    titleEn: 'Legality in France',
    desc: "Casino en ligne et loi française : ce qui est autorisé, l'ANJ, et les risques réels.",
    descEn: 'Online casinos and French law: what is permitted, the ANJ, and the real risks.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[21px] w-[21px]"
        aria-hidden
      >
        <path d="M3 7l9-4 9 4M5 7v10l7 4 7-4V7" />
      </svg>
    ),
  },
  {
    slug: 'jeu-responsable',
    title: 'Jeu responsable',
    titleEn: 'Responsible gambling',
    desc: "Reconnaître les signaux, fixer des limites, et où trouver de l'aide gratuitement.",
    descEn: 'Recognising the signs, setting limits, and where to get free help.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[21px] w-[21px]"
        aria-hidden
      >
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      </svg>
    ),
  },
  {
    slug: 'rtp',
    title: 'Comprendre le RTP',
    titleEn: 'Understanding RTP',
    desc: 'Taux de redistribution, volatilité, avantage maison : décoder les chiffres qui comptent.',
    descEn: 'Return-to-player, volatility, house edge: decoding the numbers that matter.',
    icon: <TrendingUp size={21} aria-hidden />,
  },
  {
    slug: 'paiements',
    title: 'Méthodes de paiement',
    titleEn: 'Payment methods',
    desc: 'CB, e-wallets, crypto : délais de retrait, frais cachés et sécurité comparés.',
    descEn: 'Cards, e-wallets, crypto: withdrawal times, hidden fees and security compared.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[21px] w-[21px]"
        aria-hidden
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
]

// ── Methodology items ────────────────────────────────────────────────────────

const methodItems = [
  {
    title: 'Tests avec argent réel',
    titleEn: 'Real-money testing',
    desc: 'Dépôt, mises, et demande de retrait effectifs sur chaque casino noté.',
    descEn: 'Actual deposits, bets, and withdrawal requests on every rated casino.',
    icon: <Check size={18} aria-hidden />,
  },
  {
    title: 'Vitesse de retrait chronométrée',
    titleEn: 'Timed withdrawal speed',
    desc: 'On mesure le délai réel entre la demande et la réception des fonds.',
    descEn: 'We measure the real delay between request and receipt of funds.',
    icon: <Clock size={18} aria-hidden />,
  },
  {
    title: 'Vérification des licences',
    titleEn: 'Licence verification',
    desc: 'Contrôle de la validité de la licence et des conditions de bonus, ligne par ligne.',
    descEn: 'Checking licence validity and bonus terms, line by line.',
    icon: <Shield size={18} aria-hidden />,
  },
  {
    title: "Support mis à l'épreuve",
    titleEn: 'Support stress-tested',
    desc: 'Questions pièges au support pour évaluer réactivité et compétence en français.',
    descEn: 'Trap questions to support to assess responsiveness and competence.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[18px] w-[18px]"
        aria-hidden
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

// ── FAQ ──────────────────────────────────────────────────────────────────────

const faqItems_FR = [
  {
    question: 'Les casinos en ligne sont-ils légaux en France ?',
    answer:
      "Les casinos en ligne ne sont pas régulés par l'ANJ en France, contrairement aux paris sportifs et au poker. Les opérateurs que nous référençons disposent de licences européennes ou internationales valides. Nous détaillons le cadre légal et les risques dans notre guide dédié.",
  },
  {
    question: 'Comment notez-vous les casinos ?',
    answer:
      "Chaque casino est évalué sur 38 critères répartis en 6 familles : bonus, ludothèque, paiements, sécurité, support et expérience mobile. Nous testons avec de l'argent réel et re-testons tous les 90 jours.",
  },
  {
    question: 'Êtes-vous payés par les casinos ?',
    answer:
      "Oui, nous percevons une commission lorsqu'un joueur s'inscrit via nos liens. Cela n'influence jamais nos notes : un casino mal noté reste mal noté, qu'il soit partenaire ou non. C'est la condition de notre indépendance éditoriale.",
  },
  {
    question: 'Que faire en cas de problème de jeu ?',
    answer:
      "Si le jeu n'est plus un plaisir, contactez Joueurs Info Service au 09 74 75 13 13 (appel non surtaxé, 8h–2h, 7j/7). Vous pouvez aussi demander votre auto-exclusion auprès de chaque opérateur.",
  },
]

const faqItems_EN = [
  {
    question: 'Are online casinos legal in France?',
    answer:
      'Online casinos are not regulated by the ANJ in France, unlike sports betting and poker. The operators we list hold valid European or international licences. We detail the legal framework and risks in our dedicated guide.',
  },
  {
    question: 'How do you rate casinos?',
    answer:
      'Each casino is assessed on 38 criteria across 6 categories: bonuses, game library, payments, security, support, and mobile experience. We test with real money and re-test every 90 days.',
  },
  {
    question: 'Are you paid by the casinos?',
    answer:
      "Yes, we earn a commission when a player signs up via our links. This never influences our ratings: a poorly-rated casino stays poorly rated, partner or not. That's the condition of our editorial independence.",
  },
  {
    question: 'What to do if gambling becomes a problem?',
    answer:
      'If gambling is no longer fun, contact GamCare on 0808 8020 133 (free, 24/7). You can also request self-exclusion directly from each operator.',
  },
]

// ── Blog articles ────────────────────────────────────────────────────────────

const blogPosts = [
  {
    slug: 'anj-2026',
    category: 'Législation',
    categoryEn: 'Regulation',
    date: '4 juin 2026',
    dateEn: '4 June 2026',
    title: "Casino en ligne en France : ce qui change avec l'ANJ en 2026",
    titleEn: '2026 ANJ Update: what changes for online players',
    excerpt: 'Le point complet sur le cadre légal et ce que ça implique pour les joueurs.',
    excerptEn: 'The full breakdown of the legal framework and what it means for players.',
  },
  {
    slug: 'wager-pieges',
    category: 'Bonus',
    categoryEn: 'Bonus',
    date: '1 juin 2026',
    dateEn: '1 June 2026',
    title: 'Conditions de wager : les 5 pièges qui annulent votre bonus',
    titleEn: 'Wagering conditions: the 5 traps that void your bonus',
    excerpt: 'Comment lire les petites lignes avant de réclamer une offre de bienvenue.',
    excerptEn: 'How to read the fine print before claiming a welcome offer.',
  },
  {
    slug: 'retraits-crypto',
    category: 'Paiements',
    categoryEn: 'Payments',
    date: '28 mai 2026',
    dateEn: '28 May 2026',
    title: 'Retraits crypto : vraiment plus rapides ? Notre test chronométré',
    titleEn: 'Crypto withdrawals: really faster? Our timed test',
    excerpt: 'On a comparé 12 casinos sur leurs délais de retrait réels en Bitcoin.',
    excerptEn: 'We compared 12 casinos on their real Bitcoin withdrawal times.',
  },
]

// ── ItemList JSON-LD ─────────────────────────────────────────────────────────

function ItemListSchema({ locale }: { locale: Locale }) {
  const isEn = locale === 'en'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? 'Top 10 Best Online Casinos 2026' : 'Top 10 Casinos en Ligne France 2026',
    itemListElement: TOP_10.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `${BASE_URL}${isEn ? '/en' : ''}/casinos/${op.slug}/`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isEn = locale === 'en'
  const isFr = !isEn
  const faqItems = isFr ? faqItems_FR : faqItems_EN
  const methodStats = isFr
    ? [
        { v: '47', l: 'opérateurs testés' },
        { v: '38', l: 'critères par casino' },
        { v: '90j', l: 're-test systématique' },
      ]
    : [
        { v: '47', l: 'operators tested' },
        { v: '38', l: 'criteria per casino' },
        { v: '90d', l: 'systematic re-test' },
      ]
  const topOp = TOP_3[0]!
  const secondOp = TOP_3[1]!
  const thirdOp = TOP_3[2]!

  return (
    <>
      <ItemListSchema locale={locale} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="pb-3 pt-14" data-page-type="homepage" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-[9px] font-mono text-xs uppercase tracking-[0.14em] text-green before:h-px before:w-[26px] before:bg-gold before:content-['']">
            {isFr ? 'Comparatif indépendant · 2026' : 'Independent comparison · 2026'}
          </div>

          {/* H1 — SEO-stable. Key phrase always present server-side. */}
          <h1 className="mb-5 max-w-[19ch] font-serif text-[clamp(34px,5.4vw,60px)] font-medium leading-[1.05] tracking-[-0.022em] text-ink">
            {isFr ? (
              <>
                On a testé <OperatorRotator /> et 46 autres pour élire le{' '}
                <em className="italic not-italic text-green">meilleur casino en ligne</em>.
              </>
            ) : (
              <>
                We tested <OperatorRotator /> and 46 others to find the{' '}
                <em className="italic not-italic text-green">best online casino</em>.
              </>
            )}
          </h1>

          <p className="mb-0 max-w-[56ch] text-[19px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Nous analysons chaque opérateur sur 38 critères — bonus réels, vitesse de retrait, sécurité, qualité du support — pour ne vous recommander que ceux qui tiennent leurs promesses.'
              : 'We assess every operator on 38 criteria — real bonuses, withdrawal speed, security, support quality — to recommend only those that keep their promises.'}
          </p>

          {/* Trust row */}
          <div className="mt-[26px] flex flex-wrap items-center gap-[22px]">
            <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
              <Shield size={16} className="shrink-0 text-green" aria-hidden />
              {isFr ? '47 opérateurs analysés' : '47 operators tested'}
            </span>
            <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
              <Clock size={16} className="shrink-0 text-green" aria-hidden />
              {isFr ? 'Mis à jour le 6 juin 2026' : 'Updated 6 June 2026'}
            </span>
            <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
              <span className="rounded-[5px] bg-red px-[7px] py-[2px] font-mono text-[11px] font-semibold text-white">
                18+
              </span>
              {isFr ? 'Jeu responsable' : 'Gamble responsibly'}
            </span>
          </div>

          {/* Podium */}
          <div className="mt-[44px] flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-3">
              {isFr ? 'Notre podium — juin 2026' : 'Our top 3 — June 2026'}
            </span>
            <CTAButton href="#top10" variant="tertiary" data-event="toc_click" data-section="top10">
              <u>{isFr ? 'Voir le top 10 complet' : 'See full top 10'}</u>
            </CTAButton>
          </div>

          {/* data-sticky-sentinel — StickyMobileCTA appears after this scrolls past */}
          <div
            data-sticky-sentinel
            className="mt-4 grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-[1.18fr_1fr_1fr]"
          >
            <PodiumCard
              operator={{ ...topOp, affiliateUrl: topOp.affiliateUrl }}
              rank={1}
              locale={locale}
              ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
            />
            <PodiumCard
              operator={{ ...secondOp }}
              rank={2}
              locale={locale}
              ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
            />
            <PodiumCard
              operator={{ ...thirdOp }}
              rank={3}
              locale={locale}
              ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
            />
          </div>
        </div>
      </section>

      {/* Affiliate disclosure — visible without scrolling, under hero */}
      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── EDITOR'S PICK ────────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[22px]">
            <div className="mb-[10px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {locale === 'fr' ? 'Coup de cœur' : "Editor's pick"}
            </div>
            <h2 className="m-0 font-serif text-[clamp(22px,3vw,32px)] font-medium leading-[1.1] tracking-[-0.016em] text-ink">
              {locale === 'fr' ? 'Notre meilleur casino du moment' : 'Our top casino right now'}
            </h2>
          </div>
          <FeaturedCard
            operator={topOp}
            locale={locale}
            ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
          />
        </div>
      </section>

      {/* ── TOP 10 TABLE ─────────────────────────────────────────── */}
      <section className="py-16" id="top10">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {isFr ? 'Classement' : 'Ranking'}
              </div>
              <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
                {isFr ? 'Top 10 des casinos en ligne en France' : 'Top 10 Best Online Casinos 2026'}
              </h2>
              <p className="mt-[14px] max-w-[64ch] text-[16.5px] text-ink-2">
                {isFr
                  ? 'Triable par note, bonus ou RTP moyen. Chaque opérateur est re-testé tous les 90 jours.'
                  : 'Sortable by rating, bonus, or average RTP. Every operator is re-tested every 90 days.'}
              </p>
            </div>
            <CTAButton
              href="/casinos/"
              variant="secondary"
              data-event="review_click"
              data-placement="top10_header"
            >
              {isFr ? 'Voir tous les casinos' : 'See all casinos'}
            </CTAButton>
          </div>

          <Top10Table operators={TOP_10} locale={locale} />

          <p className="mt-[14px] text-center text-[12.5px] text-ink-3">
            {isFr ? (
              <>
                Classement établi selon notre{' '}
                <Link href="/guides/methodologie/" className="text-green hover:underline">
                  méthodologie de notation
                </Link>
                . Nous percevons une commission sur les inscriptions — sans incidence sur les notes.
              </>
            ) : (
              <>
                Ranking based on our{' '}
                <Link href="/guides/methodologie/" className="text-green hover:underline">
                  rating methodology
                </Link>
                . We earn a commission on sign-ups — with no impact on ratings.
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── GAME CATEGORIES ──────────────────────────────────────── */}
      <section className="bg-bg-sunken py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[30px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'Par type de jeu' : 'By game type'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
              {isFr ? 'Explorez par catégorie' : 'Browse by category'}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/jeux/${cat.slug}/`}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[180ms] hover:-translate-y-[3px] hover:border-line-2 hover:shadow-3"
                data-event="category_click"
                data-category={cat.slug}
              >
                <div className="relative flex aspect-[4/3] items-center justify-center border-b border-line bg-surface-2">
                  {cat.icon}
                  <span className="absolute bottom-[7px] left-[7px] rounded-[3px] border border-line bg-surface px-[5px] py-[2px] font-mono text-[9px] text-ink-3">
                    illus · {cat.slug}
                  </span>
                </div>
                <div className="px-[15px] py-[13px]">
                  <div className="text-[15px] font-bold">
                    {isFr ? cat.label : (cat.labelEn ?? cat.label)}
                  </div>
                  <div className="mt-[2px] text-xs text-ink-3">
                    {isFr ? cat.count : (cat.countEn ?? cat.count)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ FINDER ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[30px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'En 30 secondes' : 'In 30 seconds'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
              {isFr ? 'Trouvez le casino fait pour vous' : 'Find the casino made for you'}
            </h2>
            <p className="mt-[14px] max-w-[64ch] text-[16.5px] text-ink-2">
              {isFr
                ? 'Trois questions, une recommandation personnalisée — sans inscription.'
                : 'Three questions, one personalised recommendation — no sign-up required.'}
            </p>
          </div>
          <HomepageQuiz topOperator={topOp} locale={locale} />
        </div>
      </section>

      {/* ── GUIDES ───────────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[30px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'Guides essentiels' : 'Essential guides'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
              {isFr ? 'Comprendre avant de jouer' : 'Understand before you play'}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {guides.map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="flex flex-col gap-2.5 rounded-lg border border-line bg-surface p-[22px] text-ink no-underline shadow-1 transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:shadow-3"
                data-event="guide_click"
                data-guide={guide.slug}
              >
                <span className="grid h-[42px] w-[42px] place-items-center rounded-[11px] bg-green-50 text-green">
                  {guide.icon}
                </span>
                <h3 className="m-0 font-serif text-[19px] font-semibold text-ink">
                  {isFr ? guide.title : (guide.titleEn ?? guide.title)}
                </h3>
                <p className="m-0 flex-1 text-[13.5px] leading-[1.5] text-ink-2">
                  {isFr ? guide.desc : (guide.descEn ?? guide.desc)}
                </p>
                <span className="text-[13px] font-bold text-green">
                  {isFr ? 'Lire le guide →' : 'Read guide →'}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY / EEAT ───────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {isFr ? 'Pourquoi nous faire confiance' : 'Why trust us'}
              </div>
              <h2 className="mb-4 font-serif text-[clamp(27px,3.6vw,38px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
                {isFr ? 'Une méthodologie, pas des opinions.' : 'A methodology, not opinions.'}
              </h2>
              <p className="mb-6 max-w-[52ch] text-[16px] text-ink-2">
                {isFr
                  ? "Chaque opérateur est testé avec de l'argent réel par notre équipe : on dépose, on joue, on demande un retrait, on contacte le support. Aucune note n'est influencée par nos partenariats commerciaux."
                  : 'Every operator is tested with real money by our team: we deposit, play, request a withdrawal, and contact support. No rating is influenced by our commercial partnerships.'}
              </p>
              {/* Stats */}
              <div className="mb-7 flex flex-wrap gap-9">
                {methodStats.map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-[42px] font-semibold leading-none tracking-[-0.02em] text-green">
                      {s.v}
                    </div>
                    <div className="mt-[6px] text-[13px] text-ink-2">{s.l}</div>
                  </div>
                ))}
              </div>
              <AuthorBio
                name="Julien Marchand"
                role={
                  isFr
                    ? "Rédacteur en chef · 11 ans dans l'iGaming"
                    : 'Editor-in-chief · 11 years in iGaming'
                }
                credentials={
                  isFr
                    ? 'Ex-analyste conformité · testé 200+ casinos'
                    : 'Former compliance analyst · tested 200+ casinos'
                }
                lastUpdated="2026-06-06"
                nextRetest="2026-09-01"
                locale={locale}
              />
            </div>

            {/* Right */}
            <div>
              <ul className="m-0 flex flex-col gap-4 p-0" style={{ listStyle: 'none' }}>
                {methodItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-[14px]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-green-50 text-green">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-[15px] font-bold text-ink">
                        {isFr ? item.title : (item.titleEn ?? item.title)}
                      </div>
                      <div className="mt-[2px] text-[13.5px] text-ink-2">
                        {isFr ? item.desc : (item.descEn ?? item.desc)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <CTAButton
                href="/guides/methodologie/"
                variant="secondary"
                className="mt-6"
                data-event="methodology_click"
              >
                {isFr ? 'Lire notre méthodologie complète' : 'Read our full methodology'}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {isFr ? 'Le journal' : 'Blog'}
              </div>
              <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
                {isFr ? 'Derniers articles & analyses' : 'Latest articles & analysis'}
              </h2>
            </div>
            <CTAButton
              href="/blog/"
              variant="secondary"
              data-event="blog_click"
              data-placement="section_header"
            >
              {isFr ? 'Tous les articles' : 'All articles'}
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="overflow-hidden rounded-lg border border-line bg-surface text-ink no-underline shadow-1 transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:shadow-3"
                data-event="blog_click"
                data-article={post.slug}
              >
                {/* Thumbnail placeholder 16:9 */}
                <div className="relative aspect-[16/9] border-b border-line bg-surface-2">
                  <span className="absolute bottom-2 left-2 rounded-[3px] border border-line bg-surface px-[6px] py-[2px] font-mono text-[9px] text-ink-3">
                    illus · 16:9
                  </span>
                </div>
                <div className="px-5 py-[18px] pb-[22px]">
                  <div className="mb-[9px] font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">
                    {isFr ? post.category : (post.categoryEn ?? post.category)} ·{' '}
                    {isFr ? post.date : (post.dateEn ?? post.date)}
                  </div>
                  <h3 className="mb-2 font-serif text-[20px] font-semibold leading-[1.25] text-ink">
                    {isFr ? post.title : (post.titleEn ?? post.title)}
                  </h3>
                  <p className="m-0 text-[13.5px] leading-[1.5] text-ink-2">
                    {isFr ? post.excerpt : (post.excerptEn ?? post.excerpt)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[880px] px-8 sm:px-[18px]">
          <div className="mb-[30px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'Questions fréquentes' : 'FAQ'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
              {isFr ? 'Vous vous demandez…' : 'You may be wondering…'}
            </h2>
          </div>
          <FAQAccordion items={faqItems} includeSchema />
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <NewsletterCTA
            placement="homepage_footer"
            locale={locale}
            headline={
              isFr ? 'Les meilleurs bonus, une fois par semaine.' : 'The best bonuses, once a week.'
            }
            subline={
              isFr
                ? 'Offres vérifiées, nouveaux tests et alertes arnaques. Pas de spam, désinscription en un clic.'
                : 'Verified offers, new reviews, and scam alerts. No spam, unsubscribe in one click.'
            }
          />
        </div>
      </section>

      {/* Sticky mobile CTA — shows the #1 operator after hero scrolls past */}
      <StickyMobileCTA
        operatorName={topOp.name}
        operatorSlug={topOp.slug}
        rating={topOp.rating}
        bonusLabel={`${topOp.bonusAmount}${topOp.bonusSuffix ? ` ${topOp.bonusSuffix}` : ''} · ${topOp.bonusConditions}`}
        affiliateUrl={topOp.affiliateUrl}
        locale={locale}
        pageType="homepage"
        bonusSlug={topOp.bonusSlug}
      />
    </>
  )
}
