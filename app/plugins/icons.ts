import { addIcon } from "@iconify/vue"
import { icons as lucide } from "@iconify-json/lucide"

/*
 * Register the lucide icons the site uses, OFFLINE, on both server and client.
 * Without this, @iconify/vue renders empty <svg> placeholders during SSR and
 * fetches the real paths from api.iconify.design on the client — which changes
 * the DOM after hydration and triggers "Hydration completed but contains
 * mismatches". Registering the icons up front makes SSR and CSR render the same
 * markup (and removes the external icon request).
 *
 * Not a *.client plugin on purpose: it must run during SSR too.
 */
const USED = [
  "bot",
  "check",
  "github",
  "layout-dashboard",
  "life-buoy",
  "linkedin",
  "mail",
  "send",
  "server",
] as const

export default defineNuxtPlugin(() => {
  for (const name of USED) {
    const data = lucide.icons[name]
    if (data) {
      addIcon(`lucide:${name}`, {
        ...lucide.icons[name],
        width: lucide.width,
        height: lucide.height,
      })
    }
  }
})
