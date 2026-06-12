'use client'

import { useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { ScorePill } from '@/components/ui/score-pill'
import type { Operator } from '@/config/operators'

interface HomepageQuizProps {
  topOperator: Operator
  locale?: string
}

const QUESTIONS_FR = [
  {
    step: 'Question 1 / 3',
    text: "Qu'est-ce qui compte le plus pour vous ?",
    options: [
      {
        value: 'bonus',
        label: 'Le plus gros bonus',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
          </svg>
        ),
      },
      {
        value: 'payout',
        label: 'Des retraits rapides',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        ),
      },
      {
        value: 'games',
        label: 'Un large choix de jeux',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M8 4v16M16 4v16" />
          </svg>
        ),
      },
    ],
  },
  {
    step: 'Question 2 / 3',
    text: 'Comment souhaitez-vous payer ?',
    options: [
      {
        value: 'card',
        label: 'Carte bancaire',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        ),
      },
      {
        value: 'crypto',
        label: 'Crypto (BTC, ETH)',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 8h4a2 2 0 0 1 0 4h-4zM9.5 12h4.5a2 2 0 0 1 0 4H9.5zM11 6v2M11 16v2" />
          </svg>
        ),
      },
      {
        value: 'ewallet',
        label: 'E-wallet',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M3 7h18v12H3zM3 7l3-3h12l3 3M16 13h2" />
          </svg>
        ),
      },
    ],
  },
  {
    step: 'Question 3 / 3',
    text: 'Votre style de jeu ?',
    options: [
      {
        value: 'slots',
        label: 'Machines à sous',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M8 4v16M16 4v16" />
          </svg>
        ),
      },
      {
        value: 'live',
        label: 'Tables live',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        ),
      },
      {
        value: 'mix',
        label: 'Un peu de tout',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        ),
      },
    ],
  },
]

const QUESTIONS_EN = [
  {
    step: 'Question 1 / 3',
    text: 'What matters most to you?',
    options: [
      {
        value: 'bonus',
        label: 'The biggest bonus',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
          </svg>
        ),
      },
      {
        value: 'payout',
        label: 'Fast withdrawals',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        ),
      },
      {
        value: 'games',
        label: 'A wide game selection',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M8 4v16M16 4v16" />
          </svg>
        ),
      },
    ],
  },
  {
    step: 'Question 2 / 3',
    text: 'How would you like to pay?',
    options: [
      {
        value: 'card',
        label: 'Bank card',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        ),
      },
      {
        value: 'crypto',
        label: 'Crypto (BTC, ETH)',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 8h4a2 2 0 0 1 0 4h-4zM9.5 12h4.5a2 2 0 0 1 0 4H9.5zM11 6v2M11 16v2" />
          </svg>
        ),
      },
      {
        value: 'ewallet',
        label: 'E-wallet',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M3 7h18v12H3zM3 7l3-3h12l3 3M16 13h2" />
          </svg>
        ),
      },
    ],
  },
  {
    step: 'Question 3 / 3',
    text: 'Your playing style?',
    options: [
      {
        value: 'slots',
        label: 'Slot machines',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M8 4v16M16 4v16" />
          </svg>
        ),
      },
      {
        value: 'live',
        label: 'Live tables',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        ),
      },
      {
        value: 'mix',
        label: 'A bit of everything',
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[17px] w-[17px]"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        ),
      },
    ],
  },
]

export function HomepageQuiz({ topOperator, locale = 'fr' }: HomepageQuizProps) {
  const isFr = locale === 'fr'
  const QUESTIONS = isFr ? QUESTIONS_FR : QUESTIONS_EN
  const [step, setStep] = useState<number | 'result'>(0)

  const currentQ = typeof step === 'number' ? QUESTIONS[step] : null
  const isDone = step === 'result'

  function handleAnswer(value: string) {
    const nextStep = typeof step === 'number' ? step + 1 : QUESTIONS.length
    if (nextStep >= QUESTIONS.length) {
      setStep('result')
    } else {
      setStep(nextStep)
    }
    // GA4 via GTM — data-event on the button handles it
    void value
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
        {/* Left: questions */}
        <div className="border-b border-line p-10 sm:p-8 md:border-b-0 md:border-r">
          {!isDone && currentQ ? (
            <>
              <p className="mb-[14px] font-mono text-xs tracking-[0.05em] text-green">
                {currentQ.step}
              </p>
              <h3 className="mb-[22px] font-serif text-[25px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                {currentQ.text}
              </h3>
              <div className="flex flex-col gap-2.5">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswer(opt.value)}
                    data-event="finder_answer"
                    data-step={typeof step === 'number' ? step + 1 : 0}
                    data-value={opt.value}
                    className="font-inherit flex cursor-pointer items-center gap-[13px] rounded border-[1.5px] border-solid border-line-2 bg-surface px-[17px] py-[15px] text-left text-[15px] font-semibold text-ink transition-[border-color,background] duration-150 hover:border-green hover:bg-green-50"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-bg-sunken text-green">
                      {opt.icon}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Progress dots */}
              <div className="mt-[26px] flex gap-[6px]">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${typeof step === 'number' && i <= step ? 'bg-green' : 'bg-line-2'}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs tracking-[0.05em] text-green">
                {isFr ? '✓ Quiz terminé' : '✓ Quiz done'}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                {isFr ? 'Votre recommandation est prête →' : 'Your recommendation is ready →'}
              </h3>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="btn btn-tertiary self-start text-sm"
                data-restart
              >
                <u>{isFr ? 'Recommencer le quiz' : 'Restart quiz'}</u>
              </button>
            </div>
          )}
        </div>

        {/* Right: placeholder / result */}
        <div className="flex flex-col items-center justify-center bg-surface-2 p-10 text-center sm:p-8">
          {!isDone ? (
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-50">
                <svg
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <p className="max-w-[30ch] font-mono text-xs leading-[1.6] text-ink-3">
                {isFr
                  ? 'Répondez aux 3 questions pour voir votre recommandation personnalisée.'
                  : 'Answer the 3 questions to see your personalised recommendation.'}
              </p>
            </div>
          ) : (
            <div className="w-full">
              <p className="mb-[14px] font-mono text-xs tracking-[0.05em] text-green">
                {isFr ? '✓ Votre recommandation' : '✓ Your recommendation'}
              </p>
              {/* Logo placeholder */}
              <div
                className="mx-auto mb-4 flex h-12 w-[150px] items-center justify-center rounded-lg border border-dashed border-line-2 font-mono text-xs text-ink-3"
                style={{
                  background:
                    'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
                }}
              >
                {topOperator.shortName ?? topOperator.name}
              </div>
              <h3 className="mb-1.5 font-serif text-[24px] font-semibold text-ink">
                {topOperator.name}
              </h3>
              <div className="mb-3 flex justify-center">
                <ScorePill score={topOperator.rating} gold />
              </div>
              <p className="mx-auto mb-[18px] max-w-[34ch] text-[14px] text-ink-2">
                {topOperator.tagline}
              </p>
              <CTAButton
                href={topOperator.affiliateUrl}
                variant="primary"
                block
                arrow
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={topOperator.slug}
                data-placement="finder_result"
                data-bonus={topOperator.bonusSlug}
                data-page-type="homepage"
                data-locale={locale}
              >
                {isFr ? 'Obtenir le bonus' : 'Get bonus'}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
