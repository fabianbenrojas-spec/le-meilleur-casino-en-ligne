import type { Metadata } from 'next'
export const revalidate = 3600

import { HubShell } from '@/components/hub/hub-shell'
import { operatorsByJurisdiction } from '@/config/operators'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

const ANJ_ORDER = ['winamax', 'betclic', 'unibet', 'pokerstars', 'pmu']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isFr = locale === 'fr'
  return {
    title: isFr
      ? 'Meilleur Casino Français Légal 2026 — 5 Sites Agréés ANJ'
      : 'Best Legal French Casino 2026 — 5 ANJ-Licensed Sites',
    description: isFr
      ? "Les 5 casinos français agréés par l'Autorité Nationale des Jeux (ANJ) : Winamax, Betclic, Unibet, PMU et PokerStars. Profils et critères pour choisir selon votre style de jeu. 18+"
      : 'The 5 French casinos licensed by the Autorité Nationale des Jeux (ANJ): Winamax, Betclic, Unibet, PMU and PokerStars. Profiles and criteria to choose by your playing style. 18+',
    alternates: { languages: buildHreflang('/casinos/francais/') },
  }
}

const FAQ_FR = [
  {
    question: 'Quel casino ANJ choisir selon mon profil de joueur ?',
    answer:
      'Tout dépend de votre verticale principale. Pour le poker : Winamax (référence FR depuis 2010, cotes les plus compétitives ANJ) ou PokerStars (liquidité ESPT France-Espagne-Portugal, WCOOP/SCOOP). Pour le sport au quotidien : Betclic (SEPA Instant en moins de 15 minutes sourcé MediaPronos mai 2026, app 4,7/5 iOS) ou Unibet (3 verticales sport-poker-turf depuis un compte unique, Skrill disponible en retrait). Pour le hippique : PMU est le seul opérateur ANJ avec les formats Quinté+, Jackpot, Champ Libre, Super 4 et Pick 5.',
  },
  {
    question: 'Les casinos ANJ proposent-ils des slots et du casino live ?',
    answer:
      "Non. La réglementation ANJ n'autorise pas les jeux de casino en ligne : machines à sous, roulette, blackjack, baccarat et casino live sont tous interdits sous licence française. Les 5 opérateurs de cette page couvrent exclusivement le poker en ligne, les paris sportifs et les paris hippiques. Si vous cherchez des slots ou du casino live, les opérateurs offshore (Curaçao, Anjouan, MGA Malte) proposent ces jeux et sont accessibles directement depuis la France.",
  },
  {
    question: 'Quel est le délai de retrait sur les casinos ANJ français ?',
    answer:
      'Betclic se distingue avec le SEPA Instant testé en moins de 15 minutes (sourcé MediaPronos, mai 2026) — le plus rapide du marché ANJ. Les autres opérateurs traitent généralement les retraits en 24 à 48 heures selon la méthode : carte bancaire, virement SEPA classique ou Skrill (disponible chez Unibet, rare en ANJ). Le KYC strict est obligatoire sur tous les opérateurs ANJ avant le premier retrait.',
  },
  {
    question: 'Les bonus ANJ sont-ils intéressants par rapport aux casinos offshore ?',
    answer:
      "Les bonus ANJ sont plus modestes que les offres offshore (qui peuvent dépasser 1 000€ avec wager) mais strictement encadrés : conditions de mise transparentes, pas de clauses abusives. Betclic propose un remboursement de 100€ sur le premier pari perdant (mars 2026). En contrepartie, tous les bonus ANJ sont garantis honorés dans le cadre légal français — ce qui n'est pas toujours le cas avec certains opérateurs offshore.",
  },
  {
    question: "Comment vérifier qu'un casino est bien agréé ANJ ?",
    answer:
      "L'Autorité Nationale des Jeux publie la liste exhaustive de tous les opérateurs agréés sur son site officiel anj.fr. Les 5 opérateurs de cette page (Winamax, Betclic, Unibet, PMU, PokerStars) y figurent. Si un site se réclame 'casino français' sans figurer sur cette liste, il opère en dehors du cadre légal français.",
  },
]

const FAQ_EN = [
  {
    question: 'Which ANJ casino should I choose based on my player profile?',
    answer:
      'It depends on your main vertical. For poker: Winamax (French reference since 2010, most competitive ANJ sports odds) or PokerStars (ESPT France-Spain-Portugal liquidity, WCOOP/SCOOP). For daily sports: Betclic (SEPA Instant under 15 minutes, source MediaPronos May 2026, 4.7/5 iOS app) or Unibet (3 verticals sports-poker-racing from a single account, Skrill withdrawals). For horse racing: PMU is the only ANJ operator with Quinté+, Jackpot, Champ Libre, Super 4 and Pick 5 formats.',
  },
  {
    question: 'Do ANJ casinos offer slots and live casino?',
    answer:
      'No. ANJ regulations do not permit online casino games: slot machines, roulette, blackjack, baccarat and live casino are all prohibited under the French licence. The 5 operators on this page cover exclusively online poker, sports betting and horse racing. If you are looking for slots or live casino, offshore operators (Curaçao, Anjouan, MGA Malta) offer these games and are directly accessible from France.',
  },
  {
    question: 'What is the withdrawal timeframe at French ANJ casinos?',
    answer:
      'Betclic stands out with SEPA Instant withdrawals tested in under 15 minutes (source: MediaPronos, May 2026) — the fastest in the ANJ market. Other operators generally process withdrawals in 24 to 48 hours depending on the method: bank card, standard SEPA transfer or Skrill (available at Unibet, rare in ANJ). Strict KYC is mandatory at all ANJ operators before the first withdrawal.',
  },
  {
    question: 'Are ANJ bonuses competitive versus offshore casinos?',
    answer:
      'ANJ bonuses are more modest than offshore offers (which can exceed €1,000 with wagering requirements) but are strictly regulated: transparent wagering conditions, no abusive clauses. Betclic offers a €100 refund on the first losing bet (March 2026). In return, all ANJ bonuses are guaranteed to be honoured within the French legal framework — which is not always the case with some offshore operators.',
  },
  {
    question: 'How do you verify a casino is truly ANJ-licensed?',
    answer:
      "The Autorité Nationale des Jeux publishes a comprehensive list of all licensed operators on its official website anj.fr. The 5 operators on this page (Winamax, Betclic, Unibet, PMU, PokerStars) are all listed there. If a site claims to be a 'French casino' without appearing on the ANJ list, it operates outside the French legal framework.",
  },
]

export default async function CasinosFrancaisPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const anjOps = [...operatorsByJurisdiction['anj']].sort(
    (a, b) => ANJ_ORDER.indexOf(a.slug) - ANJ_ORDER.indexOf(b.slug)
  )

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? '5 casinos agréés ANJ France 2026' : '5 ANJ-licensed French casinos 2026',
    itemListElement: anjOps.map((op, i) => ({
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
      pageType="casino_francais"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casinos Français ANJ' : 'French ANJ Casinos' },
      ]}
      eyebrow={
        isFr
          ? 'ANJ · Licence française · Poker · Sport · Hippique · 2026'
          : 'ANJ · French licence · Poker · Sports · Horse Racing · 2026'
      }
      heading={
        isFr ? (
          <>
            Meilleur casino français 2026 —{' '}
            <em className="not-italic text-green">les 5 sites agréés ANJ</em>
          </>
        ) : (
          <>
            Best French casino 2026 —{' '}
            <em className="not-italic text-green">the 5 ANJ-licensed sites</em>
          </>
        )
      }
      intro={
        isFr
          ? "Winamax, Betclic, Unibet, PMU et PokerStars sont les cinq opérateurs agréés par l'Autorité Nationale des Jeux : les seuls sites de jeu d'argent légaux en France. Chacun couvre un profil distinct — poker historique, sport, hippique ou poker international — dans un cadre qui protège les joueurs français."
          : 'Winamax, Betclic, Unibet, PMU and PokerStars are the five operators licensed by the Autorité Nationale des Jeux: the only legal online gambling sites in France. Each covers a distinct profile — historical poker, sports, horse racing or international poker — within a framework that protects French players.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={anjOps}
      configKey="francais"
      editorialH2={
        isFr
          ? 'Pourquoi choisir un casino agréé ANJ en 2026 ?'
          : 'Why choose an ANJ-licensed casino in 2026?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              En France, le jeu d&apos;argent en ligne est encadré par l&apos;
              <strong className="text-ink">Autorité Nationale des Jeux (ANJ)</strong> — anciennement
              ARJEL. Créée en 2010, elle délivre des licences exclusivement pour trois verticales :
              le poker en ligne, les paris sportifs et les paris hippiques. Les opérateurs agréés
              sont soumis à des obligations strictes : séparation des fonds joueurs des fonds
              propres, plafonds de mise personnalisables, outils d&apos;exclusion volontaire et
              messages de prévention obligatoires. À noter :{' '}
              <strong className="text-ink">
                les jeux de casino en ligne — machines à sous, roulette, blackjack, casino live — ne
                sont pas autorisés sous licence ANJ
              </strong>
              . Un opérateur qui propose ces jeux à des joueurs français opère hors du cadre légal
              français.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Les cinq opérateurs ANJ — profils distincts en 2026
            </h3>
            <p>
              <strong className="text-ink">Winamax</strong> est la référence française du poker
              depuis 2010. Ses cotes sportives sont parmi les plus compétitives du marché ANJ
              (sourcé BasketUSA, juin 2026), et son application unifiée couvre poker, sport et
              hippique depuis un compte unique.
            </p>
            <p>
              <strong className="text-ink">Betclic</strong> se distingue par son excellence
              opérationnelle : retraits SEPA Instant testés en moins de 15 minutes (sourcé
              MediaPronos, mai 2026), application notée 4,7/5 après une refonte complète en juin
              2026, et live chat disponible 7 jours sur 7.
            </p>
            <p>
              <strong className="text-ink">Unibet</strong>, adossé à FDJ United depuis octobre 2024
              (co-actionnariat État français), a intégré Parions Sport en Ligne (mars 2026) et
              Zeturf (juillet 2025). Triple agrément ANJ — sport, poker et hippique — depuis un
              compte unique. Seul opérateur ANJ à accepter Skrill en retrait.
            </p>
            <p>
              <strong className="text-ink">PokerStars</strong> opère en liquidité partagée ESPT
              (France, Espagne, Portugal), garantissant des tables actives 24h/24. Le programme
              Stars Rewards redistribue jusqu&apos;à 40 % de cashback sur le rake.
            </p>
            <p>
              <strong className="text-ink">PMU</strong> est le spécialiste incontesté du hippique —
              seul opérateur ANJ avec les formats Quinté+, Jackpot, Champ Libre, Super 4 et Pick 5.
              Seuil de retrait à 1 €, service Sourdline pour malentendants.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Ce que les ANJ ne proposent pas — l&apos;alternative offshore
            </h3>
            <p>
              Le cadre ANJ interdit les machines à sous, la roulette, le blackjack et le casino
              live. Si vous cherchez ces jeux, les opérateurs offshore sous licence étrangère
              (Curaçao, Anjouan, MGA Malte) proposent un catalogue complet, accessibles directement
              depuis la France. Consultez notre{' '}
              <a
                href="/comparatifs/crypto/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_anj_alt_crypto"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                comparatif casino crypto
              </a>{' '}
              ou notre sélection de{' '}
              <a
                href="/alternatives/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_anj_alt_alternatives"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                casinos offshore alternatifs
              </a>
              .
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Comment choisir parmi les 5 ANJ ?
            </h3>
            <p>
              <strong className="text-ink">Pour le poker :</strong> Winamax (référence FR, app
              unifiée poker+sport+hippique) ou PokerStars (liquidité ESPT internationale,
              WCOOP/SCOOP). <strong className="text-ink">Pour le sport au quotidien :</strong>{' '}
              Betclic (SEPA Instant, app 4,7/5) ou Unibet (3 verticales, Skrill disponible).{' '}
              <strong className="text-ink">Pour le hippique :</strong> PMU est sans alternative
              sérieuse en ANJ (formats Quinté+ exclusifs). Vous hésitez entre les deux leaders du
              sport ANJ ?{' '}
              <a
                href="/versus/winamax-vs-betclic/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_versus_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                Notre comparatif Winamax vs Betclic
              </a>{' '}
              analyse bonus, cotes, retraits et support critère par critère.
            </p>
            <p>
              Retrouvez nos avis complets sur les cinq opérateurs agréés ANJ :{' '}
              <a
                href="/casinos/winamax/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                avis Winamax
              </a>
              {', '}
              <a
                href="/casinos/betclic/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                avis Betclic
              </a>
              {', '}
              <a
                href="/casinos/unibet/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                avis Unibet
              </a>
              {', '}
              <a
                href="/casinos/pokerstars/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                avis PokerStars
              </a>
              {', '}
              <a
                href="/casinos/pmu/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                avis PMU
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              In France, online gambling is regulated by the{' '}
              <strong className="text-ink">Autorité Nationale des Jeux (ANJ)</strong> — formerly
              ARJEL. Founded in 2010, it grants licences exclusively for three verticals: online
              poker, sports betting and horse racing. Licensed operators must comply with strict
              requirements: separate player funds, customisable wagering limits, voluntary
              self-exclusion tools, and mandatory prevention messages. Notably,{' '}
              <strong className="text-ink">
                online casino games — slot machines, roulette, blackjack, live casino — are not
                permitted under an ANJ licence
              </strong>
              . Any operator offering these games to French players operates outside the French
              legal framework.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              The five ANJ operators — distinct profiles in 2026
            </h3>
            <p>
              <strong className="text-ink">Winamax</strong> is France&apos;s poker reference since
              2010. Its sports odds are among the most competitive in the ANJ market (source:
              BasketUSA, June 2026), and its unified app covers poker, sports and horse racing from
              a single account.
            </p>
            <p>
              <strong className="text-ink">Betclic</strong> stands out operationally: SEPA Instant
              withdrawals tested in under 15 minutes (source: MediaPronos, May 2026), an app rated
              4.7/5 after a full redesign in June 2026, and live chat available 7 days a week.
            </p>
            <p>
              <strong className="text-ink">Unibet</strong>, backed by FDJ United since October 2024
              (with the French state as co-shareholder), integrated Parions Sport en Ligne (March
              2026) and Zeturf (July 2025). Triple ANJ licence — sports, poker and horse racing —
              from a single account. The only ANJ operator accepting Skrill withdrawals.
            </p>
            <p>
              <strong className="text-ink">PokerStars</strong> operates on the shared ESPT liquidity
              pool (France, Spain, Portugal), ensuring active tables around the clock. The Stars
              Rewards programme redistributes up to 40% cashback on rake.
            </p>
            <p>
              <strong className="text-ink">PMU</strong> is the undisputed horse racing specialist —
              the only ANJ operator with Quinté+, Jackpot, Champ Libre, Super 4 and Pick 5 formats.
              Withdrawal threshold of €1 and a Sourdline service for hearing-impaired players.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              What ANJ casinos don&apos;t offer — the offshore alternative
            </h3>
            <p>
              The ANJ framework prohibits slot machines, roulette, blackjack and live casino. If you
              are looking for these games, offshore operators licensed abroad (Curaçao, Anjouan, MGA
              Malta) offer a full catalogue, directly accessible from France. See our{' '}
              <a
                href="/comparatifs/crypto/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_anj_alt_crypto"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                crypto casino comparison
              </a>{' '}
              or our{' '}
              <a
                href="/alternatives/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_anj_alt_alternatives"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                offshore casino alternatives
              </a>
              .
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              How to choose among the 5 ANJ operators?
            </h3>
            <p>
              <strong className="text-ink">For poker:</strong> Winamax (French reference, unified
              poker+sports+racing app) or PokerStars (international ESPT liquidity, WCOOP/SCOOP).{' '}
              <strong className="text-ink">For daily sports betting:</strong> Betclic (SEPA Instant,
              4.7/5 app) or Unibet (3 verticals, Skrill available).{' '}
              <strong className="text-ink">For horse racing:</strong> PMU has no serious ANJ
              alternative (exclusive Quinté+ formats). Torn between the two ANJ sports leaders?{' '}
              <a
                href="/versus/winamax-vs-betclic/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_versus_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                Our Winamax vs Betclic comparison
              </a>{' '}
              analyses bonuses, odds, withdrawals and support criterion by criterion.
            </p>
            <p>
              Read our full reviews of all five ANJ-licensed operators:{' '}
              <a
                href="/casinos/winamax/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                Winamax review
              </a>
              {', '}
              <a
                href="/casinos/betclic/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                Betclic review
              </a>
              {', '}
              <a
                href="/casinos/unibet/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                Unibet review
              </a>
              {', '}
              <a
                href="/casinos/pokerstars/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                PokerStars review
              </a>
              {', '}
              <a
                href="/casinos/pmu/"
                className="font-semibold text-green underline decoration-[color-mix(in_srgb,var(--green)_40%,transparent)] underline-offset-2 hover:decoration-green"
                data-event="internal_link"
                data-placement="hub_editorial_review_link"
                data-page-type="casino_francais"
                data-locale={locale}
              >
                PMU review
              </a>
              .
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casinos agréés ANJ' : 'FAQ — ANJ-licensed casinos'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
