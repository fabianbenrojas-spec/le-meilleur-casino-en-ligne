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
      ? 'Casino en ligne PayPal France 2026 — Retrait rapide en 24h'
      : 'PayPal Online Casino France 2026 — Fast 24h Withdrawal',
    description: isFr
      ? 'Les meilleurs casinos en ligne acceptant PayPal en France 2026 : dépôt et retrait rapides, sécurité maximale. Également Skrill et Neteller disponibles. 18+'
      : 'Best online casinos accepting PayPal in France 2026: fast deposits and withdrawals, maximum security. Also Skrill and Neteller available. 18+',
    alternates: { languages: buildHreflang('/casinos/avec-paypal/') },
  }
}

const FAQ_FR = [
  {
    question: 'PayPal est-il disponible dans tous les casinos en ligne ?',
    answer:
      "Non. PayPal applique une politique stricte de sélection des casinos partenaires. Seuls les opérateurs disposant d'une licence MGA, UKGC ou Gibraltar peuvent proposer PayPal. Cette restriction fait de la disponibilité PayPal un indicateur indirect de la fiabilité d'un casino — si PayPal vous fait confiance, c'est bon signe.",
  },
  {
    question: 'Y a-t-il des frais pour utiliser PayPal dans un casino ?',
    answer:
      'PayPal ne facture généralement pas de frais pour les dépôts en casino. Pour les retraits, les frais dépendent du type de compte PayPal et de votre pays. En France, les retraits PayPal vers un compte bancaire sont généralement gratuits. Certains casinos peuvent appliquer leurs propres frais — vérifiez la page Paiements du casino avant de commencer.',
  },
  {
    question: 'Combien de temps prend un retrait en PayPal depuis un casino ?',
    answer:
      "Une fois votre KYC validé et votre retrait approuvé par le casino (délai interne : 1 à 48h selon l'opérateur), le virement sur votre compte PayPal est généralement instantané à quelques heures. PayPal est parmi les méthodes de retrait les plus rapides après les cryptomonnaies. Comparez avec les 3 à 5 jours pour un virement bancaire classique.",
  },
  {
    question: 'Mon compte PayPal peut-il être limité si je joue en casino ?',
    answer:
      "Techniquement oui. PayPal peut surveiller et limiter les comptes affichant des transactions liées au jeu. Pour minimiser ce risque, utilisez PayPal uniquement pour des casinos officiellement agréés par PayPal (ce sont ceux listés sur cette page), évitez des transactions atypiquement importantes, et gardez votre compte PayPal actif avec d'autres usages.",
  },
  {
    question: 'Puis-je utiliser un compte PayPal professionnel pour jouer en casino ?',
    answer:
      "Non. PayPal interdit explicitement l'utilisation des comptes professionnels pour les transactions de jeux d'argent. Vous devez utiliser un compte personnel. L'utilisation d'un compte professionnel pour des transactions casino peut entraîner une suspension permanente du compte PayPal.",
  },
  {
    question: 'Skrill est-il aussi bien que PayPal pour les casinos ?',
    answer:
      "Skrill (groupe Paysafe) offre des fonctionnalités similaires à PayPal pour les casinos, avec souvent plus de casinos partenaires. L'avantage de Skrill est son programme VIP qui réduit les frais. L'inconvénient : une fois de l'argent envoyé sur Skrill, il est difficile de le retransférer vers votre banque sans frais. Skrill est excellent pour les joueurs réguliers, PayPal pour les utilisateurs occasionnels.",
  },
]

const FAQ_EN = [
  {
    question: 'Is PayPal available at all online casinos?',
    answer:
      'No. PayPal applies a strict partner casino selection policy. Only operators with an MGA, UKGC or Gibraltar licence can offer PayPal. This restriction makes PayPal availability an indirect indicator of casino trustworthiness — if PayPal trusts them, that is a good sign.',
  },
  {
    question: 'Are there fees for using PayPal at a casino?',
    answer:
      'PayPal generally does not charge fees for casino deposits. For withdrawals, fees depend on your PayPal account type and country. In most markets, PayPal withdrawals to a bank account are free. Some casinos may apply their own fees — check the casino Payments page before you start.',
  },
  {
    question: 'How long does a PayPal withdrawal from a casino take?',
    answer:
      'Once your KYC is validated and your withdrawal is approved by the casino (internal processing: 1 to 48h depending on the operator), the transfer to your PayPal account is generally instant to a few hours. PayPal is among the fastest withdrawal methods after cryptocurrencies.',
  },
  {
    question: 'Can my PayPal account be limited if I play at casinos?',
    answer:
      'Technically yes. PayPal may monitor and limit accounts showing gambling-related transactions. To minimise this risk, only use PayPal at casinos officially approved by PayPal (those listed on this page), avoid unusually large transactions, and keep your PayPal account active with other uses.',
  },
  {
    question: 'Can I use a PayPal business account to play at a casino?',
    answer:
      'No. PayPal explicitly prohibits the use of business accounts for gambling transactions. You must use a personal account. Using a business account for casino transactions can result in permanent suspension of the PayPal account.',
  },
  {
    question: 'Is Skrill as good as PayPal for casinos?',
    answer:
      'Skrill (Paysafe Group) offers similar features to PayPal for casinos, with often more casino partners. The advantage of Skrill is its VIP programme that reduces fees. The downside: once money is sent to Skrill, it is difficult to transfer back to your bank without fees. Skrill is excellent for regular players, PayPal for occasional users.',
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
    <HubShell
      pageType="casino_paypal"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casino PayPal' : 'PayPal Casino' },
      ]}
      eyebrow={
        isFr
          ? 'PayPal · Skrill · Neteller · Retrait 24h · 2026'
          : 'PayPal · Skrill · Neteller · 24h withdrawal · 2026'
      }
      heading={
        isFr ? (
          <>
            Casinos en ligne <em className="not-italic text-green">avec PayPal</em>
          </>
        ) : (
          <>
            Online casinos <em className="not-italic text-green">with PayPal</em>
          </>
        )
      }
      intro={
        isFr
          ? 'Seuls les casinos avec licences sérieuses sont acceptés par PayPal. Filtrez par e-wallet, bonus et licence pour trouver votre casino avec paiement rapide.'
          : 'Only casinos with serious licences are accepted by PayPal. Filter by e-wallet, bonus and licence.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={paypalFirst}
      configKey="avec_paypal"
      editorialH2={
        isFr
          ? 'PayPal dans les casinos en ligne — ce que vous devez savoir'
          : 'PayPal at online casinos — what you need to know'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              PayPal est le e-wallet le plus reconnu au monde avec plus de 400 millions
              d&apos;utilisateurs actifs. Dans l&apos;univers du casino en ligne, sa présence est un
              indicateur de qualité : PayPal applique une politique stricte de sélection de ses
              partenaires marchands dans le secteur du jeu, acceptant uniquement les opérateurs avec
              des licences sérieuses.
            </p>
            <p>
              La principale valeur de PayPal est la{' '}
              <strong className="text-ink">séparation totale</strong> de vos données bancaires.
              Votre numéro de carte, vos coordonnées bancaires et votre RIB ne sont jamais transmis
              au casino. C&apos;est particulièrement apprécié des joueurs qui ne souhaitent pas voir
              des transactions de casino apparaître directement sur leurs relevés bancaires.
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
              programme VIP avec réductions sur les frais. Si PayPal n&apos;est pas disponible dans
              votre casino préféré, Skrill est généralement la meilleure alternative.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              PayPal is the world&apos;s most recognised e-wallet with over 400 million active
              users. In the online casino world, its presence is a quality indicator: PayPal applies
              a strict partner selection policy in the gambling sector, accepting only operators
              with serious licences.
            </p>
            <p>
              PayPal&apos;s primary value is the{' '}
              <strong className="text-ink">complete separation</strong> of your banking data. Your
              card number, banking details and IBAN are never transmitted to the casino. This is
              particularly appreciated by players who do not want casino transactions appearing
              directly on their bank statements.
            </p>
            <p>
              For withdrawals, PayPal is among the fastest after cryptocurrencies. Once your KYC is
              validated, transfers generally arrive in 24–48 hours. Compare that with the 3–5 days
              of standard bank transfers — the advantage is real and measurable.
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
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casino PayPal' : 'FAQ — PayPal Casino'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
