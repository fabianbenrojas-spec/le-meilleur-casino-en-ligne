import path from 'path'
import type { NextConfig } from 'next'

const ContentSecurityPolicy = [
  "default-src 'self'",
  // GTM and Next.js require unsafe-inline for scripts — documented trade-off (see docs/DECISIONS.md)
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  // unsafe-inline required for Next.js style injection
  "style-src 'self' 'unsafe-inline'",
  // fonts are self-hosted via next/font — no external font CDN needed
  "font-src 'self' data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
  "frame-src 'none'",
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
    // Explicit root prevents false-positive "multiple lockfiles" warning
    root: path.resolve(__dirname),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
