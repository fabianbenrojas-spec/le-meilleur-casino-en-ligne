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
      ? 'Meilleur Casino eSports France 2026 — Paris CS2, LoL, Dota 2'
      : 'Best eSports Casino France 2026 — CS2, LoL, Dota 2 Betting',
    description: isFr
      ? 'Casinos et bookmakers eSports en France 2026 : paris CS2, League of Legends, Dota 2, Valorant. Casino et sportsbook combinés, bonus dédiés. 18+'
      : 'eSports casinos and bookmakers in France 2026: CS2, League of Legends, Dota 2, Valorant betting. Combined casino and sportsbook, dedicated bonuses. 18+',
    alternates: { languages: buildHreflang('/casinos/esports/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce que les paris eSports dans un casino en ligne ?",
    answer:
      'Les paris eSports consistent à parier sur les résultats de compétitions de jeux vidéo professionnels : matchs CS2, tournois League of Legends, Dota 2 The International, Valorant Champions, etc. Les opérateurs comme GG.Bet, 22Bet et Betsson proposent des marchés similaires aux paris sportifs classiques : résultat du match, handicap, premier sang, nombre de maps joués, etc.',
  },
  {
    question: 'Les paris eSports sont-ils légaux en France ?',
    answer:
      "Les paris eSports sont légaux en France sur les sites agréés ANJ (Betclic, Winamax, PMU), mais uniquement sur certains jeux listés par l'ANJ. Sur les sites internationaux non ANJ (GG.Bet, 22Bet), la légalité est plus floue : ces sites ne sont pas illégaux pour les joueurs français, mais opèrent sans agrément ANJ. Pour la fiscalité, les gains dépassant un certain seuil sont imposables.",
  },
  {
    question: 'Quelle est la différence entre un casino eSports et un bookmaker eSports ?',
    answer:
      'Un casino eSports comme GG.Bet ou Betsson combine les deux : un casino classique (machines à sous, table games, live dealer) ET un sportsbook eSports. Un bookmaker pur eSports se concentre uniquement sur les paris sur compétitions. Pour un joueur qui veut à la fois jouer en casino et parier sur des matchs eSports, les opérateurs combinés offrent la meilleure expérience.',
  },
  {
    question: "Les bonus casino s'appliquent-ils aux paris eSports ?",
    answer:
      'Généralement non. Les bonus de bienvenue casino sont dédiés aux jeux de casino. Les bonus sportsbook/eSports sont distincts et ont leurs propres conditions. Certains opérateurs proposent des offres combinées ou permettent de transférer du solde entre casino et sportsbook, mais les bonus restent segmentés. Vérifiez toujours les CGU du bonus pour confirmer quels jeux comptent pour le wager.',
  },
  {
    question: 'Quels jeux eSports peut-on parier sur les casinos en ligne ?',
    answer:
      'Les marchés les plus disponibles : CS2 (Counter-Strike 2) — le plus populaire, League of Legends, Dota 2, Valorant, FIFA/EA FC, Call of Duty, Rainbow Six Siege, Overwatch 2 et StarCraft II. Les tournois majeurs (ESL One, PGL Major, LoL World Championship, The International) attirent les meilleures cotes et la plus grande variété de marchés.',
  },
  {
    question: 'Comment fonctionne le live betting sur les eSports ?',
    answer:
      "Le live betting eSports permet de parier en cours de match, avec des cotes qui évoluent en temps réel. Pour CS2, on peut parier sur le prochain round, le prochain map, ou l'issue finale. La latence des streams officiels (généralement 30-60 secondes) crée parfois un avantage pour les spectateurs devant les data feeds — la plupart des bookmakers ont des règles pour gérer ces situations.",
  },
]

const FAQ_EN = [
  {
    question: 'What is eSports betting in an online casino?',
    answer:
      'eSports betting involves wagering on the results of professional video game competitions: CS2 matches, League of Legends tournaments, Dota 2 The International, Valorant Champions, etc. Operators like GG.Bet, 22Bet and Betsson offer markets similar to traditional sports betting: match winner, handicap, first blood, number of maps played, etc.',
  },
  {
    question: 'Is eSports betting legal?',
    answer:
      'In France, eSports betting is legal on ANJ-licensed sites (Betclic, Winamax, PMU), but only on certain listed games. On international non-ANJ sites (GG.Bet, 22Bet), these sites are not illegal for players but operate without ANJ authorisation. Tax rules vary by country — check local regulations.',
  },
  {
    question: 'What is the difference between an eSports casino and an eSports bookmaker?',
    answer:
      'An eSports casino like GG.Bet or Betsson combines both: a classic casino (slots, table games, live dealer) AND an eSports sportsbook. A pure eSports bookmaker focuses only on competitive match betting. For a player who wants both casino gaming and eSports betting, combined operators offer the best experience.',
  },
  {
    question: 'Do casino bonuses apply to eSports bets?',
    answer:
      'Generally no. Casino welcome bonuses are dedicated to casino games. Sportsbook/eSports bonuses are separate with their own conditions. Some operators offer combined offers, but bonuses remain segmented. Always check the bonus T&Cs to confirm which games count towards the wager.',
  },
  {
    question: 'Which eSports games can you bet on at online casinos?',
    answer:
      'The most widely available markets: CS2 — the most popular, League of Legends, Dota 2, Valorant, FIFA/EA FC, Call of Duty, Rainbow Six Siege, Overwatch 2 and StarCraft II. Major tournaments (ESL One, PGL Major, LoL Worlds, The International) attract the best odds and greatest variety of markets.',
  },
  {
    question: 'How does live eSports betting work?',
    answer:
      'Live eSports betting allows you to bet during a match, with odds changing in real time. In CS2, you can bet on the next round, next map, or final outcome. The latency of official streams (typically 30–60 seconds) sometimes creates an advantage for viewers — most bookmakers have rules to manage these situations.',
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
          { label: isFr ? 'Casino eSports' : 'eSports Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_esports" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'CS2 · LoL · Dota 2 · Valorant · Casino · 2026'
              : 'CS2 · LoL · Dota 2 · Valorant · Casino · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Meilleurs casinos <em className="not-italic text-green">eSports</em> 2026
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">eSports</em> casinos 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Casino et sportsbook eSports combinés : pariez sur CS2, LoL et Dota 2 tout en accédant au casino complet. Filtrez par bonus, paiement et licence.'
              : 'Combined casino and eSports sportsbook: bet on CS2, LoL and Dota 2 while accessing the full casino.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={esportsCasinos}
        configKey="esports"
        pageType="casino_esports"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? "L'explosion des paris eSports en 2026"
              : 'The eSports betting explosion in 2026'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Le marché mondial des paris eSports a dépassé les 8 milliards de dollars en 2025 et
                continue sa progression à +20% par an. CS2, League of Legends et Dota 2 concentrent
                environ 70% du volume de paris. La particularité du marché eSports : les joueurs
                sont souvent des connaisseurs du jeu, ce qui crée une dynamique différente des paris
                sportifs classiques.
              </p>
              <p>
                <strong className="text-ink">GG.Bet</strong> est le spécialiste historique, avec des
                marchés eSports très profonds et la couverture la plus complète des tournois
                mineurs. <strong className="text-ink">Betsson</strong> se distingue par son
                sportsbook eSports intégré à un casino de qualité premium.{' '}
                <strong className="text-ink">22Bet</strong> offre souvent les cotes les plus élevées
                sur les grands tournois.
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
                The global eSports betting market exceeded $8 billion in 2025 and continues growing
                at +20% annually. CS2, League of Legends and Dota 2 account for approximately 70% of
                betting volume. The eSports market has a distinctive characteristic: bettors are
                often genuine experts in the games, creating a dynamic different from traditional
                sports betting.
              </p>
              <p>
                <strong className="text-ink">GG.Bet</strong> is the long-standing specialist, with
                very deep eSports markets and the most complete coverage of minor tournaments.{' '}
                <strong className="text-ink">Betsson</strong> stands out for its eSports sportsbook
                integrated with a premium-quality casino.{' '}
                <strong className="text-ink">22Bet</strong> often offers the highest odds on major
                tournaments.
              </p>
              <p>
                A competitive edge for informed bettors: bookmakers can lack expertise on regional
                leagues. Players who closely follow a particular regional scene may identify value
                betting opportunities that algorithms have not yet detected.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Casino eSports' : 'FAQ — eSports Casino'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
