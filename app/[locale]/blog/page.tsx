import type { Metadata } from 'next'
export const revalidate = 3600

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Blog casino en ligne — actualités, analyses et guides (2026)'
      : 'Online Casino Blog — news, analysis and guides (2026)',
    description: isFr
      ? "Actualités du secteur casino en ligne, analyses de bonus, guides pratiques et interviews d'experts. Mis à jour chaque semaine."
      : 'Online casino industry news, bonus analysis, practical guides and expert interviews. Updated weekly.',
    alternates: { languages: buildHreflang('/blog/') },
  }
}

const articles = [
  {
    slug: 'anj-2026',
    category: 'Législation',
    categoryEn: 'Regulation',
    date: '2026-06-04',
    readTime: '4 min',
    title: 'ANJ 2026 : ce qui change pour les joueurs en ligne',
    titleEn: '2026 ANJ Update: what changes for online players',
    excerpt:
      "L'Autorité Nationale des Jeux publie ses nouvelles directives. On décrypte ce qui change concrètement pour les joueurs et les opérateurs.",
    excerptEn:
      'The ANJ publishes its new guidelines. We break down what concretely changes for players and operators.',
  },
  {
    slug: 'wager-pieges',
    category: 'Bonus',
    categoryEn: 'Bonus',
    date: '2026-06-01',
    readTime: '6 min',
    title: 'Wager casino : les 5 pièges à éviter',
    titleEn: 'Casino wagering: the 5 traps to avoid',
    excerpt:
      'Mise maximale, jeux exclus, délai de validité... Les conditions de mise cachent des clauses qui font perdre leur bonus à la plupart des joueurs.',
    excerptEn:
      'Maximum bet, excluded games, validity period... The wagering conditions hide clauses that cause most players to lose their bonus.',
  },
  {
    slug: 'retraits-crypto',
    category: 'Paiements',
    categoryEn: 'Payments',
    date: '2026-05-28',
    readTime: '5 min',
    title: 'Retraits crypto dans les casinos en ligne : guide 2026',
    titleEn: 'Crypto withdrawals in online casinos: 2026 guide',
    excerpt:
      'Bitcoin, USDT, Ethereum : les retraits crypto offrent souvent les délais les plus rapides — mais attention aux frais réseau et aux exigences KYC.',
    excerptEn:
      'Bitcoin, USDT, Ethereum: crypto withdrawals often offer the fastest processing times — but beware of network fees and KYC requirements.',
  },
]

export default async function BlogListingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Blog casino en ligne — articles 2026' : 'Online casino blog — articles 2026',
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isFr ? a.title : a.titleEn,
      url: `${BASE_URL}${isFr ? '' : '/en'}/blog/${a.slug}/`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <Breadcrumbs
        items={[{ label: isFr ? 'Accueil' : 'Home', href: '/' }, { label: 'Blog' }]}
        locale={locale}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Actualités & analyses' : 'News & analysis'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            Blog
          </h1>
          <p className="m-0 max-w-[58ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Analyses indépendantes, décryptages réglementaires et guides pratiques — sans conflit d'intérêt."
              : 'Independent analysis, regulatory updates and practical guides — without conflicts of interest.'}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[880px] px-8 sm:px-[18px]">
          <div className="flex flex-col divide-y divide-line">
            {articles.map((art) => (
              <article key={art.slug} className="py-8 first:pt-0 last:pb-0">
                <a
                  href={`/blog/${art.slug}/`}
                  className="group block text-ink no-underline"
                  data-event="blog_click"
                  data-slug={art.slug}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-[10px]">
                    <span className="rounded-[5px] border border-line bg-bg-sunken px-[9px] py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] text-green">
                      {isFr ? art.category : art.categoryEn}
                    </span>
                    <time dateTime={art.date} className="font-mono text-[11px] text-ink-3">
                      {new Date(art.date).toLocaleDateString(isFr ? 'fr-FR' : 'en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="font-mono text-[11px] text-ink-3">·</span>
                    <span className="font-mono text-[11px] text-ink-3">
                      {art.readTime} {isFr ? 'de lecture' : 'read'}
                    </span>
                  </div>
                  <h2 className="mb-3 font-serif text-[24px] font-medium leading-tight tracking-[-0.014em] text-ink transition-colors group-hover:text-green">
                    {isFr ? art.title : art.titleEn}
                  </h2>
                  <p className="m-0 max-w-[65ch] text-[15px] leading-[1.6] text-ink-2">
                    {isFr ? art.excerpt : art.excerptEn}
                  </p>
                  <span className="mt-3 inline-block text-[14px] font-bold text-green">
                    {isFr ? 'Lire →' : 'Read →'}
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
