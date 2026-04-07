/* ===========================
   PSYX-MANGA | EMPIRE EDITION
   app.js — Core Logic
=========================== */

// ── DATA ──
const MANGAS = [
  {
    id: 1, title: "One Piece", author: "Eiichiro Oda",
    genre: "shonen", chapters: 1112, status: "En cours",
    rating: 9.8, views: "12.4M",
    color1: "#1a4080", color2: "#0d2550",
    tags: ["Aventure", "Action", "Comédie"],
    synopsis: "Monkey D. Luffy, un jeune garçon qui a accidentellement mangé le Fruit du Démon Gom Gom, rêve de devenir le Roi des Pirates — le seul à avoir tout liberté sur les mers.",
    new: true, trending: true
  },
  {
    id: 2, title: "Jujutsu Kaisen", author: "Gege Akutami",
    genre: "shonen", chapters: 267, status: "En cours",
    rating: 9.2, views: "8.1M",
    color1: "#2d1b4e", color2: "#1a0d2e",
    tags: ["Action", "Surnaturel", "Horreur"],
    synopsis: "Yuji Itadori avale un doigt maudit et se retrouve possédé par le plus puissant des esprits maudits. Il intègre alors l'école des sorciers jujutsu pour expier ses péchés.",
    new: true, trending: true
  },
  {
    id: 3, title: "Berserk", author: "Kentaro Miura",
    genre: "seinen", chapters: 374, status: "En cours",
    rating: 9.9, views: "7.8M",
    color1: "#1f0a0a", color2: "#0f0505",
    tags: ["Dark Fantasy", "Action", "Drame"],
    synopsis: "Guts, un mercenaire solitaire armé d'une épée colossale, erre dans un monde médiéval sombre, poursuivi par des démons. Sa quête de vengeance contre son ancien ami Griffith le plonge dans les ténèbres.",
    new: false, trending: true
  },
  {
    id: 4, title: "Chainsaw Man", author: "Tatsuki Fujimoto",
    genre: "shonen", chapters: 168, status: "En cours",
    rating: 9.4, views: "6.5M",
    color1: "#4a1a1a", color2: "#2d0f0f",
    tags: ["Action", "Horreur", "Comédie"],
    synopsis: "Denji, un jeune homme pauvre, fusionne avec son chien-démon Pochita pour devenir Chainsaw Man — un chasseur de démons doté de tronçonneuses.",
    new: true, trending: true
  },
  {
    id: 5, title: "Vinland Saga", author: "Makoto Yukimura",
    genre: "seinen", chapters: 210, status: "En cours",
    rating: 9.5, views: "5.2M",
    color1: "#1a2d1a", color2: "#0d1f0d",
    tags: ["Historique", "Action", "Drame"],
    synopsis: "Thorfinn grandit en écoutant les récits de vieux navigateurs qui ont fait un long voyage jusqu'à une terre légendaire appelée Vinland. Son destin bascule quand son père est assassiné.",
    new: false, trending: true
  },
  {
    id: 6, title: "Attack on Titan", author: "Hajime Isayama",
    genre: "shonen", chapters: 139, status: "Terminé",
    rating: 9.7, views: "11.2M",
    color1: "#2a2010", color2: "#1a1308",
    tags: ["Action", "Drame", "Post-Apocalyptique"],
    synopsis: "Dans un monde où l'humanité vit derrière de gigantesques murs pour se protéger des Titans, Eren Jäger jure de les exterminer tous après que sa mère soit dévorée.",
    new: false, trending: true
  },
  {
    id: 7, title: "Dragon Ball Super", author: "Akira Toriyama",
    genre: "shonen", chapters: 103, status: "En cours",
    rating: 8.8, views: "9.1M",
    color1: "#1a1a40", color2: "#0d0d28",
    tags: ["Action", "Aventure", "Combat"],
    synopsis: "Suite directe de Dragon Ball Z, les aventures de Goku se poursuivent dans un univers encore plus vaste avec de nouveaux adversaires divins.",
    new: true, trending: false
  },
  {
    id: 8, title: "Demon Slayer", author: "Koyoharu Gotouge",
    genre: "shonen", chapters: 205, status: "Terminé",
    rating: 9.1, views: "10.3M",
    color1: "#1f1040", color2: "#120a28",
    tags: ["Action", "Surnaturel", "Période Taisho"],
    synopsis: "Tanjiro Kamado devient un chasseur de démons après que sa famille est massacrée et sa sœur transformée en démon. Il cherche un remède pour rendre Nezuko humaine.",
    new: false, trending: false
  },
  {
    id: 9, title: "Vagabond", author: "Takehiko Inoue",
    genre: "seinen", chapters: 327, status: "En pause",
    rating: 9.8, views: "4.7M",
    color1: "#20180a", color2: "#140f05",
    tags: ["Historique", "Arts Martiaux", "Drame"],
    synopsis: "Basé sur la vie de Miyamoto Musashi, le plus grand samouraï du Japon. Une histoire de guerre, de sagesse et de quête de l'invincibilité.",
    new: false, trending: false
  },
  {
    id: 10, title: "Tokyo Ghoul", author: "Sui Ishida",
    genre: "seinen", chapters: 179, status: "Terminé",
    rating: 8.9, views: "7.3M",
    color1: "#0a1a20", color2: "#051014",
    tags: ["Horreur", "Action", "Surnaturel"],
    synopsis: "Ken Kaneki devient mi-humain, mi-goule après une rencontre tragique. Il doit naviguer entre les deux mondes tout en cherchant sa place dans ce monde violent.",
    new: false, trending: false
  },
  {
    id: 11, title: "Death Note", author: "Tsugumi Ohba",
    genre: "shonen", chapters: 108, status: "Terminé",
    rating: 9.6, views: "9.8M",
    color1: "#101020", color2: "#080810",
    tags: ["Thriller", "Psychologique", "Surnaturel"],
    synopsis: "Light Yagami trouve un cahier qui tue quiconque dont le nom y est inscrit. Il décide de l'utiliser pour créer un monde parfait, mais un détective de génie s'y oppose.",
    new: false, trending: false
  },
  {
    id: 12, title: "Naruto", author: "Masashi Kishimoto",
    genre: "shonen", chapters: 700, status: "Terminé",
    rating: 9.3, views: "13.6M",
    color1: "#2a1a00", color2: "#1a1000",
    tags: ["Action", "Aventure", "Arts Martiaux"],
    synopsis: "Naruto Uzumaki, un jeune ninja rejeté de son village, rêve de devenir Hokage pour être reconnu de tous. Son chemin sera parsemé d'amis, d'ennemis et de sacrifices.",
    new: false, trending: false
  },
  {
    id: 13, title: "Fullmetal Alchemist", author: "Hiromu Arakawa",
    genre: "shonen", chapters: 108, status: "Terminé",
    rating: 9.7, views: "8.4M",
    color1: "#2a1a00", color2: "#1a1000",
    tags: ["Aventure", "Action", "Drame"],
    synopsis: "Les frères Elric tentent de ramener leur mère à la vie par alchimie, mais le résultat est désastreux. Ils partent à la recherche de la Pierre Philosophale pour récupérer leurs corps.",
    new: false, trending: false
  },
  {
    id: 14, title: "Spy × Family", author: "Tatsuya Endo",
    genre: "shonen", chapters: 102, status: "En cours",
    rating: 9.0, views: "5.9M",
    color1: "#1a1a3a", color2: "#0f0f24",
    tags: ["Comédie", "Action", "Famille"],
    synopsis: "Un espion doit créer une fausse famille pour accomplir sa mission. Il adopte une enfant télépathe et épouse une assassine, sans que personne ne sache la vérité.",
    new: true, trending: false
  },
  {
    id: 15, title: "Oyasumi Punpun", author: "Inio Asano",
    genre: "seinen", chapters: 147, status: "Terminé",
    rating: 9.4, views: "3.2M",
    color1: "#101015", color2: "#0a0a0f",
    tags: ["Slice of Life", "Psychologique", "Drame"],
    synopsis: "L'histoire de la croissance de Punpun Onodera, un enfant ordinaire, représenté comme une petite silhouette d'oiseau abstraite, qui vit dans un monde cruel et magnifique.",
    new: false, trending: false
  },
  {
    id: 16, title: "Bleach", author: "Tite Kubo",
    genre: "shonen", chapters: 686, status: "Terminé",
    rating: 8.7, views: "8.9M",
    color1: "#0a0a20", color2: "#050510",
    tags: ["Action", "Surnaturel", "Aventure"],
    synopsis: "Ichigo Kurosaki, lycéen ordinaire, peut voir les esprits. Après avoir acquis les pouvoirs d'une Shinigami, il doit protéger sa ville contre les Hollows.",
    new: false, trending: false
  }
];

// ── STATE ──
let currentFilter = "all";
let currentSearch = "";
let currentSort = "popular";
let currentUser = null;
let coins = 0;

// ── INIT ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
  }, 2000);

  loadUser();
  renderTrending();
  renderMain();
  bindEvents();
});

// ── RENDER CARDS ──
function createCard(manga) {
  const card = document.createElement('div');
  card.className = 'manga-card';
  card.onclick = () => openDetail(manga);

  const isNew = manga.new ? '<div class="card-badge">NOUVEAU</div>' : '';

  card.innerHTML = `
    ${isNew}
    <div class="card-cover-placeholder" style="background: linear-gradient(135deg, ${manga.color1}, ${manga.color2})">
      <span>${manga.title}</span>
    </div>
    <div class="card-overlay">
      <div class="card-overlay-genres">
        ${manga.tags.slice(0,2).map(t => `<span class="card-overlay-genre">${t}</span>`).join('')}
      </div>
      <button class="card-overlay-read">▶ LIRE</button>
    </div>
    <div class="card-info">
      <div class="card-title">${manga.title}</div>
      <div class="card-meta">
        <span class="card-genre">${manga.genre.toUpperCase()}</span>
        <span class="card-chapters">Ch.${manga.chapters}</span>
      </div>
    </div>
  `;
  return card;
}

function renderTrending() {
  const grid = document.getElementById('trendingGrid');
  grid.innerHTML = '';
  MANGAS.filter(m => m.trending).forEach(m => grid.appendChild(createCard(m)));
}

function renderMain() {
  const grid = document.getElementById('mainGrid');
  const noResults = document.getElementById('noResults');
  grid.innerHTML = '';

  let list = [...MANGAS];

  if (currentFilter !== 'all') list = list.filter(m => m.genre === currentFilter);
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.author.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (currentSort === 'recent') list = list.filter(m => m.new).concat(list.filter(m => !m.new));
  else if (currentSort === 'az') list.sort((a,b) => a.title.localeCompare(b.title));
  else list.sort((a,b) => b.rating - a.rating);

  if (list.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
    list.forEach(m => grid.appendChild(createCard(m)));
  }
}

// ── DETAIL MODAL ──
function openDetail(manga) {
  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailContent');

  const chapterList = Array.from({length: Math.min(10, manga.chapters)}, (_, i) => {
    const num = manga.chapters - i;
    const isNew = i < 2;
    const daysAgo = i === 0 ? "Aujourd'hui" : i === 1 ? "Il y a 3j" : `Il y a ${i * 7}j`;
    return `
      <div class="chapter-item" onclick="readChapter('${manga.title}', ${num})">
        <span class="chapter-num">Chapitre ${num}</span>
        ${isNew ? '<span class="chapter-new">NEW</span>' : ''}
        <span class="chapter-date">${daysAgo}</span>
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <div class="detail-cover-wrap">
      <div class="detail-cover">
        <div class="card-cover-placeholder" style="background: linear-gradient(135deg, ${manga.color1}, ${manga.color2}); height:100%">
          <span>${manga.title}</span>
        </div>
      </div>
      <div class="detail-info">
        <div class="detail-title">${manga.title}</div>
        <div class="detail-author">par ${manga.author}</div>
        <div class="detail-tags">
          ${manga.tags.map(t => `<span class="detail-tag">${t}</span>`).join('')}
          <span class="detail-tag">${manga.status}</span>
        </div>
        <div class="detail-stats">
          <div class="detail-stat">
            <div class="detail-stat-val">${manga.rating}</div>
            <div class="detail-stat-lab">NOTE</div>
          </div>
          <div class="detail-stat">
            <div class="detail-stat-val">${manga.chapters}</div>
            <div class="detail-stat-lab">CHAP.</div>
          </div>
          <div class="detail-stat">
            <div class="detail-stat-val">${manga.views}</div>
            <div class="detail-stat-lab">VUES</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-synopsis">${manga.synopsis}</div>
    <div class="detail-chapters">
      <h3>CHAPITRES</h3>
      <div class="chapters-list">${chapterList}</div>
    </div>
  `;

  modal.classList.remove('hidden');

  // Save to history
  addToHistory(manga);
}

function readChapter(title, num) {
  document.getElementById('detailModal').classList.add('hidden');
  showToast(`📖 Chapitre ${num} de ${title} — Bientôt disponible !`);
  addCoins(2);
}

// ── HISTORY ──
function addToHistory(manga) {
  let history = JSON.parse(localStorage.getItem('psyx_history') || '[]');
  history = history.filter(id => id !== manga.id);
  history.unshift(manga.id);
  history = history.slice(0, 12);
  localStorage.setItem('psyx_history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  if (!currentUser) return;
  const history = JSON.parse(localStorage.getItem('psyx_history') || '[]');
  const section = document.getElementById('historySection');
  const grid = document.getElementById('historyGrid');

  if (history.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  grid.innerHTML = '';
  history
    .map(id => MANGAS.find(m => m.id === id))
    .filter(Boolean)
    .forEach(m => grid.appendChild(createCard(m)));
}

// ── COINS ──
function addCoins(amount) {
  coins += amount;
  localStorage.setItem('psyx_coins', coins);
  document.getElementById('coinCount').textContent = coins;
  showToast(`🪙 +${amount} pièces gagnées !`, 'success');
}

function loadCoins() {
  coins = parseInt(localStorage.getItem('psyx_coins') || '0');
  document.getElementById('coinCount').textContent = coins;
}

// ── AUTH ──
function loadUser() {
  const saved = localStorage.getItem('psyx_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    updateAuthUI();
    loadCoins();
    renderHistory();
  }
}

function updateAuthUI() {
  const btnLogin = document.getElementById('btnOpenAuth');
  const userMenu = document.getElementById('userMenu');
  const userGreeting = document.getElementById('userGreeting');

  if (currentUser) {
    btnLogin.classList.add('hidden');
    userMenu.classList.remove('hidden');
    userGreeting.textContent = `Salut, ${currentUser.username} !`;
  } else {
    btnLogin.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

// ── TOAST ──
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ── EVENTS ──
function bindEvents() {

  // Hamburger
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('hidden');
  });

  // Search
  ['searchInput', 'searchMobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', e => {
      currentSearch = e.target.value;
      // Sync both inputs
      ['searchInput', 'searchMobile'].forEach(sid => {
        const sel = document.getElementById(sid);
        if (sel && sel !== e.target) sel.value = currentSearch;
      });
      renderMain();
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderMain();
    });
  });

  // Mobile filter links
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.mobile-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentFilter = link.dataset.filter;

      // Sync desktop buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === currentFilter);
      });
      renderMain();
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    currentSort = e.target.value;
    renderMain();
  });

  // Auth modal
  document.getElementById('btnOpenAuth').addEventListener('click', () => {
    document.getElementById('authModal').classList.remove('hidden');
  });
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('authModal').classList.add('hidden');
  });
  document.getElementById('authModal').addEventListener('click', e => {
    if (e.target === document.getElementById('authModal'))
      document.getElementById('authModal').classList.add('hidden');
  });

  // Detail modal
  document.getElementById('closeDetail').addEventListener('click', () => {
    document.getElementById('detailModal').classList.add('hidden');
  });
  document.getElementById('detailModal').addEventListener('click', e => {
    if (e.target === document.getElementById('detailModal'))
      document.getElementById('detailModal').classList.add('hidden');
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('loginTab').classList.toggle('hidden', tab !== 'login');
      document.getElementById('registerTab').classList.toggle('hidden', tab !== 'register');
    });
  });

  // Login
  document.getElementById('btnLogin').addEventListener('click', () => {
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;
    if (!username || !password) { showToast('⚠️ Remplis tous les champs !'); return; }

    const users = JSON.parse(localStorage.getItem('psyx_users') || '{}');
    if (!users[username] || users[username] !== password) {
      showToast('❌ Pseudo ou mot de passe incorrect.'); return;
    }

    currentUser = { username };
    localStorage.setItem('psyx_user', JSON.stringify(currentUser));
    document.getElementById('authModal').classList.add('hidden');
    updateAuthUI();
    loadCoins();
    renderHistory();
    showToast(`🔴 Bienvenue, ${username} !`, 'success');
  });

  // Register
  document.getElementById('btnRegister').addEventListener('click', () => {
    const username = document.getElementById('regUser').value.trim();
    const password = document.getElementById('regPass').value;
    if (!username || !password) { showToast('⚠️ Remplis tous les champs !'); return; }
    if (username.length < 3) { showToast('⚠️ Pseudo trop court (min 3 caractères).'); return; }
    if (password.length < 6) { showToast('⚠️ Mot de passe trop court (min 6 car.).'); return; }

    const users = JSON.parse(localStorage.getItem('psyx_users') || '{}');
    if (users[username]) { showToast('❌ Ce pseudo est déjà pris.'); return; }

    users[username] = password;
    localStorage.setItem('psyx_users', JSON.stringify(users));

    currentUser = { username };
    localStorage.setItem('psyx_user', JSON.stringify(currentUser));
    coins = 50;
    localStorage.setItem('psyx_coins', coins);

    document.getElementById('authModal').classList.add('hidden');
    updateAuthUI();
    loadCoins();
    showToast(`🎉 Bienvenue dans l'Empire, ${username} ! +50 🪙`, 'success');
  });

  // Logout
  document.getElementById('btnLogout').addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('psyx_user');
    updateAuthUI();
    document.getElementById('historySection').style.display = 'none';
    showToast('👋 Déconnecté.');
  });

  // Keyboard: close modals with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('authModal').classList.add('hidden');
      document.getElementById('detailModal').classList.add('hidden');
    }
  });
      }
