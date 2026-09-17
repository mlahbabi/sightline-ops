// 17/09 matin — réponses de Mehdi : jeeps, affectations du jour, Wim apporte ses repas, Najib = Simohamed, adresses, HV6534 à pointer.
const fs = require('fs');
const f = __dirname + '/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const R = (re, b) => { if (!re.test(s)) throw new Error('introuvable : ' + re); s = s.replace(re, b); };

R(/const VERSION = 'V1\.2 — 17\/09\/2026';/, "const VERSION = 'V1.3 — 17/09/2026';");
R(/const UPDATED = '[^']*';/, "const UPDATED = '2026-09-17T09:30:00+01:00';");

// Jeep 1 confirmée, tentes = chambres, véhicules du dimanche (proposition MRCO)
R(/a_confirmer: \[\.\.\.\(jeep === 1 \? \['Jeep 1 déduite[^\n]*\n/, "a_confirmer: [],\n");
R(/Agafay tente ⚠️ non communiquée/, 'Agafay tente ${ch2} (même numéro que la chambre 2Ciels)');
R(/if \(nom === 'Wildenbeest'\) notes\.push\('[^\n]*\);/, "if (nom === 'Wildenbeest') notes.push('ALLERGIE CRITIQUE noix / fruits à coque / arachides — EpiPen sur lui. NE MANGE PAS avec le groupe : il apporte sa propre nourriture à TOUS les repas (Mehdi, 17/09). Lui garder une place à table et ses boissons, glacière au frais à chaque hôtel (2Ciels, Agafay, Kasbah). Aucune trace de noix dans ce qui lui est offert (thé, pâtisseries).');");
R(/const WIM = pid\('wildenbeest'\);/, `const WIM = pid('wildenbeest');
// Dimanche 20/09 — 5 × 4×4 avec chauffeur, 4/4/4/4/3, dérivés des jeeps du samedi (proposition MRCO du 17/09, à valider)
const CAR_J4 = { 1: ['van-brakel', 'hofma', 'rintjema-pascal', 'vellekoop'], 2: ['van-der-ham', 'rintjema', 'dokter', 'ruigrok'], 3: ['van-der-hoeven', 'pet', 'wildenbeest', 'dinnissen'], 4: ['van-oudenallen', 'van-der-klauw', 'vogel', 'van-der-haagen'], 5: ['stoltenborg', 'de-rijk', 'van-elteren'] };
people.forEach(a => { const n = Object.keys(CAR_J4).find(k => CAR_J4[k].includes(a.id)); if (!n) throw new Error('CAR_J4 ' + a.id); a.vehicule_j4 = Number(n); a.note_app = (a.note_app ? a.note_app + ' ' : '') + 'Samedi 19/09 : Jeep ' + a.equipe_tb + ' (self drive). Dimanche 20/09 : CAR ' + n + ' avec chauffeur (proposition MRCO, à valider).'; });
const CARS = 'CAR 1 Tammo, Arjen, Pascal, Marcel · CAR 2 Sander, Erwin, Michaël, Adriana · CAR 3 Jos, Mischa, Wim, Nancy · CAR 4 Christiaan, Jasper, Hjalmar, Dennis · CAR 5 Otte, Roel, Romy';`);

// Couverts : 18 partout
R(/const ALLERGIE = '[^\n]*';/, "const ALLERGIE = 'COUVERTS : 18 — Wim Wildenbeest apporte sa propre nourriture à tous les repas (allergie noix / arachides, EpiPen) : lui garder une place, ses boissons, glacière au frais. Régimes : Erwin (pas de poisson), Michaël (poisson, beurre, champignons), Marcel (fruits de mer, viande crue), Mischa (coriandre, champignons), Hjalmar (fromage), Roel (ni poisson ni viande), Otte et Adriana (sans gluten).';");
R(/'Chef briefé allergie \+ régimes'/g, "'Chef briefé : 18 couverts + régimes'");
R(/'Cuisinier briefé allergie \+ régimes'/, "'Cuisinier briefé : 18 couverts + régimes'");

// Jeudi 17/09 — organisation MRCO
R(/  S\('s0917-rak', '2026-09-17', '12:30', '13:35', 'MRCO en place à l.{1,2}aéroport \(2 pers\.\) \+ pancarte Sightline'/, "  S('s0917-setup-beldi', '2026-09-17', '13:15', '14:30', 'Mise en place Beldi — Eva + Farid (Toyota)', 'Beldi Country Club', '', 'setup', 'critique', 'Départ 13:15 en voiture. Thé d’accueil et pâtisseries prêts pour ~14:30, chevalets 2 + menus 2 sur les tables, chef briefé (18 couverts, Wim apporte son repas, régimes). Dès l’arrivée du groupe, Eva et Farid repartent au 2Ciels préparer le check-in.', ['Thé d’accueil prêt (pâtisseries sans noix à portée de Wim)', 'Chevalets et menus posés', 'Chef briefé : 18 couverts + régimes', 'Repartis vers le 2Ciels']),\n  S('s0917-rak', '2026-09-17', '12:30', '13:35', 'Mehdi + Mouad à l’aéroport + pancarte Sightline'");
R(/\['12 clés remises', 'Ch\. 12 : occupant noté',/, "['Eva + Farid en place AVANT le groupe : clés prêtes, signalétique correcte', 'Thé d’accueil servi pour patienter', '12 clés remises', 'Ch. 12 : occupant noté',");
R(/'Menus 1 \+ chevalets 1 sur les tables, prisme bar A/, "'Eva + Farid. SOIGNER LE COCKTAIL 30 ANS (mise en scène du bar, prisme, totem, sous-verres). Menus 1 + chevalets 1 sur les tables, prisme bar A");
R(/'Cocktail 20:45, dîner 21:15\.', '19', BUS, 'important'/, "'Mehdi + Mouad accompagnent le groupe dans les bus. Cocktail 20:45, dîner 21:15.', '19', BUS, 'important'");

// Vendredi 18/09 — départ dîner 20:30 confirmé
R(/prog\('p0918-2000', '2026-09-18', '20:00', '2Ciels → Le Comptoir Darna', 'Dîner spectacle 20:30\.'/, "prog('p0918-2030', '2026-09-18', '20:30', '2Ciels → Le Comptoir Darna', 'Horaire confirmé à Najib le 17/09 : 20:30 (comme le 17). Dîner spectacle ~21:00.'");
R(/S\('s0918-darna', '2026-09-18', '20:30', '23:30',/, "S('s0918-darna', '2026-09-18', '21:00', '23:30',");
R(/Comptoir Darna 20:00, retour 23:30/, 'Comptoir Darna 20:30, retour 23:30');

// Dimanche 20/09 — Farid dans le véhicule bagages, répartition proposée
R(/Encadrant MRCO à bord : ⚠️ à désigner\./, 'Encadrant MRCO à bord : FARID.');
R(/'Encadrant désigné et à bord'/, "'Farid à bord'");
R(/1 encadrant MRCO à bord \(⚠️ à désigner\)\./, 'Farid à bord.');
R(/Répartition nominative ⚠️ à établir \(les jeeps du J3 sont à 5\)\./, "Répartition (proposition MRCO du 17/09, à valider) : ' + CARS + '.");
R(/Répartition nominative ⚠️ à établir\. Heure : nouvelle heure \(GMT\)\./, "Répartition (proposition MRCO, à valider) : ' + CARS + '. Heure : nouvelle heure (GMT).");

// Transport : Najib = Simohamed, Farid référent horaires
R(/contactDispatch: \{ nom: 'Najib', role: 'Transporteur', tel: '' \}/, "contactDispatch: { nom: 'Najib', role: 'Transporteur', tel: '+212663298773' }");
R(/    'Départ aéroport : dépose à RAK au minimum 2 h avant décollage/, "    'Référent horaires transport côté MRCO : Farid Lourida (+212 656 966 260) — tout changement d’horaire passe par lui.',\n    'Départ aéroport : dépose à RAK au minimum 2 h avant décollage");
R(/\{ nom: 'Najib', role: 'Transporteur — 2 × 17 pl, 4×4, véhicule bagages', tel: '', email: '', aConfirmer: true, note: 'Numéro à renseigner' \}/, "{ nom: 'Najib', role: 'Transporteur — 2 × 17 pl, 4×4, véhicule bagages', tel: '+212663298773', email: '', note: 'Même numéro que Simohamed (Deloitte)' }");

// Lieux et contacts : adresses trouvées en ligne le 17/09
R(/adresse: 'Marrakech — adresse ⚠️ à confirmer', acces: 'Club secret style années 1930\.'/, "adresse: '70 boulevard El Mansour Eddahbi, Guéliz, Marrakech (derrière le Ciné-Palace, porte bleue)', tel: '+212666455380', acces: 'Club secret style années 1930 — porte bleue discrète, derrière le Ciné-Palace.'");
R(/jours: \['2026-09-17'\], aConfirmer: true \},/, "jours: ['2026-09-17'] },");
R(/adresse: 'Route de Lalla Takerkoust — adresse exacte ⚠️ à confirmer', acces:/, "adresse: 'Lac de Lalla Takerkoust, village de Talet (Kasbah Beldi)', tel: '+212524383950', email: 'contact@kasbahbeldi.com', acces:");
R(/jours: \['2026-09-20', '2026-09-21'\], aConfirmer: true \},/, "jours: ['2026-09-20', '2026-09-21'] },");
R(/\{ nom: 'Petanque Social Club', role: 'Dîner 17\/09', tel: '', email: '', aConfirmer: true \}/, "{ nom: 'Petanque Social Club', role: 'Dîner 17/09 — 70 bd El Mansour Eddahbi, Guéliz', tel: '+212666455380', email: '' }");
R(/\{ nom: 'La Kasbah By Beldi \/ Kasbah Talet', role: 'Nuit 20→21\/09 \+ dîner', tel: '', email: '', aConfirmer: true \}/, "{ nom: 'La Kasbah By Beldi / Kasbah Talet', role: 'Nuit 20→21/09 + dîner — lac Lalla Takerkoust, village de Talet', tel: '+212524383950', email: 'contact@kasbahbeldi.com' }");

// Pack imprimeur : cartes allergie inutiles
R(/, 'Cartes allergie ×8 \(après reconfirmation Pamela\)'/, '');
R(/  \{ id: 'sig-allergie',[^\n]*\n/, '');

// Rappels HV6534 (vérification Flightradar24 la veille et l’avant-veille)
R(/  \/\/ J4 — dimanche 20\/09\n/, "  S('s0919-hv', '2026-09-19', '21:30', '21:45', 'Pointer HV6534 sur Flightradar24 (Transport → 21/09) : 09:55 ou 10:55 ?', 'Yes We Camp Agafay', '', 'orga', 'important', 'Consigne Mehdi 17/09 : vérifier l’horaire GMT du vol retour l’avant-veille et la veille. Prise en charge 06:20 inchangée. Farid.', ['Horaire relevé et noté en note terrain']),\n  // J4 — dimanche 20/09\n");
R(/  \/\/ J5 — lundi 21\/09\n/, "  S('s0920-hv', '2026-09-20', '21:00', '21:15', 'Pointer HV6534 sur Flightradar24 — dernière vérification', 'La Kasbah By Beldi', '', 'orga', 'critique', 'Horaire du décollage (nouvelle heure) à confirmer au groupe et aux chauffeurs. Prise en charge 06:20, chauffeurs 05:45.', ['Horaire relevé', 'Najib prévenu de l’heure exacte', 'Groupe informé du réveil']),\n  // J5 — lundi 21/09\n");

// Équipe : affectations du jour et du dimanche
R(/  affectations: \[\n    \{ sequenceId: 's0917-rak', owner: 'Mehdi', role: 'accueil aéroport \(MRCO 2 pax\)' \},\n    \{ sequenceId: 's0917-rak', owner: 'Eva', role: 'accueil aéroport \(MRCO 2 pax\)' \},/, `  affectations: [
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
    { sequenceId: 's0920-luggage', owner: 'Farid', role: 'à bord du véhicule bagages Agafay → Kasbah' },
    { sequenceId: 's0919-hv', owner: 'Farid', role: 'pointage HV6534' },
    { sequenceId: 's0920-hv', owner: 'Farid', role: 'pointage HV6534' },`);
R(/    \{ sequenceId: 's0917-rak', label: 'Accueil aéroport 17\/09 13:35' \},/, "    { sequenceId: 's0917-setup-beldi', label: 'Mise en place Beldi 17/09 13:15' },\n    { sequenceId: 's0917-rak', label: 'Accueil aéroport 17/09 13:35' },");

// Points en attente
R(/  \{ id: 'pd02',[^\n]*\n/, '');
R(/  \{ id: 'pd06',[^\n]*\n/, '');
R(/  \{ id: 'pd08',[^\n]*\n/, '');
R(/  \{ id: 'pd09',[^\n]*\n/, '');
R(/  \{ id: 'pd03',[^\n]*\n/, "  { id: 'pd03', sujet: 'J4 (20/09) : répartition proposée par MRCO — CAR 1 Tammo, Arjen, Pascal, Marcel · CAR 2 Sander, Erwin, Michaël, Adriana · CAR 3 Jos, Mischa, Wim, Nancy · CAR 4 Christiaan, Jasper, Hjalmar, Dennis · CAR 5 Otte, Roel, Romy — à valider puis transmettre à Najib / Ssi Brahim', responsable: 'Mehdi → Farid', echeance: '2026-09-19', level: 'alerte' },\n");
R(/  \{ id: 'pd04',[^\n]*\n/, "  { id: 'pd04', sujet: 'Véhicule bagages J4 : type et capacité à confirmer par Najib (Farid à bord)', responsable: 'Farid → Najib', echeance: '2026-09-18', level: 'normal' },\n");
R(/  \{ id: 'pd05',[^\n]*\n/, "  { id: 'pd05', sujet: 'Ssi Brahim : numéro à obtenir via Najib ; configuration du convoi J3 (assistance, place de MRCO) à caler avec lui', responsable: 'Farid', echeance: '2026-09-18', level: 'alerte' },\n");
R(/  \{ id: 'pd10',[^\n]*\n/, "  { id: 'pd10', sujet: 'Téléphones manquants : Comptoir Darna, Relais du Lac, Yes We Camp Agafay (Petanque et Kasbah trouvés le 17/09)', responsable: 'Eva', echeance: '2026-09-18', level: 'normal' },\n");
R(/  \{ id: 'pd12',[^\n]*\n/, "  { id: 'pd12', sujet: 'HV6534 lundi : Flightradar24 affiche 10:55 (nouvelle heure), documents 09:55 — pointer le vol dans l’app le 19 et le 20 au soir, informer Najib et le groupe de l’heure retenue', responsable: 'Farid', echeance: '2026-09-20', level: 'alerte' },\n");

fs.writeFileSync(f, s);
console.log('upd 17/09 ok');
