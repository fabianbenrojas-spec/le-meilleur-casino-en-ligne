// Operator seed data — source of truth for all pages.
// affiliateUrl goes through /go/[slug]/ which fires GA4 before redirecting.

/** Juridiction réglementaire de l'opérateur. */
export type Jurisdiction = 'offshore' | 'anj' | 'mga-eu'

/** Types de jeux proposés par l'opérateur — discriminant pour hubs et navigation. */
export type GameType = 'casino' | 'sport' | 'poker' | 'horse-racing' | 'esports'

/** KYC policy — quand la vérification d'identité est requise. */
export type KycPolicy = 'none' | 'light' | 'standard' | 'strict'

/** Vitesse indicative du retrait le plus rapide disponible. */
export type WithdrawalSpeed = 'instant' | 'fast' | 'standard' | 'slow'

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
  /** KYC policy — quand la vérification d'identité est requise. */
  kycPolicy: KycPolicy
  /** Vitesse indicative du retrait le plus rapide disponible. */
  withdrawalSpeed: WithdrawalSpeed
  /** Interface ET support client disponibles en français. */
  supportsFrench: boolean
  /** Année de lancement sur le marché français (si connue). */
  launchYearFrance?: number
  /** Numéro de licence officielle (ex: ANJ FR-ANJ-2016-0017). */
  licenceNumber?: string
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
  // TODO: remplacer par URL d'affiliation officielle Winamax une fois programme approuvé
  winamax: 'https://www.winamax.fr/inscription',
  // TODO: remplacer par URL d'affiliation officielle Betclic une fois programme approuvé
  betclic: 'https://www.betclic.fr/inscription',
  // TODO: remplacer par URL d'affiliation officielle Unibet une fois programme approuvé
  unibet: 'https://www.unibet.fr/inscription',
  // TODO: remplacer par URL d'affiliation officielle PMU une fois programme approuvé
  pmu: 'https://www.pmu.fr/inscription',
  // TODO: remplacer par URL d'affiliation officielle PokerStars une fois programme approuvé
  pokerstars: 'https://www.pokerstars.fr/inscription',
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'fast',
    supportsFrench: true,
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
    features: ['Tournois slots', 'Cashback hebdo', 'Support FR', '1 800+ jeux'],
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: true,
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
    kycPolicy: 'light',
    withdrawalSpeed: 'instant',
    supportsFrench: false,
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
    features: ['Design immersif', 'Missions quotidiennes', '3 047 jeux'],
    pros: [
      '3 047 jeux disponibles',
      'Programme de fidélité avec missions',
      'Design soigné et immersif',
    ],
    cons: [
      'Conditions de bonus élevées (40×)',
      'Support moins réactif la nuit',
      'Pas de Paysafecard',
    ],
    verdict:
      'Madnix catalogue 3 047 jeux précisément sourcés (juin 2026), idéal pour les joueurs qui veulent de la variété et des missions quotidiennes de fidélité.',
    tagline: 'Un catalogue de 3 047 jeux et des missions de fidélité qui récompensent vraiment.',
    logoUrl: LOGO_URLS['madnix'],
    affiliateUrl: goUrl('madnix'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    gameTypes: ['casino'],
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: true,
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: true,
  },
  // ── Casinozer (enrichi juin 2026) ───────────────────────────────────────────
  {
    id: 'casinozer',
    slug: 'casinozer',
    name: 'Casinozer',
    shortName: 'Casinozer',
    licence: 'Curaçao',
    rating: 8.3,
    ratingLabel: 'Très bien',
    bonusAmount: '100 FS',
    bonusSuffix: 'sans wager',
    bonusConditions: 'Aucune condition de mise — gains retirables immédiatement',
    bonusAmountNumber: 100,
    bonusSlug: '100_fs_sans_wager',
    rtp: 96.33,
    paymentMethods: ['VISA', 'MC', 'SKRL', 'NTLR', 'PAYS', '₿', 'ETH', 'USDT'],
    features: [
      '100 FS sans wager',
      'Crypto natif BTC/ETH/USDT',
      'VIP Cyber-City 6 niveaux 15%',
      'Live chat 24h/24, 7j/7 FR',
    ],
    pros: [
      '100 FS sans wager — gains retirables immédiatement, seule offre du repo sans condition de mise',
      'Crypto natif : BTC, ETH, LTC, DOGE, USDT TRC-20 — retrait sous 24h après KYC',
      'Live chat 24h/24, 7j/7 en français',
      'Catalogue 5 000+ jeux via 66+ fournisseurs — slots, live (340 tables), sport, e-sport',
      "VIP Cyber-City 6 niveaux — cashback jusqu'à 15 % versé en argent réel",
    ],
    cons: [
      "Pas d'application native — PWA uniquement (pas sur App Store ni Google Play)",
      'KYC obligatoire > 2 000 € de retrait — délai 24 à 48h pour la première vérification',
      'Avis Trustpilot mitigés sur la rapidité des retraits fiat pour les montants importants',
      'Hors licence ANJ — cadre réglementaire Curaçao moins protecteur',
    ],
    verdict:
      "Casinozer est un casino crypto-first sous licence Curaçao avec 100 FS sans wager (gains retirables immédiatement), 5 000+ jeux et un programme VIP Cyber-City 6 niveaux jusqu'à 15 % de cashback.",
    tagline: "Casino crypto-first — 100 FS sans wager, VIP Cyber-City jusqu'à 15 % cashback.",
    logoUrl: LOGO_URLS['casinozer'],
    affiliateUrl: goUrl('casinozer'),
    jurisdiction: 'offshore',
    hasBonus: true,
    isAffiliated: true,
    legalDisclaimerVariant: 'offshore-default',
    gameTypes: ['casino', 'sport', 'esports'],
    kycPolicy: 'strict',
    withdrawalSpeed: 'fast',
    supportsFrench: true,
    launchYearFrance: 2021,
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: false,
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: false,
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
    kycPolicy: 'none',
    withdrawalSpeed: 'instant',
    supportsFrench: false,
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
    kycPolicy: 'none',
    withdrawalSpeed: 'instant',
    supportsFrench: false,
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
    kycPolicy: 'strict',
    withdrawalSpeed: 'fast',
    supportsFrench: false,
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'slow',
    supportsFrench: true,
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
    kycPolicy: 'light',
    withdrawalSpeed: 'standard',
    supportsFrench: true,
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
    kycPolicy: 'strict',
    withdrawalSpeed: 'standard',
    supportsFrench: false,
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
    kycPolicy: 'standard',
    withdrawalSpeed: 'standard',
    supportsFrench: false,
  },
  // ── 16. Winamax (premier opérateur ANJ) ────────────────────────────────────
  {
    id: 'winamax',
    slug: 'winamax',
    name: 'Winamax',
    shortName: 'Winamax',
    // logoUrl: à compléter en phase logos
    licence: 'ANJ — Licence française',
    // licenceNumber: TODO vérifier numéro exact sur registre ANJ
    rating: 9.0, // ⚠️ placeholder éditorial — à valider en Commit 4
    ratingLabel: 'Excellent',
    // Convention §14 : valeurs placeholder pour hasBonus: false
    bonusAmount: '—',
    bonusSuffix: '',
    bonusConditions: '',
    bonusAmountNumber: 0,
    bonusSlug: 'no-bonus',
    rtp: 0, // placeholder — RTP non central pour poker, à préciser en Commit 4
    paymentMethods: ['VISA', 'MC', 'PPAL'], // ⚠️ à vérifier en Commit 4
    features: ['App native iOS/Android', 'Poker + sport + hippique', 'Licence ANJ'],
    pros: [
      'Notoriété maximale sur le marché français',
      'Application native fluide et complète',
      'Écosystème complet : poker, paris sportifs, hippique',
    ],
    cons: [
      'Pas de jeux de casino — slots, roulette, blackjack (interdit ANJ)',
      'Pas de crypto (cadre réglementaire ANJ)',
    ],
    verdict:
      'Winamax est la référence mainstream du marché français pour le poker et les paris sportifs.',
    tagline: 'Le n°1 français du poker et des paris sportifs — licence ANJ.',
    affiliateUrl: goUrl('winamax'),
    jurisdiction: 'anj',
    hasBonus: false,
    isAffiliated: true,
    legalDisclaimerVariant: 'anj',
    gameTypes: ['poker', 'sport', 'horse-racing'],
    kycPolicy: 'strict',
    withdrawalSpeed: 'fast', // ⚠️ à vérifier précisément en Commit 4
    supportsFrench: true,
    launchYearFrance: 2010,
  },

  // ── 17. Betclic (ANJ — enrichi juin 2026) ───────────────────────────────────
  {
    id: 'betclic',
    slug: 'betclic',
    name: 'Betclic',
    shortName: 'Betclic',
    // logoUrl: à compléter en phase logos
    licence: 'ANJ — Licence française',
    // licenceNumber: TODO valider sur registre ANJ (betclic.fr/legal)
    rating: 8.2, // MediaPronos juin 2026
    ratingLabel: 'Bien',
    // Convention §14 : valeurs placeholder pour hasBonus: false
    bonusAmount: '—',
    bonusSuffix: '',
    bonusConditions: '',
    bonusAmountNumber: 0,
    bonusSlug: 'no-bonus',
    rtp: 0, // non central pour sport/poker/hippique
    paymentMethods: ['VISA', 'MC', 'PPAL', 'VIRT'], // VIRT = virement SEPA Instant
    features: ['App native 4,7/5 iOS', 'SEPA Instant < 15 min', 'Live chat 7j/7', 'Licence ANJ'],
    pros: [
      'Retraits SEPA Instant testés en moins de 15 minutes (MediaPronos)',
      'App native notée 4,7/5 sur iOS et 4,5/5 sur Google Play',
      'Live chat disponible 7 jours sur 7',
      'Partenaire officiel Équipe de France, Top 14 et Betclic Elite',
    ],
    cons: [
      'Pas de jeux de casino ni de live casino (licence ANJ)',
      'Pas de support téléphonique',
      'Pas de crypto',
    ],
    verdict:
      'Betclic est la référence française du pari sportif réglementé. Noté 8,2/10 par MediaPronos, il se distingue par une app mobile primée (4,7/5 iOS), des retraits SEPA Instant testés en moins de 15 minutes et un live chat 7j/7. Opère sous licence ANJ depuis 2010 au sein du groupe Flutter Entertainment.',
    tagline: 'Le pari sportif français — app 4,7/5, retraits < 15 min.',
    affiliateUrl: goUrl('betclic'),
    jurisdiction: 'anj',
    hasBonus: false,
    isAffiliated: true,
    legalDisclaimerVariant: 'anj',
    gameTypes: ['sport', 'poker', 'horse-racing'],
    kycPolicy: 'strict',
    withdrawalSpeed: 'fast', // SEPA Instant testé < 15 min (MediaPronos mai 2026)
    supportsFrench: true,
    launchYearFrance: 2010,
  },

  // ── 18. Unibet (ANJ — enrichi juin 2026) ───────────────────────────────────
  {
    id: 'unibet',
    slug: 'unibet',
    name: 'Unibet',
    shortName: 'Unibet',
    // logoUrl: à compléter en phase logos
    licence: 'ANJ — Licence française',
    // licenceNumber: TODO valider sur registre ANJ
    rating: 8.5,
    ratingLabel: 'Très bien',
    // Convention §14 : valeurs placeholder pour hasBonus: false
    bonusAmount: '—',
    bonusSuffix: '',
    bonusConditions: '',
    bonusAmountNumber: 0,
    bonusSlug: 'no-bonus',
    rtp: 0, // non central pour sport/poker/hippique
    paymentMethods: ['VISA', 'MC', 'PPAL', 'VIRT', 'SKRL'],
    features: [
      'Triple agrément ANJ',
      'Adossement FDJ United depuis 2024',
      'Skrill accepté en retrait',
      'App native 4,6/5 iOS',
    ],
    pros: [
      'Adossé au groupe FDJ United depuis octobre 2024 (État français co-actionnaire)',
      "Jusqu'à 450 € cumulables sur 3 verticales (sport, poker, hippique)",
      'Skrill accepté en retrait — rare parmi les opérateurs ANJ',
      "Live chat testé à moins d'une minute de réponse (Eurosport)",
      'Support téléphonique disponible',
    ],
    cons: [
      'Bonus crédités en freebets (pas en argent réel)',
      'Live chat limité de 8h à minuit, pas de couverture nocturne',
      'Pas de jeux de casino ni de live casino (licence ANJ)',
      'Pas de crypto',
    ],
    verdict:
      "Unibet est un opérateur ANJ adossé au groupe FDJ United depuis octobre 2024 (État français co-actionnaire). La fusion avec Parions Sport en Ligne (24 mars 2026) et l'intégration de Zeturf (juillet 2025) consolident une offre 3 verticales — sport, poker et hippique — depuis un compte unique. L'app est notée 4,6/5 sur 90 000 avis iOS. Le live chat répond en moins d'une minute (Eurosport). Skrill disponible en retrait. Limite : bonus en freebets, pas en argent réel.",
    tagline: 'Triple agrément ANJ adossé à FDJ — sport, poker et turf unifiés.',
    affiliateUrl: goUrl('unibet'),
    jurisdiction: 'anj',
    hasBonus: false,
    isAffiliated: true,
    legalDisclaimerVariant: 'anj',
    gameTypes: ['sport', 'poker', 'horse-racing'],
    kycPolicy: 'strict',
    withdrawalSpeed: 'fast', // retrait instantané annoncé mars 2024 — non testé indépendamment
    supportsFrench: true,
    launchYearFrance: 2010,
  },

  // ── 19. PMU (ANJ — enrichi juin 2026) ───────────────────────────────────────
  {
    id: 'pmu',
    slug: 'pmu',
    name: 'PMU',
    shortName: 'PMU',
    // logoUrl: à compléter en phase logos
    licence: 'ANJ — 3 licences (hippique, sport, poker)',
    licenceNumber: '0002-PH-2015-06-07', // licence hippique principale — numéro poker à préciser
    rating: 8.3,
    ratingLabel: 'Très bien',
    // Convention §14 : valeurs placeholder pour hasBonus: false
    bonusAmount: '—',
    bonusSuffix: '',
    bonusConditions: '',
    bonusAmountNumber: 0,
    bonusSlug: 'no-bonus',
    rtp: 0, // non central pour hippique/sport/poker
    paymentMethods: ['VISA', 'MC', 'PPAL', 'SKRL', 'NTLR', 'PAYS'],
    features: [
      'Quinté+ et 4 formats exclusifs hippiques',
      'GIE depuis 1930 — mission hippique',
      'Bonus sport 100 € cash sans wager',
      'Seuil retrait 1 € — 0 € de frais',
    ],
    pros: [
      '5 formats hippiques exclusifs : Quinté+, Jackpot, Champ Libre, Super 4, Pick 5 — avec streaming Equidia intégré',
      'GIE fondé en 1930, adossé à la filière hippique française (France Galop, Le Trot)',
      'Bonus sport 100 € versé en argent réel sans wager, retirable immédiatement',
      'Seuil de retrait à 1 € — le plus bas du marché, 0 € de frais',
      'Sourdline : service téléphonique dédié aux parieurs malentendants, rare en ANJ FR',
      'Support téléphonique disponible (01 58 73 13 00, appel non surtaxé)',
    ],
    cons: [
      "3 applications séparées (Hippique, Sport, Poker) — pas d'app unifiée",
      'Retrait par virement bancaire uniquement — délai 3 à 5 jours ouvrés',
      'Cotes sport parfois moins compétitives que les pure players sport',
      'Pas de programme de fidélité dédié aux parieurs sport',
      'Pas de jeux de casino ni de live casino (licence ANJ)',
      'Pas de crypto',
    ],
    verdict:
      "PMU est le GIE de la filière hippique française, fondé en 1930. Il opère sous 3 licences ANJ distinctes (hippique, sport, poker) depuis 2010. Sa force majeure est l'hippique, avec 5 formats exclusifs (Quinté+, Jackpot, Champ Libre, Super 4, Pick 5) et le streaming Equidia intégré. Le bonus sport de 100 € est versé en argent réel sans wager, retirable dès 1 € — seuil le plus bas du marché. Support Sourdline pour parieurs malentendants, rare en ANJ FR. À noter : 3 apps séparées et retraits limités au virement bancaire (3-5 jours).",
    tagline: 'Le n°1 français du turf depuis 1930 — Quinté+, sport et poker.',
    affiliateUrl: goUrl('pmu'),
    jurisdiction: 'anj',
    hasBonus: false,
    isAffiliated: true,
    legalDisclaimerVariant: 'anj',
    gameTypes: ['horse-racing', 'sport', 'poker'], // hippique D'ABORD — ADN de l'opérateur
    kycPolicy: 'strict',
    withdrawalSpeed: 'standard', // virement bancaire 3-5 jours ouvrés
    supportsFrench: true,
    launchYearFrance: 2010,
  },

  // ── 20. PokerStars (ANJ — enrichi juin 2026) ─────────────────────────────────
  {
    id: 'pokerstars',
    slug: 'pokerstars',
    name: 'PokerStars',
    shortName: 'PokerStars',
    // logoUrl: à compléter en phase logos
    licence: 'ANJ — 2 licences (poker + sport)',
    licenceNumber: '0006-PS-2016-06-07', // licence sport sourcée — numéro licence poker ANJ à préciser
    rating: 8.4,
    ratingLabel: 'Très bien',
    // Convention §14 : valeurs placeholder pour hasBonus: false
    bonusAmount: '—',
    bonusSuffix: '',
    bonusConditions: '',
    bonusAmountNumber: 0,
    bonusSlug: 'no-bonus',
    rtp: 0, // non central pour poker/sport
    paymentMethods: ['VISA', 'MC', 'PPAL', 'APAY', 'SKRL', 'NTLR'],
    features: [
      'Liquidité partagée ESPT (FR+ES+PT)',
      'WCOOP/SCOOP tournois mondiaux',
      'Stars Rewards 40%',
      'Live chat 24h/24, 7j/7',
    ],
    pros: [
      'Liquidité partagée ESPT (France, Espagne, Portugal) — tables actives 24h/24, prizepools plus élevés',
      "Tournois mondiaux propriétaires WCOOP, SCOOP, SECOOP + Power Path → tickets EPT jusqu'à 9 300 €",
      "Stars Rewards : jusqu'à 40 % de cashback sur le rake pour les joueurs réguliers",
      'Live chat disponible 24h/24, 7j/7',
      "Spin & Bet sport : multiplicateur aléatoire jusqu'à x10 — format propriétaire en France",
    ],
    cons: [
      "2 applications séparées (poker et sport) — pas d'app unifiée",
      'App PokerStars Sports notée 4,2/5 iOS et 3,7/5 Android — qualité UX médiocre',
      "Code d'activation par courrier postal requis à l'inscription (délai à anticiper)",
      'Bonus sport versé en freebets (pas en argent réel)',
      'Pas de jeux de casino ni de live casino (licence ANJ)',
      'Pas de crypto',
    ],
    verdict:
      "PokerStars est la référence mondiale du poker en ligne, présente en France sous licence ANJ depuis 2010. La liquidité partagée ESPT (France, Espagne, Portugal) garantit des tables actives 24h/24. Les tournois WCOOP et SCOOP sont propriétaires. Stars Rewards redistribue jusqu'à 40 % de cashback sur le rake. PokerStars Sports (ex-BetStars, ANJ depuis 2016) ajoute la verticale sport avec le Spin & Bet x10. À noter : 2 apps séparées et app sport notée 4,2/5 iOS.",
    tagline: 'La référence mondiale du poker en ligne, branche sport en complément.',
    affiliateUrl: goUrl('pokerstars'),
    jurisdiction: 'anj',
    hasBonus: false,
    isAffiliated: true,
    legalDisclaimerVariant: 'anj',
    gameTypes: ['poker', 'sport'], // poker D'ABORD — sport en complément (ex-BetStars ANJ 2016)
    kycPolicy: 'strict',
    withdrawalSpeed: 'standard',
    supportsFrench: true,
    launchYearFrance: 2010,
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

// ── Hub selection helpers ────────────────────────────────────────────────────

export const operatorsWithoutKyc = operators.filter(
  (op) => op.kycPolicy === 'none' || op.kycPolicy === 'light'
)
export const operatorsWithInstantWithdrawal = operators.filter(
  (op) => op.withdrawalSpeed === 'instant' || op.withdrawalSpeed === 'fast'
)
export const operatorsWithFrenchSupport = operators.filter((op) => op.supportsFrench === true)
export const operatorsWithHighRtp = operators.filter((op) => op.rtp >= 96)
