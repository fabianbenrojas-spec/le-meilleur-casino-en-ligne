import type { Metadata } from 'next'

import { ThemeToggle } from '@/components/ui/theme-toggle'

export const metadata: Metadata = {
  title: 'Design System — Tokens',
  robots: { index: false, follow: false },
}

function Swatch({ token, label, desc }: { token: string; label: string; desc: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line shadow-1">
      <div className="h-14 w-full" style={{ backgroundColor: `var(${token})` }} aria-hidden />
      <div className="bg-surface p-3">
        <p className="font-mono text-xs font-medium text-ink">{label}</p>
        <p className="font-mono text-[10px] text-ink-3">{token}</p>
        <p className="mt-1 text-[11px] text-ink-2">{desc}</p>
      </div>
    </div>
  )
}

function ShadowCard({ level, token, desc }: { level: string; token: string; desc: string }) {
  return (
    <div className="rounded-lg bg-surface p-6" style={{ boxShadow: `var(${token})` }}>
      <p className="font-mono text-sm font-medium text-ink">{level}</p>
      <p className="font-mono text-[10px] text-ink-3">{token}</p>
      <p className="mt-1 text-xs text-ink-2">{desc}</p>
    </div>
  )
}

function RadiusDemo({ size, px, token }: { size: string; px: string; token: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-16 w-16 border-2 border-green bg-green-50"
        style={{ borderRadius: `var(${token})` }}
        aria-hidden
      />
      <p className="font-mono text-xs font-medium text-ink">{size}</p>
      <p className="font-mono text-[10px] text-ink-3">{px}</p>
    </div>
  )
}

const colorGroups = [
  {
    title: 'Fond / Surface',
    tokens: [
      { token: '--bg', label: 'bg', desc: 'Fond de page' },
      { token: '--bg-sunken', label: 'bg-sunken', desc: 'Sections en retrait' },
      { token: '--surface', label: 'surface', desc: 'Cartes, tableaux' },
      { token: '--surface-2', label: 'surface-2', desc: 'En-têtes, fonds secondaires' },
    ],
  },
  {
    title: 'Texte / Encre',
    tokens: [
      { token: '--ink', label: 'ink', desc: 'Titres, texte principal' },
      { token: '--ink-2', label: 'ink-2', desc: 'Texte courant' },
      { token: '--ink-3', label: 'ink-3', desc: 'Métas, légendes' },
      { token: '--line', label: 'line', desc: 'Bordures légères' },
      { token: '--line-2', label: 'line-2', desc: 'Bordures appuyées, inputs' },
    ],
  },
  {
    title: "Vert — CTA / Action (le seul accent d'action)",
    tokens: [
      { token: '--green', label: 'green', desc: 'CTA primaire, positif' },
      { token: '--green-700', label: 'green-700', desc: 'Hover CTA' },
      { token: '--green-50', label: 'green-50', desc: 'Fonds verts légers' },
      { token: '--green-ink', label: 'green-ink', desc: 'Texte vert sur fond clair' },
    ],
  },
  {
    title: 'Or — Premium / Featured (rare, jamais décoratif)',
    tokens: [
      { token: '--gold', label: 'gold', desc: 'Top pick, étoiles, featured' },
      { token: '--gold-50', label: 'gold-50', desc: 'Fond or léger' },
      { token: '--gold-ink', label: 'gold-ink', desc: 'Texte or' },
    ],
  },
  {
    title: 'Rouge — Légal uniquement (18+, warnings)',
    tokens: [
      { token: '--red', label: 'red', desc: '18+, avertissements légaux' },
      { token: '--red-50', label: 'red-50', desc: 'Fond alerte légère' },
      { token: '--red-ink', label: 'red-ink', desc: 'Texte rouge' },
    ],
  },
]

const breakpoints = [
  { name: 'base', val: '0', usage: 'Mobile 375px — styles de base' },
  { name: 'xs', val: '420px', usage: 'Petit mobile' },
  { name: 'sm', val: '620px', usage: 'Mobile large' },
  { name: 'md', val: '760px', usage: 'Tablette — nav burger, scroll-x table, sticky CTA visible' },
  { name: 'lg', val: '860px', usage: 'Tablette large — sidebars, bottom-sheet filtres' },
  { name: 'xl', val: '1080px', usage: 'Desktop — grilles complètes' },
  { name: '2xl', val: '1200px', usage: 'Max-width site (--maxw)' },
]

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface/90 sticky top-0 z-50 border-b border-line px-8 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-site items-center justify-between">
          <div>
            <p className="font-serif text-xl font-medium text-ink">Design System</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-3">
              le-meilleur-casino-en-ligne.fr — tokens · interne · noindex
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-site space-y-16 px-8 py-12">
        {/* ── PALETTE ─────────────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            01 — Palette couleurs
          </h2>
          <div className="space-y-8">
            {colorGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-sm font-semibold text-ink-2">{group.title}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {group.tokens.map((t) => (
                    <Swatch key={t.token} {...t} />
                  ))}
                </div>
              </div>
            ))}
            {/* Star */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-2">Étoiles</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Swatch token="--star" label="star" desc="Remplissage étoiles rating" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TYPOGRAPHY ──────────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            02 — Typographie
          </h2>
          <div className="space-y-6 rounded-xl border border-line bg-surface p-8 shadow-1">
            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                H1 — Newsreader 500 · clamp(30–60px) · tracking -.02em
              </p>
              <h1 className="font-serif text-[clamp(30px,5vw,60px)] font-medium leading-tight tracking-[-0.02em] text-ink">
                Meilleur casino en ligne
              </h1>
            </div>

            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                H2 — Newsreader 500 · clamp(27–40px) · tracking -.018em
              </p>
              <h2 className="font-serif text-[clamp(27px,3.6vw,40px)] font-medium leading-tight tracking-[-0.018em] text-ink">
                Notre sélection de casinos fiables
              </h2>
            </div>

            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                H3 — Hanken Grotesk 700 · 20–23px
              </p>
              <h3 className="text-xl font-bold text-ink">Bonus de bienvenue jusqu&apos;à 500 €</h3>
            </div>

            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                Body — Hanken Grotesk 400 · 17px · lh 1.6
              </p>
              <p className="text-[17px] leading-[1.6] text-ink-2">
                Nous évaluons chaque casino selon 9 critères indépendants : ludothèque, bonus,
                paiements, support, licence, mobile, sécurité, VIP et jeu responsable. Notre équipe
                d&apos;experts teste chaque opérateur en conditions réelles avant de publier son
                avis.
              </p>
            </div>

            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                Small — Hanken Grotesk · 13–14px
              </p>
              <p className="text-[13px] text-ink-3">
                Les jeux de casino impliquent des risques financiers. Jouez de manière responsable.
              </p>
            </div>

            <div className="border-b border-line pb-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                Mono / Meta — JetBrains Mono 400 · 11–12px · uppercase · tracking .05em
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-3">
                RTP 96.5% · Volatilité Haute · Max Win 5 000× · MÀJ 2026-06-07 · Licence ANJ
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-3">
                Serif italic — Newsreader italic 400 · citations, pull-quotes éditoriaux
              </p>
              <p className="font-serif text-xl italic leading-relaxed text-ink">
                « La régulation ANJ impose aux opérateurs des standards stricts de protection des
                joueurs, notamment l&apos;auto-exclusion et les limites de dépôt. »
              </p>
            </div>
          </div>
        </section>

        {/* ── RADIUS ──────────────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            03 — Radius
          </h2>
          <div className="flex flex-wrap gap-12 rounded-xl border border-line bg-surface p-8 shadow-1">
            <RadiusDemo size="sm" px="6px" token="--radius-sm" />
            <RadiusDemo size="default" px="10px" token="--radius" />
            <RadiusDemo size="lg" px="16px" token="--radius-lg" />
            <RadiusDemo size="xl" px="22px" token="--radius-xl" />
          </div>
        </section>

        {/* ── SHADOWS ─────────────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            04 — Ombres
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <ShadowCard level="sh-1" token="--sh-1" desc="Cartes au repos" />
            <ShadowCard level="sh-2" token="--sh-2" desc="Cartes featured, éléments mis en avant" />
            <ShadowCard level="sh-3" token="--sh-3" desc="Sticky, drawers, modales" />
          </div>
        </section>

        {/* ── BREAKPOINTS ─────────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            05 — Breakpoints Tailwind (remplacent les défauts)
          </h2>
          <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  {['Alias', 'Min-width', 'Usage'].map((h) => (
                    <th
                      key={h}
                      className="p-4 text-left font-mono text-[10px] uppercase tracking-widest text-ink-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {breakpoints.map((bp) => (
                  <tr key={bp.name} className="transition-colors hover:bg-surface-2">
                    <td className="p-4 font-mono text-sm font-medium text-green">{bp.name}:</td>
                    <td className="p-4 font-mono text-sm text-ink">{bp.val}</td>
                    <td className="p-4 text-[13px] text-ink-2">{bp.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── DARK MODE TEST ───────────────────────────────── */}
        <section>
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-ink-3">
            06 — Dark mode test
          </h2>
          <div className="rounded-xl border border-line bg-surface p-8 shadow-1">
            <p className="mb-4 text-[15px] text-ink-2">
              Le toggle en haut à droite écrit{' '}
              <code className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-xs text-ink">
                data-theme=&quot;dark&quot;
              </code>{' '}
              sur{' '}
              <code className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-xs text-ink">
                &lt;html&gt;
              </code>{' '}
              et persiste dans{' '}
              <code className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-xs text-ink">
                localStorage[&apos;mc-theme&apos;]
              </code>
              . Le script anti-flash dans{' '}
              <code className="rounded bg-bg-sunken px-1.5 py-0.5 font-mono text-xs text-ink">
                &lt;head&gt;
              </code>{' '}
              restaure le thème avant le premier paint — aucun flicker au reload.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg border border-line bg-bg p-4">
                <p className="font-mono text-xs text-ink-3">--bg</p>
                <p className="text-sm text-ink">Fond page</p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-4">
                <p className="font-mono text-xs text-ink-3">--surface</p>
                <p className="text-sm text-ink">Carte</p>
              </div>
              <div className="rounded-lg border border-green bg-green-50 p-4">
                <p className="font-mono text-xs text-green-ink">--green-50 / --green</p>
                <p className="text-sm font-bold text-green">CTA zone</p>
              </div>
              <div className="rounded-lg border border-line bg-gold-50 p-4">
                <p className="font-mono text-xs text-gold-ink">--gold-50 / --gold</p>
                <p className="text-sm font-bold text-gold">Featured</p>
              </div>
              <div className="rounded-lg border border-line bg-red-50 p-4">
                <p className="font-mono text-xs text-red-ink">--red-50 / --red</p>
                <p className="text-sm font-bold text-red">18+ légal</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-6 text-center font-mono text-[11px] text-ink-3">
        Design System — usage interne uniquement — noindex
      </footer>
    </div>
  )
}
