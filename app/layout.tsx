import type { Metadata } from 'next'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
