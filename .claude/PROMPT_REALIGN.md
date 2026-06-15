# PROMPT_REALIGN.md

> **Quand l'utiliser** : à chaque session Claude Code dédiée au réalignement des
> page-templates sur le revamp v2 (`design_handoff_casino_revamp/`).
> Coller le bloc ci-dessous au début de la conversation Claude Code. Idempotent :
> peut être relancé en début de chaque nouvelle session, l'audit dira où on en est.

---

````
# MISSION — Réalignement des page-templates sur le handoff design v2

## Contexte du repo (à connaître AVANT toute action)

Le repo `le-meilleur-casino-en-ligne` a été construit en deux temps :

1. **Phase initiale (terminée)** — sur la base du handoff v1 `design_handoff_casino/` :
   tokens, chrome (header/footer/topstrip/breadcrumbs/rg-banner/cookie-overlay),
   composants atomiques (CTAButton, ScorePill, ScoreRing, OperatorCard, ComparisonTable,
   FilterSidebar, ProsCons, FAQAccordion, TableOfContents, AuthorBio, AffiliateDisclosure,
   ResponsibleGamblingBanner, LocaleSwitcher, ThemeToggle), helper GA4, pattern listing.
   → Ces fondations RESTENT, à auditer mais a priori conserver.

2. **Phase actuelle (à faire)** — sur la base du handoff v2 `design_handoff_casino_revamp/` :
   les **page-templates** sont à recréer parce que la v1 a divergé visuellement et
   structurellement de ce qui était voulu. Le live actuel ressemble à la v1 ; il doit
   ressembler à la v2.

⚠️ La v1 dans `design_handoff_casino/` est **OBSOLÈTE comme source de vérité** pour les
templates. Lecture interdite pour s'en inspirer dans cette phase. Si Claude Code lit
v1 par erreur (ex. un import dans CLAUDE.md non mis à jour), le signaler à l'utilisateur.

⚠️ Tu ne touches PAS au code avant la fin de la phase A (audit) et la validation
explicite de l'utilisateur sur le plan de la phase B.

═══════════════════════════════════════════════════════════════
PHASE 0 — VÉRIFICATIONS GIT (avant tout, 2 minutes)
═══════════════════════════════════════════════════════════════

Lance dans le terminal et donne-moi la sortie :

```bash
git status
git log --oneline -10
ls -la design_handoff_casino_revamp/ 2>/dev/null || echo "ABSENT"
ls -la design_handoff_casino/ 2>/dev/null || echo "ABSENT"
test -f CLAUDE.md && head -20 CLAUDE.md
test -f .claude/PROMPT_REALIGN.md && echo "Ce fichier existe"
````

Conditions de passage à PHASE A :

- `design_handoff_casino_revamp/` doit exister sur disque ET être tracké par git
  (ou en cours de staging). Si ABSENT → STOP, demander à l'utilisateur de commit.
- Le `CLAUDE.md` racine doit mentionner explicitement
  `design_handoff_casino_revamp/` comme source de vérité. Si ce n'est pas le cas,
  STOP et demander à l'utilisateur de le mettre à jour (un modèle est fourni).
- Travailler sur une branche dédiée : `git checkout -b chore/realign-baseline`
  si on n'est pas déjà sur une branche de feature.

═══════════════════════════════════════════════════════════════
PHASE A — AUDIT (lecture seule, AUCUNE modification de fichier)
═══════════════════════════════════════════════════════════════

1. Lis intégralement, dans cet ordre :
   - `design_handoff_casino_revamp/README.md` (toutes les sections, pas un résumé)
   - `design_handoff_casino_revamp/PROMPTS_CLAUDE_CODE.md`
   - `design_handoff_casino_revamp/assets/site.css` (tokens — source de vérité)
   - `design_handoff_casino_revamp/assets/site.js` (helper GA4 + thème côté handoff)
   - `CLAUDE.md` à la racine du repo
   - `package.json` (pour connaître les dépendances déjà présentes)

2. Cartographie l'existant — sans interpréter :
   - Liste tous les fichiers sous `app/[locale]/` (page.tsx, layout.tsx, et
     sous-dossiers casinos/, comparatifs/, jeux/, bonus/, guides/, alternatives/,
     jeu-responsable/)
   - Liste les composants existants sous `components/`
   - Vérifie la présence concrète de : helper de tracking GA4 (poussée dataLayer
     depuis data-\*), toggle thème + `localStorage('mc-theme')`, chrome partagé
     (topstrip, header, breadcrumbs, rg-banner, footer, cookie-overlay), route
     `/go/[operator]/route.ts`

3. **Audit tokens** — compare `assets/site.css` aux tokens du repo
   (`tailwind.config.*` + `app/globals.css` ou équivalent) :
   - Couleurs (`--green`, `--green-50`, `--gold`, `--red`, `--ink/2/3`,
     `--bg/surface/surface-2/bg-sunken`, `--line/line-2`, `--star`) en clair ET sombre
   - Polices (Newsreader, Hanken Grotesk, JetBrains Mono — via `next/font` ou Google
     Fonts)
   - Rayons `--radius-sm/md/lg/xl`, ombres `--sh-1/2/3`, `--maxw`, `--header-h`
     Note CHAQUE écart. Pas d'arrondi à « globalement OK ».

4. Pour CHAQUE template du handoff revamp, identifie :

   | Maquette                   | Route cible                                | État repo | Écart |
   | -------------------------- | ------------------------------------------ | --------- | ----- |
   | Homepage FR                | `app/[locale]/page.tsx`                    | …         | …     |
   | Modele Avis Casino         | `app/[locale]/casinos/[slug]/page.tsx`     | …         | …     |
   | Versus Cresus vs Lucky8 v2 | `app/[locale]/comparatifs/[slug]/page.tsx` | …         | …     |
   | Machines a sous v2         | `app/[locale]/jeux/[categorie]/page.tsx`   | …         | …     |
   | Bonus v2                   | `app/[locale]/bonus/page.tsx`              | …         | …     |
   | Modele Article Guide       | `app/[locale]/guides/[slug]/page.tsx`      | …         | …     |
   | Guides (index)             | `app/[locale]/guides/page.tsx`             | …         | …     |

   Pour « écart », compare la structure du `.tsx` actuel à la structure de sections
   décrites dans le README section 4 du revamp, ET à la screenshot
   `screenshots/0X-*.png` correspondante. Liste les sections présentes, manquantes,
   en trop.

5. **Cas spécial — le simulateur (matchmaker) v2** :
   Lis `design_handoff_casino_revamp/assets/home2.js`. Compare au composant existant
   `components/homepage/homepage-quiz.tsx` (qui est la v1, à 3 questions).
   - La v2 a 8 questions + un mode toggle « Meilleur casino / Meilleur bonus »
   - Structures de données : `OPS` (7 opérateurs × 10 critères 0-100) et `QUESTIONS`
     (poids par réponse)
   - Formule de scoring : `score = note × 1.25 + Σ(valeur_critère × poids)`
   - En mode bonus, repondération forte sur le critère bonus
     Le quiz v1 doit être **remplacé** par un nouveau composant `<CasinoMatchmaker>`,
     PAS étendu.

6. Restitue l'audit dans CE format exact (markdown), puis ARRÊTE-TOI :

   ## Audit

   ### Tokens (`assets/site.css` vs repo)
   - [conformes / écarts listés avec valeur attendue vs valeur actuelle]

   ### Chrome partagé & infra
   - Helper GA4 : présent / manquant / divergent
   - Toggle thème : présent / manquant / divergent
   - Layout chrome : présent / manquant / divergent (lister les composants)
   - Route `/go/[operator]` : présente / manquante

   ### Matchmaker v1 vs v2
   - Composant v1 existant : [chemin]
   - Verdict : à remplacer intégralement par CasinoMatchmaker v2

   ### Templates

   [Tableau du point 4]

   ### Verdict
   - Que faut-il jeter (chemins exacts) ?
   - Que faut-il garder ?
   - Que faut-il auditer plus en profondeur avant de jeter ?
   - Y a-t-il des références au v1 (`design_handoff_casino/`) dans le code ou la
     doc qui devraient être supprimées/réorientées ?

═══════════════════════════════════════════════════════════════
PHASE B — PLAN (présentation pour validation, AUCUN code écrit)
═══════════════════════════════════════════════════════════════

À partir de l'audit, propose UN plan d'attaque dans cet ordre strict :

1. Réalignement tokens si écarts (sinon : skip)
2. Chrome partagé si manquant ou divergent (sinon : skip)
3. Helper tracking GA4 + toggle thème si manquants (sinon : skip)
4. Composant `<CasinoMatchmaker>` v2 partagé (remplace l'ancien `homepage-quiz.tsx`)
5. Templates dans cet ordre :
   a. Homepage (`app/[locale]/page.tsx`)
   b. Avis casino (`app/[locale]/casinos/[slug]/page.tsx`)
   c. Catégorie jeux (`app/[locale]/jeux/[categorie]/page.tsx`)
   d. Versus (`app/[locale]/comparatifs/[slug]/page.tsx`)
   e. Bonus (`app/[locale]/bonus/page.tsx`)
   f. Guide / Article (`app/[locale]/guides/[slug]/page.tsx`)
   g. Index Guides (`app/[locale]/guides/page.tsx`)

Pour chaque étape, donne :

- Branche git proposée (`feat/realign-<étape>`)
- Fichiers à supprimer (chemins exacts du repo)
- Fichiers à créer/modifier (chemins exacts)
- Composants existants à réutiliser (lister explicitement)
- Estimation de complexité (S/M/L) et risque d'exhaustion contexte (Low/Med/High)
- Tests unitaires éventuels (notamment pour le scoring du matchmaker)

⛔ STOP. Attends ma validation explicite « go phase C » avant d'écrire la moindre ligne.

═══════════════════════════════════════════════════════════════
PHASE C — EXÉCUTION (par étape, validation gates entre chaque)
═══════════════════════════════════════════════════════════════

Quand je dis « go phase C », tu attaques la PREMIÈRE étape du plan validé, et UNE SEULE.
Tu ne passes JAMAIS à l'étape suivante sans mon « go suivant ».

Pour chaque étape (en particulier chaque template) :

1. **Lecture obligatoire complète** des fichiers de référence AVANT de coder :
   - Le `.html` de la maquette correspondante dans `design_handoff_casino_revamp/`
     (en entier, pas en survol)
   - Le ou les `.css` listés dans README section 4 pour ce template
   - Le ou les `.js` listés
   - Le screenshot `screenshots/0X-*.png`

2. **Mini-plan d'écriture** (3-5 lignes) avant d'éditer : structure JSX prévue,
   composants atomiques réutilisés, données mockées vs branchées.

3. **Implémentation** en respectant les règles transverses NON-NÉGOCIABLES :
   - Pixel-near reproduction des maquettes (pas de « réinterprétation »)
   - Tokens existants UNIQUEMENT — aucune couleur hardcodée
   - Tous les attributs `data-event/operator/placement/bonus/page-type/locale`
     conservés à l'identique ; `data-placement` distinct par zone (CRITIQUE pour
     mesurer le ROI des modules)
   - Textes FR + EN dans next-intl (jamais en dur dans le JSX)
   - Liens d'affiliation passent par la route `/go/[operator]`
   - Logos d'opérateurs remplacent les `.logo-ph` (motif rayé) via `next/image`
     avec dimensions fixes (CLS < 0.05)
   - Logique couleur stricte : vert=action, or=premium **rare**, rouge=18+/légal
     SEULEMENT. Pas de dégradés, pas de glow. Sobre/éditorial.
   - Animations d'entrée : gated `@media (prefers-reduced-motion: no-preference)`,
     état de base TOUJOURS visible (jamais d'opacity 0 initial), transform-only
   - Aucune dépendance ajoutée sans nécessité absolue (justifier si proposée)
   - Thème clair/sombre supporté
   - SSR/SSG : aucun contenu critique injecté en JS post-load
   - Hooks schema.org où pertinent (Review, AggregateRating, FAQPage, ItemList,
     BreadcrumbList)

4. **Self-check avant commit** (présente la checklist remplie) :
   - [ ] Tokens : aucune couleur hardcodée, tout via `var(--…)` ou classe Tailwind
         correspondant au token
   - [ ] i18n : aucun texte FR en dur dans le JSX (tout via next-intl)
   - [ ] GA4 : tous les data-\* présents et corrects (lister explicitement le
         `data-placement` attendu pour chaque CTA de la page)
   - [ ] Responsive : breakpoints confirmés vs maquette
   - [ ] Reduced motion : état de base visible, animations gated
   - [ ] Dark mode : passé manuellement sur les deux thèmes
   - [ ] Aucune dépendance ajoutée (ou justification explicite)
   - [ ] Schema.org : `<script type="application/ld+json">` présent si pertinent

5. **Commit** sur la branche de l'étape, message conventionnel
   (ex. `feat(template): realign casino review on revamp v2`).

6. **Compte-rendu final** de l'étape (≤ 10 lignes) + propose à l'utilisateur de :
   (a) merger et passer à l'étape suivante, ou (b) ajuster avant merge.

⚠️ Si pendant une étape ton contexte devient lourd (>~60% de remplissage subjectif),
ARRÊTE après le commit en cours, n'enchaîne pas. Une session clean qui livre 1 template
vaut mieux qu'une session qui échoue à mi-template.

═══════════════════════════════════════════════════════════════
RÈGLES MÉTA
═══════════════════════════════════════════════════════════════

- Tu ne paraphrases jamais une instruction du handoff comme excuse pour la simplifier
- Quand un point te semble ambigu, tu poses UNE question, tu ne devines pas
- Tu ne réécris jamais `design_handoff_casino_revamp/assets/*` (read-only, c'est la spec)
- Tu peux retirer `design_handoff_casino_revamp/` du build (next config) si pas déjà fait,
  mais tu ne le SUPPRIMES qu'à la toute fin du projet, sur instruction explicite
- Tu ignores `design_handoff_casino/` comme source de vérité pour les templates ;
  signaler à l'utilisateur toute référence à v1 trouvée dans le code

Commence par PHASE 0 maintenant.

````

---

## Notes d'usage pour l'utilisateur humain

### Avant la première session

1. Vérifier que `design_handoff_casino_revamp/` est bien committé :
   ```bash
   git status design_handoff_casino_revamp/
   git log --oneline -- design_handoff_casino_revamp/
````

2. Vérifier que le `CLAUDE.md` racine pointe vers le revamp et non v1
   (modèle fourni à côté de ce fichier).

3. Vérifier qu'un `DEPRECATED.md` existe dans `design_handoff_casino/` (modèle fourni).

4. Créer une branche baseline propre :
   ```bash
   git checkout main
   git pull
   git checkout -b chore/realign-baseline
   git push -u origin chore/realign-baseline
   ```

### Pendant les sessions

- Copier-coller **le bloc entre `\`\`\`` du présent fichier** dans Claude Code (pas
  tout le fichier).
- Validation gates obligatoires : ne jamais dire « go phase C, fais tout » ; toujours
  un template à la fois.
- Si Claude Code dérape : `/clear` puis recoller le prompt, l'audit dira où on en est.

### Si ton contexte sature pendant l'audit (phase A)

Demander à Claude Code : « Sauvegarde ton audit dans `.claude/AUDIT.md` puis stoppe ».
Repartir dans une nouvelle session : « Lis `.claude/AUDIT.md` + `.claude/PROMPT_REALIGN.md`,
passe en PHASE B ».
