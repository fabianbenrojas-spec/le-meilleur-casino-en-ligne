import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Guides: re-validate weekly (stable editorial content)
export const revalidate = 604800

import { AuthorBio } from '@/components/ui/author-bio'
import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
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
  {
    slug: 'rtp',
    title: 'RTP casino en ligne : tout comprendre sur le taux de redistribution',
    titleEn: 'Online Casino RTP: everything about return to player',
    description:
      'RTP, volatilité, avantage maison : décryptez les chiffres qui déterminent vos chances réelles avant de jouer.',
    eyebrow: 'Guide technique',
    sections: [
      {
        id: 'definition',
        title: "Qu'est-ce que le RTP ?",
        prose: [
          "Le RTP (Return To Player) exprime le pourcentage de l'argent misé qu'un jeu redistribue aux joueurs sur un très grand nombre de parties. Un RTP de 96 % signifie que pour 100 € misés, le jeu redistribue 96 € en moyenne — l'opérateur conservant 4 % (l'avantage maison).",
          'Attention : le RTP est calculé sur des millions de parties, pas sur une session de jeu. Vous pouvez perdre 100 € ou gagner 500 € en une heure, indépendamment du RTP affiché.',
        ],
        highlights: [
          'RTP 96 % = avantage maison de 4 % — la norme des slots',
          "Blackjack avec stratégie de base : RTP jusqu'à 99,65 %",
          'Roulette européenne : RTP 97,3 % (une seule case zéro)',
        ],
      },
      {
        id: 'volatilite',
        title: 'RTP vs Volatilité : les deux à combiner',
        prose: [
          "Le RTP seul ne suffit pas. La volatilité (ou variance) détermine la fréquence et l'amplitude des gains. Un slot haute volatilité peut ne rien payer pendant 100 tours puis déclencher un jackpot de 500×. Un slot basse volatilité paye régulièrement des petits montants.",
          'Exemple concret : Sweet Bonanza (RTP 96,5 %, haute volatilité) peut ne rien payer sur 200 € puis exploser à 5 000 €. European Roulette (RTP 97,3 %, basse volatilité) paye près de la moitié de vos paris pair/impair.',
        ],
        highlights: [
          'Basse volatilité : sessions longues, gains petits et fréquents — idéal pour les bonus wager',
          'Haute volatilité : sessions courtes, gains rares mais potentiellement massifs',
          "Pendant le wager d'un bonus : privilégiez la basse volatilité",
        ],
      },
      {
        id: 'trouver',
        title: "Comment trouver le RTP d'un jeu ?",
        prose: [
          'Le RTP est généralement affiché dans les informations du jeu (icône ℹ️ ou « Règles »). Pour les jeux live, le RTP dépend des règles de la table (nombre de decks, règle du double, etc.).',
          'Notre équipe mesure le RTP effectif sur des échantillons de 1 000+ tours et 10+ sessions de table. Les chiffres publiés dans nos avis sont vérifiés empiriquement, pas seulement copiés des fiches fournisseurs.',
        ],
      },
    ],
    faq: [
      {
        question: 'Un RTP élevé garantit-il de gagner ?',
        answer:
          "Non. Le RTP est une moyenne sur des millions de parties. Sur une session de quelques heures, l'écart à la moyenne peut être énorme. Un RTP de 97 % signifie que le casino garde statistiquement 3 % — pas que vous récupérerez 97 % de vos mises.",
      },
      {
        question: 'Quel RTP minimum rechercher pour un jeu de casino ?',
        answer:
          'Nous recommandons : 96 %+ pour les slots, 97 %+ pour la roulette, 99 %+ pour le blackjack avec stratégie de base. En dessous de 94 %, un jeu est défavorable au joueur dans des proportions difficiles à compenser.',
      },
    ],
    updatedAt: '2026-06-07',
    nextRetest: '2026-09-01',
  },
  {
    slug: 'paiements',
    title: 'Méthodes de paiement casino en ligne : comparatif complet 2026',
    titleEn: 'Online Casino Payment Methods: complete comparison 2026',
    description:
      'CB, e-wallets, crypto : délais de retrait réels, frais cachés et sécurité comparés. Notre guide pour choisir la meilleure méthode.',
    eyebrow: 'Guide pratique',
    sections: [
      {
        id: 'comparatif',
        title: 'Comparatif des méthodes',
        prose: [
          'Toutes les méthodes ne se valent pas en termes de délai, sécurité et disponibilité. Notre équipe a mesuré les délais réels de retrait pour les principales méthodes sur nos 15 casinos testés.',
        ],
        highlights: [
          "Carte bancaire (VISA/MC) : dépôt immédiat, retrait 24–96h selon l'opérateur",
          'Skrill / Neteller : dépôt immédiat, retrait 12–48h — le meilleur rapport vitesse/sécurité',
          'PaySafeCard : dépôt uniquement, pas de retrait possible',
          'Crypto BTC/ETH : retrait en 10 min à 2h — le plus rapide mais volatilité du cours',
          'Virement SEPA : retrait 2–5 jours ouvrés — lent mais sans plafond',
        ],
      },
      {
        id: 'kyc',
        title: 'KYC : la vérification incontournable',
        prose: [
          "Avant le premier retrait, tous les casinos sérieux exigent une vérification KYC (Know Your Customer) : pièce d'identité + justificatif de domicile. Cette vérification prend en général 24 à 72h.",
          'Conseil pratique : effectuez le KYC dès votre inscription, avant même de déposer. Ainsi, votre premier retrait ne sera pas retardé par la vérification.',
        ],
        highlights: [
          'Préparez : CNI/passeport + facture -3 mois + parfois selfie avec pièce',
          'Vérification une seule fois par compte — pas à chaque retrait',
          'Délai moyen constaté : 24h (meilleurs) à 72h (moyenne du secteur)',
        ],
      },
      {
        id: 'crypto',
        title: 'Les cryptomonnaies : avantages et risques',
        prose: [
          'Les retraits crypto sont les plus rapides du marché (10 minutes à 2 heures) et souvent sans plafond pour les montants importants. BTC reste le standard, mais USDT (Tron/TRC-20) offre les frais réseau les plus bas (< 1 €).',
          'Risque principal : la volatilité du cours entre le retrait et la conversion. Un retrait de 500 € en BTC peut valoir 480 € ou 520 € deux heures plus tard selon les fluctuations.',
        ],
      },
    ],
    faq: [
      {
        question: 'Peut-on retirer par une méthode différente du dépôt ?',
        answer:
          "Généralement non pour les premiers retraits. La plupart des casinos exigent un retrait vers la même méthode que le dépôt (politique anti-blanchiment). Au-delà du montant du dépôt initial, le surplus peut être retiré vers n'importe quelle méthode vérifiée.",
      },
      {
        question: 'Pourquoi mon retrait prend-il plus longtemps que prévu ?',
        answer:
          'Les trois causes principales : (1) KYC non encore validé, (2) demande de retrait en weekend (traitement le lundi), (3) montant dépassant le plafond hebdomadaire (retrait fractionné automatiquement). Contactez le support si le délai dépasse celui annoncé par le casino.',
      },
    ],
    updatedAt: '2026-06-07',
    nextRetest: '2026-09-01',
  },
  {
    slug: 'bonus-casino',
    title: 'Choisir son bonus casino : le guide complet 2026',
    titleEn: 'Choosing your casino bonus: complete guide 2026',
    description:
      'Bonus de bienvenue, cashback, tours gratuits : comment lire les conditions de mise et identifier les offres vraiment avantageuses.',
    eyebrow: 'Guide bonus',
    sections: [
      {
        id: 'types',
        title: 'Les types de bonus',
        prose: ['Le marché propose plusieurs types de bonus, chacun avec ses propres conditions :'],
        highlights: [
          'Bonus de bienvenue : le plus courant, 100–200 % du premier dépôt. Lisez le wager.',
          'Tours gratuits : valeur fixe par tour (0,10–0,20 € en général), wager sur les gains.',
          'Cashback : remboursement partiel des pertes, souvent sans wager — le plus honnête.',
          'Bonus sans dépôt : rare, petit montant, conditions très strictes.',
          'Reload bonus : rechargement hebdomadaire ou mensuel pour joueurs existants.',
        ],
      },
      {
        id: 'wager',
        title: 'Décrypter le wager',
        prose: [
          "Le wager (ou mise de dégagement) est le nombre de fois que vous devez miser le bonus avant de pouvoir retirer. C'est le critère le plus important pour évaluer un bonus.",
          "Notre seuil de recommandation : **35× maximum**. Au-delà de 40×, le bonus est statistiquement difficile à convertir en gains réels. Le wager s'applique différemment selon les opérateurs : sur le bonus uniquement (favorable) ou sur le dépôt + bonus (défavorable).",
        ],
        highlights: [
          '< 25× : excellent — les meilleures offres du marché',
          '25–35× : bon — recommandé',
          '35–40× : acceptable — vérifiez les autres conditions',
          '> 40× : élevé — à éviter sauf gros catalogue ou cashback sans wager en parallèle',
        ],
      },
      {
        id: 'pieges',
        title: 'Les clauses pièges à vérifier',
        prose: ['Au-delà du wager, plusieurs clauses peuvent rendre un bonus peu rentable :'],
        highlights: [
          'Mise maximale pendant le wager : souvent 5 €/tour — dépasser annule le bonus',
          'Jeux exclus : la roulette et le blackjack contribuent souvent à 10 % seulement',
          "Délai de validité : 30 jours en général — calculez si c'est réaliste",
          'Plafond de gains : certains casinos plafonnent les gains du bonus à 5× le montant',
          'Wager sur dépôt + bonus : deux fois plus long que wager sur bonus uniquement',
        ],
      },
    ],
    faq: [
      {
        question: 'Vaut-il mieux un gros bonus ou un petit wager ?',
        answer:
          'Mathématiquement, un petit wager est presque toujours préférable. Un bonus de 100 € avec wager de 30× représente 3 000 € à miser. Un bonus de 500 € avec wager de 50× représente 25 000 € à miser — presque impossible à compléter sans pertes significatives.',
      },
      {
        question: 'Peut-on retirer sans avoir satisfait le wager ?',
        answer:
          'Oui, mais vous perdrez le bonus et les gains issus du bonus. Le dépôt initial est généralement retirable à tout moment. Si vous retirez avant de compléter le wager, le casino annulera le montant du bonus et créditera uniquement votre dépôt net.',
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
  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isFr ? guide.title : guide.titleEn,
    description: guide.description,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: { '@type': 'Person', name: 'Julien Marchand' },
    publisher: {
      '@type': 'Organization',
      name: 'le-meilleur-casino-en-ligne.fr',
      url: BASE_URL,
    },
    url: `${BASE_URL}${isFr ? '' : '/en'}/guides/${guide.slug}/`,
  }
  const schemaFAQ =
    guide.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />
      {schemaFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Guides' : 'Guides', href: '/guides/' },
          { label: isFr ? (guide.title.split('—')[0]?.trim() ?? guide.title) : guide.titleEn },
        ]}
        locale={locale}
      />
      <AffiliateDisclosure variant="strip" locale={locale} />

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
            <TableOfContents items={tocItems} locale={locale} />
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {/* Mobile TOC */}
            <details className="mb-6 rounded-lg border border-line bg-surface p-4 lg:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                {isFr ? 'Sommaire' : 'Contents'} <span className="text-ink-3">▾</span>
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
              locale={locale}
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
                    ctaBonus={isFr ? 'Obtenir le bonus' : 'Get bonus'}
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
