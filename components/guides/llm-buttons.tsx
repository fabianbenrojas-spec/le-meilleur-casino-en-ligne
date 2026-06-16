'use client'

import { useEffect, useRef, useState } from 'react'

const LLM_CONFIGS = [
  { key: 'chatgpt', label: 'ChatGPT', color: '#10a37f' },
  { key: 'claude', label: 'Claude', color: '#d97757' },
  { key: 'perplexity', label: 'Perplexity', color: '#20808d' },
  { key: 'mistral', label: 'Mistral', color: '#fa520f' },
  { key: 'grok', label: 'Grok', color: '#111111' },
] as const

type LlmKey = (typeof LLM_CONFIGS)[number]['key']

// Perplexity honors a ?q= prefill param; ChatGPT/Claude/Mistral/Grok don't —
// clipboard + plain open is the only reliable path for those 4.
const LLM_BASES: Record<LlmKey, string> = {
  chatgpt: 'https://chatgpt.com/',
  claude: 'https://claude.ai/new',
  perplexity: 'https://www.perplexity.ai/search',
  mistral: 'https://chat.mistral.ai/chat',
  grok: 'https://grok.com/',
}

const PROMPT_TEMPLATE = (url: string) =>
  `Résume-moi ce guide de meilleur-casino-en-ligne.fr en 5 points clés concrets :\n${url}\n\nReste factuel et neutre (sans superlatifs marketing).`

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

export function LlmButtons({ locale }: { title: string; locale: string }) {
  const [toast, setToast] = useState<LlmKey | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPrompt, setModalPrompt] = useState('')
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (modalOpen) closeBtnRef.current?.focus()
  }, [modalOpen])

  function showToast(key: LlmKey) {
    setToast(key)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), 3000)
  }

  function closeModal() {
    setModalOpen(false)
    triggerRef.current?.focus()
  }

  async function handleClipboardClick(key: LlmKey, e: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = e.currentTarget
    const prompt = PROMPT_TEMPLATE(window.location.href)
    try {
      await navigator.clipboard.writeText(prompt)
      setModalOpen(false)
      showToast(key)
    } catch {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
      setToast(null)
      setModalPrompt(prompt)
      setModalOpen(true)
    }
    window.open(LLM_BASES[key], '_blank', 'noopener,noreferrer')
  }

  function handlePerplexityClick() {
    const prompt = PROMPT_TEMPLATE(window.location.href)
    const q = encodeURIComponent(prompt)
    window.open(`${LLM_BASES.perplexity}?q=${q}`, '_blank', 'noopener,noreferrer')
  }

  function handleModalKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      closeModal()
      return
    }
    if (e.key !== 'Tab') return
    const active = document.activeElement
    if (e.shiftKey) {
      if (active === textareaRef.current) {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    } else if (active === closeBtnRef.current) {
      e.preventDefault()
      textareaRef.current?.focus()
    }
  }

  const toastLabel = toast ? LLM_CONFIGS.find((l) => l.key === toast)?.label : null

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-wrap gap-[8px]">
        {LLM_CONFIGS.map((llm) =>
          llm.key === 'perplexity' ? (
            <button
              key={llm.key}
              type="button"
              onClick={handlePerplexityClick}
              aria-label="Résumer via Perplexity (recherche directe)"
              className="inline-flex cursor-pointer items-center gap-[8px] rounded-full border border-line-2 bg-surface py-[7px] pl-[9px] pr-[14px] text-[13.5px] font-semibold text-ink no-underline transition-[border-color,box-shadow,transform] duration-[150ms] hover:-translate-y-[1px] hover:border-ink-3 hover:shadow-1"
              data-event="llm_share_click"
              data-llm={llm.key}
              data-placement="guide_llm_share"
              data-page-type="guide"
              data-locale={locale}
            >
              <SparkleIc color={llm.color} />
              {llm.label}
            </button>
          ) : (
            <button
              key={llm.key}
              type="button"
              onClick={(e) => handleClipboardClick(llm.key, e)}
              aria-label={`Résumer via ${llm.label} (copie le prompt dans le presse-papier)`}
              className="inline-flex cursor-pointer items-center gap-[8px] rounded-full border border-line-2 bg-surface py-[7px] pl-[9px] pr-[14px] text-[13.5px] font-semibold text-ink no-underline transition-[border-color,box-shadow,transform] duration-[150ms] hover:-translate-y-[1px] hover:border-ink-3 hover:shadow-1"
              data-event="llm_share_click"
              data-llm={llm.key}
              data-placement="guide_llm_share"
              data-page-type="guide"
              data-locale={locale}
            >
              <SparkleIc color={llm.color} />
              {llm.label}
            </button>
          )
        )}
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="mm-step-enter w-fit rounded-[8px] border border-line-2 bg-surface px-[12px] py-[8px] text-[12.5px] font-semibold text-ink shadow-1"
        >
          Prompt copié — collez-le dans {toastLabel}
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(10,12,18,.45)] backdrop-blur-[2px] sm:items-center"
          onKeyDown={handleModalKeyDown}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="llm-fallback-title"
            className="flex max-h-[86vh] w-full max-w-[480px] flex-col gap-[14px] rounded-t-xl bg-surface p-5 shadow-3 sm:rounded-xl"
          >
            <h3
              id="llm-fallback-title"
              className="m-0 font-serif text-[18px] font-semibold text-ink"
            >
              Copie manuelle
            </h3>
            <p className="m-0 text-[13.5px] text-ink-2">
              La copie automatique a échoué. Sélectionnez le texte ci-dessous et copiez-le
              manuellement.
            </p>
            <textarea
              ref={textareaRef}
              readOnly
              value={modalPrompt}
              onFocus={(e) => e.currentTarget.select()}
              className="min-h-[120px] w-full resize-none rounded-[8px] border border-line-2 bg-bg-sunken p-3 font-mono text-[12.5px] text-ink"
            />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeModal}
              className="self-end rounded-[8px] border border-line-2 bg-surface px-[16px] py-[8px] text-[13.5px] font-semibold text-ink hover:border-ink-3"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
