<script setup lang="ts">
import { LpIcon, useTheme, type Command, type TokenSet } from "@leavepulse/ui"
import { projectDefinitions } from "~/data/projects"
import { allPortfolioThemes } from "~/theme/themes"

// Body of the Ctrl+K preview pane. The palette hands over the highlighted
// command; its id prefix says what it points at, and each kind gets its own
// layout instead of one block of plain text.
const props = defineProps<{ command: Command }>()

const { t, tm, rt, locale } = useI18n()
const { contacts, stack } = useProfile()
const { currentName } = useTheme()

const sectionTitles: Record<string, { eyebrow: string; title: string; subtitle?: string }> = {
  work: { eyebrow: "work.eyebrow", title: "work.title", subtitle: "work.subtitle" },
  stack: { eyebrow: "stackSection.eyebrow", title: "stackSection.title" },
  services: { eyebrow: "services.eyebrow", title: "services.title" },
  contact: { eyebrow: "contact.eyebrow", title: "contact.title", subtitle: "contact.subtitle" },
}

const serviceItems = [
  { key: "backend", icon: "lucide:server" },
  { key: "automation", icon: "lucide:bot" },
  { key: "frontend", icon: "lucide:layout-dashboard" },
  { key: "rescue", icon: "lucide:life-buoy" },
]

const localeNames: Record<string, string> = { en: "English", fr: "Français" }

// Row actions (Tab) carry their parent's id before a colon, kit-made ones
// included, so the pane keeps showing what the actions belong to.
const id = computed(() => props.command.id.split(":")[0] ?? props.command.id)
const project = computed(() =>
  id.value.startsWith("project-")
    ? projectDefinitions.find((item) => `project-${item.id}` === id.value)
    : undefined,
)
const contact = computed(() =>
  id.value.startsWith("contact-") ? contacts.find((item) => `contact-${item.key}` === id.value) : undefined,
)
const section = computed(() => sectionTitles[id.value])
const theme = computed(() =>
  id.value.startsWith("theme-") ? allPortfolioThemes.find((item) => `theme-${item.name}` === id.value) : undefined,
)

const points = computed(() => {
  if (!project.value) return []
  const raw = tm(`projects.${project.value.id}.points`) as unknown[]
  return Array.isArray(raw) ? raw.map((point) => rt(point as never)) : []
})

function swatches(item: TokenSet) {
  const c = item.colors
  return [c.surface, c.surfaceSoft, c.ink, c.brand, c.action, c.accent]
}
</script>

<template>
  <div class="pp">
    <!-- Project: the case page in miniature -->
    <template v-if="project">
      <p class="pp-eyebrow">{{ t(`projects.${project.id}.tag`) }}</p>
      <h3 class="pp-title">{{ t(`projects.${project.id}.title`) }}</h3>
      <p class="pp-lead">{{ t(`projects.${project.id}.summary`) }}</p>

      <ul class="pp-chips">
        <li v-for="item in project.stack" :key="item">{{ item }}</li>
      </ul>

      <p class="pp-label">{{ t("projectPage.notes") }}</p>
      <ol class="pp-notes">
        <li v-for="(point, index) in points" :key="point">
          <span>0{{ index + 1 }}</span>
          <p>{{ point }}</p>
        </li>
      </ol>

      <div v-if="project.links.length" class="pp-links">
        <a
          v-for="link in project.links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t(`projectPage.links.${link.kind}`) }}
          <LpIcon name="lucide:arrow-up-right" :size="13" />
        </a>
      </div>
    </template>

    <!-- Section on the home page: what you land on -->
    <template v-else-if="section">
      <p class="pp-eyebrow">{{ t(section.eyebrow) }}</p>
      <h3 class="pp-title">{{ t(section.title) }}</h3>
      <p v-if="section.subtitle" class="pp-lead">{{ t(section.subtitle) }}</p>

      <ul v-if="id === 'work'" class="pp-rows">
        <li v-for="item in projectDefinitions" :key="item.id">
          <LpIcon :name="item.icon" :size="15" />
          <span>{{ t(`projects.${item.id}.title`) }}</span>
        </li>
      </ul>

      <div v-else-if="id === 'stack'" class="pp-groups">
        <div v-for="group in stack" :key="group.key">
          <p class="pp-label">{{ t(`stackSection.groups.${group.key}`) }}</p>
          <ul class="pp-chips">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>

      <ul v-else-if="id === 'services'" class="pp-rows pp-rows--tall">
        <li v-for="item in serviceItems" :key="item.key">
          <LpIcon :name="item.icon" :size="15" />
          <div>
            <span>{{ t(`services.items.${item.key}.title`) }}</span>
            <p>{{ t(`services.items.${item.key}.desc`) }}</p>
          </div>
        </li>
      </ul>

      <ul v-else-if="id === 'contact'" class="pp-rows">
        <li v-for="item in contacts" :key="item.key">
          <LpIcon :name="item.icon" :size="15" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </template>

    <!-- Single contact -->
    <template v-else-if="contact">
      <p class="pp-eyebrow">{{ t(`contact.${contact.key}`) }}</p>
      <div class="pp-contact">
        <LpIcon :name="contact.icon" :size="22" />
        <h3 class="pp-title">{{ contact.label }}</h3>
      </div>
      <p class="pp-lead">{{ t("contact.subtitle") }}</p>
      <code class="pp-href">{{ contact.href }}</code>
    </template>

    <!-- Theme option: its palette -->
    <template v-else-if="theme">
      <p class="pp-eyebrow">{{ t("commands.theme") }}</p>
      <h3 class="pp-title">{{ theme.name }}</h3>
      <div class="pp-swatches" :style="{ background: theme.colors.surface }">
        <span v-for="(color, index) in swatches(theme)" :key="index" :style="{ background: color }" />
      </div>
    </template>

    <!-- Theme / language entries and anything else: header plus options -->
    <template v-else>
      <p class="pp-eyebrow">{{ command.group || t("commands.settings") }}</p>
      <h3 class="pp-title">{{ command.label }}</h3>
      <p v-if="command.description" class="pp-lead">{{ command.description }}</p>

      <ul v-if="id === 'theme'" class="pp-rows">
        <li v-for="item in allPortfolioThemes" :key="item.name" :class="{ 'is-current': item.name === currentName }">
          <span class="pp-dot" :style="{ background: item.colors.brand }" />
          <span>{{ item.name }}</span>
          <LpIcon v-if="item.name === currentName" name="lucide:check" :size="14" class="ml-auto" />
        </li>
      </ul>

      <ul v-else-if="id === 'language'" class="pp-rows">
        <li v-for="(name, code) in localeNames" :key="code" :class="{ 'is-current': code === locale }">
          <span class="pp-code">{{ code }}</span>
          <span>{{ name }}</span>
          <LpIcon v-if="code === locale" name="lucide:check" :size="14" class="ml-auto" />
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
/* Children arrive one after another, like the kit's own paragraphs. */
.pp > * {
  animation: pp-in 0.32s cubic-bezier(0.2, 0, 0, 1) both;
}
.pp > :nth-child(2) { animation-delay: 40ms; }
.pp > :nth-child(3) { animation-delay: 80ms; }
.pp > :nth-child(4) { animation-delay: 120ms; }
.pp > :nth-child(5) { animation-delay: 160ms; }
.pp > :nth-child(n + 6) { animation-delay: 200ms; }

@keyframes pp-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pp > * {
    animation: none;
  }
}

.pp-eyebrow {
  margin: 0;
  color: var(--color-brand);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pp-title {
  margin: 0.45rem 0 0;
  color: var(--color-ink);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.pp-lead {
  margin: 0.6rem 0 0;
  color: var(--color-muted);
  font-size: 0.84rem;
  line-height: 1.6;
}

.pp-label {
  margin: 1.25rem 0 0.5rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.pp-label + .pp-chips {
  margin-top: 0;
}

.pp-chips li {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-ink) 4%, transparent);
  padding: 0.18rem 0.55rem;
  color: var(--color-muted-strong);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.pp-notes {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-line);
  list-style: none;
}

.pp-notes li {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr);
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-line);
  padding: 0.65rem 0;
}

.pp-notes span {
  padding-top: 0.12rem;
  color: var(--color-brand);
  font-family: var(--font-mono);
  font-size: 0.64rem;
}

.pp-notes p {
  margin: 0;
  color: var(--color-muted-strong);
  font-size: 0.8rem;
  line-height: 1.55;
}

.pp-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.pp-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-brand);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
}

.pp-links a:hover {
  color: var(--color-brand-hover);
}

.pp-rows {
  display: grid;
  gap: 0.15rem;
  margin: 1.1rem 0 0;
  padding: 0;
  list-style: none;
}

.pp-rows li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-radius: var(--radius-control);
  padding: 0.5rem 0.6rem;
  background: color-mix(in srgb, var(--color-ink) 3%, transparent);
  color: var(--color-muted-strong);
  font-size: 0.82rem;
}

.pp-rows li > svg:first-child {
  flex-shrink: 0;
  color: var(--color-muted);
}

.pp-rows li.is-current {
  background: color-mix(in srgb, var(--color-brand) 12%, transparent);
  color: var(--color-ink);
}

.pp-rows li.is-current svg {
  color: var(--color-brand);
}

.pp-rows--tall li {
  align-items: flex-start;
}

.pp-rows--tall li > svg:first-child {
  margin-top: 0.15rem;
}

.pp-rows--tall p {
  margin: 0.2rem 0 0;
  color: var(--color-muted);
  font-size: 0.75rem;
  line-height: 1.5;
}

.pp-groups .pp-label {
  margin-top: 1rem;
}

.pp-contact {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.45rem;
  color: var(--color-brand);
}

.pp-contact .pp-title {
  margin: 0;
}

.pp-href {
  display: block;
  margin-top: 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-control);
  padding: 0.5rem 0.65rem;
  color: var(--color-muted-strong);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  word-break: break-all;
}

.pp-dot {
  width: 0.6rem;
  height: 0.6rem;
  flex-shrink: 0;
  border-radius: 9999px;
  box-shadow: 0 0 0 1px var(--color-line);
}

.pp-code {
  width: 1.6rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  text-transform: uppercase;
}

.pp-swatches {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.4rem;
  margin-top: 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  padding: 0.75rem;
}

.pp-swatches span {
  aspect-ratio: 1;
  border-radius: var(--radius-control);
  box-shadow: 0 0 0 1px rgb(128 128 128 / 0.25);
}
</style>
