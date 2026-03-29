# CineVault 🎬

A sleek movie & TV discovery app powered by the [movie-api.obedtech.top](https://movie-api.obedtech.top/api) backend.

Built with plain **HTML, CSS & JavaScript** — no framework dependencies. Backend proxy via Vercel Serverless Functions.

---

## 🚀 Deploy to Vercel (3 steps)

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option B — GitHub → Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo — Vercel auto-detects settings
4. Click **Deploy** ✅

No build step required. The project is pure static HTML + serverless functions.

---

## 📁 Project Structure

```
cinevault/
├── public/
│   └── index.html        ← Full SPA (HTML + CSS + JS)
├── api/
│   └── [...slug].js      ← Serverless proxy to upstream API
├── vercel.json           ← Routing config
└── package.json
```

---

## ✅ Features

- 🎬 **Home** — Hero banner (auto-rotating), 7 content rows
- 🔍 **Search** — Live debounced search + genre filters
- 🎞 **Movie Detail** — Backdrop, cast, download, embedded player, similar
- 📺 **TV Detail** — Season cards, episode list with stills, episode player
- 🔄 **Multi-server** — Switch between embed providers
- ⚡ **Fast** — Response caching, lazy image loading

---

## 🔗 API Endpoints Used

| Endpoint | Description |
|---|---|
| `GET /api/trending` | Trending movies + TV |
| `GET /api/movies/popular` | Popular movies |
| `GET /api/movies/now-playing` | Now playing |
| `GET /api/movies/top-rated` | Top rated movies |
| `GET /api/movies/upcoming` | Upcoming movies |
| `GET /api/tv/popular` | Popular TV shows |
| `GET /api/tv/top-rated` | Top rated TV |
| `GET /api/movies/:id` | Movie detail |
| `GET /api/tv/:id` | TV show detail |
| `GET /api/movies/:id/cast` | Movie cast |
| `GET /api/tv/:id/cast` | TV cast |
| `GET /api/movies/:id/player` | Movie embed players |
| `GET /api/tv/:id/player/:s/:e` | TV episode player |
| `GET /api/movies/:id/similar` | Similar movies |
| `GET /api/tv/:id/similar` | Similar shows |
| `GET /api/movies/:id/download` | Download links |
| `GET /api/tv/:id/season/:s` | Season episodes |
| `GET /api/search?q=` | Search |
| `GET /api/genres/movies` | Movie genres |
| `GET /api/movies/genre/:id` | Movies by genre |

All proxied through `/api/[...slug].js` to avoid CORS issues.
