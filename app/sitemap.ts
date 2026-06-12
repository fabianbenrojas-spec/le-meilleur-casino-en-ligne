import type { MetadataRoute } from 'next'

import { operators } from '@/config/operators'
import { categories, games } from '@/config/games'

const BASE = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

const NOW = new Date()

/** Build a bilingual sitemap entry with hreflang alternates */
function entry(
  frPath: string,
  opts: {
    enPath?: string
    priority?: number
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
    lastModified?: Date
  } = {}
): MetadataRoute.Sitemap[number] {
  const { enPath, priority = 0.6, changeFrequency = 'monthly', lastModified = NOW } = opts
  const enFull = `${BASE}/en${enPath ?? frPath}`
  return {
    url: `${BASE}${frPath}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fr: `${BASE}${frPath}`,
        en: enFull,
        'x-default': `${BASE}${frPath}`,
      },
    },
  }
}

/** Top-5 versus pairs */
function versusEntries(): MetadataRoute.Sitemap {
  const top5 = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 5)
  const out: MetadataRoute.Sitemap = []
  for (let i = 0; i < top5.length; i++) {
    for (let j = i + 1; j < top5.length; j++) {
      const slug = `${top5[i]!.slug}-vs-${top5[j]!.slug}`
      out.push(entry(`/comparatifs/${slug}/`, { priority: 0.5 }))
    }
  }
  return out
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

    // ── Casino listing pages ─────────────────────────────────────────────
    entry('/casinos/avec-paypal/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/bitcoin/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/live/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/mobile/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/fiables/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/nouveaux/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/bonus-sans-depot/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/casinos/esports/', { priority: 0.7, changeFrequency: 'weekly' }),

    // ── Comparatifs ──────────────────────────────────────────────────────
    entry('/comparatifs/', { priority: 0.8 }),
    entry('/comparatifs/top-10-casinos-en-ligne/', {
      enPath: '/comparisons/top-10-online-casinos/',
      priority: 0.85,
      changeFrequency: 'weekly',
    }),
    entry('/comparatifs/cashback/', { priority: 0.72, changeFrequency: 'weekly' }),
    entry('/comparatifs/crypto/', { priority: 0.72, changeFrequency: 'weekly' }),
    entry('/comparatifs/live-casino/', { priority: 0.72, changeFrequency: 'weekly' }),
    entry('/comparatifs/meilleur-bonus/', { priority: 0.75, changeFrequency: 'weekly' }),
    entry('/comparatifs/retraits-rapides/', { priority: 0.72, changeFrequency: 'weekly' }),
    ...versusEntries(),

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
    entry('/guides/rtp/', { priority: 0.6 }),
    entry('/guides/paiements/', { priority: 0.6 }),
    entry('/guides/bonus-casino/', { priority: 0.6 }),

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
