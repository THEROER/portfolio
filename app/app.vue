<script setup lang="ts">
import {
  LpCommandPalette,
  LpScrollArea,
  LpShift,
  LpShortcutsDialog,
  LpToaster,
  useHotkeys,
  type Command,
  type ShortcutGroup,
} from "@leavepulse/ui"
import { projectDefinitions } from "~/data/projects"

type ScrollAreaInstance = { viewportEl: HTMLElement | null }

const route = useRoute()
const { t, locale } = useI18n()
const { contacts } = useProfile()
const scrollArea = ref<ScrollAreaInstance | null>(null)
const commandPaletteOpen = useState("command-palette-open", () => false)
const shortcutsOpen = ref(false)

function goTo(section: string) {
  navigateTo({ path: "/", hash: section })
}

function scrollToRouteTarget() {
  const viewport = scrollArea.value?.viewportEl
  if (!viewport) return

  const targetId = route.hash.slice(1)
  if (!targetId) {
    viewport.scrollTo({ top: 0, behavior: "auto" })
    return
  }

  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

const commands = computed<Command[]>(() => [
  {
    id: "work",
    label: t("nav.work"),
    description: t("commands.work"),
    icon: "lucide:folders",
    group: t("commands.navigate"),
    onSelect: () => goTo("#work"),
  },
  {
    id: "stack",
    label: t("nav.stack"),
    description: t("commands.stack"),
    icon: "lucide:braces",
    group: t("commands.navigate"),
    onSelect: () => goTo("#stack"),
  },
  {
    id: "services",
    label: t("nav.services"),
    description: t("commands.services"),
    icon: "lucide:layers-3",
    group: t("commands.navigate"),
    onSelect: () => goTo("#services"),
  },
  {
    id: "contact",
    label: t("nav.contact"),
    description: t("commands.contact"),
    icon: "lucide:mail",
    group: t("commands.navigate"),
    onSelect: () => goTo("#contact"),
  },
  ...projectDefinitions.map<Command>((project) => ({
    id: `project-${project.id}`,
    label: t(`projects.${project.id}.title`),
    description: t(`projects.${project.id}.tag`),
    icon: "lucide:box",
    group: t("commands.projects"),
    onSelect: () => navigateTo(`/projects/${project.id}`),
  })),
  ...contacts.map<Command>((contact) => ({
    id: `contact-${contact.key}`,
    label: contact.label,
    description: t(`contact.${contact.key}`),
    icon: contact.icon,
    group: t("commands.contactGroup"),
    onSelect: () => window.open(contact.href, "_blank", "noopener,noreferrer"),
  })),
])

const shortcutGroups = computed<ShortcutGroup[]>(() => [
  {
    title: t("shortcuts.navigation"),
    entries: [
      { combo: "Ctrl+K", label: t("shortcuts.commandPalette") },
      { combo: "F1", label: t("shortcuts.reference") },
    ],
  },
])

useHotkeys(() => [
  {
    key: "F1",
    code: "F1",
    handler: () => {
      shortcutsOpen.value = !shortcutsOpen.value
    },
  },
])

watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    scrollToRouteTarget()
  },
  { flush: "post" },
)

onMounted(async () => {
  await nextTick()
  scrollToRouteTarget()
})
</script>

<template>
  <div class="relative h-dvh">
    <SiteHeader />
    <LpScrollArea
      ref="scrollArea"
      class="h-full"
      content-class="min-h-full pt-16"
      bar-inset-top="4rem"
      :fade="false"
    >
      <LpShift axis="height" class="min-h-full">
        <NuxtPage v-slot="{ Component }">
          <Transition name="locale-page" mode="out-in">
            <component :is="Component" :key="locale" />
          </Transition>
        </NuxtPage>
      </LpShift>
    </LpScrollArea>
  </div>

  <LpCommandPalette
    v-model:open="commandPaletteOpen"
    :commands="commands"
    :placeholder="t('commands.placeholder')"
    :empty-text="t('commands.empty')"
    :labels="{
      navigate: t('shortcuts.navigate'),
      select: t('shortcuts.select'),
      close: t('shortcuts.close'),
      back: t('shortcuts.back'),
      searching: t('shortcuts.searching'),
    }"
  />
  <LpShortcutsDialog
    v-model:open="shortcutsOpen"
    :groups="shortcutGroups"
    :title="t('shortcuts.title')"
    :description="t('shortcuts.description')"
  />
  <ClientOnly>
    <LpToaster />
  </ClientOnly>
</template>
