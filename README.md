# Integerant

Marketing site and business dashboard for **Integrant** — a software solutions & consulting company.

Live: [integerant.com](https://integerant.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | Vue Router 4 |
| i18n | vue-i18n 9 (Arabic default, English) |
| Icons | Lucide Vue Next |
| Backend | Laravel 13 / PHP-FPM |
| Database | PostgreSQL 16 |
| Server | Nginx (Docker) |

---

## Pages

### Marketing site

| Route | Page |
|---|---|
| `/` | Home (hero section) |
| `/about` | About Integrant |
| `/services` | Services listing |
| `/services/:slug` | Individual service detail |
| `/process` | Our process (6 steps) |
| `/contact` | Contact form |

### Dashboard (auth-protected)

| Route | Page |
|---|---|
| `/dashboard` | Overview |
| `/dashboard/projects` | Projects |
| `/dashboard/clients` | Clients |
| `/dashboard/leads` | Leads pipeline |
| `/dashboard/services` | Service revenue |
| `/dashboard/settings` | Settings |
| `/dashboard/help` | Help & FAQ |

---

## Internationalization

The site defaults to **Arabic (RTL)**. Users can switch to English using the language button in the navbar.

Locale files: [`src/locales/ar.ts`](src/locales/ar.ts) and [`src/locales/en.ts`](src/locales/en.ts)

All visible text — nav, hero, sections, service titles/descriptions, footer — is fully translated in both languages.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build
```

### Backend (Laravel API)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve   # http://localhost:8000
```

Or use Docker Compose:

```bash
# Dev (hot-reload)
docker compose up

# Production stack
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Deployment

Pushing to `main` triggers the GitHub Actions deploy pipeline (`.github/workflows/deploy.yml`), which:

1. Uploads code to the server via `rsync`
2. Runs `docker compose -f docker-compose.prod.yml up -d --build`
3. Runs Laravel migrations
4. Warms config / route / view caches
5. Smoke-tests `https://integerant.com/healthz`

See [DEPLOY.md](DEPLOY.md) for full deployment documentation including SSH key setup.

---

## Environment Variables

Copy `.env.prod.example` to `.env.prod` on the server and fill in real values:

```
APP_KEY=base64:...
DB_PASSWORD=...
POSTGRES_PASSWORD=...
```

The `.env.prod` file is never committed to git.

---

## Dashboard Login

| Field | Value |
|---|---|
| Email | `admin@integrant.com` |
| Password | `password` |

Auth is localStorage-based (demo only — no server-side session).
