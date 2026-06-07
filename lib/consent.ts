// Consent storage + GTM Consent Mode bridge.
// Stored as JSON: { analytics: boolean, marketing: boolean, timestamp: number }

export interface ConsentState {
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const KEY = 'mc-consent'

export function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    // Handle old string format ('accept_all', 'reject_all', 'custom')
    if (typeof parsed === 'string') {
      localStorage.removeItem(KEY) // clear stale format
      return null
    }
    if (parsed && typeof parsed === 'object' && 'analytics' in parsed && 'marketing' in parsed) {
      return parsed as ConsentState
    }
    return null
  } catch {
    return null
  }
}

export function storeConsent(state: Omit<ConsentState, 'timestamp'>) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, timestamp: Date.now() }))
  } catch {
    // private browsing
  }
}

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(KEY) !== null
  } catch {
    return false
  }
}

// Push to GTM Consent Mode (requires gtag function defined by GTMScript)
export function pushConsentToGTM(state: { analytics: boolean; marketing: boolean }) {
  try {
    const w = window as Window & { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag !== 'function') return
    w.gtag('consent', 'update', {
      analytics_storage: state.analytics ? 'granted' : 'denied',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: state.marketing ? 'granted' : 'denied',
    })
    // Also push a dataLayer event so GTM can trigger on consent change
    const dl = window as Window & { dataLayer?: unknown[] }
    dl.dataLayer = dl.dataLayer ?? []
    dl.dataLayer.push({
      event: 'consent_update',
      consent_analytics: state.analytics,
      consent_marketing: state.marketing,
    })
  } catch {
    // gtag not yet available
  }
}
