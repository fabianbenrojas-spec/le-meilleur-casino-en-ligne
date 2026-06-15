import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import { GameGrid } from '@/components/games/game-grid'
import { ReviewStickyBar } from '@/components/review/review-sticky-bar'
import { categories, getGamesByCategory, type GameCategory } from '@/config/games'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}): Promise<Metadata> {
  const { category, locale } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return {}

  const isFr = locale === 'fr'
  const label = isFr ? cat.label : cat.labelEn

  return {
    title: isFr
      ? `${label} en ligne — Meilleurs jeux & casinos (2026)`
      : `Online ${label} — Best Games & Casinos (2026)`,
    description: isFr
      ? `${cat.description} ${cat.count} jeux disponibles. Testés à l'argent réel. 18+ Jeu responsable.`
      : `${cat.description} ${cat.count} games available. Tested with real money. 18+ Gamble responsibly.`,
    alternates: {
      languages: buildHreflang(`/jeux/${category}/`, `/${category}/`),
    },
  }
}

function LogoPh({ name: _name }: { name: string }) {
  return (
    <div
      className="h-[40px] w-[92px] shrink-0 rounded border border-dashed border-line-2 font-mono text-[9px] text-ink-3"
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 5px,transparent 5px,transparent 10px)',
      }}
      aria-hidden
    />
  )
}

export default async function GameCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>
}) {
  const { locale, category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  const isFr = locale === 'fr'
  const label = isFr ? cat.label : cat.labelEn
  const games = getGamesByCategory(category as GameCategory)
  const casinos = TOP_10.slice(0, 3)
  const spotOp = TOP_10[0]!

  // Unique providers for toolbar pills
  const providers = Array.from(new Set(games.map((g) => g.provider)))

  // Hero stats
  const avgRtp = games.length > 0 ? games.reduce((s, g) => s + g.rtp, 0) / games.length : 96.5

  // Other game categories (maillage interne)
  const otherCats = categories.filter((c) => c.slug !== category)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: '/jeux/' },
          { label },
        ]}
      />

      {/* ── Hero — 2 col (text + spotlight casino) ───────────────────────── */}
      <section
        className="pb-4 pt-[38px]"
        data-page-type="jeux_categorie"
        data-category={category}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div data-sticky-sentinel>
            <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_332px]">
              {/* Left: eyebrow + H1 + description + stats */}
              <div>
                <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                  {isFr ? `Catégorie · ${label}` : `Category · ${label}`}
                </div>
                <h1 className="mb-[14px] font-serif text-[clamp(30px,4.4vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
                  {isFr ? (
                    <>
                      Les meilleures <em className="italic text-green">{label.toLowerCase()}</em> en
                      ligne
                    </>
                  ) : (
                    <>
                      Best online <em className="italic text-green">{label.toLowerCase()}</em>
                    </>
                  )}
                </h1>
                <p className="m-0 max-w-[60ch] text-[17px] leading-[1.6] text-ink-2">
                  {cat.description}
                </p>

                {/* Stats row */}
                <div className="mt-[26px] flex flex-wrap items-center gap-[24px_40px]">
                  <div className="flex items-baseline gap-[6px]">
                    <span className="font-serif text-[28px] font-semibold leading-none text-green">
                      {cat.count}+
                    </span>
                    <span className="font-mono text-[12px] text-ink-3">
                      {isFr ? 'jeux' : 'games'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-[6px]">
                    <span className="font-serif text-[28px] font-semibold leading-none text-green">
                      {avgRtp.toFixed(1)}%
                    </span>
                    <span className="font-mono text-[12px] text-ink-3">
                      {isFr ? 'RTP moyen' : 'avg RTP'}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-[6px]">
                    <span className="font-serif text-[28px] font-semibold leading-none text-green">
                      {providers.length}
                    </span>
                    <span className="font-mono text-[12px] text-ink-3">
                      {isFr ? 'fournisseurs' : 'providers'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: spotlight casino card */}
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2">
                {/* Header */}
                <div className="border-b border-line px-[22px] py-[13px]">
                  <p className="m-0 inline-flex items-center gap-[7px] font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--gold)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-[11px] w-[11px]"
                      aria-hidden
                    >
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
                    </svg>
                    {isFr ? 'Casino du moment' : 'Top casino'}
                  </p>
                </div>

                {/* Logo + name + score */}
                <div className="px-[22px] pt-[18px]">
                  <div className="flex items-center gap-[12px]">
                    <LogoPh name={spotOp.name} />
                    <div>
                      <div className="font-serif text-[18px] font-semibold text-ink">
                        {spotOp.name}
                      </div>
                      <ScorePill
                        score={spotOp.rating}
                        className="mt-1 px-[7px] py-[2px] text-[12px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bonus box */}
                <div
                  className="mx-[22px] mt-[16px] rounded-lg p-[12px_14px]"
                  style={{
                    border: '1px solid color-mix(in srgb,var(--green) 22%,var(--line))',
                    background: 'var(--green-50)',
                  }}
                >
                  <div className="font-serif text-[20px] font-semibold text-green">
                    {spotOp.bonusAmount}
                    {spotOp.bonusSuffix ? ` ${spotOp.bonusSuffix}` : ''}
                  </div>
                  <div className="mt-[3px] font-mono text-[11px] text-ink-3">
                    {spotOp.bonusConditions}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-[16px_22px_22px]">
                  <CTAButton
                    href={spotOp.affiliateUrl}
                    block
                    arrow
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={spotOp.slug}
                    data-placement="category_hero_spotlight"
                    data-bonus={spotOp.bonusSlug}
                    data-page-type="jeux_categorie"
                    data-locale={locale}
                  >
                    {isFr ? 'Obtenir le bonus' : 'Claim bonus'}
                  </CTAButton>
                  <a
                    href={`/casinos/${spotOp.slug}/`}
                    className="mt-2 block text-center font-mono text-[12px] text-ink-3 no-underline hover:text-green"
                    data-event="review_click"
                    data-operator={spotOp.slug}
                    data-page-type="jeux_categorie"
                    data-locale={locale}
                  >
                    {isFr ? "Lire l'avis complet →" : 'Read full review →'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Game grid (client-side filtering) ────────────────────────────── */}
      <section className="pb-12 pt-4">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <GameGrid games={games} isFr={isFr} locale={locale} providers={providers} />
        </div>
      </section>

      {/* ── Où jouer ─────────────────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[24px]">
            <div className="mb-[8px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
              {isFr ? 'Où jouer' : 'Where to play'}
            </div>
            <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,32px)] font-medium tracking-[-0.015em] text-ink">
              {isFr
                ? `Les meilleurs casinos pour les ${label.toLowerCase()}`
                : `Best casinos for ${label.toLowerCase()}`}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[14px] md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {casinos.map((op, i) => (
              <div
                key={op.id}
                className={`flex items-center gap-[14px] rounded-lg border bg-surface p-[16px_18px] shadow-1 transition-shadow hover:shadow-3 ${
                  i === 0
                    ? 'border-[color-mix(in_srgb,var(--gold)_36%,var(--line))]'
                    : 'border-line'
                }`}
              >
                <div className="grid h-9 w-[92px] shrink-0 place-items-center rounded border border-dashed border-line-2 bg-bg-sunken font-mono text-[10px] text-ink-3">
                  {op.name}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[17px] font-semibold text-ink">{op.name}</div>
                  <div className="text-[12px] text-ink-2">
                    {isFr ? 'Bonus' : 'Bonus'}{' '}
                    <strong className="text-green">
                      {op.bonusAmount}
                      {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                    </strong>
                  </div>
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
                  data-placement="category_where_to_play"
                  data-bonus={op.bonusSlug}
                  data-page-type="jeux_categorie"
                  data-locale={locale}
                >
                  {isFr ? 'Jouer' : 'Play'}
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide ────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-[760px] px-[18px] md:px-8">
          <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {cat.guideTitle}
          </h2>
          <p className="mb-[14px] text-[16px] leading-[1.7] text-ink-2">{cat.guideSummary}</p>
          <p className="mt-[14px] text-[13px] leading-[1.6] text-ink-3">
            {isFr ? (
              <>
                Rappel : les jeux de casino sont des jeux de hasard. Aucune stratégie ne garantit de
                gain. Fixez-vous des limites et jouez pour le plaisir.{' '}
                <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                  Jeu responsable →
                </a>
              </>
            ) : (
              <>
                Reminder: casino games are games of chance. No strategy guarantees winnings. Set
                limits and play for enjoyment.{' '}
                <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                  Responsible gambling →
                </a>
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── Autres types de jeux (maillage interne) ──────────────────────── */}
      <section className="border-t border-line pb-12 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-6">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-green">
              {isFr ? 'Explorer' : 'Explore'}
            </p>
            <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,30px)] font-medium text-ink">
              {isFr ? 'Autres types de jeux' : 'Other game types'}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3">
            {otherCats.map((c) => (
              <a
                key={c.slug}
                href={`/jeux/${c.slug}/`}
                className="flex items-center justify-between rounded-lg border border-line bg-surface p-[14px_16px] text-ink no-underline transition-[border-color,transform] duration-[150ms] hover:translate-x-[2px] hover:border-green"
                data-event="internal_link"
                data-target={c.slug}
                data-page-type="jeux_categorie"
                data-locale={locale}
              >
                <div>
                  <div className="font-serif text-[15px] font-semibold leading-[1.2]">
                    {isFr ? c.label : c.labelEn}
                  </div>
                  <div className="mt-[2px] font-mono text-[11px] text-ink-3">{c.count}+ jeux</div>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4 shrink-0 text-ink-3"
                  aria-hidden
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fork block ───────────────────────────────────────────────────── */}
      <section className="pb-16 pt-2">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Dark panel */}
            <div
              className="flex flex-col items-start gap-6 rounded-xl p-[32px_36px]"
              style={{ background: 'var(--ink)' }}
            >
              <div>
                <p className="mb-[6px] font-mono text-[11px] uppercase tracking-[0.1em] text-white/60">
                  {isFr ? 'Prêt à jouer ?' : 'Ready to play?'}
                </p>
                <p className="m-0 font-serif text-[22px] font-semibold leading-[1.2] text-white">
                  {isFr
                    ? `Tentez votre chance sur les meilleures ${label.toLowerCase()}`
                    : `Try your luck on the best ${label.toLowerCase()}`}
                </p>
              </div>
              <CTAButton
                href={spotOp.affiliateUrl}
                variant="primary"
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={spotOp.slug}
                data-placement="category_fork_cta"
                data-bonus={spotOp.bonusSlug}
                data-page-type="jeux_categorie"
                data-locale={locale}
              >
                {isFr ? `Jouer sur ${spotOp.name}` : `Play on ${spotOp.name}`}
              </CTAButton>
            </div>

            {/* Light panel */}
            <div className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-surface p-[32px_36px]">
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">
                  {isFr ? 'Vous hésitez ?' : 'Still deciding?'}
                </p>
                <p className="m-0 font-serif text-[20px] font-semibold text-ink">
                  {isFr ? 'Comparez tous les casinos' : 'Compare all casinos'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {casinos.map((op) => (
                  <a
                    key={op.id}
                    href={`/casinos/${op.slug}/`}
                    className="flex items-center gap-3 text-[14px] font-semibold text-ink no-underline hover:text-green"
                    data-event="review_click"
                    data-operator={op.slug}
                    data-page-type="jeux_categorie"
                    data-locale={locale}
                  >
                    <span
                      className="inline-block h-[2px] w-[16px] shrink-0"
                      style={{ background: 'var(--gold)' }}
                      aria-hidden
                    />
                    {op.name}
                  </a>
                ))}
                <a
                  href={`/${locale}/casinos/`}
                  className="mt-1 text-[13px] font-semibold text-green no-underline hover:underline"
                  data-event="internal_link"
                  data-page-type="jeux_categorie"
                  data-locale={locale}
                >
                  {isFr ? 'Voir tous les casinos →' : 'See all casinos →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky bonus bar ─────────────────────────────────────────────── */}
      <ReviewStickyBar
        operatorName={spotOp.name}
        operatorSlug={spotOp.slug}
        rating={spotOp.rating}
        bonusAmount={spotOp.bonusAmount}
        bonusSuffix={spotOp.bonusSuffix}
        bonusConditions={spotOp.bonusConditions}
        bonusSlug={spotOp.bonusSlug}
        affiliateUrl={spotOp.affiliateUrl}
        locale={locale}
        pageType="jeux_categorie"
        placement="category_sticky_bar"
        showAlt={false}
      />
    </>
  )
}
