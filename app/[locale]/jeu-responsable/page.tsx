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
    alternates: { languages: buildHreflang('/jeu-responsable/') },
    robots: { index: true, follow: true },
  }
}

// ── FR data ────────────────────────────────────────────────────────────────────

const warningSigns_FR = [
  'Vous essayez de « rattraper » vos pertes en jouant davantage',
  'Le jeu interfère avec votre travail, famille ou vie sociale',
  "Vous empruntez de l'argent pour jouer",
  'Vous mentez sur le montant ou la fréquence de vos sessions',
  "Vous jouez pour échapper au stress ou à l'anxiété",
  "Vous ressentez de l'irritabilité quand vous ne jouez pas",
]

const warningSigns_EN = [
  'You keep chasing losses by playing more',
  'Gambling is interfering with your work, family or social life',
  'You borrow money to gamble',
  'You hide how much or how often you play',
  'You gamble to escape stress or anxiety',
  "You feel irritable when you're not gambling",
]

const PhoneIcon = () => (
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
)

const CalendarIcon = () => (
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
)

const ClockIcon = () => (
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
)

const XIcon = () => (
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
)

const ShieldIcon = () => (
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
)

interface ToolItem {
  icon: React.ReactNode
  title: string
  desc: string
}

const tools_FR: ToolItem[] = [
  {
    icon: <CalendarIcon />,
    title: 'Limites de dépôt',
    desc: 'Tous les opérateurs sous licence sont tenus de proposer des limites de dépôt quotidiennes, hebdomadaires ou mensuelles. Activez-les dès votre inscription.',
  },
  {
    icon: <ClockIcon />,
    title: 'Limites de temps de jeu',
    desc: 'Définissez une durée de session maximale. Une alarme vous alertera — et il est possible de vous forcer à prendre une pause.',
  },
  {
    icon: <XIcon />,
    title: 'Auto-exclusion',
    desc: "Demandez votre auto-exclusion directement sur le site du casino. En France, vous pouvez aussi vous inscrire sur le registre national de l'ANJ pour l'exclusion multi-opérateurs.",
  },
  {
    icon: <ShieldIcon />,
    title: 'Réalité vérifiée',
    desc: 'Les casinos légaux affichent vos pertes et gains en temps réel. Consultez régulièrement votre historique pour avoir une vision objective de votre pratique.',
  },
]

const tools_EN: ToolItem[] = [
  {
    icon: <CalendarIcon />,
    title: 'Deposit limits',
    desc: 'All licensed operators must offer daily, weekly or monthly deposit limits. Set them at registration — before you need them.',
  },
  {
    icon: <ClockIcon />,
    title: 'Session time limits',
    desc: 'Set a maximum session length. An alarm will notify you when time is up, and you can force an automatic break.',
  },
  {
    icon: <XIcon />,
    title: 'Self-exclusion',
    desc: 'Request self-exclusion directly on the casino website. In the UK, use GAMSTOP to self-exclude from all UKGC-licensed sites in one step.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Reality check',
    desc: 'Licensed casinos display your real-time losses and wins. Review your session history regularly to maintain an objective view of your gambling.',
  },
]

interface ResourceItem {
  org: string
  flag: string
  contact: string
  contactHref: string
  desc: string
}

const resources_FR: ResourceItem[] = [
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

const resources_EN: ResourceItem[] = [
  {
    org: 'GamCare',
    flag: 'UK · 24/7 · Free',
    contact: '0808 8020 133',
    contactHref: 'tel:08088020133',
    desc: 'Free support, information and counselling for people affected by gambling harms.',
  },
  {
    org: 'BeGambleAware',
    flag: 'UK · Online',
    contact: 'begambleaware.org',
    contactHref: 'https://www.begambleaware.org',
    desc: 'Advice, information and referral to treatment services. Also resources for family and friends.',
  },
  {
    org: 'Joueurs Info Service',
    flag: 'France · Free',
    contact: '09 74 75 13 13',
    contactHref: 'tel:0974751313',
    desc: 'Professional listening line for French-speaking players. Available 8am–2am, 7 days a week.',
  },
  {
    org: 'Gamblers Anonymous',
    flag: 'International · In-person',
    contact: 'gamblersanonymous.org.uk',
    contactHref: 'https://www.gamblersanonymous.org.uk',
    desc: 'Peer-support fellowship for people who want to stop gambling. Meetings across the UK and internationally.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function JeuResponsablePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const warningSigns = isFr ? warningSigns_FR : warningSigns_EN
  const tools = isFr ? tools_FR : tools_EN
  const resources = isFr ? resources_FR : resources_EN

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeu responsable' : 'Responsible Gambling' },
        ]}
        locale={locale}
      />

      {/* Hero */}
      <section className="pb-2 pt-11">
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.13em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Bien-être des joueurs' : 'Player welfare'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(34px,5vw,54px)] font-medium leading-[1.05] tracking-[-0.022em] text-ink">
            {isFr ? 'Le jeu doit rester un plaisir.' : 'Gambling should stay fun.'}
          </h1>
          <p className="m-0 text-[20px] leading-[1.6] text-ink-2">
            {isFr
              ? "Si vous vous sentez dépassé par votre pratique du jeu, vous n'êtes pas seul. Des ressources gratuites et confidentielles existent pour vous aider."
              : "If you feel gambling is getting out of hand, you're not alone. Free, confidential support is available — and help works."}
          </p>

          {/* Helpline card — locale-aware */}
          <div className="mt-[30px] flex flex-wrap items-center gap-6 rounded-lg border border-l-[5px] border-[color-mix(in_srgb,var(--red)_28%,var(--line))] border-l-red bg-surface p-[24px_28px] shadow-2">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-red-50 text-red">
              <PhoneIcon />
            </div>
            <div className="min-w-[220px] flex-1">
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-red-ink">
                {isFr ? 'Joueurs Info Service — France' : 'GamCare — United Kingdom'}
              </p>
              <a
                href={isFr ? 'tel:0974751313' : 'tel:08088020133'}
                className="block font-serif text-[32px] font-semibold leading-none tracking-[-0.01em] text-ink hover:text-red"
              >
                {isFr ? '09 74 75 13 13' : '0808 8020 133'}
              </a>
              <p className="mt-1.5 text-[13px] text-ink-3">
                {isFr
                  ? 'Appel gratuit et confidentiel · 8h–2h · 7j/7'
                  : 'Free call · Confidential · Available 24/7'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning signs */}
      <section className="py-[26px]">
        <div className="mx-auto max-w-[900px] px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            {isFr ? "Signaux d'alerte à reconnaître" : 'Warning signs to recognise'}
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            {isFr
              ? 'Ces comportements ne signifient pas forcément une dépendance, mais méritent une attention particulière.'
              : "These behaviours don't necessarily mean addiction, but they're worth taking seriously."}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {warningSigns.map((sign, i) => (
              <div
                key={i}
                className="flex items-start gap-[13px] rounded border border-line bg-surface p-[15px_17px] shadow-1"
              >
                <span
                  className="mt-px grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-red-50 text-[13px] font-extrabold text-red"
                  aria-hidden
                >
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
        <div className="mx-auto max-w-[900px] px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            {isFr ? 'Outils à votre disposition' : 'Tools available to you'}
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            {isFr
              ? "Tous les opérateurs responsables proposent ces outils — n'hésitez pas à les utiliser dès le départ."
              : 'All responsible operators provide these tools — use them proactively, not just in a crisis.'}
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
        <div className="mx-auto max-w-[900px] px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            {isFr ? 'Auto-évaluation' : 'Self-assessment'}
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            {isFr
              ? '3 questions pour faire le point sur votre pratique. Vos réponses ne sont jamais enregistrées.'
              : '3 questions to reflect on your gambling habits. Your answers are never saved.'}
          </p>
          <SelfTest locale={locale} />
        </div>
      </section>

      {/* Resources */}
      <section className="bg-bg-sunken py-[26px]">
        <div className="mx-auto max-w-[900px] px-8 sm:px-[18px]">
          <h2 className="mb-2 font-serif text-[clamp(26px,3.4vw,34px)] font-medium leading-tight tracking-[-0.016em] text-ink">
            {isFr ? "Ressources d'aide" : 'Help resources'}
          </h2>
          <p className="mb-[22px] max-w-[70ch] text-[16.5px] leading-[1.6] text-ink-2">
            {isFr
              ? 'Ces organisations proposent un accompagnement professionnel et confidentiel, gratuit.'
              : 'These organisations offer free, professional and confidential support.'}
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
