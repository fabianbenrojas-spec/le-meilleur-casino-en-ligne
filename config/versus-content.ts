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
]

export const versusMatchupBySlug = new Map(versusMatchups.map((m) => [m.slug, m]))
