<script setup lang="ts">
import { LpButton, LpIcon } from "@leavepulse/ui"
import { projectDefinitions } from "~/data/projects"

const { t, tm, rt } = useI18n()
const route = useRoute()
const project = projectDefinitions.find((item) => item.id === route.params.id)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" })
}

const points = computed(() => {
  const raw = tm(`projects.${project.id}.points`) as unknown[]
  return Array.isArray(raw) ? raw.map((point) => rt(point as never)) : []
})

useSeoMeta({
  title: () => `${t(`projects.${project.id}.title`)} · THEROER`,
  description: () => t(`projects.${project.id}.summary`),
})
</script>

<template>
  <div>
    <main class="section py-16 sm:py-24">
      <NuxtLink to="/#work" class="case-back">
        <LpIcon name="lucide:arrow-left" :size="16" />
        {{ t("projectPage.back") }}
      </NuxtLink>

      <article class="mt-10 max-w-4xl">
        <p class="eyebrow">{{ t(`projects.${project.id}.tag`) }}</p>
        <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          {{ t(`projects.${project.id}.title`) }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          {{ t(`projects.${project.id}.summary`) }}
        </p>

        <div class="case-meta mt-9">
          <div>
            <p class="case-meta__label">{{ t("projectPage.stack") }}</p>
            <ul class="case-meta__stack">
              <li v-for="item in project.stack" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div v-if="project.links.length" class="case-actions">
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LpButton variant="outline" size="sm">
                <LpIcon name="lucide:arrow-up-right" :size="15" class="mr-1.5" />
                {{ t(`projectPage.links.${link.kind}`) }}
              </LpButton>
            </a>
          </div>
        </div>

        <section class="case-notes mt-14">
          <p class="eyebrow mb-5">{{ t("projectPage.notes") }}</p>
          <ol>
            <li v-for="(point, index) in points" :key="point">
              <span>0{{ index + 1 }}</span>
              <p>{{ point }}</p>
            </li>
          </ol>
        </section>
      </article>
    </main>
  </div>
</template>
