import type { Metadata } from 'next'
export const revalidate = 3600

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import { TOP_10, operators } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'fr'
        ? 'Comparatifs de casinos en ligne — classements, versus & tops (2026)'
        : 'Online Casino Comparisons — Rankings, Versus & Tops (2026)',
    description:
      locale === 'fr'
        ? "Top 10, versus casino vs casino, alternatives et comparatifs thématiques. Testés à l'argent réel."
        : 'Top 10, casino vs casino, alternatives and themed comparisons. Tested with real money.',
    alternates: { languages: buildHreflang('/comparatifs/', '/comparisons/') },
  }
}

// Top 5 versus pairs for the hub
function versusSlug(a: string, b: string) {
  return `${a}-vs-${b}`
}

export default async function ComparatifsHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const top5 = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 5)
  const versusPairs = top5
    .flatMap((a, i) => top5.slice(i + 1).map((b) => [a, b] as const))
    .slice(0, 6)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Comparatifs' : 'Comparisons' },
        ]}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Comparatifs 2026' : 'Comparisons 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comparez les <em className="italic text-green">casinos en ligne</em>
              </>
            ) : (
              <>
                Compare <em className="italic text-green">online casinos</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Classements, versus et comparatifs thématiques — tous testés à l'argent réel."
              : 'Rankings, versus and themed comparisons — all tested with real money.'}
          </p>
        </div>
      </section>

      {/* Featured: Top 10 */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Classements' : 'Rankings'}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="/comparatifs/top-10-casinos-en-ligne/"
              className="flex flex-col gap-3 rounded-xl border border-[color-mix(in_srgb,var(--gold)_35%,var(--line))] bg-surface p-6 text-ink no-underline shadow-2 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
              data-event="comparatif_click"
              data-slug="top-10"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-gold-ink">
                ★ {isFr ? 'Notre classement principal' : 'Our main ranking'}
              </span>
              <h3 className="font-serif text-[22px] font-semibold text-ink">
                {isFr ? 'Top 10 casinos en ligne' : 'Top 10 online casinos'}
              </h3>
              <p className="text-[14px] text-ink-2">
                {isFr
                  ? '47 opérateurs testés · notes /10 · re-testé tous les 90j'
                  : '47 operators tested · /10 ratings · re-tested every 90d'}
              </p>
              <div className="mt-auto flex gap-2">
                {TOP_10.slice(0, 3).map((op) => (
                  <ScorePill key={op.id} score={op.rating} className="text-[13px]" />
                ))}
              </div>
              <span className="font-bold text-green">
                {isFr ? 'Voir le classement →' : 'See ranking →'}
              </span>
            </a>

            <a
              href="/casinos/"
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
              data-event="comparatif_click"
              data-slug="liste-casinos"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                {isFr ? 'Comparateur filtrable' : 'Filterable comparison'}
              </span>
              <h3 className="font-serif text-[22px] font-semibold text-ink">
                {isFr ? 'Tous les casinos en ligne' : 'All online casinos'}
              </h3>
              <p className="text-[14px] text-ink-2">
                {isFr
                  ? 'Filtrez par bonus, RTP, méthode de paiement, licence.'
                  : 'Filter by bonus, RTP, payment method, licence.'}
              </p>
              <span className="mt-auto font-bold text-green">
                {isFr ? 'Accéder au comparateur →' : 'Open comparison →'}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Versus */}
      <section className="bg-bg-sunken py-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Casino vs Casino' : 'Casino vs Casino'}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {versusPairs.map(([a, b]) => (
              <a
                key={`${a.slug}-vs-${b.slug}`}
                href={`/comparatifs/${versusSlug(a.slug, b.slug)}/`}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-2"
                data-event="versus_click"
                data-slug={versusSlug(a.slug, b.slug)}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <ScorePill score={a.rating} className="px-[8px] py-[3px] text-[12px]" />
                  <span className="truncate text-[14px] font-semibold">{a.name}</span>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-ink-3">vs</span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                  <span className="truncate text-[14px] font-semibold">{b.name}</span>
                  <ScorePill score={b.rating} className="px-[8px] py-[3px] text-[12px]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Alternatives */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Alternatives' : 'Alternatives'}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {TOP_10.slice(0, 5).map((op) => (
              <a
                key={op.id}
                href={`/alternatives/${op.slug}/`}
                className="rounded-lg border border-line bg-surface p-4 text-center text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-2"
                data-event="alternative_click"
                data-operator={op.slug}
              >
                <p className="mb-1 text-[13px] font-semibold text-ink">
                  {isFr ? 'Alternatives à' : 'Alternatives to'}
                </p>
                <p className="font-bold text-ink">{op.name}</p>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <CTAButton
              href="/casinos/"
              variant="secondary"
              data-event="review_click"
              data-placement="comparatifs_hub"
            >
              {isFr ? 'Voir tous les casinos' : 'See all casinos'}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
