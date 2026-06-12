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
      ? 'Bonus Casino Sans Dépôt France 2026 — Tours Gratuits Offerts'
      : 'No Deposit Casino Bonus France 2026 — Free Spins',
    description: isFr
      ? "Meilleurs bonus casino sans dépôt en France 2026 : tours gratuits et crédits offerts à l'inscription. Conditions détaillées, wager vérifié. 18+"
      : 'Best no deposit casino bonuses in France 2026: free spins and credits on registration. Detailed conditions, verified wagering. 18+',
    alternates: { languages: buildHreflang('/casinos/bonus-sans-depot/') },
  }
}

const FAQ_FR = [
  {
    question: 'Comment fonctionne un bonus sans dépôt de casino ?',
    answer:
      "Un bonus sans dépôt est offert à l'inscription, sans que vous ayez à déposer de l'argent. Il peut prendre la forme de tours gratuits (10-50 tours offerts sur une slot spécifique) ou d'un crédit en argent (5€ à 25€). Pour retirer vos gains, vous devrez généralement compléter un wager — ce montant est souvent plus élevé que pour les bonus avec dépôt (40× à 60× est courant). La valeur marchande réelle d'un bonus sans dépôt est donc limitée, mais le risque est nul.",
  },
  {
    question: "Peut-on vraiment conserver ses gains d'un bonus sans dépôt ?",
    answer:
      "Oui, mais c'est difficile. Trois conditions doivent être réunies : (1) compléter le wager avant expiration du bonus, (2) ne pas dépasser le gain maximum autorisé (souvent 20-100€ sur les tours gratuits), (3) déposer le minimum requis avant le premier retrait. La plupart des joueurs ne parviennent pas à convertir ces bonus. Pour maximiser vos chances : misez sur des slots à haute volatilité pour atteindre le plafond de gains rapidement, puis passez aux jeux à faible variance pour écouler le wager.",
  },
  {
    question: 'Pourquoi le wager est-il si élevé sur les bonus sans dépôt ?',
    answer:
      "Du point de vue de l'opérateur, un bonus sans dépôt est un coût pur (vous n'avez rien déposé). Un wager élevé (40-60×) est donc leur protection contre les 'bonus hunters' — joueurs qui s'inscrivent uniquement pour collecter des bonus sans jamais déposer réellement. Si vous avez l'intention de jouer régulièrement dans ce casino, un bonus sans dépôt reste une opportunité de découvrir le catalogue gratuitement avec une chance de gain.",
  },
  {
    question: 'Y a-t-il des bonus sans dépôt légitimes disponibles en France ?',
    answer:
      "Oui, plusieurs casinos proposent des offres sans dépôt pour les joueurs français, bien que ces offres changent fréquemment. Les tours gratuits sans dépôt sur des jeux spécifiques (généralement Starburst, Book of Dead, ou des nouveautés) sont les plus courants. Vérifiez toujours les conditions géographiques — certains bonus sans dépôt excluent certains pays ou sont soumis à une vérification d'identité préalable.",
  },
  {
    question:
      'Quelle est la différence entre tours gratuits sans dépôt et tours gratuits avec dépôt ?',
    answer:
      "Les tours sans dépôt sont offerts uniquement à l'inscription, sans rien déposer. Les tours avec dépôt font partie d'un bonus de bienvenue classique (ex : 100 tours offerts avec votre 1er dépôt). Les tours sans dépôt ont généralement une valeur par tour plus faible (0,10€ vs 0,20€), un gain maximum plus bas (20-50€), et un wager plus élevé. Les tours avec dépôt ont de meilleures conditions mais nécessitent un investissement initial.",
  },
  {
    question: 'Peut-on cumuler plusieurs bonus sans dépôt dans différents casinos ?',
    answer:
      "Oui, rien ne vous empêche de vous inscrire dans plusieurs casinos et de collecter les bonus sans dépôt de chacun. C'est ce que font les 'bonus hunters'. Attention cependant : les casinos partagent parfois des listes de joueurs abusifs, et un historique de bonus sans dépôt systématiques sans dépôt réel peut vous valoir une exclusion des offres futures. Utilisez chaque casino en bonne foi si vous souhaitez y revenir.",
  },
]

const FAQ_EN = [
  {
    question: 'How does a no deposit casino bonus work?',
    answer:
      'A no deposit bonus is offered at registration, without you needing to deposit any money. It can take the form of free spins (10–50 spins on a specific slot) or cash credit (€5 to €25). To withdraw your winnings, you will generally need to complete a wager — often higher than for deposit bonuses (40× to 60× is common). The real monetary value is therefore limited, but the risk is zero.',
  },
  {
    question: 'Can you really keep winnings from a no deposit bonus?',
    answer:
      'Yes, but it is difficult. Three conditions must be met: (1) complete the wager before the bonus expires, (2) not exceed the maximum permitted winnings (often €20–€100 on free spins), (3) deposit the required minimum before the first withdrawal. To maximise your chances: play high-volatility slots to hit the winnings cap quickly, then switch to low-variance games to clear the wager.',
  },
  {
    question: 'Why is the wagering requirement so high on no deposit bonuses?',
    answer:
      "From the operator's perspective, a no deposit bonus is a pure cost (you have deposited nothing). A high wager (40–60×) is therefore their protection against 'bonus hunters' — players who sign up solely to collect bonuses without ever genuinely depositing. If you plan to play regularly, a no deposit bonus is still an opportunity to explore the catalogue for free with a chance of winning.",
  },
  {
    question: 'Are there legitimate no deposit bonuses available?',
    answer:
      'Yes, several casinos offer no deposit deals for players, though these offers change frequently. No deposit free spins on specific games (generally Starburst, Book of Dead, or new releases) are the most common. Always check the geographical conditions — some no deposit bonuses exclude certain countries or require prior identity verification.',
  },
  {
    question: 'What is the difference between no deposit free spins and deposit free spins?',
    answer:
      'No deposit spins are offered at sign-up only, with no deposit required. Deposit free spins are part of a classic welcome bonus (e.g. 100 spins with your 1st deposit). No deposit spins generally have a lower spin value (€0.10 vs €0.20), lower maximum winnings (€20–€50), and higher wager. Deposit spins have better conditions but require an initial investment.',
  },
  {
    question: 'Can you collect multiple no deposit bonuses at different casinos?',
    answer:
      "Yes, nothing stops you from signing up at multiple casinos and collecting each one's no deposit bonus. Be aware though: casinos sometimes share lists of abusive players, and a history of systematically collecting no deposit bonuses without genuinely depositing can result in exclusion from future offers. Use each casino in good faith if you want to return.",
  },
]

export default async function CasinosBonusSansDepotPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const noDepositFirst = operators
    .filter(
      (op) =>
        op.bonusAmountNumber === 0 ||
        op.bonusSuffix?.toLowerCase().includes('sans dépôt') ||
        op.bonusConditions.toLowerCase().includes('inscription')
    )
    .sort((a, b) => b.rating - a.rating)

  const withFreespins = operators
    .filter((op) => !noDepositFirst.includes(op) && op.bonusSuffix?.includes('tours'))
    .sort((a, b) => {
      const aSpins = parseInt(a.bonusSuffix?.match(/(\d+) tours/)?.[1] ?? '0', 10)
      const bSpins = parseInt(b.bonusSuffix?.match(/(\d+) tours/)?.[1] ?? '0', 10)
      return bSpins - aSpins || b.rating - a.rating
    })

  const displayOperators = [...noDepositFirst, ...withFreespins]

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Casinos bonus sans dépôt France 2026' : 'No Deposit Bonus Casinos France 2026',
    itemListElement: noDepositFirst.slice(0, 10).map((op, i) => ({
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
          { label: isFr ? 'Bonus Sans Dépôt' : 'No Deposit Bonus' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_bonus_sans_depot" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Tours gratuits à inscription · Sans dépôt · Wager vérifié · 2026'
              : 'Free spins on registration · No deposit · Verified wagering · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                <em className="not-italic text-green">Bonus sans dépôt</em> casino 2026
              </>
            ) : (
              <>
                Casino <em className="not-italic text-green">no deposit bonus</em> 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Tours gratuits ou crédits offerts à l'inscription, sans dépôt requis. Conditions de wager détaillées et gain maximum indiqué pour chaque offre."
              : 'Free spins or credits on registration, no deposit required. Detailed wagering conditions and maximum win for each offer.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={displayOperators}
        configKey="bonus_sans_depot"
        pageType="casino_bonus_sans_depot"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Tout savoir sur les bonus sans dépôt' : 'Everything about no deposit bonuses'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Les bonus sans dépôt sont les offres casino les plus attractives en apparence — et
                les plus complexes en réalité. L&apos;idée est simple : vous recevez des tours
                gratuits ou des crédits dès votre inscription, sans risquer votre propre argent.
                Mais les conditions de mise imposées par les casinos font que moins de 5% des
                joueurs parviennent réellement à retirer des gains issus de ces bonus.
              </p>
              <p>
                La <strong className="text-ink">formule pour évaluer la valeur réelle</strong>{' '}
                d&apos;un bonus sans dépôt : si vous recevez 20 tours à 0,10€ = 2€ de valeur
                nominale, avec un wager de 40× = vous devez miser 80€, avec un RTP de 96% =
                espérance de perte de 80 × 4% = 3,20€ en jeu, ce qui dépasse la valeur nominale du
                bonus. La valeur marchande est donc négative, mais le risque financier est nul
                puisque vous ne déposez rien.
              </p>
              <p>
                Notre conseil pour utiliser intelligemment ces bonus : choisissez des machines à
                sous à <strong className="text-ink">haute volatilité</strong> (Book of Dead, Gates
                of Olympus) pour viser un gain important rapidement. Si vous atteignez le plafond de
                gains autorisé (souvent 20-50€), basculez sur une slot à faible variance pour
                liquider le wager restant avec un minimum de pertes. Cette stratégie ne garantit pas
                le succès mais maximise vos chances statistiques.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                No-deposit bonuses are the most superficially attractive casino offers — and the
                most complex in reality. The idea is simple: you receive free spins or credits upon
                registration, without risking your own money. But the wagering requirements imposed
                by casinos mean that fewer than 5% of players actually manage to withdraw winnings
                from these bonuses.
              </p>
              <p>
                The <strong className="text-ink">formula for evaluating real value</strong>: if you
                receive 20 spins at €0.10 = €2 nominal value, with a 40× wager = you must bet €80,
                with a 96% RTP = expected loss of 80 × 4% = €3.20 — which exceeds the nominal value
                of the bonus. The market value is therefore negative, but the financial risk is zero
                since you deposit nothing.
              </p>
              <p>
                Our advice for making the most of these bonuses: choose{' '}
                <strong className="text-ink">high-volatility</strong> slot machines (Book of Dead,
                Gates of Olympus) to aim for a large win quickly. If you reach the authorised win
                cap (often €20–50), switch to a low-variance slot to clear the remaining wager with
                minimal losses. This strategy does not guarantee success but maximises your
                statistical chances.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Bonus sans dépôt' : 'FAQ — No deposit bonus'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
