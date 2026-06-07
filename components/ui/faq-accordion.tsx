'use client'

import { useState } from 'react'
import type { WithContext, FAQPage } from 'schema-dts'

import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  includeSchema?: boolean
  className?: string
}

// Client component for open/close interactivity.
// Schema JSON-LD is injected inline (static data, safe to render in client component).
export function FAQAccordion({ items, includeSchema = true, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div
        className={cn(
          'rounded-lg border border-line bg-surface px-[22px] py-1 shadow-1',
          className
        )}
        data-faq
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className={cn('faq-item border-b border-line last:border-b-0', isOpen && 'open')}
            >
              <button
                type="button"
                className="faq-q font-inherit flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-[18px] text-left text-[16px] font-semibold text-ink"
                aria-expanded={isOpen}
                onClick={() => {
                  const next = isOpen ? null : index
                  setOpenIndex(next)
                  if (next !== null) {
                    // data-event fires via GTM — no inline tracking needed
                  }
                }}
                data-event="faq_open"
              >
                <span>{item.question}</span>
                {/* Plus/minus icon via CSS pseudo-elements (see .faq-q .pm in CSS) */}
                <span className="pm" aria-hidden />
              </button>

              <div
                className="faq-a overflow-hidden transition-[max-height] duration-[280ms] ease-[ease]"
                style={{ maxHeight: isOpen ? '360px' : '0' }}
              >
                <p className="mb-[18px] text-[15px] leading-[1.6] text-ink-2">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
