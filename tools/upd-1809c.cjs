// 18/09 soir (Mehdi) : la soirée du 19/09 au camp est une SOIRÉE BLANCHE — convives habillés en blanc.
const fs = require('fs');
const f = __dirname + '/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const R = (re, b) => { if (!re.test(s)) throw new Error('introuvable : ' + re); s = s.replace(re, b); };
R(/const VERSION = 'V1\.12 — 18\/09\/2026';/, "const VERSION = 'V1.13 — 18/09/2026';");
R(/const UPDATED = '[^']*';/, "const UPDATED = '2026-09-18T19:20:00+01:00';");
R(/'Dîner du désert \+ soirée \(tamtam, cracheur de feu, DJ\)'/, "'SOIRÉE BLANCHE — dîner du désert + soirée (tamtam, cracheur de feu, DJ)'");
R(/'Enceinte JBL MRCO sur place \(apportée du 2Ciels après le briefing\)\. Menu 6, 4 plats\./, "'SOIRÉE BLANCHE : les convives sont habillés en blanc (Mehdi, 18/09). Enceinte JBL MRCO sur place (apportée du 2Ciels après le briefing). Menu 6, 4 plats.");
R(/\['Chef briefé : 18 couverts \+ régimes', 'Fin de l.{1,2}open bar annoncée \(3 h\)'\]/, "['Chef briefé : 18 couverts + régimes', 'Tenue blanche rappelée au groupe à l’arrivée au camp (17:00)', 'Fin de l’open bar annoncée (3 h)']");
R(/Piscine et coucher de soleil 17:30–19:30\./, 'Piscine et coucher de soleil 17:30–19:30. Rappeler la SOIRÉE BLANCHE de 20:00 : tenue blanche.');
R(/'Consigne donnée au groupe la veille \(check-out 08:00, bagages à la réception\)'/, "'Consigne donnée au groupe la veille (check-out 08:00, bagages à la réception, tenue BLANCHE dans la valise pour la soirée du camp)'");
R(/'19\/09 20:00 dîner 4 plats \+ soirée \(tamtam, cracheur de feu, DJ\), open bar 3 h — menu 6, chevalets 6'/, "'19/09 20:00 SOIRÉE BLANCHE (convives en blanc) : dîner 4 plats + soirée (tamtam, cracheur de feu, DJ), open bar 3 h — menu 6, chevalets 6'");
R(/  \{ id: 'pd13',[^\n]*\n/, "  { id: 'pd13', sujet: 'Enceinte JBL : qui l’emporte au camp après le briefing de 08:45, et dans quel véhicule ; le groupe a-t-il bien été prévenu de la tenue blanche pour la soirée du 19/09 ?', responsable: 'Mehdi', echeance: '2026-09-19', level: 'alerte' },\n");
fs.writeFileSync(f, s);
console.log('ok');
