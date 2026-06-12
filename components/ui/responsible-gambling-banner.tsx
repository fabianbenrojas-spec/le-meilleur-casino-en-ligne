interface ResponsibleGamblingBannerProps {
  locale?: 'fr' | 'en'
}

export function ResponsibleGamblingBanner({ locale = 'fr' }: ResponsibleGamblingBannerProps) {
  const isFr = locale === 'fr'

  return (
    <div
      className="border-b border-t border-[color-mix(in_srgb,var(--red)_25%,var(--line))] border-t-[color-mix(in_srgb,var(--red)_25%,var(--line))] bg-red-50"
      role="complementary"
      aria-label="Jeu responsable"
    >
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-4 px-[18px] py-4 text-[13.5px] text-ink-2 md:px-8">
        <span className="shrink-0 rounded-[5px] bg-red px-[9px] py-[3px] font-mono text-xs font-semibold text-white">
          18+
        </span>
        <strong className="text-ink">Jeu responsable.</strong>
        {isFr ? (
          <span>
            Les jeux d&apos;argent et de hasard peuvent être dangereux. Besoin d&apos;aide ?{' '}
            <a href="tel:0974751313" className="font-semibold text-red-ink hover:underline">
              Joueurs Info Service 09 74 75 13 13
            </a>{' '}
            (appel non surtaxé, 7j/7).
          </span>
        ) : (
          <span>
            Gambling can be harmful. For help:{' '}
            <a
              href="https://www.gamcare.org.uk"
              className="font-semibold text-red-ink hover:underline"
            >
              GamCare
            </a>{' '}
            ·{' '}
            <a
              href="https://www.begambleaware.org"
              className="font-semibold text-red-ink hover:underline"
            >
              BeGambleAware
            </a>
          </span>
        )}

        {/* Organisation logos (placeholders) */}
        <div className="ml-auto flex items-center gap-2.5">
          {isFr ? (
            <>
              <OrgPlaceholder label="Joueurs Info Service" />
              <OrgPlaceholder label="ANJ" />
            </>
          ) : (
            <>
              <OrgPlaceholder label="GamCare" />
              <OrgPlaceholder label="BeGambleAware" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function OrgPlaceholder({ label }: { label: string }) {
  return (
    <span className="rounded border border-dashed border-line-2 px-2 py-1 font-mono text-[10px] text-ink-3">
      {label}
    </span>
  )
}
