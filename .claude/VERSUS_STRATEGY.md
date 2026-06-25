# VERSUS_STRATEGY.md — Architecture et conventions pages comparatifs

> Établi 2026-06-25 — Phase 2.1.0. Validé Fabián.
> Source de vérité pour toute création / modification de page versus.

---

## Section 1 — Architecture actuelle (factuelle)

### Route A — `/comparatifs/[slug]/` (auto-générée)

- **Fichier** : `app/[locale]/comparatifs/[slug]/page.tsx` (833 lignes)
- **Génération** : `generateStaticParams` prend les TOP 5 opérateurs par rating → C(5,2) = **10 pages auto-générées**
- **Données sources** : `config/operators.ts` (opérateur A + B) + `config/versus-extra-crits.ts` (support + mobile)
- **Contenu** : note globale, bonus + WagerSimulator, RTP, paiements, support (sourced), mobile (sourced), critère Expérience (cosmétique — voir B-FS4)
- **Maillage** : liens vers `/casinos/${opA.slug}/` et `/casinos/${opB.slug}/` présents (lignes 368, 459, 811)
- **Slugs existants** (top 5 actuel) :
  - `cresus-vs-lucky8`
  - `cresus-vs-wild-sultan`
  - `cresus-vs-madnix`
  - `cresus-vs-magical-spin`
  - `lucky8-vs-wild-sultan`
  - `lucky8-vs-madnix`
  - `lucky8-vs-magical-spin`
  - `wild-sultan-vs-madnix`
  - `wild-sultan-vs-magical-spin`
  - `madnix-vs-magical-spin`

**Note** : si le top 5 évolue après enrichissements ANJ (ex: Winamax, Betclic entrant dans le top 5), les paires dans `versus-extra-crits.ts` doivent être mises à jour pour couvrir les nouveaux matchups (sinon section support+mobile absente).

---

### Route B — `/versus/[slug]/` (manuelle enrichie)

- **Fichier** : `app/[locale]/versus/[slug]/page.tsx`
- **Génération** : `generateStaticParams` lit `versusMatchups` depuis `config/versus-content.ts` — **génération manuelle uniquement**
- **Données sources** : `config/versus-content.ts` (interface `VersusMatchup` complète)
- **Contenu** : intro éditoriale, tableau comparatif multi-critères, sections prose par critère, verdict par profil, FAQ, CTAs affiliate
- **Maillage** : CTAs affiliate seulement — **pas de liens vers fiches internes** (dette à corriger lors de chaque nouvelle page)
- **Slugs existants** :
  - `cresus-vs-lucky8` (seule page manuelle — commit 2546b4d)

**Interface `VersusMatchup`** :

```typescript
interface VersusMatchup {
  slug: string
  slugA: string
  slugB: string
  winner: 'a' | 'b'
  intro: string
  criteria: VsCriterion[]
  sections: VsSection[]
  verdictIntro: string
  verdictA: string[]
  verdictB: string[]
}
```

---

## Section 2 — Différenciation des rôles (validée Fabián 2026-06-25)

### `/comparatifs/[slug]/` = Pages catégorielles techniques

| Dimension            | Détail                                                                      |
| -------------------- | --------------------------------------------------------------------------- |
| **Audience**         | Visiteurs en phase de découverte / exploration                              |
| **Contenu**          | Data tabulaire auto-générée, comparaison technique, pas d'éditorial enrichi |
| **Maillage entrant** | Depuis hubs, sidebar, fil d'Ariane                                          |
| **Maillage sortant** | Liens vers fiches opérateurs ✅ (lignes 368, 459, 811)                      |
| **Volume SEO**       | Moyen, intention faible-moyenne                                             |
| **Cibles**           | `/comparatifs/crypto/`, `/comparatifs/mobile/`, `/comparatifs/sans-wager/`  |

### `/versus/[slug]/` = Pages 1v1 stratégiques à forte conversion

| Dimension            | Détail                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Audience**         | Visiteurs en short-list, prêts à choisir entre 2 opérateurs spécifiques                                             |
| **Contenu**          | Intro éditoriale 200-400 mots, comparaison structurée par critère, verdict par profil, FAQ, CTAs affiliate appuyés  |
| **Maillage entrant** | Depuis fiches opérateur (2 directions), depuis hubs catégoriels (liens texte dans editorialContent)                 |
| **Maillage sortant** | Liens vers `/casinos/${slugA}/` + `/casinos/${slugB}/` **obligatoires** (dette sur page existante cresus-vs-lucky8) |
| **Volume SEO**       | Intention forte commerciale, conversion élevée                                                                      |
| **Cibles**           | winamax-vs-betclic, winamax-vs-pokerstars, stake-vs-casinozer                                                       |

---

## Section 3 — Conventions éditoriales `/versus/[slug]/`

### Structure type

```
H1 : "[Opérateur A] vs [Opérateur B] : lequel choisir en [année] ?"

Intro : 200-400 mots
  → Contexte de la comparaison
  → Profil des deux opérateurs (type, juridiction, forces)
  → Pourquoi cette comparaison est pertinente maintenant
  → Pas de spoiler sur le verdict

Tableau récapitulatif comparatif : 10-12 critères
  → 1 colonne par opérateur
  → Données factuelles sourcées depuis operators.ts / review-content.ts

Comparaison par critère : 6 sections × 80-150 mots
  1. Bonus & conditions
  2. Catalogue de jeux
  3. Paiements & retraits
  4. Support client
  5. Application mobile
  6. Sécurité & licences

Verdict par profil de joueur : 3-4 profils
  → Format : "Choisissez [Opérateur A] si vous..." / "Choisissez [Opérateur B] si vous..."
  → 1 critère décisif par profil, 15-25 mots
  → Pas de verdict absolu ("meilleur") — verdict contextuel par profil

FAQ : 4-5 questions
  → Q1 : Lequel est le meilleur entre X et Y ?
  → Q2-Q4 : questions spécifiques au matchup (bonus, retrait, app, légalité...)
  → Q5 (optionnelle) : cas d'usage edge

2 CTAs affiliate (1 par opérateur) : bien visibles, après verdict
  + Liens texte vers /casinos/${slugA}/ et /casinos/${slugB}/ (maillage interne)
```

### Conventions internes applicables

| Convention       | Règle                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **§7**           | Pas de mention de concurrent tiers (ex: ne pas évoquer Casinozer dans winamax-vs-betclic)                                      |
| **§9**           | 2e personne du pluriel ("vous choisissez")                                                                                     |
| **§13**          | Mention honnête ANJ vs offshore quand pertinent (ex: si 1 ANJ + 1 offshore, expliquer la différence de protection)             |
| **§16**          | Audit obligatoire des claims comparatifs avant rédaction — vérifier que les données (bonus, RTP, délais) sont encore actuelles |
| **Ton EEAT**     | Sobre, factuel, pas de jugement moral ("arnaque", "à éviter absolument")                                                       |
| **ANJ/offshore** | Disclosure honnête des différences de protection consommateur sans incitation                                                  |

### Données sources autorisées

Toutes les valeurs dans une page `/versus/[slug]/` doivent être tracées vers :

- `config/operators.ts` : rating, bonus, RTP, paiements, withdrawalSpeed, kycPolicy
- `config/review-content.ts` : sections enrichies, recapRows, pourQui (à adapter — pas de copier-coller direct)
- `config/versus-extra-crits.ts` : support + mobile (si déjà sourcés pour la paire)
- Sources primaires citées dans review-content.ts (ex: CritiqueJeu, LaPlanqueDuJoueur, App Store)

**Interdit** : valeurs inventées, arrondis non sourcés, claims comparatifs ("le meilleur", "n°1") sans base factuelle.

---

## Section 4 — Roadmap Phase 2 versus

### Pages `/versus/[slug]/` prioritaires (5 versus manuels à créer)

| #   | Slug                  | Opérateurs          | Angle principal                                              | Volume SEO  | Priorité |
| --- | --------------------- | ------------------- | ------------------------------------------------------------ | ----------- | -------- |
| 1   | winamax-vs-betclic    | 2 ANJ enrichis      | ANJ sport face-à-face                                        | Très élevé  | P1       |
| 2   | winamax-vs-pokerstars | 2 ANJ enrichis      | ANJ poker verticale                                          | Moyen-élevé | P1       |
| 3   | stake-vs-casinozer    | 2 offshore enrichis | crypto exclusif vs crypto+fiat, 0 wager vs 100 FS sans wager | Moyen-élevé | P2       |
| 4   | madnix-vs-casinozer   | 2 offshore enrichis | catalogue précision (3 047) vs volume (5 000+)               | Moyen       | P2       |
| 5   | cresus-vs-casinozer   | 2 offshore enrichis | généraliste offshore vs crypto-first                         | Moyen       | P3       |

**Prérequis avant création** :

- Betclic enrichi end-to-end (B-FS12 — TODO restant)
- Pour winamax-vs-betclic : vérifier §16 sur les claims qui vont différencier les deux (bonus, app notes, délais de retrait)

### Pages `/comparatifs/[slug]/` prioritaires (3 mises à jour éditoriales)

| #   | Hub                        | Problème actuel                                     | Action                                                                                   |
| --- | -------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | `/comparatifs/crypto/`     | Cite Rollbit/BC.Game (hors repo)                    | Intégrer Stake + MyStake + Casinozer enrichis                                            |
| 2   | `/comparatifs/sans-wager/` | Avant enrichissements Casinozer (100 FS sans wager) | Intégrer Casinozer 100 FS + Lucky8 cashback                                              |
| 3   | `/comparatifs/mobile/`     | Notes app non citées avant Phase 1                  | Intégrer notes App Store Phase 1 (Winamax 4,6/5, Betclic 4,7/5, Unibet 4,6/5, PMU 3,5/5) |

---

## Section 5 — Conventions à formaliser

### Convention §18 (NOUVELLE — 2026-06-25)

**Règle** : différenciation `/comparatifs/[slug]/` vs `/versus/[slug]/` pour éviter la cannibalisation SEO.

**Principe** :

- `/comparatifs/[slug]/` cible des intentions génériques catégorielles ("casino crypto comparison", "casino bonus sans wager")
- `/versus/[slug]/` cible des intentions nominatives ("winamax vs betclic", "stake vs casinozer")

**Application** :

- Un hub `/comparatifs/X/` ne doit jamais cibler la requête nominative d'un versus 1v1
- Un versus `/versus/X-vs-Y/` ne doit jamais être la landing page des requêtes génériques catégorielles

**Canonical URL** : si chevauchement thématique (ex: `/comparatifs/sport/` vs `/versus/winamax-vs-betclic/`), le canonical pointe vers l'URL la plus spécifique selon l'intention — pas de balise canonical automatique, gestion cas par cas.

**Exemple** :

- `/comparatifs/sport/` → cible "meilleur casino sport france" (générique) ✅
- `/versus/winamax-vs-betclic/` → cible "winamax vs betclic" (nominatif) ✅
- Ces deux pages ne se cannibalisent pas — intentions différentes ✅

---

_Document vivant — mettre à jour après chaque décision stratégique sur les routes versus._
