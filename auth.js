/* LOGIN */
function checkLogin() {
  const p = document.getElementById('passcode').value;
  if (p === 'aura2026' || localStorage.getItem('sriaura_auth') === '1') {
    localStorage.setItem('sriaura_auth', '1');
    document.getElementById('loginScreen').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('mainApp').classList.add('visible');
    }, 500);
  } else {
    const err = document.getElementById('loginError');
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 3000);
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem('sriaura_auth');
  location.reload();
}

/* Auto-login if previously authenticated */
if (localStorage.getItem('sriaura_auth') === '1') checkLogin();
