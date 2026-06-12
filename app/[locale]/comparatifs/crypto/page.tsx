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
      ? 'Meilleur Casino Crypto France 2026 — BTC, ETH, USDT comparatif'
      : 'Best Crypto Casino France 2026 — BTC, ETH, USDT comparison',
    description: isFr
      ? 'Comparatif des meilleurs casinos crypto en France 2026 : Bitcoin, Ethereum, USDT, Solana. Retraits instantanés, provably fair, RTP élevé. 18+'
      : 'Best crypto casino comparison in France 2026: Bitcoin, Ethereum, USDT, Solana. Instant withdrawals, provably fair, high RTP. 18+',
    alternates: { languages: buildHreflang('/comparatifs/crypto/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un jeu 'provably fair' dans un casino crypto ?",
    answer:
      "Le Provably Fair est une technologie cryptographique unique aux casinos crypto. Avant chaque partie, le casino génère un seed chiffré et le partage avec vous. Après la partie, vous pouvez vérifier mathématiquement que le résultat n'a pas été manipulé en combinant le seed du casino, votre propre seed client, et le nonce (numéro de partie). Des plateformes comme Stake, BC.Game et Rollbit utilisent cette technologie. C'est le niveau le plus élevé de transparence possible dans le jeu en ligne.",
  },
  {
    question: 'Les casinos crypto ont-ils un meilleur RTP que les casinos traditionnels ?',
    answer:
      "Souvent oui, pour deux raisons. Premièrement, les casinos crypto économisent sur les frais de traitement des paiements (pas de frais de carte, pas de commissions d'e-wallets), ce qu'ils peuvent répercuter sur les joueurs via des RTP plus élevés. Deuxièmement, les jeux Provably Fair ont un avantage maison souvent inférieur à 1% (contre 2-5% pour les slots classiques). Stake.com est connu pour ses jeux maison à 1% de house edge.",
  },
  {
    question: 'Est-ce risqué de déposer en Bitcoin dans un casino ?',
    answer:
      "Le principal risque est la volatilité des cours. Si vous déposez 0,1 BTC quand Bitcoin vaut 50 000€ (= 5 000€), puis que Bitcoin chute à 40 000€, votre dépôt ne vaut plus que 4 000€ au moment du retrait (si vous jouez en BTC). Pour éviter ce risque, utilisez des stablecoins comme USDT ou USDC qui maintiennent une valeur de 1 dollar. Vous bénéficiez alors de la rapidité et des économies de frais crypto sans l'exposition à la volatilité.",
  },
  {
    question: 'Peut-on convertir ses gains casino en euros directement ?',
    answer:
      'Pas directement depuis le casino. Vous retirez vos gains en crypto vers votre wallet personnel, puis vous les convertissez en euros via un exchange (Binance, Coinbase, Kraken) ou un service de paiement crypto (Revolut Crypto, Crypto.com). Cette étape supplémentaire prend généralement 10-30 minutes. Des exchanges comme Revolut permettent ensuite de virer directement sur votre compte bancaire en euros.',
  },
  {
    question: "Les casinos crypto demandent-ils une vérification d'identité (KYC) ?",
    answer:
      "Cela dépend de la plateforme et du montant. Les casinos crypto purs (Stake, Rollbit) commencent à appliquer le KYC pour les gros retraits, souvent au-delà de 2 000€ à 10 000€ en équivalent crypto. Les casinos hybrides (crypto + méthodes classiques) appliquent généralement le KYC dès l'inscription. L'anonymat partiel existe pour les petits joueurs, mais n'est pas garanti à grande échelle.",
  },
  {
    question: "Qu'est-ce que le 'house edge' dans les casinos crypto et comment le calculer ?",
    answer:
      "Le house edge est l'avantage statistique du casino sur chaque mise. Un house edge de 1% signifie que le casino garde statistiquement 1€ sur chaque 100€ misés. Pour les jeux Provably Fair (Crash, Dice, Plinko), le house edge est affiché explicitement sur la page du jeu. Pour les slots classiques, le RTP indiqué est l'inverse : RTP 97% = house edge 3%. Préférez toujours les jeux à faible house edge (blackjack en ligne : 0,5% avec la stratégie de base, baccarat : 1,06% sur Banker).",
  },
]

const FAQ_EN = [
  {
    question: "What is a 'provably fair' game at a crypto casino?",
    answer:
      'Provably Fair is a cryptographic technology unique to crypto casinos. Before each game, the casino generates an encrypted seed and shares it with you. After the game, you can mathematically verify that the result was not manipulated by combining the casino seed, your client seed, and the nonce. Platforms like Stake, BC.Game and Rollbit use this technology — the highest possible level of transparency in online gaming.',
  },
  {
    question: 'Do crypto casinos have better RTPs than traditional casinos?',
    answer:
      'Often yes, for two reasons. First, crypto casinos save on payment processing fees (no card fees, no e-wallet commissions), which they can pass on via higher RTPs. Second, Provably Fair games often have a house edge below 1% (compared to 2–5% for classic slots). Stake.com is known for its in-house games at 1% house edge.',
  },
  {
    question: 'Is it risky to deposit in Bitcoin at a casino?',
    answer:
      'The main risk is exchange rate volatility. If you deposit 0.1 BTC when Bitcoin is worth €50,000 (= €5,000), then Bitcoin falls to €40,000, your deposit is only worth €4,000 at withdrawal (if playing in BTC). To avoid this risk, use stablecoins like USDT or USDC which maintain a stable value. You benefit from crypto speed and savings without volatility exposure.',
  },
  {
    question: 'Can you convert casino winnings directly into euros?',
    answer:
      'Not directly from the casino. You withdraw winnings in crypto to your personal wallet, then convert to euros via an exchange (Binance, Coinbase, Kraken) or a crypto payment service (Revolut Crypto). This extra step generally takes 10–30 minutes.',
  },
  {
    question: 'Do crypto casinos require identity verification (KYC)?',
    answer:
      'It depends on the platform and amount. Pure crypto casinos (Stake, Rollbit) are starting to apply KYC for large withdrawals, often above €2,000–€10,000 equivalent. Hybrid casinos generally apply KYC from registration. Partial anonymity exists for small players, but is not guaranteed at scale.',
  },
  {
    question: "What is 'house edge' at crypto casinos and how do you calculate it?",
    answer:
      "House edge is the casino's statistical advantage on each bet. A 1% house edge means the casino keeps €1 on every €100 wagered statistically. For Provably Fair games (Crash, Dice, Plinko), the house edge is explicitly displayed on the game page. For classic slots, RTP is the inverse: 97% RTP = 3% house edge. Prefer low house edge games: blackjack 0.5% with basic strategy, baccarat 1.06% on Banker.",
  },
]

export default async function CryptoComparatifPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const cryptoCasinos = operators
    .filter((op) => op.paymentMethods.some((m) => CRYPTO_METHODS.includes(m)))
    .sort((a, b) => {
      const aC = a.paymentMethods.filter((m) => CRYPTO_METHODS.includes(m)).length
      const bC = b.paymentMethods.filter((m) => CRYPTO_METHODS.includes(m)).length
      return bC - aC || b.rating - a.rating
    })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Meilleurs casinos crypto France 2026' : 'Best Crypto Casinos France 2026',
    itemListElement: cryptoCasinos.slice(0, 10).map((op, i) => ({
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
          { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
          { label: isFr ? 'Casino Crypto' : 'Crypto Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="crypto_casino" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'BTC · ETH · USDT · SOL · Provably Fair · 2026'
              : 'BTC · ETH · USDT · SOL · Provably Fair · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Comparatif <em className="not-italic text-green">casino crypto</em> 2026
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">crypto casino</em> 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Retrait instantané, provably fair et house edge transparent. Filtrez par cryptomonnaie, RTP et licence pour trouver le meilleur casino crypto selon vos critères.'
              : 'Instant withdrawal, provably fair and transparent house edge. Filter by cryptocurrency, RTP and licence to find your ideal crypto casino.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={cryptoCasinos}
        configKey="crypto"
        pageType="crypto_casino"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Les casinos crypto — avantages concrets en 2026'
              : 'Crypto casinos — concrete advantages in 2026'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Les casinos crypto ont évolué bien au-delà du simple &quot;bitcoin casino&quot; des
                années 2010. Les plateformes modernes comme Stake, BC.Game ou Rollbit offrent des
                expériences de jeu sophistiquées avec des avantages structurels réels : frais de
                traitement quasi nuls (permettant des RTP plus élevés), retraits en quelques
                minutes, et une transparence algorithmique via le Provably Fair impossible avec les
                casinos classiques.
              </p>
              <p>
                Le choix de la cryptomonnaie est stratégique.{' '}
                <strong className="text-ink">Bitcoin (BTC)</strong> est le plus universel mais les
                frais de réseau peuvent dépasser 5-10€ pour les petits dépôts.{' '}
                <strong className="text-ink">Litecoin (LTC)</strong> offre des confirmations rapides
                (2,5 minutes) et des frais inférieurs à 0,01€.{' '}
                <strong className="text-ink">USDT (TRC-20)</strong> sur réseau Tron est le roi de la
                vitesse : transactions quasi instantanées pour moins de 0,001€ de frais, avec la
                stabilité d&apos;un stablecoin indexé sur le dollar.
              </p>
              <p>
                Le <strong className="text-ink">principal risque</strong> des casinos crypto est la
                volatilité des cours. Une session de jeu en Bitcoin durant laquelle BTC chute de 10%
                se traduit par une perte supplémentaire de 10% en valeur euros. Pour les joueurs qui
                veulent les avantages crypto sans ce risque, l&apos;USDT est la solution : même
                vitesse, mêmes économies de frais, stabilité garantie.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Crypto casinos have evolved well beyond the simple &apos;bitcoin casino&apos; of the
                2010s. Modern platforms like Stake, BC.Game or Rollbit offer sophisticated gaming
                experiences with real structural advantages: near-zero processing fees (enabling
                higher RTPs), withdrawals in minutes, and algorithmic transparency via Provably Fair
                that is impossible with traditional casinos.
              </p>
              <p>
                Cryptocurrency selection is strategic.{' '}
                <strong className="text-ink">Bitcoin (BTC)</strong> is the most universal but
                network fees can exceed €5–10 for small deposits.{' '}
                <strong className="text-ink">Litecoin (LTC)</strong> offers fast confirmations (2.5
                minutes) and fees below €0.01. <strong className="text-ink">USDT (TRC-20)</strong>{' '}
                on the Tron network is the speed king: near-instant transactions for under €0.001 in
                fees, with the stability of a dollar-pegged stablecoin.
              </p>
              <p>
                The <strong className="text-ink">main risk</strong> with crypto casinos is price
                volatility. A gaming session in Bitcoin during which BTC falls 10% translates into
                an additional 10% loss in euro value. For players who want crypto advantages without
                this risk, USDT is the solution: same speed, same fee savings, guaranteed stability.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr
                ? 'Questions fréquentes — Comparatif Casino Crypto'
                : 'FAQ — Crypto Casino Comparison'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
