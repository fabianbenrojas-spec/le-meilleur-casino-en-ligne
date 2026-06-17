'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { CasinoLogo } from '@/components/ui/casino-logo'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'

interface ReviewStickyBarProps {
  operatorName: string
  operatorSlug: string
  rating: number
  bonusAmount: string
  bonusSuffix?: string
  bonusConditions: string
  bonusSlug: string
  affiliateUrl: string
  locale: string
  pageType?: string
  placement?: string
  showAlt?: boolean
}

export function ReviewStickyBar({
  operatorName,
  operatorSlug,
  rating,
  bonusAmount,
  bonusSuffix,
  bonusConditions,
  bonusSlug,
  affiliateUrl,
  locale,
  pageType = 'review',
  placement = 'review_sticky_bar',
  showAlt = true,
}: ReviewStickyBarProps) {
  const [visible, setVisible] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sentinel = document.querySelector('[data-sticky-sentinel]')
    if (!sentinel) {
      const t = setTimeout(() => setVisible(true), 0)
      return () => clearTimeout(t)
    }

    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(!entry.isIntersecting)
      },
      { rootMargin: '0px' }
    )
    ioRef.current.observe(sentinel)

    return () => ioRef.current?.disconnect()
  }, [])

  const bonusLabel = `${bonusAmount}${bonusSuffix ? ` ${bonusSuffix}` : ''}`

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
      <div className="mx-auto flex max-w-site items-center gap-4 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] md:px-8">
        <div className="hidden shrink-0 sm:block">
          <CasinoLogo slug={operatorSlug} name={operatorName} width={60} height={30} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[14px] font-bold text-ink">
            {operatorName}
            <ScorePill score={rating} className="px-[7px] py-[2px] text-[12px]" />
          </div>
          <p className="hidden text-[12.5px] text-ink-2 sm:block">
            <b className="font-semibold text-green">{bonusLabel}</b>
            {' · '}
            {bonusConditions}
          </p>
        </div>
        <div className="flex-1" />
        {showAlt && (
          <a
            href="#alternatives"
            className="hidden whitespace-nowrap text-[13px] font-semibold text-ink-2 no-underline hover:text-green sm:block"
            data-event="internal_link"
            data-target="alternatives"
            data-page-type={pageType}
            data-locale={locale}
          >
            Voir les alternatives
          </a>
        )}
        <CTAButton
          href={affiliateUrl}
          variant="primary"
          arrow
          target="_blank"
          rel="noopener noreferrer nofollow"
          data-event="affiliate_click"
          data-operator={operatorSlug}
          data-placement={placement}
          data-bonus={bonusSlug}
          data-page-type={pageType}
          data-locale={locale}
        >
          Obtenir le bonus
        </CTAButton>
      </div>
    </div>
  )
}
