import type { Metadata } from 'next'
export const revalidate = 3600

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
        ? 'Politique de cookies — CNIL 2020 — le-meilleur-casino-en-ligne.fr'
        : 'Cookie Policy — CNIL 2020 — le-meilleur-casino-en-ligne.fr',
    description:
      locale === 'fr'
        ? `Politique de cookies conforme CNIL 2020 : liste détaillée, finalités, durées de conservation et gestion de vos préférences. Refuser aussi simple qu'accepter.`
        : 'CNIL 2020 compliant cookie policy: detailed list, purposes, retention periods and preference management. Refusing as easy as accepting.',
    alternates: { languages: buildHreflang('/politique-cookies/') },
    robots: { index: false },
  }
}

interface CookieEntry {
  name: string
  provider: string
  purpose: string
  purposeEn: string
  duration: string
  durationEn: string
  category: 'essential' | 'analytics' | 'marketing'
}

const COOKIES: CookieEntry[] = [
  {
    name: 'mc-consent',
    provider: 'le-meilleur-casino-en-ligne.fr',
    purpose: 'Mémorise votre choix de consentement aux cookies',
    purposeEn: 'Stores your cookie consent choice',
    duration: '12 mois',
    durationEn: '12 months',
    category: 'essential',
  },
  {
    name: 'mc-theme',
    provider: 'le-meilleur-casino-en-ligne.fr',
    purpose: 'Mémorise votre préférence de thème (clair/sombre)',
    purposeEn: 'Stores your theme preference (light/dark)',
    duration: '12 mois',
    durationEn: '12 months',
    category: 'essential',
  },
  {
    name: 'mc-locale',
    provider: 'le-meilleur-casino-en-ligne.fr',
    purpose: 'Mémorise votre préférence de langue (FR/EN)',
    purposeEn: 'Stores your language preference (FR/EN)',
    duration: '12 mois',
    durationEn: '12 months',
    category: 'essential',
  },
  {
    name: '__session',
    provider: 'Vercel',
    purpose: 'Cookie de session pour la sécurité du site',
    purposeEn: 'Session cookie for site security',
    duration: 'Session',
    durationEn: 'Session',
    category: 'essential',
  },
  {
    name: '_ga',
    provider: 'Google Analytics 4',
    purpose: "Cookie principal GA4 — identifie les sessions d'un utilisateur unique",
    purposeEn: 'Main GA4 cookie — identifies sessions of a unique user',
    duration: '13 mois',
    durationEn: '13 months',
    category: 'analytics',
  },
  {
    name: '_ga_[ID]',
    provider: 'Google Analytics 4',
    purpose: 'Stocke le statut de session et les données de comptage des hits',
    purposeEn: 'Stores session status and hit count data',
    duration: '13 mois',
    durationEn: '13 months',
    category: 'analytics',
  },
  {
    name: '_gid',
    provider: 'Google Analytics 4',
    purpose: 'Distingue les utilisateurs — utilisé pour limiter le débit des requêtes',
    purposeEn: 'Distinguishes users — used to throttle request rate',
    duration: '24 heures',
    durationEn: '24 hours',
    category: 'analytics',
  },
  {
    name: 'aff_click_id',
    provider: 'le-meilleur-casino-en-ligne.fr',
    purpose: 'Identifie les clics affiliés pour mesure de performance',
    purposeEn: 'Identifies affiliate clicks for performance measurement',
    duration: '30 jours',
    durationEn: '30 days',
    category: 'marketing',
  },
  {
    name: 'aff_ref',
    provider: 'le-meilleur-casino-en-ligne.fr',
    purpose: "Mémorise l'opérateur de référence pour attribution des conversions",
    purposeEn: 'Stores the referring operator for conversion attribution',
    duration: '30 jours',
    durationEn: '30 days',
    category: 'marketing',
  },
]

const CATEGORY_LABELS = {
  essential: { fr: 'Essentiel', en: 'Essential', color: 'bg-green-50 text-green border-green/30' },
  analytics: {
    fr: 'Analytics',
    en: 'Analytics',
    color:
      'bg-[color-mix(in_srgb,var(--gold)_12%,var(--bg))] text-[var(--gold)] border-[var(--gold)]/30',
  },
  marketing: { fr: 'Marketing', en: 'Marketing', color: 'bg-bg-sunken text-ink-3 border-line-2' },
}

function CategoryBadge({ category, isFr }: { category: CookieEntry['category']; isFr: boolean }) {
  const conf = CATEGORY_LABELS[category]
  return (
    <span
      className={`inline-block rounded-[4px] border px-[7px] py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.05em] ${conf.color}`}
    >
      {isFr ? conf.fr : conf.en}
    </span>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id?: string
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

export default async function PolitiqueCookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const essentials = COOKIES.filter((c) => c.category === 'essential')
  const analytics = COOKIES.filter((c) => c.category === 'analytics')
  const marketing = COOKIES.filter((c) => c.category === 'marketing')

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Politique de cookies' : 'Cookie Policy' },
        ]}
        locale={locale}
      />

      <div className="mx-auto max-w-[800px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-2 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Politique de cookies' : 'Cookie Policy'}
        </h1>
        <p className="mb-4 text-[13px] text-ink-3">
          {isFr
            ? 'Conforme aux recommandations CNIL (Délibération 2020-092 du 17 septembre 2020) · Mise à jour : juin 2026'
            : 'Compliant with CNIL recommendations (Deliberation 2020-092 of 17 September 2020) · Updated: June 2026'}
        </p>
        <p className="mb-10 text-[15.5px] leading-[1.7] text-ink-2">
          {isFr
            ? "Nous utilisons des cookies pour faire fonctionner le site, mesurer notre audience et mesurer nos partenariats affiliés. Conformément aux recommandations de la CNIL, aucun cookie non essentiel n'est déposé sans votre consentement préalable. Refuser est aussi simple qu'accepter."
            : 'We use cookies to operate the site, measure our audience and measure our affiliate partnerships. In accordance with CNIL recommendations, no non-essential cookie is placed without your prior consent. Refusing is as easy as accepting.'}
        </p>

        {/* ── Définition ──────────────────────────────────────────────── */}
        <Section id="definition" title={isFr ? "Qu'est-ce qu'un cookie ?" : 'What is a cookie?'}>
          <p>
            {isFr
              ? "Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur un site web. Les cookies permettent au site de mémoriser vos préférences, d'analyser votre navigation et de mesurer l'efficacité de notre communication. Conformément à la directive ePrivacy et à la recommandation CNIL, les cookies nécessitant votre consentement ne sont déposés qu'après votre accord explicite."
              : 'A cookie is a small text file stored on your device when you visit a website. Cookies allow the site to remember your preferences, analyse your browsing and measure the effectiveness of our communication. In accordance with the ePrivacy Directive and CNIL recommendations, cookies requiring your consent are only placed after your explicit agreement.'}
          </p>
        </Section>

        {/* ── Tableau complet des cookies ─────────────────────────────── */}
        <Section
          id="liste"
          title={isFr ? 'Liste complète des cookies' : 'Complete list of cookies'}
        >
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-line bg-bg-sunken">
                  {[
                    isFr ? 'Nom' : 'Name',
                    isFr ? 'Fournisseur' : 'Provider',
                    isFr ? 'Finalité' : 'Purpose',
                    isFr ? 'Durée' : 'Duration',
                    isFr ? 'Catégorie' : 'Category',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.05em] text-ink-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((cookie) => (
                  <tr key={cookie.name} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3 font-mono text-[12px] font-semibold text-ink">
                      {cookie.name}
                    </td>
                    <td className="px-4 py-3 text-ink-2">{cookie.provider}</td>
                    <td className="px-4 py-3 text-ink-2">
                      {isFr ? cookie.purpose : cookie.purposeEn}
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-ink-2">
                      {isFr ? cookie.duration : cookie.durationEn}
                    </td>
                    <td className="px-4 py-3">
                      <CategoryBadge category={cookie.category} isFr={isFr} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── 1. Essentiels ────────────────────────────────────────────── */}
        <Section
          id="essentiels"
          title={isFr ? '1. Cookies strictement nécessaires' : '1. Strictly necessary cookies'}
        >
          <div className="flex items-center gap-2">
            <CategoryBadge category="essential" isFr={isFr} />
            <span className="text-[13px] text-ink-3">
              {isFr ? '— Ne nécessitent pas de consentement' : '— No consent required'}
            </span>
          </div>
          <p>
            {isFr
              ? 'Ces cookies sont indispensables au fonctionnement du site. Ils mémorisent vos choix de consentement aux cookies, vos préférences de thème et de langue, et assurent la sécurité de votre session. Ils ne peuvent pas être désactivés sans affecter le fonctionnement du site.'
              : 'These cookies are essential for the site to function. They store your cookie consent choices, theme and language preferences, and ensure the security of your session. They cannot be disabled without affecting site functionality.'}
          </p>
          <p className="font-mono text-[12px] text-ink-3">
            {isFr ? 'Cookies : ' : 'Cookies: '}
            {essentials.map((c) => c.name).join(', ')}
          </p>
        </Section>

        {/* ── 2. Analytics ─────────────────────────────────────────────── */}
        <Section
          id="analytics"
          title={
            isFr
              ? `2. Cookies de mesure d'audience (Analytics)`
              : '2. Audience measurement cookies (Analytics)'
          }
        >
          <div className="flex items-center gap-2">
            <CategoryBadge category="analytics" isFr={isFr} />
            <span className="text-[13px] text-ink-3">
              {isFr ? '— Consentement requis' : '— Consent required'}
            </span>
          </div>
          <p>
            {isFr
              ? 'Nous utilisons Google Analytics 4 (via Google Tag Manager) pour comprendre comment les visiteurs utilisent notre site. Ces données nous aident à améliorer notre contenu et notre navigation.'
              : 'We use Google Analytics 4 (via Google Tag Manager) to understand how visitors use our site. This data helps us improve our content and navigation.'}
          </p>
          <p>
            {isFr
              ? 'Mesures de protection de la vie privée activées :'
              : 'Privacy protection measures enabled:'}
          </p>
          <ul className="space-y-1">
            {(isFr
              ? [
                  'Anonymisation des adresses IP (les 8 derniers bits sont tronqués avant tout transfert)',
                  'Pas de partage des données avec Google pour la personnalisation publicitaire',
                  'Durée de conservation limitée à 13 mois (recommandation CNIL)',
                  'Données agrégées — aucun profil individuel identifiable',
                  'Consentement requis avant tout dépôt (implémentation via GTM avec déclencheur consentement)',
                ]
              : [
                  'IP address anonymisation (last 8 bits truncated before any transfer)',
                  'No data sharing with Google for advertising personalisation',
                  'Retention limited to 13 months (CNIL recommendation)',
                  'Aggregated data — no identifiable individual profile',
                  'Consent required before placement (GTM implementation with consent trigger)',
                ]
            ).map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 text-green">✓</span>
                <span className="text-[14px]">{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[12px] text-ink-3">
            {isFr ? 'Cookies : ' : 'Cookies: '}
            {analytics.map((c) => c.name).join(', ')}
          </p>
        </Section>

        {/* ── 3. Marketing ─────────────────────────────────────────────── */}
        <Section
          id="marketing"
          title={
            isFr ? '3. Cookies marketing et affiliation' : '3. Marketing and affiliate cookies'
          }
        >
          <div className="flex items-center gap-2">
            <CategoryBadge category="marketing" isFr={isFr} />
            <span className="text-[13px] text-ink-3">
              {isFr ? '— Consentement requis' : '— Consent required'}
            </span>
          </div>
          <p>
            {isFr
              ? "Ces cookies nous permettent de mesurer l'efficacité de nos partenariats affiliés. Ils mémorisent les clics sur les liens d'affiliation et les opérateurs consultés, pour attribuer correctement les conversions à notre activité éditoriale. Aucune donnée n'est partagée avec des tiers à des fins publicitaires."
              : 'These cookies allow us to measure the effectiveness of our affiliate partnerships. They record clicks on affiliate links and operators viewed, to correctly attribute conversions to our editorial activity. No data is shared with third parties for advertising purposes.'}
          </p>
          <p className="font-mono text-[12px] text-ink-3">
            {isFr ? 'Cookies : ' : 'Cookies: '}
            {marketing.map((c) => c.name).join(', ')}
          </p>
        </Section>

        {/* ── 4. Gestion des préférences ───────────────────────────────── */}
        <Section
          id="gestion"
          title={isFr ? '4. Gérer vos préférences' : '4. Managing your preferences'}
        >
          <p>
            {isFr
              ? 'Vous pouvez modifier vos choix à tout moment. Plusieurs options sont disponibles :'
              : 'You can change your choices at any time. Several options are available:'}
          </p>
          <ul className="space-y-2">
            {(isFr
              ? [
                  [
                    'Bandeau de consentement',
                    "Cliquez sur 'Gérer les cookies' en bas de chaque page pour rouvrir le bandeau et modifier vos préférences.",
                  ],
                  [
                    'Navigateur',
                    'Tous les navigateurs permettent de bloquer ou supprimer les cookies : Chrome (Paramètres > Confidentialité), Firefox (Paramètres > Vie privée), Safari (Préférences > Confidentialité).',
                  ],
                  [
                    'Opt-out Google Analytics',
                    'Installez le module complémentaire de désactivation de Google Analytics : tools.google.com/dlpage/gaoptout.',
                  ],
                  [
                    'Your Online Choices',
                    `Gérez les cookies de mesure d'audience sur youronlinechoices.com.`,
                  ],
                ]
              : [
                  [
                    'Consent banner',
                    "Click 'Manage cookies' at the bottom of each page to reopen the banner and modify your preferences.",
                  ],
                  [
                    'Browser',
                    'All browsers allow you to block or delete cookies: Chrome (Settings > Privacy), Firefox (Settings > Privacy), Safari (Preferences > Privacy).',
                  ],
                  [
                    'Google Analytics Opt-out',
                    'Install the Google Analytics opt-out add-on: tools.google.com/dlpage/gaoptout.',
                  ],
                  [
                    'Your Online Choices',
                    'Manage audience measurement cookies at youronlinechoices.eu.',
                  ],
                ]
            ).map(([method, desc]) => (
              <li key={method} className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green" />
                <span>
                  <strong className="text-ink">{method}</strong> — {desc}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-green/30 rounded-lg border bg-green-50 p-4">
            <p className="text-[14px] font-semibold text-green">
              {isFr
                ? "⚠ La désactivation des cookies analytics et marketing n'affecte pas votre accès au contenu du site. Seules les statistiques et le suivi affilié sont impactés."
                : '⚠ Disabling analytics and marketing cookies does not affect your access to site content. Only statistics and affiliate tracking are impacted.'}
            </p>
          </div>
        </Section>

        {/* ── 5. Contact ───────────────────────────────────────────────── */}
        <Section id="contact" title={isFr ? '5. Contact' : '5. Contact'}>
          <p>
            {isFr
              ? 'Pour toute question sur notre utilisation des cookies, contactez-nous via notre '
              : 'For any question about our use of cookies, contact us via our '}
            <Link href={isFr ? '/contact/' : '/en/contact/'} className="text-green underline">
              {isFr ? 'formulaire de contact' : 'contact form'}
            </Link>
            {isFr
              ? " (objet : 'Cookies'). Vous pouvez également déposer une réclamation auprès de la CNIL ("
              : " (subject: 'Cookies'). You can also lodge a complaint with the CNIL ("}
            <a
              href="https://www.cnil.fr"
              className="text-green underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              cnil.fr
            </a>
            ).
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
