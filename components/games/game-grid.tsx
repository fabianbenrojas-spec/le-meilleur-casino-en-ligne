'use client'

import { useState, useMemo } from 'react'
import type { Game } from '@/config/games'

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
          className={`inline-block h-[7px] w-[7px] rounded-full ${
            i <= score ? 'bg-green' : 'bg-line-2'
          }`}
          aria-hidden
        />
      ))}
    </span>
  )
}

export function GameGrid({ games, isFr, providers }: GameGridProps) {
  const [activeProv, setActiveProv] = useState('all')
  const [sort, setSort] = useState('pop')

  const filtered = useMemo(() => {
    const base = activeProv === 'all' ? games : games.filter((g) => g.provider === activeProv)
    return [...base].sort((a, b) => {
      if (sort === 'rtp') return b.rtp - a.rtp
      if (sort === 'az') return a.name.localeCompare(b.name)
      // pop: popular first, then by rtp
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return b.rtp - a.rtp
    })
  }, [games, activeProv, sort])

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
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={isFr ? 'Filtrer par fournisseur' : 'Filter by provider'}
        >
          <button
            onClick={() => setActiveProv('all')}
            className={`rounded-full border px-[13px] py-[7px] font-mono text-[12px] font-semibold transition-colors ${
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
              className={`rounded-full border px-[13px] py-[7px] font-mono text-[12px] font-semibold transition-colors ${
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={isFr ? 'Trier les jeux' : 'Sort games'}
          className="cursor-pointer appearance-none rounded-lg border border-line-2 bg-surface px-[13px] py-[9px] pr-8 font-mono text-[13.5px] font-semibold text-ink"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371757E' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 11px center',
          }}
          data-event="comparison_sort_use"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Game grid — 5 columns on XL, 4 on LG, 3 on MD, 2 on SM, 1 default */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((game) => (
          <article
            key={game.slug}
            className="overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-[repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken)_9px,var(--surface-2)_9px,var(--surface-2)_18px)]">
              {/* RTP badge */}
              <span className="absolute right-[8px] top-[8px] rounded-[5px] bg-green px-[7px] py-[3px] font-mono text-[10px] font-semibold text-white">
                RTP {game.rtp.toFixed(1)}%
              </span>
              {/* Placeholder label */}
              <span className="bg-surface/80 absolute bottom-[7px] left-[7px] rounded-[3px] border border-line px-[5px] py-[2px] font-mono text-[9px] text-ink-3">
                {game.name}
              </span>
            </div>

            {/* Body */}
            <div className="p-[12px_13px_13px]">
              <p className="m-0 text-[13.5px] font-bold leading-[1.3] text-ink">{game.name}</p>
              <p className="m-0 mt-[2px] text-[11px] text-ink-3">{game.provider}</p>

              <div className="mt-[8px] flex flex-wrap items-center gap-[5px]">
                <span className="rounded-[4px] border border-line bg-bg-sunken px-[6px] py-[2px] font-mono text-[10px] text-ink-3">
                  Max <strong>{game.maxWin}</strong>
                </span>
                <span className="flex items-center gap-[4px] rounded-[4px] border border-line bg-bg-sunken px-[6px] py-[2px] font-mono text-[10px] text-ink-3">
                  Vol. <VolDots vol={game.volatility} />
                </span>
              </div>

              <div className="mt-[10px] flex gap-[6px]">
                <a
                  href={`/jeux/${game.category}/avis/${game.slug}/#demo`}
                  className="flex-1 rounded-[7px] border border-line bg-surface px-0 py-[7px] text-center font-mono text-[11px] font-semibold text-ink transition-colors hover:border-ink-3"
                  data-event="game_demo_click"
                  data-game={game.slug}
                >
                  {isFr ? 'Démo' : 'Demo'}
                </a>
                <a
                  href={`/jeux/${game.category}/avis/${game.slug}/`}
                  className="flex-1 rounded-[7px] bg-green px-0 py-[7px] text-center font-mono text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                  data-event="game_review_click"
                  data-game={game.slug}
                >
                  {isFr ? 'Avis' : 'Review'}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[15px] text-ink-3">
          {isFr ? 'Aucun jeu pour ce fournisseur.' : 'No games for this provider.'}
        </p>
      )}
    </>
  )
}
