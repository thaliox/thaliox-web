#!/usr/bin/env bash
# 构建并部署 thaliox-web 三站到 oc.thaliox.dev。
# 用法:./deploy/deploy.sh [com|dev|io|all]   (默认 all)
set -euo pipefail

OC="root@oc.thaliox.dev"
SSH="ssh -p 65522 -o BatchMode=yes"
SRC="/opt/thaliox-web"
TARGET="${1:-all}"

here="$(cd "$(dirname "$0")/.." && pwd)"

echo "▶ 同步源码 → oc:$SRC"
rsync -az --delete \
  --exclude node_modules --exclude .output --exclude .nuxt --exclude .git \
  -e "$SSH" "$here/" "$OC:$SRC/"

echo "▶ oc: pnpm install + 构建"
if [ "$TARGET" = "all" ]; then
  $SSH "$OC" "cd $SRC && pnpm install && pnpm build"
  sites="com dev io"
else
  $SSH "$OC" "cd $SRC && pnpm install && pnpm build:$TARGET"
  sites="$TARGET"
fi

echo "▶ oc: 产物 → web root"
for s in $sites; do
  $SSH "$OC" "mkdir -p /var/www/thaliox-$s && rsync -a --delete $SRC/apps/$s/.output/public/ /var/www/thaliox-$s/"
  echo "  thaliox-$s 已更新"
done

echo "✓ 完成。静态文件已就位,无需 reload nginx。"
