/*
 * Single source of truth for non-translated profile data (links, stack).
 * Edit your usernames/URLs here — they are intentionally placeholders.
 */
export interface ContactLink {
  key: "email" | "telegram" | "github" | "linkedin"
  icon: string
  href: string
  label: string
}

export interface StackGroup {
  key: "backend" | "frontend" | "systems" | "data"
  items: string[]
}

export function useProfile() {
  const contacts: ContactLink[] = [
    {
      key: "email",
      icon: "lucide:mail",
      href: "mailto:theroer09@gmail.com",
      label: "theroer09@gmail.com",
    },
    {
      key: "telegram",
      icon: "lucide:send",
      href: "https://t.me/theroer",
      label: "@theroer",
    },
    {
      key: "github",
      icon: "lucide:github",
      href: "https://github.com/THEROER",
      label: "github.com/THEROER",
    },
    {
      key: "linkedin",
      icon: "lucide:linkedin",
      href: "https://www.linkedin.com/in/theroer",
      label: "LinkedIn",
    },
  ]

  const stack: StackGroup[] = [
    {
      key: "backend",
      items: ["Python", "FastAPI", "Litestar", "gRPC", "msgspec", "SQLAlchemy 2.0"],
    },
    {
      key: "frontend",
      items: ["TypeScript", "Vue 3", "Nuxt", "Tailwind v4", "Tauri"],
    },
    {
      key: "systems",
      items: ["Rust", "Java", "Kotlin", "Docker", "GitHub Actions", "GHCR"],
    },
    {
      key: "data",
      items: ["PostgreSQL", "Redis", "ClickHouse", "NATS JetStream", "Prometheus"],
    },
  ]

  const stats = [
    { key: "services", value: "~40" },
    { key: "languages", value: "4" },
    { key: "stack", value: "Py · Rs · TS · Java" },
  ]

  return { contacts, stack, stats }
}
