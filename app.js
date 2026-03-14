/* ---- NAVIGATION ---- */
let currentPage = 'dashboard';

document.querySelectorAll('.nav-item').forEach(n => {
  n.addEventListener('click', () => {
    currentPage = n.dataset.page;
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    n.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + currentPage).classList.add('active');
    renderPage();
    document.querySelector('.sidebar').classList.remove('open');
  });
});

/* RENDER PAGES */
function renderPage() {
  const fn = {
    dashboard: renderDashboard,
    students: renderStudents,
    achievements: renderAchievements,
    events: renderEvents,
    mentors: renderMentors,
    analytics: renderAnalytics,
    leaderboard: renderLeaderboard
  };
  if (fn[currentPage]) fn[currentPage]();
}

function navTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => { n.classList.toggle('active', n.dataset.page === page) });
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  renderPage();
}

/* ---- SEARCH ---- */
function handleSearch(q) {
  const box = document.getElementById('searchResults');
  if (!q.trim()) { box.classList.remove('show'); return; }
  const sts = DB.get('students').filter(s => s.name.toLowerCase().includes(q.toLowerCase())).map(s => ({ cat: 'Student', label: s.name + ' — ' + s.branch, action: `viewProfile('${s.id}')` }));
  const achs = DB.get('achievements').filter(a => a.title.toLowerCase().includes(q.toLowerCase())).map(a => ({ cat: 'Achievement', label: a.title, action: `navTo('achievements')` }));
  const evts = DB.get('events').filter(e => e.title.toLowerCase().includes(q.toLowerCase())).map(e => ({ cat: 'Event', label: e.title, action: `navTo('events')` }));
  const all = [...sts, ...achs, ...evts];
  if (!all.length) { box.innerHTML = '<div class="sr-item" style="color:var(--text2)">No results found</div>'; box.classList.add('show'); return; }
  box.innerHTML = all.slice(0, 8).map(r => `<div class="sr-item" onclick="${r.action};document.getElementById('searchResults').classList.remove('show');document.getElementById('globalSearch').value=''"><div class="sr-cat">${r.cat}</div><div style="font-size:0.85rem">${r.label}</div></div>`).join('');
  box.classList.add('show');
}

document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) document.getElementById('searchResults').classList.remove('show') });

/* ---- CSV EXPORT ---- */
function exportCSV() {
  const sts = DB.get('students');
  let csv = 'Name,Roll,Branch,Year,CGPA,Skills,Aura Score\n';
  sts.forEach(s => { csv += `"${s.name}","${s.roll}","${s.branch}",${s.year},${s.cgpa},"${(s.skills || []).join('; ')}",${auraScore(s)}\n` });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'sriaura_students.csv';
  a.click();
  toast('CSV exported!', 'info');
}

/* INIT */
renderPage();
