import type { Metadata } from 'next'

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import type { Locale } from '@/i18n/routing'
import { buildHreflang } from '@/lib/i18n/routes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === 'fr'
        ? 'Mentions légales — le-meilleur-casino-en-ligne.fr'
        : 'Legal Notice — le-meilleur-casino-en-ligne.fr',
    description:
      locale === 'fr'
        ? 'Mentions légales obligatoires (LCEN) : éditeur, hébergeur, directeur de publication, propriété intellectuelle, affiliation et jeu responsable.'
        : 'Mandatory legal notice (LCEN): publisher, host, editor-in-chief, intellectual property, affiliation and responsible gambling.',
    alternates: { languages: buildHreflang('/mentions-legales/') },
    robots: { index: false },
  }
}

function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-9 [scroll-margin-top:calc(var(--header-h)+20px)]">
      <h2 className="mb-3 font-serif text-[21px] font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-[15px] leading-[1.75] text-ink-2">{children}</div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-line py-[10px] last:border-b-0">
      <span className="w-44 shrink-0 font-mono text-[12.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">
        {label}
      </span>
      <span className="flex-1 text-[14.5px] text-ink">{value}</span>
    </div>
  )
}

export default async function MentionsLegalesPage({
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
          { label: isFr ? 'Mentions légales' : 'Legal Notice' },
        ]}
        locale={locale}
      />

      <div className="mx-auto max-w-[800px] px-8 py-12 sm:px-[18px]">
        <h1 className="mb-2 font-serif text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.018em] text-ink">
          {isFr ? 'Mentions légales' : 'Legal Notice'}
        </h1>
        <p className="mb-10 text-[13px] text-ink-3">
          {isFr
            ? `Conformément à la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (LCEN), article 6-III.`
            : 'In accordance with French Law n°2004-575 of 21 June 2004 on Confidence in the Digital Economy (LCEN), article 6-III.'}
        </p>

        {/* ── 1. Éditeur ──────────────────────────────────────────────── */}
        <Section id="editeur" title={isFr ? '1. Éditeur du site' : '1. Site Publisher'}>
          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            <InfoRow
              label={isFr ? 'Raison sociale' : 'Company name'}
              value="[RAISON SOCIALE À COMPLÉTER]"
            />
            <InfoRow
              label={isFr ? 'Forme juridique' : 'Legal form'}
              value="[SASU / SAS / SARL — à préciser]"
            />
            <InfoRow label={isFr ? 'Capital social' : 'Share capital'} value="[MONTANT] €" />
            <InfoRow
              label={isFr ? 'Siège social' : 'Registered office'}
              value="[ADRESSE COMPLÈTE, CODE POSTAL, VILLE]"
            />
            <InfoRow label="SIRET" value="[NUMÉRO SIRET À 14 CHIFFRES]" />
            <InfoRow label="RCS" value="[VILLE D'IMMATRICULATION] [NUMÉRO RCS]" />
            <InfoRow label="TVA intracommunautaire" value="[NUMÉRO TVA — ex : FR12 XXXXXXXXXXXX]" />
            <InfoRow
              label={isFr ? 'Directeur de publication' : 'Editor-in-chief'}
              value="Fabian Rojas"
            />
            <InfoRow
              label="Contact"
              value={
                <Link href={isFr ? '/contact/' : '/en/contact/'} className="text-green underline">
                  {isFr ? 'Formulaire de contact' : 'Contact form'}
                </Link>
              }
            />
          </div>
          <p className="text-[13px] text-ink-3">
            {isFr
              ? '⚠ Les champs entre crochets doivent être complétés avec les informations légales réelles de la société exploitant ce site.'
              : '⚠ Fields in brackets must be completed with the real legal information of the company operating this site.'}
          </p>
        </Section>

        {/* ── 2. Hébergement ───────────────────────────────────────────── */}
        <Section id="hebergement" title={isFr ? '2. Hébergement' : '2. Hosting'}>
          <div className="overflow-hidden rounded-lg border border-line bg-surface">
            <InfoRow label={isFr ? 'Hébergeur' : 'Host'} value="Vercel Inc." />
            <InfoRow
              label={isFr ? 'Adresse' : 'Address'}
              value="340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis"
            />
            <InfoRow
              label="Site"
              value={
                <a
                  href="https://vercel.com"
                  className="text-green underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vercel.com
                </a>
              }
            />
          </div>
        </Section>

        {/* ── 3. Nature éditoriale ─────────────────────────────────────── */}
        <Section
          id="nature"
          title={
            isFr
              ? '3. Nature du site et activité éditoriale'
              : '3. Site nature and editorial activity'
          }
        >
          <p>
            {isFr
              ? `Le site le-meilleur-casino-en-ligne.fr est un site d'information, de comparaison et d'orientation vers des opérateurs de jeux en ligne. Ce site n'est pas un opérateur de jeux en ligne et n'organise aucun jeu d'argent.`
              : 'The site le-meilleur-casino-en-ligne.fr is an information, comparison and referral site for online gambling operators. This site is not an online gambling operator and does not organise any gambling.'}
          </p>
          <p>
            {isFr
              ? "Les jeux d'argent en ligne sont réglementés en France par l'Autorité Nationale des Jeux (ANJ). Les opérateurs référencés sur ce site opèrent sous des licences étrangères reconnues (MGA Malte, UKGC, Gibraltar) et ne disposent pas d'un agrément ANJ. Notre rôle est purement informatif et éditorial."
              : 'Online gambling in France is regulated by the Autorité Nationale des Jeux (ANJ). The operators referenced on this site operate under recognised foreign licences (MGA Malta, UKGC, Gibraltar) and do not hold ANJ accreditation. Our role is purely informational and editorial.'}
          </p>
          <p>
            {isFr
              ? "Conformément à la Loi n°2010-476 du 12 mai 2010, nous rappelons que les jeux d'argent sont interdits aux mineurs de moins de 18 ans en France."
              : 'In accordance with French Law n°2010-476 of 12 May 2010, we remind you that gambling is prohibited for persons under 18 years of age in France.'}
          </p>
        </Section>

        {/* ── 4. Affiliation ───────────────────────────────────────────── */}
        <Section
          id="affiliation"
          title={
            isFr
              ? `4. Liens d'affiliation et modèle économique`
              : '4. Affiliate links and business model'
          }
        >
          <p>
            {isFr
              ? "Ce site perçoit des commissions (CPA — Cost Per Acquisition, ou partage de revenus) lorsque des utilisateurs s'inscrivent sur des sites partenaires via nos liens. Ces commissions constituent notre principale source de revenus."
              : 'This site earns commissions (CPA — Cost Per Acquisition, or revenue sharing) when users sign up on partner sites via our links. These commissions constitute our main revenue source.'}
          </p>
          <p>
            {isFr
              ? `Nos commissions n'influencent pas nos notations, analyses ou classements éditoriaux. Chaque casino est évalué de manière indépendante selon nos critères de notation publiés. Nous testons chaque opérateur avec de l'argent réel avant toute recommandation.`
              : 'Our commissions do not influence our ratings, analyses or editorial rankings. Each casino is evaluated independently according to our published rating criteria. We test each operator with real money before any recommendation.'}
          </p>
          <p>
            {isFr
              ? "Cette divulgation est conforme aux lignes directrices de la DGCCRF sur les pratiques commerciales loyales et aux recommandations de l'ARPP sur la transparence publicitaire."
              : 'This disclosure complies with DGCCRF guidelines on fair commercial practices and ARPP recommendations on advertising transparency.'}
          </p>
        </Section>

        {/* ── 5. Propriété intellectuelle ──────────────────────────────── */}
        <Section id="pi" title={isFr ? '5. Propriété intellectuelle' : '5. Intellectual Property'}>
          <p>
            {isFr
              ? "L'ensemble du contenu de ce site — textes, analyses, notes, méthodologie de notation, code source, structure éditoriale — est protégé par le droit d'auteur (Code de la propriété intellectuelle, articles L.111-1 et suivants). Toute reproduction, même partielle, sans autorisation écrite préalable est interdite."
              : 'All content on this site — texts, analyses, ratings, rating methodology, source code, editorial structure — is protected by copyright (French Intellectual Property Code, articles L.111-1 et seq.). Any reproduction, even partial, without prior written authorisation is prohibited.'}
          </p>
          <p>
            {isFr
              ? 'Les marques, logos et noms commerciaux des opérateurs de casino mentionnés sur ce site appartiennent à leurs propriétaires respectifs et sont utilisés à des fins purement informatives, dans le cadre du droit de citation.'
              : 'The trademarks, logos and trade names of casino operators mentioned on this site belong to their respective owners and are used for purely informational purposes, within the scope of citation rights.'}
          </p>
        </Section>

        {/* ── 6. Limitation de responsabilité ──────────────────────────── */}
        <Section
          id="responsabilite"
          title={isFr ? '6. Limitation de responsabilité' : '6. Limitation of Liability'}
        >
          <p>
            {isFr
              ? "Les informations publiées sur ce site sont fournies à titre indicatif. Nous nous efforçons de maintenir ces informations à jour, mais nous ne pouvons garantir l'exactitude complète des offres de bonus, conditions et RTP qui peuvent être modifiés par les opérateurs sans préavis."
              : 'Information published on this site is provided for guidance only. We strive to keep this information up to date, but we cannot guarantee the complete accuracy of bonus offers, terms and RTP which may be modified by operators without notice.'}
          </p>
          <p>
            {isFr
              ? "Le jeu en ligne comporte des risques financiers. Nous rappelons que les jeux d'argent peuvent entraîner une dépendance et que la grande majorité des joueurs perd de l'argent à long terme. Ce site ne saurait être tenu responsable des pertes financières liées au jeu."
              : 'Online gambling involves financial risks. We remind you that gambling can be addictive and that the vast majority of players lose money in the long term. This site cannot be held responsible for financial losses related to gambling.'}
          </p>
        </Section>

        {/* ── 7. Médiation consommateurs ───────────────────────────────── */}
        <Section
          id="mediation"
          title={isFr ? '7. Médiation de la consommation' : '7. Consumer Mediation'}
        >
          <p>
            {isFr
              ? 'Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige non résolu avec notre service, vous pouvez recourir gratuitement à un médiateur de la consommation. Nous adhérons à [NOM DU MÉDIATEUR À COMPLÉTER]. Plateforme européenne de règlement en ligne des litiges (RLL) : '
              : 'In accordance with articles L.612-1 et seq. of the French Consumer Code, in the event of an unresolved dispute with our service, you can use a consumer mediator free of charge. We adhere to [MEDIATOR NAME TO BE COMPLETED]. European Online Dispute Resolution (ODR) platform: '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              className="text-green underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </Section>

        {/* ── 8. Droit applicable ──────────────────────────────────────── */}
        <Section
          id="droit"
          title={isFr ? '8. Droit applicable et juridiction' : '8. Applicable law and jurisdiction'}
        >
          <p>
            {isFr
              ? 'Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents. Les parties conviennent que la langue contractuelle est le français.'
              : 'These legal notices are governed by French law. In the event of a dispute, French courts shall have exclusive jurisdiction. The parties agree that the contractual language is French.'}
          </p>
        </Section>

        {/* ── 9. Jeu responsable ───────────────────────────────────────── */}
        <Section
          id="jeu-responsable"
          title={isFr ? '9. Jeu responsable' : '9. Responsible Gambling'}
        >
          <div className="rounded-lg border border-[var(--red)] bg-[color-mix(in_srgb,var(--red)_6%,var(--bg))] p-5">
            <p className="mb-3 font-semibold text-ink">
              {isFr
                ? '🔞 Interdit aux mineurs — 18 ans et plus'
                : '🔞 Prohibited to minors — 18 years and over'}
            </p>
            <p className="mb-3 text-[14px]">
              {isFr
                ? 'Le jeu peut être source de dépendance. Si vous ou un proche avez des difficultés avec le jeu, des aides gratuites et confidentielles sont disponibles :'
                : 'Gambling can be addictive. If you or someone close to you has gambling difficulties, free and confidential support is available:'}
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                {isFr ? '🇫🇷 ' : '🇫🇷 '}
                <strong>Joueurs Info Service</strong> :{' '}
                <a href="tel:0974751313" className="font-bold text-[var(--red)] underline">
                  09 74 75 13 13
                </a>
                {isFr ? ' (lun–ven 8h–20h, gratuit)' : ' (Mon–Fri 8am–8pm, free)'}
              </li>
              <li>
                <strong>Adictel</strong> :{' '}
                <a
                  href="https://www.adictel.com"
                  className="text-green underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  adictel.com
                </a>
              </li>
              {!isFr && (
                <li>
                  <strong>GamCare</strong> :{' '}
                  <a href="tel:08088020133" className="font-bold text-[var(--red)] underline">
                    0808 802 0133
                  </a>
                  {' · '}
                  <a
                    href="https://www.begambleaware.org"
                    className="text-green underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BeGambleAware
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-3 text-[13px] text-ink-3">
              {isFr
                ? "L'ANJ propose également l'outil Diagnobet pour évaluer votre comportement de jeu : "
                : 'The ANJ also offers the Diagnobet tool to assess your gambling behaviour: '}
              <a
                href="https://www.jeux.gouv.fr"
                className="text-green underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                jeux.gouv.fr
              </a>
            </p>
          </div>
        </Section>

        <p className="mt-8 text-[13px] text-ink-3">
          {isFr ? 'Dernière mise à jour : juin 2026' : 'Last updated: June 2026'}
        </p>
      </div>
    </>
  )
}
