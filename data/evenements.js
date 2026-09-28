/* Événements ponctuels : forum, tournois, stages, vie du club.
   Une ligne par événement. Champs facultatifs : fin, horaire, description, lieu, lien.
   type : evenement, tournoi, stage, equipes, jeunes ou individuel. */
var COPING_CALENDRIER = window.COPING_CALENDRIER || {};
COPING_CALENDRIER['evenements'] = [
  { date: '2026-09-05', horaire: '10h00 - 17h00', type: 'evenement', titre: 'Forum des associations', description: 'Retrouvez-nous au forum des associations de La Chapelle-en-Serval. Démonstrations et inscriptions sur place !', lieu: 'Salle des fêtes — La Chapelle-en-Serval' },
  { date: '2026-09-13', type: 'tournoi', titre: 'Tournoi départemental de Longueil-Sainte-Marie', lieu: 'Longueil-Sainte-Marie' }
];
