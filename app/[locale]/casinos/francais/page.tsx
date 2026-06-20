import type { Metadata } from 'next'
export const revalidate = 3600

import { HubShell } from '@/components/hub/hub-shell'
import { operatorsWithFrenchSupport } from '@/config/operators'
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
      ? 'Meilleur Casino en Français 2026 — Interface et Support FR Validés'
      : 'Best French-Language Casino 2026 — FR Interface and Support Verified',
    description: isFr
      ? 'Casinos en ligne avec interface entièrement en français et support client francophone en 2026. Traduits par des humains, pas par des algorithmes. 18+'
      : 'Online casinos with fully French interface and French-speaking customer support in 2026. Human-translated, not machine-translated. 18+',
    alternates: { languages: buildHreflang('/casinos/francais/') },
  }
}

const FAQ_FR = [
  {
    question:
      "Comment distinguer un casino vraiment en français d'une traduction automatique partielle ?",
    answer:
      "Trois vérifications simples : (1) Consultez les CGU (conditions générales d'utilisation) — si elles sont en anglais ou en français approximatif, le casino n'est pas vraiment francophone. (2) Testez le support en français : envoyez un message en français et vérifiez que la réponse est rédigée par un humain (pas traduite automatiquement). (3) Regardez les promotions : un casino francophone adapte ses offres au calendrier français (Noël, été, Roland-Garros) et rédige ses promotions en français natif.",
  },
  {
    question: 'Le support en français est-il disponible 24h/24 dans ces casinos ?',
    answer:
      "Cela dépend du casino. Vegadream et Cresus proposent un support francophone 24h/24 en live chat. Magical Spin offre un gestionnaire VIP dédié francophone (mais pas forcément 24h/24 pour tous les joueurs). Madnix et Casinozer ont un support en français, mais moins réactif en dehors des heures de bureau européennes. Vérifiez toujours les horaires du support sur la page d'aide avant de vous inscrire.",
  },
  {
    question: 'Les casinos francophones proposent-ils des paiements locaux (PayPal, CB) ?',
    answer:
      "La plupart, oui. Cresus, Magical Spin, Casinozer et Casino Extra acceptent les cartes bancaires françaises (Visa/Mastercard) et Paysafecard. PayPal reste rare dans les casinos offshore (y compris francophones) car PayPal refuse d'être associé aux jeux d'argent en ligne. Pour les paiements locaux FR, privilégiez les casinos qui acceptent CB + Paysafecard + Skrill — ces trois méthodes couvrent les préférences de la majorité des joueurs français.",
  },
  {
    question: 'Y a-t-il des casinos sous licence ANJ (française) dans cette sélection ?',
    answer:
      'Non. Les casinos sous licence ANJ (Winamax, Betclic, PMU) ne proposent que les jeux autorisés par la réglementation française : poker, paris sportifs et hippiques — pas les machines à sous ni le casino live au sens large. La totalité des casinos de notre comparatif sont sous licence offshore (Curaçao) ou européenne (MGA Malte), ce qui leur permet de proposer un catalogue complet tout en opérant légalement.',
  },
  {
    question: 'Les promotions sont-elles adaptées au marché français ?',
    answer:
      'Oui pour les casinos francophones : leurs offres de bienvenue sont exprimées en euros, leurs conditions de mise en français, et leurs promotions saisonnières tiennent compte du calendrier français. Vegadream va le plus loin dans cette direction avec des promotions hebdomadaires spécifiquement conçues pour les joueurs français. Les casinos anglophones proposent parfois des promotions en euros mais avec des conditions rédigées en anglais — source de malentendus fréquents sur les règles du wager.',
  },
]

const FAQ_EN = [
  {
    question: 'How do you tell a truly French casino from partial machine translation?',
    answer:
      'Three simple checks: (1) Read the T&Cs — if they are in English or approximate French, the casino is not genuinely French-language. (2) Test support in French: send a message in French and check that the reply is written by a human (not machine-translated). (3) Look at promotions: a genuinely French-language casino adapts its offers to the French calendar and writes promotions in native French.',
  },
  {
    question: 'Is French support available 24/7 at these casinos?',
    answer:
      'It depends on the casino. Vegadream and Cresus offer French-speaking support 24/7 via live chat. Magical Spin offers a dedicated French-speaking VIP manager (but not necessarily 24/7 for all players). Madnix and Casinozer have French support but are less responsive outside European office hours. Always check support hours on the help page before registering.',
  },
  {
    question: 'Do French-language casinos offer local payments (PayPal, card)?',
    answer:
      "Most do. Cresus, Magical Spin, Casinozer and Casino Extra accept French bank cards (Visa/Mastercard) and Paysafecard. PayPal remains rare at offshore casinos (including French-language ones) as PayPal refuses to be associated with online gambling. For French local payments, favour casinos accepting card + Paysafecard + Skrill — these three methods cover most French players' preferences.",
  },
  {
    question: 'Are there ANJ-licensed (French) casinos in this selection?',
    answer:
      'No. ANJ-licensed casinos (Winamax, Betclic, PMU) only offer games authorised under French regulations: poker, sports betting and horse racing — not slot machines or live casino broadly. All casinos in our comparison hold offshore licences (Curaçao) or European licences (MGA Malta), allowing them to offer a full catalogue while operating legally.',
  },
  {
    question: 'Are promotions adapted to the French market?',
    answer:
      'Yes for French-language casinos: their welcome offers are expressed in euros, wagering conditions in French, and seasonal promotions follow the French calendar. Vegadream goes furthest with weekly promotions specifically designed for French players. English-language casinos sometimes offer promotions in euros but with conditions written in English — a frequent source of misunderstandings about wagering rules.',
  },
]

export default async function CasinosFrancaisPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const byRating = [...operatorsWithFrenchSupport].sort((a, b) => b.rating - a.rating)

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr
      ? 'Top 7 casinos en français France 2026'
      : 'Top 7 French-language casinos France 2026',
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
      pageType="casino_francais"
      locale={locale}
      breadcrumbItems={[
        { label: isFr ? 'Accueil' : 'Home', href: '/' },
        { label: isFr ? 'Casinos en ligne' : 'Online Casinos', href: '/casinos/' },
        { label: isFr ? 'Casinos en Français' : 'French-Language Casinos' },
      ]}
      eyebrow={
        isFr
          ? 'Interface FR · Support 7j/7 · Paiements locaux · 2026'
          : 'FR interface · 7/7 support · Local payments · 2026'
      }
      heading={
        isFr ? (
          <>
            Top 7 casinos en français —{' '}
            <em className="not-italic text-green">interface et support FR validés</em>
          </>
        ) : (
          <>
            Top 7 French-language casinos —{' '}
            <em className="not-italic text-green">FR interface and support verified</em>
          </>
        )
      }
      intro={
        isFr
          ? 'Interface traduite par des humains, support client disponible en français et promotions rédigées en français natif — trois critères vérifiés pour chaque casino de cette liste. Les 7 casinos ici testés répondent à ces trois exigences.'
          : 'Human-translated interface, customer support available in French, and promotions written in native French — three criteria verified for each casino on this list. All 7 casinos here have been tested and meet these three requirements.'
      }
      schemaItemList={schemaItemList}
      schemaFAQ={schemaFAQ}
      operators={byRating}
      configKey="francais"
      editorialH2={
        isFr
          ? 'Pourquoi jouer dans un casino vraiment francophone ?'
          : 'Why play at a truly French-language casino?'
      }
      editorialContent={
        isFr ? (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Jouer dans un casino entièrement en français n&apos;est pas qu&apos;une question de
              confort. C&apos;est une question de{' '}
              <strong className="text-ink">compréhension des conditions</strong>. Les règles de
              bonus, les conditions de wager et les politiques de retrait sont souvent rédigées avec
              des nuances juridiques subtiles. Une mauvaise compréhension d&apos;une clause peut
              bloquer des centaines d&apos;euros de gains.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Traduction humaine vs traduction automatique
            </h3>
            <p>
              La majorité des casinos en ligne anglophones proposent une version française de leur
              site, mais celle-ci est souvent générée automatiquement. Le résultat : des CGU
              approximatives, un support qui répond en anglais à vos messages en français, et des
              promotions mal adaptées au contexte culturel français. Un casino{' '}
              <strong className="text-ink">vraiment francophone</strong> emploie des rédacteurs et
              des agents de support natifs ou bilingues.
            </p>
            <p>
              Notre critère de sélection est exigeant : nous testons le live chat en français, nous
              lisons les CGU dans leur version française, et nous vérifions que les promotions sont
              adaptées au marché FR (et non simplement traduites de l&apos;anglais). Vegadream est
              l&apos;exemple le plus abouti de cette approche — son interface, son support et ses
              promotions sont conçus nativement pour les joueurs français.
            </p>
            <p>
              Le support francophone a aussi une valeur pratique en cas de litige : pouvoir décrire
              un problème dans votre langue et obtenir une réponse claire réduit considérablement
              les délais de résolution. Sur un litige de retrait, chaque heure compte.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
            <p>
              Playing at a fully French-language casino is not just about comfort. It is a question
              of <strong className="text-ink">understanding the terms</strong>. Bonus rules,
              wagering conditions, and withdrawal policies are often written with subtle legal
              nuances. Misunderstanding a clause can block hundreds of euros in winnings.
            </p>
            <h3 className="font-serif text-[17px] font-medium text-ink">
              Human translation vs machine translation
            </h3>
            <p>
              Most English-language online casinos offer a French version of their site, but it is
              often machine-generated. The result: approximate T&Cs, support that responds in
              English to your French messages, and promotions poorly adapted to the French cultural
              context. A <strong className="text-ink">truly French-language casino</strong> employs
              native or bilingual writers and support agents.
            </p>
            <p>
              Our selection criterion is demanding: we test live chat in French, read the T&Cs in
              their French version, and verify that promotions are adapted to the French market (not
              simply translated from English). Vegadream is the most accomplished example of this
              approach — its interface, support and promotions are natively designed for French
              players.
            </p>
            <p>
              French-speaking support also has practical value in case of dispute: being able to
              describe a problem in your language and receive a clear reply significantly reduces
              resolution times. On a withdrawal dispute, every hour counts.
            </p>
          </div>
        )
      }
      faqH2={isFr ? 'Questions fréquentes — Casinos en français' : 'FAQ — French-language casinos'}
      faqItems={isFr ? FAQ_FR : FAQ_EN}
    />
  )
}
