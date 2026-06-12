'use client'

import { useCallback, useState } from 'react'
import { Filter, SlidersHorizontal, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CTAButton } from './cta-button'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
  type?: 'checkbox' | 'range'
  rangeMin?: number
  rangeMax?: number
  rangeStep?: number
  rangeSuffix?: string
}

export type ActiveFilters = Record<string, string[]>

interface FilterSidebarInnerProps {
  groups: FilterGroup[]
  active: ActiveFilters
  onToggle: (groupKey: string, value: string) => void
  onReset: () => void
  onRangeChange?: (groupKey: string, value: string) => void
}

// Shared filter UI — used by both sidebar and bottom sheet
function FilterGroupUI({
  group,
  active,
  onToggle,
  onRangeChange,
}: {
  group: FilterGroup
  active: ActiveFilters
  onToggle: FilterSidebarInnerProps['onToggle']
  onRangeChange?: FilterSidebarInnerProps['onRangeChange']
}) {
  const groupActive = active[group.key] ?? []

  if (group.type === 'range') {
    const current = groupActive[0] ?? String(group.rangeMin ?? 0)
    return (
      <div className="border-b border-line px-[18px] py-4 last:border-b-0">
        <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.07em] text-ink-3">
          {group.label}
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={group.rangeMin}
            max={group.rangeMax}
            step={group.rangeStep ?? 0.1}
            value={current}
            onChange={(e) => onRangeChange?.(group.key, e.target.value)}
            aria-label={group.label}
            aria-valuetext={`${current}${group.rangeSuffix ?? ''}`}
            className="h-1 flex-1 accent-[var(--green)]"
            data-event="comparison_filter_use"
            data-filter-group={group.key}
          />
          <span className="min-w-[48px] text-right font-mono text-[13px] font-semibold text-green">
            {current}
            {group.rangeSuffix ?? ''}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b border-line px-[18px] py-4 last:border-b-0">
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.07em] text-ink-3">
        {group.label}
      </h3>
      <div className="flex flex-col gap-0">
        {group.options.map((opt) => {
          const checked = groupActive.includes(opt.value)
          return (
            <label
              key={opt.value}
              className="flex cursor-pointer select-none items-center gap-[11px] py-[6px] text-[14px] text-ink-2"
            >
              <input
                type="checkbox"
                className="peer absolute h-0 w-0 opacity-0"
                checked={checked}
                onChange={() => onToggle(group.key, opt.value)}
                data-event="comparison_filter_use"
                data-filter-group={group.key}
                data-filter-value={opt.value}
              />
              <span
                className={cn(
                  'grid h-[19px] w-[19px] flex-none place-items-center rounded-[5px] border-[1.5px] border-solid transition-[border-color,background] duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green',
                  checked ? 'border-green bg-green' : 'border-line-2 bg-surface'
                )}
              >
                {checked && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </span>
              <span className="flex-1">{opt.label}</span>
              {opt.count != null && (
                <span className="font-mono text-[11.5px] text-ink-3">{opt.count}</span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

// ── Desktop sticky sidebar ──────────────────────────────────────────────────
interface FilterSidebarProps {
  groups: FilterGroup[]
  active: ActiveFilters
  onChange: (next: ActiveFilters) => void
  className?: string
  locale?: string
}

export function FilterSidebar({
  groups,
  active,
  onChange,
  className,
  locale = 'fr',
}: FilterSidebarProps) {
  const isFr = locale === 'fr'
  const hasActive = Object.values(active).some((v) => v.length > 0)

  const toggle = useCallback(
    (groupKey: string, value: string) => {
      const current = active[groupKey] ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      onChange({ ...active, [groupKey]: next })
    },
    [active, onChange]
  )

  const reset = useCallback(() => onChange({}), [onChange])

  const handleRange = useCallback(
    (groupKey: string, value: string) => {
      onChange({ ...active, [groupKey]: [value] })
    },
    [active, onChange]
  )

  // Active filter chips
  const chips = Object.entries(active).flatMap(([groupKey, values]) =>
    values.map((value) => {
      const group = groups.find((g) => g.key === groupKey)
      const option = group?.options.find((o) => o.value === value)
      return { groupKey, value, label: option?.label ?? value }
    })
  )

  return (
    <div className={cn('hidden md:block', className)}>
      {/* Active chips */}
      {chips.length > 0 && (
        <div className="mb-[18px] flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={`${chip.groupKey}-${chip.value}`}
              className="inline-flex items-center gap-[7px] rounded-full border border-[color-mix(in_srgb,var(--green)_28%,var(--line))] bg-green-50 py-[5px] pl-3 pr-2 text-[12.5px] font-semibold text-green-ink"
            >
              {chip.label}
              <button
                type="button"
                onClick={() => toggle(chip.groupKey, chip.value)}
                className="grid h-4 w-4 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-green-ink hover:bg-[color-mix(in_srgb,var(--green)_18%,transparent)]"
                aria-label={
                  isFr ? `Supprimer le filtre ${chip.label}` : `Remove filter ${chip.label}`
                }
              >
                <X size={12} aria-hidden />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Sidebar */}
      <div className="sticky top-[calc(var(--header-h)+16px)] overflow-hidden rounded-lg border border-line bg-surface shadow-1">
        <div className="flex items-center justify-between border-b border-line px-[18px] py-4">
          <h2 className="m-0 flex items-center gap-2 text-[15px] font-bold text-ink">
            <Filter size={16} className="text-green" aria-hidden />
            {isFr ? 'Filtres' : 'Filters'}
          </h2>
          {hasActive && (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-[6px] border-0 bg-transparent px-[6px] py-1 text-[12.5px] font-semibold text-green hover:bg-green-50"
            >
              {isFr ? 'Réinitialiser' : 'Reset'}
            </button>
          )}
        </div>
        {groups.map((group) => (
          <FilterGroupUI
            key={group.key}
            group={group}
            active={active}
            onToggle={toggle}
            onRangeChange={handleRange}
          />
        ))}
      </div>
    </div>
  )
}

// ── Mobile bottom sheet ─────────────────────────────────────────────────────
interface FilterBottomSheetProps {
  groups: FilterGroup[]
  active: ActiveFilters
  onChange: (next: ActiveFilters) => void
  locale?: string
}

export function FilterBottomSheet({
  groups,
  active,
  onChange,
  locale = 'fr',
}: FilterBottomSheetProps) {
  const isFr = locale === 'fr'
  const [sheetOpen, setSheetOpen] = useState(false)
  const [draft, setDraft] = useState<ActiveFilters>(active)

  const activeCount = Object.values(active).reduce((sum, arr) => sum + arr.length, 0)

  function open() {
    setDraft(active) // sync draft with current state
    setSheetOpen(true)
  }
  function apply() {
    onChange(draft)
    setSheetOpen(false)
  }
  function reset() {
    setDraft({})
    onChange({})
    setSheetOpen(false)
  }

  const toggleDraft = useCallback(
    (groupKey: string, value: string) => {
      const current = draft[groupKey] ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      setDraft({ ...draft, [groupKey]: next })
    },
    [draft]
  )

  const handleRangeDraft = useCallback(
    (groupKey: string, value: string) => {
      setDraft({ ...draft, [groupKey]: [value] })
    },
    [draft]
  )

  return (
    <>
      {/* Mobile trigger — hidden on desktop */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={open}
          className="font-inherit inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-[9px] rounded border-[1.5px] border-solid border-line-2 bg-surface text-[15px] font-bold text-ink"
        >
          <SlidersHorizontal size={17} aria-hidden />
          {isFr ? 'Filtres' : 'Filters'}
          {activeCount > 0 && (
            <span className="grid min-h-[19px] min-w-[19px] place-items-center rounded-full bg-green px-[5px] font-mono text-[11px] text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Overlay */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-[rgba(10,12,18,.45)] backdrop-blur-[2px]"
          onClick={(e) => e.target === e.currentTarget && setSheetOpen(false)}
        >
          <div
            className="flex max-h-[86vh] w-full max-w-[560px] flex-col rounded-t-xl bg-surface shadow-3"
            style={{ animation: 'sheetUp .28s ease' }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-[18px]">
              <h2 className="m-0 font-serif text-[20px] font-semibold text-ink">
                {isFr ? 'Filtres' : 'Filters'}
              </h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-[9px] border border-line-2 bg-surface"
                aria-label={isFr ? 'Fermer' : 'Close'}
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {groups.map((group) => (
                <FilterGroupUI
                  key={group.key}
                  group={group}
                  active={draft}
                  onToggle={toggleDraft}
                  onRangeChange={handleRangeDraft}
                />
              ))}
            </div>

            <div className="flex gap-3 border-t border-line p-[14px] pb-[calc(14px+env(safe-area-inset-bottom))]">
              <CTAButton variant="secondary" size="sm" block onClick={reset}>
                {isFr ? 'Réinitialiser' : 'Reset'}
              </CTAButton>
              <CTAButton variant="primary" size="sm" block onClick={apply}>
                {isFr ? 'Voir les résultats' : 'View results'}
              </CTAButton>
            </div>
          </div>
        </div>
      )}

      {/* Sheet animation keyframe */}
      <style>{`@keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </>
  )
}
