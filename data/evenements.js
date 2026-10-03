/* Événements ponctuels : forum, tournois, stages, vie du club.
   Une ligne par événement. Champs facultatifs : court (étiquette dans la grille), fin, horaire, description, lieu, adresse
   (ajoute un bouton « Itinéraire »), lien (page de l'événement).
   type : evenement, tournoi, stage, equipes, jeunes ou individuel. */
var COPING_CALENDRIER = window.COPING_CALENDRIER || {};
COPING_CALENDRIER['evenements'] = [
  { date: '2026-09-05', horaire: '10h00 - 17h00', type: 'evenement', titre: 'Forum des associations', description: 'Retrouvez-nous au forum des associations de La Chapelle-en-Serval. Démonstrations et inscriptions sur place !', lieu: 'Salle des fêtes — La Chapelle-en-Serval' },
  { date: '2026-09-13', type: 'tournoi', titre: 'Tournoi départemental de Longueil-Sainte-Marie', lieu: 'Longueil-Sainte-Marie' },
  { date: '2026-10-20', fin: '2026-10-22', horaire: '9h00 - 17h00', type: 'stage', titre: 'Stage départemental jeunes de la Toussaint', court: 'Stage Toussaint', description: 'Stage de perfectionnement du comité de l’Oise, sur sélection : poussins, benjamins, minimes et cadets. Prévoir l’équipement sportif et le repas du midi (goûter fourni). 60 € pour les 3 jours.', lieu: 'Hall des Sports', adresse: '25 rue du Général Leclercq, 60120 Breteuil', lien: 'https://comiteoisett.fr/index.php/stage-jeunes/', lienTexte: 'Page du stage' }
];
