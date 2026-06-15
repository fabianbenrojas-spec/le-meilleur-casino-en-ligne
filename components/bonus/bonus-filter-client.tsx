'use client'

import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import type { Operator } from '@/config/operators'

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseWager(cond: string): number {
  const m = cond.match(/(\d+)\s*[xX]/)
  return m ? parseInt(m[1]!, 10) : 35
}

type BonusType = 'all' | 'bienvenue' | 'freespins' | 'crypto'
type SortKey = 'note' | 'amount' | 'wager'

function getBonusTypes(op: Operator): BonusType[] {
  const types: BonusType[] = ['bienvenue']
  if (op.bonusSuffix && op.bonusSuffix.includes('tours')) types.push('freespins')
  if (op.paymentMethods.some((p) => p === '₿' || p === 'ETH' || p === 'BTC')) types.push('crypto')
  return types
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LogoPh({ name }: { name: string }) {
  return (
    <div
      className="h-[50px] w-[134px] rounded-[8px] border border-dashed border-line-2 font-mono text-[8px] text-ink-3"
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 4px,transparent 4px,transparent 8px)',
      }}
      aria-hidden
    >
      <span className="sr-only">{name}</span>
    </div>
  )
}

function SpecChip({ iconPath, label, warn }: { iconPath: string; label: string; warn?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] rounded-[6px] border border-line bg-bg-sunken px-[9px] py-[4px] text-[11.5px] text-ink-2',
        warn && '[&_svg]:text-gold'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[12px] w-[12px] shrink-0 text-green"
        aria-hidden
      >
        <path d={iconPath} />
      </svg>
      {label}
    </span>
  )
}

function BonusCard({ op, rank, locale }: { op: Operator; rank: number; locale: string }) {
  const isTop = rank === 0
  const wagerX = parseWager(op.bonusConditions)

  return (
    <div
      className={cn(
        'relative rounded-[14px] border border-line bg-surface shadow-1 transition-[box-shadow,transform,border-color] duration-[180ms] hover:-translate-y-[2px] hover:shadow-3',
        isTop && 'border-[color-mix(in_srgb,var(--gold)_40%,var(--line))]'
      )}
      data-slug={op.slug}
      data-note={op.rating}
      data-amount={op.bonusAmountNumber}
      data-wager={wagerX}
      data-name={op.name}
    >
      {/* Rank badge */}
      {isTop && (
        <div
          className="absolute left-[18px] top-[-10px] inline-flex items-center gap-[6px] rounded-full px-[11px] py-[4px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-white shadow-1"
          style={{ background: 'var(--gold)' }}
          aria-label="Numéro 1"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[12px] w-[12px]" aria-hidden>
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
          </svg>
          N°1
        </div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 p-[20px_22px] md:grid-cols-[150px_1fr_250px] md:items-center md:gap-6">
        {/* Logo col */}
        <div className="flex flex-row items-center justify-between gap-[10px] md:flex-col md:items-start">
          <LogoPh name={op.name} />
          <ScorePill score={op.rating} gold={isTop} className="text-[13px]" />
        </div>

        {/* Middle col */}
        <div className="min-w-0">
          <div className="mb-[5px] font-serif text-[26px] font-semibold leading-[1.05] tracking-[-0.015em]">
            <span style={{ color: 'var(--green)' }}>{op.bonusAmount}</span>
            {op.bonusSuffix && <span className="text-ink"> {op.bonusSuffix}</span>}
          </div>
          <p className="mb-[11px] text-[13px] text-ink-3">
            <b className="font-semibold text-ink">{op.name}</b> · {op.bonusConditions}
          </p>
          <div className="flex flex-wrap gap-[7px]">
            <SpecChip
              iconPath="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v5l3.5 2"
              label={`${wagerX}× mise`}
            />
            <SpecChip
              iconPath="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              label="Validité 30 j"
              warn
            />
            <SpecChip
              iconPath="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6zM9 3v6h6"
              label="Slots + Live"
            />
          </div>
        </div>

        {/* Side col — CTA */}
        <div className="flex flex-col gap-[9px] border-t border-line pt-[14px] md:border-t-0 md:pt-0">
          <CTAButton
            href={op.affiliateUrl}
            variant="primary"
            size="default"
            arrow
            block
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="min-h-[54px] text-[16px] shadow-[0_4px_14px_-4px_color-mix(in_srgb,var(--green)_60%,transparent)]"
            data-event="affiliate_click"
            data-operator={op.slug}
            data-placement="bonus_listing"
            data-bonus={op.bonusSlug}
            data-page-type="bonus_hub"
            data-locale={locale}
          >
            Obtenir le bonus
          </CTAButton>
          <div className="flex gap-[6px]">
            <a
              href={`/casinos/${op.slug}/`}
              className="flex flex-1 items-center justify-center rounded-[8px] border border-line px-[6px] py-[7px] text-center text-[12px] text-ink-2 transition-[border-color,color] hover:border-green hover:text-green"
              data-event="review_click"
              data-operator={op.slug}
              data-placement="bonus_card_sublink"
              data-page-type="bonus_hub"
              data-locale={locale}
            >
              Avis
            </a>
            <a
              href={`/casinos/${op.slug}/#bonus`}
              className="flex flex-1 items-center justify-center rounded-[8px] border border-line px-[6px] py-[7px] text-center text-[12px] text-ink-2 transition-[border-color,color] hover:border-green hover:text-green"
              data-event="internal_link"
              data-operator={op.slug}
              data-placement="bonus_card_sublink"
              data-page-type="bonus_hub"
              data-locale={locale}
            >
              Conditions
            </a>
          </div>
          <p className="text-center text-[10.5px] leading-[1.4] text-ink-3">
            18+ · Jeu responsable · T&amp;C s&apos;appliquent
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Type chips config ─────────────────────────────────────────────────────────

const TYPE_CHIPS: { type: BonusType; label: string; iconPath: string }[] = [
  {
    type: 'all',
    label: 'Tous les bonus',
    iconPath: 'M4 6h16M4 12h16M4 18h16',
  },
  {
    type: 'bienvenue',
    label: 'Bienvenue',
    iconPath: 'M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z',
  },
  {
    type: 'freespins',
    label: 'Tours gratuits',
    iconPath: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z',
  },
  {
    type: 'crypto',
    label: 'Crypto',
    iconPath:
      'M9.5 2A2.5 2.5 0 007 4.5v15A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v-15A2.5 2.5 0 0014.5 2h-5zM12 6v12',
  },
]

// ── Main export ───────────────────────────────────────────────────────────────

export function BonusFilterClient({
  operators,
  locale,
}: {
  operators: Operator[]
  locale: string
}) {
  const [activeType, setActiveType] = useState<BonusType>('all')
  const [sortKey, setSortKey] = useState<SortKey>('note')

  const filtered = useMemo(() => {
    const list =
      activeType === 'all'
        ? operators
        : operators.filter((op) => getBonusTypes(op).includes(activeType))

    return [...list].sort((a, b) => {
      if (sortKey === 'amount') return b.bonusAmountNumber - a.bonusAmountNumber
      if (sortKey === 'wager') return parseWager(a.bonusConditions) - parseWager(b.bonusConditions)
      return b.rating - a.rating
    })
  }, [operators, activeType, sortKey])

  return (
    <div>
      {/* Toolbar: type chips + sort */}
      <div className="mb-[20px] flex flex-wrap items-center gap-[9px]">
        {TYPE_CHIPS.map((chip) => (
          <button
            key={chip.type}
            type="button"
            onClick={() => setActiveType(chip.type)}
            className={cn(
              'inline-flex cursor-pointer items-center gap-[8px] rounded-full border px-[16px] py-[9px] font-sans text-[13.5px] font-semibold transition-all duration-[150ms]',
              activeType === chip.type
                ? 'border-green bg-green text-white'
                : 'border-line-2 bg-surface text-ink-2 hover:border-ink-3 hover:text-ink'
            )}
            data-event="comparison_filter_use"
            data-filter={chip.type}
            data-page-type="bonus_hub"
            data-locale={locale}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[14px] w-[14px] shrink-0"
              aria-hidden
            >
              <path d={chip.iconPath} />
            </svg>
            {chip.label}
          </button>
        ))}

        {/* Sort — pushed right */}
        <div className="ml-auto flex items-center gap-[8px]">
          <label
            htmlFor="bn-sort"
            className="hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3 sm:block"
          >
            Trier par
          </label>
          <select
            id="bn-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="cursor-pointer rounded-[8px] border border-line-2 bg-surface px-[10px] py-[8px] font-sans text-[13px] font-semibold text-ink outline-none hover:border-green"
            data-event="comparison_sort_use"
            data-page-type="bonus_hub"
            data-locale={locale}
          >
            <option value="note">Note</option>
            <option value="amount">Montant</option>
            <option value="wager">Wager (↑)</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="mb-[16px] font-mono text-[12px] text-ink-3" aria-live="polite">
        {filtered.length} bonus{filtered.length > 1 ? '' : ''} trouvé
        {filtered.length > 1 ? 's' : ''}
      </p>

      {/* Card list */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-[16px]">
          {filtered.map((op, i) => (
            <BonusCard key={op.id} op={op} rank={i} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-line-2 bg-surface px-[20px] py-[56px] text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto mb-[12px] h-[36px] w-[36px] text-ink-3"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <h3 className="mb-[6px] font-serif text-[21px] font-semibold text-ink">
            Aucun bonus trouvé
          </h3>
          <p className="mb-[16px] text-[14px] text-ink-3">Aucun bonus ne correspond à ce filtre.</p>
          <button
            type="button"
            onClick={() => setActiveType('all')}
            className="inline-flex cursor-pointer items-center rounded-[8px] border border-green px-[16px] py-[9px] font-sans text-[13.5px] font-semibold text-green transition-colors hover:bg-green-50"
          >
            Voir tous les bonus
          </button>
        </div>
      )}
    </div>
  )
}
