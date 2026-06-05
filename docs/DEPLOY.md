# 部署 — oc.thaliox.dev

三站都是静态产物,由 `oc.thaliox.dev` 上的 nginx 直接 serve。

## 当前状态(2026-06-05)

| 站点 | 构建 | 部署 | 公网可达 |
|---|---|---|---|
| thaliox.com | ✅ | ✅ `/var/www/thaliox-com` | ✅ HTTPS |
| thaliox.dev | ✅ | ✅ `/var/www/thaliox-dev` | ✅ HTTPS(DNS 已切到 oc,certbot 已签) |
| thaliox.io | ✅ | ✅ `/var/www/thaliox-io` | ✅ HTTPS |

三站均已 HTTPS 上线;三域名(及 www)A 记录指向 `170.106.107.147`,TLS 由 Let's Encrypt 自动续期。

一键部署:`./deploy/deploy.sh [com|dev|io|all]`(见仓库 `deploy/`)。nginx 配置存于 `deploy/nginx/`。

> **io 构建注意**:`@nuxt/content` v3 依赖 `better-sqlite3`(已锁 ^12),且生成时易 OOM——
> io 的 `generate` 脚本已内置 `NODE_OPTIONS=--max-old-space-size=3072`。

## 主机

- **oc.thaliox.dev**(170.106.107.147,腾讯云 · Ubuntu 24.04)
- SSH:`ssh -p 65522 root@oc.thaliox.dev`(端口 **65522**,非标准 22)
- 已装:nginx 1.24、Node 22 LTS、pnpm 9
- 源码工作区:`/opt/thaliox-web`
- web roots:`/var/www/thaliox-com` · `/var/www/thaliox-dev` · `/var/www/thaliox-io`

## 域名 → root 映射

| 域名 | nginx server_name | root |
|---|---|---|
| thaliox.com (+ www) | `thaliox.com www.thaliox.com` | `/var/www/thaliox-com` |
| thaliox.dev (+ www) | `thaliox.dev www.thaliox.dev` | `/var/www/thaliox-dev` |
| thaliox.io (+ www) | `thaliox.io www.thaliox.io` | `/var/www/thaliox-io` |

> 旧配置里 thaliox.com 与 thaliox.io 曾共用 `/var/www/thaliox-site`(旧设计静态站),
> thaliox.dev 未配置。新方案三域名各自独立 root。旧目录保留作回滚。

## 首次部署

```bash
# 1. 同步源码到 oc(本地仓库 → oc 工作区)
rsync -az --delete --exclude node_modules --exclude .output --exclude .nuxt \
  ./ -e 'ssh -p 65522' root@oc.thaliox.dev:/opt/thaliox-web/

# 2. 在 oc 上安装 + 构建三站
ssh -p 65522 root@oc.thaliox.dev '
  cd /opt/thaliox-web && pnpm install && pnpm build'

# 3. 各站产物 → web root
ssh -p 65522 root@oc.thaliox.dev '
  for s in com dev io; do
    mkdir -p /var/www/thaliox-$s
    rsync -a --delete /opt/thaliox-web/apps/$s/.output/public/ /var/www/thaliox-$s/
  done'

# 4. 安装 nginx 站点配置(见 deploy/nginx/ ),启用并 reload
ssh -p 65522 root@oc.thaliox.dev 'nginx -t && systemctl reload nginx'
```

## TLS

用 certbot 为三域名签发(含 www):

```bash
certbot --nginx -d thaliox.com -d www.thaliox.com \
                -d thaliox.dev -d www.thaliox.dev \
                -d thaliox.io  -d www.thaliox.io
```

## 日常更新

改完内容 → 本地 `pnpm build:<站>` 验证 → 重复上面 1–3 步对应单站 → 无需 reload(只换静态文件)。
后续可把这套放进 CI(push 到 main 自动构建 + rsync)。

## DNS(在域名注册商处)

三域名(及 www)A 记录指向 `170.106.107.147`。`thaliox.dev` 此前未指向本机的话需补。
