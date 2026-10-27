<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <header class="wrap top">
    <NuxtLink to="/" class="caps brand">{{ site.name }}</NuxtLink>
    <nav aria-label="Navigation principale">
      <NuxtLink class="pill" to="/#projets">Projets</NuxtLink>
      <a class="pill pill-solid" href="#contact">Contact</a>
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
