# 🇳🇵 Nepal Patra — The Voice of Nepal

A professional, feature-rich Nepal-focused news aggregator built with React, Vite, Axios, and Tailwind CSS.

---

## ✨ Features

- **🏔️ Nepal-focused** — All stories filtered for Nepal relevance
- **📰 Featured hero article** — Full-bleed cover story at the top
- **🔥 Trending sidebar** — Top stories in a dedicated panel
- **🔖 Bookmarks** — Save articles locally (persisted via localStorage)
- **🌙 Dark mode** — System-aware, toggleable, persisted
- **🗂️ Category filtering** — Politics, Business, Tech, Sports, Health, Science, Entertainment, Travel
- **🔍 Search** — Full-text search within Nepal news
- **🏷️ Topic explorer** — Quick topic tags in the sidebar
- **📡 Breaking ticker** — Animated headline ticker
- **💀 Skeleton loaders** — Shimmer placeholders for all loading states
- **♾️ Load More pagination** — Seamless infinite-style loading
- **📱 Fully responsive** — Mobile-first, works on all screen sizes
- **⏰ Nepal time widget** — Live Kathmandu time in sidebar
- **📧 Newsletter CTA** — Footer subscription form

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env
```

Edit `.env` and add your API token:

```env
VITE_NEWS_API_TOKEN=your_token_here
VITE_NEWS_API_BASE_URL=https://api.thenewsapi.com/v1
```

> Get a free token at [thenewsapi.com](https://www.thenewsapi.com/)

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
nepal-news-pro/
├── .env                          # API keys (never commit!)
├── .env.example                  # Template for env vars
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── index.html                    # Vite HTML entry
├── public/                       # Static assets copied as-is
└── src/
    ├── main.jsx                  # React entry point
    ├── index.css                 # Global styles + Tailwind
    ├── App.jsx                   # Root component + state
    ├── context/
    │   └── ThemeContext.jsx      # Dark mode context
    ├── hooks/
    │   └── useNews.js            # Data fetching + bookmarks
    ├── utils/
    │   ├── api.js                # Axios instance (reads .env)
    │   └── helpers.js            # Formatters, categories, styles
    ├── components/
    │   ├── Header.jsx            # Sticky nav + search + dark toggle
    │   ├── BreakingTicker.jsx    # Animated news ticker
    │   ├── FeaturedCard.jsx      # Hero article card
    │   ├── NewsCard.jsx          # Standard + compact card variants
    │   ├── SkeletonCard.jsx      # Shimmer loading states
    │   ├── Sidebar.jsx           # Trending + clock + topics
    │   ├── ErrorState.jsx        # Error UI with retry
    │   ├── EmptyState.jsx        # Empty results UI
    │   └── Footer.jsx            # Full footer with links
    └── pages/
        ├── HomePage.jsx          # Main news feed
        └── BookmarksPage.jsx     # Saved articles view
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Dev server + build tool |
| **Axios** | HTTP client with interceptors |
| **Tailwind CSS** | Utility-first styling |
| **date-fns** | Date formatting |
| **TheNewsAPI** | News data source |

---

## 🔐 Security Notes

- The API token lives **only in `.env`** and is never hardcoded
- `.env` is in `.gitignore` — it will never be committed
- Use `.env.example` to share the config structure safely

---

## 🌐 Deployment

### Vercel / Netlify
Set environment variables in the dashboard:
- `VITE_NEWS_API_TOKEN`
- `VITE_NEWS_API_BASE_URL`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

---

© 2024 Nepal Patra. Powered by [TheNewsAPI](https://www.thenewsapi.com/).
