import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ListingCard } from '@/components/ui/operator-card'
import { ProsConsBox } from '@/components/ui/pros-cons-box'
import { TableOfContents, type TOCItem } from '@/components/ui/table-of-contents'
import { categories, gameBySlug, games, type GameCategory } from '@/config/games'
import { TOP_10 } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateStaticParams() {
  return games.map((g) => ({ category: g.category, slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const game = gameBySlug.get(slug)
  if (!game) return {}
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? `${game.name} — Avis complet, RTP ${game.rtp.toFixed(2)}% & où jouer (2026)`
      : `${game.name} — Full Review, RTP ${game.rtp.toFixed(2)}% & where to play (2026)`,
    description: isFr
      ? `Avis ${game.name} (${game.provider}) : RTP ${game.rtp.toFixed(2)}%, volatilité ${game.volatility}, max win ${game.maxWin}. Points forts, points faibles, stratégie et meilleurs casinos.`
      : `${game.name} (${game.provider}) review: RTP ${game.rtp.toFixed(2)}%, ${game.volatility} volatility, max win ${game.maxWin}. Pros, cons, strategy and best casinos.`,
    alternates: { languages: buildHreflang(`/jeux/${game.category}/avis/${slug}/`) },
  }
}

function StatPill({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-center ${highlight ? 'border-green/30 bg-green-50' : 'border-line bg-surface-2'}`}
    >
      <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{label}</p>
      <p className={`font-mono text-[15px] font-semibold ${highlight ? 'text-green' : 'text-ink'}`}>
        {value}
      </p>
    </div>
  )
}

const TOC_ITEMS_FR: TOCItem[] = [
  { id: 'apercu', label: 'Aperçu du jeu', level: 2 },
  { id: 'avis', label: 'Notre avis complet', level: 2 },
  { id: 'fonctionnalites', label: 'Fonctionnalités', level: 3 },
  { id: 'strategie', label: 'Stratégie & conseils', level: 2 },
  { id: 'casinos', label: 'Meilleurs casinos', level: 2 },
  { id: 'alternatives', label: 'Jeux alternatifs', level: 2 },
  { id: 'faq', label: 'FAQ', level: 2 },
]

const TOC_ITEMS_EN: TOCItem[] = [
  { id: 'apercu', label: 'Game overview', level: 2 },
  { id: 'avis', label: 'Our full review', level: 2 },
  { id: 'fonctionnalites', label: 'Features', level: 3 },
  { id: 'strategie', label: 'Strategy & tips', level: 2 },
  { id: 'casinos', label: 'Best casinos', level: 2 },
  { id: 'alternatives', label: 'Alternative games', level: 2 },
  { id: 'faq', label: 'FAQ', level: 2 },
]

export default async function FicheJeuPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>
}) {
  const { locale, category, slug } = await params
  const game = gameBySlug.get(slug)
  if (!game || game.category !== category) notFound()

  const cat = categories.find((c) => c.slug === (category as GameCategory))
  const isFr = locale === 'fr'
  const catLabel = isFr ? (cat?.label ?? category) : (cat?.labelEn ?? category)

  const casinos = TOP_10.slice(0, 5)

  // Alternative games: same category, different slug
  const altGames = games.filter((g) => g.category === category && g.slug !== slug).slice(0, 3)

  const tocItems = isFr ? TOC_ITEMS_FR : TOC_ITEMS_EN
  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isFr
      ? `${game.name} — Avis complet, RTP ${game.rtp.toFixed(2)}% & où jouer (2026)`
      : `${game.name} — Full Review, RTP ${game.rtp.toFixed(2)}% & where to play (2026)`,
    description: game.description,
    author: { '@type': 'Person', name: 'Julien Marchand' },
    publisher: { '@type': 'Organization', name: 'le-meilleur-casino-en-ligne.fr', url: BASE_URL },
    url: `${BASE_URL}${isFr ? '' : '/en'}/jeux/${game.category}/avis/${game.slug}/`,
  }
  const schemaFAQ =
    game.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: game.faq.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: { '@type': 'Answer', text: q.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />
      {schemaFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: '/jeux/' },
          { label: catLabel, href: `/jeux/${category}/` },
          { label: game.name },
        ]}
        locale={locale}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        id="apercu"
        className="py-10 [scroll-margin-top:calc(var(--header-h)+20px)]"
        data-page-type="fiche_jeu"
        data-game={slug}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
            {/* Left — main content */}
            <div>
              <div className="mb-3 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {game.provider} · {catLabel}
                {game.theme && <span className="text-ink-3">· {game.theme}</span>}
              </div>
              <h1 className="mb-4 font-serif text-[clamp(30px,4vw,46px)] font-medium leading-tight tracking-[-0.02em] text-ink">
                {isFr ? `Avis ${game.name}` : `${game.name} Review`}
              </h1>
              <p className="m-0 max-w-[60ch] text-[17px] leading-[1.6] text-ink-2">
                {game.description}
              </p>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatPill
                  label="RTP"
                  value={`${game.rtp.toFixed(2)}%`}
                  highlight={game.rtp >= 97}
                />
                <StatPill label={isFr ? 'Volatilité' : 'Volatility'} value={game.volatility} />
                <StatPill label="Max Win" value={game.maxWin} />
                <StatPill label={isFr ? 'Mise min.' : 'Min bet'} value={`${game.minBet} €`} />
              </div>
            </div>

            {/* Right — game preview card + CTA */}
            <div className="rounded-xl border border-line bg-surface-2 shadow-2">
              {game.imageUrl ? (
                <Image
                  src={game.imageUrl}
                  alt={isFr ? `Aperçu de ${game.name}` : `${game.name} preview`}
                  width={400}
                  height={300}
                  priority
                  className="w-full rounded-t-xl object-cover"
                />
              ) : (
                <div
                  className="aspect-[4/3] rounded-t-xl border-b border-line bg-bg-sunken"
                  aria-label={isFr ? `Aperçu de ${game.name}` : `${game.name} preview`}
                />
              )}
              <div className="p-5">
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                  {isFr ? `Jouer à ${game.name}` : `Play ${game.name}`}
                </p>
                <p className="mb-3 text-[13px] text-ink-2">
                  {isFr
                    ? `Disponible sur les meilleurs casinos en ligne avec bonus d'inscription.`
                    : `Available at the best online casinos with welcome bonuses.`}
                </p>
                <CTAButton
                  href={TOP_10[0]!.affiliateUrl}
                  variant="primary"
                  block
                  arrow
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={TOP_10[0]!.slug}
                  data-placement="fiche_jeu_hero_cta"
                  data-page-type="fiche_jeu"
                  data-locale={locale}
                >
                  {isFr ? `Jouer sur ${TOP_10[0]!.name}` : `Play at ${TOP_10[0]!.name}`}
                </CTAButton>
                <p className="mt-2 text-center text-[11px] text-ink-3">
                  18+ · {isFr ? 'Jeu responsable' : 'Gamble responsibly'} · {TOP_10[0]!.licence}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two-column layout: content + TOC sidebar ──────────────────── */}
      <div className="mx-auto max-w-site px-8 sm:px-[18px]">
        <div className="grid grid-cols-1 items-start gap-8 pb-16 lg:grid-cols-[1fr_260px]">
          {/* ── Main content column ──────────────────────────────────── */}
          <div className="min-w-0">
            {/* Pros / Cons */}
            <section id="avis" className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]">
              <h2 className="mb-4 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                {isFr ? `Notre avis sur ${game.name}` : `Our ${game.name} review`}
              </h2>
              <ProsConsBox pros={game.pros} cons={game.cons} locale={locale} />
            </section>

            {/* Guide — editorial paragraphs */}
            <section className="mt-8 space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              {game.guideBody.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </section>

            {/* Features deep-dive */}
            <section
              id="fonctionnalites"
              className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <h2 className="mb-4 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                {isFr ? 'Fonctionnalités détaillées' : 'Detailed features'}
              </h2>
              <ul className="space-y-3 rounded-lg border border-line bg-surface p-5 shadow-1">
                {game.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-[15px] text-ink-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-0.5 h-[16px] w-[16px] shrink-0 text-green"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              {/* Quick stats recap */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-line bg-bg-sunken p-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Mise maximale' : 'Max bet'}
                  </p>
                  <p className="font-mono text-[14px] font-semibold text-ink">{game.maxBet} €</p>
                </div>
                <div className="rounded-lg border border-line bg-bg-sunken p-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Avantage maison' : 'House edge'}
                  </p>
                  <p className="font-mono text-[14px] font-semibold text-ink">
                    {(100 - game.rtp).toFixed(2)}%
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-bg-sunken p-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.05em] text-ink-3">
                    {isFr ? 'Fournisseur' : 'Provider'}
                  </p>
                  <p className="font-mono text-[14px] font-semibold text-ink">{game.provider}</p>
                </div>
              </div>
            </section>

            {/* Strategy & tips */}
            <section
              id="strategie"
              className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]"
            >
              <h2 className="mb-4 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                {isFr ? 'Stratégie & conseils de jeu' : 'Strategy & playing tips'}
              </h2>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-1">
                <ul className="space-y-4">
                  {[
                    isFr
                      ? `Bankroll minimum recommandée : ${Math.round(200 * game.minBet)} € (200× la mise minimale de ${game.minBet} €) pour absorber la variance ${game.volatility}.`
                      : `Recommended minimum bankroll: ${Math.round(200 * game.minBet)} € (200× the minimum bet of ${game.minBet} €) to absorb ${game.volatility} variance.`,
                    isFr
                      ? `RTP de ${game.rtp.toFixed(2)} % : pour chaque 100 € misés, vous perdez statistiquement ${(100 - game.rtp).toFixed(2)} € sur le long terme.`
                      : `RTP of ${game.rtp.toFixed(2)}%: for every €100 wagered, you statistically lose €${(100 - game.rtp).toFixed(2)} in the long run.`,
                    isFr
                      ? `Volatilité ${game.volatility} — ${game.volatility === 'basse' ? 'gains fréquents et réguliers, idéal pour prolonger les sessions' : game.volatility === 'moyenne' ? 'bon équilibre entre fréquence et taille des gains' : game.volatility === 'haute' ? 'longues sécheresses possibles avant un big win' : 'sessions intensives avec risque de longues périodes sans gain significatif'}.`
                      : `${game.volatility.charAt(0).toUpperCase() + game.volatility.slice(1)} volatility — ${game.volatility === 'basse' ? 'frequent, regular wins ideal for extended sessions' : game.volatility === 'moyenne' ? 'good balance between win frequency and size' : game.volatility === 'haute' ? 'long dry spells possible before a big win' : 'intensive sessions with risk of long periods without significant gains'}.`,
                    isFr
                      ? "Jouez toujours en mode démo d'abord pour maîtriser les mécaniques avant de miser de l'argent réel."
                      : 'Always play in demo mode first to master the mechanics before wagering real money.',
                  ].map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-[14.5px] leading-[1.55] text-ink-2"
                    >
                      <span className="mt-0.5 text-[13px] font-bold text-green" aria-hidden>
                        →
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Casino recommendations */}
            <section id="casinos" className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]">
              <h2 className="mb-2 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                {isFr
                  ? `Meilleurs casinos pour jouer à ${game.name}`
                  : `Best casinos to play ${game.name}`}
              </h2>
              <p className="mb-5 text-[15px] leading-[1.6] text-ink-2">
                {isFr
                  ? `Tous les casinos ci-dessous proposent ${game.name} avec des licences reconnues, un support francophone et des bonus valables sur ce jeu.`
                  : `All casinos below offer ${game.name} with recognised licences, good support and bonuses applicable to this game.`}
              </p>
              <div className="flex flex-col gap-[14px]">
                {casinos.map((op, i) => (
                  <ListingCard
                    key={op.id}
                    operator={op}
                    isTop={i === 0}
                    ctaBonus={isFr ? 'Obtenir le bonus' : 'Get bonus'}
                    ga4={{ 'data-page-type': 'fiche_jeu', 'data-locale': locale }}
                  />
                ))}
              </div>
              <div className="mt-6 text-center">
                <CTAButton
                  href={`/jeux/${category}/`}
                  variant="secondary"
                  data-event="review_click"
                  data-placement="fiche_jeu_back_cat"
                >
                  {isFr ? `Voir tous les jeux ${catLabel}` : `See all ${catLabel} games`}
                </CTAButton>
              </div>
            </section>

            {/* Alternative games */}
            {altGames.length > 0 && (
              <section
                id="alternatives"
                className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]"
              >
                <h2 className="mb-5 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                  {isFr ? `Alternatives à ${game.name}` : `Alternatives to ${game.name}`}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {altGames.map((alt) => (
                    <Link
                      key={alt.slug}
                      href={`/jeux/${alt.category}/avis/${alt.slug}/`}
                      className="hover:border-green/30 group rounded-lg border border-line bg-surface p-5 no-underline shadow-1 transition-[transform,box-shadow] hover:-translate-y-[2px] hover:shadow-3"
                      data-event="game_click"
                      data-game={alt.slug}
                    >
                      {alt.imageUrl ? (
                        <div className="mb-3 overflow-hidden rounded">
                          <Image
                            src={alt.imageUrl}
                            alt={alt.name}
                            width={300}
                            height={200}
                            className="w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="mb-3 aspect-[3/2] rounded border border-dashed border-line-2 bg-surface-2"
                          aria-hidden
                        />
                      )}
                      <h3 className="mb-1 font-serif text-[16px] font-semibold text-ink transition-colors group-hover:text-green">
                        {alt.name}
                      </h3>
                      <p className="mb-2 text-[12px] text-ink-3">{alt.provider}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-[4px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                          RTP {alt.rtp.toFixed(2)}%
                        </span>
                        <span className="rounded-[4px] border border-line bg-bg-sunken px-2 py-[2px] font-mono text-[10px] text-ink-3">
                          Vol. {alt.volatility}
                        </span>
                      </div>
                      <p className="mt-3 text-[11.5px] font-medium text-green">
                        {isFr ? "Voir l'avis →" : 'Read review →'}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link
                    href={`/jeux/${category}/`}
                    className="text-[14px] font-medium text-green no-underline hover:underline"
                  >
                    {isFr ? `→ Tous les jeux ${catLabel}` : `→ All ${catLabel} games`}
                  </Link>
                </div>
              </section>
            )}

            {/* FAQ */}
            {game.faq.length > 0 && (
              <section id="faq" className="mt-10 [scroll-margin-top:calc(var(--header-h)+20px)]">
                <h2 className="mb-5 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
                  {isFr ? `Questions fréquentes — ${game.name}` : `FAQ — ${game.name}`}
                </h2>
                <FAQAccordion items={game.faq} />
              </section>
            )}
          </div>

          {/* ── Sticky TOC sidebar ────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)]">
              <TableOfContents items={tocItems} title={isFr ? 'Sommaire' : 'Contents'} />
              {/* Quick facts card */}
              <div className="mt-4 rounded-lg border border-line bg-surface p-4 shadow-1">
                <p className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                  {isFr ? 'Fiche rapide' : 'Quick facts'}
                </p>
                <ul className="space-y-2 text-[13px]">
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-3">RTP</span>
                    <span className="font-mono font-semibold text-ink">{game.rtp.toFixed(2)}%</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-3">{isFr ? 'Volatilité' : 'Volatility'}</span>
                    <span className="font-mono font-semibold capitalize text-ink">
                      {game.volatility}
                    </span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-3">Max Win</span>
                    <span className="font-mono font-semibold text-ink">{game.maxWin}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-3">{isFr ? 'Mise min.' : 'Min bet'}</span>
                    <span className="font-mono font-semibold text-ink">{game.minBet} €</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-ink-3">{isFr ? 'Fournisseur' : 'Provider'}</span>
                    <span className="font-semibold text-ink">{game.provider}</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <CTAButton
                    href={TOP_10[0]!.affiliateUrl}
                    variant="primary"
                    block
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-event="affiliate_click"
                    data-operator={TOP_10[0]!.slug}
                    data-placement="fiche_jeu_sidebar_cta"
                    data-page-type="fiche_jeu"
                    data-locale={locale}
                  >
                    {isFr ? 'Jouer maintenant' : 'Play now'}
                  </CTAButton>
                  <p className="mt-1 text-center text-[11px] text-ink-3">
                    18+ · {isFr ? 'Jeu responsable' : 'Gamble responsibly'}
                  </p>
                </div>
              </div>
              {/* Category link */}
              <div className="mt-3">
                <Link
                  href={`/jeux/${category}/`}
                  className="block rounded-lg border border-line bg-bg-sunken px-4 py-3 text-[13px] font-medium text-ink-2 no-underline transition-colors hover:bg-surface hover:text-green"
                >
                  ← {isFr ? `Tous les ${catLabel}` : `All ${catLabel}`}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
