'use client'

import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

export type GuideTopic = 'all' | 'bonus' | 'jeux' | 'paiements' | 'securite' | 'legal'

export interface GuideCardData {
  slug: string
  title: string
  desc: string
  readTime: number
  topic: Exclude<GuideTopic, 'all'>
  iconPath: string
}

const TOPIC_CHIPS: { topic: GuideTopic; label: string }[] = [
  { topic: 'all', label: 'Tous' },
  { topic: 'bonus', label: 'Bonus' },
  { topic: 'jeux', label: 'Jeux' },
  { topic: 'paiements', label: 'Paiements' },
  { topic: 'securite', label: 'Sécurité' },
  { topic: 'legal', label: 'Légal' },
]

const TOPIC_LABELS: Record<Exclude<GuideTopic, 'all'>, string> = {
  bonus: 'Bonus',
  jeux: 'Jeux',
  paiements: 'Paiements',
  securite: 'Sécurité',
  legal: 'Légal',
}

function GuideCard({ guide, locale }: { guide: GuideCardData; locale: string }) {
  return (
    <a
      href={`/${locale === 'fr' ? '' : 'en/'}guides/${guide.slug}/`}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface no-underline shadow-1 transition-[box-shadow,transform,border-color] duration-[180ms] hover:-translate-y-[2px] hover:border-ink-3 hover:shadow-2"
      data-event="guide_click"
      data-guide={guide.slug}
      data-placement="guides_grid"
      data-page-type="guides_index"
      data-locale={locale}
    >
      {/* Thumbnail */}
      <div
        className="relative flex aspect-[16/9] items-center justify-center border-b border-line"
        style={{
          background:
            'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 9px,var(--surface-2,var(--surface)) 9px,var(--surface-2,var(--surface)) 18px)',
        }}
        aria-hidden
      >
        <span className="absolute left-[10px] top-[10px] rounded-[5px] border border-[color-mix(in_srgb,var(--green)_22%,var(--line))] bg-[color-mix(in_srgb,var(--green)_8%,var(--surface))] px-[8px] py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-green">
          {TOPIC_LABELS[guide.topic]}
        </span>
        <div className="grid h-[44px] w-[44px] place-items-center rounded-[12px] border border-line bg-surface shadow-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-[22px] w-[22px] text-green"
            aria-hidden
          >
            <path d={guide.iconPath} />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-[18px_20px_16px]">
        <h3 className="mb-[7px] font-serif text-[18px] font-semibold leading-[1.25] text-ink group-hover:text-green">
          {guide.title}
        </h3>
        <p className="mb-auto text-[13.5px] leading-[1.55] text-ink-2">{guide.desc}</p>
        <div className="mt-[14px] flex items-center justify-between border-t border-line pt-[11px]">
          <span className="inline-flex items-center gap-[6px] font-mono text-[11.5px] text-ink-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-[13px] w-[13px]"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l3.5 2" />
            </svg>
            {guide.readTime} min
          </span>
          <span className="font-mono text-[12px] font-semibold text-green">Lire →</span>
        </div>
      </div>
    </a>
  )
}

export function GuideSearchClient({ guides, locale }: { guides: GuideCardData[]; locale: string }) {
  const [query, setQuery] = useState('')
  const [activeTopic, setActiveTopic] = useState<GuideTopic>('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return guides.filter((g) => {
      const matchTopic = activeTopic === 'all' || g.topic === activeTopic
      const matchQuery =
        q === '' || g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
      return matchTopic && matchQuery
    })
  }, [guides, query, activeTopic])

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-[32px] flex flex-wrap items-center gap-[12px]">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-[13px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-ink-3"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un guide…"
            className="w-full rounded-[10px] border border-line-2 bg-surface py-[11px] pl-[42px] pr-[14px] font-sans text-[14px] text-ink outline-none placeholder:text-ink-3 focus:border-green focus:ring-1 focus:ring-[color-mix(in_srgb,var(--green)_30%,transparent)]"
            aria-label="Rechercher un guide"
            data-event="guide_search"
            data-page-type="guides_index"
            data-locale={locale}
          />
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-[8px]">
          {TOPIC_CHIPS.map((chip) => (
            <button
              key={chip.topic}
              type="button"
              onClick={() => setActiveTopic(chip.topic)}
              className={cn(
                'cursor-pointer rounded-full border px-[14px] py-[8px] font-sans text-[13px] font-semibold transition-all duration-[150ms]',
                activeTopic === chip.topic
                  ? 'border-green bg-green text-white'
                  : 'border-line-2 bg-surface text-ink-2 hover:border-ink-3 hover:text-ink'
              )}
              data-event="guide_filter"
              data-topic={chip.topic}
              data-page-type="guides_index"
              data-locale={locale}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-dashed border-line-2 bg-surface px-[20px] py-[48px] text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto mb-[12px] h-[36px] w-[36px] text-ink-3"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <p className="mb-[14px] text-[15px] text-ink-2">
            Aucun guide ne correspond à votre recherche.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActiveTopic('all')
            }}
            className="inline-flex cursor-pointer items-center rounded-[8px] border border-green px-[14px] py-[8px] font-sans text-[13px] font-semibold text-green transition-colors hover:bg-[color-mix(in_srgb,var(--green)_8%,transparent)]"
          >
            Voir tous les guides
          </button>
        </div>
      )}
    </div>
  )
}
