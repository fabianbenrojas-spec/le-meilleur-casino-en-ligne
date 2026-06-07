'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * Reports Core Web Vitals to GTM dataLayer.
 * GTM then forwards to GA4 via a custom event trigger.
 * No analytics calls in code — GTM reads from dataLayer.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === 'undefined') return

    const w = window as Window & { dataLayer?: unknown[] }
    w.dataLayer = w.dataLayer ?? []
    w.dataLayer.push({
      event: 'web_vital',
      web_vital_name: metric.name, // LCP | CLS | INP | FCP | TTFB
      web_vital_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      web_vital_rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      web_vital_id: metric.id,
      web_vital_delta: Math.round(metric.delta),
      non_interaction: true,
    })
  })

  return null
}
