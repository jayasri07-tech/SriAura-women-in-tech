/* ---- EVENTS ---- */
function renderEvents() {
  const evts = DB.get('events'), sts = DB.get('students');
  const now = new Date();
  let activeTab = (document.querySelector('#page-events .tab.active') || {}).dataset || {};
  const tab = activeTab.tab || 'upcoming';
  let html = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px">
    <h2>📅 Event Management</h2>
    <button class="btn btn-primary" onclick="openEventModal()">+ Add Event</button>
  </div>
  <div class="tabs"><div class="tab ${tab === 'upcoming' ? 'active' : ''}" data-tab="upcoming" onclick="this.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');renderEvents()">Upcoming</div><div class="tab ${tab === 'past' ? 'active' : ''}" data-tab="past" onclick="this.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));this.classList.add('active');renderEvents()">Past</div></div>`;
  const filtered = evts.filter(e => tab === 'upcoming' ? new Date(e.date) >= now : new Date(e.date) < now);
  html += `<div class="grid-3">`;
  filtered.forEach(e => {
    const pNames = (e.participants||[]).map(pid => {const s=sts.find(x=>x.id===pid);return s?`<span class="badge badge-violet">${s.name}</span>`:''}).join('');
    html += `<div class="card"><span class="badge badge-rose">${e.type}</span><h4 style="margin-top:10px">${e.title}</h4><p style="color:var(--text2);font-size:0.85rem;margin:8px 0">📅 ${e.date}</p><p style="font-size:0.85rem">👥 ${(e.participants||[]).length} participants</p><div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">${pNames}</div><div style="margin-top:12px;display:flex;gap:6px"><button class="btn btn-secondary btn-sm" onclick="regStudentToEvent('${e.id}')">+ Register</button><button class="btn btn-danger btn-sm" onclick="deleteEvent('${e.id}')">🗑️</button></div></div>`;
  });
  html += `</div>`;
  document.getElementById('page-events').innerHTML = html;
}

function openEventModal() {
  openModal(`<h3>Add Event</h3>
    <div class="form-group"><label>Title</label><input id="eTitle"></div>
    <div class="form-group"><label>Type</label><select id="eType"><option>Workshop</option><option>Hackathon</option><option>Seminar</option><option>Ideathon</option></select></div>
    <div class="form-group"><label>Date</label><input type="date" id="eDate"></div>
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveEvent()">Add</button></div>`);
}

function saveEvent() {
  const d = {title:document.getElementById('eTitle').value,type:document.getElementById('eType').value,date:document.getElementById('eDate').value,participants:[]};
  if(!d.title){toast('Title required','error');return}
  DB.add('events',d);toast('Event added!');closeModal();renderEvents();
}

function deleteEvent(id){DB.delete('events',id);toast('Deleted','info');renderEvents()}

function regStudentToEvent(eid) {
  const sts=DB.get('students'),ev=DB.find('events',eid);
  const avail=sts.filter(s=>!(ev.participants||[]).includes(s.id));
  if(!avail.length){toast('All students registered','info');return}
  openModal(`<h3>Register Student to ${ev.title}</h3>
    <div class="form-group"><label>Student</label><select id="regStu">${avail.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
    <div class="modal-actions"><button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="doReg('${eid}')">Register</button></div>`);
}

function doReg(eid) {
  const sid=document.getElementById('regStu').value;
  const evts=DB.get('events').map(e=>{if(e.id===eid){(e.participants=e.participants||[]).push(sid)}return e});
  DB.set('events',evts);logActivity('Registered student to event');toast('Registered!');closeModal();renderEvents();
}
