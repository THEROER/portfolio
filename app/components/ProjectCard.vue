<script setup lang="ts">
import { LpCard, LpIcon, type ContextMenuItemDef } from "@leavepulse/ui"
import type { ProjectLink } from "~/data/projects"

const props = defineProps<{
  tag: string
  title: string
  summary: string
  to: string
  index: number
  links: readonly ProjectLink[]
  accent?: boolean
}>()

const { t } = useI18n()

function openProject() {
  navigateTo(props.to)
}

function openProjectInNewTab() {
  window.open(props.to, "_blank", "noopener,noreferrer")
}

function copyProjectLink() {
  navigator.clipboard?.writeText(new URL(props.to, window.location.origin).href)
}

function openExternalLink(link: ProjectLink) {
  window.open(link.href, "_blank", "noopener,noreferrer")
}

const menuItems = computed<ContextMenuItemDef[]>(() => [
  { label: t("projectCard.open"), icon: "lucide:arrow-right", onSelect: openProject },
  {
    label: t("projectCard.openNew"),
    icon: "lucide:external-link",
    onSelect: openProjectInNewTab,
  },
  {
    label: t("projectCard.copyLink"),
    icon: "lucide:copy",
    separatorBefore: true,
    onSelect: copyProjectLink,
  },
  ...(props.links.length
    ? [
        {
          label: t("projectCard.links"),
          icon: "lucide:link-2",
          separatorBefore: true,
          children: props.links.map((link) => ({
            label: t(`projectPage.links.${link.kind}`),
            icon: "lucide:arrow-up-right",
            onSelect: () => openExternalLink(link),
          })),
        },
      ]
    : []),
])
</script>

<template>
  <NuxtLink :to="props.to" class="block h-full">
    <LpCard
      variant="flat"
      :padded="false"
      interactive
      :menu-items="menuItems"
      class="project-card"
      :class="{ 'project-card--featured': props.accent }"
    >
      <div class="project-card__meta">
        <span>{{ props.tag }}</span>
        <span>0{{ props.index }}</span>
      </div>

      <div class="project-card__content">
        <h3 class="text-xl font-semibold tracking-tight text-ink">{{ props.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed text-muted">{{ props.summary }}</p>
      </div>

      <div class="project-card__footer">
        <span class="project-card__link">
          {{ t("projectCard.view") }}
          <LpIcon name="lucide:arrow-up-right" :size="16" />
        </span>
      </div>
    </LpCard>
  </NuxtLink>
</template>
