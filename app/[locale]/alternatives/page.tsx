import type { Metadata } from 'next'
export const revalidate = 3600

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CasinoLogo } from '@/components/ui/casino-logo'
import { ScorePill } from '@/components/ui/score-pill'
import { operators } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Alternatives aux casinos en ligne — Trouvez le casino qui vous correspond'
      : 'Online Casino Alternatives — Find Your Perfect Match',
    description: isFr
      ? "Vous n'êtes pas satisfait de votre casino actuel ? Consultez nos comparatifs d'alternatives pour chaque opérateur et trouvez le casino qui correspond à vos critères."
      : 'Not happy with your current casino? Browse our alternative comparisons for each operator and find the casino that matches your criteria.',
    alternates: { languages: buildHreflang('/alternatives/') },
  }
}

export default async function AlternativesHubPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'
  const sorted = [...operators].sort((a, b) => b.rating - a.rating)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Alternatives aux casinos en ligne 2026' : 'Online casino alternatives 2026',
    itemListElement: sorted.slice(0, 10).map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isFr ? `Alternatives à ${op.name}` : `Alternatives to ${op.name}`,
      url: `${BASE_URL}${isFr ? '' : '/en'}/alternatives/${op.slug}/`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Alternatives' : 'Alternatives' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? `${sorted.length} casinos comparés · 2026`
              : `${sorted.length} casinos compared · 2026`}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                <em className="not-italic text-green">Alternatives</em> aux casinos en ligne
              </>
            ) : (
              <>
                Online casino <em className="not-italic text-green">alternatives</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Chaque casino a un profil unique. Sélectionnez l'opérateur que vous souhaitez remplacer et nous vous proposons les 5 meilleures alternatives testées à l'argent réel."
              : "Each casino has a unique profile. Select the operator you want to replace and we'll give you the 5 best real-money tested alternatives."}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((op) => (
              <Link
                key={op.id}
                href={`/alternatives/${op.slug}/`}
                className="flex items-center gap-4 rounded-xl border border-line bg-surface p-5 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
                data-event="alternative_click"
                data-operator={op.slug}
              >
                <CasinoLogo logoUrl={op.logoUrl} name={op.name} width={72} height={28} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[16px] font-semibold text-ink">
                    {op.name}
                  </p>
                  <p className="text-[12px] text-ink-3">{op.licence}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <ScorePill score={op.rating} />
                  <span className="text-[12px] font-medium text-green">
                    {isFr ? 'Voir →' : 'View →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
