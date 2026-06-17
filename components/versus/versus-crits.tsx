'use client'

import { useEffect, useRef, useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { cn } from '@/lib/utils'

export interface CritData {
  id: string
  label: string
  num: string
  iconPath: string
  /** 'label' skips the 0-100 progress bar — use when no comparable score exists (default 'bar') */
  displayMode?: 'bar' | 'label'
  barA: number // 0-100
  barB: number // 0-100
  labelA: string
  labelB: string
  proseA: string
  proseB: string
  winner: 'a' | 'b' | 'tie'
  deepA: string[]
  deepB: string[]
}

interface OperatorCtaInfo {
  name: string
  slug: string
  affiliateUrl: string
  bonusSlug: string
}

interface VersusCritsProps {
  crits: CritData[]
  opA: OperatorCtaInfo
  opB: OperatorCtaInfo
  winnerSlug: string
  locale: string
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-[2px] h-[15px] w-[15px] shrink-0"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={cn('h-[14px] w-[14px] transition-transform duration-[250ms]', className)}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function CritBlock({
  crit,
  opA,
  opB,
  locale,
}: {
  crit: CritData
  opA: OperatorCtaInfo
  opB: OperatorCtaInfo
  locale: string
}) {
  const nameA = opA.name
  const nameB = opB.name
  const [animated, setAnimated] = useState(false)
  const [deepOpen, setDeepOpen] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      const t = setTimeout(() => setAnimated(true), 0)
      return () => clearTimeout(t)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAnimated(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 }
    )
    if (blockRef.current) io.observe(blockRef.current)
    return () => io.disconnect()
  }, [])

  const hasDeep = crit.deepA.length > 0 || crit.deepB.length > 0

  const winA = crit.winner === 'a'
  const winB = crit.winner === 'b'
  const isTie = crit.winner === 'tie'

  return (
    <div
      ref={blockRef}
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-1"
    >
      {/* Criterion header */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-[22px] py-[15px]">
        <div className="flex items-center gap-[12px]">
          <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-green-50 text-green">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[18px] w-[18px]"
              aria-hidden
            >
              <path d={crit.iconPath} />
            </svg>
          </div>
          <div>
            <h3 className="m-0 font-serif text-[20px] font-semibold leading-none text-ink">
              {crit.label}
            </h3>
            <div className="mt-[2px] font-mono text-[11px] text-ink-3">{crit.num}</div>
          </div>
        </div>

        {/* Winner pill */}
        <div
          className={cn(
            'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-[13px] py-[5px] text-[12.5px] font-bold',
            isTie
              ? 'border-line bg-bg-sunken text-ink-3'
              : 'border-[color-mix(in_srgb,var(--green)_40%,var(--line))] bg-green-50 text-green-ink'
          )}
        >
          {!isTie && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-[13px] w-[13px] text-green"
              aria-hidden
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
          {isTie ? 'Égalité' : winA ? nameA : nameB}
        </div>
      </div>

      {/* Comparison row: animated bar (score-based criteria) or label-only (no invented score) */}
      {crit.displayMode === 'label' ? (
        <div className="flex flex-col gap-[10px] px-[22px] pb-[4px] pt-[18px]">
          {/* Row A */}
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[8px] text-[13px] font-semibold text-ink">
              <span
                className={cn(
                  'inline-block h-[9px] w-[9px] shrink-0 rounded-full',
                  winA ? 'bg-green' : 'bg-ink-3'
                )}
                aria-hidden
              />
              <span className="truncate">{nameA}</span>
            </div>
            <span
              className={cn(
                'font-mono text-[13px] font-semibold',
                winA ? 'text-green-ink' : 'text-ink-2'
              )}
            >
              {crit.labelA}
            </span>
          </div>
          {/* Row B */}
          <div className="flex items-center justify-between gap-[12px]">
            <div className="flex items-center gap-[8px] text-[13px] font-semibold text-ink">
              <span
                className={cn(
                  'inline-block h-[9px] w-[9px] shrink-0 rounded-full',
                  winB ? 'bg-green' : 'bg-ink-3'
                )}
                aria-hidden
              />
              <span className="truncate">{nameB}</span>
            </div>
            <span
              className={cn(
                'font-mono text-[13px] font-semibold',
                winB ? 'text-green-ink' : 'text-ink-2'
              )}
            >
              {crit.labelB}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[12px] px-[22px] pb-[4px] pt-[18px]">
          {/* Bar A */}
          <div
            className="grid items-center gap-[12px]"
            style={{ gridTemplateColumns: '96px 1fr 42px' }}
          >
            <div className="flex items-center gap-[8px] text-[13px] font-semibold text-ink">
              <span
                className={cn(
                  'inline-block h-[9px] w-[9px] shrink-0 rounded-full',
                  winA ? 'bg-green' : 'bg-ink-3'
                )}
                aria-hidden
              />
              <span className="truncate">{nameA}</span>
            </div>
            <div className="block h-[9px] overflow-hidden rounded-[5px] bg-bg-sunken">
              <span
                className="block h-full rounded-[5px]"
                style={{
                  width: animated ? `${crit.barA}%` : '0%',
                  background: winA ? 'var(--green)' : 'var(--ink-3)',
                  transition: animated ? 'width 1.05s cubic-bezier(0.2,0.7,0.25,1)' : 'none',
                }}
              />
            </div>
            <span className="text-right font-mono text-[12.5px] font-medium text-ink-2">
              {crit.labelA}
            </span>
          </div>
          {/* Bar B */}
          <div
            className="grid items-center gap-[12px]"
            style={{ gridTemplateColumns: '96px 1fr 42px' }}
          >
            <div className="flex items-center gap-[8px] text-[13px] font-semibold text-ink">
              <span
                className={cn(
                  'inline-block h-[9px] w-[9px] shrink-0 rounded-full',
                  winB ? 'bg-green' : 'bg-ink-3'
                )}
                aria-hidden
              />
              <span className="truncate">{nameB}</span>
            </div>
            <div className="block h-[9px] overflow-hidden rounded-[5px] bg-bg-sunken">
              <span
                className="block h-full rounded-[5px]"
                style={{
                  width: animated ? `${crit.barB}%` : '0%',
                  background: winB ? 'var(--green)' : 'var(--ink-3)',
                  transition: animated ? 'width 1.05s cubic-bezier(0.2,0.7,0.25,1)' : 'none',
                }}
              />
            </div>
            <span className="text-right font-mono text-[12.5px] font-medium text-ink-2">
              {crit.labelB}
            </span>
          </div>
        </div>
      )}

      {/* Prose split */}
      <div className="mt-[4px] grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr]">
        <div
          className={cn(
            'px-[22px] py-[18px]',
            winA && 'bg-[color-mix(in_srgb,var(--green-50)_55%,transparent)]'
          )}
        >
          <div className="mb-[9px] flex items-center gap-[9px]">
            <div
              className="h-[28px] w-[80px] rounded border border-dashed border-line-2 bg-bg-sunken font-mono text-[8px] text-ink-3"
              aria-hidden
            />
          </div>
          <p className="m-0 text-[14px] leading-[1.62] text-ink-2">{crit.proseA}</p>
          {!isTie && (
            <CTAButton
              href={opA.affiliateUrl}
              variant={winA ? 'primary' : 'secondary'}
              size="sm"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-[14px]"
              data-event="affiliate_click"
              data-operator={opA.slug}
              data-placement={`versus_section_${crit.id}`}
              data-bonus={opA.bonusSlug}
              data-page-type="versus"
              data-locale={locale}
            >
              {winA ? `Jouer chez ${nameA} →` : `Voir ${nameA}`}
            </CTAButton>
          )}
        </div>
        <div className="h-px bg-line sm:h-auto" />
        <div
          className={cn(
            'px-[22px] py-[18px]',
            winB && 'bg-[color-mix(in_srgb,var(--green-50)_55%,transparent)]'
          )}
        >
          <div className="mb-[9px] flex items-center gap-[9px]">
            <div
              className="h-[28px] w-[80px] rounded border border-dashed border-line-2 bg-bg-sunken font-mono text-[8px] text-ink-3"
              aria-hidden
            />
          </div>
          <p className="m-0 text-[14px] leading-[1.62] text-ink-2">{crit.proseB}</p>
          {!isTie && (
            <CTAButton
              href={opB.affiliateUrl}
              variant={winB ? 'primary' : 'secondary'}
              size="sm"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-[14px]"
              data-event="affiliate_click"
              data-operator={opB.slug}
              data-placement={`versus_section_${crit.id}`}
              data-bonus={opB.bonusSlug}
              data-page-type="versus"
              data-locale={locale}
            >
              {winB ? `Jouer chez ${nameB} →` : `Voir ${nameB}`}
            </CTAButton>
          )}
        </div>
      </div>

      {/* Footer: takeaway + deep-dive toggle */}
      {hasDeep && (
        <div className="flex flex-wrap items-center gap-[12px_18px] border-t border-line bg-surface-2 px-[22px] py-[13px]">
          <button
            type="button"
            onClick={() => setDeepOpen((v) => !v)}
            aria-expanded={deepOpen}
            className="ml-auto inline-flex cursor-pointer items-center gap-[7px] rounded-[8px] border border-line-2 bg-transparent px-[12px] py-[7px] font-sans text-[12.5px] font-semibold text-ink-2 transition-[border-color,color] hover:border-green hover:text-green"
          >
            {deepOpen ? 'Masquer le détail' : 'Voir le détail du test'}
            <ChevronDown className={deepOpen ? 'rotate-180' : ''} />
          </button>
        </div>
      )}

      {/* Deep-dive (expandable) */}
      {hasDeep && (
        <div
          className="overflow-hidden transition-[grid-template-rows] duration-[350ms]"
          style={{ display: 'grid', gridTemplateRows: deepOpen ? '1fr' : '0fr' }}
        >
          <div className="min-h-0">
            <div className="grid grid-cols-1 gap-0 border-t border-dashed border-line px-[22px] pb-[20px] pt-[16px] sm:grid-cols-2 sm:gap-x-8">
              {crit.deepA.length > 0 && (
                <div>
                  <h4 className="mb-[9px] font-mono text-[11px] uppercase tracking-[0.07em] text-ink-3">
                    {nameA}
                  </h4>
                  <ul className="flex flex-col gap-[8px]">
                    {crit.deepA.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-[9px] text-[13.5px] leading-[1.5] text-green"
                      >
                        <CheckIcon />
                        <span className="text-ink-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {crit.deepB.length > 0 && (
                <div className={crit.deepA.length > 0 ? 'mt-4 sm:mt-0' : ''}>
                  <h4 className="mb-[9px] font-mono text-[11px] uppercase tracking-[0.07em] text-ink-3">
                    {nameB}
                  </h4>
                  <ul className="flex flex-col gap-[8px]">
                    {crit.deepB.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-[9px] text-[13.5px] leading-[1.5] text-green"
                      >
                        <CheckIcon />
                        <span className="text-ink-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function VersusCrits({
  crits,
  opA,
  opB,
  winnerSlug: _winnerSlug,
  locale,
}: VersusCritsProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      {crits.map((crit) => (
        <CritBlock key={crit.id} crit={crit} opA={opA} opB={opB} locale={locale} />
      ))}
    </div>
  )
}
