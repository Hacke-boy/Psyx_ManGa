// --- CONFIGURATION ---
const COIN_REWARD_PER_CLICK = 2;
const STORAGE_KEY_AUTH = 'psyx_user';
const STORAGE_KEY_COINS = 'psyx_admin_coins';
const STORAGE_KEY_HIST = 'psyx_history';

// --- SYSTÈME D'AUTH ---
function toggleAuth() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function login() {
    const user = document.getElementById('login-user').value;
    if (user.length > 2) {
        localStorage.setItem(STORAGE_KEY_AUTH, user);
        toggleAuth();
        checkUserStatus();
    }
}

function logout() {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    checkUserStatus();
}

function checkUserStatus() {
    const user = localStorage.getItem(STORAGE_KEY_AUTH);
    const dash = document.getElementById('user-dashboard');
    const authBtn = document.getElementById('auth-btn');
    
    if (user) {
        dash.style.display = 'block';
        authBtn.style.display = 'none';
        document.getElementById('display-username').innerText = user;
        loadHistory();
    } else {
        dash.style.display = 'none';
        authBtn.style.display = 'block';
    }
}

// --- RÉMUNÉRATION AUTOMATIQUE (COINS) ---
let adminCoins = parseInt(localStorage.getItem(STORAGE_KEY_COINS)) || 0;

function addAdminCoin(amount) {
    adminCoins += amount;
    document.getElementById('admin-coins').innerText = adminCoins;
    localStorage.setItem(STORAGE_KEY_COINS, adminCoins);
}

// --- HISTORIQUE & AUTOMATISATION ---
function trackRead(title) {
    addAdminCoin(COIN_REWARD_PER_CLICK); // Gain auto pour toi
    
    let history = JSON.parse(localStorage.getItem(STORAGE_KEY_HIST)) || [];
    if (!history.includes(title)) {
        history.unshift(title);
        if (history.length > 5) history.pop();
        localStorage.setItem(STORAGE_KEY_HIST, JSON.stringify(history));
    }
    loadHistory();
    alert('Ouverture de ' + title + '... Lecture gratuite lancée !');
}

function loadHistory() {
    const box = document.getElementById('user-history');
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY_HIST)) || [];
    box.innerHTML = history.length ? history.map(h => `<div class="h-item">${h}</div>`).join('') : 'Aucun historique.';
}

// Simulation du chargement automatique (API)
async function fetchMangas() {
    // Dans le futur, ce fetch lira ton mangas.json auto-généré
    const container = document.getElementById('manga-container');
    const demoData = [
        { t: 'One Piece 1112', c: 'shonen', img: '1000031594.jpg' },
        { t: 'Jojo Part 9', c: 'seinen', img: '1000031595.jpg' }
    ];
    
    container.innerHTML = demoData.map(m => `
        <div class="manga-card ${m.c}" onclick="trackRead('${m.t}')">
            <img src="${m.img}">
            <div class="m-info"><h4>${m.t}</h4><span>GRATUIT</span></div>
        </div>
    `).join('');
}

// Initialisation
window.addEventListener('load', () => {
    checkUserStatus();
    fetchMangas();
    addAdminCoin(1); // Gain de visite
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.body.classList.remove('loading-active');
    }, 1000);
});

