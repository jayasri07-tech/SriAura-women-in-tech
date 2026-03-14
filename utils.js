/* ACTIVITY LOG */
function logActivity(msg) {
  const log = DB.get('activity');
  log.unshift({ msg, time: new Date().toISOString() });
  if (log.length > 20) log.length = 20;
  DB.set('activity', log);
}

/* TOAST */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.getElementById('toasts').appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* COUNT-UP ANIMATION */
function countUp(el, target, dur = 1500) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const v = p * target;
    el.textContent = isFloat ? v.toFixed(1) : Math.floor(v);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* TIME AGO */
function timeAgo(t) {
  const s = Math.floor((Date.now() - new Date(t)) / 1000);
  if (s < 60) return s + 's ago';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

/* MODAL */
function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modal').classList.add('show');
}
function closeModal() {
  document.getElementById('modal').classList.remove('show');
}
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

/* THEME */
function toggleTheme() {
  const t = document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('themeToggle').textContent = t === 'light' ? '☀️' : '🌙';
  localStorage.setItem('sriaura_theme', t);
}
if (localStorage.getItem('sriaura_theme') === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  document.getElementById('themeToggle').textContent = '☀️';
}

/* PARTICLES */
(function () {
  const c = document.getElementById('particles');
  const c2 = document.getElementById('loginParticles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    c.appendChild(p.cloneNode(true));
    if (c2) c2.appendChild(p);
  }
})();
