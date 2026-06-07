'use client'

import { useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import type { Operator } from '@/config/operators'
import { cn } from '@/lib/utils'

interface Top10TableProps {
  operators: Operator[]
}

type SortKey = 'rating' | 'bonusAmountNumber' | 'rtp'
type SortDir = 'asc' | 'desc'

const columns: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Note' },
  { key: 'bonusAmountNumber', label: 'Bonus' },
  { key: 'rtp', label: 'RTP' },
]

export function Top10Table({ operators }: Top10TableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rating')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...operators].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av
    }
    return 0
  })

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-line shadow-2">
      <table className="w-full border-collapse bg-surface">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-[var(--header-h)] z-[5] border-b border-line bg-surface-2 px-4 py-[14px] text-left font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-3"
            >
              Rang
            </th>
            <th
              scope="col"
              className="sticky top-[var(--header-h)] z-[5] border-b border-line bg-surface-2 px-4 py-[14px] text-left font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-3"
            >
              Opérateur
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                onClick={() => handleSort(col.key)}
                aria-sort={
                  sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined
                }
                className="sticky top-[var(--header-h)] z-[5] cursor-pointer select-none border-b border-line bg-surface-2 px-4 py-[14px] text-left font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-3 hover:text-ink"
              >
                {col.label}
                <span
                  className={cn('ml-1 opacity-40', sortKey === col.key && 'text-green opacity-100')}
                  aria-hidden
                >
                  {sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                </span>
              </th>
            ))}
            <th
              scope="col"
              className="sticky top-[var(--header-h)] z-[5] border-b border-line bg-surface-2 px-4 py-[14px] text-left font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-3"
            >
              Paiements
            </th>
            <th className="sticky top-[var(--header-h)] z-[5] border-b border-line bg-surface-2 px-4 py-[14px]" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((op, rowIdx) => (
            <tr
              key={op.id}
              className="border-b border-line transition-colors last:border-b-0 hover:bg-surface-2"
            >
              {/* Rank */}
              <td className="w-[46px] px-4 py-4 text-center font-serif text-[22px] font-semibold text-ink-3">
                {rowIdx + 1}
              </td>
              {/* Operator */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {/* Logo placeholder */}
                  <div
                    className="grid h-[38px] w-[92px] shrink-0 place-items-center rounded-[6px] border border-dashed border-line-2 font-mono text-[10px] text-ink-3"
                    style={{
                      background:
                        'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
                    }}
                  >
                    {op.shortName ?? op.name.split(' ')[0]}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-ink">{op.name}</div>
                    <div className="font-mono text-[11px] text-ink-3">{op.licence}</div>
                  </div>
                </div>
              </td>
              {/* Note */}
              <td className="px-4 py-4" data-sort={op.rating}>
                <ScorePill score={op.rating} gold={rowIdx === 0} />
              </td>
              {/* Bonus */}
              <td className="px-4 py-4 text-[14.5px]" data-sort={op.bonusAmountNumber}>
                <strong className="font-serif text-[17px] font-semibold text-ink">
                  <span className="text-green">{op.bonusAmount}</span>
                </strong>
                {op.bonusSuffix && <span className="ml-1 text-ink-3">{op.bonusSuffix}</span>}
              </td>
              {/* RTP */}
              <td className="px-4 py-4" data-sort={op.rtp}>
                <span className="font-mono text-sm text-ink">{op.rtp.toFixed(1)}%</span>
              </td>
              {/* Payments */}
              <td className="px-4 py-4">
                <div className="flex gap-[5px]">
                  {op.paymentMethods.map((pm) => (
                    <span
                      key={pm}
                      className="grid h-[21px] min-w-[32px] place-items-center rounded-[4px] border border-line bg-bg-sunken px-1 font-mono text-[8px] font-semibold text-ink-3"
                    >
                      {pm}
                    </span>
                  ))}
                </div>
              </td>
              {/* CTA */}
              <td className="px-4 py-4">
                <CTAButton
                  href={op.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement="top10_table"
                  data-bonus={op.bonusSlug}
                  data-page-type="homepage"
                  data-locale="fr"
                >
                  Bonus
                </CTAButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
