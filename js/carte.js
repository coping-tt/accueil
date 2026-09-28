/* ============================================
   CoPing - Carte des lieux (page Infos pratiques)
   Leaflet + tuiles OpenStreetMap, charges depuis
   unpkg. Sans Leaflet (hors ligne, JS coupe), le
   lien vers OpenStreetMap reste affiche.
   ============================================ */
(function () {
  'use strict';

  var conteneur = document.getElementById('carte-lieux');
  if (!conteneur || !window.L) return;

  var LIEUX = [
    {
      nom: 'École Henri Delaunay',
      role: 'Entraînements',
      adresse: '7 rue d’Aumale, 60560 Orry-la-Ville',
      classe: 'venue-entrainement',
      position: [49.13125, 2.51462]
    },
    {
      nom: 'Salle polyvalente',
      role: 'Compétitions',
      adresse: 'Rue des Fraisiers, 60560 Orry-la-Ville',
      classe: 'venue-competition',
      position: [49.13042, 2.51177]
    }
  ];

  conteneur.textContent = '';
  var carte = L.map(conteneur, { scrollWheelZoom: false });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carte);

  var bornes = [];
  LIEUX.forEach(function (lieu) {
    var icone = L.divIcon({
      className: 'map-pin ' + lieu.classe,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -12]
    });
    L.marker(lieu.position, { icon: icone, title: lieu.nom + ' — ' + lieu.role, alt: lieu.nom })
      .bindTooltip(lieu.role, { permanent: true, direction: 'top', offset: [0, -12], className: 'map-label ' + lieu.classe })
      .bindPopup('<strong>' + lieu.nom + '</strong><br>' + lieu.role + '<br>' + lieu.adresse)
      .addTo(carte);
    bornes.push(lieu.position);
  });

  carte.fitBounds(bornes, { padding: [70, 70], maxZoom: 17 });
})();
