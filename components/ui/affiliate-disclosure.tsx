import { cn } from '@/lib/utils'

type Variant = 'strip' | 'footer'

interface AffiliateDisclosureProps {
  variant?: Variant
  className?: string
  locale?: string
}

export function AffiliateDisclosure({
  variant = 'strip',
  className,
  locale = 'fr',
}: AffiliateDisclosureProps) {
  const isFr = locale === 'fr'

  if (variant === 'strip') {
    return (
      <div className={cn('mx-auto max-w-site px-8 pb-0 pt-[14px] sm:px-[18px]', className)}>
        <div className="flex items-start gap-3 rounded border border-line bg-surface-2 px-4 py-3 text-[12.5px] leading-[1.5] text-ink-2">
          <span className="mt-[1px] grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[7px] bg-gold text-xs font-extrabold text-white">
            i
          </span>
          <p className="m-0">
            {isFr ? (
              <>
                <strong className="text-ink">Déclaration d&apos;affiliation :</strong> Ce site
                perçoit une commission lorsque vous vous inscrivez via nos liens. Ces commissions
                nous permettent de financer nos tests indépendants.{' '}
                <strong className="text-ink">
                  Elles n&apos;influencent pas nos notes ni notre classement.
                </strong>{' '}
                <a href="/mentions-legales" className="text-green hover:underline">
                  En savoir plus
                </a>
              </>
            ) : (
              <>
                <strong className="text-ink">Affiliate disclosure:</strong> This site earns a
                commission when you sign up via our links. These commissions fund our independent
                testing.{' '}
                <strong className="text-ink">They do not influence our ratings or rankings.</strong>{' '}
                <a href="/en/legal-notice/" className="text-green hover:underline">
                  Learn more
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    )
  }

  // footer variant
  return (
    <div
      className={cn(
        'w-full rounded border border-line bg-surface px-4 py-3 text-[12.5px] leading-[1.5] text-ink-2',
        className
      )}
    >
      {isFr ? (
        <>
          <strong className="text-ink">Affiliation :</strong> Nous percevons une commission lorsque
          vous utilisez nos liens. Cela finance nos tests indépendants et ne modifie ni nos notes ni
          l&apos;ordre de notre classement.{' '}
          <a href="/mentions-legales" className="text-green hover:underline">
            Mentions légales
          </a>
        </>
      ) : (
        <>
          <strong className="text-ink">Affiliate disclosure:</strong> We earn a commission when you
          use our links. This funds our independent testing and does not affect our ratings or
          ranking order.{' '}
          <a href="/en/legal-notice/" className="text-green hover:underline">
            Legal notice
          </a>
        </>
      )}
    </div>
  )
}
