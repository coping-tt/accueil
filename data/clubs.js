/* Salles des clubs adverses, par numéro FFTT : le champ `club` des matchs à l'extérieur
   renvoie ici, et la fiche du calendrier affiche la salle et un lien d'itinéraire.
   Sources : salle déclarée à la FFTT (winpongmag.com, relevé du 29/09/2026), recoupée le
   03/10/2026 avec l'annuaire tennis-de-table.com et les sites des clubs ou des mairies ;
   en cas de désaccord, la source la plus officielle l'emporte (club, mairie).
   Numéros FFTT : PDF des poules du comité de l'Oise. */
var COPING_CLUBS = {
  '07600112': { nom: 'Agnetz ASTT', salle: 'Gymnase du Parc', adresse: 'Rue Gaston Paucellier, 60600 Agnetz' },
  '07600005': { nom: 'Angy-Bury TT', salle: 'Salle multifonctions', adresse: 'Place Henri Barbusse, 60250 Angy' },
  '07600126': { nom: 'Brenouille ATT', salle: 'Salle des associations', adresse: '16 rue Robert Guerlin, 60870 Brenouille' },
  '07600171': { nom: 'Cauffry TT', salle: 'Espace Loisirs et Culture', adresse: '15 rue des Marronniers, 60290 Cauffry' },
  '07600039': { nom: 'Choisy-au-Bac CTT', salle: 'Complexe sportif et culturel André Mahé', adresse: 'Chemin du Maubon, 60750 Choisy-au-Bac' },
  '07600027': { nom: 'Crépy-en-Valois US', salle: 'Salle Bernard Kindraich', adresse: 'Rue Hector Berlioz, 60800 Crépy-en-Valois' },
  '07600017': { nom: 'Goincourt TT', salle: 'Salle polyvalente', adresse: 'Rue Jean Jaurès, place Albert Cassarin-Grand, 60000 Goincourt' },
  '07600166': { nom: 'Hénonville CO', salle: 'Complexe sportif', adresse: 'Route de Villeneuve, 60119 Hénonville' },
  '07600008': { nom: 'Les Ageux FR', salle: 'Salle Jean Le Vourch', adresse: 'Rue Louis Drouart, 60700 Les Ageux' },
  '07600088': { nom: 'Longueil TT', salle: 'Salle multifonctions du complexe sportif', adresse: '13 bis rue de la Gare, 60126 Longueil-Sainte-Marie' },
  '07600117': { nom: 'Noyon TT', salle: 'Gymnase Jean Bouin (près de la piscine)', adresse: 'Avenue Jean Bouin, 60400 Noyon' },
  '07600004': { nom: 'Pays Compiégnois TT', salle: 'Complexe Ferdinand Bac, salle Albert Magnier', adresse: 'Rue Othenin, 60200 Compiègne' },
  '07600046': { nom: 'E. St Max-St Leu', salle: 'Salle P. Grousset', adresse: 'Avenue de la Commune de Paris, 60340 Saint-Leu-d’Esserent' },
  '07020031': { nom: 'Venizel TT', salle: 'Salle de tennis de table', adresse: 'Rue de l’Oiselet, 02200 Venizel' }
};
