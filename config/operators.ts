// Operator seed data — source of truth for all pages.
// affiliateUrl goes through /go/[slug]/ which fires GA4 before redirecting.

export interface Operator {
  id: string
  slug: string
  name: string
  shortName?: string
  logoUrl?: string // Set when real SVG assets are available
  licence: string
  rating: number // out of 10, one decimal
  ratingLabel: 'Excellent' | 'Très bien' | 'Bien' | 'Correct'
  bonusAmount: string // display e.g. "200 €"
  bonusSuffix?: string // e.g. "+ 100 tours"
  bonusConditions: string
  bonusAmountNumber: number // for sorting
  bonusSlug: string // for GA4 data-bonus e.g. "200_euros"
  rtp: number // e.g. 96.4
  paymentMethods: string[] // display abbreviations
  features: string[]
  pros: string[]
  cons: string[]
  verdict: string
  tagline: string // one-liner for podium card
  affiliateUrl: string // real external URL (placeholder for dev)
}

function goUrl(slug: string) {
  return `/go/${slug}/`
}

export const operators: Operator[] = [
  {
    id: 'cresus',
    slug: 'cresus',
    name: 'Crésus Casino',
    shortName: 'Cresus',
    licence: 'Curaçao 8048',
    rating: 9.2,
    ratingLabel: 'Excellent',
    bonusAmount: '200 €',
    bonusSuffix: '+ 100 tours',
    bonusConditions: 'Wager 35× · dépôt min. 20 €',
    bonusAmountNumber: 200,
    bonusSlug: '200_euros',
    rtp: 96.4,
    paymentMethods: ['VISA', 'MC', '₿', 'PAYS'],
    features: ['Retrait 24h', '2 100+ jeux', 'Support FR'],
    pros: [
      'Meilleur rapport bonus/conditions du marché FR',
      'Retrait en moins de 24h',
      'Support en français 7j/7',
      'Plus de 2 100 jeux',
    ],
    cons: [
      'Interface vieillissante',
      'Pas de cashback hebdomadaire',
      'Limite de mise un peu restrictive',
    ],
    verdict:
      'Cresus est notre n°1 pour le marché français : meilleur équilibre bonus généreux, retraits rapides et service client francophone.',
    tagline: 'Le meilleur équilibre ludothèque / retraits rapides pour le marché français.',
    affiliateUrl: goUrl('cresus'),
  },
  {
    id: 'lucky8',
    slug: 'lucky8',
    name: 'Lucky8',
    licence: 'Curaçao',
    rating: 8.9,
    ratingLabel: 'Excellent',
    bonusAmount: '100 €',
    bonusSuffix: '+ 100 tours',
    bonusConditions: 'Wager 35× · sans code promo',
    bonusAmountNumber: 100,
    bonusSlug: '100_euros',
    rtp: 96.1,
    paymentMethods: ['VISA', 'MC', 'PAYS'],
    features: ['Tournois slots', 'Cashback hebdo', '1 800+ jeux'],
    pros: [
      'Tournois de machines à sous réguliers',
      'Cashback hebdomadaire 10%',
      'Bonus sans code promo',
    ],
    cons: [
      'Pas de support téléphonique',
      'Processus de vérification long',
      'Limite de retrait journalière',
    ],
    verdict:
      'Lucky8 se distingue par ses tournois et son cashback hebdomadaire, idéal pour les joueurs réguliers de slots.',
    tagline: 'Tournois de machines à sous et cashback hebdomadaire généreux.',
    affiliateUrl: goUrl('lucky8'),
  },
  {
    id: 'wild-sultan',
    slug: 'wild-sultan',
    name: 'Wild Sultan',
    licence: 'Curaçao',
    rating: 8.7,
    ratingLabel: 'Excellent',
    bonusAmount: '500 €',
    bonusSuffix: '+ 20 tours',
    bonusConditions: 'Wager 30× · dépôt min. 20 €',
    bonusAmountNumber: 500,
    bonusSlug: '500_euros',
    rtp: 96.0,
    paymentMethods: ['VISA', '₿', 'ETH'],
    features: ['Crypto instantané', 'Live premium', '1 500+ jeux'],
    pros: [
      'Retraits crypto instantanés',
      'Sélection de tables live premium',
      'Wager parmi les plus bas du marché',
    ],
    cons: [
      'Peu de méthodes de paiement classiques',
      'Interface en anglais principalement',
      'Support parfois lent',
    ],
    verdict:
      'Wild Sultan est le choix idéal pour les joueurs crypto qui veulent des retraits immédiats et une expérience live haut de gamme.',
    tagline: 'Le spécialiste des retraits crypto instantanés et du live game premium.',
    affiliateUrl: goUrl('wild-sultan'),
  },
  {
    id: 'madnix',
    slug: 'madnix',
    name: 'Madnix',
    licence: 'Curaçao',
    rating: 8.5,
    ratingLabel: 'Très bien',
    bonusAmount: '300 €',
    bonusSuffix: '+ 100 tours',
    bonusConditions: 'Wager 40× · dépôt min. 20 €',
    bonusAmountNumber: 300,
    bonusSlug: '300_euros',
    rtp: 95.8,
    paymentMethods: ['VISA', 'MC', '₿'],
    features: ['Design immersif', 'Missions quotidiennes', '3 000+ jeux'],
    pros: [
      'Plus de 3 000 jeux disponibles',
      'Programme de fidélité avec missions',
      'Design soigné et immersif',
    ],
    cons: [
      'Conditions de bonus élevées (40×)',
      'Support moins réactif la nuit',
      'Pas de Paysafecard',
    ],
    verdict:
      'Madnix offre la plus grande ludothèque de notre comparatif, idéale pour les joueurs qui veulent de la variété.',
    tagline: 'La plus grande ludothèque et des missions de fidélité qui récompensent vraiment.',
    affiliateUrl: goUrl('madnix'),
  },
  {
    id: 'magical-spin',
    slug: 'magical-spin',
    name: 'Magical Spin',
    licence: 'Curaçao',
    rating: 8.3,
    ratingLabel: 'Très bien',
    bonusAmount: '1 000 €',
    bonusSuffix: '+ 100 tours',
    bonusConditions: 'Wager 35× · 4 premiers dépôts',
    bonusAmountNumber: 1000,
    bonusSlug: '1000_euros',
    rtp: 95.6,
    paymentMethods: ['VISA', 'MC', 'PAYS'],
    features: ['Bonus 4 dépôts', 'VIP dédié FR', '2 000+ jeux'],
    pros: [
      'Le plus gros package de bienvenue (1 000 €)',
      'Gestionnaire VIP dédié',
      'Excellent service francophone',
    ],
    cons: ['Bonus réparti sur 4 dépôts', 'Interface moins moderne', 'Retraits en 48-72h'],
    verdict:
      'Magical Spin propose le package de bienvenue le plus généreux en valeur absolue, avec un accompagnement VIP de qualité.',
    tagline: 'Le plus gros bonus de bienvenue du marché et un suivi VIP personnalisé.',
    affiliateUrl: goUrl('magical-spin'),
  },
  {
    id: 'casinozer',
    slug: 'casinozer',
    name: 'Casinozer',
    licence: 'Curaçao',
    rating: 8.1,
    ratingLabel: 'Très bien',
    bonusAmount: '450 €',
    bonusSuffix: '+ 270 tours',
    bonusConditions: 'Wager 35× · 3 premiers dépôts',
    bonusAmountNumber: 450,
    bonusSlug: '450_euros',
    rtp: 95.4,
    paymentMethods: ['VISA', '₿', 'PAYS'],
    features: ['270 tours offerts', 'Cashback 10%', '2 500+ jeux'],
    pros: [
      'Nombre de tours gratuits exceptionnel (270)',
      'Cashback 10% sur les pertes',
      'Bonne sélection crypto',
    ],
    cons: [
      'Interface parfois surchargée',
      'Processus KYC strict',
      'Support disponible uniquement en chat',
    ],
    verdict:
      'Casinozer est le meilleur choix si vous recherchez un grand nombre de tours gratuits et un cashback hebdomadaire.',
    tagline: '270 tours gratuits et cashback hebdomadaire — le meilleur rapport tours/bonus.',
    affiliateUrl: goUrl('casinozer'),
  },
  {
    id: 'tortuga',
    slug: 'tortuga',
    name: 'Tortuga Casino',
    shortName: 'Tortuga',
    licence: 'Curaçao',
    rating: 7.9,
    ratingLabel: 'Bien',
    bonusAmount: '750 €',
    bonusSuffix: '+ 30 tours',
    bonusConditions: 'Wager 30× · dépôt min. 20 €',
    bonusAmountNumber: 750,
    bonusSlug: '750_euros',
    rtp: 95.2,
    paymentMethods: ['VISA', 'MC'],
    features: ['Wager bas (30×)', 'Thème aventure', '1 200+ jeux'],
    pros: [
      'Conditions de mise parmi les plus basses (30×)',
      'Bonus sur plusieurs dépôts',
      'Thème original et engageant',
    ],
    cons: [
      'Peu de méthodes de paiement',
      'Moins de jeux que la concurrence',
      'Support par e-mail uniquement',
    ],
    verdict:
      'Tortuga se distingue par ses conditions de wager basses, idéal pour les joueurs qui veulent réellement récupérer leurs bonus.',
    tagline: 'Le wager le plus bas du top 10 — les conditions les plus honnêtes du marché.',
    affiliateUrl: goUrl('tortuga'),
  },
  {
    id: 'banzai-slots',
    slug: 'banzai-slots',
    name: 'Banzai Slots',
    licence: 'Curaçao',
    rating: 7.7,
    ratingLabel: 'Bien',
    bonusAmount: '250 €',
    bonusSuffix: '+ 50 tours',
    bonusConditions: 'Wager 40× · dépôt min. 15 €',
    bonusAmountNumber: 250,
    bonusSlug: '250_euros',
    rtp: 95.0,
    paymentMethods: ['VISA', 'MC', 'SKRL'],
    features: ['Slots exclusifs', 'Tournois quotidiens', '1 600+ jeux'],
    pros: [
      'Tournois slots quotidiens avec cagnotte',
      'Slots exclusifs introuvables ailleurs',
      'Dépôt minimum faible (15 €)',
    ],
    cons: ['Wager élevé (40×)', 'Pas de crypto', 'Live casino limité'],
    verdict:
      'Banzai Slots est le paradis des fans de machines à sous avec ses tournois quotidiens et ses exclusivités.',
    tagline: 'Tournois slots quotidiens et jeux exclusifs pour les amateurs de machines à sous.',
    affiliateUrl: goUrl('banzai-slots'),
  },
  {
    id: 'stake',
    slug: 'stake',
    name: 'Stake Casino',
    shortName: 'Stake',
    licence: 'Curaçao 8048',
    rating: 7.5,
    ratingLabel: 'Bien',
    bonusAmount: '200 €',
    bonusSuffix: '',
    bonusConditions: 'Wager 40× · sur invitation VIP',
    bonusAmountNumber: 200,
    bonusSlug: '200_euros',
    rtp: 97.0,
    paymentMethods: ['₿', 'ETH', 'LTC', 'DOGE'],
    features: ['100% crypto', 'RTP 97%', 'Jeux maison'],
    pros: [
      'RTP exceptionnel grâce aux jeux maison (97%)+ ',
      '100% crypto, retrait immédiat',
      'Jeux originaux uniques',
    ],
    cons: [
      'Pas de méthodes de paiement classiques',
      'Bonus réservé aux VIP invités',
      'Interface technique, peu intuitive',
    ],
    verdict:
      'Stake est le meilleur casino crypto du marché avec des RTP imbattables sur ses jeux exclusifs.',
    tagline: 'Le leader mondial du casino crypto avec des RTP imbattables.',
    affiliateUrl: goUrl('stake'),
  },
  {
    id: 'bitcoin-penguin',
    slug: 'bitcoin-penguin',
    name: 'BitcoinPenguin',
    licence: 'Curaçao',
    rating: 7.3,
    ratingLabel: 'Bien',
    bonusAmount: '150 €',
    bonusSuffix: '+ 75 tours',
    bonusConditions: 'Wager 50× · BTC uniquement',
    bonusAmountNumber: 150,
    bonusSlug: '150_euros',
    rtp: 96.8,
    paymentMethods: ['₿', 'LTC', 'ETH', 'DOGE'],
    features: ['BTC & altcoins', 'Anonyme', '1 000+ jeux'],
    pros: ['Accepte de nombreuses cryptomonnaies', 'Jeu anonyme possible', 'RTP élevé (96.8%)'],
    cons: ['Wager très élevé (50×)', 'Pas de monnaies fiat', 'Support limité en FR'],
    verdict:
      "BitcoinPenguin est idéal pour les joueurs crypto qui privilégient l'anonymat et acceptent des conditions de bonus plus strictes.",
    tagline: "Anonymat crypto garanti et large sélection d'altcoins pour les puristes.",
    affiliateUrl: goUrl('bitcoin-penguin'),
  },
]

// Sorted by rating descending — default view for all pages
export const TOP_10 = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 10)
export const TOP_3 = TOP_10.slice(0, 3)

// Lookup by slug (O(1) via Map)
export const operatorBySlug = new Map(operators.map((op) => [op.slug, op]))
