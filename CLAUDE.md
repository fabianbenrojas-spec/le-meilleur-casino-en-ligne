# CLAUDE.md — le-meilleur-casino-en-ligne.fr

> Instructions persistantes pour ce projet. Ce fichier vit à la **racine du repo** Next.js
> et est lu en premier par Claude Code à chaque session.

---

## 🚨 SOURCE DE VÉRITÉ DESIGN — RÉORIENTATION

Le repo contient **DEUX dossiers de handoff design**. La règle est simple :

- ✅ **Source de vérité actuelle : `design_handoff_casino_revamp/`** (revamp v2, juin 2026)
- ⛔ **Obsolète : `design_handoff_casino/`** — référence historique uniquement,
  les templates v1 ne doivent plus être recréés à l'identique

Voir `design_handoff_casino_revamp/README.md` (lecture complète obligatoire) et
`design_handoff_casino_revamp/PROMPTS_CLAUDE_CODE.md` pour les prompts d'implémentation
par template.

**Pour les sessions de réalignement des templates, suivre `.claude/PROMPT_REALIGN.md`.**

---

## Projet

Site d'affiliation SEO, verticale **casino en ligne**, marchés **FR (principal) + EN**.
Objectif double : **maximiser la conversion vers les liens d'affiliation** ET **ranker
top 3** sur des requêtes commerciales ultra-concurrentielles. Stack : **Next.js 15
(App Router) + Tailwind + TypeScript**, déploiement **Vercel**, tracking **GA4 via GTM**.

Le repo est déjà construit en partie : tokens, chrome (header/footer/topstrip/breadcrumbs/
rg-banner/cookie-overlay), composants atomiques, helper GA4, pattern listing existent.
La phase active est le **réalignement des page-templates** sur le revamp v2.

---

## Direction visuelle — « le Wirecutter du casino »

Comparateur **éditorial, sobre, sérieux** (type Wirecutter / NerdWallet / Que Choisir),
pas l'esthétique néon-flashy du secteur. **Jamais** de gradient flashy, de néon, ni de glow.

- **Vert `#0F6B3E`** = action / CTA / positif (le seul accent d'action).
- **Or `#B8893F`** = premium / featured / top pick (**rare**, jamais en déco).
- **Rouge `#C8322B`** = légal uniquement (18+, warnings).
- Type : **Newsreader** (serif, titres) + **Hanken Grotesk** (sans, UI/body) + **JetBrains
  Mono** (chiffres/métas). Pas d'Inter, pas de Fraunces.
- Mobile-first : designer d'abord en **375px**.
- Tokens complets (clair + sombre, persistés `localStorage('mc-theme')`) — voir
  `design_handoff_casino_revamp/assets/site.css` (`:root` + `[data-theme="dark"]`).

---

## Règles NON négociables

### SEO

- Rendu **côté serveur** (SSR/SSG). **Aucun contenu critique injecté en JS post-load.**
  Le JS ne fait que filtrer/trier/ouvrir des éléments déjà dans le DOM.
- Hiérarchie **H1 → H2 → H3** claire et unique. Breadcrumbs sur **toute page sauf la home**.
- Pas de carrousel pour du contenu important.
- Hooks schema.org : `Review`, `AggregateRating`, `FAQPage`, `ItemList`, `BreadcrumbList`.
- i18n : slugs traduits par locale, `hreflang`, suggestion de langue **non bloquante**.

### Conformité (légal/éthique)

- **18+** visible sur **chaque** page (bandeau haut).
- **Affiliate disclosure** visible **sans scroll** sur chaque review
  (« Nous percevons une commission… sans incidence sur nos notes »).
- **Bandeau jeu responsable** permanent en footer + lien **Joueurs Info Service
  `09 74 75 13 13`** (FR) / GamCare + BeGambleAware (EN).
- **Cookies RGPD granulaire** : essentiels / analytics / marketing en toggles séparés ;
  refuser aussi simple qu'accepter ; **pas de dark pattern**.
- La page **/jeu-responsable ne contient AUCUN CTA d'affiliation**.
- Indicateurs visuels jamais **uniquement** par la couleur (✓/✗ + texte).

### Tracking GA4 (CRITIQUE)

- Chaque élément interactif porte `data-event` + `data-operator` / `data-placement` /
  `data-bonus` / `data-page-type` / `data-locale`. GTM lit les `data-*` ;
  **pas d'analytics en dur**.
- Events clés : `affiliate_click` (critique, `data-placement` distinct par zone),
  `review_click`, `internal_link`, `toc_click`, `responsible_gaming_click`,
  `dark_mode_toggle`, `locale_switch`, `newsletter_submit`, `faq_open`.
- `data-placement` est ce qui permet de mesurer **quels modules convertissent** —
  ne JAMAIS le remplacer par une valeur générique.
- Les redirections d'affiliation passent par `/go/[operator]`.
- Zones cliquables larges (≥ 44-48 px sur mobile).

### Accessibilité & performance

- Contraste **AA partout, AAA body**. Focus visible sur tous les CTA, navigation
  clavier, ARIA labels.
- Cibles : **LCP < 2 s**, **CLS < 0.05** (width/height fixes sur logos/images),
  **INP < 200 ms**.
- Logos opérateurs en **SVG / `next/image`** (WebP/AVIF), dimensions fixes.

### Animations

- Toute animation d'entrée gated `@media (prefers-reduced-motion: no-preference)`.
- **État de base TOUJOURS visible** — pas d'`opacity: 0` initial qui pourrait laisser
  un élément invisible si l'animation ne se déclenche pas.
- Privilégier `transform` uniquement (pas d'opacity dans les transitions critiques).

---

## Templates de page — état & cibles

Cible (revamp v2, route → maquette de référence) :

| Route                                      | Maquette                                          | État actuel                           | Priorité |
| ------------------------------------------ | ------------------------------------------------- | ------------------------------------- | -------- |
| `app/[locale]/page.tsx`                    | `Homepage FR.html`                                | À réaligner (hero/matchmaker v2)      | P0       |
| `app/[locale]/casinos/[slug]/page.tsx`     | `Modele Avis Casino.html` / `Avis Cresus v2.html` | À réaligner (version éditoriale)      | P0       |
| `app/[locale]/comparatifs/[slug]/page.tsx` | `Versus Cresus vs Lucky8 v2.html`                 | À réaligner                           | P1       |
| `app/[locale]/jeux/[categorie]/page.tsx`   | `Machines a sous v2.html`                         | À réaligner                           | P1       |
| `app/[locale]/bonus/page.tsx`              | `Bonus v2.html`                                   | À réaligner (réutilise le matchmaker) | P1       |
| `app/[locale]/guides/[slug]/page.tsx`      | `Modele Article Guide.html`                       | À réaligner                           | P2       |
| `app/[locale]/guides/page.tsx`             | `Guides.html`                                     | À réaligner                           | P2       |

Le **simulateur (matchmaker)** existe en v1 (`components/homepage/homepage-quiz.tsx` —
3 questions). La v2 est un **composant à 8 questions avec scoring pondéré
7 opérateurs × 10 critères**, partagé entre la homepage et la page bonus — voir
README revamp section 4.2 + `assets/home2.js`. **À refaire intégralement**, pas à
étendre l'existant.

---

## Style de travail

- Reproduire les maquettes **au pixel près** (high-fi). Les visuels sont des
  placeholders (`.logo-ph` rayé) → composants `next/image` à dimensions fixes en
  attendant les vrais assets.
- Avant un gros chantier (tokens, nouveau template), proposer le plan et attendre
  validation explicite.
- **Une étape à la fois.** Commit après chaque étape. Si le contexte devient lourd,
  s'arrêter proprement, ne pas enchaîner.
- Ne pas réintroduire de dépendances sans nécessité ; réutiliser le design system
  et les composants déjà présents dans `components/`.
- **Ne jamais modifier les fichiers de `design_handoff_casino_revamp/assets/`** —
  ce sont la spec, en lecture seule.
