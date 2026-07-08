# theroer.dev

My personal portfolio site. Source for the site live at **[theroer.dev](https://theroer.dev)**.

## About me

I'm **theroer** — a freelance backend & full-stack engineer based in France.
I design and ship production microservice platforms in **Python, Rust and
TypeScript** — from a single typed API to a ~40-service mesh with realtime,
billing and observability built in.

**Ways to work with me:**

- **Backend & APIs** — FastAPI / Litestar services, gRPC meshes, auth, billing.
- **Web & full-stack** — Nuxt / Vue / TypeScript front-ends wired to a backend that holds up.
- **Bots & automation** — Telegram/Discord bots, scrapers, integrations.
- **Rescue & review** — audit, debug or finish an existing Python / Rust / TypeScript codebase.

**Get in touch:** [email](mailto:theroer09@gmail.com) ·
[Telegram](https://t.me/theroer) ·
[GitHub](https://github.com/THEROER) ·
[LinkedIn](https://www.linkedin.com/in/theroer)

## About this repo

The site itself: Nuxt 3 (v4 layout) + the vendored `@leavepulse/ui` component
kit, lime theme. Bilingual — English (`/`) and French (`/fr`).

### Develop

```bash
bun install
bun dev            # http://localhost:3000
```

> Uses **bun**, not npm/pnpm.

### Build

```bash
bun run build      # SSR build -> .output/
bun .output/server/index.mjs
```

### Run in Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Editing content

- Copy: `i18n/locales/en.json` and `i18n/locales/fr.json`.
- Projects, stack, stats, contacts: `app/composables/useProfile.ts`.
- The UI kit is vendored under `vendor/leavepulse-ui/` so the app is
  self-contained (builds without an external checkout).
