import type { Metadata } from 'next'

import Link from 'next/link'
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
    title:
      locale === 'fr'
        ? 'Politique de confidentialité & RGPD — le-meilleur-casino-en-ligne.fr'
        : 'Privacy Policy & GDPR — le-meilleur-casino-en-ligne.fr',
    description:
      locale === 'fr'
        ? 'Politique de confidentialité RGPD : bases légales, données collectées, durées de conservation, droits des personnes et contact DPO.'
        : 'GDPR privacy policy: legal bases, data collected, retention periods, data subject rights and DPO contact.',
    alternates: { languages: buildHreflang('/confidentialite/') },
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
    <section id={id} className="mb-9 [scroll-margin-top:calc(var(--header-h)+20px)]">
      <h2 className="mb-3 font-serif text-[21px] font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.75] text-ink-2">{children}</div>
    </section>
  )
}

const TOC_ITEMS_FR = [
  { id: 'responsable', label: 'Responsable du traitement' },
  { id: 'collecte', label: 'Données collectées et finalités' },
  { id: 'bases', label: 'Bases légales (art. 6 RGPD)' },
  { id: 'conservation', label: 'Durées de conservation' },
  { id: 'destinataires', label: 'Destinataires et sous-traitants' },
  { id: 'transferts', label: 'Transferts hors UE' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'contact', label: 'Contact & réclamation' },
  { id: 'modifications', label: 'Modifications' },
]

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
        locale={locale}
      />

      <div className="mx-auto max-w-[800px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-2 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
        </h1>
        <p className="mb-4 text-[13px] text-ink-3">
          {isFr
            ? 'Conforme au Règlement (UE) 2016/679 (RGPD) · Mise à jour : juin 2026'
            : 'Compliant with Regulation (EU) 2016/679 (GDPR) · Updated: June 2026'}
        </p>
        <p className="mb-10 text-[15.5px] leading-[1.7] text-ink-2">
          {isFr
            ? 'Cette politique explique quelles données personnelles nous collectons, pour quelles finalités, sur quelles bases légales, et comment vous pouvez exercer vos droits. Nous nous engageons à traiter vos données de manière transparente et conforme au RGPD.'
            : 'This policy explains what personal data we collect, for what purposes, on what legal bases, and how you can exercise your rights. We are committed to processing your data transparently and in compliance with the GDPR.'}
        </p>

        {/* Table of contents (FR only for brevity) */}
        {isFr && (
          <nav className="mb-10 rounded-lg border border-line bg-surface p-5">
            <p className="mb-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Sommaire
            </p>
            <ol className="space-y-1.5">
              {TOC_ITEMS_FR.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[14px] text-green no-underline hover:underline"
                  >
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* ── 1. Responsable ──────────────────────────────────────────── */}
        <Section
          id="responsable"
          title={isFr ? '1. Responsable du traitement' : '1. Data Controller'}
        >
          <p>
            {isFr
              ? 'Le responsable du traitement des données est la société exploitant le site le-meilleur-casino-en-ligne.fr ([RAISON SOCIALE À COMPLÉTER], [ADRESSE]). Pour toute question relative à la protection de vos données, contactez-nous via notre'
              : 'The data controller is the company operating le-meilleur-casino-en-ligne.fr ([COMPANY NAME TO COMPLETE], [ADDRESS]). For any question relating to the protection of your data, contact us via our'}{' '}
            <Link href={isFr ? '/contact/' : '/en/contact/'} className="text-green underline">
              {isFr ? 'formulaire de contact' : 'contact form'}
            </Link>
            .
          </p>
          <p>
            {isFr
              ? "Nous n'avons pas désigné de DPO (Délégué à la Protection des Données) car nous ne réalisons pas de traitement à grande échelle de données sensibles au sens de l'article 37 RGPD. Notre contact RGPD est disponible via notre formulaire de contact (objet : 'Demande RGPD')."
              : "We have not designated a DPO (Data Protection Officer) as we do not carry out large-scale processing of sensitive data within the meaning of Article 37 GDPR. Our GDPR contact is available via our contact form (subject: 'GDPR Request')."}
          </p>
        </Section>

        {/* ── 2. Données collectées ────────────────────────────────────── */}
        <Section
          id="collecte"
          title={isFr ? '2. Données collectées et finalités' : '2. Data collected and purposes'}
        >
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="border-b border-line bg-bg-sunken">
                  <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Catégorie' : 'Category'}
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Données' : 'Data'}
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Finalité' : 'Purpose'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(isFr
                  ? [
                      [
                        'Navigation',
                        'Pages vues, durée, appareil, navigateur, IP anonymisée',
                        `Mesure d'audience (Analytics)`,
                      ],
                      [
                        'Newsletter',
                        'Adresse e-mail, prénom (optionnel)',
                        'Envoi de la newsletter',
                      ],
                      [
                        'Affiliation',
                        'Clic sur lien affilié, opérateur, placement, heure',
                        'Mesure de performance affilié',
                      ],
                      ['Contact', 'Email, nom, message', 'Traitement de votre demande'],
                      [
                        'Technique',
                        'Logs de serveur (IP, user-agent, timestamp)',
                        'Sécurité et lutte contre la fraude',
                      ],
                      [
                        'Préférences',
                        'Choix de thème (clair/sombre), langue, consentement cookies',
                        'Mémorisation de vos préférences',
                      ],
                    ]
                  : [
                      [
                        'Browsing',
                        'Pages viewed, duration, device, browser, anonymised IP',
                        'Audience measurement (Analytics)',
                      ],
                      ['Newsletter', 'Email address, first name (optional)', 'Newsletter sending'],
                      [
                        'Affiliate',
                        'Affiliate link click, operator, placement, time',
                        'Affiliate performance measurement',
                      ],
                      ['Contact', 'Email, name, message', 'Processing your request'],
                      [
                        'Technical',
                        'Server logs (IP, user-agent, timestamp)',
                        'Security and fraud prevention',
                      ],
                      [
                        'Preferences',
                        'Theme choice (light/dark), language, cookie consent',
                        'Storing your preferences',
                      ],
                    ]
                ).map(([cat, data, purpose]) => (
                  <tr key={cat} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3 font-semibold text-ink">{cat}</td>
                    <td className="px-4 py-3 text-ink-2">{data}</td>
                    <td className="px-4 py-3 text-ink-2">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── 3. Bases légales ─────────────────────────────────────────── */}
        <Section
          id="bases"
          title={isFr ? '3. Bases légales (article 6 RGPD)' : '3. Legal bases (Article 6 GDPR)'}
        >
          <ul className="space-y-2">
            {(isFr
              ? [
                  [
                    'Consentement (art. 6.1.a)',
                    'Cookies analytics (GA4) et cookies marketing. Révocable à tout moment via notre bandeau de consentement.',
                  ],
                  [
                    'Intérêt légitime (art. 6.1.f)',
                    `Logs de sécurité (prévention de la fraude, sécurité du site). Nous avons réalisé un test d'équilibre — cet intérêt ne prédomine pas sur vos droits fondamentaux.`,
                  ],
                  ['Exécution du contrat (art. 6.1.b)', 'Traitement de vos demandes de contact.'],
                  [
                    'Consentement (art. 6.1.a)',
                    'Envoi de newsletter — consentement explicite requis, désinscription simple à chaque email.',
                  ],
                ]
              : [
                  [
                    'Consent (art. 6.1.a)',
                    'Analytics cookies (GA4) and marketing cookies. Revocable at any time via our consent banner.',
                  ],
                  [
                    'Legitimate interest (art. 6.1.f)',
                    'Security logs (fraud prevention, site security). We conducted a balancing test — this interest does not override your fundamental rights.',
                  ],
                  ['Contract performance (art. 6.1.b)', 'Processing your contact requests.'],
                  [
                    'Consent (art. 6.1.a)',
                    'Newsletter sending — explicit consent required, simple unsubscribe at each email.',
                  ],
                ]
            ).map(([base, detail]) => (
              <li key={base} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green" />
                <span>
                  <strong className="text-ink">{base}</strong> — {detail}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 4. Conservation ──────────────────────────────────────────── */}
        <Section
          id="conservation"
          title={isFr ? '4. Durées de conservation' : '4. Retention periods'}
        >
          <ul className="space-y-2">
            {(isFr
              ? [
                  [
                    'Données Analytics (GA4)',
                    '13 mois maximum — recommandation CNIL (Délibération 2020-091).',
                  ],
                  [
                    'Données newsletter',
                    "Jusqu'à désinscription, puis suppression dans les 30 jours. Archive marketing : 3 ans après la dernière interaction.",
                  ],
                  [
                    'Données de clic affilié',
                    '90 jours en forme identifiable, puis agrégées et anonymisées.',
                  ],
                  ['Logs de sécurité', '12 mois, conformément aux obligations légales françaises.'],
                  [
                    'Données de contact',
                    "Durée nécessaire au traitement de la demande + 1 an d'archivage.",
                  ],
                  [
                    'Préférences (cookies)',
                    '12 mois pour le consentement (CNIL), 7 jours pour les cookies de session.',
                  ],
                ]
              : [
                  [
                    'Analytics data (GA4)',
                    '13 months maximum — CNIL recommendation (Deliberation 2020-091).',
                  ],
                  [
                    'Newsletter data',
                    'Until unsubscription, then deletion within 30 days. Marketing archive: 3 years after last interaction.',
                  ],
                  [
                    'Affiliate click data',
                    '90 days in identifiable form, then aggregated and anonymised.',
                  ],
                  ['Security logs', '12 months, in accordance with French legal obligations.'],
                  [
                    'Contact data',
                    'Duration necessary to process the request + 1 year of archiving.',
                  ],
                  [
                    'Preferences (cookies)',
                    '12 months for consent (CNIL), 7 days for session cookies.',
                  ],
                ]
            ).map(([cat, duration]) => (
              <li key={cat} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <span>
                  <strong className="text-ink">{cat}</strong> — {duration}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 5. Destinataires ─────────────────────────────────────────── */}
        <Section
          id="destinataires"
          title={isFr ? '5. Destinataires et sous-traitants' : '5. Recipients and processors'}
        >
          <p>
            {isFr
              ? 'Nous ne vendons jamais vos données personnelles. Vos données peuvent être partagées avec les sous-traitants suivants, dans le cadre strict de leurs missions :'
              : 'We never sell your personal data. Your data may be shared with the following processors, strictly within the scope of their services:'}
          </p>
          <ul className="space-y-2">
            {(isFr
              ? [
                  [
                    'Google LLC (GA4 via GTM)',
                    `Mesure d'audience — contrat de traitement des données (DPA) en place, clauses contractuelles types (CCT) pour les transferts UE→US.`,
                  ],
                  [
                    'Vercel Inc.',
                    'Hébergement du site — DPA en place, certifié DPF (Data Privacy Framework).',
                  ],
                  [
                    'Prestataire newsletter',
                    '[NOM À COMPLÉTER — ex : Brevo, Mailchimp] — DPA en place.',
                  ],
                ]
              : [
                  [
                    'Google LLC (GA4 via GTM)',
                    'Audience measurement — Data Processing Agreement (DPA) in place, Standard Contractual Clauses (SCCs) for EU→US transfers.',
                  ],
                  [
                    'Vercel Inc.',
                    'Site hosting — DPA in place, DPF (Data Privacy Framework) certified.',
                  ],
                  [
                    'Newsletter provider',
                    '[NAME TO COMPLETE — e.g.: Brevo, Mailchimp] — DPA in place.',
                  ],
                ]
            ).map(([provider, role]) => (
              <li key={provider} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green" />
                <span>
                  <strong className="text-ink">{provider}</strong> — {role}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 6. Transferts hors UE ────────────────────────────────────── */}
        <Section
          id="transferts"
          title={
            isFr ? '6. Transferts hors Union européenne' : '6. Transfers outside the European Union'
          }
        >
          <p>
            {isFr
              ? 'Google Analytics 4 et Vercel Inc. impliquent des transferts de données vers les États-Unis. Ces transferts sont encadrés par :'
              : 'Google Analytics 4 and Vercel Inc. involve transfers of data to the United States. These transfers are governed by:'}
          </p>
          <ul className="space-y-1.5">
            {(isFr
              ? [
                  'Les clauses contractuelles types (CCT) adoptées par la Commission européenne (décision 2021/914)',
                  "Le cadre EU-US Data Privacy Framework (DPF), en vigueur depuis juillet 2023 (décision d'adéquation de la Commission)",
                  "L'IP anonymisation activée dans GA4 (adresse IP tronquée avant transfert)",
                ]
              : [
                  'Standard Contractual Clauses (SCCs) adopted by the European Commission (Decision 2021/914)',
                  'The EU-US Data Privacy Framework (DPF), in force since July 2023 (Commission adequacy decision)',
                  'IP anonymisation enabled in GA4 (IP address truncated before transfer)',
                ]
            ).map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 text-green">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 7. Droits ────────────────────────────────────────────────── */}
        <Section
          id="droits"
          title={
            isFr
              ? '7. Vos droits (articles 15 à 22 RGPD)'
              : '7. Your rights (Articles 15 to 22 GDPR)'
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(isFr
              ? [
                  [
                    `Droit d'accès (art. 15)`,
                    'Obtenir une copie de toutes vos données personnelles que nous détenons.',
                  ],
                  [
                    'Droit de rectification (art. 16)',
                    'Corriger des données inexactes ou incomplètes.',
                  ],
                  [
                    `Droit à l'effacement (art. 17)`,
                    'Demander la suppression de vos données dans les cas prévus par le RGPD.',
                  ],
                  [
                    'Droit à la portabilité (art. 20)',
                    'Recevoir vos données dans un format structuré, couramment utilisé et lisible par machine.',
                  ],
                  [
                    `Droit d'opposition (art. 21)`,
                    'Vous opposer au traitement fondé sur notre intérêt légitime, ou à des fins de marketing direct.',
                  ],
                  [
                    'Droit à la limitation (art. 18)',
                    'Restreindre temporairement le traitement de vos données dans certains cas.',
                  ],
                  [
                    'Retrait du consentement',
                    'Révoquer à tout moment un consentement préalablement donné (cookies, newsletter).',
                  ],
                  [
                    'Directive sur les données post-mortem',
                    'Donner des directives sur le sort de vos données en cas de décès (Loi Informatique et Libertés art. 85).',
                  ],
                ]
              : [
                  ['Right of access (art. 15)', 'Obtain a copy of all your personal data we hold.'],
                  ['Right of rectification (art. 16)', 'Correct inaccurate or incomplete data.'],
                  [
                    'Right to erasure (art. 17)',
                    'Request deletion of your data in cases provided for by the GDPR.',
                  ],
                  [
                    'Right to portability (art. 20)',
                    'Receive your data in a structured, commonly used and machine-readable format.',
                  ],
                  [
                    'Right to object (art. 21)',
                    'Object to processing based on our legitimate interest, or for direct marketing purposes.',
                  ],
                  [
                    'Right to restriction (art. 18)',
                    'Temporarily restrict the processing of your data in certain cases.',
                  ],
                  [
                    'Withdrawal of consent',
                    'Revoke at any time a previously given consent (cookies, newsletter).',
                  ],
                  [
                    'Post-mortem data directive',
                    'Give directives on the fate of your data in the event of death.',
                  ],
                ]
            ).map(([right, desc]) => (
              <div key={right} className="rounded-lg border border-line bg-surface p-4">
                <p className="mb-1 text-[13.5px] font-semibold text-ink">{right}</p>
                <p className="text-[13px] leading-[1.6] text-ink-2">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            {isFr
              ? "Pour exercer ces droits, contactez-nous via notre formulaire en précisant l'objet 'Demande RGPD'. Nous répondrons dans un délai maximum de 30 jours (art. 12.3 RGPD). En cas de demande complexe ou multiple, ce délai peut être prolongé de 2 mois supplémentaires (information préalable requise)."
              : "To exercise these rights, contact us via our form specifying the subject 'GDPR Request'. We will respond within a maximum of 30 days (art. 12.3 GDPR). For complex or multiple requests, this deadline may be extended by 2 additional months (prior information required)."}
          </p>
        </Section>

        {/* ── 8. Cookies ───────────────────────────────────────────────── */}
        <Section id="cookies" title={isFr ? '8. Cookies' : '8. Cookies'}>
          <p>
            {isFr
              ? "Nous utilisons des cookies conformément aux recommandations de la CNIL (Délibération 2020-092 du 17 septembre 2020). Aucun cookie non essentiel n'est déposé sans votre consentement préalable. Pour la liste complète des cookies et leur gestion, consultez notre "
              : 'We use cookies in accordance with CNIL recommendations (Deliberation 2020-092 of 17 September 2020). No non-essential cookie is placed without your prior consent. For the full list of cookies and their management, consult our '}
            <a
              href={isFr ? '/politique-cookies/' : '/en/cookie-policy/'}
              className="text-green underline"
            >
              {isFr ? 'politique de cookies' : 'cookie policy'}
            </a>
            .
          </p>
        </Section>

        {/* ── 9. Contact & réclamation ─────────────────────────────────── */}
        <Section
          id="contact"
          title={isFr ? '9. Contact et réclamation' : '9. Contact and complaint'}
        >
          <p>
            {isFr
              ? "Pour toute demande RGPD, utilisez notre formulaire de contact (objet : 'Demande RGPD'). Vous disposez également du droit de déposer une réclamation auprès de l'autorité de contrôle compétente :"
              : "For any GDPR request, use our contact form (subject: 'GDPR Request'). You also have the right to lodge a complaint with the competent supervisory authority:"}
          </p>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="mb-1 font-semibold text-ink">
              CNIL — Commission Nationale de l&apos;Informatique et des Libertés
            </p>
            <p className="text-[14px] text-ink-2">
              3 place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07
            </p>
            <p className="text-[14px] text-ink-2">
              <a
                href="https://www.cnil.fr/fr/plaintes"
                className="text-green underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                cnil.fr/fr/plaintes
              </a>
              {' · '}
              <a href="tel:+33153732222" className="text-green underline">
                +33 (0)1 53 73 22 22
              </a>
            </p>
          </div>
        </Section>

        {/* ── 10. Modifications ────────────────────────────────────────── */}
        <Section
          id="modifications"
          title={isFr ? '10. Modifications de cette politique' : '10. Changes to this policy'}
        >
          <p>
            {isFr
              ? 'Nous pouvons modifier cette politique pour refléter des évolutions légales, réglementaires ou de nos pratiques. La date de mise à jour en bas de page sera modifiée en conséquence. Pour les modifications substantielles, nous informerons les abonnés de notre newsletter. La version en vigueur est toujours disponible sur cette page.'
              : 'We may modify this policy to reflect legal, regulatory or practice changes. The update date at the bottom of the page will be changed accordingly. For substantial changes, we will inform newsletter subscribers. The current version is always available on this page.'}
          </p>
        </Section>

        <p className="mt-4 text-[13px] text-ink-3">
          {isFr
            ? 'Dernière mise à jour : juin 2026 · Version 2.0'
            : 'Last updated: June 2026 · Version 2.0'}
        </p>
      </div>
    </>
  )
}
