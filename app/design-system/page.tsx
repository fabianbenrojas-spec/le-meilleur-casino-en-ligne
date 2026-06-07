import type { Metadata } from 'next'

import { ClearConsentButton, FilterSidebarDemo } from './interactive-demos'
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { BonusBadge } from '@/components/ui/bonus-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { CookieConsentBanner } from '@/components/ui/cookie-consent-banner'
import { Disclaimer18Plus } from '@/components/ui/disclaimer-18plus'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { NewsletterCTA } from '@/components/ui/newsletter-cta'
import {
  PodiumCard,
  ListingCard,
  RankCard,
  type OperatorCardData,
} from '@/components/ui/operator-card'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { ResponsibleGamblingBanner } from '@/components/ui/responsible-gambling-banner'
import { ScorePill } from '@/components/ui/score-pill'
import { ScoreRing } from '@/components/ui/score-ring'
import { StarRating } from '@/components/ui/star-rating'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const metadata: Metadata = {
  title: 'Design System — Tokens & Composants',
  robots: { index: false, follow: false },
}

// ── Sample data ──────────────────────────────────────────────────────────────

const mockOp: OperatorCardData = {
  id: 'cresus',
  slug: 'cresus',
  name: 'Crésus Casino',
  licence: 'Curaçao 8048',
  rating: 9.2,
  ratingLabel: 'Excellent',
  bonusAmount: '200 €',
  bonusSuffix: '+ 100 tours',
  bonusConditions: 'Wager 35× · dépôt min. 20 €',
  features: ['Machines à sous', 'Live', 'Crypto'],
  pros: ['Bonus généreux', 'Support 24/7', 'Retrait rapide'],
  cons: ['Interface vieillissante'],
  verdict:
    'Crésus est un casino en ligne français de référence, avec une vaste ludothèque et un service client réactif.',
  affiliateUrl: '#',
}

const faqItems = [
  {
    question: "Qu'est-ce qu'un bonus de bienvenue ?",
    answer:
      "Un bonus de bienvenue est une offre promotionnelle proposée aux nouveaux joueurs lors de leur premier dépôt. Il peut prendre la forme d'un bonus de rechargement, de tours gratuits ou d'un cashback.",
  },
  {
    question: 'Les casinos en ligne sont-ils légaux en France ?',
    answer:
      "Les casinos en ligne sont régulés en France par l'ANJ (Autorité Nationale des Jeux). Seuls les opérateurs titulaires d'une licence ANJ sont autorisés à proposer leurs services aux joueurs français.",
  },
  {
    question: 'Comment choisir un casino fiable ?',
    answer:
      'Un casino fiable doit posséder une licence valide, afficher des taux de redistribution vérifiés (RTP), proposer des méthodes de paiement reconnues et offrir un service client réactif.',
  },
]

const tocItems = [
  { id: 'sec-tokens', label: 'Tokens' },
  { id: 'sec-atoms', label: 'Composants atomiques' },
  { id: 'sec-cards', label: 'Cartes opérateur' },
  { id: 'sec-content', label: 'Contenu éditorial' },
  { id: 'sec-conformite', label: 'Conformité' },
  { id: 'sec-interactive', label: 'Interactifs' },
]

// ── Sub-components for the catalog ───────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Swatch({ token, label, desc }: { token: string; label: string; desc: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line shadow-1">
      <div className="h-14 w-full" style={{ backgroundColor: `var(${token})` }} aria-hidden />
      <div className="bg-surface p-3">
        <p className="font-mono text-xs font-medium text-ink">{label}</p>
        <p className="font-mono text-[10px] text-ink-3">{token}</p>
        <p className="mt-1 text-[11px] text-ink-2">{desc}</p>
      </div>
    </div>
  )
}

function ShadowCard({ level, token, desc }: { level: string; token: string; desc: string }) {
  return (
    <div className="rounded-lg bg-surface p-6" style={{ boxShadow: `var(${token})` }}>
      <p className="font-mono text-sm font-medium text-ink">{level}</p>
      <p className="font-mono text-[10px] text-ink-3">{token}</p>
      <p className="mt-1 text-xs text-ink-2">{desc}</p>
    </div>
  )
}

function RadiusDemo({ size, px, token }: { size: string; px: string; token: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-16 w-16 border-2 border-green bg-green-50"
        style={{ borderRadius: `var(${token})` }}
        aria-hidden
      />
      <p className="font-mono text-xs font-medium text-ink">{size}</p>
      <p className="font-mono text-[10px] text-ink-3">{px}</p>
    </div>
  )
}

const colorGroups = [
  {
    title: 'Fond / Surface',
    tokens: [
      { token: '--bg', label: 'bg', desc: 'Fond de page' },
      { token: '--bg-sunken', label: 'bg-sunken', desc: 'Sections en retrait' },
      { token: '--surface', label: 'surface', desc: 'Cartes, tableaux' },
      { token: '--surface-2', label: 'surface-2', desc: 'En-têtes, fonds secondaires' },
    ],
  },
  {
    title: 'Texte / Encre',
    tokens: [
      { token: '--ink', label: 'ink', desc: 'Titres, texte principal' },
      { token: '--ink-2', label: 'ink-2', desc: 'Texte courant' },
      { token: '--ink-3', label: 'ink-3', desc: 'Métas, légendes' },
      { token: '--line', label: 'line', desc: 'Bordures légères' },
      { token: '--line-2', label: 'line-2', desc: 'Bordures appuyées, inputs' },
    ],
  },
  {
    title: "Vert — CTA / Action (le seul accent d'action)",
    tokens: [
      { token: '--green', label: 'green', desc: 'CTA primaire, positif' },
      { token: '--green-700', label: 'green-700', desc: 'Hover CTA' },
      { token: '--green-50', label: 'green-50', desc: 'Fonds verts légers' },
      { token: '--green-ink', label: 'green-ink', desc: 'Texte vert sur fond clair' },
    ],
  },
  {
    title: 'Or — Premium / Featured (rare, jamais décoratif)',
    tokens: [
      { token: '--gold', label: 'gold', desc: 'Top pick, étoiles, featured' },
      { token: '--gold-50', label: 'gold-50', desc: 'Fond or léger' },
      { token: '--gold-ink', label: 'gold-ink', desc: 'Texte or' },
    ],
  },
  {
    title: 'Rouge — Légal uniquement (18+, warnings)',
    tokens: [
      { token: '--red', label: 'red', desc: '18+, avertissements légaux' },
      { token: '--red-50', label: 'red-50', desc: 'Fond alerte légère' },
      { token: '--red-ink', label: 'red-ink', desc: 'Texte rouge' },
    ],
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Sticky header */}
      <header className="bg-surface/90 sticky top-0 z-50 border-b border-line px-8 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-site items-center justify-between">
          <div>
            <p className="font-serif text-xl font-medium text-ink">Design System</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
              le-meilleur-casino-en-ligne.fr — tokens · composants · noindex
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher
              currentLocale="fr"
              localeUrls={{ fr: '/design-system', en: '/en/design-system' }}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-site gap-0 px-8 py-12 xl:grid-cols-[220px_1fr]">
        {/* Sidebar TOC — desktop only */}
        <aside className="hidden xl:block">
          <TableOfContents items={tocItems} className="sticky top-24" />
        </aside>

        {/* Main content */}
        <main className="min-w-0 space-y-16 xl:pl-10">
          {/* ── 01 TOKENS ─────────────────────────────────────── */}
          <Section id="sec-tokens" title="01 — Design tokens">
            {/* Palette */}
            <div className="mb-10 space-y-8">
              {colorGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-3 text-sm font-semibold text-ink-2">{group.title}</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                    {group.tokens.map((t) => (
                      <Swatch key={t.token} {...t} />
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink-2">Étoiles</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Swatch token="--star" label="star" desc="Remplissage étoiles rating" />
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="mb-10 space-y-6 rounded-xl border border-line bg-surface p-8 shadow-1">
              <div className="border-b border-line pb-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  H1 · Newsreader 500 · clamp(30–60px)
                </p>
                <h1 className="font-serif text-[clamp(30px,5vw,60px)] font-medium leading-tight tracking-[-0.02em] text-ink">
                  Meilleur casino en ligne
                </h1>
              </div>
              <div className="border-b border-line pb-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  H2 · Newsreader 500 · clamp(27–40px)
                </p>
                <h2 className="font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-tight tracking-[-0.018em] text-ink">
                  Notre sélection de casinos fiables
                </h2>
              </div>
              <div className="border-b border-line pb-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  H3 · Hanken Grotesk 700 · 20–23px
                </p>
                <h3 className="text-xl font-bold text-ink">
                  Bonus de bienvenue jusqu&apos;à 500 €
                </h3>
              </div>
              <div className="border-b border-line pb-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  Body · Hanken Grotesk 400 · 17px / 1.6
                </p>
                <p className="text-[17px] leading-[1.6] text-ink-2">
                  Nous évaluons chaque casino selon 9 critères indépendants : ludothèque, bonus,
                  paiements, support, licence, mobile, sécurité, VIP et jeu responsable.
                </p>
              </div>
              <div className="border-b border-line pb-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  Mono · JetBrains Mono 400 · 11–12px · uppercase
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                  RTP 96.5% · Volatilité Haute · Max Win 5 000× · MÀJ 2026-06-07
                </p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                  Serif italic · Newsreader 400i · citations
                </p>
                <p className="font-serif text-xl italic leading-relaxed text-ink">
                  « La régulation ANJ impose aux opérateurs des standards stricts de protection des
                  joueurs. »
                </p>
              </div>
            </div>

            {/* Radius + Shadows */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface p-6 shadow-1">
                <h3 className="mb-4 text-sm font-semibold text-ink-2">Radius</h3>
                <div className="flex flex-wrap gap-8">
                  <RadiusDemo size="sm" px="6px" token="--radius-sm" />
                  <RadiusDemo size="default" px="10px" token="--radius" />
                  <RadiusDemo size="lg" px="16px" token="--radius-lg" />
                  <RadiusDemo size="xl" px="22px" token="--radius-xl" />
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold text-ink-2">Ombres</h3>
                <div className="space-y-4">
                  <ShadowCard level="sh-1" token="--sh-1" desc="Cartes au repos" />
                  <ShadowCard level="sh-2" token="--sh-2" desc="Cartes featured" />
                  <ShadowCard level="sh-3" token="--sh-3" desc="Sticky, drawers, modales" />
                </div>
              </div>
            </div>
          </Section>

          {/* ── 02 COMPOSANTS ATOMIQUES ───────────────────────── */}
          <Section id="sec-atoms" title="02 — Composants atomiques">
            {/* CTAButton */}
            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">CTAButton — variantes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <CTAButton href="#" variant="primary" arrow>
                  Obtenir le bonus
                </CTAButton>
                <CTAButton href="#" variant="primary" stack subLabel="200 € + 100 tours">
                  Obtenir le bonus
                </CTAButton>
                <CTAButton href="#" variant="secondary">
                  Lire l&apos;avis
                </CTAButton>
                <CTAButton href="#" variant="tertiary">
                  → Voir les détails
                </CTAButton>
                <CTAButton variant="disabled">Indisponible</CTAButton>
                <CTAButton href="#" variant="primary" size="sm">
                  Bonus →
                </CTAButton>
              </div>
            </div>

            {/* Notation */}
            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">Notation</h3>
              <div className="flex flex-wrap items-center gap-8">
                <ScorePill score={9.2} gold />
                <ScorePill score={8.7} />
                <ScorePill score={7.5} />
                <ScoreRing score={9.2} label="Excellent" />
                <StarRating rating={4.6} grade="Excellent" reviewCount={1248} />
              </div>
            </div>

            {/* BonusBadge */}
            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">BonusBadge</h3>
              <div className="flex flex-wrap gap-4">
                <BonusBadge
                  label="Bonus de bienvenue"
                  amount="200 €"
                  amountSuffix="+ 100 tours"
                  conditions="Wager 35× · dépôt min. 20 €"
                />
                <BonusBadge
                  label="★ Top pick — exclusif"
                  amount="500 €"
                  amountSuffix="+ 200 tours"
                  conditions="Wager 30× · sans code"
                  gold
                />
              </div>
            </div>
          </Section>

          {/* ── 03 CARTES OPÉRATEUR ───────────────────────────── */}
          <Section id="sec-cards" title="03 — Cartes opérateur">
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">PodiumCard — homepage top-3</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <PodiumCard operator={mockOp} rank={1} />
                <PodiumCard
                  operator={{
                    ...mockOp,
                    id: 'lucky8',
                    slug: 'lucky8',
                    name: 'Lucky8',
                    rating: 8.7,
                  }}
                  rank={2}
                />
                <PodiumCard
                  operator={{
                    ...mockOp,
                    id: 'madnix',
                    slug: 'madnix',
                    name: 'Madnix',
                    rating: 8.4,
                  }}
                  rank={3}
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">
                ListingCard — /casinos/ listing
              </h3>
              <div className="flex flex-col gap-3">
                <ListingCard operator={mockOp} isTop />
                <ListingCard
                  operator={{
                    ...mockOp,
                    id: 'lucky8',
                    slug: 'lucky8',
                    name: 'Lucky8',
                    rating: 8.7,
                  }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">
                RankCard — comparatif avec médailles
              </h3>
              <div className="flex flex-col gap-4">
                <RankCard operator={mockOp} rank={1} medal={1} />
                <RankCard
                  operator={{
                    ...mockOp,
                    id: 'lucky8',
                    slug: 'lucky8',
                    name: 'Lucky8',
                    rating: 8.7,
                  }}
                  rank={2}
                  medal={2}
                />
              </div>
            </div>
          </Section>

          {/* ── 04 CONTENU ÉDITORIAL ──────────────────────────── */}
          <Section id="sec-content" title="04 — Contenu éditorial">
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">ProsConsBox</h3>
              <ProsConsBox
                pros={[
                  'Bonus généreux sans code promo',
                  'Retrait en moins de 24h',
                  'Support francophone 24/7',
                ]}
                cons={['Interface vieillissante', 'Pas de cashback hebdomadaire']}
              />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">FAQAccordion</h3>
              <FAQAccordion items={faqItems} includeSchema={false} />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">Breadcrumbs</h3>
              <Breadcrumbs
                items={[
                  { label: 'Accueil', href: '/' },
                  { label: 'Casinos en ligne', href: '/casinos/' },
                  { label: 'Crésus Casino' },
                ]}
              />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">AuthorBio</h3>
              <AuthorBio
                name="Sophie Marchand"
                role="Experte jeux d'argent"
                credentials="10 ans d'expertise, certifiée ANJ"
                lastUpdated="2026-06-07"
                nextRetest="2026-09-01"
              />
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold text-ink-2">NewsletterCTA</h3>
              <NewsletterCTA />
            </div>
          </Section>

          {/* ── 05 CONFORMITÉ ─────────────────────────────────── */}
          <Section id="sec-conformite" title="05 — Conformité légale">
            <div className="mb-6 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">
                  Disclaimer18Plus — topstrip
                </h3>
                <Disclaimer18Plus variant="topstrip" updatedAt="2026-06-07" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">Disclaimer18Plus — encart</h3>
                <Disclaimer18Plus variant="encart" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">
                  AffiliateDisclosure — strip (review, visible sans scroll)
                </h3>
                <AffiliateDisclosure variant="strip" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">
                  AffiliateDisclosure — footer
                </h3>
                <AffiliateDisclosure variant="footer" className="max-w-xl" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">
                  ResponsibleGamblingBanner — FR
                </h3>
                <ResponsibleGamblingBanner locale="fr" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink-2">
                  ResponsibleGamblingBanner — EN
                </h3>
                <ResponsibleGamblingBanner locale="en" />
              </div>
            </div>
          </Section>

          {/* ── 06 INTERACTIFS ────────────────────────────────── */}
          <Section id="sec-interactive" title="06 — Composants interactifs">
            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">LocaleSwitcher</h3>
              <LocaleSwitcher
                currentLocale="fr"
                localeUrls={{ fr: '/design-system', en: '/en/design-system' }}
              />
            </div>

            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">FilterSidebar (desktop)</h3>
              <FilterSidebarDemo />
            </div>

            <div className="mb-8 rounded-xl border border-line bg-surface p-6 shadow-1">
              <h3 className="mb-4 text-sm font-semibold text-ink-2">CookieConsentBanner</h3>
              <p className="mb-3 text-sm text-ink-2">
                S&apos;affiche automatiquement si{' '}
                <code className="rounded bg-bg-sunken px-1.5 font-mono text-xs">
                  localStorage[&apos;mc-consent&apos;]
                </code>{' '}
                est absent. Effacez-le et rechargez pour tester.
              </p>
              <ClearConsentButton />
            </div>
          </Section>
        </main>
      </div>

      <footer className="border-t border-line py-6 text-center font-mono text-[11px] text-ink-3">
        Design System — usage interne · noindex · Phase 3 complète ✓
      </footer>

      {/* Cookie banner rendered here for actual preview */}
      <CookieConsentBanner />
    </div>
  )
}
