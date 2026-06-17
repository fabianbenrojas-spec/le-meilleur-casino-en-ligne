# ⛔ OBSOLÈTE — Ne pas utiliser comme source de vérité

Ce dossier (`design_handoff_casino/`) est le **handoff design v1** qui a servi à la
construction initiale du repo (tokens, chrome, composants atomiques, premier jet de
templates).

Depuis **juin 2026**, la source de vérité design est :

➡️ **`design_handoff_casino_revamp/`** (handoff v2)

## Ce qui change entre v1 et v2

- **Templates de page** entièrement repensés (hero éditorial, sommaires collants,
  maillage interne renforcé, barres bonus collantes, blocs de bifurcation finaux)
- **Simulateur (matchmaker)** : 8 questions + scoring pondéré 7 opérateurs × 10 critères
  + mode toggle « casino / bonus » → remplace le quiz v1 à 3 questions
- **Page bonus** réutilise le matchmaker partagé
- **Versus** version éditoriale sobre, barres animées au scroll, simulateur de wager
- **Article / guide** : TL;DR, résumé IA, calculateurs interactifs intégrés

## Pourquoi ce dossier est conservé

- Référence historique pour comprendre ce qui a été codé en phase 1
- Les tokens, le chrome et les composants atomiques dérivés de v1 restent valides
  dans le repo (à auditer mais a priori non-régressifs)

## Règles

- ❌ Claude Code ne doit **pas** lire ce dossier comme source de vérité pour les
  templates
- ❌ Les nouveaux templates ne s'inspirent **pas** des `reference/*.html` de ce dossier
- ✅ Seul `design_handoff_casino_revamp/` fait foi pour le réalignement actuel

## Suppression

Ce dossier pourra être supprimé une fois le réalignement v2 complet et validé en
production. D'ici là, le conserver pour traçabilité.
