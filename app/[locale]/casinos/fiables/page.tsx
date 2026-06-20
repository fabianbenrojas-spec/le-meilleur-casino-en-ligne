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
      ? 'Casinos en ligne Fiables & Sécurisés France 2026 — Licences MGA UKGC'
      : 'Trusted & Secure Online Casinos France 2026 — MGA UKGC Licences',
    description: isFr
      ? 'Sélection des casinos en ligne les plus fiables et sécurisés en France 2026 : licences MGA, UKGC, Gibraltar vérifiées, ségrégation des fonds, paiements rapides. 18+'
      : 'Selection of the most trusted and secure online casinos in France 2026: MGA, UKGC, Gibraltar licences verified, fund segregation, fast payments. 18+',
    alternates: { languages: buildHreflang('/casinos/fiables/') },
  }
}

const FAQ_FR = [
  {
    question: 'Comment savoir si un casino en ligne est vraiment fiable ?',
    answer:
      "Cinq indicateurs clés : (1) Licence active MGA, UKGC ou Gibraltar — vérifiable directement sur le site du régulateur. (2) Ancienneté > 5 ans avec un historique de paiements propre. (3) Note AskGamblers ou Casinomeister supérieure à 7/10 avec des témoignages récents. (4) Certificat eCOGRA ou iTech Labs visible sur la page d'accueil. (5) Service client joignable en moins de 24h. Notre sélection répond à tous ces critères.",
  },
  {
    question: 'La licence MGA est-elle la meilleure garantie de fiabilité ?',
    answer:
      "La MGA (Malta Gaming Authority) est l'une des licences les plus respectées. Elle oblige les opérateurs à maintenir des fonds joueurs ségrégués (votre argent ne peut pas être utilisé pour les opérations du casino), à soumettre leurs RNG à des audits indépendants, et à traiter les plaintes via un mécanisme formel. La UKGC (Royaume-Uni) est encore plus stricte mais limite parfois l'accès aux joueurs hors UK.",
  },
  {
    question: 'Mes fonds sont-ils protégés si un casino fait faillite ?',
    answer:
      'Cela dépend de la licence. Sous licence MGA, les opérateurs doivent maintenir des fonds joueurs ségrégués — en cas de faillite, votre solde est protégé. Sous licence UKGC, la protection est similaire. Pour les casinos sous licence Curaçao (moins stricte), la protection est moins garantie. Notre sélection privilégie les opérateurs sous licence MGA ou UKGC pour cette raison.',
  },
  {
    question: 'Un casino sans numéro de licence visible est-il dangereux ?',
    answer:
      "Oui, c'est un signal d'alerte. Tout casino sérieux affiche son numéro de licence dans le footer et lie vers le registre du régulateur. Si le numéro n'est pas cliquable ou n'apparaît pas dans le registre officiel, évitez ce site. Nous vérifions systématiquement chaque licence avant d'intégrer un casino à notre sélection.",
  },
  {
    question: 'Les casinos sur cette liste peuvent-ils refuser un retrait légitime ?',
    answer:
      "Les opérateurs sous licence MGA ou UKGC sont tenus de traiter les retraits dans des délais raisonnables et ne peuvent pas refuser un retrait légitime sans motif valable (wager incomplet, KYC non vérifié, fraude suspectée). En cas de litige, vous pouvez déposer une plainte auprès du régulateur qui dispose d'un pouvoir de sanction réel. C'est l'avantage fondamental d'une licence sérieuse.",
  },
  {
    question: 'Est-il possible de jouer anonymement dans un casino fiable ?',
    answer:
      "Non. Les casinos fiables sous licences sérieuses appliquent tous le KYC (Know Your Customer) obligatoire pour tout retrait significatif. C'est une exigence réglementaire anti-blanchiment, pas un choix de l'opérateur. L'anonymat complet n'existe que sur des plateformes non régulées que nous déconseillons. Le KYC est la contrepartie de la protection des joueurs.",
  },
]

const FAQ_EN = [
  {
    question: 'How do you know if an online casino is truly trustworthy?',
    answer:
      'Five key indicators: (1) Active MGA, UKGC or Gibraltar licence — verifiable directly on the regulator website. (2) Over 5 years of operation with a clean payment history. (3) AskGamblers or Casinomeister rating above 7/10 with recent reviews. (4) eCOGRA or iTech Labs certificate visible on the homepage. (5) Customer service reachable within 24 hours. Our selection meets all these criteria.',
  },
  {
    question: 'Is the MGA licence the best guarantee of trustworthiness?',
    answer:
      'The MGA (Malta Gaming Authority) is one of the most respected licences. It requires operators to maintain segregated player funds (your money cannot be used for casino operations), submit their RNGs to independent audits, and handle complaints through a formal mechanism. The UKGC (UK) is even stricter but sometimes limits access for players outside the UK.',
  },
  {
    question: 'Are my funds protected if a casino goes bankrupt?',
    answer:
      'It depends on the licence. Under an MGA licence, operators must maintain segregated player funds — in case of bankruptcy, your balance is protected. Under a UKGC licence, protection is similar. For Curaçao-licensed casinos (less strict), protection is less guaranteed. Our selection prioritises MGA or UKGC-licensed operators for this reason.',
  },
  {
    question: 'Is a casino without a visible licence number dangerous?',
    answer:
      'Yes, it is a red flag. Any reputable casino displays its licence number in the footer and links to the regulator register. If the number is not clickable or does not appear in the official register, avoid that site. We systematically verify each licence before including a casino in our selection.',
  },
  {
    question: 'Can casinos on this list refuse a legitimate withdrawal?',
    answer:
      'Operators under MGA or UKGC licences are required to process withdrawals within reasonable timeframes and cannot refuse a legitimate withdrawal without valid grounds (incomplete wager, unverified KYC, suspected fraud). In case of dispute, you can file a complaint with the regulator who has real sanctioning power. This is the fundamental advantage of a serious licence.',
  },
  {
    question: 'Is it possible to play anonymously at a trusted casino?',
    answer:
      'No. Trusted casinos under serious licences all apply mandatory KYC (Know Your Customer) for any significant withdrawal. This is a regulatory anti-money laundering requirement, not an operator choice. Complete anonymity only exists on unregulated platforms we advise against. KYC is the trade-off for player protection.',
  },
]

export default async function CasinosFiablesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const fiables = operators
    .filter((op) => op.licence.toLowerCase().includes('mga') || op.rating >= 8.0)
    .sort((a, b) => b.rating - a.rating)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Casinos en ligne fiables et sécurisés France 2026'
      : 'Trusted & Secure Online Casinos France 2026',
    itemListElement: fiables.slice(0, 10).map((op, i) => ({
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
      pageType="casino_fiables"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casinos Fiables' : 'Trusted Casinos' },
      ]}
      eyebrow={
        isFr
          ? 'Licences vérifiées · MGA · UKGC · Gibraltar · 2026'
          : 'Verified licences · MGA · UKGC · Gibraltar · 2026'
      }
      heading={
        isFr ? (
          <>
            Casinos en ligne <em className="not-italic text-green">fiables & sécurisés</em>
          </>
        ) : (
          <>
            Safe & <em className="not-italic text-green">trusted casinos</em>
          </>
        )
      }
      intro={
        isFr
          ? 'Sélection basée sur la rigueur de la licence, la ségrégation des fonds joueurs, la rapidité des retraits et la transparence des conditions. Filtrez par régulateur.'
          : 'Selection based on licence rigour, player fund segregation, withdrawal speed and terms transparency. Filter by regulator.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={fiables}
      configKey="fiables"
      editorialH2={
        isFr
          ? 'Notre méthode pour évaluer la fiabilité'
          : 'Our method for assessing trustworthiness'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              La fiabilité d&apos;un casino en ligne se mesure à travers six critères objectifs. La{' '}
              <strong className="text-ink">licence de jeu</strong> est le premier filtre : MGA
              (Malte), UKGC (Royaume-Uni) et Gibraltar sont les plus strictes. Un casino sous
              licence MGA doit maintenir des fonds de jeu ségrégués, ce qui protège votre solde même
              en cas de faillite de l&apos;opérateur.
            </p>
            <p>
              Vient ensuite le <strong className="text-ink">track record financier</strong> : depuis
              combien d&apos;années le casino opère-t-il ? A-t-il des antécédents de retards de
              paiement ? Nous consultons systématiquement les bases de données de Casinomeister,
              AskGamblers et les forums spécialisés. Un casino qui retarde régulièrement des
              retraits sans justification valable est automatiquement exclu de notre sélection.
            </p>
            <p>
              Les <strong className="text-ink">outils de jeu responsable</strong> (limites de dépôt,
              auto-exclusion, délais de refroidissement) sont également notés. Leur absence ou
              difficulté d&apos;accès constitue un mauvais signal — un opérateur qui se soucie de
              ses joueurs les rend visibles et accessibles en un clic.
            </p>
            <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
              La limite de notre sélection
            </h3>
            <p>
              Aucun casino de cette liste n&apos;est accrédité par l&apos;ANJ, l&apos;autorité
              française de régulation des jeux en ligne. Les sites agréés ANJ (Winamax, Betclic,
              PMU) ont un statut légal différent en France. Notre sélection porte sur des casinos
              internationaux licenciés dans des juridictions réputées, accessibles aux joueurs
              français.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Trustworthiness at an online casino is measured through six objective criteria. The{' '}
              <strong className="text-ink">gaming licence</strong> is the first filter: MGA (Malta),
              UKGC (UK) and Gibraltar are the strictest. A casino under MGA licence must maintain
              segregated player funds, protecting your balance even in case of operator insolvency.
            </p>
            <p>
              Next comes the <strong className="text-ink">financial track record</strong>: how long
              has the casino been operating? Does it have a history of payment delays? Our team
              systematically consults Casinomeister, AskGamblers and specialist forums. A casino
              that regularly delays withdrawals without valid justification is automatically
              excluded from our selection.
            </p>
            <p>
              <strong className="text-ink">Responsible gaming tools</strong> (deposit limits,
              self-exclusion, cool-off periods) are also rated. Their absence or difficulty of
              access is a bad signal — an operator that genuinely cares about its players makes
              these tools visible and accessible in one click.
            </p>
            <h3 className="pt-2 font-serif text-[20px] font-semibold text-ink">
              The limits of our selection
            </h3>
            <p>
              No casino on this list holds ANJ accreditation, the French online gambling regulator.
              ANJ-licensed sites (Winamax, Betclic, PMU) have a different legal status in France.
              Our selection covers international casinos licensed in reputable jurisdictions,
              accessible to players worldwide.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casinos fiables' : 'FAQ — Trusted Casinos'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
