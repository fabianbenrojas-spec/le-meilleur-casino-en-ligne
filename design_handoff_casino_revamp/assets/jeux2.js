/* ============================================================
   Catégorie jeux v2 — interactions
   search + provider filter + RTP toggle + sort + count + empty
   + random pick + sticky bonus bar
   (theme, cookies, FAQ handled by site.js)
   ============================================================ */
(function () {
  'use strict';
  var grid = document.getElementById('gameGrid');
  if (!grid) return;
  var tiles = [].slice.call(grid.querySelectorAll('.game-tile'));
  var pills = document.getElementById('provPills');
  var search = document.getElementById('gameSearch');
  var sort = document.getElementById('gameSort');
  var rtpToggle = document.getElementById('rtpToggle');
  var countEl = document.getElementById('gameCount');
  var emptyEl = document.getElementById('gameEmpty');
  var randomBtn = document.getElementById('randomGame');

  var state = { prov: 'all', q: '', rtp: false };

  function track(ev, params) {
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: ev }, params || {}));
  }

  function matches(t) {
    if (state.prov !== 'all' && t.dataset.prov !== state.prov) return false;
    if (state.rtp && parseFloat(t.dataset.rtp) < 96) return false;
    if (state.q && t.dataset.name.toLowerCase().indexOf(state.q) === -1) return false;
    return true;
  }

  function apply() {
    var n = 0;
    tiles.forEach(function (t) {
      var ok = matches(t);
      t.style.display = ok ? '' : 'none';
      if (ok) n++;
    });
    if (countEl) countEl.innerHTML = '<b>' + n + '</b> jeu' + (n > 1 ? 'x' : '');
    if (emptyEl) emptyEl.classList.toggle('show', n === 0);
  }

  function applySort() {
    var m = sort ? sort.value : 'pop';
    tiles.slice().sort(function (a, b) {
      if (m === 'az') return a.dataset.name.localeCompare(b.dataset.name);
      if (m === 'rtp') return parseFloat(b.dataset.rtp) - parseFloat(a.dataset.rtp);
      if (m === 'maxwin') return parseFloat(b.dataset.maxwin || 0) - parseFloat(a.dataset.maxwin || 0);
      return parseFloat(b.dataset.pop || 0) - parseFloat(a.dataset.pop || 0);
    }).forEach(function (t) { grid.appendChild(t); });
  }

  if (pills) pills.addEventListener('click', function (e) {
    var b = e.target.closest('.jx-pill'); if (!b) return;
    pills.querySelectorAll('.jx-pill').forEach(function (p) { p.classList.remove('active'); });
    b.classList.add('active');
    state.prov = b.dataset.prov;
    apply();
    track('comparison_filter_use', { filter: 'provider', value: state.prov });
  });

  if (search) {
    var deb;
    search.addEventListener('input', function () {
      state.q = search.value.trim().toLowerCase();
      apply();
      clearTimeout(deb);
      deb = setTimeout(function () { if (state.q) track('game_search', { query: state.q }); }, 600);
    });
  }

  if (rtpToggle) rtpToggle.addEventListener('change', function () {
    state.rtp = rtpToggle.checked;
    apply();
    track('comparison_filter_use', { filter: 'rtp_min', value: state.rtp ? '96' : 'all' });
  });

  if (sort) sort.addEventListener('change', function () {
    applySort();
    track('comparison_sort_use', { sort: sort.value });
  });

  if (randomBtn) randomBtn.addEventListener('click', function () {
    var visible = tiles.filter(function (t) { return t.style.display !== 'none'; });
    if (!visible.length) return;
    var pick = visible[Math.floor(Math.random() * visible.length)];
    tiles.forEach(function (t) { t.classList.remove('flash'); });
    var y = pick.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top: y, behavior: 'smooth' });
    // restart animation
    void pick.offsetWidth;
    pick.classList.add('flash');
    track('game_random_pick', { game: pick.dataset.name });
  });

  /* sticky bonus bar */
  var bar = document.querySelector('.jx2-stickybar');
  var sentinel = document.querySelector('[data-sticky-sentinel]');
  var closed = false;
  if (bar && sentinel && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { bar.classList.toggle('show', !en.isIntersecting && !closed); });
    }, { rootMargin: '0px' });
    io.observe(sentinel);
  }
  var cb = bar && bar.querySelector('.closebar');
  if (cb) cb.addEventListener('click', function () { closed = true; bar.classList.remove('show'); });

  apply();
})();
