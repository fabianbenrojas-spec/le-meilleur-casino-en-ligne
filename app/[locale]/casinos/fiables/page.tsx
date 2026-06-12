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
      ? 'Casinos en ligne Fiables & Sécurisés France 2026 — Licences Vérifiées'
      : 'Safe & Trusted Online Casinos France 2026 — Verified Licences',
    description: isFr
      ? 'Les casinos en ligne les plus fiables en France 2026 : licences MGA, Gibraltar, UKGC vérifiées, chiffrement SSL, KYC et protection des joueurs. 18+'
      : 'Most trusted online casinos in France 2026: verified MGA, Gibraltar, UKGC licences, SSL encryption, KYC and player protection. 18+',
    alternates: { languages: buildHreflang('/casinos/fiables/') },
  }
}

const FAQ_FR = [
  {
    question: "Comment vérifier qu'un casino en ligne est fiable ?",
    answer:
      "Trois vérifications essentielles : (1) La licence — elle doit être vérifiable sur le site de l'autorité de régulation (MGA, UKGC, Gibraltar). (2) Le chiffrement — l'URL doit commencer par HTTPS et le certificat SSL être valide. (3) Les avis des joueurs — vérifiez sur Trustpilot et AskGamblers les problèmes de retrait récurrents. Un casino fiable traite les retraits sous 72 heures et ne réclame pas de justificatifs excessifs.",
  },
  {
    question: "Qu'est-ce que la licence MGA et pourquoi est-elle importante ?",
    answer:
      "La Malta Gaming Authority (MGA) est l'une des régulations les plus strictes au monde. Un casino sous licence MGA doit maintenir des fonds de jeu ségrégués (votre argent est protégé même en cas de faillite), passer des audits techniques réguliers, appliquer des procédures KYC strictes et offrir un mécanisme de résolution des litiges. La MGA est un indicateur fort de sérieux, même si elle n'implique pas une accréditation ANJ en France.",
  },
  {
    question: "Qu'est-ce que le KYC dans un casino en ligne ?",
    answer:
      "KYC signifie 'Know Your Customer' (Connaissance du Client). C'est une procédure de vérification d'identité obligatoire pour les casinos sous licence sérieuse. Elle implique l'envoi d'une pièce d'identité, d'un justificatif de domicile et parfois d'un justificatif de source de fonds pour les gros retraits. Cette procédure protège contre la fraude et assure que le casino respecte les lois anti-blanchiment.",
  },
  {
    question: 'Que faire si un casino refuse de payer mes gains ?',
    answer:
      "Première étape : relisez les conditions générales pour vérifier qu'aucune clause ne justifie le refus (bonus non soldé, KYC incomplet, limite de retrait). Deuxième étape : contactez le service client par écrit (mail ou chat) et conservez tous les échanges. Troisième étape : si le casino est sous licence MGA, déposez une plainte sur le portail MGERC. Pour UKGC, contactez l'IBAS. En dernier recours, Casinomeister et AskGamblers ont des forums de médiation efficaces.",
  },
  {
    question: 'Les casinos en ligne sécurisent-ils mes données bancaires ?',
    answer:
      "Les casinos fiables n'ont jamais accès direct à vos données bancaires complètes. Les dépôts par carte utilisent des prestataires de paiement certifiés PCI-DSS. Vos données de carte ne transitent pas sur les serveurs du casino. Le chiffrement TLS 1.3 protège toutes les communications. Pour une sécurité maximale, utilisez des e-wallets (Skrill, Neteller) ou des cryptomonnaies.",
  },
  {
    question: 'Un casino fiable peut-il quand même faire faillite ?',
    answer:
      "Oui, mais les conséquences sont très différentes selon la licence. Avec une licence MGA, les fonds joueurs sont ségrégués et protégés — vous récupérez votre solde même en cas de liquidation. Sans cette protection (certaines licences Curaçao), vos fonds sont exposés. C'est pourquoi nous recommandons les casinos MGA ou UKGC et de ne jamais laisser de gros soldes dormants.",
  },
]

const FAQ_EN = [
  {
    question: 'How do you verify that an online casino is reliable?',
    answer:
      "Three essential checks: (1) Licence — it must be verifiable on the regulator's website (MGA, UKGC, Gibraltar). (2) Encryption — the URL must start with HTTPS and the SSL certificate must be valid. (3) Player reviews — check Trustpilot and AskGamblers for recurring withdrawal issues. A trustworthy casino processes withdrawals within 72 hours and does not request excessive documentation.",
  },
  {
    question: 'What is an MGA licence and why does it matter?',
    answer:
      'The Malta Gaming Authority (MGA) is one of the strictest regulations in the world. An MGA-licensed casino must maintain segregated player funds (your money is protected even in case of insolvency), undergo regular technical audits, apply strict KYC procedures, and offer a dispute resolution mechanism. The MGA is a strong indicator of trustworthiness.',
  },
  {
    question: 'What is KYC in an online casino?',
    answer:
      "KYC stands for 'Know Your Customer'. It is a mandatory identity verification procedure for casinos under serious licences. It involves submitting ID, proof of address, and sometimes proof of source of funds for large withdrawals. This process protects against fraud and ensures the casino complies with anti-money laundering laws.",
  },
  {
    question: 'What should I do if a casino refuses to pay my winnings?',
    answer:
      'First step: re-read the terms and conditions to check if any clause justifies the refusal (unsettled bonus, incomplete KYC, withdrawal limit exceeded). Second step: contact customer support in writing (email or chat) and keep all correspondence. Third step: if the casino holds an MGA licence, submit a complaint via the MGERC portal. As a last resort, Casinomeister and AskGamblers have effective mediation forums.',
  },
  {
    question: 'Do online casinos secure my banking data?',
    answer:
      "Trustworthy casinos never have direct access to your full banking data. Card deposits use PCI-DSS certified payment processors. Your card details do not pass through the casino's servers. TLS 1.3 encryption protects all communications. For maximum security, use e-wallets (Skrill, Neteller) or cryptocurrencies.",
  },
  {
    question: 'Can a trustworthy casino still go bankrupt?',
    answer:
      'Yes, but the consequences differ greatly depending on the licence. With an MGA licence, player funds are segregated and protected — you recover your balance even in liquidation. Without this protection (some Curaçao licences), your funds are exposed. That is why we recommend MGA or UKGC casinos and advise against leaving large idle balances.',
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
          { label: isFr ? 'Casinos Fiables' : 'Trusted Casinos' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_fiables" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'Licences vérifiées · MGA · UKGC · Gibraltar · 2026'
              : 'Verified licences · MGA · UKGC · Gibraltar · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Casinos en ligne <em className="not-italic text-green">fiables & sécurisés</em>
              </>
            ) : (
              <>
                Safe & <em className="not-italic text-green">trusted casinos</em>
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Sélection basée sur la rigueur de la licence, la ségrégation des fonds joueurs, la rapidité des retraits et la transparence des conditions. Filtrez par régulateur.'
              : 'Selection based on licence rigour, player fund segregation, withdrawal speed and terms transparency. Filter by regulator.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={fiables}
        configKey="fiables"
        pageType="casino_fiables"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-8 sm:px-[18px]">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? 'Notre méthode pour évaluer la fiabilité'
              : 'Our method for assessing trustworthiness'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                La fiabilité d&apos;un casino en ligne se mesure à travers six critères objectifs.
                La <strong className="text-ink">licence de jeu</strong> est le premier filtre : MGA
                (Malte), UKGC (Royaume-Uni) et Gibraltar sont les plus strictes. Un casino sous
                licence MGA doit maintenir des fonds de jeu ségrégués, ce qui protège votre solde
                même en cas de faillite de l&apos;opérateur.
              </p>
              <p>
                Vient ensuite le <strong className="text-ink">track record financier</strong> :
                depuis combien d&apos;années le casino opère-t-il ? A-t-il des antécédents de
                retards de paiement ? Nous consultons systématiquement les bases de données de
                Casinomeister, AskGamblers et les forums spécialisés. Un casino qui retarde
                régulièrement des retraits sans justification valable est automatiquement exclu de
                notre sélection.
              </p>
              <p>
                Les <strong className="text-ink">outils de jeu responsable</strong> (limites de
                dépôt, auto-exclusion, délais de refroidissement) sont également notés. Leur absence
                ou difficulté d&apos;accès constitue un mauvais signal — un opérateur qui se soucie
                de ses joueurs les rend visibles et accessibles en un clic.
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
                <strong className="text-ink">gaming licence</strong> is the first filter: MGA
                (Malta), UKGC (UK) and Gibraltar are the strictest. A casino under MGA licence must
                maintain segregated player funds, protecting your balance even in case of operator
                insolvency.
              </p>
              <p>
                Next comes the <strong className="text-ink">financial track record</strong>: how
                long has the casino been operating? Does it have a history of payment delays? Our
                team systematically consults Casinomeister, AskGamblers and specialist forums. A
                casino that regularly delays withdrawals without valid justification is
                automatically excluded from our selection.
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
                No casino on this list holds ANJ accreditation, the French online gambling
                regulator. ANJ-licensed sites (Winamax, Betclic, PMU) have a different legal status
                in France. Our selection covers international casinos licensed in reputable
                jurisdictions, accessible to players worldwide.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Casinos fiables' : 'FAQ — Trusted Casinos'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
