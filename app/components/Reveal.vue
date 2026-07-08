<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

// Fade + slide-up as the element scrolls into view (CSS transition + an
// IntersectionObserver). The "shown" class is toggled imperatively via
// classList — NOT a reactive :class binding — so revealing never re-patches the
// slotted subtree. (A reactive toggle makes Vue diff children, and LpIcon's
// v-html <svg> then hits "cannot set width on SVGSVGElement" dev warnings.)
const props = withDefaults(
  defineProps<{
    delay?: number
    y?: number
    as?: string
  }>(),
  { delay: 0, y: 24, as: "div" },
)

const el = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const node = el.value
  if (!node) return
  if (typeof IntersectionObserver === "undefined") {
    node.classList.add("reveal--shown")
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add("reveal--shown")
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(node)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :style="{ '--reveal-y': `${props.y}px`, '--reveal-delay': `${props.delay}s` }"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(var(--reveal-y, 24px));
  transition:
    opacity 0.5s cubic-bezier(0.2, 0, 0, 1),
    transform 0.5s cubic-bezier(0.2, 0, 0, 1);
  transition-delay: var(--reveal-delay, 0s);
  will-change: opacity, transform;
}

.reveal--shown {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
