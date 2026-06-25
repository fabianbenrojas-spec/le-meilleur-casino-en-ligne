export interface VsCriterion {
  label: string
  a: string
  b: string
  winner: 'a' | 'b' | 'tie'
}

export interface VsSection {
  criterion: string
  winner: 'a' | 'b' | 'tie'
  winnerLabel: string
  aText: string
  bText: string
}

export interface VersusMatchup {
  slug: string
  slugA: string
  slugB: string
  winner: 'a' | 'b'
  intro: string
  criteria: VsCriterion[]
  sections: VsSection[]
  verdictIntro: string
  verdictA: string[]
  verdictB: string[]
  faq?: Array<{ question: string; answer: string }>
}

export const versusMatchups: VersusMatchup[] = [
  {
    slug: 'cresus-vs-lucky8',
    slugA: 'cresus',
    slugB: 'lucky8',
    winner: 'a',
    intro:
      'Deux poids lourds du marché français, tous deux sous licence Curaçao. Nous les avons testés côte à côte sur six critères décisifs. Verdict critère par critère.',
    criteria: [
      { label: 'Note globale', a: '9,2 / 10', b: '8,9 / 10', winner: 'a' },
      { label: 'Bonus de bienvenue', a: '200 € + 100 tours', b: '100 € + 100 tours', winner: 'a' },
      { label: 'Conditions de mise', a: '35×', b: '35×', winner: 'tie' },
      { label: 'RTP moyen', a: '96,4 %', b: '96,1 %', winner: 'a' },
      { label: 'Délai de retrait', a: '< 24 h', b: '24–48 h', winner: 'a' },
      { label: 'Nombre de jeux', a: '2 100+', b: '1 500+', winner: 'a' },
      { label: 'Paiement crypto', a: 'Oui (BTC, ETH)', b: 'Non', winner: 'a' },
      { label: 'Licence', a: 'Curaçao 8048', b: 'Curaçao', winner: 'tie' },
      { label: 'Support français', a: 'Chat FR 7j/7', b: 'Chat FR 7j/7 (2 min)', winner: 'b' },
    ],
    sections: [
      {
        criterion: 'Bonus de bienvenue',
        winner: 'a',
        winnerLabel: 'Avantage Cresus',
        aText:
          '200 € + 100 tours pour 20 € déposés, wager 35×, sans code. Le double du montant de Lucky8 à conditions identiques.',
        bText:
          '100 € + 100 tours, wager 35× également. Correct, mais le plafond de bonus est deux fois plus bas que celui de Cresus.',
      },
      {
        criterion: 'Ludothèque',
        winner: 'a',
        winnerLabel: 'Avantage Cresus',
        aText:
          '2 100+ jeux, tous les grands fournisseurs, RTP moyen 96,4 %. Catalogue plus large et mieux fourni en live.',
        bText:
          "1 500+ jeux orientés machines à sous, avec d'excellents tournois — mais moins de tables live et un catalogue global plus restreint.",
      },
      {
        criterion: 'Paiements & retraits',
        winner: 'a',
        winnerLabel: 'Avantage Cresus',
        aText:
          'Retraits crédités en moins de 24 h (testé), et paiements crypto (BTC, ETH, USDT) en plus des méthodes classiques.',
        bText:
          'Retraits en 24 à 48 h, uniquement par carte et e-wallet. Pas de support crypto à ce jour.',
      },
      {
        criterion: 'Support client',
        winner: 'b',
        winnerLabel: 'Avantage Lucky8',
        aText: 'Chat francophone 7j/7, réactif et compétent — mais pas de ligne téléphonique.',
        bText:
          'Chat FR 7j/7 avec un temps de réponse moyen mesuré de 2 minutes, légèrement plus rapide, et une FAQ très complète.',
      },
      {
        criterion: 'Expérience mobile',
        winner: 'tie',
        winnerLabel: 'Match nul',
        aText: "Site mobile (PWA) rapide et fluide, installable, LCP < 2 s. Pas d'app native.",
        bText:
          'PWA équivalente, bien optimisée. Les deux offrent une expérience mobile de qualité comparable.',
      },
      {
        criterion: 'Sécurité & licence',
        winner: 'a',
        winnerLabel: 'Léger avantage Cresus',
        aText:
          'Licence Curaçao 8048, SSL, outils de jeu responsable complets (limites, auto-exclusion, rappels de session).',
        bText:
          'Même licence Curaçao et chiffrement SSL, outils de jeu responsable présents mais un peu moins granulaires.',
      },
    ],
    verdictIntro:
      "Cresus l'emporte sur la majorité des critères et reste notre recommandation par défaut. Mais Lucky8 garde des atouts selon votre profil de jeu.",
    verdictA: [
      'Vous voulez le plus gros bonus à conditions égales',
      'Les retraits rapides (< 24 h) sont prioritaires',
      'Vous payez en crypto ou cherchez le plus large catalogue',
    ],
    verdictB: [
      'Vous adorez les tournois de machines à sous',
      'Le cashback hebdomadaire vous intéresse',
      'Vous privilégiez un support ultra-réactif',
    ],
  },
  // ── 2. Winamax vs Betclic (ANJ sport — Phase 2.1.1 juin 2026) ──────────────
  {
    slug: 'winamax-vs-betclic',
    slugA: 'winamax',
    slugB: 'betclic',
    winner: 'b',
    intro:
      "Winamax et Betclic sont les deux références du pari réglementé en France sous licence ANJ. Winamax est l'opérateur poker historique du marché français depuis 2010, reconnu pour les cotes les plus compétitives ANJ sur le sport. Betclic a refondu son application en juin 2026 (4,7/5 iOS) et propose des retraits SEPA Instant testés en moins de 15 minutes. Deux opérateurs légaux, deux profils distincts. Nous les avons comparés sur 6 critères décisifs — bonus, cotes et poker, paiements, support, application mobile et fiabilité — pour vous aider à choisir selon votre pratique.",
    criteria: [
      { label: 'Note éditoriale', a: '8,5 / 10', b: '8,2 / 10', winner: 'a' },
      { label: 'Licence', a: 'ANJ depuis 2010', b: 'ANJ depuis 2010', winner: 'tie' },
      {
        label: 'Bonus de bienvenue',
        a: 'Pas de bonus casino',
        b: '100€ remboursé 1er pari perdant',
        winner: 'b',
      },
      {
        label: 'Cotes sport',
        a: 'Parmi les plus compétitives ANJ',
        b: 'Compétitives · partenaire EDF / Top 14',
        winner: 'a',
      },
      {
        label: 'Délai de retrait',
        a: '24-48h (CB, PayPal)',
        b: '< 15 min SEPA Instant (MediaPronos mai 2026)',
        winner: 'b',
      },
      {
        label: 'Support client',
        a: 'Formulaire + e-mail (pas de live chat)',
        b: 'Live chat 7j/7 + e-mail',
        winner: 'b',
      },
      {
        label: 'App iOS',
        a: '4,6/5 App Store',
        b: '4,7/5 App Store (refonte juin 2026)',
        winner: 'b',
      },
      {
        label: 'Poker',
        a: 'Opérateur historique FR',
        b: 'Réseau iPoker (liquidité Europe)',
        winner: 'tie',
      },
      {
        label: 'Hippique',
        a: "Intégré dans l'app",
        b: 'Betclic Turf (FR + international)',
        winner: 'tie',
      },
      {
        label: 'Méthodes de paiement',
        a: 'VISA, Mastercard, PayPal',
        b: 'VISA, Mastercard, PayPal, SEPA Instant',
        winner: 'b',
      },
    ],
    sections: [
      {
        criterion: 'Bonus de bienvenue',
        winner: 'b',
        winnerLabel: 'Avantage Betclic',
        aText:
          "Winamax n'affiche pas de bonus de bienvenue casino structuré pour les nouveaux comptes. L'opérateur communique des promotions ponctuelles encadrées par la réglementation ANJ — codes saisonniers, freebets sport, bonus poker — dont les montants et conditions varient. Cette politique est cohérente avec les exigences de transparence imposées par l'ANJ. Consultez winamax.fr pour les offres en cours au moment de votre inscription.",
        bText:
          "Betclic propose depuis mars 2026 un bonus de bienvenue de 100 € : votre premier pari perdant est remboursé en argent réel, à hauteur de 100 € maximum. Pas de freebets — l'argent remboursé est immédiatement retirable. L'offre cible les nouveaux parieurs sport et est soumise à l'encadrement ANJ. C'est l'une des rares offres de bienvenue en argent réel sur le marché ANJ français en juin 2026.",
      },
      {
        criterion: 'Sport et cotes',
        winner: 'a',
        winnerLabel: 'Avantage Winamax',
        aText:
          'Winamax affiche les cotes les plus compétitives du marché ANJ sur le sport — claim sourcé par BasketUSA en juin 2026. La plateforme couvre 25+ disciplines dont la Ligue 1, la Premier League, les compétitions UEFA, le tennis ATP/WTA et le basketball NBA. Les paris en direct sont accessibles 7j/7 avec Cash Out partiel et statistiques en temps réel. La destination de référence pour les parieurs sensibles aux cotes.',
        bText:
          "Betclic couvre 30+ sports avec des cotes compétitives. L'opérateur se distingue par ses partenariats institutionnels : partenaire officiel du Top 14 rugby, de la Betclic Elite basket et associé à plusieurs compétitions françaises. La fonction MyCombi permet de créer des paris combinés avec multiplicateur de cote. Le Cash Out total ou partiel est disponible sur la majorité des marchés en live.",
      },
      {
        criterion: 'Poker',
        winner: 'tie',
        winnerLabel: 'Match nul',
        aText:
          "Winamax est l'opérateur poker historique du marché français depuis son agrément ANJ en 2010. La salle propose Texas Hold'em, Omaha et variantes, avec des tournois MTT à garantie quotidiens (Expresso, Series, Sunday MainEvent) et le multitabling jusqu'à 12 tables simultanées. Application unifiée poker + sport + hippique depuis 2010, référence incontournable pour les joueurs de poker réguliers en France.",
        bText:
          "Betclic Poker fait partie du réseau iPoker, le plus large réseau de poker européen (France, Espagne, Portugal, Italie). Cette liquidité commune offre des tables cash games actives 24h/24 et des tournois à fort prize pool indépendamment de l'heure. L'application Betclic refondue (4,7/5 iOS) intègre poker, sport et hippique depuis un compte unique.",
      },
      {
        criterion: 'Paiements & retraits',
        winner: 'b',
        winnerLabel: 'Avantage Betclic',
        aText:
          "Winamax accepte VISA, Mastercard et PayPal en dépôt et retrait. Les délais varient de 24 à 48 heures selon la méthode. L'opérateur ne propose pas de virement SEPA Instant en juin 2026. Le KYC est strict et obligatoire avant le premier retrait, conformément aux exigences ANJ.",
        bText:
          "Betclic propose le virement SEPA Instant testé en moins de 15 minutes en mai 2026 (source : MediaPronos). C'est l'un des délais les plus rapides du marché ANJ pour un retrait bancaire direct. Les méthodes acceptées : VISA, Mastercard, PayPal et SEPA Instant. KYC strict obligatoire avant le premier retrait, délai supplémentaire possible au-delà de 2 000 €.",
      },
      {
        criterion: 'Support & app mobile',
        winner: 'b',
        winnerLabel: 'Avantage Betclic',
        aText:
          "Le support Winamax est accessible uniquement par formulaire de contact et e-mail — aucun live chat, aucun téléphone en juin 2026. Délais de réponse : de quelques heures à 24h selon la complexité. L'application native (iOS 4,6/5, Android 4,3/5) est unifiée poker + sport + hippique depuis 2010, reconnue pour sa stabilité technique.",
        bText:
          "Betclic propose un live chat disponible 7 jours sur 7, complété par l'e-mail. Réponse en quelques minutes pour les requêtes simples. L'application a été refondue en juin 2026 : 4,7/5 App Store iOS, 4,5/5 Google Play. Fonctionnalités distinctives : Cash Out, annulation de pari (5×/jour, 2 min) et MyCombi. Navigation unifiée sport + poker + hippique.",
      },
      {
        criterion: 'Sécurité & fiabilité',
        winner: 'tie',
        winnerLabel: 'Match nul',
        aText:
          'Winamax opère sous double licence ANJ depuis 2010 (paris sportifs + poker) — le cadre réglementaire français le plus exigeant. Plus de 15 ans de présence sans incident de sécurité majeur. KYC systématique, SSL/TLS, auto-exclusion, limites de dépôt, accès au Fichier des Interdits de Jeu ANJ. Un bilan de fiabilité exceptionnel.',
        bText:
          'Betclic opère sous licence ANJ depuis 2010, au sein du groupe Flutter Entertainment (LSE : FLTR). Mêmes obligations réglementaires que Winamax : KYC strict, SSL/TLS, auto-exclusion nationale ANJ, médiation indépendante. Données hébergées en Europe, conformes RGPD. Niveau de fiabilité et de protection des joueurs équivalent.',
      },
    ],
    verdictIntro:
      "Betclic prend l'avantage sur l'excellence opérationnelle — retrait SEPA Instant, support live chat, app refondue. Winamax reste la référence poker et les cotes les plus compétitives ANJ. Deux opérateurs légitimes : le bon choix dépend de votre discipline principale.",
    verdictA: [
      'Vous retirez fréquemment vos gains : Betclic SEPA Instant testé en moins de 15 minutes.',
      'Vous misez depuis votre smartphone : app Betclic notée 4,7/5 iOS, refondue juin 2026.',
      "Vous avez besoin d'une assistance rapide : live chat Betclic disponible 7 jours sur 7.",
    ],
    verdictB: [
      "Vous jouez principalement au poker : Winamax est l'opérateur poker historique du marché français depuis 2010.",
      'Vous cherchez les cotes les plus compétitives du marché ANJ sur le sport.',
      'Vous voulez un seul compte pour poker, sport et hippique depuis 2010.',
    ],
    faq: [
      {
        question: 'Winamax ou Betclic : lequel choisir en 2026 ?',
        answer:
          "Le choix dépend de votre pratique. Si vous priorisez le poker ou les cotes sport les plus compétitives ANJ, Winamax est la référence historique du marché français depuis 2010. Si vous valorisez l'excellence opérationnelle — retrait SEPA Instant testé en moins de 15 minutes, live chat 7j/7, app refondue 4,7/5 iOS — Betclic prend l'avantage en juin 2026. Les deux opérateurs sont agréés ANJ depuis 2010 et offrent le même niveau de fiabilité et de protection des joueurs.",
      },
      {
        question: 'Quel est le délai de retrait réel sur Betclic vs Winamax ?',
        answer:
          'Betclic propose le SEPA Instant, testé en moins de 15 minutes en mai 2026 (source : MediaPronos). Winamax traite les retraits sous 24 à 48 heures selon la méthode (carte bancaire, PayPal). Pour un retrait bancaire direct, Betclic est sensiblement plus rapide. Le premier retrait reste soumis à la vérification KYC obligatoire pour les deux opérateurs.',
      },
      {
        question: 'Winamax est-il meilleur que Betclic pour le poker ?',
        answer:
          "Match nul sur les fondamentaux. Winamax est l'opérateur poker historique du marché français depuis 2010 — une marque très installée parmi les joueurs FR. Betclic Poker bénéficie du réseau iPoker, le plus grand réseau partagé d'Europe (France, Espagne, Portugal, Italie), ce qui peut offrir plus de tables actives en dehors des heures de pointe. Le choix dépend de votre style : fidélité à la marque française ou volume de tables européennes.",
      },
      {
        question: 'Betclic a-t-il un meilleur bonus que Winamax ?',
        answer:
          "En juin 2026, Betclic propose un bonus de 100 € remboursé sur le premier pari perdant, en argent réel (pas de freebets). Winamax ne propose pas de bonus de bienvenue casino structuré — des promotions ponctuelles encadrées ANJ peuvent exister (consultez winamax.fr). Sur ce critère, Betclic prend l'avantage avec une offre quantifiable.",
      },
      {
        question: 'Winamax et Betclic sont-ils légaux en France ?',
        answer:
          "Oui. Les deux opérateurs sont agréés par l'Autorité Nationale des Jeux (ANJ) depuis 2010. Ils opèrent dans le cadre réglementaire français avec des obligations strictes de protection des joueurs, de prévention de la dépendance et de transparence sur les cotes et les conditions promotionnelles. Vous pouvez jouer chez l'un comme chez l'autre dans le respect total de la loi française.",
      },
    ],
  },
]

export const versusMatchupBySlug = new Map(versusMatchups.map((m) => [m.slug, m]))
