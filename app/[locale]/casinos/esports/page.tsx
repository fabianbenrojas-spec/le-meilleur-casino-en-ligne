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
      ? 'Casino eSports France 2026 — CS2, LoL, Dota 2, Valorant'
      : 'eSports Casino France 2026 — CS2, LoL, Dota 2, Valorant',
    description: isFr
      ? 'Les meilleurs casinos eSports en France 2026 : paris sur CS2, League of Legends, Dota 2 et Valorant combinés au casino. Testés. 18+'
      : 'Best eSports casinos in France 2026: betting on CS2, League of Legends, Dota 2 and Valorant combined with the casino. Tested. 18+',
    alternates: { languages: buildHreflang('/casinos/esports/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un casino eSports ?",
    answer:
      'Un casino eSports est une plateforme qui combine un casino en ligne classique (machines à sous, jeux de table, live) avec un sportsbook dédié aux paris sur les compétitions eSports : CS2, League of Legends, Dota 2, Valorant, FIFA. Ces plateformes permettent de parier sur des matchs professionnels tout en jouant au casino dans la même session.',
  },
  {
    question: 'Quels sont les jeux eSports les plus populaires pour les paris ?',
    answer:
      'CS2 (Counter-Strike 2) est le jeu le plus parisé avec un écosystème de tournois mondial (Major, ESL, BLAST). League of Legends (LCI, Worlds) et Dota 2 (TI) suivent de près. Valorant est en forte croissance. Pour les débutants, CS2 est recommandé car les cotes sont les plus liquides et les marchés les plus transparents.',
  },
  {
    question: 'Les paris eSports sont-ils légaux en France ?',
    answer:
      "En France, les paris eSports sont autorisés sur les sites agréés ANJ (PMU, Betclic, Winamax proposent des marchés eSports limités). Sur les casinos internationaux listés sur cette page, les paris eSports fonctionnent dans un cadre légal similaire au casino offshore — non régulé par l'ANJ mais pas illégal pour les joueurs.",
  },
  {
    question: 'Comment analyser un match eSports pour parier ?',
    answer:
      'Les facteurs clés : (1) Forme récente des équipes (5 derniers matchs). (2) Head-to-head historique. (3) Composition des équipes — un joueur clé absent change tout. (4) Map pool (en CS2, certaines équipes dominent sur des maps spécifiques). (5) Conditions du tournoi (online vs LAN — les résultats divergent souvent). Des sites comme HLTV.org (CS2) ou Liquipedia (tous jeux) offrent les données nécessaires.',
  },
  {
    question: "Les bonus casino s'appliquent-ils aux paris eSports ?",
    answer:
      'Rarement. Les bonus de bienvenue des casinos sont généralement réservés aux jeux de casino (slots, table). Pour les paris sportifs/eSports, des promotions séparées existent souvent : pari sans risque, cote boostée, etc. Certains opérateurs comme GG.Bet proposent des bonus dédiés aux paris eSports. Lisez les conditions pour savoir si votre bonus couvre les deux sections.',
  },
  {
    question: 'Quelle est la différence entre les skin gambling et les paris eSports classiques ?',
    answer:
      "Les paris eSports classiques utilisent de l'argent réel sur des plateformes licenciées. Le 'skin gambling' (paris avec des cosmétiques CS2) est une pratique distincte, souvent non régulée et ciblant principalement les mineurs — nous déconseillons fortement. Les sites listés ici proposent exclusivement des paris en argent réel sur des plateformes licenciées.",
  },
]

const FAQ_EN = [
  {
    question: 'What is an eSports casino?',
    answer:
      'An eSports casino is a platform that combines a classic online casino (slots, table games, live) with a sportsbook dedicated to eSports betting: CS2, League of Legends, Dota 2, Valorant, FIFA. These platforms allow you to bet on professional matches while playing at the casino in the same session.',
  },
  {
    question: 'Which eSports games are most popular for betting?',
    answer:
      'CS2 (Counter-Strike 2) is the most bet-on game with a global tournament ecosystem (Majors, ESL, BLAST). League of Legends (LCK, Worlds) and Dota 2 (TI) follow closely. Valorant is growing rapidly. For beginners, CS2 is recommended as odds are the most liquid and markets the most transparent.',
  },
  {
    question: 'Is eSports betting legal?',
    answer:
      'Legal status varies by country. In France, eSports betting is authorised on ANJ-licensed sites (Betclic, Winamax offer limited eSports markets). On the international casinos listed on this page, eSports betting operates in a legal framework similar to offshore casinos — not regulated by the ANJ but not illegal for players.',
  },
  {
    question: 'How do you analyse an eSports match for betting?',
    answer:
      'Key factors: (1) Recent form (last 5 matches). (2) Historical head-to-head. (3) Team roster — a key player absent changes everything. (4) Map pool (in CS2, some teams dominate on specific maps). (5) Tournament conditions (online vs LAN — results often diverge). Sites like HLTV.org (CS2) or Liquipedia (all games) provide the necessary data.',
  },
  {
    question: 'Do casino bonuses apply to eSports betting?',
    answer:
      'Rarely. Casino welcome bonuses are generally reserved for casino games (slots, tables). For sports/eSports betting, separate promotions often exist: risk-free bet, boosted odds, etc. Some operators like GG.Bet offer dedicated eSports betting bonuses. Read the conditions to find out whether your bonus covers both sections.',
  },
  {
    question: 'What is the difference between skin gambling and classic eSports betting?',
    answer:
      "Classic eSports betting uses real money on licensed platforms. 'Skin gambling' (betting with CS2 cosmetics) is a separate practice, often unregulated and primarily targeting minors — we strongly advise against it. The sites listed here exclusively offer real-money betting on licensed platforms.",
  },
]

export default async function CasinosEsportsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const esportsCasinos = [...operators].sort((a, b) => {
    const aEs = a.features.some((f) => /esport|e-sport|gg\.bet|gaming/i.test(f)) ? 2 : 0
    const bEs = b.features.some((f) => /esport|e-sport|gg\.bet|gaming/i.test(f)) ? 2 : 0
    return bEs - aEs || b.rating - a.rating
  })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Casinos en ligne esports France 2026' : 'eSports Online Casinos France 2026',
    itemListElement: esportsCasinos.slice(0, 10).map((op, i) => ({
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
      pageType="casino_esports"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casino eSports' : 'eSports Casino' },
      ]}
      eyebrow="CS2 · LoL · Dota 2 · Valorant · Casino · 2026"
      heading={
        isFr ? (
          <>
            Meilleurs casinos <em className="not-italic text-green">eSports</em> 2026
          </>
        ) : (
          <>
            Best <em className="not-italic text-green">eSports</em> casinos 2026
          </>
        )
      }
      intro={
        isFr
          ? 'Casino et sportsbook eSports combinés : pariez sur CS2, LoL et Dota 2 tout en accédant au casino complet. Filtrez par bonus, paiement et licence.'
          : 'Combined casino and eSports sportsbook: bet on CS2, LoL and Dota 2 while accessing the full casino.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={esportsCasinos}
      configKey="esports"
      editorialH2={
        isFr ? "L'explosion des paris eSports en 2026" : 'The eSports betting explosion in 2026'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Le marché mondial des paris eSports a dépassé les 8 milliards de dollars en 2025 et
              continue sa progression à +20% par an. CS2, League of Legends et Dota 2 concentrent
              environ 70% du volume de paris. La particularité du marché eSports : les joueurs sont
              souvent des connaisseurs du jeu, ce qui crée une dynamique différente des paris
              sportifs classiques.
            </p>
            <p>
              <strong className="text-ink">GG.Bet</strong> est le spécialiste historique, avec des
              marchés eSports très profonds et la couverture la plus complète des tournois mineurs.{' '}
              <strong className="text-ink">Betsson</strong> se distingue par son sportsbook eSports
              intégré à un casino de qualité premium. <strong className="text-ink">22Bet</strong>{' '}
              offre souvent les cotes les plus élevées sur les grands tournois.
            </p>
            <p>
              Un avantage compétitif pour les joueurs informés : des bookmakers peuvent manquer
              d&apos;expertise sur les ligues régionales. Des joueurs qui suivent de près la scène
              CS2 française (Team Vitality, Karmine Corp) peuvent identifier des opportunités de
              value betting que les algorithmes ne détectent pas encore.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              The global eSports betting market exceeded $8 billion in 2025 and continues growing at
              +20% annually. CS2, League of Legends and Dota 2 account for approximately 70% of
              betting volume. The eSports market has a distinctive characteristic: bettors are often
              genuine experts in the games, creating a dynamic different from traditional sports
              betting.
            </p>
            <p>
              <strong className="text-ink">GG.Bet</strong> is the long-standing specialist, with
              very deep eSports markets and the most complete coverage of minor tournaments.{' '}
              <strong className="text-ink">Betsson</strong> stands out for its eSports sportsbook
              integrated with a premium-quality casino. <strong className="text-ink">22Bet</strong>{' '}
              often offers the highest odds on major tournaments.
            </p>
            <p>
              A competitive edge for informed bettors: bookmakers can lack expertise on regional
              leagues. Players who closely follow a particular regional scene may identify value
              betting opportunities that algorithms have not yet detected.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casino eSports' : 'FAQ — eSports Casino'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
