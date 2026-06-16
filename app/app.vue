<script setup lang="ts">
import { LpToaster } from "@leavepulse/ui"
</script>

<template>
  <div>
    <!-- NuxtRouteAnnouncer renders client-only, adding a node that isn't in the
         SSR output and causing a hydration mismatch. This is a single-page
         marketing site with no SPA route changes to announce, so it's omitted. -->
    <NuxtPage />
    <ClientOnly>
      <LpToaster />
    </ClientOnly>
  </div>
</template>
