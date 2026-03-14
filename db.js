/* ====================
   DB TABLES - localStorage DBMS
   ==================== */
const DB = {
  get(t) { return JSON.parse(localStorage.getItem('sriaura_' + t) || '[]'); },
  set(t, d) { localStorage.setItem('sriaura_' + t, JSON.stringify(d)); },
  add(t, r) {
    const d = this.get(t);
    r.id = Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    d.push(r);
    this.set(t, d);
    logActivity('Added ' + t.slice(0, -1) + ': ' + (r.name || r.title || r.type));
    return r;
  },
  update(t, id, r) {
    const d = this.get(t).map(x => x.id === id ? { ...x, ...r } : x);
    this.set(t, d);
    logActivity('Updated ' + t.slice(0, -1));
  },
  delete(t, id) {
    this.set(t, this.get(t).filter(x => x.id !== id));
    logActivity('Deleted ' + t.slice(0, -1));
  },
  find(t, id) { return this.get(t).find(x => x.id === id); },
};

/* SEED DATA */
function seedData() {
  if (localStorage.getItem('sriaura_seeded')) return;
  const students = [
    { id: 's1', name: 'Sarala', roll: 'CS201', branch: 'CSE', year: 2, cgpa: 8.6, skills: ['Python', 'DSA', 'MySQL'], linkedin: '', mentor: 'm1' },
    { id: 's2', name: 'Jaya Sri', roll: 'CS301', branch: 'CSE', year: 3, cgpa: 9.4, skills: ['ML', 'React', 'Streamlit'], linkedin: '', mentor: 'm2' },
    { id: 's3', name: 'Charishma', roll: 'IT201', branch: 'IT', year: 2, cgpa: 8.9, skills: ['Java', 'Flutter', 'Firebase'], linkedin: '', mentor: 'm1' },
    { id: 's4', name: 'Lavanya', roll: 'EC301', branch: 'ENTC', year: 3, cgpa: 8.3, skills: ['IoT', 'Arduino', 'C++'], linkedin: '', mentor: 'm3' },
    { id: 's5', name: 'Padmaja', roll: 'CS401', branch: 'CSE', year: 4, cgpa: 9.1, skills: ['AI', 'NLP', 'FastAPI'], linkedin: '', mentor: 'm2' },
    { id: 's6', name: 'Priyanka', roll: 'IT101', branch: 'IT', year: 1, cgpa: 8.7, skills: ['HTML', 'CSS', 'JavaScript'], linkedin: '', mentor: 'm3' },
    { id: 's7', name: 'Jaya Lakshmi', roll: 'ME301', branch: 'Mech', year: 3, cgpa: 7.9, skills: ['CAD', 'Python', 'Robotics'], linkedin: '', mentor: 'm4' },
    { id: 's8', name: 'Manga Ratnam', roll: 'CS402', branch: 'CSE', year: 4, cgpa: 9.5, skills: ['Data Science', 'SQL', 'Tableau'], linkedin: '', mentor: 'm4' },
  ];
  const mentors = [
    { id: 'm1', name: 'Dr. Kavitha', expertise: 'Data Science', contact: 'kavitha@univ.edu' },
    { id: 'm2', name: 'Prof. Meera', expertise: 'Machine Learning', contact: 'meera@univ.edu' },
    { id: 'm3', name: 'Dr. Shalini', expertise: 'IoT & Embedded', contact: 'shalini@univ.edu' },
    { id: 'm4', name: 'Prof. Anuradha', expertise: 'Robotics & AI', contact: 'anuradha@univ.edu' },
  ];
  const achievements = [
    { id: 'a1', studentId: 's2', type: 'Hackathon Win', title: 'Won Smart India Hackathon', date: '2026-01-15' },
    { id: 'a2', studentId: 's8', type: 'Paper Published', title: 'IEEE Paper on Data Mining', date: '2026-02-10' },
    { id: 'a3', studentId: 's5', type: 'Internship', title: 'Google Summer Intern', date: '2025-12-01' },
    { id: 'a4', studentId: 's1', type: 'Certification', title: 'AWS Cloud Practitioner', date: '2026-02-20' },
    { id: 'a5', studentId: 's3', type: 'Project', title: 'Flutter Health App', date: '2026-01-28' },
    { id: 'a6', studentId: 's2', type: 'Certification', title: 'TensorFlow Developer Cert', date: '2025-11-15' },
    { id: 'a7', studentId: 's6', type: 'Hackathon Win', title: 'CodeStorm 2026 Winner', date: '2026-03-01' },
  ];
  const events = [
    { id: 'e1', title: 'AI Workshop 2026', type: 'Workshop', date: '2026-03-20', participants: ['s1', 's2', 's5'] },
    { id: 'e2', title: 'HackHer 2026', type: 'Hackathon', date: '2026-02-15', participants: ['s2', 's3', 's6', 's7'] },
    { id: 'e3', title: 'Women in STEM Seminar', type: 'Seminar', date: '2026-04-10', participants: ['s1', 's4', 's5', 's8'] },
    { id: 'e4', title: 'Ideathon Spring', type: 'Ideathon', date: '2026-01-25', participants: ['s2', 's5', 's8'] },
  ];
  DB.set('students', students);
  DB.set('mentors', mentors);
  DB.set('achievements', achievements);
  DB.set('events', events);
  DB.set('activity', [
    { msg: 'Manga Ratnam earned Rising Star', time: '2026-03-10T08:00:00Z' },
    { msg: 'New event: AI Workshop 2026', time: '2026-03-09T10:00:00Z' },
    { msg: 'Jaya Sri won Smart India Hackathon', time: '2026-01-15T12:00:00Z' },
    { msg: 'Priyanka joined CodeStorm', time: '2026-03-01T09:00:00Z' },
    { msg: 'System initialized with 8 students', time: '2026-03-08T08:00:00Z' },
  ]);
  localStorage.setItem('sriaura_seeded', '1');
}
seedData();
