'use client'

import { useState } from 'react'

import { CTAButton } from './cta-button'

interface NewsletterCTAProps {
  placement?: string
  headline?: string
  subline?: string
  locale?: string
}

export function NewsletterCTA({
  placement = 'homepage',
  headline,
  subline,
  locale = 'fr',
}: NewsletterCTAProps) {
  const isFr = locale === 'fr'
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const resolvedHeadline =
    headline ??
    (isFr ? 'Restez informé des meilleurs bonus' : 'Stay informed about the best bonuses')
  const resolvedSubline =
    subline ??
    (isFr
      ? 'Offres exclusives, nouvelles réglementations ANJ, guides experts — chaque semaine.'
      : 'Exclusive offers, new reviews, and expert guides — every week.')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  return (
    <div className="grid grid-cols-1 items-center gap-9 rounded-xl bg-ink px-12 py-12 text-bg sm:px-[26px] sm:py-[26px] md:grid-cols-[1.2fr_1fr] md:px-12">
      <div>
        <h3 className="mb-[10px] font-serif text-[30px] font-medium leading-tight tracking-[-0.01em] text-bg">
          {resolvedHeadline}
        </h3>
        <p className="m-0 text-[15px] opacity-80">{resolvedSubline}</p>
      </div>

      {submitted ? (
        <div className="py-[14px] text-[15px] font-bold text-green">
          {isFr
            ? '✓ Merci — vérifiez votre boîte mail pour confirmer.'
            : '✓ Thanks — check your inbox to confirm.'}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          data-newsletter={placement}
          className="flex flex-col gap-2.5 sm:flex-col"
        >
          <input
            type="email"
            name="email"
            required
            placeholder={isFr ? 'votre@email.fr' : 'your@email.com'}
            aria-label={isFr ? 'Adresse e-mail' : 'Email address'}
            className="bg-white/7 font-inherit min-h-[50px] flex-1 rounded border border-white/20 px-4 py-0 text-[15px] text-bg placeholder:text-white/50 focus:border-transparent focus:outline focus:outline-2 focus:outline-green"
          />
          <CTAButton
            type="submit"
            variant="primary"
            block
            data-event="newsletter_submit"
            data-placement={placement}
          >
            {isFr ? "S'inscrire" : 'Subscribe'}
          </CTAButton>
          {error && (
            <p className="mt-1 text-[12px] text-red">
              {isFr ? 'Une erreur est survenue. Réessayez.' : 'Something went wrong. Try again.'}
            </p>
          )}
          <p className="mt-1 text-[11px] opacity-50">
            {isFr ? 'Pas de spam. Désabonnement en 1 clic.' : 'No spam. Unsubscribe in 1 click.'}
          </p>
        </form>
      )}
    </div>
  )
}
