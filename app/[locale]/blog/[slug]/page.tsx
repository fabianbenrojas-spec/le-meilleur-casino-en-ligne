import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Blog articles: re-validate every 24h
export const revalidate = 86400

import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ListingCard } from '@/components/ui/operator-card'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

interface BlogPost {
  slug: string
  category: string
  categoryEn: string
  date: string
  readTime: string
  updatedAt: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  sections: { id: string; heading: string; body: string[] }[]
  faq: { question: string; answer: string }[]
  showCasinos: boolean
}

const posts: BlogPost[] = [
  {
    slug: 'anj-2026',
    category: 'Législation',
    categoryEn: 'Regulation',
    date: '2026-06-04',
    readTime: '4 min',
    updatedAt: '2026-06-04',
    title: 'ANJ 2026 : ce qui change pour les joueurs en ligne',
    titleEn: '2026 ANJ Update: what changes for online players',
    description:
      "L'ANJ publie ses nouvelles directives 2026. On décrypte ce qui change pour les joueurs et les opérateurs en ligne.",
    descriptionEn:
      'The ANJ publishes its 2026 guidelines. We break down what changes for online players and operators.',
    sections: [
      {
        id: 'contexte',
        heading: "Contexte : le rôle de l'ANJ",
        body: [
          "L'Autorité Nationale des Jeux (ANJ) régule en France les paris sportifs, le poker et les pronostics hippiques. Les casinos en ligne ne relèvent pas de sa compétence — ils opèrent sous licences étrangères (MGA, Curaçao).",
          "Les nouvelles directives 2026 concernent principalement les opérateurs ANJ-agréés, mais certaines mesures influencent indirectement l'ensemble du marché.",
        ],
      },
      {
        id: 'nouveautes',
        heading: 'Les principales nouveautés',
        body: [
          "Renforcement des outils de jeu responsable : les opérateurs agréés devront proposer un tableau de bord de suivi des dépenses plus détaillé, accessible en un clic depuis l'interface principale.",
          'Délais de vérification KYC réduits : la durée maximale pour valider un compte passe de 72h à 48h. Cette mesure vise à réduire les délais de retrait pour les joueurs légitimes.',
          'Publicité : nouvelles restrictions sur les messages promotionnels entre 6h et 20h sur les chaînes généralistes.',
        ],
      },
      {
        id: 'impact',
        heading: 'Impact sur les joueurs',
        body: [
          "Pour les joueurs de casinos en ligne opérant sous licence étrangère, l'impact est indirect. Les opérateurs de qualité anticipent généralement les évolutions réglementaires et les appliquent à l'ensemble de leurs marchés.",
          "Pratiquement : vérifiez que votre casino dispose d'outils de suivi des dépenses et d'auto-exclusion fonctionnels. C'est un signal fort de sérieux opérationnel.",
        ],
      },
    ],
    faq: [
      {
        question: "L'ANJ régule-t-elle les casinos en ligne en France ?",
        answer:
          "Non. L'ANJ régule uniquement les paris sportifs, le poker et l'hippisme. Les casinos en ligne opèrent sous licences étrangères. Il n'est pas illégal pour un particulier d'y jouer.",
      },
    ],
    showCasinos: true,
  },
  {
    slug: 'wager-pieges',
    category: 'Bonus',
    categoryEn: 'Bonus',
    date: '2026-06-01',
    readTime: '6 min',
    updatedAt: '2026-06-01',
    title: 'Wager casino : les 5 pièges à éviter',
    titleEn: 'Casino wagering: the 5 traps to avoid',
    description:
      'Les conditions de mise cachent des clauses qui font perdre leur bonus à la plupart des joueurs. Voici les 5 pièges les plus courants et comment les éviter.',
    descriptionEn:
      'Wagering conditions hide clauses that cause most players to lose their bonus. Here are the 5 most common traps and how to avoid them.',
    sections: [
      {
        id: 'piege-1',
        heading: '1. La mise maximale autorisée',
        body: [
          "La quasi-totalité des casinos imposent une mise maximale par tour pendant le wager — généralement 5 €. Dépasser ce plafond, même une seule fois, peut entraîner l'annulation du bonus et des gains associés.",
          'Conseil : configurez votre mise avant de commencer et ne la modifiez pas en cours de session wager.',
        ],
      },
      {
        id: 'piege-2',
        heading: '2. Les jeux exclus ou à contribution réduite',
        body: [
          "Les machines à sous contribuent généralement à 100% du wager. Mais la roulette, le blackjack et les jeux live sont souvent exclus ou ne comptent qu'à 10–20%.",
          'Résultat : si vous jouez principalement aux jeux de table, votre wager effectif est 5 à 10× plus long.',
        ],
      },
      {
        id: 'piege-3',
        heading: '3. Le délai de validité',
        body: [
          'La plupart des bonus ont un délai de 30 jours pour satisfaire les conditions de mise. Passé ce délai, bonus et gains sont annulés — même si vous aviez presque terminé.',
          "Calculez à l'avance si le wager est réaliste en 30 jours avant de réclamer un bonus.",
        ],
      },
      {
        id: 'piege-4',
        heading: '4. Le wager sur dépôt + bonus (ou seulement bonus)',
        body: [
          "Attention à la formulation : certains casinos appliquent le wager sur le dépôt + le bonus, d'autres uniquement sur le montant du bonus. La différence est massive.",
          "Exemple : bonus 100 € avec wager 35× — si c'est 35× (dépôt 100 € + bonus 100 €), vous devez miser 7 000 €. Si c'est 35× (bonus uniquement), vous devez miser 3 500 €.",
        ],
      },
      {
        id: 'piege-5',
        heading: '5. Le plafond de retrait',
        body: [
          'Certains casinos plafonnent les gains issus du bonus à un multiple du bonus (ex. 5× = 500 € maximum si vous aviez reçu 100 €). Même si vous avez gagné 5 000 €, vous ne pourrez retirer que 500 €.',
          "Cherchez cette clause dans la section 'bonus terms' — elle est souvent formulée 'maximum cashout from bonus'.",
        ],
      },
    ],
    faq: [
      {
        question: "Qu'est-ce qu'un bon wager ?",
        answer:
          "Un wager inférieur à 35× est considéré comme raisonnable. En dessous de 25×, c'est excellent. Au-dessus de 50×, le bonus devient statistiquement difficile à rentabiliser.",
      },
    ],
    showCasinos: true,
  },
  {
    slug: 'retraits-crypto',
    category: 'Paiements',
    categoryEn: 'Payments',
    date: '2026-05-28',
    readTime: '5 min',
    updatedAt: '2026-05-28',
    title: 'Retraits crypto dans les casinos en ligne : guide 2026',
    titleEn: 'Crypto withdrawals in online casinos: 2026 guide',
    description:
      'Bitcoin, USDT, Ethereum : les retraits crypto sont souvent les plus rapides — mais attention aux frais réseau et aux exigences KYC spécifiques.',
    descriptionEn:
      'Bitcoin, USDT, Ethereum: crypto withdrawals are often the fastest — but watch out for network fees and specific KYC requirements.',
    sections: [
      {
        id: 'avantages',
        heading: 'Pourquoi les retraits crypto sont plus rapides',
        body: [
          'Contrairement aux virements bancaires (2–5 jours ouvrés) ou aux e-wallets (24–48h), les transactions crypto sont traitées directement sur la blockchain — sans intermédiaire bancaire.',
          'En pratique : une fois le retrait approuvé par le casino (généralement sous 1h pour les comptes vérifiés), la transaction est confirmée sur la blockchain en 10–60 minutes selon la crypto choisie.',
        ],
      },
      {
        id: 'cryptos',
        heading: 'Quelle crypto choisir ?',
        body: [
          'Bitcoin (BTC) : le plus universel, délai de confirmation 10–60 min, frais réseau variables (0.50–5 €). Privilégiez les périodes de faible congestion réseau.',
          'USDT (Tether) sur Tron (TRC-20) : stable, frais réseau inférieurs à 1 €, confirmation en 1–3 minutes. Idéal pour les retraits fréquents.',
          'Ethereum (ETH) : délais rapides, mais frais gas variables — peuvent dépasser 10 € lors de pics de congestion. À éviter pour les petits montants.',
        ],
      },
      {
        id: 'kyc',
        heading: 'KYC et crypto : les spécificités',
        body: [
          "Contrairement à l'idée reçue, les casinos sérieux exigent une vérification KYC complète même pour les retraits crypto. Cette vérification est nécessaire une seule fois.",
          "Préparez : pièce d'identité + justificatif de domicile + parfois une preuve de possession du wallet crypto (screenshot de l'interface). La vérification prend généralement 24h.",
        ],
      },
    ],
    faq: [
      {
        question: 'Les gains en crypto doivent-ils être déclarés en France ?',
        answer:
          "Les gains de jeux de hasard ne sont pas imposables en France, qu'ils soient perçus en euros ou en crypto. La conversion de crypto en euros peut en revanche générer une plus-value imposable si la crypto a pris de la valeur depuis l'achat.",
      },
    ],
    showCasinos: false,
  },
]

const postMap = new Map(posts.map((p) => [p.slug, p]))

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const post = postMap.get(slug)
  if (!post) return {}

  const isFr = locale === 'fr'
  return {
    title: isFr ? post.title : post.titleEn,
    description: isFr ? post.description : post.descriptionEn,
    alternates: { languages: buildHreflang(`/blog/${slug}/`) },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = postMap.get(slug)
  if (!post) notFound()

  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: isFr ? (post.title.split(':')[0]?.trim() ?? post.title) : post.titleEn },
        ]}
      />

      <article className="py-10" data-page-type="blog" data-locale={locale}>
        <div className="mx-auto max-w-[820px] px-8 sm:px-[18px]">
          {/* Meta */}
          <div className="mb-5 flex flex-wrap items-center gap-[10px]">
            <span className="rounded-[5px] border border-line bg-bg-sunken px-[9px] py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-green">
              {isFr ? post.category : post.categoryEn}
            </span>
            <time dateTime={post.date} className="font-mono text-[11px] text-ink-3">
              {new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="font-mono text-[11px] text-ink-3">·</span>
            <span className="font-mono text-[11px] text-ink-3">
              {post.readTime} {isFr ? 'de lecture' : 'read'}
            </span>
          </div>

          <h1 className="mb-5 font-serif text-[clamp(28px,4.2vw,44px)] font-medium leading-[1.06] tracking-[-0.02em] text-ink">
            {isFr ? post.title : post.titleEn}
          </h1>

          <p className="mb-8 text-[18px] leading-[1.6] text-ink-2">
            {isFr ? post.description : post.descriptionEn}
          </p>

          {/* Sections */}
          {post.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-8 [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <h2 className="mb-3 font-serif text-[clamp(20px,2.6vw,26px)] font-medium leading-snug tracking-[-0.012em] text-ink">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="mb-[14px] text-[16px] leading-[1.68] text-ink-2">
                  {para}
                </p>
              ))}
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
                : 'Former compliance analyst · tested 200+ casinos'
            }
            lastUpdated={post.updatedAt}
            nextRetest="2026-09-01"
            className="my-8"
          />

          {/* FAQ */}
          {post.faq.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
                {isFr ? 'Questions fréquentes' : 'FAQ'}
              </h2>
              <FAQAccordion items={post.faq} includeSchema />
            </div>
          )}

          {/* Casino CTA block */}
          {post.showCasinos && (
            <div className="rounded-xl border border-line bg-surface-2 p-6">
              <h3 className="mb-4 font-serif text-[20px] font-semibold text-ink">
                {isFr ? 'Casinos recommandés' : 'Recommended casinos'}
              </h3>
              <div className="flex flex-col gap-3">
                {TOP_10.slice(0, 3).map((op, i) => (
                  <ListingCard
                    key={op.id}
                    operator={op}
                    isTop={i === 0}
                    ga4={{ 'data-page-type': 'blog', 'data-locale': locale }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
