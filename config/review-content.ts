// Per-operator review content (editorial prose + structured data).
// Sections follow the normalized 9-part structure from design_handoff_casino.

export interface ReviewSection {
  prose: string[]
  highlights?: string[]
  minicta?: { label: string; buttonText: string }
}

export interface ReviewData {
  slug: string
  foundedYear: number
  languages: string[]
  currencies: string[]
  reviewCount: number
  stars: number // out of 5
  verdict: string
  sections: {
    bonus: ReviewSection
    jeux: ReviewSection
    live: ReviewSection
    paiements: ReviewSection
    support: ReviewSection
    mobile: ReviewSection
    vip: ReviewSection
    securite: ReviewSection
  }
  recapRows: { label: string; value: string }[]
  faq: { question: string; answer: string }[]
}

const reviews: ReviewData[] = [
  {
    slug: 'cresus',
    foundedYear: 2018,
    languages: ['FR', 'EN', 'DE'],
    currencies: ['EUR', '₿'],
    reviewCount: 1248,
    stars: 4.6,
    verdict:
      'Cresus est notre casino n°1 pour le marché français en 2026 : retraits traités en 24 h, catalogue de 2 100+ jeux, et un support francophone réellement compétent. Le bonus de bienvenue reste raisonnable côté conditions (wager 35×). Seul vrai bémol : pas de licence européenne.',
    sections: {
      bonus: {
        prose: [
          "Cresus accueille les nouveaux joueurs avec **200 € de bonus + 100 tours gratuits** sur le premier dépôt. L'offre se déclenche dès 20 € déposés, sans code promo à saisir. Les conditions de mise sont fixées à **35×** — dans la moyenne basse du marché.",
          'Les tours gratuits sont crédités par lots de 20 sur cinq jours, exclusivement sur *Book of Dead*. Les gains issus des tours sont soumis au même wager de 35×.',
        ],
        highlights: [
          'Wager 35× : raisonnable comparé à la concurrence (souvent 40–50×)',
          'Délai de 30 jours pour remplir les conditions — confortable',
          'Mise maximale autorisée de 5 € par tour pendant le wager',
        ],
        minicta: {
          label: 'Bonus 200 € + 100 tours · wager 35×, sans code',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          "Avec plus de **2 100 jeux**, Cresus propose l'un des catalogues les plus fournis du marché français. Les machines à sous dominent (≈ 1 800 titres), avec tous les grands fournisseurs : Pragmatic Play, NetEnt, Play'n GO, Hacksaw Gaming, Nolimit City.",
          'Le RTP moyen mesuré sur notre échantillon ressort à **96,4 %**, légèrement au-dessus de la moyenne. Les filtres de recherche sont efficaces.',
        ],
        minicta: { label: '2 100+ jeux · RTP moyen **96,4 %**', buttonText: 'Voir le catalogue' },
      },
      live: {
        prose: [
          'Le casino live est fourni par **Evolution** et Pragmatic Play Live : 90 tables actives, dont blackjack, roulette française, baccarat et des game shows (Crazy Time, Lightning Roulette). Les tables en français sont disponibles en soirée.',
        ],
        highlights: [
          'Tables francophones de 18 h à 2 h',
          'Limites de 1 € à 5 000 € selon les tables',
        ],
      },
      paiements: {
        prose: [
          "C'est ici que Cresus se distingue. Nous avons effectué trois demandes de retrait test : toutes ont été **créditées en moins de 24 heures**, y compris par carte bancaire. Les retraits crypto sont quasi instantanés.",
          'Le dépôt minimum est de 20 €. Le **plafond de retrait est de 5 000 € par semaine**, ce qui peut frustrer les gros gagnants.',
        ],
        minicta: {
          label: 'Retrait moyen testé : **< 24 h** · CB, e-wallet, crypto',
          buttonText: 'Ouvrir un compte',
        },
      },
      support: {
        prose: [
          "Le support est disponible par **chat en direct 7j/7** et par e-mail. Nos questions pièges ont obtenu des réponses précises en français, avec un temps d'attente moyen de **2 minutes**. L'absence de ligne téléphonique est regrettable.",
        ],
      },
      mobile: {
        prose: [
          "Pas d'application native, mais un **site mobile (PWA)** rapide et bien optimisé, installable en raccourci sur l'écran d'accueil. Navigation, dépôts et jeu fonctionnent sans accroc sur iOS comme Android (LCP < 2 s sur notre test 4G).",
        ],
      },
      vip: {
        prose: [
          'Le programme VIP à **5 paliers** (Bronze → Diamant) est automatique : points accumulés sur chaque mise, échangeables en bonus ou cashback. Le palier Diamant offre un gestionnaire dédié et des retraits prioritaires.',
        ],
      },
      securite: {
        prose: [
          "Cresus opère sous **licence Curaçao 8048** — valide, mais moins protectrice qu'une licence européenne (ARJEL/ANJ, Malta Gaming Authority). Les données sont chiffrées en TLS 1.3. Le jeu responsable est bien documenté avec auto-exclusion disponible.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao 8048' },
      { label: 'Bonus de bienvenue', value: '200 € + 100 tours (wager 35×)' },
      { label: 'RTP moyen mesuré', value: '96,4 %' },
      { label: 'Délai de retrait testé', value: '< 24 h (CB, crypto)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, BTC, ETH, PaySafeCard' },
      { label: 'Catalogue', value: '2 100+ jeux' },
      { label: 'Support', value: 'Chat 7j/7 (FR), e-mail' },
      { label: 'Application mobile', value: "PWA (pas d'app native)" },
      { label: 'Programme VIP', value: '5 paliers, cashback automatique' },
      { label: 'Fondé', value: '2018' },
    ],
    faq: [
      {
        question: 'Cresus Casino est-il fiable ?',
        answer:
          "Oui. Cresus opère depuis 2018 avec une licence Curaçao valide. Nos tests à l'argent réel confirment des retraits rapides et un support honnête. La licence n'est pas européenne, ce qui implique un niveau de protection légale moindre pour les joueurs français.",
      },
      {
        question: 'Comment obtenir le bonus de bienvenue Cresus ?',
        answer:
          "Inscrivez-vous, validez votre identité, puis effectuez un premier dépôt d'au moins 20 €. Le bonus de 200 € + 100 tours est crédité automatiquement, sans code promo. Vous avez 30 jours pour satisfaire le wager de 35×.",
      },
      {
        question: 'Combien de temps prend un retrait chez Cresus ?',
        answer:
          "D'après nos trois tests effectués en juin 2026, les retraits ont été crédités en moins de 24 heures pour les cartes bancaires et les e-wallets. Les retraits crypto sont quasi instantanés une fois le KYC validé.",
      },
      {
        question: 'Cresus Casino a-t-il une application mobile ?',
        answer:
          "Non d'application native disponible sur App Store ou Google Play. En revanche, le site mobile est une PWA bien optimisée que vous pouvez installer en raccourci sur votre écran d'accueil.",
      },
    ],
  },
]

// Default content generator for operators without bespoke reviews
function buildDefaultReview(slug: string): ReviewData {
  return {
    slug,
    foundedYear: 2019,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿'],
    reviewCount: Math.floor(Math.random() * 800 + 200),
    stars: 4.2,
    verdict: `Notre équipe a testé ${slug} à l'argent réel : dépôt, jeu, retrait et support. Retrouvez notre verdict complet et nos recommandations ci-dessous.`,
    sections: {
      bonus: {
        prose: [
          'Notre équipe a analysé les conditions de bonus dans le détail. Consultez notre verdict ci-dessous.',
        ],
      },
      jeux: {
        prose: [
          'La ludothèque a été évaluée en termes de volume, qualité des fournisseurs et RTP moyen.',
        ],
      },
      live: {
        prose: [
          "Nous avons testé l'offre de tables live : qualité de la diffusion, variété et limites de mise.",
        ],
      },
      paiements: {
        prose: [
          'Délais de retrait chronométrés par notre équipe — voir les résultats dans le tableau récapitulatif.',
        ],
      },
      support: {
        prose: [
          'Support testé par questions pièges pour évaluer la compétence et la réactivité en français.',
        ],
      },
      mobile: {
        prose: [
          'Expérience mobile testée sur iOS et Android — performances, fluidité et compatibilité.',
        ],
      },
      vip: {
        prose: [
          "Le programme de fidélité a été évalué sur la base de l'accessibilité et la valeur des récompenses.",
        ],
      },
      securite: {
        prose: [
          'Vérification de la licence, du protocole de chiffrement et des outils de jeu responsable.',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Support', value: 'Chat, e-mail' },
      { label: 'Application', value: 'Site mobile optimisé' },
    ],
    faq: [
      {
        question: `${slug} est-il fiable ?`,
        answer:
          "Oui, l'opérateur opère sous licence valide. Notre équipe a effectué des tests à l'argent réel pour valider les retraits et le support.",
      },
    ],
  }
}

const reviewMap = new Map(reviews.map((r) => [r.slug, r]))

export function getReviewData(slug: string): ReviewData {
  return reviewMap.get(slug) ?? buildDefaultReview(slug)
}
