import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

// Next.js 16 Proxy API: must use named export `proxy` (or `middleware`).
// Default export alone compiles to { default: fn } — not callable as a handler.
export const proxy = createMiddleware(routing)

export const config = {
  // Match all routes except: API, Next.js internals, static files, design-system
  matcher: ['/((?!api|_next|_vercel|design-system|.*\\..*).*)'],
}
