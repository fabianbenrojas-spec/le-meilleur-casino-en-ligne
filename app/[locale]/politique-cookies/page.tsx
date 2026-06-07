import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Politique de cookies' : 'Cookie Policy',
    description:
      locale === 'fr'
        ? 'Notre politique de cookies : cookies essentiels, analytics et marketing. Gérez vos préférences à tout moment.'
        : 'Our cookie policy: essential, analytics and marketing cookies. Manage your preferences at any time.',
    alternates: { languages: buildHreflang('/politique-cookies/', '/cookie-policy/') },
    robots: { index: false },
  }
}

const cookieCategories = [
  {
    name: 'Essentiels',
    nameEn: 'Essential',
    required: true,
    desc: 'Nécessaires au fonctionnement du site. Incluent la préférence de thème (clair/sombre), la session utilisateur et la mémorisation de vos choix RGPD. Ces cookies ne peuvent pas être désactivés.',
    descEn:
      'Required for the site to function. Include theme preference (light/dark), user session and RGPD choice memory. These cookies cannot be disabled.',
    examples: ['mc-theme', 'mc-consent', '__session'],
  },
  {
    name: 'Analytics',
    nameEn: 'Analytics',
    required: false,
    desc: "Nous aident à comprendre comment les visiteurs utilisent le site via Google Analytics 4 (via GTM). Les données sont anonymisées et agrégées — aucune donnée personnelle identifiable n'est collectée.",
    descEn:
      'Help us understand how visitors use the site via Google Analytics 4 (via GTM). Data is anonymised and aggregated — no personally identifiable data is collected.',
    examples: ['_ga', '_ga_*', '_gid'],
  },
  {
    name: 'Marketing',
    nameEn: 'Marketing',
    required: false,
    desc: "Permettent de mesurer l'efficacité de nos partenariats affiliés. Ces cookies ne sont activés que si vous y consentez explicitement.",
    descEn:
      'Allow us to measure the effectiveness of our affiliate partnerships. These cookies are only activated with your explicit consent.',
    examples: ['aff_ref', 'aff_click_id'],
  },
]

export default async function PolitiqueCookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Politique de cookies' : 'Cookie Policy' },
        ]}
      />

      <div className="mx-auto max-w-[760px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-4 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Politique de cookies' : 'Cookie Policy'}
        </h1>
        <p className="mb-8 text-[16px] leading-[1.65] text-ink-2">
          {isFr
            ? "Nous utilisons des cookies pour faire fonctionner le site et améliorer votre expérience. Vous pouvez accepter ou refuser les cookies non essentiels à tout moment via le bandeau de consentement — refuser est aussi simple qu'accepter."
            : 'We use cookies to run the site and improve your experience. You can accept or refuse non-essential cookies at any time via the consent banner — refusing is as easy as accepting.'}
        </p>

        <h2 className="mb-5 font-serif text-[22px] font-semibold text-ink">
          {isFr ? 'Les trois catégories' : 'The three categories'}
        </h2>

        <div className="flex flex-col gap-5">
          {cookieCategories.map((cat) => (
            <div key={cat.name} className="rounded-lg border border-line bg-surface p-5 shadow-1">
              <div className="mb-3 flex items-center gap-3">
                <h3 className="font-serif text-[19px] font-semibold text-ink">
                  {isFr ? cat.name : cat.nameEn}
                </h3>
                {cat.required ? (
                  <span className="rounded-[4px] bg-green-50 px-2 py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-green">
                    {isFr ? 'Requis' : 'Required'}
                  </span>
                ) : (
                  <span className="rounded-[4px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Optionnel' : 'Optional'}
                  </span>
                )}
              </div>
              <p className="mb-3 text-[14px] leading-[1.6] text-ink-2">
                {isFr ? cat.desc : cat.descEn}
              </p>
              <p className="font-mono text-[11px] text-ink-3">
                {isFr ? 'Exemples : ' : 'Examples: '}
                {cat.examples.join(', ')}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-10 font-serif text-[22px] font-semibold text-ink">
          {isFr ? 'Durée de conservation' : 'Retention period'}
        </h2>
        <p className="text-[15px] leading-[1.7] text-ink-2">
          {isFr
            ? "Les cookies essentiels sont conservés pour la durée de votre session ou jusqu'à 12 mois (préférences). Les cookies analytics et marketing sont conservés 13 mois maximum, conformément aux recommandations de la CNIL."
            : 'Essential cookies are kept for your session duration or up to 12 months (preferences). Analytics and marketing cookies are kept for a maximum of 13 months, in line with CNIL recommendations.'}
        </p>

        <h2 className="mb-3 mt-8 font-serif text-[22px] font-semibold text-ink">
          {isFr ? 'Gérer vos préférences' : 'Manage your preferences'}
        </h2>
        <p className="text-[15px] leading-[1.7] text-ink-2">
          {isFr
            ? 'Vous pouvez modifier vos choix à tout moment en cliquant sur « Gérer les cookies » dans le pied de page. Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.'
            : 'You can change your choices at any time by clicking "Manage cookies" in the footer. You can also configure your browser to block or delete cookies.'}
        </p>

        <p className="mt-8 text-[13px] text-ink-3">
          {isFr ? 'Dernière mise à jour : juin 2026' : 'Last updated: June 2026'}
        </p>
      </div>
    </>
  )
}
