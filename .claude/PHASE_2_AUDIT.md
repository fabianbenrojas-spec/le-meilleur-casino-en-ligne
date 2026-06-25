# Phase 2.0 — Audit baseline : versus + hubs + maillage interne

> Établi 2026-06-25. Mode lecture seule — aucun code modifié.
> Socle de référence pour Phase 2.1 (premières améliorations).

---

## Section 1 — Audit pages versus

### 1.1 Deux implémentations distinctes

Le repo contient **deux routes versus** aux URLs et architectures différentes :

| Route                  | Template                                   | Source data                                               | Statut pages                            |
| ---------------------- | ------------------------------------------ | --------------------------------------------------------- | --------------------------------------- |
| `/comparatifs/[slug]/` | Généré dynamiquement depuis `operators.ts` | `operators.ts` + `versus-extra-crits.ts` (support/mobile) | **10 pages auto-générées** (C(top5, 2)) |
| `/versus/[slug]/`      | Manuel, data dans `versus-content.ts`      | `versus-content.ts` (matchup complet)                     | **1 page** (cresus-vs-lucky8)           |

Les fiches opérateurs (`casinos/[slug]`) linkent vers la route `/comparatifs/[slug]/` (correcte).
Il n'existe pas de page listing `/versus/` (le répertoire ne contient que `[slug]`).

---

### 1.2 Route `/comparatifs/[slug]/` — 10 pages auto-générées

**Génération :** `generateStaticParams` prend le TOP 5 par rating → C(5,2) = 10 combinaisons.

**Top 5 courant** (cresus 9.2, lucky8 8.9, + 3 parmi wild-sultan/madnix/magical-spin selon rating exact).

**10 matchups auto-générés :**

| Slug                        | Statut éditorial                                | Extra-crits (support+mobile) |
| --------------------------- | ----------------------------------------------- | ---------------------------- |
| cresus-vs-lucky8            | Partiellement enrichi (data live + extra-crits) | ✅                           |
| cresus-vs-wild-sultan       | Partiellement enrichi                           | ✅                           |
| cresus-vs-madnix            | Partiellement enrichi                           | ✅                           |
| cresus-vs-magical-spin      | Partiellement enrichi                           | ✅                           |
| lucky8-vs-wild-sultan       | Partiellement enrichi                           | ✅                           |
| lucky8-vs-madnix            | Partiellement enrichi                           | ✅                           |
| lucky8-vs-magical-spin      | Partiellement enrichi                           | ✅                           |
| wild-sultan-vs-madnix       | Partiellement enrichi                           | ✅                           |
| wild-sultan-vs-magical-spin | Partiellement enrichi                           | ✅                           |
| madnix-vs-magical-spin      | Partiellement enrichi                           | ✅                           |

**Contenu auto-généré :** note globale, bonus, RTP, paiements (WagerSimulator), support, mobile.
**Manquant :** intro narrative, verdict éditorial personnalisé, pourquoi choisir l'un ou l'autre.
**Liens internes présents :** liens vers `/casinos/${opA.slug}/` et `/casinos/${opB.slug}/` (lignes 368, 459, 811).

**Risque structurel :** Si le top 5 bouge après enrichissements ANJ (winamax, betclic entrant dans le top 5), les paires extra-crits ne couvrent plus les nouveaux matchups → section support+mobile absente pour les nouvelles paires.

---

### 1.3 Route `/versus/[slug]/` — 1 page manuelle enrichie

| Slug             | Opérateurs       | Enrichissement | Dernière modification |
| ---------------- | ---------------- | -------------- | --------------------- |
| cresus-vs-lucky8 | Crésus vs Lucky8 | ✅ Complet     | commit 2546b4d        |

**Contenu présent :** intro (30 mots), tableau critères 9 entrées, 6 sections prose (bonus, ludothèque, paiements, support, mobile, sécurité) + verdict 3+3 raisons.
**Manquant :** liens vers fiches internes (seuls les CTAs affiliate sont présents).

**Interface VersusMatchup :**

```typescript
{ slug, slugA, slugB, winner: 'a'|'b',
  intro, criteria: VsCriterion[], sections: VsSection[],
  verdictIntro, verdictA: string[], verdictB: string[] }
```

---

### 1.4 Versus manquants — priorités stratégiques

Basé sur la Phase 1 (13 opérateurs enrichis end-to-end) et les intentions de recherche FR :

**Priorité 1 — ANJ face-à-face (volume SEO élevé)**

| Slug                  | Opérateurs         | Moteur SEO                                   |
| --------------------- | ------------------ | -------------------------------------------- |
| winamax-vs-betclic    | 2 ANJ enrichis     | "Winamax ou Betclic", requête très fréquente |
| winamax-vs-pokerstars | 2 ANJ enrichis     | "meilleur casino poker ANJ"                  |
| betclic-vs-unibet     | 2 ANJ enrichis     | "Betclic ou Unibet" sport                    |
| unibet-vs-winamax     | ANJ multi-vertical | intention "meilleur ANJ complet"             |
| winamax-vs-pmu        | ANJ hippique+sport | "PMU vs Winamax hippique"                    |

**Priorité 2 — Offshore enrichis (niche mais conversion élevée)**

| Slug                  | Opérateurs          | Angle différenciant                               |
| --------------------- | ------------------- | ------------------------------------------------- |
| stake-vs-casinozer    | 2 offshore enrichis | crypto exclusif vs crypto+fiat                    |
| cresus-vs-casinozer   | 2 offshore enrichis | généraliste vs crypto natif                       |
| madnix-vs-casinozer   | 2 offshore enrichis | catalogue 3047 vs 5000+ + crypto                  |
| cresus-vs-wild-sultan | (extra-crits dispo) | retrait 24h vs crypto < 1h                        |
| stake-vs-mystake      | 2 offshore enrichis | 100% crypto vs multi-méthodes, 0 wager vs 3 bonus |

---

## Section 2 — Audit hubs catégories

### 2.1 Inventaire exhaustif (17 hubs)

Tous les 17 hubs ont la structure HubShell complète (H1, intro, ListingPageClient, editorialContent, FAQ). **Aucun hub squelette.**

#### Casinos (12 hubs) — sous `/casinos/`

| Hub                    | Slug               | Filtre opérateurs                          | Editorial (est. mots FR) | FAQ (items) | Staleness post-Phase 1                    |
| ---------------------- | ------------------ | ------------------------------------------ | ------------------------ | ----------- | ----------------------------------------- |
| Casinos Bitcoin        | bitcoin            | paymentMethods ∩ CRYPTO_METHODS            | ~350 mots                | 6           | ⚠️ cite Rollbit/BC.Game (hors repo)       |
| Casinos avec PayPal    | avec-paypal        | paymentMethods ∩ paypal/PAYS               | ~300 mots                | 5           | 🟢                                        |
| Bonus sans dépôt       | bonus-sans-depot   | bonusType ou feature bonus-no-deposit      | ~280 mots                | 5           | 🟢                                        |
| Casinos e-sport        | esports            | gameTypes includes 'esports'               | ~260 mots                | 5           | ⚠️ Casinozer/MyStake ajoutés (esports)    |
| Casinos fiables        | fiables            | rating ≥ seuil ou jurisdiction             | ~300 mots                | 5           | 🟢                                        |
| Casinos français (ANJ) | francais           | supportsFrench: true (ou jurisdiction ANJ) | ~280 mots                | 5           | ⚠️ 5 ANJ enrichis, prose à aligner        |
| Casino live            | live               | features live ou gameTypes 'casino'        | ~300 mots                | 5           | 🟢                                        |
| Casino mobile          | mobile             | tous (filtre UX mobile)                    | ~270 mots                | 5           | ⚠️ Stake/MyStake sans app notés           |
| Nouveaux casinos       | nouveaux           | launchYearFrance récent                    | ~260 mots                | 5           | 🟢                                        |
| Retrait instantané     | retrait-instantane | withdrawalSpeed 'instant'\|'fast'          | ~300 mots                | 5           | ⚠️ Betclic SEPA Instant < 15 min non cité |
| RTP élevé              | rtp-eleve          | rtp ≥ seuil (ex: 96.5)                     | ~270 mots                | 5           | ⚠️ Stake Originals RTP 97-99% non cité    |
| Sans KYC               | sans-kyc           | kycPolicy 'none'\|'light'                  | ~280 mots                | 5           | 🟡 peu d'opérateurs qualifiés             |

#### Comparatifs (5 hubs) — sous `/comparatifs/`

| Hub              | Slug             | Filtre opérateurs                                | Editorial (est. mots FR) | FAQ (items) | Staleness post-Phase 1                                     |
| ---------------- | ---------------- | ------------------------------------------------ | ------------------------ | ----------- | ---------------------------------------------------------- |
| Casino Crypto    | crypto           | paymentMethods ∩ CRYPTO_METHODS, trié nb cryptos | ~400 mots                | 6           | ⚠️ cite Rollbit/BC.Game (hors repo), Stake/MyStake ajoutés |
| Cashback         | cashback         | features cashback                                | ~280 mots                | 5           | ⚠️ Casinozer 15% + MyStake 10% non cités en prose          |
| Live casino      | live-casino      | features live                                    | ~300 mots                | 5           | 🟢                                                         |
| Meilleur bonus   | meilleur-bonus   | hasBonus: true, trié bonusAmountNumber           | ~280 mots                | 5           | ⚠️ MyStake 1500€ au choix ajouté — pas dans prose          |
| Retraits rapides | retraits-rapides | withdrawalSpeed ou features                      | ~300 mots                | 6           | ⚠️ Winamax/Betclic enrichis non cités en prose             |

#### Hors HubShell (1)

| Page           | Slug                    | Structure                   | Statut                |
| -------------- | ----------------------- | --------------------------- | --------------------- |
| Top 10 casinos | top-10-casinos-en-ligne | Propriétaire (pas HubShell) | À vérifier séparément |

---

### 2.2 Hubs par potentiel SEO FR — classement des 5 prioritaires

| Rang | Hub                            | URL                                          | Volume SEO estimé | Argument                                                          |
| ---- | ------------------------------ | -------------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| 1    | Casino crypto / Casino Bitcoin | `/comparatifs/crypto/` + `/casinos/bitcoin/` | Élevé             | "casino crypto france" : 3 200-8 000 req/mois estimées            |
| 2    | Casinos français / ANJ         | `/casinos/francais/`                         | Élevé             | "casino en ligne légal france", "casino ANJ" : intention sécurité |
| 3    | Meilleur bonus                 | `/comparatifs/meilleur-bonus/`               | Élevé             | "meilleur bonus casino" : volume fort, conversion directe         |
| 4    | Retrait instantané             | `/comparatifs/retraits-rapides/`             | Moyen-élevé       | "casino retrait rapide" : intention achat, conversion forte       |
| 5    | Casino live                    | `/casinos/live/`                             | Moyen             | "meilleur casino live" : niche qualitative                        |

---

### 2.3 Catégories de jeux sans guideBody (B-FS9 ouvert)

7 catégories P1 sans prose éditoriale dans `games.ts` :

| Catégorie          | Slug               | Priorité | Volume SEO  |
| ------------------ | ------------------ | -------- | ----------- |
| Machines à sous    | machines-a-sous    | P1       | Très élevé  |
| Roulette           | roulette           | P1       | Élevé       |
| Blackjack          | blackjack          | P1       | Élevé       |
| Casino live        | live               | P1       | Élevé       |
| Crash games        | crash              | P1       | Moyen-élevé |
| Vidéo poker        | video-poker        | P1       | Moyen       |
| Jackpot progressif | jackpot-progressif | P1       | Moyen       |

Ces 7 catégories ont `guideTitle` + `guideSummary` mais pas de `guideBody[]`. Les 10 catégories P2/P3 ont des guideBody enrichis (poker, baccarat, game-shows, megaways, bingo, craps-sic-bo, keno, loterie, jeux-a-gratter, provably-fair).

---

## Section 3 — Audit maillage interne

### 3.1 Mapping directionnel

```
Hubs (/casinos/* et /comparatifs/*) ──→ Fiches (/casinos/[slug]/)
  OperatorCard (composant listing) : href="/casinos/${op.slug}/" ✅

Fiches (/casinos/[slug]/) ──→ Top 15 (/casinos/)          ✅ (Band 3 lien #1)
                           ──→ Versus (/comparatifs/x-vs-y) ✅ auto-généré, same-jurisdiction (Band 3 liens #2/#3)
                           ──→ Alternatives (/casinos/alternatives/) ⛔ PAGE INEXISTANTE
                           ──→ Hubs thématiques               ❌ ABSENT

Versus (/comparatifs/[slug]/) ──→ Fiches                   ✅ (liens lignes 368, 459, 811)
                              ──→ Hubs                      ❌ ABSENT

Versus (/versus/[slug]/)     ──→ Fiches                    ❌ ABSENT (CTAs = affiliate ext. seulement)
                             ──→ Hubs                      ❌ ABSENT

Hubs ──→ Versus                                            ❌ ABSENT
```

### 3.2 Bug structurel identifié : lien brisé `/casinos/alternatives/`

La fiche `/casinos/[slug]/page.tsx` (ligne 920) génère :

```tsx
href = '/casinos/alternatives/'
```

Ce répertoire **n'existe pas** (`ls app/[locale]/casinos/` ne montre pas `alternatives/`).
→ Lien mort sur toutes les fiches opérateurs.

### 3.3 Opportunités de maillage manquant — Top 10

**Fiches → Hubs thématiques spécifiques (5 liens prioritaires)**

| Fiche                                 | Hub à relier                                           | Pertinence                        |
| ------------------------------------- | ------------------------------------------------------ | --------------------------------- |
| Stake (`/casinos/stake/`)             | `/casinos/bitcoin/` + `/comparatifs/crypto/`           | Stake = opérateur crypto exclusif |
| Casinozer (`/casinos/casinozer/`)     | `/casinos/bitcoin/` + `/comparatifs/cashback/`         | Crypto natif + 100 FS             |
| MyStake (`/casinos/mystake/`)         | `/comparatifs/crypto/` + `/comparatifs/cashback/`      | Cashback crypto 10%               |
| Winamax (`/casinos/winamax/`)         | `/casinos/francais/`                                   | ANJ N°1 FR                        |
| Wild Sultan (`/casinos/wild-sultan/`) | `/casinos/bitcoin/` + `/comparatifs/retraits-rapides/` | Retrait crypto < 1h               |

**Versus → Fiches (Route /versus/[slug]/)**

| Versus                          | Fiches à lier                           |
| ------------------------------- | --------------------------------------- |
| cresus-vs-lucky8                | `/casinos/cresus/` + `/casinos/lucky8/` |
| (toutes futures pages /versus/) | Les 2 fiches des opérateurs comparés    |

**Hubs → Versus (5 liens éditoriaux)**

| Hub                              | Versus à mentionner dans l'editorialContent              |
| -------------------------------- | -------------------------------------------------------- |
| `/comparatifs/crypto/`           | `stake-vs-casinozer` (à créer)                           |
| `/casinos/bitcoin/`              | `stake-vs-casinozer` (à créer)                           |
| `/comparatifs/retraits-rapides/` | `winamax-vs-betclic` (à créer)                           |
| `/casinos/francais/`             | `winamax-vs-betclic` + `winamax-vs-pokerstars` (à créer) |
| `/comparatifs/meilleur-bonus/`   | `cresus-vs-casinozer` (à créer)                          |

---

## Section 4 — Priorisation business

### 4.1 Tableau de priorisation (10 pages Phase 2.1)

| #   | Page                           | Type             | État actuel                                       | Volume SEO  | Impact affiliation                          | Priorité |
| --- | ------------------------------ | ---------------- | ------------------------------------------------- | ----------- | ------------------------------------------- | -------- |
| 1   | /comparatifs/crypto/           | Hub comparatif   | Partiel — prose stale (Rollbit/BC.Game hors repo) | Élevé       | Élevé (Stake/MyStake enrichis)              | P1       |
| 2   | /casinos/francais/             | Hub casino       | Partiel — prose pré-ANJ enrichissements           | Élevé       | Élevé (5 ANJ enrichis dont Winamax N°1)     | P1       |
| 3   | winamax-vs-betclic             | Versus (à créer) | Inexistant                                        | Très élevé  | Très élevé (2 ANJ affiliés)                 | P1       |
| 4   | /comparatifs/meilleur-bonus/   | Hub comparatif   | Partiel — MyStake 1500€ non cité prose            | Élevé       | Élevé (MyStake ajouté aujourd'hui)          | P1       |
| 5   | stake-vs-casinozer             | Versus (à créer) | Inexistant                                        | Moyen-élevé | Élevé (2 crypto enrichis, angles distincts) | P2       |
| 6   | /comparatifs/retraits-rapides/ | Hub comparatif   | Partiel — Betclic SEPA Instant non cité           | Moyen-élevé | Élevé                                       | P2       |
| 7   | cresus-vs-casinozer            | Versus (à créer) | Inexistant                                        | Moyen       | Élevé (2 offshore enrichis)                 | P2       |
| 8   | /casinos/bitcoin/              | Hub casino       | Partiel — stale (Rollbit/BC.Game)                 | Moyen-élevé | Moyen (Stake enrichi)                       | P2       |
| 9   | winamax-vs-pokerstars          | Versus (à créer) | Inexistant                                        | Moyen       | Moyen (ANJ poker)                           | P3       |
| 10  | /comparatifs/cashback/         | Hub comparatif   | Partiel — Casinozer 15% + MyStake 10% non cités   | Moyen       | Moyen                                       | P3       |

---

### 4.2 Notes de qualification

**Versus à créer (route `/versus/[slug]/`)** : nécessitent un VersusMatchup complet (intro, criteria[], sections[], verdict). Effort : ~3-4h par page avec process Phase 1.

**Hubs à mettre à jour (editorialContent JSX)** : mise à jour du prose pour citer les opérateurs nouvellement enrichis avec leurs angles spécifiques. Effort : 1-2h par hub (relecture + réécriture prose + FAQ si nécessaire).

**Bug `/casinos/alternatives/`** : à créer ou remplacer par un lien vers `/casinos/` dans la Band 3 de la fiche. Effort : 30 min.

---

## Section 5 — Recommandation Phase 2.1

### Première page à attaquer : `/comparatifs/crypto/` (mise à jour éditoriale)

**Pourquoi en premier :**

1. **Impact immédiat sur un hub live** : le hub `/comparatifs/crypto/` est en production avec 6 FAQ et ~400 mots éditoriaux. La mise à jour est chirurgicale (remplacement prose + FAQ) — pas de création de nouvelle page.

2. **Staleness critique** : le hub cite actuellement Rollbit et BC.Game dans sa prose éditoriale. Ces opérateurs ne sont pas dans le repo. L'éditorial contient des claims non vérifiables qui contredisent notre positionnement EEAT.

3. **Contexte Phase 1 parfait** : Stake (crypto exclusif, Provably Fair, Stake Originals, pas de wager, retrait < 2h, 10+ devises) et MyStake (cashback crypto 10% sans wager, 11 cryptos) viennent d'être enrichis. Leurs angles distinctifs s'intègrent directement dans la prose du hub.

4. **Volume SEO** : "casino crypto france" + "meilleur casino bitcoin" = requêtes commerciales à fort volume et fort intent d'achat.

5. **Pas de dépendance** : aucune autre page ne doit être créée d'abord.

**Alternative si versus prioritaire** : `winamax-vs-betclic` a le plus fort volume SEO potentiel, mais nécessite la création d'un VersusMatchup complet (plus d'effort, sans les angles Phase 1 crypto).

**Recommandation séquence Phase 2.1 :**

1. Fix bug `/casinos/alternatives/` (30 min, bloquant UX)
2. Update `/comparatifs/crypto/` prose + FAQ (1-2h)
3. Créer versus `winamax-vs-betclic` (3-4h)
4. Update `/casinos/francais/` prose (1-2h)
5. Update `/comparatifs/meilleur-bonus/` (1h)

---

_Audit Phase 2.0 — lecture seule — 2026-06-25_
