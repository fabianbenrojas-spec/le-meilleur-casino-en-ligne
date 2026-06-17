# Prompts Claude Code — implémentation des templates

> Déroulez ces prompts **dans l'ordre**, **un seul à la fois**, depuis la racine du repo `le-meilleur-casino-en-ligne`, avec Claude Code.
> Après chaque étape : vérifiez la page sur une preview, committez, puis passez à la suivante.
> Le dossier `design_handoff_casino_revamp/` est une **référence design** (HTML/CSS/JS), pas du code à copier tel quel — il faut **recréer** les maquettes en React/TSX avec les patterns du repo.

---

## Règles valables pour TOUS les prompts (Claude Code doit les respecter)

- Recréer la maquette **au pixel près** avec nos composants/tokens existants ; **ne pas** importer le HTML/CSS tel quel ni ajouter de dépendance.
- **Conserver tous les attributs GA4** : `data-event`, `data-operator`, `data-placement`, `data-bonus`, `data-page-type`, `data-locale`. Les redirections d'affiliation passent par `/go/[operator]`.
- **Externaliser tous les textes FR** dans notre système d'i18n (FR + EN).
- Remplacer les placeholders `.logo-ph` par nos vrais logos/visuels.
- Brancher les données en dur des maquettes sur nos **sources réelles** (CMS/DB/fichiers du repo).
- Respecter la logique couleur : **vert = action, or = premium (rare), rouge = légal/18+ uniquement** ; pas de dégradés ni de glow.
- Gater toute animation d'entrée en `@media (prefers-reduced-motion: no-preference)` ; **état de base toujours visible**.
- Supporter le thème clair/sombre (`data-theme` + `localStorage('mc-theme')`).

---

## Étape 0 — Tokens partagés + chrome commun

```
Lis design_handoff_casino_revamp/README.md (sections 2 et 3) et design_handoff_casino_revamp/assets/site.css + assets/site.js.

1. Compare les variables CSS de site.css (:root et [data-theme="dark"]) à nos tokens existants. Crée/aligne nos tokens (couleurs, typo Newsreader/Hanken Grotesk/JetBrains Mono, rayons, ombres, --maxw, --header-h) sans casser l'existant. Liste les écarts avant de modifier.
2. Vérifie/implémente les éléments de chrome partagés en composants réutilisables : topstrip 18+, site-header (nav + recherche + toggle thème + sélecteur FR/EN + menu mobile), breadcrumbs, rg-banner (jeu responsable), site-footer (4 colonnes + disclosure affiliation), cookie-overlay (consentement granulaire).
3. Implémente le helper de tracking GA4 qui lit les data-* et pousse dans dataLayer (équivalent de site.js), et le toggle de thème persistant.

Ne touche pas encore aux pages. Montre-moi le diff des tokens et la liste des composants de chrome créés.
```

---

## Étape 1 — Le simulateur (« matchmaker »)

```
Lis design_handoff_casino_revamp/README.md (section 4.2) et assets/home2.js.

Porte le simulateur en un composant React réutilisable (ex. <CasinoMatchmaker mode />), utilisé ensuite par la homepage et la page bonus :
- Quiz 8 questions (priorité, bonus, jeux, paiement, langue, mobile/desktop, plafond de retrait, profil), barre de progression 8 points, boutons Retour + Recommencer.
- Bascule de mode « Meilleur casino » / « Meilleur bonus ».
- Reprends EXACTEMENT les structures de données OPS (7 opérateurs × 10 critères 0-100) et QUESTIONS (poids par réponse) et la formule de scoring : score = note*1.25 + Σ(valeur_critère × poids) ; le mode bonus repondère fortement sur le critère bonus. Le scoring doit rester déterministe et testable.
- Rends la carte gagnant (logo, score, % de match, bonus, « pourquoi », CTA affiliate_click placement=homepage_matchmaker, lien avis) + 3 alternatives cliquables.
- État de base visible ; animation d'entrée transform-only, gated reduced-motion.
- Branche OPS sur nos données opérateurs réelles si disponibles, sinon garde les valeurs fournies en constante documentée.

Écris quelques tests unitaires vérifiant que les profils suivants donnent des gagnants DIFFÉRENTS : équilibré→Cresus, gros bonus→Magical Spin, crypto+live→Wild Sultan, wager bas/débutant→888, support+FR→Lucky8, mobile+crypto→Madnix.
```

---

## Étape 2 — Homepage

```
Lis design_handoff_casino_revamp/README.md (section 4.1) et Homepage FR.html + assets/home2.css.

Recrée la homepage dans app/[locale]/page.tsx :
- Hero deux colonnes : à gauche H1 « Trouvez le meilleur casino en ligne pour vous » + lede + indicateurs de confiance ; à droite le <CasinoMatchmaker> de l'étape 1 (remplit la colonne, aucun espace vide à droite).
- Podium top-3 + liste des top casinos.
- Bloc de maillage interne .hp-mesh : 4 cartes cliquables (Top casinos avec pastilles de score · Bonus · Jeux · Guides), chaque colonne finie par un bouton « Voir tout ».
- Section SEO long-form autour de « meilleur casino en ligne » + liste de critères en cartes alignées (icône + terme gras + description).
Conserve tout le tracking. Vérifie le rendu responsive (hero passe en 1 colonne ≤1040px).
```

---

## Étape 3 — Avis casino (version éditoriale)

```
Lis design_handoff_casino_revamp/README.md (section 4.3) et Modele Avis Casino.html + assets/review.css + review2.css + review2.js.

Recrée le template d'avis casino dans app/[locale]/casinos/[slug]/page.tsx (version éditoriale, data-prop="2") :
- Hero éditorial : identité + note + verdict à gauche, carte « deux chemins » (Obtenir le bonus / Comparer aux alternatives) à droite (pas de vide).
- Sommaire horizontal collant + scroll-spy.
- Sections d'avis longues (verdict, bonus, ludothèque, paiements, support, VIP, sécurité) — la structure doit encaisser BEAUCOUP plus de texte à l'avenir.
- Bandes de maillage interne : types de jeux (tuiles), jeux populaires (fiches + boutons Fiche/Jouer), « dans nos comparatifs », casinos similaires, alternatives.
- Bloc de bifurcation final « bonus ou alternative » + barre bonus collante (IntersectionObserver sur sentinel).
Le template doit être paramétré par les données de l'opérateur (slug). Conserve tout le tracking.
```

---

## Étape 4 — Catégorie de jeux

```
Lis design_handoff_casino_revamp/README.md (section 4.4) et Machines a sous v2.html + assets/jeux.css + jeux2.css + jeux2.js.

Recrée le template de catégorie de jeux dans app/[locale]/jeux/[categorie]/page.tsx, RÉUTILISABLE pour toute catégorie (machines à sous, roulette, live, jackpots…) :
- Hero de catégorie + filtres avancés, grille de jeux filtrable (envisage searchParams/SSR pour les filtres), contenu SEO long-form en bas, maillage vers fiches jeux / casinos / guides, CTA conversion.
Paramètre tout par la catégorie. Conserve le tracking.
```

---

## Étape 5 — Comparatif / Versus (éditorial)

```
Lis design_handoff_casino_revamp/README.md (section 4.5) et Versus Cresus vs Lucky8 v2.html + assets/versus2.css + versus2.js.

Recrée le template Versus (X-vs-Y) dans app/[locale]/comparatifs/[slug]/page.tsx, version A « Éditorial » :
- Hero face-à-face deux panneaux (gagnant accentué).
- Tableau « en un coup d'œil » + 6 critères : barres tête-à-tête animées au scroll, analyse par casino, « à retenir », verdict, détails repliables.
- Simulateur de wager : curseur → volume à miser (bonus × wager) + coût théorique par casino (volume × (1 − RTP)).
- Barre de comparaison collante (deux CTA bonus) + bloc « Ni l'un ni l'autre ? » avec 3 alternatives.
Paramètre par les deux opérateurs du slug. L'accent gagnant (vert/or) peut devenir une prop. Conserve le tracking.
```

---

## Étape 6 — Bonus

```
Lis design_handoff_casino_revamp/README.md (section 4.6) et Bonus v2.html + assets/bonus2.css + bonus2.js (+ casinos.css).

Recrée la page bonus dans app/[locale]/bonus/page.tsx :
- Hero + le MÊME <CasinoMatchmaker> que la homepage (centré), grille de bonus filtrable (filtres avancés), sections long-form en bas, maillage interne, gros CTA.
Conserve le tracking.
```

---

## Étape 7 — Guide / Article + Index Guides

```
Lis design_handoff_casino_revamp/README.md (sections 4.7 et 4.8) et Modele Article Guide.html + assets/article.css + article2.css + article2.js, ainsi que Guides.html + assets/guides.css.

A) Recrée le template d'article/guide dans app/[locale]/guides/[slug]/page.tsx :
- TL;DR en tête + boutons de résumé IA (à brancher sur nos endpoints LLM réels).
- Sommaire cliquable lisible (sans saut de ligne) + scroll-spy.
- Calculateurs interactifs intégrés (mode wager / RTP).
- Maillage interne croisé (casinos, types de jeux, autres guides) + barre bonus collante.
- Conçu pour du contenu TRÈS long à l'avenir.

B) Recrée l'index des guides dans app/[locale]/guides/page.tsx : regroupe les guides par catégorie + mises en avant (fédère le maillage interne).
Conserve le tracking.
```

---

## Après l'implémentation

- Vérifie chaque page sur la preview (desktop + mobile, thème clair + sombre).
- Vérifie que les événements GA4 partent bien (dataLayer) sur chaque CTA/placement.
- Une fois tout validé, tu peux retirer `design_handoff_casino_revamp/` du repo (ce n'était qu'une référence) ou l'exclure du build.
