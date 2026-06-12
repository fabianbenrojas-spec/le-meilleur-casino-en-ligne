import type { Metadata } from 'next'

import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
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
      ? 'À propos — le Wirecutter du casino en ligne'
      : 'About us — the Wirecutter of online casinos',
    description: isFr
      ? 'Qui sommes-nous, comment nous testons les casinos, notre modèle économique et nos engagements éditoriaux.'
      : 'Who we are, how we test casinos, our business model and editorial commitments.',
    alternates: { languages: buildHreflang('/a-propos/') },
  }
}

const team = [
  {
    name: 'Julien Marchand',
    role: 'Rédacteur en chef',
    roleEn: 'Editor-in-chief',
    bio: "11 ans dans l'iGaming — ex-analyste conformité chez un opérateur européen, ancien responsable CRM. A personnellement testé plus de 200 casinos en ligne. Spécialité : légalité, paiements, jeu responsable.",
    bioEn:
      '11 years in iGaming — former compliance analyst at a European operator, former CRM manager. Personally tested 200+ online casinos. Specialities: legality, payments, responsible gambling.',
    credentials: [
      'Ex-analyste conformité · opérateur licence MGA',
      "200+ casinos testés à l'argent réel",
    ],
    credentialsEn: [
      'Former compliance analyst · MGA-licensed operator',
      '200+ casinos tested with real money',
    ],
    lastUpdated: '2026-06-07',
    nextRetest: '2026-09-01',
  },
  {
    name: 'Sophie Renard',
    role: 'Éditrice — Jeux & RTP',
    roleEn: 'Editor — Games & RTP',
    bio: "Mathématicienne de formation, 7 ans d'expérience dans l'analyse de jeux de casino. Spécialiste des machines à sous — calcule le RTP effectif sur des échantillons de 1 000+ tours.",
    bioEn:
      'Mathematics background, 7 years of experience in casino game analysis. Slot specialist — computes effective RTP on samples of 1,000+ spins.',
    credentials: ['Mathématicienne · Master probabilités', 'Testée 500+ machines à sous'],
    credentialsEn: ['Mathematician · Master in probability', 'Tested 500+ slot machines'],
    lastUpdated: '2026-06-07',
    nextRetest: '2026-09-01',
  },
]

export default async function AProposPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'À propos' : 'About' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Notre mission' : 'Our mission'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Le <em className="italic not-italic text-green">Wirecutter</em> du casino en ligne
              </>
            ) : (
              <>
                The <em className="italic not-italic text-green">Wirecutter</em> of online casinos
              </>
            )}
          </h1>
          <p className="mb-5 text-[18px] leading-[1.6] text-ink-2">
            {isFr
              ? "Notre modèle est simple : tester chaque casino à l'argent réel, noter honnêtement, et ne recommander que ce que nous utiliserions nous-mêmes."
              : 'Our model is simple: test each casino with real money, rate honestly, and only recommend what we would use ourselves.'}
          </p>
          <p className="text-[16px] leading-[1.65] text-ink-2">
            {isFr
              ? "Le secteur du casino en ligne est saturé de sites qui copient-collent des informations sans jamais avoir ouvert un compte. Nous prenons le contre-pied : chaque review publiée est le résultat d'un test réel, avec dépôt effectif, sessions de jeu et demande de retrait."
              : 'The online casino industry is saturated with sites that copy-paste information without ever opening an account. We take the opposite approach: every published review is the result of a real test, with an actual deposit, play sessions and withdrawal request.'}
          </p>
        </div>
      </section>

      {/* How we test */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,32px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Comment nous testons' : 'How we test'}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {(isFr
              ? [
                  {
                    n: '01',
                    title: 'Dépôt réel',
                    desc: "Nous ouvrons un compte et déposons de l'argent réel — pas de compte test fourni par l'opérateur.",
                  },
                  {
                    n: '02',
                    title: 'Sessions de jeu',
                    desc: 'Nous jouons pendant plusieurs sessions sur différentes catégories de jeux, en notant le RTP effectif sur notre échantillon.',
                  },
                  {
                    n: '03',
                    title: 'Demande de retrait',
                    desc: 'Nous demandons un retrait et chronométrons le délai réel — de la demande à la réception des fonds.',
                  },
                  {
                    n: '04',
                    title: 'Test du support',
                    desc: 'Nous soumettons 5 questions — dont certaines pièges — et évaluons la réactivité, la compétence et la disponibilité en français.',
                  },
                ]
              : [
                  {
                    n: '01',
                    title: 'Real deposit',
                    desc: 'We open an account and make a real deposit — no test account provided by the operator.',
                  },
                  {
                    n: '02',
                    title: 'Play sessions',
                    desc: 'We play over multiple sessions across different game categories, recording the effective RTP on our sample.',
                  },
                  {
                    n: '03',
                    title: 'Withdrawal request',
                    desc: 'We request a withdrawal and time the real delay — from request to receipt of funds.',
                  },
                  {
                    n: '04',
                    title: 'Support test',
                    desc: 'We submit 5 questions — including some trick questions — and assess responsiveness, competence and availability.',
                  },
                ]
            ).map((step) => (
              <div key={step.n} className="rounded-lg border border-line bg-surface p-5 shadow-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-green">{step.n}</span>
                  <h3 className="font-serif text-[18px] font-semibold text-ink">{step.title}</h3>
                </div>
                <p className="text-[14px] leading-[1.55] text-ink-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="py-12">
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,32px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Notre modèle économique' : 'Our business model'}
          </h2>
          <div className="rounded-lg border border-line bg-surface p-6 shadow-1">
            <p className="text-[15px] leading-[1.7] text-ink-2">
              {isFr
                ? "Nous percevons des commissions sur les inscriptions réalisées via nos liens d'affiliation. Ces commissions financent notre travail éditorial — tests à l'argent réel, équipe de rédaction, infrastructure."
                : 'We earn commissions on sign-ups made through our affiliate links. These commissions fund our editorial work — real-money testing, editorial team, infrastructure.'}
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-ink-2">
              {isFr
                ? 'Notre politique est explicite : aucune commission perçue ne peut modifier une note. Un casino mal noté qui nous propose un partenariat reste mal noté. Nous avons refusé des partenariats avec des opérateurs que nous ne pouvions pas recommander en conscience.'
                : 'Our policy is explicit: no commission can change a rating. A poorly-rated casino that offers us a partnership remains poorly-rated. We have declined partnerships with operators we could not conscientiously recommend.'}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg-sunken py-12">
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(22px,2.8vw,32px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? "L'équipe" : 'The team'}
          </h2>
          <div className="flex flex-col gap-5">
            {team.map((member) => (
              <AuthorBio
                key={member.name}
                name={member.name}
                role={isFr ? member.role : member.roleEn}
                credentials={(isFr ? member.credentials : member.credentialsEn).join(' · ')}
                lastUpdated={member.lastUpdated}
                nextRetest={member.nextRetest}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
