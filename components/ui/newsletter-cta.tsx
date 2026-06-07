'use client'

import { useState } from 'react'

import { CTAButton } from './cta-button'

interface NewsletterCTAProps {
  placement?: string // GA4 data-placement value
  headline?: string
  subline?: string
}

export function NewsletterCTA({
  placement = 'homepage',
  headline = 'Restez informé des meilleurs bonus',
  subline = 'Offres exclusives, nouvelles réglementations ANJ, guides experts — chaque semaine.',
}: NewsletterCTAProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    // GA4 event fired by GTM via data-newsletter attribute — no inline tracking needed
  }

  return (
    <div className="grid grid-cols-1 items-center gap-9 rounded-xl bg-ink px-12 py-12 text-bg sm:px-[26px] sm:py-[26px] md:grid-cols-[1.2fr_1fr] md:px-12">
      <div>
        <h3 className="mb-[10px] font-serif text-[30px] font-medium leading-tight tracking-[-0.01em] text-bg">
          {headline}
        </h3>
        <p className="m-0 text-[15px] opacity-80">{subline}</p>
      </div>

      {submitted ? (
        <div className="py-[14px] text-[15px] font-bold text-green">
          ✓ Merci — vérifiez votre boîte mail pour confirmer.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          data-newsletter={placement}
          className="flex flex-col gap-2.5 sm:flex-col"
        >
          <input
            type="email"
            required
            placeholder="votre@email.fr"
            aria-label="Adresse e-mail"
            className="bg-white/7 font-inherit min-h-[50px] flex-1 rounded border border-white/20 px-4 py-0 text-[15px] text-bg placeholder:text-white/50 focus:border-transparent focus:outline focus:outline-2 focus:outline-green"
          />
          <CTAButton
            type="submit"
            variant="primary"
            block
            data-event="newsletter_submit"
            data-placement={placement}
          >
            S&apos;inscrire
          </CTAButton>
          <p className="mt-1 text-[11px] opacity-50">Pas de spam. Désabonnement en 1 clic.</p>
        </form>
      )}
    </div>
  )
}
