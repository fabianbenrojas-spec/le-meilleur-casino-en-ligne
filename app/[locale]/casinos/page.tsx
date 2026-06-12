import type { Metadata } from 'next'
export const revalidate = 3600

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CasinosListingClient } from '@/components/listing/casinos-listing-client'
import { operators } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn
      ? 'All Online Casinos — Filterable Comparison 2026'
      : 'Tous les casinos en ligne — liste & comparateur filtrable (2026)',
    description: isEn
      ? 'Filter all online casinos by bonus, RTP, payment method, licence and games. /10 verified ratings, tested with real money. 18+'
      : "Filtrez tous les casinos en ligne par bonus, RTP, méthode de paiement, licence et jeux. Notes /10 vérifiées, testés à l'argent réel. 18+",
    alternates: { languages: buildHreflang('/casinos/') },
  }
}

export default async function CasinosListPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  // Sort by rating descending for the initial SSR render (SEO: best first)
  const sorted = [...operators].sort((a, b) => b.rating - a.rating)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Tous les casinos' : 'All Casinos' },
        ]}
      />

      {/* Page head */}
      <section className="pb-1.5 pt-9">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Comparateur filtrable' : 'Filterable comparison'}
          </div>
          <h1 className="mb-[14px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Tous les <em className="italic text-green">casinos en ligne</em>
              </>
            ) : (
              <>
                All <em className="italic text-green">online casinos</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Affinez selon vos critères — bonus, RTP, méthode de paiement, licence, jeux. Tous les casinos ont été testés à l'argent réel."
              : 'Filter by bonus, RTP, payment method, licence, games. All casinos tested with real money by our team.'}
          </p>
        </div>
      </section>

      {/* Client listing with filters — receives SSR-sorted operators */}
      <CasinosListingClient operators={sorted} />
    </>
  )
}
