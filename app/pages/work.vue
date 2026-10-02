<script setup lang="ts">
import { LpCard, LpDisclosure, LpIcon, type ContextMenuItemDef } from "@leavepulse/ui"
import { otherProjectDefinitions } from "~/data/projects"

const { t, tm, rt } = useI18n()

function facts(id: (typeof otherProjectDefinitions)[number]["id"]) {
  const raw = tm(`otherWork.details.${id}`) as unknown[]
  return Array.isArray(raw) ? raw.map((fact) => rt(fact as never)) : []
}

function openSource(href: string) {
  window.open(href, "_blank", "noopener,noreferrer")
}

function copyLink(href: string) {
  navigator.clipboard?.writeText(href)
}

function menuItems(project: (typeof otherProjectDefinitions)[number]): ContextMenuItemDef[] {
  if (!project.href) {
    return [
      {
        label: t("otherWork.contact"),
        icon: "lucide:mail",
        onSelect: () => navigateTo({ path: "/", hash: "#contact" }),
      },
    ]
  }

  return [
    {
      label: t("otherWork.openSource"),
      icon: "lucide:arrow-up-right",
      onSelect: () => openSource(project.href),
    },
    {
      label: t("otherWork.copyLink"),
      icon: "lucide:copy",
      onSelect: () => copyLink(project.href),
    },
  ]
}

useSeoMeta({
  title: () => `${t("otherWork.title")} · THEROER`,
  description: () => t("otherWork.subtitle"),
})
</script>

<template>
  <main class="section py-16 sm:py-24">
    <NuxtLink to="/#work" class="case-back">
      <LpIcon name="lucide:arrow-left" :size="16" />
      {{ t("projectPage.back") }}
    </NuxtLink>

    <div class="mt-10 max-w-3xl">
      <p class="eyebrow">{{ t("otherWork.eyebrow") }}</p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{{ t("otherWork.title") }}</h1>
      <p class="mt-6 text-lg leading-relaxed text-muted">{{ t("otherWork.subtitle") }}</p>
    </div>

    <div class="other-work-grid mt-12">
      <LpCard
        v-for="project in otherProjectDefinitions"
        :key="project.id"
        variant="flat"
        :padded="false"
        :menu-items="menuItems(project)"
        class="other-work-card"
      >
        <div>
          <p class="eyebrow">{{ t(`otherWork.items.${project.id}.tag`) }}</p>
          <h2 class="mt-3 text-xl font-semibold tracking-tight">
            {{ t(`otherWork.items.${project.id}.title`) }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-muted">
            {{ t(`otherWork.items.${project.id}.summary`) }}
          </p>
          <LpDisclosure
            :label="t('otherWork.detailsLabel')"
            icon="lucide:info"
            class="other-work-card__details mt-5"
          >
            <ul class="other-work-card__facts">
              <li v-for="fact in facts(project.id)" :key="fact">{{ fact }}</li>
            </ul>
          </LpDisclosure>
        </div>
        <div class="mt-7 flex items-end justify-between gap-4">
          <ul class="case-meta__stack">
            <li v-for="item in project.stack" :key="item">{{ item }}</li>
          </ul>
          <a
            v-if="project.href"
            :href="project.href"
            target="_blank"
            rel="noopener noreferrer"
            class="other-work-card__link"
            :aria-label="`${t(`otherWork.items.${project.id}.title`)}: ${t('otherWork.viewSource')}`"
          >
            <LpIcon name="lucide:arrow-up-right" :size="17" />
          </a>
        </div>
      </LpCard>
    </div>
  </main>
</template>
