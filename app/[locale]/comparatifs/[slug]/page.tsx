import type { Metadata } from 'next'
import type { WithContext, ItemList } from 'schema-dts'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { LogoOrPlaceholder } from '@/components/ui/operator-card'
import { ScorePill } from '@/components/ui/score-pill'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug, operators, type Operator } from '@/config/operators'
import { getReviewData } from '@/config/review-content'
import { buildHreflang } from '@/lib/i18n/routes'
import { cn } from '@/lib/utils'

function parseVersusSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length === 2 && parts[0] && parts[1]) return [parts[0], parts[1]]
  return null
}

export async function generateStaticParams() {
  const top15 = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 15)
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
      ? `${opA.name} vs ${opB.name} : lequel choisir en 2026 ?`
      : `${opA.name} vs ${opB.name} — Which to Choose in 2026?`,
    description: isFr
      ? `Comparatif complet ${opA.name} vs ${opB.name} : bonus, RTP, retraits, support et licence. Notre verdict critère par critère. 18+`
      : `Full comparison ${opA.name} vs ${opB.name}: bonus, RTP, withdrawals, support and licence. Our verdict by criterion. 18+`,
    alternates: { languages: buildHreflang(`/comparatifs/${slug}/`) },
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

type SectionWinner = 'a' | 'b' | 'tie'

function winner(aVal: number, bVal: number): SectionWinner {
  if (Math.abs(aVal - bVal) < 0.001) return 'tie'
  return aVal > bVal ? 'a' : 'b'
}

function licenceScore(licence: string): number {
  const l = licence.toLowerCase()
  if (l.includes('mga') || l.includes('malta') || l.includes('gibraltar')) return 3
  if (l.includes('cga') || l.includes('8048')) return 2
  return 1
}

function extractWager(conditions: string): number {
  const m = conditions.match(/(\d+)×/)
  return m ? parseInt(m[1]!, 10) : 40
}

function bonusScore(op: Operator): number {
  return op.bonusAmountNumber / extractWager(op.bonusConditions)
}

function hasCrypto(op: Operator): boolean {
  return op.paymentMethods.some((m) =>
    ['btc', '₿', 'eth', 'crypto', 'usdt', 'bitcoin'].some((c) => m.toLowerCase().includes(c))
  )
}

function recapVal(slug: string, keyword: string): string {
  const rd = getReviewData(slug)
  return (
    rd.recapRows.find((r) => r.label.toLowerCase().includes(keyword.toLowerCase()))?.value ?? '—'
  )
}

function stripMd(s: string): string {
  return s.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function WinnerBadge({
  w,
  aName,
  bName,
  isFr,
}: {
  w: SectionWinner
  aName: string
  bName: string
  isFr: boolean
}) {
  if (w === 'tie') {
    return (
      <span className="inline-flex items-center rounded-full border border-line bg-bg-sunken px-3 py-[5px] font-mono text-[10.5px] font-semibold text-ink-3">
        {isFr ? 'Match nul' : 'Tie'}
      </span>
    )
  }
  const name = w === 'a' ? aName : bName
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--green)_28%,var(--line))] bg-green-50 px-3 py-[5px] font-[12.5px] font-semibold text-green-ink">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-[13px] w-[13px] text-green"
        aria-hidden
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {isFr ? `Avantage ${name}` : `${name} wins`}
    </span>
  )
}

function VsSection({
  title,
  w,
  aName,
  bName,
  aContent,
  bContent,
  isFr,
}: {
  title: string
  w: SectionWinner
  aName: string
  bName: string
  aContent: React.ReactNode
  bContent: React.ReactNode
  isFr: boolean
}) {
  return (
    <div className="mt-[18px] overflow-hidden rounded-lg border border-line bg-surface shadow-1">
      <div className="flex items-center justify-between gap-4 border-b border-line bg-surface-2 px-[22px] py-4">
        <h3 className="m-0 font-serif text-[20px] font-semibold text-ink">{title}</h3>
        <WinnerBadge w={w} aName={aName} bName={bName} isFr={isFr} />
      </div>
      <div className="grid grid-cols-[1fr_1px_1fr] sm:grid-cols-1">
        <div className={cn('p-[20px_22px]', w === 'a' && 'bg-green-50')}>{aContent}</div>
        <div className="bg-line sm:h-px sm:w-full" />
        <div className={cn('p-[20px_22px]', w === 'b' && 'bg-green-50')}>{bContent}</div>
      </div>
    </div>
  )
}

function SplitColContent({
  op,
  text,
  isWinner,
}: {
  op: Operator
  text: string
  isWinner: boolean
}) {
  return (
    <div>
      <div className="mb-[10px] flex items-center gap-[10px]">
        <LogoOrPlaceholder
          logoUrl={op.logoUrl}
          name={op.shortName ?? op.name}
          width={88}
          height={30}
        />
        <ScorePill score={op.rating} gold={isWinner} />
      </div>
      <p className="m-0 text-[14px] leading-[1.6] text-ink-2">{text}</p>
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
  const rdA = getReviewData(opA.slug)
  const rdB = getReviewData(opB.slug)
  const overallWinner = opA.rating >= opB.rating ? opA : opB

  const sections = {
    note: winner(opA.rating, opB.rating),
    bonus: winner(bonusScore(opA), bonusScore(opB)),
    rtp: winner(opA.rtp, opB.rtp),
    paiements: winner(opA.paymentMethods.length, opB.paymentMethods.length),
    licence: winner(licenceScore(opA.licence), licenceScore(opB.licence)),
  }

  const withdrawalA = recapVal(opA.slug, 'retrait')
  const withdrawalB = recapVal(opB.slug, 'retrait')
  const catalogueA = recapVal(opA.slug, 'catalogue')
  const catalogueB = recapVal(opB.slug, 'catalogue')
  const supportA = recapVal(opA.slug, 'support')
  const supportB = recapVal(opB.slug, 'support')

  const wagerA = extractWager(opA.bonusConditions)
  const wagerB = extractWager(opB.bonusConditions)

  const tableRows: {
    labelFr: string
    labelEn: string
    aVal: string
    bVal: string
    w: SectionWinner
    mono?: boolean
  }[] = [
    {
      labelFr: 'Note globale',
      labelEn: 'Overall rating',
      aVal: `${opA.rating}/10`,
      bVal: `${opB.rating}/10`,
      w: sections.note,
    },
    {
      labelFr: 'Bonus de bienvenue',
      labelEn: 'Welcome bonus',
      aVal: `${opA.bonusAmount}${opA.bonusSuffix ? ` ${opA.bonusSuffix}` : ''}`,
      bVal: `${opB.bonusAmount}${opB.bonusSuffix ? ` ${opB.bonusSuffix}` : ''}`,
      w: sections.bonus,
    },
    {
      labelFr: 'Conditions de mise',
      labelEn: 'Wagering',
      aVal: `${wagerA}×`,
      bVal: `${wagerB}×`,
      w: winner(wagerB, wagerA), // lower is better
      mono: true,
    },
    {
      labelFr: 'RTP moyen',
      labelEn: 'Avg. RTP',
      aVal: `${opA.rtp.toFixed(1)}%`,
      bVal: `${opB.rtp.toFixed(1)}%`,
      w: sections.rtp,
      mono: true,
    },
    {
      labelFr: 'Délai de retrait',
      labelEn: 'Withdrawal time',
      aVal: withdrawalA,
      bVal: withdrawalB,
      w: 'tie',
    },
    {
      labelFr: 'Nombre de jeux',
      labelEn: 'Game count',
      aVal: catalogueA,
      bVal: catalogueB,
      w: 'tie',
    },
    {
      labelFr: 'Paiement crypto',
      labelEn: 'Crypto payment',
      aVal: hasCrypto(opA) ? (isFr ? 'Oui' : 'Yes') : isFr ? 'Non' : 'No',
      bVal: hasCrypto(opB) ? (isFr ? 'Oui' : 'Yes') : isFr ? 'Non' : 'No',
      w: winner(hasCrypto(opA) ? 1 : 0, hasCrypto(opB) ? 1 : 0),
    },
    {
      labelFr: 'Licence',
      labelEn: 'Licence',
      aVal: opA.licence,
      bVal: opB.licence,
      w: sections.licence,
    },
    {
      labelFr: 'Support français',
      labelEn: 'French support',
      aVal: supportA,
      bVal: supportB,
      w: 'tie',
    },
  ]

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

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
      url: `${BASE_URL}/casinos/${op.slug}/`,
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

      {/* ── VS HEAD — centered hero ──────────────────────────────── */}
      <section className="pb-4 pt-10 text-center" data-page-type="versus" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-[''] after:h-px after:w-[22px] after:bg-gold after:content-['']">
            {isFr ? 'Face-à-face' : 'Head-to-head'}
          </div>
          <h1 className="mx-auto mb-4 max-w-[22ch] font-serif text-[clamp(30px,4.6vw,50px)] font-medium leading-[1.06] tracking-[-0.02em] text-ink">
            {opA.name} <em className="italic not-italic text-green">vs</em> {opB.name}
            {isFr ? ' : lequel choisir en 2026 ?' : ': which to choose in 2026?'}
          </h1>
          <p className="mx-auto max-w-[60ch] text-[17px] leading-[1.6] text-ink-2">
            {isFr
              ? `Deux casinos du marché français, testés côte à côte sur six critères décisifs. Verdict critère par critère.`
              : `Two major online casinos, tested side by side across six decisive criteria. Our verdict by criterion.`}
          </p>
        </div>
      </section>

      {/* ── VS HERO PANELS ──────────────────────────────────────── */}
      <section className="pb-2 pt-[34px]">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="grid grid-cols-[1fr_78px_1fr] items-stretch sm:grid-cols-1">
            {/* Panel A */}
            <div
              className={cn(
                'flex flex-col items-center gap-[14px] border p-7 text-center shadow-2',
                'rounded-l-xl sm:rounded-b-none sm:rounded-t-xl',
                'sm:border-b-0',
                overallWinner.slug === opA.slug
                  ? 'border-[color-mix(in_srgb,var(--green)_42%,var(--line))] bg-green-50'
                  : 'border-line bg-surface'
              )}
            >
              {overallWinner.slug === opA.slug ? (
                <p className="inline-flex items-center gap-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-[13px] w-[13px]"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {isFr ? 'Notre préféré' : 'Our pick'}
                </p>
              ) : (
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  {isFr ? 'Le challenger' : 'The challenger'}
                </p>
              )}
              <LogoOrPlaceholder
                logoUrl={opA.logoUrl}
                name={opA.shortName ?? opA.name}
                width={150}
                height={56}
              />
              <p className="font-serif text-[24px] font-semibold leading-tight text-ink">
                {opA.name}
              </p>
              <ScorePill score={opA.rating} gold={overallWinner.slug === opA.slug} />
              <p className="text-[13.5px] text-ink-2">
                <span className="font-serif text-[18px] font-semibold text-ink">
                  {opA.bonusAmount}
                </span>
                {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                {` · wager ${wagerA}×`}
              </p>
            </div>

            {/* VS center badge */}
            <div className="z-10 grid place-items-center sm:h-0">
              <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-[var(--bg)] bg-ink font-serif text-[23px] font-semibold italic text-bg shadow-3 sm:-my-8">
                VS
              </div>
            </div>

            {/* Panel B */}
            <div
              className={cn(
                'flex flex-col items-center gap-[14px] border p-7 text-center shadow-2',
                'rounded-r-xl sm:rounded-b-xl sm:rounded-t-none',
                'sm:border-t-0',
                overallWinner.slug === opB.slug
                  ? 'border-[color-mix(in_srgb,var(--green)_42%,var(--line))] bg-green-50'
                  : 'border-line bg-surface'
              )}
            >
              {overallWinner.slug === opB.slug ? (
                <p className="inline-flex items-center gap-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-green">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-[13px] w-[13px]"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {isFr ? 'Notre préféré' : 'Our pick'}
                </p>
              ) : (
                <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  {isFr ? 'Le challenger' : 'The challenger'}
                </p>
              )}
              <LogoOrPlaceholder
                logoUrl={opB.logoUrl}
                name={opB.shortName ?? opB.name}
                width={150}
                height={56}
              />
              <p className="font-serif text-[24px] font-semibold leading-tight text-ink">
                {opB.name}
              </p>
              <ScorePill score={opB.rating} gold={overallWinner.slug === opB.slug} />
              <p className="text-[13.5px] text-ink-2">
                <span className="font-serif text-[18px] font-semibold text-ink">
                  {opB.bonusAmount}
                </span>
                {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                {` · wager ${wagerB}×`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── SECTION 01 — Face-à-face table ──────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">01</span>
            {isFr ? "Le face-à-face en un coup d'oeil" : 'At a glance'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-lg border border-line bg-surface shadow-1">
              <thead>
                <tr className="border-b border-line">
                  <th className="w-[37%] bg-surface-2 px-[18px] py-[13px] text-center font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    {opA.name}
                  </th>
                  <th className="w-[26%] bg-surface-2 px-[18px] py-[13px] text-center font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    {isFr ? 'Critère' : 'Criterion'}
                  </th>
                  <th className="w-[37%] bg-surface-2 px-[18px] py-[13px] text-center font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    {opB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-b-0">
                    <td
                      className={cn(
                        'px-[18px] py-[14px] text-center align-middle text-[14.5px]',
                        row.w === 'a' && 'bg-green-50 font-bold text-ink',
                        row.mono && 'font-mono'
                      )}
                    >
                      {row.aVal}
                      {row.w === 'a' && (
                        <span className="ml-[7px] font-bold text-green" aria-hidden>
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="bg-surface-2 px-[18px] py-[14px] text-center align-middle font-mono text-[11.5px] uppercase tracking-[0.04em] text-ink-3">
                      {isFr ? row.labelFr : row.labelEn}
                    </td>
                    <td
                      className={cn(
                        'px-[18px] py-[14px] text-center align-middle text-[14.5px]',
                        row.w === 'b' && 'bg-green-50 font-bold text-ink',
                        row.mono && 'font-mono'
                      )}
                    >
                      {row.bVal}
                      {row.w === 'b' && (
                        <span className="ml-[7px] font-bold text-green" aria-hidden>
                          ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 02 — Détail par critère ─────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">02</span>
            {isFr ? 'Le détail, critère par critère' : 'Criteria breakdown'}
          </h2>

          <VsSection
            title={isFr ? 'Bonus de bienvenue' : 'Welcome bonus'}
            w={sections.bonus}
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={sections.bonus === 'a'}
                text={stripMd(rdA.sections.bonus.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={sections.bonus === 'b'}
                text={stripMd(rdB.sections.bonus.prose[0] ?? opB.tagline)}
              />
            }
          />

          <VsSection
            title={isFr ? 'Ludothèque' : 'Game library'}
            w={sections.rtp}
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={sections.rtp === 'a'}
                text={stripMd(rdA.sections.jeux.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={sections.rtp === 'b'}
                text={stripMd(rdB.sections.jeux.prose[0] ?? opB.tagline)}
              />
            }
          />

          <VsSection
            title={isFr ? 'Paiements & retraits' : 'Payments & withdrawals'}
            w={sections.paiements}
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={sections.paiements === 'a'}
                text={stripMd(rdA.sections.paiements.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={sections.paiements === 'b'}
                text={stripMd(rdB.sections.paiements.prose[0] ?? opB.tagline)}
              />
            }
          />

          <VsSection
            title={isFr ? 'Support client' : 'Customer support'}
            w="tie"
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={false}
                text={stripMd(rdA.sections.support.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={false}
                text={stripMd(rdB.sections.support.prose[0] ?? opB.tagline)}
              />
            }
          />

          <VsSection
            title={isFr ? 'Expérience mobile' : 'Mobile experience'}
            w="tie"
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={false}
                text={stripMd(rdA.sections.mobile.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={false}
                text={stripMd(rdB.sections.mobile.prose[0] ?? opB.tagline)}
              />
            }
          />

          <VsSection
            title={isFr ? 'Sécurité & licence' : 'Security & licence'}
            w={sections.licence}
            aName={opA.name}
            bName={opB.name}
            isFr={isFr}
            aContent={
              <SplitColContent
                op={opA}
                isWinner={sections.licence === 'a'}
                text={stripMd(rdA.sections.securite.prose[0] ?? opA.tagline)}
              />
            }
            bContent={
              <SplitColContent
                op={opB}
                isWinner={sections.licence === 'b'}
                text={stripMd(rdB.sections.securite.prose[0] ?? opB.tagline)}
              />
            }
          />
        </div>
      </section>

      {/* ── SECTION 03 — Verdict ────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">03</span>
            {isFr ? 'Verdict : lequel choisir ?' : 'Verdict: which to choose?'}
          </h2>
          <p className="mb-6 max-w-[62ch] text-[15.5px] leading-[1.6] text-ink-2">
            {isFr
              ? `${overallWinner.name} l'emporte sur la majorité des critères. Mais chaque casino a ses atouts selon votre profil.`
              : `${overallWinner.name} wins on most criteria. But each casino has strengths depending on your profile.`}
          </p>

          <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-1">
            {[opA, opB].map((op) => {
              const isWinner = overallWinner.slug === op.slug
              return (
                <div
                  key={op.id}
                  className={cn(
                    'rounded-lg border p-[26px] shadow-1',
                    isWinner
                      ? 'border-[color-mix(in_srgb,var(--green)_38%,var(--line))] shadow-2'
                      : 'border-line'
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <LogoOrPlaceholder
                      logoUrl={op.logoUrl}
                      name={op.shortName ?? op.name}
                      width={100}
                      height={34}
                    />
                    <ScorePill score={op.rating} gold={isWinner} />
                  </div>
                  <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                    {isFr ? `Choisissez ${op.name} si…` : `Choose ${op.name} if…`}
                  </h3>
                  <ul className="mb-5 flex flex-col gap-[10px] p-0" style={{ listStyle: 'none' }}>
                    {op.pros.slice(0, 3).map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-[10px] text-[14px] leading-[1.45] text-ink-2"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="mt-px h-4 w-4 shrink-0 text-green"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                  <CTAButton
                    href={op.affiliateUrl}
                    variant={isWinner ? 'primary' : 'secondary'}
                    block
                    arrow
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={op.slug}
                    data-placement="versus_verdict"
                    data-bonus={op.bonusSlug}
                    data-page-type="versus"
                    data-locale={locale}
                  >
                    {isFr ? `Obtenir le bonus ${op.name}` : `Get ${op.name} bonus`}
                  </CTAButton>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
