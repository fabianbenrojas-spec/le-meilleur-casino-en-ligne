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
  locale: _locale,
}: AffiliateDisclosureProps) {
  if (variant === 'strip') {
    // aff-strip: visible sans scroll sur les reviews
    return (
      <div className={cn('mx-auto max-w-site px-8 pb-0 pt-[14px] sm:px-[18px]', className)}>
        <div className="flex items-start gap-3 rounded border border-line bg-surface-2 px-4 py-3 text-[12.5px] leading-[1.5] text-ink-2">
          <span className="mt-[1px] grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[7px] bg-gold text-xs font-extrabold text-white">
            i
          </span>
          <p className="m-0">
            <strong className="text-ink">Déclaration d&apos;affiliation :</strong> Ce site perçoit
            une commission lorsque vous vous inscrivez via nos liens. Ces commissions nous
            permettent de financer nos tests indépendants.{' '}
            <strong className="text-ink">
              Elles n&apos;influencent pas nos notes ni notre classement.
            </strong>{' '}
            <a href="/mentions-legales" className="text-green hover:underline">
              En savoir plus
            </a>
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
      <strong className="text-ink">Affiliation :</strong> Nous percevons une commission lorsque vous
      utilisez nos liens. Cela finance nos tests indépendants et ne modifie ni nos notes ni
      l&apos;ordre de notre classement.{' '}
      <a href="/mentions-legales" className="text-green hover:underline">
        Mentions légales
      </a>
    </div>
  )
}
