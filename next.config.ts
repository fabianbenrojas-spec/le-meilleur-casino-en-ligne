import path from 'path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://vitals.vercel-insights.com",
  // GTM noscript iframe + Vercel Speed Insights
  'frame-src https://www.googletagmanager.com',
  "object-src 'none'",
  "base-uri 'self'",
].join('; ')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
]

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year for optimised images
    remotePatterns: [],
  },
  // Optimise package imports — prevent full barrel-file imports
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Apex → www canonical redirect (permanent 301)
  // Vercel also handles this at the routing layer when www is set as primary domain,
  // but having it in code ensures local dev + preview deployments behave correctly.
  async redirects() {
    const isProd = process.env['NEXT_PUBLIC_SITE_URL']?.includes('www.')
    if (!isProd) return []
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'le-meilleur-casino-en-ligne.fr' }],
        destination: 'https://www.le-meilleur-casino-en-ligne.fr/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      // Security headers on all routes
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Long-lived cache for Next.js static chunks (content-hashed filenames)
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Edge cache for editorial SSR pages — 1h fresh, 24h stale-while-revalidate
      {
        source: '/:locale(fr|en)/casinos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/:locale(fr|en)/guides/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/:locale(fr|en)/blog/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/:locale(fr|en)/comparatifs/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      // Affiliate redirects: never cached (dataLayer push must fire every visit)
      {
        source: '/go/:operator*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
