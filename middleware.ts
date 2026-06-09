import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

// Named export `middleware` — recognised by both:
//   Vercel build system  (looks for middleware.ts + module.middleware)
//   Next.js 16 runtime   (checks module.proxy → module.middleware → module)
export const middleware = createMiddleware(routing)

export const config = {
  // Match all routes except: API, Next.js internals, static files, design-system
  matcher: ['/((?!api|_next|_vercel|design-system|.*\\..*).*)'],
}
