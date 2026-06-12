import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'disabled'
type Size = 'default' | 'sm'

// Explicit GA4 data attributes — all propagated to the DOM element
export type GA4DataAttrs = {
  'data-event'?: string
  'data-operator'?: string
  'data-placement'?: string
  'data-bonus'?: string
  'data-page-type'?: string
  'data-locale'?: string
}

type BaseProps = {
  variant?: Variant
  size?: Size
  block?: boolean
  stack?: boolean
  arrow?: boolean
  subLabel?: string
  children: ReactNode
  className?: string
} & GA4DataAttrs

type AsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }
type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }
type CTAButtonProps = AsAnchor | AsButton

const base =
  'group inline-flex cursor-pointer items-center justify-center gap-[9px] rounded border-[1.5px] border-solid border-transparent px-[22px] py-[14px] text-[15.5px] font-bold tracking-[-0.005em] no-underline transition-[background,border-color,transform,box-shadow] duration-[180ms] active:translate-y-px'

const variants: Record<Variant, string> = {
  primary:
    'border-transparent bg-green text-white shadow-2 hover:bg-green-700 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-green',
  secondary:
    'border-green bg-transparent text-green-ink hover:bg-green-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-green',
  tertiary:
    'min-h-0 border-transparent bg-transparent px-2 py-3 font-semibold text-ink-2 hover:text-green',
  disabled: 'cursor-not-allowed border-line-2 bg-bg-sunken text-ink-3 shadow-none',
}

const sizes: Record<Size, string> = {
  default: 'min-h-[48px]',
  sm: 'min-h-[40px] px-4 py-[9px] text-sm',
}

export function CTAButton(props: CTAButtonProps) {
  const {
    variant = 'primary',
    size = 'default',
    block = false,
    stack = false,
    arrow = false,
    subLabel,
    className,
    children,
    ...rest
  } = props

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    stack && 'flex-col gap-0.5 py-[11px]',
    block && 'w-full',
    className
  )

  const content = (
    <>
      <span className={stack ? 'block' : undefined}>{children}</span>
      {subLabel && (
        <span
          className={cn('text-xs font-medium opacity-85', variant === 'primary' && 'text-white/80')}
        >
          {subLabel}
        </span>
      )}
      {arrow && !stack && (
        <span
          className="text-[17px] transition-transform duration-[180ms] group-hover:translate-x-[3px]"
          aria-hidden
        >
          →
        </span>
      )}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as Omit<AsButton, 'href'>
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
