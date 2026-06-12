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
      ? 'Nouveaux Casinos en ligne France 2026 — Meilleures Offres de Bienvenue'
      : 'New Online Casinos France 2026 — Best Welcome Offers',
    description: isFr
      ? 'Les nouveaux casinos en ligne les plus généreux en France 2026 : bonus de bienvenue élevés, tours gratuits et conditions de mise détaillées. Testés. 18+'
      : 'Most generous new online casinos in France 2026: high welcome bonuses, free spins and detailed wagering conditions. Tested. 18+',
    alternates: { languages: buildHreflang('/casinos/nouveaux/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un bonus de bienvenue dans un casino en ligne ?",
    answer:
      "Un bonus de bienvenue est une offre promotionnelle réservée aux nouveaux joueurs lors de leur premier dépôt (parfois 2e, 3e et 4e dépôts). Il prend généralement la forme d'un pourcentage de votre dépôt (ex : 100% jusqu'à 500€) et/ou de tours gratuits sur certaines machines à sous. Un bonus de 200% jusqu'à 1000€ signifie que si vous déposez 500€, vous recevez 1000€ bonus supplémentaires.",
  },
  {
    question: 'Que signifie un wager de 35× sur un bonus casino ?',
    answer:
      "Le wager est le nombre de fois que vous devez miser le montant du bonus avant de pouvoir retirer vos gains. Un wager de 35× sur un bonus de 100€ signifie que vous devez miser 3500€ au total avant tout retrait. Vérifiez toujours si le wager s'applique uniquement au bonus ou à la somme dépôt + bonus — la différence est significative.",
  },
  {
    question: 'Les nouveaux casinos sont-ils moins fiables que les anciens ?',
    answer:
      "Pas nécessairement. De nombreux nouveaux casinos sont lancés par des groupes établis (Aspire Global, SoftSwiss) avec une infrastructure éprouvée. En revanche, un casino sans historique de paiements vérifiable mérite plus de prudence. Notre conseil : attendez 6 à 12 mois avant de faire un gros retrait sur un nouveau casino sans réputation établie, ou vérifiez la réputation du groupe d'exploitation.",
  },
  {
    question: "Peut-on vraiment gagner de l'argent avec les bonus casino ?",
    answer:
      "Théoriquement oui, pratiquement c'est très difficile. Les conditions de mise sont conçues pour que la grande majorité des bonus ne soient jamais convertis en cash. La valeur espérée d'un bonus est toujours négative pour le joueur. Les bonus sont utiles pour prolonger votre session de jeu et découvrir le catalogue, pas pour vous enrichir.",
  },
  {
    question: "Comment lire les conditions d'un bonus casino ?",
    answer:
      "Points clés : (1) Wager — cherchez 'exigence de mise'. (2) Jeux contribuant au wager — les slots comptent généralement à 100%, le blackjack à 10-20% seulement. (3) Validité — généralement 7 à 30 jours. (4) Gains maximum — certains casinos plafonnent les gains des tours gratuits à 20€-100€. (5) Montant minimum de retrait — souvent 20€ ou 30€.",
  },
  {
    question: 'Peut-on cumuler plusieurs bonus dans le même casino ?',
    answer:
      "Généralement non, les casinos n'autorisent qu'un bonus actif à la fois. Vous devez solder le wager du premier bonus avant d'en activer un nouveau. En revanche, les programmes de fidélité (cashback, points) sont cumulables avec les bonus de bienvenue. Certains casinos proposent des offres de rechargement hebdomadaires une fois le premier bonus soldé.",
  },
]

const FAQ_EN = [
  {
    question: 'What is a welcome bonus in an online casino?',
    answer:
      'A welcome bonus is a promotional offer reserved for new players on their first deposit (sometimes 2nd, 3rd and 4th deposits too). It typically takes the form of a percentage of your deposit (e.g. 100% up to €500) and/or free spins on certain slot machines. A 200% bonus up to €1,000 means that if you deposit €500, you receive an extra €1,000 bonus.',
  },
  {
    question: 'What does a 35× wagering requirement mean on a casino bonus?',
    answer:
      'The wager is the number of times you must bet the bonus amount before you can withdraw your winnings. A 35× wager on a €100 bonus means you must bet a total of €3,500 before any withdrawal. Always check whether the wager applies only to the bonus or to the deposit + bonus combined — the difference is significant.',
  },
  {
    question: 'Are new casinos less reliable than established ones?',
    answer:
      'Not necessarily. Many new casinos are launched by established groups (Aspire Global, SoftSwiss) with proven infrastructure. However, a casino with no verifiable payment history deserves more caution. Our advice: wait 6 to 12 months before making a large withdrawal from a new casino without an established reputation, or verify the track record of the operating group.',
  },
  {
    question: 'Can you really make money with casino bonuses?',
    answer:
      'Theoretically yes, practically it is very difficult. Wagering requirements are designed so that the vast majority of bonuses are never converted into cash. The expected value of a bonus is always negative for the player. Bonuses are useful for extending your gaming session and exploring the catalogue, not for making money.',
  },
  {
    question: 'How do you read casino bonus terms?',
    answer:
      "Key points: (1) Wager — look for 'wagering requirement'. (2) Games contributing to the wager — slots generally count at 100%, blackjack at only 10–20%. (3) Validity — generally 7 to 30 days. (4) Maximum winnings — some casinos cap free spin winnings at €20–€100. (5) Minimum withdrawal amount — often €20 or €30.",
  },
  {
    question: 'Can you stack multiple bonuses at the same casino?',
    answer:
      'Generally no — casinos only allow one active bonus at a time. You must clear the first bonus wager before activating a new one. However, loyalty programmes (cashback, points) can be combined with welcome bonuses. Some casinos offer weekly reload offers once the first bonus is cleared.',
  },
]

export default async function CasinosNouveauxPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const sorted = [...operators].sort((a, b) => b.bonusAmountNumber - a.bonusAmountNumber)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Nouveaux casinos en ligne France 2026' : 'New Online Casinos France 2026',
    itemListElement: sorted.slice(0, 10).map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `${BASE_URL}${isFr ? '' : '/en'}/casinos/${op.slug}/`,
    })),
  }
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isFr ? FAQ_FR : FAQ_EN).map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
          { label: isFr ? 'Nouveaux Casinos' : 'New Casinos' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_nouveaux" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Bonus · Tours gratuits · Conditions vérifiées · 2026'
              : 'Bonus · Free spins · Verified conditions · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Nouveaux <em className="not-italic text-green">casinos en ligne</em> 2026
              </>
            ) : (
              <>
                New <em className="not-italic text-green">online casinos</em> 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Les offres de bienvenue les plus généreuses du marché, triées par montant de bonus. Wager, validité et conditions détaillées — sans mauvaises surprises.'
              : 'Most generous welcome offers on the market, sorted by bonus amount. Wagering, validity and detailed conditions.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={sorted}
        configKey="nouveaux"
        pageType="casino_nouveaux"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Comment comparer les bonus casino en 2026 ?'
              : 'How to compare casino bonuses in 2026?'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Un bonus de 5000€ avec un wager de 60× est bien moins intéressant qu&apos;un bonus
                de 500€ avec un wager de 20×. La valeur réelle d&apos;un bonus dépend de trois
                facteurs liés : le montant, le wager et le RTP des jeux autorisés. Pour un RTP moyen
                de 96% sur les slots, l&apos;avantage casino est de 4%. Chaque tour du wager érode
                mécaniquement la valeur du bonus.
              </p>
              <p>
                La véritable valeur des bonus est l&apos;
                <strong className="text-ink">entertainment value</strong> : ils vous donnent plus de
                temps de jeu pour le même dépôt. Utilisés intelligemment (machines à sous à haut
                RTP, mises raisonnables), ils peuvent se convertir en gains réels — mais c&apos;est
                l&apos;exception, pas la règle.
              </p>
              <p>
                Les <strong className="text-ink">tours gratuits</strong> sont souvent plus
                intéressants car ils permettent de gagner de l&apos;argent réel sans risquer votre
                dépôt, même si les montants maximums de gains sont limités. Les tours sans wager (de
                plus en plus rares) sont les plus précieux car chaque gain est directement
                encaissable.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                A €5,000 bonus with 60× wagering is far less interesting than a €500 bonus at 20×.
                The real value of a bonus depends on three linked factors: the amount, the wagering
                requirement, and the RTP of eligible games. With an average RTP of 96% on slots, the
                house edge is 4%. Each wagering round mechanically erodes the bonus value.
              </p>
              <p>
                The true value of bonuses is the{' '}
                <strong className="text-ink">entertainment value</strong>: they give you more
                playing time for the same deposit. Used wisely (high-RTP slots, sensible stakes),
                they can convert into real winnings — but that is the exception, not the rule.
              </p>
              <p>
                <strong className="text-ink">Free spins</strong> are often more interesting because
                they let you win real money without risking your deposit, even if maximum win
                amounts are capped. No-wager spins (increasingly rare) are the most valuable because
                every win is immediately cashable.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Bonus Casino' : 'FAQ — Casino Bonuses'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
