Handoff — le-meilleur-casino-en-ligne.fr

Package de référence design pour reconstruire le site dans ton environnement cible (**Next.js + Tailwind CSS + GA4 via GTM**, déploiement Vercel).

---

## 1. À propos de ces fichiers

Les fichiers dans `reference/` sont des **maquettes haute-fidélité réalisées en HTML/CSS/JS vanilla**. Ce ne sont **pas** du code de production à copier tel quel : ce sont la **source de vérité visuelle et comportementale**. Ta tâche = **recréer ces maquettes dans le codebase Next.js** en composants React + Tailwind, en reprenant **exactement** les valeurs (couleurs, typo, espacements, rayons, ombres), la structure des pages, les interactions et la convention de tracking.

**Fidélité : HIGH-FI.** Couleurs, typo, spacing et interactions sont définitifs. Reproduis au pixel près. Les visuels (logos opérateurs, screenshots de jeux, illustrations, photos auteur) sont des **placeholders rayés** : remplace-les par les vrais assets (SVG logos via `next/image`, dimensions fixes pour CLS).

### Comment attaquer avec Claude Code
1. Lis **toute** cette doc + ouvre `reference/Bibliothèque de Composants.html` (catalogue de tous les atomes) et `reference/Direction Visuelle.html` (système).
2. Implémente d'abord les **design tokens** (§4) dans `tailwind.config` + un layer CSS de variables.
3. Construis les **composants atomiques** (§6) avant les pages.
4. Assemble les **templates de page** (§7).
5. Câble la **convention GA4** (§8) et la **conformité** (§9) — non négociables.

---

## 2. Positionnement (à garder en tête pour chaque décision)

« **Le Wirecutter du casino en ligne** » : comparateur éditorial **sérieux**, pas l'esthétique néon-flashy du secteur. Sobriété = confiance = meilleur EEAT (YMYL gambling) et meilleure conversion sur une cible FR 30-55 ans.
**Règles d'or :** pas de gradient flashy, pas de néon, pas de glow. La couleur sert la hiérarchie et la conversion, jamais la déco. Le vert = action. L'or = premium/featured (rare). Le rouge = légal uniquement (18+, warnings).

---

## 3. Stack & architecture cibles

- **Next.js** (App Router conseillé) + **Tailwind CSS** + TypeScript.
- **i18n FR/EN** : slugs traduits par locale (FR `/casinos/`, `/comparatifs/` — EN `/casinos/`, `/comparisons/`), `hreflang`, pas de redirection auto agressive (suggestion non bloquante).
- **GA4 via Google Tag Manager** : aucun code analytics en dur, GTM lit les `data-*` (voir §8).
- **Données opérateurs/jeux** : modélise-les (CMS ou fichiers) et **rends le contenu côté serveur (SSR/SSG)** — surtout tableaux et fiches. **Aucun contenu critique injecté en JS post-load** (contrainte SEO forte). Le JS ne fait que filtrer/trier/ouvrir des éléments déjà dans le DOM.
- **Schema.org** à injecter : `Review`, `AggregateRating`, `FAQPage`, `ItemList` (classements), `BreadcrumbList`. Les structures de page sont déjà pensées pour ça.

---

## 4. Design tokens

Les tokens existent en **mode clair (défaut)** et **mode sombre** (`[data-theme="dark"]`). Le dark mode est togglable et **persistant** (localStorage clé `mc-theme`). Source complète : `reference/assets/site.css` (bloc `:root` / `[data-theme="dark"]`).

### Couleurs — clair / sombre

| Token | Clair | Sombre | Usage |
|---|---|---|---|
| `--bg` | `#FAFBFC` | `#0E0E10` | Fond de page (blanc légèrement froid) |
| `--bg-sunken` | `#F0F2F5` | `#09090B` | Sections en retrait, fonds de chips |
| `--surface` | `#FFFFFF` | `#18181B` | Cartes, tableaux, conteneurs |
| `--surface-2` | `#F8FAFB` | `#1E1E22` | En-têtes de tableau, fonds secondaires |
| `--ink` | `#0B0D0F` | `#F5F5F0` | Titres, texte principal |
| `--ink-2` | `#3E424A` | `#C4C4BC` | Texte courant |
| `--ink-3` | `#71757E` | `#8E8E86` | Métas, légendes, captions |
| `--line` | `#E7E9ED` | `#2A2A2E` | Bordures |
| `--line-2` | `#D7DAE0` | `#34343A` | Bordures appuyées, inputs |
| `--green` | `#0F6B3E` | `#34B26B` | **Primary / CTA / positif** |
| `--green-700` | `#0C5733` | `#2A9159` | Hover du primary |
| `--green-50` | `#ECF4EF` | `#12241A` | Fonds verts (badges bonus, pros) |
| `--green-ink` | `#0B4F2E` | `#6FD79C` | Texte vert sur fond clair |
| `--gold` | `#B8893F` | `#D6AC63` | **Premium / featured / étoiles** |
| `--gold-50` | `#F6EFE2` | `#271F12` | Fond or (top pick) |
| `--gold-ink` | `#8A6526` | `#E2BE7C` | Texte or |
| `--red` | `#C8322B` | `#E2655E` | **Légal uniquement** (18+, warnings) |
| `--red-50` | `#FBEDEC` | `#2A1513` | Fond alerte |
| `--red-ink` | `#A52720` | `#F0938D` | Texte rouge |
| `--star` | `#C9962E` | `#E5B94E` | Remplissage étoiles |

> Contraste : viser **AA partout, AAA sur le body text**. Le vert `#0F6B3E` passe AAA sur blanc et porte du texte blanc en bouton.

### Typographie
- **Titres / voix éditoriale** : `Newsreader` (serif Google). Poids 400/500/600 + italique. *(Choix assumé vs Fraunces : Newsreader lit « presse », moins « startup ».)*
- **UI / body / data** : `Hanken Grotesk` (sans Google). Poids 400→800. *(Évite Inter, cliché du secteur.)*
- **Chiffres « durs » / métas** : `JetBrains Mono` (RTP, dates MÀJ, licences) — signale la donnée vérifiée.
- Fallbacks : `Georgia, serif` / `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` / `ui-monospace, Menlo, monospace`.

**Échelle type** (desktop) : H1 `clamp(30–60px)/500/-.02em` · H2 `clamp(27–40px)/500` · H3 `~20–23px/600/700` · body `16–17.5px/1.6–1.7` · small `13–14px` · mono meta `11–12px/.05em uppercase`. Min absolu sur slides 24px ; ici body jamais < 13px.

### Spacing — base 4px
`4 · 8 · 16 · 24 · 32 · 52 · 80` (xs → section). Mappe sur l'échelle Tailwind (1=4px).

### Radius
`--radius-sm 6px` (inputs, chips) · `--radius 10px` (boutons, badges) · `--radius-lg 16px` (cartes) · `--radius-xl 22px` (héros, modales).

### Ombres (discrètes, jamais de glow)
- `--sh-1` : `0 1px 2px rgba(15,18,28,.05), 0 1px 1px rgba(15,18,28,.04)` — cartes au repos
- `--sh-2` : `0 2px 4px rgba(15,18,28,.05), 0 4px 12px rgba(15,18,28,.07)` — cartes featured
- `--sh-3` : `0 8px 24px rgba(15,18,28,.10), 0 2px 6px rgba(15,18,28,.05)` — sticky, drawers, modales
(versions sombres dans `site.css`.)

### Breakpoints (mobile-first, designer d'abord en 375px)
`≤420` (petit mobile) · `≤620` · `≤760` (bascule mobile : nav→burger, sticky CTA visible, table→scroll-x) · `≤860/920` (tablette : sidebars empilées, bottom-sheet filtres) · `≤1080` (grilles réduites). `--maxw: 1200px`, gouttière 32px desktop / 18px mobile.

---

## 5. Layout global (présent sur quasi toutes les pages)

Ordre vertical type :
1. **`.topstrip`** — bandeau 18+ noir : badge `18+`, message risques (tronqué en ellipsis si étroit), lien Joueurs Info Service `09 74 75 13 13`, date MÀJ (`.right`, cachée mobile).
2. **`.site-header`** (sticky, `--header-h: 64px`) — logo `le·meilleur·casino`, nav (Casinos, Comparatifs, Jeux, Bonus, Guides), bouton recherche, **toggle dark mode**, **LocaleSwitcher** (drapeau + FR ▾), burger mobile.
3. **`.breadcrumbs`** — sur toute page **sauf** la home (+ schema BreadcrumbList).
4. Contenu de la page.
5. **`.rg-banner`** — bandeau jeu responsable permanent (rouge doux) : 18+, numéro d'aide, logos orgs (Joueurs Info Service / ANJ / GamCare).
6. **`.site-footer`** — sitemap par silo + **affiliate disclosure** (`.aff-disc`) + mentions légales.
7. **`.sticky-cta`** — barre CTA fixe bas d'écran **mobile uniquement** (apparaît après le hero via IntersectionObserver sur `[data-sticky-sentinel]`).
8. **`.cookie-overlay`** — bandeau cookies RGPD granulaire (s'affiche si pas de choix en localStorage `mc-consent`).

---

## 6. Catalogue de composants atomiques

Réfère-toi à `reference/Bibliothèque de Composants.html` pour le rendu live de chacun (variantes + états). CSS source dans `reference/assets/*.css`.

| Composant | Classe(s) | Variantes / états | Notes |
|---|---|---|---|
| **CTAButton** | `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-tertiary` / `.btn-disabled` ; modifs `.btn-sm` `.btn-block` `.btn-stack` | default / hover / focus-visible / active / disabled | Hit target ≥48px (40px en `-sm`), focus visible obligatoire, flèche `.arr` animée au hover. Primary = conversion uniquement. |
| **RatingDisplay** | `.score-pill` (+`.gold`), `.score-ring` (anneau `conic-gradient`), `.rating` + `.stars` + `.grade` + `.cnt` | note /10, étoiles, nb d'avis | Pill gold = top pick. Ring : `background: conic-gradient(var(--green) {note*10}%, var(--line) 0)`. |
| **BonusBadge** | `.bonus-badge` (+`.gold`) | `.blab` label, `.bamt` montant (serif), `.bcond` conditions wager | Montant en avant, wager en mini-texte (transparence). |
| **OperatorCard** | `.podium-card` (hero top-3) · `.opcard.featured` · `.cas-card` (listing) · `.rank-card` (mini-fiche classée, `data-medal="1..3"`) | featured / comparison-row / compact / ranked | Médailles : or #1, argent #2, bronze #3. `.is-top` = mise en avant. |
| **ComparisonTable** | `table.cmp` | thead `position:sticky` (top `--header-h`), `th.sortable`, cellule `td.win` (versus) | Tri JS sur `data-col`/`data-type`/`data-sort`. Mobile : wrap `overflow-x:auto` (ou cartes empilées — voir §11). |
| **FilterSidebar / BottomSheet** | `.filters`, `.fopt` (checkbox custom), `.rtp-row` (slider), `.fchip` (chip actif), `.sheet`/`.sheet-overlay` | desktop sticky / mobile bottom-sheet | **Une seule source d'inputs** déplacée dans le sheet en mobile (évite les doublons d'ID). Logique OR intra-groupe, AND inter-groupes. |
| **ProsConsBox** | `.proscons` > `.pros` / `.cons` | — | Icône ✓/✗ **+ texte** (accessibilité : ne pas reposer que sur la couleur). |
| **FAQAccordion** | `[data-faq] .faq-item` (+`.open`), `.faq-q`, `.faq-a` | ouvert / fermé | Animation `max-height`. Prévoir schema **FAQPage**. |
| **Breadcrumbs** | `.breadcrumbs` | — | + schema BreadcrumbList. |
| **TableOfContents** | `.toc` (review) / `.art-toc` (article), sticky + **scroll-spy** (IntersectionObserver → `.active`) ; mobile `<details>` drawer | — | Article : + barre de progression de lecture. |
| **AuthorBio** | `.author-bio` | — | Photo, nom, crédentials, **date dernière MÀJ + prochain re-test** (EEAT). |
| **Disclaimer 18+** | `.topstrip` / encart `.disclaimer.d-18` | — | Présent en haut de chaque page. |
| **AffiliateDisclosure** | `.aff-strip` (review, sans scroll) / `.aff-disc` (footer) | — | « Nous percevons une commission… » visible sans scroll sur les reviews. |
| **ResponsibleGamblingBanner** | `.rg-banner` | — | Footer permanent + lien Joueurs Info Service. |
| **StickyMobileCTA** | `.sticky-cta` | — | Mobile only, bonus du contexte + bouton. |
| **NewsletterCTA** | `.newsletter` + `.nl-form` | — | `data-event="newsletter_submit"`. |
| **CookieConsentBanner** | `.cookie-overlay` > `.cookie`, `.toggle-sw` | essentiels (forcé) / analytics / marketing | RGPD granulaire, refuser = accepter (pas de dark pattern). |
| **LocaleSwitcher** | `.locale` + `.locale-btn` + `.locale-menu` | FR / EN | Drapeau + code ; relie aux hreflang. |

**Placeholders** (à remplacer) : `.logo-ph` (logos opérateurs), `.game-thumb`/`.gd-shot` (visuels jeux), `.art-cover`/`.blog-thumb` (illustrations), `.avatar` (photos auteur). Tous rayés + label mono. Garder **width/height fixes** au remplacement (CLS < 0.05).

**Iconographie** : style ligne (Lucide/Phosphor), pas d'illustration cartoon casino. Les SVG inline des maquettes sont des icônes Lucide-like ; en React, importe `lucide-react`.

---

## 7. Templates de page (routes + structure)

> Chaque fichier `reference/*.html` correspond à un template. Lis-les pour le détail au pixel.

1. **Homepage** — `Homepage FR.html` → `/`
   Hero (H1 avec **slot animé** faisant défiler les noms d'opérateurs, largeur fixe = zéro CLS, désactivé si `prefers-reduced-motion`) + trust row · **podium top 3** (n°1 traité or) · tableau Top 10 triable · grille catégories · **quiz « Trouvez le casino »** (3 questions → reco) · guides · méthodologie/EEAT + stats + AuthorBio · blog · FAQ · newsletter.

2. **Review opérateur** — `Review Cresus.html` → `/casinos/{slug}/`
   Hero review (logo, **score-ring**, étoiles, méta licence/fondation/devises/langues, **bonus en énorme**, CTA primary + « Lire l'avis ») · aff-disclosure sous hero · **sidebar sticky** (carte CTA + TOC scroll-spy) · verdict express · ProsCons · **9 sections normalisées** (Bonus, Ludothèque, Live, Paiements, Support, Mobile, VIP, Sécurité…) chacune H2 + **mini-CTA contextuel** · tableau récap · FAQ · AuthorBio · alternatives (3) · CTA final · sticky CTA mobile.

3. **Comparatif Top X** — `Comparatif Top 10.html` → `/comparatifs/top-10-casinos-en-ligne/`
   H1 + intro méthodo + méta/auteur · tableau triable · **10 mini-fiches `.rank-card`** (médailles) avec verdict + 3 forts/1 faible + bonus + 2 CTA · section **critères de notation** (6 familles, poids %) · FAQ · AuthorBio.

4. **Liste casinos + filtres** — `Liste Casinos.html` → `/casinos/`
   FilterSidebar desktop / BottomSheet mobile · tri (note/bonus/RTP/A-Z) synchronisé · **filtrage live** + compteur + chips actifs + état vide · 12 `.cas-card`.

5. **Versus** — `Versus Cresus vs Lucky8.html` → `/comparatifs/{x}-vs-{y}/`
   Hero symétrique 2 panneaux + badge VS · **table face-à-face** (cellule gagnante surlignée) · sections thématiques split-view avec **badge gagnant par section** (vert = A, violet = B, gris = nul) · verdict « Choisissez X si… / Y si… » · **2 CTA côte à côte**.

6. **Alternative à X** — `Alternatives - Cresus.html` → `/alternatives/{slug}/`
   Intro empathique « Pourquoi chercher une alternative ? » · tableau 6 alternatives · mini-fiches avec **callout « Pourquoi l'envisager »** contextuel par casino.

7. **Catégorie jeux** — `Categorie Machines a sous.html` → `/jeux/{categorie}/`
   H1 + intro · **grille de jeux filtrable** (pills fournisseur) + tri (RTP/populaires/A-Z) · tags RTP, hover-play · section **« Où jouer »** (top casinos) · guide RTP/volatilité.

8. **Fiche jeu** — `Fiche Sweet Bonanza.html` → `/jeux/{categorie}/avis/{slug}/`
   Hero (screenshot, nom, fournisseur, **stats RTP/volatilité/max win**, **« Jouer en démo » + « Jouer en argent réel sur {meilleur casino} »**) · présentation · specs techniques · fonctionnalités bonus · avis · **« Où jouer à {jeu} »** (top 3-5 casinos).

9. **Article / guide** — `Article ANJ 2026.html` → `/guides/{slug}/` (et `/blog/`)
   Hero éditorial (catégorie, lead serif, byline + partage, cover) · **TOC sticky + scroll-spy + barre de progression** · prose (H2/H3, pullquote, encadré « À retenir », CTA inline opérateur, listes ✓/numérotées, note-box) · FAQ · articles liés.

10. **Jeu responsable** — `Jeu Responsable.html` → `/jeu-responsable/`
    Ligne d'écoute mise en avant · signaux d'alerte · outils (limites, auto-exclusion) · **auto-évaluation interactive** (3 questions → message adapté) · ressources FR/international. ⚠️ **Aucun CTA d'affiliation sur cette page** (volontaire, EEAT/éthique).

11. **Bibliothèque de composants** — `Bibliothèque de Composants.html` (interne, pas en prod)
    Catalogue de tous les atomes + états + convention GA4 par composant. Sert de référence d'implémentation.

---

## 8. Convention GA4 (data-attributes)

Chaque élément interactif porte des `data-*` standardisés ; GTM les lit pour pousser dans `dataLayer`. Le `site.js` de référence contient un **shim** qui logue les events en console (à retirer en prod, GTM prend le relais).

Exemple (bouton bonus) :
```html
<a data-event="affiliate_click"
   data-operator="cresus"
   data-placement="hero_podium"
   data-bonus="200_euros"
   data-page-type="homepage"
   data-locale="fr"> Obtenir le bonus </a>
```
Le shim transforme tout attribut `data-x` (sauf `data-event`) en paramètre `x` de l'event nommé par `data-event`.

**Events à supporter nativement :**
`affiliate_click` (critique — chaque bouton bonus, avec `data-placement` distinct par zone : `hero_podium`, `top10_table`, `review_hero`, `review_sidebar`, `review_section_{nom}`, `sticky_mobile`, `review_final_cta`, `comparatif_card`, `casinos_listing`, `versus_verdict`, `game_hero_real`, `game_where_to_play`, `article_inline`…) · `review_click` · `comparison_filter_use` · `comparison_sort_use` · `toc_click` · `faq_open` · `scroll_depth` (25/50/75/100) · `locale_switch` · `newsletter_submit` · `dark_mode_toggle` · (`cookie_consent`, `rg_selftest_complete` en bonus).
Zones cliquables larges et explicites (jamais de bouton <44px sur mobile).

---

## 9. Conformité (non négociable, à intégrer au design)

- **18+** visible sur **chaque** page (bandeau haut).
- **Affiliate disclosure** visible **sans scroll** sur les reviews (« Nous percevons une commission… cela n'influence pas nos notes »).
- **Jeu responsable** : bandeau footer permanent + lien Joueurs Info Service (FR `09 74 75 13 13`) / GamCare + BeGambleAware (EN).
- **Bandeau cookies RGPD granulaire** : essentiels / analytics / marketing en toggles séparés ; refus aussi simple qu'acceptation ; pas de dark pattern.
- Indicateurs visuels **jamais uniquement par la couleur** (✓/✗ + texte).

---

## 10. Accessibilité & performance (cibles)

- Contraste **AA partout, AAA body**. Navigation clavier complète, focus visible sur tous les CTA, ARIA labels sur composants interactifs. Pas de texte en image.
- **Mobile-first absolu** (≥75% du trafic). **LCP < 2 s** (hero léger, pas de carrousel lourd, pas de vidéo en background), **CLS < 0.05** (dimensions réservées pour images/logos), **INP < 200 ms** (filtres/tri performants).
- Logos opérateurs en **SVG** ou `next/image` (WebP/AVIF) avec `width`/`height` fixes.

---

## 11. Points où trancher avec le client (décisions ouvertes)

- **Table top-10 en mobile** : les maquettes utilisent le **scroll horizontal**. Le brief demandait à l'origine des **cartes empilées**. À confirmer (le scroll-x est plus dense, l'empilement plus lisible).
- **Slot animé du H1 homepage** : décoratif ; garder le mot-clé exact « meilleur casino en ligne » dans le H1 sémantique stable.

---

## 12. Manifeste des fichiers (`reference/`)

**Feuilles de styles** (`reference/assets/`) :
- `site.css` — **tokens + tous les composants partagés + layout global + responsive**. À transposer en premier (tokens → tailwind.config, composants → composants React).
- `site.js` — shim GA4, toggle thème (persistant), LocaleSwitcher, menu mobile, sticky CTA (IO), tri table, FAQ, quiz finder, cookies, newsletter, scroll-depth.
- `review.css` · `comparatif.css` · `casinos.css` · `jeux.css` · `article.css` — styles spécifiques par template.
- `library.css` — chrome de la galerie (interne).

**Pages** : `Homepage FR.html`, `Review Cresus.html`, `Comparatif Top 10.html`, `Liste Casinos.html`, `Versus Cresus vs Lucky8.html`, `Alternatives - Cresus.html`, `Categorie Machines a sous.html`, `Fiche Sweet Bonanza.html`, `Article ANJ 2026.html`, `Jeu Responsable.html`, `Bibliothèque de Composants.html`, `Direction Visuelle.html` (système).

> Démarre par `PROMPT.md` (à coller dans Claude Code), puis `Bibliothèque de Composants.html` + `site.css`.
