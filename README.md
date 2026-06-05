# thaliox-web — THALIOX websites monorepo

[THALIOX](https://github.com/thaliox/thaliox-os) is an operating system for AI, by AI.
This repo is its public face: three domains, three roles, one shared design system, built with
**Nuxt 4 + Nuxt UI** and deployed as static sites on the `oc.thaliox.dev` host.

| Domain | Role | App | Content source |
|---|---|---|---|
| **thaliox.com** | Brand — vision, narrative, first impression | `apps/com` | hand-written pages |
| **thaliox.dev** | Development — progress, milestones, RFCs, changelog | `apps/dev` | hand-written + synced from `thaliox-os` |
| **thaliox.io** | Docs — getting started, concepts, reference | `apps/io` | `@nuxt/content` (Markdown) |

All three share `layers/brand`: colors, fonts, logo, header/footer, design tokens — **change it once, all three update**.

## Structure

```
thaliox-web/
├─ docs/                  architecture / sites / deploy notes for this repo
├─ layers/
│  └─ brand/              shared design layer (Nuxt Layer): UI config, brand colors, TheHeader/TheFooter, app.vue shell
├─ apps/
│  ├─ com/                brand site  → thaliox.com
│  ├─ dev/                dev site    → thaliox.dev
│  └─ io/                 docs site   → thaliox.io (@nuxt/content)
├─ deploy/                deploy.sh + nginx configs
├─ pnpm-workspace.yaml
└─ package.json           workspace scripts
```

## Develop

```bash
pnpm install              # install all workspace dependencies
pnpm dev:com              # run the brand site (also dev:dev / dev:io)
```

## Build (static SSG)

```bash
pnpm build                # each site runs nuxt generate → apps/*/.output/public
pnpm build:io             # build only the docs site
```

## Deploy

```bash
./deploy/deploy.sh [com|dev|io|all]
```

Host, nginx, and DNS details are in [docs/DEPLOY.md](docs/DEPLOY.md).

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — why monorepo + shared layer, tech choices, build pipeline.
- [docs/SITES.md](docs/SITES.md) — each site's role, information architecture, content plan.
- [docs/DEPLOY.md](docs/DEPLOY.md) — oc host, nginx, domains, deploy flow.

## License

Apache-2.0 OR MIT
