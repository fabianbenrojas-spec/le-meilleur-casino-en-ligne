import type { ReactNode } from 'react'
import type { Metadata } from 'next'
export const revalidate = 3600
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { cn } from '@/lib/utils'
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
      ? `${game.name} — Avis, RTP & où jouer (2026)`
      : `${game.name} — Review, RTP & where to play (2026)`,
    description: isFr
      ? `Avis ${game.name} de ${game.provider} : RTP ${game.rtp.toFixed(2)}%, volatilité ${game.volatility}, max win ${game.maxWin}. Nos casinos recommandés pour y jouer.`
      : `${game.name} by ${game.provider} review: RTP ${game.rtp.toFixed(2)}%, volatility ${game.volatility}, max win ${game.maxWin}. Our recommended casinos.`,
    alternates: {
      languages: buildHreflang(`/jeux/${game.category}/avis/${slug}/`),
    },
  }
}

function volLevel(v: string): number {
  return ({ basse: 1, moyenne: 2, haute: 4, 'très haute': 5 } as Record<string, number>)[v] ?? 3
}

function volLabel(v: string, isFr: boolean): string {
  const fr: Record<string, string> = {
    basse: 'Basse',
    moyenne: 'Moyenne',
    haute: 'Élevée',
    'très haute': 'Très élevée',
  }
  const en: Record<string, string> = {
    basse: 'Low',
    moyenne: 'Medium',
    haute: 'High',
    'très haute': 'Very High',
  }
  return (isFr ? fr : en)[v] ?? v
}

function VolDots({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-[3px] align-middle">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`block h-[7px] w-[7px] rounded-full not-italic ${i <= level ? 'bg-gold' : 'bg-line-2'}`}
        />
      ))}
    </span>
  )
}

function SpecRow({
  label,
  value,
  isLast = false,
}: {
  label: string
  value: ReactNode
  isLast?: boolean
}) {
  return (
    <tr>
      <td
        className={cn(
          'w-[42%] bg-surface-2 px-[18px] py-3 text-[14.5px] font-semibold text-ink',
          !isLast && 'border-b border-line'
        )}
      >
        {label}
      </td>
      <td
        className={cn('px-[18px] py-3 text-[14.5px] text-ink-2', !isLast && 'border-b border-line')}
      >
        {value}
      </td>
    </tr>
  )
}

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

  const casinos = TOP_10.slice(0, 3)
  const mainCasino = TOP_10[0]!
  const vLevel = volLevel(game.volatility)
  const vLabel = volLabel(game.volatility, isFr)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Jeux' : 'Games', href: '/jeux/' },
          { label: catLabel, href: `/jeux/${category}/` },
          { label: game.name },
        ]}
      />

      {/* GAME HERO */}
      <section
        className="pb-[10px] pt-[30px]"
        data-page-type="game"
        data-game={slug}
        data-locale={locale}
      >
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="grid grid-cols-1 items-start gap-[22px] md:grid-cols-[380px_1fr] md:gap-[36px]">
            {/* Left: game screenshot — 3:4 aspect ratio */}
            <div
              className="relative mx-auto max-w-[280px] overflow-hidden rounded-lg border border-line shadow-2 md:mx-0 md:max-w-none"
              style={{
                aspectRatio: '3/4',
                background:
                  'repeating-linear-gradient(135deg,var(--bg-sunken),var(--bg-sunken) 11px,var(--surface-2) 11px,var(--surface-2) 22px)',
              }}
              aria-label={isFr ? `Aperçu de ${game.name}` : `${game.name} preview`}
            >
              <span className="absolute left-3 top-3 rounded-sm border border-line bg-surface px-[9px] py-1 font-mono text-[10px] text-ink-2">
                {game.provider}
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <span className="rounded-[5px] border border-line bg-surface px-[9px] py-1 font-mono text-[11px] text-ink-3">
                  screenshot · {game.name} · 3:4
                </span>
              </div>
            </div>

            {/* Right: info */}
            <div>
              <h1 className="mb-[6px] font-serif text-[clamp(30px,4vw,44px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
                {game.name}
              </h1>
              <p className="mb-[18px] text-[14px] text-ink-3">
                {catLabel} · {isFr ? 'par' : 'by'}{' '}
                <strong className="text-ink-2">{game.provider}</strong>
              </p>

              {/* Stats — 3 columns: RTP | Volatilité | Gain max */}
              <div className="mb-[22px] grid grid-cols-3 gap-3">
                <div className="rounded border border-line bg-surface p-[14px_16px] shadow-1">
                  <div className="mb-[5px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
                    RTP
                  </div>
                  <div className="font-serif text-[24px] font-semibold leading-none text-green">
                    {game.rtp.toFixed(1).replace('.', ',')} %
                  </div>
                </div>

                <div className="rounded border border-line bg-surface p-[14px_16px] shadow-1">
                  <div className="mb-[5px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
                    {isFr ? 'Volatilité' : 'Volatility'}
                  </div>
                  <div className="flex items-center gap-2 font-serif text-[16px] font-semibold leading-none text-ink">
                    {vLabel} <VolDots level={vLevel} />
                  </div>
                </div>

                <div className="rounded border border-line bg-surface p-[14px_16px] shadow-1">
                  <div className="mb-[5px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
                    {isFr ? 'Gain max' : 'Max win'}
                  </div>
                  <div className="font-serif text-[24px] font-semibold leading-none text-ink">
                    {game.maxWin}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <CTAButton
                  href="#demo"
                  variant="secondary"
                  className="min-w-[200px] flex-1"
                  data-event="game_demo_click"
                  data-placement="game_hero"
                  data-page-type="game"
                  data-locale={locale}
                >
                  {isFr ? 'Jouer gratuitement (démo)' : 'Play for free (demo)'}
                </CTAButton>
                <CTAButton
                  href={mainCasino.affiliateUrl}
                  variant="primary"
                  arrow
                  className="min-w-[200px] flex-1"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={mainCasino.slug}
                  data-placement="game_hero_real"
                  data-bonus={mainCasino.bonusSlug}
                  data-page-type="game"
                  data-locale={locale}
                >
                  {isFr
                    ? `Jouer en argent réel sur ${mainCasino.name}`
                    : `Play for real at ${mainCasino.name}`}
                </CTAButton>
              </div>

              <p className="mt-[14px] text-[12px] leading-[1.5] text-ink-3">
                {isFr ? (
                  <>
                    Le mode démo permet de tester le jeu avec de l&apos;argent fictif. Les gains en
                    démo ne sont pas réels.{' '}
                    <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                      Jeu responsable →
                    </a>
                  </>
                ) : (
                  <>
                    Demo mode lets you try the game with virtual money. Demo winnings are not real.{' '}
                    <a href={`/${locale}/jeu-responsable/`} className="text-green hover:underline">
                      Responsible gambling →
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content — max-width 880px */}
      <div className="mx-auto max-w-[880px] px-[18px] md:px-8">
        {/* Description */}
        <section className="py-[14px]">
          <h2 className="mb-[14px] mt-[22px] font-serif text-[26px] font-medium tracking-[-0.015em] text-ink">
            {isFr ? `${game.name}, c'est quoi ?` : `What is ${game.name}?`}
          </h2>
          <p className="mb-[14px] max-w-[70ch] text-[16px] leading-[1.68] text-ink-2">
            {game.description}
          </p>
        </section>

        {/* Technical specifications */}
        <section className="py-[14px]">
          <h2 className="mb-[14px] mt-[22px] font-serif text-[26px] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Caractéristiques techniques' : 'Technical specifications'}
          </h2>
          <table
            className="w-full overflow-hidden rounded-lg border border-line bg-surface shadow-1"
            style={{ borderCollapse: 'separate', borderSpacing: 0 }}
          >
            <tbody>
              <SpecRow label={isFr ? 'Fournisseur' : 'Provider'} value={game.provider} />
              <SpecRow label={isFr ? 'Catégorie' : 'Category'} value={catLabel} />
              <SpecRow
                label="RTP"
                value={
                  <span className="font-mono">
                    {game.rtp.toFixed(2).replace('.', ',')} %{' '}
                    <span className="text-ink-3">{isFr ? '(version standard)' : '(standard)'}</span>
                  </span>
                }
              />
              <SpecRow
                label={isFr ? 'Volatilité' : 'Volatility'}
                value={`${vLabel} (${vLevel}/5)`}
              />
              <SpecRow
                label={isFr ? 'Gain maximum' : 'Max win'}
                value={`${game.maxWin} ${isFr ? 'la mise' : 'the bet'}`}
              />
              <SpecRow
                label={isFr ? 'Mise min. / max.' : 'Min / max bet'}
                value={`${game.minBet} € / ${game.maxBet} €`}
              />
              <SpecRow
                label={isFr ? 'Compatibilité' : 'Compatibility'}
                value={isFr ? 'Desktop, mobile, tablette' : 'Desktop, mobile, tablet'}
                isLast
              />
            </tbody>
          </table>
        </section>

        {/* Bonus features */}
        <section className="py-[14px]">
          <h2 className="mb-[14px] mt-[22px] font-serif text-[26px] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Fonctionnalités bonus' : 'Bonus features'}
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
            {game.features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-[11px] rounded border border-line bg-surface p-[13px_15px] text-[14.5px] leading-[1.45] text-ink-2 shadow-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-[17px] w-[17px] shrink-0 text-green"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Verdict */}
        <section className="py-[14px]">
          <h2 className="mb-[14px] mt-[22px] font-serif text-[26px] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Notre avis' : 'Our verdict'}
          </h2>
          <div
            className="rounded-lg border border-line bg-surface p-[22px_24px] shadow-1"
            style={{ borderLeft: '4px solid var(--green)' }}
          >
            <p className="m-0 font-serif text-[17px] leading-[1.6] text-ink">
              {isFr
                ? `${game.name} est un jeu ${game.popular ? 'populaire' : 'solide'} de ${game.provider}. Avec un RTP de ${game.rtp.toFixed(1).replace('.', ',')} % et une volatilité ${vLabel.toLowerCase()}, il offre un potentiel de gain max de ${game.maxWin}. Un titre à tester — à jouer avec modération.`
                : `${game.name} is a ${game.popular ? 'popular' : 'solid'} game from ${game.provider}. With a ${game.rtp.toFixed(1)}% RTP and ${vLabel.toLowerCase()} volatility, max win reaches ${game.maxWin}. Worth a try — play responsibly.`}
            </p>
          </div>
        </section>

        {/* Where to play */}
        <section className="pb-16 pt-[14px]">
          <h2 className="mb-[14px] mt-[22px] font-serif text-[26px] font-medium tracking-[-0.015em] text-ink">
            {isFr ? `Où jouer à ${game.name} ?` : `Where to play ${game.name}?`}
          </h2>
          <p className="mb-[18px] max-w-[70ch] text-[16px] leading-[1.68] text-ink-2">
            {isFr
              ? `${game.name} est disponible chez la plupart des casinos que nous recommandons. Voici les 3 meilleurs pour y jouer en argent réel, avec leur bonus de bienvenue.`
              : `${game.name} is available at most of our recommended casinos. Here are the top 3 to play for real money, with their welcome bonuses.`}
          </p>
          <div className="grid grid-cols-1 gap-[14px] md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {casinos.map((op, i) => (
              <div
                key={op.id}
                className={`flex items-center gap-[14px] rounded-lg border bg-surface p-[16px_18px] shadow-1 transition-shadow hover:shadow-3 ${
                  i === 0
                    ? 'border-[color-mix(in_srgb,var(--gold)_36%,var(--line))]'
                    : 'border-line'
                }`}
              >
                {/* Logo placeholder */}
                <div className="grid h-9 w-[92px] shrink-0 place-items-center rounded border border-dashed border-line-2 bg-bg-sunken font-mono text-[10px] text-ink-3">
                  {op.name}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[17px] font-semibold text-ink">{op.name}</div>
                  <div className="text-[12px] text-ink-2">
                    {isFr ? 'Bonus' : 'Bonus'}{' '}
                    <strong className="text-green">
                      {op.bonusAmount}
                      {op.bonusSuffix ? ` ${op.bonusSuffix}` : ''}
                    </strong>
                  </div>
                </div>
                <CTAButton
                  href={op.affiliateUrl}
                  variant="primary"
                  size="sm"
                  arrow
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-event="affiliate_click"
                  data-operator={op.slug}
                  data-placement="game_where_to_play"
                  data-bonus={op.bonusSlug}
                  data-page-type="game"
                  data-locale={locale}
                >
                  {isFr ? 'Jouer' : 'Play'}
                </CTAButton>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
