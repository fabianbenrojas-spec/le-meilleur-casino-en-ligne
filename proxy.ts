import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export const proxy = createMiddleware(routing)

export const config = {
  // Match all routes except: API, affiliate redirects, Next.js internals, static files, design-system
  matcher: ['/((?!api|go|_next|_vercel|design-system|.*\\..*).*)'],
}
