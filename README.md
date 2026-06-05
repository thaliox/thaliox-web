# thaliox-web — THALIOX 官网 monorepo

[THALIOX](https://github.com/thaliox/thaliox-os) 是为 AI、由 AI 打造的操作系统。
本仓库是它的**对外门面**:三个域名、三种定位,共享一套设计系统,用 **Nuxt 4 + Nuxt UI** 构建,
静态产物部署在 `oc.thaliox.dev` 主机。

| 域名 | 定位 | app | 内容来源 |
|---|---|---|---|
| **thaliox.com** | 品牌站 — 愿景、叙事、第一印象 | `apps/com` | 手写页面 |
| **thaliox.dev** | 开发站 — 进展、里程碑、RFC、变更日志 | `apps/dev` | 手写 + 同步自 `thaliox-os` |
| **thaliox.io** | 文档站 — 上手、概念、参考 | `apps/io` | `@nuxt/content`(Markdown) |

三站共享 `layers/brand`:配色、字体、Logo、页眉页脚、设计令牌——**改一处,三站同步**。

## 结构

```
thaliox-web/
├─ docs/                  本仓库的架构/站点/部署说明
├─ layers/
│  └─ brand/              共享设计层(Nuxt Layer):UI 配置、品牌色、TheHeader/TheFooter、app.vue 外壳
├─ apps/
│  ├─ com/                品牌站  → thaliox.com
│  ├─ dev/                开发站  → thaliox.dev
│  └─ io/                 文档站  → thaliox.io(@nuxt/content)
├─ pnpm-workspace.yaml
└─ package.json           workspace 脚本
```

## 开发

```bash
pnpm install              # 安装全部 workspace 依赖
pnpm dev:com              # 起品牌站(同理 dev:dev / dev:io)
```

## 构建(静态 SSG)

```bash
pnpm build                # 三站各自 nuxt generate,产物在 apps/*/.output/public
pnpm build:io             # 只构建文档站
```

部署到 `oc.thaliox.dev` 与 nginx 配置见 [docs/DEPLOY.md](docs/DEPLOY.md)。

## 文档

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 为什么是 monorepo + 共享层、技术选型、构建流水线。
- [docs/SITES.md](docs/SITES.md) — 三站各自的定位、信息架构、内容规划。
- [docs/DEPLOY.md](docs/DEPLOY.md) — oc 主机、nginx、域名、部署流程。

## License

Apache-2.0 OR MIT
