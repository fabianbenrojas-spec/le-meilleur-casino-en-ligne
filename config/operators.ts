// Operator seed data — source of truth for all pages.
// affiliateUrl goes through /go/[slug]/ which fires GA4 before redirecting.

/** Juridiction réglementaire de l'opérateur. */
export type Jurisdiction = 'offshore' | 'anj' | 'mga-eu'

/** Types de jeux proposés par l'opérateur — discriminant pour hubs et navigation. */
export type GameType = 'casino' | 'sport' | 'poker' | 'horse-racing' | 'esports'

export interface Operator {
  id: string
  slug: string
  name: string
  shortName?: string
  logoUrl?: string // Set when real PNG/SVG assets are available
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
  /**
   * Juridiction réglementaire de l'opérateur.
   * - 'offshore' : Curaçao, Anjouan, etc. (acceptant les FR sans licence FR)
   * - 'anj' : Licence française ANJ (Winamax, Betclic, etc.)
   * - 'mga-eu' : MGA Malte ou autre licence UE (Dublinbet, N1)
   */
  jurisdiction: Jurisdiction
  /** L'opérateur propose un bonus de bienvenue actif. */
  hasBonus: boolean
  /** L'opérateur a un programme d'affiliation avec commission. */
  isAffiliated: boolean
  /**
   * Variante du disclaimer légal affiché sur les pages de cet opérateur.
   * undefined utilise le fallback 'offshore-default'.
   */
  legalDisclaimerVariant?: 'offshore-default' | 'anj' | 'crypto' | 'esports'
  /**
   * Types de jeux proposés — obligatoire, discriminant pour hubs et navigation future.
   * Ex: ['casino'] pour un pur casino, ['casino', 'sport'] pour un opérateur multi-vertical.
   */
  gameTypes: GameType[]
}

// Real registration URLs per operator.
// Replace with affiliate tracking URLs once programmes are approved.
export const AFFILIATE_URLS: Record<string, string> = {
  cresus: 'https://cresuscasino-fr.net/fr/register',
  lucky8: 'https://lucky8fr.fr/fr-fr/register',
  'wild-sultan': 'https://www.wildsultan.com/fr/register',
  madnix: 'https://www.madnix.com/fr/register',
  'magical-spin': 'https://www.magicalspin.com/fr/register',
  casinozer: 'https://casinozer.com/fr/register',
  tortuga: 'https://www.tortuga.bet/fr/register',
  'banzai-slots': 'https://www.banzaislots.com/fr/register',
  stake: 'https://stake.com/fr/registration',
  'bitcoin-penguin': 'https://bitcoinpenguin.org/register',
  dublinbet: 'https://www.dublinbet.com/fr/register',
  vegadream: 'https://vegadream.com/fr/register',
  'horus-casino': 'https://www.horuscasino.com/fr/register',
  'n1-casino': 'https://www.n1casino.com/fr/welcome-page',
  'casino-extra': 'https://casinoextra-fr.fr/fr-fr/register',
}

const LOGO_URLS: Record<string, string> = {
  cresus: '/logos/cresus.png',
  lucky8: '/logos/lucky8.png',
  'wild-sultan': '/logos/wild-sultan.png',
  madnix: '/logos/madnix.png',
  'magical-spin': '/logos/magical-spin.png',
  casinozer: '/logos/casinozer.png',
  tortuga: '/logos/tortuga.png',
  'banzai-slots': '/logos/banzai-slots.svg',
  stake: '/logos/stake.png',
  'bitcoin-penguin': '/logos/bitcoin-penguin.png',
  dublinbet: '/logos/dublinbet.png',
  vegadream: '/logos/vegadream.png',
  'horus-casino': '/logos/horus-casino.png',
  'n1-casino': '/logos/n1-casino.png',
  'casino-extra': '/logos/casino-extra.png',
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
    logoUrl: LOGO_URLS['cresus'],
    affiliateUrl: goUrl('cresus'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['lucky8'],
    affiliateUrl: goUrl('lucky8'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['wild-sultan'],
    affiliateUrl: goUrl('wild-sultan'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['madnix'],
    affiliateUrl: goUrl('madnix'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['magical-spin'],
    affiliateUrl: goUrl('magical-spin'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['casinozer'],
    affiliateUrl: goUrl('casinozer'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['tortuga'],
    affiliateUrl: goUrl('tortuga'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['banzai-slots'],
    affiliateUrl: goUrl('banzai-slots'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['stake'],
    affiliateUrl: goUrl('stake'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    legalDisclaimerVariant: 'crypto',
    gameTypes: ['casino'],
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
    logoUrl: LOGO_URLS['bitcoin-penguin'],
    affiliateUrl: goUrl('bitcoin-penguin'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    legalDisclaimerVariant: 'crypto',
    gameTypes: ['casino'],
  },
  // ── Nouveaux opérateurs Phase 9 ─────────────────────────────────────────────
  {
    id: 'dublinbet',
    slug: 'dublinbet',
    name: 'Dublinbet',
    shortName: 'Dublinbet',
    licence: 'MGA (Malte)',
    rating: 7.1,
    ratingLabel: 'Bien',
    bonusAmount: '500 €',
    bonusSuffix: '+ 100 tours',
    bonusConditions: 'Wager 35× · dépôt min. 20 €',
    bonusAmountNumber: 500,
    bonusSlug: '500_euros',
    rtp: 96.5,
    paymentMethods: ['VISA', 'MC', 'SKRL', 'PAYS'],
    features: ['Licence MGA', 'Live specialist', '2 000+ jeux'],
    pros: [
      'Licence MGA — la plus protectrice du marché',
      'Spécialiste du live casino depuis 2010',
      'Retraits rapides et fiables',
    ],
    cons: [
      'Interface moins moderne que la concurrence',
      'Pas de crypto',
      'Catalogue de slots moins vaste',
    ],
    verdict:
      'Dublinbet est la référence live du marché, avec la licence MGA qui offre le niveau de protection le plus élevé pour les joueurs.',
    tagline: 'Licence MGA et live casino premium — le choix sécurité pour les joueurs exigeants.',
    logoUrl: LOGO_URLS['dublinbet'],
    affiliateUrl: goUrl('dublinbet'),
    jurisdiction: 'mga-eu',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
  },
  {
    id: 'vegadream',
    slug: 'vegadream',
    name: 'Vegadream',
    licence: 'Curaçao',
    rating: 6.9,
    ratingLabel: 'Bien',
    bonusAmount: '200 €',
    bonusSuffix: '+ 50 tours',
    bonusConditions: 'Wager 35× · dépôt min. 20 €',
    bonusAmountNumber: 200,
    bonusSlug: '200_euros',
    rtp: 95.9,
    paymentMethods: ['VISA', 'MC', '₿', 'PAYS'],
    features: ['Support FR 24h', 'Interface française', '1 800+ jeux'],
    pros: [
      'Support francophone 24h/24',
      'Interface entièrement en français',
      'Promotions hebdomadaires régulières',
    ],
    cons: [
      'Catalogue en dessous des leaders',
      'Retraits 48–72h par CB',
      'Plafond de retrait hebdomadaire faible',
    ],
    verdict:
      'Vegadream est le casino le mieux francisé de notre comparatif — interface, support et promotions pensés pour le marché FR.',
    tagline: 'Le casino le plus francophone du marché — support et interface 100 % FR.',
    logoUrl: LOGO_URLS['vegadream'],
    affiliateUrl: goUrl('vegadream'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
  },
  {
    id: 'horus-casino',
    slug: 'horus-casino',
    name: 'Horus Casino',
    shortName: 'Horus',
    licence: 'Curaçao',
    rating: 6.7,
    ratingLabel: 'Bien',
    bonusAmount: '300 €',
    bonusSuffix: '+ 50 tours',
    bonusConditions: 'Wager 40× · dépôt min. 20 €',
    bonusAmountNumber: 300,
    bonusSlug: '300_euros',
    rtp: 95.7,
    paymentMethods: ['VISA', '₿', 'ETH'],
    features: ['Thème égyptien', 'Jackpots progressifs', 'Crypto acceptée'],
    pros: [
      'Jackpots progressifs parmi les plus élevés du marché',
      'Crypto acceptée (BTC, ETH)',
      'Design immersif et cohérent',
    ],
    cons: [
      'Wager élevé (40×)',
      'Support français pas disponible 24h/24',
      'Peu de méthodes de paiement classiques',
    ],
    verdict:
      'Horus Casino attire les chasseurs de jackpots : sa sélection de jackpots progressifs est parmi les plus généreuses du marché.',
    tagline: 'Jackpots progressifs record et thème égyptien immersif pour les chasseurs de gains.',
    logoUrl: LOGO_URLS['horus-casino'],
    affiliateUrl: goUrl('horus-casino'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
  },
  {
    id: 'n1-casino',
    slug: 'n1-casino',
    name: 'N1 Casino',
    licence: 'MGA (Malte)',
    rating: 6.5,
    ratingLabel: 'Bien',
    bonusAmount: '200 €',
    bonusSuffix: '+ 200 tours',
    bonusConditions: 'Wager 40× · dépôt min. 20 €',
    bonusAmountNumber: 200,
    bonusSlug: '200_euros',
    rtp: 96.0,
    paymentMethods: ['VISA', 'MC', 'SKRL'],
    features: ['Licence MGA', '2 000+ jeux', 'Fondé 2017'],
    pros: [
      'Licence MGA (Malta) — confiance établie depuis 2017',
      '200 tours gratuits inclus dans le bonus',
      'Large sélection de jeux de table',
    ],
    cons: ['Interface vieillissante', 'Wager 40× — dans la fourchette haute', 'Pas de crypto'],
    verdict:
      "N1 Casino est une valeur sûre pour les joueurs qui privilégient la confiance : licence MGA et 8 ans d'activité sans incident notable.",
    tagline: "8 ans d'activité sous licence MGA — la confiance éprouvée dans le temps.",
    logoUrl: LOGO_URLS['n1-casino'],
    affiliateUrl: goUrl('n1-casino'),
    jurisdiction: 'mga-eu',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
  },
  {
    id: 'casino-extra',
    slug: 'casino-extra',
    name: 'Casino Extra',
    shortName: 'CasinoExtra',
    licence: 'Curaçao',
    rating: 6.3,
    ratingLabel: 'Bien',
    bonusAmount: '400 €',
    bonusSuffix: '',
    bonusConditions: 'Wager 30× · dépôt min. 20 €',
    bonusAmountNumber: 400,
    bonusSlug: '400_euros',
    rtp: 95.5,
    paymentMethods: ['VISA', 'MC', 'PAYS'],
    features: ['Fondé 2004', 'Extra Club', 'Wager 30×'],
    pros: [
      'Extra Club : programme de fidélité le plus mature de notre comparatif',
      'Wager 30× — parmi les plus bas',
      "20 ans d'expérience — fiabilité démontrée",
    ],
    cons: ['Design daté (interface 2010s)', 'Pas de crypto', 'Catalogue de jeux moins étoffé'],
    verdict:
      "Casino Extra mise sur l'expérience : 20 ans d'activité, un programme de fidélité bien rodé et les conditions de bonus les plus honnêtes de sa gamme de prix.",
    tagline: "20 ans d'expérience et le programme Extra Club le plus fidèle du marché.",
    logoUrl: LOGO_URLS['casino-extra'],
    affiliateUrl: goUrl('casino-extra'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
  },
]

// ── Sorted collections ───────────────────────────────────────────────────────

export const TOP_10 = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 10)
export const TOP_3 = TOP_10.slice(0, 3)

// Lookup by slug (O(1) via Map)
export const operatorBySlug = new Map(operators.map((op) => [op.slug, op]))

// ── Jurisdiction helpers ─────────────────────────────────────────────────────

export const operatorsByJurisdiction: Record<Jurisdiction, Operator[]> = {
  offshore: operators.filter((op) => op.jurisdiction === 'offshore'),
  anj: operators.filter((op) => op.jurisdiction === 'anj'),
  'mga-eu': operators.filter((op) => op.jurisdiction === 'mga-eu'),
}

export const ANJ_OPERATORS = operators.filter((op) => op.jurisdiction === 'anj')
export const OFFSHORE_OPERATORS = operators.filter((op) => op.jurisdiction === 'offshore')

export const isAnjOperator = (op: Operator): boolean => op.jurisdiction === 'anj'
export const hasAffiliateProgram = (op: Operator): boolean => op.isAffiliated

/** Human-readable licence label derived from jurisdiction — used in review templates. */
export function jurisdictionLicenceLabel(jurisdiction: Jurisdiction): string {
  if (jurisdiction === 'anj') return 'Licence ANJ (France)'
  if (jurisdiction === 'mga-eu') return 'Licence MGA (Malte)'
  return 'Licence Curaçao'
}
