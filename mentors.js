/* ---- MENTORS ---- */
function renderMentors() {
  const ms=DB.get('mentors'),sts=DB.get('students');
  let html=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
    <h2>🤝 Mentor Mapping</h2>
    <button class="btn btn-primary" onclick="openMentorModal()">+ Add Mentor</button>
  </div>
  <div class="table-wrap"><table><thead><tr><th>Mentor</th><th>Expertise</th><th>Contact</th><th>Students Assigned</th><th>Actions</th></tr></thead><tbody>`;
  ms.forEach(m=>{
    const assigned=sts.filter(s=>s.mentor===m.id);
    html+=`<tr><td><strong>${m.name}</strong></td><td><span class="badge badge-green">${m.expertise}</span></td><td style="color:var(--text2);font-size:0.85rem">${m.contact}</td><td>${assigned.map(s=>`<span class="badge badge-violet">${s.name}</span>`).join(' ')||'None'}</td><td><button class="btn btn-secondary btn-sm" onclick="assignMentor('${m.id}')">Assign</button> <button class="btn btn-danger btn-sm" onclick="deleteMentor('${m.id}')">🗑️</button></td></tr>`;
  });
  html+=`</tbody></table></div>`;
  document.getElementById('page-mentors').innerHTML=html;
}

function openMentorModal() {
  openModal(`<h3>Add Mentor</h3>
    <div class="form-group"><label>Name</label><input id="mName"></div>
    <div class="form-group"><label>Expertise</label><input id="mExpert"></div>
    <div class="form-group"><label>Contact</label><input id="mContact"></div>
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveMentor()">Add</button></div>`);
}

function saveMentor() {
  const d={name:document.getElementById('mName').value,expertise:document.getElementById('mExpert').value,contact:document.getElementById('mContact').value};
  if(!d.name){toast('Name required','error');return}
  DB.add('mentors',d);toast('Mentor added!');closeModal();renderMentors();
}

function deleteMentor(id){DB.delete('mentors',id);toast('Deleted','info');renderMentors()}

function assignMentor(mid) {
  const sts=DB.get('students').filter(s=>s.mentor!==mid);
  if(!sts.length){toast('All assigned','info');return}
  openModal(`<h3>Assign Student</h3>
    <div class="form-group"><label>Student</label><select id="asStu">${sts.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="doAssign('${mid}')">Assign</button></div>`);
}

function doAssign(mid) {
  const sid=document.getElementById('asStu').value;
  DB.update('students',sid,{mentor:mid});toast('Assigned!');closeModal();renderMentors();
}
