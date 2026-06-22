# Conventions éditoriales

> Règles de rédaction transversales, distinctes du planning structurel
> (`AUDIT_RETRO.md`). À consulter avant toute rédaction/relecture de contenu
> éditorial (reviews, guides, comparatifs).

## pourQui (review-content.ts)

Les items `idealSi` / `bonChoixSi` / `aEviterSi` de tous les `pourQui`
(toutes reviews) utilisent la **2e personne du pluriel** ("vous").

- Pas de 3e personne ("Veut récupérer ses gains...").
- Pas d'impératif ("Retirez vos gains...").
- Chaque item doit citer au moins un fait chiffré sourcé depuis
  `rd.sections.*` / `rd.verdict` du même opérateur — jamais une affirmation
  non vérifiable dans le repo.

Établi 2026-06-16 lors de la relecture éditoriale du `pourQui` Crésus
(remplacement de la version IA initiale).

## Vocabulaire technique obligatoire

Les `pourQui` utilisent des termes techniques précis quand ils existent.
PAS de substitution par des termes journalistiques plus généraux.

| Concept            | Terme à utiliser                                                                                      | À éviter                     |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------- |
| Cashback           | "Versé en argent réel" ou "sans wager"                                                                | "Remboursé", "remboursement" |
| Bonus de bienvenue | "Activer le bonus"                                                                                    | "Réclamer", "obtenir"        |
| Wager              | "Wager 35×" (chiffre toujours adjacent)                                                               | "Conditions de mise" seul    |
| Retrait            | Distinguer "retirer" (action) de "jouer" (action différente) — le KYC bloque les retraits, pas le jeu | —                            |
| RTP                | "RTP 96,X%" (toujours avec le chiffre)                                                                | "Taux de redistribution"     |
| Cagnotte tournoi   | "Cagnottes en espèces réelles"                                                                        | "Récompenses", "lots"        |

## Angles éditoriaux réservés par opérateur

Chaque opérateur du top 5 possède des angles éditoriaux distinctifs.
Ces angles NE DOIVENT PAS être utilisés dans le `pourQui` d'un autre
opérateur, même si la donnée serait techniquement valide. C'est ce qui
empêche les fiches d'être interchangeables.

### Crésus Casino (rang 1) — territoire éditorial

- ✅ Réservés : retrait 24h testé, support FR 7j/7 ~2 min, équilibre
  général, licence Curaçao en aEviterSi
- ❌ Interdits ailleurs : aucun de ces angles ne doit apparaître dans
  un autre `pourQui`

### Lucky8 (rang 2) — territoire éditorial

- ✅ Réservés : cashback hebdo 10% sans wager, tournois slots avec
  cagnottes en espèces, plafond journalier 2 000€, KYC long 24-72h
- ❌ Interdits ailleurs : cashback (unique au repo), tournois (unique)

### Wild Sultan (rang 3) — territoire éditorial

- ✅ Réservés : retrait crypto BTC/ETH < 1h, live VIP haute mise jusqu'à
  10 000€, mobile crypto (LCP 1,7s + dépôt crypto intégré), wager 30×
  (le plus bas du repo), Big Time Gaming au catalogue, interface EN /
  FR limité 10h-22h en aEviterSi, e-wallets/MC absents en aEviterSi
- ❌ Interdits ailleurs : crypto rapide (BTC/ETH < 1h), tables live VIP
  10 000€, BTG (Big Time Gaming), wager 30× comme plus bas

### Madnix (rang 4) — territoire éditorial

- ✅ Réservés : catalogue n°1 absolu chiffré (3 047 jeux juin 2026),
  missions quotidiennes (mécanique unique), 5 niveaux VIP progression,
  mobile gamifié (missions en 1 clic), live mises variables 0,10€-5 000€,
  wager 40× en aEviterSi (le plus élevé du top 5 traité), plafond hebdo
  3 000€ en aEviterSi
- ❌ Interdits ailleurs : missions quotidiennes (mécanique unique),
  3 047 jeux chiffré, wager 40× comme défaut

### Magical Spin (rang 5) — territoire éditorial

- ✅ Réservés : package 1 000€ cumulé sur 4 dépôts (le plus généreux en
  valeur absolue), gestionnaire VIP francophone réel (avec WhatsApp au
  Platine), spécialisation slots françaises + Microgaming, support FR
  maîtrisant CGU (compétence pas vitesse), ancienneté 2017 / 9 ans /
  KYC rigoureuse, interface 2017 + LCP 2,4s en aEviterSi, absence de
  crypto en aEviterSi
- ❌ Interdits ailleurs : 1 000€ cumulé sur 4 dépôts, gestionnaire VIP
  WhatsApp, slots françaises + Microgaming comme spécialisation, LCP 2,4s
  comme défaut, absence totale crypto

### Betclic (ANJ — rang 2 ANJ, derrière Winamax) — territoire éditorial

Établi 2026-06-21 lors de l'enrichissement complet Commit Y.

- ✅ Réservés :
  - App native 4,7/5 iOS + 4,5/5 Google Play (chiffres bruts — pas de claim "meilleur")
  - Retraits SEPA Instant testés en moins de 15 minutes (source : MediaPronos mai 2026)
  - Live chat 7j/7 (différenciant ANJ — Winamax n'a pas de live chat)
  - Outils de gestion de mise : Cash Out + annulation pari (5×/jour, 2 min) + MyCombi
  - Partenariats sport français institutionnels : Équipe de France football, Top 14 rugby, Betclic Elite basket
  - Pas de support téléphonique en aEviterSi (live chat + e-mail disponibles, zéro téléphone)
  - Pas de live casino en aEviterSi (pivot choisi vs "pas de slots/roulette/blackjack" pour différencier de Winamax)
- ❌ Interdits ailleurs :
  - App 4,7/5 iOS comme chiffre brut (unique à Betclic dans notre comparatif)
  - SEPA Instant < 15 min testé
  - Live chat 7/7 comme différenciant ANJ
  - Partenariats institutionnels sport français (Équipe de France, Top 14, Betclic Elite)
- ⚠️ Note :
  - Groupe Flutter Entertainment (LSE : FLTR) — peut être mentionné en section securite, pas en pourQui
  - licenceNumber ANJ exact à valider sur registre ANJ avant injection

---

### Unibet (ANJ — rang 3 ANJ) — territoire éditorial

Établi 2026-06-22 lors de l'enrichissement complet Commit Z.

- ✅ Réservés :
  - Adossement groupe FDJ United depuis octobre 2024 (État français co-actionnaire)
  - Fusion Parions Sport en Ligne le 24 mars 2026 (angle SEO "Parions Sport")
  - Jusqu'à 450 € cumulables sur 3 verticales ANJ (sport + poker + turf)
  - Triple agrément ANJ post-fusion (différencié de Winamax "depuis 2010 à l'origine")
  - Live chat répondant en moins d'une minute (test Eurosport) + téléphone disponible
  - Skrill accepté en retrait (rare parmi les opérateurs ANJ français)
  - NBA partenaire officiel plurisaisons + Olympique de Marseille
  - Bonus en freebets (pas en argent réel) en aEviterSi
  - Live chat 8h-minuit en aEviterSi (pas de couverture nocturne)
- ❌ Interdits ailleurs :
  - Adossement FDJ United depuis octobre 2024
  - Fusion Parions Sport en Ligne mars 2026
  - 450 € cumulables sur 3 verticales ANJ
  - Skrill en retrait comme rare ANJ
  - Chat répondant < 1 minute (Eurosport)
- ⚠️ Note :
  - App iOS 4,6/5 = Winamax 4,6/5 → NE PAS en faire angle distinctif Unibet
  - Retrait instantané annoncé (mars 2024) — non chiffré précisément → NE PAS en faire angle principal
  - licenceNumber ANJ exact à valider

---

### PokerStars (ANJ — 5e opérateur ANJ enrichi) — territoire éditorial

Établi 2026-06-22 lors de l'enrichissement complet Commit BB.

- ✅ Réservés :
  - Liquidité partagée ESPT (France + Espagne + Portugal) — 3 marchés ANJ
  - Tournois mondiaux propriétaires WCOOP, SCOOP, SECOOP, Galactic Series, Sunday Million
  - Power Path → tickets EPT jusqu'à 9 300 €
  - Spin & Go avec multiplicateur jusqu'à x12 000 (avec rareté assumée — 84% tables = x2)
  - Stars Rewards cashback jusqu'à 40 % sur rake (à monitorer §16)
  - Spin & Bet sport multiplicateur jusqu'à x10 (format propriétaire en France)
  - Live chat 24h/24, 7j/7 (permanence 24h)
  - Code d'activation par courrier postal (friction inscription)
  - 2 apps séparées (poker + sport) en aEviterSi
  - App sport notée 4,2/5 iOS + 3,7/5 Android en aEviterSi (honnêteté assumée)
- ❌ Interdits ailleurs :
  - Liquidité partagée ESPT
  - WCOOP, SCOOP, SECOOP (tournois propriétaires PokerStars)
  - Power Path → tickets EPT
  - Spin & Go x12 000 multiplicateur
  - Stars Rewards cashback 40% rake
  - Spin & Bet sport x10
  - Code d'activation courrier postal
- ⚠️ Note :
  - PokerStars ≠ "opérateur poker historique du marché français" (Winamax). PokerStars pivot sur "référence mondiale" + liquidité ESPT
  - PokerStars Sports = ex-BetStars (renommé 2020), licence ANJ n° 0006-PS-2016-06-07 depuis juin 2016
  - Flutter Entertainment = groupe PokerStars (peut être mentionné en securite, jamais en pourQui)
  - Bonus sport en freebets (≠ cash PMU/Winamax/Betclic) — à noter en aEviterSi si besoin
  - gameTypes : ['poker', 'sport'] — CORRECTION du squelette Commit 3 qui avait ['poker'] uniquement
  - foundedYear 2001 (PokerStars mondial) + launchYearFrance 2010 (poker ANJ) + sport ANJ 2016

---

### PMU (ANJ — 4e opérateur ANJ enrichi) — territoire éditorial

Établi 2026-06-22 lors de l'enrichissement complet Commit AA.

- ✅ Réservés :
  - Formats hippiques exclusifs : Quinté+ (e-cagnotte), Jackpot, Champ Libre, Super 4, Pick 5
  - Streaming Equidia intégré (partenariat exclusif filière hippique)
  - GIE depuis 1930 + mission collective filière hippique (France Galop, Le Trot)
  - Bonus sport 100 € en argent réel sans wager, retirable dès 1 €
  - Seuil de retrait 1 € — le plus bas du marché (à monitorer §16)
  - 3 applications spécialisées en bonChoixSi (spécialisation par verticale)
  - Sourdline service téléphonique parieurs malentendants (rare en ANJ FR — à monitorer §16)
  - 3 apps séparées en aEviterSi (pas d'app unifiée)
  - Retrait virement bancaire uniquement, délai 3-5 jours (limitation factuelle)
- ❌ Interdits ailleurs :
  - Quinté+ et formats hippiques exclusifs propriétaires
  - Streaming Equidia intégré
  - GIE 1930 mission collective hippique
  - Seuil de retrait 1 € comme différenciant
  - Sourdline service parieurs malentendants
  - Retrait virement uniquement comme limitation spécifique PMU
- ⚠️ Note :
  - PMU = GIE filière hippique ≠ FDJ/Unibet (État actionnaire) — distinction juridique obligatoire
  - "mission collective" ≠ "entreprise publique" (le GIE est privé, membres = sociétés de courses)
  - Bonus PMU non cumulables : 1 code par compte, choisir entre sport/hippique/poker
  - Notes App Store/Play Store non sourcées juin 2026 — à ne pas inventer, mention TODO inline

---

### Winamax (premier opérateur ANJ) — territoire éditorial

Établi 2026-06-21 lors de l'injection du pourQui Commit 4.

- ✅ Réservés :
  - Légalité ANJ + 15 ans de présence sur le marché français régulé (2010)
  - App unifiée poker+sport depuis 2010, 4,6/5 App Store (pivot §16 : Betclic 4,7/5 iOS — ancienneté de l'unification comme angle différenciant)
  - Cotes les plus compétitives du marché ANJ sur le sport (pivot §16 : bonus cash devenu partagé Betclic + PMU mars 2026 — sourcé BasketUSA juin 2026)
  - Écosystème 3 disciplines unifié (poker + sport + hippique, compte unique)
  - Opérateur poker historique du marché français
  - Pas de live chat ni téléphone en aEviterSi (support formulaire + e-mail uniquement)
  - Slots / roulette / blackjack interdits ANJ en aEviterSi (3 catégories nommées)
- ❌ Interdits ailleurs :
  - Licence ANJ — cet angle est réservé aux opérateurs ANJ uniquement ; ne
    jamais utiliser "ANJ" pour qualifier un avantage d'un opérateur offshore
  - 15 ans de présence sur le marché français régulé (unique à Winamax dans
    notre comparatif)
  - Communauté poker historique FR — ne pas réutiliser pour des opérateurs
    offshore qui proposent aussi du poker

## Erreurs fréquentes à éviter (mémoire des corrections)

1. **Vocabulaire juridique imprécis**
   - ❌ "Remboursé" pour un cashback (un cashback n'est pas une annulation)
   - ✅ "Versé en argent réel"

2. **Adverbes creux et adjectifs interprétatifs**
   - ❌ "Simple", "simplement", "rapidement" (sans chiffre adjacent)
   - ❌ "Sans condition de mise" (ambigu, dire "sans wager")

3. **Imprécision sur "jouer" vs "retirer"**
   - ❌ "Vous voulez jouer immédiatement après inscription" si on parle
     du KYC (le KYC bloque le retrait, pas le jeu)
   - ✅ "Vous voulez retirer dès vos premiers gains"

4. **"Grosses sommes", "sommes importantes"**
   - ❌ Vague, subjectif
   - ✅ Mentionner le seuil EXACT du plafond : "plus de X € par [unité]"

5. **Verbes passifs en ouverture**
   - ❌ "Vous suivez", "vous appréciez", "vous aimez"
   - ✅ "Vous participez", "vous jouez", "vous misez", "vous retirez"

6. **Promesses implicites**
   - ❌ "Vous voulez gagner", "Vous aimez les gros bonus"
   - ✅ "Vous misez régulièrement", "Vous activez le bonus de bienvenue"

7. **Mention de concurrent**
   - ❌ "Plus rapide que [autre op]"
   - ✅ Mentionner le chiffre seul, laisser le lecteur comparer

## Process de rédaction pourQui

Le process suit cette séquence stricte, validée sur 2 opérateurs :

1. **Extraction des données** (Claude Code, lecture seule)
   - `op.tagline`, `op.pros`, `op.cons`, `op.features`, `op.bonusAmount`,
     `op.rtp`, `op.affiliateUrl`
   - `rd.verdict`, `rd.sections.*` (toutes), `rd.pourQui` actuel, `rd.faq`,
     `rd.recapRows`
   - Contexte concurrentiel (rang TOP_10, voisins immédiats)

2. **Brief éditorial** (humain via assistant)
   - Positionnement éditorial spécifique
   - Sources autorisées listées explicitement
   - Angles différenciants vs voisins (avec interdictions explicites
     pour préserver les territoires des autres opérateurs)
   - Templates par item avec exemples acceptables/évités

3. **Rédaction** (Claude Code selon brief)
   - 3 idealSi + 2 bonChoixSi + 2 aEviterSi
   - Auto-validation 7 tests par item
   - STOP avant injection

4. **Audit relecture** (humain via assistant)
   - Test par item : vocabulaire technique, précision factuelle,
     formulation active, longueur, ton sobre, différenciation,
     honnêteté aEviterSi
   - Reformulations consolidées

5. **Injection** (Claude Code après arbitrage humain)
   - Commit dédié par opérateur, type `chore(review):`
   - Body documentant les corrections appliquées

Self-checks : `tsc`, `lint`, `build`, vérification SSR.

NE PAS injecter directement la sortie Claude Code sans phase 4.
L'expérience sur Crésus (4 corrections) et Lucky8 (5 corrections) montre
que la couche relecture humaine attrape systématiquement des nuances
critiques que l'auto-validation ne détecte pas.

## §14 — Valeurs placeholder pour opérateurs sans bonus (hasBonus: false)

Établi 2026-06-20 lors de la préparation du template review pour Winamax.

Quand `hasBonus: false`, les champs bonus gardent des valeurs syntaxiquement
valides mais sémantiquement neutres, pour éviter des erreurs TypeScript tout
en signalant clairement l'absence de bonus.

| Champ               | Valeur placeholder          |
| ------------------- | --------------------------- |
| `bonusAmount`       | `'—'`                       |
| `bonusSuffix`       | _(absent, ne pas définir)_  |
| `bonusConditions`   | `'Sans bonus de bienvenue'` |
| `bonusAmountNumber` | `0`                         |
| `bonusSlug`         | `'no-bonus'`                |

Ces valeurs ne seront jamais affichées (les guards `op.hasBonus` les masquent
dans le template), mais doivent être présentes pour la compatibilité TypeScript
avec l'interface `Operator`.

## §15 — Sections ReviewData optionnelles par jurisdiction

Établi 2026-06-21 lors de la préparation du modèle ReviewData pour Winamax.

Les sections `bonus`, `jeux`, `live`, `vip` de `ReviewData.sections` sont
optionnelles depuis le Commit 2 Phase 1 ANJ. Règles par profile :

**Opérateurs offshore / MGA** (`jurisdiction: 'offshore' | 'mga-eu'`) :
Toutes les sections fournies — compatibilité historique avec les 15 entrées
existantes. Ne pas omettre de section.

**Opérateurs ANJ** (`jurisdiction: 'anj'`) :

- `bonus` : typiquement `undefined` (hasBonus: false pour les casinos ANJ)
- `live` : typiquement `undefined` (pas de live casino autorisé en ANJ)
- `vip` : typiquement `undefined` (programme fidélité ANJ ≠ programme VIP offshore)
- `jeux` : FOURNI — réutilisé pour la prose poker / paris sportifs selon gameTypes
  (le titre dynamique via `getSectionTitle()` s'adapte automatiquement)

**Sections universellement requises** (applicables ANJ + offshore) :
`paiements`, `support`, `mobile`, `securite`

**Impact template** : le filtre `entry[1] !== undefined` sur `Object.entries(rd.sections)`
dans la boucle de sections garantit qu'une section absente ou `undefined` n'est
jamais rendue — sans guard supplémentaire à écrire par section.

## §13 — Statut juridique offshore vs ANJ

Établi 2026-06-20 lors de l'injection des catégories loterie et jeux-à-gratter
(R2 Vague 3/3). Deviendra critique à Phase 1 (ajout Winamax et autres opérateurs ANJ).

Quand le contenu mentionne des plateformes offshore aux côtés des opérateurs
ANJ (FDJ, PMU, Winamax, etc.) :

1. Signaler que les plateformes offshore n'ont pas d'autorisation française.
2. Préciser que les opérateurs ANJ sont les seules options légales en France métropolitaine.
3. Indiquer que l'usage d'une plateforme offshore relève de la responsabilité du joueur.

**Formulation de référence validée :**

> "Les plateformes offshore qui proposent des paris sur des tirages étrangers ne disposent
> d'aucune autorisation française et opèrent en dehors du cadre légal national. Le joueur
> qui y accède le fait sous sa propre responsabilité."

**Ne jamais** formuler une comparaison RTP / conditions / bonus qui suggère que l'offshore
est « mieux » sans rappeler le contexte légal. Présenter le différentiel factuel + le
contexte légal de manière équilibrée.

**Formulation RTP équilibrée de référence (jeux-à-gratter §3) :**

> "Sur le seul critère du RTP, les scratch en ligne (≥ 92 %) affichent des taux supérieurs
> aux scratch FDJ (~64-65 %). À noter cependant que les scratch FDJ sont distribués
> légalement en France, ce qui n'est pas le cas des plateformes offshore."

## §16 — Péremption des territoires éditoriaux comparatifs

Établi 2026-06-21 lors de l'ajustement Winamax pourQui suite recherche Betclic juin 2026.

Quand un territoire contient un claim comparatif (« le plus X du repo »,
« le meilleur de »), ce claim doit être réévalué SYSTÉMATIQUEMENT à
chaque ajout d'opérateur.

**PROCÉDURE OBLIGATOIRE :**

1. Avant d'écrire le pourQui d'un nouvel opérateur, audit des claims comparatifs des
   opérateurs précédents
2. Si une donnée vérifiée invalide un claim existant :
   - Soit ajuster le claim existant (chiffre plus prudent, angle pivoté)
   - Soit déplacer le claim sur un autre angle vraiment unique
   - Décision AVANT d'écrire le nouveau pourQui
3. Documenter la mise à jour dans AUDIT_RETRO.md

**CAS HISTORIQUE — Winamax/Betclic juin 2026 :**

- App Store : 4,6/5 Winamax était présenté comme premier ; Betclic 4,7/5 iOS découvert
  (BasketUSA juin 2026). Winamax repositionné sur ancienneté app unifiée depuis 2010.
- Bonus cash : Winamax revendiquait « vs freebets » ; Betclic depuis le 16 mars 2026 +
  PMU font aussi du cash. Winamax repositionné sur cotes compétitives ANJ.

**LISTE DES CLAIMS COMPARATIFS ACTIFS** (à monitorer à chaque ajout d'opérateur) :

| Opérateur    | Claim comparatif                                                                        | Validé le  |
| ------------ | --------------------------------------------------------------------------------------- | ---------- |
| Crésus       | Retrait CB < 24h testé (offshore top)                                                   | 2026-06-16 |
| Wild Sultan  | Wager 30× ex aequo Tortuga — le plus bas offshore                                       | 2026-06-16 |
| Madnix       | Catalogue n°1 absolu 3 047 jeux (juin 2026)                                             | 2026-06-16 |
| Magical Spin | Package 1 000€ cumulé sur 4 dépôts le plus généreux                                     | 2026-06-16 |
| Winamax      | Cotes les plus compétitives du marché ANJ (sport)                                       | 2026-06-21 |
| Betclic      | App 4,7/5 iOS + 4,5/5 GP (chiffres bruts, pas "meilleur") ; SEPA Instant < 15 min testé | 2026-06-21 |
| Unibet       | Adossement FDJ United depuis octobre 2024 (unique ANJ actif dans le repo)               | 2026-06-22 |
| PMU          | Seuil de retrait 1 € le plus bas du marché                                              | 2026-06-22 |
| PMU          | Sourdline rare en ANJ FR (à revalider si autre ANJ lance service équivalent)            | 2026-06-22 |
| PokerStars   | Stars Rewards cashback jusqu'à 40% sur rake (taux effectif maximal, pas garanti)        | 2026-06-22 |
| PokerStars   | Liquidité partagée ESPT unique en ANJ FR (à revalider si pool élargi)                   | 2026-06-22 |
