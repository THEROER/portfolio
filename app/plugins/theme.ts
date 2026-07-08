import { presets, themeToCssVars, type TokenSet } from "@leavepulse/ui"

// Single source of truth for the theme across SSR + client: a cookie holding the
// preset NAME. The kit's own engine (useTheme/LpThemeSwitcher) persists to
// localStorage and drives live swaps; the cookie is what lets the SERVER know
// the choice so the very first paint already matches — no flash, no reset to the
// default on reload/navigation.
//
// Why a plugin owns <html> here: useHead is reactive, so its htmlAttrs are
// re-asserted on every navigation. Previously it hard-coded `lime`, which
// clobbered the user's choice on any route change. Binding it to the cookie
// instead keeps head + DOM in agreement.
export const THEME_COOKIE = "lp-theme"
const DEFAULT = presets.lime

// The cookie stores a theme's display NAME (e.g. "Lime"), matching what the kit
// puts in its own localStorage — not the lowercase presets key.
function resolve(name: string | null | undefined): TokenSet {
  const all = Object.values(presets) as TokenSet[]
  return all.find((t) => t.name === name) ?? DEFAULT
}

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string>(THEME_COOKIE, {
    default: () => DEFAULT.name,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  })

  const theme = computed(() => resolve(cookie.value))
  const mode = computed(() => theme.value.mode)
  const style = computed(() => `color-scheme: ${theme.value.mode}; ${themeToCssVars(theme.value)}`)

  useHead({
    htmlAttrs: {
      "data-theme-mode": mode,
      style,
    },
  })

  return {
    provide: {
      // Exposed so the switcher can write the chosen name back to the cookie,
      // keeping SSR in sync with the kit's localStorage.
      themeCookie: cookie,
    },
  }
})
