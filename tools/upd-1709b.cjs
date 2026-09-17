// 17/09 — organisation du vendredi 18/09 (Mehdi) : montgolfière Farid + Mehdi au départ, Eva + Mouad au retour ; Grand Bazar Farid + Eva.
const fs = require('fs');
const f = __dirname + '/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const R = (re, b) => { if (!re.test(s)) throw new Error('introuvable : ' + re); s = s.replace(re, b); };
R(/const VERSION = 'V1\.3 — 17\/09\/2026';/, "const VERSION = 'V1.4 — 17/09/2026';");
R(/const UPDATED = '[^']*';/, "const UPDATED = '2026-09-17T11:00:00+01:00';");
// Montgolfière : rôles dans le détail
R(/Café \/ thé au départ 05:45\. Vol ~60 min à 06:30, météo dépendante\. Petit-déjeuner berbère sous tente caïdale\. Retour hôtel 09:30\./, "DÉPART : Farid + Mehdi (lobby 05:30, transfert opérateur 05:45). Café / thé au départ. Vol ~60 min à 06:30, météo dépendante. Petit-déjeuner berbère sous tente caïdale. RETOUR HÔTEL 09:30 : relais Eva + Mouad, qui accueillent le groupe au 2Ciels.");
// Mise en place Grand Bazar : nouvelle séquence avant le déjeuner
R(/  S\('s0918-bazar',/, "  S('s0918-setup-bazar', '2026-09-18', '11:15', '12:15', 'Mise en place Le Grand Bazar — Farid + Eva', 'Le Grand Bazar (Médina)', '', 'setup', 'important', 'Avant l’arrivée du groupe (transfert 12:00, déjeuner 12:30). Chevalets 3 + menus 3 sur les tables, chef briefé (18 couverts, Wim apporte son repas, régimes), point de dépose et point de rendez-vous de la Medina Quest calés avec les bus.', ['Chevalets et menus posés', 'Chef briefé : 18 couverts + régimes', 'Point de dépose confirmé aux chauffeurs', 'Guides Medina Quest joints pour 14:15']),\n  S('s0918-bazar',");
// Affectations et moments
R(/    \{ sequenceId: 's0920-luggage', owner: 'Farid', role: 'à bord du véhicule bagages Agafay → Kasbah' \},/, `    { sequenceId: 's0918-ballon', owner: 'Farid', role: 'départ montgolfière 05:30 avec le groupe' },
    { sequenceId: 's0918-ballon', owner: 'Mehdi', role: 'départ montgolfière 05:30 avec le groupe' },
    { sequenceId: 's0918-ballon', owner: 'Eva', role: 'relais retour hôtel 09:30' },
    { sequenceId: 's0918-ballon', owner: 'Mouad', role: 'relais retour hôtel 09:30' },
    { sequenceId: 's0918-setup-bazar', owner: 'Farid', role: 'mise en place Grand Bazar' },
    { sequenceId: 's0918-setup-bazar', owner: 'Eva', role: 'mise en place Grand Bazar' },
    { sequenceId: 's0920-luggage', owner: 'Farid', role: 'à bord du véhicule bagages Agafay → Kasbah' },`);
R(/    \{ sequenceId: 's0918-ballon', label: 'Montgolfière 18\/09 05:30' \},/, "    { sequenceId: 's0918-ballon', label: 'Montgolfière 18/09 05:30 (départ Farid + Mehdi, retour Eva + Mouad)' },\n    { sequenceId: 's0918-setup-bazar', label: 'Mise en place Grand Bazar 18/09 11:15' },");
fs.writeFileSync(f, s);
console.log('upd 18/09 ok');
