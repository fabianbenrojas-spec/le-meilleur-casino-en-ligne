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
      ? 'Casinos Retraits Rapides France 2026 — Paiement en 24h garanti'
      : 'Fast Withdrawal Casinos France 2026 — 24h Payment',
    description: isFr
      ? 'Comparatif des casinos en ligne avec les retraits les plus rapides en France 2026 : crypto instantané, e-wallets en 1h, CB en 24h. Délais testés. 18+'
      : 'Comparison of online casinos with the fastest withdrawals in France 2026: instant crypto, e-wallets in 1h, card in 24h. Tested delays. 18+',
    alternates: { languages: buildHreflang('/comparatifs/retraits-rapides/') },
  }
}

const FAQ_FR = [
  {
    question: 'Quelle est la méthode de retrait la plus rapide dans un casino en ligne ?',
    answer:
      "Par ordre de vitesse : (1) Cryptomonnaies (USDT Tron, Litecoin) : quelques secondes à 5 minutes. (2) Bitcoin/Ethereum : 10 à 60 minutes selon les confirmations de réseau. (3) E-wallets (Skrill, Neteller) : 1 à 24 heures. (4) PayPal : 24 à 48 heures. (5) Carte bancaire Visa/Mastercard : 1 à 5 jours ouvrés. (6) Virement bancaire : 2 à 7 jours ouvrés. La crypto reste la seule méthode garantissant des retraits en moins d'une heure.",
  },
  {
    question: 'Pourquoi mon retrait prend-il plusieurs jours alors que le casino annonce 24h ?',
    answer:
      "Plusieurs raisons possibles : (1) KYC incomplet — si vous n'avez pas encore soumis vos documents d'identité, tout retrait est bloqué en attente de vérification. (2) Bonus actif — un wager non soldé bloque les retraits. (3) Limite de retrait hebdomadaire dépassée. (4) Vérification de sécurité supplémentaire pour les gros montants. (5) Délais bancaires indépendants du casino (vendredi soir → lundi matin pour les virements). Contactez le support pour connaître la raison précise.",
  },
  {
    question: 'Faut-il vérifier son identité (KYC) avant de retirer ?',
    answer:
      "Oui, pour tout retrait dans un casino sous licence sérieuse. Le KYC est une obligation réglementaire (lutte contre le blanchiment). Documents généralement requis : pièce d'identité (CNI ou passeport), justificatif de domicile de moins de 3 mois, et parfois justificatif de moyen de paiement (photo de la carte bancaire utilisée, captures d'écran du compte e-wallet). Complétez le KYC dès votre inscription pour ne pas bloquer vos retraits futurs.",
  },
  {
    question: 'Y a-t-il des frais sur les retraits de casino ?',
    answer:
      "La plupart des casinos sérieux proposent des retraits sans frais. Attention aux exceptions : certains casinos facturent des frais pour les retraits en dessous d'un minimum (ex : 1-2€ pour les retraits inférieurs à 20€), ou pour les virements bancaires internationaux. Les e-wallets comme Skrill facturent des frais de leur côté pour certains retraits (vers votre banque). Consultez la page 'Méthodes de paiement' du casino pour les détails.",
  },
  {
    question: "Peut-on retirer de l'argent avant d'avoir complété le wager de son bonus ?",
    answer:
      "Non, tant que vous avez un bonus actif avec un wager non soldé, le retrait est impossible (sauf si vous acceptez de perdre le bonus). Certains casinos permettent 'd'annuler' le bonus en échange de la suppression du solde bonus — votre dépôt réel restant est alors retirable. Cette option est utile si vous avez décidé de ne pas solder le wager.",
  },
  {
    question: 'Quelle est la limite de retrait quotidienne ou hebdomadaire dans un casino ?',
    answer:
      'Les limites varient considérablement : de 500€/semaine sur certains casinos à 100 000€/semaine sur les plateformes VIP. Les limites standard sont souvent 2 000-5 000€/semaine. Ces limites peuvent être augmentées en contactant le VIP manager ou en passant un palier de fidélité. Vérifiez toujours les limites avant de déposer de grosses sommes — vous ne pourriez pas tout retirer rapidement en cas de gros gain.',
  },
]

const FAQ_EN = [
  {
    question: 'What is the fastest withdrawal method at an online casino?',
    answer:
      'In order of speed: (1) Cryptocurrencies (USDT Tron, Litecoin): seconds to 5 minutes. (2) Bitcoin/Ethereum: 10 to 60 minutes depending on network confirmations. (3) E-wallets (Skrill, Neteller): 1 to 24 hours. (4) PayPal: 24 to 48 hours. (5) Visa/Mastercard bank card: 1 to 5 business days. (6) Bank transfer: 2 to 7 business days. Crypto remains the only method guaranteeing withdrawals in under one hour.',
  },
  {
    question: 'Why is my withdrawal taking several days when the casino advertises 24h?',
    answer:
      'Several possible reasons: (1) Incomplete KYC — if you have not yet submitted your identity documents, withdrawals are held pending verification. (2) Active bonus — an unsettled wager blocks withdrawals. (3) Weekly withdrawal limit exceeded. (4) Additional security check for large amounts. (5) Banking delays independent of the casino. Contact support to find out the exact reason.',
  },
  {
    question: 'Do you need to verify your identity (KYC) before withdrawing?',
    answer:
      'Yes, for any withdrawal at a casino under a serious licence. KYC is a regulatory requirement (anti-money laundering). Documents generally required: ID (national ID card or passport), proof of address dated within 3 months, and sometimes proof of payment method. Complete KYC when you register to avoid blocking future withdrawals.',
  },
  {
    question: 'Are there fees on casino withdrawals?',
    answer:
      "Most reputable casinos offer free withdrawals. Watch for exceptions: some casinos charge fees for withdrawals below a minimum (e.g. €1–€2 for withdrawals under €20), or for international bank transfers. E-wallets like Skrill charge fees on their side for certain withdrawals. Check the casino's 'Payment methods' page for details.",
  },
  {
    question: 'Can you withdraw money before completing a bonus wager?',
    answer:
      "No, as long as you have an active bonus with an unsettled wager, withdrawal is impossible (unless you agree to forfeit the bonus). Some casinos allow you to 'cancel' the bonus in exchange for removing the bonus balance — your remaining real deposit can then be withdrawn. This option is useful if you have decided not to clear the wager.",
  },
  {
    question: 'What is the daily or weekly withdrawal limit at a casino?',
    answer:
      'Limits vary considerably: from €500/week at some casinos to €100,000/week at VIP platforms. Standard limits are often €2,000–€5,000/week. These limits can be increased by contacting the VIP manager or reaching a loyalty tier. Always check limits before depositing large sums — you might not be able to withdraw it all quickly in the event of a large win.',
  },
]

export default async function RetraitsRapidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const bySpeed = [...operators].sort((a, b) => {
    const aCrypto = a.paymentMethods.some((m) => ['₿', 'ETH', 'LTC', 'USDT'].includes(m)) ? 3 : 0
    const bCrypto = b.paymentMethods.some((m) => ['₿', 'ETH', 'LTC', 'USDT'].includes(m)) ? 3 : 0
    const aEwallet = a.paymentMethods.some((m) => ['SKRL', 'PPAL', 'NTLR'].includes(m)) ? 1 : 0
    const bEwallet = b.paymentMethods.some((m) => ['SKRL', 'PPAL', 'NTLR'].includes(m)) ? 1 : 0
    return bCrypto + bEwallet - (aCrypto + aEwallet) || b.rating - a.rating
  })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Casinos retraits rapides France 2026' : 'Fast Withdrawal Casinos France 2026',
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
          { label: isFr ? 'Retraits Rapides' : 'Fast Withdrawals' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="retraits_rapides" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Crypto instantané · E-wallet 1h · CB 24h · 2026'
              : 'Instant crypto · E-wallet 1h · Card 24h · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Casinos avec <em className="not-italic text-green">retraits rapides</em>
              </>
            ) : (
              <>
                Casinos with <em className="not-italic text-green">fast withdrawals</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? "Délais testés à l'argent réel par notre équipe. Filtrez par méthode de paiement pour trouver les casinos les plus rapides selon votre mode de retrait préféré."
              : 'Withdrawal times tested with real money by our team. Filter by payment method to find the fastest casinos for your preferred withdrawal method.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={bySpeed}
        configKey="retraits_rapides"
        pageType="retraits_rapides"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Pourquoi les délais de retrait varient-ils autant ?'
              : 'Why do withdrawal times vary so much?'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                La vitesse d&apos;un retrait de casino dépend de trois facteurs indépendants : le{' '}
                <strong className="text-ink">délai de traitement du casino</strong> (de quelques
                heures à 72 heures), le{' '}
                <strong className="text-ink">délai de la méthode de paiement</strong> (instantané
                pour la crypto, 3-5 jours pour les cartes), et les éventuels{' '}
                <strong className="text-ink">délais de sécurité</strong> imposés par certains
                casinos (period de &quot;refroidissement&quot; de 24-48 heures sur les gros
                retraits).
              </p>
              <p>
                Les casinos qui affichent &quot;retraits en 24h&quot; comptent généralement le délai
                de traitement interne — ils ne peuvent pas contrôler le temps que met votre banque à
                créditer votre compte. Pour contourner ce problème, utilisez des e-wallets (Skrill,
                Neteller) comme intermédiaires : le casino traite le retrait vers votre e-wallet en
                24h, et vous virez ensuite vers votre banque quand vous voulez.
              </p>
              <p>
                Notre équipe teste les délais réels en effectuant des retraits de montants modestes
                (50-200€) via différentes méthodes. Les résultats varient parfois significativement
                des délais annoncés — un casino qui annonce &quot;retraits instantanés&quot; peut
                prendre 48h sur les cartes bancaires. Nos tests à l&apos;argent réel sont la seule
                mesure fiable.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                The speed of a casino withdrawal depends on three independent factors: the{' '}
                <strong className="text-ink">casino processing delay</strong> (from a few hours to
                72 hours), the <strong className="text-ink">payment method delay</strong> (instant
                for crypto, 3–5 days for cards), and any{' '}
                <strong className="text-ink">security delays</strong> imposed by some casinos (a
                &apos;cooling-off&apos; period of 24–48 hours on large withdrawals).
              </p>
              <p>
                Casinos that advertise &apos;24h withdrawals&apos; generally count the internal
                processing delay — they cannot control the time your bank takes to credit your
                account. To work around this, use e-wallets (Skrill, Neteller) as intermediaries:
                the casino processes the withdrawal to your e-wallet in 24h, and you then transfer
                to your bank whenever you choose.
              </p>
              <p>
                Our team tests real delays by making withdrawals of modest amounts (€50–200) via
                different methods. Results sometimes vary significantly from advertised delays — a
                casino claiming &apos;instant withdrawals&apos; may take 48 hours for bank cards.
                Our real-money tests are the only reliable measure.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Retraits rapides' : 'FAQ — Fast withdrawals'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
