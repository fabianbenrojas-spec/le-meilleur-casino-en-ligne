import type { Metadata } from 'next'
import type { WithContext, ItemList } from 'schema-dts'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { LogoOrPlaceholder } from '@/components/ui/operator-card'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { ScorePill } from '@/components/ui/score-pill'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug, operators, type Operator } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'
import { cn } from '@/lib/utils'

function parseVersusSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length === 2 && parts[0] && parts[1]) return [parts[0], parts[1]]
  return null
}

export async function generateStaticParams() {
  const top15 = operators.sort((a, b) => b.rating - a.rating).slice(0, 15)
  const pairs: { slug: string }[] = []
  for (let i = 0; i < top15.length; i++) {
    for (let j = i + 1; j < top15.length; j++) {
      pairs.push({ slug: `${top15[i]!.slug}-vs-${top15[j]!.slug}` })
    }
  }
  return pairs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const versus = parseVersusSlug(slug)
  if (!versus) return {}
  const [slugA, slugB] = versus
  const opA = operatorBySlug.get(slugA!)
  const opB = operatorBySlug.get(slugB!)
  if (!opA || !opB) return {}
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `${opA.name} vs ${opB.name} — Comparatif 2026`
      : `${opA.name} vs ${opB.name} — Comparison 2026`,
    description: isFr
      ? `On compare ${opA.name} (${opA.rating}/10) et ${opB.name} (${opB.rating}/10) : bonus, retraits, ludothèque, paiements et licence. Quel casino choisir ?`
      : `We compare ${opA.name} (${opA.rating}/10) and ${opB.name} (${opB.rating}/10): bonus, withdrawals, game library, payments and licence.`,
    alternates: { languages: buildHreflang(`/comparatifs/${slug}/`) },
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

type SectionWinner = 'a' | 'b' | 'tie'

function winner(aVal: number, bVal: number): SectionWinner {
  const diff = aVal - bVal
  if (Math.abs(diff) < 0.001) return 'tie'
  return diff > 0 ? 'a' : 'b'
}

function licenceScore(licence: string): number {
  if (licence.toLowerCase().includes('mga')) return 3
  if (licence.toLowerCase().includes('cga')) return 2
  return 1
}

function extractWager(conditions: string): number {
  const m = conditions.match(/(\d+)×/)
  return m ? parseInt(m[1]!, 10) : 40
}

function bonusScore(op: Operator): number {
  return op.bonusAmountNumber / extractWager(op.bonusConditions)
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function WinnerBadge({
  result,
  aName,
  bName,
  isFr,
}: {
  result: SectionWinner
  aName: string
  bName: string
  isFr: boolean
}) {
  if (result === 'tie') {
    return (
      <span className="inline-flex items-center rounded-full border border-line bg-bg-sunken px-3 py-[3px] font-mono text-[10px] font-semibold text-ink-3">
        {isFr ? 'Égalité' : 'Tie'}
      </span>
    )
  }
  const name = result === 'a' ? aName : bName
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-[3px] font-mono text-[10px] font-semibold',
        result === 'a'
          ? 'border-[color-mix(in_srgb,var(--green)_35%,var(--line))] bg-green-50 text-green-ink'
          : 'border-[#C4B5FD] bg-[#F5F3FF] text-[#5B21B6]'
      )}
    >
      ↑ {name}
    </span>
  )
}

function ThematicSection({
  title,
  aContent,
  bContent,
  result,
  aName,
  bName,
  isFr,
}: {
  title: string
  aContent: React.ReactNode
  bContent: React.ReactNode
  result: SectionWinner
  aName: string
  bName: string
  isFr: boolean
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-1">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-[11px]">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <WinnerBadge result={result} aName={aName} bName={bName} isFr={isFr} />
      </div>
      <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-1 sm:divide-x-0 sm:divide-y">
        <div className={cn('p-[16px_20px]', result === 'a' && 'bg-green-50')}>{aContent}</div>
        <div className={cn('p-[16px_20px]', result === 'b' && 'bg-[#F5F3FF]')}>{bContent}</div>
      </div>
    </div>
  )
}

function ChooseIf({
  opName,
  conditions,
  variant,
  isFr,
}: {
  opName: string
  conditions: string[]
  variant: 'green' | 'purple'
  isFr: boolean
}) {
  const s =
    variant === 'green'
      ? {
          wrapper: 'border-[color-mix(in_srgb,var(--green)_35%,var(--line))] bg-green-50',
          label: 'text-green-ink',
          arrow: 'text-green',
        }
      : {
          wrapper: 'border-[#C4B5FD] bg-[#F5F3FF]',
          label: 'text-[#5B21B6]',
          arrow: 'text-[#7C3AED]',
        }

  return (
    <div className={cn('flex-1 rounded-xl border-2 p-[22px_24px]', s.wrapper)}>
      <p
        className={cn(
          'mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em]',
          s.label
        )}
      >
        {isFr ? `Choisissez ${opName} si…` : `Choose ${opName} if…`}
      </p>
      <ul className="flex flex-col gap-[10px]" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {conditions.map((c, i) => (
          <li
            key={i}
            className="flex items-start gap-[10px] text-[14.5px] leading-[1.45] text-ink-2"
          >
            <span className={cn('mt-px shrink-0 font-bold', s.arrow)}>→</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function VersusPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const versus = parseVersusSlug(slug)
  if (!versus) notFound()

  const [slugA, slugB] = versus
  const opA = operatorBySlug.get(slugA!)
  const opB = operatorBySlug.get(slugB!)
  if (!opA || !opB) notFound()

  const isFr = locale === 'fr'
  const overallWinner = opA.rating >= opB.rating ? opA : opB

  const sections = {
    note: winner(opA.rating, opB.rating),
    bonus: winner(bonusScore(opA), bonusScore(opB)),
    rtp: winner(opA.rtp, opB.rtp),
    paiements: winner(opA.paymentMethods.length, opB.paymentMethods.length),
    licence: winner(licenceScore(opA.licence), licenceScore(opB.licence)),
  }

  const licenceLabel = (op: Operator, fr: boolean) => {
    const score = licenceScore(op.licence)
    if (score === 3) return fr ? 'Protection maximale' : 'Maximum protection'
    if (score === 2) return fr ? 'Protection renforcée' : 'Enhanced protection'
    return fr ? 'Licence standard' : 'Standard licence'
  }

  const itemListSchema: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? `${opA.name} vs ${opB.name} — Comparatif 2026`
      : `${opA.name} vs ${opB.name} — Comparison 2026`,
    numberOfItems: 2,
    itemListElement: [opA, opB].map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `https://le-meilleur-casino-en-ligne.fr/casinos/${op.slug}/`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          {
            label: isFr ? 'Comparatifs' : 'Comparisons',
            href: isFr ? '/comparatifs/' : '/en/comparisons/',
          },
          { label: `${opA.name} vs ${opB.name}` },
        ]}
        locale={locale}
      />

      {/* ── Hero 2-panel ────────────────────────────────────────── */}
      <section className="pb-4 pt-10" data-page-type="versus" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Comparatif 2026' : 'Comparison 2026'}
          </div>
          <h1 className="mb-[10px] font-serif text-[clamp(28px,4vw,46px)] font-medium leading-tight tracking-[-0.02em] text-ink">
            {opA.name} <span className="text-ink-3">vs</span> {opB.name}
          </h1>
          <p className="mb-8 max-w-[60ch] text-[17px] text-ink-2">
            {isFr
              ? `Comparaison détaillée sur 5 critères : bonus, RTP, paiements, licence et note globale.`
              : `Detailed comparison across 5 criteria: bonus, RTP, payments, licence and overall rating.`}
          </p>

          {/* Symmetric 2-panel + VS badge */}
          <div className="relative grid grid-cols-2 items-start gap-[52px] sm:flex sm:flex-col sm:gap-4">
            {/* VS badge — centered between panels, desktop only */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:hidden">
              <div className="grid h-[48px] w-[48px] place-items-center rounded-full border-2 border-line bg-surface font-serif text-[18px] font-bold leading-none text-ink-3 shadow-2">
                VS
              </div>
            </div>

            {/* Panel A */}
            <div
              className={cn(
                'flex flex-col gap-[14px] rounded-xl border bg-surface p-6 shadow-2',
                overallWinner.slug === opA.slug
                  ? 'border-[color-mix(in_srgb,var(--gold)_40%,var(--line))] shadow-3'
                  : 'border-line'
              )}
            >
              {overallWinner.slug === opA.slug && (
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-gold-ink">
                  ★ {isFr ? 'Recommandé' : 'Recommended'}
                </p>
              )}
              <div className="flex items-start justify-between gap-3">
                <LogoOrPlaceholder
                  logoUrl={opA.logoUrl}
                  name={opA.shortName ?? opA.name}
                  width={110}
                  height={40}
                />
                <ScorePill score={opA.rating} gold={overallWinner.slug === opA.slug} />
              </div>
              <div>
                <p className="font-serif text-[21px] font-semibold text-ink">{opA.name}</p>
                <p className="mt-[3px] text-[13px] text-ink-3">{opA.tagline}</p>
              </div>
              <p className="text-[15px] text-ink-2">
                <span className="font-serif text-[19px] font-semibold text-green">
                  {opA.bonusAmount}
                </span>
                {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                <span className="ml-2 text-[12px] text-ink-3">{opA.bonusConditions}</span>
              </p>
              <div className="mt-auto flex gap-2">
                <CTAButton
                  href={opA.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  block
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={opA.slug}
                  data-placement="versus_hero_a"
                  data-bonus={opA.bonusSlug}
                  data-page-type="versus"
                  data-locale={locale}
                >
                  {isFr ? 'Obtenir le bonus' : 'Get bonus'}
                </CTAButton>
                <CTAButton
                  href={`/casinos/${opA.slug}/`}
                  variant="secondary"
                  size="sm"
                  data-event="review_click"
                  data-operator={opA.slug}
                >
                  {isFr ? 'Avis' : 'Review'}
                </CTAButton>
              </div>
            </div>

            {/* Panel B */}
            <div
              className={cn(
                'flex flex-col gap-[14px] rounded-xl border bg-surface p-6 shadow-2',
                overallWinner.slug === opB.slug
                  ? 'border-[color-mix(in_srgb,var(--gold)_40%,var(--line))] shadow-3'
                  : 'border-line'
              )}
            >
              {overallWinner.slug === opB.slug && (
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-gold-ink">
                  ★ {isFr ? 'Recommandé' : 'Recommended'}
                </p>
              )}
              <div className="flex items-start justify-between gap-3">
                <LogoOrPlaceholder
                  logoUrl={opB.logoUrl}
                  name={opB.shortName ?? opB.name}
                  width={110}
                  height={40}
                />
                <ScorePill score={opB.rating} gold={overallWinner.slug === opB.slug} />
              </div>
              <div>
                <p className="font-serif text-[21px] font-semibold text-ink">{opB.name}</p>
                <p className="mt-[3px] text-[13px] text-ink-3">{opB.tagline}</p>
              </div>
              <p className="text-[15px] text-ink-2">
                <span className="font-serif text-[19px] font-semibold text-green">
                  {opB.bonusAmount}
                </span>
                {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                <span className="ml-2 text-[12px] text-ink-3">{opB.bonusConditions}</span>
              </p>
              <div className="mt-auto flex gap-2">
                <CTAButton
                  href={opB.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  block
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={opB.slug}
                  data-placement="versus_hero_b"
                  data-bonus={opB.bonusSlug}
                  data-page-type="versus"
                  data-locale={locale}
                >
                  {isFr ? 'Obtenir le bonus' : 'Get bonus'}
                </CTAButton>
                <CTAButton
                  href={`/casinos/${opB.slug}/`}
                  variant="secondary"
                  size="sm"
                  data-event="review_click"
                  data-operator={opB.slug}
                >
                  {isFr ? 'Avis' : 'Review'}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── Face-à-face table ──────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Tableau face-à-face' : 'Head-to-head table'}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-line shadow-1">
            <table className="w-full border-collapse bg-surface">
              <thead>
                <tr className="border-b border-line">
                  <th className="sticky top-[var(--header-h)] z-[5] bg-surface-2 px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Critère' : 'Criterion'}
                  </th>
                  <th className="sticky top-[var(--header-h)] z-[5] bg-surface-2 px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {opA.name}
                  </th>
                  <th className="sticky top-[var(--header-h)] z-[5] bg-surface-2 px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {opB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'Note globale' : 'Overall rating'}
                  </td>
                  <td className={cn('px-5 py-[13px]', sections.note === 'a' && 'bg-green-50')}>
                    <ScorePill score={opA.rating} gold={sections.note === 'a'} />
                  </td>
                  <td className={cn('px-5 py-[13px]', sections.note === 'b' && 'bg-green-50')}>
                    <ScorePill score={opB.rating} gold={sections.note === 'b'} />
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'Bonus de bienvenue' : 'Welcome bonus'}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[14px] text-ink-2',
                      sections.bonus === 'a' && 'bg-green-50 font-semibold text-ink'
                    )}
                  >
                    {opA.bonusAmount}
                    {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[14px] text-ink-2',
                      sections.bonus === 'b' && 'bg-green-50 font-semibold text-ink'
                    )}
                  >
                    {opB.bonusAmount}
                    {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'Wager' : 'Wagering'}
                  </td>
                  <td className="px-5 py-[13px] font-mono text-[13px] text-ink-2">
                    {extractWager(opA.bonusConditions)}×
                  </td>
                  <td className="px-5 py-[13px] font-mono text-[13px] text-ink-2">
                    {extractWager(opB.bonusConditions)}×
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'RTP moyen' : 'Avg. RTP'}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] font-mono text-[13.5px]',
                      sections.rtp === 'a' ? 'bg-green-50 font-semibold text-green-ink' : 'text-ink'
                    )}
                  >
                    {opA.rtp.toFixed(1)}%
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] font-mono text-[13.5px]',
                      sections.rtp === 'b' ? 'bg-green-50 font-semibold text-green-ink' : 'text-ink'
                    )}
                  >
                    {opB.rtp.toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'Paiements' : 'Payments'}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[13px] text-ink-2',
                      sections.paiements === 'a' && 'bg-green-50'
                    )}
                  >
                    {opA.paymentMethods.join(' · ')}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[13px] text-ink-2',
                      sections.paiements === 'b' && 'bg-green-50'
                    )}
                  >
                    {opB.paymentMethods.join(' · ')}
                  </td>
                </tr>
                <tr>
                  <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
                    {isFr ? 'Licence' : 'Licence'}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[13px] text-ink-2',
                      sections.licence === 'a' && 'bg-green-50'
                    )}
                  >
                    {opA.licence}
                  </td>
                  <td
                    className={cn(
                      'px-5 py-[13px] text-[13px] text-ink-2',
                      sections.licence === 'b' && 'bg-green-50'
                    )}
                  >
                    {opB.licence}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Thematic split-view sections ──────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          {/* Legend */}
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--green)_35%,var(--line))] bg-green-50 px-2 py-[2px] font-mono text-[10px] font-semibold text-green-ink">
                ↑ A
              </span>
              {opA.name}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <span className="inline-flex items-center rounded-full border border-[#C4B5FD] bg-[#F5F3FF] px-2 py-[2px] font-mono text-[10px] font-semibold text-[#5B21B6]">
                ↑ B
              </span>
              {opB.name}
            </div>
          </div>

          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Analyse par critère' : 'Criteria breakdown'}
          </h2>

          <div className="flex flex-col gap-3">
            <ThematicSection
              title={isFr ? 'Bonus & Conditions' : 'Bonus & Wagering'}
              result={sections.bonus}
              aName={opA.name}
              bName={opB.name}
              isFr={isFr}
              aContent={
                <div>
                  <div className="font-serif text-[18px] font-semibold text-green">
                    {opA.bonusAmount}
                  </div>
                  {opA.bonusSuffix && (
                    <div className="text-[13px] text-ink-2">{opA.bonusSuffix}</div>
                  )}
                  <div className="mt-[4px] text-[12px] text-ink-3">{opA.bonusConditions}</div>
                </div>
              }
              bContent={
                <div>
                  <div className="font-serif text-[18px] font-semibold text-green">
                    {opB.bonusAmount}
                  </div>
                  {opB.bonusSuffix && (
                    <div className="text-[13px] text-ink-2">{opB.bonusSuffix}</div>
                  )}
                  <div className="mt-[4px] text-[12px] text-ink-3">{opB.bonusConditions}</div>
                </div>
              }
            />

            <ThematicSection
              title={isFr ? 'Ludothèque & RTP' : 'Game Library & RTP'}
              result={sections.rtp}
              aName={opA.name}
              bName={opB.name}
              isFr={isFr}
              aContent={
                <div>
                  <div className="font-mono text-[18px] font-semibold text-ink">
                    {opA.rtp.toFixed(1)}%
                  </div>
                  <div className="mt-[2px] text-[12px] text-ink-3">
                    {isFr ? 'RTP moyen' : 'Avg. RTP'}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {opA.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-[4px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              }
              bContent={
                <div>
                  <div className="font-mono text-[18px] font-semibold text-ink">
                    {opB.rtp.toFixed(1)}%
                  </div>
                  <div className="mt-[2px] text-[12px] text-ink-3">
                    {isFr ? 'RTP moyen' : 'Avg. RTP'}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {opB.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="rounded-[4px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />

            <ThematicSection
              title={isFr ? 'Méthodes de paiement' : 'Payment methods'}
              result={sections.paiements}
              aName={opA.name}
              bName={opB.name}
              isFr={isFr}
              aContent={
                <div className="flex flex-wrap gap-[5px]">
                  {opA.paymentMethods.map((pm) => (
                    <span
                      key={pm}
                      className="grid min-w-[38px] place-items-center rounded-[4px] border border-line bg-bg-sunken px-1.5 py-[5px] font-mono text-[10px] font-semibold text-ink-3"
                    >
                      {pm}
                    </span>
                  ))}
                </div>
              }
              bContent={
                <div className="flex flex-wrap gap-[5px]">
                  {opB.paymentMethods.map((pm) => (
                    <span
                      key={pm}
                      className="grid min-w-[38px] place-items-center rounded-[4px] border border-line bg-bg-sunken px-1.5 py-[5px] font-mono text-[10px] font-semibold text-ink-3"
                    >
                      {pm}
                    </span>
                  ))}
                </div>
              }
            />

            <ThematicSection
              title={isFr ? 'Licence & Sécurité' : 'Licence & Security'}
              result={sections.licence}
              aName={opA.name}
              bName={opB.name}
              isFr={isFr}
              aContent={
                <div>
                  <div className="font-mono text-[13px] font-semibold text-ink">{opA.licence}</div>
                  <div className="mt-[4px] text-[12px] text-ink-3">{licenceLabel(opA, isFr)}</div>
                </div>
              }
              bContent={
                <div>
                  <div className="font-mono text-[13px] font-semibold text-ink">{opB.licence}</div>
                  <div className="mt-[4px] text-[12px] text-ink-3">{licenceLabel(opB, isFr)}</div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Points forts / faibles ────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Points forts et faibles' : 'Strengths and weaknesses'}
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
            <div>
              <h3 className="mb-3 font-serif text-[19px] font-semibold text-ink">{opA.name}</h3>
              <ProsConsBox pros={opA.pros} cons={opA.cons} locale={locale} />
            </div>
            <div>
              <h3 className="mb-3 font-serif text-[19px] font-semibold text-ink">{opB.name}</h3>
              <ProsConsBox pros={opB.pros} cons={opB.cons} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Verdict : Choisissez si… ──────────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Notre verdict' : 'Our verdict'}
          </h2>

          {/* Overall winner banner */}
          <div className="mb-6 rounded-lg border border-l-4 border-line border-l-green bg-surface p-[22px_24px] shadow-1">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-green">
              {isFr ? 'Gagnant global' : 'Overall winner'}
            </p>
            <p className="m-0 font-serif text-[17px] leading-[1.6] text-ink">
              {overallWinner.slug === opA.slug
                ? isFr
                  ? `${opA.name} (${opA.rating}/10) l'emporte sur ${opB.name} (${opB.rating}/10). ${opA.verdict}`
                  : `${opA.name} (${opA.rating}/10) beats ${opB.name} (${opB.rating}/10). ${opA.verdict}`
                : isFr
                  ? `${opB.name} (${opB.rating}/10) l'emporte sur ${opA.name} (${opA.rating}/10). ${opB.verdict}`
                  : `${opB.name} (${opB.rating}/10) beats ${opA.name} (${opA.rating}/10). ${opB.verdict}`}
            </p>
          </div>

          {/* Choose if… side by side */}
          <div className="flex gap-5 sm:flex-col">
            <ChooseIf
              opName={opA.name}
              conditions={opA.pros.slice(0, 3)}
              variant="green"
              isFr={isFr}
            />
            <ChooseIf
              opName={opB.name}
              conditions={opB.pros.slice(0, 3)}
              variant="purple"
              isFr={isFr}
            />
          </div>
        </div>
      </section>

      {/* ── Final CTAs côte à côte ───────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
            {[opA, opB].map((op) => (
              <div
                key={op.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-green bg-green-50 p-[26px] text-center"
              >
                <LogoOrPlaceholder
                  logoUrl={op.logoUrl}
                  name={op.shortName ?? op.name}
                  width={110}
                  height={40}
                />
                <div>
                  <p className="font-serif text-[21px] font-semibold text-ink">{op.name}</p>
                  <p className="mt-[3px] text-[14px] text-ink-2">
                    <span className="font-serif text-[18px] font-semibold text-green">
                      {op.bonusAmount}
                    </span>
                    {op.bonusSuffix && ` ${op.bonusSuffix}`}
                  </p>
                  <p className="text-[11.5px] text-ink-3">{op.bonusConditions}</p>
                </div>
                <CTAButton
                  href={op.affiliateUrl}
                  variant="primary"
                  arrow
                  block
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement="versus_verdict"
                  data-bonus={op.bonusSlug}
                  data-page-type="versus"
                  data-locale={locale}
                >
                  {isFr ? 'Obtenir le bonus' : 'Get bonus'}
                </CTAButton>
                <p className="text-[11px] text-ink-3">18+ · {op.bonusConditions}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
