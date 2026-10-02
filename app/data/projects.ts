export interface ProjectLink {
  kind: "source" | "docs" | "package"
  href: string
}

export const projectDefinitions = [
  {
    id: "leavepulse",
    accent: true,
    stack: ["Python", "Rust", "gRPC", "NATS", "ClickHouse"],
    technologies: ["Python", "Rust", "TypeScript", "Vue 3", "Nuxt", "Tauri", "FastAPI", "Litestar", "gRPC", "msgspec", "SQLAlchemy 2.0", "PostgreSQL", "Redis", "ClickHouse", "NATS JetStream", "Prometheus", "Docker", "GitHub Actions", "GHCR"],
    links: [],
  },
  {
    id: "cursio",
    accent: false,
    stack: ["Rust", "Tokio", "Noise", "SPAKE2", "GStreamer"],
    technologies: ["Rust", "Docker"],
    links: [{ kind: "source", href: "https://github.com/THEROER/cursio" }],
  },
  {
    id: "sdkgen",
    accent: false,
    stack: ["Rust", "OpenAPI", "TypeScript", "Python", "SDKs"],
    technologies: ["Python", "Rust", "TypeScript", "GitHub Actions"],
    links: [],
  },
  {
    id: "toolkit",
    accent: false,
    stack: ["Python", "Litestar", "gRPC", "Redis", "OpenTelemetry"],
    technologies: ["Python", "Litestar", "gRPC", "Redis", "SQLAlchemy 2.0", "OpenTelemetry", "Prometheus"],
    links: [{ kind: "source", href: "https://github.com/THEROER/service-toolkit" }],
  },
  {
    id: "magicutils",
    accent: false,
    stack: ["Java", "Kotlin", "Gradle", "Adventure", "Minecraft"],
    technologies: ["Java", "Kotlin"],
    links: [
      { kind: "source", href: "https://github.com/THEROER/MagicUtils" },
      { kind: "docs", href: "https://magicutils.theroer.dev/" },
      { kind: "package", href: "https://maven.theroer.dev/releases/" },
    ],
  },
  {
    id: "agent",
    accent: false,
    stack: ["Java", "WebSocket", "HTTP", "Ed25519", "Gradle"],
    technologies: ["Java"],
    links: [],
  },
  {
    id: "uikit",
    accent: false,
    stack: ["Vue 3", "Tailwind v4", "Reka UI", "TypeScript", "Motion"],
    technologies: ["TypeScript", "Vue 3", "Nuxt", "Tailwind v4"],
    links: [{ kind: "package", href: "https://www.npmjs.com/package/@leavepulse/ui" }],
  },
] as const

export type ProjectId = (typeof projectDefinitions)[number]["id"]

export const otherProjectDefinitions = [
  { id: "leavehosting", stack: ["Python", "gRPC", "Nuxt", "DCIM"], href: undefined },
  { id: "automation", stack: ["Python", "Discord", "Telegram", "Webhooks"], href: undefined },
  {
    id: "commandflow",
    stack: ["Java", "Fabric", "Paper"],
    href: "https://github.com/THEROER/CommandFlow",
  },
  {
    id: "doublelife",
    stack: ["Java", "LuckPerms", "Discord"],
    href: "https://github.com/THEROER/DoubleLife",
  },
  {
    id: "invisibleframes",
    stack: ["Java", "Paper", "Folia"],
    href: "https://github.com/THEROER/InvisibleFrames",
  },
  {
    id: "msgspecconf",
    stack: ["Python", "msgspec", "TOML", "YAML"],
    href: "https://github.com/THEROER/msgspec-conf",
  },
] as const
