// Theme is now applied during SSR via plugins/theme.ts (useHead htmlAttrs) so
// the server and client emit the same <html> attributes — no post-mount DOM
// mutation, no hydration mismatch. This file is intentionally a no-op; safe to
// delete.
export default defineNuxtPlugin(() => {})
