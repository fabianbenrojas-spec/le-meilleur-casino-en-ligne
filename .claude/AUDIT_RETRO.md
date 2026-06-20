# Audit rétrospectif — Réalignement v2

> Produit le 2026-06-15. Lecture seule — aucune modification avant validation explicite.
> Source de vérité : `design_handoff_casino_revamp/` (maquettes HTML + assets).

---

## Phase 0 — État git

| Branche active                  | `chore/add-revamp-handoff-and-realign`                                  |
| ------------------------------- | ----------------------------------------------------------------------- |
| Dernier commit d'implémentation | `04613e3` — Étape 7 (guides templates)                                  |
| Templates mergés                | Homepage, Versus, Avis Casino, Jeux, Bonus, Guide Article, Index Guides |
| Tests                           | `npm test` → 8/8 PASS (CasinoMatchmaker)                                |

---

## Phase A — Audit par template

### A0 — CasinoMatchmaker ✅ CONFORME

- OPS 7 × 10 critères : valeurs identiques au spec `home2.js`
- QUESTIONS 8 × options/weights : identiques
- Formule `s = op.note * 1.25 + Σ(val × weight)` : conforme
- Mode bonus `s = s * 0.4 + op.c.bonus * 0.9` : conforme
- `matchPct` clamp 64–98 : conforme
- Tests 8/8 PASS : 6 profils → 6 gagnants distincts, mode bonus → magical_spin, unicité ✅

---

### A1 — Homepage (`app/[locale]/page.tsx`)

**❌ Sections manquantes**

- `hp-toplinks` : 4 liens compacts opérateurs (sous le hero, au-dessus du matchmaker)
- `cat-grid` : 5 tuiles catégories de jeux

**➕ Sections extra**

- `Top10Table` component : absent de la maquette v2

**⚠️ Divergences structurelles**

- `hp-seo` : 4 ancres internes toutes pointent vers `#criteres`, maquette a des liens vers sections éditoriales distinctes
- `blog-grid` : guides permanents dans la maquette → section news/blog dans le repo
- FAQ : 4 questions vs 5 dans la maquette, sélection différente
- Ordre des sections diverge de la maquette

**⚠️ Tracking**

- `data-placement="hero_podium"` : à confirmer dans les internals de `PodiumCard`
- Schema.org : possible double injection `ItemList`

---

### A2 — Avis Casino (`app/[locale]/casinos/[slug]/page.tsx`)

**❌ Sections manquantes**

- `review-section#methode` : bloc EEAT "méthode de test" (rv-method, 8 critères)
- `review-section#pour-qui` : rv-profiles (✓ Idéal si / ✓ Bon choix si / ✗ À éviter si)

**⚠️ Divergences structurelles**

- Sub-nav (`ReviewSubNav`) : manquent les ancres `#types`, `#jeux-pop`, `#comparatifs`, `#similaires`
- `#similaires` (maquette) → `#alternatives` (TSX) : ancre renommée, les liens internes dans le contenu qui ciblent `#similaires` ne matchent pas
- `rv-band#comparatifs` (standalone, 4 liens : top10 / versus_lucky8 / versus_wild / alternatives_page) → bloc inline après `securite` avec seulement 2 liens versus (altOps)
- Band types de jeux : après `jeux` dans le TSX, après `securite` dans la maquette
- Band jeux populaires : conditionnel sur section `live` dans le TSX (section inexistante dans le modèle de données ?) — doit être revu

**⚠️ Tracking — divergences `data-placement`**

- `"sticky_bar"` (maquette) → `"review_sticky_bar"` (TSX, valeur par défaut du composant)
- `"review_game_[gamename]"` par jeu (maquette) → `"review_game_card"` générique (TSX)

**⚠️ Schema.org**

- JSON-LD : `Review` uniquement, pas d'`AggregateRating`
- `FAQPage` : injecté via `FAQAccordion includeSchema` ✅
- `BreadcrumbList` : absent (composant `<Breadcrumbs>` ne génère pas de JSON-LD)

---

### A3 — Jeux (`app/[locale]/jeux/[category]/page.tsx`)

**❌ Fonctionnalité manquante**

- Bouton "Jeu au hasard" (`data-event="game_random_pick"`) absent du `GameGrid`

**⚠️ Divergences `data-placement`**

- `"category_hero_spotlight"` (maquette) → `"category_hero_spot"` (TSX, tronqué)
- `"category_game_tile"` (maquette) → `"category_grid"` (TSX, renommé dans `GameGrid`)

**⚠️ Divergence `data-page-type`**

- `"category"` (maquette, toutes les zones) → `"jeux_categorie"` (TSX)
- Pas nécessairement un bug (plus précis), mais écart par rapport au spec

**⚠️ Schema.org**

- `ItemList` : absent (pas de JSON-LD sur cette page)
- `BreadcrumbList` : absent

---

### A4 — Versus (`app/[locale]/versus/[slug]/page.tsx`)

**❌ Problèmes bloquants**

- Hero non responsive mobile : grille fixe `1fr 70px 1fr` (pas de breakpoint)
- `prefers-reduced-motion` non appliqué aux animations de barres (aussi un bug de la spec)
- `BreadcrumbList` JSON-LD absent

**⚠️ Divergences `data-placement`**

- `"versus_verdict"` (maquette) → `"versus_final_winner"` / `"versus_alt"` (TSX)
- `"versus_section_[critère]"` pour micro-CTAs dans les blocs critères : absent du TSX

**⚠️ Divergences structurelles**

- Tableau critères : colonne critère centrée (maquette) vs gauche (TSX)
- 5 critères dans le TSX vs 6 dans la maquette (manquent : support client, mobile)

---

### A5 — Bonus (`app/[locale]/bonus/page.tsx`)

**❌ Fonctionnalité manquante**

- Mobile filter sheet (maquette : `#bnSheetOverlay` avec `sheet-head` / `sheet-body` / boutons Réinitialiser + Voir N bonus) : absent du `BonusFilterClient`

**⚠️ Divergences structurelles**

- `bn-types` (chips de filtre : Sans dépôt, Tours gratuits, Cash, Rechargement, VIP, Cashback) au-dessus de la liste dans la maquette → les cartes d'explications bonus sont dans la section éditoriale longue en dessous de la liste dans le TSX. Deux rôles différents (filtre vs information).
- Le `BonusFilterClient` a des chips de type, mais seulement 2 (Bienvenue, Tours gratuits) et ce sont des filtres, pas les mêmes catégories que la maquette

**⚠️ Divergences `data-placement`**

- `"bonus_listing"` (maquette) → `"bonus_card"` (TSX)
- `"bonus_content_ilink"` : présent dans le TSX, absent de la maquette (ajout extra)

**⚠️ Schema.org**

- `ItemList` : absent
- `BreadcrumbList` : absent
- `FAQPage` : `FAQAccordion` sans `includeSchema` (pas passé en prop) → absent ❌

---

### A6 — Guide Article (`app/[locale]/guides/[slug]/page.tsx`) — Étape 7

**❌ Placement manquant**

- `data-placement="article_inline"` : CTAs inline dans le corps des sections (maquette ligne 182) → non implémenté dans le TSX (les sections sont du contenu CMS sans CTA intégré)

**⚠️ Divergences structurelles**

- `art2-summary` (`data-spy`) : maquette a un scroll-spy sur le sommaire in-body → TSX rend en `<nav>` statique avec spans numérotés (pas de scroll-spy)
- Acceptable : le TOC latéral `TableOfContents` fait le scroll-spy, la duplication serait confuse

**⚠️ Schema.org**

- `BreadcrumbList` : absent
- `FAQPage` : `FAQAccordion includeSchema` → présent ✅ (prop passée)
- `Article` / `BlogPosting` JSON-LD : absent de la maquette, mais attendu pour l'EEAT — aucune des deux versions ne l'a

---

### A7 — Index Guides (`app/[locale]/guides/page.tsx`) — Étape 7

**⚠️ Divergences structurelles**

- `gx-topics` : 5 chips dans la maquette (pas de "Légal") → 6 dans le TSX (Légal ajouté)
- Compteur de résultats `<b id="guideCount">N</b> guides` au-dessus de la grille : absent du TSX
- Toolbar dans `gx-head` (même section que le hero) dans la maquette → toolbar dans `GuideSearchClient` (après le hero dans le flux) dans le TSX

**⚠️ Schema.org**

- `BreadcrumbList` : absent

---

### A8 — Références v1 (`design_handoff_casino/`)

- Dossier marqué obsolète dans CLAUDE.md ✅
- Aucune page ne charge de composants spécifiques à v1 d'après les imports
- À surveiller : ne pas recréer les templates v1 à l'identique

---

### A9 — Vérification transversale

**BreadcrumbList universellement absent**
Aucun template n'injecte de JSON-LD `BreadcrumbList`. Le composant `<Breadcrumbs>` rend du HTML uniquement. Priorité haute SEO.

**`prefers-reduced-motion`**

- Animations d'entrée : état de base `opacity: 0` vérifié → absent des nouveaux templates (OK)
- Versus : barres animées non gated (bug de la spec aussi)
- CasinoMatchmaker : transitions CSS sur hover seulement, pas de motion de chargement → OK

**Liens d'affiliation**

- Tous passent par `op.affiliateUrl` (lui-même via `/go/[operator]`) ✅
- `noopener noreferrer nofollow` systématique ✅

**Conformité légale**

- AffiliateDisclosure présent sur les pages review/bonus/jeux ✅
- Pas de CTA affilié sur `/jeu-responsable` (page non auditée ici mais confirmé par CLAUDE.md)
- 18+ : via bandeau header (site.css topstrip) ✅

---

## Phase B — Plan de remédiation

### 🔴 Bloquants conformité / légal

| Réf  | Template | Action                                                                                                                                                                                                 |
| ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| B-C1 | Tous     | ~~Injecter JSON-LD `BreadcrumbList` dans `<Breadcrumbs>`~~ **DÉJÀ IMPLÉMENTÉ** (composant `ui/breadcrumbs.tsx` lignes 20–36 — audit initial basé sur un mauvais chemin grep)                           |
| B-C2 | Bonus    | ~~Passer `includeSchema` à `FAQAccordion` dans `bonus/page.tsx`~~ **DÉJÀ CONFORME** — défaut `includeSchema = true` dans le composant, FAQPage injecté sans le prop. Commit e8176ae revert en d3f952f. |
| B-C3 | Versus   | Corriger hero responsive : remplacer `grid-cols-[1fr_70px_1fr]` par breakpoints mobile-first                                                                                                           |

### 🔴 Bloquants tracking (conversion)

| Réf  | Template    | Action                                                                                                                                               |
| ---- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| B-T1 | Avis Casino | Renommer `"review_sticky_bar"` → `"sticky_bar"` dans le composant `ReviewStickyBar` (valeur par défaut), ou passer le prop explicitement             |
| B-T2 | Avis Casino | Remplacer `"review_game_card"` par `"review_game_[gameName]"` dans les game cards                                                                    |
| B-T3 | Versus      | Renommer `"versus_final_winner"` / `"versus_alt"` → `"versus_verdict"`                                                                               |
| B-T4 | Versus      | ~~Ajouter `"versus_section_[critère]"` sur les micro-CTAs dans chaque bloc critère~~ **FAIT** (2026-06-16) — pas de CTA rendu sur les critères `tie` |
| B-T5 | Jeux        | Renommer `"category_hero_spot"` → `"category_hero_spotlight"`                                                                                        |
| B-T6 | Jeux        | Renommer `"category_grid"` → `"category_game_tile"` dans `GameGrid`                                                                                  |
| B-T7 | Bonus       | Renommer `"bonus_card"` → `"bonus_listing"` dans `BonusFilterClient`                                                                                 |
| B-T8 | Jeux        | ~~Renommer `"comparison_filter_use"` → `"game_random_pick"` sur le bouton Aléatoire (`GameGrid`)~~ **FAIT** (2026-06-16)                             |

### 🟡 Écarts structurels (sections manquantes)

| Réf  | Template    | Action                                                                                                                                                                                                                                                                                                                                                                                                |
| ---- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B-S1 | Avis Casino | ~~Ajouter `review-section#methode` (EEAT : 8 critères de test) dans les sections dynamiques ou en hardcodé après la section `securite`~~ **FAIT** (2026-06-16)                                                                                                                                                                                                                                        |
| B-S2 | Avis Casino | ~~Ajouter `review-section#pour-qui` (rv-profiles : 2 ✓ + 1 ✗) après `methode`~~ **FAIT** (2026-06-16)                                                                                                                                                                                                                                                                                                 |
| B-S3 | Avis Casino | ~~Ajouter `#methode` et `#pour-qui` dans les ancres sub-nav + TOC_ITEMS~~ **FAIT** (2026-06-16)                                                                                                                                                                                                                                                                                                       |
| B-S4 | Homepage    | ~~Ajouter `hp-toplinks` (4 liens opérateurs compacts) et `cat-grid` (5 tuiles catégories)~~ **FAIT** (2026-06-16) — `hp-toplinks` dérivé de `TOP_10.slice(0,4)`, `cat-grid` dérivé de `config/games.ts`. Subtitles count (2 840/120/85/340/62) volontairement omis sur les tuiles cat-grid : placeholders maquette non sourcés, contraires au positionnement éditorial vérifiable (voir compte-rendu) |
| B-S5 | Homepage    | ~~Revoir section `blog-grid` pour correspondre au pattern "guides permanents" de la maquette~~ **FAIT** (2026-06-16) — section "BLOG" (3 articles datés, /blog/) remplacée par section "Guides essentiels" (3 guides permanents : bonus-casino/rtp/paiements, /guides/), readTime réel au lieu d'une date inventée                                                                                    |
| B-S6 | Jeux        | ~~Ajouter bouton "Jeu au hasard" dans `GameGrid`~~ **DÉJÀ CONFORME** (fonctionnalité présente : `handleRandom`, scroll + flash `.jx-flash`) — seul le `data-event` divergeait, voir B-T8                                                                                                                                                                                                              |
| B-S7 | Bonus       | ~~Ajouter mobile filter sheet dans `BonusFilterClient`~~ **FAIT** (2026-06-16) — backdrop + sheet head/body/foot, body lock, ESC, focus trap, trigger avec dot indicator                                                                                                                                                                                                                              |
| B-S8 | Bonus       | ~~Revoir position des `bn-types` (chips filtre au-dessus de la liste vs info cards en bas)~~ **FAIT** (2026-06-16) — chips + tri dupliqués dans le sheet mobile (`<lg`), inline desktop (`≥lg`), même state React. Scope volontairement restreint à la responsivité ; pas d'extension aux 6 catégories de la maquette (voir B-FS1)                                                                    |
| B-S9 | Versus      | ~~Ajouter 2 critères manquants (support client, mobile) dans la table~~ **FAIT** (2026-06-16) — contenu sourcé `review-content.ts`, `displayMode: 'label'` (pas de score inventé), data dans `config/versus-extra-crits.ts`                                                                                                                                                                           |

### 🟢 Détails visuels / mineurs

| Réf  | Template     | Action                                                                                   |
| ---- | ------------ | ---------------------------------------------------------------------------------------- |
| B-V1 | Avis Casino  | Revoir position band jeux-pop (après `#types`, pas après `live`)                         |
| B-V2 | Avis Casino  | Aligner `rv-band#comparatifs` sur 4 liens (top10, 2 versus, alternatives)                |
| B-V3 | Index Guides | Ajouter compteur de résultats `N guides` au-dessus de la grille dans `GuideSearchClient` |
| B-V4 | Versus       | Aligner colonne critère : centré → gauche                                                |
| B-V5 | Schema.org   | Ajouter `ItemList` sur les pages listing (Jeux, Bonus)                                   |
| B-V6 | Tous         | Audit `data-page-type` : harmoniser `"category"` vs `"jeux_categorie"`                   |

---

### 🔵 Future Scope (hors lot actuel)

| Réf   | Template               | Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B-FS1 | Bonus                  | La maquette prévoit 4 groupes de filtres (montant, conditions de mise, type, paiement) ; le code actuel n'a qu'un groupe (type) + tri. À traiter quand la data et la stratégie éditoriale pour les buckets de valeurs seront définies (ex : montant "< 50€", "50-100€", "100-500€", "> 500€").                                                                                                                                                                                                                                                                                                                                                                       |
| B-FS2 | Homepage               | Aligner `hp-mesh` col3 ("Types de jeux", 4 catégories sans Crash, const locale hardcodée dans `page.tsx`) sur les 5 catégories de `cat-grid` (dérivées de `config/games.ts`) — ou inverse. Incohérence visible pour un utilisateur qui scroll (4 puis 5 catégories sur la même page). Décision éditoriale à trancher avant correction.                                                                                                                                                                                                                                                                                                                               |
| B-FS3 | Editorial / Jeux       | Counts non sourcés persistant ailleurs sur le site (retirés du `cat-grid` homepage, voir B-S4) : `hp-mesh` col3 (homepage) ; `app/[locale]/jeux/[category]/page.tsx` — meta description, affichage `{cat.count}+`, bloc catégories liées `{c.count}+ jeux`. Les valeurs 2840/120/85/340/62 viennent de placeholders maquette, jamais sourcées. Décision éditoriale à trancher : retrait global / sourcing réel / reformulation honnête ("Découvrir", "Plus de X"). Critique pour les pages catégorie qui sont des hubs SEO dont la meta description est exposée dans les SERPs Google. À traiter avec B-FS2 (alignement cat-grid / hp-mesh) qui touche la même zone. |
| B-FS4 | Versus                 | Critère "Expérience" (`05`, `app/[locale]/comparatifs/[slug]/page.tsx`) reste cosmétique : `barA`/`barB` dérivés de `op.features.length`, sans winner mesurable au sens factuel (juste "plus de features listées"), contrastant avec les 6 autres critères désormais tous sourcés (note, bonus, RTP, paiements, support, mobile). À refondre ou remplacer dans un futur lot.                                                                                                                                                                                                                                                                                         |
| B-FS5 | CSS                    | ~43 usages décoratifs de `color-mix()` (bordures et teintes sur cards/badges, ex. `operator-card.tsx`, `bonus-badge.tsx`, `filter-sidebar.tsx`) sans fallback. Impact visuel mineur si ignoré par le navigateur (élément garde son fond/bordure de base). À factoriser dans un lot dédié si besoin d'uniformisation, non prioritaire.                                                                                                                                                                                                                                                                                                                                |
| B-FS6 | Editorial              | `rd.faq Q2` de Magical Spin mentionne explicitement "Wild Sultan ou Cresus" comme alternatives crypto, violant la règle §7 EDITORIAL_CONVENTIONS (pas de mention de concurrent). À traiter lors d'une session de revue des FAQ de tous les opérateurs (potentielles violations similaires ailleurs).                                                                                                                                                                                                                                                                                                                                                                 |
| B-FS7 | Data hygiène           | `horus-casino.withdrawalSpeed` mis à `'standard'` par défaut (2026-06-20), sans donnée source dans `features`/`pros`/`cons`. À vérifier lors du prochain test concret de Horus Casino : tester un retrait réel, mesurer le délai, puis corriger la valeur si nécessaire.                                                                                                                                                                                                                                                                                                                                                                                             |
| B-FS8 | Maintenance éditoriale | Eyebrows des 4 nouveaux hubs SEO (sans-kyc, retrait-instantane, francais, rtp-eleve) contiennent l'année '2026' hardcodée. À transformer en computed value (new Date().getFullYear()) ou réviser tous les eyebrows en janvier 2027.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| B-FS9 | Editorial / Jeux       | Les 7 catégories de jeux existantes (machines-a-sous, roulette, blackjack, live, crash, jackpot-progressif, video-poker) n'ont pas de prose éditoriale longue (`guideBody`). Le champ existe depuis le commit R2 Wave 1, mais n'a pas été backfillé pour ces catégories. À enrichir progressivement pour cohérence EEAT site-wide (priorité P3 — nouvelles catégories passent en premier).                                                                                                                                                                                                                                                                           |

---

## Statut

- Phase 0 ✅
- Phase A ✅ (8 templates + matchmaker + transversal)
- Phase B ✅ (plan rédigé)

**⛔ STOP — En attente de `go remédiation [réf]` explicite avant toute modification.**
