import { amber, dark, light, lime, violet, type TokenSet } from "@leavepulse/ui"
import { theroer } from "~/theme/theroer"
import { cursioTheme } from "~/theme/cursio"

const neutralDark: TokenSet = { ...lime, name: "Dark" }

export const portfolioThemes: TokenSet[] = [neutralDark, theroer, cursioTheme, light]

export const allPortfolioThemes: TokenSet[] = [
  ...portfolioThemes,
  dark,
  violet,
  amber,
]
