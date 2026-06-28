# Phase 2.2.0 — Audit 3 problèmes UX/SEO critiques

> Produit le 2026-06-28. Lecture seule — aucune modification de code.
> Baseline avant actions de correction Phase 2.2.1/2/3.

---

## Section 1 — Logos opérateurs manquants

### 1.1 État actuel

**Convention `CasinoLogo` component (`components/ui/casino-logo.tsx`) :**

```
src = logoUrl ?? (slug ? `/logos/${slug}.png` : undefined)
if (src) → <Image src={src} ...>   // tente de charger le fichier
else     → <Placeholder mesh div>  // fallback hatché visible
```

**Tableau exhaustif (13 opérateurs Phase 1 + ANJ) :**

| Opérateur       | LOGO_URLS entry                  | Fichier `/public/logos/` | Comportement si `slug` passé | Comportement si `logoUrl` seul |
| --------------- | -------------------------------- | ------------------------ | ---------------------------- | ------------------------------ |
| Crésus          | ✅ `/logos/cresus.png`           | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Lucky8          | ✅ `/logos/lucky8.png`           | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Wild Sultan     | ✅ `/logos/wild-sultan.png`      | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Madnix          | ✅ `/logos/madnix.png`           | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Magical Spin    | ✅ `/logos/magical-spin.png`     | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Casinozer       | ✅ `/logos/casinozer.png`        | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Tortuga         | ✅ `/logos/tortuga.png`          | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Stake           | ✅ `/logos/stake.png`            | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| MyStake         | ✅ `/logos/mystake.png`          | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Bitcoin Penguin | ✅ `/logos/bitcoin-penguin.png`  | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Dublinbet       | ✅ `/logos/dublinbet.png`        | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Vegadream       | ✅ `/logos/vegadream.png`        | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Horus Casino    | ✅ `/logos/horus-casino.png`     | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| N1 Casino       | ✅ `/logos/n1-casino.png`        | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Casino Extra    | ✅ `/logos/casino-extra.png`     | ✅ existe                | ✅ image OK                  | ✅ image OK                    |
| Banzai Slots    | ✅ `/logos/banzai-slots.svg`     | ✅ existe (.svg)         | ✅ image OK                  | ✅ image OK                    |
| **Winamax**     | ❌ commenté (`operators.ts:708`) | ❌ absent                | ⚠️ **image cassée** (404)    | 🟡 placeholder mesh            |
| **Betclic**     | ❌ commenté (`operators.ts:752`) | ❌ absent                | ⚠️ **image cassée** (404)    | 🟡 placeholder mesh            |
| **Unibet**      | ❌ commenté (`operators.ts:798`) | ❌ absent                | ⚠️ **image cassée** (404)    | 🟡 placeholder mesh            |
| **PMU**         | ❌ commenté (`operators.ts:851`) | ❌ absent                | ⚠️ **image cassée** (404)    | 🟡 placeholder mesh            |
| **PokerStars**  | ❌ commenté (`operators.ts:907`) | ❌ absent                | ⚠️ **image cassée** (404)    | 🟡 placeholder mesh            |

**Cause racine :** tous les opérateurs ANJ ont été ajoutés en Phase 1 avec `// logoUrl: à compléter en phase logos` — aucun fichier logo n'a été fourni ni ajouté au repo.

### 1.2 Composants affectés par opérateur — image cassée vs placeholder

La gravité dépend de l'appel : quand `slug` est passé sans fichier logo → 404 ; quand seul `logoUrl` (absent) est passé → placeholder mesh.

**Composants qui passent `slug` → 404 pour ANJ :**

- `components/bonus/bonus-filter-client.tsx:87` — page `/bonus/` : logo cassé dans la liste de filtres
- `components/homepage/casino-matchmaker.tsx:239,312` — résultats du simulateur home (si ANJ recommandé)
- `components/versus/versus-compare-bar.tsx:71,143` — barre flottante de comparaison VS
- `components/review/review-sticky-bar.tsx:84` — sticky bar en haut des fiches avis

**Composants qui passent uniquement `logoUrl` → placeholder mesh pour ANJ :**

- `components/ui/operator-card.tsx:62,166,277` — PodiumCard, OperatorCard, ReviewCard
- `app/[locale]/versus/[slug]/page.tsx` (toutes utilisations) — contenu principal des versus
- `app/[locale]/alternatives/page.tsx` et `[slug]/page.tsx`
- `app/[locale]/jeux/[category]/page.tsx`

**Résultat observé en production (Unibet, PMU, Betclic) :**

- Page `/fr/casinos/unibet/` → sticky bar = **logo cassé** ; hero card = placeholder mesh
- Page `/fr/bonus/` → filtre Betclic = **logo cassé**
- Matchmaker si résultat ANJ = **logo cassé**

### 1.3 Convention format

- Format dominant : `.png` (banzai-slots est le seul `.svg`)
- Naming : `{slug}.png` où `slug` = valeur de `operators.ts`
- `next/image` avec dimensions fixes (width/height explicites) ✅ (pas de layout="fill")
- Pas de CDN externe — `remotePatterns: []` dans `next.config.ts`

### 1.4 Fichiers obsolètes en `/public/logos/`

44 fichiers pour des opérateurs non-Phase1 (bc-game.png, rollbit.png, betsson.png, etc.) — hors scope mais représentent ~1.2 MB de dead assets.

### 1.5 Diagnostic et recommandations

**Écart vs attendu :** 5 opérateurs ANJ sans logo alors qu'ils représentent les partenaires ANJ les plus visibles (Winamax, Betclic, Unibet visible sur /casinos/francais/, /bonus/, matchmaker).

**Fix recommandé (2 étapes) :**

1. **Sourcer et ajouter les 5 fichiers PNG/SVG** dans `/public/logos/` :
   - `/public/logos/winamax.png`
   - `/public/logos/betclic.png`
   - `/public/logos/unibet.png`
   - `/public/logos/pmu.png`
   - `/public/logos/pokerstars.png`
2. **Décommenter les `LOGO_URLS` dans `operators.ts`** (lignes 705-910, 5 entrées)

**Fix défensif optionnel** (si sourcing des logos prend du temps) : modifier `CasinoLogo` pour que quand `slug` est passé mais que le chemin `/logos/{slug}.png` n'existe pas en statique, le composant retombe sur `<Placeholder>` au lieu d'une 404. Mais Next.js ne peut pas vérifier l'existence d'un fichier statique à la compilation sans liste explicite — approche alternative : supprimer le fallback `logoSrc(slug)` du composant et forcer la discipline `logoUrl` uniquement.

**Effort :** Faible (sourcing logos = action externe ; code = 5 lignes). **Impact :** Élevé — corrige l'affichage cassé sur bonus, matchmaker, sticky bar, versus bar pour 5 opérateurs.

---

## Section 2 — Maillage entrant depuis home et pages proches

### 2.1 Sections et liens de la home

| Section home                | Cible(s) interne(s)                                                        | Opérateurs cités                    |
| --------------------------- | -------------------------------------------------------------------------- | ----------------------------------- |
| Hero H1                     | `/casinos/` (CTA "voir le top 10")                                         | Rotateur OperatorRotator (tous)     |
| Podium TOP-3                | `/casinos/{slug}/` via PodiumCard (CTA)                                    | TOP_3 (Crésus, Lucky8, Wild Sultan) |
| Top-10 Table                | `/casinos/` (header) + `/casinos/{slug}/` (lignes)                         | TOP_10 (10 ops)                     |
| HP-TOPLINKS                 | `/casinos/{slug}/`                                                         | TOP_10[0..3]                        |
| CAT-GRID                    | `/jeux/{categorie}/`                                                       | —                                   |
| HP-MESH Col 1 (Top casinos) | `/casinos/{slug}/` + `/casinos/`                                           | TOP_10[0..3]                        |
| HP-MESH Col 2 (Bonus)       | `/bonus/`, `/bonus/sans-depot/`, `/bonus/tours-gratuits/`, `/comparatifs/` | —                                   |
| HP-MESH Col 3 (Jeux)        | `/jeux/{categorie}/` x4 + `/jeux/`                                         | —                                   |
| HP-MESH Col 4 (Guides)      | `/guides/{slug}/` x4 + `/guides/`                                          | —                                   |
| HP-SEO                      | `/casinos/` (47 opérateurs), `/guides/methodologie/`                       | —                                   |
| Methodology                 | `/guides/methodologie/`                                                    | —                                   |
| Guides teaser               | `/guides/bonus-casino/`, `/guides/rtp/`, `/guides/paiements/` + `/guides/` | —                                   |
| FAQ                         | —                                                                          | —                                   |
| Newsletter                  | —                                                                          | —                                   |

### 2.2 Header (navigation principale)

| Item nav    | URL cible       |
| ----------- | --------------- |
| Casinos     | `/casinos/`     |
| Comparatifs | `/comparatifs/` |
| Jeux        | `/jeux/`        |
| Bonus       | `/bonus/`       |
| Guides      | `/guides/`      |

**Absent du header :** aucun lien vers `/versus/`, `/casinos/francais/`, `/comparatifs/crypto/`.

### 2.3 Footer (4 colonnes)

**Colonne Casinos :** Top 10, Bitcoin, Nouveaux, Live, Fiables, Sans KYC, Retrait Instantané, **Casinos en Français → `/casinos/francais/`** ✅, RTP Élevé.

**Colonne Comparatifs :** Comparatif Top 10, Bonus Casino, Casino vs Casino → `/comparatifs/`, Alternatives, Cashback Casino.

**Colonne Jeux :** 15 catégories de jeux.

**Colonne Ressources :** Guides, Blog, Jeu Responsable, À Propos, Contact.

### 2.4 Tableau de maillage entrant — ressources Phase 2.1

| Ressource                        | Home ? | Header ? | Footer ?       | Niveau 1 (/comparatifs/) ? | Sitemap ?                      |
| -------------------------------- | ------ | -------- | -------------- | -------------------------- | ------------------------------ |
| `/casinos/francais/`             | ❌     | ❌       | ✅ col Casinos | ❌                         | ✅ (généré via operators loop) |
| `/comparatifs/crypto/`           | ❌     | ❌       | ❌             | ❌                         | ❌ absent                      |
| `/versus/` (hub)                 | ❌     | ❌       | ❌             | ❌                         | ❌ absent                      |
| `/versus/cresus-vs-lucky8/`      | ❌     | ❌       | ❌             | ⚠️ lien cassé\*            | ❌ absent                      |
| `/versus/winamax-vs-betclic/`    | ❌     | ❌       | ❌             | ⚠️ lien cassé\*            | ❌ absent                      |
| `/versus/winamax-vs-pokerstars/` | ❌     | ❌       | ❌             | ❌ non listé               | ❌ absent                      |
| `/versus/stake-vs-casinozer/`    | ❌     | ❌       | ❌             | ❌ non listé               | ❌ absent                      |

\* Le hub `/comparatifs/` génère des liens auto vers `/comparatifs/{versusSlug}/` (ex: `/comparatifs/cresus-vs-lucky8/`) à partir des 5 opérateurs les mieux notés — **chemin erroné** : les pages réelles sont sous `/versus/` pas `/comparatifs/`. Ces liens pointent vers des 404 ou un template différent.

### 2.5 Double bug du hub `/comparatifs/` (sitemap + hub)

`sitemap.ts` fonction `versusEntries()` :

```ts
// Génère des slugs à partir du top-5 par rating — puis les met sous /comparatifs/
out.push(entry(`/comparatifs/${slug}/`, { priority: 0.5 }))
// ↑ DEVRAIT ÊTRE : `/versus/${slug}/`
```

`app/[locale]/comparatifs/page.tsx` :

```ts
href={`/comparatifs/${versusSlug(a.slug, b.slug)}/`}
// ↑ DEVRAIT ÊTRE : `/versus/${versusSlug(a.slug, b.slug)}/`
// + la liste auto ne contient pas les 4 versus manuels existants
```

**Conséquences :**

1. Les 4 versus réels (`/versus/cresus-vs-lucky8/` etc.) ne sont **jamais indexés** dans le sitemap
2. Le hub `/comparatifs/` affiche des liens vers `/comparatifs/{slug}/` qui soit 404, soit chargent le mauvais template
3. Les versus manuels n'ont **aucun entrypoint** hors liens internes sur les fiches opérateurs (auto-détect via `manualVersusPages`)

### 2.6 Entrypoints existants pour les versus (non-home)

Via `casinos/[slug]/page.tsx` : auto-détection `versusMatchups.filter(m => m.slugA === op.slug || m.slugB === op.slug)` → affiche les versus disponibles sur la fiche de chaque opérateur concerné. C'est le **seul entrypoint fonctionnel** pour les versus pages.

Via `/casinos/francais/` : liens éditoriaux manuels winamax-vs-betclic ✅, winamax-vs-pokerstars ✅ (ajoutés Phase 2.1.4).

Via `/comparatifs/crypto/` : lien vers stake-vs-casinozer ✅ (activé Phase 2.1.5).

### 2.7 Recommandations maillage

**Trou majeur 1 — Sitemap (effort : faible, impact SEO : critique)**
Corriger `versusEntries()` dans `sitemap.ts` pour utiliser `/versus/` + lister explicitement les 4 versus réels (pas le top-5 auto).

**Trou majeur 2 — Hub /comparatifs/ (effort : faible, impact : élevé)**
Corriger les hrefs dans `comparatifs/page.tsx` de `/comparatifs/` → `/versus/` pour les versus, et remplacer la liste auto-générée par les 4 versus définis dans `versusMatchups`.

**Trou majeur 3 — Footer colonne Comparatifs (effort : faible, impact : moyen)**
Ajouter dans la colonne Comparatifs : "Versus Casino vs Casino → `/versus/`" et "/comparatifs/crypto/ → Casinos Crypto" pour les hubs refondés Phase 2.1.

**Trou mineur 4 — Home HP-MESH (effort : faible, impact : moyen)**
Ajouter dans la col 2 (Bonus/Comparatifs) : un lien vers `/versus/` ou vers les versus les plus récents.

---

## Section 3 — Configuration locale et routing

### 3.1 Configuration next-intl actuelle

**`i18n/routing.ts` :**

```ts
export const routing = defineRouting({
  locales: ['fr', 'en'] as const,
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
})
```

**`next.config.ts` :** utilise `createNextIntlPlugin('./i18n/request.ts')` — pas de configuration i18n Next.js native.

**`i18n/request.ts` :** fallback vers `routing.defaultLocale` ('fr') si locale invalide.

**Middleware :** **ABSENT** — aucun fichier `middleware.ts` trouvé à la racine ou dans `/src/`. Le manifeste `.next/server/middleware-manifest.json` confirme : `"middleware": {}`, `"sortedMiddleware": []`.

### 3.2 Comportement attendu vs comportement réel

| URL                                                      | Comportement attendu                | Comportement réel (sans middleware)                                |
| -------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `https://www.le-meilleur-casino-en-ligne.fr/`            | FR home (locale='fr', sans préfixe) | `app/page.tsx` → `redirect('/')` → **boucle infinie 307**          |
| `https://www.le-meilleur-casino-en-ligne.fr/casinos/`    | FR casinos listing                  | **404** (aucune route `app/casinos/page.tsx`)                      |
| `https://www.le-meilleur-casino-en-ligne.fr/fr/`         | Redirect → `/`                      | FR home avec préfixe visible (/fr/ exposé)                         |
| `https://www.le-meilleur-casino-en-ligne.fr/fr/casinos/` | Redirect → `/casinos/`              | FR casinos **avec /fr/ visible** (/fr/ ne devrait pas être exposé) |
| `https://www.le-meilleur-casino-en-ligne.fr/en/`         | EN home (locale='en')               | ✅ EN home (le seul cas qui fonctionne normalement)                |
| `https://www.le-meilleur-casino-en-ligne.fr/en/casinos/` | EN casinos listing                  | ✅ EN casinos                                                      |

**`localePrefix: 'as-needed'` sans middleware :** next-intl NE peut PAS supprimer le préfixe `/fr/` au niveau du routing. Sans middleware, le `[locale]` segment est toujours dans l'URL. Le site FR est donc servi à `/fr/...` alors que toute la config (hreflang, sitemap, canonicals, liens internes) suppose qu'il est servi à `/...`.

### 3.3 Impact SEO — mismatch hreflang/canonical

**`buildHreflang(frPath)` (`lib/i18n/routes.ts`) produit :**

```ts
{
  fr: `https://www.le-meilleur-casino-en-ligne.fr/casinos/winamax/`,  // sans /fr/
  en: `https://www.le-meilleur-casino-en-ligne.fr/en/casinos/winamax/`,
  'x-default': `https://www.le-meilleur-casino-en-ligne.fr/casinos/winamax/`,
}
```

**URL réellement servie (sans middleware) :**

```
https://www.le-meilleur-casino-en-ligne.fr/fr/casinos/winamax/
```

**Conséquence :** Google voit le hreflang FR pointer vers `/casinos/winamax/` mais quand il crawle cette URL, il obtient une 404 (pas de fichier `app/casinos/[slug]/page.tsx`). La page réelle est à `/fr/casinos/winamax/` mais son hreflang pointe vers une URL inexistante.

**Même problème pour le sitemap :**

```ts
entry('/casinos/winamax/', { priority: 0.85 })
// → génère URL : https://www.le-meilleur-casino-en-ligne.fr/casinos/winamax/
// → URL réelle : https://www.le-meilleur-casino-en-ligne.fr/fr/casinos/winamax/
```

### 3.4 Audit canonicals et hreflang par page type

| Page             | URL réelle (sans middleware) | Canonical dans metadata      | hreflang FR                | hreflang EN               | Cohérent ?  |
| ---------------- | ---------------------------- | ---------------------------- | -------------------------- | ------------------------- | ----------- |
| Home FR          | `/fr/`                       | `/` (via buildHreflang('/')) | `www.site.fr/`             | `www.site.fr/en/`         | ❌ décalage |
| Home EN          | `/en/`                       | `/en/`                       | ✅                         | ✅                        | ✅          |
| Fiche Winamax FR | `/fr/casinos/winamax/`       | `/casinos/winamax/`          | ❌ 404                     | ✅ `/en/casinos/winamax/` | ❌          |
| Fiche Winamax EN | `/en/casinos/winamax/`       | `/en/casinos/winamax/`       | ❌ `/casinos/winamax/` 404 | ✅                        | ❌          |

### 3.5 Sitemap et robots

**`robots.ts` :** Configuration simple — allow `/`, disallow `/go/`, `/api/`, `/dev/`. Pas de problème spécifique. Pointe vers `{BASE_URL}/sitemap.xml` ✅.

**`sitemap.ts` :** Génère des URLs sans préfixe `/fr/` (cohérent avec l'intention `as-needed`) — mais ces URLs correspondent à des 404 sans middleware. Google ne peut pas crawler ce que le sitemap liste.

### 3.6 Diagnostic

Le middleware.ts est la pièce manquante critique. Le commentaire dans `app/page.tsx` le confirme :

> "This route is handled by the next-intl middleware which rewrites / → /[locale]/ — It should never be reached in production."

Le fichier a vraisemblablement été supprimé ou n'a jamais été créé lors du passage à next-intl v4.

### 3.7 Recommandations locale

**Fix unique requis — créer `middleware.ts` à la racine :**

```ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|api|go|.*\\..*).*)'],
}
```

Ce fichier (5 lignes) active `localePrefix: 'as-needed'` :

- `/` → FR home ✅ (sans /fr/ visible)
- `/en/` → EN home ✅
- `/fr/...` → redirect 307 → `/...` (canonicalisation automatique)
- `app/page.tsx` `redirect('/')` ne serait plus jamais atteint en production

**Effort :** Très faible (5 lignes). **Impact SEO :** Critique — corrige toutes les URLs FR, le hreflang, le sitemap, le canonical.

---

## Section 4 — Priorisation des 3 fixes

| Priorité | Problème                              | Impact                                                                                         | Effort                                         | Fix                                |
| -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------- |
| **P0**   | Locale routing (middleware.ts absent) | Critique — toutes les URLs FR sont cassées ou mal indexées, hreflang invalide, sitemap inutile | Très faible (5 lignes)                         | Créer `middleware.ts`              |
| **P1**   | Logos ANJ cassés                      | Élevé — image cassée sur bonus, matchmaker, sticky bar, versus bar pour 5 opérateurs-clés      | Moyen (sourcer 5 PNGs + décommenter LOGO_URLS) | Assets + config                    |
| **P2**   | Maillage versus manquant              | Moyen — 4 pages versus isolées hors fiches opérateurs ; sitemap incorrect pour /versus/        | Faible (3 fichiers à corriger)                 | Sitemap + comparatifs hub + footer |

---

## Section 5 — Séquence recommandée Phase 2.2.x

### Phase 2.2.1 — Middleware locale (P0)

**Périmètre :** Créer `middleware.ts` avec `createMiddleware(routing)`. Vérifier que toutes les URLs FR sans préfixe fonctionnent. Vérifier que `/fr/...` redirige vers `/...`. Vérifier le sitemap (pas de modif nécessaire — ses URLs redeviennent valides).
**Fichiers touchés :** `middleware.ts` (nouveau, 10 lignes max).
**Commit :** `fix(i18n): add next-intl middleware — enable localePrefix as-needed for FR URLs`

### Phase 2.2.2 — Logos ANJ (P1)

**Périmètre :** (a) Action utilisateur : sourcer 5 fichiers PNG/SVG (winamax, betclic, unibet, pmu, pokerstars) et les placer dans `/public/logos/`. (b) Décommenter les 5 `LOGO_URLS` dans `operators.ts`. (c) Évaluer si le fallback `logoSrc(slug)` dans `CasinoLogo` doit être retiré pour forcer la discipline `logoUrl`.
**Fichiers touchés :** `config/operators.ts` + `/public/logos/*.png` (assets).
**Commit :** `fix(logos): add ANJ operator logos + activate LOGO_URLS entries`

### Phase 2.2.3 — Maillage versus (P2)

**Périmètre :** (a) Corriger `sitemap.ts` : remplacer `versusEntries()` par liste explicite des 4 versus réels sous `/versus/`. (b) Corriger `comparatifs/page.tsx` : liens vers `/versus/{slug}/` + liste des 4 versus manuels. (c) Footer : ajouter `/versus/` et `/comparatifs/crypto/` dans la colonne Comparatifs. (d) Optionnel home HP-MESH : lien vers `/versus/` dans col 2.
**Fichiers touchés :** `app/sitemap.ts`, `app/[locale]/comparatifs/page.tsx`, `components/layout/site-footer.tsx`, `app/[locale]/page.tsx` (optionnel).
**Commit :** `fix(maillage): correct versus paths in sitemap + comparatifs hub + footer`

---

_Audit produit Phase 2.2.0 — aucune modification de code dans ce commit._
