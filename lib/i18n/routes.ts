import type { Locale } from '@/i18n/routing'

// Slug translation map — FR ↔ EN for route segments
export const routeSegments: Record<string, Record<Locale, string>> = {
  casinos: { fr: 'casinos', en: 'casinos' },
  comparatifs: { fr: 'comparatifs', en: 'comparisons' },
  jeux: { fr: 'jeux', en: 'games' },
  guides: { fr: 'guides', en: 'guides' },
  bonus: { fr: 'bonus', en: 'bonuses' },
  blog: { fr: 'blog', en: 'blog' },
  alternatives: { fr: 'alternatives', en: 'alternatives' },
  'jeu-responsable': { fr: 'jeu-responsable', en: 'responsible-gambling' },
  'mentions-legales': { fr: 'mentions-legales', en: 'legal-notice' },
}

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://le-meilleur-casino-en-ligne.fr'

/** Returns the URL for a given path in a given locale */
export function localizeHref(path: string, locale: Locale): string {
  if (locale === 'fr') return path
  return `/en${path}`
}

/** Generates hreflang alternate links for a page */
export function buildHreflang(frPath: string, enPath?: string): Record<string, string> {
  return {
    fr: `${BASE_URL}${frPath}`,
    en: `${BASE_URL}/en${enPath ?? frPath}`,
    'x-default': `${BASE_URL}${frPath}`,
  }
}

/** Translates a route segment from one locale to another */
export function translateSegment(segment: string, from: Locale, to: Locale): string {
  const entry = Object.values(routeSegments).find((map) => map[from] === segment)
  return entry?.[to] ?? segment
}
