/* ============================================
   CoPing - Calendrier
   Les donnees sont dans data/*.js, charges par des
   balises <script> avant ce fichier : le calendrier
   marche aussi en ouvrant la page depuis le disque.
   Chaque fichier est declare dans SOURCES avec la
   facon de transformer une ligne en evenement.
   Mode d'emploi : data/README.md.
   ============================================ */
(function () {
  'use strict';

  var root = document.getElementById('calendrier');
  if (!root) return;

  var DONNEES = window.COPING_CALENDRIER || {};
  var CLUBS = window.COPING_CLUBS || {}; // salles des adversaires, data/clubs.js
  var SALLE = 'Salle polyvalente, rue des Fraisiers — Orry-la-Ville';
  var PLAN = 'infos.html#lieux';

  // Heure des rencontres par equipes, sauf `horaire` precise sur la ligne :
  // Regionale 4 (Oise) le dimanche 14h30 ; D1-D2 le dimanche 9h00 ; D3-D4 le samedi 19h00,
  // sauf nos equipes qui recoivent a 18h00 (reglements Ligue HDF et comite de l'Oise).
  function heureRencontre(r, dom) {
    if (r.horaire) return r.horaire;
    if (/^Régionale/.test(r.division)) return '14h30';
    if (/^D[12] /.test(r.division)) return '9h00';
    if (/^D[34] /.test(r.division)) return dom ? '18h00' : '19h00';
    return '';
  }

  // Types d'evenements, dans l'ordre des filtres. Couleurs : .tag-<type> dans style.css.
  var TYPES = {
    equipes: 'Championnat par équipes',
    jeunes: 'Championnat jeunes',
    individuel: 'Compétition individuelle',
    tournoi: 'Tournoi',
    stage: 'Stage',
    evenement: 'Événement'
  };

  var SOURCES = [
    {
      cle: 'evenements',
      ligne: function (r) {
        return {
          date: r.date, fin: r.fin, type: r.type, titre: r.titre, court: r.court || r.titre,
          horaire: r.horaire, description: r.description,
          lieu: r.adresse ? (r.lieu ? r.lieu + ' — ' : '') + r.adresse : r.lieu,
          itineraire: r.adresse ? (r.lieu ? r.lieu + ', ' : '') + r.adresse : '',
          lien: r.lien, lienTexte: r.lienTexte
        };
      }
    },
    {
      cle: 'championnat-2026-2027-phase1',
      ligne: function (r) {
        var dom = r.lieu === 'domicile';
        var club = dom ? null : CLUBS[r.club];
        if (!dom && !club) console.warn('Calendrier : salle inconnue pour ' + r.adversaire + ' (club « ' + r.club + ' », voir data/clubs.js)');
        return {
          date: r.date, type: 'equipes', horaire: heureRencontre(r, dom),
          titre: r.equipe + ' contre ' + r.adversaire,
          court: r.equipe + (dom ? ' · dom.' : ' · ext.'),
          precision: dom ? 'domicile' : 'extérieur',
          details: [
            ['Rencontre', dom ? 'À domicile' : 'À l’extérieur'],
            ['Division', r.division + ', poule ' + r.poule],
            ['Journée', r.journee + ' — phase 1']
          ],
          lieu: dom ? SALLE : club ? club.salle + ' — ' + club.adresse : '',
          itineraire: club ? club.adresse : '',
          lien: dom ? PLAN : '', lienTexte: 'Voir sur la carte'
        };
      }
    },
    {
      cle: 'championnat-jeunes-phase1',
      ligne: function (r) {
        return {
          date: r.date, type: 'jeunes', horaire: r.horaire || '10h00 - 13h00',
          titre: 'Championnat jeunes — journée ' + r.journee,
          court: 'Jeunes · ' + r.equipe,
          details: [['Équipe', r.equipe], ['Journée', r.journee + ' — phase 1']]
        };
      }
    },
    {
      cle: 'criterium-federal',
      ligne: function (r) {
        var details = [['Tour', r.phase]];
        if (r.echelon) details.push(['Échelon', r.echelon]);
        if (r.tableau) details.push(['Tableau', r.tableau]);
        return {
          date: r.date, type: 'individuel',
          titre: 'Critérium fédéral — tour ' + r.phase + (r.tableau ? ' · ' + r.tableau : ''),
          court: r.court || 'Critérium · tour ' + r.phase,
          precision: r.echelon ? r.echelon.toLowerCase() : '',
          horaire: r.horaire, description: r.description, details: details,
          lieu: r.salle ? r.salle + ' — ' + r.adresse : r.lieu,
          itineraire: r.adresse
        };
      }
    },
    {
      cle: 'groupe-detection',
      ligne: function (r) {
        return {
          date: r.date, type: 'stage',
          titre: 'Groupe détection du comité', court: 'Groupe détection',
          horaire: r.horaire || '14h00 - 16h30 (rendez-vous 13h45)',
          description: 'Séance mensuelle du comité de l’Oise pour les jeunes sélectionnés.',
          details: [['Public', 'Poussins et benjamins, sur sélection']],
          lieu: 'Gymnase des Coteaux — 11 allée Georges Bizet, 60180 Nogent-sur-Oise',
          itineraire: 'Gymnase des Coteaux, 11 allée Georges Bizet, 60180 Nogent-sur-Oise'
        };
      }
    },
    {
      cle: 'championnat-500pts',
      ligne: function (r) {
        return {
          date: r.date, type: 'individuel',
          titre: 'Compétition des 500 points', court: '500 points', horaire: r.horaire,
          details: r.tableaux ? [['Tableaux', r.tableaux]] : [],
          lieu: r.salle ? r.salle + ' — ' + r.adresse : r.lieu,
          itineraire: r.adresse ? r.salle + ', ' + r.adresse : ''
        };
      }
    }
  ];

  function urlItineraire(adresse) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(adresse);
  }

  var MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  var JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  function lireDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    return m ? new Date(+m[1], m[2] - 1, +m[3]) : null;
  }

  function cle(d) {
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  function formatJour(d, annee) {
    var opts = { weekday: 'long', day: 'numeric', month: 'long' };
    if (annee) opts.year = 'numeric';
    return d.toLocaleDateString('fr-FR', opts);
  }

  function formatPeriode(e) {
    if (cle(e.debut) === cle(e.fin)) return formatJour(e.debut, true);
    return 'du ' + formatJour(e.debut, false) + ' au ' + formatJour(e.fin, true);
  }

  function el(tag, classe, texte) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texte) n.textContent = texte;
    return n;
  }

  // --- Etat ---
  var evenements = [];
  var actifs = {};
  var aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);
  var vue = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 1);

  var titre = root.querySelector('.cal-title');
  var grille = root.querySelector('.cal-grid');
  var agenda = root.querySelector('.cal-agenda');
  var filtres = root.querySelector('.cal-filters');
  var message = root.querySelector('.cal-message');
  var dialog = document.querySelector('.cal-dialog');
  // Meme seuil que le @media de style.css ou la grille passe en pastilles
  var petit = window.matchMedia('(max-width: 768px)');
  var mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)');

  function normaliser(e, fichier) {
    e.debut = lireDate(e.date);
    if (!e.debut) {
      console.warn('Calendrier : date illisible dans ' + fichier, e);
      return null;
    }
    e.fin = lireDate(e.fin) || e.debut;
    if (!TYPES[e.type]) {
      console.warn('Calendrier : type inconnu « ' + e.type + ' » dans ' + fichier);
      e.type = 'evenement';
    }
    return e;
  }

  function visibles() {
    return evenements.filter(function (e) { return actifs[e.type]; });
  }

  // --- Rendu ---
  function rendreFiltres() {
    Object.keys(TYPES).forEach(function (t) {
      if (!evenements.some(function (e) { return e.type === t; })) return;
      actifs[t] = true;
      var b = el('button', 'cal-filter tag-' + t, TYPES[t]);
      b.type = 'button';
      b.setAttribute('aria-pressed', 'true');
      b.addEventListener('click', function () {
        actifs[t] = !actifs[t];
        b.setAttribute('aria-pressed', String(actifs[t]));
        rendreMois();
      });
      filtres.appendChild(b);
    });
  }

  function bouton(e, classe, texte) {
    var b = el('button', classe + ' tag-' + e.type, texte);
    b.type = 'button';
    b.addEventListener('click', function () { ouvrir(e, b); });
    return b;
  }

  function rendreMois() {
    var annee = vue.getFullYear(), mois = vue.getMonth();
    titre.textContent = MOIS[mois] + ' ' + annee;
    grille.textContent = '';
    agenda.textContent = '';

    JOURS.forEach(function (j) { grille.appendChild(el('div', 'cal-wd', j)); });

    var premier = new Date(annee, mois, 1);
    var nbJours = new Date(annee, mois + 1, 0).getDate();
    var decalage = (premier.getDay() + 6) % 7;
    var liste = visibles();
    var duMois = [];
    var sauts = [];

    for (var i = 0; i < decalage; i++) grille.appendChild(el('div', 'cal-day is-out'));

    for (var d = 1; d <= nbJours; d++) {
      var jour = new Date(annee, mois, d);
      var k = cle(jour);
      var cellule = el('div', 'cal-day');
      if (k === cle(aujourdHui)) cellule.classList.add('is-today');
      else if (jour < aujourdHui) cellule.classList.add('is-past');
      if (jour.getDay() === 0 || jour.getDay() === 6) cellule.classList.add('is-weekend');
      var num = el('span', 'cal-num', String(d));
      cellule.appendChild(num);

      var ul = el('ul', 'cal-events');
      var premierDuJour = null;
      liste.forEach(function (e) {
        if (cle(e.debut) > k || cle(e.fin) < k) return;
        if (!premierDuJour) premierDuJour = e;
        var li = el('li');
        var b = bouton(e, 'cal-chip', e.court || e.titre);
        b.title = e.titre;
        li.appendChild(b);
        ul.appendChild(li);
        if (duMois.indexOf(e) < 0) duMois.push(e);
      });
      if (ul.children.length) cellule.appendChild(ul);
      if (premierDuJour) sauts.push({ cellule: cellule, num: num, jour: jour, e: premierDuJour });
      grille.appendChild(cellule);
    }

    var reste = (7 - (decalage + nbJours) % 7) % 7;
    for (var j = 0; j < reste; j++) grille.appendChild(el('div', 'cal-day is-out'));

    // Agenda du mois : sert de vue principale sur mobile
    var cibles = [];
    duMois.forEach(function (e) {
      var li = el('li');
      var b = bouton(e, 'cal-agenda-item', '');
      var jourAff = cle(e.debut) === cle(e.fin)
        ? e.debut.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })
        : e.debut.getDate() + '–' + e.fin.getDate();
      b.appendChild(el('span', 'cal-agenda-date', jourAff));
      var corps = el('span', 'cal-agenda-body');
      corps.appendChild(el('span', 'cal-agenda-type', TYPES[e.type] + (e.precision ? ' · ' + e.precision : '')));
      corps.appendChild(el('span', 'cal-agenda-title', e.titre));
      b.appendChild(corps);
      li.appendChild(b);
      agenda.appendChild(li);
      cibles.push(b);
    });

    // Sur mobile, toucher une date fait defiler l'agenda jusqu'a son premier evenement
    sauts.forEach(function (saut) {
      var cible = cibles[duMois.indexOf(saut.e)];
      var num = el('button', 'cal-num', saut.num.textContent);
      num.type = 'button';
      num.setAttribute('aria-label', 'Voir les événements du ' + formatJour(saut.jour, false));
      if (!petit.matches) {
        num.tabIndex = -1;
        num.setAttribute('aria-hidden', 'true');
      }
      saut.cellule.replaceChild(num, saut.num);
      saut.cellule.classList.add('has-events');
      saut.cellule.addEventListener('click', function () {
        if (petit.matches) allerA(cible);
      });
    });

    message.textContent = duMois.length ? '' : 'Aucun événement ce mois-ci.';
    message.hidden = duMois.length > 0;
  }

  function allerA(cible) {
    cible.scrollIntoView({ behavior: mouvementReduit.matches ? 'auto' : 'smooth', block: 'start' });
    cible.focus({ preventScroll: true });
    cible.classList.remove('is-flash');
    void cible.offsetWidth; // relance l'animation si on retouche la meme date
    cible.classList.add('is-flash');
  }

  // --- Fiche detaillee ---
  var retourFocus = null;

  function lien(texte, href, style) {
    var a = el('a', 'btn ' + style, texte);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }

  function ouvrir(e, origine) {
    retourFocus = origine;
    var corps = dialog.querySelector('.cal-dialog-body');
    corps.textContent = '';
    dialog.className = 'cal-dialog tag-' + e.type;

    corps.appendChild(el('span', 'event-tag tag-' + e.type, TYPES[e.type]));
    var h = el('h3', '', e.titre);
    h.id = 'cal-dialog-title';
    corps.appendChild(h);
    var quand = formatPeriode(e);
    corps.appendChild(el('p', 'cal-dialog-when', quand.charAt(0).toUpperCase() + quand.slice(1) +
      (e.horaire ? ' · ' + e.horaire : '')));
    if (e.description) corps.appendChild(el('p', 'cal-dialog-desc', e.description));

    var details = (e.details || []).slice();
    if (e.lieu) details.push(['Lieu', e.lieu]);
    if (details.length) {
      var dl = el('dl', 'cal-dialog-details');
      details.forEach(function (p) {
        dl.appendChild(el('dt', '', p[0]));
        dl.appendChild(el('dd', '', p[1]));
      });
      corps.appendChild(dl);
    }
    // Boutons : itineraire d'abord (adresse -> Google Maps), puis le lien vers l'evenement
    var actions = el('div', 'cal-dialog-actions');
    if (e.itineraire) actions.appendChild(lien('Itinéraire', urlItineraire(e.itineraire), 'btn-primary'));
    if (e.lien) actions.appendChild(lien(e.lienTexte || 'En savoir plus', e.lien,
      actions.children.length ? 'btn-outline-dark' : 'btn-primary'));
    if (actions.children.length) corps.appendChild(actions);
    dialog.showModal();
  }

  dialog.querySelector('.cal-dialog-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (ev) { if (ev.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { if (retourFocus) retourFocus.focus(); });

  // --- Navigation ---
  function decaler(n) {
    vue = new Date(vue.getFullYear(), vue.getMonth() + n, 1);
    rendreMois();
  }
  root.querySelector('.cal-prev').addEventListener('click', function () { decaler(-1); });
  root.querySelector('.cal-next').addEventListener('click', function () { decaler(1); });
  root.querySelector('.cal-today').addEventListener('click', function () {
    vue = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 1);
    rendreMois();
  });

  // Le passage grille <-> pastilles change le role des dates : on redessine
  if (petit.addEventListener) petit.addEventListener('change', function () { rendreMois(); });

  // --- Chargement ---
  SOURCES.forEach(function (s) {
    var lignes = DONNEES[s.cle];
    if (!lignes) {
      console.warn('Calendrier : data/' + s.cle + '.js absent ou pas inclus dans la page');
      return;
    }
    lignes.forEach(function (r) {
      var e = normaliser(s.ligne(r), s.cle);
      if (e) evenements.push(e);
    });
  });

  var ordre = Object.keys(TYPES);
  evenements.sort(function (a, b) {
    return (a.debut - b.debut) || (ordre.indexOf(a.type) - ordre.indexOf(b.type)) ||
      a.titre.localeCompare(b.titre, 'fr');
  });
  root.classList.remove('is-loading');
  if (!evenements.length) {
    message.hidden = false;
    message.textContent = 'Le calendrier n’a pas pu être chargé. Réessayez plus tard.';
    return;
  }
  rendreFiltres();
  rendreMois();
})();
