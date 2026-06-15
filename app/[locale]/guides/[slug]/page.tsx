import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Guides: re-validate weekly (stable editorial content)
export const revalidate = 604800

import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { ReviewStickyBar } from '@/components/review/review-sticky-bar'
import { LlmButtons } from '@/components/guides/llm-buttons'
import { ReadProgressBar } from '@/components/guides/read-progress-bar'
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
  tldr: string[]
  readTime: number
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
  topic: 'bonus' | 'jeux' | 'paiements' | 'securite' | 'legal'
  iconPath: string
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
    tldr: [
      "Jouer sur un casino étranger n'est pas illégal pour un particulier en France.",
      "Seuls les opérateurs sans licence ANJ sont dans l'illégalité — pas les joueurs.",
      'Vos gains aux jeux de hasard ne sont pas imposables en France.',
    ],
    readTime: 5,
    difficulty: 'Débutant',
    topic: 'legal',
    iconPath: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z',
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
    tldr: [
      "Chaque casino est testé avec de l'argent réel avant notation — pas de note sur dossier.",
      '38 critères répartis en 9 familles : le bonus pèse 20 %, les paiements 18 %.',
      "Un partenariat d'affiliation ne peut jamais modifier notre note — processus séparé.",
    ],
    readTime: 7,
    difficulty: 'Débutant',
    topic: 'securite',
    iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
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
    tldr: [
      'Un RTP de 96 % signifie que le jeu redistribue statistiquement 96 € pour 100 € misés.',
      'Le RTP seul ne suffit pas : combinez-le toujours avec la volatilité du jeu.',
      "Pendant le wager d'un bonus, privilégiez les jeux à basse volatilité (RTP stable).",
    ],
    readTime: 8,
    difficulty: 'Intermédiaire',
    topic: 'jeux',
    iconPath: 'M3 3v18h18M7 16l4-8 4 4 4-6',
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
    tldr: [
      'La méthode la plus rapide : crypto (10 min–2h) mais attention à la volatilité du cours.',
      "Effectuez le KYC dès l'inscription pour que votre premier retrait ne soit pas retardé.",
      "La carte bancaire (VISA/MC) reste la méthode la plus équilibrée : délai 24–96h selon l'opérateur.",
    ],
    readTime: 6,
    difficulty: 'Débutant',
    topic: 'paiements',
    iconPath: 'M2 5h20v14H2zM2 10h20',
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
    tldr: [
      'Un wager de 35× maximum est notre seuil de recommandation — au-delà, le bonus est difficile à convertir.',
      'Ne comparez jamais deux bonus sur le montant seul : calculez le coût statistique réel.',
      'Les 5 clauses pièges : wager, mise max, jeux exclus, délai de validité, plafond de gains.',
    ],
    readTime: 10,
    difficulty: 'Intermédiaire',
    topic: 'bonus',
    iconPath: 'M4 9h16v11H4zM4 13h16M8 9V5a4 4 0 018 0v4',
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
          "Notre seuil de recommandation : 35× maximum. Au-delà de 40×, le bonus est statistiquement difficile à convertir en gains réels. Le wager s'applique différemment selon les opérateurs : sur le bonus uniquement (favorable) ou sur le dépôt + bonus (défavorable).",
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

// ── Inline sub-components ─────────────────────────────────────────────────────

function MetaChip({ iconPath, label }: { iconPath: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-full border border-line bg-bg-sunken px-[12px] py-[5px] font-sans text-[12.5px] font-semibold text-ink-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-[13px] w-[13px] shrink-0 text-green"
        aria-hidden
      >
        <path d={iconPath} />
      </svg>
      {label}
    </span>
  )
}

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
  const topOp = TOP_10[0]!
  const tocItems = guide.sections.map((s) => ({ id: s.id, label: s.title }))
  const guideTitle = isFr ? guide.title : guide.titleEn

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Guides' : 'Guides', href: '/guides/' },
          { label: isFr ? (guide.title.split('—')[0]?.trim() ?? guide.title) : guide.titleEn },
        ]}
      />

      {/* ── Article hero ────────────────────────────────────────────────── */}
      <section className="pb-4 pt-10" data-page-type="article" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          {/* Eyebrow */}
          <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {guide.eyebrow}
          </div>

          {/* H1 */}
          <h1 className="mb-[14px] max-w-[22ch] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {guideTitle}
          </h1>

          {/* Lead */}
          <p className="mb-[18px] max-w-[62ch] text-[17px] leading-[1.6] text-ink-2">
            {guide.description}
          </p>

          {/* Byline */}
          <div className="mb-[16px] flex flex-wrap items-center gap-[12px_18px]">
            <span className="text-[13px] text-ink-3">
              Par <strong className="font-semibold text-ink">Julien Marchand</strong>
              {' · '}
              <time dateTime={guide.updatedAt}>
                Mis à jour le{' '}
                {new Date(guide.updatedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </span>
          </div>

          {/* Art2-meta chips */}
          <div className="mb-[24px] flex flex-wrap gap-[8px]">
            <MetaChip
              iconPath="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v6l3.5 2"
              label={`${guide.readTime} min de lecture`}
            />
            <MetaChip
              iconPath="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
              label="Vérifié & mis à jour"
            />
            <MetaChip
              iconPath="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z"
              label={guide.difficulty}
            />
          </div>

          {/* TL;DR card */}
          <div
            className="mb-[28px] max-w-[860px] rounded-[14px] bg-surface p-[22px_24px_20px] shadow-1"
            style={{ border: '1px solid var(--line)', borderLeft: '4px solid var(--green)' }}
          >
            <div className="mb-[14px] font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-green">
              En bref
            </div>
            <ul className="mb-0 flex list-none flex-col gap-[11px] p-0">
              {guide.tldr.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-[12px] text-[15.5px] leading-[1.5] text-ink"
                >
                  <span className="mt-[1px] shrink-0 font-extrabold text-green" aria-hidden>
                    →
                  </span>
                  <span className="min-w-0 flex-1">{point}</span>
                </li>
              ))}
            </ul>
            <div className="my-[16px] h-px bg-line" />
            <div className="flex flex-wrap items-center gap-[12px_14px]">
              <span className="inline-flex items-center gap-[7px] font-mono text-[12px] font-semibold text-ink-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[14px] w-[14px] text-green"
                  aria-hidden
                >
                  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
                </svg>
                Résumer avec
              </span>
              <LlmButtons title={guideTitle} />
            </div>
          </div>

          {/* Art2-summary — inline numbered TOC */}
          <nav
            className="mb-0 max-w-[860px] rounded-[14px] border border-line bg-bg-sunken p-[18px_22px_20px]"
            aria-label="Sommaire de l'article"
          >
            <div className="mb-[12px] flex items-center gap-[8px] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[14px] w-[14px]"
                aria-hidden
              >
                <path d="M4 6h16M4 12h10M4 18h6" />
              </svg>
              Au sommaire — cliquez pour naviguer
            </div>
            <ol className="grid list-none grid-cols-1 gap-[6px_16px] p-0 sm:grid-cols-2">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-start gap-[11px] rounded-[9px] px-[10px] py-[8px] text-[14px] font-semibold text-ink-2 no-underline transition-[background,color] duration-[140ms] hover:bg-surface hover:text-green"
                  >
                    <span
                      className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-[6px] border border-line bg-surface font-mono text-[11px] font-semibold text-green"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1 pt-[2px]">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Sticky sentinel — triggers sticky bar */}
      <div data-sticky-sentinel aria-hidden />

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-site px-[18px] md:px-8">
        <div className="grid grid-cols-1 items-start gap-10 pb-16 pt-10 lg:grid-cols-[240px_1fr]">
          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="sticky top-[calc(var(--header-h)+18px)] hidden flex-col gap-6 lg:flex">
            <TableOfContents items={tocItems} />
            <ReadProgressBar />

            {/* Sidebar CTA card */}
            <div
              className="overflow-hidden rounded-[14px] bg-surface p-[16px] text-center shadow-2"
              style={{
                border: '1px solid color-mix(in srgb,var(--green) 28%,var(--line))',
              }}
            >
              {/* Logo placeholder */}
              <div
                className="mx-auto mb-[10px] h-[32px] w-[90px] rounded border border-dashed border-line-2"
                style={{
                  background:
                    'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 4px,transparent 4px,transparent 8px)',
                }}
                aria-hidden
              />
              {/* Amount */}
              <div className="font-serif text-[19px] font-semibold leading-[1.1] text-ink">
                <span style={{ color: 'var(--green)' }}>{topOp.bonusAmount}</span>
                {topOp.bonusSuffix && (
                  <span className="text-[14px] text-ink-2"> {topOp.bonusSuffix}</span>
                )}
              </div>
              {/* Conditions */}
              <p className="mb-[11px] mt-[3px] text-[10.5px] leading-[1.4] text-ink-3">
                {topOp.bonusConditions} · notre n°1 ({topOp.rating}/10)
              </p>
              <CTAButton
                href={topOp.affiliateUrl}
                variant="primary"
                size="sm"
                arrow
                block
                target="_blank"
                rel="noopener noreferrer nofollow"
                data-event="affiliate_click"
                data-operator={topOp.slug}
                data-placement="article_sidebar"
                data-bonus={topOp.bonusSlug}
                data-page-type="article"
                data-locale={locale}
              >
                Obtenir le bonus
              </CTAButton>
              <p className="mt-[8px] text-[9.5px] text-ink-3">18+ · T&amp;C s&apos;appliquent</p>
            </div>
          </aside>

          {/* ── Main prose ───────────────────────────────────────────────── */}
          <main className="min-w-0" id="article-body">
            {/* Sections */}
            {guide.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-10 [scroll-margin-top:calc(var(--header-h)+20px)]"
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
              <div id="faq" className="mb-10 [scroll-margin-top:calc(var(--header-h)+20px)]">
                <h2 className="mb-4 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
                  {isFr ? 'Questions fréquentes' : 'FAQ'}
                </h2>
                <FAQAccordion items={guide.faq} includeSchema />
              </div>
            )}

            {/* Art2-band — internal-link section */}
            <div className="mb-10 overflow-hidden rounded-[14px] border border-line bg-bg-sunken">
              <div className="border-b border-line px-[20px] py-[13px]">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  À lire aussi
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {[
                  {
                    href: '/casinos/',
                    label: 'Top 10 des meilleurs casinos',
                    sub: 'Comparatif mis à jour',
                    iconPath: 'M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z',
                  },
                  {
                    href: '/bonus/',
                    label: 'Comparer les bonus casino',
                    sub: 'Wager, montant, délai',
                    iconPath: 'M4 9h16v11H4zM8 9V5a4 4 0 018 0v4',
                  },
                  {
                    href: `/casinos/${topOp.slug}/`,
                    label: `Avis ${topOp.name}`,
                    sub: `Notre n°1 · ${topOp.rating}/10`,
                    iconPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
                  },
                  {
                    href: '/jeux/machines-a-sous/',
                    label: 'Guide machines à sous',
                    sub: 'RTP, volatilité, stratégie',
                    iconPath: 'M3 3v18h18M7 16l4-8 4 4 4-6',
                  },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-[13px] border-b border-r-0 border-line p-[14px_18px] text-ink no-underline transition-[background] last:border-b-0 hover:bg-surface sm:[&:nth-child(2)]:border-b sm:[&:nth-child(2)]:border-r sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
                    data-event="internal_link"
                    data-placement="article_band"
                    data-page-type="article"
                    data-locale={locale}
                  >
                    <div className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[9px] border border-line bg-surface">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-[17px] w-[17px] text-green"
                        aria-hidden
                      >
                        <path d={link.iconPath} />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold leading-[1.2] text-ink">
                        {link.label}
                      </div>
                      <div className="text-[12px] text-ink-3">{link.sub}</div>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-[16px] w-[16px] shrink-0 text-ink-3"
                      aria-hidden
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Art2-fork — conversion bifurcation */}
            <div className="mb-2 grid grid-cols-1 gap-0 overflow-hidden rounded-[16px] border border-line sm:grid-cols-2">
              {/* Left: play CTA (dark) */}
              <div
                className="flex flex-col justify-between p-[22px_24px_20px]"
                style={{ background: 'var(--ink)', color: 'var(--surface)' }}
              >
                <div className="mb-[14px]">
                  <div
                    className="mb-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: 'color-mix(in srgb,#fff 55%,transparent)' }}
                  >
                    Prêt à jouer ?
                  </div>
                  <div className="font-serif text-[22px] font-semibold leading-[1.1]">
                    {topOp.name}
                  </div>
                  <div
                    className="mt-[4px] font-serif text-[17px]"
                    style={{ color: 'var(--green)' }}
                  >
                    {topOp.bonusAmount}
                    {topOp.bonusSuffix && (
                      <span className="text-[13px] text-white opacity-70">
                        {' '}
                        {topOp.bonusSuffix}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-[6px] text-[12px] leading-[1.5]"
                    style={{ color: 'color-mix(in srgb,#fff 55%,transparent)' }}
                  >
                    {topOp.bonusConditions}
                  </p>
                </div>
                <CTAButton
                  href={topOp.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  block
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={topOp.slug}
                  data-placement="article_fork_cta"
                  data-bonus={topOp.bonusSlug}
                  data-page-type="article"
                  data-locale={locale}
                >
                  Obtenir le bonus {topOp.name}
                </CTAButton>
                <p
                  className="mt-[8px] text-center text-[10px]"
                  style={{ color: 'color-mix(in srgb,#fff 40%,transparent)' }}
                >
                  18+ · T&amp;C s&apos;appliquent · Jouer de façon responsable
                </p>
              </div>

              {/* Right: compare CTA (light) */}
              <div className="flex flex-col justify-between border-t border-line p-[22px_24px_20px] sm:border-l sm:border-t-0">
                <div className="mb-[14px]">
                  <div className="mb-[6px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                    Vous hésitez encore ?
                  </div>
                  <div className="font-serif text-[22px] font-semibold leading-[1.1] text-ink">
                    Comparer les casinos
                  </div>
                  <p className="mt-[6px] text-[14px] leading-[1.5] text-ink-2">
                    Notre comparatif indépendant — 15 casinos testés à l&apos;argent réel, notes
                    vérifiées tous les 90 jours.
                  </p>
                </div>
                <CTAButton
                  href="/casinos/"
                  variant="secondary"
                  size="sm"
                  arrow
                  block
                  data-event="internal_link"
                  data-placement="article_fork_compare"
                  data-page-type="article"
                  data-locale={locale}
                >
                  Voir le comparatif →
                </CTAButton>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Sticky bonus bar ─────────────────────────────────────────────── */}
      <ReviewStickyBar
        operatorName={topOp.name}
        operatorSlug={topOp.slug}
        rating={topOp.rating}
        bonusAmount={topOp.bonusAmount}
        bonusSuffix={topOp.bonusSuffix}
        bonusConditions={topOp.bonusConditions}
        bonusSlug={topOp.bonusSlug}
        affiliateUrl={topOp.affiliateUrl}
        locale={locale}
        pageType="article"
        placement="article_sticky_bar"
        showAlt={false}
      />
    </>
  )
}
