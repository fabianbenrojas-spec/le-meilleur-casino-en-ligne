import { describe, expect, it } from 'vitest'

import { computeRanking } from '../components/homepage/casino-matchmaker.logic'

// Profiles verified manually against the scoring formula:
// score = op.note * 1.25 + Σ(critère × poids)
// bonus mode: score = score * 0.4 + op.c.bonus * 0.9

describe('CasinoMatchmaker — scoring', () => {
  it('profil équilibré → Cresus (payout 98 + note 9.2 dominent)', () => {
    const answers = {
      priority: 'payout',
      bonusPref: 'meh',
      games: 'mix',
      pay: 'card',
      lang: 'fr',
      mobile: 'desktop',
      cashout: 'small',
      profil: 'casual',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('cresus')
  })

  it('profil gros bonus → Magical Spin (bonus 100, seul à dépasser Cresus sur weight cumulé)', () => {
    const answers = {
      priority: 'bonus',
      bonusPref: 'big',
      games: 'slots',
      pay: 'card',
      lang: 'any',
      mobile: 'desktop',
      cashout: 'big',
      profil: 'vip',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('magical_spin')
  })

  it('profil crypto + live → Wild Sultan (crypto 100, live 98)', () => {
    const answers = {
      priority: 'payout',
      bonusPref: 'big',
      games: 'live',
      pay: 'crypto',
      lang: 'any',
      mobile: 'desktop',
      cashout: 'big',
      profil: 'vip',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('wild_sultan')
  })

  it('profil débutant / wager bas → 888 Casino (wager 100, seul)', () => {
    const answers = {
      priority: 'simple',
      bonusPref: 'soft',
      games: 'slots',
      pay: 'card',
      lang: 'fr',
      mobile: 'mobile',
      cashout: 'small',
      profil: 'debutant',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('casino888')
  })

  it('profil support + FR → Lucky8 (support 98, lang 95 — meilleurs du marché)', () => {
    const answers = {
      priority: 'simple',
      bonusPref: 'meh',
      games: 'slots',
      pay: 'card',
      lang: 'fr',
      mobile: 'both',
      cashout: 'any2',
      profil: 'debutant',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('lucky8')
  })

  it('profil mobile + crypto → Madnix (mobile 99, crypto 96)', () => {
    const answers = {
      priority: 'simple',
      bonusPref: 'meh',
      games: 'slots',
      pay: 'crypto',
      lang: 'any',
      mobile: 'mobile',
      cashout: 'any2',
      profil: 'casual',
    }
    const [first] = computeRanking(answers, 'casino')
    expect(first!.op.id).toBe('madnix')
  })

  it('mode bonus repondère sur critère bonus → Magical Spin (bonus 100)', () => {
    const answers = {
      priority: 'bonus',
      bonusPref: 'big',
      games: 'slots',
      pay: 'card',
      lang: 'any',
      mobile: 'desktop',
      cashout: 'any2',
      profil: 'casual',
    }
    const [first] = computeRanking(answers, 'bonus')
    expect(first!.op.id).toBe('magical_spin')
  })

  it('les 7 opérateurs ont tous un score différent (pas de tie)', () => {
    const answers = {
      priority: 'payout',
      bonusPref: 'big',
      games: 'live',
      pay: 'crypto',
      lang: 'fr',
      mobile: 'both',
      cashout: 'big',
      profil: 'vip',
    }
    const ranked = computeRanking(answers, 'casino')
    const scores = ranked.map((r) => r.s)
    const unique = new Set(scores)
    expect(unique.size).toBe(ranked.length)
  })
})
