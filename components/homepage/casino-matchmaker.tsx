'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { CasinoLogo } from '@/components/ui/casino-logo'
import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import {
  QUESTIONS,
  computeRanking,
  matchPct,
  type Mode,
  type QuestionOption,
  type RankedOp,
} from './casino-matchmaker.logic'

// ── Sub-components ────────────────────────────────────────────────────────────

function QuizIcon({ ic, circle }: { ic: string; circle?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[18px] w-[18px] text-green"
      aria-hidden
    >
      {circle && <circle cx="12" cy="12" r="9" />}
      <path d={ic} />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[11px] w-[11px]" aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
  )
}

// ── CasinoMatchmaker ──────────────────────────────────────────────────────────

interface Props {
  defaultMode?: Mode
  pageType?: string
  locale?: string
}

export function CasinoMatchmaker({
  defaultMode = 'casino',
  pageType = 'homepage',
  locale = 'fr',
}: Props) {
  const [mode, setMode] = useState<Mode>(defaultMode)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const currentQ = QUESTIONS[step]!

  function handleAnswer(value: string) {
    const next = { ...answers, [currentQ.key]: value }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
      if (typeof window !== 'undefined') {
        const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer
        dl?.push({ event: 'matchmaker_complete', mode, answers: JSON.stringify(next) })
      }
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1)
  }

  function handleRestart() {
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  function handleModeChange(next: Mode) {
    setMode(next)
  }

  const ranked: RankedOp[] = done ? computeRanking(answers, mode) : []
  const winner = ranked[0]
  const runners = ranked.slice(1, 4)

  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-surface shadow-2"
      id="matchmaker"
      data-page-type={pageType}
      data-locale={locale}
    >
      {/* ── Mode toggle — always visible ─────────────────────────────────── */}
      <div className="flex gap-[3px] rounded-none border-b border-line bg-bg-sunken p-[5px]">
        {(
          [
            { value: 'casino' as Mode, label: 'Meilleur casino' },
            { value: 'bonus' as Mode, label: 'Meilleur bonus' },
          ] as const
        ).map((m) => (
          <button
            key={m.value}
            type="button"
            aria-pressed={mode === m.value}
            onClick={() => handleModeChange(m.value)}
            className={cn(
              'flex flex-1 cursor-pointer items-center justify-center gap-[7px] rounded-[8px] border-0 bg-transparent px-[6px] py-[9px] font-sans text-[13px] font-bold transition-[background,color,box-shadow]',
              mode === m.value ? 'bg-surface text-green shadow-1' : 'text-ink-3 hover:text-ink'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Quiz ─────────────────────────────────────────────────────────── */}
      {!done && (
        <div className="p-[22px_24px_24px]">
          {/* Eyebrow + progress row */}
          <div className="mb-[18px] flex items-center justify-between gap-[14px]">
            <span className="inline-flex items-center gap-[7px] font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-green">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[15px] w-[15px]"
                aria-hidden
              >
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10C7.5 20.5 4 18 4 12V6z" />
              </svg>
              Simulateur
            </span>
            {/* Progress dots */}
            <div
              className="flex shrink-0 gap-1"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemax={QUESTIONS.length}
              aria-label="Progression"
            >
              {QUESTIONS.map((_, i) => (
                <i
                  key={i}
                  className={cn(
                    'block h-1 w-[14px] rounded-[2px] transition-colors',
                    i <= step ? 'bg-green' : 'bg-line'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Step — key forces remount for animation */}
          <div key={step} className="mm-step-enter">
            <div className="mb-[6px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
              {currentQ.qn}
            </div>
            <h3 className="mb-4 font-serif text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink">
              {currentQ.title}
            </h3>
            <div className="flex flex-col gap-[9px]" role="group" aria-label={currentQ.title}>
              {currentQ.opts.map((opt: QuestionOption) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => handleAnswer(opt.v)}
                  className="flex w-full cursor-pointer items-center gap-[13px] rounded border-[1.5px] border-line-2 bg-surface px-[15px] py-[13px] text-left font-sans transition-[border-color,background,transform] duration-[150ms] hover:translate-x-[2px] hover:border-green hover:bg-green-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-green"
                  data-event="matchmaker_answer"
                  data-placement={`matchmaker_q${step + 1}`}
                  data-page-type={pageType}
                  data-locale={locale}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-bg-sunken">
                    <QuizIcon ic={opt.ic} circle={opt.circle} />
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-ink">{opt.t}</span>
                    <span className="mt-[1px] block text-[12px] font-medium text-ink-3">
                      {opt.d}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Back button */}
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="mt-4 inline-flex cursor-pointer items-center gap-[6px] border-0 bg-transparent p-0 py-1 font-sans text-[13px] text-ink-3 hover:text-ink"
            >
              ← Retour
            </button>
          )}
        </div>
      )}

      {/* ── Result ───────────────────────────────────────────────────────── */}
      {done && winner && (
        <div className="p-[22px_24px_24px]">
          {/* Result header */}
          <div className="mb-[14px] flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-ink-3">
              Votre recommandation
            </span>
            <button
              type="button"
              onClick={handleRestart}
              id="mmRestart"
              className="inline-flex cursor-pointer items-center gap-[6px] border-0 bg-transparent font-sans text-[12px] font-bold text-green hover:underline"
            >
              Recommencer →
            </button>
          </div>

          {/* Winner card */}
          <div className="relative mb-3 rounded-lg border-[1.5px] border-[color-mix(in_srgb,var(--gold)_40%,var(--line))] bg-surface p-[18px] shadow-2">
            {/* Badge */}
            <span className="absolute -top-[10px] left-4 inline-flex items-center gap-[5px] rounded-full bg-gold px-[11px] py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-white shadow-1">
              <StarIcon />
              {mode === 'bonus' ? 'Meilleur bonus pour vous' : 'Votre meilleur casino'}
            </span>

            {/* Top row: logo | name + meta | match % */}
            <div className="mb-3 mt-1 flex items-center gap-[13px]">
              <CasinoLogo slug={winner.op.id} name={winner.op.nm} width={92} height={40} />
              <div className="min-w-0 flex-1">
                <div className="font-serif text-[19px] font-semibold text-ink">{winner.op.nm}</div>
                <div className="mt-[2px] flex flex-wrap items-center gap-2">
                  <ScorePill score={winner.op.note} gold className="text-[14px]" />
                  <span className="text-[12px] text-ink-3">{winner.op.wagerTxt}</span>
                </div>
              </div>
              <div className="ml-auto shrink-0 text-right">
                <div className="font-serif text-[24px] font-semibold leading-none text-green">
                  {matchPct(ranked, 0)}%
                </div>
                <div className="font-mono text-[10px] text-ink-3">match</div>
              </div>
            </div>

            {/* Bonus pill */}
            <div className="mb-3 flex items-baseline justify-between gap-[10px] rounded border border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-green-50 px-[13px] py-[10px]">
              <span className="font-serif text-[18px] font-semibold">
                <span className="text-green">{winner.op.bonus.split(' + ')[0]}</span>
                {winner.op.bonus.includes('+') && ` + ${winner.op.bonus.split('+ ')[1]}`}
              </span>
              <span className="shrink-0 text-[11px] text-ink-3">{winner.op.wagerTxt}</span>
            </div>

            {/* Why */}
            <p className="mb-[13px] text-[12.5px] leading-[1.5] text-ink-2">{winner.op.why}</p>

            {/* Primary CTA */}
            <CTAButton
              href={`/go/${winner.op.id}`}
              block
              arrow
              data-event="affiliate_click"
              data-operator={winner.op.op}
              data-placement="homepage_matchmaker"
              data-bonus={winner.op.b}
              data-page-type={pageType}
              data-locale={locale}
            >
              Obtenir le bonus
            </CTAButton>

            {/* Review link */}
            <a
              href={`/casinos/${winner.op.id}/`}
              className="mt-2 block text-center text-[12px] text-ink-2 no-underline hover:text-green"
              data-event="review_click"
              data-operator={winner.op.op}
              data-page-type={pageType}
              data-locale={locale}
            >
              Lire l&apos;avis complet de {winner.op.nm} →
            </a>
          </div>

          {/* Runners */}
          <div className="flex flex-col gap-2">
            {runners.map((r, i) => (
              <a
                key={r.op.id}
                href={`/go/${r.op.id}`}
                className="flex items-center gap-3 rounded border border-line bg-surface px-[13px] py-[10px] text-ink no-underline transition-[border-color,transform] duration-[150ms] hover:translate-x-[2px] hover:border-green"
                data-event="affiliate_click"
                data-operator={r.op.op}
                data-placement="homepage_matchmaker_runner"
                data-bonus={r.op.b}
                data-page-type={pageType}
                data-locale={locale}
              >
                <span className="w-[18px] shrink-0 font-mono text-[12px] font-semibold text-ink-3">
                  {i + 2}
                </span>
                <CasinoLogo slug={r.op.id} name={r.op.nm} width={60} height={26} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-bold">{r.op.nm}</div>
                  <div className="text-[11.5px] text-ink-3">{r.op.bonus}</div>
                </div>
                <span className="shrink-0 font-mono text-[12px] font-semibold text-green">
                  {matchPct(ranked, i + 1)}%
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="shrink-0 text-ink-3"
                  aria-hidden
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
