import { cn } from '@/lib/utils'

interface BonusBadgeProps {
  label?: string // e.g. 'Bonus de bienvenue'
  amount: string // e.g. '200 €'
  amountSuffix?: string // e.g. '+ 100 tours'
  conditions?: string // e.g. 'Wager 35× · dépôt min. 20 €'
  gold?: boolean // featured / top pick variant
  className?: string
}

export function BonusBadge({
  label = 'Bonus de bienvenue',
  amount,
  amountSuffix,
  conditions,
  gold = false,
  className,
}: BonusBadgeProps) {
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
        {label}
      </span>
      <span className="font-serif text-[24px] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
        <span className={gold ? 'text-gold-ink' : 'text-green'}>{amount}</span>
        {amountSuffix && ` ${amountSuffix}`}
      </span>
      {conditions && <span className="mt-1 text-[11px] text-ink-3">{conditions}</span>}
    </div>
  )
}
