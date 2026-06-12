'use client'

import { useEffect, useState } from 'react'

import { CTAButton } from './cta-button'
import { hasConsent, pushConsentToGTM, storeConsent } from '@/lib/consent'

function ConsentToggle({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}) {
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

interface CookieConsentBannerProps {
  locale?: string
}

export function CookieConsentBanner({ locale = 'fr' }: CookieConsentBannerProps) {
  const isFr = locale === 'fr'
  const [visible, setVisible] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    // Delay banner to avoid CLS during initial paint
    const t = setTimeout(() => {
      if (!hasConsent()) setVisible(true)
    }, 700)
    return () => clearTimeout(t)
  }, [])

  function save(state: { analytics: boolean; marketing: boolean }) {
    storeConsent(state)
    pushConsentToGTM(state)
    setVisible(false)
  }

  function acceptAll() {
    setAnalytics(true)
    setMarketing(true)
    save({ analytics: true, marketing: true })
  }

  function rejectAll() {
    setAnalytics(false)
    setMarketing(false)
    save({ analytics: false, marketing: false })
  }

  function saveCustom() {
    save({ analytics, marketing })
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(10,10,8,.4)] p-5 backdrop-blur-[2px]"
      role="dialog"
      aria-modal
      aria-label={isFr ? 'Paramètres de cookies' : 'Cookie settings'}
    >
      <div className="w-full max-w-[560px] rounded-lg border border-line bg-surface p-[26px] shadow-3">
        <h2 className="mb-2 font-serif text-[21px] font-semibold text-ink">
          {isFr ? 'Vos préférences cookies' : 'Your cookie preferences'}
        </h2>
        <p className="mb-[18px] text-[13.5px] leading-[1.55] text-ink-2">
          {isFr ? (
            <>
              Nous utilisons des cookies pour améliorer votre expérience et analyser
              l&apos;audience. Refuser est aussi simple qu&apos;accepter.{' '}
              <a href="/politique-cookies" className="text-green hover:underline">
                Politique de cookies
              </a>
            </>
          ) : (
            <>
              We use cookies to improve your experience and analyse traffic. Refusing is as easy as
              accepting.{' '}
              <a href="/en/cookie-policy/" className="text-green hover:underline">
                Cookie policy
              </a>
            </>
          )}
        </p>

        <ConsentToggle
          id="cookie-essential"
          label={isFr ? 'Essentiels' : 'Essential'}
          description={
            isFr
              ? 'Nécessaires au fonctionnement du site (thème, session, préférences)'
              : 'Required for the site to work (theme, session, preferences)'
          }
          checked
          disabled
          onChange={() => {}}
        />
        <ConsentToggle
          id="cookie-analytics"
          label={isFr ? 'Analytiques' : 'Analytics'}
          description={
            isFr
              ? 'GA4 via GTM — données anonymisées et agrégées'
              : 'GA4 via GTM — anonymised and aggregated data'
          }
          checked={analytics}
          onChange={setAnalytics}
        />
        <ConsentToggle
          id="cookie-marketing"
          label={isFr ? 'Marketing' : 'Marketing'}
          description={
            isFr
              ? 'Mesure des conversions affiliées — nécessite votre accord explicite'
              : 'Affiliate conversion tracking — requires your explicit consent'
          }
          checked={marketing}
          onChange={setMarketing}
        />

        <div className="mt-5 flex gap-2.5">
          {/* Refuse — same visual weight as Accept (no dark pattern) */}
          <CTAButton
            variant="secondary"
            size="sm"
            block
            onClick={rejectAll}
            data-event="cookie_consent"
            data-choice="reject_all"
          >
            {isFr ? 'Refuser' : 'Reject all'}
          </CTAButton>
          <CTAButton
            variant="secondary"
            size="sm"
            block
            onClick={saveCustom}
            data-event="cookie_consent"
            data-choice="custom"
          >
            {isFr ? 'Enregistrer' : 'Save choices'}
          </CTAButton>
          <CTAButton
            variant="primary"
            size="sm"
            block
            onClick={acceptAll}
            data-event="cookie_consent"
            data-choice="accept_all"
          >
            {isFr ? 'Tout accepter' : 'Accept all'}
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
