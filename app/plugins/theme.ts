import { lime } from "@leavepulse/ui"

/*
 * Apply the "lime" theme during SSR (and client) by rendering its tokens as
 * <html> attributes via useHead. Previously a *.client plugin called
 * applyTheme() after mount, which mutated <html> on the client only — the
 * server HTML lacked those attributes, so hydration reported a mismatch.
 * Building the same CSS-variable string here puts it in the SSR output too, so
 * server and client match exactly.
 *
 * The CSS-variable names mirror the kit's COLOR_VARS/SHAPE_VARS/DENSITY_VARS/
 * FONT_VARS mapping (camelCase token -> --kebab-case var).
 */
function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}

function buildStyle(): string {
  const parts: string[] = []
  for (const [key, value] of Object.entries(lime.colors)) {
    parts.push(`--color-${camelToKebab(key)}: ${value}`)
  }
  for (const [key, value] of Object.entries(lime.shape)) {
    // radiusControl -> --radius-control
    parts.push(`--${camelToKebab(key)}: ${value}px`)
  }
  // density: spacingUnit -> --spacing-unit; controlSm -> --size-control-sm
  const density = lime.density as Record<string, number>
  if (density.spacingUnit != null) parts.push(`--spacing-unit: ${density.spacingUnit}px`)
  if (density.controlSm != null) parts.push(`--size-control-sm: ${density.controlSm}px`)
  if (density.controlMd != null) parts.push(`--size-control-md: ${density.controlMd}px`)
  if (density.controlLg != null) parts.push(`--size-control-lg: ${density.controlLg}px`)
  parts.push(`--font-sans: ${lime.font.sans}`)
  parts.push(`--font-mono: ${lime.font.mono}`)
  parts.push(`color-scheme: ${lime.mode}`)
  return parts.join("; ")
}

export default defineNuxtPlugin(() => {
  useHead({
    htmlAttrs: {
      "data-theme-mode": lime.mode,
      style: buildStyle(),
    },
  })
})
