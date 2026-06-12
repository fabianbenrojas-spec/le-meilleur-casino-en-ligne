import type { MetadataRoute } from 'next'

const BASE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/go/', '/api/', '/dev/', '/design-system/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
