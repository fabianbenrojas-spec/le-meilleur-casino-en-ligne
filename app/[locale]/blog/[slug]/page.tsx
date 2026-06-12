import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Blog articles: re-validate every 24h
export const revalidate = 86400

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { LogoOrPlaceholder } from '@/components/ui/operator-card'
import { ReadProgress } from '@/components/ui/read-progress'
import { TableOfContents, type TOCItem } from '@/components/ui/table-of-contents'
import { TOP_10, operatorBySlug } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

// ── Data types ──────────────────────────────────────────────────────────────────

interface TakeawayBlock {
  type: 'takeaways'
  items: string[]
}
interface PullquoteBlock {
  type: 'pullquote'
  text: string
}
interface NoteBlock {
  type: 'note'
  warning?: boolean
  body: string
}
interface InlineCTABlock {
  type: 'inline-cta'
  operatorSlug: string
}

type ProseBlock = TakeawayBlock | PullquoteBlock | NoteBlock | InlineCTABlock

interface BlogSection {
  id: string
  heading: string
  body: string[]
  blocks?: ProseBlock[]
}

interface BlogPost {
  slug: string
  category: string
  categoryEn: string
  date: string
  readTime: string
  readTimeEn?: string
  updatedAt: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  sections: BlogSection[]
  faq: { question: string; answer: string }[]
  showCasinos: boolean
  relatedSlugs?: string[]
}

// ── Post content ────────────────────────────────────────────────────────────────

const posts: BlogPost[] = [
  {
    slug: 'anj-2026',
    category: 'Législation',
    categoryEn: 'Regulation',
    date: '2026-06-07',
    readTime: '8 min',
    readTimeEn: '8 min',
    updatedAt: '2026-06-07',
    title: "Casino en ligne en France : ce qui change avec l'ANJ en 2026",
    titleEn: 'Online Casino in France: what changes with ANJ in 2026',
    description:
      "Entre régulation des paris, débat sur la légalisation des casinos en ligne et renforcement de la lutte contre l'addiction, 2026 est une année charnière. On fait le point, sans jargon.",
    descriptionEn:
      'Between sports betting regulation, the debate on legalising online casinos, and stronger addiction prevention, 2026 is a turning point. We break it down, jargon-free.',
    sections: [
      {
        id: 'contexte',
        heading: 'Le contexte légal en France',
        body: [
          "Contrairement à une idée reçue, les casinos en ligne ne sont pas régulés en France. Depuis la loi de 2010, seuls trois types de jeux d'argent en ligne sont autorisés et encadrés : les paris sportifs, les paris hippiques et le poker. Les machines à sous, la roulette et le blackjack en ligne restent en dehors du cadre légal national.",
          "Concrètement, cela ne signifie pas que jouer soit illégal pour le joueur, mais que les opérateurs ne peuvent pas obtenir d'agrément français. Ils opèrent donc sous des licences étrangères (Curaçao, Malte, Gibraltar) et acceptent les joueurs français depuis l'étranger.",
        ],
        blocks: [
          {
            type: 'takeaways',
            items: [
              "Les casinos en ligne ne sont pas agréés par l'État français",
              'Les opérateurs utilisent des licences européennes ou internationales',
              "La responsabilité du choix d'un opérateur fiable revient au joueur",
            ],
          },
        ],
      },
      {
        id: 'anj',
        heading: "Le rôle de l'ANJ",
        body: [
          "L'Autorité Nationale des Jeux (ANJ) a remplacé l'ARJEL en 2020. Elle régule l'ensemble du secteur des jeux d'argent autorisés : agrément des opérateurs de paris et de poker, contrôle de la publicité, et surtout protection des joueurs vulnérables et des mineurs.",
          "L'ANJ approuve chaque année les plans de lutte contre le jeu excessif des opérateurs agréés, et peut sanctionner les manquements. Elle gère également le dispositif d'interdiction volontaire de jeu, accessible à tout joueur souhaitant s'auto-exclure.",
        ],
        blocks: [
          {
            type: 'pullquote',
            text: '« La régulation française vise un équilibre : permettre une offre de jeu encadrée tout en protégeant les publics les plus fragiles. »',
          },
        ],
      },
      {
        id: 'changements',
        heading: 'Ce qui change en 2026',
        body: [
          "Plusieurs évolutions marquent cette année. Le débat sur la légalisation des casinos en ligne refait surface, porté par des arguments fiscaux et de protection des consommateurs — aucune loi n'a toutefois été votée. Le renforcement des contrôles publicitaires durcit les règles sur les réseaux sociaux. L'amélioration des outils de jeu responsable renforce la modération et les limites de dépôt.",
        ],
        blocks: [
          {
            type: 'note',
            body: 'Notre position. Nous suivons ces évolutions de près et mettons à jour nos guides à chaque changement réglementaire. Cet article a été revu pour la dernière fois le 7 juin 2026.',
          },
        ],
      },
      {
        id: 'risques',
        heading: 'Les risques pour les joueurs',
        body: [
          "Jouer sur un casino non régulé en France comporte des risques réels : recours limité en cas de litige (vos recours dépendent de la juridiction de la licence), risque d'addiction (les outils de protection varient d'un opérateur à l'autre), et opérateurs peu fiables pratiquant des conditions abusives ou des retraits bloqués.",
        ],
        blocks: [
          {
            type: 'inline-cta',
            operatorSlug: 'cresus',
          },
        ],
      },
      {
        id: 'conseils',
        heading: 'Nos conseils pratiques',
        body: [
          "Si vous décidez de jouer : vérifiez la licence de l'opérateur et son ancienneté avant de déposer. Lisez les conditions de bonus — le wager est le piège le plus courant. Fixez-vous des limites de dépôt et de temps dès l'inscription. Ne jouez jamais de l'argent dont vous avez besoin.",
        ],
        blocks: [
          {
            type: 'note',
            warning: true,
            body: 'Le jeu doit rester un plaisir. Si vous ressentez une perte de contrôle, contactez gratuitement Joueurs Info Service au 09 74 75 13 13 ou consultez notre page jeu responsable.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Est-il illégal de jouer au casino en ligne en France ?',
        answer:
          "La loi vise les opérateurs, pas les joueurs : il n'existe pas de sanction pénale pour un particulier qui joue. Cela dit, en l'absence de régulation française, vos protections et recours sont ceux de la licence étrangère de l'opérateur.",
      },
      {
        question: 'Les casinos en ligne vont-ils être légalisés en France ?',
        answer:
          "Le débat existe en 2026, porté par des considérations fiscales et de protection des joueurs, mais aucune loi n'a été adoptée. Nous mettrons cet article à jour dès qu'une évolution concrète aura lieu.",
      },
      {
        question: 'Comment reconnaître un casino fiable ?',
        answer:
          "Vérifiez la licence, l'ancienneté, les avis vérifiés, la clarté des conditions de bonus et la rapidité des retraits. C'est précisément ce que nous testons pour chaque casino que nous notons.",
      },
    ],
    showCasinos: false,
    relatedSlugs: ['wager-pieges', 'retraits-crypto'],
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
        heading: '4. Le wager sur dépôt + bonus',
        body: [
          "Attention à la formulation : certains casinos appliquent le wager sur le dépôt + le bonus, d'autres uniquement sur le montant du bonus. La différence est massive.",
          "Exemple : bonus 100 € avec wager 35× — si c'est 35× (dépôt + bonus), vous devez miser 7 000 €. Si c'est 35× bonus seulement, vous devez miser 3 500 €.",
        ],
      },
      {
        id: 'piege-5',
        heading: '5. Le plafond de retrait',
        body: [
          'Certains casinos plafonnent les gains issus du bonus à un multiple du bonus (ex. 5× = 500 € maximum si vous aviez reçu 100 €). Même si vous avez gagné 5 000 €, vous ne pourrez retirer que 500 €.',
          "Cherchez cette clause dans la section 'bonus terms' — souvent formulée 'maximum cashout from bonus'.",
        ],
        blocks: [
          {
            type: 'takeaways',
            items: [
              'Mise max par tour : 5 € pendant le wager',
              'Roulette/blackjack/live souvent exclus ou comptent à 10–20%',
              'Délai de validité : généralement 30 jours',
              'Wager sur dépôt + bonus = coût double',
            ],
          },
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
    relatedSlugs: ['anj-2026', 'retraits-crypto'],
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
          'Bitcoin (BTC) : le plus universel, délai de confirmation 10–60 min, frais réseau variables (0,50–5 €). Privilégiez les périodes de faible congestion réseau.',
          'USDT (Tether) sur Tron (TRC-20) : stable, frais réseau inférieurs à 1 €, confirmation en 1–3 minutes. Idéal pour les retraits fréquents.',
          'Ethereum (ETH) : délais rapides, mais frais gas variables — peuvent dépasser 10 € lors de pics. À éviter pour les petits montants.',
        ],
      },
      {
        id: 'kyc',
        heading: 'KYC et crypto : les spécificités',
        body: [
          "Contrairement à l'idée reçue, les casinos sérieux exigent une vérification KYC complète même pour les retraits crypto. Cette vérification est nécessaire une seule fois.",
          "Préparez : pièce d'identité + justificatif de domicile + parfois une preuve de possession du wallet crypto. La vérification prend généralement 24h.",
        ],
        blocks: [
          {
            type: 'note',
            body: "Les gains de jeux de hasard ne sont pas imposables en France. La conversion de crypto en euros peut générer une plus-value imposable si la crypto a pris de la valeur depuis l'achat.",
          },
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
    relatedSlugs: ['wager-pieges', 'anj-2026'],
  },
]

const postMap = new Map(posts.map((p) => [p.slug, p]))

// ── Static params & metadata ────────────────────────────────────────────────────

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

// ── Prose block renderer ────────────────────────────────────────────────────────

function ProseBlocks({ blocks, isFr }: { blocks: ProseBlock[]; isFr: boolean }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'takeaways') {
          return (
            <div
              key={i}
              className="my-7 rounded-lg border border-[color-mix(in_srgb,var(--green)_24%,var(--line))] bg-green-50 px-6 py-[22px]"
            >
              <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-green-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-[15px] w-[15px] shrink-0"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {isFr ? 'À retenir' : 'Key takeaways'}
              </h4>
              <ul className="m-0 list-none p-0 text-[15.5px] leading-[1.7]">
                {block.items.map((item, j) => (
                  <li key={j} className="mb-[9px] flex items-start gap-3">
                    <span
                      className="mt-[11px] h-[7px] w-[7px] shrink-0 rounded-full bg-green"
                      aria-hidden
                    />
                    <span className="text-ink-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        if (block.type === 'pullquote') {
          return (
            <blockquote
              key={i}
              className="my-7 border-l-[3px] border-l-[var(--gold)] py-[6px] pl-6 font-serif text-[24px] italic leading-[1.4] text-ink"
            >
              {block.text}
            </blockquote>
          )
        }

        if (block.type === 'note') {
          return (
            <div
              key={i}
              className={`my-6 flex gap-[13px] rounded-[var(--radius)] border p-[16px_18px] text-[14.5px] leading-[1.55] text-ink-2 ${
                block.warning ? 'border-red bg-[var(--red-50)]' : 'border-line bg-surface-2'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] font-extrabold text-white ${
                  block.warning ? 'bg-red' : 'bg-[var(--gold)]'
                }`}
              >
                {block.warning ? '!' : 'i'}
              </span>
              <span dangerouslySetInnerHTML={{ __html: block.body }} />
            </div>
          )
        }

        if (block.type === 'inline-cta') {
          const op = operatorBySlug.get(block.operatorSlug) ?? TOP_10[0]
          if (!op) return null
          return (
            <div
              key={i}
              className="my-7 flex items-center gap-[18px] rounded-lg border border-l-[4px] border-line border-l-green bg-surface p-[18px_20px] shadow-1"
            >
              <div className="w-[92px] shrink-0">
                <LogoOrPlaceholder
                  logoUrl={op.logoUrl}
                  name={op.shortName ?? op.name}
                  width={92}
                  height={38}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[15px] font-bold text-ink">
                  {isFr
                    ? `Notre casino le mieux noté : ${op.name} (${op.rating}/10)`
                    : `Our top-rated casino: ${op.name} (${op.rating}/10)`}
                </p>
                <p className="m-0 text-[13px] text-ink-2">
                  {isFr
                    ? `Licence vérifiée, retraits testés · Bonus `
                    : `Verified licence, tested withdrawals · Bonus `}
                  <strong className="text-green">
                    {op.bonusAmount}
                    {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                  </strong>
                </p>
              </div>
              <CTAButton
                href={`/casinos/${op.slug}/`}
                variant="secondary"
                size="sm"
                data-event="review_click"
                data-operator={op.slug}
                data-placement="article_inline"
              >
                {isFr ? "Lire l'avis" : 'Read review'}
              </CTAButton>
            </div>
          )
        }

        return null
      })}
    </>
  )
}

// ── Related articles ────────────────────────────────────────────────────────────

function RelatedArticles({ relatedSlugs, isFr }: { relatedSlugs: string[]; isFr: boolean }) {
  const related = relatedSlugs.map((s) => postMap.get(s)).filter((p): p is BlogPost => !!p)

  if (related.length === 0) return null

  return (
    <section className="border-t border-line bg-bg-sunken py-[50px]">
      <div className="mx-auto max-w-site px-8 sm:px-[18px]">
        <h2 className="mb-6 font-serif text-[28px] font-medium tracking-[-0.015em] text-ink">
          {isFr ? 'À lire aussi' : 'Related articles'}
        </h2>
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-1">
          {related.map((p) => (
            <a
              key={p.slug}
              href={`${isFr ? '' : '/en'}/blog/${p.slug}/`}
              className="overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
              data-event="blog_click"
            >
              <div className="aspect-[16/9] border-b border-line bg-[repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken)_9px,var(--surface-2)_9px,var(--surface-2)_18px)]" />
              <div className="p-[16px_18px_20px]">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-3">
                  {isFr ? p.category : p.categoryEn}
                  {' · '}
                  {new Date(p.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <h3 className="m-0 font-serif text-[18px] font-semibold leading-[1.25] text-ink">
                  {isFr ? p.title : p.titleEn}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = postMap.get(slug)
  if (!post) notFound()

  const isFr = locale === 'fr'
  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isFr ? post.title : post.titleEn,
    description: isFr ? post.description : post.descriptionEn,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: 'Julien Marchand' },
    publisher: {
      '@type': 'Organization',
      name: 'le-meilleur-casino-en-ligne.fr',
      url: BASE_URL,
    },
    url: `${BASE_URL}${isFr ? '' : '/en'}/blog/${post.slug}/`,
  }

  const schemaFAQ =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
          })),
        }
      : null

  const tocItems: TOCItem[] = [
    ...post.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(post.faq.length > 0 ? [{ id: 'faq', label: isFr ? 'Questions fréquentes' : 'FAQ' }] : []),
  ]

  const pubDate = new Date(post.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

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
          {
            label: isFr ? 'Guides' : 'Guides',
            href: isFr ? '/blog/' : '/en/blog/',
          },
          { label: isFr ? post.category : post.categoryEn },
          {
            label:
              (isFr ? post.title : post.titleEn).split(':')[0]?.trim() ??
              (isFr ? post.title : post.titleEn),
          },
        ]}
        locale={locale}
      />

      <article data-page-type="article" data-locale={locale}>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="pb-2 pt-10">
          <div className="mx-auto max-w-[860px] px-8 sm:px-[18px]">
            {/* Category badge */}
            <div className="mb-[18px] flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.12em] text-green">
              <span className="h-px w-[22px] bg-[var(--gold)]" aria-hidden />
              {isFr ? post.category : post.categoryEn}
            </div>

            {/* H1 */}
            <h1 className="mb-5 font-serif text-[clamp(32px,5vw,54px)] font-medium leading-[1.05] tracking-[-0.022em] text-ink">
              {isFr ? post.title : post.titleEn}
            </h1>

            {/* Lead */}
            <p className="mb-[26px] font-serif text-[21px] font-normal leading-[1.55] text-ink-2">
              {isFr ? post.description : post.descriptionEn}
            </p>

            {/* Byline */}
            <div className="flex items-center gap-[14px] border-b border-t border-line py-4">
              {/* Avatar */}
              <div
                className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border border-line bg-[repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken)_5px,var(--surface-2)_5px,var(--surface-2)_10px)] font-mono text-[7px] text-ink-3"
                aria-hidden
              >
                JM
              </div>
              <div>
                <p className="m-0 text-[14.5px] font-bold text-ink">Julien Marchand</p>
                <p className="m-0 text-[12.5px] text-ink-3">
                  {isFr ? 'Rédacteur en chef' : 'Editor-in-chief'} ·{' '}
                  {isFr ? `Publié le ${pubDate}` : `Published ${pubDate}`} · {post.readTime}{' '}
                  {isFr ? 'de lecture' : 'read'}
                </p>
              </div>

              {/* Share/copy buttons */}
              <div className="ml-auto flex gap-2">
                <button
                  className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-line bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                  aria-label={isFr ? 'Partager' : 'Share'}
                  data-event="share_click"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                  </svg>
                </button>
                <button
                  className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-line bg-surface text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                  aria-label={isFr ? 'Copier le lien' : 'Copy link'}
                  data-event="copy_link"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Cover image */}
          <figure className="mx-auto mt-7 max-w-[860px] px-8 sm:px-[18px]">
            <div className="grid aspect-[16/8] place-items-center rounded-[var(--radius-lg)] border border-line bg-[repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken)_11px,var(--surface-2)_11px,var(--surface-2)_22px)]">
              <span className="rounded-[5px] border border-line bg-surface px-[10px] py-1 font-mono text-[12px] text-ink-3">
                {isFr
                  ? `illustration · 16:8 · ${post.category}`
                  : `illustration · 16:8 · ${post.categoryEn}`}
              </span>
            </div>
            <figcaption className="mt-2 text-center text-[12.5px] text-ink-3">
              {isFr
                ? `Illustration : ${isFr ? post.category : post.categoryEn} — le-meilleur-casino-en-ligne.fr`
                : `Illustration: ${post.categoryEn} — le-meilleur-casino-en-ligne.fr`}
            </figcaption>
          </figure>
        </section>

        <AffiliateDisclosure variant="strip" locale={locale} />

        {/* ── BODY GRID ─────────────────────────────────────────────────── */}
        <div className="mx-auto grid max-w-[1120px] grid-cols-[240px_1fr] items-start gap-12 px-8 py-10 sm:grid-cols-1 sm:gap-0 sm:px-[18px] sm:py-6">
          {/* Sidebar */}
          <aside className="sticky top-[calc(var(--header-h,64px)+18px)] sm:static sm:mb-6">
            <TableOfContents
              items={tocItems}
              title={isFr ? 'Dans cet article' : 'In this article'}
              locale={locale}
            />
            <ReadProgress />
          </aside>

          {/* Prose */}
          <div className="min-w-0 max-w-[720px]">
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="[scroll-margin-top:calc(var(--header-h,64px)+20px)]"
              >
                <h2 className="mb-[14px] mt-[38px] font-serif text-[30px] font-medium leading-[1.12] tracking-[-0.018em] text-ink first:mt-0">
                  {section.heading}
                </h2>

                {section.body.map((para, i) => (
                  <p key={i} className="mb-[18px] text-[17.5px] leading-[1.72] text-ink-2">
                    {para}
                  </p>
                ))}

                {section.blocks && <ProseBlocks blocks={section.blocks} isFr={isFr} />}
              </section>
            ))}

            {/* FAQ */}
            {post.faq.length > 0 && (
              <section
                id="faq"
                className="mt-10 [scroll-margin-top:calc(var(--header-h,64px)+20px)]"
              >
                <h2 className="mb-4 font-serif text-[30px] font-medium tracking-[-0.018em] text-ink">
                  {isFr ? 'Questions fréquentes' : 'FAQ'}
                </h2>
                <FAQAccordion items={post.faq} includeSchema />
              </section>
            )}

            {/* Casino CTA block */}
            {post.showCasinos && (
              <div className="mt-10 rounded-xl border border-line bg-surface-2 p-6">
                <h3 className="mb-4 font-serif text-[20px] font-semibold text-ink">
                  {isFr ? 'Casinos recommandés' : 'Recommended casinos'}
                </h3>
                <div className="flex flex-col gap-3">
                  {TOP_10.slice(0, 3).map((op, i) => (
                    <div
                      key={op.id}
                      className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4"
                    >
                      <span className="font-mono text-[13px] font-semibold text-ink-3">
                        {i + 1}
                      </span>
                      <LogoOrPlaceholder
                        logoUrl={op.logoUrl}
                        name={op.shortName ?? op.name}
                        width={80}
                        height={30}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[14px] font-semibold text-ink">{op.name}</p>
                        <p className="m-0 text-[13px] text-ink-2">
                          <strong className="text-green">{op.bonusAmount}</strong>
                          {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                        </p>
                      </div>
                      <CTAButton
                        href={op.affiliateUrl}
                        variant="primary"
                        size="sm"
                        arrow
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        data-event="affiliate_click"
                        data-operator={op.slug}
                        data-placement="article_casino_block"
                        data-bonus={op.bonusSlug}
                        data-page-type="article"
                        data-locale={locale}
                      >
                        {isFr ? 'Bonus' : 'Bonus'}
                      </CTAButton>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ── RELATED ARTICLES ──────────────────────────────────────────── */}
      {post.relatedSlugs && <RelatedArticles relatedSlugs={post.relatedSlugs} isFr={isFr} />}
    </>
  )
}
