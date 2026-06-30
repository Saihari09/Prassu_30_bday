/* ===============================================================
   App logic — landing animation, wish moment, music, confetti,
   firsts, map, reasons (with photos), letter typewriter.
   Reads everything from content.js.
   =============================================================== */

document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ============ SPARKLES (ambient background flair) ============ */
(function seedSparkles() {
  const layer = document.getElementById('sparkleLayer');
  if (!layer) return;
  const glyphs = ['✦', '✧', '✦', '✨', '★', '✺', '·'];
  const colors = ['#ff5a99', '#ffb627', '#ffffff', '#5ee0c1', '#ff9a78', '#d62a78'];
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle-particle';
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = '105vh';
    s.style.color = colors[i % colors.length];
    s.style.fontSize = (10 + Math.random() * 12) + 'px';
    const dur = 12 + Math.random() * 18;
    const delay = -Math.random() * dur;
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = delay + 's';
    s.style.setProperty('--sparkle-opacity', (0.35 + Math.random() * 0.45).toString());
    layer.appendChild(s);
  }
})();
document.getElementById('heroName').textContent = CONFIG.wifeName;

/* ============ HERO BACKGROUND PHOTO ============ */
const heroBg = document.getElementById('heroBg');
const landing = document.getElementById('landing');
function useGradientFallback() {
  landing.classList.add('no-photo');
  heroBg.style.background = 'linear-gradient(135deg, #ffe1ec, #f3e6ff, #fff5ec)';
}
if (WISH_MOMENT.heroPhoto) {
  const probe = new Image();
  probe.onload = () => { heroBg.style.backgroundImage = `url('${WISH_MOMENT.heroPhoto}')`; };
  probe.onerror = useGradientFallback;
  probe.src = WISH_MOMENT.heroPhoto;
} else {
  useGradientFallback();
}

/* ============ WISH LINES ============ */
const wishLinesEl = document.getElementById('wishLines');
WISH_MOMENT.wishLines.forEach((line) => {
  const p = document.createElement('p');
  p.className = 'wish-line';
  p.textContent = line;
  wishLinesEl.appendChild(p);
});

/* ============ AUDIO ============ */
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
let muted = false;
if (WISH_MOMENT.music) {
  bgMusic.src = WISH_MOMENT.music;
  bgMusic.volume = 0.4;
} else {
  muteBtn.style.display = 'none';
}
muteBtn.addEventListener('click', () => {
  muted = !muted;
  bgMusic.muted = muted;
  muteBtn.classList.toggle('muted', muted);
  muteBtn.textContent = muted ? '✕' : '♫';
});

/* ============ LANDING SEQUENCE ============ */
const cake = document.getElementById('cake');
const cakeWrap = document.getElementById('cakeWrap');
const wishMoment = document.getElementById('wishMoment');
const scrollCta = document.getElementById('scrollCta');
const nav = document.getElementById('nav');

let blown = false;
function blowCandles() {
  if (blown) return;
  blown = true;

  // 1. flames blow + confetti + music start (uses click as user gesture)
  cake.classList.add('blown');
  launchConfetti();
  if (WISH_MOMENT.music) {
    bgMusic.play().catch(() => { /* browser denied autoplay; the mute button can re-trigger */ });
  }

  // 2. cake fades, hero photo zooms in
  setTimeout(() => {
    cakeWrap.classList.add('gone');
    heroBg.classList.add('shown');
    document.querySelector('.hero-vignette').classList.add('shown');
  }, 900);

  // 3. wish moment block becomes interactive, title shows
  setTimeout(() => wishMoment.classList.add('shown'), 1700);

  // 4. wish lines fade in one by one
  const wishLineEls = document.querySelectorAll('.wish-line');
  wishLineEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('shown'), 2400 + i * 1300);
  });

  // 5. begin button after the last wish line settles
  const beginDelay = 2400 + wishLineEls.length * 1300 + 600;
  setTimeout(() => scrollCta.classList.add('shown'), beginDelay);

  // 6. nav appears alongside the begin button
  setTimeout(() => nav.classList.add('visible'), beginDelay + 300);
}
cake.addEventListener('click', blowCandles);
cake.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blowCandles(); }
});
scrollCta.addEventListener('click', () => {
  document.getElementById('firsts').scrollIntoView({ behavior: 'smooth' });
});

/* ============ CONFETTI (canvas, self-contained) ============ */
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiAnimating = false;

function sizeConfetti() {
  const dpr = window.devicePixelRatio || 1;
  confettiCanvas.width = window.innerWidth * dpr;
  confettiCanvas.height = window.innerHeight * dpr;
  confettiCanvas.style.width = window.innerWidth + 'px';
  confettiCanvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
sizeConfetti();
window.addEventListener('resize', sizeConfetti);

const COLORS = ['#e85a8a', '#c93b6e', '#d9a441', '#ffc8d8', '#f3d9ff', '#fff5ec'];

function launchConfetti() {
  const w = confettiCanvas.clientWidth;
  const h = confettiCanvas.clientHeight;
  for (let i = 0; i < 180; i++) {
    confettiParticles.push({
      x: w / 2 + (Math.random() - 0.5) * 80,
      y: h / 2 - 40,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 14 - 4,
      g: 0.32,
      size: Math.random() * 7 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      life: 0,
    });
  }
  if (!confettiAnimating) {
    confettiAnimating = true;
    requestAnimationFrame(tickConfetti);
  }
}

function tickConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.clientWidth, confettiCanvas.clientHeight);
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
    if (p.y > confettiCanvas.clientHeight + 40) confettiParticles.splice(i, 1);
  }
  if (confettiParticles.length > 0) requestAnimationFrame(tickConfetti);
  else confettiAnimating = false;
}

/* ============ FIRSTS — Pick the Memory game ============ */
const firstsGameEl = document.getElementById('firstsGame');
const firstsSection = document.getElementById('firsts');
const navFirstsLink = document.getElementById('navFirsts');
let firstsIdx = 0;
let firstsScore = 0;
let firstsAnswered = false;

function renderFirsts() {
  if (!FIRSTS || FIRSTS.length === 0) {
    firstsSection.style.display = 'none';
    if (navFirstsLink) navFirstsLink.style.display = 'none';
    return;
  }
  if (firstsIdx >= FIRSTS.length) {
    renderFirstsFinale();
    return;
  }
  firstsAnswered = false;
  const item = FIRSTS[firstsIdx];
  const total = FIRSTS.length;
  // Shuffle the 3 options each render so the correct slot moves around.
  const options = shuffle([
    { src: item.correct, isCorrect: true },
    ...item.decoys.map((src) => ({ src, isCorrect: false })),
  ]);
  firstsGameEl.innerHTML = `
    <div class="firsts-progress">${firstsIdx + 1} of ${total}</div>
    <h3 class="firsts-question">${escapeHtml(item.q)}</h3>
    <div class="firsts-options" id="firstsOptions"></div>
    <p class="firsts-reward" id="firstsReward"></p>
    <button class="primary-btn firsts-next" id="firstsNext">${firstsIdx === total - 1 ? 'see how you did →' : 'next memory →'}</button>
  `;
  const optsEl = document.getElementById('firstsOptions');
  options.forEach((o) => {
    const btn = document.createElement('button');
    btn.className = 'firsts-option';
    btn.innerHTML = `
      <img src="${escapeHtml(o.src)}" loading="lazy" alt="" />
      <div class="overlay"></div>
      <span class="label">${escapeHtml(item.label)}</span>`;
    btn.addEventListener('click', () => answerFirsts(o.isCorrect, btn, options, item));
    optsEl.appendChild(btn);
  });
  document.getElementById('firstsNext').addEventListener('click', () => {
    firstsIdx++;
    renderFirsts();
  });
}

function answerFirsts(isCorrect, clickedBtn, options, item) {
  if (firstsAnswered) return;
  firstsAnswered = true;
  const buttons = document.querySelectorAll('.firsts-option');
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (options[i].isCorrect) {
      b.classList.add('correct');
    } else if (b === clickedBtn) {
      b.classList.add('wrong');
    } else {
      b.classList.add('fade');
    }
  });
  if (isCorrect) firstsScore++;
  const rewardEl = document.getElementById('firstsReward');
  rewardEl.textContent = item.reward;
  setTimeout(() => rewardEl.classList.add('shown'), 200);
  document.getElementById('firstsNext').classList.add('shown');
}

function renderFirstsFinale() {
  const total = FIRSTS.length;
  const ratio = firstsScore / total;
  let msg;
  if (ratio === 1) msg = FIRSTS_FINALE.perfect;
  else if (ratio >= 0.6) msg = FIRSTS_FINALE.most;
  else msg = FIRSTS_FINALE.some;
  firstsGameEl.innerHTML = `
    <div class="firsts-finale">
      <p class="firsts-finale-score">${firstsScore} / ${total}</p>
      <p class="firsts-finale-msg">${escapeHtml(msg)}</p>
      <button class="ghost-btn" id="firstsRetry">↻ try again</button>
    </div>
  `;
  document.getElementById('firstsRetry').addEventListener('click', () => {
    firstsIdx = 0; firstsScore = 0; renderFirsts();
  });
}
renderFirsts();

/* ============ JOURNEY (teaser + album modal) ============ */
const journeySection = document.getElementById('journey');
const journeyGrid = document.getElementById('journeyGrid');
const journeyEmpty = document.getElementById('journeyEmpty');
const journeyTitle = document.getElementById('journeyTitle');
const journeyLede = document.getElementById('journeyLede');
const navJourneyLink = document.getElementById('navJourney');
const journeyTeaser = document.getElementById('journeyTeaser');
const teaserStack = document.getElementById('teaserStack');
const teaserCount = document.getElementById('teaserCount');
const openAlbumBtn = document.getElementById('openAlbumBtn');
const albumModal = document.getElementById('albumModal');
const albumClose = document.getElementById('albumClose');

if (typeof JOURNEY !== 'undefined') {
  journeyTitle.textContent = JOURNEY.title;
  journeyLede.textContent = JOURNEY.lede;
}

const journeyPhotos = (typeof window !== 'undefined' && Array.isArray(window.JOURNEY_PHOTOS))
  ? window.JOURNEY_PHOTOS : [];

if (journeyPhotos.length === 0) {
  journeySection.classList.add('empty');
  journeyEmpty.hidden = false;
  if (navJourneyLink) navJourneyLink.style.display = 'none';
} else {
  // Teaser: pick 5 photos spread across the relationship (start, +25%, mid, +75%, end)
  const teaserIdxs = [
    0,
    Math.floor(journeyPhotos.length * 0.25),
    Math.floor(journeyPhotos.length * 0.5),
    Math.floor(journeyPhotos.length * 0.75),
    journeyPhotos.length - 1,
  ];
  teaserIdxs.forEach((i) => {
    const p = journeyPhotos[i];
    const card = document.createElement('div');
    card.className = 'teaser-card';
    card.innerHTML = `<img src="${escapeHtml(p.src)}" loading="lazy" alt="" />`;
    teaserStack.appendChild(card);
  });
  const firstDate = formatMonth(journeyPhotos[0].date);
  const lastDate = formatMonth(journeyPhotos[journeyPhotos.length - 1].date);
  teaserCount.textContent = `${journeyPhotos.length} photos · ${firstDate} → ${lastDate}`;

  // Build the full album grid (lives inside the modal)
  const showDates = (typeof JOURNEY !== 'undefined') ? JOURNEY.showDates !== false : true;
  let lastMonth = '';
  journeyPhotos.forEach((p, idx) => {
    if (showDates && p.date && p.date !== lastMonth) {
      lastMonth = p.date;
      const div = document.createElement('div');
      div.className = 'journey-month-divider';
      div.textContent = formatMonth(p.date);
      journeyGrid.appendChild(div);
    }
    const card = document.createElement('div');
    card.className = 'journey-card';
    card.dataset.idx = idx;
    card.innerHTML = `
      <img class="photo" src="${escapeHtml(p.src)}" loading="lazy" alt="" />
      ${showDates && p.date ? `<span class="date">${escapeHtml(formatMonth(p.date))}</span>` : ''}`;
    card.addEventListener('click', () => openLightbox(idx));
    journeyGrid.appendChild(card);
  });

  // Teaser stack + button both open the album
  function openAlbum() {
    albumModal.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => albumModal.classList.add('visible'));
  }
  function closeAlbum() {
    albumModal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { albumModal.hidden = true; }, 400);
  }
  openAlbumBtn.addEventListener('click', openAlbum);
  teaserStack.addEventListener('click', openAlbum);
  teaserStack.style.cursor = 'pointer';
  albumClose.addEventListener('click', closeAlbum);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !albumModal.hidden) closeAlbum();
  });
}

function formatMonth(yyyymm) {
  if (!yyyymm || !/^\d{4}-\d{2}/.test(yyyymm)) return yyyymm || '';
  const [y, m] = yyyymm.split('-');
  const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${names[parseInt(m, 10) - 1]} ${y}`;
}

/* lightbox for journey photos */
let lightboxEl, lightboxImg, lightboxCap, lightboxIdx = 0;
function ensureLightbox() {
  if (lightboxEl) return;
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox';
  lightboxEl.hidden = true;
  lightboxEl.innerHTML = `
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
    <img alt="" />
    <button class="lightbox-nav lightbox-next" aria-label="Next">›</button>
    <p class="lightbox-caption"></p>`;
  document.body.appendChild(lightboxEl);
  lightboxImg = lightboxEl.querySelector('img');
  lightboxCap = lightboxEl.querySelector('.lightbox-caption');
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl || e.target === lightboxImg) closeLightbox();
  });
  lightboxEl.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
  lightboxEl.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
  document.addEventListener('keydown', (e) => {
    if (lightboxEl.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}
function openLightbox(idx) {
  ensureLightbox();
  lightboxIdx = idx;
  showLightboxPhoto();
  lightboxEl.hidden = false;
  requestAnimationFrame(() => lightboxEl.classList.add('visible'));
}
function closeLightbox() {
  lightboxEl.classList.remove('visible');
  setTimeout(() => { lightboxEl.hidden = true; }, 250);
}
function stepLightbox(delta) {
  lightboxIdx = (lightboxIdx + delta + journeyPhotos.length) % journeyPhotos.length;
  showLightboxPhoto();
}
function showLightboxPhoto() {
  const p = journeyPhotos[lightboxIdx];
  lightboxImg.src = p.src;
  lightboxCap.textContent = p.date ? formatMonth(p.date) : '';
}

/* ============ LEAFLET MAP ============ */
const map = L.map('leafletMap', {
  scrollWheelZoom: false,
  zoomControl: true,
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap',
}).addTo(map);

const heartIcon = L.divIcon({
  className: 'heart-pin',
  html: '<div style="width:28px;height:28px;background:#e85a8a;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 12px rgba(0,0,0,0.25)"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const bounds = [];
PLACES.forEach((p) => {
  const marker = L.marker(p.coords, { icon: heartIcon }).addTo(map);
  const photoHtml = p.photo ? `<img src="${p.photo}" alt="">` : '';
  marker.bindPopup(`<h4>${escapeHtml(p.title)}</h4><p>${p.story}</p>${photoHtml}`);
  bounds.push(p.coords);
});
if (bounds.length > 1) {
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
} else if (bounds.length === 1) {
  map.setView(bounds[0], 5);
}

/* ============ 30 REASONS (with photos) ============ */
const reasonNumber = document.getElementById('reasonNumber');
const reasonText = document.getElementById('reasonText');
const reasonPhoto = document.getElementById('reasonPhoto');
const reasonProgress = document.getElementById('reasonProgress');
const reasonPrev = document.getElementById('reasonPrev');
const reasonNext = document.getElementById('reasonNext');
const reasonCard = document.getElementById('reasonCard');
let reasonIdx = 0;

// Deterministic random photo from journey pool — same reason always gets the same photo,
// but each reason gets a different one. Skips photos already used by an explicit reason.photo.
function pickReasonPhoto(idx) {
  const explicit = REASONS[idx].photo;
  if (explicit) return explicit;
  const pool = (window.JOURNEY_PHOTOS || []).map((p) => p.src);
  if (pool.length === 0) return '';
  // Knuth multiplicative hash for a stable shuffle
  const seed = (idx * 2654435761) >>> 0;
  return pool[seed % pool.length];
}

function renderReason() {
  const total = REASONS.length;
  const reason = REASONS[reasonIdx];
  reasonText.classList.add('fading');
  reasonPhoto.classList.add('fading');

  setTimeout(() => {
    reasonNumber.textContent = reasonIdx + 1;
    reasonText.textContent = reason.text;
    reasonProgress.textContent = `${reasonIdx + 1} / ${total}`;

    const photo = pickReasonPhoto(reasonIdx);
    if (photo) {
      reasonPhoto.style.backgroundImage = `url('${photo}')`;
      reasonPhoto.classList.remove('placeholder');
    } else {
      reasonPhoto.style.backgroundImage = '';
      reasonPhoto.classList.add('placeholder');
    }

    reasonPrev.disabled = reasonIdx === 0;
    if (reasonIdx === total - 1) {
      reasonCard.classList.add('finale');
      reasonNext.textContent = '♡';
      reasonNext.disabled = true;
    } else {
      reasonCard.classList.remove('finale');
      reasonNext.textContent = 'next →';
      reasonNext.disabled = false;
    }

    reasonText.classList.remove('fading');
    reasonPhoto.classList.remove('fading');
  }, 250);
}
reasonPrev.addEventListener('click', () => { if (reasonIdx > 0) { reasonIdx--; renderReason(); } });
reasonNext.addEventListener('click', () => { if (reasonIdx < REASONS.length - 1) { reasonIdx++; renderReason(); } });
renderReason();

/* ============ QUIZ ============ */
const quizCard = document.getElementById('quizCard');
let quizIdx = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
  if (!QUIZ.questions || QUIZ.questions.length === 0) {
    document.getElementById('quiz').style.display = 'none';
    document.querySelector('a[href="#quiz"]').style.display = 'none';
    return;
  }
  if (quizIdx >= QUIZ.questions.length) {
    renderQuizFinale();
    return;
  }
  quizAnswered = false;
  const q = QUIZ.questions[quizIdx];
  const total = QUIZ.questions.length;
  quizCard.innerHTML = `
    <div class="quiz-progress">${quizIdx + 1} of ${total}</div>
    <h3 class="quiz-question">${escapeHtml(q.q)}</h3>
    <div class="quiz-options" id="quizOptions"></div>
    <p class="quiz-feedback" id="quizFeedback"></p>
    <img class="quiz-reward-photo" id="quizRewardPhoto" alt="" />
    <button class="primary-btn quiz-next" id="quizNext">${quizIdx === total - 1 ? 'see score' : 'next →'}</button>
  `;
  const optsEl = document.getElementById('quizOptions');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerQuiz(i, q));
    optsEl.appendChild(btn);
  });
  document.getElementById('quizNext').addEventListener('click', () => {
    quizIdx++;
    renderQuiz();
  });
}

function answerQuiz(picked, q) {
  if (quizAnswered) return;
  quizAnswered = true;
  const optBtns = document.querySelectorAll('.quiz-option');
  optBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
    else if (i === picked) b.classList.add('wrong');
  });
  const feedback = document.getElementById('quizFeedback');
  const photo = document.getElementById('quizRewardPhoto');
  if (picked === q.correct) {
    quizScore++;
    feedback.textContent = q.reward;
    feedback.classList.add('shown');
    if (q.photo) {
      photo.src = q.photo;
      photo.classList.add('shown');
    }
  } else {
    feedback.textContent = 'so close.';
    feedback.classList.add('shown', 'wrong');
  }
  document.getElementById('quizNext').classList.add('shown');
}

function renderQuizFinale() {
  const total = QUIZ.questions.length;
  const finaleMsg = QUIZ.finale(quizScore, total);
  quizCard.innerHTML = `
    <div class="quiz-finale">
      <p class="quiz-finale-score">${quizScore} / ${total}</p>
      <p class="quiz-finale-msg">${escapeHtml(finaleMsg)}</p>
      <button class="ghost-btn" id="quizRetry">↻ try again</button>
    </div>
  `;
  document.getElementById('quizRetry').addEventListener('click', () => {
    quizIdx = 0; quizScore = 0; renderQuiz();
  });
}
renderQuiz();

/* ============ MEMORY MATCH ============ */
const matchSection = document.getElementById('match');
const matchGrid = document.getElementById('matchGrid');
const matchStats = document.getElementById('matchStats');
const matchReset = document.getElementById('matchReset');
const navMatchLink = document.getElementById('navMatch');

let matchState = null;

function setupMatch() {
  let photos = MEMORY_MATCH.photos;
  // If MEMORY_MATCH.photos is empty, auto-pick 8 photos spread across the journey.
  if ((!photos || photos.length === 0) && Array.isArray(window.JOURNEY_PHOTOS) && window.JOURNEY_PHOTOS.length >= 8) {
    const pool = window.JOURNEY_PHOTOS;
    const picks = [];
    // 8 evenly-spaced indices across the journey so each pair feels chronologically distinct
    for (let i = 0; i < 8; i++) {
      const idx = Math.floor((i + 0.5) * pool.length / 8);
      picks.push(pool[idx].src);
    }
    photos = picks;
  }
  if (!photos || photos.length < 2) {
    matchSection.classList.add('empty');
    if (navMatchLink) navMatchLink.style.display = 'none';
    return;
  }
  matchSection.classList.remove('empty');
  if (navMatchLink) navMatchLink.style.display = '';
  // 6 photos → 12 cards (3 cols), 8 photos → 16 cards (4 cols)
  const cols = photos.length >= 8 ? 4 : 3;
  matchGrid.className = 'match-grid cols-' + cols;
  const usePhotos = photos.slice(0, cols === 4 ? 8 : 6);
  const deck = shuffle([...usePhotos, ...usePhotos].map((p, i) => ({ photo: p, id: i })));
  matchState = {
    deck,
    flipped: [],
    matchedCount: 0,
    moves: 0,
    locked: false,
  };
  matchGrid.innerHTML = '';
  deck.forEach((card, idx) => {
    const div = document.createElement('div');
    div.className = 'match-card';
    div.dataset.idx = idx;
    div.dataset.photo = card.photo;
    div.innerHTML = `
      <div class="match-card-inner">
        <div class="match-card-face match-card-back">♡</div>
        <div class="match-card-face match-card-front" style="background-image:url('${card.photo}')"></div>
      </div>`;
    div.addEventListener('click', () => flipMatchCard(idx, div));
    matchGrid.appendChild(div);
  });
  updateMatchStats();
}

function flipMatchCard(idx, el) {
  if (!matchState || matchState.locked) return;
  if (el.classList.contains('flipped') || el.classList.contains('matched')) return;
  el.classList.add('flipped');
  matchState.flipped.push({ idx, el });
  if (matchState.flipped.length === 2) {
    matchState.moves++;
    updateMatchStats();
    const [a, b] = matchState.flipped;
    if (a.el.dataset.photo === b.el.dataset.photo) {
      a.el.classList.add('matched');
      b.el.classList.add('matched');
      matchState.matchedCount++;
      matchState.flipped = [];
      updateMatchStats();
      if (matchState.matchedCount === matchState.deck.length / 2) {
        setTimeout(() => {
          showModal('🎉', 'Match!', MEMORY_MATCH.winMessage || 'You found them all.');
          launchConfetti();
        }, 700);
      }
    } else {
      matchState.locked = true;
      setTimeout(() => {
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        matchState.flipped = [];
        matchState.locked = false;
      }, 900);
    }
  }
}

function updateMatchStats() {
  if (!matchState) return;
  matchStats.textContent = `moves: ${matchState.moves} · matches: ${matchState.matchedCount} / ${matchState.deck.length / 2}`;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

matchReset.addEventListener('click', setupMatch);
setupMatch();

/* ============ HIDDEN HEARTS HUNT ============ */
const HEART_POSITIONS = [
  // landing — 4
  { section: 'landing', top: '6%',  left: '5%' },
  { section: 'landing', top: '6%',  left: '92%' },
  { section: 'landing', top: '88%', left: '8%' },
  { section: 'landing', top: '90%', left: '90%' },
  // firsts — 3 (relocates if section is hidden)
  { section: 'firsts', top: '6%',  left: '8%' },
  { section: 'firsts', top: '78%', left: '5%' },
  { section: 'firsts', top: '88%', left: '95%' },
  // journey — 4 (relocates if section is hidden)
  { section: 'journey', top: '4%',  left: '6%' },
  { section: 'journey', top: '4%',  left: '94%' },
  { section: 'journey', top: '60%', left: '3%' },
  { section: 'journey', top: '90%', left: '95%' },
  // map — 4
  { section: 'map', top: '4%',  left: '92%' },
  { section: 'map', top: '22%', left: '4%' },
  { section: 'map', top: '90%', left: '88%' },
  { section: 'map', top: '94%', left: '12%' },
  // reasons — 5
  { section: 'reasons', top: '5%',  left: '6%' },
  { section: 'reasons', top: '8%',  left: '94%' },
  { section: 'reasons', top: '50%', left: '3%' },
  { section: 'reasons', top: '52%', left: '96%' },
  { section: 'reasons', top: '92%', left: '50%' },
  // quiz — 4
  { section: 'quiz', top: '4%',  left: '12%' },
  { section: 'quiz', top: '10%', left: '88%' },
  { section: 'quiz', top: '55%', left: '3%' },
  { section: 'quiz', top: '93%', left: '50%' },
  // letter — 4
  { section: 'letter', top: '4%',  left: '8%' },
  { section: 'letter', top: '25%', left: '3%' },
  { section: 'letter', top: '40%', left: '96%' },
  { section: 'letter', top: '85%', left: '92%' },
  // match — 2 (relocates if section is hidden)
  { section: 'match', top: '5%',  left: '5%' },
  { section: 'match', top: '90%', left: '92%' },
];

const HEARTS_STORAGE_KEY = 'prassu30_hearts_found';
const TOTAL_HEARTS = HEART_POSITIONS.length;
const heartsCounter = document.getElementById('heartsCounter');
const heartsFoundEl = document.getElementById('heartsFound');

let foundHearts = new Set();
try {
  const saved = JSON.parse(localStorage.getItem(HEARTS_STORAGE_KEY) || '[]');
  foundHearts = new Set(saved);
} catch (e) { /* ignore */ }

function placeHearts() {
  // Any hidden section's hearts get relocated to letter (always visible)
  const isHidden = (id) => {
    const el = document.getElementById(id);
    if (!el) return true;
    if (el.style.display === 'none') return true;
    if (el.classList.contains('empty')) return true;
    return false;
  };
  // jitter when relocating multiple hearts to letter so they don't stack
  const relocOffsets = [0, 18, -16, 24, -22, 30];
  let relocCount = 0;
  HEART_POSITIONS.forEach((pos, i) => {
    let sectionId = pos.section;
    let top = pos.top;
    let left = pos.left;
    if (isHidden(sectionId)) {
      sectionId = 'letter';
      const jitter = relocOffsets[relocCount % relocOffsets.length];
      top = `calc(${pos.top} + ${jitter}px)`;
      left = `calc(${pos.left} + ${-jitter}px)`;
      relocCount++;
    }
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;
    const btn = document.createElement('button');
    btn.className = 'hidden-heart';
    btn.style.top = top;
    btn.style.left = left;
    btn.dataset.idx = i;
    btn.setAttribute('aria-label', 'A hidden heart');
    if (foundHearts.has(i)) {
      btn.style.display = 'none';
    }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      foundHearts.add(i);
      try { localStorage.setItem(HEARTS_STORAGE_KEY, JSON.stringify([...foundHearts])); } catch (err) {}
      btn.classList.add('found');
      setTimeout(() => btn.remove(), 600);
      updateHeartsCounter();
      if (foundHearts.size === TOTAL_HEARTS) {
        setTimeout(() => {
          showModal('♡', HIDDEN_HEARTS.finaleTitle, HIDDEN_HEARTS.finaleMessage);
          launchConfetti();
        }, 700);
      }
    });
    sectionEl.appendChild(btn);
  });
  updateHeartsCounter();
}

function updateHeartsCounter() {
  heartsFoundEl.textContent = foundHearts.size;
}

// Reveal the counter widget after the user blows out the candles, with a
// one-time expanded hint so she knows what the heart icon means.
function revealHeartsCounter() {
  setTimeout(() => {
    heartsCounter.classList.add('visible');
    heartsCounter.classList.add('pulse');
    const HINT_KEY = 'prassu30_hearts_hint_seen';
    if (!localStorage.getItem(HINT_KEY)) {
      setTimeout(() => heartsCounter.classList.add('hint-open'), 800);
      setTimeout(() => {
        heartsCounter.classList.remove('hint-open');
        try { localStorage.setItem(HINT_KEY, '1'); } catch (e) {}
      }, 7800);
    }
  }, 2500);
}

/* Hook hearts placement + counter reveal into the existing blow flow */
const _origBlow = blowCandles;
const observerForHeartsHook = null; // (just a marker — we wrap directly below)
const _existingCake = document.getElementById('cake');
// Instead of monkey-patching, listen once for the blow event via class observation:
const cakeBlownObs = new MutationObserver(() => {
  if (cake.classList.contains('blown')) {
    cakeBlownObs.disconnect();
    revealHeartsCounter();
  }
});
cakeBlownObs.observe(cake, { attributes: true, attributeFilter: ['class'] });

placeHearts();

/* ============ MODAL helpers ============ */
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalIcon = document.getElementById('modalIcon');
function showModal(icon, title, body) {
  modalIcon.textContent = icon;
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('visible'));
}
function hideModal() {
  modal.classList.remove('visible');
  setTimeout(() => { modal.hidden = true; }, 300);
}
document.getElementById('modalClose').addEventListener('click', hideModal);
modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) hideModal(); });

/* ============ LETTER (typewriter on scroll into view) ============ */
const letterBody = document.getElementById('letterBody');
const letterSignoff = document.getElementById('letterSignoff');
letterSignoff.textContent = LETTER_SIGNOFF;
let letterTyped = false;

const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !letterTyped) {
      letterTyped = true;
      typewriter(letterBody, LETTER, 18);
    }
  });
}, { threshold: 0.2 });
letterObserver.observe(letterBody);

function typewriter(el, text, speed) {
  el.textContent = '';
  let i = 0;
  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      const ch = text.charAt(i - 1);
      const delay = (ch === '.' || ch === ',' || ch === '\n') ? speed * 4 : speed;
      setTimeout(step, delay);
    }
  }
  step();
}

/* ============ utils ============ */
function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
