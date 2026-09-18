// 18/09 soir (Mehdi) : setup du briefing 4×4 prêt à 08:15 au 2Ciels — écran + projecteur + enceinte JBL (qui part ensuite au camp). Mouad + Farid. Rappel dès ce soir.
const fs = require('fs');
const f = 'C:/Users/mlahb/Documents/sightline-ops/tools/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const R = (re, b) => { if (!re.test(s)) throw new Error('introuvable : ' + re); s = s.replace(re, b); };
R(/const VERSION = 'V1\.10 — 17\/09\/2026';/, "const VERSION = 'V1.11 — 18/09/2026';");
R(/const UPDATED = '[^']*';/, "const UPDATED = '2026-09-18T18:35:00+01:00';");
// Rappel de ce soir + setup de demain matin
R(/  \/\/ J3 — samedi 19\/09\n/, `  S('s0918-rappel-brief', '2026-09-18', '19:15', '19:45', 'RAPPEL CE SOIR — Mouad + Farid : matériel du briefing 4×4 de demain (écran, projecteur, enceinte JBL)', '2Ciels Boutique Hotel & Spa', '', 'setup', 'critique', 'Demain samedi, le setup du briefing doit être PRÊT À 08:15 à l’hôtel (briefing technique 09:00, Ssi Brahim). À préparer dès ce soir : écran, projecteur avec ses câbles, enceinte JBL à mettre en charge cette nuit. L’enceinte JBL part ensuite au camp d’Agafay pour la soirée.', ['Écran localisé et disponible', 'Projecteur + câble HDMI + rallonge / multiprise rassemblés', 'Enceinte JBL mise en charge pour la nuit', 'Emplacement du briefing calé avec le 2Ciels', 'Support du briefing (ordinateur / fichier) prévu et testé']),
  // J3 — samedi 19/09
  S('s0919-setup-brief', '2026-09-19', '07:30', '08:15', 'Setup briefing 4×4 au 2Ciels — PRÊT À 08:15 (écran + projecteur + enceinte JBL) — Mouad + Farid', '2Ciels Boutique Hotel & Spa', '', 'setup', 'critique', 'Tout doit être installé et testé à 08:15, avant le petit-déjeuner du groupe et le briefing technique de 09:00. Après le briefing, l’enceinte JBL est embarquée pour Yes We Camp Agafay (soirée du camp) : désigner qui l’emporte, elle ne part pas avec les bagages de 08:30 puisqu’elle sert au briefing.', ['Écran installé', 'Projecteur branché, image testée', 'Enceinte JBL chargée, son testé', 'Tout prêt à 08:15', 'Après le briefing : enceinte JBL embarquée pour le camp', 'Écran et projecteur rangés / rendus']),
`);
// Briefing : mention du matériel
R(/'Rallye 4×4 SELF DRIVE — briefing technique \(Ssi Brahim\)', '2Ciels — départ convoi', '19', 'activite', 'critique', '/, "'Rallye 4×4 SELF DRIVE — briefing technique (Ssi Brahim)', '2Ciels — départ convoi', '19', 'activite', 'critique', 'Matériel installé par Mouad + Farid dès 08:15 (écran, projecteur, enceinte JBL). ");
// Soirée du camp : l’enceinte
R(/'Menu 6, 4 plats\. Open bar 3 h inclus/, "'Enceinte JBL MRCO sur place (apportée du 2Ciels après le briefing). Menu 6, 4 plats. Open bar 3 h inclus");
// Affectations + moment
R(/    \{ sequenceId: 's0919-hv', owner: 'Farid', role: 'pointage HV6534' \},/, `    { sequenceId: 's0918-rappel-brief', owner: 'Mouad', role: 'préparer ce soir le matériel du briefing 4×4' },
    { sequenceId: 's0918-rappel-brief', owner: 'Farid', role: 'préparer ce soir le matériel du briefing 4×4' },
    { sequenceId: 's0919-setup-brief', owner: 'Mouad', role: 'setup briefing prêt à 08:15 (écran, projecteur, JBL)' },
    { sequenceId: 's0919-setup-brief', owner: 'Farid', role: 'setup briefing prêt à 08:15 (écran, projecteur, JBL)' },
    { sequenceId: 's0919-hv', owner: 'Farid', role: 'pointage HV6534' },`);
R(/    \{ sequenceId: 's0919-brief4x4', label: 'Rallye 4×4 self drive 19\/09' \},/, "    { sequenceId: 's0919-setup-brief', label: 'Setup briefing 4×4 — prêt à 08:15 le 19/09' },\n    { sequenceId: 's0919-brief4x4', label: 'Rallye 4×4 self drive 19/09' },");
// Point en attente : thème de la soirée (message peu lisible)
R(/  \{ id: 'pd12',/, "  { id: 'pd13', sujet: 'Soirée du 19/09 au camp : Mehdi a écrit « soirée balance » (18/09) — thème à préciser (soirée blanche ? consigne vestimentaire à annoncer au groupe ?) ; qui emporte l’enceinte JBL au camp après le briefing', responsable: 'Mehdi', echeance: '2026-09-19', level: 'alerte' },\n  { id: 'pd12',");
fs.writeFileSync(f, s);
console.log('upd 18/09 soir ok');
