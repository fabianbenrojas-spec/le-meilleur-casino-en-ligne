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
  | 'craps-sic-bo'
  | 'keno'
  | 'loterie'
  | 'jeux-a-gratter'
  | 'provably-fair'

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
    bestOperatorSlug: 'winamax',
    guideBody: [
      "Le poker en ligne se décline en deux formats distincts. Les cash games (tables à enjeux réels) permettent de s'asseoir et de quitter quand on le souhaite — les fiches valent l'argent réel misé. Les tournois (MTT et Sit & Go) ont une structure fixe : on paie un buy-in, on reçoit des jetons de tournoi, et on joue jusqu'à élimination ou victoire. Les Sit & Go sont des mini-tournois de 6 à 9 joueurs qui démarrent dès que la table est complète ; les MTT rassemblent des centaines voire des milliers de joueurs à une heure fixe.",
      "Le Texas Hold'em est la variante mainstream — celle des séries télévisées et des grandes compétitions mondiales (WSOP, EPT). Chaque joueur reçoit 2 cartes privées et utilise 5 cartes communautaires. L'Omaha impose 4 cartes privées dont exactement 2 doivent être utilisées — ce qui crée davantage d'action et des pots plus élevés. Le Stud (7 Card Stud) est une variante sans cartes communautaires, appréciée des joueurs chevronnés. Les casinos offshore proposent généralement ces trois familles ; les opérateurs ANJ se concentrent sur le Hold'em.",
      'Le poker est la seule catégorie casino légalement ouverte sous licence ANJ (Autorité Nationale des Jeux) en France. Les casinos offshore de notre comparatif (Curaçao ou MGA) proposent du poker dans un cadre réglementaire distinct du droit français. Winamax, premier opérateur ANJ intégré dans notre comparatif, est la référence légale pour le poker en ligne en France.',
      "Contrairement aux machines à sous ou à la roulette, le poker n'oppose pas le joueur au casino mais les joueurs entre eux — le casino prend un rake (commission) sur chaque pot. Cela signifie qu'un joueur compétent peut être durablement profitable à long terme, ce qui est impossible dans les autres catégories casino. Pour les débutants, commencez par les tables à micro-enjeux (0,01/0,02 €) pour apprendre sans risque financier significatif.",
    ],
    guideBodyEn: [
      'Online poker covers two distinct formats. Cash games allow players to sit and leave at any time — chips represent real money. Tournaments (MTTs and Sit & Gos) have a fixed structure: pay a buy-in, receive tournament chips, and play until elimination or victory. Sit & Gos are 6–9 player mini-tournaments that start when the table is full; MTTs gather hundreds or thousands of players at a fixed start time.',
      "Texas Hold'em is the mainstream variant — the one seen on television and at major world events (WSOP, EPT). Each player receives 2 hole cards and uses 5 community cards. Omaha deals 4 hole cards, of which exactly 2 must be used — creating more action and higher pots. Stud (7 Card Stud) is a community-card-free variant favoured by experienced players. Offshore casinos generally offer all three families; ANJ-licensed operators focus on Hold'em.",
      "Poker is the only casino category legally open under ANJ licensing (France's National Gaming Authority). Offshore operators in our comparison (Curaçao or MGA licences) offer poker within a distinct regulatory framework from French law. Winamax, the first ANJ-licensed operator in our comparison, is the legal reference for online poker in France.",
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
  {
    slug: 'craps-sic-bo',
    label: 'Craps et Sic Bo',
    labelEn: 'Craps & Sic Bo',
    description:
      "Craps et Sic Bo sont deux jeux de dés aux histoires et mécaniques distinctes, regroupés ici pour leur complémentarité SEO. Le Craps est le jeu de dés dominant dans les casinos américains, avec plus de 40 types de paris et des RTP très variables selon la mise choisie. Le Sic Bo est d'origine asiatique : trois dés, des combinaisons fixes, des règles plus accessibles.",
    descriptionEn:
      'Craps and Sic Bo are two dice games with distinct histories and mechanics, grouped here for SEO consolidation. Craps is the dominant dice game in American casinos, with over 40 bet types and widely varying RTPs depending on the chosen bet. Sic Bo is of Asian origin: three dice, fixed combinations, more accessible rules.',
    count: 'N/A',
    guideTitle: 'Craps et Sic Bo en ligne : mécaniques, types de paris et RTP comparés',
    guideTitleEn: 'Craps and Sic Bo online: mechanics, bet types and RTP compared',
    guideSummary:
      'Comprendre les règles du Craps et du Sic Bo, différencier les deux jeux de dés et identifier les paris les plus avantageux.',
    guideSummaryEn:
      'Understand Craps and Sic Bo rules, distinguish the two dice games, and identify the most favourable bets.',
    bestOperatorSlug: 'dublinbet',
    guideBody: [
      "Le Craps repose sur une mise initiale (Pass Line ou Don't Pass Line) suivie d'un Point si le premier jet n'est pas naturel. Plus de 40 types de paris coexistent, avec des RTP très variables : la mise Pass Line affiche 98,59 % (house edge 1,41 %), tandis que les mises Proposition peuvent descendre à 84 %. La règle pratique : concentrez-vous sur les paris Come/Pass et les Odds (sans avantage maison intégré). Le Craps en ligne existe en version RNG — rapide, faibles mises — et en live chez Evolution Gaming (table multi-joueurs, vrai lanceur de dés).",
      "Le Sic Bo utilise trois dés secoués dans une cage. Vous misez sur des combinaisons : valeur totale des trois dés (4 à 17), une valeur spécifique sur 1, 2 ou 3 dés, doublet ou triplet. Le RTP varie selon la mise : les paris Petit (total 4-10) et Grand (total 11-17) affichent 97,22 %, mais les paris Triplet spécifique descendent à 83,33 %. La structure des paiements est fixe — il n'y a pas de décision stratégique comparable à celle du Craps.",
      'Le Craps en ligne RNG est moins courant que la roulette ou le blackjack ; DublinBet et quelques casinos live haute limite proposent des tables. Le Sic Bo est disponible chez la majorité des fournisseurs live (Evolution Gaming, Playtech). Si vous cherchez un jeu de dés avec des décisions stratégiques, le Craps est plus riche ; si vous préférez des règles simples et des résultats rapides, le Sic Bo est plus accessible.',
      "Dans les deux jeux, évitez les paris à hauts multiplicateurs : Triplets spécifiques au Sic Bo, Propositions au Craps. Leurs RTP sont structurellement inférieurs à 90 %. Les tables live ajoutent une dimension immersive mais les mises minimales sont souvent plus élevées qu'en RNG. Vérifiez les limites de table avant de commencer.",
    ],
    guideBodyEn: [
      "Craps is built on an initial bet (Pass Line or Don't Pass Line) followed by a Point if the first roll is not a natural. Over 40 bet types coexist, with widely varying RTPs: the Pass Line bet returns 98.59% (house edge 1.41%), while Proposition bets can fall to 84%. The practical rule: stick to Come/Pass bets and the Odds bet, which carries no built-in house edge. Online Craps exists as RNG — fast, low stakes — and as a live version from Evolution Gaming (multiplayer table, real dice shooter).",
      'Sic Bo uses three dice shaken in a cage. You bet on combinations: total value of all three dice (4 to 17), a specific value on 1, 2 or 3 dice, doubles or triples. RTP varies by bet: Small (total 4-10) and Big (total 11-17) bets return 97.22%, but specific Triple bets fall to 83.33%. The payout structure is fixed — there is no strategic depth comparable to Craps.',
      'Online RNG Craps is less common than roulette or blackjack; DublinBet and some high-limit live casinos offer tables. Sic Bo is available at most live providers (Evolution Gaming, Playtech). If you want a dice game with strategic decisions, Craps is richer; if you prefer simple rules and fast results, Sic Bo is more accessible.',
      'In both games, avoid high-multiplier bets: specific Triples in Sic Bo, Propositions in Craps. Their RTPs are structurally below 90%. Live tables add immersion but minimum bets are often higher than RNG equivalents. Check table limits before you start.',
    ],
  },
  {
    slug: 'keno',
    label: 'Keno',
    labelEn: 'Keno',
    description:
      "Le keno est un jeu de tirage sur 80 numéros où le joueur sélectionne de 1 à 20 numéros selon les variantes. Proche du bingo et de la loterie dans son principe, il s'en distingue par des tirages quasi-instantanés disponibles en continu. Son RTP est structurellement plus bas que les autres jeux de casino en ligne — généralement entre 75 % et 90 %.",
    descriptionEn:
      'Keno is a draw game on 80 numbers where the player selects 1 to 20 numbers depending on the variant. Similar in principle to bingo and lottery, it is distinguished by near-instant draws available continuously. Its RTP is structurally lower than other online casino games — typically between 75% and 90%.',
    count: 'N/A',
    guideTitle: "Keno en ligne : règles, probabilités et RTP — ce qu'il faut savoir avant de jouer",
    guideTitleEn: 'Online keno: rules, probabilities and RTP — what to know before playing',
    guideSummary:
      'Comprendre le fonctionnement du keno, ses probabilités de gain et pourquoi son RTP inférieur le distingue des autres jeux de casino.',
    guideSummaryEn:
      'Understand how keno works, its win probabilities, and why its lower RTP sets it apart from other casino games.',
    bestOperatorSlug: 'cresus',
    guideBody: [
      "Le keno se joue sur une grille de 80 numéros (1 à 80). Vous choisissez un nombre de spots (numéros sélectionnés), puis 20 numéros sont tirés aléatoirement par le système. Les gains dépendent du nombre de correspondances entre vos numéros et le tirage. Le tableau des paiements varie selon le nombre de spots joués et l'opérateur : jouer 10 spots et en avoir 7 corrects peut rapporter davantage que jouer 3 spots et les avoir tous corrects, selon la configuration.",
      "Le RTP du keno en ligne se situe généralement entre 75 % et 90 %, selon le titre et la variante. C'est structurellement inférieur aux machines à sous (≥ 94 %), à la roulette européenne (97,3 %) ou au blackjack (99 %+). Ce point est à connaître avant de jouer : le keno n'est pas un jeu à stratégie, et la fréquence des gains est plus faible que dans la majorité des autres catégories casino. En contrepartie, les mises sont souvent très faibles (dès 0,10 €) et les tirages rapides.",
      "Le keno diffère du bingo par l'absence de carte prédéfinie et de dimension communautaire — chaque joueur joue seul contre le tirage. Il diffère de la loterie par sa disponibilité instantanée (pas d'attente de tirage à date fixe) et par ses tableaux de paiement publics et vérifiables. À titre de référence, la FDJ propose son propre Keno (tirage quotidien sur grille de 70 numéros) avec un taux de retour officiel de 73,4 %.",
      "Le keno convient à des sessions courtes à faibles mises, sans décision stratégique à prendre. Ce n'est pas la catégorie recommandée pour maximiser la durée de jeu ou le rendement mathématique — d'autres jeux de casino offrent de meilleures conditions. Si c'est sa simplicité et son immédiateté qui vous intéressent, le keno remplit cette fonction efficacement.",
    ],
    guideBodyEn: [
      'Keno is played on a grid of 80 numbers (1 to 80). You choose a number of spots (selected numbers), then 20 numbers are drawn at random by the system. Winnings depend on how many of your numbers match the draw. The paytable varies by the number of spots played and the operator: picking 10 spots and hitting 7 can pay more than picking 3 and hitting all of them, depending on the configuration.',
      'Online keno RTP typically falls between 75% and 90%, depending on the title and variant. This is structurally lower than slots (≥ 94%), European roulette (97.3%) or blackjack (99%+). This is worth knowing before playing: keno is not a strategy game, and win frequency is lower than in most other casino categories. On the other hand, stakes are often very low (from €0.10) and draws are fast.',
      'Keno differs from bingo in that there is no pre-defined card and no community dimension — each player plays alone against the draw. It differs from the lottery in that it is available instantly (no waiting for a scheduled draw date) and its paytables are public and verifiable. For reference, the FDJ operates its own Keno (daily draw on a 70-number grid) with an official return rate of 73.4%.',
      'Keno suits short sessions at low stakes, with no strategic decisions required. It is not the recommended category for maximising session length or mathematical return — other casino games offer better conditions. If what attracts you is its simplicity and immediacy, keno fulfils that function effectively.',
    ],
  },
  {
    slug: 'loterie',
    label: 'Loterie en ligne',
    labelEn: 'Online Lottery',
    description:
      "La loterie en ligne regroupe les tirages à numéros à dates fixes — EuroMillions, Loto — accessibles en ligne, à distinguer du keno (tirage instantané) et du bingo (carte prédéfinie). En France, seule la FDJ est autorisée à commercialiser des jeux de loterie. Les RTP des loteries d'État sont parmi les plus bas du secteur : environ 55 % pour le Loto et l'EuroMillions.",
    descriptionEn:
      'Online lottery covers scheduled number draws — EuroMillions, Loto — accessible online, distinct from keno (instant draws) and bingo (pre-defined card). In France, only the FDJ is authorised to sell lottery games. State lottery RTPs are among the lowest in the sector: approximately 55% for Loto and EuroMillions.',
    count: 'N/A',
    guideTitle:
      'Loterie en ligne : tirages officiels, plateformes offshore et différences avec le keno',
    guideTitleEn: 'Online lottery: official draws, offshore platforms and differences from keno',
    guideSummary:
      "Comprendre la différence entre loterie et keno, évaluer le RTP réel des loteries d'État et identifier les options disponibles en France.",
    guideSummaryEn:
      'Understand the difference between lottery and keno, assess the real RTP of state lotteries, and identify the options available in France.',
    bestOperatorSlug: 'cresus',
    guideBody: [
      "La loterie en ligne recouvre deux réalités distinctes. D'un côté, les loteries d'État accessibles en ligne : en France, FDJ.fr propose le Loto, l'EuroMillions et le Keno (voir notre page dédiée). Ces jeux sont légaux, réglementés par l'ANJ, avec des odds et taux de retour officiellement publiés. De l'autre, des plateformes offshore permettent de parier sur des tirages internationaux (Powerball US, UK Lotto) ou de participer à des loteries propriétaires avec des jackpots variables.",
      "Loterie et keno reposent tous deux sur un tirage de numéros, mais leur fonctionnement diffère sur un point clé : le timing. Le keno propose des tirages quasi-instantanés disponibles en continu — vous jouez, le résultat est immédiat. La loterie implique un tirage à une date et une heure fixes : vous achetez votre ticket à l'avance et attendez le résultat. Les jackpots peuvent atteindre des montants considérables (EuroMillions : jusqu'à 240 M€), mais la probabilité de remporter le jackpot principal reste extrêmement faible — 1 chance sur environ 140 millions pour l'EuroMillions.",
      "Le RTP des loteries d'État est parmi les plus bas des jeux de hasard. La FDJ publie un taux de retour global d'environ 55 % pour le Loto et l'EuroMillions (incluant l'ensemble des prix et les abondements de cagnotte). À titre de comparaison, un slot classique affiche 94-96 %, une roulette européenne 97,3 %. Les plateformes offshore de type « lottery betting » proposent parfois des structures de paiement légèrement différentes — vérifiez toujours les odds publiés avant de jouer.",
      "En France, seule la FDJ est autorisée par l'ANJ à commercialiser des jeux de loterie. Les plateformes offshore qui proposent des paris sur des tirages étrangers ne disposent d'aucune autorisation française et opèrent en dehors du cadre légal national. Le joueur qui y accède le fait sous sa propre responsabilité. Pour les tirages FDJ, FDJ.fr est la seule plateforme légale en France métropolitaine.",
    ],
    guideBodyEn: [
      'Online lottery covers two distinct realities. On one side, state lotteries accessible online: in France, FDJ.fr offers Loto, EuroMillions and Keno (see our dedicated page). These games are legal, regulated by the ANJ, with officially published odds and return rates. On the other, offshore platforms allow betting on international draws (US Powerball, UK Lotto) or participating in proprietary lotteries with variable jackpots.',
      'Lottery and keno both rely on number draws, but their mechanics differ on one key point: timing. Keno offers near-instant draws available continuously — you play, the result is immediate. The lottery involves a draw at a fixed date and time: you buy your ticket in advance and wait for the result. Jackpots can reach substantial amounts (EuroMillions: up to €240M), but the probability of winning the main jackpot remains extremely low — approximately 1 in 140 million for EuroMillions.',
      "State lottery RTPs are among the lowest of any gambling product. The FDJ publishes an overall return rate of approximately 55% for Loto and EuroMillions (including all prizes and jackpot contributions). By comparison, a standard slot returns 94-96%, European roulette 97.3%. Offshore 'lottery betting' platforms sometimes offer slightly different payout structures — always check the published odds before playing.",
      'In France, only the FDJ is authorised by the ANJ to sell lottery games. Offshore platforms offering bets on foreign draws hold no French authorisation and operate outside the national legal framework. Players who access them do so at their own responsibility. For FDJ draws, FDJ.fr is the only legal platform in metropolitan France.',
    ],
  },
  {
    slug: 'jeux-a-gratter',
    label: 'Jeux à gratter',
    labelEn: 'Scratch Cards',
    description:
      "Les jeux à gratter en ligne reproduisent la mécanique des cartes à gratter physiques : gains instantanés, tableau des prix affiché, RTP publié par l'éditeur. Moins présents en ligne qu'en tabac-presse (où les Banco FDJ dominent), ils restent disponibles dans la majorité des casinos généralistes, avec des RTP supérieurs aux versions physiques.",
    descriptionEn:
      'Online scratch cards reproduce the mechanics of physical scratch cards: instant wins, displayed prize table, RTP published by the provider. Less prominent online than in physical retail (where FDJ Banco dominates), they remain available in most generalist casinos, with RTPs higher than their physical counterparts.',
    count: 'N/A',
    guideTitle:
      'Jeux à gratter en ligne : fonctionnement, RTP et différences avec les versions physiques',
    guideTitleEn: 'Online scratch cards: how they work, RTP and differences from physical versions',
    guideSummary:
      'Comprendre la mécanique des jeux à gratter en ligne, lire un tableau de gains et comparer les titres selon leur RTP.',
    guideSummaryEn:
      'Understand how online scratch cards work, read a prize table, and compare titles by RTP.',
    bestOperatorSlug: 'madnix',
    guideBody: [
      "Les jeux à gratter en ligne reproduisent le principe des cartes physiques : des zones cachées à révéler, une combinaison gagnante déterminée à l'avance par un générateur de nombres aléatoires certifié. Le résultat est fixé dès l'achat du ticket — l'animation de grattage est purement visuelle. Les éditeurs publient systématiquement le RTP et le tableau des prix, ce qui fait de ces jeux l'une des catégories les plus transparentes du casino en ligne.",
      "Le RTP des jeux à gratter en ligne se situe généralement entre 92 % et 97 %, selon le titre et l'éditeur — comparable à un slot classique. La volatilité est généralement faible à moyenne : gains fréquents mais modestes, avec quelques paliers supérieurs dans la table des prix. Des titres comme Piggy Riches Scratch (NetEnt, 95 %) ou Wish Upon a Jackpot (Blueprint, 95,33 %) illustrent la gamme disponible. Les prix maximaux varient de quelques centaines d'euros à plusieurs millions sur les scratch à jackpot progressif.",
      "Sur le seul critère du RTP, les scratch en ligne (≥ 92 %) affichent des taux supérieurs aux scratch FDJ (~64-65 %). À noter cependant que les scratch FDJ sont distribués légalement en France, ce qui n'est pas le cas des plateformes offshore.",
      "Les jeux à gratter conviennent aux joueurs qui recherchent un résultat immédiat sans courbe d'apprentissage. Ce n'est pas la catégorie avec la plus grande diversité de mécaniques, mais c'est l'une des plus simples et des plus transparentes : le tableau de gains est toujours affiché et le RTP est publié par l'éditeur, vérifiable avant d'acheter.",
    ],
    guideBodyEn: [
      'Online scratch cards reproduce the physical card principle: hidden areas to reveal, a winning combination pre-determined by a certified random number generator. The result is fixed from the moment the ticket is purchased — the scratching animation is purely visual. Publishers systematically publish the RTP and prize table, making these among the most transparent games at online casinos.',
      'Online scratch card RTP typically ranges from 92% to 97%, depending on the title and publisher — comparable to a standard slot. Volatility is generally low to medium: frequent but modest wins, with a few higher tiers in the prize table. Titles such as Piggy Riches Scratch (NetEnt, 95%) or Wish Upon a Jackpot (Blueprint, 95.33%) illustrate the range available. Maximum prizes range from a few hundred euros to several million on progressive jackpot scratch cards.',
      'On the RTP criterion alone, online scratch cards (≥ 92%) show higher rates than FDJ scratch cards (~64-65%). It should be noted, however, that FDJ scratch cards are sold legally in France, whereas offshore platforms are not.',
      'Scratch cards suit players who want an instant result with no learning curve. It is not the category with the widest variety of mechanics, but it is one of the simplest and most transparent: the prize table is always shown and the RTP is published by the provider, verifiable before purchase.',
    ],
  },
  {
    slug: 'provably-fair',
    label: 'Provably Fair',
    labelEn: 'Provably Fair',
    description:
      "Provably Fair n'est pas un type de jeu — c'est un mécanisme cryptographique qui permet à chaque joueur de vérifier mathématiquement l'équité d'un résultat après chaque tour. Développé à partir de 2012 et adopté par les casinos crypto depuis 2017, il repose sur un système de seeds client/serveur et un hash SHA-256 que tout joueur peut recalculer.",
    descriptionEn:
      'Provably Fair is not a game type — it is a cryptographic mechanism that allows each player to mathematically verify the fairness of a result after every round. Developed from 2012 and adopted by crypto casinos since 2017, it relies on a client/server seed system and a SHA-256 hash that any player can recalculate.',
    count: 'N/A',
    guideTitle: "Provably Fair : comment vérifier l'équité d'un casino crypto par vous-même",
    guideTitleEn: "Provably Fair: how to verify a crypto casino's fairness yourself",
    guideSummary:
      'Comprendre le mécanisme cryptographique Provably Fair, son fonctionnement par seeds et hash SHA-256, et comment le distinguer des audits tiers traditionnels.',
    guideSummaryEn:
      'Understand the Provably Fair cryptographic mechanism, how it works via seeds and SHA-256 hashing, and how to distinguish it from traditional third-party audits.',
    bestOperatorSlug: 'stake',
    guideBody: [
      "Le Provably Fair est un mécanisme cryptographique qui rend vérifiable l'équité de chaque résultat, indépendamment du casino. Avant chaque tour, le serveur génère un seed chiffré (server seed) et vous pouvez fournir votre propre seed (client seed). Le résultat du tour est une fonction déterministe de ces deux seeds. Après le tour, le serveur révèle le server seed original : vous pouvez alors recalculer le résultat et vérifier qu'il n'a pas été modifié. Aucune confiance aveugle n'est nécessaire — la vérification est mathématique et accessible à tout joueur.",
      "Le mécanisme repose sur une fonction de hachage cryptographique, SHA-256 pour la grande majorité des implémentations. Avant le tour, le casino publie le hash du server seed — une empreinte numérique irréversible qui prouve que le seed est fixé. Après le tour, le casino révèle le server seed en clair. Vous calculez hash(server seed) et vérifiez que le résultat correspond à l'empreinte publiée avant le tour. Si les deux correspondent, le server seed ne peut pas avoir été modifié. Les jeux conçus nativement pour ce mécanisme sont les jeux originaux des casinos crypto : Dice (dé paramétrable), Mines (grille de mines), Plinko, Limbo, Crash. Ces titres ont été développés spécifiquement pour le Provably Fair.",
      "Les casinos traditionnels font certifier leur RNG par des organismes tiers indépendants : eCOGRA, iTechLabs, GLI. Ces audits vérifient la conformité statistique d'un RNG sur un échantillon de tirages — mais chaque joueur individuel ne peut pas contrôler chaque résultat lui-même. Le Provably Fair déplace cette logique : la vérification est individuelle, instantanée, et ne nécessite aucun intermédiaire. C'est un passage de confiance envers un auditeur institutionnel à confiance envers un algorithme public et vérifiable. Ces deux approches coexistent : des casinos comme Stake et BC.Game cumulent le Provably Fair sur leurs jeux originaux et une certification eCOGRA sur leurs slots tiers.",
      "Pour vérifier un résultat, vous avez besoin du server seed révélé, du client seed, du nonce (compteur de tours) et d'un outil de vérification. La majorité des casinos crypto en proposent un intégré ; vous pouvez également utiliser un calculateur externe open source. Sur Stake ou BC.Game, chaque tour affiche un onglet « Verify » accessible depuis l'historique de jeu. La vérification prend moins d'une minute. Vous n'avez pas besoin de maîtriser la cryptographie pour utiliser ces outils — ils effectuent le calcul à votre place et affichent le résultat attendu.",
    ],
    guideBodyEn: [
      'Provably Fair is a cryptographic mechanism that makes the fairness of each game result verifiable, independently of the casino. Before each round, the server generates an encrypted seed (server seed) and you can provide your own seed (client seed). The round result is a deterministic function of these two seeds. After the round, the server reveals the original server seed — you can then recalculate the result and verify it was not altered. No blind trust is required: verification is mathematical and accessible to any player.',
      'The mechanism relies on a cryptographic hash function, SHA-256 for the vast majority of implementations. Before the round, the casino publishes the hash of the server seed — an irreversible digital fingerprint that proves the seed is fixed. After the round, the casino reveals the server seed in plain text. You compute hash(server seed) and verify that the result matches the fingerprint published before the round. If the two match, the server seed could not have been modified. The games natively designed for this mechanism are the original crypto casino games: Dice (configurable dice roll), Mines (mine grid), Plinko, Limbo, Crash. These titles were built specifically for Provably Fair.',
      "Traditional casinos have their RNG certified by independent third-party bodies: eCOGRA, iTechLabs, GLI. These audits verify a RNG's statistical compliance across a sample of draws — but individual players cannot check each result themselves. Provably Fair shifts this logic: verification is individual, instantaneous, and requires no intermediary. It moves trust from an institutional auditor to a public, verifiable algorithm. Both approaches coexist: casinos such as Stake and BC.Game combine Provably Fair on original games with eCOGRA certification on third-party slots.",
      'To verify a result, you need the revealed server seed, the client seed, the nonce (round counter) and a verification tool. Most crypto casinos provide one built-in; you can also use an open-source external calculator. On Stake or BC.Game, each round displays a "Verify" tab accessible from the game history. Verification takes under a minute. You do not need to master cryptography to use these tools — they perform the calculation and display the expected result for you.',
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
