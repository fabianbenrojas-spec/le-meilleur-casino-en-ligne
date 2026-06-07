'use client'

import { useState } from 'react'

import { CTAButton } from '@/components/ui/cta-button'
import { FilterSidebar } from '@/components/ui/filter-sidebar'
import type { ActiveFilters, FilterGroup } from '@/components/ui/filter-sidebar'

const filterGroups: FilterGroup[] = [
  {
    key: 'type',
    label: 'Type de jeux',
    options: [
      { value: 'slots', label: 'Machines à sous', count: 42 },
      { value: 'live', label: 'Casino live', count: 18 },
      { value: 'table', label: 'Jeux de table', count: 9 },
    ],
  },
  {
    key: 'rtp',
    label: 'RTP minimum',
    type: 'range',
    rangeMin: 94,
    rangeMax: 99,
    rangeStep: 0.1,
    rangeSuffix: '%',
    options: [],
  },
]

export function FilterSidebarDemo() {
  const [active, setActive] = useState<ActiveFilters>({})
  return <FilterSidebar groups={filterGroups} active={active} onChange={setActive} />
}

export function ClearConsentButton() {
  return (
    <CTAButton
      variant="secondary"
      size="sm"
      onClick={() => {
        try {
          localStorage.removeItem('mc-consent')
        } catch {
          // private browsing
        }
        window.location.reload()
      }}
    >
      Supprimer mc-consent et recharger
    </CTAButton>
  )
}
