import type { Metadata } from 'next'
export const revalidate = 3600

import Link from 'next/link'

import { HubShell } from '@/components/hub/hub-shell'
import { operatorsWithInstantWithdrawal } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang, localizeHref } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Casino Retrait Instantané 2026 — Crypto < 5 min, E-wallet < 24h Testés'
      : 'Instant Withdrawal Casino 2026 — Crypto < 5 min, E-wallet < 24h Tested',
    description: isFr
      ? "Casinos en ligne avec retraits les plus rapides en 2026 : crypto en quelques minutes, e-wallets en moins de 24h. Délais mesurés à l'argent réel. 18+"
      : 'Online casinos with the fastest withdrawals in 2026: crypto in minutes, e-wallets in under 24h. Times measured with real money. 18+',
    alternates: { languages: buildHreflang('/casinos/retrait-instantane/') },
  }
}

const FAQ_FR = [
  {
    question: 'Quelle méthode de retrait est vraiment instantanée ?',
    answer:
      'Seules les cryptomonnaies offrent des retraits véritablement instantanés. Par ordre de vitesse : (1) USDT sur réseau Tron ou Litecoin : 30 secondes à 2 minutes. (2) Bitcoin : 10 à 60 minutes selon les confirmations réseau. (3) Ethereum : 15 secondes à 5 minutes. (4) E-wallets (Skrill, Neteller) : 1 à 24 heures — rapides, mais pas instantanés. Les virements bancaires et les cartes (CB, Visa, Mastercard) prennent 1 à 5 jours ouvrés.',
  },
  {
    question: 'Pourquoi les virements bancaires ne sont-ils pas considérés comme « instantanés » ?',
    answer:
      'Les virements SEPA passent par des systèmes interbancaires avec des plages de traitement limitées (généralement 8h-18h en jours ouvrés). Le virement instantané SEPA (SCT Inst) existe mais peu de banques et aucun casino ne le proposent encore systématiquement. Les retraits CB (Visa/Mastercard) dépendent du délai de crédit de votre banque, pas du casino — le casino peut traiter en 24h, votre banque peut mettre 3-5 jours supplémentaires.',
  },
  {
    question: 'Les retraits crypto peuvent-ils aussi subir des délais ?',
    answer:
      "Oui, deux causes possibles : (1) Délai de traitement interne du casino — même les casinos crypto ont un délai de validation (généralement 0 à 4 heures) avant d'envoyer la transaction on-chain. (2) Congestion du réseau — lors de pics d'activité sur Bitcoin ou Ethereum, les frais de transaction (gas fees) augmentent et les transactions peu prioritaires peuvent attendre. USDT sur Tron et Litecoin sont les plus résistants à ces congestions.",
  },
  {
    question: 'Le retrait instantané implique-t-il des frais supplémentaires ?',
    answer:
      'Les casinos ne facturent généralement pas de frais pour les retraits crypto. En revanche, vous payez les frais de réseau blockchain (gas fees), qui varient selon la congestion. Pour Bitcoin, comptez 0,50–5 €. Pour Ethereum, 1–20 € en période de congestion. Pour USDT Tron : moins de 0,10 €. Les e-wallets (Skrill) peuvent facturer des frais de retrait vers votre compte bancaire de leur côté.',
  },
  {
    question: 'Faut-il avoir complété le KYC pour un retrait instantané ?',
    answer:
      'Oui, pour tout retrait — instantané ou non — dans un casino sérieux, le KYC doit être complété si vous atteignez les seuils de vérification. Un KYC non complété bloque tous les retraits, quelle que soit la méthode. Notre conseil : soumettez vos documents dès votre inscription pour éviter tout blocage. Les casinos crypto ont des seuils KYC plus élevés (souvent 2 000–5 000 €) mais ne sont pas exempts de cette obligation.',
  },
]

const FAQ_EN = [
  {
    question: 'Which withdrawal method is truly instant?',
    answer:
      'Only cryptocurrencies offer truly instant withdrawals. In order of speed: (1) USDT on Tron network or Litecoin: 30 seconds to 2 minutes. (2) Bitcoin: 10 to 60 minutes depending on network confirmations. (3) Ethereum: 15 seconds to 5 minutes. (4) E-wallets (Skrill, Neteller): 1 to 24 hours — fast, but not instant. Bank transfers and cards (Visa, Mastercard) take 1 to 5 business days.',
  },
  {
    question: 'Why are bank transfers not considered "instant"?',
    answer:
      "SEPA transfers go through interbank systems with limited processing windows (usually 8am–6pm on business days). Instant SEPA (SCT Inst) exists but few banks and no casinos yet offer it systematically. Card withdrawals (Visa/Mastercard) depend on your bank's credit timeline, not the casino — the casino may process in 24h, but your bank may take 3–5 additional days.",
  },
  {
    question: 'Can crypto withdrawals also face delays?',
    answer:
      'Yes, two possible causes: (1) Casino internal processing delay — even crypto casinos have a validation delay (usually 0 to 4 hours) before sending the on-chain transaction. (2) Network congestion — during peak activity on Bitcoin or Ethereum, transaction fees (gas fees) increase and low-priority transactions may wait. USDT on Tron and Litecoin are the most resistant to congestion.',
  },
  {
    question: 'Do instant withdrawals involve extra fees?',
    answer:
      'Casinos generally do not charge fees for crypto withdrawals. However, you pay blockchain network fees (gas fees), which vary with congestion. For Bitcoin: €0.50–€5. For Ethereum: €1–€20 during congestion. For USDT Tron: under €0.10. E-wallets (Skrill) may charge withdrawal fees on their side when transferring to your bank account.',
  },
  {
    question: 'Do you need to complete KYC for an instant withdrawal?',
    answer:
      'Yes — for any withdrawal, instant or not, at a serious casino, KYC must be completed if you reach verification thresholds. Incomplete KYC blocks all withdrawals regardless of method. Our advice: submit your documents at registration to avoid any hold-up. Crypto casinos have higher KYC thresholds (often €2,000–€5,000) but are not exempt from this requirement.',
  },
]

export default async function RetraitInstantanePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const speedOrder: Record<string, number> = { instant: 0, fast: 1, standard: 2, slow: 3 }
  const bySpeed = [...operatorsWithInstantWithdrawal].sort(
    (a, b) => speedOrder[a.withdrawalSpeed]! - speedOrder[b.withdrawalSpeed]! || b.rating - a.rating
  )

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Casinos retrait instantané France 2026'
      : 'Instant Withdrawal Casinos France 2026',
    itemListElement: bySpeed.slice(0, 10).map((op, i) => ({
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
      pageType="casino_retrait_instantane"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Retrait Instantané' : 'Instant Withdrawal' },
      ]}
      eyebrow={
        isFr
          ? 'Crypto < 5 min · E-wallet < 24h · Testé · 2026'
          : 'Crypto < 5 min · E-wallet < 24h · Tested · 2026'
      }
      heading={
        isFr ? (
          <>
            Casinos avec <em className="not-italic text-green">retraits instantanés</em>
          </>
        ) : (
          <>
            Casinos with <em className="not-italic text-green">instant withdrawals</em>
          </>
        )
      }
      intro={
        isFr
          ? "Délais testés à l'argent réel par notre équipe. Seuls les opérateurs avec au moins une méthode traitée en moins d'une heure figurent ici : crypto (quelques minutes) ou e-wallets prioritaires (< 24h)."
          : 'Withdrawal times tested with real money by our team. Only operators with at least one method processed in under one hour appear here: crypto (minutes) or priority e-wallets (< 24h).'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={bySpeed}
      configKey="retrait_instantane"
      editorialH2={
        isFr
          ? 'Crypto vs e-wallet : quelle méthode choisir ?'
          : 'Crypto vs e-wallet: which method to choose?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Il existe trois grandes catégories de vitesse de retrait dans les casinos en ligne, et
              seules les deux premières qualifient pour ce hub :
            </p>
            <p>
              <strong className="text-ink">Niveau 1 — Crypto (&lt; 5 minutes)</strong> : les
              retraits en cryptomonnaies (Bitcoin, Ethereum, USDT, Litecoin) sont traités
              directement sur la blockchain sans intermédiaire bancaire. Une fois la transaction
              initiée par le casino, elle est confirmée en quelques secondes à quelques minutes
              selon le réseau choisi. USDT sur réseau Tron est la méthode la plus rapide et la moins
              chère en frais de transaction.
            </p>
            <p>
              <strong className="text-ink">Niveau 2 — E-wallets (&lt; 24 heures)</strong> : Skrill
              et Neteller permettent des retraits traités en quelques heures. Le casino envoie les
              fonds vers votre portefeuille électronique, que vous pouvez ensuite transférer vers
              votre banque. Ce double transfert ajoute une étape, mais l&apos;argent est disponible
              sur votre e-wallet bien avant d&apos;arriver sur votre compte bancaire.
            </p>
            <p>
              <strong className="text-ink">Niveau 3 — Carte et virement (1–5 jours)</strong> : les
              retraits par carte bancaire (CB, Visa, Mastercard) et virement SEPA ne qualifient pas
              pour ce hub. Même si le casino traite la demande en 24h, votre banque peut prendre 3 à
              5 jours ouvrés supplémentaires pour créditer votre compte. Ce délai est hors du
              contrôle du casino. Pour les retraits rapides sans crypto, utilisez la page{' '}
              <Link
                href={localizeHref('/comparatifs/retraits-rapides/', locale)}
                className="text-green underline"
              >
                Comparatif retraits rapides
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              There are three broad withdrawal speed categories at online casinos, and only the
              first two qualify for this hub:
            </p>
            <p>
              <strong className="text-ink">Level 1 — Crypto (&lt; 5 minutes)</strong>:
              cryptocurrency withdrawals (Bitcoin, Ethereum, USDT, Litecoin) are processed directly
              on the blockchain without banking intermediaries. Once the casino initiates the
              transaction, it is confirmed in seconds to minutes depending on the chosen network.
              USDT on the Tron network is the fastest and cheapest method in terms of transaction
              fees.
            </p>
            <p>
              <strong className="text-ink">Level 2 — E-wallets (&lt; 24 hours)</strong>: Skrill and
              Neteller allow withdrawals processed in a few hours. The casino sends funds to your
              electronic wallet, which you can then transfer to your bank. This double transfer adds
              a step, but the money is available in your e-wallet well before it reaches your bank
              account.
            </p>
            <p>
              <strong className="text-ink">Level 3 — Card and transfer (1–5 days)</strong>: bank
              card (Visa, Mastercard) and SEPA transfer withdrawals do not qualify for this hub.
              Even if the casino processes the request in 24h, your bank may take 3 to 5 additional
              business days to credit your account. This delay is beyond the casino&apos;s control.
              For fast withdrawals without crypto, visit our{' '}
              <Link
                href={localizeHref('/comparatifs/retraits-rapides/', locale)}
                className="text-green underline"
              >
                Fast withdrawals comparison
              </Link>
              .
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Retraits instantanés' : 'FAQ — Instant Withdrawals'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
