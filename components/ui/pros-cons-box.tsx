interface ProsConsBoxProps {
  pros: string[]
  cons: string[]
}

// Accessibility: indicators are ✓/✗ + text, never colour alone
export function ProsConsBox({ pros, cons }: ProsConsBoxProps) {
  return (
    <div className="my-2 mb-[18px] grid grid-cols-2 overflow-hidden rounded-lg border border-line shadow-1">
      <div className="border-r border-line bg-green-50 p-[20px_22px]">
        <h4 className="mb-[13px] flex items-center gap-[7px] font-mono text-xs uppercase tracking-[0.06em] text-green-ink">
          <span aria-hidden>✓</span> Points forts
        </h4>
        <ul className="flex flex-col gap-[11px]">
          {pros.map((pro) => (
            <li
              key={pro}
              className="flex items-start gap-2.5 text-[14.5px] leading-[1.45] text-ink-2"
            >
              <span className="mt-[1px] flex-none font-extrabold text-green" aria-hidden>
                ✓
              </span>
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 p-[20px_22px]">
        <h4 className="mb-[13px] flex items-center gap-[7px] font-mono text-xs uppercase tracking-[0.06em] text-red-ink">
          <span aria-hidden>✗</span> Points faibles
        </h4>
        <ul className="flex flex-col gap-[11px]">
          {cons.map((con) => (
            <li
              key={con}
              className="flex items-start gap-2.5 text-[14.5px] leading-[1.45] text-ink-2"
            >
              <span className="mt-[1px] flex-none font-extrabold text-red" aria-hidden>
                ✗
              </span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
