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

  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `Les meilleures alternatives à ${op.name} en 2026`
      : `Best ${op.name} Alternatives in 2026`,
    description: isFr
      ? `${op.name} reste notre n°1, mais ce n'est pas le casino idéal pour tout le monde. Voici 5 alternatives testées à l'argent réel.`
      : `${op.name} is our top pick, but not ideal for everyone. Here are 5 real-money tested alternatives.`,
    alternates: { languages: buildHreflang(`/alternatives/${slug}/`) },
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractWager(conditions: string): number {
  const m = conditions.match(/(\d+)×/)
  return m ? parseInt(m[1]!, 10) : 40
}

function getWhyConsider(alt: Operator, ref: Operator, isFr: boolean): string {
  const altWager = extractWager(alt.bonusConditions)
  const refWager = extractWager(ref.bonusConditions)
  const rtpDiff = alt.rtp - ref.rtp

  if (alt.bonusAmountNumber > ref.bonusAmountNumber * 1.3) {
    return isFr
      ? `Si vous voulez un bonus plus élevé : ${alt.bonusAmount}${alt.bonusSuffix ? ` ${alt.bonusSuffix}` : ''} contre ${ref.bonusAmount}${ref.bonusSuffix ? ` ${ref.bonusSuffix}` : ''} chez ${ref.name}.`
      : `If you want a larger bonus: ${alt.bonusAmount}${alt.bonusSuffix ? ` ${alt.bonusSuffix}` : ''} vs ${ref.bonusAmount}${ref.bonusSuffix ? ` ${ref.bonusSuffix}` : ''} at ${ref.name}.`
  }
  if (rtpDiff >= 0.3) {
    return isFr
      ? `Si le RTP vous importe : ${alt.name} offre ${alt.rtp.toFixed(1)} % de RTP moyen, soit ${rtpDiff.toFixed(1)} point${rtpDiff >= 1 ? 's' : ''} de plus que ${ref.name}.`
      : `If RTP matters to you: ${alt.name} offers ${alt.rtp.toFixed(1)}% avg. RTP, ${rtpDiff.toFixed(1)} point${rtpDiff >= 1 ? 's' : ''} higher than ${ref.name}.`
  }
  if (altWager < refWager) {
    return isFr
      ? `Si vous cherchez un wager plus clément : ${altWager}× chez ${alt.name} contre ${refWager}× chez ${ref.name}.`
      : `If you want easier wagering: ${altWager}× at ${alt.name} vs ${refWager}× at ${ref.name}.`
  }
  return isFr
    ? `Si vous souhaitez une alternative sérieuse à ${ref.name} : ${alt.tagline}`
    : `If you want a solid alternative to ${ref.name}: ${alt.tagline}`
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const op = operatorBySlug.get(slug)
  if (!op) notFound()

  const isFr = locale === 'fr'

  const alternatives = operators
    .filter((o) => o.slug !== slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  const itemListSchema: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? `Les meilleures alternatives à ${op.name} (2026)`
      : `Best alternatives to ${op.name} (2026)`,
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: alt.name,
      url: `https://www.le-meilleur-casino-en-ligne.fr/casinos/${alt.slug}/`,
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
            label: isFr ? 'Alternatives' : 'Alternatives',
            href: isFr ? '/alternatives/' : '/en/alternatives/',
          },
          {
            label: isFr ? `Alternatives à ${op.name}` : `${op.name} Alternatives`,
          },
        ]}
        locale={locale}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="pb-4 pt-10" data-page-type="alternative" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-green">
            {isFr ? 'Alternatives' : 'Alternatives'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(28px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Les meilleures{' '}
                <em className="italic not-italic text-green">alternatives à {op.name}</em> en 2026
              </>
            ) : (
              <>
                The best <em className="italic not-italic text-green">alternatives to {op.name}</em>{' '}
                in 2026
              </>
            )}
          </h1>
          <p className="mb-6 max-w-[64ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? `${op.name} reste notre n°1, mais ce n'est pas le casino idéal pour tout le monde. Bonus plafonné, pas de licence européenne, ou vous cherchez des tournois — selon vos priorités, l'un de ces casinos vous conviendra peut-être mieux.`
              : `${op.name} is our top pick, but not ideal for everyone. Capped bonus, no European licence, or you want tournaments — depending on your priorities, one of these casinos may suit you better.`}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-[13.5px] text-ink-2">
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 shrink-0 text-green"
                aria-hidden
              >
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {isFr
                ? `${alternatives.length} alternatives testées`
                : `${alternatives.length} alternatives tested`}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4 shrink-0 text-green"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {isFr ? 'Mis à jour le 6 juin 2026' : 'Updated 6 June 2026'}
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-ink">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface-2 text-[11px] font-bold text-ink-3">
                JM
              </span>
              Julien Marchand · {isFr ? 'Rédacteur en chef' : 'Editor-in-chief'}
            </span>
          </div>
        </div>
      </section>

      {/* ── POURQUOI CHERCHER ──────────────────────────────────────── */}
      <section className="pt-8">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="max-w-[760px] rounded-lg border border-line bg-surface p-[24px_26px] shadow-1">
            <h2 className="mb-3 font-serif text-[22px] font-semibold text-ink">
              {isFr
                ? `Pourquoi chercher une alternative à ${op.name} ?`
                : `Why look for an alternative to ${op.name}?`}
            </h2>
            <p className="m-0 text-[15px] leading-[1.65] text-ink-2">
              {isFr ? (
                <>
                  {op.name} est excellent, mais quelques raisons légitimes peuvent vous pousser à
                  regarder ailleurs :{' '}
                  {op.cons.slice(0, 2).map((con, i) => (
                    <span key={i}>
                      <strong>{con.toLowerCase()}</strong>
                      {i < 1 ? ', ou ' : ''}
                    </span>
                  ))}
                  . Pour chacun de ces cas, nous avons identifié le meilleur substitut ci-dessous.
                </>
              ) : (
                <>
                  {op.name} is excellent, but a few legitimate reasons may push you to look
                  elsewhere:{' '}
                  {op.cons
                    .slice(0, 2)
                    .map((con) => con.toLowerCase())
                    .join(', ')}
                  . For each case, we&apos;ve identified the best substitute below.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">01</span>
            {isFr ? 'Comparatif rapide des alternatives' : 'Quick alternatives comparison'}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-line shadow-1">
            <table className="w-full border-collapse bg-surface">
              <thead>
                <tr className="border-b border-line">
                  <th className="w-[48px] bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Rang' : 'Rank'}
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Casino' : 'Casino'}
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Note' : 'Rating'}
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Bonus' : 'Bonus'}
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    RTP
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px] text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Paiements' : 'Payments'}
                  </th>
                  <th className="bg-surface-2 px-4 py-[13px]" />
                </tr>
              </thead>
              <tbody>
                {alternatives.map((alt, i) => (
                  <tr key={alt.id} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-[13px] font-mono text-[13px] font-semibold text-ink-3">
                      {i + 1}
                    </td>
                    <td className="px-4 py-[13px]">
                      <div className="flex items-center gap-[10px]">
                        <LogoOrPlaceholder
                          logoUrl={alt.logoUrl}
                          name={alt.shortName ?? alt.name}
                          width={72}
                          height={28}
                        />
                        <div>
                          <div className="text-[14px] font-semibold text-ink">{alt.name}</div>
                          <div className="text-[11.5px] text-ink-3">{alt.licence}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-[13px]">
                      <ScorePill score={alt.rating} />
                    </td>
                    <td className="px-4 py-[13px] text-[14px] text-ink-2">
                      <strong className="text-ink">{alt.bonusAmount}</strong>
                      {alt.bonusSuffix && (
                        <span className="ml-1 text-ink-3">{alt.bonusSuffix}</span>
                      )}
                    </td>
                    <td className="px-4 py-[13px] font-mono text-[13.5px] text-ink">
                      {alt.rtp.toFixed(1)}%
                    </td>
                    <td className="px-4 py-[13px]">
                      <div className="flex flex-wrap gap-[4px]">
                        {alt.paymentMethods.slice(0, 3).map((pm) => (
                          <span
                            key={pm}
                            className="rounded-[4px] border border-line bg-bg-sunken px-[6px] py-[2px] font-mono text-[10px] font-semibold text-ink-3"
                          >
                            {pm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-[13px]">
                      <CTAButton
                        href={alt.affiliateUrl}
                        variant="primary"
                        size="sm"
                        arrow
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        data-event="affiliate_click"
                        data-operator={alt.slug}
                        data-placement="alternatives_table"
                        data-bonus={alt.bonusSlug}
                        data-page-type="alternative"
                        data-locale={locale}
                      >
                        {isFr ? 'Bonus' : 'Bonus'}
                      </CTAButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── DETAIL CARDS ──────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">02</span>
            {isFr ? 'Chaque alternative en détail' : 'Each alternative in detail'}
          </h2>

          <div className="flex flex-col gap-4">
            {alternatives.map((alt, i) => (
              <article
                key={alt.id}
                className="flex gap-0 overflow-hidden rounded-xl border border-line bg-surface shadow-1 sm:flex-col"
                id={`alt-${i + 1}`}
              >
                {/* Rank */}
                <div className="flex w-[52px] shrink-0 items-center justify-center border-r border-line bg-surface-2 sm:w-full sm:border-b sm:border-r-0 sm:py-3">
                  <span className="font-mono text-[22px] font-bold text-ink-3">{i + 1}</span>
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 sm:p-4">
                  {/* Header */}
                  <div className="mb-3 flex items-center gap-[10px]">
                    <LogoOrPlaceholder
                      logoUrl={alt.logoUrl}
                      name={alt.shortName ?? alt.name}
                      width={88}
                      height={32}
                    />
                    <div>
                      <div className="text-[15px] font-bold text-ink">{alt.name}</div>
                      <div className="text-[12px] text-ink-3">{alt.licence}</div>
                    </div>
                    <ScorePill score={alt.rating} className="ml-auto" />
                  </div>

                  {/* Why consider callout */}
                  <p className="mb-3 rounded-lg border border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-green-50 px-[13px] py-[9px] text-[13.5px] leading-[1.5] text-green-ink">
                    <strong>{isFr ? 'Pourquoi l’envisager — ' : 'Why consider it — '}</strong>
                    {getWhyConsider(alt, op, isFr)}
                  </p>

                  {/* Verdict */}
                  <p className="mb-3 text-[14px] leading-[1.55] text-ink-2">{alt.verdict}</p>

                  {/* Pros & cons */}
                  <div className="flex flex-wrap gap-x-6 gap-y-[6px]">
                    {alt.pros.slice(0, 3).map((pro) => (
                      <div key={pro} className="flex items-start gap-[8px] text-[13px] text-ink-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-px h-[14px] w-[14px] shrink-0 text-green"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {pro}
                      </div>
                    ))}
                    {alt.cons.slice(0, 1).map((con) => (
                      <div key={con} className="flex items-start gap-[8px] text-[13px] text-ink-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-px h-[14px] w-[14px] shrink-0 text-red"
                          aria-hidden
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        {con}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side CTA */}
                <div className="flex w-[220px] shrink-0 flex-col gap-3 border-l border-line p-5 sm:w-full sm:flex-row sm:items-center sm:border-l-0 sm:border-t">
                  <div className="sm:flex-1">
                    <p className="mb-[3px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                      {isFr ? 'Bonus de bienvenue' : 'Welcome bonus'}
                    </p>
                    <p className="font-serif text-[20px] font-semibold leading-tight text-green">
                      {alt.bonusAmount}
                    </p>
                    {alt.bonusSuffix && <p className="text-[13px] text-ink-2">{alt.bonusSuffix}</p>}
                    <p className="text-[11px] text-ink-3">{alt.bonusConditions}</p>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <CTAButton
                      href={alt.affiliateUrl}
                      variant="primary"
                      size="sm"
                      block
                      arrow
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      data-event="affiliate_click"
                      data-operator={alt.slug}
                      data-placement="alternatives_card"
                      data-bonus={alt.bonusSlug}
                      data-page-type="alternative"
                      data-locale={locale}
                    >
                      {isFr ? 'Obtenir le bonus' : 'Get bonus'}
                    </CTAButton>
                    <CTAButton
                      href={`/casinos/${alt.slug}/`}
                      variant="tertiary"
                      size="sm"
                      block
                      data-event="review_click"
                      data-operator={alt.slug}
                      data-placement="alternatives_card"
                    >
                      <u>{isFr ? "Lire l'avis complet" : 'Read full review'}</u>
                    </CTAButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
