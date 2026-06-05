# 架构 — thaliox-web

> 三个域名、三种定位、一套设计系统。本文解释**为什么这样组织**,以及代码、构建、部署如何衔接。

## 1. 设计目标

1. **品牌一致** — 三站看起来是同一个 THALIOX:同一套配色、字体、Logo、页眉页脚。
2. **各站解耦** — 品牌站改版不应牵动文档站;每站独立构建、独立部署、独立回滚。
3. **静态优先** — 三站都是静态站点(SSG),nginx 直接 serve,无 node 常驻、无运行时攻击面、CDN 友好。
4. **低维护** — 改一次品牌色/页脚链接,三站同步;文档用 Markdown 写,不碰 Vue。

## 2. 选型:Monorepo + 共享 Nuxt Layer

在三种组织方式中(三独立项目 / 单 app 多域 / monorepo+共享层),选 **monorepo + 共享层**:

- **三独立项目**否决:品牌、配色、页眉页脚要在三处各自维护,必然走样。
- **单 app 按域名渲染**否决:三站强耦合,且需 node SSR 常驻——与"静态优先"冲突。
- **monorepo + 共享层**胜出:`layers/brand` 是一个 [Nuxt Layer](https://nuxt.com/docs/getting-started/layers),
  三个 app 通过 `extends` 继承它的 UI 配置、设计令牌与共享组件;但**各 app 是独立的 Nuxt 应用,独立 `nuxt generate`**。
  共享与解耦兼得。

```
          layers/brand  (Nuxt Layer:@nuxt/ui 配置 · 品牌色 · 字体 · TheHeader/TheFooter · app.vue 外壳)
          ╱      │      ╲
   apps/com  apps/dev  apps/io        ← 各 extends brand,各自独立构建
      │         │         │
 thaliox.com thaliox.dev thaliox.io
```

## 3. 技术栈

| 关注点 | 选型 | 说明 |
|---|---|---|
| 框架 | **Nuxt 4** | `app/` 作为源目录;`nuxt generate` 出纯静态。 |
| UI | **Nuxt UI 4** | 一套组件 + 主题系统(`app.config.ts` 定义品牌色);含 UHeader/UFooter/UPageHero 等布局件。 |
| 文档 | **@nuxt/content 3** | 仅 `apps/io`:Markdown 驱动,文件即路由。 |
| 图像 | **@nuxt/image** | 优化 Logo/插图。 |
| 包管理 | **pnpm workspace** | `layers/*` + `apps/*`;依赖提升、硬链接、构建快。 |
| 运行时 | **Node 22 LTS** | 仅构建期需要;产物是静态文件,运行期只有 nginx。 |

## 4. 共享层 `layers/brand` 提供什么

- **`nuxt.config.ts`** — 注册 `@nuxt/ui`、`@nuxt/image`;引入全局 CSS(用绝对路径解析,确保被 app 继承时仍指向 layer 自身的 css)。
- **`app.config.ts`** — Nuxt UI 主题:`primary` / `neutral` 品牌色、圆角等设计令牌。
- **`app/assets/css/main.css`** — `@import "tailwindcss"; @import "@nuxt/ui";` + 品牌变量。
- **`app/app.vue`** — 站点外壳:`UApp > TheHeader + UMain > NuxtPage + TheFooter`。app 只需提供 `pages/`。
- **`app/components/TheHeader.vue` / `TheFooter.vue`** — 跨域导航(品牌/开发/文档用**绝对 URL** 互链)、GitHub 链接、版权。

每个 app 的 `nuxt.config.ts` 只需:

```ts
export default defineNuxtConfig({
  extends: ['../../layers/brand'],
  site: { url: 'https://thaliox.com', name: 'THALIOX' },
})
```

## 5. 构建与部署流水线

```
源码(本仓库)
   └─ pnpm install
   └─ pnpm build                  # 三站各 nuxt generate
        → apps/com/.output/public
        → apps/dev/.output/public
        → apps/io/.output/public
   └─ rsync 各产物 → oc:/var/www/thaliox-{com,dev,io}
   └─ nginx 三 server 块各指一个 root,reload
```

- **构建在哪**:`oc.thaliox.dev`(已装 Node 22 + pnpm),或本地构建后 rsync。
- **为何 rsync 到 `/var/www/*` 而非直接 serve `.output/public`**:源码目录与 web root 分离,nginx 不暴露源码;切换/回滚只换目录。
- 详细命令见 [DEPLOY.md](DEPLOY.md)。

## 6. 跨站链接约定

三站在不同域名下,**站间链接一律用绝对 URL**(`https://thaliox.dev/...`),站内链接用相对路径。
共享页眉页脚集中维护这些跨域链接,避免散落。

## 7. 演进

- 内容随 [THALIOX 主线](https://github.com/thaliox/thaliox-os)推进:M1 已交付 → dev 站登里程碑、io 站补上手文档。
- 旧官网仓库 `thaliox/site`(VTCP/SFS/CHROMA 旧设计叙事)已归档,不再延续;本仓库是从 TAM 三原语重新组织的门面。
