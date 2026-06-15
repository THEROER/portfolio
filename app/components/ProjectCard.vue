<script setup lang="ts">
import { LpBadge, LpCard, LpIcon } from "@leavepulse/ui"

defineProps<{
  tag: string
  title: string
  summary: string
  points: string[]
  accent?: boolean
}>()
</script>

<template>
  <LpCard
    variant="raised"
    :interactive="true"
    class="flex h-full flex-col gap-5"
    :class="accent ? 'ring-1 ring-brand/30' : ''"
  >
    <div class="flex items-center justify-between gap-3">
      <LpBadge :tone="accent ? 'brand' : 'neutral'" :dot="true">{{ tag }}</LpBadge>
    </div>

    <div class="space-y-2">
      <h3 class="text-xl font-semibold tracking-tight text-ink">{{ title }}</h3>
      <p class="text-sm leading-relaxed text-muted">{{ summary }}</p>
    </div>

    <ul class="mt-auto space-y-2">
      <li
        v-for="(point, i) in points"
        :key="i"
        class="flex gap-2.5 text-sm leading-relaxed text-muted-strong"
      >
        <LpIcon name="lucide:check" :size="16" class="mt-0.5 shrink-0 text-brand" />
        <span>{{ point }}</span>
      </li>
    </ul>
  </LpCard>
</template>
