import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number // 0–5, supports .5 increments
  reviewCount?: number
  grade?: string // e.g. 'Excellent'
  showNumeric?: boolean
  size?: 'default' | 'lg'
  className?: string
}

function StarIcon({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  const starPath = 'M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.6 5 20.4l1.4-6.8L1.3 9l6.9-.7z'

  if (fill === 'half') {
    return (
      <svg viewBox="0 0 24 24" className="block" aria-hidden>
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="var(--star)" />
            <stop offset="50%" stopColor="var(--line-2)" />
          </linearGradient>
        </defs>
        <path d={starPath} fill="url(#half-star)" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="block" aria-hidden>
      <path d={starPath} fill={fill === 'full' ? 'var(--star)' : 'var(--line-2)'} />
    </svg>
  )
}

export function StarRating({
  rating,
  reviewCount,
  grade,
  showNumeric = true,
  size = 'default',
  className,
}: StarRatingProps) {
  const starSize = size === 'lg' ? 'w-4 h-4' : 'w-[15px] h-[15px]'

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return 'full' as const
    if (rating >= i + 0.5) return 'half' as const
    return 'empty' as const
  })

  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      {showNumeric && (
        <span className="font-serif text-[28px] font-semibold leading-none text-ink">
          {rating.toFixed(1)}
          <small className="font-sans text-sm font-medium text-ink-3">/10</small>
        </span>
      )}
      <div>
        {grade && (
          <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.05em] text-green">
            {grade}
          </p>
        )}
        <div className="flex gap-0.5" role="img" aria-label={`${rating} étoiles sur 5`}>
          {stars.map((fill, i) => (
            <span key={i} className={starSize}>
              <StarIcon fill={fill} />
            </span>
          ))}
        </div>
        {reviewCount != null && (
          <p className="mt-0.5 text-[12.5px] text-ink-3">
            sur la base de {reviewCount.toLocaleString('fr-FR')} avis
          </p>
        )}
      </div>
    </div>
  )
}
