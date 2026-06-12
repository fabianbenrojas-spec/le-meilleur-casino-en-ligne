import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { SelfTest } from '@/components/review/self-test'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

// ⚠️ ZERO affiliate CTA on this page — editorial ethics + EEAT requirement

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn
      ? 'Responsible Gambling — Help & Tools'
      : "Jeu responsable : reconnaître les risques et trouver de l'aide",
    description: isEn
      ? 'Recognise the signs, set limits, self-exclude and find free help. GamCare · BeGambleAware · 18+'
      : "Le jeu doit rester un plaisir. Reconnaître les signes d'une pratique à risque, fixer des limites et trouver de l'aide gratuite. 09 74 75 13 13.",
    alternates: { languages: buildHreflang('/jeu-responsable/', '/responsible-gambling/') },
    robots: { index: true, follow: true },
  }
}

const warningSigns = [
  'Vous essayez de « rattraper » vos pertes en jouant davantage',
  'Le jeu interfère avec votre travail, famille ou vie sociale',
  "Vous empruntez de l'argent pour jouer",
  'Vous mentez sur le montant ou la fréquence de vos sessions',
  "Vous jouez pour échapper au stress ou à l'anxiété",
  "Vous ressentez de l'irritabilité quand vous ne jouez pas",
]

const tools = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[22px] w-[22px]"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: 'Limites de dépôt',
    desc: 'Tous les opérateurs sous licence sont tenus de proposer des limites de dépôt quotidiennes, hebdomadaires ou mensuelles. Activez-les dès votre inscription.',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[22px] w-[22px]"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    title: 'Limites de temps de jeu',
    desc: 'Définissez une durée de session maximale. Une alarme vous alertera — et il est possible de vous forcer à prendre une pause.',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[22px] w-[22px]"
        aria-hidden
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
    title: 'Auto-exclusion',
    desc: "Demandez votre auto-exclusion directement sur le site du casino. En France, vous pouvez aussi vous inscrire sur le registre national de l'ANJ pour l'exclusion multi-opérateurs.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[22px] w-[22px]"
        aria-hidden
      >
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      </svg>
    ),
    title: 'Réalité vérifiée',
    desc: 'Les casinos légaux affichent vos pertes et gains en temps réel. Consultez régulièrement votre historique pour avoir une vision objective de votre pratique.',
  },
]

const resources = [
  {
    org: 'Joueurs Info Service',
    flag: 'France · Gratuit',
    contact: '09 74 75 13 13',
    contactHref: 'tel:0974751313',
    desc: "Ligne d'écoute professionnelle, disponible 8h–2h, 7j/7. Appel non surtaxé, confidentiel.",
  },
  {
    org: 'Joueurs-Info-Service.fr',
    flag: 'France · En ligne',
    contact: 'joueurs-info-service.fr',
    contactHref: 'https://www.joueurs-info-service.fr',
    desc: 'Tchat en ligne, auto-évaluation, espace de parole anonyme et ressources pour les proches.',
  },
  {
    org: 'GamCare',
    flag: 'UK · 24h/24',
    contact: '0808 8020 133',
    contactHref: 'tel:08088020133',
    desc: 'Conseil, soutien et traitement pour les joueurs problématiques au Royaume-Uni. Appel gratuit.',
  },
  {
    org: 'BeGambleAware',
    flag: 'UK · En ligne',
    contact: 'begambleaware.org',
    contactHref: 'https://www.begambleaware.org',
    desc: 'Information, conseils et orientation vers des services de traitement spécialisés.',
  },
]

export default async function JeuResponsablePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  void params // params typed but locale not yet used — EN variant in Phase 7+

  return (
    <>
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Jeu responsable' }]} />

      {/* Hero */}
      <section className="pb-2 pt-11">
        <div className="mx-auto max-w-[820px] px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.13em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            Bien-être des joueurs
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(34px,5vw,54px)] font-medium leading-[1.05] tracking-[-0.022em] text-ink">
            Le jeu doit rester un plaisir.
          </h1>
          <p className="m-0 text-[20px] leading-[1.6] text-ink-2">
            Si vous vous sentez dépassé par votre pratique du jeu, vous n&apos;êtes pas seul. Des
            ressources gratuites et confidentielles existent pour vous aider.
          </p>

          {/* Helpline card */}
          <div className="mt-[30px] flex flex-wrap items-center gap-6 rounded-lg border border-l-[5px] border-[color-mix(in_srgb,var(--red)_28%,var(--line))] border-l-red bg-surface p-[24px_28px] shadow-2">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-red-50 text-red">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-7 w-7"
                aria-hidden
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2 4.1 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7A2 2 0 0 1 22 17z" />
              </svg>
            </div>
            <div className="min-w-[220px] flex-1">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-red-ink">
                Joueurs Info Service — France
              </p>
              <a
                href="tel:0974751313"
                className="block font-serif text-[32px] font-semibold leading-none tracking-[-0.01em] text-ink hover:text-red"
              >
                09 74 75 13 13
              </a>
              <p className="mt-1.5 text-[13px] text-ink-3">
                Appel gratuit et confidentiel · 8h–2h · 7j/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="py-[26px]">
        <div className="mx-auto max-w-[900px] px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            Signaux d&apos;alerte à reconnaître
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            Ces comportements ne signifient pas forcément une dépendance, mais méritent une
            attention particulière.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {warningSigns.map((sign, i) => (
              <div
                key={i}
                className="flex items-start gap-[13px] rounded border border-line bg-surface p-[15px_17px] shadow-1"
              >
                <span className="mt-px grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-red-50 text-[13px] font-extrabold text-red">
                  !
                </span>
                <span className="text-[14.5px] leading-[1.45] text-ink-2">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-bg-sunken py-[26px]">
        <div className="mx-auto max-w-[900px] px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            Outils à votre disposition
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            Tous les opérateurs responsables proposent ces outils — n&apos;hésitez pas à les
            utiliser dès le départ.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-lg border border-line bg-surface p-[22px] shadow-1"
              >
                <div className="mb-[14px] grid h-11 w-11 place-items-center rounded-[11px] bg-green-50 text-green">
                  {tool.icon}
                </div>
                <h3 className="mb-[6px] font-serif text-[19px] font-semibold text-ink">
                  {tool.title}
                </h3>
                <p className="m-0 text-[14px] leading-[1.55] text-ink-2">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-test */}
      <section className="py-[26px]">
        <div className="mx-auto max-w-[900px] px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            Auto-évaluation
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            3 questions pour faire le point sur votre pratique. Vos réponses ne sont jamais
            enregistrées.
          </p>
          <SelfTest />
        </div>
      </section>

      {/* Resources */}
      <section className="bg-bg-sunken py-[26px]">
        <div className="mx-auto max-w-[900px] px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            Ressources d&apos;aide
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            Ces organisations proposent un accompagnement professionnel et confidentiel, gratuit.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {resources.map((res) => (
              <div
                key={res.org}
                className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-[22px] shadow-1"
              >
                <p className="font-serif text-[19px] font-semibold text-ink">{res.org}</p>
                <p className="font-mono text-[11px] text-ink-3">{res.flag}</p>
                <p className="flex-1 text-[13.5px] leading-[1.5] text-ink-2">{res.desc}</p>
                <a
                  href={res.contactHref}
                  className="mt-auto text-[15px] font-bold text-green hover:underline"
                >
                  {res.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
