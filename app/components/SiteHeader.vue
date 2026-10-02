<script setup lang="ts">
import { LpButton, LpIcon, LpRollingText, LpShift, LpThemeSwitcher } from "@leavepulse/ui"
import { NuxtLink } from "#components"
import { allPortfolioThemes } from "~/theme/themes"

const { t, locale, setLocale } = useI18n()
const commandPaletteOpen = useState("command-palette-open", () => false)

const otherLocale = computed(() => (locale.value === "en" ? "fr" : "en"))

// no_prefix strategy: switching locale is a pure in-place swap (no navigation,
// URL unchanged), so the scroll position is untouched.
function switchLanguage() {
  setLocale(otherLocale.value)
}

const navItems = computed(() => [
  { to: "/#work", label: t("nav.work") },
  { to: "/#stack", label: t("nav.stack") },
  { to: "/#services", label: t("nav.services") },
  { to: "/#contact", label: t("nav.contact") },
])
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
    <div class="section relative flex h-16 items-center justify-between gap-4">
      <NuxtLinkLocale to="/" class="flex items-center gap-2.5 font-semibold tracking-tight">
        <span class="identity-mark grid h-7 w-7 place-items-center rounded-control font-mono text-sm font-bold text-ink-inverse">
          t
        </span>
        <span class="hidden sm:inline">theroer<span class="text-brand">.dev</span></span>
      </NuxtLinkLocale>

      <LpShift axis="width" class="absolute left-1/2 hidden -translate-x-1/2 lg:block">
        <nav class="flex items-center gap-7">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm text-muted transition-colors hover:text-ink"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </LpShift>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="command-trigger hidden sm:inline-flex"
          :aria-label="t('commands.open')"
          @click="commandPaletteOpen = true"
        >
          <LpIcon name="lucide:search" :size="14" />
          <span>{{ t("commands.open") }}</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          type="button"
          :aria-label="`Switch language to ${otherLocale.toUpperCase()}`"
          class="grid h-[30px] min-w-[30px] place-items-center rounded-control border border-line px-1.5 font-mono text-xs uppercase text-muted transition-colors hover:border-line-strong hover:text-ink"
          @click="switchLanguage"
        >
          <LpRollingText :value="otherLocale.toUpperCase()" :duration="160" />
        </button>
        <LpThemeSwitcher
          :themes="allPortfolioThemes"
          :cycle-themes="['Dark', 'Light']"
          default="Dark"
          variant="icon"
          size="sm"
          :aria-label="t('theme.switch')"
        />
        <LpShift axis="width">
          <LpButton :as="NuxtLink" to="/#contact" size="sm">
            <LpRollingText :value="t('nav.hire')" :duration="160" align="center" />
          </LpButton>
        </LpShift>
      </div>
    </div>
  </header>
</template>
