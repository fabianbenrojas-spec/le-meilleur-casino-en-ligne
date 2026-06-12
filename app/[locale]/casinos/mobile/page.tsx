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
      ? 'Meilleur Casino Mobile France 2026 — iPhone & Android'
      : 'Best Mobile Casino France 2026 — iPhone & Android',
    description: isFr
      ? 'Les meilleurs casinos mobiles en France 2026 : applications iOS & Android, interface tactile optimisée, jeux disponibles sur smartphone. Testés. 18+'
      : 'Best mobile casinos in France 2026: iOS & Android apps, optimised touch interface, games available on smartphone. Tested. 18+',
    alternates: { languages: buildHreflang('/casinos/mobile/') },
  }
}

const FAQ_FR = [
  {
    question: 'Faut-il télécharger une application pour jouer dans un casino mobile ?',
    answer:
      "Non, la plupart des casinos modernes fonctionnent directement via le navigateur mobile (Chrome, Safari) sans installation. Les Progressive Web Apps (PWA) offrent une expérience proche d'une application native. Certains opérateurs proposent des applications iOS (App Store) et Android (APK à télécharger directement — les casinos ne sont pas sur le Play Store). Le navigateur mobile est souvent aussi performant que l'application.",
  },
  {
    question: 'Les jeux sont-ils les mêmes sur mobile que sur ordinateur ?',
    answer:
      '90 à 95% des jeux disponibles sur desktop sont accessibles sur mobile. Les machines à sous HTML5 modernes sont conçues mobile-first. Quelques exceptions : certains jeux de table avec des interfaces complexes peuvent avoir une version simplifiée. Le casino live est pleinement disponible sur mobile avec une qualité vidéo excellente en 4G/5G ou WiFi.',
  },
  {
    question: "Un casino mobile est-il aussi sécurisé qu'un casino sur ordinateur ?",
    answer:
      "Oui, à condition d'accéder au casino via l'application officielle ou l'URL officielle. Le chiffrement TLS protège les communications indépendamment de l'appareil. Conseils : évitez les réseaux WiFi publics non sécurisés, activez le verrouillage écran, utilisez l'authentification à deux facteurs, vérifiez que l'URL commence par HTTPS.",
  },
  {
    question: 'Peut-on utiliser Apple Pay ou Google Pay pour déposer dans un casino mobile ?',
    answer:
      "Apple Pay et Google Pay sont acceptés par un nombre croissant de casinos, notamment LeoVegas, 888 Casino et Betsson. Ces méthodes offrent une commodité maximale sur mobile car vous n'avez pas besoin de saisir vos données de carte. Les dépôts sont immédiats et les retraits prennent généralement 1 à 3 jours.",
  },
  {
    question: 'Comment créer un compte casino directement sur mobile ?',
    answer:
      "L'inscription mobile est identique à l'inscription desktop : rendez-vous sur le site du casino via votre navigateur, cliquez sur 'S'inscrire', renseignez vos informations (email, nom, date de naissance, adresse), choisissez un mot de passe et acceptez les CGU. La vérification email est généralement requise avant le premier dépôt.",
  },
  {
    question: 'Y a-t-il des bonus exclusifs pour les joueurs mobiles ?',
    answer:
      "Certains opérateurs proposent des bonus spécifiques pour les joueurs mobiles, notamment des tours gratuits sur des jeux mobiles-first. LeoVegas est connu pour ses promotions mobiles. Ces offres évoluent fréquemment — vérifiez la section 'Promotions' de l'opérateur pour les offres mobiles actuelles.",
  },
]

const FAQ_EN = [
  {
    question: 'Do you need to download an app to play at a mobile casino?',
    answer:
      'No, most modern casinos work directly via mobile browser (Chrome, Safari) without any installation. Progressive Web Apps (PWAs) offer an experience close to a native app. Some operators provide iOS (App Store) and Android (APK download — casinos are not on the Play Store) apps. The mobile browser is often just as good as the app.',
  },
  {
    question: 'Are the games the same on mobile as on desktop?',
    answer:
      '90 to 95% of desktop games are accessible on mobile. Modern HTML5 slot machines are designed mobile-first. A few exceptions: some table games with complex interfaces may have a simplified version. Live casino is fully available on mobile with excellent video quality on 4G/5G or WiFi.',
  },
  {
    question: 'Is a mobile casino as secure as a desktop casino?',
    answer:
      'Yes, provided you access the casino via the official app or official URL. TLS encryption protects communications regardless of device. Tips: avoid unsecured public WiFi networks, enable screen lock, use two-factor authentication, verify the URL starts with HTTPS.',
  },
  {
    question: 'Can you use Apple Pay or Google Pay to deposit at a mobile casino?',
    answer:
      'Apple Pay and Google Pay are accepted by a growing number of casinos, including LeoVegas, 888 Casino and Betsson. These methods offer maximum convenience on mobile as you do not need to enter card details. Deposits are instant and withdrawals generally take 1 to 3 days.',
  },
  {
    question: 'How do you create a casino account directly on mobile?',
    answer:
      "Mobile registration is identical to desktop: go to the casino website via your browser, click 'Register', enter your details (email, name, date of birth, address), choose a password and accept the T&Cs. Email verification is generally required before the first deposit.",
  },
  {
    question: 'Are there exclusive bonuses for mobile players?',
    answer:
      'Some operators offer bonuses specific to mobile players, notably free spins on mobile-first games. LeoVegas is known for its mobile promotions. These offers change frequently — check the Promotions section of the operator for current mobile offers.',
  },
]

export default async function CasinosMobilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  const mobileCasinos = [...operators].sort((a, b) => {
    const aMobile = a.features.some((f) => /mobile|app|pwa|ios|android/i.test(f)) ? 2 : 0
    const bMobile = b.features.some((f) => /mobile|app|pwa|ios|android/i.test(f)) ? 2 : 0
    return bMobile - aMobile || b.rating - a.rating
  })

  const BASE_URL =
    process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://www.le-meilleur-casino-en-ligne.fr'
  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isFr ? 'Meilleurs casinos mobile France 2026' : 'Best Mobile Casinos France 2026',
    itemListElement: mobileCasinos.slice(0, 10).map((op, i) => ({
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
          { label: isFr ? 'Casino Mobile' : 'Mobile Casino' },
        ]}
        locale={locale}
      />

      <section className="pb-2 pt-10" data-page-type="casino_mobile" data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr
              ? 'iOS · Android · PWA · Testé sur mobile · 2026'
              : 'iOS · Android · PWA · Mobile tested · 2026'}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Meilleur <em className="not-italic text-green">casino mobile</em> 2026
              </>
            ) : (
              <>
                Best <em className="not-italic text-green">mobile casino</em> 2026
              </>
            )}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">
            {isFr
              ? 'Classement des casinos testés sur iPhone et Android. Interface tactile, rapidité de chargement et disponibilité des jeux sur smartphone — les vrais critères du mobile.'
              : 'Casinos ranked and tested on iPhone and Android. Touch interface, loading speed and game availability on smartphone.'}
          </p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={mobileCasinos}
        configKey="mobile"
        pageType="casino_mobile"
        locale={locale}
      />

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {isFr
              ? "L'expérience casino sur mobile en 2026"
              : 'The casino mobile experience in 2026'}
          </h2>
          {isFr ? (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Plus de 60% des joueurs de casino en ligne utilisent principalement leur smartphone.
                Cette réalité a transformé l&apos;industrie : les développeurs de jeux (NetEnt,
                Pragmatic, Play&apos;n GO) conçoivent désormais leurs titres mobile-first, avec des
                interfaces adaptées aux écrans 6 pouces et aux sessions courtes. Les machines à sous
                HTML5 modernes sont aussi performantes sur mobile que sur desktop.
              </p>
              <p>
                Notre équipe teste chaque casino sur iPhone 15 Pro (iOS 17) et Samsung Galaxy S24
                (Android 14) via Chrome et Safari. Nous mesurons le{' '}
                <strong className="text-ink">temps de chargement</strong> (objectif : moins de 3
                secondes sur 4G), la fluidité des animations, la facilité d&apos;accès à la caisse,
                et la qualité du casino live mobile. Les casinos dont les boutons sont trop petits
                pour une utilisation tactile confortable sont pénalisés.
              </p>
              <p>
                LeoVegas mérite son surnom de &quot;roi du mobile&quot; : leur application iOS est
                native, rapide, et intègre toutes les fonctionnalités desktop. Betsson et 888 Casino
                ont également des applications iOS solides. Pour Android, la plupart des casinos
                proposent des APK à télécharger directement, ce qui nécessite d&apos;activer
                &quot;Sources inconnues&quot; dans les paramètres Android.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-[15.5px] leading-[1.7] text-ink-2">
              <p>
                Over 60% of online casino players use their smartphone as their primary device. This
                reality has transformed the industry: game developers (NetEnt, Pragmatic,
                Play&apos;n GO) now design their titles mobile-first, with interfaces adapted to
                6-inch screens and short sessions. Modern HTML5 slot machines perform as well on
                mobile as on desktop.
              </p>
              <p>
                Our team tests each casino on iPhone 15 Pro (iOS 17) and Samsung Galaxy S24 (Android
                14) via Chrome and Safari. We measure{' '}
                <strong className="text-ink">loading time</strong> (target: under 3 seconds on 4G),
                animation smoothness, ease of access to the cashier, and live casino quality on
                mobile. Casinos whose buttons are too small for comfortable touch use are penalised.
              </p>
              <p>
                LeoVegas earns its nickname &apos;king of mobile&apos;: their iOS app is native,
                fast, and incorporates all desktop features. Betsson and 888 Casino also have solid
                iOS apps. For Android, most casinos offer APK files to download directly — which
                requires enabling &apos;Unknown sources&apos; in Android settings.
              </p>
            </div>
          )}

          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {isFr ? 'Questions fréquentes — Casino Mobile' : 'FAQ — Mobile Casino'}
            </h2>
            <FAQAccordion items={isFr ? FAQ_FR : FAQ_EN} />
          </div>
        </div>
      </section>
    </>
  )
}
