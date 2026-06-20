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
      ? 'Casino Cashback France 2026 — Remboursement sur Pertes'
      : 'Cashback Casino France 2026 — Losses Refund',
    description: isFr
      ? "Comparatif des casinos en ligne avec cashback en France 2026 : remboursement hebdomadaire sur les pertes, sans wager. Jusqu'à 20% cashback. 18+"
      : 'Comparison of online casinos with cashback in France 2026: weekly loss refunds, no wagering. Up to 20% cashback. 18+',
    alternates: { languages: buildHreflang('/comparatifs/cashback/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce que le cashback dans un casino en ligne ?",
    answer:
      'Le cashback casino est un remboursement partiel de vos pertes nettes sur une période donnée (généralement hebdomadaire). Par exemple, un cashback de 10% sur des pertes de 200€ vous rapporte 20€. Contrairement aux bonus classiques, le cashback est souvent crédité sans wager ou avec un wager très faible (1× à 5×), ce qui le rend beaucoup plus précieux.',
  },
  {
    question: 'Comment fonctionne le calcul du cashback ?',
    answer:
      "La base de calcul varie selon les opérateurs : pertes nettes (dépôts - retraits - bonus reçus), pertes brutes (misé - gagné), ou pertes sur des jeux spécifiques. Le taux est généralement entre 5% et 20%. La fréquence de versement peut être quotidienne, hebdomadaire ou mensuelle. Lisez attentivement les conditions pour comprendre quelle base de calcul s'applique.",
  },
  {
    question: "Le cashback est-il meilleur qu'un bonus de bienvenue classique ?",
    answer:
      "Pour les joueurs réguliers, souvent oui. Un cashback sans wager à 10% vaut beaucoup plus sur le long terme qu'un gros bonus de bienvenue avec un wager de 35×. Le cashback réduit l'avantage de la maison de manière permanente — si le RTP est 96% et que vous avez 10% de cashback sur vos pertes, votre taux de retour effectif monte à environ 96,4%. C'est significatif sur des milliers de parties.",
  },
  {
    question: 'Y a-t-il un montant maximum de cashback par semaine ?',
    answer:
      'Oui, presque tous les programmes de cashback ont un plafond. Il peut être exprimé en montant absolu (ex : 500€ maximum de cashback par semaine) ou en pertes maximales éligibles. Ces limites sont souvent plus élevées dans les tiers VIP. Vérifiez toujours le plafond avant de compter sur le cashback comme stratégie de gestion de bankroll.',
  },
  {
    question: 'Le cashback est-il crédité automatiquement ?',
    answer:
      "Cela dépend de l'opérateur. Certains casinos créditent le cashback automatiquement chaque lundi sans action requise. D'autres demandent une activation via le support client ou la section Promotions. Quelques casinos appliquent un délai de 24-48 heures après la fin de la période. Vérifiez le processus exact dans les conditions de l'offre.",
  },
  {
    question: 'Peut-on cumuler cashback et bonus de bienvenue ?',
    answer:
      "Généralement oui, mais avec des restrictions. Pendant que vous soldez un bonus de bienvenue, le cashback peut ne pas s'appliquer. Une fois le bonus soldé, le cashback s'applique normalement. Certains casinos offrent le cashback dès le premier jour, d'autres attendent que le statut de joueur actif soit établi.",
  },
]

const FAQ_EN = [
  {
    question: 'What is cashback in an online casino?',
    answer:
      'Casino cashback is a partial refund of your net losses over a given period (usually weekly). For example, 10% cashback on €200 in losses gives you back €20. Unlike classic bonuses, cashback is often credited without any wagering requirement or with a very low one (1× to 5×), making it much more valuable.',
  },
  {
    question: 'How is cashback calculated?',
    answer:
      'The calculation base varies by operator: net losses (deposits minus withdrawals minus bonuses received), gross losses (wagered minus won), or losses on specific games. The rate is generally between 5% and 20%. The payment frequency can be daily, weekly or monthly. Read the terms carefully to understand which calculation base applies.',
  },
  {
    question: 'Is cashback better than a classic welcome bonus?',
    answer:
      'For regular players, often yes. No-wager cashback at 10% is worth far more in the long run than a large welcome bonus with a 35× wager. Cashback permanently reduces the house edge — if the RTP is 96% and you have 10% cashback on losses, your effective return rate rises to approximately 96.4%. That is significant over thousands of spins.',
  },
  {
    question: 'Is there a maximum cashback amount per week?',
    answer:
      'Yes, almost all cashback programmes have a cap. It can be expressed as an absolute amount (e.g. maximum €500 cashback per week) or as maximum eligible losses. These limits are often higher at VIP tiers. Always check the cap before counting on cashback as a bankroll management strategy.',
  },
  {
    question: 'Is cashback credited automatically?',
    answer:
      'It depends on the operator. Some casinos credit cashback automatically every Monday without any action required. Others require activation via customer support or the Promotions section. A few casinos apply a 24–48 hour delay after the end of the period. Check the exact process in the offer terms.',
  },
  {
    question: 'Can you combine cashback with a welcome bonus?',
    answer:
      'Generally yes, but with restrictions. While you are clearing a welcome bonus, cashback may not apply. Once the bonus is cleared, cashback applies normally. Some casinos offer cashback from day one, others wait until active player status is established.',
  },
]

export default async function CashbackPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const cashbackFirst = [...operators].sort((a, b) => {
    const aCash = a.features.some((f) => /cashback/i.test(f)) ? 2 : 0
    const bCash = b.features.some((f) => /cashback/i.test(f)) ? 2 : 0
    return bCash - aCash || b.rating - a.rating
  })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Meilleurs casinos cashback France 2026' : 'Best Cashback Casinos France 2026',
    itemListElement: cashbackFirst.slice(0, 10).map((op, i) => ({
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
      pageType="comparatif_cashback"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
        { label: isFr ? 'Casino Cashback' : 'Cashback Casino' },
      ]}
      eyebrow={
        isFr ? 'Remboursement · Sans wager · 5–20% · 2026' : 'Refund · No wagering · 5–20% · 2026'
      }
      heading={
        isFr ? (
          <>
            Comparatif <em className="not-italic text-green">casino cashback</em> 2026
          </>
        ) : (
          <>
            Best <em className="not-italic text-green">cashback casino</em> 2026
          </>
        )
      }
      intro={
        isFr
          ? "Le cashback réduit l'avantage de la maison de manière permanente. Filtrez par taux, fréquence et conditions pour identifier les meilleures offres cashback."
          : 'Cashback permanently reduces the house edge. Filter by rate, frequency and conditions to identify the best cashback offers.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={cashbackFirst}
      configKey="cashback"
      editorialH2={
        isFr
          ? 'Le cashback casino — la promotion la plus sous-estimée'
          : 'Casino cashback — the most underrated promotion'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Le cashback est systématiquement sous-évalué par les joueurs qui se concentrent sur
              les gros bonus de bienvenue. Pourtant, un{' '}
              <strong className="text-ink">cashback hebdomadaire de 10% sans wager</strong>{' '}
              représente une valeur supérieure à la quasi-totalité des bonus de bienvenue une fois
              que vous avez calculé la valeur réelle (bonus × probabilité de conversion).
            </p>
            <p>
              La mécanique est simple : si vous perdez 300€ net sur la semaine et que votre cashback
              est de 15%, vous récupérez 45€ directement jouables (sans wager ou wager 1×). Sur une
              année de jeu régulier, ce cashback peut représenter plusieurs centaines d&apos;euros
              de gains effectifs — de l&apos;argent que vous n&apos;auriez jamais revu avec un bonus
              classique.
            </p>
            <p>
              Notre recommandation pour les joueurs réguliers : une fois votre bonus de bienvenue
              soldé, choisissez systématiquement un casino qui offre du cashback plutôt que des
              rechargements avec wager élevé. La valeur cumulée sur 12 mois est invariablement
              supérieure. Les programmes VIP avec cashback progressif sont particulièrement
              attractifs.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Cashback is systematically undervalued by players who focus on large welcome bonuses.
              Yet a <strong className="text-ink">10% no-wager weekly cashback</strong> represents
              more value than virtually any welcome bonus once you calculate the real value (bonus ×
              probability of conversion).
            </p>
            <p>
              The mechanic is simple: if you lose €300 net over the week and your cashback is 15%,
              you receive €45 back — immediately playable (no wagering, or 1× maximum). Over a year
              of regular play, this cashback can represent several hundred euros in effective gains,
              money you would never have seen again with a classic bonus.
            </p>
            <p>
              Our recommendation for regular players: once your welcome bonus is cleared, always
              choose a casino that offers cashback rather than reload bonuses with high wagering
              requirements. The cumulative value over 12 months is invariably greater. VIP
              programmes with progressive cashback are particularly attractive.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casino Cashback' : 'FAQ — Cashback Casino'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
