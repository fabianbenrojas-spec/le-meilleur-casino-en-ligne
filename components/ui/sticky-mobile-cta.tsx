'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { CTAButton } from './cta-button'
import { ScorePill } from './score-pill'

interface StickyMobileCTAProps {
  operatorName: string
  operatorSlug: string
  rating: number
  bonusLabel: string
  affiliateUrl: string
  locale?: string
  pageType?: string
  ctaBonus?: string
  bonusSlug?: string
}

export function StickyMobileCTA({
  operatorName,
  operatorSlug,
  rating,
  bonusLabel,
  affiliateUrl,
  locale = 'fr',
  pageType = 'review',
  ctaBonus,
  bonusSlug,
}: StickyMobileCTAProps) {
  const label = ctaBonus ?? (locale === 'fr' ? 'Obtenir le bonus' : 'Get bonus')
  const [visible, setVisible] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sentinel = document.querySelector('[data-sticky-sentinel]')
    if (!sentinel) {
      // No sentinel — schedule show after paint to satisfy react-hooks/set-state-in-effect
      const t = setTimeout(() => setVisible(true), 0)
      return () => clearTimeout(t)
    }

    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(!entry.isIntersecting)
      },
      { rootMargin: '-120px 0px 0px 0px' }
    )
    ioRef.current.observe(sentinel)

    return () => ioRef.current?.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'bg-surface/96 fixed bottom-0 left-0 right-0 z-[70] flex items-center gap-3 border-t border-line px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px] shadow-3 backdrop-blur-xl transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!visible}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[7px] text-[13px] font-bold text-ink">
          {operatorName}
          <ScorePill score={rating} className="px-[7px] py-[2px] text-[13px]" />
        </div>
        <p className="mt-0.5 text-xs text-ink-2">{bonusLabel}</p>
      </div>
      <CTAButton
        href={affiliateUrl}
        variant="primary"
        arrow
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-event="affiliate_click"
        data-operator={operatorSlug}
        data-placement="sticky_mobile"
        data-page-type={pageType}
        data-locale={locale}
        {...(bonusSlug ? { 'data-bonus': bonusSlug } : {})}
      >
        {label}
      </CTAButton>
    </div>
  )
}
