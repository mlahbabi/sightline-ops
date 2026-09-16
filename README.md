# Sightline Ops — outil terrain MRCO

Incentive **Sightline Productions** (30 ans) via Uyuni Travels — Marrakech & Agafay, 17 → 21 septembre 2026, 19 clients.
App : https://mlahbabi.github.io/sightline-ops/ · code d'accès à 6 chiffres (voir « Changer le code ») · équipe : Mehdi, Eva, Farid, Mouad.

Dérivée du modèle PMD Ops (Deloitte, septembre 2026) : même code, données différentes.

## Mettre à jour les données (la seule chose à faire pendant l'événement)

1. Modifier `tools/gen-data.cjs` (participants, séquences, vagues, lieux, menus, contacts, points en attente) et passer `VERSION` / `UPDATED`.
2. `node tools/gen-data.cjs` → réécrit `src/data/*.json` (contrôle des identifiants et des termes financiers inclus).
3. `npm run build` (vérifie le TypeScript), puis commit + push sur `main` : GitHub Actions déploie en ~40 s ; les téléphones se mettent à jour à l'ouverture suivante.

Ne jamais renommer un identifiant de personne (`van-brakel`, `rintjema-erwin`…) ni de séquence : les coches partagées sont indexées dessus.

## Heure légale du Maroc — point critique

Décret n° 2.26.530 : dans la nuit du **19 au 20 septembre 2026, à 02:00 les horloges reculent à 01:00** et le Maroc reste à GMT.
Les téléphones dont la base de fuseaux n'est pas à jour resteront à UTC+1. L'app **calcule l'heure légale elle-même** (`src/lib/time.ts`) : bandeau rouge sur Maintenant si le téléphone n'est pas à l'heure. Tous les horaires des 20 et 21/09 dans l'app sont en nouvelle heure.

## État partagé (coches, notes, flashs)

Projet Supabase MRCO partagé avec PMD Ops, tables préfixées `sightline_` (`sightline_checks`, `sightline_notes`, `sightline_presence`) — préfixe réglable par `VITE_TABLE_PREFIX`. Stockage local préfixé `sl:` pour ne pas se mélanger avec l'app Deloitte hébergée sur le même domaine.

## Suivi des vols

Flightradar24 (point de données du site, sans clé) : FR5895 le 17/09 (arrivée 13:35), HV6534 le 21/09. ETA, retard, avance, annulation, avec flashs. Heures converties en heure légale marocaine par l'app. Secours AirLabs si une clé est collée dans Plus → Réglages.

## Changer le code d'accès

Calculer le SHA-256 du nouveau code (6 chiffres), le mettre dans le secret GitHub `VITE_ACCESS_CODE_HASH` du dépôt, relancer le déploiement (Actions → Re-run). Sans secret, code de développement 240826.

## Écrans

Maintenant (en cours, à venir, alertes du jour, fil terrain) · Programme (J-1 → J5, filtres, mon planning) · Personnes (19 fiches : chambres 2Ciels / Agafay / Kasbah, régimes, jeep 4×4, vols) · Transport (vagues Najib, suivi des vols, règles, flotte par jour) · Lieux · Plus (Desk & Rooming, contacts, signalétique = pack imprimeur, équipe, points en attente, menus, réglages).
