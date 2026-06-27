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
  // ── 3. Winamax vs PokerStars (ANJ poker — Phase 2.1.4 juin 2026) ────────────
  {
    slug: 'winamax-vs-pokerstars',
    slugA: 'winamax',
    slugB: 'pokerstars',
    winner: 'b',
    intro:
      "Winamax et PokerStars sont les deux références du poker en ligne en France, opérant tous deux sous licence ANJ depuis 2010. Winamax est l'opérateur historique du marché français — application unifiée poker+sport+hippique, cotes sportives parmi les plus compétitives ANJ. PokerStars, filiale de Flutter Entertainment, apporte la liquidité partagée ESPT (France, Espagne, Portugal), les tournois mondiaux WCOOP et SCOOP, et le programme Stars Rewards (jusqu'à 40 % de cashback sur le rake). Deux positionnements distincts pour deux profils de joueurs. Nous les avons comparés sur 6 critères décisifs pour un joueur de poker — liquidité, tournois, rakeback, application, support et inscription.",
    criteria: [
      { label: 'Note éditoriale', a: '8,5 / 10', b: '8,4 / 10', winner: 'a' },
      {
        label: 'Licence',
        a: 'ANJ — 2 licences (poker + sport)',
        b: 'ANJ — 2 licences (poker 2010 + sport 2016)',
        winner: 'tie',
      },
      {
        label: 'Liquidité poker',
        a: 'Pool FR exclusif',
        b: 'ESPT FR+ES+PT (3 marchés ANJ)',
        winner: 'b',
      },
      {
        label: 'Tournois phares',
        a: 'Séries MTT + Expresso · FR',
        b: 'WCOOP/SCOOP/EPT · Power Path 9 300 €',
        winner: 'b',
      },
      {
        label: 'Programme fidélité',
        a: 'Pas de rakeback structuré',
        b: "Stars Rewards jusqu'à 40 %",
        winner: 'b',
      },
      {
        label: 'App mobile',
        a: '4,6/5 iOS · unifiée poker+sport+hippique',
        b: '4,5/5 iOS poker · 2 apps séparées',
        winner: 'a',
      },
      {
        label: 'Support client',
        a: 'Formulaire + e-mail (pas de live chat)',
        b: 'Chat 24/7 + e-mail',
        winner: 'b',
      },
      {
        label: 'Méthodes paiement',
        a: 'VISA, MC, PayPal (3 méthodes)',
        b: 'VISA, MC, PayPal, Apple Pay, Skrill, Neteller (6)',
        winner: 'b',
      },
      { label: 'Hippique', a: "Intégré dans l'app", b: 'Absent', winner: 'a' },
      {
        label: 'Inscription',
        a: 'Directe',
        b: 'Code activation courrier postal (délai)',
        winner: 'a',
      },
    ],
    sections: [
      {
        criterion: 'Liquidité et volume de joueurs',
        winner: 'b',
        winnerLabel: 'Avantage PokerStars',
        aText:
          'Winamax opère avec un pool de joueurs exclusivement français — tous les adversaires rencontrés en cash game ou en tournoi jouent depuis la France sous réglementation ANJ. Cette homogénéité crée une communauté clairement identifiée mais peut limiter le nombre de tables actives en dehors des heures de pointe françaises.',
        bText:
          "PokerStars mutualise sa liquidité en ESPT — les marchés français, espagnol et portugais jouent ensemble sur les mêmes tables. Plus de tables actives 24h/24, des prizepools de tournois plus élevés et une plus grande variété de stakes disponibles à toute heure. Pour un joueur de poker actif, c'est le critère différenciant le plus concret entre les deux opérateurs.",
      },
      {
        criterion: 'Application mobile',
        winner: 'a',
        winnerLabel: 'Avantage Winamax',
        aText:
          "Winamax propose une application unifiée couvrant poker, sport et hippique depuis un seul compte. Note 4,6/5 App Store iOS et 4,3/5 Google Play (vérification directe juin 2026). Navigation fluide entre les verticales sans re-connexion. L'un des rares opérateurs ANJ à intégrer les trois verticales dans une seule application.",
        bText:
          'PokerStars distribue deux applications distinctes : PokerStars Poker (4,5/5 iOS) et PokerStars Sports (4,2/5 iOS, 3,7/5 Android — MediaPronos mai 2026). Chaque verticale dispose de sa propre application. Aucune intégration cross-vertical : un joueur poker+sport jongle entre deux apps.',
      },
      {
        criterion: 'Tournois et formats poker',
        winner: 'b',
        winnerLabel: 'Avantage PokerStars',
        aText:
          "Winamax propose le Sunday MainEvent hebdomadaire, des Séries MTT régulières et l'Expresso — sit & go à prize pool multiplicateur. Calendrier ancré dans le marché français avec une communauté reconnue. Formats Texas Hold'em et Omaha couverts.",
        bText:
          "PokerStars dispose de tournois mondiaux propriétaires : WCOOP (World Championship of Online Poker), SCOOP (Spring Championship) et EPT (European Poker Tour). Le Power Path permet de gagner des packages EPT jusqu'à 9 300 €. Ces tournois n'ont pas d'équivalent sur le marché ANJ français en juin 2026.",
      },
      {
        criterion: 'Programme fidélité et rakeback',
        winner: 'b',
        winnerLabel: 'Avantage PokerStars',
        aText:
          "Winamax ne propose pas de programme de rakeback structuré. Des promotions ponctuelles encadrées par l'ANJ existent — freebets sport, bonus poker temporaires — mais aucun mécanisme de cashback automatique sur les mains jouées. Les joueurs réguliers ne récupèrent pas de pourcentage du rake généré.",
        bText:
          "Stars Rewards : cashback jusqu'à 40 % sur le rake pour les joueurs les plus actifs (niveau Diamond ou supérieur). Crédit automatique sur le solde, sans condition de mise. C'est le seul programme de rakeback structuré disponible sur le marché ANJ français en juin 2026.",
      },
      {
        criterion: 'Support client',
        winner: 'b',
        winnerLabel: 'Avantage PokerStars',
        aText:
          'Winamax est accessible par formulaire de contact et e-mail uniquement — pas de live chat, pas de numéro de téléphone. Délai de réponse de quelques heures à 24h selon la complexité. Équipe française dédiée, compétente, mais sans canal temps réel.',
        bText:
          'PokerStars propose un live chat disponible 24h/24, 7j/7, avec des réponses en quelques minutes pour les questions simples. E-mail en complément pour les demandes complexes. Équipe multilingue dont une équipe francophone. La réactivité support la plus élevée parmi les opérateurs ANJ en juin 2026.',
      },
      {
        criterion: 'Fiabilité, ancienneté et inscription',
        winner: 'tie',
        winnerLabel: 'Match nul',
        aText:
          "Winamax opère sous double licence ANJ depuis 2010 (poker + sport) — plus de 15 ans sans incident de sécurité majeur. Marque historique du marché français. Inscription directe : compte actif immédiatement, sans délai d'activation postal. KYC obligatoire avant le premier retrait.",
        bText:
          "PokerStars opère sous deux licences ANJ depuis 2010 (poker) et 2016 (sport, n° 0006-PS-2016-06-07). Filiale de Flutter Entertainment (LSE : FLTR). HUD désactivé sur le pool ANJ depuis 2019. ⚠️ Friction d'inscription : un code d'activation est envoyé par courrier postal après la création du compte — délai à anticiper avant le premier retrait de gains importants.",
      },
    ],
    verdictIntro:
      "Pour un joueur de poker actif focalisé sur la liquidité, les tournois et le rakeback, PokerStars prend l'avantage sur 3 critères décisifs. Pour un joueur polyvalent cherchant poker, sport et hippique dans une seule application sans délai d'inscription, Winamax reste la référence intégrée du marché français.",
    verdictA: [
      'Vous voulez une seule application pour poker, sport et hippique : Winamax unifie les 3 verticales sur un compte unique depuis 2010 (4,6/5 iOS).',
      'Vous pariez aussi sur le sport : Winamax propose les cotes les plus compétitives du marché ANJ français en juin 2026.',
      "Vous voulez vous inscrire et jouer immédiatement : Winamax n'impose pas de code d'activation par courrier postal.",
    ],
    verdictB: [
      'Vous cherchez la liquidité maximale : PokerStars mutualise les marchés ANJ français, espagnol et portugais (ESPT).',
      "Vous valorisez le rakeback automatique : Stars Rewards rembourse jusqu'à 40 % du rake généré, sans condition de mise.",
      "Vous voulez accéder aux tournois mondiaux : WCOOP, SCOOP et Power Path → tickets EPT jusqu'à 9 300 €.",
    ],
    faq: [
      {
        question: 'Winamax ou PokerStars : lequel a la meilleure liquidité poker en France ?',
        answer:
          "PokerStars a une liquidité plus large grâce à la mutualisation ESPT — les joueurs français partagent les tables avec ceux d'Espagne et du Portugal. Cela offre plus de tables actives 24h/24, des prizepools de tournois plus élevés et une plus grande variété de stakes disponibles. Winamax conserve un pool exclusivement français, plus homogène en termes d'horaires de jeu et d'ambiance francophone.",
      },
      {
        question: "Quels tournois PokerStars propose-t-il que Winamax n'a pas ?",
        answer:
          "PokerStars dispose de tournois mondiaux propriétaires absents chez Winamax : WCOOP (World Championship of Online Poker), SCOOP (Spring Championship) et le Power Path qui permet de gagner des tickets EPT (European Poker Tour) jusqu'à 9 300 €. Winamax mise sur ses propres séries MTT et ses tournois Expresso, ancrés dans le marché français mais sans équivalent mondial.",
      },
      {
        question: 'Comment fonctionne le programme Stars Rewards ?',
        answer:
          "Stars Rewards est le programme de fidélité PokerStars. À chaque main jouée en cash game ou en tournoi, vous accumulez des points qui se transforment en cashback sur le rake généré, jusqu'à 40 % pour les joueurs les plus actifs (niveau Diamond ou supérieur). Le cashback est crédité automatiquement sur votre solde, sans condition de mise. C'est l'un des rares programmes de rakeback structurés disponibles sur le marché ANJ français.",
      },
      {
        question: 'Peut-on gérer poker et sport dans une seule application ?',
        answer:
          "Oui chez Winamax : l'application unifie poker, sport et hippique sur un compte unique depuis 2010, notée 4,6/5 sur l'App Store. Chez PokerStars, ce n'est pas possible — l'opérateur distribue 2 applications séparées : PokerStars Poker (4,5/5 iOS) et PokerStars Sports (4,2/5 iOS). Pour un joueur polyvalent, Winamax offre une intégration que PokerStars n'a pas.",
      },
      {
        question: 'Les deux opérateurs sont-ils bien agréés ANJ depuis 2010 ?',
        answer:
          "Oui. Winamax et PokerStars ont obtenu leurs agréments ANJ en 2010, lors de l'ouverture du marché français des jeux en ligne. Tous deux opèrent légalement sous le cadre réglementaire français avec deux licences distinctes (poker + sport). PokerStars dispose en plus de l'agrément sport n° 0006-PS-2016-06-07 depuis 2016 (ex-BetStars).",
      },
    ],
  },
]

export const versusMatchupBySlug = new Map(versusMatchups.map((m) => [m.slug, m]))
