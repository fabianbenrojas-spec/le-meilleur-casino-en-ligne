import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { WithContext, Review } from 'schema-dts'

// Review pages: re-validate every 24h (bonus conditions may change)
export const revalidate = 86400

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { ScorePill } from '@/components/ui/score-pill'
import { ScoreRing } from '@/components/ui/score-ring'
import { StarRating } from '@/components/ui/star-rating'
import { StickyMobileCTA } from '@/components/ui/sticky-mobile-cta'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { operators, operatorBySlug } from '@/config/operators'
import { getReviewData } from '@/config/review-content'
import type { Locale } from '@/i18n/routing'
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

  const rd = getReviewData(slug)

  return {
    title: `Avis ${op.name} 2026 : test complet, bonus & retraits`,
    description: `Notre avis complet sur ${op.name} : ${op.rating}/10. Bonus ${op.bonusAmount}${op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}, RTP ${op.rtp.toFixed(1)}%. Testé à l'argent réel. 18+`,
    alternates: {
      languages: buildHreflang(
        `/casinos/${slug}/`,
        locale === 'en' ? `/casinos/${slug}/` : undefined
      ),
    },
    other: {
      'review:schema': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: `Avis ${op.name}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: op.rating,
          bestRating: 10,
          worstRating: 0,
        },
        author: { '@type': 'Person', name: 'Julien Marchand' },
        reviewBody: rd.verdict,
        itemReviewed: {
          '@type': 'Casino',
          name: op.name,
          url: op.affiliateUrl,
        },
      } satisfies WithContext<Review>),
    },
  }
}

const TOC_ITEMS = [
  { id: 'verdict', label: 'Verdict & note' },
  { id: 'bonus', label: 'Bonus de bienvenue' },
  { id: 'jeux', label: 'Ludothèque' },
  { id: 'live', label: 'Jeux en live' },
  { id: 'paiements', label: 'Paiements & retraits' },
  { id: 'support', label: 'Support client' },
  { id: 'mobile', label: 'Application mobile' },
  { id: 'vip', label: 'Programme VIP' },
  { id: 'securite', label: 'Sécurité & licence' },
  { id: 'recap', label: 'Récapitulatif' },
  { id: 'faq', label: 'FAQ' },
  { id: 'alternatives', label: 'Alternatives' },
]

const SECTION_NUMBERS: Record<string, string> = {
  bonus: '01',
  jeux: '02',
  live: '03',
  paiements: '04',
  support: '05',
  mobile: '06',
  vip: '07',
  securite: '08',
}

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex h-24 w-[150px] items-center justify-center rounded-lg border border-dashed border-line-2 font-mono text-[11px] text-ink-3"
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
      }}
    >
      {name}
    </div>
  )
}

function SideCtaCard({
  op,
  locale,
}: {
  op: ReturnType<typeof operatorBySlug.get> & {}
  locale: Locale
}) {
  return (
    <div className="rounded-lg border-[1.5px] border-[color-mix(in_srgb,var(--green)_30%,var(--line))] bg-surface p-[18px] shadow-2">
      <LogoPlaceholder name={op.shortName ?? op.name} />
      <div className="mt-3 font-serif text-[22px] font-semibold leading-[1.1] text-ink">
        <span className="text-green">{op.bonusAmount}</span>
        {op.bonusSuffix && ` ${op.bonusSuffix}`}
      </div>
      <div className="mt-0.5 text-[11px] text-ink-3">{op.bonusConditions}</div>
      <CTAButton
        href={op.affiliateUrl}
        variant="primary"
        block
        size="sm"
        arrow
        className="mt-[13px]"
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-event="affiliate_click"
        data-operator={op.slug}
        data-placement="review_sidebar"
        data-bonus={op.bonusSlug}
        data-page-type="review"
        data-locale={locale}
      >
        Obtenir le bonus
      </CTAButton>
    </div>
  )
}

function ReviewSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="review-section py-[14px] pb-2 [scroll-margin-top:calc(var(--header-h)+20px)]"
    >
      <h2 className="mb-[14px] font-serif text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
        <span className="mr-[10px] font-mono text-[14px] font-medium text-green">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function MiniCTA({
  label,
  buttonText,
  op,
  placement,
  locale,
}: {
  label: string
  buttonText: string
  op: NonNullable<ReturnType<typeof operatorBySlug.get>>
  placement: string
  locale: Locale
}) {
  return (
    <div className="my-[18px] mb-2 flex items-center justify-between gap-[18px] rounded border border-line bg-surface-2 px-[18px] py-[14px]">
      <div className="text-[14px] text-ink-2">
        <span
          dangerouslySetInnerHTML={{
            __html: label.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      </div>
      <CTAButton
        href={op.affiliateUrl}
        variant="primary"
        size="sm"
        arrow
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-event="affiliate_click"
        data-operator={op.slug}
        data-placement={`review_section_${placement}`}
        data-bonus={op.bonusSlug}
        data-page-type="review"
        data-locale={locale}
      >
        {buttonText}
      </CTAButton>
    </div>
  )
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const op = operatorBySlug.get(slug)
  if (!op) notFound()

  const rd = getReviewData(slug)

  // 3 alternatives (exclude self)
  const altOps = Array.from(operatorBySlug.values())
    .filter((o) => o.slug !== slug)
    .slice(0, 3)

  // Review JSON-LD
  const reviewSchema: WithContext<Review> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `Avis ${op.name}`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(op.rating),
      bestRating: '10',
      worstRating: '0',
    },
    author: { '@type': 'Person', name: 'Julien Marchand' },
    reviewBody: rd.verdict,
    datePublished: '2026-06-07',
    itemReviewed: { '@type': 'LocalBusiness', name: op.name },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Casinos en ligne', href: '/casinos/' },
          { label: op.name },
        ]}
      />

      {/* ── Review Hero ───────────────────────────────── */}
      <section
        className="pb-6 pt-9"
        data-page-type="review"
        data-operator={op.slug}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div data-sticky-sentinel>
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2">
              {/* Top: logo + info + score ring */}
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-[30px] p-[30px_32px] md:grid-cols-1 md:gap-5">
                {/* Logo */}
                <LogoPlaceholder name={op.shortName ?? op.name} />

                {/* Info */}
                <div>
                  <h1 className="mb-[10px] font-serif text-[clamp(30px,4vw,44px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
                    {op.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {[
                      op.licence,
                      `Fondé en ${rd.foundedYear}`,
                      rd.currencies.join(' · '),
                      rd.languages.join(' · '),
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-[6px] rounded-[6px] border border-line bg-bg-sunken px-[10px] py-1 text-xs text-ink-2"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <StarRating
                    rating={rd.stars}
                    reviewCount={rd.reviewCount}
                    showNumeric={false}
                    className="mt-2"
                  />
                </div>

                {/* Score ring */}
                <ScoreRing score={op.rating} label={op.ratingLabel} />
              </div>

              {/* Bonus band */}
              <div className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-green-50 px-8 py-6 md:grid-cols-1">
                <div>
                  <p className="mb-[5px] font-mono text-[11px] uppercase tracking-[0.1em] text-green-ink">
                    Bonus de bienvenue exclusif
                  </p>
                  <p className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.04] tracking-[-0.015em] text-ink">
                    <span className="text-green">{op.bonusAmount}</span>
                    {op.bonusSuffix && ` + ${op.bonusSuffix.replace('+ ', '')}`}
                  </p>
                  <p className="mt-[6px] text-[12.5px] text-ink-2">{op.bonusConditions}</p>
                </div>
                <div className="flex min-w-[250px] flex-col gap-[9px] sm:min-w-0">
                  <CTAButton
                    href={op.affiliateUrl}
                    variant="primary"
                    arrow
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={op.slug}
                    data-placement="review_hero"
                    data-bonus={op.bonusSlug}
                    data-page-type="review"
                    data-locale={locale}
                  >
                    Obtenir le bonus
                  </CTAButton>
                  <CTAButton
                    href="#bonus"
                    variant="secondary"
                    size="sm"
                    data-event="toc_click"
                    data-target="bonus"
                  >
                    Lire l&apos;avis complet
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AffiliateDisclosure variant="strip" />
      </section>

      {/* ── Body: sidebar + content ───────────────────── */}
      <div className="mx-auto max-w-site px-[18px] md:px-8">
        <div className="grid grid-cols-1 items-start gap-10 pb-16 pt-10 xl:grid-cols-[264px_1fr]">
          {/* Sidebar */}
          <aside className="sticky top-[calc(var(--header-h)+18px)] hidden flex-col gap-[18px] xl:flex">
            <SideCtaCard op={op} locale={locale} />
            <TableOfContents items={TOC_ITEMS} />
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* Mobile TOC */}
            <details className="mb-6 overflow-hidden rounded-lg border border-line bg-surface p-4 xl:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                Sommaire de l&apos;avis
                <span className="text-ink-3">▾</span>
              </summary>
              <ul className="mt-3 flex flex-col gap-1 pl-2">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block py-1 text-[13.5px] text-ink-2 hover:text-green"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            {/* Verdict */}
            <section
              id="verdict"
              className="py-[14px] [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <div className="mb-7 rounded-lg border border-l-4 border-line border-l-green bg-surface p-[24px_26px] shadow-1">
                <p className="mb-[10px] font-mono text-[11px] uppercase tracking-[0.1em] text-green">
                  Verdict express
                </p>
                <p className="m-0 font-serif text-[17.5px] leading-[1.6] text-ink">{rd.verdict}</p>
              </div>
              <ProsConsBox pros={op.pros} cons={op.cons} />
            </section>

            {/* Dynamic sections */}
            {(Object.entries(rd.sections) as [string, typeof rd.sections.bonus][]).map(
              ([key, sec]) => {
                const titles: Record<string, string> = {
                  bonus: 'Bonus de bienvenue',
                  jeux: 'Ludothèque & machines à sous',
                  live: 'Jeux en live',
                  paiements: 'Paiements & retraits',
                  support: 'Support client',
                  mobile: 'Application & expérience mobile',
                  vip: 'Programme VIP',
                  securite: 'Sécurité & licence',
                }
                return (
                  <ReviewSection
                    key={key}
                    id={key}
                    number={SECTION_NUMBERS[key] ?? ''}
                    title={titles[key] ?? key}
                  >
                    {sec.prose.map((p, i) => (
                      <p
                        key={i}
                        className="mb-[14px] max-w-[68ch] text-[16px] leading-[1.68] text-ink-2"
                      >
                        {p}
                      </p>
                    ))}
                    {sec.highlights && (
                      <ul className="mb-4 flex list-none flex-col gap-[9px] p-0">
                        {sec.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-[11px] text-[15px] leading-[1.6] text-ink-2"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="mt-0.5 h-[17px] w-[17px] shrink-0 text-green"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              aria-hidden
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    {sec.minicta && (
                      <MiniCTA
                        label={sec.minicta.label}
                        buttonText={sec.minicta.buttonText}
                        op={op}
                        placement={key}
                        locale={locale}
                      />
                    )}
                  </ReviewSection>
                )
              }
            )}

            {/* Recap table */}
            <section
              id="recap"
              className="py-[14px] [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <h2 className="mb-4 font-serif text-[27px] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
                Récapitulatif
              </h2>
              <div className="overflow-hidden rounded-lg border border-line shadow-1">
                <table className="w-full border-collapse bg-surface">
                  <tbody>
                    {rd.recapRows.map((row) => (
                      <tr key={row.label} className="border-b border-line last:border-b-0">
                        <td className="w-[40%] bg-surface-2 px-[18px] py-[13px] text-[14.5px] font-semibold text-ink">
                          {row.label}
                        </td>
                        <td className="px-[18px] py-[13px] text-[14.5px] text-ink-2">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-[14px] [scroll-margin-top:calc(var(--header-h)+20px)]">
              <h2 className="mb-4 font-serif text-[27px] font-medium tracking-[-0.015em] text-ink">
                Questions fréquentes
              </h2>
              <FAQAccordion items={rd.faq} includeSchema />
            </section>

            {/* Author bio */}
            <AuthorBio
              name="Julien Marchand"
              role="Rédacteur en chef · 11 ans dans l'iGaming"
              credentials="Ex-analyste conformité · testé 200+ casinos"
              lastUpdated="2026-06-07"
              nextRetest="2026-09-01"
              className="my-6"
            />

            {/* Alternatives */}
            <section
              id="alternatives"
              className="py-[14px] [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <h2 className="mb-6 font-serif text-[27px] font-medium tracking-[-0.015em] text-ink">
                Alternatives à {op.name}
              </h2>
              <div className="flex flex-col gap-3">
                {altOps.map((alt) => (
                  <div
                    key={alt.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4 shadow-1"
                  >
                    <div className="flex items-center gap-3">
                      <ScorePill score={alt.rating} />
                      <div>
                        <p className="font-bold text-ink">{alt.name}</p>
                        <p className="text-[13px] text-ink-2">
                          {alt.bonusAmount}
                          {alt.bonusSuffix ? ` ${alt.bonusSuffix}` : ''} · Wager{' '}
                          {alt.bonusConditions.split('·')[0]?.trim()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CTAButton
                        href={`/casinos/${alt.slug}/`}
                        variant="secondary"
                        size="sm"
                        data-event="review_click"
                        data-operator={alt.slug}
                      >
                        Avis
                      </CTAButton>
                      <CTAButton
                        href={alt.affiliateUrl}
                        variant="primary"
                        size="sm"
                        arrow
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        data-event="affiliate_click"
                        data-operator={alt.slug}
                        data-placement="review_alternatives"
                        data-bonus={alt.bonusSlug}
                      >
                        Bonus
                      </CTAButton>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <div className="mt-8 rounded-xl border border-green bg-green-50 p-8 text-center">
              <h3 className="mb-2 font-serif text-[24px] font-semibold text-ink">
                Prêt à rejoindre {op.name} ?
              </h3>
              <p className="mb-6 text-[15px] text-ink-2">
                {op.bonusAmount}
                {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''} · {op.bonusConditions}
              </p>
              <CTAButton
                href={op.affiliateUrl}
                variant="primary"
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={op.slug}
                data-placement="review_final_cta"
                data-bonus={op.bonusSlug}
                data-page-type="review"
                data-locale={locale}
              >
                Obtenir le bonus
              </CTAButton>
              <p className="mt-3 text-[11px] text-ink-3">
                18+ · Jeu responsable · {op.bonusConditions}
              </p>
            </div>
          </main>
        </div>
      </div>

      <StickyMobileCTA
        operatorName={op.name}
        operatorSlug={op.slug}
        rating={op.rating}
        bonusLabel={`${op.bonusAmount}${op.bonusSuffix ? ` ${op.bonusSuffix}` : ''} · ${op.bonusConditions}`}
        affiliateUrl={op.affiliateUrl}
      />
    </>
  )
}
