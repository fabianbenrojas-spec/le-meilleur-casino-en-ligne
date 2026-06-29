import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr'] as const,
  defaultLocale: 'fr',
  // FR-only site — no locale prefix on URLs
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]
