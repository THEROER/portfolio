import { applyTheme, lime } from "@leavepulse/ui"

/*
 * Paint the LeavePulse "lime" preset into :root as CSS variables before the app
 * mounts. The kit's components read only those variables, so this re-skins the
 * whole UI. Client-only because applyTheme writes to document.documentElement.
 */
export default defineNuxtPlugin(() => {
  applyTheme(lime)
})
