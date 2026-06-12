import { cn } from '@/lib/utils'

interface BonusBadgeProps {
  label?: string
  amount: string
  amountSuffix?: string
  conditions?: string
  gold?: boolean
  locale?: string
  className?: string
}

export function BonusBadge({
  label,
  amount,
  amountSuffix,
  conditions,
  gold = false,
  locale = 'fr',
  className,
}: BonusBadgeProps) {
  const resolvedLabel = label ?? (locale === 'fr' ? 'Bonus de bienvenue' : 'Welcome bonus')
  return (
    <div
      className={cn(
        'inline-flex flex-col rounded border-[1.5px] border-solid px-4 py-3',
        gold
          ? 'border-[color-mix(in_srgb,var(--gold)_34%,var(--line))] bg-gold-50'
          : 'border-[color-mix(in_srgb,var(--green)_30%,var(--line))] bg-green-50',
        className
      )}
    >
      <span
        className={cn(
          'mb-[3px] font-mono text-[10.5px] uppercase tracking-[0.08em]',
          gold ? 'text-gold-ink' : 'text-green-ink'
        )}
      >
        {resolvedLabel}
      </span>
      <span className="font-serif text-[24px] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
        <span className={gold ? 'text-gold-ink' : 'text-green'}>{amount}</span>
        {amountSuffix && ` ${amountSuffix}`}
      </span>
      {conditions && <span className="mt-1 text-[11px] text-ink-3">{conditions}</span>}
    </div>
  )
}
