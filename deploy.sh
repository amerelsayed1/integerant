#!/usr/bin/env bash
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────────────
SERVER="ubuntu@51.68.229.216"
SSH_KEY="$HOME/.ssh/operix_deploy"
DEPLOY_PATH="/opt/integerant"
DOMAIN="bunyanx.com"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"

ssh_run()  { ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER" "$@"; }
ssh_run_q(){ ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER" "$@" 2>/dev/null || true; }

log() { echo ""; echo "==> $*"; }

# ─── Step 1: Upload code ──────────────────────────────────────────────────────
log "Uploading code to ${DEPLOY_PATH}..."
rsync -az --progress \
  -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no" \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='vendor' \
  --exclude='.env' \
  --exclude='.env.prod' \
  --exclude='*.log' \
  --exclude='backend/storage/logs/*' \
  "${LOCAL_PATH}/" \
  "${SERVER}:${DEPLOY_PATH}/"

# ─── Step 2: Bootstrap server on first deploy ─────────────────────────────────
log "Bootstrapping server (idempotent)..."
ssh_run "
  # Create shared Docker network (if not exists)
  docker network inspect shared-web >/dev/null 2>&1 || docker network create shared-web
  echo '  shared-web network: ok'

  # Connect bfm-frontend to shared-web (if not already)
  docker network inspect shared-web --format '{{range .Containers}}{{.Name}} {{end}}' \
    | grep -q bfm-frontend \
    || docker network connect shared-web bfm-frontend
  echo '  bfm-frontend connected to shared-web: ok'

  # Ensure .env.prod exists
  if [ ! -f ${DEPLOY_PATH}/.env.prod ]; then
    echo '  ERROR: .env.prod not found at ${DEPLOY_PATH}/.env.prod'
    echo '  Run: nano ${DEPLOY_PATH}/.env.prod  and fill in values from .env.prod.example'
    exit 1
  fi
  echo '  .env.prod: ok'
"

# ─── Step 3: Issue SSL cert (first deploy only) ───────────────────────────────
log "Checking SSL certificate for ${DOMAIN}..."
ssh_run "
  CERT_DIR=\$(docker volume inspect business-finance-manager_letsencrypt_certs -f '{{.Mountpoint}}' 2>/dev/null \
             || docker volume inspect operix_letsencrypt_certs -f '{{.Mountpoint}}' 2>/dev/null \
             || docker volume inspect letsencrypt_certs -f '{{.Mountpoint}}' 2>/dev/null)

  if [ ! -f \"\${CERT_DIR}/live/${DOMAIN}/fullchain.pem\" ]; then
    echo '  Issuing SSL certificate for ${DOMAIN}...'
    # Create cert dir in the shared volume
    docker exec bfm-acme mkdir -p /etc/letsencrypt/live/${DOMAIN}

    # Issue cert via bfm-acme (has Namecheap creds and acme.sh installed)
    docker exec bfm-acme acme.sh --issue \
      -d ${DOMAIN} \
      -d www.${DOMAIN} \
      --dns dns_namecheap \
      --dnssleep 30 \
      --server letsencrypt || true

    # Install cert into letsencrypt volume
    docker exec bfm-acme acme.sh --install-cert \
      -d ${DOMAIN} \
      --cert-file /etc/letsencrypt/live/${DOMAIN}/cert.pem \
      --key-file /etc/letsencrypt/live/${DOMAIN}/privkey.pem \
      --fullchain-file /etc/letsencrypt/live/${DOMAIN}/fullchain.pem \
      --ca-file /etc/letsencrypt/live/${DOMAIN}/chain.pem

    echo '  SSL certificate issued!'
  else
    echo '  SSL certificate already exists, skipping.'
  fi
"

# ─── Step 4: Inject bunyanx.com nginx block into bfm-frontend ─────────────
log "Updating bfm-frontend nginx with ${DOMAIN} server block..."
ssh_run "cat > /tmp/bunyanx_nginx.conf << 'NGINXEOF'
# ── bunyanx.com ─────────────────────────────────────────────────────────────
server {
    listen 443 ssl;
    http2 on;
    server_name bunyanx.com www.bunyanx.com;

    ssl_certificate     /etc/letsencrypt/live/bunyanx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bunyanx.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;

    add_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;

    location = /healthz {
        access_log off;
        default_type text/plain;
        return 200 \"ok\";
    }

    location / {
        proxy_pass http://integrant-frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 300;
    }
}
NGINXEOF

# Copy nginx snippet into bfm-frontend and add bunyanx.com to HTTP redirect block
docker cp /tmp/bunyanx_nginx.conf bfm-frontend:/etc/nginx/conf.d/bunyanx.com.conf

# Add bunyanx.com to the HTTP redirect server_name (if not already)
docker exec bfm-frontend sh -c \"
  grep -q 'bunyanx.com' /etc/nginx/conf.d/default.conf \
    || sed -i 's/server_name operixhq.com/server_name bunyanx.com www.bunyanx.com operixhq.com/' /etc/nginx/conf.d/default.conf
\"

# Test and reload
docker exec bfm-frontend nginx -t && docker exec bfm-frontend nginx -s reload
echo '  nginx reloaded with bunyanx.com config'
"

# ─── Step 5: Build and start containers ───────────────────────────────────────
log "Building and starting integerant containers..."
ssh_run "cd ${DEPLOY_PATH} && docker compose -f docker-compose.prod.yml up -d --build --remove-orphans"

# ─── Step 6: Wait for app to be healthy ───────────────────────────────────────
log "Waiting for app container to be healthy (up to 120s)..."
ssh_run "
  timeout=120
  until docker exec integrant-app php artisan --version >/dev/null 2>&1; do
    sleep 3; timeout=\$((timeout-3))
    [ \$timeout -le 0 ] && echo 'ERROR: app did not start in time' && exit 1
  done
  echo '  App is ready.'
"

# ─── Step 7: Migrations ───────────────────────────────────────────────────────
log "Running migrations..."
ssh_run "docker exec integrant-app php artisan migrate --force"

# ─── Step 8: Cache ────────────────────────────────────────────────────────────
log "Warming caches..."
ssh_run "docker exec integrant-app php artisan config:cache && docker exec integrant-app php artisan route:cache && docker exec integrant-app php artisan view:cache"

# ─── Step 9: Smoke test ───────────────────────────────────────────────────────
log "Smoke test..."
ssh_run "curl -sf https://${DOMAIN}/healthz | grep -q ok && echo '  https://${DOMAIN} ✓'"

log "Deploy complete → https://${DOMAIN}"
