import type { Metadata } from 'next'

// Top 10 comparatif: re-validate hourly (rankings sensitive to operator changes)
export const revalidate = 3600

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { AuthorBio } from '@/components/ui/author-bio'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { CTAButton } from '@/components/ui/cta-button'
import { FAQAccordion } from '@/components/ui/faq-accordion'
import { RankCard } from '@/components/ui/operator-card'
import type { Locale } from '@/i18n/routing'
import { TOP_10 } from '@/config/operators'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: isEn
      ? 'Top 10 Best Online Casinos France (2026)'
      : 'Top 10 des meilleurs casinos en ligne en France (2026)',
    description: isEn
      ? 'Our ranking of the 10 best online casinos in France 2026. Sortable table, /10 ratings, bonuses and RTP. Tested with real money. 18+'
      : "Notre classement des 10 meilleurs casinos en ligne en France en 2026. Tableau comparatif triable, notes /10, bonus et RTP. Testés à l'argent réel. 18+",
    alternates: {
      languages: buildHreflang(
        '/comparatifs/top-10-casinos-en-ligne/',
        '/comparisons/top-10-online-casinos/'
      ),
    },
  }
}

const faq = [
  {
    question: 'Comment établissez-vous ce classement ?',
    answer:
      "Chaque casino est testé à l'argent réel par notre équipe sur 38 critères : bonus, ludothèque, paiements, support, sécurité et mobile. Les notes sont mises à jour tous les 90 jours.",
  },
  {
    question: 'Ces casinos sont-ils légaux en France ?',
    answer:
      "Les casinos en ligne ne sont pas régulés par l'ANJ. Les opérateurs de notre classement disposent de licences Curaçao ou MGA, valides sur le plan international. Nous détaillons le cadre légal dans notre guide dédié.",
  },
  {
    question: 'Quel est le meilleur casino en ligne en France en 2026 ?',
    answer:
      'Crésus Casino est notre n°1 en 2026 : retraits sous 24h, 2 100+ jeux, bonus 200 € + 100 tours avec un wager raisonnable de 35×, et un support francophone réactif.',
  },
]

export default async function ComparatifTop10Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isFr = locale === 'fr'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: isFr ? 'Accueil' : 'Home', href: '/' },
          {
            label: isFr ? 'Comparatifs' : 'Comparisons',
            href: isFr ? '/comparatifs/' : '/en/comparisons/',
          },
          { label: isFr ? 'Top 10 casinos en ligne' : 'Top 10 online casinos' },
        ]}
      />

      {/* Head */}
      <section className="pb-2 pt-10" data-page-type="comparatif" data-locale={locale}>
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {isFr ? 'Classement vérifié · 2026' : 'Verified ranking · 2026'}
          </div>
          <h1 className="mb-[18px] max-w-[18ch] font-serif text-[clamp(32px,4.6vw,52px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            {isFr ? (
              <>
                Top 10 des{' '}
                <em className="italic not-italic text-green">meilleurs casinos en ligne</em> en
                France
              </>
            ) : (
              <>
                Top 10 <em className="italic not-italic text-green">best online casinos</em> in
                France
              </>
            )}
          </h1>
          <p className="m-0 max-w-[64ch] text-[18px] leading-[1.6] text-ink-2">
            {isFr
              ? "Ce classement est le fruit de tests menés à l'argent réel sur 47 opérateurs : dépôt, jeu, demande de retrait et mise à l'épreuve du support. Voici les 10 qui tiennent leurs promesses."
              : 'This ranking is based on real-money tests on 47 operators: deposit, play, withdrawal request and support stress-test. The 10 that deliver on their promises.'}
          </p>

          {/* Meta band */}
          <div className="mt-[22px] flex flex-wrap items-center gap-[22px] rounded border border-line bg-surface p-[16px_20px] shadow-1">
            {[
              { label: isFr ? '47 opérateurs testés' : '47 operators tested' },
              { label: isFr ? "Tests à l'argent réel" : 'Real-money testing' },
              { label: isFr ? 'MÀJ juin 2026' : 'Updated June 2026' },
              { label: isFr ? 'Re-test tous les 90j' : 'Re-tested every 90d' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-[13px] font-medium text-ink-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />
                {item.label}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-3">
              <div
                className="h-[34px] w-[34px] overflow-hidden rounded-full border border-line bg-bg-sunken"
                aria-hidden
              />
              <div>
                <p className="text-[12.5px] font-bold text-ink">Julien Marchand</p>
                <p className="text-[11px] text-ink-3">Rédacteur en chef</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" />

      {/* RankCards */}
      <section className="py-14">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-6 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">01</span>
            {isFr ? 'Notre sélection complète' : 'Our full selection'}
          </h2>

          <div className="flex flex-col gap-[18px]">
            {TOP_10.map((op, i) => (
              <RankCard
                key={op.id}
                operator={op}
                rank={i + 1}
                medal={i < 3 ? ((i + 1) as 1 | 2 | 3) : undefined}
                ga4={{ 'data-page-type': 'comparatif', 'data-locale': locale }}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-[12.5px] text-ink-3">
            {isFr
              ? 'Classement établi selon notre méthodologie. Nous percevons une commission sur les inscriptions via nos liens — sans incidence sur les notes.'
              : 'Rankings based on our methodology. We earn a commission on sign-ups via our links — this does not affect ratings.'}
          </p>
        </div>
      </section>

      {/* Methodology teaser */}
      <section className="bg-bg-sunken py-14">
        <div className="mx-auto max-w-site px-8 sm:px-[18px]">
          <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            <span className="mr-[10px] font-mono text-[14px] font-medium text-green">02</span>
            {isFr ? 'Nos critères de notation' : 'Our rating criteria'}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              {
                n: '01',
                title: isFr ? 'Bonus & conditions' : 'Bonus & conditions',
                weight: '20%',
                desc: isFr
                  ? 'Montant, wager, délai, jeux éligibles — chaque clause est lue.'
                  : 'Amount, wagering, deadline, eligible games — every clause read.',
              },
              {
                n: '02',
                title: isFr ? 'Paiements' : 'Payments',
                weight: '18%',
                desc: isFr
                  ? 'Délai de retrait chronométré, méthodes, plafonds, vérification KYC.'
                  : 'Withdrawal time measured, methods, limits, KYC process.',
              },
              {
                n: '03',
                title: isFr ? 'Ludothèque' : 'Game library',
                weight: '16%',
                desc: isFr
                  ? 'Volume, diversité des fournisseurs, RTP moyen mesuré sur échantillon.'
                  : 'Volume, provider diversity, average RTP measured on sample.',
              },
              {
                n: '04',
                title: isFr ? 'Support client' : 'Customer support',
                weight: '14%',
                desc: isFr
                  ? '5 questions pièges — réactivité, compétence, disponibilité en français.'
                  : '5 trick questions — responsiveness, competence, availability.',
              },
              {
                n: '05',
                title: isFr ? 'Sécurité & licence' : 'Security & licence',
                weight: '12%',
                desc: isFr
                  ? 'Validité de la licence, chiffrement, outils de jeu responsable.'
                  : 'Licence validity, encryption, responsible gambling tools.',
              },
              {
                n: '06',
                title: isFr ? 'Expérience mobile' : 'Mobile experience',
                weight: '10%',
                desc: isFr
                  ? 'PWA vs app native, performances, fluidité, compatibilité.'
                  : 'PWA vs native app, performance, fluidity, compatibility.',
              },
            ].map((c) => (
              <div key={c.n} className="rounded-lg border border-line bg-surface p-[22px] shadow-1">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-green">{c.n}</span>
                  <h3 className="font-serif text-[18px] font-semibold text-ink">{c.title}</h3>
                  <span className="ml-auto font-mono text-[11px] text-ink-3">{c.weight}</span>
                </div>
                <p className="m-0 text-[13.5px] leading-[1.55] text-ink-2">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <CTAButton
              href="/guides/methodologie/"
              variant="secondary"
              data-event="methodology_click"
            >
              {isFr ? 'Lire notre méthodologie complète' : 'Read our full methodology'}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Author + FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-[880px] px-8 sm:px-[18px]">
          <AuthorBio
            name="Julien Marchand"
            role={
              isFr
                ? "Rédacteur en chef · 11 ans dans l'iGaming"
                : 'Editor-in-chief · 11 years in iGaming'
            }
            credentials={
              isFr
                ? 'Ex-analyste conformité · testé 200+ casinos'
                : 'Former compliance analyst · tested 200+ casinos'
            }
            lastUpdated="2026-06-07"
            nextRetest="2026-09-01"
            className="mb-10"
          />
          <h2 className="mb-6 font-serif text-[clamp(24px,3vw,32px)] font-medium tracking-[-0.015em] text-ink">
            {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
          </h2>
          <FAQAccordion items={faq} includeSchema />
        </div>
      </section>
    </>
  )
}
