// 18/09 soir (Mehdi) : briefing 4×4 à 08:45 (setup prêt 08:15) ; check-out dès 08:00 en descendant au petit-déjeuner, bagages laissés à la réception.
const fs = require('fs');
const f = __dirname + '/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const R = (re, b) => { if (!re.test(s)) throw new Error('introuvable : ' + re); s = s.replace(re, b); };
R(/const VERSION = 'V1\.11 — 18\/09\/2026';/, "const VERSION = 'V1.12 — 18/09/2026';");
R(/const UPDATED = '[^']*';/, "const UPDATED = '2026-09-18T19:00:00+01:00';");
R(/  S\('s0919-bagages',[^\n]*\n/, "  S('s0919-bagages', '2026-09-19', '08:00', '08:45', 'Check-out dès 08:00 + petit-déjeuner — bagages déposés à la RÉCEPTION', '2Ciels Boutique Hotel & Spa', '19', 'orga', 'critique', 'Consigne Mehdi du 18/09 : les clients font leur check-out à partir de 08:00 en descendant au petit-déjeuner et laissent leurs bagages à la réception. Les bagages partent ensuite vers Yes We Camp Agafay avec le transporteur du 2Ciels (hors Najib) et arrivent avant le groupe — heure d’enlèvement ⚠️ à confirmer avec l’hôtel. Compter et étiqueter. Briefing 4×4 à 08:45.', ['Consigne donnée au groupe la veille (check-out 08:00, bagages à la réception)', '12 chambres libérées, extras réglés', 'Bagages comptés (19) à la réception', 'Transporteur bagages parti vers Agafay'], ALL),\n");
R(/S\('s0919-brief4x4', '2026-09-19', '09:00', '09:30',/, "S('s0919-brief4x4', '2026-09-19', '08:45', '09:00',");
R(/avant le petit-déjeuner du groupe et le briefing technique de 09:00\./, 'avant le check-out du groupe (dès 08:00 au fil de l’eau) et le briefing technique de 08:45.');
R(/\(briefing technique 09:00, Ssi Brahim\)/, '(briefing technique 08:45, Ssi Brahim)');
R(/puisqu’elle sert au briefing\./, 'puisqu’elle sert au briefing de 08:45.');
R(/Check-in 17\/09 ~16:45 · check-out 19\/09 08:00, bagages hors chambres 08:30 \(transporteur 2Ciels → Agafay\)/, 'Check-in 17/09 ~16:45 · check-out 19/09 dès 08:00, bagages laissés à la réception (transporteur 2Ciels → Agafay) · briefing 4×4 08:45');
fs.writeFileSync(f, s);
console.log('ok');
