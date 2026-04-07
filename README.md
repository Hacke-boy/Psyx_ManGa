# 🔴⚫ Psyx-Manga | Empire Edition

Site de lecture de manga moderne, dark et stylé — prêt pour GitHub Pages.

## 🚀 Déploiement sur GitHub Pages

### Méthode 1 — Simple (recommandée)

1. Crée un nouveau repo GitHub (ex: `Psyx_ManGa`)
2. Upload les 3 fichiers : `index.html`, `style.css`, `app.js`
3. Va dans **Settings → Pages**
4. Source : `Deploy from a branch` → `main` → `/ (root)`
5. Clique **Save** → ton site sera en ligne en 1-2 minutes !

🌐 URL : `https://TON-USERNAME.github.io/Psyx_ManGa/`

### Méthode 2 — Via Git CLI

```bash
git init
git add .
git commit -m "🔴 Empire Edition launch"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/Psyx_ManGa.git
git push -u origin main
```

Puis active GitHub Pages dans les Settings.

---

## 📁 Structure

```
psyx-manga/
├── index.html   # Structure HTML
├── style.css    # Design & animations
├── app.js       # Logique & données
└── README.md    # Ce fichier
```

## ✨ Fonctionnalités

- 🎨 Design dark neo-imperial avec animations
- 📚 16 mangas (Shonen / Seinen)
- 🔍 Recherche en temps réel
- 🏷️ Filtres par genre + tri
- 👤 Inscription / Connexion (localStorage)
- 🪙 Système de pièces
- 📖 Historique de lecture
- 📱 Responsive mobile
- ⚡ Ticker d'actualités

## 🛠️ Ajouter des mangas

Dans `app.js`, ajoute une entrée dans le tableau `MANGAS` :

```js
{
  id: 17,
  title: "Nom du Manga",
  author: "Auteur",
  genre: "shonen", // shonen, seinen, shojo
  chapters: 50,
  status: "En cours", // ou "Terminé"
  rating: 8.5,
  views: "1.2M",
  color1: "#1a1a40",  // couleur de la couverture (haut)
  color2: "#0d0d28",  // couleur de la couverture (bas)
  tags: ["Action", "Aventure"],
  synopsis: "Résumé du manga...",
  new: true,      // affiche le badge "NOUVEAU"
  trending: false // affiche dans "EN TENDANCE"
}
```
