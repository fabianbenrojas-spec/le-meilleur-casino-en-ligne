import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { ListingCard } from '@/components/ui/operator-card'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

// ── Guide seed data ─────────────────────────────────────────────────────────

interface GuideSection {
  id: string
  title: string
  prose: string[]
  highlights?: string[]
}

interface GuideData {
  slug: string
  title: string
  titleEn: string
  description: string
  eyebrow: string
  sections: GuideSection[]
  faq: { question: string; answer: string }[]
  updatedAt: string
  nextRetest: string
}

const guides: GuideData[] = [
  {
    slug: 'legalite',
    title: 'Légalité des casinos en ligne en France — tout comprendre',
    titleEn: 'Online Casino Legality in France — everything you need to know',
    description:
      "Casino en ligne et loi française : ce qui est autorisé, le rôle de l'ANJ, et les risques réels pour les joueurs.",
    eyebrow: 'Guide juridique',
    sections: [
      {
        id: 'cadre',
        title: 'Le cadre légal français',
        prose: [
          "En France, les jeux d'argent en ligne sont régulés par l'Autorité Nationale des Jeux (ANJ). Cependant, cette régulation ne couvre pas les casinos en ligne — seulement les paris sportifs, le poker et les pronostics hippiques.",
          "Les casinos en ligne opèrent donc dans un vide juridique partiel pour les joueurs français. Il n'est pas illégal pour un particulier d'y jouer, mais les opérateurs sans licence française n'ont pas le droit de proposer activement leurs services en France.",
        ],
      },
      {
        id: 'risques',
        title: 'Les risques réels',
        prose: [
          "Jouer sur un casino étranger sans licence ANJ comporte des risques concrets : protection légale moindre en cas de litige, absence de garantie sur les fonds déposés, et aucun mécanisme d'auto-exclusion national.",
          'Les casinos que nous référençons disposent tous de licences valides (Curaçao, Malta Gaming Authority) et appliquent des standards stricts en matière de jeu responsable.',
        ],
        highlights: [
          "Pas d'infraction pénale pour le joueur particulier",
          "Recours juridique limité en cas de litige avec l'opérateur",
          "Les gains ne sont pas soumis à l'impôt en France (jeux de hasard)",
        ],
      },
      {
        id: 'conseils',
        title: 'Nos recommandations pratiques',
        prose: [
          "Pour minimiser les risques, privilégiez les opérateurs détenteurs d'une licence MGA (Malta Gaming Authority) — l'une des plus strictes au monde — ou d'une licence Curaçao récente avec accès aux outils de jeu responsable.",
          "Vérifiez toujours que le casino dispose d'un processus KYC rigoureux et d'outils d'auto-exclusion fonctionnels avant de déposer.",
        ],
      },
    ],
    faq: [
      {
        question: 'Est-il illégal de jouer dans un casino en ligne en France ?',
        answer:
          "Non, il n'est pas illégal pour un joueur particulier de jouer sur un casino en ligne opérant sous licence étrangère. L'illégalité concerne les opérateurs qui ne respectent pas le cadre ANJ, pas les joueurs.",
      },
      {
        question: 'Dois-je déclarer mes gains au fisc ?',
        answer:
          "En France, les gains issus de jeux de hasard ne sont pas soumis à l'impôt sur le revenu pour les particuliers. Cette règle s'applique également aux casinos en ligne.",
      },
    ],
    updatedAt: '2026-06-07',
    nextRetest: '2026-09-01',
  },
  {
    slug: 'methodologie',
    title: 'Notre méthodologie de notation des casinos',
    titleEn: 'Our casino rating methodology',
    description:
      "Comment nous évaluons les casinos en ligne : 38 critères, tests à l'argent réel, re-tests tous les 90 jours.",
    eyebrow: 'Transparence éditoriale',
    sections: [
      {
        id: 'principe',
        title: 'Le principe : tester avant de noter',
        prose: [
          "Chaque casino de notre comparatif est testé par un membre de notre équipe avec de l'argent réel. Nous effectuons un dépôt, jouons pendant plusieurs sessions, demandons un retrait et testons le support client.",
          "Aucune note n'est accordée sans test effectif. Aucune commission perçue ne peut modifier la note attribuée — nos partenariats commerciaux sont documentés séparément de notre processus éditorial.",
        ],
      },
      {
        id: 'criteres',
        title: 'Les 38 critères, répartis en 9 familles',
        prose: [
          'Nos critères sont regroupés en 9 familles : bonus (20%), paiements (18%), ludothèque (16%), support (14%), sécurité (12%), mobile (10%), VIP (5%), jeu responsable (3%), interface (2%).',
        ],
        highlights: [
          'Bonus : montant, wager, délai, jeux éligibles',
          'Paiements : délai testé, méthodes, plafonds, KYC',
          'Ludothèque : volume, fournisseurs, RTP mesuré',
          'Support : 5 questions pièges, temps de réponse',
          'Sécurité : validité licence, chiffrement, outils RG',
        ],
      },
    ],
    faq: [
      {
        question: 'À quelle fréquence mettez-vous à jour vos avis ?',
        answer:
          'Chaque casino est re-testé tous les 90 jours minimum. En cas de changement important (bonus, conditions, problèmes signalés), nous mettons à jour immédiatement.',
      },
    ],
    updatedAt: '2026-06-07',
    nextRetest: '2026-09-01',
  },
]

const guideMap = new Map(guides.map((g) => [g.slug, g]))
const allSlugs = guides.map((g) => ({ slug: g.slug }))

export async function generateStaticParams() {
  return allSlugs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const guide = guideMap.get(slug)
  if (!guide) return {}

  const isEn = locale === 'en'
  return {
    title: isEn ? guide.titleEn : guide.title,
    description: guide.description,
    alternates: { languages: buildHreflang(`/guides/${slug}/`) },
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const guide = guideMap.get(slug)
  if (!guide) notFound()

  const isFr = locale === 'fr'
  const tocItems = guide.sections.map((s) => ({ id: s.id, label: s.title }))

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Guides' : 'Guides', href: '/guides/' },
          { label: isFr ? (guide.title.split('—')[0]?.trim() ?? guide.title) : guide.titleEn },
        ]}
      />

      {/* Hero */}
      <section className="pb-4 pt-10" data-page-type="guide" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {guide.eyebrow}
          </div>
          <h1 className="mb-[18px] max-w-[22ch] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? guide.title : guide.titleEn}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">
            {guide.description}
          </p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-site px-8 sm:px-[18px]">
        <div className="grid grid-cols-1 items-start gap-10 pb-16 pt-10 lg:grid-cols-[240px_1fr]">
          {/* Sidebar TOC */}
          <aside className="sticky top-[calc(var(--header-h)+18px)] hidden flex-col gap-4 lg:flex">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* Mobile TOC */}
            <details className="mb-6 rounded-lg border border-line bg-surface p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                Sommaire <span className="text-ink-3">▾</span>
              </summary>
              <ul className="mt-3 flex flex-col gap-1 pl-2">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block py-1 text-[13.5px] text-ink-2 hover:text-green"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            {/* Sections */}
            {guide.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-8 [scroll-margin-top:calc(var(--header-h)+20px)]"
              >
                <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
                  <span className="mr-3 font-mono text-[14px] text-green">0{i + 1}</span>
                  {section.title}
                </h2>
                {section.prose.map((p, pi) => (
                  <p
                    key={pi}
                    className="mb-[14px] max-w-[68ch] text-[16px] leading-[1.68] text-ink-2"
                  >
                    {p}
                  </p>
                ))}
                {section.highlights && (
                  <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                    {section.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[15px] text-ink-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-[16px] w-[16px] shrink-0 text-green"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Author */}
            <AuthorBio
              name="Julien Marchand"
              role={
                isFr
                  ? "Rédacteur en chef · 11 ans dans l'iGaming"
                  : 'Editor-in-chief · 11 years in iGaming'
              }
              credentials={
                isFr
                  ? 'Ex-analyste conformité · testé 200+ casinos'
                  : 'Former compliance analyst · 200+ casinos tested'
              }
              lastUpdated={guide.updatedAt}
              nextRetest={guide.nextRetest}
              className="my-8"
            />

            {/* FAQ */}
            {guide.faq.length > 0 && (
              <div>
                <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
                  {isFr ? 'Questions fréquentes' : 'FAQ'}
                </h2>
                <FAQAccordion items={guide.faq} includeSchema />
              </div>
            )}

            {/* Casino recommendations */}
            <div className="mt-10 rounded-xl border border-line bg-surface-2 p-6">
              <h3 className="mb-4 font-serif text-[21px] font-semibold text-ink">
                {isFr ? 'Casinos recommandés' : 'Recommended casinos'}
              </h3>
              <div className="flex flex-col gap-3">
                {TOP_10.slice(0, 3).map((op, i) => (
                  <ListingCard
                    key={op.id}
                    operator={op}
                    isTop={i === 0}
                    ga4={{ 'data-page-type': 'guide', 'data-locale': locale }}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <CTAButton
                  href="/casinos/"
                  variant="secondary"
                  size="sm"
                  data-event="review_click"
                  data-placement="guide_footer"
                >
                  {isFr ? 'Voir tous les casinos' : 'See all casinos'}
                </CTAButton>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
