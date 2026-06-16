// Support (06) + Mobile (07) criterion content for the 10 generated versus pairs.
// Sourced from config/review-content.ts (sections.support / sections.mobile) — reformulated,
// never copied verbatim, never inventing a score. Winner/tie calls follow a transitive
// ladder so the same operator's relative ranking stays consistent across every pair it
// appears in (support: cresus > magical-spin > lucky8 > wild-sultan > madnix; mobile LCP:
// wild-sultan > lucky8 ≈ cresus > madnix > magical-spin).

export interface VersusExtraCrit {
  proseA: string
  proseB: string
  labelA: string
  labelB: string
  deepA: string[]
  deepB: string[]
  winner: 'a' | 'b' | 'tie'
}

export interface VersusExtraCrits {
  support: VersusExtraCrit
  mobile: VersusExtraCrit
}

export const VERSUS_EXTRA_CRITS: Record<string, VersusExtraCrits> = {
  'cresus-vs-lucky8': {
    support: {
      proseA: 'Cresus répond en chat en ~2 minutes, 7j/7, sans coupure francophone signalée.',
      proseB:
        "Lucky8 couvre le français de 8h à minuit ; en dehors, seul l'e-mail reste disponible.",
      labelA: '~2 min',
      labelB: '~4 min',
      deepA: ['Chat 7j/7, aucune coupure mentionnée', 'Réponse mesurée ~2 min'],
      deepB: ['Chat FR 8h–minuit, coupure nocturne (e-mail seul)', 'Réponse mesurée ~4 min'],
      winner: 'a',
    },
    mobile: {
      proseA: 'Cresus reste sous les 2 secondes de LCP en 4G, sans application native.',
      proseB: 'Lucky8 mesure un LCP de 1,9 s, avec les tournois pleinement jouables sur mobile.',
      labelA: '< 2 s',
      labelB: '1,9 s',
      deepA: ['PWA installable, LCP < 2 s (4G)', 'Pas d’application native'],
      deepB: ['LCP 1,9 s (4G)', 'Tournois accessibles depuis le mobile'],
      winner: 'tie',
    },
  },
  'cresus-vs-wild-sultan': {
    support: {
      proseA: 'Cresus répond en chat en ~2 minutes, 7j/7, sans coupure francophone signalée.',
      proseB:
        'Wild Sultan réserve le français à la plage 10h–22h ; en dehors, le délai grimpe à 8–12 minutes.',
      labelA: '~2 min',
      labelB: 'FR 10h–22h',
      deepA: ['Chat 7j/7, aucune coupure mentionnée', 'Réponse mesurée ~2 min'],
      deepB: ['Chat FR limité à 10h–22h (EN 24h/24)', 'Hors créneau FR : délai 8–12 min'],
      winner: 'a',
    },
    mobile: {
      proseA: 'Cresus reste sous les 2 secondes de LCP en 4G, sans application native.',
      proseB:
        'Wild Sultan affiche le LCP le plus bas du comparatif (1,7 s) et gère parfaitement le dépôt crypto depuis mobile.',
      labelA: '< 2 s',
      labelB: '1,7 s',
      deepA: ['PWA installable, LCP < 2 s (4G)', 'Pas d’application native'],
      deepB: ['LCP 1,7 s — le plus bas mesuré', 'Dépôt crypto mobile sans accroc'],
      winner: 'b',
    },
  },
  'cresus-vs-madnix': {
    support: {
      proseA:
        'Cresus maintient un chat francophone constant, 7j/7, avec une réponse mesurée à ~2 minutes.',
      proseB:
        'Madnix réserve ses meilleurs agents francophones à la journée (9h–18h) ; la nuit, le support bascule en anglais, moins réactif.',
      labelA: '~2 min',
      labelB: 'FR 9h–18h',
      deepA: ['Chat 7j/7, aucune coupure mentionnée', 'Réponse mesurée ~2 min'],
      deepB: ['Chat 24h/24, mais FR seulement 9h–18h', 'Bascule nocturne sur agents anglophones'],
      winner: 'a',
    },
    mobile: {
      proseA: 'Cresus reste sous les 2 secondes de LCP, sans fioriture mais efficace.',
      proseB:
        'Madnix soigne l’expérience mobile (animations, missions en 1 clic) mais affiche un LCP mesuré à 2,1 s, légèrement au-dessus de Cresus.',
      labelA: '< 2 s',
      labelB: '2,1 s',
      deepA: ['PWA installable, LCP < 2 s (4G)', 'Pas d’application native'],
      deepB: ['LCP 2,1 s, animations fluides', 'Missions quotidiennes en 1 clic'],
      winner: 'a',
    },
  },
  'cresus-vs-magical-spin': {
    support: {
      proseA: 'Cresus répond en ~2 minutes, 7j/7, sans coupure francophone.',
      proseB:
        'Magical Spin couvre aussi 24h/24 en français, avec une réponse mesurée sous 3 minutes — très solide, mais un cran derrière Cresus.',
      labelA: '~2 min',
      labelB: '< 3 min',
      deepA: ['Chat 7j/7, aucune coupure mentionnée', 'Réponse mesurée ~2 min'],
      deepB: ['Chat 24h/24 (FR), aucune coupure mentionnée', 'Réponse mesurée < 3 min'],
      winner: 'a',
    },
    mobile: {
      proseA: 'Cresus reste sous les 2 secondes de LCP, avec une interface pensée mobile.',
      proseB:
        'Magical Spin accuse le LCP le plus lent du comparatif (2,4 s), sur une interface datée de 2017 jamais entièrement adaptée au mobile moderne.',
      labelA: '< 2 s',
      labelB: '2,4 s',
      deepA: ['PWA installable, LCP < 2 s (4G)', 'Pas d’application native'],
      deepB: ['LCP 2,4 s — le plus lent mesuré', 'Interface 2017 non modernisée'],
      winner: 'a',
    },
  },
  'lucky8-vs-wild-sultan': {
    support: {
      proseA: 'Lucky8 couvre le français de 8h à minuit, avec une réponse mesurée à ~4 minutes.',
      proseB:
        'Wild Sultan limite le français à 10h–22h ; en dehors, le délai grimpe à 8–12 minutes en anglais.',
      labelA: '~4 min',
      labelB: 'FR 10h–22h',
      deepA: ['Chat FR 8h–minuit (16h de couverture)', 'Réponse mesurée ~4 min'],
      deepB: ['Chat FR 10h–22h (12h de couverture)', 'Hors créneau FR : délai 8–12 min'],
      winner: 'a',
    },
    mobile: {
      proseA:
        'Lucky8 affiche un LCP mesuré à 1,9 s, avec les tournois pleinement accessibles depuis le mobile.',
      proseB:
        'Wild Sultan descend à 1,7 s de LCP — la meilleure mesure du comparatif — et gère parfaitement le dépôt crypto mobile.',
      labelA: '1,9 s',
      labelB: '1,7 s',
      deepA: ['LCP 1,9 s (4G)', 'Tournois accessibles depuis le mobile'],
      deepB: ['LCP 1,7 s — le plus bas mesuré', 'Dépôt crypto mobile sans accroc'],
      winner: 'b',
    },
  },
  'lucky8-vs-madnix': {
    support: {
      proseA:
        'Lucky8 couvre le français sur une plage de 16 heures (8h–minuit), avec une réponse mesurée à ~4 minutes.',
      proseB:
        'Madnix réserve le français à 9h–18h (9 heures) ; la nuit, les agents anglophones prennent le relais, moins réactifs.',
      labelA: '~4 min',
      labelB: 'FR 9h–18h',
      deepA: ['Chat FR 8h–minuit (16h de couverture)', 'Réponse mesurée ~4 min'],
      deepB: [
        'Chat FR seulement 9h–18h (9h de couverture)',
        'Bascule nocturne sur agents anglophones',
      ],
      winner: 'a',
    },
    mobile: {
      proseA:
        'Lucky8 mesure un LCP de 1,9 s, avec les tournois pleinement jouables depuis le mobile.',
      proseB:
        'Madnix soigne l’habillage mobile (animations, missions en 1 clic) mais affiche un LCP légèrement plus élevé (2,1 s).',
      labelA: '1,9 s',
      labelB: '2,1 s',
      deepA: ['LCP 1,9 s (4G)', 'Tournois accessibles depuis le mobile'],
      deepB: ['LCP 2,1 s, animations fluides', 'Missions quotidiennes en 1 clic'],
      winner: 'a',
    },
  },
  'lucky8-vs-magical-spin': {
    support: {
      proseA: 'Lucky8 couvre le français de 8h à minuit, avec une réponse mesurée à ~4 minutes.',
      proseB:
        'Magical Spin couvre le français 24h/24 sans coupure signalée, avec une réponse mesurée sous 3 minutes.',
      labelA: '~4 min',
      labelB: '< 3 min',
      deepA: ['Chat FR 8h–minuit, coupure nocturne (e-mail seul)', 'Réponse mesurée ~4 min'],
      deepB: ['Chat 24h/24 (FR), aucune coupure mentionnée', 'Réponse mesurée < 3 min'],
      winner: 'b',
    },
    mobile: {
      proseA:
        'Lucky8 affiche un LCP mesuré à 1,9 s, avec une expérience tournois fluide sur mobile.',
      proseB:
        'Magical Spin accuse le LCP le plus lent du comparatif (2,4 s), sur une interface datée de 2017.',
      labelA: '1,9 s',
      labelB: '2,4 s',
      deepA: ['LCP 1,9 s (4G)', 'Tournois accessibles depuis le mobile'],
      deepB: ['LCP 2,4 s — le plus lent mesuré', 'Interface 2017 non modernisée'],
      winner: 'a',
    },
  },
  'wild-sultan-vs-madnix': {
    support: {
      proseA:
        'Wild Sultan couvre le français sur 12 heures (10h–22h), avec un délai mesuré de 8 à 12 minutes en dehors.',
      proseB:
        'Madnix réduit le français à 9 heures par jour (9h–18h) ; la nuit, des agents anglophones moins réactifs prennent le relais.',
      labelA: 'FR 10h–22h',
      labelB: 'FR 9h–18h',
      deepA: ['Chat FR 10h–22h (12h de couverture)', 'Hors créneau FR : délai 8–12 min'],
      deepB: [
        'Chat FR seulement 9h–18h (9h de couverture)',
        'Bascule nocturne sur agents anglophones',
      ],
      winner: 'a',
    },
    mobile: {
      proseA:
        'Wild Sultan affiche le LCP le plus bas du comparatif (1,7 s), avec un dépôt crypto mobile sans accroc.',
      proseB:
        'Madnix soigne l’habillage mobile (animations, missions) mais reste un cran plus lent (LCP 2,1 s).',
      labelA: '1,7 s',
      labelB: '2,1 s',
      deepA: ['LCP 1,7 s — le plus bas mesuré', 'Dépôt crypto mobile sans accroc'],
      deepB: ['LCP 2,1 s, animations fluides', 'Missions quotidiennes en 1 clic'],
      winner: 'a',
    },
  },
  'wild-sultan-vs-magical-spin': {
    support: {
      proseA:
        'Wild Sultan réserve le français à 10h–22h ; en dehors, le délai grimpe à 8–12 minutes en anglais.',
      proseB:
        'Magical Spin couvre le français 24h/24 sans coupure, avec une réponse mesurée sous 3 minutes.',
      labelA: 'FR 10h–22h',
      labelB: '< 3 min',
      deepA: ['Chat FR 10h–22h (12h de couverture)', 'Hors créneau FR : délai 8–12 min'],
      deepB: ['Chat 24h/24 (FR), aucune coupure mentionnée', 'Réponse mesurée < 3 min'],
      winner: 'b',
    },
    mobile: {
      proseA:
        'Wild Sultan affiche le meilleur LCP du comparatif (1,7 s), avec un dépôt crypto mobile parfaitement géré.',
      proseB:
        'Magical Spin accuse le LCP le plus lent du comparatif (2,4 s), sur une interface datée de 2017.',
      labelA: '1,7 s',
      labelB: '2,4 s',
      deepA: ['LCP 1,7 s — le plus bas mesuré', 'Dépôt crypto mobile sans accroc'],
      deepB: ['LCP 2,4 s — le plus lent mesuré', 'Interface 2017 non modernisée'],
      winner: 'a',
    },
  },
  'madnix-vs-magical-spin': {
    support: {
      proseA:
        'Madnix réserve ses agents francophones à la journée (9h–18h) ; la nuit, le support bascule en anglais, moins réactif.',
      proseB:
        'Magical Spin maintient un chat francophone 24h/24 sans coupure signalée, avec une réponse mesurée sous 3 minutes.',
      labelA: 'FR 9h–18h',
      labelB: '< 3 min',
      deepA: [
        'Chat FR seulement 9h–18h (9h de couverture)',
        'Bascule nocturne sur agents anglophones',
      ],
      deepB: ['Chat 24h/24 (FR), aucune coupure mentionnée', 'Réponse mesurée < 3 min'],
      winner: 'b',
    },
    mobile: {
      proseA:
        'Madnix mesure un LCP de 2,1 s, avec une interface mobile soignée (animations, missions en 1 clic).',
      proseB:
        'Magical Spin reste à 2,4 s de LCP — le plus lent du comparatif — sur une interface datée de 2017.',
      labelA: '2,1 s',
      labelB: '2,4 s',
      deepA: ['LCP 2,1 s, animations fluides', 'Missions quotidiennes en 1 clic'],
      deepB: ['LCP 2,4 s — le plus lent mesuré', 'Interface 2017 non modernisée'],
      winner: 'a',
    },
  },
}
