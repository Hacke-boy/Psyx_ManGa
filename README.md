# 🔴⚫ Psyx-Manga | Empire Edition v2

> *"Lire n'est que beauté"*

Site de lecture et de vente de Anime/Manga — Unique en Haïti 🇭🇹

## 🚀 Déploiement GitHub Pages (2 minutes)

1. Crée un repo GitHub : `Psyx_ManGa`
2. Upload les 3 fichiers : `index.html`, `style.css`, `app.js`
3. **Settings → Pages → Deploy from branch → main → / (root) → Save**
4. ✅ En ligne sur `https://TON-USERNAME.github.io/Psyx_ManGa/`

### Via Git :
```bash
git init
git add .
git commit -m "🔴 Psyx-Manga v2 — Empire Edition"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/Psyx_ManGa.git
git push -u origin main
```

---

## ✨ Fonctionnalités

| Fonctionnalité | Détail |
|---|---|
| 🎬 Anime | Dessin animé japonais |
| 📖 Manga | BD japonaise |
| 🇰🇷 Manhwa | BD coréenne |
| 🇨🇳 Manhua | BD chinoise |
| 🔞 Hentai | Redirection WhatsApp |
| 📖 Lecteur | Navigation page par page (← →) |
| 🛒 Boutique | Posters A4/A3 + Figurines |
| 📦 Commande | Formulaire → WhatsApp direct |
| 🪙 Pièces | Gagnées en lisant |
| 👤 Compte | Inscription/Connexion + Historique |
| 📱 Contact | WhatsApp, Email, Instagram, TikTok |
| 🚀 Livraison | Port-au-Prince 24h |

## 📁 Structure
```
psyx-manga/
├── index.html   ← Structure & modals
├── style.css    ← Design dark neo-imperial
├── app.js       ← Toute la logique
└── README.md
```

## 🛠 Ajouter un manga/anime dans app.js

```js
{ 
  id: 50,
  title: "Mon Manga",
  author: "Auteur",
  type: "manga",        // anime | manga | manhwa | manhua
  genre: "shonen",      // shonen | shojo | seinen | josei | action | romance | fantasy
  tags: ["Action", "Aventure"],
  ep: "50 Ch",          // Nombre de chapitres ou épisodes
  rating: 8.5,
  views: "1M",
  malId: 12345,         // ID MyAnimeList (pour les covers auto) — null si inconnu
  color1: "#1a4080",    // Couleur cover haut
  color2: "#0d2550",    // Couleur cover bas
  new: true,
  trend: false,
  synopsis: "Résumé du manga..."
}
```

## 💳 Modes de paiement configurés
- MonCash
- NatCash  
- Carte bancaire

## 📞 Contacts Psyx-Manga
- WhatsApp : +509 3514 4295
- Email : ldorce30@gmail.com
- Instagram : @psyx_1
- TikTok : @psyx_1
