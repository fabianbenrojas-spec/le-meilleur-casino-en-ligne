import { getLocale } from 'next-intl/server'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'

export default async function NotFound() {
  const locale = await getLocale()
  const isFr = locale !== 'en'

  return (
    <>
      <Breadcrumbs
        items={[{ label: isFr ? 'Accueil' : 'Home', href: '/' }, { label: '404' }]}
        locale={locale}
      />

      <section className="flex min-h-[60vh] flex-col items-center justify-center px-8 py-20 text-center">
        <div className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:mr-[9px] before:inline-block before:h-px before:w-[22px] before:translate-y-[-2px] before:bg-gold before:align-middle before:content-['']">
          404
        </div>
        <h1 className="mb-5 font-serif text-[clamp(32px,5vw,52px)] font-medium leading-tight tracking-[-0.02em] text-ink">
          {isFr ? 'Page introuvable' : 'Page not found'}
        </h1>
        <p className="mb-10 max-w-[46ch] text-[17px] leading-[1.55] text-ink-2">
          {isFr
            ? "Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour trouver le meilleur casino en ligne."
            : "This page doesn't exist or has been moved. Go back to the homepage to find the best online casino."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <CTAButton href="/" arrow data-event="404_cta" data-placement="not_found">
            {isFr ? "Retour à l'accueil" : 'Back to homepage'}
          </CTAButton>
          <CTAButton
            href="/casinos/"
            variant="secondary"
            data-event="404_cta"
            data-placement="not_found_casinos"
          >
            {isFr ? 'Voir les casinos' : 'Browse casinos'}
          </CTAButton>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-ink-3">
          {(isFr
            ? [
                { label: 'Top 10', href: '/comparatifs/top-10-casinos-en-ligne/' },
                { label: 'Bonus casino', href: '/bonus/' },
                { label: 'Jeux', href: '/jeux/' },
                { label: 'Guides', href: '/guides/' },
              ]
            : [
                { label: 'Top 10', href: '/en/comparatifs/top-10-casinos-en-ligne/' },
                { label: 'Casino bonuses', href: '/en/bonus/' },
                { label: 'Games', href: '/en/jeux/' },
                { label: 'Guides', href: '/en/guides/' },
              ]
          ).map(({ label, href }) => (
            <Link key={href} href={href} className="hover:text-green hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
