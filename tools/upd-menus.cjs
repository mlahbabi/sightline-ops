// Transcription des 7 menus du pack imprimeur (16/09) → remplace le bloc menus du générateur.
const fs = require('fs');
const f = __dirname + '/gen-data.cjs';
let s = fs.readFileSync(f, 'utf8');
const start = s.indexOf('const menus = {');
const end = s.indexOf('// ---------- Contacts ----------');
if (start < 0 || end < 0) throw new Error('bloc menus introuvable');
const VIG = 'Vigilance : Wim (noix / arachides, EpiPen — aucune trace), Erwin / Michaël / Roel (pas de poisson), Marcel / Wim (pas de fruits de mer), Otte / Adriana (sans gluten), Hjalmar (pas de fromage), Mischa (pas de coriandre ni champignons), Roel (ni poisson ni viande).';
const block = `const menus = { version: VERSION, updatedAt: UPDATED, items: [
  { id: 'm1', date: '2026-09-17', sequence: 'Déjeuner J1', lieu: 'Beldi Country Club', menu: 'Menu 2 (pack) — « Chef’s selection » : le menu du jour est sur l’ardoise. 3 plats dans les jardins. ' + ${JSON.stringify(VIG)}, boissons: 'Thé à la menthe et pâtisseries à l’arrivée (⚠️ amandes / fruits secs pour Wim). Boissons réglées par le groupe.' },
  { id: 'm2', date: '2026-09-17', sequence: 'Dîner J1', lieu: 'Petanque Social Club', menu: 'Menu 1 (pack) — Entrées partagées : pizza Margherita burrata, basilic & huile d’olive · baba ganoush · salade de chèvre aux NOIX grillées et poires ⚠️ · tartare d’avocat huile d’olive & herbes · salade mixte vinaigrette · brocoli grillé, chutney de chou blanc & sauce miso. Plats partagés : demi-poulet rôti, haricots blancs, tomates rôties & jus · poulpe grillé, ragoût de pois chiches, aïoli & bitter greens (fruits de mer ⚠️) · pommes de terre rôties. Desserts partagés : gâteau au chocolat glace vanille · banoffee pie. ' + ${JSON.stringify(VIG)}, boissons: 'Cocktail « 30th Anniversary » 20:45 · boissons réglées par le groupe' },
  { id: 'm3', date: '2026-09-18', sequence: 'Déjeuner J2', lieu: 'Le Grand Bazar', menu: 'Menu 3 (pack) — Entrée : assortiment de légumes grillés. Plat : tajine de poulet mijoté aux épices marocaines, couscous ou salade verte (sans gluten = salade). Dessert : mahalabi, crème de lait glacée aux arômes floraux. ' + ${JSON.stringify(VIG)}, boissons: 'Boissons réglées par le groupe' },
  { id: 'm4', date: '2026-09-18', sequence: 'Dîner J2', lieu: 'Le Comptoir Darna', menu: 'Menu 4 (pack) — Entrées partagées : assortiment de briouates (gluten, garnitures ⚠️) · 7 salades marocaines. Plats partagés : tajine de poulet aux olives & citron confit · tajine de kefta marrakchie. Desserts partagés : salade d’oranges et dattes à la cannelle · pastilla au lait d’AMANDE à la fleur d’oranger ⚠️ (Wim : aucune trace). Spectacle musiciens et danseurs. ' + ${JSON.stringify(VIG)}, boissons: 'Boissons réglées par le groupe' },
  { id: 'm5', date: '2026-09-19', sequence: 'Déjeuner J3', lieu: 'Le Relais du Lac', menu: 'Menu 5 (pack) — Entrée : salade de saison. Plat : mixed grill, frites & légumes grillés (Roel : option végétarienne à demander). Dessert : fondant au chocolat. ' + ${JSON.stringify(VIG)}, boissons: 'Boissons réglées par le groupe' },
  { id: 'm6', date: '2026-09-19', sequence: 'Dîner J3', lieu: 'Yes We Camp Agafay', menu: 'Menu 6 (pack) — Entrée partagée : assortiment de salades marocaines. Plats partagés : tangia de bœuf traditionnelle (poitrine braisée en jarre) · tajine de légumes façon tian. Dessert : fruits de saison frais. Soirée tamtam, cracheur de feu, DJ. ' + ${JSON.stringify(VIG)}, boissons: 'Forfait boissons + open bar 3 h (vin, bière, whisky, gin, vodka, softs) ; cocktails et spiritueux deluxe en supplément réglé par le groupe' },
  { id: 'm7', date: '2026-09-20', sequence: 'Déjeuner J4', lieu: 'Imlil / Sidi Fares — chez Adil', menu: 'Déjeuner berbère en montagne (pas de menu imprimé). ' + ${JSON.stringify(VIG)}, boissons: 'Softs inclus' },
  { id: 'm8', date: '2026-09-20', sequence: 'Dîner J4', lieu: 'Kasbah Talet by Beldi', menu: 'Menu 7 (pack) — Entrée : croustillant d’avocat. Plat : souris d’agneau confite. Dessert : dessert du moment du chef + pâtisseries marocaines (⚠️ amandes). 18 couverts : Wim ne dîne pas (repas personnel), 2 repas staff MRCO à part. ' + ${JSON.stringify(VIG)}, boissons: 'Boissons réglées par le groupe' },
] };

`;
s = s.slice(0, start) + block + s.slice(end);
s = s.replace("{ id: 'pd11', sujet: 'Menus 1 à 7 : transcrire le contenu des PDF du pack dans l\\'app (Plus → Menus)', responsable: 'Mehdi (app)', echeance: '2026-09-17', level: 'normal' },\n", '');
s = s.replace("const VERSION = 'V1.0 — 16/09/2026';", "const VERSION = 'V1.1 — 16/09/2026';");
fs.writeFileSync(f, s);
console.log('menus ok');
