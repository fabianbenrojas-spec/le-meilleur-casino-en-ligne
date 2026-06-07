import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
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
      ? `Alternatives à ${op.name} — les meilleures options 2026`
      : `${op.name} Alternatives — best options 2026`,
    description: isFr
      ? `Vous cherchez un casino similaire à ${op.name} ? Voici nos 5 meilleures alternatives testées à l'argent réel, classées par note.`
      : `Looking for a casino similar to ${op.name}? Here are our 5 best alternatives tested with real money.`,
    alternates: {
      languages: buildHreflang(`/alternatives/${slug}/`),
    },
  }
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

  // 5 best alternatives (exclude self, sort by rating)
  const alternatives = operators
    .filter((o) => o.slug !== slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          {
            label: isFr ? 'Alternatives' : 'Alternatives',
            href: isFr ? '/alternatives/' : '/en/alternatives/',
          },
          { label: isFr ? `Alternatives à ${op.name}` : `${op.name} Alternatives` },
        ]}
      />

      <section className="py-10" data-page-type="alternative" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Casinos similaires · 2026' : 'Similar casinos · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(28px,4vw,44px)] font-medium leading-tight tracking-[-0.02em] text-ink">
            {isFr
              ? `Les meilleures alternatives à ${op.name}`
              : `The best alternatives to ${op.name}`}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] text-ink-2">
            {isFr
              ? `Vous cherchez un casino similaire à ${op.name} ? Voici nos 5 meilleures options testées à l'argent réel, sélectionnées pour leur proximité de profil.`
              : `Looking for a casino similar to ${op.name}? Here are our 5 best real-money tested alternatives.`}
          </p>

          {/* Reference casino */}
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface-2 p-4">
            <span className="text-[13px] text-ink-3">
              {isFr ? 'Casino de référence :' : 'Reference casino:'}
            </span>
            <ScorePill score={op.rating} />
            <span className="font-bold text-ink">{op.name}</span>
            <span className="text-[13px] text-ink-2">
              {op.bonusAmount}
              {op.bonusSuffix && ` ${op.bonusSuffix}`}
            </span>
            <div className="ml-auto flex gap-2">
              <CTAButton
                href={`/casinos/${op.slug}/`}
                variant="secondary"
                size="sm"
                data-event="review_click"
                data-operator={op.slug}
              >
                {isFr ? "Lire l'avis" : 'Read review'}
              </CTAButton>
              <CTAButton
                href={op.affiliateUrl}
                variant="primary"
                size="sm"
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={op.slug}
                data-placement="alternatives_reference"
                data-bonus={op.bonusSlug}
              >
                {isFr ? 'Bonus' : 'Bonus'}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* Alternatives list */}
      <section className="pb-16 pt-8">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Nos recommandations' : 'Our recommendations'}
          </h2>
          <div className="flex flex-col gap-[14px]">
            {alternatives.map((alt, i) => (
              <ListingCard
                key={alt.id}
                operator={alt}
                isTop={i === 0}
                ga4={{ 'data-page-type': 'alternative', 'data-locale': locale }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
