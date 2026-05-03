# Integerant — Deployment Guide

**Live URL:** https://integerant.com  
**Server:** OVH VPS — `51.68.229.216`  
**Domain registrar:** Namecheap (BasicDNS, A records managed there)  
**Stack:** Vue 3 + Vite (frontend) · Laravel 13 / PHP-FPM (backend) · PostgreSQL 16 · Nginx  

---

## Architecture

Integerant runs on the same OVH VPS as the Operix project. To avoid conflicts:

- Integerant containers run on an **internal Docker network only** (no host port bindings)
- The existing `bfm-frontend` nginx container (which owns ports 80/443) is extended with an `integerant.com` server block via `docker cp` + `nginx -s reload` — no Operix code is modified
- Both projects share the `business-finance-manager_letsencrypt_certs` volume for SSL certs

```
Internet → bfm-frontend (80/443)
             └─ integerant.com.conf → integrant-frontend:3000 (Vue SPA)
                                        └─ /api/ → integrant-api-nginx:80 → integrant-app:9000 (PHP-FPM)
                                                                               └─ integrant-db:5432 (Postgres)
```

---

## Prerequisites

### SSH key
The deploy script uses `~/.ssh/operix_deploy`.  
If setting up on a new machine, copy your private key there:

```bash
cp /path/to/key ~/.ssh/operix_deploy
chmod 600 ~/.ssh/operix_deploy
```

Verify access:

```bash
ssh -i ~/.ssh/operix_deploy ubuntu@51.68.229.216 "echo ok"
```

### DNS (Namecheap)
`integerant.com` must use **Namecheap BasicDNS** with two A records:

| Host | Type | Value          | TTL       |
|------|------|----------------|-----------|
| `@`  | A    | `51.68.229.216` | Automatic |
| `www`| A    | `51.68.229.216` | Automatic |

To change DNS type: Namecheap → Domains → integerant.com → Domain tab → Nameservers → Namecheap BasicDNS.

---

## First-time server setup

### 1. Create `.env.prod` on the server

SSH in and create the file — it is never committed to git:

```bash
ssh -i ~/.ssh/operix_deploy ubuntu@51.68.229.216
nano /opt/integerant/.env.prod
```

Paste and fill in real values (use `.env.prod.example` as a template):

```dotenv
APP_NAME=Integrant
APP_ENV=production
APP_KEY=base64:CHANGE_ME_RUN_php_artisan_key_generate
APP_DEBUG=false
APP_URL=https://integerant.com

DB_CONNECTION=pgsql
DB_HOST=integrant-db
DB_PORT=5432
DB_DATABASE=integrant
DB_USERNAME=integrant
DB_PASSWORD=CHANGE_ME_STRONG_PASSWORD

POSTGRES_DB=integrant
POSTGRES_USER=integrant
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync

TRUSTED_PROXIES=*
LOG_CHANNEL=stack
LOG_LEVEL=error
```

Generate an `APP_KEY`:

```bash
python3 -c "import base64, os; print('base64:' + base64.b64encode(os.urandom(32)).decode())"
```

### 2. Run the deploy script

```bash
bash deploy.sh
```

The script is fully idempotent — safe to re-run on subsequent deploys too.

---

## Routine deploys

Deploys are **automated via GitHub Actions** on every push to `main`
(see [Continuous deployment](#continuous-deployment) below).

If you need to deploy manually from your machine — for a hotfix, while
GitHub Actions is down, or to deploy from a non-`main` branch:

```bash
bash deploy.sh
```

What it does, in order:

1. **rsync** — uploads code (excludes `.git`, `node_modules`, `vendor`, `.env.prod`, logs)
2. **Bootstrap** — creates `shared-web` Docker network, connects `bfm-frontend` to it, verifies `.env.prod` exists
3. **SSL cert** — issues Let's Encrypt cert via `bfm-acme` + Namecheap DNS-01 challenge (skipped if cert already exists)
4. **nginx** — injects `integerant.com.conf` into `bfm-frontend` and adds `integerant.com` to the HTTP→HTTPS redirect block; reloads nginx
5. **Docker build** — `docker compose -f docker-compose.prod.yml up -d --build --remove-orphans`
6. **Health wait** — polls until `php artisan --version` succeeds (up to 120 s)
7. **Migrations** — `php artisan migrate --force`
8. **Cache warm** — config, route, view caches
9. **Smoke test** — `curl https://integerant.com/healthz` must return `ok`

---

## Continuous deployment

Two workflows live in `.github/workflows/`:

| Workflow            | Trigger                          | What it does |
|---------------------|----------------------------------|--------------|
| `ci.yml`            | PRs targeting `main`, push to `main` | `npm ci && npm run build` (vue-tsc type-check + Vite build). Fails the PR if the frontend won't compile. |
| `deploy.yml`        | Push to `main`, manual dispatch  | Runs `deploy.sh` against the OVH VPS. |

### One-time setup: GitHub secret

The deploy workflow needs the SSH private key for `ubuntu@51.68.229.216`.
Add it as a **repository secret** (Settings → Secrets and variables → Actions → New repository secret):

| Name              | Value                                               |
|-------------------|-----------------------------------------------------|
| `DEPLOY_SSH_KEY`  | Contents of `~/.ssh/operix_deploy` (private key, full PEM) |

The key must already be authorized in `~/.ssh/authorized_keys` on the
server — the same key already used for manual deploys.

### Optional but recommended: required reviewers

Settings → Environments → `production` → "Required reviewers". Add yourself.
Every deploy will then pause and wait for a one-click approval from the
Actions tab before SSH'ing into the VPS. Cheap insurance against rogue
merges going straight to production.

### How the merge → deploy flow works

```
feature branch → open PR
     │
     ▼
ci.yml runs (type-check + build) ── must pass before merge
     │
     ▼
merge to main
     │
     ▼
deploy.yml triggers → checkout → load DEPLOY_SSH_KEY → bash deploy.sh
     │
     ▼
deploy.sh rsyncs code to /opt/integerant, rebuilds Docker images,
runs migrations, warms caches, smoke-tests /healthz
     │
     ▼
green check on the merge commit · live on https://integerant.com
```

### Manual deploys still work

`deploy.sh` is unchanged and still runs from any developer machine that
has `~/.ssh/operix_deploy` set up. Use this if Actions is unavailable
or to deploy a non-`main` branch.

### Watching a deploy

GitHub Actions tab → "Deploy to production" → click the running run.
You'll see each step (rsync, SSL check, nginx reload, Docker build,
migrations, smoke test) stream live. Typical run is 3-6 minutes
depending on whether the Docker layers are cached.

### What the CI workflow does NOT cover (yet)

- Laravel `phpunit` tests — not run in CI
- Backend type-check / static analysis
- E2E tests against the deployed site

Add these to `ci.yml` (or a new workflow) when the backend stabilises.

---

## Docker services

Defined in `docker-compose.prod.yml`:

| Container            | Image                      | Role                        |
|----------------------|----------------------------|-----------------------------|
| `integrant-frontend` | `integrant-frontend:latest`| Vue 3 SPA (nginx, port 3000) |
| `integrant-api-nginx`| `nginx:1.27-alpine`        | Laravel static assets + FastCGI proxy |
| `integrant-app`      | `integrant-app:latest`     | PHP-FPM (Laravel)           |
| `integrant-db`       | `postgres:16-alpine`       | PostgreSQL                  |

All containers are on the internal `default` network. Only `integrant-frontend` is also on `shared-web` (external), making it reachable from `bfm-frontend`.

---

## Useful commands

```bash
# SSH into server
ssh -i ~/.ssh/operix_deploy ubuntu@51.68.229.216

# View running containers
docker ps

# Tail Laravel logs
docker exec integrant-app tail -f storage/logs/laravel.log

# Run a one-off artisan command
docker exec integrant-app php artisan <command>

# Open a psql shell
docker exec -it integrant-db psql -U integrant -d integrant

# Rebuild and restart without full deploy
cd /opt/integerant
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

# Check bfm-frontend nginx config (must stay clean — no integerant.com in 443 block of default.conf)
docker exec bfm-frontend grep -n 'server_name' /etc/nginx/conf.d/default.conf
docker exec bfm-frontend nginx -t

# SSL cert location (inside bfm-frontend)
docker exec bfm-frontend ls /etc/letsencrypt/live/integerant.com/
```

---

## Known gotchas

**nginx server_name conflict**  
`deploy.sh` uses `sed` to add `integerant.com` to the HTTP redirect block in `bfm-frontend/default.conf`. If `sed` runs on a version of `default.conf` where `server_name operixhq.com` appears in multiple blocks, it may also add `integerant.com` to the HTTPS Operix block, causing a conflict. Fix:

```bash
# Remove integerant.com from the 443 block (keep it only in the 80 redirect block)
docker exec bfm-frontend sed -i \
  '/listen 443 ssl/,/ssl_prefer_server_ciphers/ s/integerant\.com www\.integerant\.com //' \
  /etc/nginx/conf.d/default.conf
docker exec bfm-frontend nginx -t && docker exec bfm-frontend nginx -s reload
```

**SSL cert volume**  
The shared Let's Encrypt volume is named `business-finance-manager_letsencrypt_certs`. The deploy script tries this name first, with fallbacks for `operix_letsencrypt_certs` and `letsencrypt_certs`.

**`.env.prod` is never synced**  
rsync excludes `.env.prod`. If you need to update a production env var, SSH in and edit `/opt/integerant/.env.prod` directly, then run:

```bash
docker exec integrant-app php artisan config:cache
```

---

## Dashboard login

The admin dashboard is at `https://integerant.com/dashboard`.  
Auth is localStorage-based (no backend auth required).

Default credentials:

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@integrant.com`  |
| Password | `password`             |
