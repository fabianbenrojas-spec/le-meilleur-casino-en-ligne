/* ============================================================
   Avis casino v2 — interactions
   - proposition switcher (1 · Conversion / 2 · Éditorial)
   - TOC / sub-nav scroll-spy
   - sticky bonus bar (after hero)
   - vanilla Tweaks panel (host protocol)
   FAQ + theme toggle handled by site.js
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);
  var EMBED = params.get('embed') === '1';

  var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "prop": "1",
    "theme": "light",
    "stickybar": true
  }/*EDITMODE-END*/;

  if (params.get('prop')) TWEAK_DEFAULTS.prop = params.get('prop');
  // single-prop templates pin their proposition via the inline-set html[data-prop]
  if (document.body.hasAttribute('data-single-prop')) {
    var hp = root.getAttribute('data-prop'); if (hp) TWEAK_DEFAULTS.prop = hp;
  }
  try { var st = localStorage.getItem('mc-theme'); if (st) TWEAK_DEFAULTS.theme = st; } catch (e) {}

  var state = Object.assign({}, TWEAK_DEFAULTS);

  function applyState(s) {
    root.setAttribute('data-prop', s.prop);
    root.setAttribute('data-theme', s.theme);
    root.setAttribute('data-stickybar', s.stickybar ? 'on' : 'off');
    try { localStorage.setItem('mc-theme', s.theme); } catch (e) {}
  }

  function commit(edits, persist) {
    Object.assign(state, edits);
    applyState(state);
    syncUI();
    if (persist !== false) window.parent.postMessage({ type: '__edit_mode_set_keys', edits: edits }, '*');
  }

  function syncUI() {
    document.querySelectorAll('[data-seg-for]').forEach(function (seg) {
      var key = seg.getAttribute('data-seg-for');
      seg.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-v') === String(state[key]) ? 'true' : 'false');
      });
    });
    document.querySelectorAll('[data-tog-for]').forEach(function (t) {
      var key = t.getAttribute('data-tog-for');
      t.setAttribute('data-on', state[key] ? '1' : '0');
    });
  }

  /* ---------- scroll-spy (sidebar TOC + horizontal sub-nav) ---------- */
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-spy] a'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (!map[id]) map[id] = [];
      map[id].push(a);
    });
    var ids = Object.keys(map);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          (map[en.target.id] || []).forEach(function (l) { l.classList.add('active'); });
        }
      });
    }, { rootMargin: '-28% 0px -62% 0px', threshold: 0 });
    ids.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  })();

  /* ---------- sticky bonus bar ---------- */
  var bar = document.querySelector('.rv-stickybar');
  var sentinel = document.querySelector('[data-sticky-sentinel]');
  var barClosed = false;
  function barAllowed() { return state.stickybar; }
  if (bar && sentinel && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        bar.classList.toggle('show', !en.isIntersecting && !barClosed && barAllowed());
      });
    }, { rootMargin: '0px' });
    io2.observe(sentinel);
  }
  // react to the stickybar tweak immediately
  window.addEventListener('mc-stickybar-change', function () {
    if (!barAllowed()) bar && bar.classList.remove('show');
  });

  /* ---------- proposition switcher (always visible) ---------- */
  function buildSwitcher() {
    if (EMBED || document.body.hasAttribute('data-single-prop')) return;
    var el = document.createElement('div');
    el.className = 'propswitch';
    el.setAttribute('data-omelette-chrome', '');
    el.innerHTML =
      '<span class="dl">Proposition</span>' +
      '<div class="dseg" data-seg-for="prop">' +
        '<button data-v="1"><b>1</b><span>Conversion</span></button>' +
        '<button data-v="2"><b>2</b><span>Éditorial</span></button>' +
      '</div>';
    document.body.appendChild(el);
    el.querySelector('.dseg').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      commit({ prop: b.getAttribute('data-v') });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- vanilla Tweaks panel ---------- */
  function buildTweaks() {
    if (EMBED) return;
    var panel = document.createElement('div');
    panel.className = 'tk-panel';
    panel.setAttribute('data-omelette-chrome', '');
    var singleProp = document.body.hasAttribute('data-single-prop');
    panel.innerHTML =
      '<div class="tk-hd"><b>Tweaks</b><button class="tk-x" aria-label="Fermer">\u2715</button></div>' +
      '<div class="tk-body">' +
        (singleProp ? '' : '<div class="tk-row"><div class="tl"><span>Proposition</span></div>' +
          '<div class="tk-seg" data-seg-for="prop"><button data-v="1">Conversion</button><button data-v="2">Éditorial</button></div></div>') +
        '<div class="tk-row tk-row-h" style="flex-direction:row;align-items:center;justify-content:space-between"><div class="tl"><span>Barre bonus collante</span></div>' +
          '<button class="tk-toggle" data-tog-for="stickybar" aria-label="Barre bonus collante"><i></i></button></div>' +
        '<div class="tk-row"><div class="tl"><span>Thème</span></div>' +
          '<div class="tk-seg" data-seg-for="theme"><button data-v="light">Clair</button><button data-v="dark">Sombre</button></div></div>' +
      '</div>';
    document.body.appendChild(panel);

    panel.querySelectorAll('.tk-seg').forEach(function (s) {
      var key = s.getAttribute('data-seg-for');
      s.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        var edit = {}; edit[key] = b.getAttribute('data-v'); commit(edit);
      });
    });
    var tog = panel.querySelector('[data-tog-for="stickybar"]');
    tog.addEventListener('click', function () {
      commit({ stickybar: !state.stickybar });
      window.dispatchEvent(new Event('mc-stickybar-change'));
    });
    panel.querySelector('.tk-x').addEventListener('click', function () {
      panel.classList.remove('show');
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    });
    window.addEventListener('message', function (e) {
      var t = e && e.data && e.data.type;
      if (t === '__activate_edit_mode') panel.classList.add('show');
      else if (t === '__deactivate_edit_mode') panel.classList.remove('show');
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }

  /* ---------- init ---------- */
  applyState(state);
  buildSwitcher();
  buildTweaks();
  syncUI();
})();
