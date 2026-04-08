/* ===========================
   PSYX-MANGA v2 | app.js
   All logic — reader, shop, cart, auth, Jikan covers
   ✅ BUGS CORRIGÉS:
   - [FIX #1] Death Note malId corrigé (21 → 21519)
   - [FIX #2] Tri par popularité (parseFloat("13M") → vrai nombre)
   - [FIX #3] data-malid="null" évité pour les entrées sans malId
   - [FIX #4] applycover ne remplace plus de mauvais éléments
   - [FIX #5] Recherche mobile synchronisée avec recherche desktop
   - [FIX #6] Copyright footer mis à jour (2025 → 2026)
=========================== */

// ═══════════════════════════════════
//  DATA
// ═══════════════════════════════════
const CATALOG = [
  // ─── ANIME ───
  { id:1,  title:"One Piece",          author:"Toei Animation",     type:"anime",  genre:"shonen", tags:["Aventure","Action","Comédie"],  ep:"1100+", rating:9.8, views:"13M",  malId:21,    color1:"#1a4080",color2:"#0d2550", new:true,  trend:true,
    synopsis:"Monkey D. Luffy rêve de devenir le Roi des Pirates. Avec son équipage des Chapeaux de Paille, il sillonne les mers à la recherche du One Piece, le trésor ultime." },
  { id:2,  title:"Demon Slayer",        author:"ufotable",           type:"anime",  genre:"shonen", tags:["Action","Surnaturel","Drame"],   ep:"55",    rating:9.2, views:"11M",  malId:38000, color1:"#2d1b4e",color2:"#1a0d2e", new:true,  trend:true,
    synopsis:"Tanjiro Kamado devient chasseur de démons après que sa famille est massacrée. Sa sœur Nezuko, transformée en démon, est son unique espoir." },
  { id:3,  title:"Attack on Titan",     author:"MAPPA",              type:"anime",  genre:"shonen", tags:["Action","Drame","Post-Apo"],    ep:"94",    rating:9.7, views:"12M",  malId:16498, color1:"#2a2010",color2:"#1a1308", new:false, trend:true,
    synopsis:"L'humanité survit derrière d'immenses murs pour fuir les Titans. Eren Jäger jure de les exterminer tous après que sa mère est dévorée." },
  { id:4,  title:"Jujutsu Kaisen",      author:"MAPPA",              type:"anime",  genre:"shonen", tags:["Action","Horreur","Surnaturel"], ep:"47",    rating:9.1, views:"9M",   malId:40748, color1:"#1f1040",color2:"#120a28", new:true,  trend:true,
    synopsis:"Yuji Itadori avale un doigt maudit et se retrouve possédé par le démon le plus puissant. Il intègre l'école des sorciers jujutsu pour expier ses péchés." },
  { id:5,  title:"My Hero Academia",    author:"Bones",              type:"anime",  genre:"shonen", tags:["Superhéros","Action","École"],   ep:"138",   rating:8.8, views:"8M",   malId:31964, color1:"#1a1a40",color2:"#0d0d28", new:false, trend:false,
    synopsis:"Dans un monde où 80% de la population possède un pouvoir (Alter), Izuku Midoriya naît sans pouvoir mais rêve de devenir le plus grand héros." },
  { id:6,  title:"Dragon Ball Super",   author:"Toei Animation",     type:"anime",  genre:"shonen", tags:["Action","Combat","Aventure"],    ep:"131",   rating:8.5, views:"10M",  malId:30694, color1:"#28180a",color2:"#1a0f05", new:false, trend:false,
    synopsis:"Suite de Dragon Ball Z. Goku et ses amis font face à des adversaires encore plus puissants dans un univers élargi avec des dieux et des univers parallèles." },

  // ─── MANGA ───
  { id:10, title:"Berserk",             author:"Kentaro Miura",      type:"manga",  genre:"seinen", tags:["Dark Fantasy","Action","Drame"], ep:"374 Ch",rating:9.9, views:"7M",   malId:2,     color1:"#1f0a0a",color2:"#0f0505", new:false, trend:true,
    synopsis:"Guts, mercenaire solitaire armé d'une épée colossale, erre dans un monde médiéval sombre poursuivi par des démons. Sa quête de vengeance contre Griffith le plonge dans les ténèbres." },

  // ✅ FIX #1 — Death Note malId corrigé : était 21 (One Piece!), corrigé à 21519
  { id:11, title:"Death Note",          author:"Tsugumi Ohba",       type:"manga",  genre:"shonen", tags:["Thriller","Psychologique","Mystère"], ep:"108 Ch",rating:9.6, views:"9M",  malId:21519, color1:"#101020",color2:"#080810", new:false, trend:true,
    synopsis:"Light Yagami trouve un cahier qui tue quiconque dont le nom y est inscrit. Il veut créer un monde parfait mais un détective de génie s'y oppose." },
  { id:12, title:"Fullmetal Alchemist", author:"Hiromu Arakawa",     type:"manga",  genre:"shonen", tags:["Aventure","Action","Drame"],     ep:"108 Ch",rating:9.7, views:"8M",   malId:25,    color1:"#2a1a00",color2:"#1a1000", new:false, trend:false,
    synopsis:"Les frères Elric partent à la recherche de la Pierre Philosophale pour retrouver leurs corps perdus lors d'une alchimie ratée pour ressusciter leur mère." },
  { id:13, title:"Chainsaw Man",        author:"Tatsuki Fujimoto",   type:"manga",  genre:"shonen", tags:["Action","Horreur","Comédie"],    ep:"168 Ch",rating:9.4, views:"6M",   malId:116778,color1:"#4a1a1a",color2:"#2d0f0f", new:true,  trend:true,
    synopsis:"Denji, un jeune démon-chasseur, fusionne avec son chien-démon Pochita pour devenir Chainsaw Man — un être mi-humain mi-tronçonneuse." },
  { id:14, title:"Vinland Saga",        author:"Makoto Yukimura",    type:"manga",  genre:"seinen", tags:["Historique","Action","Drame"],   ep:"210 Ch",rating:9.5, views:"5M",   malId:54491, color1:"#1a2d1a",color2:"#0d1f0d", new:false, trend:false,
    synopsis:"Thorfinn, fils d'un grand guerrier Viking, cherche à venger la mort de son père. Une épopée viking entre guerre, honneur et rédemption." },
  { id:15, title:"Vagabond",            author:"Takehiko Inoue",     type:"manga",  genre:"seinen", tags:["Historique","Arts Martiaux"],    ep:"327 Ch",rating:9.8, views:"4M",   malId:1528,  color1:"#20180a",color2:"#140f05", new:false, trend:false,
    synopsis:"L'histoire de Miyamoto Musashi, le plus grand samouraï du Japon. Une quête de l'invincibilité à travers la guerre, la sagesse et la maîtrise de soi." },
  { id:16, title:"Spy × Family",        author:"Tatsuya Endo",       type:"manga",  genre:"shonen", tags:["Comédie","Action","Famille"],    ep:"102 Ch",rating:9.0, views:"5M",   malId:119161,color1:"#1a1a3a",color2:"#0f0f24", new:true,  trend:false,
    synopsis:"Un espion doit créer une fausse famille pour sa mission. Il adopte une enfant télépathe et épouse une assassine — sans que personne ne sache la vérité." },
  { id:17, title:"Naruto",              author:"Masashi Kishimoto",  type:"manga",  genre:"shonen", tags:["Action","Aventure","Amitié"],    ep:"700 Ch",rating:9.3, views:"13M",  malId:11,    color1:"#2a1a00",color2:"#1a1000", new:false, trend:false,
    synopsis:"Naruto Uzumaki, rejeté de son village car il contient un démon renard, rêve de devenir Hokage pour être reconnu de tous." },

  // ─── MANHWA ───
  { id:20, title:"Solo Leveling",       author:"Chugong",            type:"manhwa", genre:"action", tags:["Action","Fantasy","OP Hero"],   ep:"179 Ch",rating:9.6, views:"15M",  malId:121496,color1:"#0a1020",color2:"#050810", new:false, trend:true,
    synopsis:"Sung Jinwoo, le chasseur de rang E le plus faible, découvre un système mystérieux qui lui permet de monter en puissance sans limite. Il devient le chasseur le plus puissant du monde." },
  { id:21, title:"Tower of God",        author:"SIU",                type:"manhwa", genre:"action", tags:["Fantasy","Aventure","Mystère"],  ep:"590 Ch",rating:9.2, views:"8M",   malId:97655, color1:"#0d1a2a",color2:"#080f1a", new:false, trend:true,
    synopsis:"Baam entre dans une tour mystérieuse pour retrouver son amie Rachel. Chaque étage cache de nouveaux défis et révélations dans ce monde labyrinthique." },
  // ✅ FIX #3 — malId null : on utilise null (pas de data-malid dans le HTML pour éviter les faux sélecteurs)
  { id:22, title:"Nano Machine",        author:"Geung-hyun Han",     type:"manhwa", genre:"action", tags:["Arts Martiaux","Sci-Fi","Action"],ep:"220 Ch",rating:8.8, views:"5M",   malId:null,  color1:"#0a1a1a",color2:"#050f0f", new:true,  trend:false,
    synopsis:"Cheon Yeo-Woon, héritier inférieur d'un clan d'arts martiaux, reçoit une nano-machine du futur qui le propulse vers le sommet du monde martial." },
  { id:23, title:"Omniscient Reader",   author:"Sing Shong",         type:"manhwa", genre:"action", tags:["Action","Fantasy","Thriller"],   ep:"162 Ch",rating:9.4, views:"6M",   malId:null,  color1:"#1a0a20",color2:"#0f0514", new:true,  trend:false,
    synopsis:"Kim Dokja est le seul lecteur à avoir terminé un roman de fiction. Quand le monde devient ce roman, ses connaissances deviennent son arme ultime." },

  // ─── MANHUA ───
  { id:30, title:"Battle Through the Heavens", author:"Tian Can Tu Dou", type:"manhua", genre:"action", tags:["Cultivation","Action","Fantasy"], ep:"500+ Ch",rating:8.5, views:"6M",malId:null, color1:"#2a0a0a",color2:"#1a0505", new:false, trend:false,
    synopsis:"Xiao Yan, ancien génie devenu médiocre, reprend son entraînement après avoir découvert un anneau mystérieux contenant l'esprit de sa mère disparue." },
  { id:31, title:"Martial Peak",        author:"Momo",               type:"manhua", genre:"action", tags:["Cultivation","Arts Martiaux"],   ep:"3000+ Ch",rating:8.3, views:"7M",  malId:null,  color1:"#1a2a0a",color2:"#0f1a05", new:false, trend:false,
    synopsis:"Yang Kai, un disciple de bas rang, trouve un livre noir mystérieux et commence un voyage vers le sommet du monde martial — seul contre tous." },
  { id:32, title:"Soul Land",           author:"Tang Jia San Shao",  type:"manhua", genre:"fantasy", tags:["Cultivation","Fantasy","Aventure"],ep:"800+ Ch",rating:8.6, views:"5M",  malId:null,  color1:"#0a1a2a",color2:"#050f1a", new:true,  trend:false,
    synopsis:"Tang San, un disciple du clan Tang des arts de l'ombre, se réincarne dans le monde de Douluo Continent. Il y cultive ses pouvoirs divins vers l'invincibilité." },

  // ─── SHŌJO ───
  { id:40, title:"Fruits Basket",       author:"Natsuki Takaya",     type:"manga",  genre:"shojo",  tags:["Romance","Drame","Comédie"],    ep:"136 Ch",rating:9.1, views:"4M",   malId:239,   color1:"#2a0a1a",color2:"#1a0510", new:false, trend:false,
    synopsis:"Tôru Honda est recueillie par la famille Sôma, dont les membres se transforment en animaux du zodiaque chinois quand ils sont étreints par quelqu'un du sexe opposé." },
  { id:41, title:"Ouran Host Club",     author:"Bisco Hatori",       type:"manga",  genre:"shojo",  tags:["Comédie","Romance","École"],    ep:"87 Ch", rating:8.9, views:"3M",   malId:1553,  color1:"#2a200a",color2:"#1a1405", new:false, trend:false,
    synopsis:"Haruhi Fujioka intègre par accident le Club des Hôtes d'Ouran, composé de six garçons beaux et riches. Elle doit rembourser un vase cassé en devenant hôtesse." },
];

// SHOP PRODUCTS
const SHOP_ITEMS = [
  { id:"s1", type:"poster", title:"One Piece — Équipage", emoji:"🏴‍☠️", bg:"linear-gradient(135deg,#1a4080,#0d2550)", priceA4:500, priceA3:800 },
  { id:"s2", type:"poster", title:"Attack on Titan — Recon", emoji:"⚔️", bg:"linear-gradient(135deg,#2a2010,#1a1308)", priceA4:500, priceA3:800 },
  { id:"s3", type:"poster", title:"Jujutsu Kaisen — Gojo", emoji:"👁️", bg:"linear-gradient(135deg,#1f1040,#120a28)", priceA4:500, priceA3:800 },
  { id:"s4", type:"poster", title:"Demon Slayer — Tanjiro", emoji:"🌊", bg:"linear-gradient(135deg,#2d1b4e,#1a0d2e)", priceA4:500, priceA3:800 },
  { id:"s5", type:"poster", title:"Berserk — Guts Berserker", emoji:"🗡️", bg:"linear-gradient(135deg,#1f0a0a,#0f0505)", priceA4:600, priceA3:900 },
  { id:"s6", type:"poster", title:"Solo Leveling — Shadow", emoji:"👤", bg:"linear-gradient(135deg,#0a1020,#050810)", priceA4:500, priceA3:800 },
  { id:"f1", type:"figure", title:"Luffy Figurine Premium", emoji:"👒", bg:"linear-gradient(135deg,#1a4080,#0d2550)", priceStd:2500, pricePrem:5000 },
  { id:"f2", type:"figure", title:"Gojo Satoru Figurine", emoji:"🔵", bg:"linear-gradient(135deg,#1f1040,#120a28)", priceStd:2500, pricePrem:5000 },
  { id:"f3", type:"figure", title:"Tanjiro Figurine", emoji:"💧", bg:"linear-gradient(135deg,#2d1b4e,#1a0d2e)", priceStd:2500, pricePrem:5000 },
  { id:"f4", type:"figure", title:"Guts Figurine", emoji:"⚫", bg:"linear-gradient(135deg,#1f0a0a,#0f0505)", priceStd:3000, pricePrem:6000 },
];

// ═══════════════════════════════════
//  STATE
// ═══════════════════════════════════
let currentType   = "all";
let currentGenre  = "all";
let currentSearch = "";
let currentSort   = "pop";
let currentUser   = null;
let coins = 0;
let cart  = [];

// Reader state
let readerManga = null;
let readerPage  = 1;
const PAGES_PER_CHAP = 20;

// Cover cache
const coverCache = {};

// ✅ FIX #2 — Helper : convertit "13M" → 13000000, "3M" → 3000000, etc.
function parseViews(str) {
  if (!str) return 0;
  const s = str.toString().trim().toUpperCase();
  if (s.endsWith('M')) return parseFloat(s) * 1_000_000;
  if (s.endsWith('K')) return parseFloat(s) * 1_000;
  return parseFloat(s) || 0;
}

// ═══════════════════════════════════
//  INIT
// ═══════════════════════════════════
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('gone');
}

document.addEventListener('DOMContentLoaded', () => {
  loadUser();
  loadCart();
  renderTrend();
  renderMain();
  renderShop();
  bindAll();
  // Covers chargées en arrière-plan
  CATALOG.filter(m => m.malId).forEach((m, i) => {
    setTimeout(() => fetchCover(m), i * 350);
  });
  setTimeout(hideLoader, 2000);
});

window.addEventListener('load', () => setTimeout(hideLoader, 500));
setTimeout(hideLoader, 4000);

// ═══════════════════════════════════
//  COVER FETCH — Jikan API
// ═══════════════════════════════════
async function fetchCover(manga) {
  if (!manga.malId) return; // ✅ FIX #3 — ne pas fetcher si malId est null
  if (coverCache[manga.malId]) return;
  try {
    const endpoint = manga.type === 'anime'
      ? `https://api.jikan.moe/v4/anime/${manga.malId}`
      : `https://api.jikan.moe/v4/manga/${manga.malId}`;
    const res = await fetch(endpoint);
    if (!res.ok) return;
    const data = await res.json();
    const url = data.data?.images?.jpg?.large_image_url || data.data?.images?.jpg?.image_url;
    if (url) {
      coverCache[manga.malId] = url;
      // ✅ FIX #4 — sélecteur sûr uniquement si malId est défini
      document.querySelectorAll(`[data-malid="${manga.malId}"]`).forEach(el => {
        applycover(el, url, manga.color1, manga.color2, manga.title);
      });
    }
  } catch(e) { /* silent fail — gradient fallback stays */ }
}

function applycover(el, url, c1, c2, title) {
  const img = document.createElement('img');
  img.className = 'card-img';
  img.src = url;
  img.alt = title;
  img.loading = 'lazy';
  img.onerror = () => {
    img.replaceWith(makePlaceholder(c1, c2, title));
  };
  el.replaceWith(img);
}

function makePlaceholder(c1, c2, title) {
  const div = document.createElement('div');
  div.className = 'card-img-ph';
  div.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
  div.innerHTML = `<span>${title}</span>`;
  return div;
}

// ═══════════════════════════════════
//  RENDER CARDS
// ═══════════════════════════════════
function createCard(manga) {
  const card = document.createElement('div');
  card.className = 'card';
  card.onclick = () => openDetail(manga);

  // ✅ FIX #3 — data-malid uniquement si malId est non-null
  const malAttr = manga.malId ? `data-malid="${manga.malId}"` : '';
  const coverEl = (manga.malId && coverCache[manga.malId])
    ? `<img class="card-img" src="${coverCache[manga.malId]}" alt="${manga.title}" loading="lazy"/>`
    : `<div class="card-img-ph" ${malAttr} style="background:linear-gradient(135deg,${manga.color1},${manga.color2})"><span>${manga.title}</span></div>`;

  const typeLabel = { anime:'🎬 Anime', manga:'📖 Manga', manhwa:'🇰🇷 Manhwa', manhua:'🇨🇳 Manhua' }[manga.type] || manga.type;
  const newBadge = manga.new ? '<div class="card-badge">NOUVEAU</div>' : '';

  card.innerHTML = `
    ${newBadge}
    <div class="card-type-badge">${typeLabel}</div>
    ${coverEl}
    <div class="card-hover">
      <div class="card-hover-tags">
        ${manga.tags.slice(0,2).map(t=>`<span class="card-hover-tag">${t}</span>`).join('')}
      </div>
      <div class="card-hover-btns">
        <button class="card-hover-btn read" onclick="event.stopPropagation();startReader(${manga.id})">▶ LIRE</button>
        <button class="card-hover-btn shop" onclick="event.stopPropagation();openDetail(CATALOG.find(m=>m.id===${manga.id}),true)">🛒 COMMANDER</button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-title">${manga.title}</div>
      <div class="card-meta">
        <span class="card-genre">${manga.genre.toUpperCase()}</span>
        <span class="card-ep">${manga.ep}</span>
      </div>
    </div>
  `;
  return card;
}

function renderTrend() {
  const g = document.getElementById('trendGrid');
  g.innerHTML = '';
  CATALOG.filter(m => m.trend).forEach(m => g.appendChild(createCard(m)));
}

function renderMain() {
  const g  = document.getElementById('mainGrid');
  const nr = document.getElementById('noRes');
  g.innerHTML = '';

  let list = [...CATALOG];
  if (currentType  !== 'all') list = list.filter(m => m.type === currentType);
  if (currentGenre !== 'all') list = list.filter(m => m.genre === currentGenre || m.tags.map(t=>t.toLowerCase()).includes(currentGenre));
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(m => m.title.toLowerCase().includes(q) || m.author.toLowerCase().includes(q) || m.tags.some(t=>t.toLowerCase().includes(q)));
  }

  // ✅ FIX #2 — Tri populaire avec parseViews() au lieu de parseFloat() brut
  if      (currentSort === 'new')  { list = list.filter(m=>m.new).concat(list.filter(m=>!m.new)); }
  else if (currentSort === 'az')   { list.sort((a,b)=>a.title.localeCompare(b.title)); }
  else if (currentSort === 'note') { list.sort((a,b)=>b.rating-a.rating); }
  else                              { list.sort((a,b)=>parseViews(b.views)-parseViews(a.views)); }

  nr.classList.toggle('hidden', list.length > 0);
  list.forEach(m => g.appendChild(createCard(m)));
}

// ═══════════════════════════════════
//  SHOP RENDER
// ═══════════════════════════════════
function renderShop() {
  const g = document.getElementById('shopGrid');
  g.innerHTML = '';
  SHOP_ITEMS.forEach(item => {
    const el = document.createElement('div');
    el.className = 'shop-card';
    const isPostersType = item.type === 'poster';
    el.innerHTML = `
      <div class="shop-card-img" style="background:${item.bg}">
        <span style="font-size:3rem;position:relative;z-index:1">${item.emoji}</span>
      </div>
      <div class="shop-card-body">
        <div class="shop-card-title">${item.title}</div>
        <div class="shop-card-sub">${isPostersType ? 'Poster' : 'Figurine'} · Livraison 24h 🇭🇹</div>
        <div class="shop-card-prices">
          ${isPostersType ? `
            <div class="shop-price-row">
              <span class="shop-price-label">🖼️ Poster A4</span>
              <span class="shop-price-val">${item.priceA4} HTG</span>
              <button class="shop-add-btn" onclick="addToCart({id:'${item.id}-a4',name:'${item.title}',sub:'Poster A4',price:${item.priceA4}})">+🛒</button>
            </div>
            <div class="shop-price-row">
              <span class="shop-price-label">🖼️ Poster A3</span>
              <span class="shop-price-val">${item.priceA3} HTG</span>
              <button class="shop-add-btn" onclick="addToCart({id:'${item.id}-a3',name:'${item.title}',sub:'Poster A3',price:${item.priceA3}})">+🛒</button>
            </div>
          ` : `
            <div class="shop-price-row">
              <span class="shop-price-label">🗿 Figurine Std</span>
              <span class="shop-price-val">${item.priceStd} HTG</span>
              <button class="shop-add-btn" onclick="addToCart({id:'${item.id}-std',name:'${item.title}',sub:'Figurine Standard',price:${item.priceStd}})">+🛒</button>
            </div>
            <div class="shop-price-row">
              <span class="shop-price-label">⭐ Figurine Premium</span>
              <span class="shop-pr
