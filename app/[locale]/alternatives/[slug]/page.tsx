import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { BonusBadge } from '@/components/ui/bonus-badge'
import { CTAButton } from '@/components/ui/cta-button'
import { LogoOrPlaceholder } from '@/components/ui/operator-card'
import { ScorePill } from '@/components/ui/score-pill'
import type { Locale } from '@/i18n/routing'
import { operatorBySlug, operators } from '@/config/operators'
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
      : `Best ${op.name} Alternatives 2026`,
    description: isFr
      ? `${alternatives_count(slug)} alternatives à ${op.name} testées et notées. Trouvez le casino qui vous correspond mieux. 18+ Jeu responsable.`
      : `Top alternatives to ${op.name} tested with real money. Find the casino that suits you better. 18+`,
    alternates: { languages: buildHreflang(`/alternatives/${slug}/`) },
  }
}

function alternatives_count(slug: string) {
  return operators.filter((o) => o.slug !== slug).slice(0, 6).length
}

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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Alternatives' : 'Alternatives', href: '/alternatives/' },
          { label: isFr ? `Alternatives à ${op.name}` : `${op.name} Alternatives` },
        ]}
        locale={locale}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pb-6 pt-10" data-page-type="alternatives" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Alternatives' : 'Alternatives'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(28px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? 'Les meilleures ' : 'The best '}
            <em className="italic text-green">
              {isFr ? `alternatives à ${op.name}` : `alternatives to ${op.name}`}
            </em>
            {isFr ? ' en 2026' : ' in 2026'}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? `${op.name} reste notre n°1, mais ce n'est pas le casino idéal pour tout le monde. Selon vos priorités, l'un de ces casinos vous conviendra peut-être mieux.`
              : `${op.name} is our #1, but it's not the ideal casino for everyone. Depending on your priorities, one of these casinos may suit you better.`}
          </p>
          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-5 text-[13.5px] font-medium text-ink-2">
            <span className="inline-flex items-center gap-[7px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[15px] w-[15px] text-green"
                aria-hidden
              >
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {isFr
                ? `${alternatives.length} alternatives testées`
                : `${alternatives.length} alternatives tested`}
            </span>
            <span className="inline-flex items-center gap-[7px]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-[15px] w-[15px] text-green"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {isFr ? 'Mis à jour le 6 juin 2026' : 'Updated 6 June 2026'}
            </span>
            <span className="inline-flex items-center gap-[8px]">
              <span
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-surface-2 font-mono text-[10px] text-ink-3"
                aria-hidden
              >
                JM
              </span>
              <span>
                Julien Marchand
                <span className="ml-1 text-ink-3">· Rédacteur en chef</span>
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── "Pourquoi chercher une alternative?" callout ─────────────────── */}
      <section className="pb-0 pt-2">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="max-w-[760px] rounded-lg border border-line bg-surface p-[24px_26px] shadow-1">
            <h2 className="mb-3 font-serif text-[20px] font-semibold text-ink">
              {isFr
                ? `Pourquoi chercher une alternative à ${op.name} ?`
                : `Why look for an alternative to ${op.name}?`}
            </h2>
            <p className="m-0 text-[15px] leading-[1.65] text-ink-2">
              {isFr
                ? `${op.name} est excellent, mais quelques raisons légitimes peuvent vous pousser à regarder ailleurs : vous voulez `
                : `${op.name} is excellent, but some legitimate reasons may push you to look elsewhere: you want `}
              {op.cons && op.cons.length > 0 ? (
                <>
                  <strong className="text-ink">{op.cons[0]}</strong>
                  {op.cons[1] && (
                    <>
                      {isFr ? ', ou ' : ', or '}
                      <strong className="text-ink">{op.cons[1]}</strong>
                    </>
                  )}
                  {isFr
                    ? '. Pour chacun de ces cas, nous avons identifié le meilleur substitut ci-dessous.'
                    : '. For each of these cases, we have identified the best substitute below.'}
                </>
              ) : (
                <>
                  {isFr
                    ? 'un meilleur bonus, une autre licence, ou un service différent. Pour chaque cas, nous avons identifié le meilleur substitut ci-dessous.'
                    : 'a better bonus, a different licence, or a different service. For each case, we have identified the best substitute below.'}
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* ── Comparison table ─────────────────────────────────────────────── */}
      <section className="pb-0 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-3 font-mono text-[14px] font-medium text-green">01</span>
            {isFr ? 'Comparatif rapide des alternatives' : 'Quick comparison of alternatives'}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-line shadow-1">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-line bg-bg-sunken">
                  {[
                    isFr ? 'Rang' : 'Rank',
                    isFr ? 'Casino' : 'Casino',
                    isFr ? 'Note' : 'Rating',
                    isFr ? 'Bonus' : 'Bonus',
                    'RTP',
                    isFr ? 'Paiements' : 'Payments',
                    '',
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alternatives.map((alt, i) => (
                  <tr
                    key={alt.id}
                    className="hover:bg-bg-sunken/60 border-b border-line transition-colors last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-[13px] font-semibold text-ink-3">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <LogoOrPlaceholder
                          logoUrl={alt.logoUrl}
                          name={alt.name}
                          width={60}
                          height={22}
                        />
                        <div>
                          <div className="font-semibold text-ink">{alt.name}</div>
                          <div className="font-mono text-[10px] uppercase text-ink-3">
                            {alt.licence}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <ScorePill score={alt.rating} />
                    </td>
                    <td className="px-4 py-3 text-ink-2">
                      <strong className="text-ink">{alt.bonusAmount}</strong>
                      {alt.bonusSuffix && (
                        <span className="ml-1 text-ink-3">{alt.bonusSuffix}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-ink">
                      {alt.rtp.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-[4px]">
                        {alt.paymentMethods.slice(0, 4).map((pm) => (
                          <span
                            key={pm}
                            className="rounded-[4px] border border-line bg-bg-sunken px-[5px] py-[1px] font-mono text-[9.5px] text-ink-3"
                          >
                            {pm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={alt.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 rounded-[6px] bg-green px-3 py-[6px] font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-white no-underline transition-opacity hover:opacity-80"
                        data-event="affiliate_click"
                        data-operator={alt.slug}
                        data-placement="alternatives_table"
                        data-bonus={alt.bonusSlug}
                        data-page-type="alternatives"
                        data-locale={locale}
                      >
                        {isFr ? 'Bonus' : 'Bonus'} →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Rank cards ───────────────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-12 pb-16">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-8 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-3 font-mono text-[14px] font-medium text-green">02</span>
            {isFr ? 'Chaque alternative en détail' : 'Each alternative in detail'}
          </h2>

          <div className="flex flex-col gap-5">
            {alternatives.map((alt, i) => (
              <article
                key={alt.id}
                id={`alt-${i + 1}`}
                className="grid grid-cols-[48px_1fr_260px] gap-6 rounded-xl border border-line bg-surface p-6 shadow-1 sm:grid-cols-1 sm:gap-4"
              >
                {/* Rank number */}
                <div className="flex items-start justify-center pt-1 sm:hidden">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-sunken font-mono text-[15px] font-semibold text-ink-2">
                    {i + 1}
                  </span>
                </div>

                {/* Main content */}
                <div className="min-w-0">
                  {/* Header: logo + name + score */}
                  <div className="mb-4 flex items-center gap-3">
                    <LogoOrPlaceholder
                      logoUrl={alt.logoUrl}
                      name={alt.name}
                      width={100}
                      height={36}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-[18px] font-semibold text-ink">
                        {alt.name}
                      </div>
                      <div className="font-mono text-[11px] uppercase text-ink-3">
                        {alt.licence}
                      </div>
                    </div>
                    <ScorePill score={alt.rating} />
                  </div>

                  {/* "Pourquoi l'envisager" callout */}
                  <p className="mb-3 rounded-[8px] border border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-green-50 px-[13px] py-[9px] text-[13.5px] leading-[1.5] text-green-ink">
                    <strong>{isFr ? "Pourquoi l'envisager — " : 'Why consider it — '}</strong>
                    {alt.tagline ??
                      (isFr
                        ? `Une excellente alternative avec une note de ${alt.rating}/10.`
                        : `An excellent alternative with a rating of ${alt.rating}/10.`)}
                  </p>

                  {/* Verdict */}
                  {alt.verdict && (
                    <p className="mb-4 text-[14.5px] leading-[1.6] text-ink-2">{alt.verdict}</p>
                  )}

                  {/* Pros / cons */}
                  <div className="flex flex-col gap-[7px]">
                    {alt.pros?.slice(0, 3).map((p) => (
                      <div key={p} className="flex items-start gap-[9px] text-[13.5px] text-ink-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-[2px] h-[14px] w-[14px] shrink-0 text-green"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {p}
                      </div>
                    ))}
                    {alt.cons?.slice(0, 1).map((c) => (
                      <div key={c} className="flex items-start gap-[9px] text-[13.5px] text-ink-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-[2px] h-[14px] w-[14px] shrink-0 text-red"
                          aria-hidden
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side CTA */}
                <div className="flex flex-col gap-3 border-l border-line pl-6 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-4">
                  <BonusBadge
                    amount={alt.bonusAmount}
                    amountSuffix={alt.bonusSuffix}
                    conditions={alt.bonusConditions}
                    className="w-full"
                  />
                  <CTAButton
                    href={alt.affiliateUrl}
                    variant="primary"
                    block
                    size="sm"
                    arrow
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={alt.slug}
                    data-placement="alternatives_card"
                    data-bonus={alt.bonusSlug}
                    data-page-type="alternatives"
                    data-locale={locale}
                  >
                    {isFr ? 'Obtenir le bonus' : 'Get bonus'}
                  </CTAButton>
                  <a
                    href={`/casinos/${alt.slug}/`}
                    className="block text-center text-[13.5px] text-ink-2 transition-colors hover:text-green"
                    data-event="review_click"
                    data-operator={alt.slug}
                    data-placement="alternatives_card"
                  >
                    <u>{isFr ? "Lire l'avis complet" : 'Read full review'}</u>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
