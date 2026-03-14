# SriAura ✦ — Women in Tech Campus Intelligence System

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)

> A fully client-side DBMS application that manages women in tech 
> students on campus — demonstrating all core database concepts 
> without any backend server or SQL database.

---

## 🎯 Main Aim

To design and implement a Database Management System that tracks, 
manages, and recognizes women in tech students — demonstrating CRUD 
operations, relationships, aggregation, and data export entirely on 
the client side using localStorage as the database engine.

---

## ✨ Features

| Page | Description |
|------|-------------|
| 📊 Dashboard | Animated stats, Rising Star of Week, Branch Distribution chart |
| 👩‍💻 Students | Full CRUD — Add, Edit, View Profile, Delete students |
| 🏆 Achievements | Log Hackathon wins, Internships, Certifications, Papers |
| 📅 Events | Manage campus events, register students, Upcoming vs Past |
| 🤝 Mentors | Assign mentors to students (1:N relationship) |
| 📈 Analytics | CGPA charts, Skills donut, Monthly achievements trend |
| ✨ Aura Board | Leaderboard ranked by composite Aura Score |

---

## 🗄️ DBMS Concepts Demonstrated

- ✅ **CRUD Operations** — Create, Read, Update, Delete
- ✅ **Primary Keys** — Auto-generated unique IDs
- ✅ **Foreign Keys** — student→mentor, achievement→student
- ✅ **One-to-Many** — One mentor → Many students
- ✅ **Many-to-Many** — Students ↔ Events
- ✅ **Aggregation** — AVG(cgpa), COUNT(*), GROUP BY branch
- ✅ **Filtering** — Real-time search with WHERE-like conditions
- ✅ **Data Export** — CSV export (SELECT INTO OUTFILE concept)
- ✅ **Audit Log** — Activity feed for every CRUD action

---

## 🧮 Aura Score Formula
```
Aura = min(100, CGPA×4 + Skills×6.67 + Achievements×6.25 + Events×3.75)
```

| Component | Max Points | What it measures |
|-----------|-----------|-----------------|
| CGPA × 4 | 40 pts | Academic excellence |
| Skills × 6.67 | 20 pts | Technical breadth |
| Achievements × 6.25 | 25 pts | Recognitions & wins |
| Events × 3.75 | 15 pts | Community participation |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Glassmorphism, animations, dark/light theme
- **Vanilla JavaScript (ES6+)** — All logic, DOM, data management
- **localStorage API** — Client-side persistent database
- **Canvas API** — Custom charts (no external libraries)

> ⚡ No frameworks. No libraries. No backend. 100% hand-written.

---

## 📁 Project Structure
```
DBMS/
├── sriaura.html        # Main HTML file
├── css/
│   └── style.css       # All styles
└── js/
    ├── db.js           # Database engine (localStorage CRUD)
    ├── utils.js        # Helper functions
    ├── auth.js         # Login system
    ├── dashboard.js    # Dashboard page
    ├── students.js     # Students CRUD
    ├── achievements.js # Achievements module
    ├── events.js       # Events module
    ├── mentors.js      # Mentors module
    ├── analytics.js    # Charts & analytics
    ├── auraboard.js    # Leaderboard
    └── app.js          # Router & navigation
```

---

## 🚀 Live Demo

🔗 [View Live on GitHub Pages](https://github.com/jayasri07-tech/SriAura-women-in-tech)

---

## 👩‍💻 Why Women in Tech?

Women are underrepresented in STEM fields. SriAura is dedicated to 
giving women students visibility, recognition, and motivation through:
- A weekly **Rising Star** spotlight
- An **Aura Score** that rewards more than just grades
- The name **"Sri"** — a respectful Telugu title representing grace 
  and excellence

---

## 📚 Academic Context

- **Subject:** Database Management Systems (DBMS)
- **University:** Pimpri Chinchwad University (PCU)
- **Academic Year:** 2025–26
- **Project Type:** Mini Project

---
