import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  // Use the Nuxt 4 directory layout (srcDir = app/) on Nuxt 3.
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  // The kit ships ESM + CSS; let Nuxt/Vite transpile it.
  build: { transpile: ["@leavepulse/ui", "motion-v", "reka-ui"] },

  modules: ["@nuxtjs/i18n"],

  css: [
    // Single CSS entry: imports tailwindcss + the kit's @theme/token block.
    "~/assets/css/app.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    // Used to build absolute canonical + hreflang alternate URLs.
    baseUrl: "https://theroer.dev",
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.json" },
    ],
    bundle: { optimizeTranslationDirective: false },
  },

  app: {
    head: {
      // lang is set per-locale at runtime via useLocaleHead() on the page.
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "theroer" },
        { property: "og:image", content: "https://theroer.dev/og.png" },
        { name: "twitter:image", content: "https://theroer.dev/og.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#050505" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },
})
