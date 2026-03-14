/* ---- ACHIEVEMENTS ---- */
function renderAchievements() {
  const achs = DB.get('achievements'), sts = DB.get('students');
  const types = ['Hackathon Win', 'Paper Published', 'Internship', 'Certification', 'Project'];
  const icons = { 'Hackathon Win': '🏆', 'Paper Published': '📄', 'Internship': '💼', 'Certification': '📜', 'Project': '🚀' };
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
    <h2>🏆 Achievement Tracker</h2>
    <button class="btn btn-primary" onclick="openAchModal()">+ Log Achievement</button>
  </div>
  <div class="filter-bar"><select id="achType" onchange="renderAchievements()"><option value="">All Types</option>${types.map(t => `<option>${t}</option>`).join('')}</select></div>`;
  const ft = (document.getElementById('achType') || {}).value || '';
  const filtered = ft ? achs.filter(a => a.type === ft) : achs;
  html += `<div class="grid-3">`;
  filtered.forEach(a => {
    const s = sts.find(x => x.id === a.studentId);
    html += `<div class="card"><div style="font-size:2rem;margin-bottom:10px">${icons[a.type] || '🌟'}</div><h4>${a.title}</h4><p style="color:var(--text2);font-size:0.85rem;margin:8px 0">${s ? s.name : 'Unknown'}</p><span class="badge badge-green">${a.type}</span><p style="color:var(--text2);font-size:0.75rem;margin-top:8px">${a.date}</p><button class="btn btn-danger btn-sm" style="margin-top:10px" onclick="deleteAch('${a.id}')">Delete</button></div>`;
  });
  html += `</div>`;
  document.getElementById('page-achievements').innerHTML = html;
}

function openAchModal() {
  const sts = DB.get('students');
  openModal(`<h3>Log Achievement</h3>
    <div class="form-group"><label>Student</label><select id="aStudent">${sts.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
    <div class="form-group"><label>Type</label><select id="aType"><option>Hackathon Win</option><option>Paper Published</option><option>Internship</option><option>Certification</option><option>Project</option></select></div>
    <div class="form-group"><label>Title</label><input id="aTitle"></div>
    <div class="form-group"><label>Date</label><input type="date" id="aDate"></div>
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveAch()">Log</button></div>`);
}

function saveAch() {
  const d = { studentId: document.getElementById('aStudent').value, type: document.getElementById('aType').value, title: document.getElementById('aTitle').value, date: document.getElementById('aDate').value };
  if (!d.title) { toast('Title required', 'error'); return; }
  DB.add('achievements', d);
  toast('Achievement logged!');
  closeModal();
  renderAchievements();
}

function deleteAch(id) {
  DB.delete('achievements', id);
  toast('Deleted', 'info');
  renderAchievements();
}
