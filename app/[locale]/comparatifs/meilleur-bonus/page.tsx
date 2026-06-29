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
      ? 'Meilleur Bonus Casino 2026 — Sans Wager, Cashback, Argent Réel : Comparatif'
      : 'Best Casino Bonus 2026 — No Wager, Cashback, Real Money: Comparison',
    description: isFr
      ? '100 FS sans wager (Casinozer), cashback 10% sans wager (Lucky8, MyStake), 100€ argent réel ANJ (Betclic). Wager 30× parmi les plus bas (Wild Sultan). Tous les bonus vérifiés. 18+'
      : '100 free spins no wager (Casinozer), 10% no-wager cashback (Lucky8, MyStake), €100 real money ANJ (Betclic). 30× wagering among the lowest (Wild Sultan). All bonuses verified. 18+',
    alternates: { languages: buildHreflang('/comparatifs/meilleur-bonus/') },
  }
}

const FAQ_FR = [
  {
    question: 'Quel est le meilleur bonus casino sans wager en 2026 ?',
    answer:
      "Casinozer propose 100 Free Spins sans aucune condition de mise — le seul bonus sans wager de notre comparatif. Les gains sont retirables immédiatement après vérification KYC, avec un plafond de 250 €. C'est l'offre la plus avantageuse du marché si vous recherchez un bonus 100 % sans conditions.",
  },
  {
    question: 'Comment fonctionne le wager (conditions de mise) ?',
    answer:
      "Le wager indique combien de fois vous devez miser le bonus avant tout retrait. Exemple : wager 35× sur 100 € = 3 500 € à jouer. Avec un RTP de 96 % sur les slots, le coût statistique est d'environ 140 €. Wild Sultan (wager 30×) revient à 120 € de coût — soit 20 € de moins. Madnix (40×) monte à 160 €. Plus le wager est bas, plus le bonus a de valeur réelle.",
  },
  {
    question: 'Bonus ANJ ou bonus offshore : quelle différence concrète ?',
    answer:
      'Les bonus ANJ sont strictement encadrés : conditions transparentes, gains garantis. Betclic propose un rare bonus en argent réel (100 € remboursé sur le premier pari perdant, pas en freebets, depuis mars 2026). Les bonus offshore offrent plus de volume et de créativité : 100 FS sans wager (Casinozer), cashback 10 % (Lucky8), mais hors cadre réglementaire français. Choisissez selon votre priorité : sécurité légale ou format distinctif.',
  },
  {
    question: 'Quels casinos proposent un cashback structuré ?',
    answer:
      "Trois opérateurs de notre comparatif proposent un cashback régulier : Lucky8 (10 % hebdomadaire chaque lundi en argent réel, niveau 1, minimum 20 € de pertes), MyStake (10 % crypto sans wager permanent sur chaque dépôt crypto) et Casinozer via son programme VIP Cyber-City (jusqu'à 15 % de cashback selon votre niveau, de 1 à 6).",
  },
  {
    question: 'Existe-t-il des bonus en argent réel en France ?',
    answer:
      "Oui, mais c'est rare. Betclic propose depuis mars 2026 un bonus de 100 € remboursé sur votre premier pari perdant en argent réel — pas en freebets à rejouer. PMU offre également 100 € sport retirables dès 1 € de gains. La plupart des bonus ANJ casino sont crédités en freebets soumis à des conditions de rejeu.",
  },
  {
    question: 'Comment éviter les pièges des bonus à wager élevé ?',
    answer:
      "Quatre vérifications avant d'accepter un bonus : 1. Le wager (30× avantageux, 40-50× élevé). 2. La durée de validité (7 à 30 jours selon opérateurs). 3. Les jeux éligibles (slots 100 %, jeux de table souvent 10-20 %). 4. Le plafond de retrait sur les gains issus du bonus. Calcul rapide du coût : bonus × wager × (1 - RTP). Avec RTP 96 % et wager 50 ×, sur 100 € : coût statistique de 200 €.",
  },
  {
    question: 'Les bonus crypto sont-ils différents des bonus fiat ?',
    answer:
      "Oui. Les bonus crypto sont souvent sans wager ou à wager minimal. MyStake propose un cashback crypto de 10 % sans wager permanent sur chaque dépôt en cryptomonnaie — disponible dès le premier dépôt, sans condition de niveau VIP. Casinozer accepte BTC, ETH et USDT et propose les mêmes 100 FS sans wager qu'en fiat. Pour une vue complète des casinos crypto, consultez notre comparatif dédié sur ce site.",
  },
]

const FAQ_EN = [
  {
    question: 'What is the best no-wager casino bonus in 2026?',
    answer:
      'Casinozer offers 100 Free Spins with absolutely no wagering requirement — the only no-wager bonus in our comparison. Winnings are withdrawable immediately after KYC verification, with a €250 cap. This is the most advantageous offer on the market if you are looking for a 100% condition-free bonus.',
  },
  {
    question: 'How does wagering (playthrough requirements) work?',
    answer:
      'The wagering requirement tells you how many times you must play the bonus before withdrawing. Example: 35× wager on €100 = €3,500 to play. With an average 96% RTP on slots, the statistical cost is approximately €140. Wild Sultan (30× wager) costs €120 — €20 less. Madnix (40×) costs €160. The lower the wager, the more real value the bonus holds.',
  },
  {
    question: 'ANJ bonus vs offshore bonus: what is the concrete difference?',
    answer:
      'ANJ bonuses are strictly regulated: transparent conditions, guaranteed winnings. Betclic offers a rare real-money bonus (€100 refunded on your first losing bet, not as free bets, since March 2026). Offshore bonuses offer more volume and creativity: 100 free spins no wager (Casinozer), 10% cashback (Lucky8) — but outside the French regulatory framework. Choose based on your priority: legal security or distinctive format.',
  },
  {
    question: 'Which casinos offer structured cashback?',
    answer:
      'Three operators in our comparison offer regular cashback: Lucky8 (10% weekly every Monday in real money, tier 1, minimum €20 in losses), MyStake (10% crypto no-wager permanent on each crypto deposit) and Casinozer through its Cyber-City VIP programme (up to 15% cashback depending on your level, tiers 1 to 6).',
  },
  {
    question: 'Are there real-money bonuses in France?',
    answer:
      'Yes, but they are rare. Since March 2026, Betclic offers €100 refunded on your first losing bet in real money — not as free bets to replay. PMU also offers €100 in sport credits withdrawable from €1 in winnings. Most ANJ casino bonuses are credited as free bets subject to playthrough conditions.',
  },
  {
    question: 'How do you avoid the traps of high-wager bonuses?',
    answer:
      'Four checks before accepting a bonus: 1. The wager (30× advantageous, 40-50× high). 2. The validity period (7 to 30 days depending on operator). 3. Eligible games (slots 100%, table games often 10-20%). 4. The withdrawal cap on bonus-derived winnings. Quick cost calculation: bonus × wager × (1 - RTP). With 96% RTP and 50× wager on €100: statistical cost of €200.',
  },
  {
    question: 'Are crypto bonuses different from fiat bonuses?',
    answer:
      'Yes. Crypto bonuses are often no-wager or low-wager. MyStake offers a permanent 10% crypto no-wager cashback on every crypto deposit — available from the first deposit, regardless of VIP level. Casinozer accepts BTC, ETH and USDT and offers the same 100 no-wager free spins as in fiat. For a full overview of crypto casinos, see our dedicated comparison on this site.',
  },
]

const FEATURED_SLUGS = ['casinozer', 'lucky8', 'mystake', 'magical-spin', 'wild-sultan']

export default async function MeilleurBonusPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const sorted = [...operators]
    .filter((op) => op.hasBonus)
    .sort((a, b) => {
      const aFeatured = FEATURED_SLUGS.indexOf(a.slug)
      const bFeatured = FEATURED_SLUGS.indexOf(b.slug)
      if (aFeatured !== -1 && bFeatured !== -1) return aFeatured - bFeatured
      if (aFeatured !== -1) return -1
      if (bFeatured !== -1) return 1
      return b.bonusAmountNumber - a.bonusAmountNumber
    })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Meilleurs bonus casino en ligne France 2026'
      : 'Best Online Casino Bonuses France 2026',
    itemListElement: sorted.slice(0, 10).map((op, i) => ({
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
                href: '/casinos/francais/',
                label: isFr ? 'Bonus ANJ encadrés' : 'Regulated ANJ bonuses',
                sub: isFr ? '5 opérateurs légaux en France' : '5 legal operators in France',
                placement: 'bonus_hub_after_francais',
              },
              {
                href: '/comparatifs/crypto/',
                label: isFr ? 'Bonus et cashback crypto' : 'Crypto bonuses and cashback',
                sub: isFr ? 'BTC, ETH, USDT — sans wager' : 'BTC, ETH, USDT — no wager',
                placement: 'bonus_hub_after_crypto',
              },
              {
                href: '/versus/winamax-vs-betclic/',
                label: isFr ? 'Winamax vs Betclic' : 'Winamax vs Betclic',
                sub: isFr ? 'Comparatif bonus ANJ' : 'ANJ bonus comparison',
                placement: 'bonus_hub_after_versus_anj',
              },
              {
                href: '/versus/cresus-vs-lucky8/',
                label: isFr ? 'Crésus vs Lucky8' : 'Crésus vs Lucky8',
                sub: isFr ? 'Comparatif bonus offshore' : 'Offshore bonus comparison',
                placement: 'bonus_hub_after_versus_offshore',
              },
            ] as const
          ).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex flex-col gap-[6px] rounded-xl border border-line bg-surface p-5 text-ink no-underline shadow-1 transition-[transform,box-shadow,border-color] duration-[150ms] hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--green)_35%,var(--line))] hover:shadow-3"
              data-event="internal_link"
              data-placement={item.placement}
              data-page-type="meilleur_bonus"
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
      pageType="meilleur_bonus"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Comparatifs' : 'Comparisons', href: '/comparatifs/' },
        { label: isFr ? 'Meilleur Bonus' : 'Best Bonus' },
      ]}
      eyebrow={
        isFr
          ? 'Sans wager · Cashback · Argent réel ANJ · Wager comparé · 2026'
          : 'No wager · Cashback · ANJ real money · Wagering compared · 2026'
      }
      heading={
        isFr ? (
          <>
            Meilleur <em className="not-italic text-green">bonus casino</em> 2026 — sans wager,
            cashback ou argent réel
          </>
        ) : (
          <>
            Best <em className="not-italic text-green">casino bonus</em> 2026 — no wager, cashback
            or real money
          </>
        )
      }
      intro={
        isFr
          ? 'Tous les bonus ne se valent pas. 100 FS sans wager (Casinozer), cashback hebdomadaire 10 % sans conditions (Lucky8), cashback crypto 10 % permanent (MyStake), 100 € remboursé en argent réel ANJ (Betclic) : quatre formats radicalement différents, pour quatre profils distincts. Filtrez par montant, wager et méthodes pour trouver le vôtre.'
          : 'Not all bonuses are equal. 100 free spins no wager (Casinozer), weekly 10% no-condition cashback (Lucky8), permanent 10% crypto cashback (MyStake), €100 refunded in real ANJ money (Betclic): four radically different formats for four distinct profiles. Filter by amount, wagering and methods to find yours.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={sorted}
      configKey="meilleur_bonus"
      afterListing={afterListing}
      editorialH2={
        isFr
          ? 'Le guide du meilleur bonus casino en 2026'
          : 'The guide to the best casino bonus in 2026'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-10 text-[15.5px] leading-[1.7] text-ink-2">
            {/* §1 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Les 4 types de bonus casino en 2026
              </h3>
              <p className="mb-3">
                Le <strong className="text-ink">bonus de bienvenue deposit match</strong> est le
                format le plus courant : le casino abonde votre dépôt d&apos;un pourcentage.{' '}
                <a
                  href="/casinos/cresus/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_cresus"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Crésus
                </a>{' '}
                propose 200 €,{' '}
                <a
                  href="/casinos/wild-sultan/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_wild_sultan"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Wild Sultan
                </a>{' '}
                500 € + 20 tours,{' '}
                <a
                  href="/casinos/magical-spin/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_magical_spin"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Magical Spin
                </a>{' '}
                jusqu&apos;à 1 000 € cumulés sur les 4 premiers dépôts. Le wager (conditions de
                mise) détermine la valeur réelle.
              </p>
              <p className="mb-3">
                Les <strong className="text-ink">Free Spins sans wager</strong> sont rares et
                précieux.{' '}
                <a
                  href="/casinos/casinozer/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_casinozer"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Casinozer
                </a>{' '}
                propose 100 tours gratuits sans aucune condition de mise : les gains sont retirables
                immédiatement (plafond 250 € après KYC). Seule offre sans wager de notre comparatif.
              </p>
              <p className="mb-3">
                Le <strong className="text-ink">cashback récurrent</strong> réduit l&apos;avantage
                de la maison sur le long terme.{' '}
                <a
                  href="/casinos/lucky8/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_lucky8"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Lucky8
                </a>{' '}
                verse 10 % de vos pertes nettes chaque lundi en argent réel (niveau 1, minimum 20 €
                de pertes).{' '}
                <a
                  href="/casinos/mystake/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_mystake"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  MyStake
                </a>{' '}
                propose un cashback crypto de 10 % sans wager permanent sur chaque dépôt crypto.
              </p>
              <p>
                Les <strong className="text-ink">bonus argent réel ANJ</strong> sont encadrés
                strictement.{' '}
                <a
                  href="/casinos/betclic/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s1_betclic"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  Betclic
                </a>{' '}
                rembourse 100 € sur votre premier pari perdant en argent réel (mars 2026) — pas en
                freebets. PMU propose 100 € sport retirables dès 1 € de gains.
              </p>
            </div>

            {/* §2 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Pourquoi le wager est le critère n°1
              </h3>
              <p className="mb-3">
                Le wager indique combien de fois vous devez jouer le montant du bonus avant tout
                retrait. Exemple : wager 35× sur 100 € = 3 500 € à miser. Avec un RTP de 96 % sur
                les slots, le coût statistique est d&apos;environ 140 €. Un wager de 40× monte à 160
                € de coût pour le même bonus.
              </p>
              <p className="mb-3">
                Dans notre comparatif, Wild Sultan, Tortuga et Casino Extra proposent tous un wager
                de 30× — parmi les plus bas (médian du comparatif : 35×, maximum : 50× pour Bitcoin
                Penguin). Avec 30× sur 100 €, le coût statistique descend à 120 €. Casinozer dépasse
                l&apos;ensemble avec 0× : les gains des 100 FS sont directement retirables, sans
                aucune condition.
              </p>
              <p>
                À l&apos;opposé, Madnix (40×) et Bitcoin Penguin (50×) sont parmi les moins
                avantageux sur ce critère. Un bonus de 300 € à 40× représente 12 000 € à jouer avant
                tout retrait — statistiquement difficile à solder dans la durée de validité standard
                (7 à 30 jours selon opérateurs).
              </p>
            </div>

            {/* §3 */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Bonus ANJ vs offshore : que choisir ?
              </h3>
              <p className="mb-3">
                Les casinos sous licence{' '}
                <strong className="text-ink">ANJ (Autorité Nationale des Jeux)</strong> opèrent dans
                un cadre strict : conditions transparentes, protection des joueurs garantie, gains
                honorés sans contestation possible. Leurs bonus sont plus sobres mais fiables :
                Betclic rembourse 100 € en argent réel (pas en freebets, mars 2026) et PMU offre 100
                € sport retirables dès 1 €.
              </p>
              <p className="mb-3">
                Les <strong className="text-ink">opérateurs offshore</strong> proposent des montants
                plus élevés et des formats créatifs : 100 FS sans wager (Casinozer), cashback 10 %
                hebdomadaire en argent réel (Lucky8), cashback crypto 10 % permanent (MyStake). Ils
                sont directement accessibles depuis la France, mais opèrent hors du cadre
                réglementaire français.
              </p>
              <p>
                Verdict par profil : si la régularité légale prime, consultez notre guide{' '}
                <a
                  href="/casinos/francais/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s3_francais"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  casinos français agréés ANJ
                </a>
                . Pour les formats bonus distinctifs (sans wager, cashback), notre sélection
                offshore offre plus de souplesse — avec les contraintes propres à ce cadre.
                Retrouvez aussi les bonus crypto sur notre{' '}
                <a
                  href="/comparatifs/crypto/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s3_crypto"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  comparatif casinos crypto
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
                    label: '100 FS sans wager (gains retirables immédiatement)',
                    text: 'Casinozer — seul opérateur du comparatif sans aucune condition de mise. Plafond de 250 €.',
                    href: '/casinos/casinozer/',
                    placement: 'bonus_editorial_s4_casinozer',
                  },
                  {
                    label: 'Cashback récurrent en argent réel',
                    text: 'Lucky8 — 10 % de vos pertes nettes chaque lundi, sans wager. Min. 20 € de pertes pour déclencher.',
                    href: '/casinos/lucky8/',
                    placement: 'bonus_editorial_s4_lucky8',
                  },
                  {
                    label: 'Cashback crypto permanent',
                    text: 'MyStake — 10 % sur chaque dépôt crypto sans wager. Dès le premier dépôt, sans condition de niveau VIP.',
                    href: '/casinos/mystake/',
                    placement: 'bonus_editorial_s4_mystake',
                  },
                  {
                    label: 'Bonus ANJ en argent réel',
                    text: 'Betclic — 100 € remboursés sur votre premier pari perdant en argent réel (pas en freebets). Cadre ANJ garanti.',
                    href: '/casinos/betclic/',
                    placement: 'bonus_editorial_s4_betclic',
                  },
                  {
                    label: 'Montant brut maximal',
                    text: "Magical Spin — jusqu'à 1 000 € cumulés sur les 4 premiers dépôts (wager 35×). Pour joueurs capables de solder le wager par palier.",
                    href: '/casinos/magical-spin/',
                    placement: 'bonus_editorial_s4_magical_spin',
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
                        data-page-type="meilleur_bonus"
                        data-locale={locale}
                      >
                        {item.text.split(' — ')[0]}
                      </a>{' '}
                      — {item.text.split(' — ').slice(1).join(' — ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-10 text-[15.5px] leading-[1.7] text-ink-2">
            {/* §1 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                The 4 types of casino bonuses in 2026
              </h3>
              <p className="mb-3">
                The <strong className="text-ink">deposit match welcome bonus</strong> is the most
                common format: the casino tops up your deposit by a percentage. Crésus offers €200,
                Wild Sultan €500 + 20 spins, Magical Spin up to €1,000 cumulated over the first 4
                deposits. The wagering requirement determines the real value.
              </p>
              <p className="mb-3">
                <strong className="text-ink">No-wager free spins</strong> are rare and precious.
                Casinozer offers 100 free spins with no wagering requirement: winnings are
                withdrawable immediately (€250 cap after KYC). The only no-wager offer in our
                comparison.
              </p>
              <p className="mb-3">
                <strong className="text-ink">Recurring cashback</strong> permanently reduces the
                house edge. Lucky8 returns 10% of your net weekly losses every Monday in real money
                (tier 1, minimum €20 in losses). MyStake offers a permanent 10% crypto no-wager
                cashback on every crypto deposit.
              </p>
              <p>
                <strong className="text-ink">ANJ real-money bonuses</strong> are strictly regulated.
                Betclic refunds €100 on your first losing bet in real money (March 2026) — not as
                free bets. PMU offers €100 sport withdrawable from €1 in winnings.
              </p>
            </div>

            {/* §2 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                Why wagering is the #1 criterion
              </h3>
              <p className="mb-3">
                The wagering requirement tells you how many times you must play the bonus before
                withdrawing. Example: 35× wager on €100 = €3,500 to play. With 96% average RTP on
                slots, the statistical cost is around €140. A 40× wager rises to €160 for the same
                bonus.
              </p>
              <p className="mb-3">
                In our comparison, Wild Sultan, Tortuga and Casino Extra all offer a 30× wager —
                among the lowest (comparison median: 35×, maximum: 50× for Bitcoin Penguin). With
                30× on €100, the statistical cost drops to €120. Casinozer goes further with 0×: the
                100 free spin winnings are directly withdrawable, with no conditions at all.
              </p>
              <p>
                At the other extreme, Madnix (40×) and Bitcoin Penguin (50×) are the least
                advantageous on this criterion. A €300 bonus at 40× means €12,000 to play before any
                withdrawal — statistically difficult to clear within the standard validity period (7
                to 30 days depending on operator).
              </p>
            </div>

            {/* §3 EN */}
            <div>
              <h3 className="mb-3 font-serif text-[20px] font-semibold text-ink">
                ANJ vs offshore bonuses: which to choose?
              </h3>
              <p className="mb-3">
                Casinos under{' '}
                <strong className="text-ink">ANJ (French National Gaming Authority)</strong> licence
                operate under strict rules: transparent conditions, guaranteed player protection,
                winnings honoured without contestation. Their bonuses are more modest but reliable:
                Betclic refunds €100 in real money (not free bets, March 2026) and PMU offers €100
                sport withdrawable from €1.
              </p>
              <p className="mb-3">
                <strong className="text-ink">Offshore operators</strong> offer higher amounts and
                creative formats: 100 no-wager free spins (Casinozer), 10% weekly real-money
                cashback (Lucky8), permanent 10% crypto cashback (MyStake). They are directly
                accessible from France but operate outside the French regulatory framework.
              </p>
              <p>
                Verdict by profile: if legal security comes first, check our{' '}
                <a
                  href="/casinos/francais/"
                  className={linkStyle}
                  style={linkBorder}
                  data-event="internal_link"
                  data-placement="bonus_editorial_s3_francais"
                  data-page-type="meilleur_bonus"
                  data-locale={locale}
                >
                  French-licensed ANJ casinos guide
                </a>
                . For distinctive bonus formats (no wager, cashback), our offshore selection offers
                more flexibility — with the constraints of that framework.
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
                    label: '100 no-wager free spins (winnings withdrawable immediately)',
                    text: 'Casinozer — the only operator in the comparison with no wagering conditions at all. €250 cap.',
                    href: '/casinos/casinozer/',
                  },
                  {
                    label: 'Regular cashback in real money',
                    text: 'Lucky8 — 10% of your net weekly losses every Monday, no wager. Min. €20 in losses to trigger.',
                    href: '/casinos/lucky8/',
                  },
                  {
                    label: 'Permanent crypto cashback',
                    text: 'MyStake — 10% on every crypto deposit, no wager. From the first deposit, no VIP level required.',
                    href: '/casinos/mystake/',
                  },
                  {
                    label: 'ANJ bonus in real money',
                    text: 'Betclic — €100 refunded on your first losing bet in real money (not free bets). French ANJ framework guaranteed.',
                    href: '/casinos/betclic/',
                  },
                  {
                    label: 'Maximum gross amount',
                    text: 'Magical Spin — up to €1,000 cumulated over the first 4 deposits (35× wager). For players able to clear the wager at each tier.',
                    href: '/casinos/magical-spin/',
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
                        data-placement="bonus_editorial_s4"
                        data-page-type="meilleur_bonus"
                        data-locale={locale}
                      >
                        {item.text.split(' — ')[0]}
                      </a>{' '}
                      — {item.text.split(' — ').slice(1).join(' — ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      }
      faqH2={
        isFr
          ? 'Questions fréquentes sur les bonus casino'
          : 'Frequently asked questions about casino bonuses'
      }
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
