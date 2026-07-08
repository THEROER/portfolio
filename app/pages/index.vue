<script setup lang="ts">
import { LpBadge, LpButton, LpCard, LpIcon, LpStat } from "@leavepulse/ui"

const { t, tm, rt } = useI18n()
const { contacts, stack, stats } = useProfile()

// Localized <head>: title/description per locale, plus lang attr, canonical
// and hreflang alternates emitted by i18n's useLocaleHead.
const localeHead = useLocaleHead()
const siteUrl = "https://theroer.dev"

useHead(() => ({
  htmlAttrs: { ...localeHead.value.htmlAttrs },
  title: t("seo.title"),
  link: [...(localeHead.value.link ?? [])],
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: "description", content: t("seo.description") },
    { property: "og:title", content: t("seo.ogTitle") },
    { property: "og:description", content: t("seo.description") },
    { name: "twitter:title", content: t("seo.ogTitle") },
    { name: "twitter:description", content: t("seo.description") },
  ],
}))

// JSON-LD structured data: Person + the site, so search engines and
// rich results understand who this is and what is offered.
useHead(() => ({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "theroer",
        url: siteUrl,
        jobTitle: "Backend & full-stack engineer",
        description: t("seo.description"),
        email: "mailto:theroer09@gmail.com",
        address: { "@type": "PostalAddress", addressCountry: "FR" },
        knowsAbout: ["Python", "Rust", "TypeScript", "Microservices", "gRPC", "Vue", "Nuxt"],
        sameAs: [
          "https://github.com/THEROER",
          "https://www.linkedin.com/in/theroer",
          "https://t.me/theroer",
        ],
      }),
    },
  ],
}))

// pull the project point arrays out of the message catalog
function points(path: string): string[] {
  const raw = tm(path) as unknown[]
  return Array.isArray(raw) ? raw.map((p) => rt(p as never)) : []
}

// id + whether the card spans the full row; copy comes from the i18n catalog.
const projectIds = [
  { id: "leavepulse", accent: true },
  { id: "sdkgen", accent: false },
  { id: "toolkit", accent: false },
  { id: "magicutils", accent: false },
  { id: "agent", accent: false },
  { id: "uikit", accent: false },
  { id: "automation", accent: false },
] as const

const projects = computed(() =>
  projectIds.map(({ id, accent }) => ({
    id,
    accent,
    tag: t(`projects.${id}.tag`),
    title: t(`projects.${id}.title`),
    summary: t(`projects.${id}.summary`),
    points: points(`projects.${id}.points`),
  })),
)

const serviceItems = [
  { key: "backend", icon: "lucide:server" },
  { key: "automation", icon: "lucide:bot" },
  { key: "frontend", icon: "lucide:layout-dashboard" },
  { key: "rescue", icon: "lucide:life-buoy" },
] as const

const emailHref = computed(() => contacts.find((c) => c.key === "email")?.href ?? "#")
</script>

<template>
  <div>
    <SiteHeader />

    <main>
      <!-- HERO -->
      <section class="section relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Reveal as="p" class="eyebrow mb-5">{{ t("hero.eyebrow") }}</Reveal>
        <Reveal
          :delay="0.08"
          as="h1"
          class="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {{ t("hero.title") }}
        </Reveal>
        <Reveal :delay="0.16" as="p" class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {{ t("hero.subtitle") }}
        </Reveal>

        <Reveal :delay="0.24" class="mt-9 flex flex-wrap items-center gap-3">
          <a href="#contact">
            <LpButton variant="solid" size="lg">
              {{ t("hero.ctaPrimary") }}
            </LpButton>
          </a>
          <a href="#work">
            <LpButton variant="outline" size="lg">
              {{ t("hero.ctaSecondary") }}
            </LpButton>
          </a>
          <span class="ml-1 inline-flex items-center gap-2 text-sm text-muted">
            <span class="relative flex size-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {{ t("hero.available") }}
          </span>
        </Reveal>

        <!-- STATS -->
        <div class="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Reveal v-for="(s, i) in stats" :key="s.key" :delay="0.3 + i * 0.06">
            <LpStat :label="t(`stats.${s.key}`)" :value="s.value" />
          </Reveal>
        </div>
      </section>

      <!-- WORK -->
      <section id="work" class="section scroll-mt-20 py-16 sm:py-24">
        <Reveal as="p" class="eyebrow mb-3">{{ t("work.eyebrow") }}</Reveal>
        <Reveal :delay="0.06" as="h2" class="text-3xl font-bold tracking-tight sm:text-4xl">
          {{ t("work.title") }}
        </Reveal>
        <Reveal :delay="0.12" as="p" class="mt-3 max-w-2xl text-muted">
          {{ t("work.subtitle") }}
        </Reveal>

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal
            v-for="(p, i) in projects"
            :key="p.id"
            :delay="(i % 3) * 0.08"
            class="h-full"
            :class="p.accent ? 'lg:col-span-3 xl:col-span-3' : ''"
          >
            <ProjectCard
              :tag="p.tag"
              :title="p.title"
              :summary="p.summary"
              :points="p.points"
              :accent="p.accent"
            />
          </Reveal>
        </div>
      </section>

      <!-- STACK -->
      <section id="stack" class="section scroll-mt-20 py-16 sm:py-24">
        <Reveal as="p" class="eyebrow mb-3">{{ t("stackSection.eyebrow") }}</Reveal>
        <Reveal :delay="0.06" as="h2" class="text-3xl font-bold tracking-tight sm:text-4xl">
          {{ t("stackSection.title") }}
        </Reveal>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal
            v-for="(group, i) in stack"
            :key="group.key"
            :delay="(i % 4) * 0.06"
            class="h-full"
          >
            <LpCard variant="flat" class="h-full">
              <h3 class="mb-4 font-mono text-xs uppercase tracking-widest text-brand">
                {{ t(`stackSection.groups.${group.key}`) }}
              </h3>
              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="item in group.items"
                  :key="item"
                  class="rounded-control border border-line bg-surface px-2.5 py-1 text-sm text-muted-strong"
                >
                  {{ item }}
                </li>
              </ul>
            </LpCard>
          </Reveal>
        </div>
      </section>

      <!-- SERVICES -->
      <section id="services" class="section scroll-mt-20 py-16 sm:py-24">
        <Reveal as="p" class="eyebrow mb-3">{{ t("services.eyebrow") }}</Reveal>
        <Reveal :delay="0.06" as="h2" class="text-3xl font-bold tracking-tight sm:text-4xl">
          {{ t("services.title") }}
        </Reveal>

        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal
            v-for="(item, i) in serviceItems"
            :key="item.key"
            :delay="(i % 2) * 0.08"
            class="h-full"
          >
            <LpCard variant="raised" :interactive="true" class="flex h-full gap-4">
              <span class="grid size-11 shrink-0 place-items-center rounded-control bg-brand-soft">
                <LpIcon :name="item.icon" :size="20" class="text-brand" />
              </span>
              <div>
                <h3 class="font-semibold text-ink">{{ t(`services.items.${item.key}.title`) }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-muted">
                  {{ t(`services.items.${item.key}.desc`) }}
                </p>
              </div>
            </LpCard>
          </Reveal>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="section scroll-mt-20 py-16 sm:py-28">
        <Reveal>
        <LpCard variant="raised" class="relative overflow-hidden">
          <div class="relative">
            <div
              class="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl"
            />
            <p class="eyebrow mb-3">{{ t("contact.eyebrow") }}</p>
            <h2 class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {{ t("contact.title") }}
            </h2>
            <p class="mt-3 max-w-xl text-muted">{{ t("contact.subtitle") }}</p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a :href="emailHref">
                <LpButton variant="solid" size="lg">
                  <LpIcon name="lucide:mail" :size="18" class="mr-2" />
                  {{ t("contact.cta") }}
                </LpButton>
              </a>
            </div>

            <div class="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <a
                v-for="c in contacts"
                :key="c.key"
                :href="c.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
              >
                <LpIcon :name="c.icon" :size="16" />
                {{ c.label }}
              </a>
            </div>
          </div>
        </LpCard>
        </Reveal>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-line py-10">
      <div class="section flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <span class="text-sm text-muted">{{ t("footer.location") }}</span>
        <span class="font-mono text-xs text-muted">{{ t("footer.built") }}</span>
      </div>
    </footer>
  </div>
</template>
