import type { Metadata } from 'next'

import { buildHreflang } from '@/lib/i18n/routes'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  return {
    title: isEn
      ? 'Best Online Casino — Independent Comparison'
      : 'Le Meilleur Casino en Ligne — Comparateur FR',
    alternates: {
      languages: buildHreflang('/'),
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-3">
        Phase 4 — layout i18n ✓
      </p>
      <h1 className="font-serif text-4xl font-medium text-ink">
        {locale === 'fr' ? 'Le Meilleur Casino en Ligne' : 'Best Online Casino'}
      </h1>
      <p className="max-w-prose text-[17px] text-ink-2">
        {locale === 'fr'
          ? 'Homepage en Phase 5. Le layout global est opérationnel : topstrip 18+, header sticky i18n, bandeau RG, footer, cookies RGPD.'
          : 'Homepage coming in Phase 5. Global layout is live: 18+ topstrip, sticky i18n header, RG banner, footer, GDPR cookies.'}
      </p>
    </main>
  )
}
