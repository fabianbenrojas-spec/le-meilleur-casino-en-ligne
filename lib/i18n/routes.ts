import type { Locale } from '@/i18n/routing'

// Slug translation map — FR route segments (EN kept for reference)
export const routeSegments: Record<string, Record<string, string>> = {
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

/** Returns the URL for a given path (locale param kept for call-site compatibility) */
export function localizeHref(path: string, _locale: Locale): string {
  return path
}

/** Hreflang disabled — FR-only site, returns empty object to suppress all alternates */
export function buildHreflang(_frPath: string, _enPath?: string): Record<string, string> {
  return {}
}

/** Translates a route segment from one locale to another */
export function translateSegment(segment: string, from: Locale, to: Locale): string {
  const entry = Object.values(routeSegments).find((map) => map[from] === segment)
  return entry?.[to] ?? segment
}
