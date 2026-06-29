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
      ? 'Casino Sans Wager 2026 — 100 Free Spins + Cashback Sans Conditions'
      : 'No Wager Casino 2026 — 100 Free Spins + No-Condition Cashback',
    description: isFr
      ? '100 FS sans wager Casinozer (gains retirables immédiatement, plafond 250€), cashback 10% hebdo Lucky8, cashback crypto 10% permanent MyStake. 3 opérateurs, 0 condition de mise. Comparatif vérifié 2026. 18+'
      : '100 FS no wager Casinozer (winnings withdrawable immediately, €250 cap), 10% weekly cashback Lucky8, permanent 10% crypto cashback MyStake. 3 operators, 0 playthrough. Verified 2026 comparison. 18+',
    alternates: { languages: buildHreflang('/comparatifs/sans-wager/') },
  }
}

const FAQ_FR = [
  {
    question: "Qu'est-ce qu'un bonus casino sans wager ?",
    answer:
      "Un bonus sans wager (ou 0× wager) ne nécessite aucune remise du bonus avant tout retrait — les gains sont directement disponibles. À l'inverse, un wager 35× sur 100 € de bonus impose de miser 3 500 € avant tout retrait. Avec un RTP de 96 %, le coût statistique d'un wager 35× est d'environ 140 €. C'est pourquoi les bonus sans wager sont rares : ils représentent un coût direct pour l'opérateur.",
  },
  {
    question: 'Quel casino propose 100 free spins sans wager en 2026 ?',
    answer:
      'Casinozer est le seul opérateur de notre comparatif à proposer 100 Free Spins sans aucune condition de mise — UNIQUE absolu. Les gains issus de ces tours gratuits sont crédités sur votre solde réel sans wager. Retirables immédiatement après vérification KYC, avec un plafond de 250 €.',
  },
  {
    question: 'Comment fonctionne le cashback sans wager de Lucky8 ?',
    answer:
      "Lucky8 verse 10 % de vos pertes nettes chaque lundi en argent réel — sans condition de mise. Disponible dès le niveau 1 du programme de fidélité (débutant), avec un minimum de 20 € de pertes sur la semaine précédente. Important : le welcome bonus Lucky8 a un wager 35×, c'est uniquement leur cashback hebdomadaire qui est sans wager.",
  },
  {
    question: 'MyStake propose-t-il un cashback crypto sans wager permanent ?',
    answer:
      "Oui. MyStake propose un cashback de 10 % sans wager sur chaque dépôt en cryptomonnaie — c'est un programme permanent (pas une promotion temporaire). Le cashback s'applique aux dépôts crypto uniquement (BTC, ETH, USDT, etc.). Important : le welcome bonus MyStake a un wager x30, c'est uniquement leur cashback crypto récurrent qui est sans wager.",
  },
  {
    question: 'Existe-t-il des bonus sans wager sous licence ANJ en France ?',
    answer:
      'Les opérateurs ANJ casino (Winamax, Unibet, PokerStars) ne proposent pas de bonus casino sans wager structurés. Betclic propose depuis mars 2026 un bonus de 100 € remboursé sur le premier pari perdant en argent réel — format remboursement, techniquement sans wager sur le pari initial. Pour un aperçu complet des opérateurs ANJ et leurs bonus, consultez notre comparatif des casinos français agréés sur ce site.',
  },
]

const FAQ_EN = [
  {
    question: 'What is a no-wager casino bonus?',
    answer:
      'A no-wager bonus (or 0× wagering) requires no playthrough before withdrawal — winnings are immediately available. By contrast, a 35× wager on a €100 bonus requires wagering €3,500 before withdrawing. With a 96% RTP, the statistical cost of a 35× wager is approximately €140. This is why no-wager bonuses are rare: they represent a direct cost for the operator.',
  },
  {
    question: 'Which casino offers 100 free spins with no wagering in 2026?',
    answer:
      'Casinozer is the only operator in our comparison to offer 100 Free Spins with absolutely no wagering requirement — an absolute unique. Winnings from these free spins are credited to your real balance without conditions. Withdrawable immediately after KYC verification, with a €250 cap.',
  },
  {
    question: "How does Lucky8's no-wager cashback work?",
    answer:
      "Lucky8 pays 10% of your net weekly losses every Monday in real money — no wagering required. Available from tier 1 of the loyalty programme (beginner level), with a minimum of €20 in losses from the previous week. Important: Lucky8's welcome bonus carries a 35× wager; only their weekly cashback is wager-free.",
  },
  {
    question: 'Does MyStake really offer a permanent no-wager crypto cashback?',
    answer:
      "Yes. MyStake offers a 10% no-wager cashback on every cryptocurrency deposit — this is a permanent programme, not a temporary promotion. The cashback applies to crypto deposits only (BTC, ETH, USDT, etc.). Important: MyStake's welcome bonus carries a 30× wager; only their crypto cashback is wager-free.",
  },
  {
    question: 'Do no-wager casino bonuses exist under the ANJ licence in France?',
    answer:
      'ANJ-licensed casino operators (Winamax, Unibet, PokerStars) do not offer structured casino bonuses with no wagering requirement. Since March 2026, Betclic offers €100 refunded on your first losing bet in real money — a refund format, technically no-wager on the initial bet. For a complete overview of ANJ operators and their bonuses, see our French-licensed casino guide on this site.',
  },
]

const SANS_WAGER_ORDER = ['casinozer', 'lucky8', 'mystake']

export default async function SansWagerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const sansWagerOps = operators
    .filter((op) => SANS_WAGER_ORDER.includes(op.slug))
    .sort((a, b) => SANS_WAGER_ORDER.indexOf(a.slug) - SANS_WAGER_ORDER.indexOf(b.slug))

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Meilleurs casinos sans wager France 2026' : 'Best No-Wager Casinos France 2026',
    itemListElement: sansWagerOps.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: op.name,
      url: `${BASE_URL}/casinos/${op.slug}/`,
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

  const linkStyle = 'font-semibold text-green no-underline' as const
  const linkBorder = {
    borderBottom: '1px solid color-mix(in srgb,var(--green) 35%,transparent)',
  }

  const afterListing = (
    <section className="py-10">
      <div className="mx-auto max-w-site px-[18px] md:px-8">
        <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
          {isFr ? 'Comparez plus loin' : 'Compare further'}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              {
                href: '/comparatifs/meilleur-bonus/',
                label: isFr ? 'Tous les bonus comparés' : 'All bonuses compared',
                sub: isFr ? '15 opérateurs · wager comparé' : '15 operators · wagering compared',
                placement: 'sw_hub_after_meilleur_bonus',
              },
              {
                href: '/comparatifs/crypto/',
                label: isFr ? 'Casinos crypto' : 'Crypto casinos',
                sub: isFr ? 'BTC, ETH, USDT · bonus crypto' : 'BTC, ETH, USDT · crypto bonuses',
                placement: 'sw_hub_after_crypto',
              },
              {
                href: '/casinos/francais/',
                label: isFr ? 'Bonus ANJ encadrés' : 'Regulated ANJ bonuses',
                sub: isFr ? '5 opérateurs légaux en France' : '5 legal operators in France',
                placement: 'sw_hub_after_francais',
              },
              {
                href: '/versus/stake-vs-casinozer/',
                label: 'Stake vs Casinozer',
                sub: isFr
                  ? 'Comparatif crypto offshore · promotions vs 100 FS'
                  : 'Crypto offshore comparison · promotions vs 100 FS',
                placement: 'sw_hub_after_versus',
              },
            ] as const
          ).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col gap-[6px] rounded-xl border border-line bg-surface p-5 text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
              data-event="internal_link"
              data-placement={item.placement}
              data-page-type="sans_wager"
              data-locale={locale}
            >
              <span className="text-[14.5px] font-bold">{item.label}</span>
              <span className="text-[12.5px] text-ink-3">{item.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <HubShell
      pageType="sans_wager"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
        { label: isFr ? 'Sans Wager' : 'No Wager' },
      ]}
      eyebrow={
        isFr
          ? '0× wager · 100 FS retirables · Cashback argent réel · Cashback crypto · 2026'
          : '0× wagering · 100 FS withdrawable · Real-money cashback · Crypto cashback · 2026'
      }
      heading={
        isFr ? (
          <>
            Casino sans <em className="not-italic text-green">wager</em> 2026 — 100 free spins,
            cashback hebdomadaire et crypto sans conditions de mise
          </>
        ) : (
          <>
            No <em className="not-italic text-green">wager</em> casino 2026 — 100 free spins, weekly
            cashback and crypto with no conditions
          </>
        )
      }
      intro={
        isFr
          ? 'Les bonus avec wager 30×, 35× ou 50× imposent de remiser des sommes considérables avant tout retrait. Les offres 100 % sans wager sont rares : trois opérateurs de notre comparatif les proposent en 2026. Casinozer offre 100 free spins sans aucune condition de mise — les gains sont retirables immédiatement (plafond 250 € après KYC). Lucky8 verse 10 % de vos pertes nettes chaque lundi en argent réel, sans wager. MyStake propose un cashback de 10 % permanent sur chaque dépôt crypto, sans condition. Trois formats distincts, une seule règle : aucune condition de mise.'
          : 'Casino bonuses with 30×, 35× or 50× wagering require you to stake considerable sums before withdrawing. Genuinely no-wager offers are rare: only three operators in our comparison offer them in 2026. Casinozer offers 100 free spins with no conditions at all — winnings are withdrawable immediately (€250 cap after KYC). Lucky8 pays 10% of your net weekly losses every Monday in real money, with no wagering. MyStake offers a permanent 10% cashback on every crypto deposit, no conditions. Three distinct formats, one rule: zero wagering.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={sansWagerOps}
      configKey="sans_wager"
      afterListing={afterListing}
      editorialH2={
        isFr
          ? 'Le guide complet du casino sans wager en 2026'
          : 'The complete guide to no-wager casinos in 2026'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-10 text-[15.5px] leading-[1.7] text-ink-2">
            {/* §1 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                {"Qu'est-ce qu'un bonus sans wager ?"}
              </h3>
              <p className="mb-3">
                Un bonus sans wager (ou 0× wager) ne nécessite aucune condition de mise avant
                retrait — les gains sont disponibles immédiatement. À titre de comparaison, un wager
                35× sur 100 € de bonus impose de miser 3 500 € avant tout retrait. Avec un RTP de 96
                %, le coût statistique atteint environ 140 €. Un wager 50× (ex. Bitcoin Penguin)
                porte ce coût à 200 € pour le même montant. C&apos;est pourquoi les bonus sans wager
                sont rares : ils représentent un coût direct pour l&apos;opérateur.
              </p>
              <p className="mb-3">
                Dans notre comparatif, trois opérateurs proposent des offres sans wager en 2026,
                sous des formats distincts.{' '}
                <a
                  href="/casinos/casinozer/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_casinozer"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Casinozer
                </a>{' '}
                est le seul dont le <strong className="text-ink">welcome bonus lui-même</strong> est
                0× wager : 100 Free Spins retirables immédiatement (plafond 250 € après KYC).
              </p>
              <p>
                <a
                  href="/casinos/lucky8/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_lucky8"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Lucky8
                </a>{' '}
                et{' '}
                <a
                  href="/casinos/mystake/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_mystake"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  MyStake
                </a>{' '}
                proposent, eux, des <strong className="text-ink">cashbacks récurrents</strong> sans
                wager — format différent du bonus de bienvenue. Leurs bonuses de bienvenue ont un
                wager respectif de 35× (Lucky8) et x30 casino (MyStake). C&apos;est uniquement leur
                cashback récurrent qui est 0× wager.
              </p>
            </div>

            {/* §2 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Cashback sans wager : Lucky8 et MyStake
              </h3>
              <p className="mb-3">
                Le cashback sans wager s&apos;applique sur une période donnée et les sommes versées
                le sont en argent réel ou en crypto, sans condition de remise. C&apos;est un format
                différent du welcome bonus — il réduit l&apos;avantage de la maison de manière
                récurrente.
              </p>
              <p className="mb-3">
                <a
                  href="/casinos/lucky8/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_lucky8"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Lucky8
                </a>{' '}
                verse 10 % de vos pertes nettes chaque lundi en argent réel — sans condition de
                mise. Disponible dès le niveau 1 (débutant), minimum 20 € de pertes sur la semaine
                précédente. Le versement est automatique, sans action requise.
              </p>
              <p className="mb-3">
                <a
                  href="/casinos/mystake/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_mystake"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  MyStake
                </a>{' '}
                propose un cashback crypto de 10 % sans wager sur chaque dépôt en cryptomonnaie —
                programme permanent (pas une promotion temporaire), disponible dès le premier dépôt
                crypto, quel que soit le niveau VIP.
              </p>
              <p>
                Différenciation clé : Lucky8 verse en argent réel (accessible à tous), MyStake en
                cashback crypto (réservé aux joueurs actifs en crypto). Troisième angle :{' '}
                <a
                  href="/casinos/casinozer/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_casinozer_vip"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Casinozer
                </a>{' '}
                propose son programme VIP Cyber-City avec jusqu&apos;à 15 % de cashback versé en
                argent réel selon le niveau (6 paliers progressifs).
              </p>
            </div>

            {/* §3 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Existe-t-il des bonus sans wager en France (ANJ) ?
              </h3>
              <p className="mb-3">
                Les casinos sous licence <strong className="text-ink">ANJ</strong> (Autorité
                Nationale des Jeux) ne proposent pas de bonus casino sans wager structurés —
                c&apos;est une réalité du cadre réglementaire français. Les opérateurs ANJ casino
                proposent des freebets avec wager ou des bonus sport encadrés.
              </p>
              <p className="mb-3">
                Exception notable :{' '}
                <a
                  href="/casinos/betclic/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s3_betclic"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Betclic
                </a>{' '}
                propose depuis mars 2026 un remboursement de 100 € sur votre premier pari perdant en
                argent réel — pas en freebets à rejouer. C&apos;est un{' '}
                <strong className="text-ink">format remboursement</strong>, techniquement sans wager
                sur le pari initial, différent du bonus casino sans wager classique mais plus proche
                d&apos;un argent réel récupérable.
              </p>
              <p>
                Verdict : pour un bonus casino 100 % sans wager, l&apos;offshore est
                aujourd&apos;hui la seule option (Casinozer, Lucky8, MyStake). Pour rester dans le
                cadre légal français avec un format argent réel : Betclic (remboursement). Pour un
                aperçu complet des opérateurs ANJ et leurs bonus :{' '}
                <a
                  href="/casinos/francais/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s3_francais"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  casinos français agréés ANJ
                </a>
                .
              </p>
            </div>

            {/* §4 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Verdict par profil de joueur
              </h3>
              <ul className="flex list-none flex-col gap-[10px] p-0">
                {[
                  {
                    label: '100 FS retirables immédiatement',
                    text: 'Casinozer — seul welcome bonus 0× wager du comparatif, plafond 250 € après KYC.',
                    href: '/casinos/casinozer/',
                    placement: 'sw_editorial_s4_casinozer',
                  },
                  {
                    label: 'Cashback argent réel récurrent',
                    text: 'Lucky8 — 10 % hebdomadaire chaque lundi sans wager. Niveau 1, min. 20 € de pertes.',
                    href: '/casinos/lucky8/',
                    placement: 'sw_editorial_s4_lucky8',
                  },
                  {
                    label: 'Cashback crypto permanent',
                    text: 'MyStake — 10 % sans wager sur chaque dépôt crypto. Permanent, dès le premier dépôt.',
                    href: '/casinos/mystake/',
                    placement: 'sw_editorial_s4_mystake',
                  },
                  {
                    label: 'Cadre légal ANJ + argent réel',
                    text: 'Betclic — 100 € remboursés sur premier pari perdant (mars 2026, argent réel, format remboursement).',
                    href: '/casinos/betclic/',
                    placement: 'sw_editorial_s4_betclic',
                  },
                ].map((item) => (
                  <li
                    key={item.href}
                    className="flex items-start gap-[11px] text-[15px] leading-[1.5]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-[3px] h-[16px] w-[16px] shrink-0 text-green"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-ink-2">
                      <strong className="text-ink">{item.label} :</strong>{' '}
                      <a
                        href={item.href}
                        className={linkStyle}
                        style={linkBorder}
                        data-event="internal_link"
                        data-placement={item.placement}
                        data-page-type="sans_wager"
                        data-locale={locale}
                      >
                        {item.text.split(' — ')[0]}
                      </a>{' '}
                      — {item.text.split(' — ').slice(1).join(' — ')}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14.5px] text-ink-3">
                Pour comparer tous les bonus casino (avec et sans wager) :{' '}
                <a
                  href="/comparatifs/meilleur-bonus/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s4_meilleur_bonus"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  meilleur bonus casino 2026
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-10 text-[15.5px] leading-[1.7] text-ink-2">
            {/* §1 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                What is a no-wager casino bonus?
              </h3>
              <p className="mb-3">
                A no-wager bonus (or 0× wager) requires no playthrough before withdrawal — winnings
                are available immediately. By comparison, a 35× wager on a €100 bonus requires
                staking €3,500 before withdrawing. With a 96% RTP, the statistical cost reaches
                approximately €140. A 50× wager pushes this to €200 for the same amount. This is why
                no-wager bonuses are rare: they represent a direct cost for the operator.
              </p>
              <p className="mb-3">
                In our comparison, three operators offer no-wager options in 2026, in distinct
                formats.{' '}
                <a
                  href="/casinos/casinozer/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_casinozer"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Casinozer
                </a>{' '}
                is the only one whose <strong className="text-ink">welcome bonus itself</strong> is
                0× wager: 100 Free Spins withdrawable immediately (€250 cap after KYC).
              </p>
              <p>
                <a
                  href="/casinos/lucky8/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_lucky8"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Lucky8
                </a>{' '}
                and{' '}
                <a
                  href="/casinos/mystake/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s1_mystake"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  MyStake
                </a>{' '}
                offer <strong className="text-ink">recurring no-wager cashbacks</strong> — a
                different format from the welcome bonus. Their welcome bonuses carry a 35× wager
                (Lucky8) and 30× casino wager (MyStake) respectively. Only their recurring cashback
                is 0× wager.
              </p>
            </div>

            {/* §2 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                No-wager cashback: Lucky8 and MyStake
              </h3>
              <p className="mb-3">
                No-wager cashback applies over a given period and the amounts paid are in real money
                or crypto, with no playthrough requirement. It is a different format from the
                welcome bonus — it permanently reduces the house edge on a recurring basis.
              </p>
              <p className="mb-3">
                <a
                  href="/casinos/lucky8/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_lucky8"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Lucky8
                </a>{' '}
                pays 10% of your net weekly losses every Monday in real money — no wagering
                required. Available from loyalty tier 1 (beginner), minimum €20 in losses the
                previous week. Credited automatically, no action required.
              </p>
              <p className="mb-3">
                <a
                  href="/casinos/mystake/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_mystake"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  MyStake
                </a>{' '}
                offers a 10% no-wager crypto cashback on every cryptocurrency deposit — a permanent
                programme (not a temporary promotion), available from the first crypto deposit,
                regardless of VIP level.
              </p>
              <p>
                Key difference: Lucky8 pays in real money (accessible to all players), MyStake in
                crypto cashback (for active crypto players only). Third angle:{' '}
                <a
                  href="/casinos/casinozer/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s2_casinozer_vip"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Casinozer
                </a>{' '}
                offers its Cyber-City VIP programme with up to 15% cashback paid in real money by
                level (6 progressive tiers).
              </p>
            </div>

            {/* §3 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Do no-wager casino bonuses exist in France (ANJ)?
              </h3>
              <p className="mb-3">
                Casinos under{' '}
                <strong className="text-ink">ANJ (French National Gaming Authority)</strong> licence
                do not offer structured no-wager casino bonuses — this is a reality of the French
                regulatory framework. ANJ casino operators offer free bets with wagering or
                sport-focused bonuses.
              </p>
              <p className="mb-3">
                Notable exception:{' '}
                <a
                  href="/casinos/betclic/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s3_betclic"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  Betclic
                </a>{' '}
                has offered since March 2026 a €100 refund on your first losing bet in real money —
                not as free bets. It is a <strong className="text-ink">refund format</strong>,
                technically no-wager on the initial bet, different from the classic no-wager casino
                bonus but closer to recoverable real money.
              </p>
              <p>
                Verdict: for a 100% no-wager casino bonus, offshore is currently the only option
                (Casinozer, Lucky8, MyStake). To stay within the French legal framework with a
                real-money format: Betclic (refund). For a full overview of ANJ operators:{' '}
                <a
                  href="/casinos/francais/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s3_francais"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  French ANJ-licensed casinos
                </a>
                .
              </p>
            </div>

            {/* §4 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Verdict by player profile
              </h3>
              <ul className="flex list-none flex-col gap-[10px] p-0">
                {[
                  {
                    label: '100 FS withdrawable immediately',
                    text: 'Casinozer — the only 0× wager welcome bonus in the comparison, €250 cap after KYC.',
                    href: '/casinos/casinozer/',
                    placement: 'sw_editorial_s4_casinozer',
                  },
                  {
                    label: 'Recurring real-money cashback',
                    text: 'Lucky8 — 10% weekly every Monday, no wagering. Tier 1, min. €20 in losses.',
                    href: '/casinos/lucky8/',
                    placement: 'sw_editorial_s4_lucky8',
                  },
                  {
                    label: 'Permanent crypto cashback',
                    text: 'MyStake — 10% no-wager on every crypto deposit. Permanent, from the first deposit.',
                    href: '/casinos/mystake/',
                    placement: 'sw_editorial_s4_mystake',
                  },
                  {
                    label: 'ANJ legal framework + real money',
                    text: 'Betclic — €100 refunded on first losing bet (March 2026, real money, refund format).',
                    href: '/casinos/betclic/',
                    placement: 'sw_editorial_s4_betclic',
                  },
                ].map((item) => (
                  <li
                    key={item.href}
                    className="flex items-start gap-[11px] text-[15px] leading-[1.5]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="mt-[3px] h-[16px] w-[16px] shrink-0 text-green"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-ink-2">
                      <strong className="text-ink">{item.label}:</strong>{' '}
                      <a
                        href={item.href}
                        className={linkStyle}
                        style={linkBorder}
                        data-event="internal_link"
                        data-placement={item.placement}
                        data-page-type="sans_wager"
                        data-locale={locale}
                      >
                        {item.text.split(' — ')[0]}
                      </a>{' '}
                      — {item.text.split(' — ').slice(1).join(' — ')}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14.5px] text-ink-3">
                To compare all casino bonuses (with and without wagering):{' '}
                <a
                  href="/comparatifs/meilleur-bonus/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="sw_editorial_s4_meilleur_bonus"
                  data-page-type="sans_wager"
                  data-locale={locale}
                >
                  best casino bonus 2026
                </a>
                .
              </p>
            </div>
          </div>
        )
      }
      faqH2={
        isFr
          ? 'Questions fréquentes sur les bonus sans wager'
          : 'Frequently asked questions about no-wager bonuses'
      }
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
