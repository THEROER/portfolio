<script setup lang="ts">
import {
  LpCommandPalette,
  LpScrollArea,
  LpShift,
  LpShortcutsDialog,
  LpToaster,
  useClipboard,
  useHotkeys,
  useTheme,
  type Command,
  type ShortcutGroup,
} from "@leavepulse/ui"
import { projectDefinitions } from "~/data/projects"
import { allPortfolioThemes } from "~/theme/themes"

type ScrollAreaInstance = { viewportEl: HTMLElement | null }

const route = useRoute()
const { t, locale, setLocale } = useI18n()
const { contacts } = useProfile()
const { currentName: currentTheme, setTheme } = useTheme()
const { copy } = useClipboard()
const scrollArea = ref<ScrollAreaInstance | null>(null)
const commandPaletteOpen = useState("command-palette-open", () => false)
const shortcutsOpen = ref(false)

const RECENT_KEY = "palette-recent"
const recentCommands = ref<string[]>([])

onMounted(() => {
  try {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]")
    if (Array.isArray(stored)) recentCommands.value = stored.filter((id) => typeof id === "string")
  } catch {
    // Storage blocked or corrupted: the palette just opens without history.
  }
})

function rememberCommand(id: string) {
  // Theme/language picks are settings and row actions (`parent:action`) are
  // one-offs; neither is a destination worth resurfacing.
  if (id.startsWith("theme-") || id.startsWith("locale-") || id.includes(":")) return
  recentCommands.value = [id, ...recentCommands.value.filter((item) => item !== id)].slice(0, 8)
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentCommands.value))
  } catch {
    // Non-persistent history is fine.
  }
}

const linkIcons = { source: "lucide:github", docs: "lucide:book-open", package: "lucide:package" } as const

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer")
}

const localeNames: Record<string, string> = { en: "English", fr: "Français" }

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
    // Tab lists the channels themselves, so a visitor can write without
    // scrolling down to the section first.
    actions: contacts.flatMap<Command>((contact) => {
      const open: Command = {
        id: `contact:${contact.key}`,
        label: t(`contact.open${contact.key[0]!.toUpperCase()}${contact.key.slice(1)}`),
        icon: contact.icon,
        onSelect: () => openExternal(contact.href),
      }
      if (contact.key !== "email") return [open]
      const copyEmail: Command = {
        id: "contact:copy-email",
        label: t("contact.copyEmail"),
        icon: "lucide:copy",
        onSelect: () => void copy(contact.label, { toast: t("contact.copied") }),
      }
      return [copyEmail, open]
    }),
    onSelect: () => goTo("#contact"),
  },
  ...projectDefinitions.map<Command>((project) => ({
    id: `project-${project.id}`,
    label: t(`projects.${project.id}.title`),
    description: t(`projects.${project.id}.tag`),
    icon: project.icon,
    group: t("commands.projects"),
    keywords: [project.id, ...project.technologies, ...project.stack],
    href: `/projects/${project.id}`,
    actions: project.links.map<Command>((link) => ({
      id: `project-${project.id}:${link.kind}`,
      label: t(`projectPage.links.${link.kind}`),
      icon: linkIcons[link.kind],
      onSelect: () => openExternal(link.href),
    })),
    onSelect: () => navigateTo(`/projects/${project.id}`),
  })),
  ...contacts.map<Command>((contact) => ({
    id: `contact-${contact.key}`,
    label: contact.label,
    description: t(`contact.${contact.key}`),
    icon: contact.icon,
    group: t("commands.contactGroup"),
    href: contact.href,
    actions:
      contact.key === "email"
        ? [
            {
              id: "contact-email:copy",
              label: t("contact.copyEmail"),
              icon: "lucide:copy",
              onSelect: () => void copy(contact.label, { toast: t("contact.copied") }),
            },
          ]
        : undefined,
    onSelect: () => openExternal(contact.href),
  })),
  {
    id: "theme",
    label: t("commands.theme"),
    description: t("commands.themeHint"),
    icon: "lucide:palette",
    group: t("commands.settings"),
    childPlaceholder: t("commands.themePlaceholder"),
    children: allPortfolioThemes.map<Command>((theme) => ({
      id: `theme-${theme.name}`,
      label: theme.name,
      icon: theme.name === currentTheme.value ? "lucide:check" : "lucide:circle",
      keepOpen: true,
      onSelect: () => setTheme(theme),
    })),
  },
  {
    id: "language",
    label: t("commands.language"),
    description: t("commands.languageHint"),
    icon: "lucide:languages",
    group: t("commands.settings"),
    keywords: ["english", "français", "langue"],
    childPlaceholder: t("commands.languagePlaceholder"),
    children: Object.entries(localeNames).map<Command>(([code, name]) => ({
      id: `locale-${code}`,
      label: name,
      description: code.toUpperCase(),
      icon: code === locale.value ? "lucide:check" : "lucide:circle",
      onSelect: () => setLocale(code as typeof locale.value),
    })),
  },
])

const shortcutGroups = computed<ShortcutGroup[]>(() => [
  {
    title: t("shortcuts.navigation"),
    entries: [
      { combo: "Ctrl+K", label: t("shortcuts.commandPalette") },
      { combo: "F1", label: t("shortcuts.reference") },
      { combo: "Tab", label: t("shortcuts.paletteActions") },
      { combo: "Ctrl+Enter", label: t("shortcuts.paletteNewTab") },
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
    glass
    preview-pane
    :group-limit="4"
    :commands="commands"
    :recent="recentCommands"
    :recent-label="t('commands.recent')"
    :results-label="t('commands.results')"
    :placeholder="t('commands.placeholder')"
    :empty-text="t('commands.empty')"
    :labels="{
      navigate: t('shortcuts.navigate'),
      select: t('shortcuts.select'),
      close: t('shortcuts.close'),
      back: t('shortcuts.back'),
      searching: t('shortcuts.searching'),
      actions: t('shortcuts.actions'),
      openInNewTab: t('shortcuts.openInNewTab'),
      copyLink: t('shortcuts.copyLink'),
      linkCopied: t('shortcuts.linkCopied'),
      showMore: t('shortcuts.showMore', { count: '{count}' }),
    }"
    @run="rememberCommand"
  >
    <template #preview="{ command }">
      <PalettePreview :command="command" />
    </template>
  </LpCommandPalette>
  <LpShortcutsDialog
    v-model:open="shortcutsOpen"
    glass
    :groups="shortcutGroups"
    :title="t('shortcuts.title')"
    :description="t('shortcuts.description')"
  />
  <ClientOnly>
    <LpToaster />
  </ClientOnly>
</template>
