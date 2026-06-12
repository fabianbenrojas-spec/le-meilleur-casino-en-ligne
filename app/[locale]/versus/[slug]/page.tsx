import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { LogoOrPlaceholder } from '@/components/ui/operator-card'
import { ScorePill } from '@/components/ui/score-pill'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug } from '@/config/operators'
import { versusMatchups, versusMatchupBySlug } from '@/config/versus-content'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return versusMatchups.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const matchup = versusMatchupBySlug.get(slug)
  if (!matchup) return {}
  const opA = operatorBySlug.get(matchup.slugA)
  const opB = operatorBySlug.get(matchup.slugB)
  if (!opA || !opB) return {}
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `${opA.name} vs ${opB.name} : lequel choisir en 2026 ?`
      : `${opA.name} vs ${opB.name}: which to choose in 2026?`,
    description: isFr
      ? `${opA.name} vs ${opB.name} : face-à-face sur le bonus, les jeux, les retraits, le support et la sécurité. Notre verdict par critère. 18+`
      : `${opA.name} vs ${opB.name}: head-to-head on bonus, games, withdrawals, support and security. Our verdict by criterion. 18+`,
    alternates: { languages: buildHreflang(`/versus/${slug}/`) },
  }
}

export default async function VersusPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const matchup = versusMatchupBySlug.get(slug)
  if (!matchup) notFound()

  const opA = operatorBySlug.get(matchup.slugA)
  const opB = operatorBySlug.get(matchup.slugB)
  if (!opA || !opB) notFound()

  const isFr = locale === 'fr'
  const winner = matchup.winner === 'a' ? opA : opB
  const challenger = matchup.winner === 'a' ? opB : opA

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
          { label: `${opA.shortName ?? opA.name} vs ${opB.shortName ?? opB.name}` },
        ]}
        locale={locale}
      />

      {/* ── Hero head ────────────────────────────────────────────────────── */}
      <section className="pb-4 pt-10" data-page-type="versus" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Face-à-face' : 'Head-to-head'}
          </div>
          <h1 className="mb-[14px] font-serif text-[clamp(28px,4.2vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {opA.name} <em className="italic text-green">vs</em> {opB.name}
            {isFr ? ' : lequel choisir en 2026 ?' : ': which to choose in 2026?'}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">{matchup.intro}</p>
        </div>
      </section>

      {/* ── VS hero panels ───────────────────────────────────────────────── */}
      <section className="pb-0 pt-4">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-[1fr_64px_1fr] items-stretch gap-0 overflow-hidden rounded-xl border border-line bg-surface shadow-2 sm:grid-cols-1">
            {/* Winner panel */}
            <div className="relative flex flex-col items-center gap-4 p-8 text-center sm:pb-4">
              <div className="absolute left-3 top-3 inline-flex items-center gap-[6px] rounded-full border border-[color-mix(in_srgb,var(--green)_30%,var(--line))] bg-green-50 px-[10px] py-[4px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-green">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-[11px] w-[11px]"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {isFr ? 'Notre préféré' : 'Our pick'}
              </div>
              <div className="mt-6">
                <LogoOrPlaceholder
                  logoUrl={winner.logoUrl}
                  name={winner.name}
                  width={120}
                  height={44}
                />
              </div>
              <div className="font-serif text-[20px] font-semibold text-ink">{winner.name}</div>
              <ScorePill score={winner.rating} gold />
              <div className="text-[13.5px] text-ink-2">
                <strong className="text-green">{winner.bonusAmount}</strong>
                {winner.bonusSuffix && ` ${winner.bonusSuffix}`}
                {' · '}
                {winner.bonusConditions.split('·')[0]?.trim()}
              </div>
            </div>

            {/* VS divider */}
            <div className="flex items-center justify-center border-x border-line bg-bg-sunken sm:border-x-0 sm:border-y">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface font-mono text-[13px] font-bold text-ink-2">
                VS
              </div>
            </div>

            {/* Challenger panel */}
            <div className="relative flex flex-col items-center gap-4 p-8 text-center sm:pt-4">
              <div className="absolute left-3 top-3 inline-flex items-center gap-[6px] rounded-full border border-line bg-bg-sunken px-[10px] py-[4px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                {isFr ? 'Le challenger' : 'The challenger'}
              </div>
              <div className="mt-6">
                <LogoOrPlaceholder
                  logoUrl={challenger.logoUrl}
                  name={challenger.name}
                  width={120}
                  height={44}
                />
              </div>
              <div className="font-serif text-[20px] font-semibold text-ink">{challenger.name}</div>
              <ScorePill score={challenger.rating} />
              <div className="text-[13.5px] text-ink-2">
                <strong className="text-ink">{challenger.bonusAmount}</strong>
                {challenger.bonusSuffix && ` ${challenger.bonusSuffix}`}
                {' · '}
                {challenger.bonusConditions.split('·')[0]?.trim()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── Section 01 — Quick comparison table ──────────────────────────── */}
      <section className="pb-0 pt-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-3 font-mono text-[14px] font-medium text-green">01</span>
            {isFr ? 'Le face-à-face en un coup d’œil' : 'Head-to-head at a glance'}
          </h2>
          <div className="overflow-hidden rounded-xl border border-line shadow-1">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-line bg-bg-sunken">
                  <th className="px-5 py-3 text-left font-serif text-[15px] font-semibold text-ink">
                    {opA.shortName ?? opA.name}
                  </th>
                  <th className="border-x border-line px-4 py-3 text-center font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                    {isFr ? 'Critère' : 'Criterion'}
                  </th>
                  <th className="px-5 py-3 text-right font-serif text-[15px] font-semibold text-ink">
                    {opB.shortName ?? opB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {matchup.criteria.map((row) => {
                  const aWins = row.winner === 'a'
                  const bWins = row.winner === 'b'
                  return (
                    <tr
                      key={row.label}
                      className="hover:bg-bg-sunken/40 border-b border-line last:border-b-0"
                    >
                      <td
                        className={`px-5 py-[11px] font-medium ${aWins ? 'text-green' : 'text-ink-2'}`}
                      >
                        {aWins && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="mr-[6px] inline h-[13px] w-[13px] text-green"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                        {row.a}
                      </td>
                      <td className="border-x border-line px-4 py-[11px] text-center font-mono text-[11.5px] text-ink-3">
                        {row.label}
                      </td>
                      <td
                        className={`px-5 py-[11px] text-right font-medium ${bWins ? 'text-green' : 'text-ink-2'}`}
                      >
                        {row.b}
                        {bWins && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="ml-[6px] inline h-[13px] w-[13px] text-green"
                            aria-hidden
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 02 — Criterion by criterion ──────────────────────────── */}
      <section className="bg-bg-sunken py-14">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-3 font-mono text-[14px] font-medium text-green">02</span>
            {isFr ? 'Le détail, critère par critère' : 'Detailed breakdown, criterion by criterion'}
          </h2>
          <p className="mb-8 text-[15px] text-ink-2">
            {isFr
              ? 'Chaque critère analysé avec notre test à argent réel.'
              : 'Each criterion analysed with our real-money testing.'}
          </p>

          <div className="flex flex-col gap-5">
            {matchup.sections.map((sec) => {
              const isTie = sec.winner === 'tie'
              const aWins = sec.winner === 'a'
              return (
                <div
                  key={sec.criterion}
                  className="overflow-hidden rounded-xl border border-line bg-surface shadow-1"
                >
                  {/* Section header */}
                  <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                    <h3 className="font-serif text-[17px] font-semibold text-ink">
                      {sec.criterion}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-[6px] rounded-full border px-[10px] py-[3px] font-mono text-[10.5px] font-semibold ${
                        isTie
                          ? 'border-line bg-bg-sunken text-ink-3'
                          : 'border-[color-mix(in_srgb,var(--green)_30%,var(--line))] bg-green-50 text-green'
                      }`}
                    >
                      {!isTie && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="h-[10px] w-[10px]"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                      {sec.winnerLabel}
                    </span>
                  </div>

                  {/* Split content */}
                  <div className="grid grid-cols-[1fr_1px_1fr] sm:grid-cols-1">
                    {/* Op A */}
                    <div
                      className={`p-6 ${aWins ? 'bg-[color-mix(in_srgb,var(--green)_4%,var(--surface))]' : ''}`}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <LogoOrPlaceholder
                          logoUrl={opA.logoUrl}
                          name={opA.name}
                          width={80}
                          height={30}
                        />
                        <ScorePill score={opA.rating} gold={aWins} />
                      </div>
                      <p className="m-0 text-[14px] leading-[1.65] text-ink-2">{sec.aText}</p>
                    </div>

                    {/* Divider */}
                    <div className="bg-line sm:h-px sm:w-full" aria-hidden />

                    {/* Op B */}
                    <div
                      className={`p-6 ${sec.winner === 'b' ? 'bg-[color-mix(in_srgb,var(--green)_4%,var(--surface))]' : ''}`}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <LogoOrPlaceholder
                          logoUrl={opB.logoUrl}
                          name={opB.name}
                          width={80}
                          height={30}
                        />
                        <ScorePill score={opB.rating} gold={sec.winner === 'b'} />
                      </div>
                      <p className="m-0 text-[14px] leading-[1.65] text-ink-2">{sec.bText}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section 03 — Verdict ─────────────────────────────────────────── */}
      <section className="py-14">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-3 font-mono text-[14px] font-medium text-green">03</span>
            {isFr ? 'Verdict : lequel choisir ?' : 'Verdict: which to choose?'}
          </h2>
          <p className="mb-8 max-w-[62ch] text-[15.5px] leading-[1.6] text-ink-2">
            {matchup.verdictIntro}
          </p>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-1">
            {/* Winner card */}
            <div className="flex flex-col gap-5 rounded-xl border border-[color-mix(in_srgb,var(--green)_30%,var(--line))] bg-surface p-7 shadow-2">
              <div className="flex items-center gap-3">
                <LogoOrPlaceholder
                  logoUrl={winner.logoUrl}
                  name={winner.name}
                  width={100}
                  height={38}
                />
                <ScorePill score={winner.rating} gold />
              </div>
              <h3 className="m-0 font-serif text-[18px] font-semibold text-ink">
                {isFr
                  ? `Choisissez ${winner.shortName ?? winner.name} si…`
                  : `Choose ${winner.shortName ?? winner.name} if…`}
              </h3>
              <ul className="flex flex-col gap-[10px]">
                {matchup.verdictA.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-[10px] text-[14px] leading-[1.5] text-ink-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-[2px] h-[15px] w-[15px] shrink-0 text-green"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {reason}
                  </li>
                ))}
              </ul>
              <CTAButton
                href={winner.affiliateUrl}
                variant="primary"
                block
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={winner.slug}
                data-placement="versus_verdict"
                data-bonus={winner.bonusSlug}
                data-page-type="versus"
                data-locale={locale}
                className="mt-auto"
              >
                {isFr
                  ? `Obtenir le bonus ${winner.shortName ?? winner.name}`
                  : `Get ${winner.shortName ?? winner.name} bonus`}
              </CTAButton>
            </div>

            {/* Challenger card */}
            <div className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-7 shadow-1">
              <div className="flex items-center gap-3">
                <LogoOrPlaceholder
                  logoUrl={challenger.logoUrl}
                  name={challenger.name}
                  width={100}
                  height={38}
                />
                <ScorePill score={challenger.rating} />
              </div>
              <h3 className="m-0 font-serif text-[18px] font-semibold text-ink">
                {isFr
                  ? `Choisissez ${challenger.shortName ?? challenger.name} si…`
                  : `Choose ${challenger.shortName ?? challenger.name} if…`}
              </h3>
              <ul className="flex flex-col gap-[10px]">
                {matchup.verdictB.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-[10px] text-[14px] leading-[1.5] text-ink-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-[2px] h-[15px] w-[15px] shrink-0 text-green"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {reason}
                  </li>
                ))}
              </ul>
              <CTAButton
                href={challenger.affiliateUrl}
                variant="secondary"
                block
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={challenger.slug}
                data-placement="versus_verdict"
                data-bonus={challenger.bonusSlug}
                data-page-type="versus"
                data-locale={locale}
                className="mt-auto"
              >
                {isFr
                  ? `Obtenir le bonus ${challenger.shortName ?? challenger.name}`
                  : `Get ${challenger.shortName ?? challenger.name} bonus`}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
