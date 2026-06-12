'use client'

import { useState } from 'react'

const QUESTIONS = [
  "Avez-vous déjà essayé de récupérer de l'argent perdu en jouant davantage ?",
  'Le jeu interfère-t-il avec votre travail, votre famille ou vos activités sociales ?',
  'Avez-vous menti à des proches sur votre pratique du jeu ou les sommes misées ?',
]

type Answer = 'yes' | 'no'

export function SelfTest() {
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const answered = Object.keys(answers).length
  const yesCount = Object.values(answers).filter((a) => a === 'yes').length
  const allAnswered = answered === QUESTIONS.length

  function setAnswer(i: number, val: Answer) {
    setAnswers((prev) => ({ ...prev, [i]: val }))
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2">
      {/* Header */}
      <div className="border-b border-line px-[30px] py-[26px] pb-[18px]">
        <h3 className="mb-[6px] font-serif text-[23px] font-semibold text-ink">
          Auto-évaluation rapide
        </h3>
        <p className="m-0 text-[14px] text-ink-2">
          Répondez honnêtement à ces 3 questions — les réponses ne sont pas enregistrées.
        </p>
      </div>

      {/* Questions */}
      {QUESTIONS.map((q, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 border-b border-line px-[30px] py-4"
        >
          <p className="m-0 max-w-[62ch] text-[15px] font-medium text-ink">{q}</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setAnswer(i, 'yes')}
              className={`font-inherit cursor-pointer rounded-lg border-[1.5px] border-solid px-[18px] py-2 text-[13px] font-bold transition-all duration-150 ${
                answers[i] === 'yes'
                  ? 'border-red bg-red text-white'
                  : 'border-line-2 bg-surface text-ink-2 hover:border-ink-3'
              }`}
            >
              Oui
            </button>
            <button
              type="button"
              onClick={() => setAnswer(i, 'no')}
              className={`font-inherit cursor-pointer rounded-lg border-[1.5px] border-solid px-[18px] py-2 text-[13px] font-bold transition-all duration-150 ${
                answers[i] === 'no'
                  ? 'border-green bg-green text-white'
                  : 'border-line-2 bg-surface text-ink-2 hover:border-ink-3'
              }`}
            >
              Non
            </button>
          </div>
        </div>
      ))}

      {/* Result */}
      {allAnswered && (
        <div className={`px-[30px] py-[22px] ${yesCount === 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          {yesCount === 0 ? (
            <>
              <p className="m-0 mb-2 font-serif text-[19px] font-semibold text-green-ink">
                Votre pratique semble saine.
              </p>
              <p className="m-0 text-[14.5px] leading-[1.55] text-ink-2">
                Aucun signal d&apos;alerte détecté. Continuez à fixer des limites de dépôt et de
                temps de jeu pour maintenir une pratique équilibrée.
              </p>
            </>
          ) : (
            <>
              <p className="m-0 mb-2 font-serif text-[19px] font-semibold text-red-ink">
                Certaines réponses méritent attention.
              </p>
              <p className="m-0 text-[14.5px] leading-[1.55] text-ink-2">
                Ces signaux peuvent indiquer une pratique à risque. Nous vous encourageons à
                contacter{' '}
                <strong>
                  <a href="tel:0974751313" className="font-bold text-red-ink">
                    Joueurs Info Service : 09 74 75 13 13
                  </a>
                </strong>{' '}
                (appel gratuit, 8h–2h, 7j/7).
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
