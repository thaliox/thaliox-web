# Deploy — oc.thaliox.dev

All three sites are static output, served directly by nginx on `oc.thaliox.dev`.

## Current status (2026-06-05)

| Site | Build | Deploy | Public reachable |
|---|---|---|---|
| thaliox.com | ✅ | ✅ `/var/www/thaliox-com` | ✅ HTTPS |
| thaliox.dev | ✅ | ✅ `/var/www/thaliox-dev` | ✅ HTTPS (DNS now points at oc, certbot has signed) |
| thaliox.io | ✅ | ✅ `/var/www/thaliox-io` | ✅ HTTPS |

All three sites are live over HTTPS; the A records for the three domains (and www) point to `170.106.107.147`, with TLS auto-renewed by Let's Encrypt.

One-click deploy: `./deploy/deploy.sh [com|dev|io|all]` (see `deploy/` in the repo). The nginx config lives under `deploy/nginx/`.

> **io build note**: `@nuxt/content` v3 depends on `better-sqlite3` (pinned to ^12) and tends to OOM during generation —
> io's `generate` script already bakes in `NODE_OPTIONS=--max-old-space-size=3072`.

## Host

- **oc.thaliox.dev** (170.106.107.147, Tencent Cloud · Ubuntu 24.04)
- SSH: `ssh -p 65522 root@oc.thaliox.dev` (port **65522**, not the standard 22)
- Installed: nginx 1.24, Node 22 LTS, pnpm 9
- Source workspace: `/opt/thaliox-web`
- web roots: `/var/www/thaliox-com` · `/var/www/thaliox-dev` · `/var/www/thaliox-io`

## Domain → root mapping

| Domain | nginx server_name | root |
|---|---|---|
| thaliox.com (+ www) | `thaliox.com www.thaliox.com` | `/var/www/thaliox-com` |
| thaliox.dev (+ www) | `thaliox.dev www.thaliox.dev` | `/var/www/thaliox-dev` |
| thaliox.io (+ www) | `thaliox.io www.thaliox.io` | `/var/www/thaliox-io` |

> In the old config, thaliox.com and thaliox.io once shared `/var/www/thaliox-site` (the legacy static design site),
> and thaliox.dev was not configured. The new scheme gives each of the three domains its own root. The old directory is kept for rollback.

## First deploy

```bash
# 1. Sync source to oc (local repo → oc workspace)
rsync -az --delete --exclude node_modules --exclude .output --exclude .nuxt \
  ./ -e 'ssh -p 65522' root@oc.thaliox.dev:/opt/thaliox-web/

# 2. Install + build the three sites on oc
ssh -p 65522 root@oc.thaliox.dev '
  cd /opt/thaliox-web && pnpm install && pnpm build'

# 3. Each site's output → web root
ssh -p 65522 root@oc.thaliox.dev '
  for s in com dev io; do
    mkdir -p /var/www/thaliox-$s
    rsync -a --delete /opt/thaliox-web/apps/$s/.output/public/ /var/www/thaliox-$s/
  done'

# 4. Install the nginx site config (see deploy/nginx/), enable it and reload
ssh -p 65522 root@oc.thaliox.dev 'nginx -t && systemctl reload nginx'
```

## TLS

Issue with certbot for the three domains (including www):

```bash
certbot --nginx -d thaliox.com -d www.thaliox.com \
                -d thaliox.dev -d www.thaliox.dev \
                -d thaliox.io  -d www.thaliox.io
```

## Routine updates

Edit content → verify locally with `pnpm build:<site>` → repeat steps 1-3 above for the single site → no reload needed (only static files change).
Later this can be wired into CI (push to main auto-builds + rsyncs).

## DNS (at the domain registrar)

The A records for the three domains (and www) point to `170.106.107.147`. If `thaliox.dev` did not previously point here, add it.
