import type { Metadata } from 'next'
export const revalidate = 3600

import { HubShell } from '@/components/hub/hub-shell'
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
      ? 'Bonus Casino Sans Dépôt 2026 France — Tours Gratuits à inscription'
      : 'No Deposit Casino Bonus 2026 France — Free Spins on Registration',
    description: isFr
      ? 'Les meilleurs bonus sans dépôt des casinos en ligne en France 2026 : tours gratuits à inscription, crédits offerts. Conditions de wager détaillées. 18+'
      : 'Best no deposit bonuses at online casinos in France 2026: free spins on registration, offered credits. Detailed wagering conditions. 18+',
    alternates: { languages: buildHreflang('/casinos/bonus-sans-depot/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un bonus sans dépôt dans un casino en ligne ?",
    answer:
      "Un bonus sans dépôt est une offre promotionnelle accordée lors de votre inscription sans nécessiter de dépôt initial. Il peut prendre la forme de tours gratuits (généralement 10 à 50 tours), de crédits casino (5€ à 20€), ou d'un crédit temporaire pour découvrir le casino. La contrepartie : des conditions de mise (wager) souvent élevées et des gains maximums limités.",
  },
  {
    question: 'Comment obtenir un bonus sans dépôt ?',
    answer:
      "Pour obtenir un bonus sans dépôt : (1) Inscrivez-vous sur le casino via notre lien — certains bonus sont activés automatiquement. (2) Vérifiez votre email pour confirmer votre compte. (3) Si nécessaire, entrez un code promo dans la section 'Caisse' ou 'Promotions'. (4) Le bonus apparaîtra dans votre solde bonus. (5) Complétez le KYC avant tout retrait. Attention : certains bonus ont une durée de validité de 24-72h.",
  },
  {
    question: "Peut-on retirer les gains d'un bonus sans dépôt ?",
    answer:
      "Oui, mais sous conditions strictes. Vous devez d'abord solder le wager (ex : 40× sur les gains des tours gratuits), ne pas dépasser le gain maximum autorisé (souvent 20€ à 100€), et effectuer une vérification KYC complète. Dans la pratique, moins de 5% des joueurs parviennent à convertir un bonus sans dépôt en retrait réel. Ce n'est pas impossible, mais c'est l'exception.",
  },
  {
    question: 'Quels jeux sont autorisés avec un bonus sans dépôt ?',
    answer:
      "La plupart des casinos limitent les bonus sans dépôt aux machines à sous (slots). Les jeux de table, le poker et le casino live sont généralement exclus ou ne contribuent qu'à 10-20% au wager. Certains casinos spécifient même des slots précises sur lesquelles utiliser les tours gratuits. Vérifiez toujours les CGU avant d'activer le bonus.",
  },
  {
    question: 'Quelle est la différence entre tours gratuits et crédits casino sans dépôt ?',
    answer:
      'Les tours gratuits sont utilisables sur des slots spécifiques à une mise fixe (ex : 0,10€ par tour). Les crédits casino sont plus flexibles — vous pouvez les utiliser sur plusieurs jeux selon les règles. Les crédits ont souvent un wager plus élevé mais une valeur nominale supérieure. Les tours gratuits sont moins risqués car votre exposition financière est nulle.',
  },
  {
    question: "Un casino peut-il refuser un retrait issu d'un bonus sans dépôt ?",
    answer:
      "Légalement non, si vous avez respecté toutes les conditions. En pratique, certains casinos peu scrupuleux peuvent invoquer des clauses obscures. Pour vous protéger : lisez entièrement les CGU avant d'activer, conservez des captures d'écran de vos sessions de jeu, et privilégiez les casinos sous licence MGA ou UKGC qui ont des obligations de traitement des plaintes.",
  },
]

const FAQ_EN = [
  {
    question: 'What is a no deposit bonus at an online casino?',
    answer:
      'A no deposit bonus is a promotional offer given when you register without requiring an initial deposit. It can take the form of free spins (usually 10 to 50 spins), casino credits (€5 to €20), or a temporary credit to discover the casino. The trade-off: often high wagering requirements and limited maximum winnings.',
  },
  {
    question: 'How do you get a no deposit bonus?',
    answer:
      "To get a no deposit bonus: (1) Register at the casino via our link — some bonuses are activated automatically. (2) Verify your email to confirm your account. (3) If necessary, enter a promo code in the 'Cashier' or 'Promotions' section. (4) The bonus will appear in your bonus balance. (5) Complete KYC before any withdrawal. Note: some bonuses are valid for only 24–72 hours.",
  },
  {
    question: 'Can you withdraw winnings from a no deposit bonus?',
    answer:
      'Yes, but under strict conditions. You must first clear the wager (e.g. 40× on free spin winnings), not exceed the authorised maximum win (often €20 to €100), and complete full KYC verification. In practice, fewer than 5% of players manage to convert a no deposit bonus into a real withdrawal. It is possible, but it is the exception.',
  },
  {
    question: 'Which games are allowed with a no deposit bonus?',
    answer:
      'Most casinos restrict no deposit bonuses to slot machines. Table games, poker and live casino are generally excluded or contribute only 10–20% to the wager. Some casinos even specify exact slots on which to use free spins. Always check the T&Cs before activating the bonus.',
  },
  {
    question: 'What is the difference between free spins and no deposit casino credits?',
    answer:
      'Free spins are used on specific slots at a fixed stake (e.g. €0.10 per spin). Casino credits are more flexible — you can use them on multiple games according to the rules. Credits often have a higher wager but a higher nominal value. Free spins are less risky because your financial exposure is zero.',
  },
  {
    question: 'Can a casino refuse a withdrawal from a no deposit bonus?',
    answer:
      'Legally no, if you have complied with all conditions. In practice, some unscrupulous casinos may invoke obscure clauses. To protect yourself: read the full T&Cs before activating, keep screenshots of your gaming sessions, and prefer casinos licensed by the MGA or UKGC which have complaint handling obligations.',
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
    <HubShell
      pageType="casino_bonus_sans_depot"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Bonus Sans Dépôt' : 'No Deposit Bonus' },
      ]}
      eyebrow={
        isFr
          ? 'Tours gratuits à inscription · Sans dépôt · Wager vérifié · 2026'
          : 'Free spins on registration · No deposit · Verified wagering · 2026'
      }
      heading={
        isFr ? (
          <>
            <em className="not-italic text-green">Bonus sans dépôt</em> casino 2026
          </>
        ) : (
          <>
            Casino <em className="not-italic text-green">no deposit bonus</em> 2026
          </>
        )
      }
      intro={
        isFr
          ? "Tours gratuits ou crédits offerts à l'inscription, sans dépôt requis. Conditions de wager détaillées et gain maximum indiqué pour chaque offre."
          : 'Free spins or credits on registration, no deposit required. Detailed wagering conditions and maximum win for each offer.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={displayOperators}
      configKey="bonus_sans_depot"
      editorialH2={
        isFr ? 'Tout savoir sur les bonus sans dépôt' : 'Everything about no deposit bonuses'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Les bonus sans dépôt sont les offres casino les plus attractives en apparence — et les
              plus complexes en réalité. L&apos;idée est simple : vous recevez des tours gratuits ou
              des crédits dès votre inscription, sans risquer votre propre argent. Mais les
              conditions de mise imposées par les casinos font que moins de 5% des joueurs
              parviennent réellement à retirer des gains issus de ces bonus.
            </p>
            <p>
              La <strong className="text-ink">formule pour évaluer la valeur réelle</strong>{' '}
              d&apos;un bonus sans dépôt : si vous recevez 20 tours à 0,10€ = 2€ de valeur nominale,
              avec un wager de 40× = vous devez miser 80€, avec un RTP de 96% = espérance de perte
              de 80 × 4% = 3,20€ en jeu, ce qui dépasse la valeur nominale du bonus. La valeur
              marchande est donc négative, mais le risque financier est nul puisque vous ne déposez
              rien.
            </p>
            <p>
              Notre conseil pour utiliser intelligemment ces bonus : choisissez des machines à sous
              à <strong className="text-ink">haute volatilité</strong> (Book of Dead, Gates of
              Olympus) pour viser un gain important rapidement. Si vous atteignez le plafond de
              gains autorisé (souvent 20-50€), basculez sur une slot à faible variance pour liquider
              le wager restant avec un minimum de pertes. Cette stratégie ne garantit pas le succès
              mais maximise vos chances statistiques.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              No-deposit bonuses are the most superficially attractive casino offers — and the most
              complex in reality. The idea is simple: you receive free spins or credits upon
              registration, without risking your own money. But the wagering requirements imposed by
              casinos mean that fewer than 5% of players actually manage to withdraw winnings from
              these bonuses.
            </p>
            <p>
              The <strong className="text-ink">formula for evaluating real value</strong>: if you
              receive 20 spins at €0.10 = €2 nominal value, with a 40× wager = you must bet €80,
              with a 96% RTP = expected loss of 80 × 4% = €3.20 — which exceeds the nominal value of
              the bonus. The market value is therefore negative, but the financial risk is zero
              since you deposit nothing.
            </p>
            <p>
              Our advice for making the most of these bonuses: choose{' '}
              <strong className="text-ink">high-volatility</strong> slot machines (Book of Dead,
              Gates of Olympus) to aim for a large win quickly. If you reach the authorised win cap
              (often €20–50), switch to a low-variance slot to clear the remaining wager with
              minimal losses. This strategy does not guarantee success but maximises your
              statistical chances.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Bonus sans dépôt' : 'FAQ — No deposit bonus'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
