/* AURA SCORE */
function auraScore(s) {
  const achs = DB.get('achievements').filter(a => a.studentId === s.id).length;
  const evts = DB.get('events').filter(e => (e.participants || []).includes(s.id)).length;
  return Math.min(100, Math.round(s.cgpa * 4 + (s.skills || []).length * 6.67 + achs * 6.25 + evts * 3.75));
}

/* ---- LEADERBOARD ---- */
function renderLeaderboard() {
  const sts = DB.get('students').map(s => ({ ...s, aura: auraScore(s) })).sort((a, b) => b.aura - a.aura);
  const crowns = ['👑', '🥈', '🥉'];
  let html = `<h2 style="margin-bottom:5px">✨ Aura Leaderboard</h2>
    <p style="color:var(--text2);font-style:italic;margin-bottom:25px">"Every girl has an Aura. Here's yours. ✦"</p>
    <div class="card">`;
  sts.forEach((s, i) => {
    html += `<div class="lb-row" style="${i < 3 ? 'background:rgba(124,58,237,0.05)' : ''}">
      <div class="lb-rank">${i < 3 ? `<span class="crown">${crowns[i]}</span>` : (i + 1)}</div>
      <div class="avatar" style="width:40px;height:40px;font-size:1rem">${s.name[0]}</div>
      <div><strong>${s.name}</strong><br><span style="color:var(--text2);font-size:0.8rem">${s.branch} — Year ${s.year} — CGPA ${s.cgpa}</span></div>
      <div class="lb-score">${s.aura}<div class="aura-bar" style="width:80px;margin-top:4px"><div class="aura-fill" style="width:${s.aura}%"></div></div></div>
    </div>`;
  });
  html += `</div>`;
  document.getElementById('page-leaderboard').innerHTML = html;
}
