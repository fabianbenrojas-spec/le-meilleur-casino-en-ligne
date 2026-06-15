import type { Metadata } from 'next'
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FAQAccordion, type FAQItem } from '@/components/ui/faq-accordion'
import { BonusFilterClient } from '@/components/bonus/bonus-filter-client'
import { CasinoMatchmaker } from '@/components/homepage/casino-matchmaker'
import { ReviewStickyBar } from '@/components/review/review-sticky-bar'
import { operators } from '@/config/operators'
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
      ? 'Meilleurs bonus casino en ligne — comparatif & guide (2026)'
      : 'Best Online Casino Bonuses — comparison & guide (2026)',
    description: isFr
      ? "Comparez les meilleurs bonus de bienvenue : montant, wager, délai, tours gratuits. Tous vérifiés et testés à l'argent réel. 18+."
      : 'Compare the best welcome bonuses: amount, wagering, deadline, free spins. All verified and tested with real money. 18+.',
    alternates: { languages: buildHreflang('/bonus/', '/bonuses/') },
  }
}

// ── Bonus type explainer card data ────────────────────────────────────────────

const bonusTypeCards = [
  {
    id: 'bienvenue',
    icon: 'M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z',
    name: 'Bonus de bienvenue',
    desc: "Offert lors du premier dépôt, c'est le bonus le plus courant. Le casino abonde votre dépôt d'un pourcentage (souvent 100 %) jusqu'à un plafond. Vérifiez le wager avant tout.",
  },
  {
    id: 'freespins',
    icon: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z',
    name: 'Tours gratuits',
    desc: "Offerts en complément du bonus ou lors d'inscriptions, les free spins sont valables sur des slots désignées. Les gains sont généralement soumis à un wager.",
  },
  {
    id: 'nodep',
    icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
    name: 'Sans dépôt',
    desc: 'Rare et précieux : quelques euros ou tours offerts sans avoir à déposer. Les conditions de mise sont souvent plus strictes (50× ou plus) et les retraits plafonnés.',
  },
  {
    id: 'cashback',
    icon: 'M9 14l-5-5 5-5M15 14l5-5-5-5',
    name: 'Cashback',
    desc: "Le casino vous rembourse un pourcentage de vos pertes nettes sur une période. Moins spectaculaire mais plus équitable : vous récupérez de l'argent réel, souvent sans wager.",
  },
]

// ── FAQ data ──────────────────────────────────────────────────────────────────

const faqItems: FAQItem[] = [
  {
    question: "Qu'est-ce qu'un wager (exigence de mise) ?",
    answer:
      'Le wager indique combien de fois vous devez jouer le montant du bonus avant de pouvoir retirer vos gains. Un wager de 35× sur un bonus de 200 € signifie que vous devez miser 7 000 € en total. Plus le wager est bas, plus le bonus est avantageux.',
  },
  {
    question: 'Comment comparer deux bonus de valeurs différentes ?',
    answer:
      "Ne comparez pas uniquement le montant affiché. Utilisez notre simulateur de mise sur les pages comparatifs pour estimer la perte statistique selon le RTP des jeux. Un bonus de 100 € avec un wager 25× peut valoir plus qu'un bonus de 500 € avec un wager 50×.",
  },
  {
    question: 'Les bonus sans dépôt valent-ils vraiment le coup ?',
    answer:
      'Rarement en termes purement financiers, car les wagers sont très élevés (50–100×) et les montants retirables plafonnés (souvent 50 €). Leur intérêt : tester le casino sans risquer votre argent.',
  },
  {
    question: 'Puis-je retirer mon bonus directement ?',
    answer:
      "Non — le bonus lui-même n'est généralement pas retirable. Seuls les gains générés après avoir satisfait l'exigence de mise (wager) peuvent être retirés. Certains casinos ajoutent une limite de retrait maximale sur les gains bonus.",
  },
  {
    question: "Qu'est-ce que la mise maximale autorisée pendant le wager ?",
    answer:
      "Pendant que vous dégagez un bonus, la plupart des casinos imposent une mise par tour ou par main (souvent 5 €). Dépasser cette limite peut entraîner l'annulation du bonus et de vos gains associés. Lisez les conditions générales avant de jouer.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BonusHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  // Default sort: by rating (best overall) — client will allow re-sorting
  const byRating = [...operators].sort((a, b) => b.rating - a.rating)
  const topOp = byRating[0]!

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Bonus Casino' : 'Casino Bonuses' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pb-4 pt-[36px]" data-page-type="bonus_hub" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="xl:grid xl:grid-cols-[1fr_minmax(340px,400px)] xl:items-start xl:gap-12">
            {/* Left: editorial intro */}
            <div>
              <div className="mb-[14px] inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
                {isFr ? 'Bonus vérifiés · 2026' : 'Verified bonuses · 2026'}
              </div>
              <h1 className="mb-[14px] max-w-[18ch] font-serif text-[clamp(31px,4.6vw,50px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
                {isFr ? (
                  <>
                    Meilleurs <em className="italic text-green">bonus casino</em> en ligne
                  </>
                ) : (
                  <>
                    Best <em className="italic text-green">casino bonuses</em> online
                  </>
                )}
              </h1>
              <p className="m-0 max-w-[60ch] text-[17.5px] leading-[1.6] text-ink-2">
                {isFr
                  ? 'Tous les bonus listés ont été vérifiés : montant réel, conditions de mise, délai de validité. Notre simulateur compare le coût statistique réel de chaque offre.'
                  : 'All bonuses listed have been verified: real amount, wagering conditions, validity period. Our simulator compares the real statistical cost of each offer.'}
              </p>
              {/* sentinel for sticky bar */}
              <div data-sticky-sentinel aria-hidden />
            </div>

            {/* Right: matchmaker widget */}
            <div className="mt-[26px] xl:mt-0">
              <CasinoMatchmaker defaultMode="bonus" pageType="bonus_hub" locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* ── Bonus list ───────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-[20px] flex items-baseline gap-3">
            <h2 className="m-0 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Comparer les bonus' : 'Compare bonuses'}
            </h2>
          </div>
          <BonusFilterClient operators={byRating} locale={locale} />
        </div>
      </section>

      {/* ── Long-form editorial ──────────────────────────────────────────── */}
      <section className="bg-bg-sunken py-14">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="max-w-[760px]">
            {/* Section header */}
            <h2 className="mb-[14px] font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Comprendre les types de bonus' : 'Understanding bonus types'}
            </h2>
            <p className="mb-[20px] text-[16px] leading-[1.72] text-ink-2">
              {isFr
                ? 'Tous les bonus ne se valent pas. Avant de réclamer une offre, identifiez son type pour évaluer rapidement si elle correspond à votre façon de jouer.'
                : 'Not all bonuses are equal. Before claiming an offer, identify its type to quickly assess if it matches your play style.'}
            </p>

            {/* Bonus type cards grid */}
            <div className="mb-[28px] grid grid-cols-1 gap-[14px] sm:grid-cols-2">
              {bonusTypeCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[14px] border border-line bg-surface p-[20px] shadow-1"
                >
                  <div className="mb-[9px] flex items-center gap-[11px]">
                    <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] bg-green-50 text-green">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-[19px] w-[19px]"
                        aria-hidden
                      >
                        <path d={card.icon} />
                      </svg>
                    </div>
                    <span className="font-serif text-[17px] font-semibold text-ink">
                      {card.name}
                    </span>
                  </div>
                  <p className="m-0 text-[13.5px] leading-[1.55] text-ink-2">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* How to choose */}
            <h2 className="mb-[14px] font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Comment choisir son bonus ?' : 'How to choose your bonus?'}
            </h2>
            <p className="mb-[14px] text-[16px] leading-[1.72] text-ink-2">
              {isFr
                ? "Un gros bonus avec un wager élevé peut coûter plus cher statistiquement qu'un bonus modeste avec des conditions légères. Voici les quatre points à vérifier systématiquement :"
                : 'A large bonus with high wagering can cost more statistically than a modest bonus with light conditions. Here are the four points to check systematically:'}
            </p>
            <ul className="mb-[20px] flex list-none flex-col gap-[10px] p-0">
              {(isFr
                ? [
                    'Wager (mise de dégagement) : combien de fois vous devez jouer le bonus avant de retirer. Notre simulateur versus calcule le coût réel.',
                    'Mise maximale autorisée pendant le wager : généralement 5 €/tour — dépasser annule le bonus et vos gains.',
                    'Jeux éligibles : certains slots à fort jackpot ou jeux de table sont exclus, voire comptent à 10–20 % du wager.',
                    'Délai de validité : en général 30 jours pour satisfaire toutes les conditions. Passé ce délai, bonus et gains sont perdus.',
                  ]
                : [
                    'Wagering requirement: how many times you must play the bonus before withdrawing. Our simulator calculates the real cost.',
                    'Maximum bet during wagering: usually €5/spin — exceeding it cancels the bonus and any winnings.',
                    'Eligible games: some high-jackpot slots or table games are excluded or count at only 10–20% of wagering.',
                    'Validity period: usually 30 days to meet all conditions. After that, bonus and winnings are forfeit.',
                  ]
              ).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[11px] text-[15px] leading-[1.5] text-ink-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="mt-[2px] h-[17px] w-[17px] shrink-0 text-green"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-[16px] leading-[1.72] text-ink-2">
              {isFr ? 'Utilisez nos pages comparatifs (ex : ' : 'Use our comparison pages (e.g. '}
              <a
                href="/comparatifs/cresus-vs-lucky8/"
                className="font-semibold text-green no-underline"
                style={{
                  borderBottom: '1px solid color-mix(in srgb,var(--green) 35%,transparent)',
                }}
                data-event="internal_link"
                data-placement="bonus_content_ilink"
                data-page-type="bonus_hub"
                data-locale={locale}
              >
                {isFr ? 'Crésus vs Lucky8' : 'Cresus vs Lucky8'}
              </a>
              {isFr
                ? ") pour comparer le wager et l'RTP côte à côte."
                : ') to compare wagering and RTP side by side.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-[18px] font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
          </h2>
          <FAQAccordion items={faqItems} includeSchema className="max-w-[760px]" />
        </div>
      </section>

      {/* ── Sticky bar ───────────────────────────────────────────────────── */}
      <ReviewStickyBar
        operatorName={topOp.name}
        operatorSlug={topOp.slug}
        rating={topOp.rating}
        bonusAmount={topOp.bonusAmount}
        bonusSuffix={topOp.bonusSuffix}
        bonusConditions={topOp.bonusConditions}
        bonusSlug={topOp.bonusSlug}
        affiliateUrl={topOp.affiliateUrl}
        locale={locale}
        pageType="bonus_hub"
        placement="bonus_sticky_bar"
        showAlt={false}
      />
    </>
  )
}
