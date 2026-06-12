import type { WithContext, BreadcrumbList } from 'schema-dts'

export interface BreadcrumbItem {
  label: string
  href?: string // omit for the current (last) item
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  baseUrl?: string
  locale?: string
}

// Generates BreadcrumbList schema.org JSON-LD alongside the visual trail
export function Breadcrumbs({
  items,
  baseUrl = 'https://le-meilleur-casino-en-ligne.fr',
  locale: _locale,
}: BreadcrumbsProps) {
  const schema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Fil d'Ariane" className="border-b border-line bg-surface-2">
        <ol className="mx-auto flex max-w-site flex-wrap items-center gap-2 px-[18px] py-[11px] text-[13px] text-ink-3 md:px-8">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="opacity-50" aria-hidden>
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className={isLast ? 'font-semibold text-ink' : undefined}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a href={item.href} className="transition-colors hover:text-green">
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
