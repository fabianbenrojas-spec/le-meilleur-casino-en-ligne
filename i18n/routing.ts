import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en'] as const,
  defaultLocale: 'fr',
  // FR (default) has no prefix: /casinos/ — EN has prefix: /en/casinos/
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]
