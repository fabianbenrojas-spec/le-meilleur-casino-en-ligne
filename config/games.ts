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
  | 'baccarat'
  | 'game-shows'
  | 'megaways'
  | 'bingo'

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
  {
    slug: 'baccarat',
    label: 'Baccarat',
    labelEn: 'Baccarat',
    description:
      "Le baccarat est l'un des jeux de table les plus populaires dans les casinos haut de gamme. La variante Punto Banco est aujourd'hui la référence mondiale : aucune décision stratégique, un RTP de 98,94 % sur la mise Banque, des règles fixes.",
    descriptionEn:
      'Baccarat is one of the most popular table games in high-end casinos. The Punto Banco variant is now the global standard: no strategic decisions, a 98.94% RTP on the Banker bet, fixed rules.',
    count: 'N/A',
    guideTitle: 'Baccarat en ligne : Punto Banco, Chemin de Fer et stratégies de mise',
    guideTitleEn: 'Online baccarat: Punto Banco, Chemin de Fer and betting strategies',
    guideSummary: 'Comprendre les variantes du baccarat et choisir sa mise selon les probabilités.',
    guideSummaryEn:
      'Understand baccarat variants and choose your bet according to the probabilities.',
    bestOperatorSlug: 'dublinbet',
    guideBody: [
      'Le baccarat se décline principalement en trois variantes. Le Punto Banco est la variante standard en ligne : aucune décision au-delà du choix de la mise (Joueur, Banque ou Égalité). Le Chemin de Fer et le Baccarat Banque permettent aux joueurs de décider de tirer ou non selon leur main — rares en ligne, disponibles dans quelques casinos live haut de gamme.',
      "L'avantage maison varie selon la mise. La mise Banque affiche le RTP le plus élevé (98,94 %, house edge 1,06 %), suivie de la mise Joueur (98,76 %, house edge 1,24 %). La mise Égalité est à éviter : house edge de 14,36 % malgré un paiement de 8:1 ou 9:1. La commission standard sur la mise Banque gagnante est de 5 % — vérifiez ce taux avant de jouer.",
      "Le baccarat RNG est rapide et accessible à faibles mises. Le baccarat live Evolution Gaming (Lightning Baccarat, No Commission Baccarat) reproduit l'atmosphère des salles physiques avec statistiques de tirage en temps réel et limites jusqu'à 50 000€ sur les tables Salon Privé.",
      "Le baccarat convient aux joueurs qui souhaitent un jeu de table à faible avantage maison sans la courbe d'apprentissage du blackjack ou du poker. Son image VIP ne reflète pas sa complexité : c'est l'un des jeux de casino les plus simples en termes de règles. Les tables en ligne démarrent dès 1–5 €.",
    ],
    guideBodyEn: [
      'Baccarat has three main variants. Punto Banco is the standard in online casinos: the player makes no decision beyond choosing their bet (Player, Banker or Tie). Chemin de Fer and Baccarat Banque allow players to decide whether to draw — these are rare online but available at some high-end live casinos.',
      'House edge varies by bet. The Banker bet offers the highest RTP (98.94%, house edge 1.06%), followed by the Player bet (98.76%, house edge 1.24%). The Tie bet should be avoided: a 14.36% house edge despite its 8:1 or 9:1 payout. The standard commission on a winning Banker bet is 5% — check this rate before playing.',
      'RNG baccarat is fast and accessible at low stakes. Live baccarat from Evolution Gaming (Lightning Baccarat, No Commission Baccarat) recreates the feel of a physical casino with real-time draw statistics and limits up to €50,000 on Salon Privé tables.',
      'Baccarat suits players who want a low-house-edge table game without the learning curve of blackjack or poker. Its VIP image does not reflect its complexity — it is one of the simplest casino games in terms of rules. Low-minimum tables make it accessible from €1–€5 online.',
    ],
  },
  {
    slug: 'game-shows',
    label: 'Game shows live',
    labelEn: 'Live Game Shows',
    description:
      'Les game shows live combinent mécanique casino et format télévisuel : présentateurs en studio, décors spectaculaires, roues et bonus interactifs. Une catégorie portée presque exclusivement par Evolution Gaming depuis 2018.',
    descriptionEn:
      'Live game shows combine casino mechanics with a TV entertainment format: studio hosts, spectacular sets, wheels and interactive bonuses. A category driven almost exclusively by Evolution Gaming since 2018.',
    count: 'N/A',
    guideTitle: 'Game shows live : Crazy Time, Monopoly Live et les autres',
    guideTitleEn: 'Live game shows: Crazy Time, Monopoly Live and the rest',
    guideSummary: "Les titres phares d'Evolution Gaming expliqués : mécaniques, RTP et volatilité.",
    guideSummaryEn: "Evolution Gaming's flagship titles explained: mechanics, RTP and volatility.",
    bestOperatorSlug: 'wild-sultan',
    guideBody: [
      'Les game shows live sont animés par un présentateur humain en studio, diffusés en streaming HD. Contrairement aux tables classiques, ils intègrent des éléments télévisuels : roue de la fortune (Dream Catcher, Crazy Time), plateau de jeu de société (Monopoly Live), machines à boules (Lightning Ball). La catégorie est quasi entièrement dominée par Evolution Gaming, qui a développé la majorité de ces formats.',
      "Crazy Time est le game show le plus joué en 2026 : une roue à 54 segments, 4 bonus games (Cash Hunt, Pachinko, Coin Flip, Crazy Time) et des multiplicateurs jusqu'à 20 000×. Monopoly Live intègre un Mr. Monopoly en 3D qui se déplace selon des dés virtuels. Dream Catcher est le format d'entrée — roue simple à 8 valeurs (1, 2, 5, 10, 20, 40). Lightning Roulette (multiplicateurs aléatoires 50×–500×) est classée dans cette famille par Evolution.",
      "Les RTP des game shows varient selon la mise : Crazy Time oscille entre 94,41 % (segments courants) et 96,08 % (mise optimisée). La volatilité est structurellement haute — les bonus games concentrent l'essentiel des gains sur un nombre restreint de tours. Prévoyez un bankroll permettant plusieurs dizaines de tours sans déclencher de bonus.",
      "Les game shows conviennent aux joueurs qui cherchent une expérience immersive plutôt qu'un jeu à stratégie. La dimension divertissement est réelle : sessions rythmées, studios spectaculaires. En contrepartie, le RTP varie davantage selon la mise que pour une roulette ou un blackjack classique.",
    ],
    guideBodyEn: [
      'Live game shows are hosted by a human presenter in a studio, streamed in HD. Unlike classic tables, they incorporate television-style elements: wheels of fortune (Dream Catcher, Crazy Time), board game layouts (Monopoly Live), ball machines (Lightning Ball). The category is almost entirely dominated by Evolution Gaming, which developed the majority of these formats.',
      "Crazy Time is the world's most-played game show in 2026: a 54-segment wheel, 4 bonus games (Cash Hunt, Pachinko, Coin Flip, Crazy Time) and multipliers up to 20,000×. Monopoly Live incorporates a 3D virtual Mr. Monopoly that moves based on dice rolls. Dream Catcher is the entry-level format — a simple wheel with 8 values (1, 2, 5, 10, 20, 40). Lightning Roulette (random multipliers 50×–500×) is classified in this family by Evolution.",
      'Game show RTPs vary by bet: Crazy Time ranges from 94.41% (standard segments) to 96.08% (optimised bets). Volatility is structurally high — bonus games concentrate most of the winnings in a small number of rounds. Allow a bankroll covering several dozen rounds without triggering a bonus.',
      'Game shows suit players looking for an immersive experience rather than a strategy game. The entertainment dimension is genuine: sessions are fast-paced, studios are impressive. In return, RTP varies more depending on the bet chosen than with a standard roulette or blackjack table.',
    ],
  },
  {
    slug: 'megaways',
    label: 'Megaways',
    labelEn: 'Megaways',
    description:
      "Megaways est une mécanique brevetée par Big Time Gaming (BTG) en 2016, intégrée par licence dans plus de 500 titres. Chaque tour change aléatoirement le nombre de symboles sur chaque reel, créant jusqu'à 117 649 combinaisons gagnantes.",
    descriptionEn:
      'Megaways is a game mechanic patented by Big Time Gaming (BTG) in 2016, licensed into over 500 titles. Each spin randomly changes the number of symbols on each reel, creating up to 117,649 winning combinations.',
    count: 'N/A',
    guideTitle: 'Mécanique Megaways : fonctionnement, titres de référence et RTP',
    guideTitleEn: 'Megaways mechanic: how it works, reference titles and RTP',
    guideSummary: 'Comprendre la mécanique Megaways et choisir parmi les 500+ titres disponibles.',
    guideSummaryEn: 'Understand the Megaways mechanic and choose among 500+ available titles.',
    bestOperatorSlug: 'wild-sultan',
    guideBody: [
      "Megaways n'est pas un jeu, c'est une mécanique brevetée par Big Time Gaming en 2016. Elle modifie le nombre de symboles visibles sur chaque reel à chaque tour : sur une grille 6 reels, chaque colonne peut afficher 2 à 7 symboles, soit un potentiel de 7⁶ = 117 649 façons de gagner. Ce nombre variable est au cœur du mécanisme — contrairement aux lignes de paiement fixes, chaque tour présente un état unique de la grille.",
      "BTG concède la licence à d'autres éditeurs. Bonanza (BTG, 2016) est le titre originel — RTP 96 %, volatilité très haute, multiplicateurs en cascade — et reste la référence absolue. Extra Chilli (BTG) étend la formule. Madame Destiny Megaways (Pragmatic Play) illustre la diversité des thèmes disponibles sous licence. Plus de 500 titres Megaways ont été développés par NetEnt, Pragmatic, Red Tiger, iSoftBet et d'autres.",
      'Les slots Megaways sont structurellement à haute ou très haute volatilité : sécheresses longues, gains potentiels élevés (max win souvent entre 10 000× et 50 000×). Le RTP moyen se situe entre 96 % et 97 %, mais certains opérateurs activent une variante à RTP inférieur — vérifiez la configuration avant de jouer.',
      'Sur une grille Megaways, les combinaisons gagnantes se forment sur des symboles adjacents de gauche à droite, indépendamment de leur position verticale. La mécanique en cascade (symboles gagnants supprimés, nouveaux symboles qui tombent) est souvent associée aux Megaways, permettant des chaînes de gains sur un seul tour.',
    ],
    guideBodyEn: [
      'Megaways is not a game — it is a mechanic patented by Big Time Gaming in 2016. It changes the number of visible symbols on each reel every spin: on a 6-reel grid, each column can display 2 to 7 symbols, for a maximum potential of 7⁶ = 117,649 ways to win. This variable number is the heart of the mechanic — unlike fixed paylines, each spin presents a unique grid state.',
      'BTG licences the Megaways mechanic to other publishers. Bonanza (BTG, 2016) is the original title — 96% RTP, very high volatility, cascading multipliers — and remains the definitive reference. Extra Chilli (BTG) extends the formula. Madame Destiny Megaways (Pragmatic Play) illustrates the variety of themes available under licence. Over 500 Megaways titles have been developed by NetEnt, Pragmatic, Red Tiger, iSoftBet and others.',
      'Megaways slots are structurally high or very high volatility: long dry spells, high potential wins (max win often between 10,000× and 50,000×). Average RTP sits between 96% and 97%, but some operators activate a lower-RTP variant — check the configuration before playing.',
      'On a Megaways grid, winning combinations form on adjacent symbols from left to right, regardless of vertical position. The cascade mechanic (winning symbols removed, new symbols dropping in) is often paired with Megaways, enabling chain wins in a single spin.',
    ],
  },
  {
    slug: 'bingo',
    label: 'Bingo en ligne',
    labelEn: 'Online Bingo',
    description:
      'Le bingo en ligne existe en trois variantes principales : 75-ball (format américain), 80-ball et 90-ball (format britannique et européen classique). Moins répandu que les slots dans les casinos généralistes, il conserve une communauté de joueurs fidèles.',
    descriptionEn:
      'Online bingo exists in three main variants: 75-ball (American format), 80-ball and 90-ball (classic British and European format). Less common than slots in generalist casinos, it retains a loyal player community.',
    count: 'N/A',
    guideTitle: 'Bingo en ligne : variantes 75-ball, 80-ball et 90-ball',
    guideTitleEn: 'Online bingo: 75-ball, 80-ball and 90-ball variants',
    guideSummary:
      'Choisir sa variante de bingo et comprendre les probabilités de gain selon le nombre de cartes achetées.',
    guideSummaryEn:
      'Choose your bingo variant and understand win probability based on the number of cards purchased.',
    bestOperatorSlug: 'cresus',
    guideBody: [
      'Le bingo en ligne existe principalement en trois variantes. Le 90-ball est le format dominant en Europe : carte à 3 rangées de 9 colonnes, 15 numéros, 3 paliers de gain (1 ligne, 2 lignes, carton plein). Le 75-ball est le standard américain : grille 5×5 avec case centrale FREE, les patterns gagnants varient selon la salle. Le 80-ball est un format intermédiaire sur grille 4×4, moins courant.',
      'Le bingo en ligne reproduit la salle physique avec un chat communautaire en temps réel. Les parties multi-joueurs créent un jackpot proportionnel au nombre de cartes vendues. Les salles sans chat sont généralement moins appréciées : la dimension sociale est constitutive du format, pas un ajout optionnel.',
      "Le bingo est moins disponible que les slots dans les casinos généralistes — les salles spécialisées offrent une meilleure sélection. Acheter plusieurs cartes sur une même partie vous donne une probabilité proportionnelle de remporter le carton plein : plus vous avez de cartes parmi toutes celles vendues, plus vos chances augmentent, jusqu'au seuil où le coût supplémentaire dépasse l'espérance de gain.",
      "Le bingo s'adresse à un public qui valorise le rythme détendu et l'aspect communautaire plutôt que la tension d'un slot à haute volatilité. Ce n'est pas la catégorie au RTP le plus élevé, mais c'est l'une des plus transparentes : les règles sont fixes et la dimension sociale est un avantage réel pour certains profils de joueurs.",
    ],
    guideBodyEn: [
      '90-ball is the dominant format in Europe: a card with 3 rows of 9 columns containing 15 numbers, with 3 prize tiers (1 line, 2 lines, full house). 75-ball is the American standard: a 5×5 grid with a free centre square, winning patterns defined by the room. 80-ball is an intermediate format on a 4×4 grid, less common.',
      'Online bingo replicates the physical bingo hall with a real-time community chat. Multi-player games create a jackpot proportional to the number of cards sold. Rooms without chat are generally less well-regarded — the social dimension is integral to the format, not an optional add-on.',
      'Bingo is less available than slots in generalist casinos — specialist rooms offer a better selection. Buying several cards in the same game gives you a proportional probability of winning the full house: the more cards you hold among all those sold, the higher your chances — up to the threshold where the additional cost exceeds the expected return.',
      'Online bingo suits players who value the relaxed pace and community aspect rather than the tension of a high-volatility slot. It does not offer the highest RTP of any category, but it is one of the most transparent: the rules are fixed and the social dimension is a genuine advantage for certain player profiles.',
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
