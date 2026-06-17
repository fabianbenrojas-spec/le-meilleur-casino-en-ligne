/* ============================================================
   Versus v2 — interactions
   - shared tweak state (direction / accent / deep / cta / theme)
   - always-visible direction switcher (A·B·C)
   - scroll-filled criterion bars + hero rings
   - sticky compare bar
   - wager explainer mini-tool
   - deep-dive toggles
   - vanilla Tweaks panel (host protocol)
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;
  var params = new URLSearchParams(location.search);
  var EMBED = params.get('embed') === '1';

  /* ---------- persisted tweak defaults (host rewrites this block) ---------- */
  var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "dir": "a",
    "accent": "gold",
    "deep": "closed",
    "ctaIntensity": 7,
    "theme": "light"
  }/*EDITMODE-END*/;

  if (params.get('dir')) TWEAK_DEFAULTS.dir = params.get('dir');
  try { var savedTheme = localStorage.getItem('mc-theme'); if (savedTheme) TWEAK_DEFAULTS.theme = savedTheme; } catch (e) {}

  var state = Object.assign({}, TWEAK_DEFAULTS);

  function ctaLevel(n) { return n <= 3 ? 'low' : n <= 7 ? 'mid' : 'high'; }

  function applyTweaks(t) {
    root.setAttribute('data-dir', t.dir);
    root.setAttribute('data-accent', t.accent);
    root.setAttribute('data-deep', t.deep);
    root.setAttribute('data-cta', ctaLevel(t.ctaIntensity));
    root.setAttribute('data-theme', t.theme);
    try { localStorage.setItem('mc-theme', t.theme); } catch (e) {}
    requestAnimationFrame(animateActiveHero);
  }

  // single entry point used by BOTH the dir switcher and the tweaks panel
  function commit(edits, persist) {
    Object.assign(state, edits);
    applyTweaks(state);
    syncUI();
    if (persist !== false) {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: edits }, '*');
    }
  }

  function syncUI() {
    document.querySelectorAll('[data-seg-for]').forEach(function (seg) {
      var key = seg.getAttribute('data-seg-for');
      seg.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-v') === String(state[key]) ? 'true' : 'false');
      });
    });
    var cv = document.querySelector('[data-cta-val]');
    if (cv) cv.textContent = state.ctaIntensity + '/10';
  }

  /* ---------- hero ring + category bar animation ---------- */
  function animateActiveHero() {
    document.querySelectorAll('.vs2-hero').forEach(function (h) {
      if (h.offsetParent === null) return; // hidden direction
      h.querySelectorAll('.ring').forEach(function (r) {
        r.style.setProperty('--p', r.getAttribute('data-p') || 0);
      });
      h.querySelectorAll('.cbf').forEach(function (f) {
        f.style.width = (f.getAttribute('data-w') || '0%');
      });
    });
  }

  /* ---------- criterion bars fill on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); barIO.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.18 });
    document.querySelectorAll('.vs2-crit').forEach(function (c) { barIO.observe(c); });
  } else {
    document.querySelectorAll('.vs2-crit').forEach(function (c) { c.classList.add('in'); });
  }

  /* ---------- sticky compare bar ---------- */
  var compare = document.querySelector('.vs2-compare');
  var sentinel = document.querySelector('[data-compare-sentinel]');
  var compareClosed = false;
  if (compare && sentinel && 'IntersectionObserver' in window) {
    var cIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        compare.classList.toggle('show', !en.isIntersecting && !compareClosed);
      });
    }, { rootMargin: '0px 0px 0px 0px' });
    cIO.observe(sentinel);
  }
  var closeBar = compare && compare.querySelector('.closebar');
  if (closeBar) closeBar.addEventListener('click', function () {
    compareClosed = true; compare.classList.remove('show');
  });

  /* ---------- deep-dive toggles ---------- */
  document.querySelectorAll('.vs2-deepbtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var crit = btn.closest('.vs2-crit');
      var open = crit.classList.toggle('deep-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var lbl = btn.querySelector('.dl');
      if (lbl) lbl.textContent = open ? 'Masquer le détail' : 'Voir le détail du test';
    });
  });

  /* ---------- wager explainer mini-tool ---------- */
  (function () {
    var slider = document.getElementById('wager-bonus');
    if (!slider) return;
    var WAGER = 35;
    var ops = [{ key: 'cresus', rtp: 0.964 }, { key: 'lucky8', rtp: 0.961 }];
    var fmt = function (n) { return Math.round(n).toLocaleString('fr-FR'); };
    function render() {
      var bonus = +slider.value;
      var amt = document.getElementById('wager-amt');
      if (amt) amt.textContent = fmt(bonus) + ' €';
      var play = bonus * WAGER;
      ops.forEach(function (o) {
        var pl = document.querySelector('[data-w-play="' + o.key + '"]');
        var co = document.querySelector('[data-w-cost="' + o.key + '"]');
        if (pl) pl.textContent = fmt(play) + ' €';
        if (co) co.textContent = '≈ ' + fmt(play * (1 - o.rtp)) + ' €';
      });
    }
    slider.addEventListener('input', render);
    render();
  })();

  /* ---------- always-visible direction switcher ---------- */
  function buildDirSwitcher() {
    if (EMBED) return;
    var bar = document.createElement('div');
    bar.className = 'dirswitch';
    bar.setAttribute('data-omelette-chrome', '');
    bar.innerHTML =
      '<span class="dl">Direction</span>' +
      '<div class="dseg" data-seg-for="dir">' +
        '<button data-v="a"><b>A</b><span>Éditorial</span></button>' +
        '<button data-v="b"><b>B</b><span>Verdict</span></button>' +
        '<button data-v="c"><b>C</b><span>Banc d\'essai</span></button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.dseg').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      commit({ dir: b.getAttribute('data-v') });
    });
  }

  /* ---------- vanilla Tweaks panel ---------- */
  function buildTweaks() {
    if (EMBED) return;
    var panel = document.createElement('div');
    panel.className = 'tk-panel';
    panel.setAttribute('data-omelette-chrome', '');
    panel.innerHTML =
      '<div class="tk-hd"><b>Tweaks</b><button class="tk-x" aria-label="Fermer">\u2715</button></div>' +
      '<div class="tk-body">' +
        seg('dir', 'Direction', [['a', 'Éditorial'], ['b', 'Verdict'], ['c', 'Banc d\'essai']]) +
        seg('accent', 'Accent gagnant', [['green', 'Vert'], ['gold', 'Or']]) +
        seg('deep', 'Détails des tests', [['closed', 'Repliés'], ['open', 'Ouverts']]) +
        '<div class="tk-row"><div class="tl"><span>Intensité des CTA</span><span class="tv" data-cta-val>' + state.ctaIntensity + '/10</span></div>' +
          '<input class="tk-slider" type="range" min="1" max="10" step="1" value="' + state.ctaIntensity + '" data-tk="ctaIntensity"></div>' +
        seg('theme', 'Thème', [['light', 'Clair'], ['dark', 'Sombre']]) +
      '</div>';
    document.body.appendChild(panel);

    function seg(key, label, opts) {
      return '<div class="tk-row"><div class="tl"><span>' + label + '</span></div>' +
        '<div class="tk-seg" data-seg-for="' + key + '">' +
        opts.map(function (o) { return '<button data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') +
        '</div></div>';
    }

    panel.querySelectorAll('.tk-seg').forEach(function (s) {
      var key = s.getAttribute('data-seg-for');
      s.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        var edit = {}; edit[key] = b.getAttribute('data-v'); commit(edit);
      });
    });
    var slider = panel.querySelector('[data-tk="ctaIntensity"]');
    slider.addEventListener('input', function () { commit({ ctaIntensity: +slider.value }); });
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
  applyTweaks(state);
  buildDirSwitcher();
  buildTweaks();
  syncUI();
  setTimeout(animateActiveHero, 120);
})();
