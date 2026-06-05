# Architecture — thaliox-web

> Three domains, three positionings, one design system. This document explains **why it is organized this way** and how code, build, and deploy fit together.

## 1. Design goals

1. **Brand consistency** — the three sites should look like the same THALIOX: the same palette, fonts, logo, header and footer.
2. **Per-site decoupling** — a redesign of the brand site should not disturb the docs site; each site builds, deploys, and rolls back independently.
3. **Static first** — all three are static sites (SSG), served directly by nginx, with no resident node process, no runtime attack surface, and CDN-friendly.
4. **Low maintenance** — change a brand color or footer link once and all three sites pick it up; docs are written in Markdown, never touching Vue.

## 2. Choice: Monorepo + shared Nuxt Layer

Among three ways to organize this (three independent projects / one app serving multiple domains / monorepo + shared layer), we chose **monorepo + shared layer**:

- **Three independent projects** rejected: brand, palette, header and footer would each be maintained in three places and inevitably drift.
- **One app rendering per domain** rejected: the three sites become tightly coupled and require a resident node SSR — conflicting with "static first."
- **Monorepo + shared layer** wins: `layers/brand` is a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers),
  and the three apps inherit its UI config, design tokens, and shared components via `extends`; but **each app is an independent Nuxt application with its own `nuxt generate`**.
  Sharing and decoupling at the same time.

```
          layers/brand  (Nuxt Layer: @nuxt/ui config · brand colors · fonts · TheHeader/TheFooter · app.vue shell)
          ╱      │      ╲
   apps/com  apps/dev  apps/io        ← each extends brand, each builds independently
      │         │         │
 thaliox.com thaliox.dev thaliox.io
```

## 3. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Nuxt 4** | `app/` as the source directory; `nuxt generate` emits pure static. |
| UI | **Nuxt UI 4** | One component set + theming system (`app.config.ts` defines the brand colors); includes layout pieces such as UHeader/UFooter/UPageHero. |
| Docs | **@nuxt/content 3** | `apps/io` only: Markdown-driven, files as routes. |
| Images | **@nuxt/image** | Optimizes logos and illustrations. |
| Package manager | **pnpm workspace** | `layers/*` + `apps/*`; dependency hoisting, hard links, fast builds. |
| Runtime | **Node 22 LTS** | Needed at build time only; the output is static files, and at runtime there is only nginx. |

## 4. What the shared layer `layers/brand` provides

- **`nuxt.config.ts`** — registers `@nuxt/ui` and `@nuxt/image`; imports the global CSS (resolved by absolute path so it still points at the layer's own css when inherited by an app).
- **`app.config.ts`** — Nuxt UI theme: `primary` / `neutral` brand colors, border radius, and other design tokens.
- **`app/assets/css/main.css`** — `@import "tailwindcss"; @import "@nuxt/ui";` + brand variables.
- **`app/app.vue`** — the site shell: `UApp > TheHeader + UMain > NuxtPage + TheFooter`. An app only needs to provide `pages/`.
- **`app/components/TheHeader.vue` / `TheFooter.vue`** — cross-domain navigation (brand/dev/docs link to each other via **absolute URLs**), GitHub link, copyright.

Each app's `nuxt.config.ts` only needs:

```ts
export default defineNuxtConfig({
  extends: ['../../layers/brand'],
  site: { url: 'https://thaliox.com', name: 'THALIOX' },
})
```

## 5. Build and deploy pipeline

```
source (this repo)
   └─ pnpm install
   └─ pnpm build                  # nuxt generate for each of the three sites
        → apps/com/.output/public
        → apps/dev/.output/public
        → apps/io/.output/public
   └─ rsync each output → oc:/var/www/thaliox-{com,dev,io}
   └─ nginx's three server blocks each point at one root, reload
```

- **Where to build**: `oc.thaliox.dev` (Node 22 + pnpm already installed), or build locally and rsync.
- **Why rsync to `/var/www/*` instead of serving `.output/public` directly**: the source directory is separated from the web root, so nginx never exposes the source; switching or rolling back is just a directory swap.
- See [DEPLOY.md](DEPLOY.md) for the detailed commands.

## 6. Cross-site linking convention

The three sites live on different domains, so **links between sites always use absolute URLs** (`https://thaliox.dev/...`), while in-site links use relative paths.
The shared header and footer maintain these cross-domain links centrally, so they are not scattered around.

## 7. Evolution

- Content advances with the [THALIOX mainline](https://github.com/thaliox/thaliox-os): M1 is delivered → the dev site lists the milestone, the io site fills in the getting-started docs.
- The old site repo `thaliox/site` (the legacy VTCP/SFS/CHROMA design narrative) is archived and not carried forward; this repo is a façade reorganized from the three TAM primitives.
