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
      ? 'Casino en ligne PayPal France 2026 — Dépôt & Retrait Rapide'
      : 'PayPal Online Casino France 2026 — Fast Deposit & Withdrawal',
    description: isFr
      ? 'Liste des casinos en ligne qui acceptent PayPal en France 2026 : dépôts et retraits rapides, sécurisés, sans frais. Comparatif complet. 18+'
      : 'List of online casinos accepting PayPal in France 2026: fast, secure, fee-free deposits and withdrawals. Full comparison. 18+',
    alternates: { languages: buildHreflang('/casinos/avec-paypal/') },
  }
}

const FAQ_FR = [
  {
    question: 'Tous les casinos en ligne acceptent-ils PayPal ?',
    answer:
      "Non, PayPal est sélectif avec les opérateurs de jeux d'argent. PayPal travaille uniquement avec des casinos disposant de licences reconnues (MGA, UKGC, Gibraltar) et respectant ses conditions strictes. Les casinos avec licence Curaçao ou sans licence sérieuse ne peuvent généralement pas accepter PayPal. Cette sélectivité est un indicateur de qualité.",
  },
  {
    question: 'Y a-t-il des frais PayPal pour les dépôts et retraits de casino ?',
    answer:
      "Du côté du casino, les dépôts et retraits via PayPal sont généralement sans frais. Côté PayPal, si votre compte est en euros et que vous déposez dans un casino en euros, aucun frais de conversion. Des frais de change (3-4%) s'appliquent si les devises diffèrent.",
  },
  {
    question: 'Combien de temps prennent les retraits PayPal dans un casino ?',
    answer:
      "Les retraits vers PayPal sont généralement traités en 24-48 heures par le casino (après vérification KYC). Une fois approuvé, l'argent apparaît instantanément sur votre compte PayPal. Le délai initial peut être plus long lors de votre premier retrait (24 à 72 heures) car le casino doit vérifier votre identité.",
  },
  {
    question: 'PayPal est-il sécurisé pour jouer en casino en ligne ?',
    answer:
      "PayPal offre une protection acheteur mais les jeux d'argent en font généralement partie des exceptions. La vraie sécurité de PayPal est la séparation : votre numéro de carte bancaire n'est jamais partagé avec le casino. Le chiffrement 2048 bits et l'authentification à deux facteurs offrent une protection technique solide.",
  },
  {
    question: 'Puis-je utiliser un compte PayPal professionnel pour jouer ?',
    answer:
      "Techniquement possible mais déconseillé. Utiliser un compte professionnel pour des transactions de jeux d'argent peut poser des problèmes avec PayPal (risque de suspension) et des complications fiscales. Utilisez toujours un compte PayPal personnel. Assurez-vous que les noms correspondent entre votre compte casino et votre compte PayPal.",
  },
  {
    question: 'Skrill ou PayPal — lequel est le mieux pour les casinos ?',
    answer:
      "Skrill est spécialement conçu pour les jeux en ligne et accepté par plus de casinos. Ses avantages : retraits plus rapides, largement disponible même dans les casinos sans licence premium. PayPal a l'avantage de la notoriété et de la protection consommateur. Pour les débutants : PayPal. Pour les joueurs réguliers : Skrill pour sa disponibilité.",
  },
]

const FAQ_EN = [
  {
    question: 'Do all online casinos accept PayPal?',
    answer:
      'No, PayPal is selective with gambling operators. PayPal only works with casinos holding recognised licences (MGA, UKGC, Gibraltar) and complying with its strict conditions. Casinos with a Curaçao licence or no serious licence generally cannot accept PayPal. This selectivity is an indicator of quality.',
  },
  {
    question: 'Are there PayPal fees for casino deposits and withdrawals?',
    answer:
      'On the casino side, deposits and withdrawals via PayPal are generally fee-free. On the PayPal side, if your account is in euros and you deposit at a casino in euros, no conversion fees apply. Exchange fees (3–4%) apply if the currencies differ.',
  },
  {
    question: 'How long do PayPal withdrawals take at a casino?',
    answer:
      'PayPal withdrawals are generally processed within 24–48 hours by the casino (after KYC verification). Once approved, the money appears instantly in your PayPal account. The initial delay may be longer on your first withdrawal (24 to 72 hours) as the casino must verify your identity.',
  },
  {
    question: 'Is PayPal safe for playing at an online casino?',
    answer:
      'PayPal offers buyer protection but gambling generally falls under its exceptions. The real security of PayPal is separation: your card number is never shared with the casino. 2048-bit encryption and two-factor authentication provide solid technical protection.',
  },
  {
    question: 'Can I use a business PayPal account to play?',
    answer:
      'Technically possible but not recommended. Using a business account for gambling transactions can cause issues with PayPal (risk of suspension) and tax complications. Always use a personal PayPal account. Make sure the names match between your casino account and your PayPal account.',
  },
  {
    question: 'Skrill or PayPal — which is better for casinos?',
    answer:
      'Skrill is purpose-built for online gaming and accepted by more casinos. Its advantages: faster withdrawals, widely available even at non-premium casinos. PayPal has the advantage of brand recognition and consumer protection. For beginners: PayPal. For regular players: Skrill for its availability.',
  },
]

export default async function CasinosAvecPaypalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const paypalFirst = operators
    .filter((op) => op.paymentMethods.includes('PPAL') || op.paymentMethods.includes('SKRL'))
    .sort((a, b) => {
      const aP = a.paymentMethods.includes('PPAL') ? 2 : 0
      const bP = b.paymentMethods.includes('PPAL') ? 2 : 0
      return bP - aP || b.rating - a.rating
    })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Casinos en ligne acceptant PayPal France 2026'
      : 'PayPal Online Casinos France 2026',
    itemListElement: paypalFirst.slice(0, 10).map((op, i) => ({
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
          { label: isFr ? 'Casino PayPal' : 'PayPal Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_paypal" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'PayPal · Skrill · Neteller · Retrait 24h · 2026'
              : 'PayPal · Skrill · Neteller · 24h withdrawal · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Casinos en ligne <em className="not-italic text-green">avec PayPal</em>
              </>
            ) : (
              <>
                Online casinos <em className="not-italic text-green">with PayPal</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Seuls les casinos avec licences sérieuses sont acceptés par PayPal. Filtrez par e-wallet, bonus et licence pour trouver votre casino avec paiement rapide.'
              : 'Only casinos with serious licences are accepted by PayPal. Filter by e-wallet, bonus and licence.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={paypalFirst}
        configKey="avec_paypal"
        pageType="casino_paypal"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'PayPal dans les casinos en ligne — ce que vous devez savoir'
              : 'PayPal at online casinos — what you need to know'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                PayPal est le e-wallet le plus reconnu au monde avec plus de 400 millions
                d&apos;utilisateurs actifs. Dans l&apos;univers du casino en ligne, sa présence est
                un indicateur de qualité : PayPal applique une politique stricte de sélection de ses
                partenaires marchands dans le secteur du jeu, acceptant uniquement les opérateurs
                avec des licences sérieuses.
              </p>
              <p>
                La principale valeur de PayPal est la{' '}
                <strong className="text-ink">séparation totale</strong> de vos données bancaires.
                Votre numéro de carte, vos coordonnées bancaires et votre RIB ne sont jamais
                transmis au casino. C&apos;est particulièrement apprécié des joueurs qui ne
                souhaitent pas voir des transactions de casino apparaître directement sur leurs
                relevés bancaires.
              </p>
              <p>
                Pour les retraits, PayPal est parmi les plus rapides après les cryptomonnaies. Une
                fois votre KYC validé, les virements arrivent généralement en 24-48 heures. Comparez
                avec les 3-5 jours des virements bancaires classiques — l&apos;avantage est réel et
                mesurable.
              </p>
              <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                Les alternatives à PayPal
              </h3>
              <p>
                Skrill et Neteller (groupe Paysafe) offrent des fonctionnalités similaires et sont
                acceptés par un plus grand nombre de casinos. Skrill a l&apos;avantage d&apos;un
                programme VIP avec réductions sur les frais. Si PayPal n&apos;est pas disponible
                dans votre casino préféré, Skrill est généralement la meilleure alternative.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                PayPal is the world&apos;s most recognised e-wallet with over 400 million active
                users. In the online casino world, its presence is a quality indicator: PayPal
                applies a strict partner selection policy in the gambling sector, accepting only
                operators with serious licences.
              </p>
              <p>
                PayPal&apos;s primary value is the{' '}
                <strong className="text-ink">complete separation</strong> of your banking data. Your
                card number, banking details and IBAN are never transmitted to the casino. This is
                particularly appreciated by players who do not want casino transactions appearing
                directly on their bank statements.
              </p>
              <p>
                For withdrawals, PayPal is among the fastest after cryptocurrencies. Once your KYC
                is validated, transfers generally arrive in 24–48 hours. Compare that with the 3–5
                days of standard bank transfers — the advantage is real and measurable.
              </p>
              <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
                PayPal alternatives
              </h3>
              <p>
                Skrill and Neteller (Paysafe Group) offer similar features and are accepted by a
                larger number of casinos. Skrill has the advantage of a VIP programme with fee
                discounts. If PayPal is not available at your preferred casino, Skrill is generally
                the best alternative.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Casino PayPal' : 'FAQ — PayPal Casino'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
