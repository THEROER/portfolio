<script setup lang="ts">
import { LpToaster } from "@leavepulse/ui"
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ClientOnly>
      <LpToaster />
    </ClientOnly>
  </div>
</template>
