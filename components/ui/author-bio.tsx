import Image from 'next/image'

import { cn } from '@/lib/utils'

interface AuthorBioProps {
  name: string
  role: string
  credentials?: string
  avatarUrl?: string
  lastUpdated?: string // ISO date string
  nextRetest?: string // ISO date string
  className?: string
  locale?: string
}

function formatDate(iso: string, locale: string = 'fr') {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AuthorBio({
  name,
  role,
  credentials,
  avatarUrl,
  lastUpdated,
  nextRetest,
  className,
  locale = 'fr',
}: AuthorBioProps) {
  const isFr = locale === 'fr'
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg border border-line bg-surface px-[22px] py-[18px] shadow-1',
        className
      )}
    >
      {/* Avatar */}
      <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full border border-line bg-bg-sunken">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} fill className="object-cover" sizes="56px" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                'repeating-linear-gradient(135deg, var(--bg-sunken), var(--bg-sunken) 6px, var(--surface-2) 6px, var(--surface-2) 12px)',
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="text-[15px] font-bold text-ink">{name}</p>
        <p className="text-[13px] text-ink-3">{role}</p>
        {credentials && <p className="mt-1 text-[12px] text-ink-2">{credentials}</p>}
        {(lastUpdated ?? nextRetest) && (
          <p className="mt-1 font-mono text-[11px] text-ink-3">
            {lastUpdated && (
              <>
                {isFr ? 'MÀJ' : 'Updated'} {formatDate(lastUpdated, locale)}
              </>
            )}
            {lastUpdated && nextRetest && <span className="mx-1.5 opacity-50">·</span>}
            {nextRetest && (
              <>
                {isFr ? 'Re-test prévu' : 'Re-test due'} {formatDate(nextRetest, locale)}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
