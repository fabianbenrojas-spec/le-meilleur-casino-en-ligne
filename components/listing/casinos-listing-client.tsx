'use client'

import { useMemo, useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
import type { Operator } from '@/config/operators'
import {
  FilterBottomSheet,
  FilterSidebar,
  type ActiveFilters,
} from '@/components/ui/filter-sidebar'
import type { FilterGroup } from '@/components/ui/filter-sidebar'

interface CasinosListingClientProps {
  operators: Operator[]
}

const filterGroups: FilterGroup[] = [
  {
    key: 'bonus',
    label: 'Bonus de bienvenue',
    options: [
      { value: 'b1', label: "Jusqu'à 200 €", count: 2 },
      { value: 'b2', label: '200 – 500 €', count: 5 },
      { value: 'b3', label: '500 – 1 000 €', count: 2 },
      { value: 'b4', label: '1 000 €+', count: 1 },
    ],
  },
  {
    key: 'rtp',
    label: 'RTP minimum',
    type: 'range',
    rangeMin: 94.5,
    rangeMax: 97,
    rangeStep: 0.1,
    rangeSuffix: '%',
    options: [],
  },
  {
    key: 'payment',
    label: 'Méthodes de paiement',
    options: [
      { value: 'visa', label: 'Visa / Mastercard' },
      { value: 'crypto', label: 'Bitcoin / Crypto' },
      { value: 'paysafe', label: 'Paysafecard' },
    ],
  },
]

const bonusRanges: Record<string, { min: number; max: number }> = {
  b1: { min: 0, max: 199 },
  b2: { min: 200, max: 499 },
  b3: { min: 500, max: 999 },
  b4: { min: 1000, max: Infinity },
}

const paymentMap: Record<string, string[]> = {
  visa: ['VISA', 'MC'],
  crypto: ['₿', 'ETH', 'LTC', 'DOGE'],
  paysafe: ['PAYS'],
}

type SortKey = 'rating' | 'bonusAmountNumber' | 'rtp' | 'name'

export function CasinosListingClient({ operators }: CasinosListingClientProps) {
  const [active, setActive] = useState<ActiveFilters>({})
  const [sortKey, setSortKey] = useState<SortKey>('rating')

  const filtered = useMemo(() => {
    let result = [...operators]

    // Bonus filter
    const bonusFilters = active['bonus'] ?? []
    if (bonusFilters.length > 0) {
      result = result.filter((op) =>
        bonusFilters.some((key) => {
          const range = bonusRanges[key]
          return range && op.bonusAmountNumber >= range.min && op.bonusAmountNumber <= range.max
        })
      )
    }

    // RTP filter
    const rtpFilter = active['rtp']?.[0]
    if (rtpFilter) {
      result = result.filter((op) => op.rtp >= parseFloat(rtpFilter))
    }

    // Payment filter
    const paymentFilters = active['payment'] ?? []
    if (paymentFilters.length > 0) {
      result = result.filter((op) =>
        paymentFilters.some((key) => {
          const methods = paymentMap[key] ?? []
          return methods.some((m) => op.paymentMethods.includes(m))
        })
      )
    }

    // Sort
    result.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name, 'fr')
      if (sortKey === 'rating') return b.rating - a.rating
      if (sortKey === 'bonusAmountNumber') return b.bonusAmountNumber - a.bonusAmountNumber
      if (sortKey === 'rtp') return b.rtp - a.rtp
      return 0
    })

    return result
  }, [operators, active, sortKey])

  const activeChipCount = Object.values(active).reduce((s, arr) => s + arr.length, 0)

  return (
    <div className="mx-auto max-w-site px-8 sm:px-[18px]">
      <div className="grid grid-cols-1 items-start gap-8 pb-16 pt-7 lg:grid-cols-[268px_1fr]">
        {/* Desktop sidebar */}
        <FilterSidebar groups={filterGroups} active={active} onChange={setActive} />

        {/* Results */}
        <div>
          {/* Mobile filter bar */}
          <div className="bg-bg/92 sticky top-[var(--header-h)] z-30 mb-1.5 flex gap-2.5 py-3 backdrop-blur-[10px] lg:hidden">
            <FilterBottomSheet groups={filterGroups} active={active} onChange={setActive} />
            {/* Sort select */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="font-inherit min-h-[48px] flex-1 appearance-none rounded border border-line-2 bg-surface px-3 text-[13.5px] font-semibold text-ink"
              data-event="comparison_sort_use"
            >
              <option value="rating">Trier : Note ↓</option>
              <option value="bonusAmountNumber">Bonus ↓</option>
              <option value="rtp">RTP ↓</option>
              <option value="name">Alphabétique</option>
            </select>
          </div>

          {/* Results header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14.5px] text-ink-2">
              <strong className="text-ink">{filtered.length}</strong> casino
              {filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
              {activeChipCount > 0 && (
                <span className="ml-1 text-ink-3">
                  ({activeChipCount} filtre{activeChipCount > 1 ? 's' : ''} actif
                  {activeChipCount > 1 ? 's' : ''})
                </span>
              )}
            </p>
            {/* Desktop sort */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-[13px] text-ink-3">Trier :</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="font-inherit rounded-lg border border-line-2 bg-surface px-3 py-[9px] text-[13.5px] font-semibold text-ink"
                data-event="comparison_sort_use"
              >
                <option value="rating">Note ↓</option>
                <option value="bonusAmountNumber">Bonus ↓</option>
                <option value="rtp">RTP ↓</option>
                <option value="name">Alphabétique</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-[14px]">
              {filtered.map((op, i) => (
                <ListingCard
                  key={op.id}
                  operator={op}
                  isTop={i === 0}
                  ga4={{ 'data-page-type': 'casinos_list', 'data-locale': 'fr' }}
                />
              ))}
            </div>
          ) : (
            <div className="py-15 rounded-lg border border-dashed border-line-2 bg-surface text-center">
              <p className="mb-4 font-serif text-[21px] font-semibold text-ink">
                Aucun casino trouvé
              </p>
              <p className="mb-4 text-[14px] text-ink-3">Essayez d&apos;élargir vos filtres.</p>
              <CTAButton variant="secondary" size="sm" onClick={() => setActive({})}>
                Réinitialiser les filtres
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
