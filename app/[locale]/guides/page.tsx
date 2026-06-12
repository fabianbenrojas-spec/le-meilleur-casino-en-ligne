import type { Metadata } from 'next'

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
      ? 'Guides casino en ligne — légalité, RTP, paiements, stratégies'
      : 'Online Casino Guides — legality, RTP, payments, strategies',
    description: isFr
      ? 'Nos guides complets pour jouer intelligemment : légalité en France, comprendre le RTP, choisir vos paiements, jeu responsable.'
      : 'Our complete guides for smart play: legality, understanding RTP, choosing payments, responsible gambling.',
    alternates: { languages: buildHreflang('/guides/') },
  }
}

const guides = [
  {
    slug: 'legalite',
    icon: '⚖️',
    title: 'Légalité en France',
    titleEn: 'Legality in France',
    desc: "Casino en ligne et loi française : ce qui est autorisé, le rôle de l'ANJ, et les risques réels.",
    descEn: 'Online casinos and French law: what is allowed, the ANJ role, and the real risks.',
    readTime: '5 min',
  },
  {
    slug: 'methodologie',
    icon: '📊',
    title: 'Notre méthodologie',
    titleEn: 'Our methodology',
    desc: "Comment nous évaluons les casinos : 38 critères, tests à l'argent réel, re-tests tous les 90 jours.",
    descEn: 'How we rate casinos: 38 criteria, real-money tests, re-tested every 90 days.',
    readTime: '7 min',
  },
  {
    slug: 'rtp',
    icon: '📈',
    title: 'Comprendre le RTP',
    titleEn: 'Understanding RTP',
    desc: 'Taux de redistribution, volatilité, avantage maison — décoder les chiffres qui comptent.',
    descEn: 'Return to player, volatility, house edge — decode the numbers that matter.',
    readTime: '8 min',
  },
  {
    slug: 'paiements',
    icon: '💳',
    title: 'Méthodes de paiement',
    titleEn: 'Payment methods',
    desc: 'CB, e-wallets, crypto : délais de retrait réels, frais cachés et sécurité comparés.',
    descEn: 'Cards, e-wallets, crypto: real withdrawal times, hidden fees and security compared.',
    readTime: '6 min',
  },
  {
    slug: 'bonus-casino',
    icon: '🎁',
    title: 'Choisir son bonus',
    titleEn: 'Choosing your bonus',
    desc: 'Bonus de bienvenue, cashback, tours gratuits : lire les conditions avant de réclamer.',
    descEn: 'Welcome bonus, cashback, free spins: reading the terms before claiming.',
    readTime: '10 min',
  },
]

export default async function GuidesHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Guides' : 'Guides' },
        ]}
      />

      <section className="pb-2 pt-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Guides essentiels · 2026' : 'Essential guides · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comprendre avant de <em className="italic not-italic text-green">jouer</em>
              </>
            ) : (
              <>
                Understand before you <em className="italic not-italic text-green">play</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[60ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Nos guides indépendants pour jouer en connaissance de cause — sans jargon, avec des chiffres vérifiés.'
              : 'Our independent guides for informed play — no jargon, with verified numbers.'}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}/`}
                className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6 text-ink no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-3"
                data-event="guide_click"
                data-guide={guide.slug}
              >
                <span className="text-3xl" aria-hidden>
                  {guide.icon}
                </span>
                <div>
                  <h2 className="mb-1 font-serif text-[21px] font-semibold text-ink">
                    {isFr ? guide.title : guide.titleEn}
                  </h2>
                  <span className="font-mono text-[10px] text-ink-3">
                    {guide.readTime} {isFr ? 'de lecture' : 'read'}
                  </span>
                </div>
                <p className="flex-1 text-[13.5px] leading-[1.5] text-ink-2">
                  {isFr ? guide.desc : guide.descEn}
                </p>
                <span className="font-bold text-green">
                  {isFr ? 'Lire le guide →' : 'Read guide →'}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
