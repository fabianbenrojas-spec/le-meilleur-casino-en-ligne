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
    title: locale === 'fr' ? 'Politique de confidentialité — RGPD' : 'Privacy Policy — GDPR',
    description:
      locale === 'fr'
        ? 'Notre politique de confidentialité : données collectées, durée de conservation, vos droits RGPD et comment nous contacter.'
        : 'Our privacy policy: data collected, retention periods, your GDPR rights and how to contact us.',
    alternates: { languages: buildHreflang('/confidentialite/', '/privacy/') },
    robots: { index: false },
  }
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-8 [scroll-margin-top:calc(var(--header-h)+20px)]">
      <h2 className="mb-3 font-serif text-[21px] font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.7] text-ink-2">{children}</div>
    </section>
  )
}

export default async function ConfidentialitePage({
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
          { label: isFr ? 'Confidentialité' : 'Privacy' },
        ]}
      />

      <div className="mx-auto max-w-[760px] px-[18px] py-12 md:px-8">
        <h1 className="mb-4 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
        </h1>
        <p className="mb-8 text-[16px] leading-[1.65] text-ink-2">
          {isFr
            ? 'Votre vie privée est importante. Cette politique explique quelles données nous collectons, pourquoi et comment vous pouvez exercer vos droits.'
            : 'Your privacy matters. This policy explains what data we collect, why, and how you can exercise your rights.'}
        </p>

        <Section id="collecte" title={isFr ? 'Données collectées' : 'Data collected'}>
          <p>
            {isFr
              ? 'Nous collectons uniquement les données nécessaires au fonctionnement du site :'
              : 'We collect only the data necessary for the site to function:'}
          </p>
          <ul className="list-none space-y-1.5 p-0">
            {(isFr
              ? [
                  'Données de navigation anonymisées (pages visitées, durée, appareil) via Google Analytics 4 — uniquement si vous avez consenti aux cookies analytics.',
                  'Adresse e-mail si vous vous inscrivez à notre newsletter — jamais partagée avec des tiers sans votre accord.',
                  'Données de clic sur nos liens affiliés (opérateur, placement) — anonymisées après 90 jours.',
                ]
              : [
                  'Anonymised browsing data (pages visited, duration, device) via Google Analytics 4 — only if you consented to analytics cookies.',
                  'Email address if you subscribe to our newsletter — never shared with third parties without your consent.',
                  'Affiliate link click data (operator, placement) — anonymised after 90 days.',
                ]
            ).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-green">→</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="base-legale" title={isFr ? 'Base légale' : 'Legal basis'}>
          <p>
            {isFr
              ? 'Nous traitons vos données sur la base de votre consentement (cookies analytics/marketing) et de notre intérêt légitime (sécurité du site, lutte contre la fraude).'
              : 'We process your data based on your consent (analytics/marketing cookies) and our legitimate interest (site security, fraud prevention).'}
          </p>
        </Section>

        <Section id="conservation" title={isFr ? 'Durée de conservation' : 'Retention period'}>
          <p>
            {isFr
              ? "Analytics : 13 mois maximum (recommandation CNIL). Newsletter : jusqu'à désinscription + 3 ans. Logs de sécurité : 12 mois."
              : 'Analytics: 13 months maximum (CNIL recommendation). Newsletter: until unsubscribe + 3 years. Security logs: 12 months.'}
          </p>
        </Section>

        <Section id="droits" title={isFr ? 'Vos droits RGPD' : 'Your GDPR rights'}>
          <p>
            {isFr
              ? "Vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous via notre formulaire. Réponse sous 30 jours."
              : 'You have rights of access, rectification, erasure, portability and objection. To exercise these rights, contact us via our form. Response within 30 days.'}
          </p>
          <p>
            {isFr
              ? 'Vous pouvez également déposer une réclamation auprès de la CNIL (cnil.fr).'
              : 'You can also lodge a complaint with the CNIL (cnil.fr) or your national data protection authority.'}
          </p>
        </Section>

        <Section id="tiers" title={isFr ? 'Transferts vers des tiers' : 'Third-party transfers'}>
          <p>
            {isFr
              ? "Nous utilisons Google Analytics 4 (Google LLC, États-Unis) et Vercel (États-Unis) pour l'hébergement. Ces transferts sont encadrés par des clauses contractuelles types conformes au RGPD."
              : 'We use Google Analytics 4 (Google LLC, USA) and Vercel (USA) for hosting. These transfers are governed by standard contractual clauses compliant with GDPR.'}
          </p>
        </Section>

        <p className="mt-8 text-[13px] text-ink-3">
          {isFr ? 'Dernière mise à jour : juin 2026' : 'Last updated: June 2026'}
        </p>
      </div>
    </>
  )
}
