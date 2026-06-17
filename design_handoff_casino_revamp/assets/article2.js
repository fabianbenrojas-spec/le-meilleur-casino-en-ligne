/* ============================================================
   Article / guide v2 — interactions
   scroll-spy + read progress · LLM summarize links · wager
   calculator · sticky bonus bar · copy-link / share toast
   (FAQ + theme + cookies handled by site.js)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- LLM summarize buttons ---------- */
  (function () {
    var canonical = document.querySelector('link[rel="canonical"]');
    var url = canonical ? canonical.href : location.href;
    var title = (document.querySelector('h1') || {}).textContent || document.title;
    var prompt = 'Résume cet article de le-meilleur-casino-en-ligne.fr (« ' + title.trim() + ' ») en points clés, puis explique-moi les conditions de wager simplement : ' + url;
    var q = encodeURIComponent(prompt);
    var targets = {
      chatgpt: 'https://chatgpt.com/?q=' + q,
      claude: 'https://claude.ai/new?q=' + q,
      perplexity: 'https://www.perplexity.ai/search?q=' + q,
      mistral: 'https://chat.mistral.ai/chat?q=' + q,
      grok: 'https://grok.com/?q=' + q
    };
    document.querySelectorAll('.llm-btn[data-llm]').forEach(function (a) {
      var k = a.getAttribute('data-llm');
      if (targets[k]) a.setAttribute('href', targets[k]);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  })();

  /* ---------- scroll-spy (sidebar TOC + clickable summary) ---------- */
  (function () {
    var links = [].slice.call(document.querySelectorAll('[data-spy] a'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      (map[id] = map[id] || []).push(a);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          (map[en.target.id] || []).forEach(function (l) { l.classList.add('active'); });
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  })();

  /* ---------- read progress ---------- */
  (function () {
    var bar = document.getElementById('readBar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = Math.min(100, Math.max(0, p)) + '%';
    }, { passive: true });
  })();

  /* ---------- wager calculator ---------- */
  (function () {
    var slider = document.getElementById('wcBonus');
    if (!slider) return;
    var seg = document.getElementById('wcWager');
    var calc = document.querySelector('.wcalc');
    var mode = (calc && calc.getAttribute('data-calc-mode')) || 'wager'; // 'wager' | 'rtp'
    // initialize the segment value from the pre-selected .on button (fallback per mode)
    var onBtn = seg && seg.querySelector('button.on');
    var segVal = onBtn ? +onBtn.getAttribute('data-w') : (mode === 'rtp' ? 96 : 35);
    var fmt = function (n) { return Math.round(n).toLocaleString('fr-FR'); };
    function render() {
      var amount = +slider.value;
      var amtEl = document.getElementById('wcBonusVal');
      if (amtEl) amtEl.textContent = fmt(amount) + ' €';
      var pe = document.querySelector('[data-wc="play"]');
      var ce = document.querySelector('[data-wc="cost"]');
      var v = document.getElementById('wcVerdict');
      if (mode === 'rtp') {
        var rtp = segVal;                       // segVal is an RTP percentage (e.g. 96)
        var back = amount * (rtp / 100);        // redistributed on average
        var cost = amount * (1 - rtp / 100);    // house edge / theoretical cost
        if (pe) pe.innerHTML = '<span>' + fmt(back) + ' €</span>';
        if (ce) ce.textContent = '≈ ' + fmt(cost) + ' €';
        if (v) {
          if (rtp >= 96) { v.className = 'wc-verdict ok'; v.innerHTML = '✓ RTP ' + (rtp >= 96.5 ? 'élevé' : 'correct') + ' (' + rtp + ' %)'; }
          else { v.className = 'wc-verdict warn'; v.innerHTML = '⚠ RTP faible (' + rtp + ' %) — peu favorable'; }
        }
      } else {
        var wager = segVal;                     // segVal is a wager multiplier (e.g. 35)
        var play = amount * wager;              // amount to wager before withdrawal
        var lose = play * 0.04;                 // theoretical cost at ~96% RTP
        if (pe) pe.innerHTML = '<span>' + fmt(play) + ' €</span>';
        if (ce) ce.textContent = '≈ ' + fmt(lose) + ' €';
        if (v) {
          if (wager <= 35) { v.className = 'wc-verdict ok'; v.innerHTML = '✓ Conditions raisonnables (' + wager + '×)'; }
          else { v.className = 'wc-verdict warn'; v.innerHTML = '⚠ Wager élevé (' + wager + '×) — à éviter'; }
        }
      }
    }
    slider.addEventListener('input', render);
    if (seg) seg.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      seg.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      segVal = +b.getAttribute('data-w');
      render();
      if (window.dataLayer) window.dataLayer.push({ event: mode === 'rtp' ? 'rtp_calc_use' : 'wager_calc_use', value: segVal });
    });
    render();
  })();

  /* ---------- sticky bonus bar ---------- */
  (function () {
    var bar = document.querySelector('.art2-stickybar');
    var sentinel = document.querySelector('[data-sticky-sentinel]');
    if (!bar) return;
    var closed = false;
    if (sentinel && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { bar.classList.toggle('show', !en.isIntersecting && !closed); });
      }, { rootMargin: '0px' });
      io.observe(sentinel);
    }
    var cb = bar.querySelector('.closebar');
    if (cb) cb.addEventListener('click', function () { closed = true; bar.classList.remove('show'); });
  })();

  /* ---------- copy link / share + toast ---------- */
  (function () {
    var toast = document.querySelector('.art2-toast');
    function flash(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () { toast.classList.remove('show'); }, 1900);
    }
    document.querySelectorAll('[data-copy-link]').forEach(function (b) {
      b.addEventListener('click', function () {
        var url = (document.querySelector('link[rel="canonical"]') || {}).href || location.href;
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { flash('Lien copié ✓'); }, function () { flash('Lien : ' + url); });
        else flash('Lien : ' + url);
      });
    });
    document.querySelectorAll('[data-share]').forEach(function (b) {
      b.addEventListener('click', function () {
        var url = (document.querySelector('link[rel="canonical"]') || {}).href || location.href;
        var title = (document.querySelector('h1') || {}).textContent || document.title;
        if (navigator.share) navigator.share({ title: title, url: url }).catch(function () {});
        else flash('Partage — lien copié ✓');
      });
    });
  })();
})();
