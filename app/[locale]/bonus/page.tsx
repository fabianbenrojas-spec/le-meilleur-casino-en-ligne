import type { Metadata } from 'next'
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { ListingCard } from '@/components/ui/operator-card'
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

export default async function BonusHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  // Sort by bonus amount descending for this page
  const byBonus = [...operators].sort((a, b) => b.bonusAmountNumber - a.bonusAmountNumber)
  // Also show best value (balance of amount + low wager)
  const byRating = [...operators].sort((a, b) => b.rating - a.rating).slice(0, 3)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Bonus Casino' : 'Casino Bonuses' },
        ]}
      />

      <section className="pb-2 pt-10" data-page-type="bonus_hub" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Bonus vérifiés · 2026' : 'Verified bonuses · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
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
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Tous les bonus listés ont été vérifiés par notre équipe : montant réel, conditions de mise, délai de validité. Aucun partenariat n'influence notre sélection."
              : 'All bonuses listed have been verified by our team: real amount, wagering conditions, validity period. No partnership influences our selection.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* Best value picks */}
      <section className="py-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Notre sélection — meilleur rapport qualité/conditions'
              : 'Our selection — best value for conditions'}
          </h2>
          <p className="mb-6 text-[15px] text-ink-2">
            {isFr
              ? "Un gros bonus avec un wager de 50× vaut moins qu'un bonus moyen avec un wager de 30×. Notre classement tient compte des conditions réelles."
              : 'A big bonus with 50× wagering is worth less than a moderate bonus with 30× wagering. Our ranking accounts for real conditions.'}
          </p>
          <div className="flex flex-col gap-[14px]">
            {byRating.map((op, i) => (
              <ListingCard
                key={op.id}
                operator={op}
                isTop={i === 0}
                ga4={{ 'data-page-type': 'bonus_hub', 'data-locale': locale }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full list sorted by bonus amount */}
      <section className="bg-bg-sunken py-10">
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <h2 className="mb-2 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Tous les bonus — triés par montant' : 'All bonuses — sorted by amount'}
          </h2>
          <p className="mb-6 text-[15px] text-ink-2">
            {isFr
              ? 'Le montant le plus élevé ne signifie pas le meilleur bonus — lisez toujours les conditions.'
              : 'The highest amount does not mean the best bonus — always read the terms.'}
          </p>
          <div className="flex flex-col gap-[14px]">
            {byBonus.map((op) => (
              <ListingCard
                key={op.id}
                operator={op}
                isTop={false}
                ga4={{ 'data-page-type': 'bonus_hub', 'data-locale': locale }}
              />
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-line bg-surface p-6 text-[13px] text-ink-2">
            <p className="mb-2 font-bold text-ink">
              {isFr ? 'Comment lire les conditions de bonus' : 'How to read bonus terms'}
            </p>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {isFr
                ? [
                    'Wager (mise de dégagement) : combien de fois vous devez jouer le montant du bonus avant de retirer.',
                    'Mise maximale autorisée pendant le wager : généralement 5 €/tour — dépasser cette limite annule le bonus.',
                    'Jeux éligibles : certains jeux sont exclus du wager (souvent les slots à fort jackpot).',
                    'Délai de validité : en général 30 jours pour satisfaire les conditions.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-green">→</span> {item}
                    </li>
                  ))
                : [
                    'Wagering requirement: how many times you must play the bonus before withdrawing.',
                    'Maximum bet during wagering: usually €5/spin — exceeding cancels the bonus.',
                    'Eligible games: some games are excluded (often high-jackpot slots).',
                    'Validity period: usually 30 days to meet conditions.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-green">→</span> {item}
                    </li>
                  ))}
            </ul>
            <div className="mt-4">
              <CTAButton
                href="/guides/bonus-casino/"
                variant="secondary"
                size="sm"
                data-event="guide_click"
                data-guide="bonus-casino"
              >
                {isFr
                  ? 'Lire notre guide complet sur les bonus →'
                  : 'Read our complete bonus guide →'}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
