// No-op. Icon registration now lives in @leavepulse/ui itself (its icons.ts is
// marked sideEffect so addCollection survives bundling), so the app doesn't
// need to register lucide anymore. Kept as an empty plugin to avoid a stale
// import; safe to delete.
export default defineNuxtPlugin(() => {})
