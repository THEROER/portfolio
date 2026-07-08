<script setup lang="ts">
import { LpButton, LpThemeSwitcher, lime, light, type TokenSet } from "@leavepulse/ui"

const themes = [lime, light]

// Keep the SSR cookie in sync with the kit's own (localStorage) choice so a
// reload / navigation re-paints the chosen theme instead of the default.
const { $themeCookie } = useNuxtApp()
const currentTheme = computed(() => (themes.find((th) => th.name === $themeCookie.value) ?? lime))
function onThemeChange(theme: TokenSet) {
  $themeCookie.value = theme.name
}

const { t, locale, setLocale } = useI18n()

const otherLocale = computed(() => (locale.value === "en" ? "fr" : "en"))

// no_prefix strategy: switching locale is a pure in-place swap (no navigation,
// URL unchanged), so the scroll position is untouched.
function switchLanguage() {
  setLocale(otherLocale.value)
}

const navItems = computed(() => [
  { href: "#work", label: t("nav.work") },
  { href: "#stack", label: t("nav.stack") },
  { href: "#services", label: t("nav.services") },
  { href: "#contact", label: t("nav.contact") },
])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line bg-surface/80 backdrop-blur-md">
    <div class="section flex h-16 items-center justify-between gap-4">
      <NuxtLinkLocale to="/" class="flex items-center gap-2 font-semibold tracking-tight">
        <span class="grid h-7 w-7 place-items-center rounded-control bg-brand font-mono text-sm font-bold text-ink-inverse">
          t
        </span>
        <span class="hidden sm:inline">theroer<span class="text-brand">.dev</span></span>
      </NuxtLinkLocale>

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm text-muted transition-colors hover:text-ink"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <ClientOnly>
          <LpThemeSwitcher
            :themes="themes"
            :default="currentTheme"
            variant="icon"
            size="sm"
            @change="onThemeChange"
          />
          <template #fallback>
            <span class="h-[30px] w-[42px]" />
          </template>
        </ClientOnly>
        <button
          type="button"
          :aria-label="`Switch language to ${otherLocale.toUpperCase()}`"
          class="grid h-[30px] min-w-[30px] place-items-center rounded-control border border-line px-1.5 font-mono text-xs uppercase text-muted transition-colors hover:border-line-strong hover:text-ink"
          @click="switchLanguage"
        >
          {{ otherLocale }}
        </button>
        <a href="#contact">
          <LpButton size="sm">{{ t("nav.hire") }}</LpButton>
        </a>
      </div>
    </div>
  </header>
</template>
