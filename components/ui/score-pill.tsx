import { cn } from '@/lib/utils'

interface ScorePillProps {
  score: number // out of 10
  gold?: boolean // top pick variant
  className?: string
}

export function ScorePill({ score, gold = false, className }: ScorePillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-0.5 rounded-[9px] px-[11px] py-[5px] font-serif text-[19px] font-semibold leading-none text-white',
        gold ? 'bg-gold' : 'bg-green',
        className
      )}
    >
      {score.toFixed(1)}
      <small className="font-sans text-[11px] opacity-80">/10</small>
    </span>
  )
}
