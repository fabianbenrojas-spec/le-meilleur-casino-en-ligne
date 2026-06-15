// ── Types ─────────────────────────────────────────────────────────────────────

export type Mode = 'casino' | 'bonus'
export type CriteriaKey =
  | 'bonus'
  | 'payout'
  | 'games'
  | 'live'
  | 'crypto'
  | 'wager'
  | 'support'
  | 'lang'
  | 'mobile'
  | 'cashout'
export type WeightKey = CriteriaKey | 'note'

export interface OpCriteria {
  bonus: number
  payout: number
  games: number
  live: number
  crypto: number
  wager: number
  support: number
  lang: number
  mobile: number
  cashout: number
}

export interface Op {
  id: string
  nm: string
  score: string
  note: number
  bonus: string
  wagerTxt: string
  op: string
  b: string
  c: OpCriteria
  why: string
}

export interface QuestionOption {
  v: string
  t: string
  d: string
  ic: string
  circle?: boolean
  w: Partial<Record<WeightKey, number>>
}

export interface Question {
  key: string
  qn: string
  title: string
  opts: QuestionOption[]
}

export interface RankedOp {
  op: Op
  s: number
}

// ── OPS — 7 opérateurs × 10 critères (scores 0-100) ──────────────────────────
// Source : design_handoff_casino_revamp/assets/home2.js
// Les URLs d'affiliation passent par /go/[operator] (route de redirection).

export const OPS: Op[] = [
  {
    id: 'cresus',
    nm: 'Cresus Casino',
    score: '9.2',
    note: 9.2,
    bonus: '200 € + 100 tours',
    wagerTxt: 'Wager 35×',
    op: 'cresus',
    b: '200_euros',
    c: {
      bonus: 60,
      payout: 98,
      games: 95,
      live: 88,
      crypto: 68,
      wager: 70,
      support: 80,
      lang: 92,
      mobile: 76,
      cashout: 70,
    },
    why: 'Le meilleur équilibre global : retraits en moins de 24 h, 2 100+ jeux et un support FR solide.',
  },
  {
    id: 'lucky8',
    nm: 'Lucky8',
    score: '8.9',
    note: 8.9,
    bonus: '100 € + 100 tours',
    wagerTxt: 'Wager 35× · cashback',
    op: 'lucky8',
    b: '100_euros',
    c: {
      bonus: 50,
      payout: 80,
      games: 88,
      live: 78,
      crypto: 0,
      wager: 82,
      support: 98,
      lang: 95,
      mobile: 82,
      cashout: 74,
    },
    why: 'Le meilleur support et des tournois de slots avec cashback hebdomadaire pour les habitués.',
  },
  {
    id: 'wild_sultan',
    nm: 'Wild Sultan',
    score: '8.7',
    note: 8.7,
    bonus: '500 € + 20 tours',
    wagerTxt: 'Wager 30×',
    op: 'wild_sultan',
    b: '500_euros',
    c: {
      bonus: 86,
      payout: 92,
      games: 84,
      live: 98,
      crypto: 100,
      wager: 76,
      support: 78,
      lang: 78,
      mobile: 84,
      cashout: 88,
    },
    why: 'Retraits crypto quasi instantanés et le meilleur casino live premium signé Evolution.',
  },
  {
    id: 'madnix',
    nm: 'Madnix',
    score: '8.5',
    note: 8.5,
    bonus: '300 € + 100 tours',
    wagerTxt: 'Wager 35×',
    op: 'madnix',
    b: '300_euros',
    c: {
      bonus: 64,
      payout: 78,
      games: 82,
      live: 58,
      crypto: 96,
      wager: 90,
      support: 80,
      lang: 82,
      mobile: 99,
      cashout: 72,
    },
    why: 'Interface moderne, tours gratuits sans wager et dépôts crypto : une expérience très actuelle.',
  },
  {
    id: 'magical_spin',
    nm: 'Magical Spin',
    score: '8.3',
    note: 8.3,
    bonus: '1 000 € + 100 tours',
    wagerTxt: 'Wager 40×',
    op: 'magical_spin',
    b: '1000_euros',
    c: {
      bonus: 100,
      payout: 58,
      games: 80,
      live: 64,
      crypto: 0,
      wager: 52,
      support: 72,
      lang: 78,
      mobile: 78,
      cashout: 92,
    },
    why: 'Le plus gros bonus de notre sélection et des promotions quotidiennes pour les gros budgets.',
  },
  {
    id: 'casinozer',
    nm: 'Casinozer',
    score: '8.1',
    note: 8.1,
    bonus: '450 € + 270 tours',
    wagerTxt: 'Wager 40×',
    op: 'casinozer',
    b: '450_euros',
    c: {
      bonus: 82,
      payout: 70,
      games: 84,
      live: 70,
      crypto: 98,
      wager: 60,
      support: 74,
      lang: 80,
      mobile: 86,
      cashout: 82,
    },
    why: '270 tours gratuits, cashback et paiements crypto : une offre généreuse et complète.',
  },
  {
    id: 'casino888',
    nm: '888 Casino',
    score: '7.5',
    note: 7.5,
    bonus: '88 € sans dépôt',
    wagerTxt: 'Wager 20× · sans dépôt',
    op: '888_casino',
    b: '88_euros',
    c: {
      bonus: 34,
      payout: 74,
      games: 78,
      live: 58,
      crypto: 0,
      wager: 100,
      support: 86,
      lang: 90,
      mobile: 80,
      cashout: 62,
    },
    why: 'Un rare bonus sans dépôt et le wager le plus bas du marché : idéal pour débuter sans risque.',
  },
]

// ── QUESTIONS — 8 questions avec poids par réponse ────────────────────────────
// Source : design_handoff_casino_revamp/assets/home2.js (verbatim)

export const QUESTIONS: Question[] = [
  {
    key: 'priority',
    qn: 'Question 1 / 8',
    title: 'Votre priorité n°1 ?',
    opts: [
      {
        v: 'bonus',
        t: 'Un gros bonus',
        d: 'Le maximum de capital de départ',
        ic: 'M4 9h16M4 13h16M12 9v11',
        w: { bonus: 0.55 },
      },
      {
        v: 'payout',
        t: 'Être payé vite',
        d: 'Retraits rapides garantis',
        ic: 'M12 7v5l3 2',
        circle: true,
        w: { payout: 0.55 },
      },
      {
        v: 'simple',
        t: 'La simplicité',
        d: 'Conditions douces, support réactif',
        ic: 'M20 6L9 17l-5-5',
        w: { wager: 0.85 },
      },
    ],
  },
  {
    key: 'bonusPref',
    qn: 'Question 2 / 8',
    title: 'Côté bonus, vous préférez…',
    opts: [
      {
        v: 'big',
        t: 'Le plus généreux',
        d: 'Montant maximal',
        ic: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
        w: { bonus: 0.4 },
      },
      {
        v: 'soft',
        t: 'Le plus simple à libérer',
        d: 'Wager bas avant tout',
        ic: 'M20 6L9 17l-5-5',
        w: { wager: 0.65 },
      },
      { v: 'meh', t: 'Peu importe', d: "Ce n'est pas l'essentiel", ic: 'M5 12h14', w: {} },
    ],
  },
  {
    key: 'games',
    qn: 'Question 3 / 8',
    title: 'Vos jeux préférés ?',
    opts: [
      {
        v: 'slots',
        t: 'Machines à sous',
        d: 'Le plus large catalogue',
        ic: 'M3 4h18v16H3zM8 4v16M16 4v16',
        w: { games: 0.35 },
      },
      {
        v: 'live',
        t: 'Casino live',
        d: 'Tables avec croupiers réels',
        ic: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
        circle: true,
        w: { live: 0.45 },
      },
      {
        v: 'mix',
        t: 'Un peu de tout',
        d: 'Variété avant tout',
        ic: 'M4 7h16M4 12h16M4 17h16',
        w: { games: 0.2, live: 0.2 },
      },
    ],
  },
  {
    key: 'pay',
    qn: 'Question 4 / 8',
    title: 'Comment payez-vous ?',
    opts: [
      {
        v: 'card',
        t: 'Carte bancaire',
        d: 'Simple et universel',
        ic: 'M2 5h20v14H2zM2 10h20',
        w: { note: 0.35 },
      },
      {
        v: 'crypto',
        t: 'Crypto',
        d: 'BTC, ETH, USDT',
        ic: 'M9.5 9.5h4a2 2 0 0 1 0 4h-4zM9.5 9.5v8M9.5 13.5h4.5',
        circle: true,
        w: { crypto: 0.5 },
      },
      {
        v: 'ewallet',
        t: 'E-wallet',
        d: 'Skrill, Neteller, Paysafe',
        ic: 'M3 7h18v12H3zM16 13h2',
        w: { payout: 0.3 },
      },
    ],
  },
  {
    key: 'lang',
    qn: 'Question 5 / 8',
    title: 'La langue qui compte pour vous ?',
    opts: [
      {
        v: 'fr',
        t: 'Français impératif',
        d: 'Site et support 100 % FR',
        ic: 'M3 5h12M9 3v2M11 5c0 5-4 8-7 9M5 9c0 3 3 5 6 6M14 19l4-9 4 9M15.5 16h5',
        w: { lang: 0.45, support: 0.2 },
      },
      {
        v: 'multi',
        t: 'Plusieurs langues',
        d: 'Je joue aussi en EN / autres',
        ic: 'M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20',
        circle: true,
        w: { lang: 0.3 },
      },
      { v: 'any', t: 'Peu importe', d: "La langue n'est pas un critère", ic: 'M5 12h14', w: {} },
    ],
  },
  {
    key: 'mobile',
    qn: 'Question 6 / 8',
    title: 'Vous jouez surtout…',
    opts: [
      {
        v: 'mobile',
        t: 'Sur mobile',
        d: 'App / site mobile au top',
        ic: 'M7 2h10v20H7zM11 18h2',
        w: { mobile: 0.45 },
      },
      {
        v: 'desktop',
        t: 'Sur ordinateur',
        d: 'Grand écran avant tout',
        ic: 'M3 4h18v12H3zM8 20h8M12 16v4',
        w: { note: 0.3 },
      },
      {
        v: 'both',
        t: 'Les deux',
        d: 'Un peu partout',
        ic: 'M4 7h16M4 12h16M4 17h16',
        w: { mobile: 0.2, note: 0.15 },
      },
    ],
  },
  {
    key: 'cashout',
    qn: 'Question 7 / 8',
    title: 'Vos retraits seront plutôt…',
    opts: [
      {
        v: 'small',
        t: 'Petits & réguliers',
        d: 'Je retire souvent de petites sommes',
        ic: 'M12 7v5l3 2',
        circle: true,
        w: { payout: 0.3, wager: 0.15 },
      },
      {
        v: 'big',
        t: 'De gros montants',
        d: 'Plafond de retrait élevé requis',
        ic: 'M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4z',
        w: { cashout: 0.45 },
      },
      { v: 'any2', t: 'Peu importe', d: "Je n'ai pas de préférence", ic: 'M5 12h14', w: {} },
    ],
  },
  {
    key: 'profil',
    qn: 'Question 8 / 8',
    title: 'Votre profil de joueur ?',
    opts: [
      {
        v: 'debutant',
        t: 'Débutant',
        d: 'Je découvre les casinos',
        ic: 'M12 2l8 4v6c0 5-3.5 8.5-8 10',
        w: { support: 0.25, wager: 0.25 },
      },
      {
        v: 'casual',
        t: 'Joueur occasionnel',
        d: 'Je joue pour le plaisir',
        ic: 'M12 7v5l3 2',
        circle: true,
        w: { note: 0.4 },
      },
      {
        v: 'vip',
        t: 'Gros joueur / VIP',
        d: 'Budget confortable',
        ic: 'M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4z',
        w: { bonus: 0.3, games: 0.2 },
      },
    ],
  },
]

// ── Scoring — fonctions pures exportées pour les tests unitaires ──────────────

export function computeRanking(answers: Record<string, string>, mode: Mode): RankedOp[] {
  const ranked = OPS.map((op) => {
    let s = op.note * 1.25
    for (const q of QUESTIONS) {
      const a = answers[q.key]
      if (!a) continue
      const opt = q.opts.find((o) => o.v === a)
      if (!opt) continue
      for (const [k, weight] of Object.entries(opt.w) as [WeightKey, number][]) {
        const val = k === 'note' ? op.note * 10 : op.c[k as CriteriaKey]
        s += val * weight
      }
    }
    if (mode === 'bonus') s = s * 0.4 + op.c.bonus * 0.9
    return { op, s }
  })
  return ranked.sort((a, b) => b.s - a.s || b.op.note - a.op.note)
}

export function matchPct(ranked: RankedOp[], i: number): number {
  const top = ranked[0]!.s
  const bottom = ranked[ranked.length - 1]!.s
  const span = top - bottom || 1
  const v = 72 + ((ranked[i]!.s - bottom) / span) * 26
  return Math.round(Math.max(64, Math.min(98, v)))
}
