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

## CI/CD — GitHub Actions

Merging to `main` triggers `.github/workflows/deploy.yml`, which runs `deploy.sh` on a GitHub-hosted runner.

### Required secret: `DEPLOY_SSH_KEY`

The workflow injects the private SSH key from this secret into `~/.ssh/operix_deploy` before calling `deploy.sh`.  
It must be set in **two places** (the job uses the `production` environment, so both levels are checked):

| Scope | Where to set |
|---|---|
| Repository | Settings → Secrets → Actions → `DEPLOY_SSH_KEY` |
| Environment | Settings → Environments → production → `DEPLOY_SSH_KEY` |

To re-add from the local key file (requires `gh` CLI authenticated as a repo admin):

```bash
gh secret set DEPLOY_SSH_KEY --repo amerelsayed1/integerant < ~/.ssh/operix_deploy
gh secret set DEPLOY_SSH_KEY --repo amerelsayed1/integerant --env production < ~/.ssh/operix_deploy
```

The key used is `~/.ssh/operix_deploy` — the same shared deploy key as the Operix project on the same server.

---

## Prerequisites

### SSH key
The deploy script uses `~/.ssh/operix_deploy`.  
If setting up on a new machine, copy your private key there:

```bash
cp /path/to/key ~/.ssh/operix_deploy
chmod 600 ~/.ssh/operix_deploy
```

The matching public key (`~/.ssh/operix_deploy.pub`) must be in `~ubuntu/.ssh/authorized_keys` on `51.68.229.216`.

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
