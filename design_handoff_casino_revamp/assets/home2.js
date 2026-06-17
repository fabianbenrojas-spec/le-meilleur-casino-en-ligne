/* ============================================================
   Homepage v2 — matchmaker (stepped quiz) + name rotator
   Shared by Homepage A & B. Renders into #mmWinner / #mmRunners.
   Winner varies on real, weighted criteria from the answers.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- name rotator ---------- */
  (function () {
    var el = document.getElementById('rotName');
    if (!el) return;
    var names = ['Cresus', 'Lucky8', 'Wild Sultan', 'Madnix', 'Magical Spin', 'Casinozer'];
    var i = 0;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(function () {
      el.classList.add('out');
      setTimeout(function () { i = (i + 1) % names.length; el.textContent = names[i]; el.classList.remove('out'); }, 420);
    }, 2400);
  })();

  /* ---------- MATCHMAKER ---------- */
  var mm = document.getElementById('matchmaker');
  if (!mm) return;

  // criterion scores 0-100: bonus, payout, games, live, crypto, wager(=low-wager friendliness), support
  var OPS = [
    { id: 'cresus', nm: 'Cresus Casino', logo: 'Cresus', score: '9.2', note: 9.2, bonus: '200 € + 100 tours', wagerTxt: 'Wager 35×', review: 'Avis Cresus v2.html', op: 'cresus', b: '200_euros',
      c: { bonus: 60, payout: 98, games: 95, live: 88, crypto: 68, wager: 70, support: 80, lang: 92, mobile: 76, cashout: 70 },
      why: 'Le meilleur équilibre global : retraits en moins de 24 h, 2 100+ jeux et un support FR solide.' },
    { id: 'lucky8', nm: 'Lucky8', logo: 'Lucky8', score: '8.9', note: 8.9, bonus: '100 € + 100 tours', wagerTxt: 'Wager 35× · cashback', review: '#', op: 'lucky8', b: '100_euros',
      c: { bonus: 50, payout: 80, games: 88, live: 78, crypto: 0, wager: 82, support: 98, lang: 95, mobile: 82, cashout: 74 },
      why: 'Le meilleur support et des tournois de slots avec cashback hebdomadaire pour les habitués.' },
    { id: 'wild_sultan', nm: 'Wild Sultan', logo: 'Wild', score: '8.7', note: 8.7, bonus: '500 € + 20 tours', wagerTxt: 'Wager 30×', review: '#', op: 'wild_sultan', b: '500_euros',
      c: { bonus: 86, payout: 92, games: 84, live: 98, crypto: 100, wager: 76, support: 78, lang: 78, mobile: 84, cashout: 88 },
      why: 'Retraits crypto quasi instantanés et le meilleur casino live premium signé Evolution.' },
    { id: 'madnix', nm: 'Madnix', logo: 'Madnix', score: '8.5', note: 8.5, bonus: '300 € + 100 tours', wagerTxt: 'Wager 35×', review: '#', op: 'madnix', b: '300_euros',
      c: { bonus: 64, payout: 78, games: 82, live: 58, crypto: 96, wager: 90, support: 80, lang: 82, mobile: 99, cashout: 72 },
      why: 'Interface moderne, tours gratuits sans wager et dépôts crypto : une expérience très actuelle.' },
    { id: 'magical_spin', nm: 'Magical Spin', logo: 'Magical', score: '8.3', note: 8.3, bonus: '1 000 € + 100 tours', wagerTxt: 'Wager 40×', review: '#', op: 'magical_spin', b: '1000_euros',
      c: { bonus: 100, payout: 58, games: 80, live: 64, crypto: 0, wager: 52, support: 72, lang: 78, mobile: 78, cashout: 92 },
      why: 'Le plus gros bonus de notre sélection et des promotions quotidiennes pour les gros budgets.' },
    { id: 'casinozer', nm: 'Casinozer', logo: 'Casinozer', score: '8.1', note: 8.1, bonus: '450 € + 270 tours', wagerTxt: 'Wager 40×', review: '#', op: 'casinozer', b: '450_euros',
      c: { bonus: 82, payout: 70, games: 84, live: 70, crypto: 98, wager: 60, support: 74, lang: 80, mobile: 86, cashout: 82 },
      why: '270 tours gratuits, cashback et paiements crypto : une offre généreuse et complète.' },
    { id: 'casino888', nm: '888 Casino', logo: '888', score: '7.5', note: 7.5, bonus: '88 € sans dépôt', wagerTxt: 'Wager 20× · sans dépôt', review: '#', op: '888_casino', b: '88_euros',
      c: { bonus: 34, payout: 74, games: 78, live: 58, crypto: 0, wager: 100, support: 86, lang: 90, mobile: 80, cashout: 62 },
      why: 'Un rare bonus sans dépôt et le wager le plus bas du marché : idéal pour débuter sans risque.' }
  ];

  // questions: each answer pushes weighted criteria onto an operator's score
  var QUESTIONS = [
    { key: 'priority', qn: 'Question 1 / 8', title: 'Votre priorité n°1 ?', opts: [
      { v: 'bonus',   t: 'Un gros bonus',     d: 'Le maximum de capital de départ', ic: 'M4 9h16M4 13h16M12 9v11', w: { bonus: 0.55 } },
      { v: 'payout',  t: 'Être payé vite',     d: 'Retraits rapides garantis',        ic: 'M12 7v5l3 2', circle: true, w: { payout: 0.55 } },
      { v: 'simple',  t: 'La simplicité',      d: 'Conditions douces, support réactif', ic: 'M20 6L9 17l-5-5', w: { wager: 0.85 } }
    ] },
    { key: 'bonusPref', qn: 'Question 2 / 8', title: 'Côté bonus, vous préférez…', opts: [
      { v: 'big',   t: 'Le plus généreux',    d: 'Montant maximal',          ic: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', w: { bonus: 0.4 } },
      { v: 'soft',  t: 'Le plus simple à libérer', d: 'Wager bas avant tout', ic: 'M20 6L9 17l-5-5', w: { wager: 0.65 } },
      { v: 'meh',   t: 'Peu importe',         d: 'Ce n\'est pas l\'essentiel', ic: 'M5 12h14', w: {} }
    ] },
    { key: 'games', qn: 'Question 3 / 8', title: 'Vos jeux préférés ?', opts: [
      { v: 'slots', t: 'Machines à sous',     d: 'Le plus large catalogue',  ic: 'M3 4h18v16H3zM8 4v16M16 4v16', w: { games: 0.35 } },
      { v: 'live',  t: 'Casino live',          d: 'Tables avec croupiers réels', ic: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', circle: true, w: { live: 0.45 } },
      { v: 'mix',   t: 'Un peu de tout',       d: 'Variété avant tout',       ic: 'M4 7h16M4 12h16M4 17h16', w: { games: 0.2, live: 0.2 } }
    ] },
    { key: 'pay', qn: 'Question 4 / 8', title: 'Comment payez-vous ?', opts: [
      { v: 'card',    t: 'Carte bancaire',    d: 'Simple et universel',      ic: 'M2 5h20v14H2zM2 10h20', w: { note: 0.35 } },
      { v: 'crypto',  t: 'Crypto',             d: 'BTC, ETH, USDT',           ic: 'M9.5 9.5h4a2 2 0 0 1 0 4h-4zM9.5 9.5v8M9.5 13.5h4.5', circle: true, w: { crypto: 0.5 } },
      { v: 'ewallet', t: 'E-wallet',           d: 'Skrill, Neteller, Paysafe', ic: 'M3 7h18v12H3zM16 13h2', w: { payout: 0.3 } }
    ] },
    { key: 'lang', qn: 'Question 5 / 8', title: 'La langue qui compte pour vous ?', opts: [
      { v: 'fr',    t: 'Français impératif',  d: 'Site et support 100 % FR',  ic: 'M3 5h12M9 3v2M11 5c0 5-4 8-7 9M5 9c0 3 3 5 6 6M14 19l4-9 4 9M15.5 16h5', w: { lang: 0.45, support: 0.2 } },
      { v: 'multi', t: 'Plusieurs langues',   d: 'Je joue aussi en EN / autres', ic: 'M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20', circle: true, w: { lang: 0.3 } },
      { v: 'any',   t: 'Peu importe',         d: 'La langue n\'est pas un critère', ic: 'M5 12h14', w: {} }
    ] },
    { key: 'mobile', qn: 'Question 6 / 8', title: 'Vous jouez surtout…', opts: [
      { v: 'mobile', t: 'Sur mobile',         d: 'App / site mobile au top',  ic: 'M7 2h10v20H7zM11 18h2', w: { mobile: 0.45 } },
      { v: 'desktop', t: 'Sur ordinateur',    d: 'Grand écran avant tout',    ic: 'M3 4h18v12H3zM8 20h8M12 16v4', w: { note: 0.3 } },
      { v: 'both',   t: 'Les deux',            d: 'Un peu partout',           ic: 'M4 7h16M4 12h16M4 17h16', w: { mobile: 0.2, note: 0.15 } }
    ] },
    { key: 'cashout', qn: 'Question 7 / 8', title: 'Vos retraits seront plutôt…', opts: [
      { v: 'small', t: 'Petits &amp; réguliers', d: 'Je retire souvent de petites sommes', ic: 'M12 7v5l3 2', circle: true, w: { payout: 0.3, wager: 0.15 } },
      { v: 'big',   t: 'De gros montants',    d: 'Plafond de retrait élevé requis', ic: 'M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4z', w: { cashout: 0.45 } },
      { v: 'any2',  t: 'Peu importe',         d: 'Je n\'ai pas de préférence', ic: 'M5 12h14', w: {} }
    ] },
    { key: 'profil', qn: 'Question 8 / 8', title: 'Votre profil de joueur ?', opts: [
      { v: 'debutant', t: 'Débutant',          d: 'Je découvre les casinos',  ic: 'M12 2l8 4v6c0 5-3.5 8.5-8 10', w: { support: 0.25, wager: 0.25 } },
      { v: 'casual',   t: 'Joueur occasionnel', d: 'Je joue pour le plaisir',  ic: 'M12 7v5l3 2', circle: true, w: { note: 0.4 } },
      { v: 'vip',      t: 'Gros joueur / VIP',  d: 'Budget confortable',       ic: 'M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4z', w: { bonus: 0.3, games: 0.2 } }
    ] }
  ];

  var quizEl = document.getElementById('mmQuiz');
  var stepsWrap = document.getElementById('mmSteps');
  var stepsHost = document.getElementById('mmStepHost');
  var backBtn = document.getElementById('mmBack');
  var resultEl = document.getElementById('mmResult');
  var modeBtns = [].slice.call(mm.querySelectorAll('.mm-mode button'));
  var winnerEl = document.getElementById('mmWinner');
  var runnersEl = document.getElementById('mmRunners');

  var mode = 'casino';
  var answers = {};
  var idx = 0;

  // build step cards
  stepsHost.innerHTML = QUESTIONS.map(function (q, qi) {
    return '<div class="mm-step' + (qi === 0 ? ' on' : '') + '" data-step="' + qi + '" data-key="' + q.key + '">' +
      '<div class="mm-qn">' + q.qn + '</div><h3>' + q.title + '</h3><div class="mm-opts">' +
      q.opts.map(function (o) {
        var svg = o.circle
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="' + o.ic + '"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="' + o.ic + '"/></svg>';
        return '<button class="mm-o" data-val="' + o.v + '"><span class="oi">' + svg + '</span><span>' + o.t + '<span class="od">' + o.d + '</span></span></button>';
      }).join('') + '</div></div>';
  }).join('');
  stepsWrap.innerHTML = QUESTIONS.map(function (_, qi) { return '<i' + (qi === 0 ? ' class="on"' : '') + '></i>'; }).join('');

  var stepCards = [].slice.call(stepsHost.querySelectorAll('.mm-step'));
  var dots = [].slice.call(stepsWrap.querySelectorAll('i'));

  function showStep(i) {
    stepCards.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('on', k <= i); });
    backBtn.classList.toggle('show', i > 0);
    idx = i;
  }

  function compute() {
    var ranked = OPS.map(function (op) {
      var s = op.note * 1.25; // light base; answers dominate
      QUESTIONS.forEach(function (q) {
        var a = answers[q.key]; if (!a) return;
        var opt = q.opts.filter(function (o) { return o.v === a; })[0];
        if (!opt) return;
        for (var k in opt.w) {
          var val = (k === 'note') ? op.note * 10 : op.c[k];
          s += val * opt.w[k];
        }
      });
      if (mode === 'bonus') { s = s * 0.4 + op.c.bonus * 0.9; } // bonus mode leans hard on bonus value
      return { op: op, s: s };
    }).sort(function (a, b) { return b.s - a.s || b.op.note - a.op.note; });
    return ranked;
  }

  function pct(rank, total, i) {
    // map score to a believable 72-98 match %
    var top = rank[0].s, bottom = rank[rank.length - 1].s, span = (top - bottom) || 1;
    var v = 72 + ((rank[i].s - bottom) / span) * 26;
    return Math.round(Math.max(64, Math.min(98, v)));
  }

  function renderResult() {
    var ranked = compute();
    var w = ranked[0].op;
    var wPct = pct(ranked, ranked.length, 0);
    winnerEl.innerHTML =
      '<span class="wtag"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/></svg> ' + (mode === 'bonus' ? 'Meilleur bonus pour vous' : 'Votre meilleur casino') + '</span>' +
      '<div class="wtop"><div class="logo-ph">' + w.logo + '</div>' +
        '<div><div class="wnm">' + w.nm + '</div><div class="wmeta"><span class="score-pill gold">' + w.score + '</span> ' + w.wagerTxt + '</div></div>' +
        '<div class="wmatch-bar"><div class="pct">' + wPct + '%</div><div class="lbl">match</div></div></div>' +
      '<div class="wbonus"><span class="ba"><span>' + w.bonus.split(' + ')[0] + '</span>' + (w.bonus.indexOf('+') > -1 ? ' + ' + w.bonus.split('+ ')[1] : '') + '</span><span class="bc">' + w.wagerTxt + '</span></div>' +
      '<p class="wwhy">' + w.why + '</p>' +
      '<a href="#" class="btn btn-primary btn-claim" data-event="affiliate_click" data-operator="' + w.op + '" data-placement="homepage_matchmaker" data-bonus="' + w.b + '" data-page-type="homepage" data-locale="fr">Obtenir le bonus <span class="arr">→</span></a>' +
      '<a href="' + w.review + '" class="wsub" data-event="review_click" data-operator="' + w.op + '">Lire l\'avis complet de ' + w.nm + ' →</a>';
    runnersEl.innerHTML = ranked.slice(1, 4).map(function (r, i) {
      return '<a class="mm-runner" href="#" data-event="affiliate_click" data-operator="' + r.op.op + '" data-placement="homepage_matchmaker_runner" data-bonus="' + r.op.b + '" data-page-type="homepage" data-locale="fr">' +
        '<span class="rrank">' + (i + 2) + '</span><div class="logo-ph">' + r.op.logo + '</div>' +
        '<div class="rinfo"><div class="rn">' + r.op.nm + '</div><div class="rb">' + r.op.bonus + '</div></div>' +
        '<span class="rpct">' + pct(ranked, ranked.length, i + 1) + '%</span>' +
        '<span class="rgo"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></span></a>';
    }).join('');
  }

  function finish() {
    quizEl.style.display = 'none';
    resultEl.classList.add('show');
    renderResult();
    if (window.dataLayer) window.dataLayer.push({ event: 'matchmaker_complete', mode: mode, answers: JSON.stringify(answers) });
  }

  stepsHost.addEventListener('click', function (e) {
    var o = e.target.closest('.mm-o'); if (!o) return;
    var step = o.closest('.mm-step');
    answers[step.getAttribute('data-key')] = o.getAttribute('data-val');
    if (idx < QUESTIONS.length - 1) showStep(idx + 1);
    else finish();
  });
  backBtn.addEventListener('click', function () { if (idx > 0) showStep(idx - 1); });

  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-mode');
      modeBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      if (resultEl.classList.contains('show')) renderResult();
    });
  });

  var restart = document.getElementById('mmRestart');
  if (restart) restart.addEventListener('click', function () {
    answers = {}; resultEl.classList.remove('show'); quizEl.style.display = ''; showStep(0);
  });

  showStep(0);
})();
