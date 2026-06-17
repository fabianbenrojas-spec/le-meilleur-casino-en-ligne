'use client'

import { useState, useMemo, useRef } from 'react'
import Image from 'next/image'

import type { Game } from '@/config/games'
import { CTAButton } from '@/components/ui/cta-button'

interface GameGridProps {
  games: Game[]
  isFr: boolean
  locale: string
  providers: string[]
}

const VOL_SCORE: Record<string, number> = {
  'très haute': 5,
  haute: 4,
  moyenne: 3,
  basse: 2,
}

function VolDots({ vol }: { vol: Game['volatility'] }) {
  const score = VOL_SCORE[vol] ?? 3
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`Volatilité ${vol}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`inline-block h-[7px] w-[7px] rounded-full ${i <= score ? 'bg-green' : 'bg-line-2'}`}
          aria-hidden
        />
      ))}
    </span>
  )
}

export function GameGrid({ games, isFr, locale, providers }: GameGridProps) {
  const [activeProv, setActiveProv] = useState('all')
  const [sort, setSort] = useState('pop')
  const [search, setSearch] = useState('')
  const [rtpMin, setRtpMin] = useState(false)
  const [flashSlug, setFlashSlug] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let base = activeProv === 'all' ? games : games.filter((g) => g.provider === activeProv)
    if (rtpMin) base = base.filter((g) => g.rtp >= 96)
    if (search) {
      const q = search.toLowerCase()
      base = base.filter((g) => g.name.toLowerCase().includes(q))
    }
    return [...base].sort((a, b) => {
      if (sort === 'rtp') return b.rtp - a.rtp
      if (sort === 'az') return a.name.localeCompare(b.name)
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return b.rtp - a.rtp
    })
  }, [games, activeProv, sort, search, rtpMin])

  function handleRandom() {
    if (!filtered.length) return
    const pick = filtered[Math.floor(Math.random() * filtered.length)]!
    setFlashSlug(pick.slug)
    const el = gridRef.current?.querySelector(`[data-slug="${pick.slug}"]`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setTimeout(() => setFlashSlug(null), 1200)
  }

  const allLabel = isFr ? 'Tous' : 'All'
  const sortOptions = isFr
    ? [
        { value: 'pop', label: 'Populaires' },
        { value: 'rtp', label: 'RTP décroissant' },
        { value: 'az', label: 'A → Z' },
      ]
    : [
        { value: 'pop', label: 'Popular' },
        { value: 'rtp', label: 'RTP desc.' },
        { value: 'az', label: 'A → Z' },
      ]

  return (
    <>
      {/* ── v2 Toolbar: sticky, boxed ─────────────────────────────────────── */}
      <div
        className="sticky z-30 mb-6 rounded-lg border border-line bg-surface shadow-1"
        style={{ top: 'var(--header-h)' }}
      >
        {/* Row 1: search + sort + random */}
        <div className="flex items-center gap-3 border-b border-line p-[12px_15px]">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-[11px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink-3"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5l4 4" />
            </svg>
            <input
              type="search"
              placeholder={isFr ? 'Rechercher un jeu…' : 'Search a game…'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[8px] border border-line-2 bg-bg-sunken py-[8px] pl-[34px] pr-[10px] font-sans text-[13.5px] text-ink placeholder:text-ink-3 focus:border-green focus:outline-none"
              aria-label={isFr ? 'Rechercher un jeu' : 'Search a game'}
              data-event="game_search"
              data-page-type="jeux_categorie"
              data-locale={locale}
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label={isFr ? 'Trier les jeux' : 'Sort games'}
            className="cursor-pointer appearance-none rounded-[8px] border border-line-2 bg-surface py-[8px] pl-[11px] pr-7 font-sans text-[13px] font-semibold text-ink focus:outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371757E' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center',
            }}
            data-event="comparison_sort_use"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Random button */}
          <button
            type="button"
            onClick={handleRandom}
            className="hidden shrink-0 items-center gap-[7px] rounded-[8px] bg-green-50 px-[12px] py-[8px] font-sans text-[13px] font-semibold text-green transition-colors hover:bg-green hover:text-white sm:flex"
            aria-label={isFr ? 'Choisir un jeu au hasard' : 'Random game'}
            data-event="game_random_pick"
            data-filter="random"
            data-page-type="jeux_categorie"
            data-locale={locale}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[14px] w-[14px]"
              aria-hidden
            >
              <path d="M2 18h1.4c1.4 0 2.8-.6 3.8-1.6L13 10" />
              <path d="m14 9 3-3h4M21 6l-3-3M21 6l-3 3" />
              <path d="m10 14.4-1.2 1.2C7.8 16.6 6.4 17.2 5 17.2H2" />
              <path d="m18 15 3 3-3 3" />
              <path d="m18 12 3 3" />
            </svg>
            {isFr ? 'Aléatoire' : 'Random'}
          </button>
        </div>

        {/* Row 2: provider pills + RTP toggle + count */}
        <div className="flex items-center gap-2 overflow-x-auto p-[8px_15px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="flex gap-[6px]"
            role="group"
            aria-label={isFr ? 'Filtrer par fournisseur' : 'Filter by provider'}
          >
            <button
              onClick={() => setActiveProv('all')}
              className={`whitespace-nowrap rounded-full border px-[11px] py-[5px] font-mono text-[11.5px] font-semibold transition-colors ${
                activeProv === 'all'
                  ? 'border-green bg-green text-white'
                  : 'border-line bg-surface text-ink-2 hover:border-ink-3 hover:text-ink'
              }`}
              data-event="comparison_filter_use"
              data-filter="all"
            >
              {allLabel}
            </button>
            {providers.map((prov) => (
              <button
                key={prov}
                onClick={() => setActiveProv(prov)}
                className={`whitespace-nowrap rounded-full border px-[11px] py-[5px] font-mono text-[11.5px] font-semibold transition-colors ${
                  activeProv === prov
                    ? 'border-green bg-green text-white'
                    : 'border-line bg-surface text-ink-2 hover:border-ink-3 hover:text-ink'
                }`}
                data-event="comparison_filter_use"
                data-filter={prov}
              >
                {prov}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* RTP ≥ 96% toggle */}
          <label className="flex shrink-0 cursor-pointer items-center gap-[8px] whitespace-nowrap font-mono text-[11.5px] text-ink-2">
            <span className="relative inline-block h-[20px] w-[36px]">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={rtpMin}
                onChange={(e) => setRtpMin(e.target.checked)}
                data-event="comparison_filter_use"
                data-filter="rtp_min_96"
              />
              <span className="absolute inset-0 cursor-pointer rounded-full bg-line-2 transition-colors peer-checked:bg-green" />
              <span className="absolute left-[3px] top-[3px] h-[14px] w-[14px] rounded-full bg-white shadow-1 transition-transform peer-checked:translate-x-[16px]" />
            </span>
            RTP ≥ 96%
          </label>

          {/* Count */}
          <span
            className="shrink-0 font-mono text-[11.5px] text-ink-3"
            aria-live="polite"
            aria-atomic="true"
          >
            <strong className="text-ink">{filtered.length}</strong>
            {filtered.length !== games.length && (
              <span className="text-ink-3">/{games.length}</span>
            )}
            {isFr ? ' jeux' : ' games'}
          </span>
        </div>
      </div>

      {/* ── Game grid ────────────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="mt-2 grid gap-[18px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))' }}
      >
        {filtered.map((game) => (
          <article
            key={game.slug}
            data-slug={game.slug}
            className={`flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-3 ${
              flashSlug === game.slug ? 'jx-flash' : ''
            }`}
          >
            {/* Thumbnail — 1:1 aspect */}
            <div
              className="relative overflow-hidden border-b border-line"
              style={{
                aspectRatio: '1/1',
                ...(game.imageUrl
                  ? {}
                  : {
                      background:
                        'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 9px,var(--surface-2) 9px,var(--surface-2) 18px)',
                    }),
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {game.imageUrl && (
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                />
              )}
              <span className="absolute right-2 top-2 z-10 rounded-[5px] bg-green px-[7px] py-[3px] font-mono text-[10px] font-semibold text-white">
                RTP {game.rtp.toFixed(1)}%
              </span>
              <span className="relative z-10 grid h-[46px] w-[46px] scale-90 place-items-center rounded-full bg-white/90 opacity-0 shadow-2 transition-[opacity,transform] duration-[180ms] [article:hover_&]:scale-100 [article:hover_&]:opacity-100">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-[2px] h-5 w-5 text-green"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-2 left-2 z-10 rounded-[3px] border border-line bg-surface px-[6px] py-[2px] font-mono text-[9px] text-ink-3">
                {game.provider}
              </span>
            </div>

            {/* Game body */}
            <div className="flex flex-1 flex-col gap-2 p-[13px_15px_15px]">
              <div>
                <div className="text-[15px] font-bold leading-[1.2] text-ink">{game.name}</div>
                <div className="font-mono text-[11.5px] text-ink-3">{game.provider}</div>
              </div>
              <div className="mt-auto flex flex-wrap gap-[6px]">
                <span className="rounded-[5px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2">
                  Max <strong className="text-ink">{game.maxWin}</strong>
                </span>
                <span className="rounded-[5px] border border-line bg-bg-sunken px-[7px] py-[2px] text-[11px] text-ink-2">
                  Vol. <VolDots vol={game.volatility} />
                </span>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-[7px]">
                <CTAButton
                  href={`/jeux/${game.category}/avis/${game.slug}/`}
                  variant="secondary"
                  size="sm"
                  data-event="game_demo_click"
                  data-placement="category_game_tile"
                  data-page-type="jeux_categorie"
                  data-locale={locale}
                >
                  {isFr ? 'Démo' : 'Demo'}
                </CTAButton>
                <CTAButton
                  href={`/jeux/${game.category}/avis/${game.slug}/`}
                  variant="primary"
                  size="sm"
                  data-event="game_review_click"
                  data-placement="category_game_tile"
                  data-page-type="jeux_categorie"
                  data-locale={locale}
                >
                  {isFr ? 'Avis' : 'Review'}
                </CTAButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-[14px] py-16 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-10 w-10 text-ink-3"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5l4 4" />
          </svg>
          <p className="text-[15px] font-semibold text-ink">
            {isFr ? 'Aucun jeu trouvé' : 'No games found'}
          </p>
          <p className="text-[13px] text-ink-3">
            {isFr ? "Essayez d'élargir les filtres." : 'Try broadening your filters.'}
          </p>
        </div>
      )}
    </>
  )
}
