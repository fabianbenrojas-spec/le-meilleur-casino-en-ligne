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
      ? 'Meilleur Casino Live en ligne France 2026 — Roulette, Blackjack'
      : 'Best Live Casino France 2026 — Roulette, Blackjack',
    description: isFr
      ? 'Les meilleurs casinos live en France 2026 : roulette live, blackjack live, baccarat, Crazy Time et game shows HD avec vrais croupiers. Testés. 18+'
      : 'Best live casinos in France 2026: live roulette, live blackjack, baccarat, Crazy Time and HD game shows with real dealers. Tested. 18+',
    alternates: { languages: buildHreflang('/casinos/live/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un casino live et comment ça fonctionne ?",
    answer:
      "Un casino live diffuse en temps réel des parties avec de vrais croupiers depuis des studios professionnels. La vidéo est transmise en HD via un flux en direct. Vous pariez via l'interface du casino, et un logiciel OCR lit les résultats physiques (cartes, billes de roulette) et met à jour votre solde instantanément. La technologie principale est celle d'Evolution Gaming, présent dans la majorité des casinos de ce classement.",
  },
  {
    question: 'Quelle est la différence entre Evolution Gaming et Pragmatic Live ?',
    answer:
      'Evolution Gaming est le leader absolu du secteur, avec les studios les plus luxueux, la meilleure qualité vidéo et les jeux les plus innovants (Crazy Time, Monopoly Live, Lightning Roulette). Pragmatic Live est le principal concurrent, avec des RTP légèrement supérieurs sur certains jeux et des tables à limites plus basses, idéales pour les débutants. Un bon casino live propose les deux fournisseurs.',
  },
  {
    question: 'Les tables live sont-elles disponibles 24h/24 ?',
    answer:
      'Les grandes tables (roulette européenne, blackjack standard) sont disponibles 24h/24 et 7j/7. Les tables exclusives et les game shows peuvent avoir des horaires spécifiques. Les tables francophones ont généralement des plages horaires de soirée (18h-2h). Certains casinos proposent des tables dédiées aux joueurs francophones sur demande.',
  },
  {
    question: 'Y a-t-il des tables de casino live en français ?',
    answer:
      'Oui, plusieurs opérateurs proposent des tables avec croupiers francophones. LeoVegas, Betsson et 888 Casino ont des tables ou des plages horaires avec des croupiers parlant français. La plupart des croupiers parlent anglais, avec quelques tables en espagnol, allemand et français. Les interfaces des jeux sont généralement disponibles en français même avec des croupiers anglophones.',
  },
  {
    question: 'Quelles sont les limites de mises au casino live ?',
    answer:
      "Les limites varient selon les jeux et les opérateurs. Pour la roulette : minimum 0,50€ à 1€, maximum 10 000€ à 50 000€ sur les tables standard. Pour le blackjack : 1€ à 10 000€ habituellement. Les salles VIP et tables privées peuvent aller jusqu'à 500 000€ par partie. Les limites sont clairement affichées avant de rejoindre une table.",
  },
  {
    question: 'Peut-on jouer au casino live sur mobile ?',
    answer:
      "Oui, toutes les plateformes modernes sont optimisées pour mobile. Les jeux live fonctionnent via le navigateur mobile sans téléchargement. La qualité vidéo s'adapte automatiquement à votre connexion. Une connexion WiFi ou 4G/5G stable est recommandée. Les tablettes offrent la meilleure expérience mobile grâce à leur écran plus grand.",
  },
]

const FAQ_EN = [
  {
    question: 'What is a live casino and how does it work?',
    answer:
      "A live casino streams real-time games with genuine dealers from professional studios. Video is delivered in HD via a live feed. You bet through the casino's interface, and OCR software reads the physical results (cards, roulette balls) and updates your balance instantly. The leading technology is Evolution Gaming, featured in the majority of casinos in this ranking.",
  },
  {
    question: 'What is the difference between Evolution Gaming and Pragmatic Live?',
    answer:
      'Evolution Gaming is the absolute market leader, with the most luxurious studios, best video quality and most innovative games (Crazy Time, Monopoly Live, Lightning Roulette). Pragmatic Live is the main competitor, with slightly higher RTPs on some games and lower limit tables — ideal for beginners. A good live casino offers both providers.',
  },
  {
    question: 'Are live tables available 24/7?',
    answer:
      'Major tables (European roulette, standard blackjack) are available 24/7. Exclusive tables and game shows may have specific schedules. Some casinos offer dedicated tables for specific markets on request.',
  },
  {
    question: 'Are there live casino tables in English?',
    answer:
      'Yes, the vast majority of live tables have English-speaking dealers. Evolution Gaming and Pragmatic Live studios operate primarily in English. Most game interfaces are available in multiple languages. Some casinos also offer dedicated French, German, and Spanish tables.',
  },
  {
    question: 'What are the betting limits at live casinos?',
    answer:
      'Limits vary by game and operator. For roulette: minimum €0.50 to €1, maximum €10,000 to €50,000 on standard tables. For blackjack: typically €1 to €10,000. VIP rooms and private tables can go up to €500,000 per game. Limits are clearly displayed before joining a table.',
  },
  {
    question: 'Can you play live casino on mobile?',
    answer:
      'Yes, all modern platforms are optimised for mobile. Live games work via mobile browser without downloading. Video quality adjusts automatically to your connection. A stable WiFi or 4G/5G connection is recommended. Tablets offer the best mobile experience thanks to their larger screen.',
  },
]

export default async function CasinosLivePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const liveCasinos = [...operators].sort((a, b) => {
    const aLive = a.features.some((f) => /live/i.test(f)) ? 2 : 0
    const bLive = b.features.some((f) => /live/i.test(f)) ? 2 : 0
    return bLive - aLive || b.rating - a.rating
  })

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
          { label: isFr ? 'Casino Live' : 'Live Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_live" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Evolution · Pragmatic Live · HD · Tables FR · 2026'
              : 'Evolution · Pragmatic Live · HD · French Tables · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Meilleur <em className="not-italic text-green">casino live</em> en ligne
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">live casino</em> online
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Roulette, blackjack, baccarat et game shows HD avec vrais croupiers. Filtrez par fournisseur live, méthode de paiement et bonus pour trouver votre casino live idéal.'
              : 'Roulette, blackjack, baccarat and HD game shows with real dealers. Filter by live provider, payment method and bonus.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={liveCasinos}
        configKey="live"
        pageType="casino_live"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Comment choisir son casino live en 2026 ?'
              : 'How to choose a live casino in 2026?'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Le casino live est devenu le segment le plus dynamique du jeu en ligne. La
                technologie d&apos;Evolution Gaming a transformé l&apos;expérience : là où les jeux
                live des années 2010 souffraient de vidéo pixelisée et de latence frustrante, les
                studios modernes diffusent en 4K avec moins de 3 secondes de délai. Crazy Time,
                Lightning Roulette et Monopoly Live ont créé une catégorie entièrement nouvelle,
                entre game show télévisé et jeu de casino traditionnel.
              </p>
              <p>
                Pour évaluer la qualité d&apos;un casino live, notre équipe teste systématiquement
                cinq critères : la <strong className="text-ink">qualité du streaming vidéo</strong>{' '}
                (résolution, fluidité, latence), la diversité des tables (nombre simultané,
                limites), la présence de tables francophones, la disponibilité mobile, et les
                limites de mise pour différents profils de joueurs.
              </p>
              <p>
                Un point souvent négligé : les{' '}
                <strong className="text-ink">limites de mise minimum</strong>. Certains casinos live
                ont des minimums à 10€ ou 25€ par mise, ce qui exclut les joueurs prudents. Nous
                privilégions les opérateurs qui proposent des tables à partir de 0,50€ ou 1€,
                accessibles à tous les budgets.
              </p>
              <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                Les game shows — une révolution
              </h3>
              <p>
                Crazy Time, Gonzo&apos;s Treasure Hunt, Monopoly Live et leurs dérivés représentent
                aujourd&apos;hui 30 à 40% du trafic live. Ce sont des jeux hybrides entre émission
                TV et casino, animés par des présentateurs professionnels. Leur RTP (95-96%) est
                légèrement inférieur aux jeux classiques, mais l&apos;entertainment factor est
                incomparable.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Live casino has become the most dynamic segment of online gaming. Evolution
                Gaming&apos;s technology has transformed the experience: where live games of the
                2010s suffered from pixelated video and frustrating latency, modern studios
                broadcast in 4K with under 3 seconds of delay. Crazy Time, Lightning Roulette and
                Monopoly Live have created an entirely new category, somewhere between TV game show
                and traditional casino game.
              </p>
              <p>
                To evaluate the quality of a live casino, our team systematically tests five
                criteria: <strong className="text-ink">streaming video quality</strong> (resolution,
                fluidity, latency), table diversity (simultaneous tables and limits), availability
                of English-language tables, mobile performance, and bet limits for different player
                profiles.
              </p>
              <p>
                An often overlooked factor: <strong className="text-ink">minimum bet limits</strong>
                . Some live casinos have minimums of €10 or €25 per bet, which excludes cautious
                players. We prioritise operators offering tables from €0.50 or €1 — accessible to
                all budgets.
              </p>
              <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                Game shows — a revolution
              </h3>
              <p>
                Crazy Time, Gonzo&apos;s Treasure Hunt, Monopoly Live and their variants now account
                for 30 to 40% of live traffic. These are hybrid games between a TV show and a
                casino, hosted by professional presenters. Their RTP (95–96%) is slightly lower than
                classic games, but the entertainment factor is unmatched.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Casino Live' : 'FAQ — Live Casino'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
