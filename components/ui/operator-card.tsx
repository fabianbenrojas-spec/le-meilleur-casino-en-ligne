import Image from 'next/image'
import { Check, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BonusBadge } from './bonus-badge'
import { CTAButton } from './cta-button'
import { ScorePill } from './score-pill'
import type { GA4DataAttrs } from './cta-button'

// ── Shared operator data shape ──────────────────────────────────────────────
export interface OperatorCardData {
  id: string
  slug: string
  name: string
  logoUrl?: string
  licence: string
  rating: number
  ratingLabel?: string
  bonusAmount: string
  bonusSuffix?: string
  bonusConditions?: string
  tagline?: string
  features?: string[]
  pros?: string[]
  cons?: string[]
  verdict?: string
  affiliateUrl: string
}

// Logo placeholder (striped)
function LogoPlaceholder({ name, width, height }: { name: string; width: number; height: number }) {
  return (
    <div
      style={{
        width,
        height,
        background:
          'repeating-linear-gradient(135deg, var(--bg-sunken), var(--bg-sunken) 7px, transparent 7px, transparent 14px)',
      }}
      className="grid place-items-center rounded-lg border border-dashed border-line-2 font-mono text-[11px] text-ink-3"
    >
      {name}
    </div>
  )
}

export function LogoOrPlaceholder({
  logoUrl,
  name,
  width,
  height,
  priority = false,
}: {
  logoUrl?: string
  name: string
  width: number
  height: number
  priority?: boolean
}) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={`Logo ${name}`}
        width={width}
        height={height}
        priority={priority}
        className="object-contain"
      />
    )
  }
  return <LogoPlaceholder name={name} width={width} height={height} />
}

// ── 1. PodiumCard — homepage top-3 hero ────────────────────────────────────
interface PodiumCardProps {
  operator: OperatorCardData
  rank: 1 | 2 | 3
  ctaBonus?: string
  ctaReview?: string
  locale?: string
  ga4?: GA4DataAttrs
}

export function PodiumCard({
  operator,
  rank,
  ctaBonus,
  ctaReview,
  locale = 'fr',
  ga4,
}: PodiumCardProps) {
  const isFr = locale === 'fr'
  const resolvedCtaBonus = ctaBonus ?? (isFr ? 'Obtenir le bonus' : 'Get bonus')
  const resolvedCtaReview = ctaReview ?? (isFr ? "Lire l'avis" : 'Read review')
  const rankLabel = ['#1', '#2', '#3'][rank - 1] as string
  const isFirst = rank === 1

  return (
    <article
      className={cn(
        'relative flex flex-col gap-[15px] rounded-lg border border-line bg-surface p-[22px] shadow-2',
        isFirst && 'border-[color-mix(in_srgb,var(--gold)_45%,var(--line))] shadow-3'
      )}
    >
      {/* Rank badge */}
      <div
        className={cn(
          'absolute -left-px -top-px rounded-br-xl rounded-tl-[16px] px-3 py-[5px] font-mono text-xs font-semibold tracking-[0.03em] text-white',
          isFirst ? 'bg-gold' : 'bg-green'
        )}
      >
        {rankLabel}
      </div>

      <div className="flex items-center justify-between gap-3 pt-1.5">
        <LogoOrPlaceholder
          logoUrl={operator.logoUrl}
          name={operator.name}
          width={130}
          height={46}
        />
        <ScorePill score={operator.rating} gold={isFirst} />
      </div>

      <div>
        <p className="m-0 font-serif text-[21px] font-semibold leading-tight tracking-[-0.01em] text-ink">
          {operator.name}
        </p>
        <p className="m-0 mt-1 text-sm text-ink-2">{operator.licence}</p>
      </div>

      <BonusBadge
        amount={operator.bonusAmount}
        amountSuffix={operator.bonusSuffix}
        conditions={operator.bonusConditions}
        gold={isFirst}
        className="w-full"
      />

      <CTAButton
        href={operator.affiliateUrl}
        variant="primary"
        block
        arrow
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-event="affiliate_click"
        data-operator={operator.slug}
        data-placement="hero_podium"
        {...ga4}
      >
        {resolvedCtaBonus}
      </CTAButton>

      <CTAButton
        href={`/casinos/${operator.slug}/`}
        variant="secondary"
        block
        data-event="review_click"
        data-operator={operator.slug}
        data-placement="hero_podium"
      >
        {resolvedCtaReview}
      </CTAButton>
    </article>
  )
}

// ── 2. ListingCard — /casinos/ listing (cas-card) ──────────────────────────
interface ListingCardProps {
  operator: OperatorCardData
  isTop?: boolean
  ctaBonus?: string
  locale?: string
  ga4?: GA4DataAttrs
}

export function ListingCard({
  operator,
  isTop = false,
  ctaBonus,
  locale = 'fr',
  ga4,
}: ListingCardProps) {
  const resolvedCtaBonus = ctaBonus ?? (locale === 'fr' ? 'Obtenir le bonus' : 'Get bonus')
  return (
    <article
      className={cn(
        'grid items-center gap-[22px] rounded-lg border border-line bg-surface px-5 py-[18px] shadow-1 transition-shadow duration-[180ms] hover:shadow-3',
        'grid-cols-1 sm:grid-cols-[132px_1fr_220px]',
        isTop && 'border-[color-mix(in_srgb,var(--gold)_38%,var(--line))]'
      )}
    >
      {/* Logo column */}
      <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-start sm:justify-start">
        <LogoOrPlaceholder
          logoUrl={operator.logoUrl}
          name={operator.name}
          width={118}
          height={44}
        />
      </div>

      {/* Info column */}
      <div className="min-w-0">
        <div className="mb-[7px] flex flex-wrap items-center gap-3">
          <span className="font-serif text-[20px] font-semibold tracking-[-0.01em] text-ink">
            {operator.name}
          </span>
          <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[11px] text-ink-3">
            {operator.licence}
          </span>
        </div>
        {operator.features && (
          <div className="flex flex-wrap gap-[6px]">
            {operator.features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-[5px] rounded-[6px] border border-line bg-bg-sunken px-2 py-[3px] text-[11.5px] text-ink-2"
              >
                <Check size={11} className="flex-none text-green" aria-hidden />
                {feat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA column */}
      <div className="flex flex-col gap-[9px] border-t border-line pt-[14px] sm:border-0 sm:pt-0">
        <div className="flex items-center justify-between gap-2.5">
          <p className="text-[13px] text-ink-2">
            <span className="font-serif text-[17px] font-semibold text-ink">
              <span className="text-green">{operator.bonusAmount}</span>
            </span>
            {operator.bonusSuffix && ` ${operator.bonusSuffix}`}
          </p>
          <ScorePill score={operator.rating} gold={isTop} />
        </div>
        <CTAButton
          href={operator.affiliateUrl}
          variant="primary"
          size="sm"
          block
          arrow
          target="_blank"
          rel="noopener noreferrer nofollow"
          data-event="affiliate_click"
          data-operator={operator.slug}
          data-placement="casinos_listing"
          {...ga4}
        >
          {resolvedCtaBonus}
        </CTAButton>
      </div>
    </article>
  )
}

// ── 4. FeaturedCard — "Coup de cœur" editorial pick ───────────────────────
interface FeaturedCardProps {
  operator: OperatorCardData
  badgeLabel?: string
  ctaBonus?: string
  ctaReview?: string
  locale?: string
  ga4?: GA4DataAttrs
}

export function FeaturedCard({
  operator,
  badgeLabel,
  ctaBonus,
  ctaReview,
  locale = 'fr',
  ga4,
}: FeaturedCardProps) {
  const isFr = locale === 'fr'
  const resolvedBadgeLabel = badgeLabel ?? (isFr ? 'Coup de cœur' : "Editor's pick")
  const resolvedCtaBonus = ctaBonus ?? (isFr ? 'Obtenir le bonus' : 'Get bonus')
  const resolvedCtaReview = ctaReview ?? (isFr ? "Lire l'avis" : 'Read review')
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-xl border-2 bg-surface shadow-3',
        'border-[color-mix(in_srgb,var(--gold)_55%,var(--line))]'
      )}
    >
      {/* "Coup de cœur" badge */}
      <div className="absolute -left-px -top-px rounded-br-xl rounded-tl-[18px] bg-gold px-[14px] py-[6px] font-mono text-[11px] font-semibold tracking-[0.04em] text-white">
        ★ {resolvedBadgeLabel}
      </div>

      <div className="grid grid-cols-1 gap-5 p-[28px_26px] pt-10 lg:grid-cols-[1fr_300px]">
        {/* Left: info */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-wrap items-center gap-[14px]">
            <LogoOrPlaceholder
              logoUrl={operator.logoUrl}
              name={operator.name}
              width={130}
              height={46}
            />
            <ScorePill score={operator.rating} gold />
            <span className="rounded-[5px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[11px] text-ink-3">
              {operator.licence}
            </span>
          </div>

          <div>
            <p className="font-serif text-[23px] font-semibold tracking-[-0.01em] text-ink">
              {operator.name}
            </p>
            {operator.verdict && (
              <p className="mt-[5px] text-[14.5px] leading-[1.55] text-ink-2">{operator.verdict}</p>
            )}
          </div>

          {operator.pros && operator.pros.length > 0 && (
            <ul
              className="flex flex-col gap-[7px]"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {operator.pros.slice(0, 3).map((pro) => (
                <li
                  key={pro}
                  className="flex items-start gap-[9px] text-[13.5px] leading-[1.4] text-ink-2"
                >
                  <Check size={14} className="mt-[2px] flex-none text-green" aria-hidden />
                  {pro}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: bonus + CTAs */}
        <div className="flex flex-col gap-[13px] lg:border-l lg:border-line lg:pl-6">
          <BonusBadge
            amount={operator.bonusAmount}
            amountSuffix={operator.bonusSuffix}
            conditions={operator.bonusConditions}
            gold
            locale={locale}
            className="w-full"
          />
          <CTAButton
            href={operator.affiliateUrl}
            variant="primary"
            block
            arrow
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-event="affiliate_click"
            data-operator={operator.slug}
            data-placement="featured_card"
            {...ga4}
          >
            {resolvedCtaBonus}
          </CTAButton>
          <CTAButton
            href={`/casinos/${operator.slug}/`}
            variant="secondary"
            block
            data-event="review_click"
            data-operator={operator.slug}
            data-placement="featured_card"
          >
            {resolvedCtaReview}
          </CTAButton>
        </div>
      </div>
    </article>
  )
}

// ── 3. RankCard — comparatif mini-fiche avec médaille ──────────────────────
type Medal = 1 | 2 | 3

const medalColors: Record<Medal, { numClass: string; borderClass: string; bgClass: string }> = {
  1: {
    numClass: 'text-gold-ink',
    borderClass: 'border-[color-mix(in_srgb,var(--gold)_40%,var(--line))]',
    bgClass: 'bg-[color-mix(in_srgb,var(--gold)_14%,var(--surface-2))]',
  },
  2: { numClass: 'text-[#7C8088]', borderClass: 'border-line', bgClass: 'bg-surface-2' },
  3: { numClass: 'text-[#A9743F]', borderClass: 'border-line', bgClass: 'bg-surface-2' },
}

interface RankCardProps {
  operator: OperatorCardData
  rank: number
  medal?: Medal
  ctaBonus?: string
  locale?: string
  ga4?: GA4DataAttrs
}

export function RankCard({ operator, rank, medal, ctaBonus, locale = 'fr', ga4 }: RankCardProps) {
  const resolvedCtaBonus = ctaBonus ?? (locale === 'fr' ? 'Obtenir le bonus' : 'Get bonus')
  const colors = medal
    ? medalColors[medal]
    : { numClass: 'text-ink-3', borderClass: 'border-line', bgClass: 'bg-surface-2' }

  return (
    <article
      className={cn(
        'grid overflow-hidden rounded-lg border bg-surface shadow-1 transition-shadow hover:shadow-3',
        'grid-cols-[56px_1fr] lg:grid-cols-[70px_1fr_304px]',
        medal === 1 ? 'shadow-2' : '',
        colors.borderClass
      )}
    >
      {/* Rank column */}
      <div className={cn('relative grid place-items-center border-r border-line', colors.bgClass)}>
        {medal === 1 && (
          <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.06em] text-gold-ink">
            TOP
          </span>
        )}
        <span className={cn('font-serif text-[30px] font-semibold leading-none', colors.numClass)}>
          {rank}
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-[13px] p-[20px_24px]">
        <div className="flex flex-wrap items-center gap-[14px]">
          <LogoOrPlaceholder
            logoUrl={operator.logoUrl}
            name={operator.name}
            width={110}
            height={40}
          />
          <span className="font-serif text-[21px] font-semibold tracking-[-0.01em] text-ink">
            {operator.name}
          </span>
          <span className="font-mono text-[11px] text-ink-3">{operator.licence}</span>
          <ScorePill score={operator.rating} gold={medal === 1} className="ml-auto" />
        </div>

        {operator.verdict && (
          <p className="m-0 text-[14.5px] leading-[1.55] text-ink-2">{operator.verdict}</p>
        )}

        {(operator.pros ?? operator.cons) && (
          <div className="grid grid-cols-2 gap-x-[22px] gap-y-2">
            {operator.pros?.slice(0, 3).map((pro) => (
              <div
                key={pro}
                className="flex items-start gap-[9px] text-[13.5px] leading-[1.4] text-ink-2"
              >
                <Check size={14} className="mt-[2px] flex-none text-green" aria-hidden />
                {pro}
              </div>
            ))}
            {operator.cons?.slice(0, 1).map((con) => (
              <div
                key={con}
                className="flex items-start gap-[9px] text-[13.5px] leading-[1.4] text-ink-2"
              >
                <X size={14} className="mt-[2px] flex-none text-red" aria-hidden />
                {con}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Side CTA — wraps below on tablet */}
      <div className="col-span-full flex flex-wrap items-center gap-[11px] border-t border-line bg-surface-2 p-[20px_22px] lg:col-auto lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
        <BonusBadge
          amount={operator.bonusAmount}
          amountSuffix={operator.bonusSuffix}
          conditions={operator.bonusConditions}
          gold={medal === 1}
          locale={locale}
          className="min-w-[160px] flex-1"
        />
        <CTAButton
          href={operator.affiliateUrl}
          variant="primary"
          block
          arrow
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="min-w-[150px] flex-1"
          data-event="affiliate_click"
          data-operator={operator.slug}
          data-placement="comparatif_card"
          {...ga4}
        >
          {resolvedCtaBonus}
        </CTAButton>
      </div>
    </article>
  )
}
