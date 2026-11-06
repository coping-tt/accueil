/* Championnat jeunes 2026-2027, phase 1 : le samedi de 10h00 à 13h00, pointage à 9h30
   (règlement du comité). Champ facultatif horaire pour une journée différente.
   Chaque journée se joue en plateau dans une salle désignée par le comité : salle et adresse
   sur la ligne, ou club = numéro FFTT du club qui reçoit (salle dans clubs.js).
   Source : PDF des poules sur comiteoisett.fr (J1 : version 2 du 02/11/2026). */
var COPING_CALENDRIER = window.COPING_CALENDRIER || {};
COPING_CALENDRIER['championnat-jeunes-phase1'] = [
  { equipe: 'Co Ping 1', division: 'Division 1', poule: 'C', journee: '1', date: '2026-11-07',
    adversaires: 'St Max St Leu Villers 1, Villers St Paul TT 1, EPEV LTLJ TT 1',
    salle: 'Gymnase des Coteaux', adresse: '11 allée Georges Bizet, 60180 Nogent-sur-Oise',
    lien: 'https://comiteoisett.fr/wp-content/uploads/2026/11/2026-10-championnat-jeunes-J1-Poules-au-02-11-2026.pdf' },
  { equipe: 'Co Ping 2', division: 'Division 1', poule: 'B', journee: '1', date: '2026-11-07',
    adversaires: 'Cauffry TT 1, La Raquette Chaumontoise 1, Breteuil WG TT 1',
    club: '07600171',
    lien: 'https://comiteoisett.fr/wp-content/uploads/2026/11/2026-10-championnat-jeunes-J1-Poules-au-02-11-2026.pdf' },
  { equipe: 'Co Ping 3', division: 'Division 2', poule: 'A', journee: '1', date: '2026-11-07',
    adversaires: 'Clermont EP 1, Ully St Georges FR 1, Sérifontaine TT 2',
    salle: 'Salle multifonctions', adresse: '27 rue de Noailles, 60730 Ully-Saint-Georges',
    lien: 'https://comiteoisett.fr/wp-content/uploads/2026/11/2026-10-championnat-jeunes-J1-Poules-au-02-11-2026.pdf' }
];
