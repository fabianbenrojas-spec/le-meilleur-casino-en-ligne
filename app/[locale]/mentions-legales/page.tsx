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
    title: locale === 'fr' ? 'Mentions légales' : 'Legal Notice',
    description:
      locale === 'fr'
        ? 'Mentions légales de le-meilleur-casino-en-ligne.fr — éditeur, hébergeur, propriété intellectuelle.'
        : 'Legal notice for le-meilleur-casino-en-ligne.fr — publisher, host, intellectual property.',
    alternates: { languages: buildHreflang('/mentions-legales/', '/legal-notice/') },
    robots: { index: false },
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-serif text-[21px] font-semibold text-ink">{title}</h2>
      <div className="text-[15px] leading-[1.7] text-ink-2">{children}</div>
    </section>
  )
}

export default async function MentionsLegalesPage({
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
          { label: isFr ? 'Mentions légales' : 'Legal Notice' },
        ]}
      />

      <div className="mx-auto max-w-[760px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-8 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Mentions légales' : 'Legal Notice'}
        </h1>

        <Section title={isFr ? 'Éditeur du site' : 'Site Publisher'}>
          <p>
            {isFr ? (
              <>
                Le site <strong>le-meilleur-casino-en-ligne.fr</strong> est édité par une société
                dont le siège social est en France. Directeur de la publication : Julien Marchand.
                Contact :{' '}
                <a href="/contact/" className="text-green underline">
                  via notre formulaire de contact
                </a>
                .
              </>
            ) : (
              <>
                The website <strong>le-meilleur-casino-en-ligne.fr</strong> is published by a
                company headquartered in France. Editor-in-chief: Julien Marchand. Contact:{' '}
                <a href="/en/contact/" className="text-green underline">
                  via our contact form
                </a>
                .
              </>
            )}
          </p>
        </Section>

        <Section title={isFr ? 'Hébergement' : 'Hosting'}>
          <p>
            {isFr
              ? 'Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.'
              : 'The site is hosted by Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, United States.'}
          </p>
        </Section>

        <Section title={isFr ? 'Propriété intellectuelle' : 'Intellectual Property'}>
          <p>
            {isFr
              ? "L'ensemble du contenu de ce site (textes, analyses, notes, structure) est protégé par le droit d'auteur. Toute reproduction, même partielle, sans autorisation écrite est interdite. Les marques des opérateurs citées appartiennent à leurs propriétaires respectifs."
              : 'All content on this site (texts, analysis, ratings, structure) is protected by copyright. Any reproduction, even partial, without written authorisation is prohibited. Operator trademarks belong to their respective owners.'}
          </p>
        </Section>

        <Section title={isFr ? 'Divulgation des liens affiliés' : 'Affiliate Link Disclosure'}>
          <p>
            {isFr
              ? 'Ce site perçoit des commissions sur les inscriptions réalisées via certains liens. Ces commissions ne modifient pas nos notes ni nos recommandations éditoriales. Tous les casinos sont testés de manière indépendante avant toute mise en avant.'
              : 'This site earns commissions on sign-ups made through certain links. These commissions do not affect our ratings or editorial recommendations. All casinos are independently tested before any promotion.'}
          </p>
        </Section>

        <Section title={isFr ? 'Jeu responsable' : 'Responsible Gambling'}>
          <p>
            {isFr ? (
              <>
                Le jeu peut être source de dépendance. Aide gratuite :{' '}
                <a href="tel:0974751313" className="font-bold text-red underline">
                  09 74 75 13 13
                </a>{' '}
                (Joueurs Info Service, 8h–2h, 7j/7). Interdit aux mineurs.
              </>
            ) : (
              <>
                Gambling can be addictive. Free help: GamCare{' '}
                <a href="tel:08088020133" className="font-bold text-red underline">
                  0808 8020 133
                </a>{' '}
                or{' '}
                <a href="https://www.begambleaware.org" className="text-green underline">
                  BeGambleAware
                </a>
                . Forbidden to minors.
              </>
            )}
          </p>
        </Section>

        <p className="mt-8 text-[13px] text-ink-3">
          {isFr ? 'Dernière mise à jour : juin 2026' : 'Last updated: June 2026'}
        </p>
      </div>
    </>
  )
}
