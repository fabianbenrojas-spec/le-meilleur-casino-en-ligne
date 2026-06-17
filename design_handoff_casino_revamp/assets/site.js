/* ============================================================
   le-meilleur-casino-en-ligne.fr — Shared site JS
   ============================================================ */
(function () {
  'use strict';

  /* ---------- GA4 dataLayer shim (so data-* attrs are demonstrably wired) ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    window.dataLayer.push(Object.assign({ event: event }, params || {}));
    // visible in console during design review
    console.log('[GA4]', event, params || {});
  }
  // Delegate clicks on anything carrying data-event
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-event]');
    if (!el) return;
    var p = {};
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (a.name.indexOf('data-') === 0 && a.name !== 'data-event') {
        p[a.name.slice(5).replace(/-/g, '_')] = a.value;
      }
    }
    track(el.getAttribute('data-event'), p);
  });

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('mc-theme'); } catch (e) {}
  if (saved) root.setAttribute('data-theme', saved);
  function toggleTheme() {
    var dark = root.getAttribute('data-theme') === 'dark';
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('mc-theme', next); } catch (e) {}
    track('dark_mode_toggle', { mode: next });
  }
  document.querySelectorAll('[data-action="theme-toggle"]').forEach(function (b) {
    b.addEventListener('click', toggleTheme);
  });

  /* ---------- Locale switcher ---------- */
  document.querySelectorAll('[data-action="locale-toggle"]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var menu = document.getElementById(b.getAttribute('aria-controls'));
      if (menu) menu.classList.toggle('open');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.locale-menu.open').forEach(function (m) { m.classList.remove('open'); });
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('[data-action="mobile-menu"]');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }

  /* ---------- Sticky mobile CTA (show after hero scrolled past) ---------- */
  var stickyCta = document.querySelector('.sticky-cta');
  var heroSentinel = document.querySelector('[data-sticky-sentinel]');
  if (stickyCta && heroSentinel && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        stickyCta.classList.toggle('show', !en.isIntersecting);
      });
    }, { rootMargin: '-120px 0px 0px 0px' });
    io.observe(heroSentinel);
  } else if (stickyCta) {
    stickyCta.classList.add('show');
  }

  /* ---------- Sortable comparison table ---------- */
  document.querySelectorAll('table.cmp').forEach(function (table) {
    var ths = table.querySelectorAll('thead th.sortable');
    ths.forEach(function (th) {
      th.addEventListener('click', function () {
        var col = +th.dataset.col;
        var type = th.dataset.type || 'num';
        var cur = th.getAttribute('aria-sort');
        var dir = cur === 'ascending' ? 'descending' : 'ascending';
        ths.forEach(function (o) { o.removeAttribute('aria-sort'); o.querySelector('.sar') && (o.querySelector('.sar').textContent = '↕'); });
        th.setAttribute('aria-sort', dir);
        th.querySelector('.sar') && (th.querySelector('.sar').textContent = dir === 'ascending' ? '↑' : '↓');
        var tbody = table.querySelector('tbody');
        var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
        rows.sort(function (a, b) {
          var av = a.children[col].dataset.sort, bv = b.children[col].dataset.sort;
          if (type === 'num') { av = parseFloat(av); bv = parseFloat(bv); }
          if (av < bv) return dir === 'ascending' ? -1 : 1;
          if (av > bv) return dir === 'ascending' ? 1 : -1;
          return 0;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
        track('comparison_sort_use', { column: th.dataset.key || ('col_' + col), direction: dir });
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('[data-faq] .faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) track('faq_open', { question: q.textContent.trim().slice(0, 60) });
    });
  });

  /* ---------- Quiz finder ---------- */
  var finder = document.querySelector('[data-finder]');
  if (finder) {
    var steps = finder.querySelectorAll('.q-card');
    var dots = finder.querySelectorAll('.q-progress i');
    var result = finder.querySelector('.finder-result');
    var prompt = finder.querySelector('.finder-prompt');
    var idx = 0;
    function go(n) {
      steps.forEach(function (s, i) { s.style.display = i === n ? 'block' : 'none'; });
      dots.forEach(function (d, i) { d.classList.toggle('done', i <= n); });
    }
    finder.querySelectorAll('.q-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        track('finder_answer', { step: idx + 1, value: opt.dataset.value || opt.textContent.trim() });
        idx++;
        if (idx < steps.length) { go(idx); }
        else {
          steps.forEach(function (s) { s.style.display = 'none'; });
          finder.querySelector('.q-progress').style.display = 'none';
          if (prompt) prompt.style.display = 'none';
          if (result) result.classList.add('show');
          dots.forEach(function (d) { d.classList.add('done'); });
        }
      });
    });
    var restart = finder.querySelector('[data-restart]');
    if (restart) restart.addEventListener('click', function () {
      idx = 0; result.classList.remove('show');
      if (prompt) prompt.style.display = '';
      finder.querySelector('.q-progress').style.display = 'flex';
      go(0);
    });
    go(0);
  }

  /* ---------- Cookie consent ---------- */
  var cookie = document.querySelector('.cookie-overlay');
  if (cookie) {
    var hasConsent = null;
    try { hasConsent = localStorage.getItem('mc-consent'); } catch (e) {}
    if (!hasConsent) setTimeout(function () { cookie.classList.add('show'); }, 700);
    cookie.querySelectorAll('.toggle-sw:not([disabled])').forEach(function (sw) {
      sw.addEventListener('click', function () {
        sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      });
    });
    function closeCookie(choice) {
      try { localStorage.setItem('mc-consent', choice); } catch (e) {}
      cookie.classList.remove('show');
      track('cookie_consent', { choice: choice });
    }
    cookie.querySelector('[data-cookie="accept"]') && cookie.querySelector('[data-cookie="accept"]').addEventListener('click', function () { closeCookie('accept_all'); });
    cookie.querySelector('[data-cookie="reject"]') && cookie.querySelector('[data-cookie="reject"]').addEventListener('click', function () { closeCookie('reject_all'); });
    cookie.querySelector('[data-cookie="save"]') && cookie.querySelector('[data-cookie="save"]').addEventListener('click', function () { closeCookie('custom'); });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll('[data-newsletter]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      track('newsletter_submit', { placement: f.dataset.newsletter || 'homepage' });
      f.innerHTML = '<div style="font-weight:700;color:var(--green);padding:14px 0">✓ Merci — vérifiez votre boîte mail pour confirmer.</div>';
    });
  });

  /* ---------- Scroll depth ---------- */
  var marks = [25, 50, 75, 100], fired = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop + h.clientHeight) / h.scrollHeight * 100;
    marks.forEach(function (m) {
      if (pct >= m && !fired[m]) { fired[m] = true; track('scroll_depth', { percent: m }); }
    });
  }, { passive: true });
})();
