'use client'

import { useMemo, useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
import { FilterBottomSheet, FilterSidebar } from '@/components/ui/filter-sidebar'
import type { FilterGroup, ActiveFilters } from '@/components/ui/filter-sidebar'
import type { Jurisdiction, Operator } from '@/config/operators'

type SortKey = 'rating' | 'bonusAmountNumber' | 'rtp' | 'name'

// ── Filter group definitions ────────────────────────────────────────────────

const BONUS_GROUP_FR: FilterGroup = {
  key: 'bonus',
  label: 'Bonus de bienvenue',
  options: [
    { value: 'b0', label: 'Sans dépôt' },
    { value: 'b1', label: "Jusqu'à 300 €" },
    { value: 'b2', label: '300 – 750 €' },
    { value: 'b3', label: '750 – 1 500 €' },
    { value: 'b4', label: '1 500 €+' },
  ],
}
const BONUS_GROUP_EN: FilterGroup = {
  key: 'bonus',
  label: 'Welcome bonus',
  options: [
    { value: 'b0', label: 'No deposit' },
    { value: 'b1', label: 'Up to €300' },
    { value: 'b2', label: '€300 – €750' },
    { value: 'b3', label: '€750 – €1,500' },
    { value: 'b4', label: '€1,500+' },
  ],
}

const RTP_GROUP_FR: FilterGroup = {
  key: 'rtp',
  label: 'RTP minimum',
  type: 'range',
  rangeMin: 94,
  rangeMax: 97.5,
  rangeStep: 0.1,
  rangeSuffix: '%',
  options: [],
}
const RTP_GROUP_EN: FilterGroup = {
  key: 'rtp',
  label: 'Minimum RTP',
  type: 'range',
  rangeMin: 94,
  rangeMax: 97.5,
  rangeStep: 0.1,
  rangeSuffix: '%',
  options: [],
}

const PAYMENT_GROUP_FR: FilterGroup = {
  key: 'payment',
  label: 'Méthodes de paiement',
  options: [
    { value: 'card', label: 'Carte bancaire (CB/Visa/MC)' },
    { value: 'crypto', label: 'Bitcoin / Crypto' },
    { value: 'ewallet', label: 'Skrill / Neteller' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'paysafe', label: 'Paysafecard' },
  ],
}
const PAYMENT_GROUP_EN: FilterGroup = {
  key: 'payment',
  label: 'Payment methods',
  options: [
    { value: 'card', label: 'Bank card (CB/Visa/MC)' },
    { value: 'crypto', label: 'Bitcoin / Crypto' },
    { value: 'ewallet', label: 'Skrill / Neteller' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'paysafe', label: 'Paysafecard' },
  ],
}

const LICENCE_GROUP_FR: FilterGroup = {
  key: 'licence',
  label: 'Licence / Régulation',
  options: [
    { value: 'mga-eu', label: 'MGA (Malte)' },
    { value: 'offshore', label: 'Curaçao / Offshore' },
    { value: 'anj', label: 'ANJ (France)' },
  ],
}
const LICENCE_GROUP_EN: FilterGroup = {
  key: 'licence',
  label: 'Licence / Regulation',
  options: [
    { value: 'mga-eu', label: 'MGA (Malta)' },
    { value: 'offshore', label: 'Curaçao / Offshore' },
    { value: 'anj', label: 'ANJ (France)' },
  ],
}

const CRYPTO_TYPE_GROUP_FR: FilterGroup = {
  key: 'crypto_type',
  label: 'Cryptomonnaie',
  options: [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'usdt', label: 'Tether (USDT)' },
    { value: 'ltc', label: 'Litecoin (LTC)' },
    { value: 'sol', label: 'Solana (SOL)' },
  ],
}
const CRYPTO_TYPE_GROUP_EN: FilterGroup = {
  key: 'crypto_type',
  label: 'Cryptocurrency',
  options: [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'usdt', label: 'Tether (USDT)' },
    { value: 'ltc', label: 'Litecoin (LTC)' },
    { value: 'sol', label: 'Solana (SOL)' },
  ],
}

const LIVE_PROVIDER_GROUP_FR: FilterGroup = {
  key: 'live_provider',
  label: 'Fournisseur live',
  options: [
    { value: 'live_games', label: 'Casino live disponible' },
    { value: 'evolution', label: 'Evolution Gaming' },
    { value: 'pragmatic', label: 'Pragmatic Live' },
  ],
}
const LIVE_PROVIDER_GROUP_EN: FilterGroup = {
  key: 'live_provider',
  label: 'Live provider',
  options: [
    { value: 'live_games', label: 'Live casino available' },
    { value: 'evolution', label: 'Evolution Gaming' },
    { value: 'pragmatic', label: 'Pragmatic Live' },
  ],
}

const WAGER_GROUP_FR: FilterGroup = {
  key: 'wager',
  label: 'Wager maximum',
  options: [
    { value: 'w20', label: '≤ 20×' },
    { value: 'w30', label: '≤ 30×' },
    { value: 'w40', label: '≤ 40×' },
  ],
}
const WAGER_GROUP_EN: FilterGroup = {
  key: 'wager',
  label: 'Maximum wager',
  options: [
    { value: 'w20', label: '≤ 20×' },
    { value: 'w30', label: '≤ 30×' },
    { value: 'w40', label: '≤ 40×' },
  ],
}

const EWALLET_GROUP_FR: FilterGroup = {
  key: 'ewallet',
  label: 'Portefeuille électronique',
  options: [
    { value: 'paypal', label: 'PayPal' },
    { value: 'skrill', label: 'Skrill' },
    { value: 'neteller', label: 'Neteller' },
    { value: 'card', label: 'Carte bancaire' },
  ],
}
const EWALLET_GROUP_EN: FilterGroup = {
  key: 'ewallet',
  label: 'E-wallet',
  options: [
    { value: 'paypal', label: 'PayPal' },
    { value: 'skrill', label: 'Skrill' },
    { value: 'neteller', label: 'Neteller' },
    { value: 'card', label: 'Bank card' },
  ],
}

// ── Page configurations ─────────────────────────────────────────────────────

export type PageConfigKey =
  | 'all'
  | 'bitcoin'
  | 'nouveaux'
  | 'live'
  | 'fiables'
  | 'mobile'
  | 'esports'
  | 'avec_paypal'
  | 'bonus_sans_depot'
  | 'cashback'
  | 'meilleur_bonus'
  | 'retraits_rapides'
  | 'live_casino'
  | 'crypto'
  | 'alternatives'
  | 'sans_kyc'
  | 'retrait_instantane'
  | 'francais'
  | 'rtp_eleve'

interface PageConfig {
  defaultSort: SortKey
  filterGroups: FilterGroup[]
}

function getPageConfigs(isFr: boolean): Record<PageConfigKey, PageConfig> {
  const B = isFr ? BONUS_GROUP_FR : BONUS_GROUP_EN
  const R = isFr ? RTP_GROUP_FR : RTP_GROUP_EN
  const P = isFr ? PAYMENT_GROUP_FR : PAYMENT_GROUP_EN
  const L = isFr ? LICENCE_GROUP_FR : LICENCE_GROUP_EN
  const C = isFr ? CRYPTO_TYPE_GROUP_FR : CRYPTO_TYPE_GROUP_EN
  const V = isFr ? LIVE_PROVIDER_GROUP_FR : LIVE_PROVIDER_GROUP_EN
  const W = isFr ? WAGER_GROUP_FR : WAGER_GROUP_EN
  const E = isFr ? EWALLET_GROUP_FR : EWALLET_GROUP_EN
  return {
    all: { defaultSort: 'rating', filterGroups: [B, R, P, L] },
    bitcoin: { defaultSort: 'rating', filterGroups: [C, R, L] },
    nouveaux: { defaultSort: 'bonusAmountNumber', filterGroups: [B, R, P] },
    live: { defaultSort: 'rating', filterGroups: [V, P, B] },
    fiables: { defaultSort: 'rating', filterGroups: [L, R, B] },
    mobile: { defaultSort: 'rating', filterGroups: [P, B, R] },
    esports: { defaultSort: 'rating', filterGroups: [P, B, L] },
    avec_paypal: { defaultSort: 'rating', filterGroups: [E, B, L] },
    bonus_sans_depot: { defaultSort: 'bonusAmountNumber', filterGroups: [B, R, L] },
    cashback: { defaultSort: 'rating', filterGroups: [P, B, L] },
    meilleur_bonus: { defaultSort: 'bonusAmountNumber', filterGroups: [B, W, P] },
    retraits_rapides: { defaultSort: 'rating', filterGroups: [P, L, B] },
    live_casino: { defaultSort: 'rating', filterGroups: [V, P, L] },
    crypto: { defaultSort: 'rating', filterGroups: [C, R, L] },
    alternatives: { defaultSort: 'rating', filterGroups: [B, R, P, L] },
    sans_kyc: { defaultSort: 'rating', filterGroups: [C, R, L] },
    retrait_instantane: { defaultSort: 'rating', filterGroups: [P, C, L] },
    francais: { defaultSort: 'rating', filterGroups: [B, R, W] },
    rtp_eleve: { defaultSort: 'rtp', filterGroups: [R, P, L] },
  }
}

// ── Filter logic ────────────────────────────────────────────────────────────

const bonusRanges: Record<string, { min: number; max: number }> = {
  b0: { min: 0, max: 0 },
  b1: { min: 1, max: 299 },
  b2: { min: 300, max: 749 },
  b3: { min: 750, max: 1499 },
  b4: { min: 1500, max: Infinity },
}

const paymentMethodMap: Record<string, string[]> = {
  card: ['VISA', 'MC'],
  crypto: ['₿', 'ETH', 'LTC', 'DOGE', 'USDT', 'SOL'],
  ewallet: ['SKRL', 'NTLR'],
  paypal: ['PPAL'],
  paysafe: ['PAYS'],
}

const ewalletMap: Record<string, string[]> = {
  paypal: ['PPAL'],
  skrill: ['SKRL'],
  neteller: ['NTLR'],
  card: ['VISA', 'MC'],
}

const cryptoTypeMap: Record<string, string[]> = {
  btc: ['₿'],
  eth: ['ETH'],
  usdt: ['USDT'],
  ltc: ['LTC'],
  sol: ['SOL'],
}

const jurisdictionFilterMap: Record<string, Jurisdiction> = {
  'mga-eu': 'mga-eu',
  offshore: 'offshore',
  anj: 'anj',
}

const wagerMax: Record<string, number> = {
  w20: 20,
  w30: 30,
  w40: 40,
}

function applyFilters(ops: Operator[], active: ActiveFilters): Operator[] {
  let result = [...ops]

  const bonusFilters = active['bonus'] ?? []
  if (bonusFilters.length > 0) {
    result = result.filter((op) =>
      bonusFilters.some((k) => {
        const r = bonusRanges[k]
        return r && op.bonusAmountNumber >= r.min && op.bonusAmountNumber <= r.max
      })
    )
  }

  const rtpFilter = active['rtp']?.[0]
  if (rtpFilter) result = result.filter((op) => op.rtp >= parseFloat(rtpFilter))

  const pmFilters = active['payment'] ?? []
  if (pmFilters.length > 0) {
    result = result.filter((op) =>
      pmFilters.some((k) => (paymentMethodMap[k] ?? []).some((m) => op.paymentMethods.includes(m)))
    )
  }

  const eFilters = active['ewallet'] ?? []
  if (eFilters.length > 0) {
    result = result.filter((op) =>
      eFilters.some((k) => (ewalletMap[k] ?? []).some((m) => op.paymentMethods.includes(m)))
    )
  }

  const licFilters = active['licence'] ?? []
  if (licFilters.length > 0) {
    result = result.filter((op) =>
      licFilters.some((k) => {
        const j = jurisdictionFilterMap[k]
        return j !== undefined && op.jurisdiction === j
      })
    )
  }

  const cryptoFilters = active['crypto_type'] ?? []
  if (cryptoFilters.length > 0) {
    result = result.filter((op) =>
      cryptoFilters.some((k) => (cryptoTypeMap[k] ?? []).some((m) => op.paymentMethods.includes(m)))
    )
  }

  const liveFilters = active['live_provider'] ?? []
  if (liveFilters.length > 0) {
    result = result.filter((op) => {
      const featsLower = op.features.map((f) => f.toLowerCase()).join(' ')
      if (liveFilters.includes('evolution') && !featsLower.includes('evolution')) return false
      if (liveFilters.includes('pragmatic') && !featsLower.includes('pragmatic')) return false
      if (liveFilters.includes('live_games')) return op.features.some((f) => /live/i.test(f))
      return true
    })
  }

  const wagerFilters = active['wager'] ?? []
  if (wagerFilters.length > 0) {
    result = result.filter((op) => {
      const match = op.bonusConditions.match(/Wager (\d+)×/)
      const wager = match ? parseInt(match[1]!) : Infinity
      return wagerFilters.some((k) => wager <= (wagerMax[k] ?? Infinity))
    })
  }

  return result
}

// ── Component ───────────────────────────────────────────────────────────────

interface ListingPageClientProps {
  operators: Operator[]
  configKey: PageConfigKey
  pageType: string
  locale: string
}

const sortLabels_FR: Record<SortKey, string> = {
  rating: 'Note ↓',
  bonusAmountNumber: 'Bonus ↓',
  rtp: 'RTP ↓',
  name: 'Alphabétique',
}

const sortLabels_EN: Record<SortKey, string> = {
  rating: 'Rating ↓',
  bonusAmountNumber: 'Bonus ↓',
  rtp: 'RTP ↓',
  name: 'A–Z',
}

export function ListingPageClient({
  operators,
  configKey,
  pageType,
  locale,
}: ListingPageClientProps) {
  const isFr = locale === 'fr'
  const config = getPageConfigs(isFr)[configKey]
  const [active, setActive] = useState<ActiveFilters>({})
  const [sortKey, setSortKey] = useState<SortKey>(config.defaultSort)
  const sortLabels = isFr ? sortLabels_FR : sortLabels_EN

  const filtered = useMemo(() => {
    const result = applyFilters(operators, active)
    result.sort((a, b) => {
      if (sortKey === 'name')
        return a.name.localeCompare(b.name, locale === 'fr' ? 'fr-FR' : 'en-GB')
      if (sortKey === 'rating') return b.rating - a.rating
      if (sortKey === 'bonusAmountNumber') return b.bonusAmountNumber - a.bonusAmountNumber
      if (sortKey === 'rtp') return b.rtp - a.rtp
      return 0
    })
    return result
  }, [operators, active, sortKey, locale])

  const activeChipCount = Object.values(active).reduce((s, arr) => s + arr.length, 0)

  return (
    <div className="mx-auto max-w-site px-[18px] md:px-8">
      <div className="grid grid-cols-1 items-start gap-8 pb-12 pt-7 lg:grid-cols-[268px_1fr]">
        <FilterSidebar
          groups={config.filterGroups}
          active={active}
          onChange={setActive}
          locale={locale}
        />

        <div>
          {/* Mobile filter bar */}
          <div className="bg-bg/92 sticky top-[var(--header-h)] z-30 mb-1.5 flex gap-2.5 py-3 backdrop-blur-[10px] lg:hidden">
            <FilterBottomSheet
              groups={config.filterGroups}
              active={active}
              onChange={setActive}
              locale={locale}
            />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label={locale === 'en' ? 'Sort casinos' : 'Trier les casinos'}
              className="font-inherit min-h-[48px] flex-1 appearance-none rounded border border-line-2 bg-surface px-3 text-[13.5px] font-semibold text-ink"
              data-event="comparison_sort_use"
              data-page-type={pageType}
              data-locale={locale}
            >
              {(Object.entries(sortLabels) as [SortKey, string][]).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Results header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14.5px] text-ink-2">
              <strong className="text-ink">{filtered.length}</strong>{' '}
              {isFr
                ? `casino${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`
                : `casino${filtered.length > 1 ? 's' : ''} found`}
              {activeChipCount > 0 && (
                <span className="ml-1 text-ink-3">
                  {isFr
                    ? `(${activeChipCount} filtre${activeChipCount > 1 ? 's' : ''} actif${activeChipCount > 1 ? 's' : ''})`
                    : `(${activeChipCount} filter${activeChipCount > 1 ? 's' : ''} active)`}
                </span>
              )}
            </p>
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-[13px] text-ink-3">{isFr ? 'Trier :' : 'Sort:'}</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label={locale === 'en' ? 'Sort casinos' : 'Trier les casinos'}
                className="font-inherit rounded-lg border border-line-2 bg-surface px-3 py-[9px] text-[13.5px] font-semibold text-ink"
                data-event="comparison_sort_use"
                data-page-type={pageType}
                data-locale={locale}
              >
                {(Object.entries(sortLabels) as [SortKey, string][]).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-[14px]">
              {filtered.map((op, i) => (
                <ListingCard
                  key={op.id}
                  operator={op}
                  isTop={i === 0}
                  ctaBonus={isFr ? 'Obtenir le bonus' : 'Get bonus'}
                  ga4={{ 'data-page-type': pageType, 'data-locale': locale }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-line-2 bg-surface py-16 text-center">
              <p className="mb-4 font-serif text-[21px] font-semibold text-ink">
                {isFr ? 'Aucun casino trouvé' : 'No casinos found'}
              </p>
              <p className="mb-5 text-[14px] text-ink-3">
                {isFr ? "Essayez d'élargir vos filtres." : 'Try widening your filters.'}
              </p>
              <CTAButton variant="secondary" size="sm" onClick={() => setActive({})}>
                {isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
