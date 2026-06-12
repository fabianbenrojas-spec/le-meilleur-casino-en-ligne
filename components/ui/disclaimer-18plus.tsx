import { cn } from '@/lib/utils'

type Variant = 'topstrip' | 'encart'

interface Disclaimer18PlusProps {
  variant?: Variant
  updatedAt?: string // ISO date — shown in topstrip as "MÀJ YYYY-MM-DD"
  className?: string
  locale?: string
}

export function Disclaimer18Plus({
  variant = 'topstrip',
  updatedAt,
  className,
  locale = 'fr',
}: Disclaimer18PlusProps) {
  const isFr = locale === 'fr'

  if (variant === 'topstrip') {
    return (
      <div
        className={cn('bg-ink text-bg', className)}
        role="banner"
        aria-label={isFr ? 'Avertissement 18+' : '18+ Warning'}
      >
        <div className="mx-auto flex max-w-site flex-nowrap items-center gap-[14px] overflow-hidden whitespace-nowrap px-8 py-[7px] text-[12.5px] tracking-[0.01em] sm:gap-2.5 sm:px-[18px] sm:text-[11.5px]">
          <span className="shrink-0 rounded-[5px] bg-red px-2 py-[2px] font-mono text-[11.5px] font-semibold text-white">
            18+
          </span>
          <span className="sep opacity-40">|</span>
          <span className="min-w-0 overflow-hidden text-ellipsis">
            {isFr
              ? "Les jeux d'argent comportent des risques. Jouez de façon responsable."
              : 'Gambling involves financial risks. Play responsibly.'}
          </span>
          <span className="sep opacity-40">|</span>
          {isFr ? (
            <a
              href="tel:0974751313"
              className="shrink-0 underline underline-offset-[2px] opacity-85 hover:opacity-100"
            >
              Joueurs Info Service 09 74 75 13 13
            </a>
          ) : (
            <a
              href="https://www.gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 underline underline-offset-[2px] opacity-85 hover:opacity-100"
            >
              GamCare
            </a>
          )}
          {updatedAt && (
            <span className="ml-auto hidden shrink-0 font-mono text-[11px] opacity-70 md:block">
              {isFr ? 'MÀJ' : 'Updated'} {updatedAt}
            </span>
          )}
        </div>
      </div>
    )
  }

  // encart variant — inline disclaimer block
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded border border-[color-mix(in_srgb,var(--red)_25%,var(--line))] bg-red-50 px-4 py-3 text-[13.5px] text-ink-2',
        className
      )}
      role="note"
    >
      <span className="mt-0.5 shrink-0 rounded-[5px] bg-red px-2 py-[2px] font-mono text-[11px] font-semibold text-white">
        18+
      </span>
      <p className="m-0 leading-[1.55]">
        {isFr ? (
          <>
            Les jeux d&apos;argent comportent des risques. Jouez de façon responsable.{' '}
            <a href="tel:0974751313" className="font-semibold text-red-ink">
              Joueurs Info Service 09 74 75 13 13
            </a>
          </>
        ) : (
          <>
            Gambling involves financial risks. Play responsibly.{' '}
            <a
              href="https://www.gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-ink"
            >
              GamCare
            </a>
            {' · '}
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-ink"
            >
              BeGambleAware
            </a>
          </>
        )}
      </p>
    </div>
  )
}
