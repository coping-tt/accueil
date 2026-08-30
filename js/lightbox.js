/* ============================================
   CoPing - Lightbox de galerie
   Sans dependance. Chaque .photo-grid forme un
   groupe de navigation independant.
   Sans JS, les liens .photo ouvrent l'image
   en pleine page : la galerie reste utilisable.
   ============================================ */
(function () {
  'use strict';

  var photos = Array.prototype.slice.call(document.querySelectorAll('.photo'));
  if (!photos.length) return;

  var group = [];        // photos du groupe courant
  var index = 0;         // position dans le groupe
  var lastFocused = null;

  // --- Construction du DOM de la lightbox ---
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo en grand');
  box.innerHTML =
    '<button type="button" class="lightbox-btn lightbox-close" aria-label="Fermer">&times;</button>' +
    '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Photo précédente">&#8249;</button>' +
    '<img alt="">' +
    '<button type="button" class="lightbox-btn lightbox-next" aria-label="Photo suivante">&#8250;</button>' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var caption = box.querySelector('.lightbox-caption');
  var btnClose = box.querySelector('.lightbox-close');
  var btnPrev = box.querySelector('.lightbox-prev');
  var btnNext = box.querySelector('.lightbox-next');

  function show(i) {
    index = (i + group.length) % group.length;
    var link = group[index];
    var thumb = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    var text = link.dataset.caption || (thumb ? thumb.alt : '');
    caption.textContent = group.length > 1
      ? text + '  (' + (index + 1) + '/' + group.length + ')'
      : text;
    var solo = group.length < 2;
    btnPrev.hidden = solo;
    btnNext.hidden = solo;
  }

  function open(link) {
    var grid = link.closest('.photo-grid');
    group = grid
      ? Array.prototype.slice.call(grid.querySelectorAll('.photo'))
      : [link];
    lastFocused = link;
    show(group.indexOf(link));
    box.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    btnClose.focus();
  }

  function close() {
    box.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    img.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  }

  photos.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      open(link);
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(index - 1); });
  btnNext.addEventListener('click', function () { show(index + 1); });

  // Clic sur le fond (hors image et hors boutons) : fermeture
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'Tab') {
      // Focus maintenu dans la lightbox
      var focusable = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
      var pos = focusable.indexOf(document.activeElement);
      e.preventDefault();
      var next = e.shiftKey ? pos - 1 : pos + 1;
      focusable[(next + focusable.length) % focusable.length].focus();
    }
  });

  // Navigation tactile
  var startX = null;
  box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(dx > 0 ? index - 1 : index + 1);
    startX = null;
  });
})();
