'use client'

import { useEffect, useState } from 'react'

const LLM_CONFIGS = [
  { key: 'chatgpt', label: 'ChatGPT', color: '#10a37f' },
  { key: 'claude', label: 'Claude', color: '#d97757' },
  { key: 'perplexity', label: 'Perplexity', color: '#20808d' },
  { key: 'mistral', label: 'Mistral', color: '#fa520f' },
  { key: 'grok', label: 'Grok', color: '#111111' },
] as const

const LLM_BASES: Record<string, string> = {
  chatgpt: 'https://chatgpt.com/?q=',
  claude: 'https://claude.ai/new?q=',
  perplexity: 'https://www.perplexity.ai/search?q=',
  mistral: 'https://chat.mistral.ai/chat?q=',
  grok: 'https://grok.com/?q=',
}

// Sparkle icon for the LLM icon placeholder
function SparkleIc({ color }: { color: string }) {
  return (
    <span
      className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[6px]"
      style={{ background: `color-mix(in srgb, ${color} 14%, transparent)` }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[13px] w-[13px]"
        style={{ color }}
        aria-hidden
      >
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      </svg>
    </span>
  )
}

export function LlmButtons({ title }: { title: string }) {
  const [hrefs, setHrefs] = useState<Record<string, string>>({})

  useEffect(() => {
    const url = window.location.href
    const prompt = `Résume cet article de le-meilleur-casino-en-ligne.fr (« ${title.trim()} ») en points clés, puis explique-moi les conditions de wager simplement : ${url}`
    const q = encodeURIComponent(prompt)
    const resolved: Record<string, string> = {}
    for (const [key, base] of Object.entries(LLM_BASES)) {
      resolved[key] = base + q
    }
    // Deferred to avoid triggering cascading renders from synchronous setState in effect
    const t = setTimeout(() => setHrefs(resolved), 0)
    return () => clearTimeout(t)
  }, [title])

  return (
    <div className="flex flex-wrap gap-[8px]">
      {LLM_CONFIGS.map((llm) => (
        <a
          key={llm.key}
          href={hrefs[llm.key] ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-[8px] rounded-full border border-line-2 bg-surface py-[7px] pl-[9px] pr-[14px] text-[13.5px] font-semibold text-ink no-underline transition-[border-color,box-shadow,transform] duration-[150ms] hover:-translate-y-[1px] hover:border-ink-3 hover:shadow-1"
          data-event="summarize_llm"
          data-target={llm.key}
        >
          <SparkleIc color={llm.color} />
          {llm.label}
        </a>
      ))}
    </div>
  )
}
