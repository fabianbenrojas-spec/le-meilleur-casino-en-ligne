/* ============================================================
   Bonus page v2 — interactions
   finder quiz · filters (sidebar + sheet) · bonus-type chips ·
   sort · active chips · sticky bar
   (theme/cookies/FAQ via site.js)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- FINDER QUIZ ---------- */
  (function () {
    var finder = document.getElementById('bnFinder');
    if (!finder) return;
    var qs = [].slice.call(finder.querySelectorAll('.bn-q'));
    var progress = [].slice.call(finder.querySelectorAll('.bn-progress i'));
    var back = document.getElementById('bnBack');
    var prompt = document.getElementById('bnPrompt');
    var result = document.getElementById('bnResult');
    var answers = {};
    var idx = 0;

    // recommendation matrix: maps priority answer -> operator
    var RECS = {
      gros_bonus: { nm: 'Magical Spin', logo: 'Magical', score: '8.3', bonus: '1 000 € + 100 tours', why: 'Le plus gros bonus de notre sélection, idéal si vous visez un capital de départ maximal.', op: 'magical_spin', b: '1000_euros' },
      retrait_rapide: { nm: 'Cresus Casino', logo: 'Cresus.svg', score: '9.2', bonus: '200 € + 100 tours', why: 'Retraits en moins de 24 h sur nos tests, crypto comprise — notre n°1 toutes catégories.', op: 'cresus', b: '200_euros' },
      wager_doux: { nm: 'Cresus Casino', logo: 'Cresus.svg', score: '9.2', bonus: '200 € + 100 tours', why: 'Wager 35× transparent et conditions lisibles : le meilleur rapport bonus/conditions.', op: 'cresus', b: '200_euros' },
      tournois: { nm: 'Lucky8', logo: 'Lucky8', score: '8.9', bonus: '100 € + 100 tours', why: 'Tournois de machines à sous hebdomadaires et cashback régulier pour les joueurs assidus.', op: 'lucky8', b: '100_euros' },
      crypto: { nm: 'Wild Sultan', logo: 'Wild', score: '8.7', bonus: '500 € + 20 tours', why: 'Retraits crypto quasi instantanés et catalogue live premium signé Evolution.', op: 'wild_sultan', b: '500_euros' }
    };

    function show(i) {
      qs.forEach(function (q, k) { q.classList.toggle('on', k === i); });
      progress.forEach(function (p, k) { p.classList.toggle('done', k <= i); });
      back.classList.toggle('show', i > 0);
      idx = i;
    }
    function pickRec() {
      // priority answer (q3) decides; fallbacks keep it robust
      return RECS[answers.priority] || RECS[answers.profil] || RECS.retrait_rapide;
    }
    function finish() {
      var r = pickRec();
      result.querySelector('[data-r=logo]').textContent = r.logo;
      result.querySelector('[data-r=nm]').textContent = r.nm;
      result.querySelector('[data-r=score]').textContent = r.score;
      result.querySelector('[data-r=bonus]').innerHTML = '<span>' + r.bonus.split(' + ')[0] + '</span>' + (r.bonus.indexOf('+') > -1 ? ' + ' + r.bonus.split('+ ')[1] : '');
      result.querySelector('[data-r=why]').textContent = r.why;
      var cta = result.querySelector('[data-r=cta]');
      cta.setAttribute('data-operator', r.op);
      cta.setAttribute('data-bonus', r.b);
      if (prompt) prompt.style.display = 'none';
      result.classList.add('show');
      if (window.dataLayer) window.dataLayer.push({ event: 'bonus_finder_complete', recommendation: r.op, answers: JSON.stringify(answers) });
    }
    finder.addEventListener('click', function (e) {
      var opt = e.target.closest('.bn-opt'); if (!opt) return;
      var q = opt.closest('.bn-q');
      answers[q.getAttribute('data-key')] = opt.getAttribute('data-val');
      if (idx < qs.length - 1) show(idx + 1);
      else finish();
    });
    back.addEventListener('click', function () {
      if (result.classList.contains('show')) { result.classList.remove('show'); if (prompt) prompt.style.display = ''; show(qs.length - 1); return; }
      if (idx > 0) show(idx - 1);
    });
    var restart = document.getElementById('bnRestart');
    if (restart) restart.addEventListener('click', function () { answers = {}; result.classList.remove('show'); if (prompt) prompt.style.display = ''; show(0); });
    show(0);
  })();

  /* ---------- FILTERS + bonus-type chips + sort ---------- */
  (function () {
    var list = document.getElementById('bnList');
    if (!list) return;
    var cards = [].slice.call(list.querySelectorAll('.bn-card'));
    var filtersEl = document.getElementById('bnFilters');
    var typeBar = document.getElementById('bnTypes');
    var chipsEl = document.getElementById('bnChips');
    var resCount = document.getElementById('bnCount');
    var sheetCount = document.getElementById('bnSheetCount');
    var filterBadge = document.getElementById('bnFilterBadge');
    var noRes = document.getElementById('bnNoResult');
    var state = { type: 'all' };

    var labels = {
      type: { match: 'Bonus de dépôt', nodep: 'Sans dépôt', freespins: 'Tours gratuits', cashback: 'Cashback', crypto: 'Crypto' },
      amount: { a1: 'Jusqu’à 200 €', a2: '200 – 500 €', a3: '500 – 1 000 €', a4: '1 000 €+' },
      wager: { w1: 'Wager ≤ 25×', w2: 'Wager ≤ 35×', w3: 'Wager ≤ 45×' },
      pay: { cb: 'Carte bancaire', crypto: 'Crypto', paysafe: 'Paysafecard' }
    };

    function checked() { return [].slice.call(filtersEl.querySelectorAll('input:checked')); }
    function activeCount() { return checked().length + (state.type !== 'all' ? 1 : 0); }

    function passes(card) {
      // bonus-type quick chip
      if (state.type !== 'all' && (card.dataset.types || '').split(' ').indexOf(state.type) === -1) return false;
      var boxes = checked(), groups = {};
      boxes.forEach(function (b) { (groups[b.dataset.group] = groups[b.dataset.group] || []).push(b); });
      for (var g in groups) {
        var ok = false;
        groups[g].forEach(function (b) {
          if (g === 'amount') { var v = +card.dataset.amount; if (v >= +b.dataset.min && v <= +b.dataset.max) ok = true; }
          else if (g === 'wager') { if (+card.dataset.wager <= +b.dataset.max) ok = true; }
          else { if ((card.dataset[g] || '').split(' ').indexOf(b.value) !== -1) ok = true; }
        });
        if (!ok) return false;
      }
      return true;
    }
    function sortCards(mode) {
      cards.slice().sort(function (a, b) {
        if (mode === 'az') return a.dataset.name.localeCompare(b.dataset.name);
        var key = mode === 'amount' ? 'amount' : mode === 'wager' ? 'wager' : 'note';
        if (mode === 'wager') return +a.dataset.wager - +b.dataset.wager; // lower wager = better
        return +b.dataset[key] - +a.dataset[key];
      }).forEach(function (c) { list.appendChild(c); });
    }
    function renderChips() {
      chipsEl.innerHTML = '';
      if (state.type !== 'all') addChip(labels.type[state.type], function () { setType('all'); });
      checked().forEach(function (b) {
        var lab = (labels[b.dataset.group] || {})[b.value] || b.value;
        addChip(lab, function () { b.checked = false; apply(); });
      });
    }
    function addChip(lab, onX) {
      var c = document.createElement('span');
      c.className = 'fchip';
      c.innerHTML = lab + ' <button aria-label="Retirer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>';
      c.querySelector('button').addEventListener('click', onX);
      chipsEl.appendChild(c);
    }
    function apply(track) {
      var n = 0;
      cards.forEach(function (c) { var p = passes(c); c.style.display = p ? '' : 'none'; if (p) n++; });
      if (resCount) resCount.textContent = n;
      if (sheetCount) sheetCount.textContent = n;
      if (noRes) noRes.classList.toggle('show', n === 0);
      var ac = activeCount();
      if (filterBadge) { filterBadge.style.display = ac ? '' : 'none'; filterBadge.textContent = ac; }
      renderChips();
      if (track && window.dataLayer) window.dataLayer.push({ event: 'comparison_filter_use', active_filters: ac });
    }
    function setType(t) {
      state.type = t;
      typeBar.querySelectorAll('.bn-type').forEach(function (x) { x.classList.toggle('active', x.dataset.type === t); });
      apply(true);
    }

    filtersEl.addEventListener('change', function (e) { if (e.target.matches('input')) apply(true); });
    typeBar.addEventListener('click', function (e) { var b = e.target.closest('.bn-type'); if (b) setType(b.dataset.type); });

    var sortSel = document.getElementById('bnSort'), sortMob = document.getElementById('bnSortMobile');
    function doSort(m) { sortCards(m); if (window.dataLayer) window.dataLayer.push({ event: 'comparison_sort_use', sort: m }); }
    if (sortSel) sortSel.addEventListener('change', function () { doSort(sortSel.value); if (sortMob) sortMob.value = sortSel.value; });
    if (sortMob) sortMob.addEventListener('change', function () { doSort(sortMob.value); if (sortSel) sortSel.value = sortMob.value; });

    function resetAll() { checked().forEach(function (b) { b.checked = false; }); setType('all'); apply(); }
    ['bnReset', 'bnResetEmpty', 'bnSheetReset'].forEach(function (id) { var el = document.getElementById(id); if (el) el.addEventListener('click', resetAll); });

    // mobile sheet
    var overlay = document.getElementById('bnSheetOverlay'), sheetBody = document.getElementById('bnSheetBody'), home = document.getElementById('bnFiltersHome');
    function openSheet() { sheetBody.appendChild(filtersEl); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
    function closeSheet() { home.appendChild(filtersEl); overlay.classList.remove('show'); document.body.style.overflow = ''; }
    var openBtn = document.getElementById('bnOpenSheet'); if (openBtn) openBtn.addEventListener('click', openSheet);
    var closeBtn = document.getElementById('bnCloseSheet'); if (closeBtn) closeBtn.addEventListener('click', closeSheet);
    var applyBtn = document.getElementById('bnSheetApply'); if (applyBtn) applyBtn.addEventListener('click', closeSheet);
    if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSheet(); });

    sortCards('note');
    apply();
  })();

  /* ---------- sticky bar ---------- */
  (function () {
    var bar = document.querySelector('.bn-stickybar');
    var sentinel = document.querySelector('[data-sticky-sentinel]');
    if (!bar) return;
    var closed = false;
    if (sentinel && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { bar.classList.toggle('show', !en.isIntersecting && !closed); }); }, { rootMargin: '0px' });
      io.observe(sentinel);
    }
    var cb = bar.querySelector('.closebar'); if (cb) cb.addEventListener('click', function () { closed = true; bar.classList.remove('show'); });
  })();
})();
