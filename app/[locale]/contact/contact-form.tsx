'use client'

import { useState } from 'react'

interface Topic {
  id: string
  label: string
}

interface ContactFormProps {
  locale: string
  topics: Topic[]
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ locale, topics }: ContactFormProps) {
  const isFr = locale === 'fr'
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green/5 rounded-lg border border-green px-5 py-6 text-center">
        <p className="mb-1 font-semibold text-green">
          {isFr ? 'Message envoyé ✓' : 'Message sent ✓'}
        </p>
        <p className="text-[14px] text-ink-2">
          {isFr
            ? 'Nous vous répondrons sous 48h ouvrées.'
            : 'We will reply within 48 business hours.'}
        </p>
      </div>
    )
  }

  const inputClass =
    'focus:ring-green/20 w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder-ink-3 focus:border-green focus:outline-none focus:ring-2'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-event="contact_form_submit">
      <div>
        <label
          htmlFor="topic"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
        >
          {isFr ? 'Sujet *' : 'Topic *'}
        </label>
        <select id="topic" name="topic" required className={inputClass}>
          <option value="">{isFr ? 'Choisir...' : 'Choose...'}</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
        >
          {isFr ? 'Nom *' : 'Name *'}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder={isFr ? 'Votre nom' : 'Your name'}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
        >
          {isFr ? 'E-mail *' : 'Email *'}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder={isFr ? 'vous@exemple.fr' : 'you@example.com'}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
        >
          {isFr ? 'Message *' : 'Message *'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y`}
          placeholder={
            isFr ? 'Décrivez votre demande en détail...' : 'Describe your request in detail...'
          }
        />
      </div>

      {status === 'error' && (
        <p className="text-[13px] text-red">
          {isFr
            ? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.'
            : 'An error occurred. Please try again or email us directly.'}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex h-[50px] items-center justify-center rounded-lg bg-green px-6 text-[15px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:opacity-60"
      >
        {status === 'submitting'
          ? isFr
            ? 'Envoi…'
            : 'Sending…'
          : isFr
            ? 'Envoyer le message'
            : 'Send message'}
      </button>

      <p className="text-[12px] text-ink-3">
        {isFr
          ? '* Champs obligatoires. Vos données sont traitées conformément à notre politique de confidentialité.'
          : '* Required fields. Your data is processed in accordance with our privacy policy.'}
      </p>
    </form>
  )
}
