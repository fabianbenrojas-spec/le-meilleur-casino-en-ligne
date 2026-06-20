import type { Metadata } from 'next'
export const revalidate = 3600

import { HubShell } from '@/components/hub/hub-shell'
import { operatorsWithoutKyc } from '@/config/operators'
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
      ? 'Casino Sans KYC France 2026 — KYC Différé ou Optionnel Testé'
      : 'No-KYC Casino France 2026 — Deferred or Optional KYC Tested',
    description: isFr
      ? "Casinos en ligne avec vérification d'identité différée ou optionnelle en 2026 : crypto, KYC léger, dépôts discrets. Politique documentée et testée. 18+"
      : 'Online casinos with deferred or optional identity verification in 2026: crypto, light KYC, discreet deposits. Documented and tested policy. 18+',
    alternates: { languages: buildHreflang('/casinos/sans-kyc/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un casino « sans KYC » au sens propre ?",
    answer:
      "Un casino « sans KYC » est une plateforme qui n'exige pas de documents d'identité avant de laisser jouer. En pratique, cela signifie un KYC différé — la vérification est déclenchée au premier retrait significatif (généralement à partir de 2 000–5 000 €) ou si le casino détecte une activité inhabituelle (gros gains soudains, chargements répétés). Aucun casino sérieux ne renonce totalement au KYC : c'est une obligation légale anti-blanchiment (AML) dans le monde entier.",
  },
  {
    question: "Est-ce légal de jouer sans vérification d'identité en France ?",
    answer:
      "Oui, à condition que le casino soit déclaré dans une juridiction reconnue (Curaçao, MGA) et que vous ne contourniez pas la réglementation française. Les casinos ANJ (licence française) imposent le KYC dès l'inscription. Les casinos offshore acceptent les joueurs français sans KYC immédiat, mais sont techniquement dans une zone grise légale. Le joueur ne commet pas d'infraction en jouant — c'est l'opérateur qui assume la responsabilité réglementaire.",
  },
  {
    question: 'À quel moment le KYC est-il déclenché malgré tout ?',
    answer:
      "Quatre situations déclenchent systématiquement le KYC, même dans les casinos les plus permissifs : (1) Premier retrait dépassant un seuil (typiquement 2 000 € pour les casinos crypto). (2) Dépôts cumulés dépassant un plafond mensuel (souvent 5 000–10 000 €). (3) Détection d'une activité inhabituelle ou suspicion de blanchiment. (4) Activation d'un programme VIP ou de cashback. Préparez toujours vos documents d'identité à l'avance — bloquer un retrait de plusieurs milliers d'euros pour un document manquant est une situation évitable.",
  },
  {
    question: 'Les casinos sans KYC sont-ils aussi sûrs que les autres ?',
    answer:
      "La sécurité d'un casino dépend de sa licence, pas de sa politique KYC. Wild Sultan (Curaçao) et Horus Casino (Curaçao) ont des politiques KYC légères mais restent des plateformes sérieuses avec des audits réguliers. BitcoinPenguin et Stake fonctionnent en crypto pur : la sécurité repose sur la cryptographie blockchain, pas sur une vérification d'identité papier. Le risque réel d'un casino sans KYC n'est pas la sécurité — c'est l'absence de recours en cas de litige, puisque la relation client est moins formalisée.",
  },
  {
    question: 'Quelle est la différence entre un casino sans KYC et un casino crypto ?',
    answer:
      'Les deux se recoupent mais ne sont pas identiques. Un casino crypto accepte les cryptomonnaies mais peut quand même demander un KYC strict (comme certaines grandes plateformes). Un casino sans KYC peut théoriquement accepter des paiements fiat (carte, e-wallet) avec une vérification différée. Dans la pratique, les casinos avec les politiques KYC les plus légères sont effectivement les casinos crypto (Stake, BitcoinPenguin) car les transactions blockchain sont pseudonymes par nature.',
  },
]

const FAQ_EN = [
  {
    question: 'What exactly is a "no-KYC casino"?',
    answer:
      'A "no-KYC casino" is a platform that does not require identity documents before letting you play. In practice, this means deferred KYC — verification is triggered at the first significant withdrawal (usually from €2,000–€5,000) or if the casino detects unusual activity. No serious casino completely waives KYC: it is a legal anti-money laundering (AML) obligation worldwide.',
  },
  {
    question: 'Is it legal to play without identity verification in France?',
    answer:
      'Yes, provided the casino is registered in a recognised jurisdiction (Curaçao, MGA) and you are not circumventing French regulations. ANJ casinos (French licence) require KYC from registration. Offshore casinos accept French players without immediate KYC but operate in a legal grey area. The player does not commit an offence by playing — it is the operator that bears the regulatory responsibility.',
  },
  {
    question: 'When is KYC triggered despite the light policy?',
    answer:
      'Four situations systematically trigger KYC even in the most permissive casinos: (1) First withdrawal exceeding a threshold (typically €2,000 for crypto casinos). (2) Cumulative deposits exceeding a monthly cap (often €5,000–€10,000). (3) Detection of unusual activity or money laundering suspicion. (4) Activation of a VIP or cashback programme. Always prepare your identity documents in advance — blocking a withdrawal of several thousand euros over a missing document is an avoidable situation.',
  },
  {
    question: 'Are no-KYC casinos as safe as others?',
    answer:
      "A casino's safety depends on its licence, not its KYC policy. Wild Sultan (Curaçao) and Horus Casino (Curaçao) have light KYC policies but remain serious platforms with regular audits. BitcoinPenguin and Stake run on pure crypto: security relies on blockchain cryptography, not paper identity verification. The real risk of a no-KYC casino is not safety — it is the lack of recourse in case of dispute, since the customer relationship is less formalised.",
  },
  {
    question: 'What is the difference between a no-KYC casino and a crypto casino?',
    answer:
      'The two overlap but are not identical. A crypto casino accepts cryptocurrencies but can still require strict KYC (as some large platforms do). A no-KYC casino could theoretically accept fiat payments (card, e-wallet) with deferred verification. In practice, the casinos with the lightest KYC policies are indeed crypto casinos (Stake, BitcoinPenguin) because blockchain transactions are pseudonymous by nature.',
  },
]

export default async function SansKycPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const byRating = [...operatorsWithoutKyc].sort((a, b) => b.rating - a.rating)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Casinos sans KYC France 2026' : 'No-KYC Casinos France 2026',
    itemListElement: byRating.slice(0, 10).map((op, i) => ({
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
      pageType="casino_sans_kyc"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Sans KYC' : 'No KYC' },
      ]}
      eyebrow={
        isFr
          ? 'KYC différé · Crypto · Discrétion · 2026'
          : 'Deferred KYC · Crypto · Privacy-first · 2026'
      }
      heading={
        isFr ? (
          <>
            Casinos sans KYC <em className="not-italic text-green">pour joueurs français</em>
          </>
        ) : (
          <>
            <em className="not-italic text-green">No-KYC casinos</em> for French players
          </>
        )
      }
      intro={
        isFr
          ? "La vérification d'identité est différée — pas absente. Ces casinos permettent de déposer et de jouer sans document immédiat, mais déclenchent le KYC au premier retrait significatif. Politique documentée et testée par notre équipe."
          : 'Identity verification is deferred — not absent. These casinos let you deposit and play without immediate documents, but trigger KYC at first significant withdrawal. Policy documented and tested by our team.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={byRating}
      configKey="sans_kyc"
      editorialH2={
        isFr ? "Qu'est-ce qu'un casino sans KYC exactement ?" : 'What is a no-KYC casino exactly?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Le KYC (Know Your Customer) est un processus réglementaire imposé aux plateformes
              financières, casinos inclus. Il consiste à vérifier l&apos;identité du joueur via des
              documents officiels (pièce d&apos;identité, justificatif de domicile) avant de traiter
              des transactions importantes. Cette obligation découle des directives{' '}
              <strong className="text-ink">anti-blanchiment (AML)</strong> en vigueur dans
              l&apos;Union européenne et dans la plupart des juridictions.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              KYC différé vs KYC absent : une distinction cruciale
            </h3>
            <p>
              Aucun casino sérieux n&apos;est réellement &quot;sans KYC&quot; : tous les opérateurs
              sont tenus de vérifier l&apos;identité de leurs joueurs à un moment ou un autre. Ce
              que les casinos de cette sélection proposent, c&apos;est un{' '}
              <strong className="text-ink">KYC différé</strong> : vous pouvez déposer, jouer et
              retirer de petits montants sans fournir de documents. La vérification est déclenchée à
              partir d&apos;un certain seuil (généralement 2 000 à 5 000 €) ou en cas
              d&apos;activité inhabituelle.
            </p>
            <p>
              Les casinos 100% crypto (Stake, BitcoinPenguin) vont encore plus loin : les
              transactions blockchain sont pseudonymes par nature, ce qui permet des dépôts et
              retraits sans identification pour des montants modérés. Mais même ces plateformes
              peuvent demander une vérification si vous atteignez des seuils élevés ou si vous
              souhaitez activer certains avantages VIP.
            </p>
            <p>
              Notre recommandation : ne considérez pas le KYC comme un obstacle à éviter, mais comme
              une protection. Un casino qui vous demande vos documents pour traiter un retrait de 5
              000 € est un casino qui <strong className="text-ink">a vocation à payer</strong>.
              Préparez vos documents à l&apos;avance pour éviter tout blocage au moment où vous
              souhaitez retirer des gains importants.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              KYC (Know Your Customer) is a regulatory process imposed on financial platforms,
              including casinos. It involves verifying the player&apos;s identity through official
              documents (ID, proof of address) before processing significant transactions. This
              obligation stems from{' '}
              <strong className="text-ink">anti-money laundering (AML)</strong> directives in the
              European Union and most jurisdictions.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Deferred KYC vs absent KYC: a crucial distinction
            </h3>
            <p>
              No serious casino is truly &apos;without KYC&apos;: all operators are required to
              verify their players&apos; identities at some point. What the casinos in this
              selection offer is <strong className="text-ink">deferred KYC</strong>: you can
              deposit, play, and withdraw small amounts without providing documents. Verification is
              triggered beyond a certain threshold (usually €2,000 to €5,000) or in case of unusual
              activity.
            </p>
            <p>
              100% crypto casinos (Stake, BitcoinPenguin) go further: blockchain transactions are
              pseudonymous by nature, enabling deposits and withdrawals without identification for
              moderate amounts. But even these platforms may request verification if you reach high
              thresholds or wish to activate certain VIP perks.
            </p>
            <p>
              Our recommendation: do not see KYC as an obstacle to avoid, but as a protection. A
              casino that asks for your documents to process a €5,000 withdrawal is a casino that{' '}
              <strong className="text-ink">intends to pay</strong>. Prepare your documents in
              advance to avoid any hold-up when you want to withdraw significant winnings.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casinos sans KYC' : 'FAQ — No-KYC Casinos'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
