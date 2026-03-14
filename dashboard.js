/* ---- DASHBOARD ---- */
function renderDashboard() {
  const sts = DB.get('students'), achs = DB.get('achievements'), evts = DB.get('events'), acts = DB.get('activity');
  const avgCGPA = sts.length ? (sts.reduce((a, b) => a + b.cgpa, 0) / sts.length).toFixed(1) : 0;
  const star = sts.sort((a, b) => b.cgpa - a.cgpa)[0];
  const thisMonth = achs.filter(a => { const d = new Date(a.date); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear() }).length;
  const upcoming = evts.filter(e => new Date(e.date) >= new Date()).length;

  // Branch distribution
  const branches = {};
  sts.forEach(s => branches[s.branch] = (branches[s.branch] || 0) + 1);
  const bColors = ['#7c3aed', '#e8a87c', '#10b981', '#3b82f6'];
  let donutGrad = '', offset = 0;
  const bEntries = Object.entries(branches);
  bEntries.forEach(([b, c], i) => { const pct = c / sts.length * 100; donutGrad += `${bColors[i % 4]} ${offset}% ${offset + pct}%,`; offset += pct });
  donutGrad = donutGrad.slice(0, -1);

  document.getElementById('page-dashboard').innerHTML = `
    <h2 style="margin-bottom:20px">📊 Dashboard</h2>
    <div class="stat-cards">
      <div class="stat-card"><div class="icon-bg" style="background:rgba(124,58,237,0.15)">👩‍💻</div><div class="label">Total Students</div><div class="value" data-count="${sts.length}">0</div></div>
      <div class="stat-card"><div class="icon-bg" style="background:rgba(16,185,129,0.15)">📈</div><div class="label">Avg CGPA</div><div class="value" data-count="${avgCGPA}">0</div></div>
      <div class="stat-card"><div class="icon-bg" style="background:rgba(232,168,124,0.15)">🏆</div><div class="label">Achievements This Month</div><div class="value" data-count="${thisMonth}">0</div></div>
      <div class="stat-card"><div class="icon-bg" style="background:rgba(59,130,246,0.15)">📅</div><div class="label">Upcoming Events</div><div class="value" data-count="${upcoming}">0</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3>⭐ Rising Star of the Week</h3>
        ${star ? `<div class="profile-header"><div class="avatar">${star.name[0]}</div><div><h4>${star.name}</h4><p style="color:var(--text2)">${star.branch} — Year ${star.year} — CGPA ${star.cgpa}</p><div style="margin-top:6px">${(star.skills || []).map(s => `<span class="badge badge-violet">${s}</span> `).join('')}</div></div></div><div style="font-size:0.85rem;color:var(--text2)">Aura Score: <strong style="color:var(--rose)">${auraScore(star)}</strong></div><div class="aura-bar"><div class="aura-fill" style="width:${auraScore(star)}%"></div></div>` : 'No students yet.'}
      </div>
      <div class="card">
        <h3>🍩 Branch Distribution</h3>
        <div class="donut-chart" style="background:conic-gradient(${donutGrad})"><div class="donut-center">${sts.length}</div></div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:15px;flex-wrap:wrap">
          ${bEntries.map(([b, c], i) => `<span style="display:flex;align-items:center;gap:4px;font-size:0.8rem"><span style="width:10px;height:10px;border-radius:2px;background:${bColors[i % 4]};display:inline-block"></span>${b} (${c})</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:20px">
      <h3>📝 Recent Activity</h3>
      ${acts.slice(0, 5).map(a => `<div class="feed-item"><span class="feed-dot"></span><span style="font-size:0.85rem">${a.msg}</span><span class="feed-time">${timeAgo(a.time)}</span></div>`).join('')}
    </div>`;
  // Count-up
  document.querySelectorAll('[data-count]').forEach(el => countUp(el, parseFloat(el.dataset.count)));
}
