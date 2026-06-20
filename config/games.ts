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
  imageUrl?: string
}

export type GameCategory =
  | 'machines-a-sous'
  | 'roulette'
  | 'blackjack'
  | 'live'
  | 'crash'
  | 'video-poker'
  | 'jackpot-progressif'
  | 'poker'

export interface GameCategoryInfo {
  slug: GameCategory
  label: string
  labelEn: string
  description: string
  descriptionEn?: string
  count: string
  guideTitle: string
  guideTitleEn?: string
  guideSummary: string
  guideSummaryEn?: string
  bestOperatorSlug?: string
  guideBody?: string[]
  guideBodyEn?: string[]
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
    bestOperatorSlug: 'madnix',
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
    bestOperatorSlug: 'cresus',
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
    bestOperatorSlug: 'dublinbet',
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
    bestOperatorSlug: 'wild-sultan',
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
    bestOperatorSlug: 'stake',
  },
  {
    slug: 'video-poker',
    label: 'Vidéo poker',
    labelEn: 'Video Poker',
    description:
      "Jacks or Better, Deuces Wild, Double Bonus : le vidéo poker mêle stratégie et RTP élevés (jusqu'à 99,5 %). La discipline qui réduit le plus l'avantage maison après le blackjack.",
    count: 'N/A',
    guideTitle: 'Le vidéo poker : règles, RTP et stratégies',
    guideSummary:
      'Jacks or Better, variantes, tableaux de paie et stratégie optimale pour maximiser le RTP.',
    bestOperatorSlug: 'cresus',
  },
  {
    slug: 'jackpot-progressif',
    label: 'Jackpot progressif',
    labelEn: 'Progressive Jackpot',
    description:
      "Mega Moolah, Major Millions : les jackpots progressifs accumulent une cagnotte partagée entre casinos. Des gains en millions d'euros, un RTP variable — ce qu'il faut savoir avant de jouer.",
    count: 'N/A',
    guideTitle: 'Comprendre les machines à sous à jackpot progressif',
    guideSummary:
      'Fonctionnement, RTP réel, quand jouer et quels titres offrent les meilleures cagnotes.',
    bestOperatorSlug: 'madnix',
  },
  {
    slug: 'poker',
    label: 'Poker en ligne',
    labelEn: 'Online Poker',
    description:
      'Le poker en ligne regroupe les tables cash, les tournois et les Sit & Go. Seule catégorie casino légalement autorisée sous licence ANJ en France — et la seule où la compétence influence le résultat à long terme.',
    descriptionEn:
      'Online poker covers cash games, tournaments and Sit & Go formats. The only casino category legally authorised under French ANJ licensing — and the only one where skill influences long-term results.',
    count: 'N/A',
    guideTitle: 'Le poker en ligne : règles, formats et stratégies',
    guideTitleEn: 'Online poker: rules, formats and strategies',
    guideSummary: 'Comprendre le poker en ligne et choisir son format de jeu.',
    guideSummaryEn: 'Understand online poker and choose your game format.',
    bestOperatorSlug: 'lucky8',
    guideBody: [
      "Le poker en ligne se décline en deux formats distincts. Les cash games (tables à enjeux réels) permettent de s'asseoir et de quitter quand on le souhaite — les fiches valent l'argent réel misé. Les tournois (MTT et Sit & Go) ont une structure fixe : on paie un buy-in, on reçoit des jetons de tournoi, et on joue jusqu'à élimination ou victoire. Les Sit & Go sont des mini-tournois de 6 à 9 joueurs qui démarrent dès que la table est complète ; les MTT rassemblent des centaines voire des milliers de joueurs à une heure fixe.",
      "Le Texas Hold'em est la variante mainstream — celle des séries télévisées et des grandes compétitions mondiales (WSOP, EPT). Chaque joueur reçoit 2 cartes privées et utilise 5 cartes communautaires. L'Omaha impose 4 cartes privées dont exactement 2 doivent être utilisées — ce qui crée davantage d'action et des pots plus élevés. Le Stud (7 Card Stud) est une variante sans cartes communautaires, appréciée des joueurs chevronnés. Les casinos offshore proposent généralement ces trois familles ; les opérateurs ANJ se concentrent sur le Hold'em.",
      'Le poker est la seule catégorie casino légalement ouverte sous licence ANJ (Autorité Nationale des Jeux) en France. Winamax, PokerStars France et PMU Poker opèrent légalement avec une licence française. Les opérateurs actuellement dans notre comparatif sont sous licence offshore (Curaçao ou MGA) — ils proposent du poker mais dans une zone réglementaire distincte. Les opérateurs ANJ spécialisés (Winamax, PokerStars) seront intégrés dans une prochaine mise à jour du comparatif.',
      "Contrairement aux machines à sous ou à la roulette, le poker n'oppose pas le joueur au casino mais les joueurs entre eux — le casino prend un rake (commission) sur chaque pot. Cela signifie qu'un joueur compétent peut être durablement profitable à long terme, ce qui est impossible dans les autres catégories casino. Pour les débutants, commencez par les tables à micro-enjeux (0,01/0,02 €) pour apprendre sans risque financier significatif.",
    ],
    guideBodyEn: [
      'Online poker covers two distinct formats. Cash games allow players to sit and leave at any time — chips represent real money. Tournaments (MTTs and Sit & Gos) have a fixed structure: pay a buy-in, receive tournament chips, and play until elimination or victory. Sit & Gos are 6–9 player mini-tournaments that start when the table is full; MTTs gather hundreds or thousands of players at a fixed start time.',
      "Texas Hold'em is the mainstream variant — the one seen on television and at major world events (WSOP, EPT). Each player receives 2 hole cards and uses 5 community cards. Omaha deals 4 hole cards, of which exactly 2 must be used — creating more action and higher pots. Stud (7 Card Stud) is a community-card-free variant favoured by experienced players. Offshore casinos generally offer all three families; ANJ-licensed operators focus on Hold'em.",
      "Poker is the only casino category legally open under ANJ licensing (France's National Gaming Authority). Winamax, PokerStars France and PMU Poker operate legally with a French licence. Operators currently in our comparison hold offshore licences (Curaçao or MGA) — they offer poker but within a different regulatory framework. ANJ-licensed specialists (Winamax, PokerStars) will be added in a future update.",
      'Unlike slots or roulette, poker does not pit the player against the casino — players compete against each other, with the casino taking a rake (commission) on each pot. This means a skilled player can be sustainably profitable long-term, which is impossible in other casino categories. For beginners, start at micro-stakes tables (€0.01/€0.02) to learn without significant financial risk.',
    ],
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
    imageUrl: '/jeux/sweet-bonanza.png',
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
    imageUrl: '/jeux/gates-of-olympus.png',
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
    imageUrl: '/jeux/book-of-dead.webp',
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
    imageUrl: '/jeux/lightning-roulette.jpg',
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
    imageUrl: '/jeux/roulette-europeenne.jpg',
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
    imageUrl: '/jeux/infinite-blackjack.jpg',
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
    imageUrl: '/jeux/blackjack-classique.jpg',
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
    imageUrl: '/jeux/crazy-time.svg',
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
    imageUrl: '/jeux/lightning-dice.jpg',
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
    imageUrl: '/jeux/aviator.webp',
  },
]

// Maps
export const gameBySlug = new Map(games.map((g) => [g.slug, g]))
export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))

export function getGamesByCategory(category: GameCategory): Game[] {
  return games.filter((g) => g.category === category)
}
