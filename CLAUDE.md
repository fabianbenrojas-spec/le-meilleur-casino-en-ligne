# CLAUDE.md — le-meilleur-casino-en-ligne.fr

Instructions persistantes pour ce projet. Déposer ce fichier à la **racine du repo** Next.js. Pour la spec design détaillée, voir `design_handoff_casino/README.md` + les maquettes dans `design_handoff_casino/reference/`.

## Projet
Site d'affiliation SEO, verticale **casino en ligne**, marchés **FR (principal) + EN**. Objectif double et indissociable : **maximiser la conversion vers les liens d'affiliation** ET **ranker top 3** sur des requêtes commerciales ultra-concurrentielles. Stack : **Next.js (App Router) + Tailwind + TypeScript**, déploiement **Vercel**, tracking **GA4 via GTM**.

## Direction visuelle — « le Wirecutter du casino »
Comparateur **éditorial, sobre, sérieux** (type Wirecutter / NerdWallet / Que Choisir), pas l'esthétique néon-flashy du secteur. **Jamais** de gradient flashy, de néon, ni de glow.
- **Vert `#0F6B3E`** = action / CTA / positif (le seul accent d'action).
- **Or `#B8893F`** = premium / featured / top pick (rare, jamais en déco).
- **Rouge `#C8322B`** = légal uniquement (18+, warnings).
- Type : **Newsreader** (serif, titres) + **Hanken Grotesk** (sans, UI/body) + **JetBrains Mono** (chiffres/métas). Pas d'Inter, pas de Fraunces.
- Tokens complets (clair + sombre) : voir `design_handoff_casino/PROMPT.md` (prêts pour `globals.css` + `tailwind.config`). Dark mode persistant (localStorage `mc-theme`).
- Mobile-first : designer d'abord en **375px**.

## Règles NON négociables

### SEO
- Rendu **côté serveur** (SSR/SSG). **Aucun contenu critique injecté en JS post-load.** Le JS ne fait que filtrer/trier/ouvrir des éléments déjà dans le DOM.
- Hiérarchie **H1 → H2 → H3** claire et unique. Breadcrumbs sur **toute page sauf la home**.
- Pas de carrousel pour du contenu important.
- Hooks schema.org : `Review`, `AggregateRating`, `FAQPage`, `ItemList`, `BreadcrumbList`.
- i18n : slugs traduits par locale, `hreflang`, suggestion de langue **non bloquante**.

### Conformité (légal/éthique)
- **18+** visible sur **chaque** page (bandeau haut).
- **Affiliate disclosure** visible **sans scroll** sur chaque review (« Nous percevons une commission… sans incidence sur nos notes »).
- **Bandeau jeu responsable** permanent en footer + lien **Joueurs Info Service `09 74 75 13 13`** (FR) / GamCare + BeGambleAware (EN).
- **Cookies RGPD granulaire** : essentiels / analytics / marketing en toggles séparés ; refuser aussi simple qu'accepter ; **pas de dark pattern**.
- La page **/jeu-responsable ne contient AUCUN CTA d'affiliation**.
- Indicateurs visuels jamais **uniquement** par la couleur (✓/✗ + texte).

### Tracking GA4
- Chaque élément interactif porte `data-event` + `data-operator` / `data-placement` / `data-bonus` / `data-page-type` / `data-locale`. GTM lit les `data-*` ; **pas d'analytics en dur**.
- Events : `affiliate_click` (critique, `data-placement` distinct par zone), `review_click`, `comparison_filter_use`, `comparison_sort_use`, `toc_click`, `faq_open`, `scroll_depth`, `locale_switch`, `newsletter_submit`, `dark_mode_toggle`.
- Zones cliquables larges (≥44–48px sur mobile).

### Accessibilité & performance
- Contraste **AA partout, AAA body**. Focus visible sur tous les CTA, navigation clavier, ARIA labels.
- Cibles : **LCP < 2 s**, **CLS < 0.05** (width/height fixes sur logos/images), **INP < 200 ms**.
- Logos opérateurs en **SVG / `next/image`** (WebP/AVIF), dimensions fixes.

## Composants & pages
Construire les **composants atomiques avant les pages** (catalogue : `design_handoff_casino/reference/Bibliothèque de Composants.html`). 11 templates : homepage, review `/casinos/{slug}/`, comparatif `/comparatifs/...`, liste `/casinos/`, versus, alternative, catégorie jeux, fiche jeu, article guide, jeu-responsable. Détail + routes : §6–7 du README.

## Style de travail
- Reproduire les maquettes **au pixel près** (high-fi). Les visuels sont des placeholders → composants `Image` à dimensions fixes en attendant les vrais assets.
- Avant un gros chantier (tokens, nouveau template), proposer le plan et attendre validation.
