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
      ? 'Meilleur Casino Live en ligne France 2026 — Evolution & Pragmatic Live'
      : 'Best Live Casino Online France 2026 — Evolution & Pragmatic Live',
    description: isFr
      ? 'Comparatif des meilleurs casinos live en France 2026 : roulette, blackjack, baccarat et game shows HD. Evolution Gaming, Pragmatic Live, tables francophones. 18+'
      : 'Best live casinos in France 2026: roulette, blackjack, baccarat and HD game shows. Evolution Gaming, Pragmatic Live, French tables. 18+',
    alternates: { languages: buildHreflang('/casinos/live/') },
  }
}

const FAQ_FR = [
  {
    question: 'Comment fonctionne un casino live en ligne ?',
    answer:
      "Un casino live diffuse en temps réel depuis un studio professionnel équipé de caméras HD. Un croupier humain gère les cartes, la roue ou les dés. Vous jouez via votre navigateur ou application, en voyant le jeu en direct et en interagissant via un chat. La connexion entre le casino et les joueurs est sécurisée. Les résultats sont réels — pas d'algorithme RNG — ce qui offre une transparence supplémentaire.",
  },
  {
    question: 'Quels jeux trouve-t-on dans un casino live ?',
    answer:
      "Les classiques : roulette européenne, blackjack, baccarat et poker casino. Les game shows (Crazy Time, Monopoly Live, Lightning Roulette) représentent désormais 30-40% du trafic live. Des jeux hybrides comme Gonzo's Treasure Hunt ou Deal or No Deal Live complètent l'offre. La plupart des grands casinos proposent 100 à 300 tables live simultanées couvrant tous les budgets.",
  },
  {
    question: 'Quelle connexion internet faut-il pour le casino live ?',
    answer:
      "Une connexion stable à partir de 5 Mb/s est suffisante pour une qualité HD standard. En 4G/5G ou WiFi stable, l'expérience est équivalente à un écran desktop. Sur 3G ou WiFi instable, des micro-coupures peuvent survenir — la table vous expulse alors automatiquement pour ne pas bloquer vos mises. Évitez le live casino sur des connexions inférieures à 2 Mb/s.",
  },
  {
    question: 'Peut-on jouer au casino live sur mobile ?',
    answer:
      "Oui. Evolution Gaming et Pragmatic Live ont conçu leurs jeux mobile-first. L'expérience sur iPhone ou Android via Chrome/Safari est comparable au desktop. Les interfaces sont optimisées pour les écrans 6 pouces avec des boutons de mise adaptés au tactile. Seuls les game shows les plus complexes (avec réalité augmentée) peuvent avoir une qualité légèrement inférieure sur mobile.",
  },
  {
    question: 'Les tables live sont-elles disponibles 24h/24 ?',
    answer:
      'Oui, les principales tables (roulette, blackjack) fonctionnent 24h/24, 7j/7. En dehors des heures de pointe, certaines tables peuvent avoir moins de joueurs mais restent ouvertes. Les game shows ont des horaires de diffusion plus spécifiques (généralement toutes les heures). Pendant les grands événements, des tables spéciales à cotes améliorées sont parfois disponibles.',
  },
  {
    question: 'Comment maximiser ses chances au blackjack live ?',
    answer:
      "Apprenez et appliquez la stratégie de base du blackjack — elle réduit l'avantage maison à environ 0,5%. Cette stratégie est disponible sous forme de tableaux (basic strategy chart) et indique la décision mathématiquement optimale pour chaque combinaison main/carte du croupier. Ne prenez jamais d'assurance (house edge de 7%). Évitez les variantes comme le Blackjack Switch ou le Spanish 21 qui modifient l'avantage maison.",
  },
]

const FAQ_EN = [
  {
    question: 'How does a live online casino work?',
    answer:
      'A live casino streams in real time from a professional studio equipped with HD cameras. A human dealer manages the cards, wheel or dice. You play via your browser or app, watching the game live and interacting via chat. The connection between casino and players is secure. Results are real — no RNG algorithm — providing additional transparency.',
  },
  {
    question: 'What games are available at a live casino?',
    answer:
      "The classics: European roulette, blackjack, baccarat and casino poker. Game shows (Crazy Time, Monopoly Live, Lightning Roulette) now account for 30–40% of live traffic. Hybrid games like Gonzo's Treasure Hunt or Deal or No Deal Live complete the offering. Most major casinos offer 100 to 300 simultaneous live tables covering all budgets.",
  },
  {
    question: 'What internet connection do you need for live casino?',
    answer:
      'A stable connection from 5 Mb/s is sufficient for standard HD quality. On 4G/5G or stable WiFi, the experience is equivalent to a desktop screen. On 3G or unstable WiFi, micro-interruptions may occur — the table automatically removes you to avoid blocking your bets. Avoid live casino on connections below 2 Mb/s.',
  },
  {
    question: 'Can you play live casino on mobile?',
    answer:
      'Yes. Evolution Gaming and Pragmatic Live designed their games mobile-first. The experience on iPhone or Android via Chrome/Safari is comparable to desktop. Interfaces are optimised for 6-inch screens with touch-adapted betting buttons. Only the most complex game shows (with augmented reality) may have slightly lower quality on mobile.',
  },
  {
    question: 'Are live tables available 24/7?',
    answer:
      'Yes, the main tables (roulette, blackjack) operate 24/7. Outside peak hours, some tables may have fewer players but remain open. Game shows have more specific broadcast schedules (generally every hour). During major events, special tables with enhanced odds are sometimes available.',
  },
  {
    question: 'How do you maximise your chances at live blackjack?',
    answer:
      'Learn and apply basic blackjack strategy — it reduces the house edge to approximately 0.5%. This strategy is available as charts (basic strategy chart) and indicates the mathematically optimal decision for every hand/dealer card combination. Never take insurance (7% house edge). Avoid variants like Blackjack Switch or Spanish 21 that modify the house edge.',
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

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Meilleurs casinos live en ligne France 2026'
      : 'Best Live Casinos Online France 2026',
    itemListElement: liveCasinos.slice(0, 10).map((op, i) => ({
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
      pageType="casino_live"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casino Live' : 'Live Casino' },
      ]}
      eyebrow={
        isFr
          ? 'Evolution · Pragmatic Live · HD · Tables FR · 2026'
          : 'Evolution · Pragmatic Live · HD · French Tables · 2026'
      }
      heading={
        isFr ? (
          <>
            Meilleur <em className="not-italic text-green">casino live</em> en ligne
          </>
        ) : (
          <>
            Best <em className="not-italic text-green">live casino</em> online
          </>
        )
      }
      intro={
        isFr
          ? 'Roulette, blackjack, baccarat et game shows HD avec vrais croupiers. Filtrez par fournisseur live, méthode de paiement et bonus pour trouver votre casino live idéal.'
          : 'Roulette, blackjack, baccarat and HD game shows with real dealers. Filter by live provider, payment method and bonus.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={liveCasinos}
      configKey="live"
      editorialH2={
        isFr ? 'Comment choisir son casino live en 2026 ?' : 'How to choose a live casino in 2026?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Le casino live est devenu le segment le plus dynamique du jeu en ligne. La technologie
              d&apos;Evolution Gaming a transformé l&apos;expérience : là où les jeux live des
              années 2010 souffraient de vidéo pixelisée et de latence frustrante, les studios
              modernes diffusent en 4K avec moins de 3 secondes de délai. Crazy Time, Lightning
              Roulette et Monopoly Live ont créé une catégorie entièrement nouvelle, entre game show
              télévisé et jeu de casino traditionnel.
            </p>
            <p>
              Pour évaluer la qualité d&apos;un casino live, notre équipe teste systématiquement
              cinq critères : la <strong className="text-ink">qualité du streaming vidéo</strong>{' '}
              (résolution, fluidité, latence), la diversité des tables (nombre simultané, limites),
              la présence de tables francophones, la disponibilité mobile, et les limites de mise
              pour différents profils de joueurs.
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
              aujourd&apos;hui 30 à 40% du trafic live. Ce sont des jeux hybrides entre émission TV
              et casino, animés par des présentateurs professionnels. Leur RTP (95-96%) est
              légèrement inférieur aux jeux classiques, mais l&apos;entertainment factor est
              incomparable.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Live casino has become the most dynamic segment of online gaming. Evolution
              Gaming&apos;s technology has transformed the experience: where live games of the 2010s
              suffered from pixelated video and frustrating latency, modern studios broadcast in 4K
              with under 3 seconds of delay. Crazy Time, Lightning Roulette and Monopoly Live have
              created an entirely new category, somewhere between TV game show and traditional
              casino game.
            </p>
            <p>
              To evaluate the quality of a live casino, our team systematically tests five criteria:{' '}
              <strong className="text-ink">streaming video quality</strong> (resolution, fluidity,
              latency), table diversity (simultaneous tables and limits), availability of
              English-language tables, mobile performance, and bet limits for different player
              profiles.
            </p>
            <p>
              An often overlooked factor: <strong className="text-ink">minimum bet limits</strong>.
              Some live casinos have minimums of €10 or €25 per bet, which excludes cautious
              players. We prioritise operators offering tables from €0.50 or €1 — accessible to all
              budgets.
            </p>
            <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
              Game shows — a revolution
            </h3>
            <p>
              Crazy Time, Gonzo&apos;s Treasure Hunt, Monopoly Live and their variants now account
              for 30 to 40% of live traffic. These are hybrid games between a TV show and a casino,
              hosted by professional presenters. Their RTP (95–96%) is slightly lower than classic
              games, but the entertainment factor is unmatched.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casino Live' : 'FAQ — Live Casino'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
