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
      ? 'Meilleur Casino Live France 2026 — Comparatif Complet Croupiers'
      : 'Best Live Casino France 2026 — Full Dealer Comparison',
    description: isFr
      ? 'Comparatif des meilleurs casinos live en France 2026 : Evolution Gaming, Pragmatic Live, tables francophones, jeux disponibles. Notes détaillées. 18+'
      : 'Full comparison of best live casinos in France 2026: Evolution Gaming, Pragmatic Live, French tables, available games. Detailed ratings. 18+',
    alternates: { languages: buildHreflang('/comparatifs/live-casino/') },
  }
}

const FAQ_FR = [
  {
    question: 'Comment est évalué un casino live dans notre comparatif ?',
    answer:
      'Notre équipe évalue cinq critères : (1) Qualité vidéo et latence du streaming (testé sur desktop et mobile 4G). (2) Nombre et variété des tables disponibles 24h/24. (3) Limites de mise accessibles pour tous les budgets (minimum ≤ 1€ requis). (4) Présence de tables ou plages horaires en français. (5) Qualité des game shows exclusifs. La note finale combine ces critères avec une pondération équilibrée.',
  },
  {
    question: 'Quelle est la différence entre la roulette live et la roulette RNG ?',
    answer:
      'La roulette live (Live Roulette) utilise une vraie roue physique actionnée par un croupier réel dans un studio professionnel, filmée en HD. La roulette RNG (Random Number Generator) est entièrement virtuelle — un algorithme certifié génère les résultats. Les deux sont équitables, mais la roulette live offre une expérience plus immersive et un RTP légèrement supérieur (97,3% pour la roulette européenne live vs 94-97% pour certaines versions RNG).',
  },
  {
    question: 'Peut-on jouer en live casino avec des bonus ?',
    answer:
      "Rarement à 100%. La plupart des bonus de bienvenue excluent les jeux live du calcul du wager (ou les comptent à 10% seulement). Certains casinos offrent des bonus spécifiques pour le live casino (cashback live, récompenses de table VIP). La meilleure façon de jouer en live avec plus de valeur est via un programme de fidélité/VIP qui offre du cashback — ces avantages s'appliquent généralement aux jeux live.",
  },
  {
    question: 'Quels sont les meilleurs game shows de casino en 2026 ?',
    answer:
      "Les incontournables d'Evolution Gaming : Crazy Time (roue géante avec 4 bonus games, RTP 96,08%), Lightning Roulette (multiplicateurs jusqu'à 500×, RTP 97,1%), Monopoly Live (avec M. Monopoly en AR, RTP 96,23%), Deal or No Deal Live (RTP 95,42%), et Gonzo's Treasure Hunt (chasse aux trésors interactif). Ces jeux combinent divertissement et possibilité de gains importants sur un seul spin.",
  },
  {
    question: 'Le casino live est-il disponible sur téléphone portable ?',
    answer:
      'Oui, tous les casinos live modernes sont accessibles sur mobile. Evolution Gaming et Pragmatic Live optimisent leurs jeux pour iOS et Android, accessibles via navigateur sans téléchargement. La qualité vidéo en 4G/5G ou WiFi stable est équivalente au desktop. Sur une connexion 3G ou WiFi instable, des interruptions peuvent survenir — dans ce cas, la table vous expulse automatiquement pour ne pas bloquer vos mises.',
  },
  {
    question: 'Y a-t-il des tables de blackjack live illimitées ?',
    answer:
      "Oui — l'Infinite Blackjack (Evolution Gaming) permet à un nombre illimité de joueurs de participer à la même partie. C'est la solution pour éviter les tables complètes pendant les heures de pointe. Chaque joueur prend ses propres décisions (tirer, rester, doubler) sur la même main initiale du croupier. Le RTP est de 99,51% avec la stratégie de base — parmi les plus élevés de tout le casino live.",
  },
]

const FAQ_EN = [
  {
    question: 'How is a live casino rated in our comparison?',
    answer:
      'Our team evaluates five criteria: (1) Video quality and streaming latency (tested on desktop and 4G mobile). (2) Number and variety of tables available 24/7. (3) Bet limits accessible for all budgets (minimum ≤ €1 required). (4) Availability of English-language tables. (5) Quality of exclusive game shows. The final score combines these criteria with balanced weighting.',
  },
  {
    question: 'What is the difference between live roulette and RNG roulette?',
    answer:
      'Live roulette uses a real physical wheel operated by a real dealer in a professional studio, filmed in HD. RNG roulette is entirely virtual — a certified algorithm generates the results. Both are fair, but live roulette offers a more immersive experience and a slightly higher RTP (97.3% for European live roulette vs 94–97% for some RNG versions).',
  },
  {
    question: 'Can you play live casino with bonuses?',
    answer:
      'Rarely at 100%. Most welcome bonuses exclude live games from wager calculation (or count them at only 10%). Some casinos offer live casino-specific bonuses (live cashback, VIP table rewards). The best way to play live with more value is through a loyalty/VIP programme that offers cashback — these perks generally apply to live games.',
  },
  {
    question: 'What are the best casino game shows in 2026?',
    answer:
      "Evolution Gaming must-plays: Crazy Time (giant wheel with 4 bonus games, 96.08% RTP), Lightning Roulette (multipliers up to 500×, 97.1% RTP), Monopoly Live (with Mr Monopoly in AR, 96.23% RTP), Deal or No Deal Live (95.42% RTP), and Gonzo's Treasure Hunt (interactive treasure hunt). These games combine entertainment with the possibility of major wins on a single spin.",
  },
  {
    question: 'Is live casino available on mobile?',
    answer:
      'Yes, all modern live casinos are accessible on mobile. Evolution Gaming and Pragmatic Live optimise their games for iOS and Android via browser without downloading. Video quality on 4G/5G or stable WiFi is equivalent to desktop. On unstable connections, the table automatically removes you to avoid blocking your bets.',
  },
  {
    question: 'Are there unlimited live blackjack tables?',
    answer:
      'Yes — Infinite Blackjack (Evolution Gaming) allows an unlimited number of players to participate in the same game. Each player makes their own decisions on the same initial dealer hand. The RTP is 99.51% with basic strategy — among the highest in the entire live casino.',
  },
]

export default async function LiveCasinoComparatifPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const liveFirst = [...operators].sort((a, b) => {
    const aLive = a.features.some((f) => /live/i.test(f)) ? 3 : 0
    const bLive = b.features.some((f) => /live/i.test(f)) ? 3 : 0
    return bLive - aLive || b.rating - a.rating
  })

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
          { label: 'Live Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="live_casino" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Evolution · Pragmatic Live · Croupiers HD · 2026'
              : 'Evolution · Pragmatic Live · HD Dealers · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comparatif <em className="not-italic text-green">meilleur casino live</em> 2026
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">live casino</em> comparison 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Streaming qualité, diversité des tables, limites accessibles et tables francophones — les critères qui comptent vraiment. Filtrez par fournisseur, paiement et licence.'
              : 'Streaming quality, table variety, accessible limits and French tables — the criteria that really matter. Filter by provider, payment and licence.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={liveFirst}
        configKey="live_casino"
        pageType="live_casino"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Evolution Gaming vs Pragmatic Live — le match'
              : 'Evolution Gaming vs Pragmatic Live — the match'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Evolution Gaming (EVO) domine le marché du live casino avec environ 70% de parts de
                marché mondial. Leur avantage compétitif : des studios exclusifs, des jeux brevetés
                comme Lightning Roulette et Crazy Time, et une infrastructure globale qui garantit
                moins de latence. La qualité vidéo 4K et les interfaces des jeux sont considérées
                comme le standard de l&apos;industrie.
              </p>
              <p>
                Pragmatic Live monte en puissance. Leur catalogue — Live Roulette, Mega Roulette,
                PowerUP Roulette — se distingue par des limites de mise plus basses (dès 0,10€ sur
                certaines tables), rendant le live casino accessible à tous les budgets. Leur Mega
                Wheel avec multiplicateurs jusqu&apos;à 500× est une alternative directe au Crazy
                Time. Les RTP sont légèrement supérieurs sur certains jeux Pragmatic vs Evolution.
              </p>
              <p>
                La vraie question n&apos;est pas &quot;lequel est le meilleur&quot; mais
                &quot;lequel est disponible dans mon casino&quot;. Les meilleurs opérateurs
                proposent les deux fournisseurs, plus des partenaires exclusifs comme NetEnt Live,
                Ezugi (propriété d&apos;Evolution) ou Playtech Live. Plus un casino a de
                fournisseurs live, plus le choix de tables et de limites est vaste.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Evolution Gaming (EVO) dominates the live casino market with approximately 70%
                global market share. Their competitive advantage: exclusive studios, patented games
                like Lightning Roulette and Crazy Time, and global infrastructure guaranteeing low
                latency. 4K video quality and game interfaces are considered the industry standard.
              </p>
              <p>
                Pragmatic Live is gaining ground. Their catalogue — Live Roulette, Mega Roulette,
                PowerUP Roulette — is distinguished by lower bet limits (from €0.10 on some tables),
                making live casino accessible to all budgets. Their Mega Wheel with multipliers up
                to 500× is a direct alternative to Crazy Time. RTPs are slightly higher on some
                Pragmatic vs Evolution games.
              </p>
              <p>
                The real question is not &apos;which is better&apos; but &apos;which is available at
                my casino&apos;. The best operators offer both providers, plus exclusive partners
                like NetEnt Live, Ezugi (owned by Evolution) or Playtech Live. The more live
                providers a casino has, the greater the choice of tables and betting limits.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr
                ? 'Questions fréquentes — Comparatif Live Casino'
                : 'FAQ — Live Casino Comparison'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
