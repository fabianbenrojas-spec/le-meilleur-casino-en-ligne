export interface FAQItem {
  question: string
  answer: string
}

export interface Game {
  slug: string
  name: string
  provider: string
  category: GameCategory
  rtp: number
  volatility: 'basse' | 'moyenne' | 'haute' | 'très haute'
  maxWin: string
  description: string
  features: string[]
  pros: string[]
  cons: string[]
  guideBody: string[]
  faq: FAQItem[]
  minBet: number
  maxBet: number
  popular?: boolean
  imageUrl?: string
  theme?: string
}

export type GameCategory =
  | 'machines-a-sous'
  | 'roulette'
  | 'blackjack'
  | 'live'
  | 'crash'
  | 'video-poker'
  | 'jackpots'

export interface Advantage {
  icon: string
  title: string
  text: string
}

export interface GameCategoryInfo {
  slug: GameCategory
  label: string
  labelEn: string
  description: string
  count: string
  guideTitle: string
  guideSummary: string
  advantages: Advantage[]
  guideBody: string[]
  faq: FAQItem[]
  relatedCategories: GameCategory[]
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
    advantages: [
      {
        icon: '📊',
        title: 'RTP certifié et transparent',
        text: 'Chaque slot affiche un RTP certifié par eCOGRA ou iTech Labs. Vous jouez avec des règles du jeu vérifiées par un tiers indépendant.',
      },
      {
        icon: '🎯',
        title: 'Volatilité au choix',
        text: 'Basse (gains fréquents, petits) ou très haute (gains rares, massifs) : choisissez la variance qui correspond à votre bankroll.',
      },
      {
        icon: '🎰',
        title: 'Fonctionnalités bonus uniques',
        text: "Tours gratuits, multiplicateurs jusqu'à 100×, cascades infinies, Megaways : chaque slot propose une mécanique originale.",
      },
      {
        icon: '💰',
        title: 'Mises pour tous budgets',
        text: "De 0,01 € à 500 € par spin. Les machines à sous s'adaptent à tous les profils, du joueur casual au high-roller.",
      },
    ],
    guideBody: [
      "Les machines à sous modernes sont des moteurs probabilistes sophistiqués, bien loin des 3 rouleaux mécaniques des origines. Le RTP (Return to Player) — rendu obligatoire par les régulateurs — représente le pourcentage théorique reversé aux joueurs sur plusieurs millions de parties. Un RTP de 96,51 % signifie que le casino conserve statistiquement 3,49 € sur chaque 100 € misés. Ce chiffre est calculé sur des millions de spins et ne garantit pas le résultat d'une session individuelle.",
      "La volatilité est le paramètre le plus crucial et le plus sous-estimé. Une slot à haute volatilité (Gates of Olympus, Book of Dead) peut aligner 200 à 300 tours sans payer significativement, puis déclencher un gain de 500× à 5 000× la mise. À l'inverse, une slot à basse volatilité verse des petits gains régulièrement — idéale pour prolonger une session avec une petite bankroll. Règle pratique : ne jamais miser plus de 1 à 2 % de votre bankroll de session sur un seul spin en haute volatilité.",
      "Les fonctionnalités bonus font la différence entre une slot basique et un jeu mémorable. Les tours gratuits (Free Spins) déclenchés par 3 à 5 Scatters sont la mécanique la plus répandue. Les multiplicateurs progressifs — caracteristiques de Sweet Bonanza (×100) et Gates of Olympus (×500) — peuvent transformer 1 € de gain en 100 € sur un seul tour. Le Bonus Buy, disponible dans la plupart des casinos, permet d'accéder directement au round bonus pour un coût fixe de 70× à 100× la mise de base — pratique pour les joueurs qui veulent l'action sans attendre les Scatters.",
    ],
    faq: [
      {
        question: "Comment fonctionne le RTP d'une machine à sous ?",
        answer:
          "Le RTP (Return to Player) est calculé sur des millions de spins par un RNG certifié. Un RTP de 96 % signifie que pour 1 000 € misés, 960 € sont redistribués en gains sur le très long terme. Ce chiffre est théorique : sur une session de 100 tours, votre résultat peut s'écarter très significativement de ce pourcentage, notamment en haute volatilité où la variance est extrême.",
      },
      {
        question: 'Quelle différence entre volatilité basse et haute ?',
        answer:
          "La volatilité basse verse des petits gains fréquents (toutes les 3 à 5 rotations environ) mais rarement plus de 10× la mise. La haute volatilité peut rester 'froide' pendant 200+ spins consécutifs, puis libérer un gain de 100× à 5 000×. Pour une bankroll de 50 €, préférez la basse volatilité. Pour chasser les big wins avec 200 €+, la haute volatilité est adaptée.",
      },
      {
        question: 'Le Bonus Buy est-il rentable ?',
        answer:
          "Le Bonus Buy coûte généralement 70× à 100× la mise et offre un RTP légèrement supérieur au jeu normal (souvent +0,5 à +1 %). Mathématiquement, la valeur attendue est équivalente. L'avantage est d'obtenir l'expérience du round bonus sans attendre les Scatters organiques. Attention : le Bonus Buy est désactivé sur certains casinos MGA et interdit dans quelques juridictions.",
      },
      {
        question: 'Peut-on jouer aux slots gratuitement ?',
        answer:
          "Oui, pratiquement tous les casinos en ligne proposent un mode démo utilisant un RNG identique mais sans mise réelle. C'est le meilleur moyen de tester la mécanique d'un jeu, d'observer la fréquence des bonus et d'évaluer la volatilité avant de jouer en argent réel. Certains casinos demandent une inscription, d'autres permettent l'accès direct en mode invité.",
      },
      {
        question: 'Comment choisir une slot selon mon budget ?',
        answer:
          'Budget 20 € : misez 0,20 €/spin sur basse volatilité (Starburst, Aloha). Budget 100 € : 0,50 €-1 €/spin sur volatilité moyenne. Budget 300 €+ : 1 €-3 €/spin sur haute volatilité (Book of Dead, Gates of Olympus). La règle des 200 spins : votre bankroll doit vous permettre au moins 200 spins sans gain pour survivre à une mauvaise passe en haute volatilité.',
      },
    ],
    relatedCategories: ['jackpots', 'crash', 'video-poker', 'live'],
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
    advantages: [
      {
        icon: '📐',
        title: 'Avantage maison minimal',
        text: "Roulette européenne : 2,7 %. Avec La Partage (roulette française) : 1,35 % sur les chances simples — l'un des meilleurs ratios de tout le casino.",
      },
      {
        icon: '🎲',
        title: 'Probabilités transparentes',
        text: 'Toutes les chances et cotes sont fixes et connues. Aucune stratégie cachée, aucune variation de RTP — la roulette est mathématiquement honnête.',
      },
      {
        icon: '📺',
        title: 'Tables live HD 24h/24',
        text: "Lightning Roulette, Immersive Roulette, roulette française live : jouez avec de vrais croupiers en streaming 4K depuis n'importe où.",
      },
      {
        icon: '📊',
        title: 'Systèmes de mise éprouvés',
        text: "Martingale, Fibonacci, D'Alembert, Labouchère : des dizaines de systèmes de gestion de bankroll à appliquer selon votre tolérance au risque.",
      },
    ],
    guideBody: [
      "La roulette est l'un des jeux les plus anciens du casino, mais la version en ligne offre des avantages que les tables physiques ne peuvent pas égaler. La roulette européenne — avec sa seule case zéro — affiche un avantage maison de 2,7 %, contre 5,26 % pour la version américaine à double zéro. Ce choix seul double l'espérance de jeu du joueur. La roulette française avec la règle 'La Partage' (récupération de la moitié de la mise sur les chances simples en cas de zéro) réduit encore l'avantage à 1,35 % — l'un des meilleurs du casino après le blackjack avec stratégie de base.",
      "Les stratégies de roulette les plus connues — Martingale, Fibonacci, D'Alembert — sont des systèmes de progression de mise, pas des garanties de gain. La Martingale (doubler la mise après chaque perte) est mathématiquement neutre sur le long terme mais expose au risque de dépasser les limites de table. La roulette en ligne offre des tables à limites très larges (0,10 € à 10 000 €) qui permettent d'appliquer ces systèmes plus longtemps qu'en casino physique.",
      "La révolution de la roulette en ligne est venue des tables live d'Evolution Gaming. Lightning Roulette, lancée en 2018, est devenue la table live la plus jouée au monde en ajoutant des multiplicateurs aléatoires (50× à 500×) sur 1 à 5 numéros à chaque tour. Cette variante hybride combine la roulette européenne classique (RTP 97,3 %) avec des gains massifs sur les numéros plein. Immersive Roulette avec ses 8 caméras HD et ses ralentis offre une expérience visuelle inégalée.",
    ],
    faq: [
      {
        question: 'Quelle variante de roulette choisir ?',
        answer:
          "Priorité absolue : roulette européenne (1 zéro, avantage maison 2,7 %) sur la version américaine (2 zéros, 5,26 %). Si disponible, optez pour la roulette française avec 'La Partage' (avantage maison 1,35 % sur les chances simples). Pour l'expérience, Lightning Roulette (Evolution) offre des multiplicateurs jusqu'à 500× en conservant un RTP de 97,3 %. Évitez les 'variantes maison' sans historique certifié.",
      },
      {
        question: 'La stratégie Martingale fonctionne-t-elle vraiment ?',
        answer:
          "La Martingale est mathématiquement neutre sur le long terme : elle ne modifie pas l'avantage maison. Elle est efficace à court terme sur des petites sessions, mais expose à des pertes catastrophiques en cas de longue série défavorable. Exemple : après 8 pertes consécutives en démarrant à 1 €, la mise requise atteint 256 € pour récupérer ses pertes. Les limites de table bloquent cette progression dans tous les casinos.",
      },
      {
        question: 'Quelle est la probabilité de gagner sur un numéro plein ?',
        answer:
          "Un numéro plein rapporte 35× la mise en cas de succès. La probabilité de gagner est 1/37 (2,70 %) en roulette européenne. L'espérance mathématique est de -0,027 par euro misé, soit -2,7 %. Sur les chances simples (rouge/noir, pair/impair), la probabilité est 18/37 (48,65 %) avec un retour de 1×.",
      },
      {
        question: 'Les tables de roulette live sont-elles truquées ?',
        answer:
          "Non, les tables live d'Evolution Gaming, Pragmatic Play et d'autres fournisseurs certifiés sont auditées par des organismes indépendants (GLI, eCOGRA) qui vérifient la distribution statistique des résultats sur des millions de tours. Les résultats de chaque tour sont affichés en temps réel avec l'historique complet. Les régulateurs (MGA, UKGC) imposent ces certifications comme condition d'exploitation.",
      },
      {
        question: 'Peut-on compter les tours à la roulette comme au blackjack ?',
        answer:
          "Non. Contrairement au blackjack où les cartes déjà jouées influencent les probabilités futures, chaque tour de roulette est un événement indépendant. La bille n'a aucune mémoire. Les 'séries' ou 'tendances' observées (5 rouges consécutifs) sont des coïncidences statistiques normales et ne préjugent pas du tour suivant. C'est le 'biais du joueur' — l'une des illusions cognitives les plus répandues au casino.",
      },
    ],
    relatedCategories: ['blackjack', 'live', 'video-poker', 'machines-a-sous'],
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
    advantages: [
      {
        icon: '🧠',
        title: 'Stratégie = avantage',
        text: "Avec la stratégie de base (mémorisable en 1h), l'avantage maison tombe à 0,5 %. Le joueur influence réellement le résultat.",
      },
      {
        icon: '📈',
        title: 'RTP parmi les plus hauts',
        text: "Jusqu'à 99,65 % avec stratégie optimale (Blackjack classique Microgaming). Aucun autre jeu de casino ne rivalise.",
      },
      {
        icon: '♠️',
        title: 'Dizaines de variantes',
        text: 'Blackjack classique, Infinite Blackjack, Spanish 21, Double Exposure, Pontoon... Chaque variante offre des règles uniques.',
      },
      {
        icon: '🎥',
        title: 'Tables live exclusives',
        text: 'Evolution, Pragmatic, Playtech : tables live avec limites de 0,50 € à 25 000 €. Tournois de blackjack live en temps réel.',
      },
    ],
    guideBody: [
      "Le blackjack est mathématiquement le jeu de casino le plus favorable au joueur qui maîtrise la stratégie de base. Avec un avantage maison de seulement 0,5 % et un RTP théorique de 99,5 %, un joueur utilisant la stratégie de base correctement perd statistiquement moins de 1 € pour 200 € misés. C'est une différence abyssale avec les machines à sous (3 à 4 % d'avantage maison) ou la roulette américaine (5,26 %).",
      "La stratégie de base est un tableau de décision mathématiquement optimal basé sur votre main et la carte visible du croupier. Elle dicte quand tirer (hit), rester (stand), doubler (double down) ou diviser (split) dans chaque situation. Apprise en 1 à 2 heures, elle peut être utilisée discrètement dans les casinos en ligne. En ligne, rien ne vous empêche d'avoir le tableau de stratégie ouvert sur un second écran pendant que vous jouez.",
      "Les variantes de blackjack live offrent des expériences supplémentaires. Infinite Blackjack d'Evolution résout le problème des tables saturées : un nombre illimité de joueurs partagent la même main de départ, chacun prenant ses décisions de façon indépendante. Speed Blackjack impose un délai de décision de 15 secondes. Free Bet Blackjack offre des doubles et splits gratuits sur certaines mains. Chaque variante a son propre avantage maison — certaines sont plus favorables au joueur que d'autres.",
    ],
    faq: [
      {
        question: 'Comment apprendre la stratégie de base rapidement ?',
        answer:
          "La stratégie de base se mémorise en 2 étapes. D'abord les règles simples : toujours splitter les As et les 8 ; jamais splitter les 10 et les 5 ; toujours doubler sur 11. Ensuite, le tableau complet (disponible gratuitement sur Wizard of Odds) couvre chaque combinaison possible. Pratiquez en mode démo pendant 2-3 heures pour automatiser les réflexes. En ligne, vous pouvez garder le tableau ouvert — c'est 100 % légal.",
      },
      {
        question: 'Quelle variante de blackjack a le meilleur RTP ?',
        answer:
          "Le Blackjack Classique de Microgaming (règles Vegas Strip) offre le RTP le plus élevé : 99,65 % avec stratégie parfaite. Infinite Blackjack d'Evolution est à 99,51 %. Les variantes avec side bets (Perfect Pairs, 21+3) ont des avantages maison beaucoup plus élevés sur ces paris annexes (2 à 8 %) — à éviter.",
      },
      {
        question: 'Peut-on compter les cartes en ligne ?',
        answer:
          "Le comptage de cartes est théoriquement possible sur certaines tables live qui jouent avec peu de jeux et dévoilent le 'cut'. En pratique, les casinos en ligne utilisent des sabots de 6 à 8 jeux mélangés après chaque coup (RNG) ou remélangent fréquemment sur les tables live. Le comptage est inefficace en blackjack RNG et très difficile en live. Les casinos peuvent interdire les joueurs suspectés de compter.",
      },
      {
        question: 'Quelle est la différence entre blackjack live et RNG ?',
        answer:
          "Le blackjack RNG utilise un générateur de nombres aléatoires et simule la distribution des cartes. Il est plus rapide (10-20 mains/minute) et disponible dès 0,50 €. Le blackjack live utilise de vrais croupiers, de vraies cartes et offre une expérience authentique — mais est plus lent (3-5 mains/minute) et commence généralement à 1 €-5 €. Pour apprendre, le RNG est idéal. Pour l'expérience, le live est incomparable.",
      },
      {
        question: 'Les side bets au blackjack sont-ils rentables ?',
        answer:
          "Non. Les side bets (Perfect Pairs, 21+3, Lucky Lucky, Royal Match) ont des avantages maison de 2 % à 8 %, contre 0,5 % pour le jeu de base. Ils sont conçus pour augmenter les revenus du casino, pas pour améliorer l'espérance du joueur. La seule exception notable est le side bet 'Insurance' que les compteurs de cartes peuvent exploiter — mais uniquement avec un comptage de cartes précis.",
      },
    ],
    relatedCategories: ['live', 'roulette', 'video-poker', 'machines-a-sous'],
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
    advantages: [
      {
        icon: '🎥',
        title: 'Croupiers réels en HD',
        text: 'Streamé depuis des studios professionnels ou de vrais casinos terrestres. Des dizaines de tables disponibles 24h/24.',
      },
      {
        icon: '💬',
        title: 'Interaction et ambiance',
        text: 'Chat en temps réel avec le croupier et les autres joueurs. Tables francophones disponibles dans la plupart des casinos.',
      },
      {
        icon: '🎮',
        title: 'Game shows exclusifs',
        text: 'Crazy Time, Monopoly Live, Deal or No Deal : des formats inédits qui mêlent jeux télévisés et mécanique de casino.',
      },
      {
        icon: '🔒',
        title: 'Transparence totale',
        text: 'Chaque carte, chaque tour de roue est filmé sous plusieurs angles. Historique des résultats affiché en temps réel.',
      },
    ],
    guideBody: [
      "Le casino live a révolutionné le jeu en ligne en apportant l'authenticité du casino physique sur n'importe quel écran. Evolution Gaming — leader incontesté avec plus de 700 tables en direct — distribue ses jeux depuis des studios ultramodernes à Riga, Malte et Tbilissi, ainsi que depuis plusieurs casinos terrestres à travers le monde. La qualité de streaming (jusqu'en 4K sur certaines tables), le professionnalisme des croupiers et la richesse des options de jeu ont défini les standards de l'industrie.",
      "Les game shows live sont la grande innovation des dernières années. Crazy Time, lancé par Evolution en 2019, est devenu le jeu live le plus regardé au monde : une roue géante, 4 bonus games interactifs et des multiplicateurs jusqu'à 20 000×. Monopoly Live, Lightning Roulette, Deal or No Deal Live — chaque format hybride mêle l'excitation d'un jeu télévisé aux mécaniques de casino. Ces jeux attirent un public bien au-delà des joueurs de casino traditionnels.",
      "Pour les joueurs francophones, plusieurs casinos proposent des tables en langue française avec des croupiers francophones — notamment pour la roulette française et certaines tables de blackjack. La mise minimum varie de 0,10 € (Crazy Time, Lightning Dice) à 5 000 € sur les tables VIP d'Infinite Blackjack. Les heures d'affluence (18h-24h heure française) peuvent voir certaines tables se remplir — les casinos en ligne disposent généralement d'une dizaine de tables identiques en parallèle.",
    ],
    faq: [
      {
        question: 'Quelle est la différence entre Evolution Gaming et Pragmatic Play Live ?',
        answer:
          "Evolution Gaming est le leader mondial avec les jeux les plus innovants (Crazy Time, Lightning Roulette, Infinite Blackjack) et les meilleures qualités de streaming. Pragmatic Play Live a rattrapé son retard avec ses propres versions de roulette et blackjack live, plus abordables pour les petits casinos. Pour l'expérience premium, Evolution est inégalé. Pragmatic offre une bonne alternative sur les casinos qui n'ont pas le budget pour Evolution.",
      },
      {
        question: 'Y a-t-il des tables live francophones ?',
        answer:
          'Oui, plusieurs casinos proposent des tables avec croupiers francophones : Wild Sultan, Cresus et N1 Casino ont des tables de roulette et blackjack en français. Les tables Evolution sont généralement en anglais, mais certaines tables de roulette proposent des croupiers français sur demande. La plupart des jeux live ont une interface entièrement traduite en français même si le croupier parle anglais.',
      },
      {
        question: 'Puis-je jouer au casino live sur mobile ?',
        answer:
          "Oui, toutes les tables live d'Evolution et Pragmatic sont optimisées mobile. L'expérience est excellente sur smartphones récents avec une connexion 4G/WiFi stable. Certains jeux comme Crazy Time sont même plus faciles à suivre sur mobile grâce à leur interface simplifiée. La latence de streaming est généralement inférieure à 300 ms, suffisante pour une expérience fluide.",
      },
      {
        question: "Les bonus s'appliquent-ils aux jeux live ?",
        answer:
          "C'est le point noir des tables live : la plupart des casinos excluent les jeux live de la contribution au wager des bonus (ou l'appliquent à seulement 5-10 %). Cela signifie que vous ne pouvez généralement pas utiliser l'argent bonus sur les tables live. Vérifiez toujours les conditions du bonus avant de miser. Certains casinos proposent des bonus spécifiques aux tables live (cashback live, bonus live weekend).",
      },
      {
        question: 'Quelles sont les limites de mise en live ?',
        answer:
          'Les limites varient énormément selon les tables et les casinos. Roulette live : 0,10 € à 10 000 € par mise. Blackjack live standard : 0,50 € à 2 500 €. Tables VIP : 10 € à 100 000 € par main. Game shows (Crazy Time, Monopoly Live) : 0,10 € à 1 000 €. Les tables high-roller nécessitent souvent un statut VIP ou un dépôt minimum élevé.',
      },
    ],
    relatedCategories: ['blackjack', 'roulette', 'machines-a-sous', 'crash'],
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
    advantages: [
      {
        icon: '⚡',
        title: 'Parties ultra-rapides',
        text: 'Un round dure 10 à 30 secondes. Le ratio action/temps est sans équivalent dans le casino traditionnel.',
      },
      {
        icon: '🔢',
        title: 'RTP parmi les plus hauts',
        text: "Aviator : 97 %. Plinko : jusqu'à 99 %. Les crash games ont des avantages maison souvent inférieurs aux slots classiques.",
      },
      {
        icon: '👥',
        title: 'Multijoueur en temps réel',
        text: 'Voyez les mises et les cash-outs des autres joueurs en direct. Une dimension sociale absente des jeux solo.',
      },
      {
        icon: '🎛️',
        title: 'Contrôle total du risque',
        text: 'Auto cash-out, double mise, stop-loss automatique : des options de gestion du risque que les slots ne proposent pas.',
      },
    ],
    guideBody: [
      "Les crash games sont nés dans les casinos crypto vers 2015 et ont explosé en popularité avec Aviator de Spribe en 2019. Le principe est universel : un multiplicateur part de 1× et monte de façon exponentielle jusqu'à ce qu'il 'crash' à un moment aléatoire. Le joueur doit retirer avant le crash pour encaisser son gain. La tension entre greed (attendre un multiplicateur plus élevé) et fear (retirer avant de tout perdre) crée une expérience psychologique unique.",
      "La mécanique provably fair — disponible sur Aviator et la plupart des crash games — permet à chaque joueur de vérifier cryptographiquement que le résultat n'a pas été manipulé. Le point de crash est déterminé avant le début de la partie par une combinaison du seed du serveur et du seed du client. Cette transparence algorithmique est impossible à reproduire avec un dé ou une roue physique. C'est l'une des innovations fondamentales des casinos crypto que les plateformes traditionnelles ont adoptée.",
      "Mines est la variante la plus stratégique des crash games : une grille de 25 cases contient des mines (nombre configurable de 1 à 24). Chaque case retournée sans mine augmente le multiplicateur, mais une mine fait tout perdre. Le joueur choisit le nombre de mines — plus il y en a, plus les gains potentiels sont élevés, plus le risque est grand. Plinko, inspiré du jeu télévisé américain, est l'un des crash games au RTP le plus élevé : jusqu'à 99 % sur les paramètres de risque bas.",
    ],
    faq: [
      {
        question: 'Comment fonctionne le Provably Fair dans Aviator ?',
        answer:
          "Avant chaque round, le serveur génère un seed chiffré et le partage avec les joueurs. Après la partie, chacun peut vérifier mathématiquement que le point de crash est bien le résultat de la combinaison seed serveur + seed client + nonce (numéro de round), sans manipulation possible. Cette vérification est disponible directement dans l'interface d'Aviator sous 'Fairness'. C'est le niveau de transparence le plus élevé possible dans le jeu en ligne.",
      },
      {
        question: 'Quelle stratégie pour Aviator ?',
        answer:
          "La stratégie la plus commune est le double-solde : deux mises simultanées, la première avec auto cash-out à 1,5× (récupère la mise avec 50 % de profit), la seconde laissée courir pour les gros multiplicateurs. Une autre approche : l'auto cash-out à 2× sur 100 % de la bankroll — mathématiquement, vous gagnez environ 1 fois sur 2. Aucune stratégie ne modifie le RTP de 97 % sur le long terme, mais elles influencent la gestion du risque.",
      },
      {
        question: 'Les crash games sont-ils vraiment aléatoires ?',
        answer:
          "Oui, pour les jeux Provably Fair vérifiables (Aviator, BC.Game Crash). Pour les crash games non-provably-fair, vous dépendez de la certification RNG du fournisseur (eCOGRA, GLI). Méfiez-vous des crash games sans audit RNG visible. L'avantage du Provably Fair est que vous n'avez pas à faire confiance au casino — vous pouvez vérifier chaque résultat vous-même.",
      },
      {
        question: 'Quelle est la différence entre Aviator et Plinko ?',
        answer:
          "Aviator est un jeu de timing : vous retirez quand vous le décidez, avec une tension maximale. Plinko est un jeu de grille probabiliste où une bille tombe de case en case — vous choisissez le niveau de risque mais pas le moment de retrait. Aviator offre plus de contrôle apparent (et psychologiquement plus engageant). Plinko a un RTP potentiellement plus élevé mais moins d'interactivité. Mines combine les deux : stratégie de sélection + gestion du risque.",
      },
    ],
    relatedCategories: ['machines-a-sous', 'live', 'video-poker', 'jackpots'],
  },
  {
    slug: 'video-poker',
    label: 'Vidéo Poker',
    labelEn: 'Video Poker',
    description:
      "Le vidéo poker combine stratégie et machine à sous : des RTP parmi les plus élevés du casino (jusqu'à 99,54 %) avec la bonne stratégie. Jacks or Better, Deuces Wild, Double Double Bonus.",
    count: '48',
    guideTitle: 'Vidéo poker en ligne : stratégie & meilleures variantes',
    guideSummary: 'Jacks or Better, Deuces Wild — comment jouer avec la stratégie optimale.',
    advantages: [
      {
        icon: '🃏',
        title: "RTP jusqu'à 99,73 %",
        text: 'Deuces Wild avec stratégie parfaite atteint 99,73 % — le RTP le plus élevé de tout jeu de casino hors poker à jackpot.',
      },
      {
        icon: '🧠',
        title: 'La stratégie fait la différence',
        text: 'Contrairement aux slots, vos décisions impactent directement le résultat. Maîtriser la stratégie optimale se traduit en euros.',
      },
      {
        icon: '⏱️',
        title: 'Rythme à votre convenance',
        text: 'Pas de pression de temps, pas de croupier qui attend. Prenez le temps de consulter la grille de stratégie à chaque main.',
      },
      {
        icon: '🎯',
        title: 'Tables de paiement transparentes',
        text: 'Chaque combinaison et son paiement sont affichés avant de jouer. Comparez les tables de paiement pour maximiser le RTP.',
      },
    ],
    guideBody: [
      "Le vidéo poker est l'un des secrets les mieux gardés du casino en ligne : des RTP atteignant 99,54 % (Jacks or Better) à 99,73 % (Deuces Wild) avec la stratégie optimale, un format solitaire sans pression sociale, et une mécanique qui récompense réellement la compétence. Ces chiffres supposent une stratégie parfaite — mais même une stratégie approximative donne un RTP de 97 à 98 %, supérieur à la quasi-totalité des machines à sous.",
      "La stratégie de Jacks or Better est la plus facile à apprendre. Elle se résume à une grille de priorités : Royal Flush et Straight Flush en premier, puis les quatre d'une sorte, puis la Full House, etc. Jusqu'aux situations ambiguës comme 'garder une paire de Valets ou tenter une couleur' (réponse : garder la paire). La règle la plus importante : ne jamais casser une main déjà gagnante (paire ou plus) pour chasser un straight ou une couleur — sauf pour les mains quasi-complètes (4 cartes d'un Royal Flush).",
      "Les variantes de vidéo poker multiplient les stratégies et les RTP. Deuces Wild transforme tous les 2 en jokers — les combinaisons gagnantes commencent à trois d'une sorte, et un Royal Flush naturel rapporte 800×. Double Double Bonus ajoute des multiplicateurs sur certaines combinaisons de quads. Chaque variante a sa propre grille de stratégie optimale — elles sont incompatibles entre elles. Commencez par Jacks or Better pour apprendre les bases avant de passer aux variantes plus complexes.",
    ],
    faq: [
      {
        question: 'Quelle variante de vidéo poker choisir pour débuter ?',
        answer:
          "Jacks or Better est la variante idéale pour débuter : règles simples (paiement à partir d'une paire de valets), stratégie la plus facile à apprendre, RTP de 99,54 % avec stratégie parfaite. Les tables de paiement 9/6 (9 pour une Full House, 6 pour une Couleur) sont les plus favorables — repérez-les avant de jouer. Évitez les variantes progressives ou les multi-hand au début.",
      },
      {
        question: 'Où trouver la stratégie optimale pour Jacks or Better ?',
        answer:
          "La stratégie complète est disponible gratuitement sur Wizard of Odds (wizardofodds.com). En ligne, vous pouvez garder la grille de stratégie ouverte dans un autre onglet pendant que vous jouez — c'est parfaitement légal et recommandé. Des applications mobiles de vidéo poker entraînent aussi la stratégie en mode démo. Comptez 2 à 3 heures de pratique pour automatiser les décisions les plus fréquentes.",
      },
      {
        question: "Qu'est-ce qu'une table de paiement 9/6 ?",
        answer:
          "La table de paiement d'un vidéo poker indique le multiplicateur pour chaque combinaison. '9/6' signifie que la Full House paie 9× la mise et la Couleur 6×. Comparez : une table 8/5 (Full House 8×, Couleur 5×) a un RTP de 97,3 % contre 99,54 % pour le 9/6. La différence de 2 points de RTP est énorme sur le long terme. Cherchez toujours les tables 9/6 ou mieux avant de jouer.",
      },
      {
        question: 'Le vidéo poker en mode 5 mains (multi-hand) est-il recommandé ?',
        answer:
          "Le multi-hand (3, 5, 10 ou 100 mains simultanées) augmente la variance et accélère la consommation de bankroll — pas le RTP, qui reste identique. L'avantage est psychologique : plus d'action, plus de Royal Flush potentiels par heure. L'inconvénient : les mauvaises sessions sont plus douloureuses. Pour les débutants, le single-hand est recommandé pour pratiquer la stratégie sans stress. Le multi-hand s'adresse aux joueurs avec une bankroll solide et la stratégie parfaitement maîtrisée.",
      },
    ],
    relatedCategories: ['blackjack', 'machines-a-sous', 'roulette', 'crash'],
  },
  {
    slug: 'jackpots',
    label: 'Jackpots Progressifs',
    labelEn: 'Progressive Jackpots',
    description:
      "Les jackpots progressifs accumulent une partie de chaque mise pour créer des cagnottes qui peuvent dépasser plusieurs millions d'euros. Mega Moolah, Mega Fortune, Divine Fortune.",
    count: '94',
    guideTitle: 'Jackpots progressifs : comment ça marche et comment gagner ?',
    guideSummary: "Cagnottes en temps réel, RTP, chances de gagner — tout ce qu'il faut savoir.",
    advantages: [
      {
        icon: '🏆',
        title: 'Jackpots de plusieurs millions',
        text: "Mega Moolah détient le record mondial à 21,7 M€. Ces jackpots peuvent être déclenchés sur n'importe quelle mise, même 0,25 €.",
      },
      {
        icon: '🔗',
        title: 'Réseau de casinos connectés',
        text: 'Les jackpots progressifs sont alimentés par tous les joueurs de tous les casinos connectés au réseau — ce qui fait grossir les cagnottes à vitesse exponentielle.',
      },
      {
        icon: '🎲',
        title: 'Chance équitable',
        text: "Le jackpot peut être déclenché par n'importe quel joueur, sur n'importe quelle mise. Aucune avance ne favorise les high-rollers.",
      },
      {
        icon: '📊',
        title: 'RTP qui augmente avec le jackpot',
        text: 'Plus le jackpot est élevé par rapport à sa valeur de départ (seed), plus le RTP effectif est favorable au joueur.',
      },
    ],
    guideBody: [
      "Les jackpots progressifs fonctionnent grâce à un réseau de machines connectées qui contribuent chacune une fraction de chaque mise (généralement 1 à 3 %) à une cagnotte commune. Mega Moolah de Microgaming, alimenté par des milliers de casinos dans le monde, a versé le plus grand jackpot de l'histoire du jeu en ligne : 21,7 millions d'euros à un joueur canadien en 2023. La fréquence de déclenchement varie selon la machine — Mega Moolah se déclenche en moyenne tous les 9-14 semaines.",
      "Le RTP affiché des jackpots progressifs — souvent 88 à 92 % pour Mega Moolah — semble faible. Mais ce chiffre intègre la contribution au jackpot : le RTP hors jackpot est d'environ 95 %, et la contribution jackpot de 7 % représente un espoir de gain potentiellement infini. Plus le jackpot est élevé au-dessus de sa valeur de seed (valeur minimale garantie), plus le RTP effectif est favorable. Un jackpot Mega Moolah au-dessus de 5 M€ a un RTP effectif supérieur à 95 %.",
      "Divine Fortune de NetEnt est un exemple de jackpot progressif à RTP élevé : 96,59 % même en incluant la contribution jackpot. Ses 3 niveaux (Minor, Major, Mega) offrent des gains plus fréquents que Mega Moolah, même si les montants maximaux sont moins spectaculaires. Pour les joueurs qui veulent l'expérience jackpot sans sacrifier complètement le RTP, les jackpots à 3 niveaux avec un Mega jackpot de 50 000 € à 500 000 € sont un bon compromis entre fréquence et montant.",
    ],
    faq: [
      {
        question: 'Comment est déclenché un jackpot progressif ?',
        answer:
          "La plupart des jackpots progressifs (Mega Moolah, Mega Fortune) utilisent une 'roue de jackpot' déclenchée aléatoirement pendant le jeu normal — indépendamment du résultat des rouleaux. La probabilité de déclencher la roue augmente légèrement avec la taille de la mise. Sur la roue, 4 sections (Mini, Minor, Major, Mega) ont des probabilités différentes. Le Mega jackpot peut être déclenché sur une mise de 0,25 € comme sur 6,25 €.",
      },
      {
        question: 'Quelle est la probabilité de gagner le jackpot Mega Moolah ?',
        answer:
          "La probabilité exacte n'est pas publiée par Microgaming, mais les analyses statistiques sur des millions de spins estiment la fréquence de déclenchement du Mega jackpot à environ 1 chance sur 50 000 000 de spins. Compte tenu du nombre de joueurs actifs sur le réseau, cela se traduit par un jackpot versé tous les 9 à 14 semaines en moyenne. Votre probabilité individuelle lors d'une session est statistiquement similaire à celle de gagner à la loterie nationale.",
      },
      {
        question: 'Dois-je miser le maximum pour gagner le jackpot ?',
        answer:
          "Non pour Mega Moolah et la plupart des jackpots modernes — la roue de jackpot peut être déclenchée sur n'importe quelle mise. Cependant, certains jackpots (notamment les anciens modèles) réservent le jackpot maximum aux joueurs ayant misé le maximum. Vérifiez toujours les conditions spécifiques dans les règles du jeu. Pour Mega Fortune de NetEnt, la mise minimum recommandée est souvent 0,50 € pour activer toutes les lignes du jackpot.",
      },
      {
        question: 'Les jackpots progressifs reviennent-ils plus souvent après un long silence ?',
        answer:
          "Non. Chaque spin est indépendant — le jackpot n'est pas 'dû' après 6 mois sans déclenchement. C'est le même biais du joueur qu'à la roulette. Ce qui est vrai, c'est que plus le jackpot est élevé (signe qu'il n'a pas été déclenché depuis longtemps), plus le RTP effectif est favorable au joueur. Jouer quand le jackpot est historiquement élevé est donc rationnel — pas parce qu'il est 'dû', mais parce que la valeur de chaque mise est statistiquement plus élevée.",
      },
    ],
    relatedCategories: ['machines-a-sous', 'crash', 'live', 'video-poker'],
  },
]

export const games: Game[] = [
  {
    slug: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'machines-a-sous',
    imageUrl: '/jeux/sweet-bonanza.png',
    theme: 'Bonbons & fruits',
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
    pros: [
      'RTP 96,51 % — parmi les meilleurs de Pragmatic Play',
      'Max Win spectaculaire : 21 100× la mise',
      'Mécanisme de cascade créant des combos enchaînés',
      'Mode démo disponible dans tous les casinos',
    ],
    cons: [
      'Haute volatilité : longues sessions sans gain significatif possibles',
      'Bonus Buy coûteux (100× la mise)',
      'Le max win de 21 100× nécessite des multiplicateurs cumulés rares',
    ],
    guideBody: [
      "Sweet Bonanza de Pragmatic Play est l'une des slots les plus populaires d'Europe, et sa mécanique 'Pays Anywhere' (les combinaisons gagnantes ne suivent pas de lignes fixes — 8 symboles identiques n'importe où sur la grille suffisent) la distingue des slots classiques. La grille 6×5 produit des cascades : les symboles gagnants disparaissent et sont remplacés par de nouveaux tombant du dessus, permettant des gains enchaînés sur un seul spin.",
      "Le round de Free Spins est le cœur du jeu. Déclenché par 4, 5 ou 6 symboles Scatter lollipop (qui paient eux-mêmes 2× à 100× la mise), il démarre avec 10 tours gratuits et distribue des multiplicateurs aléatoires de 2× à 100× sur les symboles sucrés. Ces multiplicateurs s'additionnent (deux ×25 font ×50) et peuvent transformer un gain ordinaire en un gain de plusieurs milliers de fois la mise. Le record vérifié sur Sweet Bonanza est de 21 100× la mise.",
      "La stratégie recommandée pour Sweet Bonanza est de jouer avec une mise qui vous permet au moins 200 spins sans gain de Free Spins. Avec une bankroll de 100 €, misez 0,40 €-0,50 € par spin. Le Bonus Buy à 100× la mise (50 € pour une mise de 0,50 €) est attractif si vous voulez l'action directement — son RTP est légèrement supérieur au jeu normal.",
    ],
    faq: [
      {
        question: 'Quelle est la fréquence des Free Spins sur Sweet Bonanza ?',
        answer:
          'Les 4+ Scatters apparaissent statistiquement tous les 100 à 150 spins en jeu normal. La fréquence exacte dépend du RNG et de la variance — il est possible de ne pas déclencher les Free Spins pendant 300 spins consécutifs ou de les déclencher 3 fois en 50 spins. La haute volatilité du jeu implique une grande variabilité autour de cette moyenne.',
      },
      {
        question: 'Le Bonus Buy sur Sweet Bonanza est-il rentable ?',
        answer:
          "Le Bonus Buy coûte 100× la mise et offre directement le round de Free Spins. Son RTP est de 97,3 %, légèrement supérieur aux 96,51 % du jeu normal. Mathématiquement, la valeur attendue est équivalente sur le long terme. L'avantage est de l'expérience intensive : chaque euro investi en Bonus Buy se traduit par un round de Free Spins immédiat.",
      },
      {
        question: 'Sweet Bonanza 1000 est-il différent ?',
        answer:
          'Sweet Bonanza 1000 est une version haute variance de la même mécanique avec un Max Win porté à 25 000× et des multiplicateurs pouvant atteindre 1 000×. Le RTP est identique (96,51 %) mais la volatilité est encore plus extrême. Recommandé uniquement aux joueurs expérimentés avec une bankroll solide et une tolérance au risque élevée.',
      },
      {
        question: 'Dans quels casinos peut-on jouer à Sweet Bonanza ?',
        answer:
          "Sweet Bonanza est disponible dans la quasi-totalité des casinos en ligne proposant Pragmatic Play — soit la majorité des casinos référencés sur ce site. Certains casinos proposent Sweet Bonanza dans leurs bonus de tours gratuits sans dépôt. Vérifiez les conditions du bonus (mise et valeur par tour) avant d'utiliser des tours gratuits sur ce jeu.",
      },
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
    imageUrl: '/jeux/gates-of-olympus.png',
    theme: 'Mythologie grecque',
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
    pros: [
      'Très haute volatilité pour les chasseurs de big wins',
      "Multiplicateurs qui s'accumulent pendant les Free Spins",
      'Symboles Zeus déclenchant des multiplicateurs aléatoires',
      'Version 1000 disponible pour les high-rollers',
    ],
    cons: [
      'Très haute volatilité : risque élevé de sessions sans gain',
      'Max Win de 5 000× inférieur à certains concurrents',
      'Peut être frustrant sans Bonus Buy avec une petite bankroll',
    ],
    guideBody: [
      "Gates of Olympus incarne le segment ultra-haute-volatilité des slots modernes. La mécanique Zeus — des symboles dorés à l'effigie du dieu grec qui apparaissent aléatoirement pour distribuer des multiplicateurs additifs à toute la grille — peut transformer une combinaison ordinaire en un gain de centaines de fois la mise. Ces multiplicateurs s'accumulent : trois Zeus de ×5, ×10 et ×15 donnent un multiplicateur global de ×30.",
      "Le round de Free Spins (déclenché par 4+ Scatters) est la zone de gains massifs. Pendant les 15 tours gratuits, les multiplicateurs Zeus sont permanents et s'accumulent à chaque cascade. Un joueur qui déclenche 5 Zeus sur un seul Free Spin avec des multiplicateurs élevés peut atteindre le cap de 5 000× la mise. Ce scénario est rare mais documenté sur des millions de parties.",
      "La stratégie bankroll pour Gates of Olympus doit être plus conservatrice que pour Sweet Bonanza. La très haute volatilité implique des sécheresses possibles de 400 à 500 spins. Règle de base : au moins 300× la mise unitaire en bankroll de session. Pour une mise de 0,40 €, ayez 120 € disponibles pour la session — ce qui vous permet d'absorber les longues périodes sans gain et d'être en jeu quand le bonus se déclenche.",
    ],
    faq: [
      {
        question: 'Quelle différence entre Gates of Olympus et Sweet Bonanza ?',
        answer:
          "Les deux utilisent une grille 6×5 avec cascades de Pragmatic Play, mais leur volatilité diffère. Gates of Olympus est 'très haute' contre 'haute' pour Sweet Bonanza. GoO mise sur les multiplicateurs aléatoires Zeus pendant le jeu normal et les Free Spins, créant des explosions de gains plus rares mais potentiellement plus massives. Sweet Bonanza a un Max Win plus élevé (21 100× vs 5 000×) mais distribue des gains plus régulièrement. Pour une petite bankroll, Sweet Bonanza est plus adapté.",
      },
      {
        question: 'Peut-on atteindre 5 000× sur Gates of Olympus ?',
        answer:
          "Oui, le Max Win de 5 000× est documenté et vérifié. Il nécessite plusieurs multiplicateurs Zeus élevés s'accumulant pendant les Free Spins, combinés à des cascades multiples sur un même tour gratuit. La probabilité est très faible — estimée à moins de 1 chance sur 500 000 spins — mais identique pour chaque joueur à chaque partie.",
      },
      {
        question: 'Gates of Olympus Jackpot King est-il différent ?',
        answer:
          'Gates of Olympus Jackpot King est une version avec jackpot progressif Blueprint Gaming. Elle conserve la mécanique originale en ajoutant une contribution au jackpot réseau. Le RTP du jeu de base est légèrement réduit pour financer le jackpot (souvent 95 % vs 96,5 %). Intéressant si le jackpot est élevé, moins favorable sinon.',
      },
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
    imageUrl: '/jeux/book-of-dead.webp',
    theme: 'Égypte antique',
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
    pros: [
      'Classique intemporel — disponible dans presque tous les casinos',
      "Symboles expansifs pouvant couvrir l'intégralité des 3 rouleaux",
      'Free Spins re-triggerable (potentiellement infinis)',
      'Compatible avec la quasi-totalité des bonus de tours gratuits',
    ],
    cons: [
      'Graphismes vieillissants comparés aux slots modernes',
      'Seulement 10 lignes de paiement — moins de combinaisons que les Megaways',
      'Le symbole expansif est aléatoire — vous pouvez obtenir le moins payant',
    ],
    guideBody: [
      "Book of Dead est la référence absolue du segment 'Book slots' — une famille de slots inspirée de Book of Ra de Novomatic qui a engendré des dizaines de clones (Book of Oz, Book of Sun, Book of Fortune). Son principe est simple : lors des 10 Free Spins, un symbole est tiré aléatoirement et devient 'expansif' — il remplit la totalité du ou des rouleaux sur lesquels il apparaît, indépendamment des lignes de paiement.",
      'Le symbole expansif détermine tout. Rich Wilde ou le Livre (qui paie 500× la mise pour 5 sur une ligne) en expansif pendant les Free Spins peut remplir les 3 rouleaux avec des symboles payants même sans être sur une ligne active. 5 Wilds expansifs couvrant 15 cases avec une mise de 1 € = 500 €. Le retrigger — 3+ Scatters pendant les Free Spins déclenchent 10 tours supplémentaires — peut théoriquement se prolonger indéfiniment.',
      "Book of Dead est la slot de référence pour les bonus de tours gratuits. La plupart des casinos qui offrent des tours gratuits sans dépôt (ou comme partie d'un bonus de bienvenue) les proposent sur Book of Dead. La valeur de chaque tour est généralement de 0,10 € — ce qui signifie que 50 tours gratuits représentent 5 € de jeu. Le wager s'applique aux gains, pas aux tours eux-mêmes.",
    ],
    faq: [
      {
        question: 'Pourquoi Book of Dead est-il si populaire dans les bonus de tours gratuits ?',
        answer:
          "Book of Dead est systématiquement inclus dans les bonus de tours gratuits car il est universel (disponible sur tous les casinos Play'n GO), bien connu des joueurs, et son symbole expansif crée des moments spectaculaires qui sont partagés sur les forums et réseaux sociaux — excellent pour la notoriété du casino. Pour le joueur, la valeur réelle dépend du wager attaché aux tours gratuits.",
      },
      {
        question: 'Quelle est la valeur attendue des Free Spins sur Book of Dead ?',
        answer:
          'Un tour gratuit à 0,10 € a une valeur attendue de 0,096 € (96,21 % de RTP). 100 tours gratuits = 10 € de valeur théorique avant wager. Si le wager est 35×, vous devez miser 96 × 35 = 3 360 € pour libérer les gains. La valeur réelle après wager est beaucoup plus faible — environ 0,50 € à 1 € pour 100 tours. Comparez toujours la valeur après wager, pas la valeur brute des tours.',
      },
      {
        question: 'Book of Dead vs Razor Shark — lequel choisir ?',
        answer:
          'Book of Dead (haute volatilité, 10 lignes) est plus adapté aux petites bankrolls et aux bonus de free spins. Razor Shark de Push Gaming (très haute volatilité, 20 lignes, RTP 96,70 %) offre un meilleur RTP et des mécaniques plus modernes. Pour la chasse aux big wins avec 200 €+, Razor Shark est généralement préféré. Pour utiliser des free spins bonus, Book of Dead est souvent la seule option disponible.',
      },
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
    imageUrl: '/jeux/lightning-roulette.jpg',
    theme: 'Live électrisé',
    rtp: 97.3,
    volatility: 'haute',
    maxWin: '500×',
    description:
      'Lightning Roulette est la table live la plus jouée au monde. Des éclairs frappent 1 à 5 numéros à chaque tour et leur attribuent des multiplicateurs aléatoires de 50× à 500×.',
    features: [
      'Multiplicateurs aléatoires 50×–500×',
      '1 à 5 numéros Lightning par tour',
      'Diffusion en HD depuis un studio Evolution',
      'Mises dès 0,20 €',
    ],
    pros: [
      'Expérience visuelle spectaculaire — la table live la plus regardée au monde',
      "Multiplicateurs jusqu'à 500× sur les numéros plein",
      'RTP 97,3 % — identique à la roulette européenne classique',
      'Disponible 24h/24 avec de nombreuses tables simultanées',
    ],
    cons: [
      'Les numéros plein sans Lightning ne rapportent que 30× (vs 35× en roulette classique)',
      "L'aspect spectacle peut distraire de la rigueur stratégique",
      'Mises minimales plus élevées que la roulette RNG',
    ],
    guideBody: [
      "Lightning Roulette est la table live la plus jouée au monde pour une raison simple : elle ajoute une couche d'excitation à la roulette européenne sans en altérer les fondamentaux mathématiques. Avant chaque tour, la foudre frappe 1 à 5 numéros et leur attribue des multiplicateurs aléatoires entre 50× et 500×. Un numéro plein Lightning peut donc rapporter jusqu'à 500× la mise contre 35× en roulette classique.",
      "Le trade-off est subtil mais important : les numéros plein qui ne reçoivent pas le multiplicateur Lightning ne paient que 30× (contre 35× en roulette classique) pour financer les multiplicateurs. Le RTP total reste identique à 97,3 % — Evolution n'a pas réduit le RTP, il a simplement redistribué les paiements. La stratégie optimale reste identique : éviter la roulette américaine, privilégier les chances simples pour minimiser le risque.",
      "Pour maximiser l'espérance sur Lightning Roulette, certains joueurs misent systématiquement sur tous les numéros ayant reçu un multiplicateur Lightning du tour précédent — raisonnement fallacieux (chaque tour est indépendant), mais compréhensible psychologiquement. La vraie stratégie : jouer les chances simples (rouge/noir, pair/impair) à faible avantage maison et réserver une petite fraction pour quelques numéros plein en espérant le Lightning.",
    ],
    faq: [
      {
        question: 'Pourquoi les numéros plein ne rapportent que 30× sur Lightning Roulette ?',
        answer:
          "Evolution a réduit le paiement des numéros plein de 35× à 30× pour financer les multiplicateurs Lightning. Le RTP reste identique à 97,3 % — la valeur totale est simplement redistribuée différemment : moins sur les numéros plein réguliers, beaucoup plus sur les numéros frappés par la foudre. Si vous n'aimez pas les multiplicateurs et préférez les 35×, jouez en roulette européenne classique.",
      },
      {
        question: 'Les multiplicateurs Lightning sont-ils vraiment aléatoires ?',
        answer:
          "Oui, les multiplicateurs Lightning sont générés par RNG certifié avant chaque tour, indépendamment des tours précédents. Il n'y a aucun pattern, aucune tendance, aucun numéro 'favori'. L'audit de GLI (Gaming Laboratories International) vérifie régulièrement la distribution des multiplicateurs. Les résultats de chaque tour sont disponibles dans l'historique en temps réel.",
      },
      {
        question: 'Peut-on jouer à Lightning Roulette avec un bonus de casino ?',
        answer:
          'Lightning Roulette est généralement exclue des conditions de wager (ou contribue à 0-10 %). Les bonus de casino sont conçus pour les machines à sous. Si vous souhaitez jouer à Lightning Roulette, déposez en argent réel sans bonus actif, ou cherchez des casinos proposant des bonus spécifiques aux tables live.',
      },
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
    imageUrl: '/jeux/roulette-europeenne.jpg',
    theme: 'Classique',
    rtp: 97.3,
    volatility: 'basse',
    maxWin: '35×',
    description:
      'La roulette européenne est le point de départ de tout joueur sérieux : une seule case zéro, avantage maison de 2,7 %. La référence pour apprendre les systèmes de mise.',
    features: [
      'Avantage maison 2,7 % (vs 5,26 % américaine)',
      'Mise en prison sur la règle La Partage',
      'RNG certifié',
      'Statistiques de tirage intégrées',
    ],
    pros: [
      'RTP 97,3 % — le meilleur disponible hors roulette française avec La Partage',
      "Idéale pour pratiquer les systèmes de mise (Martingale, D'Alembert)",
      'Historique des résultats affiché, statistiques intégrées',
      "Disponible en mode démo pour s'entraîner gratuitement",
    ],
    cons: [
      'Moins spectaculaire que Lightning Roulette',
      'Pas de croupier réel — certains joueurs préfèrent le live',
      'Max Win limité à 35× sur les numéros pleins',
    ],
    guideBody: [
      "La roulette européenne RNG de NetEnt est la référence absolue pour apprendre et pratiquer la roulette. Son avantage maison de 2,7 % (une seule case zéro sur 37) est deux fois inférieur à la roulette américaine. L'interface de NetEnt affiche l'historique complet des 500 derniers tirages, les statistiques de fréquence par numéro, et les voisins — des fonctionnalités absentes de nombreuses tables live.",
      "La roulette européenne est le terrain d'entraînement idéal pour les systèmes de mise. La Martingale (doubler après chaque perte) peut être pratiquée en mode démo pour observer sa progression sans risque financier. Résultat constant après des milliers de simulations : ces systèmes modifient la distribution des gains/pertes mais pas l'espérance mathématique, toujours négative de 2,7 % par euro misé.",
      "Astuce pour maximiser le RTP : certaines versions de roulette européenne proposent la règle 'La Partage' — si la bille tombe sur 0, vous récupérez la moitié de vos mises sur les chances simples (rouge/noir, pair/impair, manque/passe). Cela réduit l'avantage maison à 1,35 % sur ces paris — le meilleur RTP possible à la roulette hors poker. Recherchez explicitement 'Roulette Française' ou 'European Roulette with La Partage'.",
    ],
    faq: [
      {
        question: 'Roulette européenne RNG ou live — laquelle choisir ?',
        answer:
          "Pour apprendre, pratiquer des systèmes ou jouer en mode démo : roulette RNG (accessible, rapide, statistiques intégrées). Pour l'expérience authentique avec croupier réel, le frisson du direct et les mises plus élevées : roulette live. Le RTP est identique (97,3 %). En termes de vitesse, la RNG peut traiter 60-80 tours par heure contre 30-40 en live — important pour les systèmes de progression.",
      },
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
    imageUrl: '/jeux/infinite-blackjack.jpg',
    theme: 'Live classique',
    rtp: 99.51,
    volatility: 'basse',
    maxWin: '3×',
    description:
      'Infinite Blackjack résout le problème des tables saturées : un nombre illimité de joueurs peuvent rejoindre la même table. Chaque joueur décide indépendamment de ses actions.',
    features: [
      'Nombre illimité de joueurs simultanés',
      'RTP 99,51 % avec stratégie de base',
      'Six Deck',
      'Side bets : Any Pair, 21+3',
    ],
    pros: [
      "Jamais de liste d'attente — accès instantané 24h/24",
      'RTP 99,51 % parmi les plus hauts des tables live',
      'Idéal pour pratiquer la stratégie de base en conditions réelles',
      'Mises dès 1 € — accessible à tous les budgets',
    ],
    cons: [
      'Vous partagez la main de départ avec tous les joueurs',
      'Certains puristes préfèrent les tables exclusives',
      'Side bets à éviter (avantage maison élevé)',
    ],
    guideBody: [
      "Infinite Blackjack d'Evolution résout élégamment l'une des frustrations principales du blackjack live : les tables saturées. Au lieu de limiter le nombre de joueurs, tous les participants partagent la même main de départ mais prennent leurs décisions de façon entièrement indépendante. Vous pouvez doubler quand vos voisins restent, et vice versa — votre stratégie ne dépend que de votre propre analyse.",
      "Le RTP de 99,51 % suppose l'utilisation de la stratégie de base. Evolution a rendu les règles très favorables au joueur : le croupier tire jusqu'à 16 et s'arrête sur tout 17 (règle standard favorable), le joueur peut doubler sur toute main à deux cartes, et les splits sont autorisés jusqu'à 4 mains. Ces règles, combinées à un jeu sur 8 jeux (rendant le comptage de cartes inefficace), offrent l'expérience la plus équitable possible en live.",
      "Les side bets (Any Pair, 21+3, Bust It) sont une tentation à résister. Any Pair — parier que votre première main est une paire — a un avantage maison de 6 %. 21+3 (votre première main + la carte du croupier forment une combinaison de poker) : 3,5 % d'avantage maison. Ces bets semblent attractifs car ils offrent des paiements élevés (25× pour un Suited Triple), mais ils dégradent significativement votre espérance globale.",
    ],
    faq: [
      {
        question: 'Puis-je appliquer la stratégie de base sur Infinite Blackjack ?',
        answer:
          "Oui, et c'est recommandé. La stratégie de base est identique à n'importe quelle table de blackjack 6-8 jeux. Avoir le tableau de stratégie ouvert sur un second écran est parfaitement légal en ligne. Le fait que d'autres joueurs prennent des décisions différentes ne vous impacte pas — leurs actions n'affectent pas les probabilités de vos cartes suivantes contrairement à une croyance répandue.",
      },
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
    imageUrl: '/jeux/blackjack-classique.jpg',
    theme: 'Classique RNG',
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
    pros: [
      'RTP 99,65 % — le plus élevé de tous les jeux de casino classiques',
      'Vitesse idéale pour pratiquer la stratégie de base (60-80 mains/heure)',
      'Mode démo disponible partout',
      'Règles Vegas Strip favorables au joueur',
    ],
    cons: [
      'Pas de croupier réel — moins immersif que le live',
      'RTP maximum nécessite la stratégie parfaite',
      'Certains casinos limitent la contribution au wager sur le blackjack RNG',
    ],
    guideBody: [
      'Le Blackjack Classique de Microgaming avec les règles Vegas Strip est le jeu de casino avec le RTP le plus élevé disponible : 99,65 % avec stratégie parfaite. Pour comparaison, les machines à sous sont à 94-97 %, la roulette européenne à 97,3 %. Sur 1 000 € misés avec la stratégie de base, vous perdez statistiquement 3,50 € — contre 30 € à la roulette américaine.',
      "Les règles Vegas Strip qui rendent ce blackjack si favorable : le croupier s'arrête sur tous les 17 (y compris Soft 17), le joueur peut doubler sur n'importe quelle main initiale (pas seulement 9, 10 ou 11), les paires peuvent être splitées jusqu'à 4 mains, et le doubling après split est autorisé. Chacune de ces règles réduit l'avantage maison de quelques dixièmes de pourcent — ensemble, elles font la différence.",
      "Pour utiliser ce jeu au maximum, pratiquez la stratégie de base en mode démo jusqu'à prendre les décisions automatiquement. Le passage en argent réel avec la stratégie maîtrisée vous met dans la situation mathématiquement la plus favorable de tout le casino. Attention : vérifiez que votre casino ne réduit pas la contribution au wager du blackjack — certains sites appliquent seulement 5-10 % au lieu de 100 %.",
    ],
    faq: [
      {
        question: 'Pourquoi la stratégie de base est-elle si importante sur ce jeu ?',
        answer:
          "Sans stratégie de base, l'avantage maison grimpe de 0,35 % à 2-3 % selon les erreurs commises. L'erreur la plus coûteuse est de ne jamais doubler ou de toujours tirer quand le croupier a une carte faible (2-6). La stratégie de base dicte exactement quand doubler, splitter, tirer ou rester dans chaque situation — l'ignorer, c'est laisser 1,5 à 2 € par 100 € misés sur la table.",
      },
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
    imageUrl: '/jeux/crazy-time.svg',
    theme: 'Game Show',
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
    pros: [
      'Le game show live le plus regardé et le plus excitant du marché',
      "Multiplicateurs jusqu'à 20 000× pour des gains extraordinaires",
      'Très faible mise minimum (0,10 €) accessible à tous',
      'Communauté de joueurs et ambiance festive unique',
    ],
    cons: [
      'RTP 96,08 % inférieur à la roulette ou au blackjack',
      'Très haute volatilité : longues attentes avant un bonus game',
      "L'aspect spectacle peut conduire à des sessions trop longues",
    ],
    guideBody: [
      "Crazy Time d'Evolution Gaming est la révolution des game shows live. Sa roue de 54 segments distribue des gains directs (1×, 2×, 5×, 10×) et 4 bonus games uniques. Le Top Slot — une machine à sous en haut de l'écran — tire aléatoirement le segment et un multiplicateur (×2 à ×10) avant chaque tour, augmentant potentiellement tous les gains de ce tour.",
      "Les 4 bonus games sont les moments culminants. Cash Hunt : 108 cibles cachent des multiplicateurs aléatoires — vous choisissez votre cible. Coin Flip : une pièce rouge/bleue est lancée, chaque face ayant un multiplicateur différent. Pachinko : une bille descend un tableau de plots — multiplicateurs de 2× à 10 000×. Crazy Time : la roue de bonus avec des multiplicateurs jusqu'à 20 000× et des secteurs 'Double' et 'Triple' qui multiplient tout.",
      "La stratégie de mise sur Crazy Time est essentiellement de l'espérance mathématique appliquée. Le segment '1' (21 occurrences sur 54) avec un RTP de 95,4 % est le pari le moins défavorable. Les bonus games ont des RTP variables selon leur configuration du jour. Miser exclusivement sur 'Crazy Time' (1 segment sur 54) pour chasser les 20 000× est très risqué — la patience est indispensable.",
    ],
    faq: [
      {
        question: 'Quelle mise est optimale pour Crazy Time ?',
        answer:
          "Il n'existe pas de stratégie garantie pour Crazy Time. La mise optimale dépend de votre objectif : pour maximiser le temps de jeu, misez sur les segments à haute fréquence (1×, 2×). Pour chasser les gros multiplicateurs, répartissez sur les 4 bonus games avec une petite part sur Crazy Time (le bonus game au potentiel le plus élevé). La mise minimum de 0,10 € par segment permet de tout couvrir pour 0,40 €/tour.",
      },
      {
        question: 'À quelle fréquence les bonus games apparaissent-ils ?',
        answer:
          "Chaque bonus game a une probabilité fixe sur la roue : Cash Hunt apparaît 2 fois (3,7 %), Coin Flip 4 fois (7,4 %), Pachinko 2 fois (3,7 %), Crazy Time 1 fois (1,9 %). En pratique, vous attendrez en moyenne 26 tours entre deux Cash Hunt, 53 tours entre deux apparitions de Crazy Time. Le Top Slot peut multiplier n'importe quel segment, ce qui ajoute une imprévisibilité supplémentaire.",
      },
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
    imageUrl: '/jeux/lightning-dice.jpg',
    theme: 'Dés électrisés',
    rtp: 96.21,
    volatility: 'haute',
    maxWin: '1 000×',
    description:
      'Lightning Dice combine le lancer de trois dés avec des éclairs qui multiplient aléatoirement les gains. Simple à comprendre, intense à jouer.',
    features: [
      '3 dés dans un tube électrique',
      'Multiplicateurs 50×–1 000× par éclair',
      'Paris sur les totaux de 3 à 18',
      'Résultats en 30 secondes',
    ],
    pros: [
      'Règles ultra-simples — idéal pour les débutants du live',
      'Rounds rapides (30s) pour un ratio action/temps élevé',
      "Multiplicateurs Lightning jusqu'à 1 000× pour les coups de chance",
      'Statistiques de fréquence des totaux affichées en temps réel',
    ],
    cons: [
      "RTP 96,21 % — les totaux sans Lightning ne paient qu'au taux standard réduit",
      'Moins de contrôle stratégique que le blackjack ou la roulette',
    ],
    guideBody: [
      'Lightning Dice est la transposition des mécaniques Lightning Roulette au jeu de dés. Trois dés sont lancés dans un tube en verre et les éclairs frappent 1 à 3 totaux avant chaque lancer pour leur attribuer des multiplicateurs de 50× à 1 000×. Les paris couvrent les totaux possibles de 3 (trois 1s) à 18 (trois 6s), avec des cotes qui reflètent leur probabilité théorique.',
      "La distribution des probabilités aux dés à 3D6 est en cloche : les totaux 9, 10 et 11 sont les plus fréquents (probabilité 11-12,5 %), les extrêmes 3 et 18 les plus rares (0,46 %). Parier sur les totaux extrêmes espère le Lightning — sans multiplicateur, le paiement d'un total de 3 est 180× (probabilité 1/216). Avec un multiplicateur Lightning de 1 000×, le même total paierait 1 000× la mise.",
    ],
    faq: [
      {
        question: 'Lightning Dice est-il adapté aux débutants du casino live ?',
        answer:
          "Oui, c'est l'un des meilleurs points d'entrée pour le casino live. Les règles sont simples (misez sur le total de 3 dés), les rounds sont courts, et les mises minimum sont faibles (0,10 €). L'interface affiche les probabilités de chaque total et l'historique des Lightning. Parfait pour découvrir l'ambiance live sans la complexité du blackjack ou des game shows comme Crazy Time.",
      },
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
    imageUrl: '/jeux/aviator.webp',
    theme: 'Aviation',
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
      'Provably Fair',
    ],
    pros: [
      'RTP 97 % — parmi les meilleurs du casino',
      'Provably Fair vérifié : chaque résultat est cryptographiquement vérifiable',
      'Contrôle total : vous décidez du moment de retrait',
      'Double mise simultanée pour gérer le risque',
    ],
    cons: [
      'La psychologie du timing crée une addiction spécifique',
      'Pas de max win défini — mais le crash peut survenir à 1,01×',
      'Moins adapté si vous cherchez des paiements fixes et prévisibles',
    ],
    guideBody: [
      "Aviator de Spribe est le crash game qui a défini le genre pour le grand public en 2019. Son principe est radical dans sa simplicité : un avion décolle et un multiplicateur monte de 1× en temps réel. Vous placez votre mise avant le décollage et retirez à tout moment pendant le vol. Si l'avion s'envole avant votre retrait : vous perdez. Retrait avant le crash : vous gagnez votre mise multipliée par le multiplicateur actuel.",
      "Le Provably Fair d'Aviator est son atout différenciateur. Chaque round, le serveur génère un seed chiffré (SHA256) et le publie avant le début. Après le round, le hash du résultat peut être comparé avec le seed initial pour vérifier qu'il n'a pas été modifié. Cette vérification est accessible dans l'interface ('Fairness') et peut être effectuée par n'importe qui. C'est une garantie d'impartialité impossible à reproduire avec un RNG opaque.",
      'Les deux stratégies dominantes sur Aviator : la double mise (une mise à auto cash-out 1,5×-2×, une laissée courir pour les gros multiplicateurs) et le cash-out automatique à un multiplicateur fixe (1,5×-2× sur 100 % de la bankroll). La première réduit la variance, la seconde maximise le ratio action/temps. Aucune ne modifie le RTP de 97 %. La gestion de bankroll est capitale : des sessions courtes avec des mises proportionnelles au solde.',
    ],
    faq: [
      {
        question: 'Quelle est la stratégie Aviator recommandée pour débuter ?',
        answer:
          "Pour débuter : auto cash-out à 1,5× sur 100 % de la mise. Ce paramètre vous fait gagner environ 57 % des rounds (probabilité d'atteindre 1,5×). Vous perdez 1 € pour en gagner 1,50 € — soit un profit net de 0,50 € sur les rounds gagnants. Sur 100 rounds avec 1 €/round et auto cash-out 1,5× : environ 57 victoires (+28,50 €) et 43 défaites (-43 €), soit -14,50 € nets — proche du RTP 97 % théorique.",
      },
      {
        question: 'Un crash à 1,01× est-il normal ?',
        answer:
          "Oui, le crash peut théoriquement survenir immédiatement dès 1,01× — une probabilité faible mais existante. Spribe publie que la probabilité de crash avant 1,5× est d'environ 39 % et avant 2× d'environ 50 %. Ces chiffres sont cohérents avec le RTP de 97 % (avantage maison 3 %). Les 'crashes immédiats' sont statistiquement rares mais parfaitement légitimes dans la distribution Provably Fair.",
      },
    ],
    minBet: 0.1,
    maxBet: 100,
    popular: true,
  },
  // ── Vidéo Poker ────────────────────────────────────────────────────────────
  {
    slug: 'jacks-or-better',
    name: 'Jacks or Better',
    provider: 'Microgaming',
    category: 'video-poker',
    imageUrl: '/jeux/jacks-or-better.jpg',
    theme: 'Poker classique',
    rtp: 99.54,
    volatility: 'basse',
    maxWin: '800×',
    description:
      "Jacks or Better est la variante de vidéo poker de référence : RTP de 99,54 % avec la stratégie optimale, règles simples et paiement à partir d'une paire de valets.",
    features: [
      'RTP 99,54 % avec stratégie parfaite',
      'Paiement dès une paire de Valets',
      'Royal Flush : 800× la mise',
      'Interface simple, idéale pour débutants',
    ],
    pros: [
      'RTP 99,54 % — parmi les plus hauts de tout le casino',
      'Stratégie de base apprise en 2 heures avec un tableau de référence',
      'Faible variance : gains réguliers, pas de longues sécheresses',
      'Mode démo partout pour pratiquer gratuitement',
    ],
    cons: [
      'Le Max Win de 800× (Royal Flush) est très rare',
      'RTP maximum nécessite la table de paiement 9/6 — vérifiez avant de jouer',
      'Moins de sensations fortes que les crash games ou slots haute volatilité',
    ],
    guideBody: [
      'Jacks or Better 9/6 est le Saint Graal du RTP casino : 99,54 % avec stratégie parfaite. La table de paiement 9/6 signifie que la Full House paie 9× la mise et la Couleur 6×. Attention : certains casinos proposent des tables 8/5 (RTP 97,3 %) ou même 6/5 (RTP 95 %) qui semblent identiques mais ont un RTP bien inférieur. Vérifiez toujours la table de paiement avant de commencer.',
      "La hiérarchie de la stratégie Jacks or Better se mémorise en 10 règles ordonnées par priorité. La règle la plus importante : ne jamais casser une main gagnante (paire ou plus) sauf pour une Royal Flush à 4 cartes. Deuxième règle critique : toujours garder une paire de Valets ou plus plutôt que 4 cartes d'une couleur ou d'une séquence. L'erreur classique des débutants est de 'chasser' les couleurs en cassant des mains gagnantes.",
      "Pour pratiquer efficacement, utilisez l'application Wizard of Odds Video Poker (disponible gratuitement en ligne) qui corrige chaque erreur en temps réel. Après 2 à 3 heures de pratique supervisée, la stratégie de base devient quasi-automatique. En jeu réel, gardez le tableau de stratégie ouvert sur un second écran — c'est parfaitement légal et recommandé pour les débutants.",
    ],
    faq: [
      {
        question: 'Comment identifier une table de paiement 9/6 ?',
        answer:
          "Avant de jouer, regardez la ligne 'Full House' et 'Flush' (Couleur) dans la table de paiement affichée à l'écran. 9× pour la Full House et 6× pour la Couleur = table 9/6 (RTP 99,54 %). 8× / 5× = table 8/5 (RTP 97,3 %). 7× / 5× = encore pire. Sur mobile, zoomez sur la table de paiement avant de miser. Certains casinos nomment explicitement 'Full Pay Jacks or Better' pour les tables 9/6.",
      },
    ],
    minBet: 0.25,
    maxBet: 25,
    popular: true,
  },
  {
    slug: 'deuces-wild',
    name: 'Deuces Wild',
    provider: 'NetEnt',
    category: 'video-poker',
    imageUrl: '/jeux/deuces-wild.jpg',
    theme: 'Jokers Wild',
    rtp: 99.73,
    volatility: 'moyenne',
    maxWin: '4 000×',
    description:
      'Deuces Wild offre le RTP le plus élevé des vidéo pokers courants : 99,73 % avec stratégie parfaite. Les 2 servent de jokers, ce qui augmente la fréquence des mains gagnantes.',
    features: [
      'RTP 99,73 % — le plus haut du vidéo poker',
      'Les 2 jouent comme jokers',
      'Royal Flush naturel : 4 000× la mise',
      'Stratégie différente du Jacks or Better',
    ],
    pros: [
      'RTP 99,73 % — le plus élevé de tous les jeux de casino standard',
      'Les 2 comme jokers créent plus de combinaisons gagnantes',
      'Variance plus faible que Jacks or Better grâce aux jokers',
      'Royal Flush naturel paie 4 000× — gain spectaculaire',
    ],
    cons: [
      'Stratégie entièrement différente de Jacks or Better — ne pas mélanger',
      "Les mains commencent à Trois d'une sorte (pas de paires gagnantes)",
      'Moins disponible que Jacks or Better dans les casinos',
    ],
    guideBody: [
      "Deuces Wild est la variante de vidéo poker au RTP le plus élevé : 99,73 % avec stratégie parfaite. Les quatre 2 deviennent des jokers capables de remplacer n'importe quelle carte — ce qui augmente considérablement la fréquence des mains gagnantes et nécessite une hiérarchie de mains différente (les mains commencent à trois d'une sorte, pas une paire).",
      "La stratégie Deuces Wild est fondamentalement différente de Jacks or Better et ne peut pas être interchangée. Avec zéro joker : priorité aux quatre d'une sorte, puis Straight Flush, puis Full House, puis tenter la couleur, etc. Avec un joker : conserver les combinaisons gagnantes, puis chercher le Royal Flush ou le Straight Flush. Avec deux jokers : conserver Four of a Kind ou Royal Flush seulement — tout le reste est à redéfausser.",
      "La rareté de Deuces Wild dans les casinos en ligne est une frustration pour les joueurs qui maîtrisent sa stratégie. NetEnt et Microgaming proposent les versions les plus répandues. Cherchez spécifiquement 'Full Pay Deuces Wild' (la version à 99,73 %) par opposition aux versions réduites 'Not So Ugly Ducks' (98,9 %) ou 'Illinois Deuces' (97,1 %).",
    ],
    faq: [
      {
        question: 'Dois-je apprendre Jacks or Better avant Deuces Wild ?',
        answer:
          "Oui, fortement recommandé. Jacks or Better a une stratégie plus simple à apprendre, est disponible partout, et partage le même cadre conceptuel. Deuces Wild nécessite de 'oublier' les réflexes de Jacks or Better — la confusion entre les deux stratégies est la principale source d'erreurs. Maîtrisez complètement Jacks or Better (quelques heures de pratique), puis abordez Deuces Wild comme un jeu entièrement nouveau.",
      },
    ],
    minBet: 0.25,
    maxBet: 25,
    popular: false,
  },
  // ── Jackpots Progressifs ───────────────────────────────────────────────────
  {
    slug: 'mega-moolah',
    name: 'Mega Moolah',
    provider: 'Microgaming',
    category: 'jackpots',
    imageUrl: '/jeux/mega-moolah.svg',
    theme: 'Safari africain',
    rtp: 88.12,
    volatility: 'basse',
    maxWin: '∞ (record : 21,7M€)',
    description:
      'Mega Moolah est la machine à sous aux jackpots progressifs la plus célèbre au monde. 4 niveaux de jackpots (Mini, Minor, Major, Mega), un record mondial à 21,7 M€.',
    features: [
      '4 niveaux de jackpots progressifs',
      "Record mondial : 21,7 millions d'euros",
      'Roue de jackpot déclenchée aléatoirement',
      'Disponible sur la majorité des casinos FR',
    ],
    pros: [
      'Le jackpot progressif le plus célèbre — record mondial à 21,7 M€',
      "Jackpot déclenchable sur n'importe quelle mise (même 0,25 €)",
      'Roue de jackpot avec 4 niveaux — gagnants à chaque niveau chaque semaine',
      'Jackpot garanti à un niveau minimum (seed)',
    ],
    cons: [
      'RTP de base 88,12 % — faible hors contribution jackpot',
      'Graphismes et mécaniques datant de 2006',
      'Mise minimum 0,25 € par spin — moins flexible que les slots modernes',
    ],
    guideBody: [
      "Mega Moolah de Microgaming est la machine à sous la plus légendaire de l'histoire du jeu en ligne. Lancée en 2006, elle a versé plus de 1 milliard d'euros en jackpots progressifs depuis sa création, avec un record absolu de 21,7 millions d'euros en 2023. Son réseau de casinos connectés — plusieurs centaines dans le monde — alimente une cagnotte qui peut atteindre 15-20 millions d'euros avant d'être déclenchée.",
      'La mécanique jackpot de Mega Moolah est unique : pendant le jeu normal, une roue de jackpot peut être déclenchée à tout moment de façon aléatoire (probabilité légèrement corrélée à la taille de la mise). Cette roue présente 4 segments colorés — Mini (très fréquent), Minor (fréquent), Major (rare), Mega (très rare). La valeur actuelle du Mega jackpot est affichée en temps réel et garantie à un minimum de 1 000 000 € (seed).',
      "Le RTP affiché de 88,12 % inclut la contribution jackpot d'environ 7 %. Le RTP du jeu de base hors jackpot est d'environ 95 %. Économiquement, la vraie valeur de Mega Moolah est dans le jackpot : plus il est élevé au-dessus du seed de 1 M€, plus le RTP effectif augmente. Un jackpot à 5 M€ représente 4 M€ de valeur supplémentaire distribuée aux joueurs — le RTP effectif peut dépasser 97 % dans cette configuration.",
    ],
    faq: [
      {
        question: 'Y a-t-il des techniques pour augmenter ses chances sur Mega Moolah ?',
        answer:
          "Non — les chances de déclencher la roue de jackpot sont déterminées par le RNG certifié et légèrement corrélées à la taille de la mise (une mise plus élevée augmente microscopiquement la probabilité). Il n'existe aucune technique, aucun timing, aucune 'astuce' permettant d'influencer le résultat. Les déclarations contraires sont des arnaques. Jouez avec la mise minimum de 0,25 € si vous souhaitez de nombreux spins à faible coût.",
      },
    ],
    minBet: 0.25,
    maxBet: 6.25,
    popular: true,
  },
  {
    slug: 'divine-fortune',
    name: 'Divine Fortune',
    provider: 'NetEnt',
    category: 'jackpots',
    imageUrl: '/jeux/divine-fortune.jpg',
    theme: 'Mythologie grecque',
    rtp: 96.59,
    volatility: 'moyenne',
    maxWin: 'Jackpot progressif',
    description:
      'Divine Fortune by NetEnt propose 3 jackpots progressifs (Minor, Major, Mega) avec un RTP de 96,59 % — bien supérieur à la moyenne des slots à jackpot.',
    features: [
      'RTP 96,59 % — excellent pour un jackpot progressif',
      '3 niveaux de jackpots progressifs',
      'Re-Spins avec wilds falling',
      'Certifié eCOGRA',
    ],
    pros: [
      'RTP 96,59 % — bien supérieur à Mega Moolah pour le jeu de base',
      "Jackpots plus fréquents mais de taille modérée (milliers à centaines de milliers d'€)",
      'Re-Spins avec wilds stickants créant des cascades',
      'Disponible sur tous les grands casinos NetEnt',
    ],
    cons: [
      'Jackpot Mega bien inférieur à Mega Moolah en taille maximale',
      'Thème similaire à Gates of Olympus — moins original',
    ],
    guideBody: [
      "Divine Fortune représente l'équilibre idéal entre jackpot progressif et RTP compétitif. Là où Mega Moolah sacrifie le RTP de base (88 %) pour alimenter des jackpots monstrueux, Divine Fortune maintient 96,59 % tout en proposant 3 niveaux de jackpots. Le Mega jackpot, bien que plus modeste (généralement entre 50 000 € et 300 000 €), se déclenche beaucoup plus fréquemment que le jackpot Mega de Mega Moolah.",
      "La mécanique Wild Gamble est l'originalité de Divine Fortune : lorsqu'un symbole Wild apparaît sur un rouleau, vous pouvez parier pour le transformer en Wild Falling — il reste en place pour un Re-Spin, puis tombe d'un niveau et déclenche un nouveau Re-Spin, jusqu'à quitter la grille. Cette mécanique peut générer plusieurs Re-Spins consécutifs avec des wilds accumulés.",
      "Pour les joueurs qui trouvent Mega Moolah trop frustrant (longues sessions sans gros gain, RTP faible), Divine Fortune offre une expérience plus équilibrée. Les Re-Spins apportent des gains fréquents qui entretiennent l'engagement, et la perspective d'un Mega jackpot de 50 000-300 000 € reste suffisamment excitante pour justifier les sessions plus longues.",
    ],
    faq: [
      {
        question: 'Divine Fortune vs Mega Moolah — lequel choisir ?',
        answer:
          "Cela dépend de votre objectif. Pour chasser le jackpot maximum possible (plusieurs millions d'euros) en acceptant un RTP faible : Mega Moolah. Pour un meilleur RTP de base avec des jackpots plus petits mais plus fréquents (50 K€ à 300 K€) et un gameplay plus engageant : Divine Fortune. Si vous êtes un joueur régulier qui veut optimiser son espérance mathématique tout en gardant la possibilité d'un jackpot : Divine Fortune est le meilleur choix.",
      },
    ],
    minBet: 0.2,
    maxBet: 100,
    popular: false,
  },
]

export const gameBySlug = new Map(games.map((g) => [g.slug, g]))
export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]))

export function getGamesByCategory(category: GameCategory): Game[] {
  return games.filter((g) => g.category === category)
}
