/* ---- STUDENTS ---- */
function renderStudents() {
  const sts = DB.get('students');
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
    <h2>👩‍💻 Student Registry</h2>
    <button class="btn btn-primary" onclick="openStudentModal()">+ Add Student</button>
  </div>
  <div class="filter-bar">
    <input type="text" id="stuSearch" placeholder="Search by name..." oninput="renderStudents()">
    <input type="text" id="stuSkill" placeholder="Filter by skill (e.g., Python)" oninput="renderStudents()">
    <select id="stuBranch" onchange="renderStudents()"><option value="">All Branches</option><option>CSE</option><option>IT</option><option>ENTC</option><option>Mech</option></select>
    <select id="stuYear" onchange="renderStudents()"><option value="">All Years</option><option>1</option><option>2</option><option>3</option><option>4</option></select>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Name</th><th>Roll</th><th>Branch</th><th>Year</th><th>Skills</th><th>CGPA</th><th>Aura</th><th>Actions</th></tr></thead><tbody>`;
  const q = (document.getElementById('stuSearch') || {}).value || '';
  const skq = (document.getElementById('stuSkill') || {}).value || '';
  const br = (document.getElementById('stuBranch') || {}).value || '';
  const yr = (document.getElementById('stuYear') || {}).value || '';
  const filtered = sts.filter(s => {
    if (q && !s.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (skq && !s.skills.some(sk => sk.toLowerCase().includes(skq.toLowerCase()))) return false;
    if (br && s.branch !== br) return false;
    if (yr && s.year != yr) return false;
    return true;
  });
  filtered.forEach(s => {
    const au = auraScore(s);
    html += `<tr><td><strong>${s.name}</strong></td><td>${s.roll}</td><td><span class="badge badge-violet">${s.branch}</span></td><td>${s.year}</td><td><div style="display:flex;gap:4px;flex-wrap:wrap;max-width:150px">${(s.skills || []).slice(0, 2).map(sk => `<span class="badge" style="background:var(--card2);font-size:0.65rem">${sk}</span>`).join('')}${(s.skills || []).length > 2 ? `<span class="badge" style="background:var(--card2);font-size:0.65rem">+${s.skills.length - 2}</span>` : ''}</div></td><td>${s.cgpa}</td><td><div style="display:flex;align-items:center;gap:8px"><span style="color:var(--rose);font-weight:600">${au}</span><div class="aura-bar" style="width:60px;margin-top:0"><div class="aura-fill" style="width:${au}%"></div></div></div></td><td style="display:flex;gap:6px"><button class="btn btn-secondary btn-sm" onclick="viewProfile('${s.id}')" title="View">👁️</button><button class="btn btn-secondary btn-sm" onclick="openStudentModal('${s.id}')" title="Edit">✏️</button><button class="btn btn-danger btn-sm" onclick="deleteStudent('${s.id}')" title="Delete">🗑️</button></td></tr>`;
  });
  html += `</tbody></table></div>`;
  document.getElementById('page-students').innerHTML = html;
}

function openStudentModal(id) {
  const s = id ? DB.find('students', id) : {};
  openModal(`<h3>${id ? 'Edit' : 'Add'} Student</h3>
    <div class="form-group"><label>Name</label><input id="fName" value="${s.name || ''}"></div>
    <div class="form-group"><label>Roll No</label><input id="fRoll" value="${s.roll || ''}"></div>
    <div class="form-group"><label>Branch</label><select id="fBranch"><option ${s.branch === 'CSE' ? 'selected' : ''}>CSE</option><option ${s.branch === 'IT' ? 'selected' : ''}>IT</option><option ${s.branch === 'ENTC' ? 'selected' : ''}>ENTC</option><option ${s.branch === 'Mech' ? 'selected' : ''}>Mech</option></select></div>
    <div class="form-group"><label>Year</label><select id="fYear"><option ${s.year == 1 ? 'selected' : ''}>1</option><option ${s.year == 2 ? 'selected' : ''}>2</option><option ${s.year == 3 ? 'selected' : ''}>3</option><option ${s.year == 4 ? 'selected' : ''}>4</option></select></div>
    <div class="form-group"><label>CGPA</label><input type="number" step="0.1" min="0" max="10" id="fCgpa" value="${s.cgpa || ''}"></div>
    <div class="form-group"><label>Skills (comma separated)</label><input id="fSkills" value="${(s.skills || []).join(', ')}"></div>
    <div class="form-group"><label>LinkedIn URL</label><input id="fLinkedin" value="${s.linkedin || ''}"></div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveStudent('${id || ''}')">${id ? 'Update' : 'Add'}</button>
    </div>`);
}

function saveStudent(id) {
  const d = {
    name: document.getElementById('fName').value,
    roll: document.getElementById('fRoll').value,
    branch: document.getElementById('fBranch').value,
    year: parseInt(document.getElementById('fYear').value),
    cgpa: parseFloat(document.getElementById('fCgpa').value),
    skills: document.getElementById('fSkills').value.split(',').map(s => s.trim()).filter(Boolean),
    linkedin: document.getElementById('fLinkedin').value
  };
  if (!d.name || !d.roll) { toast('Name and Roll are required', 'error'); return; }
  if (id) { DB.update('students', id, d); toast('Student updated!'); }
  else { DB.add('students', d); toast('Student added!'); }
  closeModal();
  renderStudents();
}

function deleteStudent(id) {
  if (confirm('Delete this student?')) {
    DB.delete('students', id);
    toast('Student deleted', 'info');
    renderStudents();
  }
}

function viewProfile(id) {
  const s = DB.find('students', id);
  if (!s) return;
  const m = DB.find('mentors', s.mentor);
  const achs = DB.get('achievements').filter(a => a.studentId === id);
  const evts = DB.get('events').filter(e => (e.participants || []).includes(id));
  const au = auraScore(s);
  openModal(`<div class="profile-header"><div class="avatar">${s.name[0]}</div><div><h3>${s.name}</h3><p style="color:var(--text2)">${s.roll} • ${s.branch} • Year ${s.year}</p></div></div>
    <div style="margin:15px 0"><strong>CGPA:</strong> ${s.cgpa} &nbsp; <strong>Aura Score:</strong> <span style="color:var(--rose)">${au}</span></div>
    <div class="aura-bar"><div class="aura-fill" style="width:${au}%"></div></div>
    <div style="margin:15px 0"><strong>Skills:</strong> ${(s.skills || []).map(sk => `<span class="badge badge-violet">${sk}</span>`).join(' ')}</div>
    ${m ? `<div style="margin:15px 0;padding:12px;background:var(--card2);border-radius:10px"><strong>🤝 My Mentor:</strong> ${m.name} (${m.expertise})<br><span style="color:var(--text2);font-size:0.8rem">${m.contact}</span></div>` : ''}
    <div style="margin:15px 0"><strong>🏆 Achievements (${achs.length}):</strong>${achs.map(a => `<div class="feed-item"><span class="feed-dot"></span>${a.title} <span class="badge badge-green">${a.type}</span></div>`).join('') || ' None yet'}</div>
    <div><strong>📅 Events (${evts.length}):</strong>${evts.map(e => `<div class="feed-item"><span class="feed-dot"></span>${e.title}</div>`).join('') || ' None yet'}</div>
    ${s.linkedin ? `<div style="margin-top:15px"><a href="${s.linkedin}" target="_blank" style="color:var(--violet2)">🔗 LinkedIn Profile</a></div>` : ''}
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Close</button></div>`);
}
