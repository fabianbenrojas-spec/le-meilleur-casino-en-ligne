import Image from 'next/image'

function logoSrc(slug: string): string {
  return slug === 'banzai-slots' ? `/logos/${slug}.svg` : `/logos/${slug}.png`
}

function Placeholder({
  name,
  width,
  height,
  className,
}: {
  name: string
  width: number
  height: number
  className?: string
}) {
  return (
    <div
      style={{
        width,
        height,
        background:
          'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 7px,transparent 7px,transparent 14px)',
      }}
      className={`shrink-0 rounded border border-dashed border-line-2 ${className ?? ''}`}
      role="img"
      aria-label={`Logo ${name}`}
    />
  )
}

export function CasinoLogo({
  slug,
  logoUrl,
  name,
  width,
  height,
  className,
}: {
  slug?: string
  logoUrl?: string
  name: string
  width: number
  height: number
  className?: string
}) {
  const src = logoUrl ?? (slug ? logoSrc(slug) : undefined)

  if (src) {
    return (
      <Image
        src={src}
        alt={`Logo ${name}`}
        width={width}
        height={height}
        className={`object-contain ${className ?? ''}`}
      />
    )
  }

  return <Placeholder name={name} width={width} height={height} className={className} />
}
