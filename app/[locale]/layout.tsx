import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

import { Disclaimer18Plus } from '@/components/ui/disclaimer-18plus'
import { ResponsibleGamblingBanner } from '@/components/ui/responsible-gambling-banner'
import { CookieConsentBanner } from '@/components/ui/cookie-consent-banner'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { routing, type Locale } from '@/i18n/routing'
import { hankenGrotesk, jetbrainsMono, newsreader } from '@/lib/fonts'
import { buildHreflang } from '@/lib/i18n/routes'
import { GTMNoScript, GTMScript } from '@/components/gtm/gtm-script'
import { WebVitals } from '@/components/performance/web-vitals'

// Prerender both locales (fr + en) at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const antiFlashScript = `try{var t=localStorage.getItem('mc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  return {
    title: {
      default: isEn
        ? 'Best Online Casino — Independent Comparison'
        : 'Le Meilleur Casino en Ligne — Comparateur FR',
      template: '%s | le-meilleur-casino-en-ligne.fr',
    },
    description: isEn
      ? 'Independent online casino comparison. Expert reviews, verified bonuses, monthly updated rankings.'
      : 'Comparateur indépendant de casinos en ligne. Avis experts, bonus vérifiés, classements mis à jour mensuellement.',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: isEn ? `${BASE_URL}/en/` : `${BASE_URL}/`,
      languages: buildHreflang('/'),
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'le-meilleur-casino-en-ligne.fr',
      locale: isEn ? 'en_GB' : 'fr_FR',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale — fallback to default if invalid
  const resolvedLocale: Locale = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale

  const messages = await getMessages()

  return (
    <html
      lang={resolvedLocale}
      className={`${newsreader.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Anti-flash: reads mc-theme before first paint — must be synchronous */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
        {/* Resource hints — reduce connection latency for external scripts */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <GTMScript />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* GTM noscript — must be first element in body */}
        <GTMNoScript />

        {/* Skip-to-content link — accessibility + INP (avoids nav tabbing) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-green focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          {resolvedLocale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>

        <NextIntlClientProvider messages={messages}>
          {/* 1. Compliance topstrip — must be visible on every page */}
          <Disclaimer18Plus
            variant="topstrip"
            updatedAt={new Date().toISOString().slice(0, 10)}
            locale={resolvedLocale}
          />

          {/* 2. Sticky header */}
          <SiteHeader locale={resolvedLocale} />

          {/* 3. Page content */}
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>

          {/* 4. Responsible gambling banner — footer permanent */}
          <ResponsibleGamblingBanner locale={resolvedLocale} />

          {/* 5. Footer */}
          <SiteFooter locale={resolvedLocale} />

          {/* 6. Cookie consent overlay */}
          <CookieConsentBanner locale={resolvedLocale} />
        </NextIntlClientProvider>

        {/* Web Vitals → GTM dataLayer (client island, fires after hydration) */}
        <WebVitals />

        {/* Vercel observability — no cookie, GDPR-safe */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
