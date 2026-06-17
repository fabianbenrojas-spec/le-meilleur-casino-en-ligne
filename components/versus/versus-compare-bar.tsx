'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import type { Operator } from '@/config/operators'

type OpSlice = Pick<
  Operator,
  'name' | 'slug' | 'rating' | 'bonusAmount' | 'bonusSuffix' | 'bonusSlug' | 'affiliateUrl'
>

interface VersusCompareBarProps {
  opA: OpSlice
  opB: OpSlice
  winnerSlug: string
  locale: string
}

function LogoPh({ name: _name }: { name: string }) {
  return (
    <div
      className="hidden h-[30px] w-[64px] shrink-0 rounded border border-dashed border-line-2 font-mono text-[8px] text-ink-3 sm:block"
      style={{
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 4px,transparent 4px,transparent 8px)',
      }}
      aria-hidden
    />
  )
}

export function VersusCompareBar({ opA, opB, winnerSlug, locale }: VersusCompareBarProps) {
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sentinel = document.querySelector('[data-compare-sentinel]')
    if (!sentinel) return

    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry && !closed) setVisible(!entry.isIntersecting)
      },
      { rootMargin: '0px' }
    )
    ioRef.current.observe(sentinel)
    return () => ioRef.current?.disconnect()
  }, [closed])

  function handleClose() {
    setClosed(true)
    setVisible(false)
  }

  const bonusA = `${opA.bonusAmount}${opA.bonusSuffix ? ` ${opA.bonusSuffix}` : ''}`
  const bonusB = `${opB.bonusAmount}${opB.bonusSuffix ? ` ${opB.bonusSuffix}` : ''}`

  return (
    <div
      className={cn(
        'sticky-bar-bg fixed bottom-0 left-0 right-0 z-[75] border-t border-line-2 shadow-3 transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{
        backdropFilter: 'saturate(150%) blur(14px)',
        WebkitBackdropFilter: 'saturate(150%) blur(14px)',
      }}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-site items-center gap-3 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] md:gap-4 md:px-8">
        {/* Operator A */}
        <div
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2 md:gap-3',
            opA.slug === winnerSlug && 'order-first'
          )}
        >
          <LogoPh name={opA.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
              <span className="truncate">{opA.name}</span>
              <ScorePill
                score={opA.rating}
                gold={opA.slug === winnerSlug}
                className="hidden px-[7px] py-[2px] text-[11px] sm:inline-flex"
              />
            </div>
            <p className="hidden truncate text-[11.5px] text-green sm:block">
              <b>{bonusA}</b>
            </p>
          </div>
          <CTAButton
            href={opA.affiliateUrl}
            variant="primary"
            size="sm"
            arrow
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="shrink-0"
            data-event="affiliate_click"
            data-operator={opA.slug}
            data-placement="versus_compare_bar"
            data-bonus={opA.bonusSlug}
            data-page-type="versus"
            data-locale={locale}
          >
            {opA.name}
          </CTAButton>
        </div>

        {/* VS dot */}
        <span className="hidden shrink-0 font-serif text-[14px] font-semibold italic text-ink-3 sm:block">
          vs
        </span>

        {/* Operator B */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
              <span className="truncate">{opB.name}</span>
              <ScorePill
                score={opB.rating}
                gold={opB.slug === winnerSlug}
                className="hidden px-[7px] py-[2px] text-[11px] sm:inline-flex"
              />
            </div>
            <p className="hidden truncate text-[11.5px] text-green sm:block">
              <b>{bonusB}</b>
            </p>
          </div>
          <CTAButton
            href={opB.affiliateUrl}
            variant="primary"
            size="sm"
            arrow
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="shrink-0"
            data-event="affiliate_click"
            data-operator={opB.slug}
            data-placement="versus_compare_bar"
            data-bonus={opB.bonusSlug}
            data-page-type="versus"
            data-locale={locale}
          >
            {opB.name}
          </CTAButton>
          <LogoPh name={opB.name} />
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={handleClose}
          className="hidden h-[30px] w-[30px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-line-2 bg-surface text-ink-3 hover:border-ink-3 hover:text-ink sm:grid"
          aria-label="Fermer la barre de comparaison"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-[13px] w-[13px]"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
