# Handoff — Refonte des templates · le-meilleur-casino-en-ligne.fr

> Package de référence design pour implémentation sur le site live (Next.js / App Router) via Claude Code.
> Généré le 12 juin 2026.

---

## 1. À lire en premier

**Les fichiers de ce dossier sont des références de design réalisées en HTML/CSS/JS** — des prototypes haute-fidélité qui montrent l'apparence et le comportement attendus. **Ce ne sont PAS des fichiers de production à copier tels quels.**

La tâche : **recréer ces maquettes dans le codebase existant** (`le-meilleur-casino-en-ligne`, Next.js App Router, TypeScript, i18n FR/EN) en utilisant ses patterns établis — composants React/TSX, système de traduction, conventions de tracking GA4, structure `app/[locale]/…`. **Ne pas introduire de nouvelle librairie** sans nécessité ; réutiliser le design system du repo.

**Fidélité : HAUTE (hifi).** Couleurs, typographie, espacements, rayons, ombres et interactions sont définitifs. Reproduire au pixel près, mais avec les composants/tokens du codebase.

### Méthode recommandée

Implémenter **un template par session Claude Code**, dans cet ordre (du plus structurant au plus dépendant) :

1. **Tokens & assets partagés** — vérifier `assets/site.css` (variables CSS) contre vos tokens existants ; porter le moteur du **simulateur** (`assets/home2.js`).
2. **Homepage** (`Homepage FR.html`)
3. **Avis casino** (`Modele Avis Casino.html`)
4. **Catégorie de jeux** (`Machines a sous v2.html`)
5. **Comparatif / Versus** (`Versus Cresus vs Lucky8 v2.html`)
6. **Bonus** (`Bonus v2.html`)
7. **Guide / Article** (`Modele Article Guide.html`) + **Index Guides** (`Guides.html`)

Prompt-type pour Claude Code :

> « Lis `design_handoff_casino_revamp/README.md` puis `Versus Cresus vs Lucky8 v2.html` + `assets/versus2.css` + `assets/versus2.js`. Recrée cette page dans `app/[locale]/comparatifs/[slug]/page.tsx` en React/TSX avec nos composants et notre i18n. Conserve tous les attributs `data-event`/`data-operator`/`data-placement`/`data-bonus` GA4. Remplace les `.logo-ph` par nos vrais logos. N'ajoute aucune dépendance. »

---

## 2. Design system (tokens partagés)

Tous les tokens vivent dans **`assets/site.css`** (`:root` + `[data-theme="dark"]`). Valeurs clés :

### Couleurs

| Token                                                | Clair                                   | Usage                                                     |
| ---------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| `--green`                                            | `#1f8a5b` (vert principal)              | **Action / CTA** uniquement                               |
| `--green-50`                                         | fond vert pâle                          | surfaces de bonus / surlignage gagnant                    |
| `--gold`                                             | `#b8893a` env.                          | **Premium / featured** (rare), pastilles de score gagnant |
| `--red`                                              | rouge légal                             | **Uniquement 18+ / avertissements**                       |
| `--ink` / `--ink-2` / `--ink-3`                      | texte primaire / secondaire / tertiaire |
| `--bg` / `--surface` / `--surface-2` / `--bg-sunken` | fonds                                   |
| `--line` / `--line-2`                                | bordures                                |
| `--star`                                             | jaune étoiles d'avis                    |

**Logique couleur (à respecter strictement) :** vert = action, or = premium/rare, rouge = légal seulement. **Pas de dégradés, pas de glow** — la marque est volontairement sobre/éditoriale (cible FR 30-55, confiance YMYL/EEAT).

### Typographie

| Famille                   | Variable  | Usage                           |
| ------------------------- | --------- | ------------------------------- |
| **Newsreader** (serif)    | `--serif` | Titres, chiffres clés, verdicts |
| **Hanken Grotesk** (sans) | `--sans`  | UI, corps de texte              |
| **JetBrains Mono**        | `--mono`  | Données, labels, eyebrows       |

Importées via Google Fonts (voir `<head>` de n'importe quel template). Échelle de titres : `clamp()` responsive. **Texte ≥ 14px** partout ; corps d'article 16-17px.

### Espacements / formes

- Rayons : `--radius-sm` → `--radius-xl` (≈ 6 / 10 / 14 / 18 px)
- Largeur max contenu : `--maxw` (≈ 1200px), `--header-h` pour le sticky
- Ombres : `--sh-1` (subtile) → `--sh-3` (forte)

### Thème sombre

Toggle dans le header (`[data-action="theme-toggle"]`) → bascule `data-theme` sur `<html>`, persisté en `localStorage('mc-theme')`. Tous les tokens ont leur équivalent sombre.

---

## 3. Conventions transverses (présentes sur CHAQUE template)

### Tracking GA4 (CRITIQUE — à conserver à l'identique)

Chaque lien d'action porte des `data-*` lus par `assets/site.js` qui pousse dans `dataLayer` :

```html
<a
  data-event="affiliate_click"
  data-operator="cresus"
  data-placement="versus_hero"
  data-bonus="200_euros"
  data-page-type="versus"
  data-locale="fr"
  >…</a
>
```

- `data-event` : `affiliate_click` (clic bonus sortant), `review_click`, `internal_link`, `toc_click`, `responsible_gaming_click`, `dark_mode_toggle`, `locale_switch`…
- `data-placement` : identifie l'emplacement précis (`versus_hero`, `review_sidebar`, `sticky_bar`, `homepage_matchmaker`, `versus_section_bonus`…). **Indispensable pour mesurer quels modules convertissent.**
- Le `<body>` porte `data-page-type` et `data-locale`.
- Les redirections d'affiliation passent par la route `/go/[operator]` du repo.

### Chrome commun (header, footer, bandeaux légaux)

Identiques sur toutes les pages — à factoriser en layout/composants partagés :

- **`.topstrip`** : bandeau 18+ + ligne d'aide Joueurs Info Service + date MàJ.
- **`.site-header`** : logo, nav (Casinos / Comparatifs / Jeux / Bonus / Guides), recherche, toggle thème, sélecteur de langue FR/EN, menu mobile.
- **`.breadcrumbs`** : fil d'Ariane.
- **`.rg-banner`** : bandeau jeu responsable (avant footer).
- **`.site-footer`** : 4 colonnes de liens + disclosure d'affiliation + 18+.
- **`.cookie-overlay`** : consentement granulaire (essentiels / audience / marketing).
- **Placeholders `.logo-ph`** (motif rayé) = emplacements pour vos **vrais logos/visuels**.

### Composants atomiques réutilisés

`.btn` (`.btn-primary` vert, `.btn-secondary`, `.btn-tertiary`, `.btn-sm`, `.btn-block`), `.score-pill` (`.gold`/`.win-pill`), `.score-ring` (anneau conique), `.faq-list` (accordéon, géré par `site.js`), `.checks`, `.mini-cta`, `.recap`.

### Barres collantes de conversion

Plusieurs templates ont une **barre fixe en bas** (CTA bonus + lien alternatives) qui apparaît après le hero via IntersectionObserver sur un `[data-…-sentinel]`. Pattern à reproduire (CSS `transform: translateY(115%)` → `.show`).

---

## 4. Templates livrés

> Captures dans `screenshots/`. Fichiers HTML + CSS/JS dans ce dossier.

### 4.1 — Homepage · `Homepage FR.html`

**Route cible :** `app/[locale]/page.tsx`
**Objectif :** ranker sur « meilleur casino en ligne », distribuer l'autorité SEO (maillage interne dense), convertir via le simulateur.

- **Hero deux colonnes** : à gauche H1 (« Trouvez le _meilleur casino en ligne_ pour vous ») + lede + indicateurs de confiance ; à droite **le simulateur** (remplit la colonne, pas d'espace vide).
- **Podium top-3** + tableau/cartes des top casinos.
- **Bloc de maillage interne `.hp-mesh`** : 4 cartes cliquables (Top casinos avec pastilles de score · Bonus · Jeux · Guides), chaque colonne finie par un bouton sombre « Voir tout ».
- **Section SEO long-form `.hp-seo`** autour de « meilleur casino en ligne » + liste de critères `.hp-seo-list` (4 cartes alignées : icône + terme gras + description).
- CSS/JS : `assets/site.css`, `assets/home2.css`, `assets/home2.js`.

### 4.2 — Le simulateur (« matchmaker ») — partagé Homepage + Bonus

**Le composant le plus logique du package — porter la logique, pas l'apparence à l'œil.** Défini dans `assets/home2.js`.

- **Quiz en 8 questions** : priorité → préférence bonus → jeux → moyen de paiement → langue → mobile/desktop → plafond de retrait → profil joueur. Barre de progression (8 points), boutons « Retour » et « Recommencer ».
- **Bascule de mode** : « Meilleur casino » / « Meilleur bonus ».
- **Scoring pondéré, déterministe :** tableau `OPS` (7 opérateurs × 10 critères notés 0-100 : `bonus, payout, games, live, crypto, wager, support, lang, mobile, cashout`) + tableau `QUESTIONS` (chaque réponse applique des poids `w` sur des critères). Score = `note×1.25` (base légère) + Σ(valeur_critère × poids). Le mode « bonus » repondère fortement sur `bonus`.
- **Le gagnant varie réellement** selon le profil (vérifié) : équilibré→Cresus, gros bonus→Magical Spin, crypto+live→Wild Sultan, wager bas/débutant→888, support+FR→Lucky8, mobile+crypto→Madnix. **Chaque opérateur est un spécialiste** — ne pas remettre des scores « tous excellents » qui referaient gagner Cresus à chaque fois.
- Rend : carte gagnant (logo, score, % de match, bonus, « pourquoi », gros CTA `affiliate_click` placement `homepage_matchmaker`, lien avis) + 3 alternatives cliquables.
- **Important rendu :** l'état visible est l'état de base ; l'animation d'entrée (`mmFade`) est gated `@media (prefers-reduced-motion: no-preference)` et **n'anime que le `transform`** (jamais l'opacité depuis 0) — sinon le contenu peut rester invisible si l'animation ne tourne pas. À conserver en React (état initial visible).

### 4.3 — Avis casino · `Modele Avis Casino.html` (exemple rempli : `Avis Cresus v2.html`)

**Route cible :** `app/[locale]/casinos/[slug]/page.tsx`
**Objectif :** version **éditoriale** retenue ; conçue pour du contenu long (SEO) + conversion + maillage.

- **Hero éditorial** : à gauche identité + note + verdict ; à droite **carte « deux chemins »** (Obtenir le bonus / Comparer aux alternatives) qui remplit l'espace — pas de vide à droite.
- **Sommaire horizontal collant** + scroll-spy.
- Sections d'avis longues (verdict, bonus, ludothèque, paiements, support, VIP, sécurité…).
- **Bandes de maillage interne** pleine largeur : types de jeux (6 tuiles), jeux populaires (6 fiches + boutons Fiche/Jouer), « dans nos comparatifs », casinos similaires, alternatives.
- **Bloc de bifurcation final** « bonus ou alternative » + **barre bonus collante**.
- Pensé pour s'allonger : la structure encaisse beaucoup plus de texte.
- CSS/JS : `assets/site.css`, `assets/review.css`, `assets/review2.css`, `assets/review2.js`.

### 4.4 — Catégorie de jeux · `Machines a sous v2.html`

**Route cible :** `app/[locale]/jeux/[categorie]/page.tsx`
**Objectif :** réutilisable pour toute catégorie (machines à sous, roulette, live, jackpots…).

- Hero de catégorie + filtres avancés, grille de jeux filtrable, contenu SEO long-form en bas, maillage vers fiches jeux / casinos / guides, CTA conversion.
- CSS/JS : `assets/site.css`, `assets/jeux.css`, `assets/jeux2.css`, `assets/jeux2.js`.

### 4.5 — Comparatif / Versus · `Versus Cresus vs Lucky8 v2.html`

**Route cible :** `app/[locale]/comparatifs/[slug]/page.tsx` (format X-vs-Y)
**Objectif :** **option A « Éditorial » retenue** (sobre, façon presse spécialisée).

- Hero face-à-face deux panneaux (gagnant accentué).
- Tableau « en un coup d'œil », puis **6 critères** : barres tête-à-tête animées au scroll, analyse par casino, « à retenir », verdict, détails repliables (tweak ouverts/repliés).
- **Simulateur de wager** (« ce que 35× coûte vraiment ») : curseur → volume à miser + coût théorique par casino selon le RTP.
- **Barre de comparaison collante** (deux CTA bonus).
- **Bloc « Ni l'un ni l'autre ? »** → 3 alternatives cliquables.
- Panneau de tweaks (accent gagnant vert/or, détails ouverts/repliés) — mécanisme de revue design, pas nécessaire en prod (mais l'accent gagnant peut devenir une prop).
- CSS/JS : `assets/site.css`, `assets/versus2.css`, `assets/versus2.js`.

### 4.6 — Bonus · `Bonus v2.html`

**Route cible :** `app/[locale]/bonus/page.tsx`
**Objectif :** filtrage avancé, gros CTA, contenu bas de page, et **le même simulateur 8 questions** que la homepage (a remplacé l'ancien finder à 3 questions).

- Hero + simulateur partagé (centré, 860px), grille de bonus filtrable, sections long-form, maillage.
- CSS/JS : `assets/site.css`, `assets/bonus2.css`, `assets/bonus2.js`, **+ `assets/home2.css` & `assets/home2.js`** (simulateur).

### 4.7 — Guide / Article · `Modele Article Guide.html` (exemples : `Article Wager Pieges v2.html`, `Guide RTP et Volatilite v2.html`, `Guide Retraits Rapides v2.html`)

**Route cible :** `app/[locale]/guides/[slug]/page.tsx` (ou `/blog/[slug]`)
**Objectif :** long format SEO, engageant, conçu pour s'allonger fortement à l'avenir.

- **TL;DR** en tête + **boutons de résumé IA** (résumer l'article sur un LLM — voir comportement dans `article2.js`).
- **Sommaire cliquable** (lisible, sans saut de ligne) + scroll-spy pour parcourir l'article.
- **Simulateurs/calculateurs interactifs** intégrés (ex. mode wager / RTP).
- **Maillage interne croisé** : vers casinos, types de jeux, autres guides.
- **Barre bonus collante** + CTA conversion.
- CSS/JS : `assets/site.css`, `assets/article.css`, `assets/article2.css`, `assets/article2.js`.

### 4.8 — Index Guides · `Guides.html`

**Route cible :** `app/[locale]/guides/page.tsx`
**Objectif :** fédérer le maillage interne (forte valeur SEO) — regroupe tous les guides par catégorie + mise en avant.

- CSS/JS : `assets/site.css`, `assets/guides.css`.

---

## 5. Interactions & comportements à reproduire

| Comportement                               | Où                          | Note d'implémentation                                                                   |
| ------------------------------------------ | --------------------------- | --------------------------------------------------------------------------------------- |
| **Quiz simulateur** (8 étapes, scoring)    | Homepage, Bonus             | Porter `OPS`/`QUESTIONS`/scoring en state React. Déterministe, testable.                |
| **Scroll-spy** (sommaire actif)            | Avis, Guides                | IntersectionObserver sur les sections, `rootMargin` ≈ `-28% 0px -62%`.                  |
| **Barres animées au scroll**               | Versus                      | Ajout d'une classe `.in` quand le critère entre dans le viewport → largeur via `--w`.   |
| **Barre collante** (apparition après hero) | Avis, Versus, Bonus, Guides | IntersectionObserver sur un sentinel ; `translateY` → `.show`.                          |
| **Simulateur de wager**                    | Versus, Guides              | `volume = bonus × wager` ; `coût ≈ volume × (1 − RTP)`.                                 |
| **FAQ accordéon**                          | Avis, catégories            | Géré par `site.js` (`[data-faq]`, `aria-expanded`).                                     |
| **Toggle thème** clair/sombre              | Header (toutes)             | `data-theme` + `localStorage('mc-theme')`.                                              |
| **Boutons résumé IA + TL;DR**              | Guides                      | Voir `article2.js`. Brancher sur vos endpoints LLM réels en prod.                       |
| **Filtres** (jeux, bonus)                  | Catégorie, Bonus            | Filtrage live côté client ; envisager SSR/searchParams en Next.                         |
| **Animations d'entrée**                    | global                      | Toujours gater `@media (prefers-reduced-motion: no-preference)` ; état de base visible. |

---

## 6. État (state) requis (côté React)

- **Thème** : `light | dark` (persisté localStorage).
- **Simulateur** : `mode` (casino/bonus), `answers` (objet par clé de question), `step` (0-7), `result` (opérateur classé). Recalcul pur à partir de `answers` + `OPS`.
- **Versus** : accent gagnant (`green|gold`), détails ouverts/repliés (peuvent rester des détails natifs `<details>` ou state).
- **Filtres catégorie/bonus** : critères sélectionnés → liste filtrée (idéalement via `searchParams`).
- **Barres/scroll-spy/barre collante** : pilotés par IntersectionObserver (pas de state lourd).
- **Données opérateurs/jeux/bonus** : actuellement en dur dans les maquettes → **à brancher sur vos sources de données réelles** (CMS / DB / fichiers du repo).

---

## 7. Assets

- **Polices** : Newsreader, Hanken Grotesk, JetBrains Mono (Google Fonts — déjà dans le repo probablement ; sinon `next/font`).
- **Icônes** : SVG inline (stroke `currentColor`) — réutiliser tels quels ou mapper sur votre lib d'icônes.
- **Logos / visuels** : **placeholders `.logo-ph`** dans les maquettes → remplacer par vos vrais logos d'opérateurs et visuels de jeux.
- **Aucune image bitmap** n'est requise par les maquettes (tout est CSS/SVG).

## 8. Fichiers de ce package

**Templates (HTML) :** `Homepage FR.html`, `Modele Avis Casino.html`, `Avis Cresus v2.html`, `Machines a sous v2.html`, `Versus Cresus vs Lucky8 v2.html`, `Bonus v2.html`, `Modele Article Guide.html`, `Article Wager Pieges v2.html`, `Guide RTP et Volatilite v2.html`, `Guide Retraits Rapides v2.html`, `Guides.html`.

**Assets (`assets/`) :** `site.css`, `site.js`, `home2.css`, `home2.js`, `versus2.css`, `versus2.js`, `review.css`, `review2.css`, `review2.js`, `jeux.css`, `jeux2.css`, `jeux2.js`, `article.css`, `article2.css`, `article2.js`, `guides.css`, `bonus2.css`, `bonus2.js`.

**Captures :** dossier `screenshots/` (une vue représentative par template).

> Pour ouvrir une maquette en local : ouvrir le `.html` dans un navigateur (les chemins `assets/…` sont relatifs ; les `?v=` éventuels sont ignorés à l'ouverture fichier).
