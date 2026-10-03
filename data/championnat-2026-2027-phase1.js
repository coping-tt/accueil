/* Championnat par équipes 2026-2027, phase 1.
   Sources : PDF des poules sur comiteoisett.fr (l'équipe à gauche de « contre » reçoit) ;
   CO PING 1 (Régionale 4, poule 24) : poules régionales de la Ligue (liguehdftt.fr).
   lieu : domicile ou exterieur. À l'extérieur, club = numéro FFTT de l'adversaire (salle dans clubs.js). */
var COPING_CALENDRIER = window.COPING_CALENDRIER || {};
COPING_CALENDRIER['championnat-2026-2027-phase1'] = [
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '1', date: '2026-09-20', lieu: 'exterieur', adversaire: 'Venizel TT 7', club: '07020031' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '2', date: '2026-10-04', lieu: 'domicile', adversaire: 'Beauval TT 1' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '3', date: '2026-10-18', lieu: 'domicile', adversaire: 'Choisy au Bac CTT 1' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '4', date: '2026-11-08', lieu: 'exterieur', adversaire: 'Brenouille ATT 1', club: '07600126' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '5', date: '2026-11-22', lieu: 'domicile', adversaire: 'Courmelles Crouy ETT 1' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '6', date: '2026-12-06', lieu: 'exterieur', adversaire: 'St Max-St Leu TT 1', club: '07600046' },
  { equipe: 'CO PING 1', division: 'Régionale 4', poule: '24', journee: '7', date: '2026-12-13', lieu: 'domicile', adversaire: 'Beauvais TT 4' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '1', date: '2026-09-20', lieu: 'exterieur', adversaire: 'Longueil TT 5', club: '07600088' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '2', date: '2026-10-04', lieu: 'domicile', adversaire: 'Haut Tillois TT 2' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '3', date: '2026-10-18', lieu: 'domicile', adversaire: 'Clermont EP 4' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '4', date: '2026-11-08', lieu: 'exterieur', adversaire: 'Goincourt TT 1', club: '07600017' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '5', date: '2026-11-22', lieu: 'domicile', adversaire: 'Breteuil WG TT 4' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '6', date: '2026-12-06', lieu: 'exterieur', adversaire: 'Pays Compiégnois TT 7', club: '07600004' },
  { equipe: 'CO PING 2', division: 'D1 Oise', poule: '4', journee: '7', date: '2026-12-13', lieu: 'domicile', adversaire: 'Beauvais TT 6' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '1', date: '2026-09-19', lieu: 'exterieur', adversaire: 'Cauffry TT 8', club: '07600171' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '2', date: '2026-10-03', lieu: 'domicile', adversaire: 'Breteuil WG TT 9' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '3', date: '2026-10-17', lieu: 'exterieur', adversaire: 'Angy-Bury TT 1', club: '07600005' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '4', date: '2026-11-07', lieu: 'domicile', adversaire: 'Villers St Paul 5' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '5', date: '2026-11-21', lieu: 'exterieur', adversaire: 'Agnetz ASTT 1', club: '07600112' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '6', date: '2026-12-05', lieu: 'exterieur', adversaire: 'Hénonville CO 2', club: '07600166' },
  { equipe: 'CO PING 3', division: 'D3 Oise', poule: '4', journee: '7', date: '2026-12-12', lieu: 'domicile', adversaire: 'Andeville PPC 2' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '1', date: '2026-09-19', lieu: 'domicile', adversaire: 'E. St Max-St Leu 7' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '2', date: '2026-10-03', lieu: 'exterieur', adversaire: 'Choisy Bac CTT 4', club: '07600039' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '3', date: '2026-10-17', lieu: 'domicile', adversaire: 'EPEV LTLJ 6' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '4', date: '2026-11-07', lieu: 'exterieur', adversaire: 'Longueil TT 10', club: '07600088' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '5', date: '2026-11-21', lieu: 'domicile', adversaire: 'Boran MPT 1' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '6', date: '2026-12-05', lieu: 'exterieur', adversaire: 'Cauffry TT 9', club: '07600171' },
  { equipe: 'CO PING 4', division: 'D4 Oise', poule: '7', journee: '7', date: '2026-12-12', lieu: 'domicile', adversaire: 'Saintines ATT 5' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '1', date: '2026-09-19', lieu: 'domicile', adversaire: 'Pays Compiégnois TT 12' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '2', date: '2026-10-03', lieu: 'exterieur', adversaire: 'Crépy en Valois US 5', club: '07600027' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '3', date: '2026-10-17', lieu: 'domicile', adversaire: 'Gouvieux/Lamorlaye 6' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '4', date: '2026-11-07', lieu: 'exterieur', adversaire: 'Les Ageux FR 5', club: '07600008' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '5', date: '2026-11-21', lieu: 'domicile', adversaire: 'Clermont EP 7' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '6', date: '2026-12-05', lieu: 'domicile', adversaire: 'Senlis-Chantilly TT' },
  { equipe: 'CO PING 5', division: 'D4 Oise', poule: '6', journee: '7', date: '2026-12-12', lieu: 'exterieur', adversaire: 'Noyon TT 3', club: '07600117' }
];
