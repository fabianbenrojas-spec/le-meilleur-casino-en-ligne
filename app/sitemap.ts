import type { MetadataRoute } from 'next'

import { operators } from '@/config/operators'
import { categories, games } from '@/config/games'

const BASE = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

const NOW = new Date()

/** Build a sitemap entry for a FR-only page */
function entry(
  frPath: string,
  opts: {
    enPath?: string
    priority?: number
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
    lastModified?: Date
  } = {}
): MetadataRoute.Sitemap[number] {
  const { priority = 0.6, changeFrequency = 'monthly', lastModified = NOW } = opts
  return {
    url: `${BASE}${frPath}`,
    lastModified,
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Static high-priority pages ──────────────────────────────────────
    entry('/', { priority: 1, changeFrequency: 'weekly' }),

    // ── Casinos ──────────────────────────────────────────────────────────
    entry('/casinos/', { priority: 0.9, changeFrequency: 'weekly' }),
    ...operators.map((op) =>
      entry(`/casinos/${op.slug}/`, { priority: 0.85, changeFrequency: 'monthly' })
    ),

    // ── Comparatifs ──────────────────────────────────────────────────────
    entry('/comparatifs/', { priority: 0.8 }),
    entry('/comparatifs/top-10-casinos-en-ligne/', {
      enPath: '/comparisons/top-10-online-casinos/',
      priority: 0.85,
      changeFrequency: 'weekly',
    }),
    entry('/versus/cresus-vs-lucky8/', { priority: 0.7 }),
    entry('/versus/winamax-vs-betclic/', { priority: 0.7 }),
    entry('/versus/winamax-vs-pokerstars/', { priority: 0.7 }),
    entry('/versus/stake-vs-casinozer/', { priority: 0.7 }),

    // ── Alternatives ─────────────────────────────────────────────────────
    ...operators.map((op) => entry(`/alternatives/${op.slug}/`, { priority: 0.5 })),

    // ── Jeux ─────────────────────────────────────────────────────────────
    entry('/jeux/', { enPath: '/games/', priority: 0.7 }),
    ...categories.map((c) => entry(`/jeux/${c.slug}/`, { enPath: `/${c.slug}/`, priority: 0.65 })),
    ...games.map((g) => entry(`/jeux/${g.category}/avis/${g.slug}/`, { priority: 0.55 })),

    // ── Bonus ─────────────────────────────────────────────────────────────
    entry('/bonus/', { enPath: '/bonuses/', priority: 0.7, changeFrequency: 'weekly' }),

    // ── Guides ────────────────────────────────────────────────────────────
    entry('/guides/', { priority: 0.7 }),
    entry('/guides/legalite/', { priority: 0.6 }),
    entry('/guides/methodologie/', { priority: 0.6 }),

    // ── Blog ──────────────────────────────────────────────────────────────
    entry('/blog/', { priority: 0.65, changeFrequency: 'weekly' }),
    entry('/blog/anj-2026/', { priority: 0.55 }),
    entry('/blog/wager-pieges/', { priority: 0.55 }),
    entry('/blog/retraits-crypto/', { priority: 0.55 }),

    // ── Conformité ────────────────────────────────────────────────────────
    entry('/jeu-responsable/', {
      enPath: '/responsible-gambling/',
      priority: 0.6,
    }),

    // ── Légal ────────────────────────────────────────────────────────────
    entry('/mentions-legales/', { enPath: '/legal-notice/', priority: 0.3 }),
    entry('/politique-cookies/', { enPath: '/cookie-policy/', priority: 0.3 }),
    entry('/confidentialite/', { enPath: '/privacy/', priority: 0.3 }),
    entry('/a-propos/', { enPath: '/about/', priority: 0.4 }),
    entry('/contact/', { priority: 0.35 }),
  ]
}
