import type { Metadata } from 'next'
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { ListingPageClient } from '@/components/listing/listing-page-client'
import { operators } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

const CRYPTO_METHODS = ['₿', 'ETH', 'LTC', 'DOGE', 'USDT', 'SOL']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Meilleurs Casinos Bitcoin & Crypto en ligne France 2026'
      : 'Best Bitcoin & Crypto Online Casinos France 2026',
    description: isFr
      ? "Comparatif des meilleurs casinos Bitcoin et crypto en France 2026 : BTC, ETH, USDT, SOL. Retraits instantanés, RTP élevé, testés à l'argent réel. 18+"
      : 'Best Bitcoin and crypto online casinos in France 2026: BTC, ETH, USDT, SOL. Instant withdrawals, high RTP, real-money tested. 18+',
    alternates: { languages: buildHreflang('/casinos/bitcoin/') },
  }
}

const FAQ_FR = [
  {
    question: 'Les casinos Bitcoin sont-ils légaux en France ?',
    answer:
      "Les casinos Bitcoin ne sont pas régulés par l'ANJ (Autorité Nationale des Jeux). Jouer sur ces plateformes n'est pas illégal pour les joueurs français, mais ces sites opèrent en dehors du cadre réglementaire français. Ils sont généralement licenciés à Malte (MGA), Curaçao ou Gibraltar. Nous recommandons de privilégier les opérateurs avec licences MGA ou Gibraltar pour une protection maximale.",
  },
  {
    question: 'Comment déposer en Bitcoin sur un casino en ligne ?',
    answer:
      "Pour déposer en Bitcoin, vous avez besoin d'un portefeuille crypto (Binance, Coinbase, MetaMask ou un wallet hardware). Dans la caisse du casino, sélectionnez Bitcoin, copiez l'adresse de dépôt, puis effectuez le virement depuis votre wallet. La confirmation prend généralement 10-30 minutes selon le réseau et les frais de gas que vous avez configurés.",
  },
  {
    question: 'Les retraits en cryptomonnaies sont-ils vraiment instantanés ?',
    answer:
      "Les retraits en crypto sont les plus rapides disponibles : Bitcoin prend 10-60 minutes (selon les confirmations requises), Ethereum 1-5 minutes, et USDT (Tron) ou Litecoin moins de 5 minutes en général. Contrairement aux virements bancaires (2-5 jours) ou aux cartes (1-3 jours), il n'y a pas de délai côté casino une fois la vérification KYC passée.",
  },
  {
    question: 'Les gains en cryptos sont-ils imposables en France ?',
    answer:
      'Oui. En France, les plus-values sur cessions de cryptoactifs sont imposées à 30% (Prélèvement Forfaitaire Unique) si elles dépassent 305€ par an. Les gains de jeux ne sont pas imposables en eux-mêmes, mais si vous convertissez vos gains crypto en euros, la plus-value réalisée sur la crypto elle-même est taxable. Consultez un expert-comptable pour votre situation personnelle.',
  },
  {
    question: 'Quelle cryptomonnaie est la plus avantageuse pour jouer en casino ?',
    answer:
      "Pour les petits montants : Litecoin (LTC) ou USDT (TRC-20) car les frais de réseau sont quasi nuls. Pour les gros montants : Bitcoin (BTC) ou Ethereum (ETH) car plus universellement acceptés. L'USDT a l'avantage d'être un stablecoin (1 USDT = 1 USD), ce qui élimine la volatilité du cours pendant votre session de jeu.",
  },
  {
    question: 'Mon identité est-elle protégée sur un casino crypto ?',
    answer:
      "Les casinos crypto nécessitent généralement moins de vérification d'identité pour les petits dépôts. Cependant, la plupart des opérateurs sérieux appliquent le KYC (Know Your Customer) pour les retraits importants, conformément aux réglementations anti-blanchiment. Une anonymité totale n'est pas garantie — la blockchain étant publique, toutes les transactions sont traçables.",
  },
]

const FAQ_EN = [
  {
    question: 'Are Bitcoin casinos legal in France?',
    answer:
      'Bitcoin casinos are not regulated by the ANJ. Playing on these platforms is not illegal for players, but these sites operate outside the French regulatory framework. They are generally licensed in Malta (MGA), Curaçao or Gibraltar. We recommend prioritising operators with MGA or Gibraltar licences for maximum protection.',
  },
  {
    question: 'How do you deposit with Bitcoin at an online casino?',
    answer:
      'To deposit in Bitcoin, you need a crypto wallet (Binance, Coinbase, MetaMask or a hardware wallet). In the casino cashier, select Bitcoin, copy the deposit address, then transfer from your wallet. Confirmation generally takes 10–30 minutes depending on the network and the gas fees you have set.',
  },
  {
    question: 'Are cryptocurrency withdrawals really instant?',
    answer:
      'Crypto withdrawals are the fastest available: Bitcoin takes 10–60 minutes (depending on required confirmations), Ethereum 1–5 minutes, and USDT (Tron) or Litecoin under 5 minutes generally. Unlike bank transfers (2–5 business days) or cards (1–3 days), there is no delay on the casino side once KYC verification is complete.',
  },
  {
    question: 'Are crypto winnings taxable?',
    answer:
      'Tax rules vary by country. In France, capital gains on crypto asset disposals are taxed at 30% (PFU) if they exceed €305 per year. Gambling winnings are not taxable in themselves, but if you convert your crypto winnings into euros, any capital gain on the crypto itself is taxable. Consult a tax adviser for your personal situation.',
  },
  {
    question: 'Which cryptocurrency is best for casino gaming?',
    answer:
      'For small amounts: Litecoin (LTC) or USDT (TRC-20) as network fees are near zero. For large amounts: Bitcoin (BTC) or Ethereum (ETH) as they are more universally accepted. USDT has the advantage of being a stablecoin (1 USDT = 1 USD), which eliminates exchange rate volatility during your gaming session.',
  },
  {
    question: 'Is my identity protected at a crypto casino?',
    answer:
      'Crypto casinos generally require less identity verification for small deposits. However, most serious operators apply KYC for large withdrawals, in line with anti-money laundering regulations. Full anonymity is not guaranteed — the blockchain being public, all transactions are traceable.',
  },
]

export default async function CasinosBitcoinPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const cryptoCasinos = operators
    .filter((op) => op.paymentMethods.some((m) => CRYPTO_METHODS.includes(m)))
    .sort((a, b) => b.rating - a.rating)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
          { label: isFr ? 'Casinos Bitcoin' : 'Bitcoin Casinos' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_bitcoin" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? `${cryptoCasinos.length} casinos testés · BTC · ETH · USDT · 2026`
              : `${cryptoCasinos.length} tested casinos · BTC · ETH · USDT · 2026`}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Meilleurs <em className="not-italic text-green">casinos Bitcoin</em> en ligne
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">Bitcoin casinos</em> online
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Retraits instantanés en BTC, ETH, LTC et USDT. Filtrez par cryptomonnaie, RTP et licence pour trouver le casino crypto qui correspond à votre profil.'
              : 'Instant withdrawals in BTC, ETH, LTC and USDT. Filter by cryptocurrency, RTP and licence to find the right crypto casino for you.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={cryptoCasinos}
        configKey="bitcoin"
        pageType="casino_bitcoin"
        locale={locale}
      />

      {/* SEO editorial section */}
      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Pourquoi jouer dans un casino Bitcoin en 2026 ?'
              : 'Why play at a Bitcoin casino in 2026?'}
          </h2>
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            {isFr ? (
              <>
                <p>
                  Les casinos Bitcoin représentent une évolution majeure du secteur. Leur avantage
                  premier est la <strong className="text-ink">rapidité des retraits</strong> : là où
                  une carte bancaire prend 1 à 3 jours ouvrés, une transaction Bitcoin est confirmée
                  en moins d&apos;une heure, et l&apos;USDT sur réseau Tron en quelques secondes.
                  Pour les joueurs réguliers, c&apos;est un avantage concret et mesurable.
                </p>
                <p>
                  Du point de vue du RTP, plusieurs opérateurs crypto publient leurs résultats de
                  manière transparente sur la blockchain. Des plateformes comme{' '}
                  <strong className="text-ink">Stake, Rollbit ou BC.Game</strong> proposent des jeux
                  provably fair dont l&apos;équité mathématique peut être vérifiée par
                  n&apos;importe qui. C&apos;est un niveau de transparence impossible avec les
                  casinos traditionnels.
                </p>
                <p>
                  La diversité des cryptomonnaies acceptées a considérablement évolué. Bitcoin reste
                  le standard, mais Ethereum, Litecoin, Solana et les stablecoins USDT permettent de
                  choisir le bon outil selon vos besoins : vitesse (LTC, SOL), stabilité (USDT,
                  USDC), ou valeur long terme (BTC, ETH). La plupart des casinos crypto acceptent
                  désormais plus de 10 cryptomonnaies différentes.
                </p>
                <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                  Notre méthode de sélection
                </h3>
                <p>
                  Chaque casino de ce classement a été testé par notre équipe avec de l&apos;argent
                  réel. Nous évaluons : la vitesse réelle des retraits (pas les délais annoncés), la
                  disponibilité des supports en français, la richesse du catalogue de jeux, la
                  qualité du service client, et la solidité de la licence. Les casinos dont les
                  retraits dépassent 48h sont automatiquement exclus du classement.
                </p>
              </>
            ) : (
              <>
                <p>
                  Bitcoin casinos represent a major evolution in the sector. Their primary advantage
                  is <strong className="text-ink">withdrawal speed</strong>: where a bank card takes
                  1 to 3 business days, a Bitcoin transaction is confirmed in under an hour, and
                  USDT on the Tron network in seconds. For regular players, this is a concrete and
                  measurable advantage.
                </p>
                <p>
                  From an RTP standpoint, several crypto operators publish their results
                  transparently on the blockchain. Platforms like{' '}
                  <strong className="text-ink">Stake, Rollbit or BC.Game</strong> offer provably
                  fair games whose mathematical fairness can be verified by anyone. This is a level
                  of transparency impossible with traditional casinos.
                </p>
                <p>
                  The variety of accepted cryptocurrencies has expanded considerably. Bitcoin
                  remains the standard, but Ethereum, Litecoin, Solana and stablecoins like USDT let
                  you choose the right tool for your needs: speed (LTC, SOL), stability (USDT,
                  USDC), or long-term value (BTC, ETH). Most crypto casinos now accept over 10
                  different cryptocurrencies.
                </p>
                <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                  Our selection method
                </h3>
                <p>
                  Each casino in this ranking has been tested by our team with real money. We
                  evaluate: actual withdrawal speeds (not advertised delays), game catalogue
                  quality, customer service quality, and the strength of the licence. Casinos whose
                  withdrawals exceed 48 hours are automatically excluded from the ranking.
                </p>
              </>
            )}
          </div>

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr
                ? 'Questions fréquentes — Casino Bitcoin'
                : 'Frequently asked questions — Bitcoin Casino'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
