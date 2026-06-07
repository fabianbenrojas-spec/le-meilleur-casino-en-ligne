import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

import { Disclaimer18Plus } from '@/components/ui/disclaimer-18plus'
import { ResponsibleGamblingBanner } from '@/components/ui/responsible-gambling-banner'
import { CookieConsentBanner } from '@/components/ui/cookie-consent-banner'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { routing, type Locale } from '@/i18n/routing'
import { hankenGrotesk, jetbrainsMono, newsreader } from '@/lib/fonts'
import { buildHreflang } from '@/lib/i18n/routes'

const antiFlashScript = `try{var t=localStorage.getItem('mc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://le-meilleur-casino-en-ligne.fr'

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
      {/* Anti-flash: reads mc-theme from localStorage before first paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages}>
          {/* 1. Compliance topstrip — must be visible on every page */}
          <Disclaimer18Plus variant="topstrip" updatedAt={new Date().toISOString().slice(0, 10)} />

          {/* 2. Sticky header */}
          <SiteHeader locale={resolvedLocale} />

          {/* 3. Page content */}
          <div className="flex flex-1 flex-col">{children}</div>

          {/* 4. Responsible gambling banner — footer permanent */}
          <ResponsibleGamblingBanner locale={resolvedLocale} />

          {/* 5. Footer */}
          <SiteFooter locale={resolvedLocale} />

          {/* 6. Cookie consent overlay */}
          <CookieConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
