import type { Metadata } from 'next'
import { Check, Clock, Shield, TrendingUp } from 'lucide-react'

// Homepage: re-validate every hour (operators data + rankings can change)
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { NewsletterCTA } from '@/components/ui/newsletter-cta'
import { PodiumCard } from '@/components/ui/operator-card'
import { ScorePill } from '@/components/ui/score-pill'
import { StickyMobileCTA } from '@/components/ui/sticky-mobile-cta'
import { CasinoMatchmaker } from '@/components/homepage/casino-matchmaker'
import { OperatorRotator } from '@/components/homepage/operator-rotator'
import { Top10Table } from '@/components/homepage/top10-table'
import type { Locale } from '@/i18n/routing'
import { categories as gameCategories, type GameCategory } from '@/config/games'
import { TOP_10, TOP_3 } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'
import { cn } from '@/lib/utils'

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = (locale as string) === 'en'

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
    count: '2 840 jeux',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[16px] w-[16px] text-green"
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
    count: '120 tables',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[16px] w-[16px] text-green"
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
    count: '85 variantes',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[16px] w-[16px] text-green"
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
    count: '340 tables',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-[16px] w-[16px] text-green"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
]

// ── Category grid icons (cat-grid, B-S4) — keyed by config/games.ts slug ────

const CAT_GRID_ICONS: Record<GameCategory, React.ReactNode> = {
  'machines-a-sous': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M16 4v16" />
    </svg>
  ),
  roulette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  blackjack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="5" y="3" width="11" height="15" rx="2" />
      <path d="M8 21h11a2 2 0 0 0 2-2V8" />
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
      aria-hidden
    >
      <path d="M3 19l7-7 4 4 7-9" />
      <path d="M21 7v5h-5" />
    </svg>
  ),
  'video-poker': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  ),
  'jackpot-progressif': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  'craps-sic-bo': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="8" width="10" height="10" rx="2" />
      <rect x="12" y="4" width="10" height="10" rx="2" />
      <circle cx="7" cy="13" r="1" fill="currentColor" />
      <circle cx="17" cy="9" r="1" fill="currentColor" />
      <circle cx="14.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="19.5" cy="11.5" r="1" fill="currentColor" />
    </svg>
  ),
  keno: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8.5h18M3 13h18M3 17.5h18M8 3v18M12 3v18M16 3v18" />
    </svg>
  ),
  loterie: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h10M7 13h6" />
      <path d="M17 13l1.5 2.5" strokeWidth="1.5" />
    </svg>
  ),
  'jeux-a-gratter': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20L20 4" strokeWidth="1.5" strokeDasharray="2 2" />
      <rect x="2" y="6" width="16" height="12" rx="2" />
      <path d="M6 12h8M6 15h5" />
    </svg>
  ),
  'provably-fair': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <path d="M12 15v2" />
    </svg>
  ),
}

// 5 catégories affichées en home, dans l'ordre éditorial de la maquette
// (video-poker existe dans config/games.ts mais n'a pas de tuile dédiée)
const CAT_GRID_SLUGS: GameCategory[] = ['machines-a-sous', 'roulette', 'blackjack', 'live', 'crash']

// ── Guides ──────────────────────────────────────────────────────────────────

const guides = [
  {
    slug: 'legalite',
    title: 'Légalité en France',
    desc: "Casino en ligne et loi française : ce qui est autorisé, l'ANJ, et les risques réels.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[16px] w-[16px]"
        aria-hidden
      >
        <path d="M3 7l9-4 9 4M5 7v10l7 4 7-4V7" />
      </svg>
    ),
  },
  {
    slug: 'jeu-responsable',
    title: 'Jeu responsable',
    desc: "Reconnaître les signaux, fixer des limites, et où trouver de l'aide gratuitement.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[16px] w-[16px]"
        aria-hidden
      >
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      </svg>
    ),
  },
  {
    slug: 'rtp',
    title: 'Comprendre le RTP',
    desc: 'Taux de redistribution, volatilité, avantage maison : décoder les chiffres qui comptent.',
    icon: <TrendingUp size={16} aria-hidden />,
  },
  {
    slug: 'paiements',
    title: 'Méthodes de paiement',
    desc: 'CB, e-wallets, crypto : délais de retrait, frais cachés et sécurité comparés.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[16px] w-[16px]"
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
    desc: 'Dépôt, mises, et demande de retrait effectifs sur chaque casino noté.',
    icon: <Check size={18} aria-hidden />,
  },
  {
    title: 'Vitesse de retrait chronométrée',
    desc: 'On mesure le délai réel entre la demande et la réception des fonds.',
    icon: <Clock size={18} aria-hidden />,
  },
  {
    title: 'Vérification des licences',
    desc: 'Contrôle de la validité de la licence et des conditions de bonus, ligne par ligne.',
    icon: <Shield size={18} aria-hidden />,
  },
  {
    title: "Support mis à l'épreuve",
    desc: 'Questions pièges au support pour évaluer réactivité et compétence en français.',
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

const faqItems = [
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

// ── Guides permanents (teaser homepage) ─────────────────────────────────────
// Sous-ensemble de `guides` (app/[locale]/guides/[slug]/page.tsx) choisi pour
// matcher les 3 catégories de la maquette (Bonus / Jeux / Paiements).

const homeGuides = [
  {
    slug: 'bonus-casino',
    category: 'Bonus',
    readTime: 10,
    title: 'Choisir son bonus',
    excerpt:
      'Bonus de bienvenue, cashback, tours gratuits : lire les conditions avant de réclamer.',
  },
  {
    slug: 'rtp',
    category: 'Jeux',
    readTime: 8,
    title: 'Comprendre le RTP',
    excerpt:
      'Taux de redistribution, volatilité, avantage maison — décoder les chiffres qui comptent.',
  },
  {
    slug: 'paiements',
    category: 'Paiements',
    readTime: 6,
    title: 'Méthodes de paiement',
    excerpt: 'CB, e-wallets, crypto : délais de retrait réels, frais cachés et sécurité comparés.',
  },
]

// ── SEO criteria ─────────────────────────────────────────────────────────────

const seoCriteria = [
  {
    term: 'Licence et sécurité',
    desc: "Tous nos opérateurs disposent d'une licence valide (MGA, Curaçao) et d'un chiffrement SSL. Nous vérifions chaque licence avant publication.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10C7.5 20.5 4 18 4 12V6z" />
      </svg>
    ),
  },
  {
    term: 'Bonus honnêtes',
    desc: 'Wager ≤ 40×, conditions lisibles, retrait du bonus possible dès le premier euro. Nous écartons les offres aux conditions inaccessibles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7M2 7h20v5H2zM12 7V3M8 7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2" />
      </svg>
    ),
  },
  {
    term: 'Retraits rapides',
    desc: 'Paiement en moins de 48 h par CB, virement SEPA ou crypto. Nous chronométrons les délais réels, pas les délais annoncés.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    term: 'Support FR réactif',
    desc: "Chat en direct ou email, réponse en moins de 2 h en français. Nous posons de vraies questions pour tester la compétence et l'honnêteté du support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

// ── ItemList JSON-LD ─────────────────────────────────────────────────────────

function ItemListSchema({ locale }: { locale: Locale }) {
  const isEn = (locale as string) === 'en'
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function MeshLogoPlaceholder({ className }: { className?: string } = {}) {
  return (
    <div
      className={cn(
        'h-5 w-[30px] shrink-0 rounded-[4px] border border-dashed border-line-2',
        className
      )}
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 4px,transparent 4px,transparent 8px)',
      }}
      aria-hidden
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const topOp = TOP_3[0]!
  const secondOp = TOP_3[1]!
  const thirdOp = TOP_3[2]!

  return (
    <>
      <ItemListSchema locale={locale} />

      {/* ══════════════════════════════════════════════════════════════
          HERO — 2 colonnes : texte à gauche · simulateur à droite
          Collapse en 1 colonne ≤ 1080px (xl breakpoint)
          ══════════════════════════════════════════════════════════════ */}
      <section className="pb-4 pt-12" data-page-type="homepage" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 items-center gap-7 xl:grid-cols-[1fr_460px] xl:gap-11">
            {/* ── Left column ── */}
            <div>
              <div className="mb-[18px] inline-flex items-center gap-[9px] font-mono text-xs uppercase tracking-[0.14em] text-green before:h-px before:w-[26px] before:bg-gold before:content-['']">
                Comparatif indépendant · 2026
              </div>

              {/* H1 — "meilleur casino en ligne" toujours présent côté serveur */}
              <h1 className="mb-4 max-w-[19ch] font-serif text-[clamp(30px,4.4vw,48px)] font-medium leading-[1.05] tracking-[-0.022em] text-ink xl:text-[clamp(30px,4.4vw,48px)]">
                On a testé <OperatorRotator /> et 46 autres pour élire le{' '}
                <em className="italic text-green">meilleur casino en ligne</em>.
              </h1>

              <p className="mb-0 max-w-[46ch] text-[17px] leading-[1.58] text-ink-2">
                Nous analysons chaque opérateur sur 38 critères — bonus réels, vitesse de retrait,
                sécurité, qualité du support — pour ne vous recommander que ceux qui tiennent leurs
                promesses.
              </p>

              {/* Trust row */}
              <div className="mt-5 flex flex-wrap items-center gap-x-[18px] gap-y-[10px]">
                <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
                  <Shield size={16} className="shrink-0 text-green" aria-hidden />
                  47 opérateurs analysés
                </span>
                <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
                  <Clock size={16} className="shrink-0 text-green" aria-hidden />
                  Mis à jour le 6 juin 2026
                </span>
                <span className="inline-flex items-center gap-[9px] text-[13.5px] font-medium text-ink-2">
                  <span className="rounded-[5px] bg-red px-[7px] py-[2px] font-mono text-[11px] font-semibold text-white">
                    18+
                  </span>
                  Jeu responsable
                </span>
              </div>
            </div>

            {/* ── Right column : simulateur ── */}
            <div>
              <CasinoMatchmaker pageType="homepage" locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate disclosure — visible sans scroll, sous le hero */}
      <AffiliateDisclosure variant="strip" />

      {/* ══════════════════════════════════════════════════════════════
          PODIUM TOP-3 + TOP 10 TABLE
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-14" id="top10" data-page-type="homepage" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          {/* Podium header */}
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-3">
              Notre podium — juin 2026
            </span>
            <CTAButton href="#top10" variant="tertiary" data-event="toc_click" data-section="top10">
              <u>Voir le top 10 complet</u>
            </CTAButton>
          </div>

          {/* data-sticky-sentinel — StickyMobileCTA appears when this scrolls past */}
          <div
            data-sticky-sentinel
            className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-[1.18fr_1fr_1fr]"
          >
            {/* N°1 spans full width at 2-col (sm–lg), 1 col at 3-col (lg+) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <PodiumCard
                operator={{ ...topOp, affiliateUrl: topOp.affiliateUrl }}
                rank={1}
                ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
              />
            </div>
            <PodiumCard
              operator={{ ...secondOp }}
              rank={2}
              ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
            />
            <PodiumCard
              operator={{ ...thirdOp }}
              rank={3}
              ga4={{ 'data-page-type': 'homepage', 'data-locale': locale }}
            />
          </div>

          {/* Top 10 table */}
          <div className="mt-[52px]">
            <div className="mb-[28px] flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-[12px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                  Classement
                </div>
                <h2 className="m-0 font-serif text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
                  Top 10 des casinos en ligne en France
                </h2>
                <p className="mt-[12px] max-w-[64ch] text-[16px] text-ink-2">
                  Triable par note, bonus ou RTP moyen. Chaque opérateur est re-testé tous les 90
                  jours.
                </p>
              </div>
              <CTAButton
                href="/casinos/"
                variant="secondary"
                data-event="review_click"
                data-placement="top10_header"
              >
                Voir tous les casinos
              </CTAButton>
            </div>

            <Top10Table operators={TOP_10} />

            <p className="mt-[14px] text-center text-[12.5px] text-ink-3">
              Classement établi selon notre{' '}
              <a href="/guides/methodologie/" className="text-green hover:underline">
                méthodologie de notation
              </a>
              . Nous percevons une commission sur les inscriptions — sans incidence sur les notes.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HP-TOPLINKS — accès rapide aux casinos les mieux notés (B-S4)
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[20px] flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="mb-[8px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                Accès rapide
              </div>
              <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,28px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
                Les casinos les mieux notés
              </h2>
            </div>
            <CTAButton
              href="/bonus/"
              variant="secondary"
              data-event="internal_link"
              data-target="bonus"
            >
              Voir tous les bonus
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOP_10.slice(0, 4).map((op) => (
              <a
                key={op.slug}
                href={`/casinos/${op.slug}/`}
                className="flex items-center gap-3 rounded-[10px] border border-line bg-surface px-[15px] py-[13px] no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
                data-event="review_click"
                data-operator={op.slug}
                data-placement="home_toplink"
                data-page-type="homepage"
                data-locale={locale}
              >
                <MeshLogoPlaceholder className="h-[30px] w-[56px]" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-[7px] text-[14px] font-bold text-ink">
                    {op.name}
                    <ScorePill
                      score={op.rating}
                      gold={op.slug === topOp.slug}
                      className="px-[6px] py-[1px] text-[11px]"
                    />
                  </span>
                  <span className="text-[11.5px] text-ink-3">
                    {op.bonusAmount}
                    {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="shrink-0 text-ink-3 transition-colors group-hover:text-green"
                  aria-hidden
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CAT-GRID — explorer par catégorie de jeu (B-S4)
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[20px]">
            <div className="mb-[8px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              Par type de jeu
            </div>
            <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,28px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
              Explorez par catégorie
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CAT_GRID_SLUGS.map((slug) => {
              const cat = gameCategories.find((c) => c.slug === slug)
              if (!cat) return null
              return (
                <a
                  key={cat.slug}
                  href={`/jeux/${cat.slug}/`}
                  className="flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[180ms] hover:-translate-y-[3px] hover:border-line-2 hover:shadow-3"
                  data-event="category_click"
                  data-category={cat.slug}
                  data-placement="home_category_tile"
                  data-page-type="homepage"
                  data-locale={locale}
                >
                  <div
                    className="grid aspect-[4/3] place-items-center border-b border-line text-green [&_svg]:h-[34px] [&_svg]:w-[34px]"
                    style={{
                      background:
                        'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 9px,var(--surface-2,var(--surface)) 9px,var(--surface-2,var(--surface)) 18px)',
                    }}
                  >
                    {CAT_GRID_ICONS[cat.slug]}
                  </div>
                  <div className="px-[15px] py-[14px]">
                    <div className="text-[15px] font-bold text-ink">{cat.label}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HP-MESH — maillage interne (4 colonnes thématiques)
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-bg-sunken py-14">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[26px]">
            <div className="mb-[12px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              Explorer par thème
            </div>
            <h2 className="m-0 font-serif text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
              Tous nos comparatifs, bonus et guides
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-4">
            {/* ── Col 1 : Top casinos ── */}
            <div className="flex flex-col rounded-[16px] border border-line bg-surface p-[18px_16px_14px] shadow-1 transition-[box-shadow,border-color] hover:shadow-3">
              <h3 className="mb-[13px] flex items-center gap-[9px] border-b border-line pb-3 font-sans text-[14px] font-bold text-ink">
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green-50 text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M8 21h8M12 17v4M17 5H7l-2 8h12zM5 5H3M21 5h-2" />
                  </svg>
                </span>
                Top casinos
              </h3>
              <ul className="m-0 flex flex-1 flex-col gap-[3px] p-0" style={{ listStyle: 'none' }}>
                {TOP_10.slice(0, 4).map((op) => (
                  <li key={op.slug}>
                    <a
                      href={`/casinos/${op.slug}/`}
                      className="flex items-center justify-between gap-2 rounded-[9px] px-[10px] py-[9px] text-[14px] font-semibold text-ink-2 no-underline transition-[background,color,transform] hover:translate-x-[2px] hover:bg-green-50 hover:text-green-ink"
                      data-event="review_click"
                      data-operator={op.slug}
                      data-placement="hp_mesh_casinos"
                      data-page-type="homepage"
                      data-locale={locale}
                    >
                      <span className="flex min-w-0 items-center gap-[9px]">
                        <MeshLogoPlaceholder />
                        <span className="truncate">{op.name}</span>
                      </span>
                      <span className="shrink-0 rounded-[5px] bg-gold px-[7px] py-[2px] font-mono text-[11px] font-bold text-white">
                        {op.rating.toFixed(1)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/casinos/"
                className="mt-2 flex justify-center rounded-[9px] bg-ink px-3 py-[11px] text-[13.5px] font-bold text-bg no-underline transition-colors hover:bg-green hover:text-white"
                data-event="review_click"
                data-placement="hp_mesh_casinos_seeall"
                data-page-type="homepage"
                data-locale={locale}
              >
                Voir tous les casinos →
              </a>
            </div>

            {/* ── Col 2 : Meilleurs bonus ── */}
            <div className="flex flex-col rounded-[16px] border border-line bg-surface p-[18px_16px_14px] shadow-1 transition-[box-shadow,border-color] hover:shadow-3">
              <h3 className="mb-[13px] flex items-center gap-[9px] border-b border-line pb-3 font-sans text-[14px] font-bold text-ink">
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green-50 text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7M2 7h20v5H2zM12 7V3M8 7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2" />
                  </svg>
                </span>
                Meilleurs bonus
              </h3>
              <ul className="m-0 flex flex-1 flex-col gap-[3px] p-0" style={{ listStyle: 'none' }}>
                {[
                  { label: 'Tous les bonus casino', href: '/bonus/' },
                  { label: 'Bonus sans dépôt', href: '/bonus/sans-depot/' },
                  { label: 'Tours gratuits', href: '/bonus/tours-gratuits/' },
                  { label: 'Comparatifs en tête-à-tête', href: '/comparatifs/' },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between gap-2 rounded-[9px] px-[10px] py-[9px] text-[14px] font-semibold text-ink-2 no-underline transition-[background,color,transform] hover:translate-x-[2px] hover:bg-green-50 hover:text-green-ink"
                      data-event="internal_link"
                      data-placement="hp_mesh_bonus"
                      data-page-type="homepage"
                      data-locale={locale}
                    >
                      <span>{item.label}</span>
                      <span className="text-ink-3 transition-[color,transform] group-hover:text-green">
                        ›
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/bonus/"
                className="mt-2 flex justify-center rounded-[9px] bg-ink px-3 py-[11px] text-[13.5px] font-bold text-bg no-underline transition-colors hover:bg-green hover:text-white"
                data-event="internal_link"
                data-placement="hp_mesh_bonus_seeall"
                data-page-type="homepage"
                data-locale={locale}
              >
                Voir tous les bonus →
              </a>
            </div>

            {/* ── Col 3 : Types de jeux ── */}
            <div className="flex flex-col rounded-[16px] border border-line bg-surface p-[18px_16px_14px] shadow-1 transition-[box-shadow,border-color] hover:shadow-3">
              <h3 className="mb-[13px] flex items-center gap-[9px] border-b border-line pb-3 font-sans text-[14px] font-bold text-ink">
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green-50 text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                Types de jeux
              </h3>
              <ul className="m-0 flex flex-1 flex-col gap-[3px] p-0" style={{ listStyle: 'none' }}>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <a
                      href={`/jeux/${cat.slug}/`}
                      className="flex items-center justify-between gap-2 rounded-[9px] px-[10px] py-[9px] text-[14px] font-semibold text-ink-2 no-underline transition-[background,color,transform] hover:translate-x-[2px] hover:bg-green-50 hover:text-green-ink"
                      data-event="category_click"
                      data-category={cat.slug}
                      data-placement="hp_mesh_jeux"
                      data-page-type="homepage"
                      data-locale={locale}
                    >
                      <span className="flex items-center gap-[9px]">
                        {cat.icon}
                        <span>{cat.label}</span>
                      </span>
                      <span className="font-mono text-[11px] text-ink-3">{cat.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/jeux/"
                className="mt-2 flex justify-center rounded-[9px] bg-ink px-3 py-[11px] text-[13.5px] font-bold text-bg no-underline transition-colors hover:bg-green hover:text-white"
                data-event="category_click"
                data-placement="hp_mesh_jeux_seeall"
                data-page-type="homepage"
                data-locale={locale}
              >
                Voir tous les jeux →
              </a>
            </div>

            {/* ── Col 4 : Guides ── */}
            <div className="flex flex-col rounded-[16px] border border-line bg-surface p-[18px_16px_14px] shadow-1 transition-[box-shadow,border-color] hover:shadow-3">
              <h3 className="mb-[13px] flex items-center gap-[9px] border-b border-line pb-3 font-sans text-[14px] font-bold text-ink">
                <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green-50 text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M4 19V6a2 2 0 0 1 2-2h13M4 19a2 2 0 0 0 2 2h13M4 19h13M18 2v19" />
                  </svg>
                </span>
                Guides essentiels
              </h3>
              <ul className="m-0 flex flex-1 flex-col gap-[3px] p-0" style={{ listStyle: 'none' }}>
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <a
                      href={`/guides/${guide.slug}/`}
                      className="flex items-center justify-between gap-2 rounded-[9px] px-[10px] py-[9px] text-[14px] font-semibold text-ink-2 no-underline transition-[background,color,transform] hover:translate-x-[2px] hover:bg-green-50 hover:text-green-ink"
                      data-event="guide_click"
                      data-guide={guide.slug}
                      data-placement="hp_mesh_guides"
                      data-page-type="homepage"
                      data-locale={locale}
                    >
                      <span className="flex items-center gap-[9px]">
                        {guide.icon}
                        <span>{guide.title}</span>
                      </span>
                      <span className="text-ink-3">›</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/guides/"
                className="mt-2 flex justify-center rounded-[9px] bg-ink px-3 py-[11px] text-[13.5px] font-bold text-bg no-underline transition-colors hover:bg-green hover:text-white"
                data-event="guide_click"
                data-placement="hp_mesh_guides_seeall"
                data-page-type="homepage"
                data-locale={locale}
              >
                Voir tous les guides →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HP-SEO — contenu long-form autour de « meilleur casino en ligne »
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="max-w-[820px]">
            <h2 className="mb-4 font-serif text-[clamp(26px,3.4vw,36px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
              Qu&apos;est-ce que le meilleur casino en ligne ?
            </h2>
            <p className="mb-4 text-[16.5px] leading-[1.75] text-ink-2">
              Le <strong className="text-ink">meilleur casino en ligne</strong> ne se résume pas au
              bonus d&apos;inscription le plus élevé. Notre comparatif indépendant évalue chaque
              opérateur sur quatre piliers essentiels : la sécurité de la plateforme, la
              transparence des conditions de bonus, la rapidité des retraits et la qualité du
              support francophone.
            </p>
            <p className="mb-6 text-[16.5px] leading-[1.75] text-ink-2">
              Après avoir testé{' '}
              <a
                href="/casinos/"
                className="border-green/30 border-b font-semibold text-green no-underline hover:border-green"
              >
                47 opérateurs
              </a>{' '}
              avec de l&apos;argent réel depuis 2019, voici les critères qui distinguent
              systématiquement les bons casinos des mauvais.
            </p>

            {/* Anchor links */}
            <div
              className="mb-7 flex flex-wrap gap-2 rounded-[16px] border border-line bg-surface p-[16px_18px]"
              role="navigation"
              aria-label="Sommaire"
            >
              {[
                { label: '🔒 Sécurité & licence', href: '#criteres' },
                { label: '🎁 Bonus', href: '#criteres' },
                { label: '⚡ Retraits', href: '#criteres' },
                { label: '💬 Support FR', href: '#criteres' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full bg-bg-sunken px-3 py-[6px] text-[13px] font-semibold text-ink-2 no-underline transition-[background,color] hover:bg-green-50 hover:text-green"
                  data-event="toc_click"
                  data-page-type="homepage"
                  data-locale={locale}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <h3 id="criteres" className="mb-3 mt-[30px] text-[20px] font-bold text-ink">
              4 critères qui font la différence
            </h3>
            <p className="mb-4 text-[16.5px] leading-[1.75] text-ink-2">
              Ces quatre dimensions sont les plus prédictives de l&apos;expérience réelle — elles
              sont pondérées à 70 % dans notre algorithme de notation.
            </p>

            {/* Criteria cards */}
            <ul className="m-0 mb-5 flex flex-col gap-3 p-0" style={{ listStyle: 'none' }}>
              {seoCriteria.map((item) => (
                <li
                  key={item.term}
                  className="flex items-start gap-[13px] rounded-[10px] border border-line bg-surface px-[16px] py-[14px]"
                >
                  <span className="mt-[2px] flex h-[19px] w-[19px] shrink-0 items-center text-green [&>svg]:h-[19px] [&>svg]:w-[19px]">
                    {item.icon}
                  </span>
                  <div className="flex min-w-0 flex-col gap-[3px]">
                    <strong className="text-[15.5px] font-bold text-ink">{item.term}</strong>
                    <span className="text-[14.5px] leading-[1.55] text-ink-2">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-[16.5px] leading-[1.75] text-ink-2">
              Notre{' '}
              <a
                href="/guides/methodologie/"
                className="border-green/30 border-b font-semibold text-green no-underline hover:border-green"
                data-event="methodology_click"
                data-page-type="homepage"
                data-locale={locale}
              >
                méthodologie complète
              </a>{' '}
              détaille les 34 autres critères, les conditions de test et la fréquence de mise à
              jour. Chaque note est recalculée automatiquement lorsqu&apos;un paramètre change.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          METHODOLOGY / EEAT — CONSERVÉ INTÉGRALEMENT
          ══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                Pourquoi nous faire confiance
              </div>
              <h2 className="mb-4 font-serif text-[clamp(27px,3.6vw,38px)] font-medium leading-[1.1] tracking-[-0.018em] text-ink">
                Une méthodologie, pas des opinions.
              </h2>
              <p className="mb-6 max-w-[52ch] text-[16px] text-ink-2">
                Chaque opérateur est testé avec de l&apos;argent réel par notre équipe : on dépose,
                on joue, on demande un retrait, on contacte le support. Aucune note n&apos;est
                influencée par nos partenariats commerciaux.
              </p>
              {/* Stats */}
              <div className="mb-7 flex flex-wrap gap-9">
                {[
                  { v: '47', l: 'opérateurs testés' },
                  { v: '38', l: 'critères par casino' },
                  { v: '90j', l: 're-test systématique' },
                ].map((s) => (
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
                role="Rédacteur en chef · 11 ans dans l'iGaming"
                credentials="Ex-analyste conformité · testé 200+ casinos"
                lastUpdated="2026-06-06"
                nextRetest="2026-09-01"
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
                      <div className="text-[15px] font-bold text-ink">{item.title}</div>
                      <div className="mt-[2px] text-[13.5px] text-ink-2">{item.desc}</div>
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
                Lire notre méthodologie complète
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDES (guides permanents — teaser homepage) ────────────── */}
      <section className="bg-bg-sunken py-16">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                Guides essentiels
              </div>
              <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
                Comprendre avant de jouer
              </h2>
            </div>
            <CTAButton
              href="/guides/"
              variant="secondary"
              data-event="guide_click"
              data-placement="home_guides_seeall"
            >
              Tous les guides
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {homeGuides.map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="overflow-hidden rounded-lg border border-line bg-surface text-ink no-underline shadow-1 transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:shadow-3"
                data-event="guide_click"
                data-target={guide.slug}
                data-placement="home_guides_card"
              >
                {/* Thumbnail placeholder 16:9 */}
                <div className="relative aspect-[16/9] border-b border-line bg-surface-2">
                  <span className="absolute bottom-2 left-2 rounded-[3px] border border-line bg-surface px-[6px] py-[2px] font-mono text-[9px] text-ink-3">
                    illus · 16:9
                  </span>
                </div>
                <div className="px-5 py-[18px] pb-[22px]">
                  <div className="mb-[9px] font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">
                    {guide.category} · {guide.readTime} min
                  </div>
                  <h3 className="mb-2 font-serif text-[20px] font-semibold leading-[1.25] text-ink">
                    {guide.title}
                  </h3>
                  <p className="m-0 text-[13.5px] leading-[1.5] text-ink-2">{guide.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[880px] px-[18px] md:px-8">
          <div className="mb-[30px]">
            <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              Questions fréquentes
            </div>
            <h2 className="m-0 font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-ink">
              Vous vous demandez…
            </h2>
          </div>
          <FAQAccordion items={faqItems} includeSchema />
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <NewsletterCTA
            placement="homepage_footer"
            headline="Les meilleurs bonus, une fois par semaine."
            subline="Offres vérifiées, nouveaux tests et alertes arnaques. Pas de spam, désinscription en un clic."
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
      />
    </>
  )
}
