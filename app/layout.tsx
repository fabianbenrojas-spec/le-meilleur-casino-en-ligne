import type { Metadata } from 'next'
import { hankenGrotesk, jetbrainsMono, newsreader } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Le Meilleur Casino en Ligne — Comparateur FR',
    template: '%s | le-meilleur-casino-en-ligne.fr',
  },
  description:
    'Comparateur indépendant de casinos en ligne. Avis experts, bonus vérifiés, classements mis à jour mensuellement.',
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://le-meilleur-casino-en-ligne.fr'
  ),
}

// Runs before React hydration — prevents flash of unstyled theme (FOUC)
const antiFlashScript = `try{var t=localStorage.getItem('mc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${newsreader.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Anti-flash: must execute before first paint, before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
