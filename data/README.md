# Données du calendrier

La page `pages/calendrier.html` affiche les événements décrits dans les fichiers `data/*.js`.
Ce sont de simples fichiers de données chargés par des balises `<script>` : le site reste
100 % statique et le calendrier fonctionne aussi en ouvrant la page depuis le disque,
sans serveur.

Chaque fichier remplit une liste, une ligne par événement :

```js
COPING_CALENDRIER['evenements'] = [
  { date: '2026-09-05', type: 'evenement', titre: 'Forum des associations' },
  { date: '2026-09-15', type: 'tournoi', titre: 'Tournoi de Longueil' }
];
```

Attention à la syntaxe : texte entre apostrophes `'…'`, une virgule entre deux lignes,
pas de virgule après la dernière. Une apostrophe dans le texte s'écrit `\'` (ou `’`).

## Ajouter un événement ponctuel

Ajouter une ligne dans `evenements.js` (l'ordre des lignes n'a pas d'importance) :

| champ         | obligatoire | exemple                                              |
|---------------|-------------|------------------------------------------------------|
| `date`        | oui         | `'2026-12-19'` (format AAAA-MM-JJ)                   |
| `type`        | oui         | `evenement`, `tournoi`, `stage`, `equipes`, `jeunes`, `individuel` |
| `titre`       | oui         | `'Tournoi de Noël'`                                  |
| `fin`         | non         | `'2026-12-20'` pour un événement sur plusieurs jours |
| `horaire`     | non         | `'14h00 - 18h00'`                                    |
| `description` | non         | texte libre                                          |
| `lieu`        | non         | `'Salle du club'`                                    |
| `lien`        | non         | URL affichée en bouton « En savoir plus »            |

Exemple :

```js
  { date: '2026-12-19', horaire: '14h00 - 18h00', type: 'tournoi', titre: 'Tournoi de Noël',
    description: 'Tournoi interne, ouvert à tous les adhérents.', lieu: 'Salle du club' }
```

## Horaires des rencontres par équipes

L'heure est déduite de la division (`heureRencontre` dans `js/calendrier.js`) : Régionale 4
le dimanche 14h30, D1-D2 le dimanche 9h00, D3-D4 le samedi 19h00, sauf nos équipes qui
reçoivent à 18h00. Pour une rencontre décalée ou un adversaire qui reçoit à une autre heure
(mention « reçoit à … » dans les PDF des poules), ajouter `horaire: '17h00'` sur la ligne.

## Liens vers les pages officielles

Chaque compétition a un bouton vers sa page sur le site du comité ou de la Ligue (tableau
`PAGES` de `js/calendrier.js`). Pour pointer une ligne vers une autre page (convocation,
résultats…), ajouter `lien: 'https://…'` sur cette ligne.

## Salles des clubs adverses

`clubs.js` associe chaque numéro FFTT de club à sa salle. Dans le championnat par équipes,
chaque match à l'extérieur porte le numéro du club adverse (`club: '07600039'`) : la fiche
affiche alors la salle et un bouton « Itinéraire ». Les numéros figurent dans les PDF des
poules, entre parenthèses après le nom de l'équipe ; la salle se trouve sur la fiche du club
(par exemple <https://winpongmag.com/tennis-de-table>, qui reprend la salle déclarée à la FFTT).
Un club manquant dans `clubs.js` est signalé dans la console.

## Ajouter un nouveau fichier de compétitions

Pour une nouvelle phase ou une nouvelle compétition, avec ses propres champs :

1. créer `data/<nom>.js` sur le modèle des fichiers existants (première ligne
   `var COPING_CALENDRIER = window.COPING_CALENDRIER || {};`, puis
   `COPING_CALENDRIER['<nom>'] = [ … ];`, dates au format AAAA-MM-JJ dans `date`) ;
2. l'inclure dans `pages/calendrier.html` avec une balise `<script>`, avant `js/calendrier.js` ;
3. le déclarer dans le tableau `SOURCES` de `js/calendrier.js`, avec une fonction `ligne`
   qui dit comment transformer une ligne en événement (voir les exemples déjà présents).

Pour ajouter un nouveau **type** : l'ajouter dans `TYPES` (`js/calendrier.js`) et lui donner
ses couleurs `.tag-<type>` dans `css/style.css`.

En cas d'erreur (date mal écrite, type inconnu, fichier oublié), un message apparaît dans la
console du navigateur (F12). Une faute de syntaxe dans un fichier fait disparaître tous ses
événements : la console indique la ligne fautive.

## Sources

- Championnat par équipes : PDF des poules sur
  <https://comiteoisett.fr/index.php/championnat-par-equipes/> (l'équipe écrite à gauche
  de « contre » reçoit).
