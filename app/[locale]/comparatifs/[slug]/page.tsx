import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { ScorePill } from '@/components/ui/score-pill'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug, operators } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'

// Handles both versus (/comparatifs/cresus-vs-lucky8/) and generic comparatif slugs

function parseVersusSlug(slug: string): [string, string] | null {
  const parts = slug.split('-vs-')
  if (parts.length === 2 && parts[0] && parts[1]) {
    return [parts[0], parts[1]]
  }
  return null
}

export async function generateStaticParams() {
  // Generate versus pages for top 5 operators (5×4/2 = 10 pairs)
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
      ? `On compare ${opA.name} (${opA.rating}/10) et ${opB.name} (${opB.rating}/10) : bonus, retraits, ludothèque et support. Quel casino choisir ?`
      : `We compare ${opA.name} (${opA.rating}/10) and ${opB.name} (${opB.rating}/10): bonuses, withdrawals, game library and support.`,
    alternates: {
      languages: buildHreflang(`/comparatifs/${slug}/`),
    },
  }
}

function CompareRow({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <tr className="border-b border-line last:border-b-0">
      <td className="w-[30%] bg-surface-2 px-5 py-[13px] text-[13.5px] font-semibold text-ink">
        {label}
      </td>
      <td className="px-5 py-[13px] text-[14px] text-ink-2">{a}</td>
      <td className="px-5 py-[13px] text-[14px] text-ink-2">{b}</td>
    </tr>
  )
}

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex h-10 w-[110px] items-center justify-center rounded border border-dashed border-line-2 font-mono text-[10px] text-ink-3"
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
      }}
    >
      {name}
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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: 'Comparatifs', href: '/comparatifs/' },
          { label: `${opA.name} vs ${opB.name}` },
        ]}
      />

      <section className="py-10" data-page-type="versus" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            Comparatif 2026
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(28px,4vw,46px)] font-medium leading-tight tracking-[-0.02em] text-ink">
            {opA.name} <span className="text-ink-3">vs</span> {opB.name}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] text-ink-2">
            {isFr
              ? `Nous comparons deux casinos populaires sur 6 critères clés pour vous aider à choisir.`
              : `We compare two popular casinos on 6 key criteria to help you choose.`}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* Head-to-head cards */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            Vue d&apos;ensemble
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[opA, opB].map((op) => (
              <div
                key={op.id}
                className={`rounded-xl border bg-surface p-6 shadow-1 ${op.slug === winner.slug ? 'border-[color-mix(in_srgb,var(--gold)_40%,var(--line))]' : 'border-line'}`}
              >
                {op.slug === winner.slug && (
                  <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-gold-ink">
                    ★ Recommandé
                  </p>
                )}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <LogoPlaceholder name={op.shortName ?? op.name} />
                  <ScorePill score={op.rating} gold={op.slug === winner.slug} />
                </div>
                <h3 className="mb-1 font-serif text-[22px] font-semibold text-ink">{op.name}</h3>
                <p className="mb-4 text-sm text-ink-2">{op.tagline}</p>
                <p className="mb-4 text-[15px] text-ink-2">
                  <span className="font-serif text-[19px] font-semibold text-green">
                    {op.bonusAmount}
                  </span>
                  {op.bonusSuffix && ` ${op.bonusSuffix}`}
                  <span className="ml-2 text-xs text-ink-3">{op.bonusConditions}</span>
                </p>
                <div className="flex gap-2">
                  <CTAButton
                    href={op.affiliateUrl}
                    variant="primary"
                    size="sm"
                    arrow
                    block
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={op.slug}
                    data-placement="versus_card"
                    data-bonus={op.bonusSlug}
                    data-page-type="versus"
                    data-locale={locale}
                  >
                    Obtenir le bonus
                  </CTAButton>
                  <CTAButton
                    href={`/casinos/${op.slug}/`}
                    variant="secondary"
                    size="sm"
                    data-event="review_click"
                    data-operator={op.slug}
                  >
                    Avis
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h2 className="mb-4 mt-12 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            Comparatif détaillé
          </h2>
          <div className="overflow-x-auto rounded-lg border border-line shadow-1">
            <table className="w-full border-collapse bg-surface">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th className="px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    Critère
                  </th>
                  <th className="px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {opA.name}
                  </th>
                  <th className="px-5 py-[14px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {opB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label="Note globale"
                  a={<ScorePill score={opA.rating} gold={opA.rating > opB.rating} />}
                  b={<ScorePill score={opB.rating} gold={opB.rating > opA.rating} />}
                />
                <CompareRow
                  label="Bonus de bienvenue"
                  a={
                    <>
                      {opA.bonusAmount}
                      {opA.bonusSuffix && ` ${opA.bonusSuffix}`}
                    </>
                  }
                  b={
                    <>
                      {opB.bonusAmount}
                      {opB.bonusSuffix && ` ${opB.bonusSuffix}`}
                    </>
                  }
                />
                <CompareRow
                  label="Conditions de bonus"
                  a={opA.bonusConditions}
                  b={opB.bonusConditions}
                />
                <CompareRow
                  label="RTP moyen"
                  a={<span className="font-mono">{opA.rtp.toFixed(1)}%</span>}
                  b={<span className="font-mono">{opB.rtp.toFixed(1)}%</span>}
                />
                <CompareRow label="Licence" a={opA.licence} b={opB.licence} />
                <CompareRow
                  label="Paiements"
                  a={opA.paymentMethods.join(', ')}
                  b={opB.paymentMethods.join(', ')}
                />
              </tbody>
            </table>
          </div>

          {/* Pros/cons */}
          <h2 className="mb-4 mt-12 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {opA.name}
          </h2>
          <ProsConsBox pros={opA.pros} cons={opA.cons} />

          <h2 className="mb-4 mt-8 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {opB.name}
          </h2>
          <ProsConsBox pros={opB.pros} cons={opB.cons} />

          {/* Verdict */}
          <div className="mt-10 rounded-lg border border-l-4 border-line border-l-green bg-surface p-[24px_26px] shadow-1">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-green">
              Notre verdict
            </p>
            <p className="m-0 font-serif text-[17px] leading-[1.6] text-ink">
              {opA.rating >= opB.rating
                ? `${opA.name} sort vainqueur avec une note de ${opA.rating}/10 contre ${opB.rating}/10 pour ${opB.name}. ${winner.tagline}`
                : `${opB.name} sort vainqueur avec une note de ${opB.rating}/10 contre ${opA.rating}/10 pour ${opA.name}. ${winner.tagline}`}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
