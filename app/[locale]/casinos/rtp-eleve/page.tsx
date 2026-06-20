import type { Metadata } from 'next'
export const revalidate = 3600

import { HubShell } from '@/components/hub/hub-shell'
import { operatorsWithHighRtp } from '@/config/operators'
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
      ? 'Casino RTP Élevé 2026 — Meilleur Taux de Retour Joueur ≥ 96%'
      : 'High RTP Casino 2026 — Best Return to Player Rate ≥ 96%',
    description: isFr
      ? 'Casinos en ligne avec le meilleur RTP moyen en 2026 : taux de redistribution ≥ 96% testé et vérifié. Slots, live et jeux maison. 18+'
      : 'Online casinos with the best average RTP in 2026: redistribution rate ≥ 96% tested and verified. Slots, live and house games. 18+',
    alternates: { languages: buildHreflang('/casinos/rtp-eleve/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce que le RTP d'un casino et comment est-il calculé ?",
    answer:
      "Le RTP (Return to Player, ou taux de retour joueur) est le pourcentage moyen des mises qui est redistribué aux joueurs sur l'ensemble des parties. Un RTP de 96% signifie que, théoriquement, pour 100 € misés, 96 € sont redistribués et 4 € constituent la marge du casino (la « house edge »). Ce chiffre est une moyenne calculée sur des millions de parties — il ne prédit pas vos gains sur une session individuelle. Les RTP sont certifiés par des auditeurs indépendants (eCOGRA, iTech Labs).",
  },
  {
    question: 'Le RTP affiché par le casino est-il le même pour tous les jeux ?',
    answer:
      "Non, et c'est le point le plus important à comprendre. Le RTP affiché sur la page d'un casino est une moyenne de son catalogue complet. Chaque jeu a son propre RTP : les machines à sous varient typiquement de 92% à 98%, la roulette européenne est à 97,3%, le blackjack avec stratégie de base atteint 99,5%, et les jackpots progressifs peuvent descendre à 88-92%. Avant de jouer un jeu spécifique, recherchez son RTP individuel dans les informations du jeu.",
  },
  {
    question: 'Un RTP élevé garantit-il de gagner plus ?',
    answer:
      "Non. Le RTP est une statistique long terme (millions de parties) — à court terme, la variance peut être très élevée. Un slot avec RTP 97% peut vous faire perdre 10 fois de suite, tandis qu'un slot à 94% peut vous offrir un gros gain immédiat. Ce que le RTP garantit sur le long terme : vous perdrez statistiquement moins dans un casino à 96% qu'à 94%, pour un volume de jeu identique. C'est un avantage marginal, pas une garantie.",
  },
  {
    question: 'Les casinos crypto ont-ils des RTP plus élevés que les casinos classiques ?',
    answer:
      'Souvent oui, pour deux raisons. (1) Coûts opérationnels réduits : les casinos crypto ont moins de frais de traitement des paiements et peuvent répercuter cet avantage sur les joueurs. (2) Jeux maison : Stake.com développe ses propres jeux (Crash, Mines, Limbo) avec des RTP de 97% ou plus, publiés et vérifiables on-chain. BitcoinPenguin propose également des jeux à RTP élevé. En revanche, les RTP des slots tiers (NetEnt, Pragmatic) sont identiques quel que soit le casino.',
  },
  {
    question: "Comment vérifier le RTP réel d'un casino ?",
    answer:
      "Quatre sources fiables : (1) La page 'Fairness' ou 'About' du casino — les casinos crypto y publient souvent leurs statistiques en temps réel. (2) Les rapports d'audit eCOGRA ou iTech Labs — documents publics disponibles sur le site du casino ou de l'auditeur. (3) Les informations de chaque jeu (bouton 'i' ou 'Aide' in-game) — indiquent le RTP du jeu spécifique. (4) Les bases de données indépendantes comme CASINOBRAVO ou les tests d'éditeurs comme Pragmatic et NetEnt qui publient les RTP de tous leurs jeux.",
  },
]

const FAQ_EN = [
  {
    question: "What is a casino's RTP and how is it calculated?",
    answer:
      'RTP (Return to Player) is the average percentage of stakes that is redistributed to players across all rounds. An RTP of 96% means that, theoretically, for every €100 wagered, €96 is returned and €4 represents the casino margin (the "house edge"). This figure is an average calculated over millions of rounds — it does not predict your winnings in any individual session. RTPs are certified by independent auditors (eCOGRA, iTech Labs).',
  },
  {
    question: 'Is the RTP displayed by the casino the same for all games?',
    answer:
      'No, and this is the most important point to understand. The RTP displayed on a casino page is an average across its entire catalogue. Each game has its own RTP: slot machines typically range from 92% to 98%, European roulette is 97.3%, blackjack with basic strategy reaches 99.5%, and progressive jackpots can drop to 88–92%. Before playing a specific game, look up its individual RTP in the game information.',
  },
  {
    question: 'Does a high RTP guarantee winning more?',
    answer:
      'No. RTP is a long-term statistic (millions of rounds) — in the short term, variance can be very high. A 97% RTP slot can make you lose ten times in a row, while a 94% slot may give you a big win immediately. What RTP guarantees over the long term: you will statistically lose less at a 96% casino than a 94% one, for the same volume of play. It is a marginal advantage, not a guarantee.',
  },
  {
    question: 'Do crypto casinos have higher RTPs than traditional casinos?',
    answer:
      'Often yes, for two reasons. (1) Reduced operating costs: crypto casinos have lower payment processing fees and can pass this advantage on to players. (2) House games: Stake.com develops its own games (Crash, Mines, Limbo) with RTPs of 97% or more, published and verifiable on-chain. BitcoinPenguin also offers high-RTP games. However, the RTPs of third-party slots (NetEnt, Pragmatic) are identical regardless of the casino.',
  },
  {
    question: "How do you verify a casino's real RTP?",
    answer:
      "Four reliable sources: (1) The casino's 'Fairness' or 'About' page — crypto casinos often publish real-time statistics there. (2) eCOGRA or iTech Labs audit reports — public documents available on the casino's or auditor's website. (3) Individual game information (the 'i' or 'Help' button in-game) — shows the specific game's RTP. (4) Independent databases and publisher test reports: Pragmatic and NetEnt publish RTPs for all their games.",
  },
]

export default async function RtpElevePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const byRtp = [...operatorsWithHighRtp].sort((a, b) => b.rtp - a.rtp || b.rating - a.rating)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Casinos RTP élevé France 2026' : 'High RTP Casinos France 2026',
    itemListElement: byRtp.slice(0, 10).map((op, i) => ({
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
      pageType="casino_rtp_eleve"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'RTP Élevé' : 'High RTP' },
      ]}
      eyebrow={
        isFr ? 'RTP ≥ 96% testé · Slots + Live · 2026' : 'RTP ≥ 96% tested · Slots + Live · 2026'
      }
      heading={
        isFr ? (
          <>
            Casinos avec <em className="not-italic text-green">RTP élevé</em> — ≥ 96% garanti
          </>
        ) : (
          <>
            Casinos with <em className="not-italic text-green">high RTP</em> — ≥ 96% guaranteed
          </>
        )
      }
      intro={
        isFr
          ? 'Le RTP moyen du catalogue détermine combien vous perdez statistiquement sur le long terme. Tous les casinos ici affichent ≥ 96% — soit 4 centimes perdus par euro misé en moyenne, contre 5–6 centimes dans les casinos sous la moyenne du secteur.'
          : 'The average catalogue RTP determines how much you statistically lose over the long term. All casinos here show ≥ 96% — meaning 4 cents lost per euro wagered on average, versus 5–6 cents at below-average casinos.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={byRtp}
      configKey="rtp_eleve"
      editorialH2={
        isFr
          ? 'Comment le RTP impacte vos gains sur le long terme ?'
          : 'How does RTP impact your winnings long-term?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Le RTP affiché par un casino est une{' '}
              <strong className="text-ink">moyenne pondérée</strong> de tous les jeux de son
              catalogue — pas une garantie par jeu. Un casino qui affiche 96,5% peut avoir des slots
              à 92% et d&apos;autres à 99%. Ce qui compte pour vous en tant que joueur, c&apos;est
              le RTP des jeux que vous jouez spécifiquement, pas la moyenne du catalogue.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              L&apos;impact chiffré sur le long terme
            </h3>
            <p>
              Sur 1 000 € misés, la différence entre un RTP de 94% et 96% est de 20 €. Sur 10 000 €
              misés (une année de jeu régulier), c&apos;est 200 € de différence. Cette logique
              s&apos;applique aux joueurs réguliers : pour les joueurs occasionnels (moins de 500 €
              misés par mois), la variance individuelle dépasse largement l&apos;impact du RTP.
            </p>
            <p>
              Les casinos crypto comme Stake (97% grâce à leurs jeux maison) se distinguent par des
              RTP exceptionnels sur leurs jeux exclusifs. Ces jeux (Crash, Mines, Dice) ont des RTP
              vérifiables mathématiquement et publiés publiquement — un niveau de transparence rare
              dans l&apos;industrie. Pour les machines à sous tierces (NetEnt, Pragmatic), le RTP
              est identique chez Stake et chez n&apos;importe quel autre casino : c&apos;est
              l&apos;éditeur qui le fixe, pas l&apos;opérateur.
            </p>
            <p>
              Notre recommandation : utilisez le RTP du catalogue comme{' '}
              <strong className="text-ink">signal de qualité globale</strong>, pas comme critère
              absolu. Un casino qui maintient 96%+ sur l&apos;ensemble de son catalogue fait des
              choix éditoriaux en faveur du joueur : il ne remplit pas son catalogue de slots à bas
              RTP pour gonfler ses marges.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              The RTP displayed by a casino is a{' '}
              <strong className="text-ink">weighted average</strong> across all games in its
              catalogue — not a per-game guarantee. A casino showing 96.5% may have slots at 92% and
              others at 99%. What matters to you as a player is the RTP of the specific games you
              play, not the catalogue average.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              The long-term numerical impact
            </h3>
            <p>
              On €1,000 wagered, the difference between 94% and 96% RTP is €20. On €10,000 wagered
              (a year of regular play), that is €200 in difference. This logic applies to regular
              players: for occasional players (under €500 wagered per month), individual variance
              far outweighs the RTP impact.
            </p>
            <p>
              Crypto casinos like Stake (97% thanks to their house games) stand out with exceptional
              RTPs on their exclusive games. These games (Crash, Mines, Dice) have mathematically
              verifiable RTPs published publicly — a level of transparency rare in the industry. For
              third-party slot machines (NetEnt, Pragmatic), RTP is identical at Stake and any other
              casino: it is the publisher that sets it, not the operator.
            </p>
            <p>
              Our recommendation: use catalogue RTP as a{' '}
              <strong className="text-ink">signal of overall quality</strong>, not as an absolute
              criterion. A casino maintaining 96%+ across its entire catalogue makes editorial
              choices in favour of the player: it does not fill its catalogue with low-RTP slots to
              inflate margins.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — RTP élevé' : 'FAQ — High RTP'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
