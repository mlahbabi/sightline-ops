// Sightline Ops — générateur des données de l'app (src/data/*.json).
// Sources : itinéraire Uyuni Travels (02/09), fiche transport Najib V3 (15/09), rooming lists 2Ciels V5 (16/09) et
// La Kasbah By Beldi (16/09), pack imprimeur (15/09), réponses de Mehdi du 16/09. Aucun montant. Heure légale du Maroc : UTC+1 jusqu’au 19/09, GMT à partir du 20/09 02:00 → 01:00 (décret 2.26.530).
// Usage : node tools/gen-data.js   → écrit src/data/*.json. Toute mise à jour se fait ICI, puis regénération, commit, push.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'src', 'data');
const VERSION = 'V1.12 — 18/09/2026';
const UPDATED = '2026-09-18T19:00:00+01:00';

// ---------- Participants (19 clients — rooming 2Ciels V5 + Kasbah 16/09) ----------
// ch2 = chambre 2Ciels (17→19), tente Agafay ⚠️ non communiquée, chK = chambre Kasbah (20→21). jeep3 = 4×4 self drive J3.
const P = [
  ['van Brakel', 'Tammo', 'H', 'NSRJ7C260', '30/05/1974', '', 1, 'Twin', 1, 'Twin', 1],
  ['van der Haagen', 'Dennis', 'H', 'NS6BH9DD8', '06/12/1965', '', 1, 'Twin', 1, 'Twin', 4],
  ['Rintjema', 'Erwin', 'H', 'NU7R82CJ4', '29/01/1978', 'Pas de poisson', 2, 'Single', 2, 'Single', 2],
  ['Hofma', 'Arjen', 'H', 'NTKB3K9H8', '09/10/1979', '', 3, 'Single', 3, 'Single', 1],
  ['van der Ham', 'Sander', 'H', 'NP5CRH401', '08/06/1984', '', 4, 'Twin', 4, 'Twin', 2],
  ['Rintjema', 'Pascal', 'H', 'NTF289KD9', '16/08/1982', '', 4, 'Twin', 4, 'Twin', 1],
  ['van der Hoeven', 'Jos', 'H', 'NUH2K9FR7', '02/09/1980', '', 5, 'Twin', 5, 'Twin', 3],
  ['Dokter', 'Michaël', 'H', 'NS94070F4', '01/11/1994', 'Pas de poisson, beurre, champignons', 5, 'Twin', 5, 'Twin', 2],
  ['van Oudenallen', 'Christiaan', 'H', 'NSLHP72R2', '12/12/1990', '', 6, 'Twin', 6, 'Twin', 4],
  ['Wildenbeest', 'Wim', 'H', 'NWRP6B406', '04/11/1997', '⚠️ ALLERGIE SÉVÈRE noix / fruits à coque + arachides (EpiPen) · pas de fruits de mer', 6, 'Twin', 6, 'Twin', 3],
  ['van der Klauw', 'Jasper', 'H', 'NVHDR2L31', '01/06/1994', '', 7, 'Twin', 7, 'Twin', 4],
  ['Vellekoop', 'Marcel', 'H', 'NUH0PPKK8', '18/03/1990', 'Pas de fruits de mer, pas de viande crue', 7, 'Twin', 7, 'Twin', 1],
  ['Pet', 'Mischa', 'H', 'NX72BRK14', '02/10/1989', 'Pas de coriandre, champignons', 8, 'Twin', 8, 'Twin', 3],
  ['Vogel', 'Hjalmar', 'H', 'NR7P9KRR1', '28/12/1992', 'Pas de fromage', 8, 'Twin', 8, 'Twin', 4],
  ['de Rijk', 'Roel', 'H', 'NNFK6K838', '21/02/1994', 'Ni poisson ni viande', 9, 'Twin', 9, 'Twin', 2],
  ['Stoltenborg', 'Otte', 'H', 'NYL5FC158', '26/03/2001', 'Sans gluten', 9, 'Twin', 9, 'Twin', 1],
  ['Dinnissen', 'Nancy', 'F', 'NT77F47F7', '28/11/1969', '', 10, 'Twin', 10, 'Twin', 3],
  ['van Elteren', 'Romy', 'F', 'NX4CCHF19', '08/04/1997', '', 10, 'Twin', 10, 'Twin', 4],
  ['Ruigrok', 'Adriana', 'F', 'NXD12RK45', '25/09/1980', 'Sans gluten', 11, 'Single', 11, 'Single', 2],
];
// Numéros de chambre réels du 2Ciels (fiche d’arrivée de l’hôtel du 17/09 15:19), par n° de la liste MRCO
const H2 = { 1: '304', 2: '505', 3: '117', 4: '404', 5: '412', 6: '212', 7: '417', 8: '503', 9: '411', 10: '504', 11: '111', 12: '511' };
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const ids = {};
const people = P.map(([nom, prenom, genre, passeport, naissance, regime, ch2, t2, chK, tK, jeep]) => {
  let id = slug(nom); if (ids[id]) { id = slug(nom + ' ' + prenom); } ids[id] = 1;
  const notes = [];
  if (nom === 'Wildenbeest') notes.push('ALLERGIE CRITIQUE noix / fruits à coque / arachides — EpiPen sur lui. NE MANGE PAS avec le groupe : il apporte sa propre nourriture à TOUS les repas (Mehdi, 17/09). Lui garder une place à table et ses boissons, glacière au frais à chaque hôtel (2Ciels, Agafay, Kasbah). Aucune trace de noix dans ce qui lui est offert (thé, pâtisseries).');
  if (ch2 === 2 || ch2 === 3) notes.push('Chambre single depuis les annulations du 16/09.');
  if (nom === 'Dinnissen') notes.push('CONTACT GROUPE (Mehdi, 17/09) : référente du groupe sur place, WhatsApp +31 6 51 27 32 84 — voir Plus → Contacts.');
  if (nom === 'van Elteren') notes.push('CONTACT GROUPE (Mehdi, 17/09) : référente du groupe sur place, WhatsApp +31 6 81 72 54 01 — voir Plus → Contacts.');
  return {
    id, nom, prenom, genre, statut: 'participant', vip: '', categorie: '', pays: 'Pays-Bas', passeport, naissance,
    arrivee: '17/09', depart: '21/09', nuitees: 4, regime,
    note_hotel: `2Ciels ch. ${H2[ch2]} (${t2}, lits séparés · n° MRCO ${ch2}) · Agafay tente ${ch2} (n° liste MRCO) · Kasbah ch. ${chK} (${tK})`,
    note_app: notes.join(' '),
    equipe_tb: jeep, retour_radisson_1430: false, diaffa_table: null, diaffa_place: null, rotisserie_table: null, rotisserie_place: null,
    arr: { date: '17/09', heure: '13:35', vol: 'FR5895', de: 'Eindhoven', cie: 'Ryanair', mode: 'vol' },
    dep: { date: '21/09', heure: '09:55', vol: 'HV6534', vers: 'Eindhoven', cie: 'Transavia', mode: 'vol' },
    a_confirmer: [],
  };
});
const pid = k => { const a = people.find(x => x.id === k); if (!a) throw new Error('id ' + k); return a.id; };
const ALL = people.map(a => a.id);
const JEEP = n => people.filter(a => a.equipe_tb === n).map(a => a.id);
const WIM = pid('wildenbeest');
// Contacts à l’intérieur du groupe (Mehdi, 17/09) : badge sur toutes les listes + appel / WhatsApp sur la fiche et l’écran Maintenant
people.forEach(a => { if (a.nom === 'Dinnissen') { a.vip = 'Contact groupe'; a.tel = '+31651273284'; } if (a.nom === 'van Elteren') { a.vip = 'Contact groupe'; a.tel = '+31681725401'; } });
// Dimanche 20/09 — 5 × 4×4 avec chauffeur, 4/4/4/4/3, dérivés des jeeps du samedi (proposition MRCO du 17/09, à valider)
const CAR_J4 = { 1: ['van-brakel', 'hofma', 'rintjema-pascal', 'vellekoop'], 2: ['van-der-ham', 'rintjema', 'dokter', 'ruigrok'], 3: ['van-der-hoeven', 'pet', 'wildenbeest', 'dinnissen'], 4: ['van-oudenallen', 'van-der-klauw', 'vogel', 'van-der-haagen'], 5: ['stoltenborg', 'de-rijk', 'van-elteren'] };
people.forEach(a => { const n = Object.keys(CAR_J4).find(k => CAR_J4[k].includes(a.id)); if (!n) throw new Error('CAR_J4 ' + a.id); a.vehicule_j4 = Number(n); a.note_app = (a.note_app ? a.note_app + ' ' : '') + 'Samedi 19/09 : Jeep ' + a.equipe_tb + ' (self drive). Dimanche 20/09 : CAR ' + n + ' avec chauffeur (proposition MRCO, à valider).'; });
const CARS = 'CAR 1 Tammo, Arjen, Pascal, Marcel · CAR 2 Sander, Erwin, Michaël, Adriana · CAR 3 Jos, Mischa, Wim, Nancy · CAR 4 Christiaan, Jasper, Hjalmar, Dennis · CAR 5 Otte, Roel, Romy';

// ---------- Séquences ----------
const S = (id, date, start, end, title, lieu, effectif, type, level, details, checklist, persons, extra) => Object.assign({ id, date, start, end: end || null, title, lieu: lieu || '', effectif: effectif || '', type, level, details: details || '', checklist: (checklist || []).map((label, i) => ({ id: `${id}-c${i + 1}`, label })), persons: persons || [], owner: '' }, extra || {});
const ALLERGIE = 'COUVERTS : 18 — Wim Wildenbeest apporte sa propre nourriture à tous les repas (allergie noix / arachides, EpiPen) : lui garder une place, ses boissons, glacière au frais. Régimes : Erwin (pas de poisson), Michaël (poisson, beurre, champignons), Marcel (fruits de mer, viande crue), Mischa (coriandre, champignons), Hjalmar (fromage), Roel (ni poisson ni viande), Otte et Adriana (sans gluten).';
const NOTE_HEURE = 'HEURE : dans la nuit du 19 au 20/09, à 02:00 les horloges reculent à 01:00 — le Maroc passe définitivement à GMT (décret 2.26.530, vérifié en ligne le 16/09). Les horaires des 20 et 21/09 sont en nouvelle heure. Les téléphones non mis à jour peuvent rester à UTC+1 : l’app calcule l’heure légale et fait foi.';
const seqs = [
  // J-1
  S('s0916-pack', '2026-09-16', '18:00', '19:30', 'Contrôle du pack imprimeur + brief équipe', 'MRCO', '4', 'setup', 'important', '30 PDF livrés le 15/09. Vérifier les tirages et répartir par lieu (voir Plus → Signalétique & matériel). Cartes allergie : 8 ex., à reconfirmer avec Pamela (liste régimes finale) AVANT impression.', ['Menus pliés par lieu (7 × 22)', 'Chevalets par lieu (7 × 3)', 'Prisme bar A ×2 + totem bar B ×2', 'Sous-verres 2 × 150', 'Pancarte aéroport ×2 + pancartes véhicules ×10 plastifiées', 'Brief Farid / Mouad : rôles J1']),
  S('s0916-najib', '2026-09-16', '19:30', '20:00', 'Appel Najib : flotte confirmée + rappel du changement d’heure', 'Téléphone', '', 'orga', 'critique', 'Confirmer la disponibilité : 2 × 17 pl (17, 18, 21/09), 4 × 4×4 self drive (19/09), 5 × 4×4 + véhicule bagages (20/09). ' + NOTE_HEURE + ' Les chauffeurs doivent se présenter en NOUVELLE heure les 20 et 21/09 (montres et véhicules reculés d’une heure), vérification croisée avec Eva / Mehdi avant chaque prise en charge.', ['Flotte confirmée sur les 5 jours', 'Changement d’heure du 20/09 rappelé et compris (nouvelle heure GMT)', 'Numéro de Ssi Brahim obtenu', 'Type du véhicule bagages J4 confirmé']),
  // J1 — jeudi 17/09
  S('s0917-setup-beldi', '2026-09-17', '13:15', '14:30', 'Mise en place Beldi — Eva + Farid (Toyota)', 'Beldi Country Club', '', 'setup', 'critique', 'Départ 13:15 en voiture. Thé d’accueil et pâtisseries prêts pour ~14:30, chevalets 2 + menus 2 sur les tables, chef briefé (18 couverts, Wim apporte son repas, régimes). Dès l’arrivée du groupe, Eva et Farid repartent au 2Ciels préparer le check-in.', ['Thé d’accueil prêt (pâtisseries sans noix à portée de Wim)', 'Chevalets et menus posés', 'Chef briefé : 18 couverts + régimes', 'Repartis vers le 2Ciels']),
  S('s0917-rak', '2026-09-17', '12:30', '13:35', 'Mehdi + Mouad à l’aéroport + pancarte Sightline', 'Aéroport RAK — zone arrivées', '19', 'setup', 'critique', 'Chauffeurs 2 × 17 pl en place à 13:00. Pancarte « Sightline » (pack 05, A3). Suivi du vol FR5895 en temps réel dans Transport. Sortie passagers +30 à 40 min.', ['2 minibus en place (pancartes BUS 1 / BUS 2)', 'Pancarte aéroport en main', 'Eau fraîche à bord', 'Vol suivi (ETA)']),
  S('s0917-beldi', '2026-09-17', '14:45', '16:30', 'Déjeuner 3 plats — Beldi Country Club (jardins)', 'Beldi Country Club', '19', 'restauration', 'important', 'Thé à la menthe et pâtisseries à l\'arrivée (~14:30). Boissons réglées par le groupe. Menu 2 + chevalets 2. ' + ALLERGIE, ['Chef briefé : 18 couverts + régimes', 'Chevalets et menus en place', 'Bagages gardés dans les bus'], ALL),
  S('s0917-checkin', '2026-09-17', '16:45', '17:45', 'Check-in 2Ciels — 12 chambres, lits séparés', '2Ciels Boutique Hotel & Spa', '19', 'orga', 'critique', 'Chambres hôtel (fiche 2Ciels 17/09) : 304 Tammo + Dennis · 505 Erwin · 117 Arjen · 404 Sander + Pascal · 412 Jos + Michaël · 212 Christiaan + Wim · 417 Jasper + Marcel · 503 Mischa + Hjalmar · 411 Roel + Otte · 504 Nancy + Romy · 111 Adriana · 511 chambre maintenue, occupant désigné sur place. Bagages déchargés à l\'hôtel. Briefer petit-déjeuner et room service sur l\'allergie de Wim (viennoiseries, fruits secs, amlou, huiles). Temps libre rooftop / spa ensuite.', ['Eva + Farid en place AVANT le groupe : clés prêtes, signalétique correcte', 'Thé d’accueil servi pour patienter', '12 clés remises', 'Ch. 12 : occupant noté', 'Bagages montés (19)', 'Allergie briefée (petit-déj + room service)', 'Heure du départ dîner 20:30 annoncée au groupe'], ALL),
  S('s0917-setup-psc', '2026-09-17', '19:30', '20:30', 'Setup MRCO — Petanque Social Club', 'Petanque Social Club', '', 'setup', 'important', 'Eva + Farid. SOIGNER LE COCKTAIL 30 ANS (mise en scène du bar, prisme, totem, sous-verres). Menus 1 + chevalets 1 sur les tables, prisme bar A « 30 Years » + totem bar B « Access All Areas », sous-verres Backstage / Proost. Cocktail « 30th Anniversary » à 20:45.', ['Menus et chevalets posés', 'Prisme + totem au bar', 'Sous-verres distribués', 'Chef briefé : 18 couverts + régimes']),
  S('s0917-cocktail', '2026-09-17', '20:45', '21:15', 'Cocktail « 30th Anniversary »', 'Petanque Social Club', '19', 'vip', 'important', 'Moment marquant des 30 ans de Sightline Productions. Boissons réglées par le groupe.', [], ALL),
  S('s0917-diner', '2026-09-17', '21:15', '23:45', 'Dîner 4 plats — Petanque Social Club (club secret années 1930)', 'Petanque Social Club', '19', 'restauration', 'important', 'Menu 1. Retour hôtel vers 00:00 (2 × 17 pl). ' + ALLERGIE, ['Heure de retour confirmée aux chauffeurs'], ALL),
  // J2 — vendredi 18/09
  S('s0918-ballon', '2026-09-18', '05:30', '09:30', 'Montgolfière au lever du soleil (transfert opérateur, hors Najib)', '2Ciels → site de vol', '19', 'activite', 'critique', 'CONFIRMATION OPÉRATEUR (17/09) : référence SIGHTLINE, 19 pax, vol classique, ramassage 05:30 à l’hôtel 2Ciels. Contacts opérateur : M. Salah +212 662 302 515, Mme Najat +212 668 442 763. DÉPART : Farid + Mehdi (lobby 05:20, ramassage 05:30). Café / thé au départ. Vol ~60 min à 06:30, météo dépendante. Petit-déjeuner berbère sous tente caïdale. RETOUR HÔTEL 09:30 : relais Eva + Mouad, qui accueillent le groupe au 2Ciels. ⚠️ Attention allergie Wim au petit-déjeuner (amlou, fruits secs).', ['Réveil / rassemblement lobby 05:20 (19 pax)', 'Transfert opérateur présent 05:30 (Salah / Najat)', 'Météo : vol confirmé ou annulé', 'Retour hôtel 09:30'], ALL),
  S('s0918-setup-bazar', '2026-09-18', '11:15', '12:15', 'Mise en place Le Grand Bazar — Farid + Eva', 'Le Grand Bazar (Médina)', '', 'setup', 'important', 'Avant l’arrivée du groupe (transfert 12:15, déjeuner ~12:45). Chevalets 3 + menus 3 sur les tables, chef briefé (18 couverts, Wim apporte son repas, régimes), point de dépose et point de rendez-vous de la Medina Quest calés avec les bus.', ['Chevalets et menus posés', 'Chef briefé : 18 couverts + régimes', 'Point de dépose confirmé aux chauffeurs', 'Guides Medina Quest joints pour 14:15']),
  S('s0918-bazar', '2026-09-18', '12:45', '14:15', 'Déjeuner 3 plats — Le Grand Bazar (Jemaa el-Fna)', 'Le Grand Bazar (Médina)', '19', 'restauration', 'important', 'Dépose au plus près de la médina. Menu 3 + chevalets 3. ' + ALLERGIE, ['Chef briefé : 18 couverts + régimes', 'Menus et chevalets en place'], ALL),
  S('s0918-quest', '2026-09-18', '14:15', '16:15', 'Medina Quest Adventure — chasse au trésor 2 h (guides anglophones)', 'Médina — départ Le Grand Bazar', '19', 'activite', 'important', 'Équipes, énigmes, navigation. Véhicules en standby. Retour hôtel ~16:15.', ['Guides en place 14:15', 'Point de rendez-vous fin de jeu fixé', 'Véhicules prévenus'], ALL),
  S('s0918-setup-darna', '2026-09-18', '19:00', '20:00', 'Setup MRCO — Le Comptoir Darna', 'Le Comptoir Darna', '', 'setup', 'important', 'Menus 4 + chevalets 4, sous-verres. Dîner 4 plats avec spectacle (musiciens, danseurs).', ['Menus et chevalets posés', 'Chef briefé : 18 couverts + régimes']),
  S('s0918-darna', '2026-09-18', '21:00', '23:30', 'Dîner 4 plats + spectacle — Le Comptoir Darna', 'Le Comptoir Darna', '19', 'restauration', 'important', 'Menu 4. Retour hôtel 23:30, puis option Babouchka (spectacle et entrées offerts par Uyuni) — véhicules en disposal jusqu\'à la dernière course. ' + ALLERGIE, ['Option Babouchka : qui y va ? (compter)', 'Dernière course annoncée aux chauffeurs'], ALL),
  S('s0918-rappel-brief', '2026-09-18', '19:15', '19:45', 'RAPPEL CE SOIR — Mouad + Farid : matériel du briefing 4×4 de demain (écran, projecteur, enceinte JBL)', '2Ciels Boutique Hotel & Spa', '', 'setup', 'critique', 'Demain samedi, le setup du briefing doit être PRÊT À 08:15 à l’hôtel (briefing technique 08:45, Ssi Brahim). À préparer dès ce soir : écran, projecteur avec ses câbles, enceinte JBL à mettre en charge cette nuit. L’enceinte JBL part ensuite au camp d’Agafay pour la soirée.', ['Écran localisé et disponible', 'Projecteur + câble HDMI + rallonge / multiprise rassemblés', 'Enceinte JBL mise en charge pour la nuit', 'Emplacement du briefing calé avec le 2Ciels', 'Support du briefing (ordinateur / fichier) prévu et testé']),
  // J3 — samedi 19/09
  S('s0919-setup-brief', '2026-09-19', '07:30', '08:15', 'Setup briefing 4×4 au 2Ciels — PRÊT À 08:15 (écran + projecteur + enceinte JBL) — Mouad + Farid', '2Ciels Boutique Hotel & Spa', '', 'setup', 'critique', 'Tout doit être installé et testé à 08:15, avant le check-out du groupe (dès 08:00 au fil de l’eau) et le briefing technique de 08:45. Après le briefing, l’enceinte JBL est embarquée pour Yes We Camp Agafay (soirée du camp) : désigner qui l’emporte, elle ne part pas avec les bagages de 08:30 puisqu’elle sert au briefing de 08:45.', ['Écran installé', 'Projecteur branché, image testée', 'Enceinte JBL chargée, son testé', 'Tout prêt à 08:15', 'Après le briefing : enceinte JBL embarquée pour le camp', 'Écran et projecteur rangés / rendus']),
  S('s0919-bagages', '2026-09-19', '08:00', '08:45', 'Check-out dès 08:00 + petit-déjeuner — bagages déposés à la RÉCEPTION', '2Ciels Boutique Hotel & Spa', '19', 'orga', 'critique', 'Consigne Mehdi du 18/09 : les clients font leur check-out à partir de 08:00 en descendant au petit-déjeuner et laissent leurs bagages à la réception. Les bagages partent ensuite vers Yes We Camp Agafay avec le transporteur du 2Ciels (hors Najib) et arrivent avant le groupe — heure d’enlèvement ⚠️ à confirmer avec l’hôtel. Compter et étiqueter. Briefing 4×4 à 08:45.', ['Consigne donnée au groupe la veille (check-out 08:00, bagages à la réception)', '12 chambres libérées, extras réglés', 'Bagages comptés (19) à la réception', 'Transporteur bagages parti vers Agafay'], ALL),
  S('s0919-brief4x4', '2026-09-19', '08:45', '09:00', 'Rallye 4×4 SELF DRIVE — briefing technique (Ssi Brahim)', '2Ciels — départ convoi', '19', 'activite', 'critique', 'Matériel installé par Mouad + Farid dès 08:15 (écran, projecteur, enceinte JBL). 4 × 4×4, les invités conduisent : Jeep 1 (5), Jeep 2 (5), Jeep 3 (4), Jeep 4 (5) — voir Personnes → Jeep. Règles : pas de conduite risquée, rester dans le convoi, AUCUN alcool pour les conducteurs (assurance). Ssi Brahim en tête. Pancartes véhicules CAR 1 à 4. ' + NOTE_HEURE, ['Répartition Jeep 1 confirmée (déduite ⚠️)', 'Conducteurs désignés par jeep', 'Briefing fait, règles alcool rappelées', 'Pancartes CAR 1-4 posées'], ALL),
  S('s0919-relais', '2026-09-19', '13:00', '14:30', 'Déjeuner 3 plats — Le Relais du Lac (Lalla Takerkoust)', 'Le Relais du Lac', '19', 'restauration', 'important', 'Terrasse au bord du lac, vue Atlas. Menu 5 + chevalets 5. Véhicules en standby. ' + ALLERGIE, ['Chef briefé : 18 couverts + régimes', 'Menus et chevalets en place'], ALL),
  S('s0919-surprise', '2026-09-19', '14:30', '17:00', 'Rallye vers l\'Agafay — arrêt surprise marocain', 'Piste vers Agafay', '19', 'activite', 'normal', 'Arrêt surprise à thème marocain en route. Arrivée au camp 17:00.', [], ALL),
  S('s0919-camp', '2026-09-19', '17:00', '17:30', 'Arrivée Yes We Camp Agafay — check-in 12 tentes Top VIP', 'Yes We Camp Agafay', '19', 'orga', 'critique', 'Thé de bienvenue. Bagages déjà livrés (transporteur 2Ciels). Attribution des tentes ⚠️ non communiquée (même logique que les chambres : 12). Piscine et coucher de soleil 17:30–19:30.', ['Bagages présents (19)', 'Tentes attribuées', 'Setup dîner : menus 6 + chevalets 6'], ALL),
  S('s0919-desert', '2026-09-19', '20:00', '00:30', 'Dîner du désert + soirée (tamtam, cracheur de feu, DJ)', 'Yes We Camp Agafay — piscine privatisée', '19', 'restauration', 'important', 'Enceinte JBL MRCO sur place (apportée du 2Ciels après le briefing). Menu 6, 4 plats. Open bar 3 h inclus (vin, bière, whisky, gin, vodka, softs ; cocktails et spiritueux deluxe en supplément réglé par le groupe). ' + ALLERGIE, ['Chef briefé : 18 couverts + régimes', 'Fin de l\'open bar annoncée (3 h)'], ALL),
  S('s0919-heure', '2026-09-19', '22:00', '22:15', 'RAPPEL HEURE : cette nuit 02:00 → 01:00, passage à GMT', 'Yes We Camp Agafay', '', 'orga', 'critique', NOTE_HEURE + ' Confirmer par message à Najib et Ssi Brahim : véhicule bagages 10:30 et convoi 11:00 en NOUVELLE heure (GMT). Au réveil, comparer l’heure du téléphone à celle de l’app (bandeau rouge si écart).', ['Message envoyé à Najib', 'Message envoyé à Ssi Brahim', 'Groupe prévenu (réveil, petit-déjeuner 08:30 nouvelle heure)', 'Au réveil : téléphones MRCO à l’heure de l’app']),
  S('s0919-hv', '2026-09-19', '21:30', '21:45', 'Pointer HV6534 sur Flightradar24 (Transport → 21/09) : 09:55 ou 10:55 ?', 'Yes We Camp Agafay', '', 'orga', 'important', 'Consigne Mehdi 17/09 : vérifier l’horaire GMT du vol retour l’avant-veille et la veille. Prise en charge 06:20 inchangée. Farid.', ['Horaire relevé et noté en note terrain']),
  // J4 — dimanche 20/09
  S('s0920-dromadaires', '2026-09-20', '10:00', '11:00', 'Balade à dos de dromadaire (1 h, arrêts photos)', 'Yes We Camp Agafay', '19', 'activite', 'normal', 'Petit-déjeuner 08:30 (continental + marocain, attention allergie Wim). Chameliers locaux, foulards fournis.', [], ALL),
  S('s0920-luggage', '2026-09-20', '10:30', '11:00', 'Chargement du véhicule bagages → La Kasbah By Beldi (1 encadrant MRCO à bord)', 'Yes We Camp Agafay', '19 bagages', 'transport', 'critique', 'Véhicule LUGGAGE (pancarte 10), type à confirmer par Najib. Part directement au lodge. Passagers SANS bagages dans les 4×4. Encadrant MRCO à bord : FARID.', ['Bagages comptés (19 + MRCO)', 'Farid à bord', 'Parti vers La Kasbah By Beldi']),
  S('s0920-convoi', '2026-09-20', '11:00', '12:00', 'Départ convoi 5 × 4×4 avec chauffeurs — montagne (Tahannaout / Asni)', 'Yes We Camp Agafay → Imlil', '19', 'transport', 'critique', 'Max 4 pax par véhicule : 4 / 4 / 4 / 4 / 3 + 1 véhicule MRCO. Itinéraire différent de la veille (pas Moulay Brahim / Agafay). Répartition (proposition MRCO du 17/09, à valider) : ' + CARS + '. Pancartes CAR 1 à 5.', ['Répartition 4/4/4/4/3 faite', 'Chauffeurs à l\'heure du téléphone', 'Convoi parti'], ALL),
  S('s0920-imlil', '2026-09-20', '12:00', '13:30', 'Marche guidée — villages berbères, Imlil & Sidi Fares', 'Vallée Imlil — Sidi Fares', '19', 'activite', 'normal', 'Guides locaux, arrêts photos et points de vue.', [], ALL),
  S('s0920-dej', '2026-09-20', '13:30', '15:00', 'Déjeuner berbère en montagne — chez Adil (Sidi Fares)', 'Imlil / Sidi Fares — setup berbère', '19', 'restauration', 'important', 'Softs inclus. Pas de menu imprimé pour ce déjeuner. ' + ALLERGIE, ['Cuisinier briefé : 18 couverts + régimes'], ALL),
  S('s0920-kasbah', '2026-09-20', '17:30', '18:30', 'Check-in La Kasbah By Beldi — 13 chambres', 'La Kasbah By Beldi', '19 + 2', 'orga', 'critique', 'Rooming du 16/09 : 8 twins + 4 singles (ch. 2, 3, 11, 12 — ch. 12 attribuée sur place) + ch. 13 double staff MRCO. Bagages déjà livrés par le véhicule dédié. Glacière de Wim au frais. Petit-déjeuner lundi 05:15 (18 + 2 staff), départ 06:20 : à annoncer au groupe ce soir.', ['13 clés remises', 'Bagages présents (19 + MRCO)', 'Glacière Wim au frais', 'Petit-déj 05:15 et départ 06:20 confirmés à la réception', 'Départ 06:20 annoncé au groupe'], ALL),
  S('s0920-talet', '2026-09-20', '20:30', '23:00', 'Dîner 3 plats + pâtisseries — Kasbah Talet by Beldi', 'Kasbah Talet by Beldi (sur le domaine)', '18 (+2 staff à part)', 'restauration', 'important', 'Court transfert ou marche à 20:15. 18 couverts groupe : Wim ne dîne pas (repas personnel). 2 repas staff MRCO à part. Menu 7 + chevalets 7. Retour lodge 23:00. ' + ALLERGIE, ['Chef briefé : 18 couverts + régimes', 'Menus et chevalets en place', 'Extras réglés à la réception avant le départ (à rappeler)'], ALL),
  S('s0920-hv', '2026-09-20', '21:00', '21:15', 'Pointer HV6534 sur Flightradar24 — dernière vérification', 'La Kasbah By Beldi', '', 'orga', 'critique', 'Horaire du décollage (nouvelle heure) à confirmer au groupe et aux chauffeurs. Prise en charge 06:20, chauffeurs 05:45.', ['Horaire relevé', 'Najib prévenu de l’heure exacte', 'Groupe informé du réveil']),
  // J5 — lundi 21/09
  S('s0921-petitdej', '2026-09-21', '05:15', '06:00', 'Petit-déjeuner très matinal (18 + 2 staff) — bagages devant les chambres', 'La Kasbah By Beldi', '19 + 2', 'orga', 'critique', 'Chauffeurs 2 × 17 pl en place à 05:45, chargement bagages à 06:00. ' + NOTE_HEURE, ['Petit-déj servi 05:15', 'Extras du groupe réglés à la réception', '2 minibus en place 05:45', 'Bagages chargés (19 + MRCO)'], ALL),
  S('s0921-fin', '2026-09-21', '07:10', '09:55', 'Aéroport RAK — accompagnement check-in jusqu\'au décollage HV6534 09:55', 'Aéroport RAK — terminal départs', '19', 'orga', 'critique', 'Dépose ~07:10 (H-2:45). Assistance bagages jusqu\'au terminal, accompagnement au check-in Transavia. Arrivée Eindhoven 15:35. Fin de l\'opération.', ['19 passagers déposés', 'Check-in Transavia fait', 'Groupe passé la sécurité', 'Najib : fin de mission confirmée'], ALL),
];

// ---------- Transport ----------
const W = (id, date, heure, type, vol, pax, vehicule, note, origine, level) => ({ id, date, heure, type, vol, pax: pax.map(pid), vehicule, note: note || '', origine: origine || (type === 'arrivee' ? 'Aéroport RAK' : ''), destination: type === 'arrivee' ? '2Ciels Boutique Hotel & Spa' : (type === 'depart' ? 'Aéroport RAK' : ''), level: level || (type === 'depart' ? 'critique' : 'normal') });
const prog = (id, date, heure, itin, detail, pax, vehicule, level, paxIds, origine, destination) => ({ id, date, heure, type: 'programme', vol: itin, pax: paxIds || [], paxEstime: pax, vehicule, note: detail, origine, destination, level });
const BUS = '2 × 17 pl (BUS 1 / BUS 2)';
const waves = [
  Object.assign(W('w0917-1335', '2026-09-17', '13:35', 'arrivee', 'FR5895 (Eindhoven)', ALL, BUS, 'Ryanair Eindhoven 10:50 → Marrakech 13:35. Pancarte « Sightline ». Bagages à bord, direction Beldi Country Club (déjeuner) puis 2Ciels à 16:45.', 'Aéroport RAK', 'critique'), { destination: 'Beldi Country Club' }),
  prog('p0917-1430', '2026-09-17', '14:30', 'RAK → Beldi Country Club (déjeuner)', 'Départ groupé après sortie passagers. Bagages à bord.', '19', BUS, 'critique', [], 'Aéroport RAK', 'Beldi Country Club'),
  prog('p0917-1645', '2026-09-17', '16:45', 'Beldi Country Club → 2Ciels (check-in)', 'Bagages déchargés à l\'hôtel.', '19', BUS, 'important', [], 'Beldi Country Club', '2Ciels Boutique Hotel & Spa'),
  prog('p0917-2030', '2026-09-17', '20:30', '2Ciels → Petanque Social Club', 'Mehdi + Mouad accompagnent le groupe dans les bus. Cocktail 20:45, dîner 21:15.', '19', BUS, 'important', [], '2Ciels Boutique Hotel & Spa', 'Petanque Social Club'),
  prog('p0917-2355', '2026-09-17', '23:55', 'Petanque Social Club → 2Ciels (~00:00)', 'Retour hôtel, fin de mission J1.', '19', BUS, 'normal', [], 'Petanque Social Club', '2Ciels Boutique Hotel & Spa'),
  prog('p0918-1215', '2026-09-18', '12:15', '2Ciels → Le Grand Bazar (Jemaa el-Fna)', 'Horaire confirmé par Mehdi le 17/09 : départ 12:15 (au lieu de 12:00). Dépose au plus proche, zone médina. Véhicules en standby pendant la Medina Quest (14:15–16:15).', '19', BUS, 'important', [], '2Ciels Boutique Hotel & Spa', 'Le Grand Bazar (Médina)'),
  prog('p0918-1615', '2026-09-18', '16:15', 'Médina → 2Ciels', 'Retour hôtel après la Medina Quest.', '19', BUS, 'normal', [], 'Médina', '2Ciels Boutique Hotel & Spa'),
  prog('p0918-2030', '2026-09-18', '20:30', '2Ciels → Le Comptoir Darna', 'Horaire confirmé à Najib le 17/09 : 20:30 (comme le 17). Dîner spectacle ~21:00.', '19', BUS, 'important', [], '2Ciels Boutique Hotel & Spa', 'Le Comptoir Darna'),
  prog('p0918-2330', '2026-09-18', '23:30', 'Comptoir Darna → 2Ciels + disposal soirée (option Babouchka)', 'Fin de mission à la dernière course.', '19', BUS, 'normal', [], 'Le Comptoir Darna', '2Ciels Boutique Hotel & Spa'),
  prog('p0919-0900', '2026-09-19', '09:00', 'Convoi 4×4 SELF DRIVE : 2Ciels → piémont Atlas → Relais du Lac → Agafay', 'Jeep 1 : Tammo, Arjen, Pascal, Marcel, Otte (déduite ⚠️) · Jeep 2 : Sander, Erwin, Michaël, Adriana, Roel · Jeep 3 : Jos, Mischa, Wim, Nancy · Jeep 4 : Christiaan, Jasper, Hjalmar, Dennis, Romy. Ssi Brahim en tête, coordination Najib. Bagages : transporteur du 2Ciels, hors Najib.', '19', '4 × 4×4 (CAR 1-4) + assistance', 'critique', ALL, '2Ciels Boutique Hotel & Spa', 'Yes We Camp Agafay (17:00)'),
  prog('p0920-1030', '2026-09-20', '10:30', 'Véhicule bagages : Agafay → La Kasbah By Beldi', 'Farid à bord. Type de véhicule à confirmer par Najib. Bagages des 19 + MRCO.', 'bagages', '1 véhicule LUGGAGE', 'critique', [], 'Yes We Camp Agafay', 'La Kasbah By Beldi'),
  prog('p0920-1100', '2026-09-20', '11:00', 'Convoi 5 × 4×4 avec chauffeurs : Agafay → Tahannaout / Asni → Imlil – Sidi Fares → La Kasbah By Beldi (~17:30)', 'Max 4 pax par véhicule (4/4/4/4/3), SANS bagages, + 1 véhicule MRCO. Circuit différent du J3. Répartition (proposition MRCO, à valider) : ' + CARS + '. Heure : nouvelle heure (GMT).', '19', '5 × 4×4 (CAR 1-5) + véhicule MRCO', 'critique', ALL, 'Yes We Camp Agafay', 'La Kasbah By Beldi'),
  prog('p0920-2015', '2026-09-20', '20:15', 'Lodge → Kasbah Talet (court transfert ou à pied)', 'Dîner 20:30, retour 23:00.', '19', 'sur le domaine', 'normal', [], 'La Kasbah By Beldi', 'Kasbah Talet by Beldi'),
  W('w0921-0620', '2026-09-21', '06:20', 'depart', 'HV6534 — décollage 09:55 (Eindhoven)', ALL, BUS, 'Chauffeurs en place 05:45, bagages 06:00, départ groupé 06:20, trajet ~45–50 min, dépose ~07:10 (H-2:45). Transavia → Eindhoven 15:35. HEURE : nouvelle heure (GMT) — chauffeurs prévenus.', 'La Kasbah By Beldi', 'critique'),
];
const waveSeq = waves.map(w => {
  const isArr = w.type === 'arrivee', isDep = w.type === 'depart';
  const title = isArr ? `Arrivée ${w.vol} — ${w.pax.length} pax` : isDep ? `Départ ${w.vol} — ${w.pax.length} pax` : `Transfert ${w.vol} — ${w.paxEstime} pax`;
  const lieu = isArr ? `Aéroport RAK → ${w.destination}` : isDep ? `${w.origine} → Aéroport RAK` : `${w.origine} → ${w.destination}`;
  const details = `Véhicule : ${w.vehicule}.` + (w.note ? ' ' + w.note : '');
  return S(w.id, w.date, w.heure, null, title, lieu, isDep || isArr ? String(w.pax.length) : w.paxEstime, 'transport', w.level, details, ['Chauffeur(s) en place', 'Passagers complets', 'Parti'], w.pax, { waveId: w.id });
});
const timeline = { version: VERSION, updatedAt: UPDATED, sequences: [...seqs, ...waveSeq].sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)) };
const transport = {
  version: VERSION, updatedAt: UPDATED,
  regles: [
    'HEURE : nuit du 19 au 20/09, à 02:00 les horloges reculent à 01:00 — passage définitif à GMT (décret 2.26.530). Tous les horaires des 20 et 21/09 sont en nouvelle heure. Vérification croisée des montres avec Eva / Mehdi avant chaque prise en charge des 20 et 21/09 ; l’app Sightline Ops affiche l’heure légale.',
    'Référent horaires transport côté MRCO : Farid Lourida (+212 656 966 260) — tout changement d’horaire passe par lui.',
    'Départ aéroport : dépose à RAK au minimum 2 h avant décollage (La Kasbah By Beldi → RAK ~45–50 min).',
    'Arrivée J1 : accueil en zone arrivées avec pancarte « Sightline », chauffeurs en place à l\'atterrissage, sortie passagers +30 à 40 min. Suivi du vol en temps réel.',
    '4×4 : J3 = self drive (invités au volant, 5 pax max par véhicule, aucun alcool pour les conducteurs) · J4 = 4 pax max par véhicule avec chauffeur, sans bagages, sans exception.',
    'Propreté des véhicules : impeccables à chaque prise en charge, lavés entre les journées 4×4.',
    'Chauffeurs : tenue soignée (pas de jean ni t-shirt sport), climatisation, eau fraîche, aucune information sur le client au-delà du nom « Sightline ».',
    'Tout aléa (retard, passager manquant, incident piste) : appel immédiat Farid ou Mehdi. Ne jamais partir incomplet sans validation MRCO.',
  ],
  contactDispatch: { nom: 'Najib', role: 'Transporteur', tel: '+212663298773' },
  vagues: waves,
  horsDispatch: [
    'Montgolfière 18/09 : ramassage 05:30 au 2Ciels par l’opérateur (réf. SIGHTLINE, 19 pax) — M. Salah +212 662 302 515, Mme Najat +212 668 442 763.',
    'Bagages 19/09 : 2Ciels → Yes We Camp Agafay par le transporteur du 2Ciels.',
    'Ssi Brahim : chauffeur-pisteur référent des journées 4×4 (19 et 20/09), coordination via Najib.',
  ],
  flotte: [
    { date: '2026-09-17', pax: '19', mouvements: 'Accueil aéroport 13:35 + Beldi + check-in + dîner Petanque (retour ~00:00)', flotte: '2 × 17 pl — 13:30 → ~00:30' },
    { date: '2026-09-18', pax: '19', mouvements: 'Grand Bazar 12:15, standby médina, retour 16:15, Comptoir Darna 20:30, retour 23:30 + disposal', flotte: '2 × 17 pl — 11:30 → fin de soirée' },
    { date: '2026-09-19', pax: '19', mouvements: 'Rallye 4×4 self drive 09:00 → Agafay 17:00 (Ssi Brahim)', flotte: '4 × 4×4 (3 de 5 + 1 de 4) + assistance' },
    { date: '2026-09-20', pax: '19', mouvements: '4×4 avec chauffeurs 11:00 → Kasbah ~17:30 + véhicule bagages 10:30', flotte: '5 × 4×4 (4/4/4/4/3) + 1 véhicule bagages + véhicule MRCO' },
    { date: '2026-09-21', pax: '19', mouvements: 'Transfert aéroport 06:20 → dépose 07:10, vol 09:55', flotte: '2 × 17 pl — en place 05:45' },
  ],
};

// ---------- Lieux ----------
const lieux = { version: VERSION, updatedAt: UPDATED, diners: [], items: [
  { id: 'rak', nom: 'Aéroport Marrakech Ménara (RAK)', adresse: 'Marrakech Ménara', acces: 'Zone arrivées : pancarte « Sightline ». Terminal départs le 21/09 dès 07:10.', quoi: ['17/09 13:35 : arrivée FR5895 (Ryanair, Eindhoven)', '21/09 09:55 : départ HV6534 (Transavia, Eindhoven — arrivée 15:35)'], jours: ['2026-09-17', '2026-09-21'] },
  { id: 'beldi', nom: 'Beldi Country Club', adresse: 'Km 6 route du Barrage, Cherifia, Marrakech', tel: '+212524383950', acces: 'Depuis RAK ~25 min. Bus gardés avec les bagages.', quoi: ['17/09 14:30 thé de bienvenue + pâtisseries', '17/09 14:45 déjeuner 3 plats dans les jardins — menu 2, chevalets 2'], jours: ['2026-09-17'] },
  { id: '2ciels', nom: '2Ciels Boutique Hotel & Spa', adresse: 'Rue Oued El Makhazine, angle rue Imam Chafai, Marrakech', tel: '+212524359550', acces: 'Nuits du 17 au 19/09 (2 nuits). Rooftop, piscine, spa.', quoi: ['Chambres attribuées par l’hôtel (17/09) : 304 Tammo + Dennis · 505 Erwin · 117 Arjen · 404 Sander + Pascal · 412 Jos + Michaël · 212 Christiaan + Wim · 417 Jasper + Marcel · 503 Mischa + Hjalmar · 411 Roel + Otte · 504 Nancy + Romy · 111 Adriana · 511 chambre maintenue (occupant désigné sur place)', 'Allergie Wim Wildenbeest : petit-déjeuner et room service à briefer', 'Check-in 17/09 ~16:45 · check-out 19/09 dès 08:00, bagages laissés à la réception (transporteur 2Ciels → Agafay) · briefing 4×4 08:45', 'Départ montgolfière 18/09 05:45 (opérateur)'], jours: ['2026-09-17', '2026-09-18', '2026-09-19'] },
  { id: 'psc', nom: 'Petanque Social Club', adresse: '70 boulevard El Mansour Eddahbi, Guéliz, Marrakech (derrière le Ciné-Palace, porte bleue)', tel: '+212666455380', acces: 'Club secret style années 1930 — porte bleue discrète, derrière le Ciné-Palace.', quoi: ['17/09 20:45 cocktail « 30th Anniversary »', '17/09 21:15 dîner 4 plats — menu 1, chevalets 1, prisme bar A, totem bar B, sous-verres'], jours: ['2026-09-17'] },
  { id: 'grand-bazar', nom: 'Le Grand Bazar', adresse: 'Place Jemaa el-Fna, Médina, Marrakech', acces: 'Dépose au plus proche de la place, puis à pied.', quoi: ['18/09 12:30 déjeuner 3 plats — menu 3, chevalets 3', '18/09 14:15 départ Medina Quest Adventure'], jours: ['2026-09-18'] },
  { id: 'darna', nom: 'Le Comptoir Darna', adresse: 'Avenue Echouhada, Hivernage, Marrakech ⚠️ à confirmer', acces: 'Hivernage.', quoi: ['18/09 20:30 dîner 4 plats + spectacle (musiciens, danseurs) — menu 4, chevalets 4'], jours: ['2026-09-18'], aConfirmer: true },
  { id: 'relais', nom: 'Le Relais du Lac', adresse: 'Barrage Lalla Takerkoust, BP 42200, province Al Haouz', tel: '+212661242454', tel2: '+212808656700', email: 'contactrelaisdulac@gmail.com', contacts: ['Daniel +212 661 242 454', 'Nathalie +212 661 837 920', 'www.relaisdulacmarrakech.com'], acces: 'Terrasse au bord du lac, vue Atlas. 4×4 en standby.', quoi: ['19/09 13:00 déjeuner 3 plats — menu 5, chevalets 5'], jours: ['2026-09-19'] },
  { id: 'agafay', nom: 'Yes We Camp Agafay', adresse: 'Désert d\'Agafay — accès ⚠️ à confirmer', acces: 'Arrivée du convoi 4×4 vers 17:00.', quoi: ['Nuit du 19 au 20/09 : 12 tentes Top VIP (climatisation, salle de bain privée, staff 24/7) — attribution ⚠️', '19/09 20:00 dîner 4 plats + soirée (tamtam, cracheur de feu, DJ), open bar 3 h — menu 6, chevalets 6', '20/09 08:30 petit-déjeuner, 10:00 dromadaires, 10:30 véhicule bagages, 11:00 convoi'], jours: ['2026-09-19', '2026-09-20'], aConfirmer: true },
  { id: 'imlil', nom: 'Imlil — Sidi Fares (chez Adil)', adresse: 'Vallée d\'Imlil / Sidi Fares, Haut Atlas', acces: 'Par Tahannaout / Asni. Ssi Brahim connaît Adil.', quoi: ['20/09 12:00 marche guidée villages berbères', '20/09 13:30 déjeuner berbère (softs inclus)'], jours: ['2026-09-20'] },
  { id: 'kasbah', nom: 'La Kasbah By Beldi', adresse: 'Lac de Lalla Takerkoust, village de Talet (Kasbah Beldi)', tel: '+212524383950', email: 'contact@kasbahbeldi.com', acces: 'Redescente directe depuis Sidi Fares (~17:30). Vers RAK ~45–50 min.', quoi: ['Nuit du 20 au 21/09 : 13 chambres (8 twins + 4 singles + 1 double staff MRCO)', '20/09 20:30 dîner à Kasbah Talet (sur le domaine) — 18 couverts + 2 staff à part — menu 7, chevalets 7', '21/09 petit-déjeuner 05:15, départ 06:20'], jours: ['2026-09-20', '2026-09-21'] },
] };

// ---------- Menus (contenu des 7 menus PDF à transcrire — pack imprimeur) ----------
const menus = { version: VERSION, updatedAt: UPDATED, items: [
  { id: 'm1', date: '2026-09-17', sequence: 'Déjeuner J1', lieu: 'Beldi Country Club', menu: 'Menu 2 (pack) — « Chef’s selection » : le menu du jour est sur l’ardoise. 3 plats dans les jardins. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Thé à la menthe et pâtisseries à l’arrivée (⚠️ amandes / fruits secs pour Wim). Boissons réglées par le groupe.' },
  { id: 'm2', date: '2026-09-17', sequence: 'Dîner J1', lieu: 'Petanque Social Club', menu: 'Menu 1 (pack) — Entrées partagées : pizza Margherita burrata, basilic & huile d’olive · baba ganoush · salade de chèvre aux NOIX grillées et poires ⚠️ · tartare d’avocat huile d’olive & herbes · salade mixte vinaigrette · brocoli grillé, chutney de chou blanc & sauce miso. Plats partagés : demi-poulet rôti, haricots blancs, tomates rôties & jus · poulpe grillé, ragoût de pois chiches, aïoli & bitter greens (fruits de mer ⚠️) · pommes de terre rôties. Desserts partagés : gâteau au chocolat glace vanille · banoffee pie. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Cocktail « 30th Anniversary » 20:45 · boissons réglées par le groupe' },
  { id: 'm3', date: '2026-09-18', sequence: 'Déjeuner J2', lieu: 'Le Grand Bazar', menu: 'Menu 3 (pack) — Entrée : assortiment de légumes grillés. Plat : tajine de poulet mijoté aux épices marocaines, couscous ou salade verte (sans gluten = salade). Dessert : mahalabi, crème de lait glacée aux arômes floraux. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Boissons réglées par le groupe' },
  { id: 'm4', date: '2026-09-18', sequence: 'Dîner J2', lieu: 'Le Comptoir Darna', menu: 'Menu 4 (pack) — Entrées partagées : assortiment de briouates (gluten, garnitures ⚠️) · 7 salades marocaines. Plats partagés : tajine de poulet aux olives & citron confit · tajine de kefta marrakchie. Desserts partagés : salade d’oranges et dattes à la cannelle · pastilla au lait d’AMANDE à la fleur d’oranger ⚠️ (Wim : aucune trace). Spectacle musiciens et danseurs. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Boissons réglées par le groupe' },
  { id: 'm5', date: '2026-09-19', sequence: 'Déjeuner J3', lieu: 'Le Relais du Lac', menu: 'Menu 5 (pack) — Entrée : salade de saison. Plat : mixed grill, frites & légumes grillés (Roel : option végétarienne à demander). Dessert : fondant au chocolat. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Boissons réglées par le groupe' },
  { id: 'm6', date: '2026-09-19', sequence: 'Dîner J3', lieu: 'Yes We Camp Agafay', menu: 'Menu 6 (pack) — Entrée partagée : assortiment de salades marocaines. Plats partagés : tangia de bœuf traditionnelle (poitrine braisée en jarre) · tajine de légumes façon tian. Dessert : fruits de saison frais. Soirée tamtam, cracheur de feu, DJ. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Forfait boissons + open bar 3 h (vin, bière, whisky, gin, vodka, softs) ; cocktails et spiritueux deluxe en supplément réglé par le groupe' },
  { id: 'm7', date: '2026-09-20', sequence: 'Déjeuner J4', lieu: 'Imlil / Sidi Fares — chez Adil', menu: 'Déjeuner berbère en montagne (pas de menu imprimé). ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Softs inclus' },
  { id: 'm8', date: '2026-09-20', sequence: 'Dîner J4', lieu: 'Kasbah Talet by Beldi', menu: 'Menu 7 (pack) — Entrée : croustillant d’avocat. Plat : souris d’agneau confite. Dessert : dessert du moment du chef + pâtisseries marocaines (⚠️ amandes). 18 couverts : Wim ne dîne pas (repas personnel), 2 repas staff MRCO à part. ' + "Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).", boissons: 'Boissons réglées par le groupe' },
] };

// ---------- Contacts ----------
const contacts = { version: VERSION, updatedAt: UPDATED, groupes: [
  { nom: 'MRCO', contacts: [
    { nom: 'Mehdi Lahbabi', role: 'Managing Partner — pilotage & client · numéro d\'urgence de l\'itinéraire (24/7)', tel: '+212663176313', email: 'mlahbabi@mrco.company' },
    { nom: 'Eva Brünnich', role: 'Field lead — terrain, hôtels, restaurants', tel: '+212653876361', email: 'ebrunnich@mrco.company' },
    { nom: 'Farid Lourida', role: 'Logistique, transferts (contact aléas chauffeurs)', tel: '+212656966260', email: '' },
    { nom: 'Mouad Boullous', role: 'Project Manager', tel: '+212659042575', email: '' },
  ] },
  { nom: 'Client & agence', contacts: [
    { nom: 'Uyuni Travels B.V.', role: 'Agence organisatrice (Pays-Bas) — WhatsApp / téléphone', tel: '+31624521504', email: 'contact@uyunitravels.com', note: 'www.uyuni-incentivetravels.nl' },
    { nom: 'Pamela', role: 'Uyuni — liste des régimes finale (cartes allergie) · ne vient pas sur place', tel: '', email: '', aConfirmer: true },
    { nom: 'Nancy Dinnissen', role: 'Contact groupe Sightline (référente sur place) — WhatsApp', tel: '+31651273284', email: '' },
    { nom: 'Romy van Elteren', role: 'Contact groupe Sightline (référente sur place) — WhatsApp', tel: '+31681725401', email: '' },
    { nom: 'Sightline Productions', role: 'Client — groupe de 19 (30 ans de l\'entreprise)', tel: '', email: '' },
  ] },
  { nom: 'Transport', contacts: [
    { nom: 'Najib', role: 'Transporteur — 2 × 17 pl, 4×4, véhicule bagages', tel: '+212663298773', email: '', note: 'Même numéro que Simohamed (Deloitte)' },
    { nom: 'Ssi Brahim', role: 'Chauffeur-pisteur référent 4×4 (19 et 20/09)', tel: '+212661344597', email: '' },
    { nom: 'M. Salah — montgolfière', role: 'Opérateur montgolfière 18/09 (réf. SIGHTLINE, ramassage 05:30 au 2Ciels)', tel: '+212662302515', email: '' },
    { nom: 'Mme Najat — montgolfière', role: 'Opérateur montgolfière 18/09', tel: '+212668442763', email: '' },
  ] },
  { nom: 'Lieux', contacts: [
    { nom: '2Ciels Boutique Hotel & Spa', role: 'Hôtel 17→19/09', tel: '+212524359550', email: '' },
    { nom: 'Beldi Country Club', role: 'Déjeuner 17/09', tel: '+212524383950', email: '' },
    { nom: 'Petanque Social Club', role: 'Dîner 17/09 — 70 bd El Mansour Eddahbi, Guéliz', tel: '+212666455380', email: '' },
    { nom: 'Le Grand Bazar', role: 'Déjeuner 18/09', tel: '', email: '', aConfirmer: true },
    { nom: 'Le Comptoir Darna', role: 'Dîner 18/09', tel: '', email: '', aConfirmer: true },
    { nom: 'Le Relais du Lac — Daniel', role: 'Déjeuner 19/09 · Nathalie +212 661 837 920 · standard +212 808 656 700', tel: '+212661242454', tel2: '+212661837920', email: 'contactrelaisdulac@gmail.com' },
    { nom: 'Yes We Camp Agafay', role: 'Nuit 19→20/09', tel: '', email: '', aConfirmer: true },
    { nom: 'La Kasbah By Beldi / Kasbah Talet', role: 'Nuit 20→21/09 + dîner — lac Lalla Takerkoust, village de Talet', tel: '+212524383950', email: 'contact@kasbahbeldi.com' },
  ] },
] };

// ---------- Signalétique = pack imprimeur ----------
const signaletique = { version: VERSION, updatedAt: UPDATED, note: 'Pack imprimeur SIGHTLINE 30 (30 PDF, 15/09) : palette orange #EB5E12 / noir / blanc cassé. Quantités du lisez-moi imprimeur.', items: [
  { id: 'sig-menus', label: 'Menus A4 → chevalet A5 (7 lieux)', qte: '7 × 22 = 154', lieu: 'Un lot par lieu', date: '2026-09-16' },
  { id: 'sig-chevalets', label: 'Chevalets A3 en V (7 lieux)', qte: '7 × 3 = 21', lieu: 'Un lot par lieu', date: '2026-09-16' },
  { id: 'sig-bar-a', label: 'Prisme XL « 30 Years » (bar A)', qte: 2, lieu: 'Petanque Social Club', date: '2026-09-17' },
  { id: 'sig-bar-b', label: 'Totem « Access All Areas » (bar B)', qte: 2, lieu: 'Petanque Social Club', date: '2026-09-17' },
  { id: 'sig-sousverres', label: 'Sous-verres Backstage / Proost', qte: '2 × 150', lieu: 'Bars des dîners', date: '2026-09-17' },
  { id: 'sig-pancarte-rak', label: 'Pancarte aéroport « Welcome » A3', qte: 2, lieu: 'Aéroport RAK', date: '2026-09-17' },
  { id: 'sig-vehicules', label: 'Pancartes véhicules (CAR 1-6, BUS 1-2, CREW, LUGGAGE)', qte: 10, lieu: 'Véhicules Najib', date: '2026-09-17', note: 'Plastifiées' },
] };

// ---------- Équipe ----------
const team = { version: VERSION, updatedAt: UPDATED, membres: ['Mehdi', 'Eva', 'Farid', 'Mouad'],
  affectations: [
    { sequenceId: 's0917-rak', owner: 'Mehdi', role: 'accueil aéroport' },
    { sequenceId: 's0917-rak', owner: 'Mouad', role: 'accueil aéroport' },
    { sequenceId: 's0917-setup-beldi', owner: 'Eva', role: 'mise en place Beldi + thé d’accueil (Toyota, 13:15)' },
    { sequenceId: 's0917-setup-beldi', owner: 'Farid', role: 'mise en place Beldi + thé d’accueil (Toyota, 13:15)' },
    { sequenceId: 's0917-checkin', owner: 'Eva', role: 'check-in 2Ciels : clés, signalétique, thé' },
    { sequenceId: 's0917-checkin', owner: 'Farid', role: 'check-in 2Ciels : clés, signalétique, thé' },
    { sequenceId: 's0917-setup-psc', owner: 'Eva', role: 'setup Petanque + cocktail 30 ans' },
    { sequenceId: 's0917-setup-psc', owner: 'Farid', role: 'setup Petanque + cocktail 30 ans' },
    { sequenceId: 'p0917-2030', owner: 'Mehdi', role: 'transfert hôtel → PSC avec le groupe' },
    { sequenceId: 'p0917-2030', owner: 'Mouad', role: 'transfert hôtel → PSC avec le groupe' },
    { sequenceId: 's0918-ballon', owner: 'Farid', role: 'départ montgolfière 05:30 avec le groupe' },
    { sequenceId: 's0918-ballon', owner: 'Mehdi', role: 'départ montgolfière 05:30 avec le groupe' },
    { sequenceId: 's0918-ballon', owner: 'Eva', role: 'relais retour hôtel 09:30' },
    { sequenceId: 's0918-ballon', owner: 'Mouad', role: 'relais retour hôtel 09:30' },
    { sequenceId: 's0918-setup-bazar', owner: 'Farid', role: 'mise en place Grand Bazar' },
    { sequenceId: 's0918-setup-bazar', owner: 'Eva', role: 'mise en place Grand Bazar' },
    { sequenceId: 's0920-luggage', owner: 'Farid', role: 'à bord du véhicule bagages Agafay → Kasbah' },
    { sequenceId: 's0918-rappel-brief', owner: 'Mouad', role: 'préparer ce soir le matériel du briefing 4×4' },
    { sequenceId: 's0918-rappel-brief', owner: 'Farid', role: 'préparer ce soir le matériel du briefing 4×4' },
    { sequenceId: 's0919-setup-brief', owner: 'Mouad', role: 'setup briefing prêt à 08:15 (écran, projecteur, JBL)' },
    { sequenceId: 's0919-setup-brief', owner: 'Farid', role: 'setup briefing prêt à 08:15 (écran, projecteur, JBL)' },
    { sequenceId: 's0919-hv', owner: 'Farid', role: 'pointage HV6534' },
    { sequenceId: 's0920-hv', owner: 'Farid', role: 'pointage HV6534' },
    { sequenceId: 's0916-najib', owner: 'Mehdi', role: 'appel Najib : flotte + correction heure' },
  ],
  moments: [
    { sequenceId: 's0917-setup-beldi', label: 'Mise en place Beldi 17/09 13:15' },
    { sequenceId: 's0917-rak', label: 'Accueil aéroport 17/09 13:35' },
    { sequenceId: 's0917-setup-psc', label: 'Setup Petanque Social Club 17/09' },
    { sequenceId: 's0918-ballon', label: 'Montgolfière 18/09 05:30 (départ Farid + Mehdi, retour Eva + Mouad)' },
    { sequenceId: 's0918-setup-bazar', label: 'Mise en place Grand Bazar 18/09 11:15' },
    { sequenceId: 's0919-setup-brief', label: 'Setup briefing 4×4 — prêt à 08:15 le 19/09' },
    { sequenceId: 's0919-brief4x4', label: 'Rallye 4×4 self drive 19/09' },
    { sequenceId: 's0920-luggage', label: 'Véhicule bagages 20/09 (encadrant MRCO à bord)' },
    { sequenceId: 's0920-convoi', label: 'Convoi 4×4 chauffeurs 20/09' },
    { sequenceId: 'w0921-0620', label: 'Transfert aéroport 21/09 06:20' },
  ] };

// ---------- Points en attente ----------
const pending = { version: VERSION, updatedAt: UPDATED, items: [
  { id: 'pd01', sujet: 'HEURE : passage à GMT confirmé (décret 2.26.530, vérifié en ligne le 16/09) dans la nuit du 19 au 20/09 — les téléphones non mis à jour resteront à UTC+1 : au réveil du 20/09, aligner les 4 téléphones MRCO sur l’heure de l’app (bandeau rouge si écart) et rappeler la nouvelle heure à Najib, Ssi Brahim, le camp Agafay (petit-déj 08:30) et La Kasbah (petit-déj 05:15)', responsable: 'Mehdi / Eva', echeance: '2026-09-19', level: 'alerte' },
  { id: 'pd03', sujet: 'J4 (20/09) : répartition proposée par MRCO — CAR 1 Tammo, Arjen, Pascal, Marcel · CAR 2 Sander, Erwin, Michaël, Adriana · CAR 3 Jos, Mischa, Wim, Nancy · CAR 4 Christiaan, Jasper, Hjalmar, Dennis · CAR 5 Otte, Roel, Romy — à valider puis transmettre à Najib / Ssi Brahim', responsable: 'Mehdi → Farid', echeance: '2026-09-19', level: 'alerte' },
  { id: 'pd04', sujet: 'Véhicule bagages J4 : type et capacité à confirmer par Najib (Farid à bord)', responsable: 'Farid → Najib', echeance: '2026-09-18', level: 'normal' },
  { id: 'pd05', sujet: 'Convoi J3 : véhicule d’assistance et place de MRCO à caler avec Ssi Brahim (numéro dans Contacts depuis le 17/09)', responsable: 'Farid', echeance: '2026-09-18', level: 'normal' },
  { id: 'pd07', sujet: 'Chambre 12 (2Ciels et Kasbah) attribuée sur place par le groupe : noter l\'occupant à l\'arrivée', responsable: 'Eva', echeance: '2026-09-17', level: 'normal' },
  { id: 'pd10', sujet: 'Téléphones manquants : Comptoir Darna, Yes We Camp Agafay (Petanque, Kasbah et Relais du Lac trouvés)', responsable: 'Eva', echeance: '2026-09-18', level: 'normal' },
  { id: 'pd13', sujet: 'Soirée du 19/09 au camp : Mehdi a écrit « soirée balance » (18/09) — thème à préciser (soirée blanche ? consigne vestimentaire à annoncer au groupe ?) ; qui emporte l’enceinte JBL au camp après le briefing', responsable: 'Mehdi', echeance: '2026-09-19', level: 'alerte' },
  { id: 'pd12', sujet: 'HV6534 lundi : Flightradar24 affiche 10:55 (nouvelle heure), documents 09:55 — pointer le vol dans l’app le 19 et le 20 au soir, informer Najib et le groupe de l’heure retenue', responsable: 'Farid', echeance: '2026-09-20', level: 'alerte' },
  ] };

// ---------- Express (non utilisé) ----------
const express = { version: VERSION, updatedAt: UPDATED, nom: '', date: '', prestataire: '', depart: '', arrivee: '', equipes: [], retour1430: [], notes: [] };

// ---------- Contrôles ----------
const idsAll = new Set(ALL);
const bad = [];
for (const s of timeline.sequences) for (const p of s.persons) if (!idsAll.has(p)) bad.push(s.id + ':' + p);
for (const p of pending.items) for (const x of p.persons || []) if (!idsAll.has(x)) bad.push(p.id + ':' + x);
if (bad.length) throw new Error('refs invalides ' + bad.join(','));
const FORBIDDEN = /\b(€|EUR|MAD|dirham|tarif|prix|facture|montant)\b/i;
const dump = JSON.stringify({ people, timeline, transport, lieux, menus, contacts, pending });
if (FORBIDDEN.test(dump)) console.log('⚠️ terme financier présent :', dump.match(new RegExp('.{40}' + FORBIDDEN.source + '.{40}', 'i'))?.[0]);

// ---------- Écriture ----------
fs.mkdirSync(OUT, { recursive: true });
const write = (name, obj) => { fs.writeFileSync(path.join(OUT, name), JSON.stringify(obj, null, 1) + '\n'); };
write('participants.json', { version: VERSION, updatedAt: UPDATED, items: people });
write('timeline.json', timeline);
write('transport.json', transport);
write('lieux.json', lieux);
write('menus.json', menus);
write('contacts.json', contacts);
write('signaletique.json', signaletique);
write('team.json', team);
write('pending.json', pending);
write('express.json', express);
console.log('participants', people.length, 'séquences', timeline.sequences.length, 'vagues', waves.length, 'jeeps', [1, 2, 3, 4].map(n => JEEP(n).length).join('/'), 'Wim', WIM);
