import type { ReactNode } from 'react'

import { AffiliateDisclosure } from '@/components/ui/affiliate-disclosure'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/ui/breadcrumbs'
import { FAQAccordion, type FAQItem } from '@/components/ui/faq-accordion'
import { ListingPageClient, type PageConfigKey } from '@/components/listing/listing-page-client'
import type { Operator } from '@/config/operators'
import type { Locale } from '@/i18n/routing'

type JsonLdSchema = Record<string, unknown>

interface HubShellProps {
  pageType: string
  locale: Locale
  breadcrumbItems: BreadcrumbItem[]
  eyebrow: string
  heading: ReactNode
  intro: string
  schemaItemList: JsonLdSchema
  schemaFAQ: JsonLdSchema
  operators: Operator[]
  configKey: PageConfigKey
  editorialH2: string
  editorialContent: ReactNode
  faqH2: string
  faqItems: FAQItem[]
  afterListing?: ReactNode
}

export function HubShell({
  pageType,
  locale,
  breadcrumbItems,
  eyebrow,
  heading,
  intro,
  schemaItemList,
  schemaFAQ,
  operators,
  configKey,
  editorialH2,
  editorialContent,
  faqH2,
  faqItems,
  afterListing,
}: HubShellProps) {
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
      <Breadcrumbs items={breadcrumbItems} locale={locale} />

      <section className="pb-2 pt-10" data-page-type={pageType} data-locale={locale}>
        <div className="mx-auto max-w-site px-[18px] md:px-8">
          <div className="mb-4 inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-green before:h-px before:w-[22px] before:bg-gold before:content-['']">
            {eyebrow}
          </div>
          <h1 className="mb-[18px] font-serif text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {heading}
          </h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.55] text-ink-2">{intro}</p>
        </div>
      </section>

      <AffiliateDisclosure variant="strip" locale={locale} />

      <ListingPageClient
        operators={operators}
        configKey={configKey}
        pageType={pageType}
        locale={locale}
      />

      {afterListing}

      <section className="border-t border-line bg-bg-sunken py-14">
        <div className="mx-auto max-w-[780px] px-[18px] md:px-8">
          <h2 className="mb-5 font-serif text-[clamp(22px,2.8vw,30px)] font-medium tracking-[-0.015em] text-ink">
            {editorialH2}
          </h2>
          {editorialContent}
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-[clamp(20px,2.4vw,26px)] font-medium tracking-[-0.015em] text-ink">
              {faqH2}
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </>
  )
}
