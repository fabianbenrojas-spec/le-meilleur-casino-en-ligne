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
      />

      <div className="mx-auto max-w-[680px] px-[18px] py-12 md:px-8">
        <h1 className="mb-4 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          Contact
        </h1>
        <p className="mb-8 text-[16px] leading-[1.65] text-ink-2">
          {isFr
            ? 'Notre équipe répond sous 48h ouvrées. Pour les corrections factuelles, nous visons une mise à jour sous 24h.'
            : 'Our team responds within 48 business hours. For factual corrections, we aim for a 24h update.'}
        </p>

        {/* Contact form — action requires server endpoint (Phase 8+) */}
        <form
          action="/api/contact"
          method="POST"
          className="flex flex-col gap-5"
          data-event="contact_form_submit"
        >
          <div>
            <label
              htmlFor="topic"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
            >
              {isFr ? 'Sujet *' : 'Topic *'}
            </label>
            <select
              id="topic"
              name="topic"
              required
              className="focus:ring-green/20 w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink focus:border-green focus:outline-none focus:ring-2"
            >
              <option value="">{isFr ? 'Choisir...' : 'Choose...'}</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
            >
              {isFr ? 'Nom *' : 'Name *'}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="focus:ring-green/20 w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder-ink-3 focus:border-green focus:outline-none focus:ring-2"
              placeholder={isFr ? 'Votre nom' : 'Your name'}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
            >
              {isFr ? 'E-mail *' : 'Email *'}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="focus:ring-green/20 w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder-ink-3 focus:border-green focus:outline-none focus:ring-2"
              placeholder={isFr ? 'vous@exemple.fr' : 'you@example.com'}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2"
            >
              {isFr ? 'Message *' : 'Message *'}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="focus:ring-green/20 w-full resize-y rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder-ink-3 focus:border-green focus:outline-none focus:ring-2"
              placeholder={
                isFr ? 'Décrivez votre demande en détail...' : 'Describe your request in detail...'
              }
            />
          </div>

          <button
            type="submit"
            className="mt-1 inline-flex h-[50px] items-center justify-center rounded-lg bg-green px-6 text-[15px] font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            {isFr ? 'Envoyer le message' : 'Send message'}
          </button>

          <p className="text-[12px] text-ink-3">
            {isFr
              ? '* Champs obligatoires. Vos données sont traitées conformément à notre politique de confidentialité.'
              : '* Required fields. Your data is processed in accordance with our privacy policy.'}
          </p>
        </form>

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
