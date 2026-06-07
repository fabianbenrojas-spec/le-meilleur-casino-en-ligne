// Game data — seed data for category pages and game details.

export interface Game {
  slug: string
  name: string
  provider: string
  category: GameCategory
  rtp: number
  volatility: 'basse' | 'moyenne' | 'haute' | 'très haute'
  maxWin: string // e.g. "5 000×"
  description: string
  features: string[]
  minBet: number
  maxBet: number
  popular?: boolean
}

export type GameCategory =
  | 'machines-a-sous'
  | 'roulette'
  | 'blackjack'
  | 'live'
  | 'crash'
  | 'video-poker'

export interface GameCategoryInfo {
  slug: GameCategory
  label: string
  labelEn: string
  description: string
  count: string
  guideTitle: string
  guideSummary: string
}

export const categories: GameCategoryInfo[] = [
  {
    slug: 'machines-a-sous',
    label: 'Machines à sous',
    labelEn: 'Slot Machines',
    description:
      "Les machines à sous représentent plus de 70 % de l'offre des casinos en ligne. RTP, volatilité, fonctionnalités bonus — notre guide pour choisir et jouer intelligemment.",
    count: '2 840',
    guideTitle: 'Tout savoir sur les machines à sous en ligne',
    guideSummary:
      'RTP, volatilité, fonctionnalités bonus, cascades — les clés pour choisir les bons jeux.',
  },
  {
    slug: 'roulette',
    label: 'Roulette',
    labelEn: 'Roulette',
    description:
      'Roulette européenne, française ou américaine : avantage maison, stratégies et meilleures tables live.',
    count: '120',
    guideTitle: 'Guide de la roulette en ligne',
    guideSummary: 'Roulette européenne vs américaine, martingale et autres stratégies — les faits.',
  },
  {
    slug: 'blackjack',
    label: 'Blackjack',
    labelEn: 'Blackjack',
    description:
      'Le blackjack en ligne atteint des RTP de 99 %+ avec la stratégie de base. Nos variantes recommandées et les meilleures tables live.',
    count: '85',
    guideTitle: 'Blackjack en ligne : stratégie de base et variantes',
    guideSummary:
      "Stratégie de base, counting et meilleures variantes pour réduire l'avantage maison.",
  },
  {
    slug: 'live',
    label: 'Casino live',
    labelEn: 'Live Casino',
    description:
      'Tables live animées par de vrais croupiers en streaming HD. Evolution Gaming, Pragmatic Play Live — les meilleurs fournisseurs comparés.',
    count: '340',
    guideTitle: 'Casino live en ligne : guide complet',
    guideSummary: 'Fournisseurs, tables francophones, game shows et limites de mise.',
  },
  {
    slug: 'crash',
    label: 'Crash games',
    labelEn: 'Crash Games',
    description:
      'Aviator, Mines, Plinko : les crash games combinent simplicité et tension. Notre analyse des RTP et des stratégies de retrait.',
    count: '62',
    guideTitle: 'Crash games : comment fonctionnent-ils vraiment ?',
    guideSummary: 'Aviator, Mines, Plinko — mécaniques, RTP et gestion du risque.',
  },
]

export const games: Game[] = [
  {
    slug: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'machines-a-sous',
    rtp: 96.51,
    volatility: 'haute',
    maxWin: '21 100×',
    description:
      'Sweet Bonanza est une machine à sous à grille 6×5 avec un mécanisme de paiement « Pays Anywhere ». Les symboles tombent en cascade et des multiplicateurs peuvent atteindre 100× lors du round de tours gratuits.',
    features: [
      'Tours gratuits déclenchés par 4+ Scatters',
      "Multiplicateurs jusqu'à 100×",
      'Acheter des tours (option)',
      'Cascades illimitées',
    ],
    minBet: 0.2,
    maxBet: 125,
    popular: true,
  },
  {
    slug: 'gates-of-olympus',
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    category: 'machines-a-sous',
    rtp: 96.5,
    volatility: 'très haute',
    maxWin: '5 000×',
    description:
      "Gates of Olympus est une machine à sous à grille 6×5 sur le thème de Zeus. Les symboles tombent et les multiplicateurs s'accumulent pour des gains potentiels massifs.",
    features: [
      'Tours gratuits avec multiplicateurs',
      'Max Win 5 000×',
      'Acheter des tours',
      'Antigravité',
    ],
    minBet: 0.2,
    maxBet: 100,
    popular: true,
  },
  {
    slug: 'book-of-dead',
    name: 'Book of Dead',
    provider: "Play'n GO",
    category: 'machines-a-sous',
    rtp: 96.21,
    volatility: 'haute',
    maxWin: '5 000×',
    description:
      "Un classique de l'iGaming. Book of Dead propose 10 lignes de paiement, des symboles expansifs lors des tours gratuits et un RTP compétitif.",
    features: [
      '10 lignes de paiement',
      'Symboles expansifs',
      'Tours gratuits retriggerable',
      'Bonus Buy',
    ],
    minBet: 0.01,
    maxBet: 100,
    popular: true,
  },
  // ── Roulette ───────────────────────────────────────────────────────────────
  {
    slug: 'lightning-roulette',
    name: 'Lightning Roulette',
    provider: 'Evolution Gaming',
    category: 'roulette',
    rtp: 97.3,
    volatility: 'haute',
    maxWin: '500×',
    description:
      'Lightning Roulette est la table live la plus jouée au monde. Des éclairs frappent 1 à 5 numéros à chaque tour et leur attribuent des multiplicateurs aléatoires de 50× à 500×. Une roulette européenne enrichie.',
    features: [
      'Multiplicateurs aléatoires 50×–500×',
      '1 à 5 numéros Lightning par tour',
      'Diffusion en HD depuis un studio Evolution',
      'Mises dès 0,20 €',
    ],
    minBet: 0.2,
    maxBet: 4000,
    popular: true,
  },
  {
    slug: 'roulette-europeenne',
    name: 'Roulette Européenne',
    provider: 'NetEnt',
    category: 'roulette',
    rtp: 97.3,
    volatility: 'basse',
    maxWin: '35×',
    description:
      'La roulette européenne est le point de départ de tout joueur sérieux : une seule case zéro, avantage maison de 2,7 % — moitié moins que la version américaine. La référence pour apprendre les systèmes de mise.',
    features: [
      'Avantage maison 2,7 % (vs 5,26 % américaine)',
      'Mise en prison sur la règle La Partage',
      'RNG certifié',
      'Statistiques de tirage intégrées',
    ],
    minBet: 0.1,
    maxBet: 500,
    popular: false,
  },

  // ── Blackjack ──────────────────────────────────────────────────────────────
  {
    slug: 'infinite-blackjack',
    name: 'Infinite Blackjack',
    provider: 'Evolution Gaming',
    category: 'blackjack',
    rtp: 99.51,
    volatility: 'basse',
    maxWin: '3×',
    description:
      'Infinite Blackjack résout le problème des tables saturées : un nombre illimité de joueurs peuvent rejoindre la même table. Chaque joueur décide indépendamment de ses actions sur la même main de départ.',
    features: [
      'Nombre illimité de joueurs simultanés',
      'RTP 99,51 % avec stratégie de base',
      'Six Deck',
      'Side bets : Any Pair, 21+3',
    ],
    minBet: 1,
    maxBet: 2500,
    popular: true,
  },
  {
    slug: 'blackjack-classique',
    name: 'Blackjack Classique',
    provider: 'Microgaming',
    category: 'blackjack',
    rtp: 99.65,
    volatility: 'basse',
    maxWin: '3×',
    description:
      "Le blackjack classique de Microgaming est la référence pour pratiquer la stratégie de base. RTP de 99,65 % avec jeu optimal — l'un des meilleurs RTP de tous les jeux de casino.",
    features: [
      'RTP 99,65 % avec stratégie de base',
      'Règles Vegas Strip',
      "Double sur n'importe quelle main",
      "Décomposition des paires jusqu'à 4 mains",
    ],
    minBet: 0.5,
    maxBet: 200,
    popular: false,
  },

  // ── Live ───────────────────────────────────────────────────────────────────
  {
    slug: 'crazy-time',
    name: 'Crazy Time',
    provider: 'Evolution Gaming',
    category: 'live',
    rtp: 96.08,
    volatility: 'très haute',
    maxWin: '20 000×',
    description:
      "Crazy Time est le game show live le plus populaire au monde. Une roue géante, 4 bonus games (Cash Hunt, Pachinko, Coin Flip, Crazy Time) et des multiplicateurs jusqu'à 20 000×.",
    features: [
      '4 bonus games interactifs',
      "Multiplicateurs jusqu'à 20 000×",
      'Top Slot avec multiplicateurs aléatoires',
      'Chat en direct multi-joueur',
    ],
    minBet: 0.1,
    maxBet: 1000,
    popular: true,
  },
  {
    slug: 'lightning-dice',
    name: 'Lightning Dice',
    provider: 'Evolution Gaming',
    category: 'live',
    rtp: 96.21,
    volatility: 'haute',
    maxWin: '1 000×',
    description:
      'Lightning Dice combine le lancer de trois dés avec des éclairs qui multiplient aléatoirement les gains. Simple à comprendre, intense à jouer — les multiplicateurs peuvent atteindre 1 000× sur certains totaux.',
    features: [
      '3 dés dans un tube électrique',
      'Multiplicateurs 50×–1 000× par éclair',
      'Paris sur les totaux de 3 à 18',
      'Résultats en 30 secondes',
    ],
    minBet: 0.1,
    maxBet: 5000,
    popular: false,
  },

  // ── Crash ──────────────────────────────────────────────────────────────────
  {
    slug: 'aviator',
    name: 'Aviator',
    provider: 'Spribe',
    category: 'crash',
    rtp: 97.0,
    volatility: 'haute',
    maxWin: 'Illimité',
    description:
      "Aviator est le crash game le plus populaire au monde. Un avion décolle et multiplie la mise — vous devez retirer avant qu'il ne disparaisse. RTP de 97 %.",
    features: [
      'RTP 97 %',
      'Multi-joueur en temps réel',
      'Chat en direct',
      'Statistiques publiques',
    ],
    minBet: 0.1,
    maxBet: 100,
    popular: true,
  },
]

// Maps
export const gameBySlug = new Map(games.map((g) => [g.slug, g]))
export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))

export function getGamesByCategory(category: GameCategory): Game[] {
  return games.filter((g) => g.category === category)
}
