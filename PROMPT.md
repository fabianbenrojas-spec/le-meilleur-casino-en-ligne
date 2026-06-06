# PROMPT — à coller dans Claude Code

Copie-colle le bloc ci-dessous dans Claude Code, à la racine d'un dossier contenant ce package `design_handoff_casino/`. Adapte la première ligne si ton repo Next.js existe déjà.

---

```
Je construis un site d'affiliation SEO dans la verticale casino en ligne (FR principal + EN), en Next.js (App Router) + Tailwind CSS + TypeScript, déployé sur Vercel, tracké via GA4/GTM.

Source de vérité design : le dossier ./design_handoff_casino/.
1. Lis ENTIÈREMENT design_handoff_casino/README.md.
2. Ouvre les maquettes de référence dans design_handoff_casino/reference/ — surtout "Bibliothèque de Composants.html" (catalogue de tous les composants + états) et les feuilles assets/*.css (valeurs exactes). Ce sont des maquettes HTML haute-fidélité : recrée-les en React + Tailwind au pixel près, ne copie pas le HTML tel quel.

Direction : « le Wirecutter du casino en ligne » — éditorial, sobre, sérieux. PAS de gradient/néon/glow. Vert = action/CTA, or = premium/featured (rare), rouge = légal uniquement.

Ordre d'implémentation :
A. Tokens : transpose le bloc :root de assets/site.css en variables CSS (globals.css) + tailwind.config (couleurs clair/sombre via [data-theme=dark], spacing base-4, radius, ombres sh-1/2/3, fonts Newsreader + Hanken Grotesk + JetBrains Mono). Dark mode persistant (localStorage "mc-theme").
B. Composants atomiques (voir §6 du README) AVANT les pages : CTAButton (primary/secondary/tertiary/disabled + états, hit≥48px, focus visible), ScorePill/ScoreRing/StarRating, BonusBadge, OperatorCard (podium/featured/cas-card/rank-card+médailles), ComparisonTable (sticky thead + tri), FilterSidebar+BottomSheet, ProsCons (✓/✗ + texte), FAQAccordion, Breadcrumbs, TableOfContents (scroll-spy), AuthorBio, Disclaimer18+, AffiliateDisclosure, ResponsibleGamblingBanner, StickyMobileCTA, NewsletterCTA, CookieConsentBanner (RGPD granulaire), LocaleSwitcher.
C. Layout global (topstrip 18+, header sticky, breadcrumbs, rg-banner, footer, sticky CTA mobile, cookie overlay).
D. Templates de page (voir §7) : homepage, review /casinos/{slug}/, comparatif /comparatifs/top-10.../, liste /casinos/, versus, alternative, catégorie jeux, fiche jeu, article guide, jeu-responsable.

Contraintes NON négociables :
- SEO : rendu côté serveur (SSR/SSG), AUCUN contenu critique injecté en JS post-load. Le JS ne fait que filtrer/trier/ouvrir. Hiérarchie H1→H2→H3 claire. Breadcrumbs partout sauf home. Hooks schema.org : Review, AggregateRating, FAQPage, ItemList, BreadcrumbList.
- Conformité : 18+ sur chaque page, affiliate disclosure visible sans scroll sur les reviews, bandeau jeu responsable footer permanent (Joueurs Info Service 09 74 75 13 13), cookies RGPD granulaire. Page /jeu-responsable SANS aucun CTA d'affiliation.
- Tracking GA4 : chaque élément interactif porte data-event + data-operator/placement/bonus/page-type/locale (voir §8 du README pour la liste d'events et les valeurs de data-placement). Ne code pas d'analytics en dur, GTM lit les data-*.
- Perf : mobile-first 375px, LCP<2s, CLS<0.05 (width/height fixes sur logos/images), INP<200ms. Logos en SVG/next-image.
- i18n FR/EN : slugs traduits par locale, hreflang, suggestion de langue non bloquante.
- a11y : AA partout / AAA body, focus visible, nav clavier, ARIA, jamais d'info par la couleur seule.

Les visuels (logos, screenshots jeux, illustrations, photos auteur) sont des placeholders rayés dans les maquettes — laisse des composants Image avec dimensions fixes en attendant les vrais assets.

Commence par me proposer l'arborescence du projet + le tailwind.config avec les tokens, puis attends ma validation avant de générer les composants.
```

---

## Tokens prêts à l'emploi (raccourci)

Si tu veux gagner du temps, voici les tokens déjà extraits — Claude Code peut les reprendre directement.

### `globals.css` (variables)
```css
:root{
  --bg:#FAFBFC; --bg-sunken:#F0F2F5; --surface:#FFFFFF; --surface-2:#F8FAFB;
  --ink:#0B0D0F; --ink-2:#3E424A; --ink-3:#71757E; --line:#E7E9ED; --line-2:#D7DAE0;
  --green:#0F6B3E; --green-700:#0C5733; --green-50:#ECF4EF; --green-ink:#0B4F2E;
  --gold:#B8893F; --gold-50:#F6EFE2; --gold-ink:#8A6526;
  --red:#C8322B; --red-50:#FBEDEC; --red-ink:#A52720; --star:#C9962E;
  --radius-sm:6px; --radius:10px; --radius-lg:16px; --radius-xl:22px;
  --sh-1:0 1px 2px rgba(15,18,28,.05),0 1px 1px rgba(15,18,28,.04);
  --sh-2:0 2px 4px rgba(15,18,28,.05),0 4px 12px rgba(15,18,28,.07);
  --sh-3:0 8px 24px rgba(15,18,28,.10),0 2px 6px rgba(15,18,28,.05);
}
[data-theme="dark"]{
  --bg:#0E0E10; --bg-sunken:#09090B; --surface:#18181B; --surface-2:#1E1E22;
  --ink:#F5F5F0; --ink-2:#C4C4BC; --ink-3:#8E8E86; --line:#2A2A2E; --line-2:#34343A;
  --green:#34B26B; --green-700:#2A9159; --green-50:#12241A; --green-ink:#6FD79C;
  --gold:#D6AC63; --gold-50:#271F12; --gold-ink:#E2BE7C;
  --red:#E2655E; --red-50:#2A1513; --red-ink:#F0938D; --star:#E5B94E;
  --sh-1:0 1px 2px rgba(0,0,0,.4); --sh-2:0 2px 8px rgba(0,0,0,.45); --sh-3:0 10px 30px rgba(0,0,0,.55);
}
```

### `tailwind.config.ts` (extrait — couleurs liées aux variables)
```ts
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:'var(--bg)', 'bg-sunken':'var(--bg-sunken)', surface:'var(--surface)', 'surface-2':'var(--surface-2)',
        ink:'var(--ink)', 'ink-2':'var(--ink-2)', 'ink-3':'var(--ink-3)', line:'var(--line)', 'line-2':'var(--line-2)',
        green:{DEFAULT:'var(--green)',700:'var(--green-700)',50:'var(--green-50)',ink:'var(--green-ink)'},
        gold:{DEFAULT:'var(--gold)',50:'var(--gold-50)',ink:'var(--gold-ink)'},
        red:{DEFAULT:'var(--red)',50:'var(--red-50)',ink:'var(--red-ink)'},
        star:'var(--star)',
      },
      borderRadius:{ sm:'6px', DEFAULT:'10px', lg:'16px', xl:'22px' },
      boxShadow:{ 1:'var(--sh-1)', 2:'var(--sh-2)', 3:'var(--sh-3)' },
      fontFamily:{
        serif:['Newsreader','Georgia','serif'],
        sans:['Hanken Grotesk','-apple-system','BlinkMacSystemFont','Segoe UI','sans-serif'],
        mono:['JetBrains Mono','ui-monospace','Menlo','monospace'],
      },
      maxWidth:{ site:'1200px' },
    },
  },
};
```

### Fonts (next/font ou `<link>`)
```
Newsreader (ital, 400/500/600), Hanken Grotesk (400/500/600/700/800), JetBrains Mono (400/500)
```
