'use client'

import { useEffect, useState } from 'react'

import { CTAButton } from './cta-button'

type ConsentChoice = 'accept_all' | 'reject_all' | 'custom'

interface ToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

function ConsentToggle({ id, label, description, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-[14px] border-t border-line py-3">
      <div>
        <p className="text-[14px] font-bold text-ink">{label}</p>
        <p className="mt-px text-xs text-ink-3">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="relative h-[26px] w-11 shrink-0 cursor-pointer rounded-full border-0 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: checked ? 'var(--green)' : 'var(--line-2)' }}
      >
        <span
          className="absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,.3)] transition-transform duration-200"
          style={{
            left: '3px',
            transform: checked ? 'translateX(18px)' : 'none',
          }}
        />
      </button>
    </div>
  )
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('mc-consent')) {
        setTimeout(() => setVisible(true), 700)
      }
    } catch {
      // private browsing
    }
  }, [])

  function close(choice: ConsentChoice) {
    try {
      localStorage.setItem('mc-consent', choice)
    } catch {
      // private browsing
    }
    setVisible(false)
    // GA4 event via GTM data-event attribute on buttons
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(10,10,8,.4)] p-5 backdrop-blur-[2px]"
      role="dialog"
      aria-modal
      aria-label="Paramètres de cookies"
    >
      <div className="w-full max-w-[560px] rounded-lg border border-line bg-surface p-[26px] shadow-3">
        <h2 className="mb-2 font-serif text-[21px] font-semibold text-ink">
          Vos préférences cookies
        </h2>
        <p className="mb-[18px] text-[13.5px] leading-[1.55] text-ink-2">
          Nous utilisons des cookies pour améliorer votre expérience et analyser l&apos;audience.{' '}
          <a href="/politique-cookies" className="text-green hover:underline">
            Politique de cookies
          </a>
        </p>

        <ConsentToggle
          id="cookie-essential"
          label="Essentiels"
          description="Nécessaires au fonctionnement du site"
          checked
          disabled
          onChange={() => {}}
        />
        <ConsentToggle
          id="cookie-analytics"
          label="Analytiques"
          description="Nous aident à comprendre comment vous utilisez le site"
          checked={analytics}
          onChange={setAnalytics}
        />
        <ConsentToggle
          id="cookie-marketing"
          label="Marketing"
          description="Personnalisation des offres et publicités"
          checked={marketing}
          onChange={setMarketing}
        />

        <div className="mt-5 flex gap-2.5">
          <CTAButton
            variant="secondary"
            size="sm"
            block
            onClick={() => close('reject_all')}
            data-event="cookie_consent"
            data-choice="reject_all"
          >
            Refuser
          </CTAButton>
          <CTAButton
            variant="secondary"
            size="sm"
            block
            onClick={() => close('custom')}
            data-event="cookie_consent"
            data-choice="custom"
          >
            Enregistrer
          </CTAButton>
          <CTAButton
            variant="primary"
            size="sm"
            block
            onClick={() => close('accept_all')}
            data-event="cookie_consent"
            data-choice="accept_all"
          >
            Tout accepter
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
