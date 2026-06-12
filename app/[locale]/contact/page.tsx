import type { Metadata } from 'next'
export const revalidate = 3600

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'
import { ContactForm } from './contact-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Contact' : 'Contact us',
    description:
      locale === 'fr'
        ? 'Contactez notre équipe éditoriale pour un signalement, une correction ou une demande de partenariat.'
        : 'Contact our editorial team for a report, correction or partnership enquiry.',
    alternates: { languages: buildHreflang('/contact/') },
    robots: { index: false },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const topics = isFr
    ? [
        { id: 'correction', label: 'Correction factuelle' },
        { id: 'signalement', label: 'Signalement (casino problématique)' },
        { id: 'partenariat', label: 'Demande de partenariat / affiliation' },
        { id: 'rgpd', label: 'Exercice de droits RGPD' },
        { id: 'autre', label: 'Autre' },
      ]
    : [
        { id: 'correction', label: 'Factual correction' },
        { id: 'report', label: 'Report (problematic casino)' },
        { id: 'partnership', label: 'Partnership / affiliation enquiry' },
        { id: 'gdpr', label: 'GDPR rights request' },
        { id: 'other', label: 'Other' },
      ]

  return (
    <>
      <Breadcrumbs
        items={[{ label: isFr ? 'Accueil' : 'Home', href: '/' }, { label: 'Contact' }]}
        locale={locale}
      />

      <div className="mx-auto max-w-[680px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-4 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          Contact
        </h1>
        <p className="mb-8 text-[16px] leading-[1.65] text-ink-2">
          {isFr
            ? 'Notre équipe répond sous 48h ouvrées. Pour les corrections factuelles, nous visons une mise à jour sous 24h.'
            : 'Our team responds within 48 business hours. For factual corrections, we aim for a 24h update.'}
        </p>

        <ContactForm locale={locale} topics={topics} />

        {/* Helpline reminder */}
        <div className="mt-10 rounded-lg border border-l-4 border-[color-mix(in_srgb,var(--red)_20%,var(--line))] border-l-red bg-surface p-5">
          <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-red">
            {isFr ? 'Aide au jeu responsable' : 'Responsible gambling help'}
          </p>
          <p className="text-[14px] text-ink-2">
            {isFr ? (
              <>
                Si vous avez un problème avec le jeu :{' '}
                <a href="tel:0974751313" className="font-bold text-red">
                  09 74 75 13 13
                </a>{' '}
                (Joueurs Info Service · gratuit · 8h–2h · 7j/7)
              </>
            ) : (
              <>
                If you have a gambling problem: GamCare{' '}
                <a href="tel:08088020133" className="font-bold text-red">
                  0808 8020 133
                </a>{' '}
                (free · 24h)
              </>
            )}
          </p>
        </div>
      </div>
    </>
  )
}
