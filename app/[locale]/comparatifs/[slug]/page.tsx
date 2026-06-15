import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import { VersusCompareBar } from '@/components/versus/versus-compare-bar'
import { WagerSimulator } from '@/components/versus/wager-simulator'
import { VersusCrits, type CritData } from '@/components/versus/versus-crits'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug, operators, TOP_10 } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'

function parseVersusSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length === 2 && parts[0] && parts[1]) return [parts[0], parts[1]]
  return null
}

function parseWager(conditions: string): number {
  const m = conditions.match(/(\d+)\s*[xX]/)
  return m ? parseInt(m[1]!, 10) : 35
}

export async function generateStaticParams() {
  const top5 = operators.sort((a, b) => b.rating - a.rating).slice(0, 5)
  const pairs: { slug: string }[] = []
  for (let i = 0; i < top5.length; i++) {
    for (let j = i + 1; j < top5.length; j++) {
      pairs.push({ slug: `${top5[i]!.slug}-vs-${top5[j]!.slug}` })
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
      ? `On compare ${opA.name} (${opA.rating}/10) et ${opB.name} (${opB.rating}/10) : bonus, RTP, paiements et expérience. Quel casino choisir ?`
      : `We compare ${opA.name} (${opA.rating}/10) and ${opB.name} (${opB.rating}/10): bonuses, RTP, payments and UX.`,
    alternates: { languages: buildHreflang(`/comparatifs/${slug}/`) },
  }
}

function LogoPh({ name: _name, className }: { name: string; className?: string }) {
  return (
    <div
      className={`shrink-0 rounded border border-dashed border-line-2 font-mono text-[9px] text-ink-3 ${className ?? 'h-[52px] w-[150px]'}`}
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
      }}
      aria-hidden
    />
  )
}

function SectionLabel({ num, title, intro }: { num: string; title: string; intro?: string }) {
  return (
    <div className="mb-6">
      <h2 className="m-0 mb-[6px] font-serif text-[clamp(24px,3vw,33px)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
        <span className="mr-[11px] font-mono text-[14px] font-medium text-green">{num}</span>
        {title}
      </h2>
      {intro && <p className="m-0 max-w-[66ch] text-[15.5px] leading-[1.6] text-ink-2">{intro}</p>}
    </div>
  )
}

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
  const winner = opA.rating >= opB.rating ? opA : opB
  const winA = winner.slug === opA.slug
  const winB = winner.slug === opB.slug

  // Alternatives (not opA or opB)
  const alts = TOP_10.filter((op) => op.id !== opA.id && op.id !== opB.id).slice(0, 3)

  // Criterion data
  const maxBonus = Math.max(opA.bonusAmountNumber, opB.bonusAmountNumber)

  const crits: CritData[] = [
    {
      id: 'note',
      label: 'Note globale',
      num: '01',
      iconPath: 'M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z',
      barA: (opA.rating / 10) * 100,
      barB: (opB.rating / 10) * 100,
      labelA: `${opA.rating}/10`,
      labelB: `${opB.rating}/10`,
      proseA: opA.verdict,
      proseB: opB.verdict,
      winner: opA.rating > opB.rating ? 'a' : opB.rating > opA.rating ? 'b' : 'tie',
      deepA: opA.pros.slice(0, 3),
      deepB: opB.pros.slice(0, 3),
    },
    {
      id: 'bonus',
      label: 'Bonus de bienvenue',
      num: '02',
      iconPath:
        'M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
      barA: maxBonus > 0 ? (opA.bonusAmountNumber / maxBonus) * 100 : 50,
      barB: maxBonus > 0 ? (opB.bonusAmountNumber / maxBonus) * 100 : 50,
      labelA: `${opA.bonusAmount}${opA.bonusSuffix ? ` ${opA.bonusSuffix}` : ''}`,
      labelB: `${opB.bonusAmount}${opB.bonusSuffix ? ` ${opB.bonusSuffix}` : ''}`,
      proseA: `${opA.name} propose ${opA.bonusAmount}${opA.bonusSuffix ? ` ${opA.bonusSuffix}` : ''} avec des conditions de mise de ${opA.bonusConditions}.`,
      proseB: `${opB.name} propose ${opB.bonusAmount}${opB.bonusSuffix ? ` ${opB.bonusSuffix}` : ''} avec des conditions de mise de ${opB.bonusConditions}.`,
      winner:
        opA.bonusAmountNumber > opB.bonusAmountNumber
          ? 'a'
          : opB.bonusAmountNumber > opA.bonusAmountNumber
            ? 'b'
            : 'tie',
      deepA: opA.pros.filter((p) => /bonus|offre/i.test(p)).slice(0, 2),
      deepB: opB.pros.filter((p) => /bonus|offre/i.test(p)).slice(0, 2),
    },
    {
      id: 'rtp',
      label: 'RTP moyen',
      num: '03',
      iconPath: 'M3 3v18h18M7 16l4-4 4 4 4-8',
      barA: Math.min(100, Math.max(0, (opA.rtp - 95) * 25)),
      barB: Math.min(100, Math.max(0, (opB.rtp - 95) * 25)),
      labelA: `${opA.rtp.toFixed(1)}%`,
      labelB: `${opB.rtp.toFixed(1)}%`,
      proseA: `Le RTP moyen déclaré de ${opA.name} est de ${opA.rtp.toFixed(1)}% — en théorie, ${opA.rtp.toFixed(1)}% des mises sont redistribuées sur le long terme.`,
      proseB: `Le RTP moyen déclaré de ${opB.name} est de ${opB.rtp.toFixed(1)}% — en théorie, ${opB.rtp.toFixed(1)}% des mises sont redistribuées sur le long terme.`,
      winner: opA.rtp > opB.rtp ? 'a' : opB.rtp > opA.rtp ? 'b' : 'tie',
      deepA: [],
      deepB: [],
    },
    {
      id: 'paiements',
      label: 'Paiements',
      num: '04',
      iconPath:
        'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z',
      barA: Math.min(100, (opA.paymentMethods.length / 8) * 100),
      barB: Math.min(100, (opB.paymentMethods.length / 8) * 100),
      labelA: `${opA.paymentMethods.length} méthodes`,
      labelB: `${opB.paymentMethods.length} méthodes`,
      proseA: `${opA.name} accepte : ${opA.paymentMethods.join(', ')}.`,
      proseB: `${opB.name} accepte : ${opB.paymentMethods.join(', ')}.`,
      winner:
        opA.paymentMethods.length > opB.paymentMethods.length
          ? 'a'
          : opB.paymentMethods.length > opA.paymentMethods.length
            ? 'b'
            : 'tie',
      deepA: opA.pros.filter((p) => /paiement|virement|retrait|dépôt/i.test(p)).slice(0, 2),
      deepB: opB.pros.filter((p) => /paiement|virement|retrait|dépôt/i.test(p)).slice(0, 2),
    },
    {
      id: 'experience',
      label: 'Expérience',
      num: '05',
      iconPath:
        'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0h10m-10 0H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4M19 14h2a2 2 0 0 1 2 2v4a2 2 0 0 0-2 2h-4m0 0v-11',
      barA: Math.min(100, (opA.features.length / 10) * 100),
      barB: Math.min(100, (opB.features.length / 10) * 100),
      labelA: `${opA.features.length} fonctionnalités`,
      labelB: `${opB.features.length} fonctionnalités`,
      proseA: `${opA.name} : ${opA.features.slice(0, 3).join(', ')}.`,
      proseB: `${opB.name} : ${opB.features.slice(0, 3).join(', ')}.`,
      winner:
        opA.features.length > opB.features.length
          ? 'a'
          : opB.features.length > opA.features.length
            ? 'b'
            : 'tie',
      deepA: opA.pros.filter((p) => !/bonus/i.test(p)).slice(0, 2),
      deepB: opB.pros.filter((p) => !/bonus/i.test(p)).slice(0, 2),
    },
  ]

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: 'Comparatifs', href: '/comparatifs/' },
          { label: `${opA.name} vs ${opB.name}` },
        ]}
      />

      {/* ── HEAD — centered intro ─────────────────────────────────────────── */}
      <section className="pb-4 pt-[44px] text-center" data-page-type="versus" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          {/* Eyebrow — gold lines on both sides */}
          <div className="mb-[16px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green">
            <span
              className="inline-block h-px w-[22px] shrink-0"
              style={{ background: 'var(--gold)' }}
              aria-hidden
            />
            Comparatif 2026
            <span
              className="inline-block h-px w-[22px] shrink-0"
              style={{ background: 'var(--gold)' }}
              aria-hidden
            />
          </div>

          <h1 className="mx-auto mb-[18px] max-w-[19ch] font-serif text-[clamp(31px,4.7vw,52px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {opA.name} <em className="italic text-green">vs</em> {opB.name}
          </h1>

          <p className="m-0 mx-auto max-w-[64ch] text-[17.5px] leading-[1.62] text-ink-2">
            {isFr
              ? `Analyse comparative sur 5 critères clés — bonus, RTP, paiements, expérience et note globale — pour vous aider à choisir entre ${opA.name} et ${opB.name}.`
              : `A comparative analysis across 5 key criteria — bonuses, RTP, payments, UX and overall score — to help you choose between ${opA.name} and ${opB.name}.`}
          </p>

          {/* Head meta */}
          <div className="mt-[20px] inline-flex flex-wrap items-center justify-center gap-[8px_18px] text-[13px] text-ink-3">
            <span className="inline-flex items-center gap-[7px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[14px] w-[14px] text-green"
                aria-hidden
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Mis à jour juin 2026
            </span>
            <span className="inline-flex items-center gap-[7px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[14px] w-[14px] text-green"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              5 min de lecture
            </span>
          </div>

          {/* ── Dir-A hero face-off ───────────────────────────────────────── */}
          <div
            className="mt-[30px]"
            style={{ display: 'grid', gridTemplateColumns: '1fr 70px 1fr' }}
          >
            {/* Panel A */}
            <div
              className="flex flex-col items-center gap-[13px] border border-line bg-surface p-[26px_24px] shadow-1"
              style={{
                borderRadius: 'var(--radius-xl) 0 0 var(--radius-xl)',
                borderRight: 0,
                ...(winA
                  ? {
                      borderTopWidth: '3px',
                      borderTopColor: 'var(--green)',
                      borderColor: 'color-mix(in srgb,var(--green) 40%,var(--line))',
                    }
                  : {}),
              }}
            >
              {winA ? (
                <p className="m-0 inline-flex items-center gap-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-green">
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
                  Recommandé
                </p>
              ) : (
                <p className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-ink-3">
                  Alternative
                </p>
              )}
              <LogoPh name={opA.name} />
              <p className="m-0 font-serif text-[24px] font-semibold tracking-[-0.01em] text-ink">
                {opA.name}
              </p>
              <p className="m-0 text-[13.5px] text-ink-2">
                Bonus{' '}
                <b className="font-serif text-[18px] font-semibold text-ink">
                  <span className="text-green">{opA.bonusAmount}</span>
                  {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                </b>
              </p>
              <ScorePill score={opA.rating} gold={winA} />
              <CTAButton
                href={opA.affiliateUrl}
                variant="primary"
                arrow
                block
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={opA.slug}
                data-placement="versus_hero"
                data-bonus={opA.bonusSlug}
                data-page-type="versus"
                data-locale={locale}
              >
                {isFr ? 'Obtenir le bonus' : 'Claim bonus'}
              </CTAButton>
              <a
                href={`/casinos/${opA.slug}/`}
                className="font-mono text-[12px] text-ink-3 no-underline hover:text-green"
                data-event="review_click"
                data-operator={opA.slug}
                data-page-type="versus"
                data-locale={locale}
              >
                {isFr ? "Lire l'avis →" : 'Read review →'}
              </a>
            </div>

            {/* VS badge column */}
            <div className="grid place-items-center">
              <div
                className="grid h-[60px] w-[60px] place-items-center rounded-full border-4 font-serif text-[21px] font-semibold italic shadow-3"
                style={{ background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--bg)' }}
                aria-hidden
              >
                vs
              </div>
            </div>

            {/* Panel B */}
            <div
              className="flex flex-col items-center gap-[13px] border border-line bg-surface p-[26px_24px] shadow-1"
              style={{
                borderRadius: '0 var(--radius-xl) var(--radius-xl) 0',
                borderLeft: 0,
                ...(winB
                  ? {
                      borderTopWidth: '3px',
                      borderTopColor: 'var(--green)',
                      borderColor: 'color-mix(in srgb,var(--green) 40%,var(--line))',
                    }
                  : {}),
              }}
            >
              {winB ? (
                <p className="m-0 inline-flex items-center gap-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-green">
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
                  Recommandé
                </p>
              ) : (
                <p className="m-0 font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-ink-3">
                  Alternative
                </p>
              )}
              <LogoPh name={opB.name} />
              <p className="m-0 font-serif text-[24px] font-semibold tracking-[-0.01em] text-ink">
                {opB.name}
              </p>
              <p className="m-0 text-[13.5px] text-ink-2">
                Bonus{' '}
                <b className="font-serif text-[18px] font-semibold text-ink">
                  <span className="text-green">{opB.bonusAmount}</span>
                  {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                </b>
              </p>
              <ScorePill score={opB.rating} gold={winB} />
              <CTAButton
                href={opB.affiliateUrl}
                variant="primary"
                arrow
                block
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={opB.slug}
                data-placement="versus_hero"
                data-bonus={opB.bonusSlug}
                data-page-type="versus"
                data-locale={locale}
              >
                {isFr ? 'Obtenir le bonus' : 'Claim bonus'}
              </CTAButton>
              <a
                href={`/casinos/${opB.slug}/`}
                className="font-mono text-[12px] text-ink-3 no-underline hover:text-green"
                data-event="review_click"
                data-operator={opB.slug}
                data-page-type="versus"
                data-locale={locale}
              >
                {isFr ? "Lire l'avis →" : 'Read review →'}
              </a>
            </div>
          </div>

          {/* Sentinel for sticky compare bar */}
          <div data-compare-sentinel aria-hidden />
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* ── AT-A-GLANCE TABLE ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <SectionLabel
            num="01"
            title="Vue d'ensemble"
            intro={`Résumé des points clés pour choisir entre ${opA.name} et ${opB.name}.`}
          />
          <div className="overflow-x-auto rounded-xl border border-line shadow-1">
            <table className="w-full border-collapse bg-surface">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th className="w-[27%] px-[18px] py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    Critère
                  </th>
                  <th className="px-[18px] py-[13px] text-center font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    {opA.name}
                  </th>
                  <th className="px-[18px] py-[13px] text-center font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                    {opB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    {
                      label: 'Note globale',
                      a: <ScorePill score={opA.rating} gold={opA.rating > opB.rating} />,
                      b: <ScorePill score={opB.rating} gold={opB.rating > opA.rating} />,
                      winA: opA.rating > opB.rating,
                      winB: opB.rating > opA.rating,
                    },
                    {
                      label: 'Bonus',
                      a: (
                        <>
                          {opA.bonusAmount}
                          {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                        </>
                      ),
                      b: (
                        <>
                          {opB.bonusAmount}
                          {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                        </>
                      ),
                      winA: opA.bonusAmountNumber > opB.bonusAmountNumber,
                      winB: opB.bonusAmountNumber > opA.bonusAmountNumber,
                    },
                    {
                      label: 'Conditions',
                      a: <span className="font-mono text-[13px]">{opA.bonusConditions}</span>,
                      b: <span className="font-mono text-[13px]">{opB.bonusConditions}</span>,
                      winA: false,
                      winB: false,
                    },
                    {
                      label: 'RTP moyen',
                      a: <span className="font-mono">{opA.rtp.toFixed(1)}%</span>,
                      b: <span className="font-mono">{opB.rtp.toFixed(1)}%</span>,
                      winA: opA.rtp > opB.rtp,
                      winB: opB.rtp > opA.rtp,
                    },
                    {
                      label: 'Licence',
                      a: opA.licence,
                      b: opB.licence,
                      winA: false,
                      winB: false,
                    },
                    {
                      label: 'Paiements',
                      a: opA.paymentMethods.join(', '),
                      b: opB.paymentMethods.join(', '),
                      winA: opA.paymentMethods.length > opB.paymentMethods.length,
                      winB: opB.paymentMethods.length > opA.paymentMethods.length,
                    },
                  ] as const
                ).map((row, i) => (
                  <tr key={i} className="border-b border-line last:border-b-0">
                    <td className="bg-surface-2 px-[18px] py-[14px] font-mono text-[11.5px] uppercase tracking-[0.04em] text-ink-3">
                      {row.label}
                    </td>
                    <td
                      className={`px-[18px] py-[14px] text-center align-middle text-[14.5px] ${row.winA ? 'bg-green-50 font-bold text-ink' : 'text-ink-2'}`}
                    >
                      {row.a}
                      {row.winA && (
                        <span className="ml-[7px] font-extrabold text-green" aria-hidden>
                          ✓
                        </span>
                      )}
                    </td>
                    <td
                      className={`px-[18px] py-[14px] text-center align-middle text-[14.5px] ${row.winB ? 'bg-green-50 font-bold text-ink' : 'text-ink-2'}`}
                    >
                      {row.b}
                      {row.winB && (
                        <span className="ml-[7px] font-extrabold text-green" aria-hidden>
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

      {/* ── CRITERION BLOCKS ─────────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <SectionLabel
            num="02"
            title="Analyse détaillée"
            intro={`Comparaison critère par critère de ${opA.name} et ${opB.name}, avec des données mesurables.`}
          />
          <VersusCrits
            crits={crits}
            nameA={opA.name}
            slugA={opA.slug}
            nameB={opB.name}
            slugB={opB.slug}
            winnerSlug={winner.slug}
            locale={locale}
          />
        </div>
      </section>

      {/* ── WAGER SIMULATOR ──────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <SectionLabel
            num="03"
            title="Simulateur de mise"
            intro="Comparez le coût réel de chaque bonus selon votre dépôt cible. La perte statistique estimée dépend du RTP déclaré."
          />
          <WagerSimulator
            opA={{
              name: opA.name,
              slug: opA.slug,
              rtp: opA.rtp,
              wagerX: parseWager(opA.bonusConditions),
              affiliateUrl: opA.affiliateUrl,
              bonusSlug: opA.bonusSlug,
              isWinner: winA,
            }}
            opB={{
              name: opB.name,
              slug: opB.slug,
              rtp: opB.rtp,
              wagerX: parseWager(opB.bonusConditions),
              affiliateUrl: opB.affiliateUrl,
              bonusSlug: opB.bonusSlug,
              isWinner: winB,
            }}
            locale={locale}
          />
        </div>
      </section>

      {/* ── VERDICT & FINAL RECS ─────────────────────────────────────────── */}
      <section className="border-t border-line bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <SectionLabel num="04" title="Notre verdict" />

          {/* Verdict card */}
          <div className="mb-8 rounded-xl border-l-4 border-line border-l-green bg-surface p-[24px_26px] shadow-1">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-green">
              Conclusion
            </p>
            <p className="m-0 font-serif text-[17px] leading-[1.6] text-ink">
              {opA.rating >= opB.rating
                ? `${opA.name} sort vainqueur avec une note de ${opA.rating}/10 contre ${opB.rating}/10 pour ${opB.name}. ${winner.tagline}`
                : `${opB.name} sort vainqueur avec une note de ${opB.rating}/10 contre ${opA.rating}/10 pour ${opA.name}. ${winner.tagline}`}
            </p>
          </div>

          {/* Final rec cards */}
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
            {[winner, winner.slug === opA.slug ? opB : opA].map((op, i) => {
              const isWin = i === 0
              const pros = op.pros.slice(0, 3)
              return (
                <div
                  key={op.id}
                  className={`flex flex-col rounded-xl border bg-surface p-[26px] shadow-1 ${isWin ? 'border-[color-mix(in_srgb,var(--green)_40%,var(--line))] shadow-2' : 'border-line'}`}
                >
                  <div className="mb-4 flex items-center gap-[12px]">
                    <LogoPh name={op.name} className="h-[34px] w-[100px]" />
                    <ScorePill score={op.rating} gold={isWin} />
                  </div>
                  <h3 className="m-0 mb-[14px] font-serif text-[20px] font-semibold text-ink">
                    {isWin ? `Choisissez ${op.name} si…` : `Choisissez ${op.name} si…`}
                  </h3>
                  <ul className="mb-[20px] flex flex-col gap-[11px]">
                    {pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-[10px] text-[14px] leading-[1.5] text-ink-2"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className={`mt-[2px] h-[16px] w-[16px] shrink-0 ${isWin ? 'text-green' : 'text-ink-3'}`}
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
                    variant={isWin ? 'primary' : 'secondary'}
                    arrow={isWin}
                    block
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-auto"
                    data-event="affiliate_click"
                    data-operator={op.slug}
                    data-placement={isWin ? 'versus_final_winner' : 'versus_final_alt'}
                    data-bonus={op.bonusSlug}
                    data-page-type="versus"
                    data-locale={locale}
                  >
                    {isWin ? `Obtenir le bonus ${op.name}` : `Voir ${op.name}`}
                  </CTAButton>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── NI L'UN NI L'AUTRE — alternatives ───────────────────────────── */}
      {alts.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-site px-[18px] md:px-8">
            <div
              className="rounded-xl border border-line p-[32px]"
              style={{ background: 'var(--bg-sunken)' }}
            >
              <div className="mx-auto mb-[24px] max-w-[60ch] text-center">
                <span className="mb-[10px] block font-mono text-[11px] uppercase tracking-[0.12em] text-green">
                  Ni l&apos;un ni l&apos;autre ?
                </span>
                <h3 className="m-0 mb-[10px] font-serif text-[clamp(22px,2.6vw,28px)] font-medium tracking-[-0.01em] text-ink">
                  Explorez d&apos;autres casinos
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-ink-2">
                  {opA.name} et {opB.name} ne vous convainquent pas ? Voici nos meilleures
                  alternatives testées en 2026.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
                {alts.map((op) => (
                  <div
                    key={op.id}
                    className="flex flex-col gap-[13px] rounded-xl border border-line bg-surface p-[20px] shadow-1 transition-[transform,box-shadow,border-color] duration-[180ms] hover:-translate-y-[3px] hover:border-line-2 hover:shadow-3"
                  >
                    <div className="flex items-center gap-[11px]">
                      <LogoPh name={op.name} className="h-[30px] w-[78px]" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[15px] font-bold text-ink">{op.name}</div>
                        <div className="mt-[1px] font-mono text-[10.5px] text-ink-3">
                          {op.licence}
                        </div>
                      </div>
                      <ScorePill score={op.rating} className="text-[14px]" />
                    </div>
                    <p className="m-0 text-[13px] leading-[1.55] text-ink-2">{op.tagline}</p>
                    <div
                      className="flex items-baseline gap-[7px] rounded border p-[11px_13px]"
                      style={{
                        background: 'var(--green-50)',
                        borderColor: 'color-mix(in srgb,var(--green) 22%,var(--line))',
                      }}
                    >
                      <span className="font-serif text-[19px] font-semibold text-ink">
                        <span className="text-green">{op.bonusAmount}</span>
                        {op.bonusSuffix && ` ${op.bonusSuffix}`}
                      </span>
                      <span className="ml-auto text-[11.5px] text-ink-3">
                        {op.bonusConditions.split('·')[0]?.trim()}
                      </span>
                    </div>
                    <div className="mt-auto flex flex-col gap-[8px]">
                      <CTAButton
                        href={op.affiliateUrl}
                        variant="primary"
                        arrow
                        block
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        data-event="affiliate_click"
                        data-operator={op.slug}
                        data-placement="versus_alternatives"
                        data-bonus={op.bonusSlug}
                        data-page-type="versus"
                        data-locale={locale}
                      >
                        Obtenir le bonus
                      </CTAButton>
                      <a
                        href={`/casinos/${op.slug}/`}
                        className="block text-center font-mono text-[12px] text-ink-3 no-underline hover:text-green"
                        data-event="review_click"
                        data-operator={op.slug}
                        data-page-type="versus"
                        data-locale={locale}
                      >
                        Lire l&apos;avis →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY COMPARE BAR ───────────────────────────────────────────── */}
      <VersusCompareBar opA={opA} opB={opB} winnerSlug={winner.slug} locale={locale} />
    </>
  )
}
