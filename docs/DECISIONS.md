# Architecture Decision Records — le-meilleur-casino-en-ligne.fr

Léger journal de décisions techniques (ADR). Format : décision + raison + alternatives considérées.

---

## ADR-001 — Stack de base

**Décision :** Next.js 15 (App Router) + TypeScript strict + Tailwind CSS v3 + Vercel.

**Raison :** Brief imposé. Tailwind v3 choisi sur v4 car v4 change le paradigme de config (CSS-first), incompatible avec les extraits du PROMPT.md, et l'écosystème de plugins (eslint-plugin-tailwindcss, prettier-plugin-tailwindcss) est plus stable sur v3.

---

## ADR-002 — i18n : next-intl

**Décision :** Utiliser `next-intl` pour le routing i18n FR/EN.

**Raison :** `localePrefix: 'as-needed'` gère nativement le pattern "FR sans préfixe, EN avec /en/". Évite d'écrire un middleware maison qui duplique ce que next-intl résout. Alternative considérée : solution custom maison — écarté car plus de maintenance sans gain.

---

## ADR-003 — Dark mode : `[data-theme="dark"]` sur `<html>`

**Décision :** Le toggle dark mode écrit `data-theme="dark"` sur `<html>` via localStorage `mc-theme`. Un script inline dans `<head>` lit le localStorage avant le premier rendu pour éviter le flash (FOUC).

**Raison :** Tailwind `darkMode: ['class', '[data-theme="dark"]']` génère les variantes `dark:` en ciblant cet attribut. Plus explicite que la classe `.dark` et compatible avec les CSS variables du design system.

---

## ADR-004 — Contenu : modèle hybride TypeScript data + MDX prose

**Décision :** Données structurées des opérateurs dans `config/operators.ts` (TypeScript, validé Zod). Contenu éditorial long-form des reviews dans des fichiers `.mdx`. Front-matter des MDX validé via Zod.

**Raison :** Les tableaux comparatifs, listes, et classements sont des données — TypeScript est plus safe et performant que du MDX parsé pour ça. Le texte des sections de review est du contenu — MDX permet aux rédacteurs de travailler en Markdown. Alternative : tout MDX — écarté (trop de données structurées à gérer en front-matter). Tout TS/JSON — écarté (force les rédacteurs à coder).

---

## ADR-005 — Redirection affiliation : page interstitielle SSR

**Décision :** `/go/[operator]/` rend une page HTML légère (SSR, `noindex`) avec un délai JS de ~200ms avant `window.location.replace()`. `<noscript><meta http-equiv="refresh">` en fallback.

**Raison :** Une 302 sèche ne permet pas de déclencher `affiliate_click` via GTM avant la navigation. La page interstitielle laisse le temps au dataLayer de se remplir, permet d'ajouter des UTM params à l'URL de destination, et est légalement utile ("vous quittez notre site"). Alternative : 302 sèche + tracking via beacon API — écarté (complexe, fiabilité incertaine avec les adblockers).

---

## ADR-006 — Table comparatif mobile : scroll horizontal

**Décision :** Sur mobile, le `ComparisonTable` utilise `overflow-x: auto` avec un fade-gradient à droite + hint visuel.

**Raison :** Préserve la comparabilité columnar (la valeur centrale du composant). Les cartes empilées simplifient la lecture individuelle mais cassent la comparaison latérale. Pattern validé chez Wirecutter et NerdWallet. Facile à changer si les analytics montrent un taux d'interaction mobile faible.

---

## ADR-007 — Breakpoints Tailwind custom

**Décision :** Breakpoints Tailwind remplacent les valeurs par défaut : `xs:420px sm:620px md:760px lg:860px xl:1080px 2xl:1200px`.

**Raison :** Alignement exact avec les media queries du design handoff (`site.css`). Les breakpoints Tailwind par défaut (sm:640, md:768, lg:1024, xl:1280) ne correspondent pas au design system.

---

## ADR-008 — CSP et unsafe-inline

**Décision :** Le Content-Security-Policy inclut `'unsafe-inline'` pour `script-src` et `style-src`.

**Raison :** GTM nécessite `unsafe-inline` pour injecter le container snippet. Next.js nécessite `unsafe-inline` pour ses styles injectés. Alternative propre (nonces CSP) : possible mais complexifie le setup GTM et Next.js. À revisiter si l'équipe sécurité l'exige en prod.

---

## ADR-010 — next-intl middleware vs proxy.ts (Next.js 16)

**Décision :** Garder `middleware.ts` (convention dépréciée) plutôt que renommer en `proxy.ts`.

**Raison :** Next.js 16 a renommé `middleware.ts` → `proxy.ts` mais `next-intl/middleware` génère une erreur de build si les deux fichiers coexistent (`proxy.ts` et `middleware.ts`). Comme il est impossible de supprimer `middleware.ts` une fois créé sans accès shell, on conserve le fichier d'origine avec un avertissement de dépréciation non-bloquant. À migrer vers `proxy.ts` dès que next-intl publie un support natif de la convention `proxy`.

---

## ADR-009 — TypeScript strict+ : `noUncheckedIndexedAccess`

**Décision :** `noUncheckedIndexedAccess: true` activé en plus de `strict: true`.

**Raison :** Prévient les accès non sécurisés aux tableaux (`array[0]` est typé `T | undefined` plutôt que `T`). Évite une catégorie entière de bugs runtime. Coût : quelques type assertions explicites nécessaires, acceptables dans une base de code propre.

---
