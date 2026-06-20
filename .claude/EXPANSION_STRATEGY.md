# Stratégie d'expansion catalogue — meilleur-casino-en-ligne.fr

**Document de référence** — Établi en juin 2026, après le cycle de refactors structurels.

## 1. Positionnement stratégique

Le site se positionne comme le **"Wirecutter du casino"** français : éditorial, sobre, EEAT-first. Cette stratégie d'expansion vise à maximiser le SEO de niche tout en préservant ce positionnement.

### Choix structurants

1. **Inclusion ANJ** : le site couvre **opérateurs ANJ et offshore**. C'est un choix qui multiplie le volume SEO accessible mais impose une rigueur de différenciation (status légal, type de jeux disponibles, etc.).

2. **Avis critiques inclus** : les opérateurs problématiques (Vavada, Betzino, etc.) sont traités avec un avis critique honnête. C'est un signal EEAT fort.

3. **Programmes affiliés** : tous les opérateurs sont poussés, avec mise en avant prioritaire de ceux qui ont un programme d'affiliation actif. Les opérateurs sans programme (PMU, FDJ) sont inclus pour la cohérence du paysage mais pointent vers leur site officiel.

4. **17 catégories de jeux** : couverture exhaustive de la verticale jeux casino.

## 2. Cible d'expansion (~50 opérateurs)

### 🇫🇷 Opérateurs ANJ (16)

| #   | Opérateur          | Positionnement                           | Affiliation   | Risque    |
| --- | ------------------ | ---------------------------------------- | ------------- | --------- |
| 1   | Winamax            | N°1 absolu FR, poker + sport, bonus 350€ | ✅            | 🟢        |
| 2   | Betclic            | Sport-first, design moderne              | ✅            | 🟢        |
| 3   | Unibet             | Retraits instantanés réputés             | ✅            | 🟢        |
| 4   | PMU                | Centenaire, hippique, app PMU Play 2026  | ✅            | 🟢        |
| 5   | PokerStars         | Référence poker mondiale                 | ✅            | 🟢        |
| 6   | ParionsSport / FDJ | Loterie + sport, État                    | 🟡 restrictif | 🟡        |
| 7   | Bwin               | Sport + poker international              | ✅            | 🟢        |
| 8   | Betsson            | Nouveau ANJ 2023                         | ✅            | 🟢        |
| 9   | Bet365             | Lancé mai 2026 en France                 | ✅            | 🟡 récent |
| 10  | DaznBet            | Lancé mai 2026, ADN streaming            | À vérifier    | 🟡        |
| 11  | FeelingBet         | Sport-focused, interface épurée          | ✅            | 🟢        |
| 12  | YesOrNo            | Mécanique Tinder-like, lancé 2024        | ✅            | 🟡        |
| 13  | Vbet               | KYC 60 jours = discrétion                | ✅            | 🟢        |
| 14  | CircusBet          | KYC 60 jours similaire Vbet              | ✅            | 🟢        |
| 15  | Genybet            | Hippique-first                           | ✅            | 🟢        |
| 16  | Zebet              | Sport, marque PMU                        | ✅            | 🟢        |

### 🌍 Opérateurs offshore (~35)

**Top 5 actuels (déjà avec pourQui hand-edited)** :
Crésus, Lucky8, Wild Sultan, Madnix, Magical Spin

**Généralistes solides à intégrer** :
Tortuga, Casinozer, Betzino (à surveiller réforme Curaçao), Rolletto, MyStake, Rabona, BetBeast, AmonBet

**Crypto / Bitcoin-focused** :
Stake (référence), BC.Game, Vavada (avis mitigés à signaler), Cloudbet, mBit, Rainbet, Gransino

**Live / Game shows focused** :
Lucky31, Casinoly

**Challengers récents** :
Spinsy, Lizaro, Winbeatz, Spinbara, AquaWin, Spingranny, Millionaire, Julius, Rizz Casino

**Pour avis critiques (signal EEAT)** :
Vavada (avis mitigés retraits), Betzino (réforme Curaçao 2026)

## 3. Catégories de jeux (17 opérationnelles)

Toutes en production depuis juin 2026.

### Priorité 1 (verticales majeures)

- Machines à sous · Roulette · Blackjack · Casino live · Crash games · Poker · Jackpot progressif

### Priorité 2 (verticales secondaires)

- Baccarat · Vidéo poker · Game shows live · Megaways · Bingo

### Priorité 3 (verticales niches)

- Craps & Sic Bo · Keno · Loterie · Jeux à gratter · Provably Fair

## 4. Hubs SEO cross-verticale (17 opérationnels)

Tous migrés sur HubShell ou créés via HubShell.

### Casinos (12)

avec-paypal, bitcoin, bonus-sans-depot, esports, fiables, live, mobile, nouveaux, **sans-kyc**, **retrait-instantane**, **francais**, **rtp-eleve**

(les 4 en gras sont les nouveaux créés en R3 Session 3)

### Comparatifs (5)

cashback, crypto, live-casino, meilleur-bonus, retraits-rapides

### Hors HubShell

top-10-casinos-en-ligne (structurellement différent, conservé tel quel)

## 5. Refactors complétés (chronologique)

| Refactor               | Commits        | Description                                                                                                                                           |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| R2 dead-links          | (premier)      | Renommage /jeux/jackpots/ → /jeux/jackpot-progressif/, ajout video-poker au tableau categories[]                                                      |
| R1 jurisdiction        | 464a18e        | 5 champs ajoutés au modèle Operator : jurisdiction, hasBonus, isAffiliated, legalDisclaimerVariant, gameTypes. Migration des 15 opérateurs existants. |
| R3 HubShell Session 1  | (premier)      | Extraction HubShell + migration de 2 hubs pilotes (comparatifs/crypto, comparatifs/cashback)                                                          |
| R3 HubShell Session 2  | (commit batch) | Migration des 11 hubs restants vers HubShell                                                                                                          |
| R3 Session 3a Commit 1 | 89463e9        | Mini-refactor modèle Operator : 3 champs ajoutés (kycPolicy, withdrawalSpeed, supportsFrench) + 4 helpers                                             |
| R3 Session 3a Commit 2 | 1cf2dc7        | Création des 4 nouveaux hubs SEO (sans-kyc, retrait-instantane, francais, rtp-eleve)                                                                  |
| R2 Vague 1 Commit 1    | 0b75c7b        | Refactor GameCategoryInfo : ajout bestOperatorSlug + guideBody + backfill 7 catégories                                                                |
| R2 Vague 1 Commit 2    | 797c0b5        | Ajout catégorie poker avec prose éditoriale 4 paragraphes                                                                                             |
| R2 Vague 2             | bf180cf        | Ajout 4 catégories P2 : baccarat, game-shows, megaways, bingo                                                                                         |
| R2 Vague 3             | da78696        | Ajout 5 catégories P3 + convention §13 (offshore vs ANJ)                                                                                              |

## 6. Modèle Operator étendu

### Champs ajoutés en R1 (jurisdiction)

- `jurisdiction: 'offshore' | 'anj' | 'mga-eu'`
- `hasBonus: boolean`
- `isAffiliated: boolean`
- `legalDisclaimerVariant?: 'offshore-default' | 'anj' | 'crypto' | 'esports'`
- `gameTypes: ('casino' | 'sport' | 'poker' | 'horse-racing' | 'esports')[]`

### Champs ajoutés en R3 Session 3a (filtres hubs)

- `kycPolicy: 'none' | 'light' | 'standard' | 'strict'`
- `withdrawalSpeed: 'instant' | 'fast' | 'standard' | 'slow'`
- `supportsFrench: boolean`

### Helpers exposés

- `operatorsByJurisdiction`, `ANJ_OPERATORS`, `OFFSHORE_OPERATORS`
- `operatorsWithoutKyc`, `operatorsWithInstantWithdrawal`, `operatorsWithFrenchSupport`, `operatorsWithHighRtp`
- `isAnjOperator()`, `hasAffiliateProgram()`, `jurisdictionLicenceLabel()`

## 7. Plan d'exécution Phase 1 (post-refactors)

Cible : 5 opérateurs prioritaires à ajouter avec process pourQui hand-edited.

### Cible Winamax (premier opérateur ANJ)

- Premier test du parcours ANJ end-to-end
- Cas `hasBonus: false` (bonus encadré ANJ)
- Catégories : `gameTypes: ['poker', 'sport', 'horse-racing']`
- Adaptation du template review pour gérer l'absence de section bonus/VIP
- Spotlight catégorie : Winamax devient `bestOperatorSlug` de `poker` (remplace lucky8 intérimaire)

### Cible Tortuga (offshore lifestyle)

- Casino français récent (fin 2024), 5000+ jeux
- Process pourQui rodé (top 5 framework)
- Bonus généreux 1500€ + 200 FS

### Cible Stake (crypto premium)

- LA référence crypto, pas de bonus classique mais reload/rakeback
- `hasBonus: false` côté welcome offer mais `isAffiliated: true`
- Spotlight catégorie : Stake devient `bestOperatorSlug` de `provably-fair` (déjà fait) et probablement `crash` (à valider)

### Cible MyStake (sport + casino)

- Cross-vertical, app mobile saluée
- Process pourQui standard

### Cible Casinozer (généraliste solide)

- Polyvalent crypto + fiat
- Process pourQui standard

## 8. Tensions éditoriales identifiées

### Convention §13 — Offshore vs ANJ

Établie en R2 Vague 3 lors du contenu loterie + jeux-a-gratter. À appliquer
systématiquement quand le contenu compare offshore et opérateurs ANJ.

### Dette éditoriale loggée dans AUDIT_RETRO.md

- B-FS7 : horus-casino.withdrawalSpeed sans donnée source
- B-FS8 : eyebrows "2026" hardcodés (à passer en computed value)
- B-FS9 : 7 catégories existantes sans guideBody (à enrichir progressivement)

## 9. Décisions futures à anticiper

- **Réforme Curaçao 2026** : impact sur Betzino et autres opérateurs Curaçao. Veille requise.
- **Évolution réglementaire ANJ** : possible légalisation des casinos en ligne en France (machines à sous, roulette, blackjack) qui changerait fondamentalement le positionnement du site.
- **Logos** : intégration des logos casino et jeux (sujet abordé puis parqué le temps de l'expansion catalogue).
