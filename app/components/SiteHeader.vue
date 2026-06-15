<script setup lang="ts">
import { LpButton } from "@leavepulse/ui"

const { t, locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === "en" ? "fr" : "en"))

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
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="rounded-control border border-line px-2.5 py-1 font-mono text-xs uppercase text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          {{ otherLocale }}
        </NuxtLink>
        <a href="#contact">
          <LpButton size="sm">{{ t("nav.hire") }}</LpButton>
        </a>
      </div>
    </div>
  </header>
</template>
