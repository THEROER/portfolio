import { THEME_COOKIE, themeFromCookie, themeToCssVars } from "@leavepulse/ui"
import { theroer } from "~/theme/theroer"
import { allPortfolioThemes } from "~/theme/themes"

export default defineNuxtPlugin(() => {
  const storedTheme = useCookie<string | null>(THEME_COOKIE)
  const initialTheme = themeFromCookie(storedTheme.value, allPortfolioThemes) ?? theroer

  useHead({
    htmlAttrs: {
      "data-theme-mode": initialTheme.mode,
      style: `color-scheme: ${initialTheme.mode}; ${themeToCssVars(initialTheme)}`,
    },
  })
})
