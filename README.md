# Portfolio — theroer.dev

Freelance portfolio site. Nuxt 3 (v4 layout) + the vendored `@leavepulse/ui`
component kit, lime theme. English (`/`) and French (`/fr`).

## Develop

```bash
bun install
bun dev            # http://localhost:3000
```

> Uses **bun**, not npm/pnpm.

## Build

```bash
bun run build      # SSR build -> .output/
bun .output/server/index.mjs
```

## Editing content

- Copy: `i18n/locales/en.json` and `i18n/locales/fr.json`.
- Projects shown, stack, stats, contacts: `app/composables/useProfile.ts`.
- The UI kit is vendored under `vendor/leavepulse-ui/` so the app is
  self-contained (builds in Docker without the external LeavePulse checkout).

## Deploy (LeavePulse infra)

Deployed as the `portfolio` service via the `lp` toolkit. The GitHub Actions
workflow (`.github/workflows/build-ghcr.yml`) builds and pushes
`ghcr.io/leavepulse/leavepulse-portfolio` on every push to `main`; `lp deploy`
pulls that image onto `app-vps-1` behind the proxy (domain `theroer.dev`).

```bash
docker build -t leavepulse-portfolio .
docker run -p 3000:3000 leavepulse-portfolio
```
