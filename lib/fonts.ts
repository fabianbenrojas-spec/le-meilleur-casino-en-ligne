import { Hanken_Grotesk, JetBrains_Mono, Newsreader } from 'next/font/google'

// Fonts are self-hosted by next/font — no external request at render time.
// adjustFontFallback: true generates a size-adjusted system fallback to
// minimise CLS during the brief swap period.

export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  adjustFontFallback: false, // Newsreader has no safe fallback — skip CLS adjustment
  preload: true,
})

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  adjustFontFallback: true, // sans-serif has good system fallbacks
  preload: true,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  adjustFontFallback: true,
  preload: false, // mono only used for metadata chips — not critical path
})
