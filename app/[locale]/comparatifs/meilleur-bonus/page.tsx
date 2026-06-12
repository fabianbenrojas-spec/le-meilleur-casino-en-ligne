import type { Metadata } from 'next'
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ListingPageClient } from '@/components/listing/listing-page-client'
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
      ? 'Meilleur Bonus Casino en ligne France 2026 — Comparatif Wager'
      : 'Best Casino Bonus France 2026 — Wagering Comparison',
    description: isFr
      ? 'Comparatif des meilleurs bonus de casino en ligne en France 2026 : montant, wager, tours gratuits, conditions détaillées. Filtrez par montant et wager maximum. 18+'
      : 'Comparison of the best online casino bonuses in France 2026: amount, wagering, free spins, detailed conditions. Filter by amount and max wagering. 18+',
    alternates: { languages: buildHreflang('/comparatifs/meilleur-bonus/') },
  }
}

const FAQ_FR = [
  {
    question: 'Comment comparer objectivement deux bonus casino ?',
    answer:
      "La formule est : Valeur attendue = Montant bonus × (1 - Wager × (1 - RTP moyen)). Pour un RTP de 96% et un wager de 35×, la valeur attendue est de : Bonus × (1 - 35 × 0.04) = Bonus × -0.4. C'est négatif, comme tous les bonus casino. Mais un bonus de 500€ wager 20× est bien supérieur à un bonus de 2000€ wager 60×. Plus le wager est bas, plus la conversion en gains réels est probable.",
  },
  {
    question: "Un bonus de 100% jusqu'à 500€ signifie-t-il que je reçois 500€ gratuitement ?",
    answer:
      "Pas exactement. Si vous déposez 500€, vous recevez 500€ de bonus supplémentaires (votre dépôt est doublé). Mais ces 500€ bonus ne sont pas de l'argent réel — ils doivent être misés un certain nombre de fois (le wager) avant de pouvoir être retirés. Si le wager est de 35×, vous devez miser 500 × 35 = 17 500€ avant tout retrait des gains issus du bonus.",
  },
  {
    question: "Qu'est-ce que le 'bonus balance' dans un casino ?",
    answer:
      "Certains casinos séparent votre solde en 'solde réel' et 'solde bonus'. Les mises sont généralement prélevées d'abord sur le solde réel, puis sur le solde bonus. Cela signifie que vous pouvez perdre tout votre dépôt réel avant même d'avoir touché au bonus. Certains casinos font l'inverse (solde bonus d'abord). Lisez les CGU pour comprendre l'ordre de prélèvement — c'est crucial pour votre stratégie.",
  },
  {
    question: 'Quels jeux contribuent à 100% au wager du bonus ?',
    answer:
      "Les machines à sous (slots) contribuent généralement à 100% du wager. Les jeux de table (blackjack, roulette) contribuent typiquement à 10-20%. Le casino live contribue souvent à 10% ou 0%. Les jeux à jackpots progressifs peuvent être exclus. Si vous voulez écouler un wager rapidement, jouez aux machines à sous — c'est mathématiquement le seul choix efficace.",
  },
  {
    question: 'Y a-t-il des bonus casino sans conditions de mise ?',
    answer:
      'Oui mais ils sont rares et les montants sont modestes. Les casinos No Wagering offrent généralement des tours gratuits sans wager sur des gains limités (souvent 50€-100€ de gains maximum). Des opérateurs comme Casumo ou certaines offres LeoVegas proposent des tours sans wager à certaines périodes. Ces offres valent souvent plus que de gros bonus avec wager élevé.',
  },
  {
    question: "Que se passe-t-il si le bonus expire avant d'avoir soldé le wager ?",
    answer:
      "Le bonus est annulé et les gains générés par le bonus sont confisqués. Votre solde réel est préservé. C'est pourquoi la durée de validité (généralement 7 à 30 jours) est aussi importante que le wager lui-même. Avant d'activer un bonus, vérifiez que vous pouvez raisonnablement jouer suffisamment dans le délai imparti. Un bonus non soldé n'est pas une perte — vous n'avez juste pas reçu la valeur promise.",
  },
]

const FAQ_EN = [
  {
    question: 'How do you objectively compare two casino bonuses?',
    answer:
      'The formula is: Expected value = Bonus amount × (1 − Wager × (1 − Average RTP)). With 96% RTP and 35× wager: EV = Bonus × (1 − 35 × 0.04) = Bonus × −0.4. That is negative, like all casino bonuses. But a €500 bonus at 20× wager is far superior to a €2,000 bonus at 60× wager. The lower the wager, the more likely conversion into real winnings.',
  },
  {
    question: 'Does a 100% up to €500 bonus mean I receive €500 for free?',
    answer:
      'Not exactly. If you deposit €500, you receive an extra €500 bonus (your deposit is doubled). But this €500 bonus is not real money — it must be wagered a certain number of times before you can withdraw winnings. With a 35× wager, you must bet 500 × 35 = €17,500 before withdrawing any bonus-derived winnings.',
  },
  {
    question: "What is the 'bonus balance' in a casino?",
    answer:
      "Some casinos split your balance into a 'real balance' and a 'bonus balance'. Bets are generally deducted first from the real balance, then from the bonus balance. This means you can lose your entire real deposit before even touching the bonus. Some casinos do the reverse. Read the T&Cs to understand the deduction order — it is crucial for your strategy.",
  },
  {
    question: 'Which games contribute 100% to a bonus wager?',
    answer:
      'Slot machines generally contribute 100% to the wager. Table games (blackjack, roulette) typically contribute 10–20%. Live casino often contributes 10% or 0%. Progressive jackpot games may be excluded. If you want to clear a wager quickly, play slots — it is the only mathematically efficient choice.',
  },
  {
    question: 'Are there casino bonuses with no wagering requirements?',
    answer:
      'Yes, but they are rare and the amounts are modest. No-wagering casinos generally offer free spins without a wager on limited winnings (often €50–€100 maximum). Operators like Casumo or certain LeoVegas offers provide no-wager spins at certain times. These offers are often worth more than large bonuses with high wagers.',
  },
  {
    question: 'What happens if a bonus expires before the wager is cleared?',
    answer:
      'The bonus is cancelled and any winnings generated by the bonus are forfeited. Your real balance is preserved. That is why the validity period (usually 7 to 30 days) is as important as the wager itself. Before activating a bonus, check that you can reasonably play enough within the time allowed.',
  },
]

export default async function MeilleurBonusPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const byBonus = [...operators].sort((a, b) => b.bonusAmountNumber - a.bonusAmountNumber)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
          { label: isFr ? 'Meilleur Bonus' : 'Best Bonus' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="meilleur_bonus" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Montant · Wager · Tours gratuits · 2026'
              : 'Amount · Wagering · Free spins · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comparatif <em className="not-italic text-green">meilleur bonus</em> casino
              </>
            ) : (
              <>
                Best casino <em className="not-italic text-green">bonus</em> comparison
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Un gros bonus avec un wager de 60× vaut moins qu'un petit bonus avec wager de 20×. Filtrez par montant et wager maximum pour trouver la vraie valeur."
              : 'A big bonus with 60× wagering is worth less than a small bonus at 20×. Filter by amount and max wagering to find real value.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={byBonus}
        configKey="meilleur_bonus"
        pageType="meilleur_bonus"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'La vérité sur les bonus casino en 2026'
              : 'The truth about casino bonuses in 2026'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Les bonus casino sont conçus pour attirer les joueurs, pas pour les enrichir.
                Derrière les chiffres attractifs (500€, 1000€, 5000€), la réalité mathématique est
                implacable : la valeur espérée d&apos;un bonus est toujours négative pour le joueur.
                Cela ne veut pas dire qu&apos;ils n&apos;ont aucune valeur — ils prolongent votre
                session de jeu et vous donnent plus de chances de gagner — mais il ne faut pas les
                surestimer.
              </p>
              <p>
                Le critère le plus important pour évaluer un bonus n&apos;est pas son montant mais
                son <strong className="text-ink">wager</strong>. Un wager de 20× signifie que pour
                un bonus de 100€, vous devez miser 2000€. Avec un RTP moyen de 96% sur les slots,
                vous perdrez statistiquement 80€ (4% × 2000€) avant de pouvoir retirer. Votre gain
                net est donc de 20€ si vous réussissez à solder le wager — ce qui n&apos;arrive pas
                toujours dans la période de validité.
              </p>
              <p>
                Notre recommandation : privilégiez les bonus avec wager inférieur ou égal à 30×, une
                durée de validité d&apos;au moins 14 jours, et des jeux à haut RTP éligibles. Les
                tours gratuits sans wager sont les plus précieux même pour des petits montants — un
                gain de 30€ directement encaissable vaut plus qu&apos;un bonus de 200€ wager 40× que
                vous ne convertirez jamais.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Casino bonuses are designed to attract players, not to enrich them. Behind the
                attractive figures (€500, €1,000, €5,000), the mathematical reality is unforgiving:
                the expected value of a bonus is always negative for the player. This does not mean
                they have no value — they extend your gaming session and give you more chances to
                win — but they should not be overestimated.
              </p>
              <p>
                The most important criterion for evaluating a bonus is not its amount but its{' '}
                <strong className="text-ink">wagering requirement</strong>. A 20× wager means that
                for a €100 bonus, you must bet €2,000. With an average RTP of 96% on slots, you will
                statistically lose €80 (4% × €2,000) before being able to withdraw. Your net gain is
                therefore €20 if you manage to clear the wager — which does not always happen within
                the validity period.
              </p>
              <p>
                Our recommendation: favour bonuses with wagering of 30× or less, a validity period
                of at least 14 days, and high-RTP eligible games. No-wager free spins are the most
                valuable even for small amounts — a directly cashable €30 win is worth more than a
                €200 bonus at 40× wagering that you may never convert.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Meilleur bonus casino' : 'FAQ — Best casino bonus'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
