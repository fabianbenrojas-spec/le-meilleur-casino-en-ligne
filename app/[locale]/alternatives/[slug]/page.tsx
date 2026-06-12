import type { Metadata } from 'next'
import type { WithContext, ItemList } from 'schema-dts'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
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

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractWager(conditions: string): number {
  const m = conditions.match(/(\d+)×/)
  return m ? parseInt(m[1]!, 10) : 40
}

function licenceScore(licence: string): number {
  if (licence.toLowerCase().includes('mga')) return 3
  if (licence.toLowerCase().includes('cga')) return 2
  return 1
}

function getWhyConsider(alt: Operator, ref: Operator, isFr: boolean): string {
  const altLicence = licenceScore(alt.licence)
  const refLicence = licenceScore(ref.licence)
  const rtpDiff = alt.rtp - ref.rtp
  const altWager = extractWager(alt.bonusConditions)
  const refWager = extractWager(ref.bonusConditions)

  if (altLicence > refLicence) {
    return isFr
      ? `Licence ${alt.licence} — protection renforcée pour les joueurs.`
      : `${alt.licence} licence — enhanced player protection.`
  }
  if (rtpDiff >= 0.3) {
    return isFr
      ? `RTP moyen de ${alt.rtp.toFixed(1)}% — ${rtpDiff.toFixed(1)} point${rtpDiff >= 1 ? 's' : ''} de plus que ${ref.name}.`
      : `Average RTP of ${alt.rtp.toFixed(1)}% — ${rtpDiff.toFixed(1)} point${rtpDiff >= 1 ? 's' : ''} higher than ${ref.name}.`
  }
  if (altWager < refWager) {
    return isFr
      ? `Bonus plus accessible : wager ${altWager}× contre ${refWager}× chez ${ref.name}.`
      : `Easier bonus to unlock: ${altWager}× wagering vs ${refWager}× at ${ref.name}.`
  }
  return alt.tagline
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

  // 5 best alternatives (exclude self, sort by rating)
  const alternatives = operators
    .filter((o) => o.slug !== slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

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
      url: `https://le-meilleur-casino-en-ligne.fr/casinos/${alt.slug}/`,
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
          { label: isFr ? `Alternatives à ${op.name}` : `${op.name} Alternatives` },
        ]}
        locale={locale}
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

      <AffiliateDisclosure variant="strip" locale={locale} />

      {/* Alternatives list */}
      <section className="pb-16 pt-8">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Nos recommandations' : 'Our recommendations'}
          </h2>
          <div className="flex flex-col gap-[14px]">
            {alternatives.map((alt, i) => (
              <div key={alt.id} className="flex flex-col gap-[6px]">
                <ListingCard
                  operator={alt}
                  isTop={i === 0}
                  ctaBonus={isFr ? 'Obtenir le bonus' : 'Get bonus'}
                  ga4={{ 'data-page-type': 'alternative', 'data-locale': locale }}
                />
                {/* Contextual "Pourquoi l'envisager" callout */}
                <div className="flex items-start gap-[10px] rounded-b-lg border border-t-0 border-line bg-surface-2 px-[18px] py-[11px]">
                  <span className="mt-[1px] shrink-0 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-green">
                    {isFr ? 'Pourquoi l’envisager' : 'Why consider it'}
                  </span>
                  <p className="m-0 text-[13.5px] leading-[1.5] text-ink-2">
                    {getWhyConsider(alt, op, isFr)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
