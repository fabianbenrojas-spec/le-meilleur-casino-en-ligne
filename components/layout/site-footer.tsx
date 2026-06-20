import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import type { Locale } from '@/i18n/routing'
import { localizeHref } from '@/lib/i18n/routes'

interface SiteFooterProps {
  locale: Locale
}

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

function buildColumns(locale: Locale, isFr: boolean): FooterColumn[] {
  const l = (path: string) => localizeHref(path, locale)
  return [
    {
      title: isFr ? 'Casinos' : 'Casinos',
      links: [
        {
          label: isFr ? 'Top 10 Casinos' : 'Top 10 Casinos',
          href: l('/comparatifs/top-10-casinos-en-ligne/'),
        },
        { label: isFr ? 'Casinos Bitcoin' : 'Bitcoin Casinos', href: l('/casinos/bitcoin/') },
        { label: isFr ? 'Nouveaux Casinos' : 'New Casinos', href: l('/casinos/nouveaux/') },
        { label: isFr ? 'Casinos Live' : 'Live Casinos', href: l('/casinos/live/') },
        { label: isFr ? 'Casinos Fiables' : 'Trusted Casinos', href: l('/casinos/fiables/') },
        { label: isFr ? 'Casinos Sans KYC' : 'No-KYC Casinos', href: l('/casinos/sans-kyc/') },
        {
          label: isFr ? 'Retrait Instantané' : 'Instant Withdrawal',
          href: l('/casinos/retrait-instantane/'),
        },
        {
          label: isFr ? 'Casinos en Français' : 'French-Language Casinos',
          href: l('/casinos/francais/'),
        },
        { label: isFr ? 'RTP Élevé' : 'High RTP', href: l('/casinos/rtp-eleve/') },
      ],
    },
    {
      title: isFr ? 'Comparatifs' : 'Comparisons',
      links: [
        {
          label: isFr ? 'Comparatif Top 10' : 'Top 10 Comparison',
          href: l('/comparatifs/top-10-casinos-en-ligne/'),
        },
        { label: isFr ? 'Bonus Casino' : 'Casino Bonuses', href: l('/bonus/') },
        { label: isFr ? 'Casino vs Casino' : 'Casino vs Casino', href: l('/comparatifs/') },
        { label: isFr ? 'Alternatives' : 'Alternatives', href: l('/alternatives/') },
        { label: isFr ? 'Cashback Casino' : 'Cashback Casino', href: l('/comparatifs/cashback/') },
      ],
    },
    {
      title: isFr ? 'Jeux' : 'Games',
      links: [
        { label: isFr ? 'Machines à Sous' : 'Slot Machines', href: l('/jeux/machines-a-sous/') },
        { label: isFr ? 'Roulette' : 'Roulette', href: l('/jeux/roulette/') },
        { label: isFr ? 'Blackjack' : 'Blackjack', href: l('/jeux/blackjack/') },
        { label: isFr ? 'Vidéo Poker' : 'Video Poker', href: l('/jeux/video-poker/') },
        {
          label: isFr ? 'Jackpot progressif' : 'Progressive Jackpot',
          href: l('/jeux/jackpot-progressif/'),
        },
        { label: isFr ? 'Poker en ligne' : 'Online Poker', href: l('/jeux/poker/') },
      ],
    },
    {
      title: isFr ? 'Ressources' : 'Resources',
      links: [
        { label: isFr ? 'Guides Casino' : 'Casino Guides', href: l('/guides/') },
        { label: isFr ? 'Blog' : 'Blog', href: l('/blog/') },
        { label: isFr ? 'Jeu Responsable' : 'Responsible Gambling', href: l('/jeu-responsable/') },
        { label: isFr ? 'À Propos' : 'About', href: l('/a-propos/') },
        { label: isFr ? 'Contact' : 'Contact', href: l('/contact/') },
      ],
    },
  ]
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const isFr = locale === 'fr'
  const columns = buildColumns(locale, isFr)

  return (
    <footer className="border-t border-line bg-bg-sunken pb-7 pt-14">
      <div className="mx-auto max-w-site px-[18px] md:px-8">
        {/* Grid: brand + 4 columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a
              href={locale === 'fr' ? '/' : '/en/'}
              className="mb-4 flex items-center gap-[11px] font-bold tracking-[-0.01em] text-ink no-underline"
            >
              <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[8px] bg-green font-serif text-[18px] font-semibold text-white shadow-1">
                M
              </span>
              <span className="text-[15.5px]">
                le·<b className="text-green">meilleur</b>·casino
              </span>
            </a>
            <p className="mb-4 max-w-[34ch] text-[13.5px] leading-[1.6] text-ink-2">
              {isFr
                ? 'Comparateur indépendant de casinos en ligne. Avis experts, bonus vérifiés, classements mis à jour mensuellement.'
                : 'Independent online casino comparison. Expert reviews, verified bonuses, monthly updated rankings.'}
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-[14px] font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink-3">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-[9px]">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13.5px] text-ink-2 no-underline transition-colors hover:text-green"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-11 border-t border-line pt-[22px]">
          {/* Affiliate disclosure — full width */}
          <AffiliateDisclosure variant="footer" className="mb-[18px]" />

          {/* Legal */}
          <div className="flex flex-wrap items-center gap-4 text-[12.5px] text-ink-3">
            <span>
              {isFr
                ? '© 2026 le-meilleur-casino-en-ligne.fr — Tous droits réservés'
                : '© 2026 le-meilleur-casino-en-ligne.fr — All rights reserved'}
            </span>
            <div className="ml-auto flex flex-wrap gap-4">
              {[
                {
                  label: isFr ? 'Mentions légales' : 'Legal notice',
                  href: isFr ? '/mentions-legales/' : '/en/legal-notice/',
                },
                {
                  label: isFr ? 'Politique cookies' : 'Cookie policy',
                  href: isFr ? '/politique-cookies/' : '/en/cookie-policy/',
                },
                {
                  label: isFr ? 'Confidentialité' : 'Privacy',
                  href: isFr ? '/confidentialite/' : '/en/privacy/',
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-ink-3 no-underline hover:text-green"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
