<script setup lang="ts">
import { LpButton, LpIcon } from "@leavepulse/ui"

const props = defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()
const { t } = useI18n()
const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => isNotFound.value ? `404 · THEROER` : `Error · THEROER`,
  robots: "noindex, nofollow",
})

function goHome() {
  clearError({ redirect: "/" })
}

function goToWork() {
  clearError({ redirect: "/#work" })
}
</script>

<template>
  <main class="error-page section">
    <div class="error-page__ghost" aria-hidden="true">{{ error.statusCode ?? 500 }}</div>

    <div class="error-page__content">
      <NuxtLinkLocale to="/" class="inline-flex items-center gap-2 font-semibold tracking-tight">
        <span class="identity-mark grid h-7 w-7 place-items-center rounded-control font-mono text-sm font-bold text-ink-inverse">t</span>
        <span>theroer<span class="text-brand">.dev</span></span>
      </NuxtLinkLocale>

      <div class="mt-auto pt-20 sm:pt-28">
        <p class="eyebrow">{{ isNotFound ? t("error.eyebrow") : t("error.genericEyebrow") }}</p>
        <h1 class="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          {{ isNotFound ? t("error.title") : t("error.genericTitle") }}
        </h1>
        <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          {{ isNotFound ? t("error.description") : t("error.genericDescription") }}
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <LpButton size="lg" @click="goHome">
            <LpIcon name="lucide:arrow-left" :size="16" class="mr-1.5" />
            {{ t("error.home") }}
          </LpButton>
          <LpButton variant="outline" size="lg" @click="goToWork">
            {{ t("error.work") }}
            <LpIcon name="lucide:arrow-right" :size="16" class="ml-1.5" />
          </LpButton>
        </div>
      </div>

      <p class="mt-16 font-mono text-xs text-muted sm:mt-24">
        {{ t("error.hint") }}
      </p>
    </div>
  </main>
</template>
