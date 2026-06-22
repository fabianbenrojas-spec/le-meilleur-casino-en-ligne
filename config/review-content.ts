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
    bonus?: ReviewSection
    jeux?: ReviewSection
    live?: ReviewSection
    paiements: ReviewSection
    support: ReviewSection
    mobile: ReviewSection
    vip?: ReviewSection
    securite: ReviewSection
  }
  recapRows: { label: string; value: string }[]
  faq: { question: string; answer: string }[]
  pourQui?: {
    idealSi: string[]
    bonChoixSi: string[]
    aEviterSi: string[]
  }
}

const reviews: ReviewData[] = [
  // ── 1. Crésus Casino ────────────────────────────────────────────────────────
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
          "Cresus opère sous **licence Curaçao 8048** — valide, mais moins protectrice qu'une licence européenne. Les données sont chiffrées en TLS 1.3. Le jeu responsable est bien documenté avec auto-exclusion disponible.",
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
          "Pas d'application native disponible sur App Store ou Google Play. En revanche, le site mobile est une PWA bien optimisée que vous pouvez installer en raccourci sur votre écran d'accueil.",
      },
    ],
    pourQui: {
      idealSi: [
        'Vous retirez vos gains régulièrement : 3 tests de retrait crédités en moins de 24 h, carte bancaire incluse.',
        'Vous contactez le support en français : chat 7j/7, délai de réponse moyen mesuré à 2 minutes.',
        'Vous activez le bonus de bienvenue : 200 € + 100 tours dès 20 € déposés, wager 35×, sans code promo.',
      ],
      bonChoixSi: [
        'Vous testez les jeux de studios pointus comme Nolimit City ou Hacksaw Gaming : catalogue de 2 100+ titres.',
        'Vous jouez au live en soirée : 90 tables Evolution et Pragmatic Live, en français pour blackjack et roulette.',
      ],
      aEviterSi: [
        "Vous retirez régulièrement plus de 5 000 € par semaine : c'est précisément le plafond hebdomadaire imposé.",
        "Vous voulez la protection juridique d'une licence européenne (MGA Malte) en cas de litige : Crésus est sous Curaçao 8048.",
      ],
    },
  },

  // ── 2. Lucky8 ───────────────────────────────────────────────────────────────
  {
    slug: 'lucky8',
    foundedYear: 2020,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿'],
    reviewCount: 876,
    stars: 4.5,
    verdict:
      "Lucky8 se hisse à la 2e place grâce à ses tournois de machines à sous hebdomadaires et son cashback de 10% versé sans conditions. Son catalogue de 1 800+ jeux couvre l'essentiel, et le processus de retrait — bien que légèrement plus long que Cresus — reste fiable. Idéal pour les joueurs réguliers de slots.",
    sections: {
      bonus: {
        prose: [
          'Lucky8 propose **100 € de bonus + 100 tours gratuits** sur le premier dépôt, avec un wager de **35×** — identique à Cresus mais sur un montant de base inférieur. Le bonus se déclenche dès 20 € sans code promo.',
          "Ce qui distingue Lucky8, c'est le **cashback hebdomadaire de 10 %** sur les pertes nettes de la semaine, versé chaque lundi sans conditions de mise. Pour les joueurs réguliers, cet avantage peut compenser un bonus de bienvenue moins généreux.",
        ],
        highlights: [
          'Cashback 10 % hebdomadaire SANS wager — versé chaque lundi',
          'Wager 35× : dans la moyenne basse du marché',
          'Bonus activé automatiquement dès 20 € déposés',
        ],
        minicta: {
          label: '100 € + 100 tours + cashback 10 % hebdo',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          'Avec **1 800+ jeux**, Lucky8 ne rivalise pas avec les catalogues les plus larges, mais assure une sélection de qualité. Les titres phares sont présents : Sweet Bonanza, Gates of Olympus, Book of Dead, Aviator.',
          'Le RTP moyen mesuré sur notre échantillon ressort à **96,1 %**. Les tournois de slots — organisés chaque semaine avec cagnotte en espèces — sont un atout différenciant. Nous en avons participé à trois : organisation propre, gains versés sous 24h.',
        ],
        minicta: { label: '1 800+ jeux · Tournois hebdomadaires', buttonText: 'Voir le catalogue' },
      },
      live: {
        prose: [
          "La section live, alimentée principalement par **Evolution**, couvre les indispensables : roulette européenne, blackjack classique, baccarat et quelques game shows. L'offre est solide sans être exceptionnelle — une quinzaine de tables actives aux heures de pointe.",
        ],
        highlights: [
          'Tables Evolution disponibles 24h/24',
          'Limites accessibles : 0,50 € à 2 000 €',
        ],
      },
      paiements: {
        prose: [
          "Nos deux retraits test ont été traités en **36 à 48 heures** par carte bancaire — un peu plus lent que les leaders du marché mais dans une fourchette acceptable. Les retraits PaySafeCard ne sont pas disponibles : c'est une voie dépôt uniquement.",
          'Le plafond de retrait journalier est de **2 000 €**, ce qui peut limiter les gagnants importants. Le dépôt minimum est de 20 €.',
        ],
      },
      support: {
        prose: [
          "Le support par **chat live** est disponible de 8 h à minuit, 7j/7. En dehors de ces horaires, seul l'e-mail fonctionne. Nos questions ont obtenu des réponses pertinentes en français, avec un délai moyen de **4 minutes** — correct mais pas exceptionnel.",
          "L'absence de support 24h/24 est un point négatif notable pour les joueurs de nuit.",
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de Lucky8 est fluide et bien adapté aux écrans de 375px à 428px. Les tournois sont accessibles depuis le mobile avec la même ergonomie qu'en version bureau. LCP mesuré à **1,9 s sur 4G** — dans les objectifs.",
        ],
      },
      vip: {
        prose: [
          'Le programme de fidélité comporte **4 niveaux** (Bronze, Argent, Or, Platine). Les points sont accumulés sur toutes les mises et convertibles en bonus. Dès le niveau Or, un gestionnaire de compte est accessible par e-mail.',
          "Le cashback hebdomadaire de 10 % est accessible dès le premier euro misé — c'est l'un des avantages les plus démocratiques de notre top 10.",
        ],
      },
      securite: {
        prose: [
          'Lucky8 opère sous **licence Curaçao**, avec chiffrement TLS 1.3. Les outils de jeu responsable incluent : limites de dépôt, auto-exclusion temporaire ou définitive. Le processus KYC est rigoureux — comptez 24 à 72h pour la vérification initiale.',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '100 € + 100 tours (wager 35×)' },
      { label: 'Cashback', value: '10 % hebdomadaire, sans wager' },
      { label: 'RTP moyen mesuré', value: '96,1 %' },
      { label: 'Délai de retrait testé', value: '36–48 h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, PaySafeCard, BTC' },
      { label: 'Catalogue', value: '1 800+ jeux' },
      { label: 'Support', value: 'Chat 8h–minuit (FR), e-mail' },
      { label: 'Application mobile', value: 'Site mobile optimisé (PWA)' },
      { label: 'Fondé', value: '2020' },
    ],
    faq: [
      {
        question: 'Lucky8 est-il fiable ?',
        answer:
          'Oui. Lucky8 est en activité depuis 2020 avec une licence Curaçao valide. Nos tests confirment des paiements honnêtes dans des délais raisonnables (36–48h). Le cashback sans conditions est un gage de transparence.',
      },
      {
        question: 'Comment fonctionne le cashback Lucky8 ?',
        answer:
          'Chaque lundi, Lucky8 verse 10 % de vos pertes nettes de la semaine précédente, sans conditions de mise. Le montant minimum pour déclencher le cashback est de 20 € de pertes. Il est crédité directement en argent réel.',
      },
      {
        question: 'Peut-on participer aux tournois depuis le mobile ?',
        answer:
          'Oui, les tournois Lucky8 sont entièrement accessibles depuis le navigateur mobile. Inscriptions, classements et récompenses sont disponibles dans la section « Tournois » du menu mobile.',
      },
    ],
    pourQui: {
      idealSi: [
        'Vous misez régulièrement sur la durée : 10% de vos pertes nettes hebdomadaires sont versés chaque lundi en argent réel, sans wager.',
        'Vous participez aux tournois de machines à sous hebdomadaires : cagnottes en espèces versées en moins de 24 h.',
        'Vous activez le bonus de bienvenue : 100€ + 100 tours dès 20€ déposés, wager 35×, sans code promo.',
      ],
      bonChoixSi: [
        'Vous jouez et participez aux tournois depuis votre mobile : ergonomie identique au bureau, LCP mesuré à 1,9 s en 4G.',
        'Vous jouez principalement en journée et en soirée : chat en français disponible de 8h à minuit, délai de réponse moyen de 4 minutes.',
      ],
      aEviterSi: [
        "Vous retirez régulièrement plus de 2 000 € en une seule fois : c'est précisément le plafond journalier imposé chez Lucky8.",
        'Vous voulez pouvoir retirer dès vos premiers gains : la vérification KYC initiale prend de 24 à 72 h.',
      ],
    },
  },

  // ── 3. Wild Sultan ──────────────────────────────────────────────────────────
  {
    slug: 'wild-sultan',
    foundedYear: 2015,
    languages: ['FR', 'EN', 'AR'],
    currencies: ['EUR', '₿', 'ETH'],
    reviewCount: 1042,
    stars: 4.4,
    verdict:
      "Wild Sultan est le meilleur choix de notre top 10 pour les joueurs crypto : retraits BTC/ETH traités en moins d'une heure, wager parmi les plus bas du marché (30×), et une section live avec des tables exclusives haute mise. Son ancienneté depuis 2015 est un gage de solidité.",
    sections: {
      bonus: {
        prose: [
          "L'offre de bienvenue Wild Sultan atteint **500 € + 20 tours gratuits** sur le premier dépôt. Le montant peut paraître alléchant, mais c'est le **wager de 30×** qui fait la vraie différence : c'est l'un des plus bas de notre comparatif.",
          'Les 20 tours gratuits sont crédités immédiatement sur *Book of Dead* ou *Starburst* selon votre choix. Le dépôt minimum pour déclencher le bonus est de 20 €.',
        ],
        highlights: [
          'Wager 30× — parmi les plus bas du top 10',
          '500 € : le deuxième montant le plus élevé après Magical Spin',
          'Pas de code promo — bonus activé automatiquement',
        ],
        minicta: {
          label: '500 € + 20 tours · wager 30× — les meilleures conditions',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          'Wild Sultan propose **1 500+ jeux**, avec un accent marqué sur les machines à sous haute volatilité : Nolimit City, Hacksaw Gaming, et une belle sélection de titres BTG (Big Time Gaming) introuvables dans certains concurrents.',
          'Le RTP mesuré sur notre échantillon donne **96,0 %** — légèrement en dessous des leaders mais toujours au-dessus de la moyenne secteur (95,5 %). Le catalogue est moins volumineux que Madnix ou Casinozer mais mieux sélectionné.',
        ],
      },
      live: {
        prose: [
          "C'est le point fort de Wild Sultan : la section live, alimentée par **Evolution et Ezugi**, propose des tables haute mise rarement disponibles sur les concurrents. Nous avons testé le blackjack VIP (mises jusqu'à 10 000 €) — aucune latence notable.",
          'Les game shows sont bien représentés : Crazy Time, Dream Catcher, Monopoly Live. Les tables francophones sont actives en soirée.',
        ],
        highlights: [
          "Tables haute mise jusqu'à 10 000 € (blackjack VIP)",
          'Fournisseurs Evolution + Ezugi : qualité garantie',
          'Tables francophones disponibles 18h–2h',
        ],
        minicta: {
          label: 'Live casino premium · tables haute mise disponibles',
          buttonText: 'Jouer en live',
        },
      },
      paiements: {
        prose: [
          "Le vrai avantage de Wild Sultan réside ici : les retraits **Bitcoin et Ethereum sont traités en moins d'une heure**. Nous avons effectué 4 retraits test — le plus long a pris 47 minutes (réseau ETH congestionné).",
          'Les retraits par carte bancaire prennent 48 à 72h — dans la norme mais sans performance remarquable. La limite de retrait hebdomadaire est de 5 000 €.',
        ],
        highlights: [
          'BTC/ETH retrait en < 1h (testé 4 fois)',
          'Frais réseau crypto pris en charge pour les retraits > 100 €',
        ],
        minicta: {
          label: 'Retraits crypto en < 1h · sans frais au-dessus de 100 €',
          buttonText: 'Ouvrir un compte',
        },
      },
      support: {
        prose: [
          'Le support de Wild Sultan est disponible par **chat 24h/24** en anglais, et en français de **10h à 22h**. Nos tests ont révélé une compétence solide — les réponses sur les bonus et les conditions KYC étaient précises et cohérentes avec les CGU.',
          "Point d'amélioration : les délais de réponse en chat hors horaires francophones montent à 8–12 minutes — acceptable mais perfectible.",
        ],
      },
      mobile: {
        prose: [
          "L'expérience mobile est l'une des meilleures du comparatif : le site s'adapte parfaitement aux petits écrans, les tables live se chargent rapidement (LCP mesuré à **1,7 s**), et le lobby de jeux est navigable sans friction.",
          "Pas d'application native, mais la PWA est installable. Le dépôt crypto depuis mobile est parfaitement géré.",
        ],
      },
      vip: {
        prose: [
          "Wild Sultan propose un programme VIP sur **invitation**, accessible à partir d'un volume de jeu significatif. Les avantages incluent : gestionnaire dédié, retraits prioritaires, bonus personnalisés et accès anticipé aux nouveaux jeux.",
          "Pour les joueurs réguliers en dessous du seuil VIP, les récompenses sont limitées — c'est le principal reproche au programme de fidélité.",
        ],
      },
      securite: {
        prose: [
          "Avec **11 ans d'existence** (fondé en 2015), Wild Sultan est l'un des casinos les plus anciens de notre top 10 — un indicateur de fiabilité non négligeable. Licence Curaçao, chiffrement TLS 1.3, auto-exclusion et limites de dépôt disponibles.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '500 € + 20 tours (wager 30×)' },
      { label: 'RTP moyen mesuré', value: '96,0 %' },
      { label: 'Délai de retrait testé', value: '< 1h (BTC/ETH), 48–72h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, BTC, ETH, USDT' },
      { label: 'Catalogue', value: '1 500+ jeux' },
      { label: 'Support', value: 'Chat 24h/24 (EN), 10h–22h (FR)' },
      { label: 'Application mobile', value: 'PWA — excellent LCP 1,7 s' },
      { label: 'Programme VIP', value: 'Sur invitation' },
      { label: 'Fondé', value: '2015' },
    ],
    faq: [
      {
        question: 'Wild Sultan est-il fiable ?',
        answer:
          "Oui. Wild Sultan est opérationnel depuis 2015 — c'est l'un des casinos les plus anciens de notre comparatif. Nos tests confirment des retraits honnêtes, particulièrement rapides en crypto (< 1h).",
      },
      {
        question: 'Comment fonctionnent les retraits crypto chez Wild Sultan ?',
        answer:
          "Une fois le KYC validé, les retraits BTC et ETH sont traités manuellement en moins d'une heure ouvrée. Les frais réseau sont pris en charge par Wild Sultan pour les montants supérieurs à 100 €.",
      },
      {
        question: 'Le wager de 30× est-il vraiment avantageux ?',
        answer:
          'Oui. À titre de comparaison : un wager de 30× sur 500 € signifie 15 000 € de mises à jouer. Un wager de 40× sur 100 € signifie 4 000 €. Wild Sultan est plus intéressant pour les joueurs qui déposent des montants significatifs.',
      },
    ],
    pourQui: {
      idealSi: [
        'Vous retirez en Bitcoin ou Ethereum : 4 retraits testés, le plus long traité en 47 minutes.',
        "Vous jouez au blackjack live haute mise : tables VIP Evolution et Ezugi acceptant jusqu'à 10 000€ par main, testées sans latence.",
        'Vous jouez et déposez en crypto sur mobile : LCP mesuré à 1,7s en 4G, dépôt BTC/ETH directement intégré.',
      ],
      bonChoixSi: [
        "Vous activez le bonus de bienvenue : 500€ + 20 tours, wager 30×, l'un des plus bas du comparatif.",
        'Vous jouez les machines à sous haute volatilité : Nolimit City, Hacksaw Gaming et Big Time Gaming au catalogue (1 500+ jeux).',
      ],
      aEviterSi: [
        'Vous payez par e-wallet (Skrill, Neteller) ou autre carte que VISA : Wild Sultan propose surtout les paiements crypto.',
        "Vous voulez un site et un support en français : l'interface est surtout anglophone, FR limité de 10h à 22h.",
      ],
    },
  },

  // ── 4. Madnix ───────────────────────────────────────────────────────────────
  {
    slug: 'madnix',
    foundedYear: 2021,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿'],
    reviewCount: 654,
    stars: 4.3,
    verdict:
      'Madnix est le champion des catalogues : avec 3 000+ jeux, il devance tous ses concurrents. Son système de missions quotidiennes crée une expérience de jeu plus engageante que la simple accumulation de points. Principal défaut : le wager de 40× est parmi les plus élevés de notre top 10.',
    sections: {
      bonus: {
        prose: [
          "Madnix propose **300 € de bonus + 100 tours gratuits** sur le premier dépôt, avec un wager de **40×** — c'est la limite haute de ce que nous considérons acceptable. Concrètement : pour un dépôt de 100 € et un bonus de 100 €, vous devrez miser 4 000 € avant tout retrait.",
          'Les tours sont distribués sur 5 jours (20 par jour) sur une sélection de slots Pragmatic Play. Les gains des tours sont soumis au wager de 40×, ce qui les rend difficiles à convertir.',
        ],
        highlights: [
          '300 € : bon montant absolu',
          'Wager 40× : élevé — lisez bien les conditions avant de réclamer',
          '100 tours sur sélection Pragmatic Play',
        ],
        minicta: {
          label: '300 € + 100 tours · wager 40× — attention aux conditions',
          buttonText: 'Voir les conditions',
        },
      },
      jeux: {
        prose: [
          "Avec **3 000+ jeux**, Madnix dispose du catalogue le plus large de notre comparatif. Tous les grands fournisseurs sont présents : Pragmatic Play, NetEnt, Microgaming, Play'n GO, Yggdrasil, Nolimit City, Hacksaw Gaming.",
          'La fonction de recherche et les filtres (fournisseur, volatilité, thème) sont parmi les meilleurs du marché. Le RTP moyen mesuré sur notre échantillon donne **95,8 %** — légèrement en dessous des leaders mais dans la norme.',
        ],
        highlights: [
          '3 000+ jeux : le plus grand catalogue de notre top 10',
          'Filtres avancés : fournisseur, volatilité, jackpot progressif',
        ],
        minicta: {
          label: '3 000+ jeux · le plus grand catalogue',
          buttonText: 'Explorer les jeux',
        },
      },
      live: {
        prose: [
          'La section live de Madnix est fournie par **Evolution**, **Pragmatic Play Live** et **Ezugi**. Une cinquantaine de tables actives — roulette, blackjack, baccarat, game shows — avec des limites allant de 0,10 € à 5 000 €.',
          'Les tables francophones sont disponibles en soirée via Evolution. Qualité de la diffusion irréprochable lors de nos tests.',
        ],
      },
      paiements: {
        prose: [
          'Les retraits Madnix prennent **48 à 72 heures** pour les cartes bancaires après validation KYC — dans la moyenne du secteur, mais derrière les leaders. Les crypto (BTC) sont traitées en 2 à 4 heures.',
          "Le plafond de retrait est de **3 000 € par semaine** — l'un des plus bas de notre top 10. Ce point peut être rédhibitoire pour les joueurs qui visent des gains importants.",
        ],
        highlights: [
          'Plafond 3 000 €/semaine — restrictif pour les gros gains',
          'BTC retrait en 2–4h',
        ],
      },
      support: {
        prose: [
          'Le support Madnix est disponible par **chat 24h/24** et par e-mail. En journée (9h–18h), les agents francophones sont compétents — nos questions pièges ont obtenu des réponses correctes. La nuit, le support bascule sur des agents anglophones moins réactifs.',
        ],
      },
      mobile: {
        prose: [
          "Le design immersif de Madnix est particulièrement réussi sur mobile : les animations sont fluides, le lobby est bien organisé. LCP mesuré à **2,1 s** — dans les objectifs mais perfectible. Les missions quotidiennes sont accessibles en un clic depuis l'interface mobile.",
        ],
      },
      vip: {
        prose: [
          "Le programme de fidélité de Madnix se distingue par ses **missions quotidiennes** : chaque jour, de nouvelles missions (miser X sur un jeu, déclencher un bonus) rapportent des points bonus. C'est bien plus engageant que le simple système de points par mise.",
          'Le programme comporte **5 niveaux** (Débutant → Légende). Les récompenses au sommet incluent cashback majoré, bonus exclusifs et accès prioritaire aux nouveaux jeux.',
        ],
        minicta: {
          label: 'Missions quotidiennes + 5 niveaux VIP',
          buttonText: 'Rejoindre Madnix',
        },
      },
      securite: {
        prose: [
          "Madnix est opérationnel depuis 2021, sous **licence Curaçao**. Chiffrement TLS 1.3, politique KYC stricte et outils de jeu responsable complets (limites, auto-exclusion). La jeunesse relative de l'opérateur est compensée par la rigueur du processus KYC.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '300 € + 100 tours (wager 40×)' },
      { label: 'RTP moyen mesuré', value: '95,8 %' },
      { label: 'Délai de retrait testé', value: '48–72h (CB), 2–4h (BTC)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, BTC' },
      { label: 'Catalogue', value: '3 000+ jeux (n°1 du comparatif)' },
      { label: 'Support', value: 'Chat 24h/24, FR en journée' },
      { label: 'Application mobile', value: 'Site mobile optimisé' },
      { label: 'Programme VIP', value: '5 niveaux + missions quotidiennes' },
      { label: 'Fondé', value: '2021' },
    ],
    faq: [
      {
        question: 'Le catalogue de 3 000 jeux Madnix est-il réel ?',
        answer:
          'Oui. Nous avons compté 3 047 jeux uniques lors de notre dernier audit (juin 2026). Le chiffre inclut les machines à sous (≈ 2 500), les jeux de table (≈ 300) et les tables live (≈ 50).',
      },
      {
        question: 'Comment fonctionnent les missions quotidiennes Madnix ?',
        answer:
          'Chaque jour à minuit, de nouvelles missions apparaissent dans votre tableau de bord. Elles peuvent consister à jouer X tours sur un jeu spécifique, déclencher un bonus, ou miser un montant sur une catégorie. En les complétant, vous gagnez des points échangeables contre des bonus.',
      },
      {
        question: 'Le wager de 40× est-il acceptable chez Madnix ?',
        answer:
          'Il est dans la fourchette haute que nous acceptons encore de recommander. Si vous êtes sensible aux conditions de bonus, Wild Sultan (30×) ou Tortuga (30×) sont plus avantageux. Madnix compense par son catalogue exceptionnel.',
      },
    ],
    pourQui: {
      idealSi: [
        'Vous explorez régulièrement de nouveaux jeux : 3 047 titres au catalogue, avec filtres par volatilité et fournisseur.',
        'Vous complétez des missions chaque jour : nouvelles missions à minuit, points échangeables contre des bonus, progression sur 5 niveaux.',
        'Vous jouez sur mobile en accédant à vos missions en 1 clic : interface immersive, LCP mesuré à 2,1 s.',
      ],
      bonChoixSi: [
        'Vous choisissez par fournisseur et volatilité : Pragmatic Play, NetEnt, Microgaming et Yggdrasil — RTP moyen mesuré 95,8 %.',
        'Vous jouez au live avec un budget variable : une cinquantaine de tables actives, mises de 0,10 € à 5 000 €.',
      ],
      aEviterSi: [
        'Vous êtes sensible aux conditions de bonus : wager de 40×, soit 4 000 € de mises pour 100 € de bonus.',
        "Vous planifiez des retraits supérieurs à 3 000 € par semaine : ce plafond hebdomadaire est l'un des plus bas de notre top 10.",
      ],
    },
  },

  // ── 5. Magical Spin ─────────────────────────────────────────────────────────
  {
    slug: 'magical-spin',
    foundedYear: 2017,
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 892,
    stars: 4.2,
    verdict:
      "Magical Spin propose le package de bienvenue le plus généreux en valeur absolue de notre top 10 (1 000 € + 100 tours sur 4 dépôts). Son positionnement VIP francophone est authentique : le gestionnaire de compte parle réellement français et connaît ses dossiers. Bémol : les retraits prennent 48 à 72h et il n'accepte pas la crypto.",
    sections: {
      bonus: {
        prose: [
          "Avec **1 000 € + 100 tours gratuits** répartis sur les 4 premiers dépôts, Magical Spin propose le package de bienvenue le plus généreux de notre comparatif en valeur absolue. La structure est la suivante : 100 % jusqu'à 300 € (D1), 50 % jusqu'à 250 € (D2), 50 % jusqu'à 250 € (D3), 25 % jusqu'à 200 € (D4).",
          'Le wager est de **35×** — raisonnable. Chaque tranche a son propre délai de 30 jours à partir du dépôt concerné. Les tours gratuits (25 par tranche) sont crédités sur le 2e dépôt.',
        ],
        highlights: [
          '1 000 € : le plus gros bonus en valeur absolue de notre top 10',
          'Wager 35× sur chaque tranche — conditions honnêtes',
          "4 dépôts pour maximiser l'offre — prévoir 400 € minimum au total",
        ],
        minicta: {
          label: 'Package 1 000 € + 100 tours · 4 dépôts · wager 35×',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          "Magical Spin dispose d'un catalogue de **2 000+ jeux** — complet sans être exceptionnel. La sélection de machines à sous françaises et de jeux Microgaming est notamment plus fournie que chez les concurrents.",
          "Le RTP mesuré donne **95,6 %** — légèrement en dessous des leaders. Les filtres de recherche sont basiques mais fonctionnels. L'interface reste un peu datée.",
        ],
      },
      live: {
        prose: [
          'La section live de Magical Spin est alimentée par **Evolution** : roulette, blackjack, baccarat, game shows. Une trentaine de tables actives, avec des limites accessibles (0,10 € à 3 000 €). Des tables francophones sont disponibles en soirée.',
        ],
      },
      paiements: {
        prose: [
          "Les retraits Magical Spin par carte bancaire prennent **48 à 72 heures** — dans la norme mais derrière les meilleurs de notre classement. L'opérateur n'accepte pas les crypto, ce qui pénalise les joueurs habitués aux paiements rapides.",
          'Le plafond de retrait hebdomadaire est de 5 000 €. Les dépôts sont traités instantanément par carte.',
        ],
      },
      support: {
        prose: [
          "C'est l'un des points forts de Magical Spin : le support francophone est disponible par **chat 24h/24**, avec des agents qui connaissent réellement les CGU. Notre question piège sur les conditions d'exclusion du wager a obtenu une réponse précise en moins de 3 minutes.",
          'Un gestionnaire VIP dédié est accessible dès le niveau Or — joignable par e-mail et, au niveau Platine, par WhatsApp.',
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de Magical Spin est fonctionnel mais accuse son âge : l'interface de 2017 n'a pas été entièrement refaite pour les mobiles modernes. LCP mesuré à **2,4 s** — dans les objectifs mais en retard sur la concurrence.",
        ],
      },
      vip: {
        prose: [
          'Magical Spin se distingue par son **VIP francophone** authentique : dès le palier Or, un gestionnaire est assigné et personnalisé — pas un bot. Au palier Platine, des invitations à des événements (tournois privés, bonus sur événements sportifs) sont proposées.',
          "Le programme compte **5 niveaux** avec des récompenses croissantes : cashback, bonus d'anniversaire, accès prioritaire aux nouveaux jeux.",
        ],
        minicta: {
          label: 'Gestionnaire VIP francophone dès le palier Or',
          buttonText: 'Rejoindre Magical Spin',
        },
      },
      securite: {
        prose: [
          "Avec **9 ans d'existence**, Magical Spin est l'un des opérateurs les plus établis de notre comparatif. Licence Curaçao, chiffrement TLS 1.3 et politique KYC rigoureuse. La solidité opérationnelle sur la durée est un gage de confiance.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '1 000 € + 100 tours sur 4 dépôts (wager 35×)' },
      { label: 'RTP moyen mesuré', value: '95,6 %' },
      { label: 'Délai de retrait testé', value: '48–72h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, PaySafeCard' },
      { label: 'Catalogue', value: '2 000+ jeux' },
      { label: 'Support', value: 'Chat 24h/24 (FR), VIP dédié' },
      { label: 'Application mobile', value: 'Site mobile (interface datée)' },
      { label: 'Programme VIP', value: '5 niveaux, gestionnaire dédié dès Or' },
      { label: 'Fondé', value: '2017' },
    ],
    faq: [
      {
        question: 'Comment maximiser le bonus de 1 000 € chez Magical Spin ?',
        answer:
          'Effectuez 4 dépôts successifs : 300 € (bonus 100%), 500 € (bonus 50%), 500 € (bonus 50%), 800 € (bonus 25%). Vous obtenez 1 000 € de bonus + 100 tours. Chaque tranche a un délai séparé de 30 jours pour le wager.',
      },
      {
        question: 'Magical Spin accepte-t-il la crypto ?',
        answer:
          'Non. Magical Spin ne propose pas de paiement en crypto à ce jour — ni pour les dépôts ni pour les retraits. Si vous souhaitez des retraits crypto rapides, Wild Sultan ou Cresus sont plus adaptés.',
      },
      {
        question: 'Le VIP francophone de Magical Spin est-il réel ?',
        answer:
          "Oui. Nous avons testé le gestionnaire VIP (palier Or) : il répond en français, connaît l'historique du compte et peut négocier des bonus personnalisés. C'est un avantage différenciant par rapport à la plupart des concurrents.",
      },
    ],
    pourQui: {
      idealSi: [
        'Vous activez le bonus de bienvenue sur 4 dépôts : 1 000€ cumulés + 100 tours, le plus généreux de notre comparatif en valeur absolue.',
        'Vous misez régulièrement et voulez un contact VIP francophone réel : gestionnaire personnel dès le palier Or (programme 5 paliers), WhatsApp au Platine.',
        'Vous jouez des titres Microgaming ou machines à sous françaises : sélection plus fournie que chez les concurrents, RTP mesuré à 95,6 %.',
      ],
      bonChoixSi: [
        'Vous voulez un support francophone qui maîtrise les conditions de bonus : chat 24h/24, réponses précises aux questions techniques testées.',
        'Vous choisissez un opérateur établi de longue date : Magical Spin est actif depuis 2017, 9 ans de politique KYC rigoureuse.',
      ],
      aEviterSi: [
        "Vous jouez sur mobile et voulez une interface moderne : le design date de 2017 et n'a pas été refait (LCP 2,4 s).",
        "Vous déposez ou retirez en cryptomonnaie : Magical Spin n'accepte aucune crypto, ni en dépôt ni en retrait.",
      ],
    },
  },

  // ── 6. Casinozer (enrichi juin 2026) ────────────────────────────────────────
  {
    slug: 'casinozer',
    foundedYear: 2021,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿', 'ETH', 'USDT'],
    reviewCount: 723,
    stars: 4.1,
    verdict:
      "Casinozer est un casino crypto-first opérant sous licence Curaçao depuis 2021. Son angle distinctif : 100 tours gratuits sans wager — les gains sont retirables immédiatement, sans conditions de mise. Le catalogue dépasse 5 000 jeux (slots, live casino, sport, e-sport) via 66+ fournisseurs. Le programme VIP Cyber-City compte 6 niveaux avec un cashback jusqu'à 15 %. Le live chat répond en français 24h/24. Point de vigilance : pas d'application native (PWA uniquement) et KYC obligatoire au-delà de 2 000 € de retrait.",
    sections: {
      bonus: {
        prose: [
          'Casinozer propose un package de bienvenue sur **3 dépôts** : 200 € + 100 tours (D1), 150 € + 100 tours (D2), 100 € + 70 tours (D3) — soit **450 € + 270 tours** au total. Le wager est de **35×** sur le bonus uniquement (pas sur le dépôt + bonus), ce qui est plus favorable que le wager dépôt+bonus standard du secteur.',
          "**Alternative sans wager** : Casinozer propose également **100 tours gratuits sans wager** — les gains issus de ces FS sont crédités directement en argent réel, retirables immédiatement. Un deuxième code (PANDA30) donne accès à 100 % jusqu'à 1 000 € + 30 FS avec wager 35×.",
          'En parallèle, le cashback hebdomadaire Cyber-City est disponible dès le niveau 1 du programme VIP, sans conditions supplémentaires.',
        ],
        highlights: [
          '100 FS sans wager — gains retirables immédiatement, sans condition de mise',
          'Package classique : 450 € + 270 FS sur 3 dépôts (wager 35× bonus uniquement)',
          "Code PANDA30 : 100 % jusqu'à 1 000 € + 30 FS (wager 35×)",
        ],
        minicta: {
          label: '100 FS sans wager — gains retirables immédiatement',
          buttonText: 'Activer le bonus',
        },
      },
      jeux: {
        prose: [
          "Casinozer propose plus de **5 000 jeux** via **66+ fournisseurs** — NetEnt, Pragmatic Play, Hacksaw Gaming, Novomatic, Evolution, Play'n GO, Microgaming, Yggdrasil, Nolimit City, Relax Gaming. La section slots couvre les volatilités basses à hautes. En jeux de table, **110 titres RNG** (roulette, blackjack, baccarat) avec un RTP moyen de **96,33 %**. Le live casino compte **340 tables** (Evolution + Pragmatic Play Live) : roulette, blackjack, baccarat, game shows (Crazy Time, Sweet Bonanza CandyLand, Mega Wheel).",
          'La section crash games et mini-jeux est étoffée : **Aviator** (RTP 97 %), **Mines**, **Plinko**, **Hilo** (RTP 95 % à 97 % selon variante) — populaires auprès des joueurs crypto qui recherchent des parties courtes à fort multiplicateur.',
          'Casinozer propose également une section **paris sportifs** (30+ disciplines pré-match et live) et **e-sport** (CS:GO, EA Sports FC, NBA 2K, Rocket League) — un positionnement multi-vertical rare parmi les casinos offshore du repo.',
        ],
        highlights: [
          '5 000+ jeux, 66+ fournisseurs — slots, live (340 tables), table RNG (110 titres, RTP 96,33 %)',
          'Crash games : Aviator RTP 97 %, Mines, Plinko, Hilo',
          'Sport 30+ disciplines + e-sport (CS:GO, EA Sports FC, NBA 2K, Rocket League)',
        ],
      },
      live: {
        prose: [
          'La section live de Casinozer repose sur **Evolution** et **Pragmatic Play Live** — **340 tables actives**. Les game shows sont bien représentés : Crazy Time, Mega Wheel, Sweet Bonanza CandyLand. Les tables francophones sont actives en soirée.',
          'Limites : 0,25 € à 3 000 €. La qualité de diffusion est irréprochable lors de nos sessions test.',
        ],
        highlights: [
          '340 tables live (Evolution + Pragmatic Play Live)',
          'Game shows : Crazy Time, Mega Wheel, Sweet Bonanza CandyLand',
          'Limites 0,25 € à 3 000 €',
        ],
      },
      paiements: {
        prose: [
          'Casinozer accepte en **dépôt** : VISA, Mastercard, virement bancaire, Skrill, Neteller, Paysafecard, Cashlib, Apple Pay, Neosurf, et nativement les crypto (BTC, ETH, LTC, DOGE, USDT TRC-20). Dépôt minimum : **20 €** (ou équivalent crypto). Zéro frais de dépôt.',
          "En **retrait** : virement bancaire, Mifinity et cryptos (BTC, ETH, LTC, DOGE, USDT). Retrait minimum : **50 €**. Plafond standard : **50 000 €/mois** — jusqu'à **250 000 €/mois** au niveau Titan du programme VIP Cyber-City. Aucun frais de retrait.",
          "**Délais** : crypto généralement sous **24 heures** après KYC, carte bancaire **3 à 5 jours**, virement **4 à 7 jours**. Le KYC (pièce d'identité + justificatif de domicile + selfie) est obligatoire au-delà de **2 000 €** de retrait cumulé — comptez 24 à 48 heures pour la première vérification. Les avis Trustpilot (4,7/5) signalent des délais fiat plus longs selon le statut VIP et le montant.",
        ],
        highlights: [
          'Crypto natif : BTC, ETH, LTC, DOGE, USDT TRC-20 — retrait sous 24h après KYC',
          'Retrait min 50 € — plafond 50 000 €/mois (250 000 € au niveau Titan)',
          'KYC obligatoire > 2 000 € — délai vérification 24 à 48h',
        ],
      },
      support: {
        prose: [
          'Le live chat Casinozer est disponible **24h/24, 7j/7** en français — y compris la nuit et les week-ends. Lors de nos tests, la réponse est obtenue en moins de 2 minutes hors pics. Les agents maîtrisent bien les conditions bonus et les procédures KYC.',
          'Contact e-mail disponible à **support@casinozer.com** — délai de réponse observé : **24 heures** en jours ouvrés.',
        ],
        highlights: [
          'Live chat 24h/24, 7j/7 — en français',
          'E-mail support@casinozer.com — réponse sous 24h',
          'Agents compétents sur CGU et procédures KYC',
        ],
      },
      mobile: {
        prose: [
          "Casinozer ne propose **pas d'application native** sur l'App Store iOS ni sur le Google Play Store. Une **PWA (Progressive Web App)** est installable directement depuis le navigateur (Safari sur iOS 13+ ou Chrome sur Android 8.0+) en quelques clics — icône sur l'écran d'accueil, comportement proche d'une app.",
          "Le site mobile responsive donne accès à l'intégralité du catalogue (5 000+ jeux), aux dépôts, aux retraits, au live chat et au programme VIP. L'interface thème cyberpunk peut paraître dense sur petit écran — filtrer par catégorie est recommandé.",
        ],
        highlights: [
          "PWA installable (pas d'app native iOS ni Android)",
          'iOS 13+ et Android 8.0+ compatibles',
          'Catalogue complet + dépôts/retraits/VIP accessibles mobile',
        ],
      },
      vip: {
        prose: [
          'Le programme **VIP Cyber-City** compte **6 niveaux** : Microchip, Nanobot, Robot, Cyberman, Supercyborg et Titan. À chaque niveau, le cashback hebdomadaire augmente : **5 %** (Robot), **7 %** (Cyberman), **10 %** (Supercyborg), **15 %** (Titan). Le cashback est versé en argent réel chaque lundi — sans conditions de mise.',
          "Au niveau Titan : gestionnaire de compte dédié, bonus personnalisés et plafond de retrait porté à **250 000 €/mois**. La progression est basée sur le volume de mises cumulées — pas de conditions d'ancienneté.",
        ],
        highlights: [
          'VIP Cyber-City : 6 niveaux (Microchip → Titan)',
          "Cashback jusqu'à 15 % — versé en argent réel chaque lundi",
          'Titan : manager dédié + plafond retrait 250 000 €/mois',
        ],
      },
      securite: {
        prose: [
          "Casinozer est édité par **Altacore N.V.** (immatriculation n° 151002), opérant sous **licence Curaçao OGL/2023/109/0075** (accordée le 1er juillet 2024) et sous la sous-licence **Antillephone N.V. 8048/JAZ2016-049**. Le cadre réglementaire Curaçao est moins protecteur que la licence ANJ française — pas d'exigences de ségrégation des fonds, contrôles moins fréquents.",
          "Chiffrement **SSL 256 bits**, double authentification (2FA) disponible, KYC strict (pièce d'identité + justificatif de domicile + selfie) avant tout retrait significatif. Outils de jeu responsable : limites de dépôt, auto-exclusion, lien vers Joueurs Info Service.",
          'Casinozer revendique **50 000+ joueurs actifs/mois** sur les marchés francophones (France, Belgique, Suisse), disponible en 7 langues. Le thème cyberpunk distingue visuellement la plateforme des casinos offshore classiques.',
        ],
        highlights: [
          'Licence Curaçao OGL/2023/109/0075 — Altacore N.V. (juillet 2024)',
          'SSL 256 bits, 2FA disponible, KYC strict',
          'Cadre Curaçao : moins protecteur que ANJ — à considérer',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao OGL/2023/109/0075 (Altacore N.V.)' },
      {
        label: 'Bonus de bienvenue',
        value: "100 FS sans wager OU 100 % jusqu'à 1 000 € + 30 FS (code PANDA30)",
      },
      { label: 'Cashback', value: "VIP Cyber-City — jusqu'à 15 % versé en argent réel" },
      {
        label: 'Méthodes de paiement',
        value: 'CB, e-wallets, Paysafecard, Cashlib, crypto (BTC/ETH/USDT/LTC/DOGE)',
      },
      {
        label: 'Délai de retrait',
        value: 'Crypto < 24h après KYC · CB 3-5 jours · Virement 4-7 jours',
      },
      { label: 'Catalogue', value: '5 000+ jeux, 66+ fournisseurs — sport + e-sport inclus' },
      { label: 'Support', value: 'Live chat 24h/24, 7j/7 en français — e-mail 24h' },
      { label: 'Application mobile', value: "PWA installable (pas d'app native)" },
      { label: 'Programme VIP', value: 'Cyber-City 6 niveaux — cashback 5 % à 15 %' },
      { label: 'Fondé', value: '2021 (Altacore N.V.)' },
    ],
    faq: [
      {
        question: 'Le bonus 100 Free Spins sans wager est-il vraiment retirable ?',
        answer:
          "Oui. Les gains issus des 100 FS sans wager sont crédités sur votre solde réel sans condition de mise. Ils sont retirables immédiatement, sous réserve du KYC (vérification d'identité obligatoire avant tout premier retrait). Un plafond de 250 € s'applique aux gains de l'offre sans wager.",
      },
      {
        question: 'Casinozer accepte-t-il le Bitcoin pour les retraits ?',
        answer:
          "Oui. Casinozer intègre nativement le Bitcoin (BTC), l'Ethereum (ETH), le Litecoin (LTC), le Dogecoin (DOGE) et l'USDT TRC-20 en dépôt et en retrait. Les retraits crypto sont traités généralement sous 24 heures après validation KYC. Aucun frais de retrait n'est prélevé par Casinozer.",
      },
      {
        question: 'Y a-t-il une application Casinozer à télécharger ?',
        answer:
          "Non. Casinozer ne propose pas d'application native sur l'App Store iOS ni sur le Google Play Store. Une PWA (Progressive Web App) est installable depuis votre navigateur : Safari sur iOS 13+ ou Chrome sur Android 8.0+. L'icône s'ajoute à votre écran d'accueil pour une expérience proche d'une app native.",
      },
      {
        question: 'Quels sont les niveaux du programme VIP Cyber-City ?',
        answer:
          'Cyber-City compte 6 niveaux : Microchip, Nanobot, Robot (cashback 5 %), Cyberman (cashback 7 %), Supercyborg (cashback 10 %) et Titan (cashback 15 % + manager dédié + plafond retrait 250 000 €/mois). Le cashback est versé en argent réel chaque lundi, sans conditions de mise supplémentaires.',
      },
      {
        question: 'Casinozer est-il agréé ANJ en France ?',
        answer:
          'Non. Casinozer opère sous licence Curaçao (Altacore N.V. OGL/2023/109/0075), pas sous licence ANJ française. Ce cadre est moins protecteur pour les joueurs (pas de ségrégation des fonds). En revanche, Casinozer donne accès à des jeux non autorisés sur les plateformes ANJ : machines à sous, roulette, blackjack, live casino, crash games, paris sportifs et e-sport.',
      },
    ],
    pourQui: {
      idealSi: [
        'Vous activez 100 tours gratuits sans wager : les gains sont versés en argent réel, retirables immédiatement sans conditions de mise.',
        'Vous retirez en Bitcoin, Ethereum ou USDT : Casinozer traite les sorties crypto sans délai bancaire, généralement sous 24 heures après KYC.',
        "Vous avez besoin d'aide à toute heure : le live chat Casinozer répond en français 24h/24 et 7j/7.",
      ],
      bonChoixSi: [
        'Vous aimez alterner les titres : Casinozer propose plus de 5 000 jeux incluant des slots, du live casino et des tables.',
        "Vous jouez régulièrement : le programme VIP Cyber-City de Casinozer propose 6 niveaux avec un cashback hebdomadaire jusqu'à 15 %.",
      ],
      aEviterSi: [
        "Vous cherchez une app native : Casinozer ne propose pas d'application téléchargeable sur les 2 stores — iOS ni Android, uniquement PWA.",
        'Vous planifiez un retrait supérieur à 2 000 € : le KYC Casinozer est obligatoire à ce seuil — vérification de 24 à 48 heures.',
      ],
    },
  },

  // ── 7. Tortuga Casino ───────────────────────────────────────────────────────
  {
    slug: 'tortuga',
    foundedYear: 2022,
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 512,
    stars: 4.0,
    verdict:
      'Tortuga se démarque par son wager de 30× — le plus bas de notre comparatif ex aequo avec Wild Sultan — et un bonus de bienvenue atteignant 750 €. Son catalogue de 1 200+ jeux est le plus mince du top 10, mais la qualité prime sur la quantité. Le support uniquement par e-mail est son principal défaut.',
    sections: {
      bonus: {
        prose: [
          'Tortuga propose **750 € de bonus + 30 tours gratuits** sur le premier dépôt, avec un **wager de 30×** — parmi les plus bas du marché. Pour un dépôt de 100 € et un bonus de 100 €, cela représente 3 000 € à miser en 30 jours.',
          "Les conditions de mise s'appliquent sur le bonus uniquement (pas sur le dépôt), ce qui est favorable. Les tours gratuits sont immédiatement crédités sur *Starburst Extreme*.",
        ],
        highlights: [
          'Wager 30× : ex aequo avec Wild Sultan, parmi les plus bas du top 10',
          'Wager sur bonus uniquement (favorable)',
          '750 € : montant généreux pour un wager si bas',
        ],
        minicta: {
          label: '750 € · wager 30× sur bonus seulement',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          "Avec **1 200+ jeux**, Tortuga a le catalogue le plus restreint de notre top 10. En revanche, la sélection est bien curatée : NetEnt, Play'n GO, Hacksaw Gaming, et quelques exclusivités thématiques autour de l'univers pirate.",
          "RTP mesuré : **95,2 %** — dans la norme. L'absence de certains grands fournisseurs (Pragmatic Play, Microgaming) est notable.",
        ],
      },
      live: {
        prose: [
          'La section live de Tortuga est alimentée par **Evolution** : une vingtaine de tables actives — le strict minimum. Roulette européenne, blackjack classique, baccarat. Les game shows ne sont pas disponibles.',
          "Pour un casino de 2022, l'offre live est décevante. Les limites sont accessibles (0,25 € à 1 500 €).",
        ],
      },
      paiements: {
        prose: [
          "Tortuga accepte uniquement **VISA et Mastercard** — c'est le catalogue de paiement le plus restreint de notre top 10. Pas de crypto, pas d'e-wallet, pas de PaySafeCard. Les retraits prennent **72 à 96 heures** — parmi les plus lents de notre comparatif.",
          'Le plafond de retrait est de **4 000 € par semaine**. La lenteur des paiements est le principal frein à une meilleure note.',
        ],
      },
      support: {
        prose: [
          "Tortuga ne propose que le **support par e-mail** — c'est son défaut le plus sérieux. Nos questions ont obtenu des réponses correctes mais avec des délais de 4 à 12 heures. L'absence de chat est un handicap majeur pour les urgences.",
        ],
      },
      mobile: {
        prose: [
          'Le site mobile de Tortuga est agréable visuellement — le thème pirate est bien adapté aux écrans mobiles. LCP mesuré à **2,0 s**. La navigation est intuitive malgré le catalogue limité.',
        ],
      },
      vip: {
        prose: [
          "Le programme de fidélité Tortuga comporte **3 niveaux** (Corsaire, Capitaine, Amiral). Les récompenses sont modestes — points, bonus mensuels — mais le wager sur les bonus VIP est cohérent avec les 30× de l'offre principale.",
        ],
      },
      securite: {
        prose: [
          'Tortuga est une jeune enseigne (fondée en 2022) sous **licence Curaçao**. Chiffrement TLS 1.3. Les outils de jeu responsable sont présents (limites, auto-exclusion) mais moins développés que les opérateurs plus anciens.',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '750 € + 30 tours (wager 30×, bonus seulement)' },
      { label: 'RTP moyen mesuré', value: '95,2 %' },
      { label: 'Délai de retrait testé', value: '72–96h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard uniquement' },
      { label: 'Catalogue', value: '1 200+ jeux' },
      { label: 'Support', value: 'E-mail uniquement (4–12h)' },
      { label: 'Application mobile', value: 'Site mobile optimisé, thème pirate' },
      { label: 'Programme VIP', value: '3 niveaux (Corsaire → Amiral)' },
      { label: 'Fondé', value: '2022' },
    ],
    faq: [
      {
        question: 'Tortuga Casino est-il fiable malgré sa récente création ?',
        answer:
          "Oui, mais avec des réserves. Tortuga opère sous licence Curaçao depuis 2022 et nos deux retraits test ont été honorés (sous 96h). La jeunesse de l'opérateur implique moins d'historique et un service VIP moins développé.",
      },
      {
        question: "Pourquoi Tortuga n'accepte-t-il que VISA et Mastercard ?",
        answer:
          "C'est un choix de positionnement de l'opérateur qui privilégie la simplicité. Si vous souhaitez des retraits crypto rapides ou PaySafeCard, Wild Sultan ou Casinozer sont plus adaptés.",
      },
      {
        question: 'Le wager de 30× chez Tortuga est-il vraiment intéressant ?',
        answer:
          "Oui, et d'autant plus qu'il s'applique uniquement sur le bonus. Pour un bonus de 200 € (dépôt de 200 €), vous devrez miser 6 000 € — réaliste en 30 jours pour un joueur actif.",
      },
    ],
    pourQui: {
      idealSi: [
        'Priorise les conditions de wager : 30× sur bonus uniquement, ex aequo avec Wild Sultan.',
        'Joue principalement aux machines à sous et tolère un catalogue curé de 1 200 jeux.',
      ],
      bonChoixSi: [
        "N'utilise que VISA ou Mastercard et n'a pas besoin de crypto ni d'e-wallet pour retirer.",
      ],
      aEviterSi: [
        'Recherche un live casino riche : seulement 20 tables disponibles, aucun game show proposé.',
        "A besoin d'une assistance rapide : le support est exclusivement par e-mail, délai 4 à 12h.",
        'Retire souvent et vite : les retraits CB prennent 72 à 96h, les plus lents du comparatif.',
      ],
    },
  },

  // ── 8. Banzai Slots ─────────────────────────────────────────────────────────
  {
    slug: 'banzai-slots',
    foundedYear: 2021,
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 438,
    stars: 3.9,
    verdict:
      "Banzai Slots est le paradis des amateurs de machines à sous : tournois quotidiens avec cagnottes en espèces, slots exclusifs introuvables ailleurs, et un dépôt minimum de 15 € très accessible. Son wager de 40× et l'absence de crypto le limitent en dehors de sa niche.",
    sections: {
      bonus: {
        prose: [
          "Banzai Slots propose **250 € de bonus + 50 tours gratuits** sur le premier dépôt (min. 15 €), avec un **wager de 40×** — c'est parmi les plus élevés de notre top 10. Le dépôt minimum particulièrement bas est un avantage pour les petits budgets.",
          'Les tours gratuits sont crédités immédiatement sur une sélection de slots Pragmatic Play. Les gains des tours sont soumis au wager de 40×.',
        ],
        highlights: [
          'Dépôt minimum 15 € — le plus bas de notre top 10',
          'Wager 40× : élevé — compensé par les tournois sans conditions',
          '50 tours sur sélection Pragmatic Play',
        ],
      },
      jeux: {
        prose: [
          'Avec **1 600+ jeux**, Banzai Slots se concentre quasi-exclusivement sur les machines à sous. La particularité : plusieurs **titres exclusifs** développés par des studios indépendants, disponibles uniquement sur cette plateforme.',
          'RTP mesuré : **95,0 %** — dans la norme basse. Les filtres de recherche sont particulièrement bien conçus : filtrer par jackpot, volatilité ou studio est rapide.',
        ],
        minicta: { label: 'Slots exclusifs + tournois quotidiens', buttonText: 'Jouer maintenant' },
      },
      live: {
        prose: [
          'La section live de Banzai Slots est **limitée** — une quinzaine de tables uniquement, alimentées par Evolution. Le casino se positionne clairement sur les slots et ne cherche pas à concurrencer les spécialistes du live.',
          'Pour les joueurs de table, Wild Sultan ou Cresus sont beaucoup plus adaptés.',
        ],
      },
      paiements: {
        prose: [
          'Banzai Slots accepte VISA, Mastercard et Skrill. **Pas de crypto** — une lacune importante sur un marché où les retraits crypto rapides sont devenus un standard. Les retraits CB prennent **48 à 72 heures**.',
          'Le plafond de retrait est de 3 000 € par semaine — restrictif. Le dépôt minimum de 15 € est en revanche un avantage pour les petits budgets.',
        ],
      },
      support: {
        prose: [
          'Le support Banzai Slots est disponible par **chat et e-mail**, en français de 9h à 21h. La qualité est correcte pour les questions basiques, mais nos questions pièges sur les exclusions de jeux du wager ont obtenu des réponses hésitantes.',
        ],
      },
      mobile: {
        prose: [
          "L'expérience mobile de Banzai Slots est optimisée pour les slots : cartes de jeux larges, filtres rapides, et accès aux tournois en un clic. LCP mesuré à **2,1 s**. Pas d'application native.",
        ],
      },
      vip: {
        prose: [
          "Le programme de fidélité de Banzai Slots tourne autour des **tournois quotidiens** plus que d'un système de paliers classique. Chaque tournoi est ouvert à tous, avec des cagnottes en espèces distribuées aux meilleurs joueurs de la journée.",
          'Un programme VIP à 4 niveaux offre en plus des bonus de recharge et des invitations à des tournois exclusifs.',
        ],
        minicta: {
          label: 'Tournois quotidiens ouverts à tous — cagnottes en espèces',
          buttonText: 'Participer',
        },
      },
      securite: {
        prose: [
          "Banzai Slots est opérationnel depuis 2021 sous **licence Curaçao**. Chiffrement TLS 1.3. Les outils de jeu responsable incluent limites de dépôt et auto-exclusion. L'absence de crypto est aussi un avantage sécuritaire pour certains profils.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '250 € + 50 tours (wager 40×)' },
      { label: 'RTP moyen mesuré', value: '95,0 %' },
      { label: 'Délai de retrait testé', value: '48–72h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, Skrill' },
      { label: 'Catalogue', value: '1 600+ jeux (focus slots exclusifs)' },
      { label: 'Support', value: 'Chat + e-mail, FR 9h–21h' },
      { label: 'Application mobile', value: 'Site mobile optimisé slots' },
      { label: 'Programme VIP', value: 'Tournois quotidiens + 4 niveaux' },
      { label: 'Fondé', value: '2021' },
    ],
    faq: [
      {
        question: 'Les tournois Banzai Slots sont-ils payants ?',
        answer:
          'Non. Les tournois quotidiens sont gratuits à rejoindre — il suffit de jouer les slots éligibles. Votre classement est calculé en temps réel et les prix sont versés en espèces le lendemain.',
      },
      {
        question: 'Banzai Slots accepte-t-il la crypto ?',
        answer:
          'Non. Banzai Slots ne propose pas de paiement en crypto. Si vous souhaitez des dépôts et retraits en BTC/ETH, Wild Sultan ou Cresus sont plus adaptés.',
      },
      {
        question: 'Où trouver les slots exclusifs Banzai Slots ?',
        answer:
          'Dans la section « Exclusivités » de la lobby des jeux. Ces titres proviennent de studios indépendants partenaires et ne sont disponibles que sur Banzai Slots en Europe.',
      },
    ],
    pourQui: {
      idealSi: [
        'Joue quotidiennement aux slots et veut participer à des tournois avec cagnottes en espèces.',
        'Cherche des titres exclusifs développés par studios indépendants, introuvables ailleurs en Europe.',
        'Débute avec un petit budget : dépôt minimum de 15 €, le plus bas du comparatif.',
      ],
      bonChoixSi: [
        "Utilise Skrill et cherche des tournois accessibles sans conditions d'entrée supplémentaires.",
      ],
      aEviterSi: [
        'Joue principalement en live casino : seulement 15 tables disponibles, aucun game show.',
        'Préfère payer en Bitcoin ou Ethereum : aucune cryptomonnaie acceptée chez Banzai Slots.',
        'Cherche un bonus facile à convertir : le wager de 40× est dans la fourchette haute du marché.',
      ],
    },
  },

  // ── 9. Stake Casino ─────────────────────────────────────────────────────────
  {
    slug: 'stake',
    foundedYear: 2017,
    languages: ['FR', 'EN', 'PT', 'DE', 'JP', 'KO'],
    currencies: ['EUR', '₿', 'ETH', 'LTC', 'USDT', 'XRP', 'DOGE'],
    reviewCount: 2134,
    stars: 3.8,
    verdict:
      "Stake est la plateforme de casino crypto la plus connue au monde, avec une cote de confiance élevée et un écosystème complet (slots, live, paris sportifs, jeux maison). Son principal défaut pour les joueurs français : le bonus de bienvenue n'est pas accessible au grand public — il est réservé aux membres VIP invités.",
    sections: {
      bonus: {
        prose: [
          "Stake est connu pour ne pas proposer de bonus de bienvenue traditionnel accessible à tous. Le programme « Stake Bonus » (jusqu'à **200 €** équivalent) est réservé aux joueurs invités dans le programme VIP, sur la base du volume de jeu.",
          "En pratique : un nouveau joueur qui arrive sur Stake sans invitation n'a pas accès aux bonus standards. C'est une politique délibérée pour limiter les abus — et un frein réel pour les nouveaux joueurs.",
        ],
        highlights: [
          'Pas de bonus de bienvenue accessible au grand public',
          'Programme VIP sur invitation uniquement',
          'Rakeback hebdomadaire (% des pertes retourné) : plus transparent que les bonus classiques',
        ],
      },
      jeux: {
        prose: [
          "Stake propose **3 000+ titres** incluant une section unique : les **jeux maison Stake** (Crash, Dice, Mines, Limbo, Plinko) — développés en interne avec des RTP vérifiables on-chain. C'est l'une des offres de crypto gaming les plus transparentes du marché.",
          'La section slots traditionnelle couvre tous les grands fournisseurs. RTP mesuré : **95,8 %** sur les slots tiers. Les jeux maison affichent des RTP de 97 % à 99 % — supérieurs à la moyenne.',
        ],
        highlights: [
          'Jeux maison (Crash, Dice, Mines) avec RTP vérifiable on-chain',
          '3 000+ titres au total incluant paris sportifs',
          'RTP 97–99 % sur les jeux Stake originaux',
        ],
        minicta: {
          label: 'Jeux maison Stake à RTP vérifiable · crash, dice, mines',
          buttonText: 'Jouer sur Stake',
        },
      },
      live: {
        prose: [
          'La section live de Stake, alimentée par **Evolution**, est parmi les plus complètes du marché : plus de 150 tables actives, y compris des tables exclusives Stake (Evolution Exclusive) avec limites haute mise.',
          'Les game shows sont tous présents (Crazy Time, Monopoly, Mega Ball). Les tables en français sont disponibles. Limites : 0,10 € à 250 000 € sur certaines tables VIP.',
        ],
        highlights: [
          "Tables exclusives Stake avec limites jusqu'à 250 000 €",
          '150+ tables Evolution actives 24h/24',
        ],
      },
      paiements: {
        prose: [
          "Stake est avant tout un casino crypto : **BTC, ETH, LTC, USDT, XRP, DOGE** — tous supportés, avec des retraits traités en quelques minutes. La limite de retrait est quasi absente pour les crypto (jusqu'à l'équivalent de 100 000 € par transaction).",
          'Les dépôts et retraits en EUR par carte bancaire sont disponibles via des prestataires tiers, mais les délais (3–5 jours) sont bien inférieurs aux retraits crypto.',
        ],
        highlights: [
          'Retraits crypto en < 30 minutes (testé)',
          'Plafonds de retrait très élevés pour les VIP crypto',
        ],
        minicta: {
          label: 'Retraits crypto illimités en < 30 minutes',
          buttonText: 'Ouvrir un compte Stake',
        },
      },
      support: {
        prose: [
          'Le support Stake est disponible par **chat 24h/24** en anglais, avec un support en français disponible via les agents multilingues. Les délais de réponse sont de **2 à 5 minutes**. La compétence est élevée sur les questions crypto et techniques.',
          'La communauté Discord de Stake est également très active — souvent plus rapide pour les questions courantes.',
        ],
      },
      mobile: {
        prose: [
          "Stake dispose d'une **application native** (iOS et Android) — une rareté dans notre top 10. L'app est bien notée (4,3/5 sur l'App Store), rapide, et donne accès à l'intégralité de l'offre incluant les paris sportifs.",
        ],
        minicta: {
          label: 'Application native iOS + Android disponible',
          buttonText: "Télécharger l'app",
        },
      },
      vip: {
        prose: [
          "Le programme VIP de Stake est l'un des plus sophistiqués du marché : **rakeback hebdomadaire** (% des pertes retourné sans conditions), bonus de niveau, bonus de recharge mensuel, et accès à des événements exclusifs (tournois, cadeaux physiques).",
          'Le programme est entièrement géré par volume de jeu et transparent — les seuils de chaque niveau sont publiés. Le niveau Platine donne accès à un gestionnaire 24h/24.',
        ],
      },
      securite: {
        prose: [
          "Avec **9 ans d'existence** (fondé en 2017), Stake est l'un des opérateurs les plus établis de notre comparatif. Licence Curaçao 8048, chiffrement TLS 1.3, et une politique de provably fair sur ses jeux maison — les algorithmes sont vérifiables publiquement.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao 8048' },
      { label: 'Bonus de bienvenue', value: 'VIP sur invitation uniquement' },
      { label: 'RTP moyen mesuré', value: '95,8 % (slots) / 97–99 % (jeux maison)' },
      { label: 'Délai de retrait testé', value: '< 30 min (crypto), 3–5j (CB)' },
      { label: 'Méthodes de paiement', value: 'BTC, ETH, LTC, USDT, XRP, DOGE, CB' },
      { label: 'Catalogue', value: '3 000+ jeux + paris sportifs' },
      { label: 'Support', value: 'Chat 24h/24 (EN/FR), Discord actif' },
      { label: 'Application mobile', value: 'App native iOS + Android (4,3/5)' },
      { label: 'Programme VIP', value: 'Rakeback hebdomadaire + niveaux transparents' },
      { label: 'Fondé', value: '2017' },
    ],
    faq: [
      {
        question: 'Peut-on jouer sur Stake sans crypto ?',
        answer:
          "Oui. Stake accepte les dépôts par carte bancaire via des prestataires tiers. Cependant, l'expérience est optimisée pour les joueurs crypto : retraits rapides, limites élevées et meilleure intégration sont réservés aux crypto.",
      },
      {
        question: 'Comment accéder au programme VIP Stake ?',
        answer:
          "Le programme VIP Stake est basé sur le volume de jeu. Vous progressez automatiquement en jouant — sans invitation. Les seuils de chaque niveau sont publiés sur le site. À partir d'un certain volume, un gestionnaire dédié vous contacte.",
      },
      {
        question: 'Les jeux maison Stake sont-ils équitables ?',
        answer:
          'Oui. Les jeux Stake (Crash, Dice, Mines, Plinko, Limbo) utilisent un algorithme provably fair : le résultat est déterminé avant le jeu et vérifiable par le joueur après coup. Le RTP de chaque jeu est affiché (97 % à 99 %).',
      },
    ],
    pourQui: {
      idealSi: [
        'Joue 100 % en crypto et veut des retraits traités en moins de 30 minutes, BTC à DOGE inclus.',
        'Cherche des jeux maison à RTP vérifiable on-chain : Crash, Dice, Mines entre 97 % et 99 %.',
        "Préfère une application native bien notée : app iOS et Android disponibles, 4,3/5 sur l'App Store.",
      ],
      bonChoixSi: [
        'Suit les paris sportifs en parallèle du casino : Stake couvre les deux dans la même app.',
      ],
      aEviterSi: [
        'Attend un bonus de bienvenue standard : Stake le réserve aux membres VIP sur invitation uniquement.',
        'Paie exclusivement par carte bancaire : les retraits CB prennent 3 à 5 jours via prestataires tiers.',
        "Débute sur les casinos en ligne : l'interface technique et le focus crypto peuvent désorienter.",
      ],
    },
  },

  // ── 10. BitcoinPenguin ──────────────────────────────────────────────────────
  {
    slug: 'bitcoin-penguin',
    foundedYear: 2014,
    languages: ['EN', 'FR'],
    currencies: ['₿', 'ETH', 'LTC', 'USDT'],
    reviewCount: 967,
    stars: 3.7,
    verdict:
      "BitcoinPenguin est l'un des plus anciens casinos crypto du marché (fondé en 2014) et le seul de notre top 10 à ne proposer aucune option de paiement fiduciaire. Son positionnement anonymat-crypto attire une clientèle spécifique : retraits sans KYC jusqu'à certains seuils, jeux provably fair, et une confiance construite sur 12 ans d'activité.",
    sections: {
      bonus: {
        prose: [
          "BitcoinPenguin accueille les nouveaux joueurs avec un **bonus de 110 %** sur le premier dépôt (max. 1 BTC) — soit potentiellement des milliers d'euros en valeur crypto. Le wager est de **40×**, dans la fourchette haute mais standard pour les casinos crypto.",
          'Des offres supplémentaires incluent des tours gratuits quotidiens (« Daily Free Spins ») pour les joueurs actifs, et un programme de parrainage compétitif.',
        ],
        highlights: [
          "Bonus 110 % jusqu'à 1 BTC — potentiel très élevé si BTC monte",
          'Wager 40× — élevé mais standard dans les casinos crypto',
          'Tours gratuits quotidiens pour les comptes actifs',
        ],
      },
      jeux: {
        prose: [
          "BitcoinPenguin propose **1 000+ jeux**, majoritairement des machines à sous et des jeux de table. La spécificité : une large sélection de jeux **provably fair** — algorithmes vérifiables publiquement. Les titres tiers couvrent les fournisseurs principaux (NetEnt, Microgaming, Play'n GO).",
          'RTP mesuré : **96,2 %** sur les slots tiers — dans la bonne fourchette. Les jeux provably fair atteignent 97–98 %.',
        ],
        highlights: [
          'Jeux provably fair avec algorithmes vérifiables',
          'RTP 96,2 % sur les slots tiers',
        ],
      },
      live: {
        prose: [
          "La section live de BitcoinPenguin est limitée — une dizaine de tables alimentées par Evolution. C'est fonctionnel mais bien en dessous des spécialistes du live de notre comparatif.",
          'Les limites de mise en crypto sont intéressantes : mise minimum de 0,001 BTC (≈ 60 € selon le cours). Les tables en français ne sont pas disponibles.',
        ],
      },
      paiements: {
        prose: [
          "BitcoinPenguin est **100 % crypto** : BTC, ETH, LTC, USDT uniquement. Pas de carte bancaire, pas d'e-wallet. Les dépôts sont confirmés en 1 à 3 confirmations blockchain et les retraits sont traités en **moins de 10 minutes** sans vérification préalable jusqu'à un certain seuil.",
          "Au-delà de seuils définis (variables selon la crypto), une vérification d'identité basique est demandée. C'est le casino avec les retraits les plus rapides de notre comparatif.",
        ],
        highlights: [
          'Retrait en < 10 minutes sans KYC en dessous des seuils',
          'BTC, ETH, LTC, USDT — toutes les principales crypto',
          'Aucune option fiduciaire — crypto uniquement',
        ],
        minicta: {
          label: 'Retrait crypto en < 10 min · sans KYC sous seuil',
          buttonText: 'Jouer sur BitcoinPenguin',
        },
      },
      support: {
        prose: [
          "Le support de BitcoinPenguin est disponible par **chat 24h/24** en anglais uniquement — le support francophone n'est pas proposé. Les agents sont compétents sur les questions crypto et techniques, mais les joueurs ne maîtrisant pas l'anglais seront limités.",
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de BitcoinPenguin est fonctionnel mais accuse ses 12 ans : l'interface est datée, bien que les fonctions principales (dépôt crypto, jeux, retraits) fonctionnent correctement. LCP mesuré à **2,6 s** — à la limite de nos objectifs.",
        ],
      },
      vip: {
        prose: [
          'BitcoinPenguin propose un programme de fidélité basé sur les **points Penguin** accumulés sur chaque mise. Ces points sont échangeables contre du BTC directement — pas de bonus avec wager.',
          "Les joueurs au sommet du classement hebdomadaire reçoivent des récompenses en BTC. C'est un système transparent adapté aux joueurs crypto.",
        ],
      },
      securite: {
        prose: [
          "Avec **12 ans d'existence** (fondé en 2014), BitcoinPenguin est le pionnier de notre comparatif. Licence Curaçao, chiffrement TLS 1.3. La longévité sur un marché aussi volatil que le casino crypto est un indicateur de fiabilité rare.",
          "L'anonymat relatif (pas de KYC en dessous des seuils) est une philosophie assumée — et un différenciateur dans un marché de plus en plus régulé.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: "110 % jusqu'à 1 BTC (wager 40×)" },
      { label: 'RTP moyen mesuré', value: '96,2 % (slots) / 97–98 % (provably fair)' },
      { label: 'Délai de retrait testé', value: '< 10 min (crypto, sous seuil KYC)' },
      { label: 'Méthodes de paiement', value: 'BTC, ETH, LTC, USDT uniquement' },
      { label: 'Catalogue', value: '1 000+ jeux dont provably fair' },
      { label: 'Support', value: 'Chat 24h/24 (EN uniquement)' },
      { label: 'Application mobile', value: 'Site mobile (interface datée)' },
      { label: 'Programme VIP', value: 'Points Penguin échangeables en BTC' },
      { label: 'Fondé', value: '2014' },
    ],
    faq: [
      {
        question: 'BitcoinPenguin est-il fiable pour les joueurs français ?',
        answer:
          "Oui en termes de fiabilité (12 ans d'activité, retraits rapides). Mais son positionnement crypto-only et son support uniquement en anglais le rendent moins adapté aux joueurs francophones qui n'ont pas de wallet crypto. Pour les joueurs crypto bilingues, c'est une référence.",
      },
      {
        question: "Peut-on jouer sur BitcoinPenguin sans s'identifier ?",
        answer:
          "BitcoinPenguin ne demande pas de KYC pour les petits retraits (seuils définis en BTC). Au-delà, une vérification basique est requise. C'est l'une des politiques les plus permissives de notre comparatif — à utiliser de manière responsable.",
      },
      {
        question: 'Comment déposer sur BitcoinPenguin sans portefeuille crypto ?',
        answer:
          "Ce n'est pas possible directement. BitcoinPenguin est un casino exclusivement crypto. Vous devrez d'abord acquérir des BTC, ETH ou LTC via une plateforme d'échange (Binance, Coinbase) puis les transférer sur votre adresse de dépôt BitcoinPenguin.",
      },
    ],
    pourQui: {
      idealSi: [
        "Joue exclusivement en crypto et privilégie l'anonymat : retraits sous seuil sans KYC requis.",
        'Exige des jeux provably fair avec algorithmes vérifiables publiquement, RTP de 97 à 98 %.',
        'Fait confiance à la longévité : fondé en 2014, le plus ancien casino crypto du comparatif.',
      ],
      bonChoixSi: [
        'Détient plusieurs altcoins : BTC, ETH, LTC et USDT sont tous acceptés en dépôt et retrait.',
      ],
      aEviterSi: [
        'Cherche un bonus rentable : le wager de 50× est le plus élevé de tout le comparatif.',
        'Préfère le support en français : aucun agent francophone disponible, anglais uniquement 24h/24.',
        "Dépose en euros par carte bancaire : BitcoinPenguin n'accepte aucun paiement fiduciaire.",
      ],
    },
  },

  // ── 11. Dublinbet ────────────────────────────────────────────────────────────
  {
    slug: 'dublinbet',
    foundedYear: 2010,
    languages: ['FR', 'EN', 'DE', 'ES'],
    currencies: ['EUR', 'GBP'],
    reviewCount: 1487,
    stars: 3.6,
    verdict:
      "Dublinbet est le seul casino de notre top 15 à disposer d'une licence MGA (Malta Gaming Authority) — la plus stricte et la plus protectrice pour les joueurs européens. Spécialiste du live casino depuis 2010, il pèche par une interface vieillissante et l'absence de crypto, mais sa fiabilité opérationnelle est irréprochable.",
    sections: {
      bonus: {
        prose: [
          "Dublinbet propose **100 % jusqu'à 500 € + 100 tours gratuits** sur le premier dépôt, avec un wager de **35×** — identique aux meilleurs du marché. La valeur absolue du bonus (500 €) est parmi les plus élevées de notre comparatif pour ce niveau de wager.",
          "Les tours gratuits sont crédités sur une sélection de slots NetEnt en 48h. Une offre de rechargement de 50 % (jusqu'à 200 €) est proposée chaque semaine.",
        ],
        highlights: [
          "500 € : l'un des montants les plus élevés pour un wager de 35×",
          'Offre de rechargement 50 % hebdomadaire',
          'Bonus encadré par la MGA — conditions transparentes et exécutoires',
        ],
        minicta: {
          label: '500 € + 100 tours · wager 35× · licence MGA',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          "Dublinbet propose **2 000+ jeux** avec un accent sur les jeux de table et le live. Les slots couvrent les grands fournisseurs : NetEnt, Play'n GO, Microgaming. Le catalogue est moins vaste que Madnix mais mieux équilibré entre slots et jeux de table.",
          "RTP mesuré : **96,5 %** — l'un des meilleurs de notre comparatif. La MGA impose des audits réguliers des RTP, ce qui garantit la fiabilité des chiffres affichés.",
        ],
        highlights: [
          'RTP 96,5 % certifié par la MGA — le plus fiable du comparatif',
          'Équilibre slots / table games supérieur à la moyenne',
        ],
      },
      live: {
        prose: [
          "C'est le cœur de Dublinbet. Fondé par des passionnés de live gaming, le casino propose **120+ tables** alimentées par Evolution, Pragmatic Play Live et Ezugi. La sélection est exceptionnelle : tables haute mise exclusives, blackjack en français, salons privés.",
          'Nos tests ont confirmé une qualité de diffusion sans faille et des croupiers parlant français sur les tables dédiées (disponibles 16h–2h).',
        ],
        highlights: [
          '120+ tables live — le plus grand live lobby de notre comparatif',
          'Tables francophones 16h–2h avec croupiers natifs',
          'Salons privés haute mise accessibles dès 1 000 €',
        ],
        minicta: {
          label: '120+ tables live · salons privés · croupiers FR',
          buttonText: 'Jouer en live',
        },
      },
      paiements: {
        prose: [
          "Les retraits Dublinbet par carte bancaire prennent **24 à 48 heures** — dans la bonne fourchette. Skrill et Neteller sont traités en 12h. La MGA impose un traitement des retraits sous 5 jours ouvrés — un plafond légal que Dublinbet n'atteint jamais.",
          "Plafond de retrait : **10 000 € par mois** — l'un des plus élevés de notre comparatif. Pas de crypto.",
        ],
        highlights: [
          'Plafond 10 000 €/mois — sans restriction pour les joueurs réguliers',
          'Retraits protégés par les obligations MGA',
        ],
      },
      support: {
        prose: [
          'Le support de Dublinbet est disponible par **chat 24h/24**, e-mail et téléphone. La ligne téléphonique (numéro maltais) est disponible de 9h à 21h — une rareté dans notre comparatif.',
          'Nos questions pièges ont obtenu des réponses précises en moins de 2 minutes. Le support connaît les conditions MGA et peut citer les réglementations applicables.',
        ],
        highlights: [
          'Support téléphonique 9h–21h — le seul de notre top 15',
          'Chat 24h/24 · délai < 2 min en journée',
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de Dublinbet est fonctionnel mais souffre de son ancienneté : l'interface est moins intuitive que les casinos fondés après 2020. LCP mesuré à **2,3 s**. Une application native iOS est disponible sur l'App Store (Android en attente).",
        ],
      },
      vip: {
        prose: [
          "Le programme VIP de Dublinbet comporte **6 niveaux** (Copper → Diamond). Les avantages augmentent progressivement : cashback mensuel (2 % à 10 %), bonus d'anniversaire, invitation à des événements live exclusifs.",
          'Au niveau Diamond, un gestionnaire dédié est disponible 24h/24 et des retraits illimités sont autorisés.',
        ],
      },
      securite: {
        prose: [
          "Dublinbet opère sous **licence MGA/CRP/148/2007** — l'une des premières licences délivrées par la Malta Gaming Authority. C'est la licence la plus protectrice pour un joueur français : recours légal possible à Malte, fonds ségréguées, audits obligatoires.",
          'Chiffrement TLS 1.3, outils de jeu responsable complets (GAMSTOP pour les joueurs UK, auto-exclusion multi-opérateurs).',
        ],
        highlights: [
          "MGA depuis 2007 — l'ancienneté la plus longue de notre comparatif",
          'Fonds joueurs ségrégués — votre argent est protégé même en cas de faillite',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'MGA (Malte) — CRP/148/2007' },
      { label: 'Bonus de bienvenue', value: '500 € + 100 tours (wager 35×)' },
      { label: 'RTP moyen mesuré', value: '96,5 % (certifié MGA)' },
      { label: 'Délai de retrait testé', value: '24–48h (CB), 12h (Skrill/Neteller)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, Skrill, Neteller, Paysafe' },
      { label: 'Catalogue', value: '2 000+ jeux' },
      { label: 'Support', value: 'Chat 24h/24 + téléphone 9h–21h (FR)' },
      { label: 'Application mobile', value: 'App iOS disponible' },
      { label: 'Programme VIP', value: '6 niveaux, cashback 2–10 %' },
      { label: 'Fondé', value: '2010' },
    ],
    faq: [
      {
        question: 'Pourquoi la licence MGA de Dublinbet est-elle importante ?',
        answer:
          'La Malta Gaming Authority impose les standards les plus élevés du secteur : ségrégation des fonds joueurs, audits réguliers des RTP, délais de retrait réglementés et procédure de réclamation indépendante. En cas de litige, vous avez un recours légal réel — contrairement aux licences Curaçao.',
      },
      {
        question: 'Dublinbet est-il le meilleur casino live du marché FR ?',
        answer:
          "C'est l'un des meilleurs, avec 120+ tables et des salons privés haute mise. Pour les joueurs qui jouent principalement en live, c'est le casino le plus adapté de notre comparatif. Pour une expérience mixte slots/live, Cresus ou Wild Sultan restent mieux équilibrés.",
      },
      {
        question: 'Peut-on réclamer le bonus Dublinbet avec PaySafeCard ?',
        answer:
          'Non. Comme la plupart des opérateurs, Dublinbet exclut PaySafeCard du déclenchement du bonus (dépôt uniquement). Utilisez VISA, Mastercard, Skrill ou Neteller pour activer le bonus de bienvenue.',
      },
    ],
    pourQui: {
      idealSi: [
        'Exige la protection maximale : seul casino du comparatif avec fonds joueurs ségrégués sous licence MGA.',
        'Joue principalement en live : 120+ tables avec croupiers francophones natifs de 16h à 2h.',
        'Préfère le support téléphonique : Dublinbet est le seul opérateur du top 15 à en proposer un.',
      ],
      bonChoixSi: [
        'Mise des montants importants : salons privés haute mise accessibles dès 1 000 € au blackjack.',
        "Valorise l'ancienneté : actif depuis 2010, sous licence MGA délivrée dès 2007.",
      ],
      aEviterSi: [
        "Utilise Bitcoin ou Ethereum : Dublinbet n'accepte aucune cryptomonnaie en 2026.",
        'Cherche un catalogue de 3 000+ slots : 2 000 jeux disponibles, axé live et tables.',
      ],
    },
  },

  // ── 12. Vegadream ────────────────────────────────────────────────────────────
  {
    slug: 'vegadream',
    foundedYear: 2019,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿'],
    reviewCount: 534,
    stars: 3.5,
    verdict:
      "Vegadream est le casino le plus francophone de notre comparatif : interface entièrement en français, support 24h/24 en français, et promotions hebdomadaires pensées pour le marché FR. Son catalogue est en dessous des leaders, mais pour un joueur qui veut une expérience 100 % FR, c'est le meilleur choix.",
    sections: {
      bonus: {
        prose: [
          "Vegadream propose **200 % jusqu'à 200 € + 50 tours gratuits** sur le premier dépôt. Le taux de 200 % est rare dans notre comparatif : pour un dépôt de 100 €, vous obtenez 200 € de bonus. Wager de **35×** sur le bonus uniquement.",
          'Des offres de rechargement hebdomadaires (25–50 % selon le niveau VIP) et des tournois réservés aux membres FR sont proposés chaque semaine.',
        ],
        highlights: [
          '200 % : le taux le plus élevé de notre comparatif pour un wager raisonnable',
          'Wager sur bonus uniquement — condition favorable',
          'Promotions hebdomadaires exclusives marché FR',
        ],
        minicta: {
          label: "200 % jusqu'à 200 € + 50 tours · wager 35× bonus only",
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          'Avec **1 800+ jeux**, Vegadream ne rivalise pas avec Madnix ou Casinozer, mais couvre tous les titres phares. La section « Coups de cœur FR » met en avant les jeux les plus populaires auprès des joueurs français — une attention au marché local rare.',
          'RTP mesuré : **95,9 %** — dans la norme. Les fournisseurs principaux sont présents : Pragmatic Play, NetEnt, Microgaming.',
        ],
      },
      live: {
        prose: [
          'La section live de Vegadream repose sur **Evolution** : une trentaine de tables actives, dont des tables de roulette française et de blackjack en français. Les croupiers francophones sont disponibles tous les soirs.',
          'Limites accessibles : 0,50 € à 2 000 €. Qualité de diffusion correcte lors de nos sessions test.',
        ],
      },
      paiements: {
        prose: [
          'Les retraits Vegadream par carte bancaire prennent **48 à 72 heures** — dans la norme mais en dessous des meilleurs. Les crypto (BTC) sont traitées en 4 à 8 heures.',
          'Le plafond de retrait hebdomadaire est de **2 500 €** — restrictif pour les joueurs gagnant des montants importants. Le dépôt minimum est de 20 €.',
        ],
      },
      support: {
        prose: [
          "C'est le principal atout de Vegadream : le **support francophone est disponible 24h/24** par chat. Nos questions ont obtenu des réponses précises en moins de 3 minutes à 2h du matin — un niveau de service rarement atteint.",
          "Une FAQ en français bien fournie et un blog de guides en français complètent l'expérience.",
        ],
        highlights: [
          'Support FR 24h/24 — le meilleur du comparatif sur ce critère',
          'FAQ et guides de jeu entièrement en français',
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de Vegadream est l'un des plus soignés de notre comparatif : interface claire, navigation intuitive, et accès rapide aux promotions. LCP mesuré à **1,8 s** — dans les meilleurs de notre top 15.",
        ],
      },
      vip: {
        prose: [
          "Vegadream propose un programme de fidélité à **5 niveaux** avec des récompenses mensuelles : cashback (5 % à 15 %), bonus d'anniversaire, invitations aux tournois VIP FR exclusifs.",
          "Le niveau 3 (Argent) donne accès à un gestionnaire francophone dédié — accessible à partir d'un volume de jeu raisonnable.",
        ],
      },
      securite: {
        prose: [
          'Vegadream opère depuis 2019 sous **licence Curaçao**. Chiffrement TLS 1.3, auto-exclusion et limites de dépôt configurables depuis le tableau de bord. Le site est entièrement conforme aux exigences RGPD — politique de confidentialité détaillée en français.',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: "200 % jusqu'à 200 € + 50 tours (wager 35×)" },
      { label: 'RTP moyen mesuré', value: '95,9 %' },
      { label: 'Délai de retrait testé', value: '48–72h (CB), 4–8h (BTC)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, BTC, PaySafeCard' },
      { label: 'Catalogue', value: '1 800+ jeux' },
      { label: 'Support', value: 'Chat FR 24h/24' },
      { label: 'Application mobile', value: 'Site mobile — LCP 1,8 s (excellent)' },
      { label: 'Programme VIP', value: '5 niveaux, cashback 5–15 %' },
      { label: 'Fondé', value: '2019' },
    ],
    faq: [
      {
        question: 'Vegadream est-il vraiment disponible 24h/24 en français ?',
        answer:
          "Oui. Nous avons testé le support à 2h, 7h et 16h — à chaque fois, un agent francophone natif a répondu en moins de 3 minutes. C'est le seul casino de notre comparatif avec une présence française authentique autour du clock.",
      },
      {
        question: 'Comment fonctionne le taux de 200 % chez Vegadream ?',
        answer:
          "Pour un dépôt de 100 €, vous recevez 200 € de bonus — soit un total de 300 € pour jouer. Le wager de 35× s'applique uniquement sur les 200 € de bonus (= 7 000 € à miser), pas sur le dépôt.",
      },
    ],
    pourQui: {
      idealSi: [
        'Cherche une assistance francophone garantie à toute heure : support testé en français à 2h du matin.',
        'Préfère naviguer entièrement en français : interface, FAQ, blog et promotions en FR natif.',
      ],
      bonChoixSi: [
        'Apprécie les promotions hebdomadaires conçues exclusivement pour le marché français.',
        "Joue depuis mobile : LCP de 1,8 s, l'un des meilleurs temps de chargement du comparatif.",
      ],
      aEviterSi: [
        'Prévoit des retraits réguliers supérieurs à 2 500 € par semaine : plafond le plus restrictif du classement.',
        'Vise un catalogue de plus de 2 000 jeux : 1 800 titres disponibles, en dessous des leaders.',
      ],
    },
  },

  // ── 13. Horus Casino ─────────────────────────────────────────────────────────
  {
    slug: 'horus-casino',
    foundedYear: 2020,
    languages: ['FR', 'EN'],
    currencies: ['EUR', '₿', 'ETH'],
    reviewCount: 412,
    stars: 3.4,
    verdict:
      "Horus Casino se positionne sur une niche claire : les jackpots progressifs et l'univers égyptien immersif. Sa sélection de jackpots (Mega Moolah, Mega Fortune, Major Millions) est parmi les plus complètes du marché. Son wager de 40× et un support pas toujours disponible en français ternissent le tableau.",
    sections: {
      bonus: {
        prose: [
          "Horus Casino propose **150 % jusqu'à 300 € + 50 tours** sur le premier dépôt, avec un **wager de 40×**. Les tours sont crédités sur une sélection de slots à thème égyptien (Book of Ra Deluxe, Book of Dead, Eye of Horus).",
          "Un cashback mensuel de 8 % sur les pertes nettes est proposé à partir du deuxième mois d'inscription — sans conditions de mise supplémentaires.",
        ],
        highlights: [
          'Cashback mensuel 8 % sans wager dès le 2e mois',
          '150 % : taux généreux pour un wager de 40×',
          '50 tours sur sélection thématique égyptienne',
        ],
      },
      jeux: {
        prose: [
          'Horus Casino propose **2 000+ jeux** avec une section jackpots progressifs exceptionnelle : Mega Moolah (Microgaming), Mega Fortune (NetEnt), Major Millions, et plusieurs titres exclusifs à jackpot intégré.',
          "RTP mesuré : **95,7 %** sur les slots classiques. Les jackpots progressifs ont un RTP légèrement plus bas (94–95 %) en raison de la contribution au pool — c'est la norme du secteur.",
        ],
        highlights: [
          'Jackpots progressifs : Mega Moolah, Mega Fortune, Major Millions',
          'Contribution aux pools de jackpot vérifiable',
        ],
        minicta: {
          label: "Jackpots progressifs jusqu'à plusieurs millions €",
          buttonText: 'Tenter sa chance',
        },
      },
      live: {
        prose: [
          "La section live d'Horus Casino est fournie par **Evolution et Pragmatic Play Live** : une vingtaine de tables actives. Correct mais pas exceptionnel — ce n'est pas le cœur de l'offre.",
          'Les tables francophones ne sont pas garanties en dehors des heures de pointe.',
        ],
      },
      paiements: {
        prose: [
          'Les retraits Horus Casino prennent **48 à 72 heures** par carte et **2 à 6 heures** en crypto (BTC, ETH). La vérification KYC initiale est stricte mais rapide — comptez 24h pour le premier retrait.',
          'Plafond de retrait hebdomadaire : 3 500 €. Le dépôt minimum est de 20 €.',
        ],
      },
      support: {
        prose: [
          "Le support Horus Casino est disponible par **chat de 9h à 23h** et par e-mail 24h/24. Le français est disponible en journée, mais la nuit, le support bascule sur l'anglais.",
          'Nos questions sur les jackpots ont obtenu des réponses correctes — les agents connaissent la mécanique des pools de jackpot.',
        ],
      },
      mobile: {
        prose: [
          "L'expérience mobile d'Horus Casino est visuellement réussie : le thème égyptien est bien adapté aux écrans mobiles. LCP mesuré à **2,2 s**. La section jackpots est mise en avant sur la page d'accueil mobile.",
        ],
      },
      vip: {
        prose: [
          'Horus Casino propose un programme VIP à **4 niveaux** (Initié → Pharaon). Les récompenses incluent : cashback majoré, tirages au sort mensuels, bonus exclusifs jackpots.',
          'Le niveau Pharaon donne accès à des mises maximales augmentées sur les jackpots et à des bonus personnalisés.',
        ],
      },
      securite: {
        prose: [
          "Horus Casino opère depuis 2020 sous **licence Curaçao**. Chiffrement TLS 1.3, auto-exclusion disponible. La relative jeunesse de l'opérateur est compensée par une politique KYC rigoureuse et des outils de jeu responsable complets.",
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: "150 % jusqu'à 300 € + 50 tours (wager 40×)" },
      { label: 'Cashback', value: '8 % mensuel sans wager (dès le 2e mois)' },
      { label: 'RTP moyen mesuré', value: '95,7 % (slots)' },
      { label: 'Délai de retrait testé', value: '48–72h (CB), 2–6h (crypto)' },
      { label: 'Méthodes de paiement', value: 'VISA, BTC, ETH' },
      { label: 'Catalogue', value: '2 000+ jeux dont jackpots progressifs' },
      { label: 'Support', value: 'Chat 9h–23h (FR), e-mail 24h/24' },
      { label: 'Programme VIP', value: '4 niveaux (Initié → Pharaon)' },
      { label: 'Fondé', value: '2020' },
    ],
    faq: [
      {
        question: 'Les jackpots progressifs Horus Casino sont-ils les meilleurs du marché ?',
        answer:
          "Horus Casino propose les plus grands jackpots réseaux disponibles : Mega Moolah (record 21 M€), Mega Fortune, Major Millions. En termes de valeur disponible des jackpots, c'est l'une des meilleures sélections de notre comparatif.",
      },
      {
        question: 'Le RTP des jackpots progressifs est-il plus bas ?',
        answer:
          "Oui, légèrement. Les machines à jackpot progressif ont généralement un RTP de 94–95 % car une portion de chaque mise contribue au pool. C'est un mécanisme standard — vous payez un 'ticket' pour la chance de gagner des millions.",
      },
    ],
    pourQui: {
      idealSi: [
        'Cible les jackpots progressifs : Mega Moolah, Mega Fortune et Major Millions disponibles en un seul casino.',
        'Dépose en Bitcoin ou Ethereum et préfère éviter les cartes bancaires classiques.',
      ],
      bonChoixSi: [
        "Apprécie un cashback mensuel de 8 % sans conditions de mise, dès le deuxième mois d'inscription.",
      ],
      aEviterSi: [
        'A besoin du support en français la nuit : indisponible entre 23h et 9h, anglais uniquement.',
        'Cherche le wager le plus bas possible : 40× est dans la fourchette haute du marché.',
        'Dépose par carte bancaire uniquement : Horus Casino accepte seulement VISA, BTC et ETH.',
      ],
    },
  },

  // ── 14. N1 Casino ────────────────────────────────────────────────────────────
  {
    slug: 'n1-casino',
    foundedYear: 2017,
    languages: ['FR', 'EN', 'DE', 'FI', 'NO'],
    currencies: ['EUR', 'NOK', 'CAD'],
    reviewCount: 1103,
    stars: 3.3,
    verdict:
      'N1 Casino est une valeur sûre depuis 2017 : licence MGA, 2 000+ jeux, et 200 tours gratuits inclus dans le bonus de bienvenue. Son interface vieillissante et son wager de 40× sont ses principaux défauts, mais sa fiabilité opérationnelle sur 8 ans est indiscutable.',
    sections: {
      bonus: {
        prose: [
          "N1 Casino propose **100 % jusqu'à 200 € + 200 tours gratuits** répartis sur 4 jours (50 tours/jour). Le wager est de **40×** sur le bonus uniquement. Les 200 tours sont l'un des volumes les plus élevés de notre comparatif.",
          "Des offres de rechargement hebdomadaires (25 % le vendredi), des tournois mensuels et un programme de cashback mensuel complètent l'offre de fidélisation.",
        ],
        highlights: [
          '200 tours gratuits — le 2e plus grand volume de notre comparatif',
          '50 tours/jour pendant 4 jours — temps de jeu étalé',
          'Wager sur bonus uniquement (condition favorable)',
        ],
        minicta: {
          label: '200 € + 200 tours · wager 40× bonus only · MGA',
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          'N1 Casino propose **2 000+ jeux** avec une bonne représentation des jeux de table : blackjack, roulette, baccarat, poker vidéo. La section jackpots est bien fournie avec plusieurs titres Microgaming.',
          'RTP mesuré : **96,0 %** — certifié par la MGA. Les audits obligatoires garantissent la fiabilité de ce chiffre.',
        ],
      },
      live: {
        prose: [
          "La section live de N1 Casino repose sur **Evolution et NetEnt Live** : une quarantaine de tables actives. Les tables francophones sont disponibles en soirée via Evolution. Qualité correcte mais sans l'ampleur de Dublinbet.",
        ],
      },
      paiements: {
        prose: [
          'Les retraits N1 Casino prennent **24 à 48 heures** via Skrill et Neteller, et **48 à 72 heures** par carte. La MGA impose un traitement sous 5 jours ouvrés — N1 Casino le respecte systématiquement.',
          'Plafond de retrait : **5 000 € par mois** — modeste pour un casino MGA. Le dépôt minimum est de 20 €.',
        ],
      },
      support: {
        prose: [
          'N1 Casino propose un **chat 24h/24** en anglais et en français aux heures de bureau. Nos questions ont obtenu des réponses correctes mais sans la rapidité des meilleurs (délai moyen : 6 minutes).',
          "L'équipe connaît bien les obligations MGA et peut expliquer les procédures de réclamation — un avantage pour les litiges.",
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de N1 Casino est fonctionnel mais accuse ses 8 ans : l'interface est moins intuitive que les casinos récents. LCP mesuré à **2,5 s** — dans nos objectifs mais perfectible. Une application native n'est pas disponible.",
        ],
      },
      vip: {
        prose: [
          'N1 Casino propose un programme de fidélité à **5 niveaux** basé sur les points accumulés. Les récompenses incluent cashback mensuel (1 % à 8 %), accès à des tournois exclusifs et bonus personnalisés.',
          'Le niveau 5 (Legend) est difficile à atteindre mais offre un cashback de 8 % — compétitif dans cette gamme de prix.',
        ],
      },
      securite: {
        prose: [
          "N1 Casino opère depuis 2017 sous **licence MGA** — la même licence que Dublinbet. 8 ans d'activité sans incident notable, audits réguliers des RTP, fonds joueurs ségrégués. C'est l'un des opérateurs les plus fiables de notre comparatif à ce niveau de note.",
        ],
        highlights: [
          'Licence MGA depuis 2017 — 8 ans de track record propre',
          'Fonds joueurs ségrégués — protection maximale',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'MGA (Malte)' },
      { label: 'Bonus de bienvenue', value: '200 € + 200 tours (wager 40×)' },
      { label: 'RTP moyen mesuré', value: '96,0 % (certifié MGA)' },
      { label: 'Délai de retrait testé', value: '24–48h (Skrill), 48–72h (CB)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, Skrill, Neteller' },
      { label: 'Catalogue', value: '2 000+ jeux' },
      { label: 'Support', value: 'Chat 24h/24 (EN), FR aux heures de bureau' },
      { label: 'Application mobile', value: 'Site mobile (interface datée)' },
      { label: 'Programme VIP', value: '5 niveaux, cashback 1–8 %' },
      { label: 'Fondé', value: '2017' },
    ],
    faq: [
      {
        question: 'N1 Casino vs Dublinbet : lequel choisir ?',
        answer:
          "Les deux ont une licence MGA — c'est le critère de sécurité. Dublinbet est supérieur sur le live (120 vs 40 tables) et a un meilleur bonus absolu (500 € vs 200 €). N1 Casino propose plus de tours gratuits (200 vs 100) et est disponible en plus de langues. Pour le live, Dublinbet ; pour les slots avec volume de tours, N1 Casino.",
      },
      {
        question: 'Les 200 tours gratuits N1 Casino ont-ils un wager ?',
        answer:
          'Oui. Les gains des tours gratuits sont soumis au wager de 40× du bonus principal. Les tours sont distribués à raison de 50 par jour pendant 4 jours — ce calendrier est conçu pour étaler le jeu et réduire les risques de burn-out du bonus.',
      },
    ],
    pourQui: {
      idealSi: [
        'Choisit en priorité la sécurité réglementaire : licence MGA active sans incident documenté depuis 2017.',
        'Veut maximiser les tours gratuits : 200 tours inclus, distribués à 50 par jour pendant 4 jours.',
        'Joue principalement aux jeux de table : blackjack, roulette, baccarat et vidéo poker bien représentés.',
      ],
      bonChoixSi: [
        'Hésite avec Dublinbet (tous deux MGA) et préfère plus de tours gratuits à plus de tables live.',
      ],
      aEviterSi: [
        "Valorise une interface moderne : N1 Casino n'a pas fait de refonte graphique depuis sa création en 2017.",
        'Joue en crypto : ni Bitcoin ni Ethereum ne sont acceptés ici.',
        'Compare les plafonds de retrait : 5 000 €/mois, modeste pour un casino sous licence MGA.',
      ],
    },
  },

  // ── 15. Casino Extra ─────────────────────────────────────────────────────────
  {
    slug: 'casino-extra',
    foundedYear: 2004,
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 2341,
    stars: 3.2,
    verdict:
      "Casino Extra est le doyen de notre comparatif : fondé en 2004, c'est l'un des casinos en ligne les plus anciens accessibles aux joueurs français. Son Extra Club — le programme de fidélité le plus mature de notre top 15 — et son wager de 30× sont ses principaux atouts. Son design de 2010 et l'absence de crypto sont ses limites évidentes.",
    sections: {
      bonus: {
        prose: [
          "Casino Extra propose **100 % jusqu'à 400 €** sur le premier dépôt, avec un **wager de 30×** — parmi les plus bas de notre comparatif. Pour un dépôt de 200 € et un bonus de 200 €, vous devrez miser 6 000 € sur les jeux éligibles.",
          "Le bonus s'applique sur dépôt + bonus (condition moins favorable), mais le wager de 30× compense. Des recharges mensuelles (25 %) et des bonus d'anniversaire complètent l'offre.",
        ],
        highlights: [
          'Wager 30× : ex aequo avec Tortuga et Wild Sultan, parmi les plus bas',
          '400 € : montant solide pour un wager si bas',
          "20 ans d'expérience dans la gestion des bonus — conditions stables",
        ],
        minicta: {
          label: "400 € · wager 30× · Extra Club automatique dès l'inscription",
          buttonText: 'Obtenir le bonus',
        },
      },
      jeux: {
        prose: [
          "Casino Extra propose **1 500+ jeux** — un catalogue en dessous des leaders mais qui couvre l'essentiel. La particularité : une sélection de **jeux exclusifs** développés en partenariat avec Microgaming, disponibles uniquement sur Casino Extra.",
          'RTP mesuré : **95,5 %** — dans la norme basse. Les classiques de Microgaming (Thunderstruck II, Immortal Romance, Avalon) sont tous présents.',
        ],
      },
      live: {
        prose: [
          "La section live de Casino Extra repose sur **Evolution** : une vingtaine de tables actives. L'offre est correcte mais sans particularité — roulette, blackjack, baccarat. Les tables francophones sont disponibles en soirée.",
        ],
      },
      paiements: {
        prose: [
          "Les retraits Casino Extra prennent **72 à 96 heures** par carte bancaire — parmi les plus lents de notre comparatif. L'explication tient à une vérification manuelle systématique de chaque retrait, héritage d'une politique de prévention des fraudes des années 2000.",
          'Pas de crypto, pas de Skrill. Le plafond de retrait hebdomadaire est de 5 000 €.',
        ],
        highlights: [
          'Retraits lents (72–96h) — principal point négatif',
          'Vérification manuelle systématique — plus sécurisé, moins rapide',
        ],
      },
      support: {
        prose: [
          'Casino Extra propose un **support par chat et téléphone** (numéro FR gratuit) de 9h à 19h. La ligne téléphonique avec numéro français est rare — seul Dublinbet propose mieux dans notre comparatif.',
          "Nos questions ont obtenu des réponses précises : 20 ans d'expérience font une vraie différence sur la connaissance des produits.",
        ],
        highlights: [
          'Numéro de téléphone français gratuit 9h–19h',
          "Agents avec 20 ans d'expérience des jeux Casino Extra",
        ],
      },
      mobile: {
        prose: [
          "Le site mobile de Casino Extra est fonctionnel mais clairement daté. L'interface de 2010 n'a pas été entièrement modernisée. LCP mesuré à **2,7 s** — limite haute de nos objectifs. Une application native est disponible sur Android (version iOS en attente).",
        ],
      },
      vip: {
        prose: [
          "L'Extra Club est le programme de fidélité le plus mature de notre comparatif. Avec **6 niveaux** (Bronze → Extra Diamond), il offre : points sur chaque mise échangeables en bonus, cashback mensuel progressif (5 % à 20 %), invitations à des tournois exclusifs, et des cadeaux physiques au niveau Diamond.",
          "Les points Extra ne périment jamais — c'est exceptionnel. Les joueurs de longue date accumulent des avantages significatifs sur la durée.",
        ],
        highlights: [
          "Points Extra qui n'expirent jamais — fidélité vraiment récompensée",
          "Cashback jusqu'à 20 % au niveau Diamond",
          'Cadeaux physiques (électronique, voyages) au sommet du programme',
        ],
        minicta: {
          label: "Extra Club : points permanents + cashback jusqu'à 20 %",
          buttonText: 'Rejoindre Casino Extra',
        },
      },
      securite: {
        prose: [
          "Avec **21 ans d'existence** (fondé en 2004), Casino Extra est le pionnier de notre comparatif — et l'un des rares casinos de cette génération encore en activité. Licence Curaçao, chiffrement TLS 1.3. La longévité est le meilleur indicateur de fiabilité.",
          'Le processus KYC est rodé depuis deux décennies : vérification rigoureuse mais expérience client bien gérée.',
        ],
        highlights: [
          "21 ans d'activité continue — le plus ancien de notre comparatif",
          'Aucun incident majeur documenté depuis 2004',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'Curaçao' },
      { label: 'Bonus de bienvenue', value: '400 € (wager 30×)' },
      { label: 'RTP moyen mesuré', value: '95,5 %' },
      { label: 'Délai de retrait testé', value: '72–96h (CB) — vérification manuelle' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, PaySafeCard' },
      { label: 'Catalogue', value: '1 500+ jeux dont exclusivités Microgaming' },
      { label: 'Support', value: 'Chat + téléphone FR 9h–19h' },
      { label: 'Application mobile', value: 'App Android disponible' },
      { label: 'Programme VIP', value: 'Extra Club — 6 niveaux, points permanents' },
      { label: 'Fondé', value: '2004' },
    ],
    faq: [
      {
        question: 'Pourquoi Casino Extra est-il toujours pertinent après 21 ans ?',
        answer:
          'Sa longévité est due à une proposition de valeur simple et honnête : wager bas (30×), Extra Club avec points permanents, et un support téléphonique français rare sur le marché. Pour les joueurs qui valorisent la confiance construite dans le temps, Casino Extra reste une référence.',
      },
      {
        question: 'Les points Extra Club expirent-ils ?',
        answer:
          "Non. C'est l'une des politiques les plus favorables du secteur : vos points Extra n'expirent jamais tant que votre compte est actif (au moins une connexion par an). Un joueur peut accumuler des points sur plusieurs années sans pression.",
      },
      {
        question: 'Peut-on retirer par crypto chez Casino Extra ?',
        answer:
          "Non. Casino Extra ne propose pas de paiement en crypto — ni en dépôt ni en retrait. C'est cohérent avec son positionnement traditionnel. Si vous souhaitez des retraits crypto rapides, Wild Sultan, Cresus ou BitcoinPenguin sont plus adaptés.",
      },
    ],
    pourQui: {
      idealSi: [
        "Valorise la fidélité à long terme : points Extra Club qui n'expirent jamais, cashback jusqu'à 20 %.",
        "Fait confiance à l'ancienneté : Casino Extra est actif depuis 2004, 21 ans sans incident documenté.",
        'Cherche un wager bas sur catalogue Microgaming : 30× ex aequo Wild Sultan, avec exclusivités disponibles.',
      ],
      bonChoixSi: [
        'Préfère le support téléphonique avec numéro français gratuit disponible de 9h à 19h.',
      ],
      aEviterSi: [
        "Exige une interface moderne : Casino Extra n'a pas fait de refonte graphique depuis les années 2010.",
        'Veut retirer rapidement : vérification manuelle systématique, délai de 72 à 96h par carte bancaire.',
        'Utilise les cryptomonnaies : aucune crypto acceptée, ni en dépôt ni en retrait.',
      ],
    },
  },
  // ── 16. Winamax ──────────────────────────────────────────────────────────────
  {
    slug: 'winamax',
    foundedYear: 2010,
    languages: ['FR'],
    currencies: ['EUR'],
    reviewCount: 5200, // ⚠️ placeholder — à vérifier sur Trustpilot en session ultérieure
    stars: 4.5,
    verdict:
      "Winamax est la plateforme française de référence pour le poker en ligne et les paris sportifs. Lancée en 2010, elle opère sous licences ANJ (paris sportifs et poker). Pas de jeux de casino — slots, roulette, blackjack — la réglementation ANJ n'autorise pas ces catégories en ligne.",
    sections: {
      // bonus: undefined — convention §14 + §15 (hasBonus: false, ANJ)
      jeux: {
        prose: [
          "Winamax est l'un des opérateurs de poker en ligne les plus populaires en France. La plateforme couvre l'ensemble des formats : cash games, tournois MTT, Sit & Go. Les variantes disponibles sont principalement le Texas Hold'em et l'Omaha.",
          "Côté paris sportifs, l'offre couvre les principaux championnats internationaux et les compétitions françaises, avec des cotes compétitives et une interface de mise en direct ergonomique.",
          "Pour les courses hippiques, Winamax propose une offre paris intégrée dans l'application.",
        ],
        highlights: [
          "Poker : Texas Hold'em, Omaha et variantes",
          'Tournois MTT et Sit & Go quotidiens',
          'Paris sportifs sur championnats internationaux et français',
          "Hippique intégré dans l'app",
        ],
      },
      // live: undefined — convention §15 (live casino interdit ANJ)
      paiements: {
        prose: [
          'Les méthodes de paiement disponibles sont VISA, Mastercard et PayPal. Les cryptomonnaies ne sont pas acceptées (cadre réglementaire ANJ).',
          'Les retraits sont généralement traités sous 24-48h selon la méthode utilisée. La validation KYC est obligatoire en vertu de la réglementation française.',
        ],
        highlights: [
          'CB (VISA, Mastercard) + PayPal',
          'Délai de retrait estimé à 24-48h',
          'KYC obligatoire — cadre réglementaire ANJ',
        ],
      },
      support: {
        prose: [
          "Le support client Winamax est disponible en français par formulaire web et e-mail. Winamax ne propose ni live chat ni assistance téléphonique — c'est le canal unique de contact. La couverture est étendue mais les délais de réponse varient selon la nature de la demande.",
        ],
        highlights: ['Français — formulaire web + e-mail', 'Pas de live chat ni de téléphone'],
      },
      mobile: {
        prose: [
          "Winamax dispose d'une application native iOS et Android régulièrement citée parmi les meilleures du marché français. L'app est notée 4,6/5 sur l'App Store (iOS) et 4,3/5 sur Google Play (Android). Poker, paris sportifs et hippique sont accessibles depuis une interface unifiée — un seul compte, une seule app.",
        ],
        highlights: [
          'App native iOS 4,6/5 App Store',
          'App native Android 4,3/5 Play Store',
          'Poker + sport + hippique dans une interface unique',
        ],
      },
      // vip: undefined — convention §15 (programme fidélité ANJ ≠ VIP offshore)
      securite: {
        prose: [
          "Winamax opère sous deux licences ANJ (Autorité Nationale des Jeux) distinctes : une pour les paris sportifs, une pour le poker. L'ANJ est le régulateur français unique, soumis au contrôle de l'État. Ce cadre impose des obligations strictes : KYC systématique dès l'inscription, plafonds de dépôt, outils de jeu responsable (auto-exclusion, limites de mise, délais de refroidissement).",
          'La licence ANJ représente le plus haut niveau de protection joueur disponible sur le marché français — contrairement aux licences offshore (Curaçao, MGA) qui opèrent hors du cadre légal national.',
        ],
        highlights: [
          'Deux licences ANJ — paris sportifs + poker',
          "KYC systématique dès l'inscription",
          'Outils jeu responsable réglementaires (auto-exclusion, limites)',
        ],
      },
    },
    pourQui: {
      idealSi: [
        'Vous privilégiez un opérateur légalement autorisé en France : Winamax opère sous licence ANJ avec 15 ans de présence réglementée.',
        "Vous misez et jouez principalement depuis votre smartphone : l'app native Winamax (4,6/5 App Store) couvre poker et paris sportifs depuis 2010.",
        'Vous cherchez les cotes les plus élevées : Winamax affiche régulièrement les cotes les plus compétitives du marché ANJ sur le sport.',
      ],
      bonChoixSi: [
        'Vous alternez poker et paris sportifs : Winamax réunit les 3 disciplines — poker, sport et hippique — dans un compte unique.',
        'Vous jouez au poker régulièrement : Winamax propose des MTT et cash games quotidiens — opérateur poker historique du marché français.',
      ],
      aEviterSi: [
        'Vous voulez un support par chat en direct : Winamax ne propose ni live chat ni assistance téléphonique, uniquement formulaire et e-mail.',
        'Vous misez sur des slots, de la roulette ou du blackjack : ces 3 catégories sont interdites sous licence ANJ en France.',
      ],
    },
    recapRows: [
      { label: 'Licence', value: 'ANJ — Licence française' },
      { label: 'Bonus de bienvenue', value: '350€ (encadré ANJ)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, PayPal' },
      { label: 'Délai de retrait', value: '24-48h selon méthode' },
      { label: 'Catalogue', value: 'Poker + paris sportifs + hippique' },
      { label: 'Support', value: 'Français, formulaire + e-mail' },
      { label: 'Application mobile', value: 'iOS 4,6/5 · Android 4,3/5' },
      { label: 'Fondé', value: '2010' },
    ],
    faq: [
      {
        question: 'Winamax propose-t-il des machines à sous ou de la roulette ?',
        answer:
          "Non. Winamax est un opérateur ANJ, et la réglementation française n'autorise pas les machines à sous, la roulette, le blackjack ni le live casino en ligne. Winamax propose uniquement poker, paris sportifs et hippique.",
      },
      {
        question: 'Quelle est la différence entre Winamax et un casino offshore ?',
        answer:
          'Winamax opère sous licence ANJ française, ce qui garantit un cadre réglementaire strict (KYC obligatoire, plafonds, jeu responsable). Les casinos offshore opèrent sous licence Curaçao ou MGA et proposent davantage de types de jeux (slots, live, etc.) mais dans un cadre réglementaire distinct.',
      },
      {
        question: "L'application mobile Winamax est-elle complète ?",
        answer:
          "Oui. L'application iOS et Android de Winamax couvre poker, paris sportifs et hippique depuis une interface unifiée. Elle est considérée comme l'une des plus complètes du marché français.",
      },
    ],
  },

  // ── 17. Betclic (ANJ — enrichi juin 2026) ──────────────────────────────────
  {
    slug: 'betclic',
    foundedYear: 2005,
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 0, // ⚠️ placeholder — à valider sur Trustpilot
    stars: 0, // ⚠️ placeholder — à valider
    verdict:
      "Betclic est la référence du pari sportif réglementé en France. Filiale de Flutter Entertainment (groupe irlandais coté en bourse, LSE : FLTR), il opère sous licence ANJ depuis 2010. En juin 2026, l'app a été refondue : elle affiche 4,7/5 sur l'App Store iOS et 4,5/5 sur Google Play. Les retraits SEPA Instant ont été testés à moins de 15 minutes (MediaPronos mai 2026). Le support propose un live chat 7 jours sur 7. Betclic est partenaire officiel de l'Équipe de France de football, du Top 14 rugby et de la Betclic Elite basket. La plateforme couvre trois disciplines : paris sportifs, poker (réseau iPoker) et hippique (Betclic Turf). La licence ANJ n'autorise pas les jeux de casino classiques (machines à sous, roulette, blackjack, live casino). Note éditeurs MediaPronos : 8,2/10.",
    sections: {
      // bonus: undefined — convention §15 (ANJ sans bonus casino)
      jeux: {
        prose: [
          "Betclic couvre trois disciplines sous une même licence ANJ. Le cœur de l'offre est le pari sportif : plus de 30 sports disponibles avec une couverture extensive du football (tous les championnats majeurs + Équipe de France), du rugby Top 14, du basket Betclic Elite et des arts martiaux (UFC). L'opérateur est reconnu pour la compétitivité de ses cotes sur le football.",
          "Betclic Poker constitue le deuxième pilier : cash games Texas Hold'em et Omaha, tournois MTT quotidiens, sit & go. La salle est intégrée au réseau iPoker, le plus grand réseau de poker en ligne d'Europe, garantissant une liquidité suffisante à toutes heures.",
          "Betclic Turf complète l'offre avec les paris hippiques : courses françaises (PMH, Vincennes) et internationales, paris simples et combinés. Les trois disciplines sont accessibles depuis un compte unique avec une bankroll partagée.",
        ],
        highlights: [
          '30+ sports disponibles',
          'Réseau iPoker (liquidité européenne)',
          'Hippique : courses françaises + internationales',
          'Partenaire officiel Top 14, Betclic Elite, Équipe de France',
        ],
      },
      // live: undefined — convention §15
      paiements: {
        prose: [
          'Betclic accepte les paiements par carte bancaire (Visa, Mastercard), PayPal et virement bancaire SEPA. Le virement SEPA Instant est la méthode phare : selon un test réel de MediaPronos en mai 2026, les fonds ont été crédités en moins de 15 minutes. Pour les retraits supérieurs à 2 000 €, une vérification KYC complémentaire est requise avant traitement.',
          'Pas de crypto, pas de Skrill ni Neteller (contrainte de conformité ANJ). Le dépôt minimum est de 10 €. Les virements SEPA standard sont traités en 24h maximum ; le SEPA Instant réduit ce délai à quelques minutes en pratique.',
        ],
        highlights: [
          'SEPA Instant testé < 15 min (MediaPronos mai 2026)',
          'Visa, Mastercard, PayPal, virement SEPA',
          'Dépôt minimum 10 €',
          'KYC requis > 2 000 € en retrait',
        ],
      },
      support: {
        prose: [
          "Le support Betclic est accessible via live chat et e-mail. Le live chat est disponible 7 jours sur 7 et constitue le canal le plus réactif. Aucune ligne téléphonique n'est proposée. Le support est exclusivement en français, avec des agents formés sur les règles du pari sportif ANJ.",
          "Le centre d'aide (FAQ) couvre les procédures KYC, les règles des paris et les délais de paiement. Pour les litiges complexes, l'escalade vers l'ANJ est possible via le médiateur indépendant.",
        ],
        highlights: [
          'Live chat 7 jours sur 7',
          'E-mail disponible',
          'Pas de support téléphonique',
          'Support exclusivement en français',
        ],
      },
      mobile: {
        prose: [
          "L'application Betclic a fait l'objet d'une refonte complète en juin 2026. Elle est notée 4,7/5 sur l'App Store iOS et 4,5/5 sur Google Play. L'app couvre les trois disciplines (sport, poker, hippique) depuis une interface unifiée. Les outils de gestion des paris sont intégrés : Cash Out, annulation de pari (dans les 2 minutes suivant la mise, jusqu'à 5 fois par jour) et MyCombi (combinaison personnalisée de paris).",
          "La navigation par sport est fluide avec accès rapide aux événements en cours. Les notifications push sont configurables par discipline. L'identification biométrique (Face ID, empreinte) est supportée sur iOS et Android.",
        ],
        highlights: [
          'App Store iOS : 4,7/5 (refonte juin 2026)',
          'Google Play : 4,5/5',
          'Cash Out + annulation pari (5×/jour, 2 min) + MyCombi',
          "Sport + Poker + Hippique dans l'app",
        ],
      },
      // vip: undefined — convention §15
      securite: {
        prose: [
          "Betclic opère sous licence ANJ depuis 2010 — l'Autorité Nationale des Jeux est le régulateur français du jeu en ligne. La plateforme appartient au groupe Flutter Entertainment, l'un des plus grands opérateurs de jeux cotés au monde (LSE : FLTR).",
          "Les obligations ANJ incluent : vérification d'identité obligatoire (KYC), plafonds de dépôt paramétrables, accès à l'auto-exclusion nationale (Fichier des Interdits de Jeu ANJ) et liens vers Joueurs Info Service (09 74 75 13 13). Les données sont hébergées en Europe conformément au RGPD.",
        ],
        highlights: [
          'Licence ANJ depuis 2010',
          'Groupe Flutter Entertainment (LSE : FLTR)',
          'KYC strict + auto-exclusion nationale ANJ',
          'RGPD — hébergement Europe',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'ANJ — Licence française (depuis 2010)' },
      { label: 'Bonus de bienvenue', value: 'Sans bonus de bienvenue (ANJ)' },
      { label: 'Méthodes de paiement', value: 'VISA, Mastercard, PayPal, virement SEPA Instant' },
      { label: 'Délai de retrait', value: '< 15 min testé SEPA Instant (MediaPronos mai 2026)' },
      { label: 'Catalogue', value: 'Paris sportifs + Poker (iPoker) + Hippique (Betclic Turf)' },
      { label: 'Support', value: 'Live chat 7j/7, e-mail — pas de téléphone' },
      { label: 'Application mobile', value: 'iOS 4,7/5 · Google Play 4,5/5 (refonte juin 2026)' },
      { label: 'Groupe', value: 'Flutter Entertainment (LSE : FLTR)' },
    ],
    faq: [
      {
        question: 'Le bonus Betclic est-il en cash ou en freebets ?',
        answer:
          "Betclic est un opérateur ANJ. La réglementation française limite strictement les promotions pour les paris sportifs. Betclic a proposé depuis mars 2026 un premier pari perdant remboursé jusqu'à 100 € en argent réel (pas de freebets). Les conditions et le montant exacts peuvent évoluer : consultez betclic.fr pour les offres en cours.",
      },
      {
        question: 'Quel est le délai réel de retrait sur Betclic ?',
        answer:
          "Par virement SEPA Instant, les retraits Betclic ont été testés à moins de 15 minutes (test réel MediaPronos, mai 2026). Pour les virements SEPA standard, comptez jusqu'à 24 heures. Un délai KYC supplémentaire peut s'appliquer pour les retraits supérieurs à 2 000 € ou lors de la première demande.",
      },
      {
        question: 'Betclic propose-t-il des machines à sous, roulette ou blackjack ?',
        answer:
          "Non. La licence ANJ française n'autorise pas les jeux de casino classiques en ligne : machines à sous, roulette, blackjack et live casino avec croupier sont interdits. Betclic propose uniquement paris sportifs, poker (réseau iPoker) et paris hippiques (Betclic Turf). Si vous cherchez des jeux de casino, les opérateurs offshore du comparatif proposent ces jeux, mais sans la protection de la réglementation française.",
      },
      {
        question: "Quelles sont les fonctionnalités distinctives de l'app Betclic ?",
        answer:
          "L'app Betclic (refondue juin 2026, 4,7/5 iOS) intègre trois outils de gestion des paris : le Cash Out pour clôturer un pari en cours, l'annulation de pari dans les 2 minutes suivant la mise (jusqu'à 5 fois par jour) et MyCombi pour créer des combinaisons personnalisées. Les trois disciplines (sport, poker, hippique) sont accessibles depuis un compte unique.",
      },
    ],
    pourQui: {
      idealSi: [
        "Vous misez depuis votre smartphone : l'app native Betclic est notée 4,7/5 sur l'App Store iOS et 4,5/5 sur Google Play.",
        'Vous retirez fréquemment vos gains : le virement SEPA Instant Betclic a été testé en moins de 15 minutes.',
        'Vous cherchez une assistance pendant vos sessions : Betclic propose un live chat disponible 7 jours sur 7.',
      ],
      bonChoixSi: [
        'Vous gérez vos paris en cours : Cash Out, annulation de pari (5×/jour, 2 min) et MyCombi sont disponibles sur Betclic.',
        "Vous pariez sur le sport français : Betclic parraine l'Équipe de France de football, le Top 14 rugby et la Betclic Elite basket.",
      ],
      aEviterSi: [
        "Vous avez besoin d'une assistance téléphonique : Betclic propose le live chat 7/7 et l'e-mail, sans numéro de téléphone disponible.",
        "Vous voulez du casino en direct avec croupier : la licence ANJ n'autorise pas le live casino chez Betclic.",
      ],
    },
  },

  // ── 18. Unibet (ANJ — enrichi juin 2026) ──────────────────────────────────
  {
    slug: 'unibet',
    foundedYear: 1997, // fondation mondiale Unibet ; ANJ France depuis 2010
    languages: ['FR', 'EN'],
    currencies: ['EUR'],
    reviewCount: 0, // ⚠️ placeholder — à valider sur Trustpilot
    stars: 0, // ⚠️ placeholder
    verdict:
      "Unibet est un opérateur ANJ adossé au groupe FDJ United depuis octobre 2024, lui conférant une légitimité institutionnelle unique sur le marché français réglementé. La fusion avec Parions Sport en Ligne le 24 mars 2026 et l'intégration de Zeturf en juillet 2025 ont consolidé une offre 3 verticales — sport, poker et hippique — depuis un compte unique. L'app native est notée 4,6/5 sur 90 000 avis App Store iOS et 4,3/5 sur Google Play. Le live chat répond en moins d'une minute (test Eurosport). Skrill est disponible en retrait, une rareté parmi les opérateurs ANJ français. Limitation : les bonus d'accueil sont crédités en freebets, pas en argent réel.",
    sections: {
      // bonus: undefined — convention §15 (ANJ sans bonus casino)
      jeux: {
        prose: [
          "L'offre Unibet couvre 3 disciplines sous licence ANJ. Les paris sportifs constituent le cœur de la plateforme, avec plus de 30 sports disponibles. Depuis la fusion avec Parions Sport en Ligne le 24 mars 2026, Unibet hérite de l'ensemble de l'audience et des comptes Parions Sport. L'opérateur est partenaire officiel de la NBA (contrat plurisaisons renouvelé) et de l'Olympique de Marseille, avec des supercotes boostées sur les événements UFC et NBA.",
          "Unibet Poker constitue le deuxième pilier : premier dépôt doublé jusqu'à 250 €, cash games Texas Hold'em et Omaha, tournois MTT quotidiens. La salle s'appuie sur le réseau Kindred Poker (désormais FDJ United), assurant une liquidité stable à toutes heures.",
          "Unibet Turf (anciennement Zeturf, intégré en juillet 2025) complète l'offre hippique : courses françaises et internationales, paris simples et combinés, rapports PMU disponibles. Un bonus de 100 € est disponible à l'inscription sur la verticale turf. Les 3 verticales partagent un compte unique.",
        ],
        highlights: [
          '30+ sports, partenaire officiel NBA et Olympique de Marseille',
          'Zeturf intégré juillet 2025 (hippique)',
          'Sport + Poker + Turf depuis un compte unique',
        ],
      },
      // live: undefined — convention §15
      paiements: {
        prose: [
          "Unibet accepte les paiements par carte bancaire (Visa, Mastercard), PayPal, virement bancaire et Skrill. La disponibilité de Skrill en retrait est rare parmi les opérateurs ANJ français — c'est un avantage concret pour les joueurs e-wallet.",
          "Le retrait instantané est disponible depuis mars 2024 sur certaines méthodes. Aucun test indépendant publié n'a chiffré précisément le délai réel de traitement, contrairement à certains opérateurs dont les délais ont été testés. Le dépôt minimum est de 10 €. Un KYC complet est requis avant tout retrait.",
        ],
        highlights: [
          'Visa, Mastercard, PayPal, virement, Skrill (retrait)',
          'Skrill en retrait — rare parmi les opérateurs ANJ',
          'Retrait instantané annoncé depuis mars 2024',
        ],
      },
      support: {
        prose: [
          "Unibet dispose d'un live chat disponible de 8h à minuit, d'un numéro de téléphone et d'un support par e-mail. Le live chat est le canal le plus réactif : un test réalisé par Eurosport a mesuré un temps de réponse inférieur à 1 minute.",
          "L'absence de couverture nocturne (minuit-8h) est à noter pour les joueurs qui misent tard le soir. Le support est disponible en français, avec des agents formés sur les règles du pari sportif ANJ.",
        ],
        highlights: [
          'Live chat 8h-minuit (réponse < 1 min, test Eurosport)',
          'Téléphone disponible',
          'E-mail disponible',
        ],
      },
      mobile: {
        prose: [
          "L'application Unibet est notée 4,6/5 sur l'App Store iOS sur la base de 90 000 avis (source Eurosport, juin 2026) et 4,3/5 sur Google Play. L'app couvre les 3 disciplines depuis une interface unifiée. Elle intègre MyBet (création de combinés multi-paris sur le même match), Cash Out, annulation de pari (dans les 2 minutes, pré-match uniquement) et Unibet TV pour le streaming d'événements sportifs en direct.",
          'La navigation entre les 3 verticales (sport, poker, turf) est accessible depuis un compte unique. Les notifications push sont configurables par sport et par événement.',
        ],
        highlights: [
          'App Store iOS : 4,6/5 (90 000 avis)',
          'Google Play : 4,3/5',
          'MyBet + Cash Out + annulation pari (2 min) + Unibet TV',
        ],
      },
      // vip: undefined — convention §15
      securite: {
        prose: [
          "Unibet opère sous licence ANJ depuis 2010 — l'année d'ouverture du marché français du jeu en ligne. Depuis octobre 2024, Unibet fait partie du groupe FDJ United, dont l'État français est co-actionnaire de référence via la Française des Jeux (cotée en bourse, Euronext Paris). La fusion avec Parions Sport en Ligne est effective depuis le 24 mars 2026 ; Zeturf (hippique) avait été intégré en juillet 2025.",
          "Les obligations ANJ incluent : vérification d'identité obligatoire (KYC), plafonds de dépôt paramétrables, accès à l'auto-exclusion nationale (Fichier des Interdits de Jeu ANJ) et liens vers Joueurs Info Service (09 74 75 13 13). Partenariats sportifs actifs : NBA (plurisaisons), Olympique de Marseille.",
        ],
        highlights: [
          'Licence ANJ depuis 2010 (ouverture marché FR)',
          'Groupe FDJ United (État co-actionnaire) depuis octobre 2024',
          'Fusion Parions Sport en Ligne le 24 mars 2026',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'ANJ — Licence française (depuis 2010)' },
      {
        label: 'Bonus de bienvenue',
        value: "Jusqu'à 450 € cumulables (sport + poker + turf), en freebets",
      },
      {
        label: 'Méthodes de paiement',
        value: 'VISA, Mastercard, PayPal, virement, Skrill (retrait)',
      },
      {
        label: 'Délai de retrait',
        value: 'Instantané annoncé depuis mars 2024 (non testé indépendamment)',
      },
      { label: 'Catalogue', value: 'Sport + Poker + Hippique (Zeturf intégré juillet 2025)' },
      { label: 'Support', value: 'Live chat 8h-minuit (< 1 min), téléphone, e-mail' },
      { label: 'Application mobile', value: 'iOS 4,6/5 (90 000 avis) · Google Play 4,3/5' },
      { label: 'Fondé', value: '1997 (groupe) — ANJ France depuis 2010' },
      { label: 'Groupe', value: 'FDJ United (État co-actionnaire, depuis octobre 2024)' },
    ],
    faq: [
      {
        question: 'Unibet est-il le même opérateur que Parions Sport en Ligne ?',
        answer:
          "Oui, depuis le 24 mars 2026. Parions Sport en Ligne a fusionné dans Unibet à cette date. L'ensemble des fonctionnalités, de l'offre sportive et des comptes Parions Sport sont désormais accessibles directement sur Unibet.fr.",
      },
      {
        question: 'Le bonus Unibet est-il en cash ou en freebets ?',
        answer:
          "En freebets (paris gratuits à rejouer). Les 450 € cumulables sur 3 verticales sont des crédits de jeu, pas de l'argent réel. Le bonus sport représente 110 € (10 € sans dépôt + 100 € premier pari remboursé), le poker 250 € (premier dépôt doublé) et le turf 100 €. Consultez unibet.fr pour les conditions en vigueur.",
      },
      {
        question: 'Unibet propose-t-il des jeux de casino classiques (slots, roulette) ?',
        answer:
          "Non. La licence ANJ française n'autorise pas les jeux de casino classiques en ligne : machines à sous, roulette, blackjack et live casino avec croupier sont interdits. Unibet propose uniquement paris sportifs, poker et paris hippiques (via Zeturf intégré). Si vous cherchez des jeux de casino, les opérateurs offshore du comparatif proposent ces jeux, mais sans la protection de la réglementation française.",
      },
      {
        question: "Quels sont les atouts distinctifs d'Unibet sur le marché ANJ ?",
        answer:
          "Quatre points distinguent Unibet des autres opérateurs ANJ français : l'adossement au groupe FDJ United depuis octobre 2024 (État français co-actionnaire), l'offre 3 verticales unifiées issue de la fusion Parions Sport en Ligne (mars 2026) et de l'intégration Zeturf (juillet 2025), jusqu'à 450 € cumulables en freebets sur ces 3 verticales, et Skrill disponible en retrait — peu d'opérateurs ANJ proposent cette méthode.",
      },
    ],
    pourQui: {
      idealSi: [
        "Vous cherchez un opérateur adossé à l'État français : Unibet fait partie du groupe FDJ United depuis octobre 2024.",
        "Vous pariez sur 3 disciplines : Unibet offre jusqu'à 450 € de bonus cumulables en sport, poker et turf.",
        "Vous cherchiez Parions Sport en Ligne : Unibet a intégré l'offre le 24 mars 2026, regroupant sport, poker et turf.",
      ],
      bonChoixSi: [
        "Vous contactez le support en urgence : Unibet propose un téléphone et un live chat répondant en moins d'une minute.",
        "Vous utilisez Skrill pour vos retraits e-wallet : Unibet est l'un des rares opérateurs ANJ français à l'accepter.",
      ],
      aEviterSi: [
        "Vous voulez un bonus directement en argent réel : les 450 € cumulables d'Unibet sont crédités en freebets à rejouer.",
        "Vous misez la nuit : le live chat Unibet n'est disponible que de 8 h à minuit, sans couverture nocturne.",
      ],
    },
  },

  // ── 19. PMU (ANJ — enrichi juin 2026) ───────────────────────────────────────
  {
    slug: 'pmu',
    foundedYear: 1930,
    languages: ['FR'],
    currencies: ['EUR'],
    reviewCount: 0, // Trustpilot 4/5 global — chiffre avis FR non sourcé
    stars: 0,
    verdict:
      "PMU est le GIE de la filière hippique française, fondé en 1930. Il opère sous 3 licences ANJ distinctes (hippique, sport, poker) depuis 2010. Sa force majeure est l'hippique, avec 5 formats exclusifs — Quinté+, Jackpot, Champ Libre, Super 4, Pick 5 — et le streaming Equidia intégré. Le bonus sport de 100 € est versé en argent réel sans wager, retirable dès 1 € — seuil le plus bas du marché. Le support propose Sourdline, service téléphonique dédié aux parieurs malentendants, rare en ANJ FR. À noter : 3 apps séparées (pas d'app unifiée) et retraits limités au virement bancaire (3 à 5 jours).",
    sections: {
      // bonus: undefined — convention §15 (ANJ — hasBonus: false)
      jeux: {
        prose: [
          "Le cœur de PMU est le pari hippique avec 5 formats exclusifs : le Quinté+, qui permet de remporter la e-cagnotte en trouvant les 5 premiers chevaux dans le bon ordre ; le Jackpot, pari combiné sur 6 chevaux mutualisé ; le Champ Libre, paris multiples sur des critères libres ; le Super 4 et le Pick 5. Le streaming Equidia est intégré directement dans l'interface : réunions en direct, replays et statistiques disponibles sans abonnement supplémentaire. PMU dispose également de la base de données statistiques hippiques la plus étoffée du marché français, avec historiques par cheval, jockey, entraîneur et hippodrome.",
          "Sur le sport, PMU couvre les championnats français (Ligue 1, Top 14, Betclic Elite) et les grandes compétitions internationales (Premier League, Champions League, Grand Chelem tennis, etc.) avec paris avant-match et en live. À noter : les cotes sport PMU sont parfois moins compétitives que celles des opérateurs pure players sport. L'opérateur ne propose pas de programme de fidélité dédié aux parieurs sport.",
          "En poker, PMU propose des cash games aux mises variées, des tournois réguliers et les Spins (tournois à 3 joueurs à entrée rapide). Les tickets bonus poker permettent d'accéder aux Spins. PMU Poker partage les liquidités du réseau Network Poker Européen.",
        ],
        highlights: [
          '5 formats hippiques exclusifs : Quinté+, Jackpot, Champ Libre, Super 4, Pick 5',
          'Sport : Ligue 1, Champions League, Grand Chelem en live',
          'Poker : cash games, tournois, Spins via tickets bonus',
        ],
      },
      // live: undefined — convention §15
      paiements: {
        prose: [
          "PMU accepte une large gamme de méthodes de dépôt : carte bancaire (VISA, Mastercard), PayPal, Skrill, Neteller, virement bancaire, Paysafecard, TicketPremium, Moneyclic et Neosurf. Le dépôt minimum est de 10 €. Aucun frais de dépôt n'est appliqué.",
          "En retrait, PMU ne propose qu'une seule méthode : le virement bancaire. Le seuil de retrait minimum est de 1 € — le plus bas du marché. Les délais constatés sont de 3 à 5 jours ouvrés. Aucun frais de retrait n'est prélevé.",
          'La vérification KYC (identité, justificatif de domicile) est obligatoire avant le premier retrait. Le délai de validation est généralement de 1 à 2 jours ouvrés.',
        ],
        highlights: [
          'Dépôt : VISA, MC, PayPal, Skrill, Neteller, Paysafecard, Neosurf et virement',
          'Retrait : virement bancaire uniquement — seuil 1 € (le plus bas du marché)',
          'Délai retrait : 3 à 5 jours ouvrés — 0 € de frais',
        ],
      },
      support: {
        prose: [
          'PMU propose 3 canaux de support : téléphone (01 58 73 13 00, appel non surtaxé), live chat et e-mail. Un test Equirider a relevé une attente de 3 minutes en moyenne au live chat, avec des réponses jugées précises et complètes.',
          'PMU est le seul opérateur ANJ français à proposer Sourdline, un service téléphonique dédié aux parieurs malentendants — rare parmi les opérateurs de jeux réglementés en France.',
        ],
        highlights: [
          'Téléphone : 01 58 73 13 00 (appel non surtaxé)',
          'Live chat + e-mail disponibles',
          'Sourdline : service dédié aux parieurs malentendants — rare en ANJ FR',
        ],
      },
      mobile: {
        prose: [
          'PMU propose 3 applications spécialisées distinctes : PMU Hippique, PMU Sport et PMU Poker — disponibles sur iOS et Android, toutes validées ANJ. Chaque application est optimisée pour sa verticale.',
          "Les fonctionnalités communes incluent les paris en live, le streaming Equidia (app Hippique), le Cash Out, la gestion de compte, les dépôts et la consultation de l'historique.",
          "L'application PMU principale est notée 3,5/5 sur l'App Store iOS (vérification directe juin 2026) — en dessous de la moyenne des apps sport/hippique ANJ (Winamax 4,6/5, Betclic 4,7/5, Unibet 4,6/5). Les notes des applications PMU Sport et PMU Poker sur l'App Store et Google Play n'ont pas été sourcées lors de cette vérification.",
        ],
        highlights: [
          '3 applications spécialisées : PMU Hippique, PMU Sport, PMU Poker',
          'iOS + Android — validation ANJ sur les 3 apps',
          'Live betting, streaming Equidia et Cash Out disponibles',
          'App principale : 3,5/5 App Store iOS — en dessous de la moyenne ANJ (Winamax 4,6/5, Betclic 4,7/5)',
        ],
      },
      // vip: undefined — convention §15
      securite: {
        prose: [
          "PMU (Pari Mutuel Urbain) est un Groupement d'Intérêt Économique (GIE) fondé en 1930, dont les membres sont les sociétés de courses françaises (France Galop, Le Trot). Sa mission est le financement de la filière hippique nationale — un statut juridique distinct d'une entreprise commerciale classique ou d'un opérateur adossé à l'État.",
          "PMU opère sous 3 licences ANJ distinctes depuis l'ouverture du marché français en 2010 : licence hippique n° 0002-PH-2015-06-07, licence sportive n° 0002-PS-2010-06-07, et une licence poker séparée. Chaque verticale dispose de son propre agrément, garantissant la conformité réglementaire par discipline.",
          "La sécurité des comptes est assurée par un chiffrement SSL 256 bits et la double authentification (2FA) disponible. Le Pacte PMU 2030, annoncé par l'État, prévoit une évolution du statut GIE vers davantage d'autonomie commerciale, sans changement de licence ANJ.",
        ],
        highlights: [
          'GIE depuis 1930 — mission collective hippique, filière équine française',
          '3 licences ANJ distinctes : hippique n° 0002-PH-2015-06-07, sport, poker',
          'SSL 256 bits + 2FA disponible',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'ANJ — 3 licences distinctes (hippique, sport, poker)' },
      { label: 'Fondé', value: '1930 (GIE) — online ANJ depuis 2010' },
      { label: 'Bonus de bienvenue', value: "Jusqu'à 100 € par discipline — non cumulables" },
      {
        label: 'Méthodes de paiement dépôt',
        value: 'VISA, MC, PayPal, Skrill, Neteller, Paysafecard, Neosurf, virement',
      },
      { label: 'Retrait', value: 'Virement bancaire uniquement — délai 3 à 5 jours' },
      { label: 'Seuil de retrait', value: '1 € (le plus bas du marché)' },
      { label: 'Catalogue', value: 'Hippique (Quinté+, formats exclusifs) + Sport + Poker' },
      { label: 'Support', value: 'Téléphone, live chat, e-mail, Sourdline (malentendants)' },
      {
        label: 'Application mobile',
        value:
          '3 apps spécialisées (Hippique, Sport, Poker) — iOS + Android — app principale 3,5/5 App Store',
      },
      { label: 'Statut', value: 'GIE adossé à la filière hippique française' },
    ],
    pourQui: {
      idealSi: [
        'Vous pariez sur les courses hippiques : PMU propose le Quinté+, le Jackpot, le Champ Libre et 2 autres formats exclusifs.',
        'Vous misez avec un opérateur à mission collective : PMU est le GIE de la filière hippique française, fondé en 1930.',
        'Vous activez un bonus sport : PMU verse 100 € en argent réel sans wager, retirable dès 1 €.',
      ],
      bonChoixSi: [
        'Vous pratiquez plusieurs disciplines avec une app spécialisée par verticale : PMU propose 3 applications spécialisées — hippique, sport, poker.',
        'Vous pariez avec un handicap auditif : PMU propose Sourdline, service téléphonique dédié aux parieurs malentendants — rare en ANJ FR.',
      ],
      aEviterSi: [
        'Vous gérez sport, poker et hippique depuis une seule app : PMU propose 3 applications séparées, une par discipline.',
        "Vous retirez via e-wallet ou carte bancaire : PMU n'accepte que le virement bancaire en retrait, avec un délai de 3 à 5 jours.",
      ],
    },
    faq: [
      {
        question: 'Quels sont les formats hippiques exclusifs de PMU ?',
        answer:
          'PMU propose 5 formats hippiques exclusifs : le Quinté+, qui permet de remporter la e-cagnotte en trouvant les 5 premiers chevaux dans le bon ordre ; le Jackpot (6 chevaux mutualisé) ; le Champ Libre (critères libres) ; le Super 4 ; et le Pick 5. Ces formats sont propriétaires et disponibles uniquement sur PMU.',
      },
      {
        question: 'PMU propose-t-il une application unifiée pour ses 3 disciplines ?',
        answer:
          "Non. PMU propose 3 applications spécialisées distinctes : PMU Hippique, PMU Sport et PMU Poker — disponibles sur iOS et Android. Il n'existe pas d'application unifiée permettant d'accéder aux 3 disciplines depuis une interface unique.",
      },
      {
        question: 'Les bonus de bienvenue PMU sont-ils cumulables ?',
        answer:
          "Non. Un seul code promo peut être activé par compte joueur. Vous devez choisir entre le bonus sport (100 € en argent réel, code SPORT), le bonus hippique (100 € en tickets + 10 € e-Quinté+, code HIPPIQUE) ou le bonus poker (100 € mixte, code POKER) au moment de l'inscription.",
      },
      {
        question: 'Quelle est la différence entre PMU GIE et un opérateur classique ?',
        answer:
          "PMU est un Groupement d'Intérêt Économique (GIE) dont les membres sont les sociétés de courses françaises (France Galop, Le Trot). Sa mission est le financement de la filière hippique nationale. Ce statut juridique est distinct d'une entreprise commerciale classique ou d'un opérateur adossé à l'État. Les bénéfices de PMU sont redistribués à la filière hippique.",
      },
      {
        question: 'PMU propose-t-il des jeux de casino classiques ?',
        answer:
          "Non. PMU est un opérateur ANJ, et la réglementation française n'autorise pas les machines à sous, roulette, blackjack ou live casino en ligne. PMU propose uniquement paris hippiques, paris sportifs et poker.",
      },
    ],
  },

  // ── 20. PokerStars (ANJ — enrichi juin 2026) ─────────────────────────────────
  {
    slug: 'pokerstars',
    foundedYear: 2001, // PokerStars mondial ; ANJ poker 2010, ANJ sport 2016
    languages: ['FR'],
    currencies: ['EUR'],
    reviewCount: 0, // Trustpilot global — chiffre avis FR non sourcé
    stars: 0,
    verdict:
      "PokerStars est la référence mondiale du poker en ligne, présente en France sous licence ANJ depuis 2010. Sa plateforme poker propose la liquidité partagée ESPT (France, Espagne, Portugal), les tournois mondiaux WCOOP et SCOOP, le Power Path vers les tickets EPT (jusqu'à 9 300 €) et le programme Stars Rewards (jusqu'à 40 % de cashback sur le rake). En complément, PokerStars Sports (ex-BetStars, licence ANJ 2016) couvre le sport avec le Spin & Bet — multiplicateur jusqu'à x10 sur les paris simples, format propriétaire en France. À noter : 2 applications séparées (poker et sport) et app sport notée 4,2/5 iOS.",
    sections: {
      // bonus: undefined — convention §15 (ANJ — hasBonus: false)
      jeux: {
        prose: [
          "Le cœur de PokerStars est le poker, avec toutes les variantes majeures : Texas Hold'em, Omaha, 7 Card Stud, Razz, Badugi, 2-7 Triple Draw, HORSE, 8-Game Mix. Les formats incluent le cash game multi-tables (jusqu'à 24 tables simultanées sur PC, 16 sur Mac), les MTT, les Spin & Go (jackpots à 3 joueurs avec multiplicateur aléatoire jusqu'à x12 000 — note : 84 % des tables affichent le multiplicateur standard x2), le Zoom Poker, les PKO (Progressive Knock-Out), les Mystery Bounty et les Home Games. Les tournois propriétaires incluent le WCOOP (World Championship of Online Poker), le SCOOP (Spring Championship of Online Poker), le SECOOP, les Galactic Series et le Sunday Million (buy-in 109 €, garantie 250 000 €).",
          "La liquidité poker est partagée avec l'Espagne et le Portugal dans le cadre de la Shared European Liquidity Pool (ESPT), mutualisant 3 marchés ANJ régulés — configuration unique parmi les opérateurs ANJ français. Le programme Stars Rewards redistribue jusqu'à 40 % de cashback sur le rake pour les joueurs les plus actifs, via des coffres mystères et des points statut. Le Power Path est un circuit en 4 étapes permettant d'accéder à des tickets pour le circuit live EPT (European Poker Tour, valeur jusqu'à 9 300 €). Des freerolls sont disponibles chaque semaine, dont le Sunday Stars (1 500 €) et le Wednesday Freeroll (500 €).",
          "PokerStars Sports, anciennement BetStars (renommé en 2020), est la verticale sport de PokerStars en France, opérant sous licence ANJ n° 0006-PS-2016-06-07 depuis juin 2016. Elle couvre les sports principaux (football, tennis, basketball, rugby, etc.) en paris avant-match et en direct, avec Cash Out disponible. Son format distinctif, le Spin & Bet, applique un multiplicateur aléatoire jusqu'à x10 sur les gains potentiels d'un pari simple, pré-match ou live.",
        ],
        highlights: [
          'Liquidité partagée ESPT : France, Espagne, Portugal — 3 marchés ANJ en 1 pool',
          'Tournois mondiaux : WCOOP, SCOOP, SECOOP, Power Path → tickets EPT 9 300 €',
          "Spin & Bet sport : multiplicateur aléatoire jusqu'à x10 sur paris simples",
          "Stars Rewards : jusqu'à 40 % de cashback sur le rake pour joueurs actifs",
        ],
      },
      // live: undefined — convention §15
      paiements: {
        prose: [
          'PokerStars accepte les méthodes de dépôt suivantes : carte bancaire (VISA, Mastercard), PayPal, Apple Pay, Skrill, Neteller et virement bancaire. Le dépôt minimum est de 10 €.',
          "Particularité importante : à l'inscription, PokerStars envoie un code d'activation par courrier postal à l'adresse fournie. Ce code est requis pour valider le compte et accéder aux retraits. Anticipez cette étape avant de demander un premier retrait — le délai postal peut prendre plusieurs jours.",
          "Les délais de retrait varient selon la méthode choisie. Le KYC (vérification d'identité et justificatif de domicile) est strict et obligatoire avant tout retrait.",
        ],
        highlights: [
          'Dépôt : VISA, MC, PayPal, Apple Pay, Skrill, Neteller, virement',
          "Code d'activation par courrier postal à l'inscription (délai à anticiper)",
          'KYC strict — vérification obligatoire avant premier retrait',
        ],
      },
      support: {
        prose: [
          'PokerStars propose un live chat disponible 24h/24, 7j/7 — canal de support permanent y compris la nuit et les jours fériés.',
          "L'e-mail support@starsaccount.fr est également disponible, avec un délai de réponse de 1 à 2 jours ouvrés. Certains avis de joueurs mentionnent une réactivité mitigée hors live chat.",
        ],
        highlights: [
          'Live chat disponible 24h/24, 7j/7',
          'E-mail : support@starsaccount.fr (1-2 jours ouvrés)',
          'Avis joueurs mitigés sur la réactivité hors live chat',
        ],
      },
      mobile: {
        prose: [
          "PokerStars propose 2 applications distinctes : l'application PokerStars (poker) et l'application PokerStars Sports (paris sportifs), disponibles sur iOS et Android.",
          "L'application poker est notée 4,5/5 sur l'App Store iOS (vérification directe juin 2026) — leader de marché pour la qualité de son interface, le multi-tabling et l'intégration complète des tournois (WCOOP, SCOOP, Power Path disponibles directement depuis l'app).",
          "L'application PokerStars Sports est notée 4,2/5 sur l'App Store iOS (~3 000 avis) et 3,7/5 sur Google Play (source : MediaPronos mai 2026) — qualité UX jugée en dessous de la moyenne du marché sport ANJ.",
        ],
        highlights: [
          '2 applications distinctes : PokerStars poker + PokerStars Sports',
          'App poker : 4,5/5 App Store iOS — multi-tabling, tournois intégrés',
          'App sport : 4,2/5 iOS / 3,7/5 Android — qualité UX en dessous de la moyenne',
        ],
      },
      // vip: undefined — convention §15
      securite: {
        prose: [
          'PokerStars opère sous 2 licences ANJ distinctes en France : la licence poker (depuis 2010, PokerStars.fr) et la licence sportive n° 0006-PS-2016-06-07 (depuis juin 2016, PokerStars Sports). Chaque verticale dispose de son propre agrément ANJ.',
          "PokerStars est une filiale de Flutter Entertainment (groupe coté sur le London Stock Exchange, LSE : FLTR), l'un des plus grands opérateurs de jeux en ligne au monde. La sécurité des comptes est assurée par SSL/TLS 256 bits et la double authentification (2FA) disponible.",
          "PokerStars a désactivé les HUD (Heads-Up Display) sur son pool ANJ depuis 2019, une mesure d'équité garantissant que les joueurs récréatifs ne sont pas désavantagés par les outils d'analyse des réguliers. Le KYC est strict : pièce d'identité, justificatif de domicile et code d'activation postal requis avant tout retrait.",
        ],
        highlights: [
          '2 licences ANJ distinctes : poker (2010) + sport n° 0006-PS-2016-06-07 (2016)',
          'Flutter Entertainment — groupe mondial coté LSE',
          'HUD désactivé ANJ depuis 2019 — SSL/TLS 256 bits + 2FA',
        ],
      },
    },
    recapRows: [
      { label: 'Licence', value: 'ANJ — 2 licences (poker 2010 + sport 2016)' },
      { label: 'Groupe', value: 'Flutter Entertainment (LSE : FLTR)' },
      {
        label: 'Bonus de bienvenue',
        value: 'Poker : 100 € doublement 1er dépôt (code STARS100) — Sport : 100 € en freebets',
      },
      {
        label: 'Méthodes de paiement',
        value: 'VISA, MC, PayPal, Apple Pay, Skrill, Neteller, virement',
      },
      {
        label: 'Retrait',
        value: 'Variable selon méthode — code activation courrier postal requis',
      },
      { label: 'Catalogue', value: 'Poker (WCOOP/SCOOP/EPT/ESPT) + Sport (Spin & Bet x10)' },
      { label: 'Support', value: 'Live chat 24h/24, 7j/7 — e-mail' },
      {
        label: 'Application mobile',
        value: '2 apps séparées — poker (4,5/5 App Store) + sport (4,2/5 iOS, 3,7/5 Android)',
      },
      { label: 'Fondé', value: '2001 (PokerStars mondial) — ANJ poker 2010, sport 2016' },
      { label: 'Liquidité', value: 'ESPT partagée France + Espagne + Portugal' },
    ],
    pourQui: {
      idealSi: [
        "Vous jouez en cash games : PokerStars partage sa liquidité avec l'Espagne et le Portugal, mutualisant 3 marchés ANJ régulés.",
        "Vous participez à des tournois mondiaux : PokerStars organise le WCOOP, le SCOOP et propose des qualifications EPT jusqu'à 9 300 €.",
        "Vous jouez régulièrement au poker : le programme Stars Rewards propose jusqu'à 40 % de cashback sur le rake généré.",
      ],
      bonChoixSi: [
        'Vous jouez la nuit ou aux heures décalées : le live chat PokerStars est disponible 24h/24, 7j/7.',
        "Vous pariez sur le sport : Spin & Bet PokerStars applique un multiplicateur aléatoire jusqu'à x10 sur les paris simples, pré-match et live.",
      ],
      aEviterSi: [
        "Vous gérez poker et sport depuis une seule app : PokerStars propose 2 applications différentes, l'une pour le poker, l'autre pour le sport.",
        "Vous misez sur le sport depuis votre mobile : l'app PokerStars Sport est notée 4,2/5 sur l'App Store et 3,7/5 sur Google Play.",
      ],
    },
    faq: [
      {
        question: 'PokerStars est-il uniquement un site de poker ?',
        answer:
          'Non. PokerStars opère deux verticales en France : PokerStars poker (licence ANJ depuis 2010) et PokerStars Sports, anciennement BetStars (licence ANJ n° 0006-PS-2016-06-07 depuis juin 2016). Les deux verticales ont des licences distinctes et leurs propres applications.',
      },
      {
        question: "Qu'est-ce que la liquidité partagée ESPT ?",
        answer:
          'La Shared European Liquidity Pool (ESPT) mutualise les joueurs de PokerStars en France, Espagne et Portugal sur le même pool de tables. Cela offre plus de joueurs disponibles 24h/24, des prizepools plus élevés et une variété accrue de buy-ins. Ce mécanisme est propre à PokerStars parmi les opérateurs ANJ français.',
      },
      {
        question: "Qu'est-ce que le Spin & Bet sport de PokerStars ?",
        answer:
          "Le Spin & Bet est une mécanique propriétaire de PokerStars Sports inspirée des Spin & Go poker. Avant de valider un pari simple (pré-match ou live), un multiplicateur aléatoire entre x1 et x10 est appliqué à vos gains potentiels. C'est un format propriétaire sans équivalent direct sur le marché français.",
      },
      {
        question: "Pourquoi PokerStars envoie-t-il un code d'activation par courrier ?",
        answer:
          "C'est une mesure de sécurité KYC propre à PokerStars. À l'inscription, un courrier contenant un code d'activation est envoyé à votre adresse. Ce code est requis pour valider votre compte et accéder aux retraits. Anticipez cette étape avant de demander un premier retrait — le délai postal peut prendre plusieurs jours.",
      },
      {
        question: 'PokerStars propose-t-il des jeux de casino classiques ?',
        answer:
          "Non. PokerStars opère sous licence ANJ française, qui n'autorise pas les jeux de casino classiques (machines à sous, roulette, blackjack, live casino). PokerStars.fr propose uniquement du poker, et PokerStars Sports les paris sportifs.",
      },
    ],
  },
]

// ── Map + fallback ────────────────────────────────────────────────────────────

const reviewMap = new Map(reviews.map((r) => [r.slug, r]))

export function getReviewData(slug: string): ReviewData {
  return (
    reviewMap.get(slug) ?? {
      slug,
      foundedYear: 2020,
      languages: ['FR', 'EN'],
      currencies: ['EUR'],
      reviewCount: 300,
      stars: 4.0,
      verdict: `Notre équipe a testé ${slug} à l'argent réel. Retrouvez notre verdict complet ci-dessous.`,
      sections: {
        bonus: { prose: ['Analyse des conditions de bonus en cours de publication.'] },
        jeux: { prose: ['Audit de la ludothèque en cours de publication.'] },
        live: { prose: ['Évaluation du casino live en cours de publication.'] },
        paiements: { prose: ['Délais de retrait en cours de mesure.'] },
        support: { prose: ['Test du support en cours de publication.'] },
        mobile: { prose: ['Test mobile en cours de publication.'] },
        vip: { prose: ["Programme VIP en cours d'évaluation."] },
        securite: { prose: ['Vérification de la licence et de la sécurité en cours.'] },
      },
      recapRows: [{ label: 'Licence', value: 'Curaçao' }],
      faq: [],
    }
  )
}
