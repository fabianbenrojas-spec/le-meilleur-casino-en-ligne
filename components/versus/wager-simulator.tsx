'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { CTAButton } from '@/components/ui/cta-button'

interface WagerOp {
  name: string
  slug: string
  rtp: number
  wagerX: number
  affiliateUrl: string
  bonusSlug: string
  isWinner: boolean
}

interface WagerSimulatorProps {
  opA: WagerOp
  opB: WagerOp
  locale: string
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('fr-FR') + ' €'
}

export function WagerSimulator({ opA, opB, locale }: WagerSimulatorProps) {
  const [bonus, setBonus] = useState(200)

  function stats(op: WagerOp) {
    const wagering = bonus * op.wagerX
    const loss = wagering * (1 - op.rtp / 100)
    return { wagering, loss }
  }

  const statsA = stats(opA)
  const statsB = stats(opB)
  const betterOp = statsA.loss <= statsB.loss ? opA : opB

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-1">
      {/* Header */}
      <div className="border-b border-line px-[24px] py-[20px]">
        <h3 className="m-0 mb-[6px] font-serif text-[22px] font-semibold text-ink">
          Simulateur de mise
        </h3>
        <p className="m-0 max-w-[68ch] text-[14px] leading-[1.55] text-ink-2">
          Glissez le curseur pour estimer le coût statistique de l&apos;exigence de mise selon votre
          bonus cible. Plus le coût est bas, plus le bonus est avantageux à dégager.
        </p>
      </div>

      {/* Controls */}
      <div className="border-b border-line px-[24px] py-[22px]">
        <div className="mb-[12px] flex items-baseline justify-between">
          <span className="text-[13px] font-semibold text-ink-2">Montant du bonus</span>
          <span className="font-serif text-[26px] font-semibold text-green">{bonus} €</span>
        </div>
        <input
          type="range"
          min={100}
          max={2500}
          step={50}
          value={bonus}
          onChange={(e) => setBonus(Number(e.target.value))}
          className="w-full cursor-pointer appearance-none rounded-[3px] bg-bg-sunken outline-none"
          style={{ height: '6px', accentColor: 'var(--green)' }}
          aria-label="Montant du bonus en euros"
          data-event="wager_sim_interact"
          data-page-type="versus"
          data-locale={locale}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
          <span>100 €</span>
          <span>2 500 €</span>
        </div>
        <p className="mt-[16px] border-t border-dashed border-line pt-[14px] text-[12.5px] leading-[1.5] text-ink-3">
          Calcul basé sur un RTP déclaré. En pratique, le résultat peut varier. Les exigences de
          mise diffèrent par opérateur. Jouez de façon responsable.
        </p>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {[opA, opB].map((op, i) => {
          const s = i === 0 ? statsA : statsB
          const isBetter = betterOp.slug === op.slug
          return (
            <div
              key={op.slug}
              className={cn(
                'px-[22px] py-[20px]',
                i === 0 ? 'border-b border-line sm:border-b-0 sm:border-r' : '',
                isBetter && 'bg-green-50'
              )}
            >
              {/* Top row */}
              <div className="mb-[14px] flex items-center justify-between gap-2">
                <span className="text-[15px] font-bold text-ink">{op.name}</span>
                {isBetter && (
                  <span className="inline-flex items-center gap-[6px] font-mono text-[10.5px] font-semibold text-green">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="h-[13px] w-[13px]"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Moins cher à dégager
                  </span>
                )}
              </div>

              {/* Mise requise */}
              <div className="mb-[12px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">
                  Mise totale requise
                </div>
                <div className="mt-[2px] font-serif text-[22px] font-semibold leading-[1.1] text-ink">
                  {fmt(s.wagering)}
                </div>
                <div className="mt-[1px] font-mono text-[11px] text-ink-3">
                  {bonus} € × {op.wagerX}x
                </div>
              </div>

              {/* Coût estimé */}
              <div className="mb-[16px]">
                <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">
                  Perte statistique estimée
                </div>
                <div
                  className={cn(
                    'mt-[2px] font-serif text-[22px] font-semibold leading-[1.1]',
                    isBetter ? 'text-green' : 'text-ink'
                  )}
                >
                  ≈ {fmt(s.loss)}
                </div>
                <div className="mt-[1px] font-mono text-[11px] text-ink-3">
                  RTP {op.rtp.toFixed(1)}% · {fmt(s.wagering)} × {(100 - op.rtp).toFixed(1)}%
                </div>
              </div>

              <CTAButton
                href={op.affiliateUrl}
                variant={isBetter ? 'primary' : 'secondary'}
                size="sm"
                arrow
                block
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={op.slug}
                data-placement="versus_wager_sim"
                data-bonus={op.bonusSlug}
                data-page-type="versus"
                data-locale={locale}
              >
                Obtenir le bonus {op.name}
              </CTAButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}
