'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

export interface TableColumn {
  key: string
  label: string
  type?: 'num' | 'text'
  sortable?: boolean
}

export interface TableRow {
  id: string
  cells: Array<{
    display: string | React.ReactNode
    sortValue?: string | number
  }>
  // Operator data for the name cell (first cell always)
  operatorName?: string
  operatorSlug?: string
  logoUrl?: string
  licence?: string
}

interface ComparisonTableProps {
  columns: TableColumn[]
  rows: TableRow[]
  stickyHeader?: boolean
  className?: string
}

type SortState = { colIndex: number; dir: 'ascending' | 'descending' } | null

export function ComparisonTable({
  columns,
  rows,
  stickyHeader = true,
  className,
}: ComparisonTableProps) {
  const [sort, setSort] = useState<SortState>(null)

  function toggleSort(colIndex: number) {
    setSort((prev) => {
      const newDir =
        prev?.colIndex === colIndex && prev.dir === 'ascending' ? 'descending' : 'ascending'
      return { colIndex, dir: newDir }
    })
  }

  const sortedRows = [...rows].sort((a, b) => {
    if (!sort) return 0
    const { colIndex, dir } = sort
    const col = columns[colIndex]
    if (!col) return 0

    const av = a.cells[colIndex]?.sortValue
    const bv = b.cells[colIndex]?.sortValue

    if (av == null || bv == null) return 0

    let cmp = 0
    if (col.type === 'num') {
      cmp = Number(av) - Number(bv)
    } else {
      cmp = String(av).localeCompare(String(bv), 'fr')
    }
    return dir === 'ascending' ? cmp : -cmp
  })

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-line shadow-2', className)}>
      <table className="w-full border-collapse bg-surface">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                aria-sort={sort?.colIndex === i ? sort.dir : undefined}
                onClick={col.sortable ? () => toggleSort(i) : undefined}
                className={cn(
                  'whitespace-nowrap border-b border-line bg-surface-2 px-4 py-[14px] text-left font-mono text-[11.5px] uppercase tracking-[0.05em] text-ink-3',
                  stickyHeader && 'sticky top-[var(--header-h)] z-[5]',
                  col.sortable && 'cursor-pointer select-none hover:text-ink'
                )}
              >
                {col.label}
                {col.sortable && (
                  <span
                    className={cn(
                      'ml-1 opacity-40',
                      sort?.colIndex === i && 'text-green opacity-100'
                    )}
                    aria-hidden
                  >
                    {sort?.colIndex === i ? (sort.dir === 'ascending' ? '↑' : '↓') : '↕'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className="border-b border-line transition-colors last:border-b-0 hover:bg-surface-2"
            >
              {/* Rank cell */}
              <td className="w-[46px] px-4 py-4 text-center font-serif text-[22px] font-semibold text-ink-3">
                {rowIndex + 1}
              </td>

              {row.cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-b border-line px-4 py-4 align-middle text-[14.5px] last:border-b-0"
                  data-sort={cell.sortValue}
                >
                  {cell.display}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
