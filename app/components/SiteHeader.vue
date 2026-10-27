<script setup lang="ts">
import { site } from '~/data/site'

// By default, "Contact" points to the page's own contact band; a page without one (the 404) targets the home page's
withDefaults(defineProps<{ contactHref?: string }>(), { contactHref: '#contact' })
</script>

<template>
  <header class="wrap top">
    <NuxtLink to="/" class="caps brand">{{ site.name }}</NuxtLink>
    <nav aria-label="Navigation principale">
      <NuxtLink class="pill" to="/#projets">Projets</NuxtLink>
      <a class="pill pill-solid" :href="contactHref">Contact</a>
    </nav>
  </header>
</template>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 24px;
}

.brand {
  text-decoration: none;
  font-size: 20px;
  letter-spacing: 0.01em;
}

nav {
  display: flex;
  gap: 8px;
}
</style>
