<script setup lang="ts">
import type { Capture } from '~/data/projects'

defineProps<{ captures: Capture[]; tint: string }>()
</script>

<template>
  <div class="capture-grid" :style="{ background: tint }">
    <figure v-for="c in captures" :key="c.src">
      <img :src="c.src" :alt="c.alt" loading="lazy" />
      <figcaption>{{ c.caption }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.capture-grid {
  padding: clamp(16px, 4vw, 56px);
  border-radius: var(--radius);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(24px, 3vw, 40px) clamp(16px, 2.5vw, 32px);
}

figure {
  margin: 0;
}

img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

figcaption {
  display: inline-block;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  background: var(--bg);
  border-radius: 999px;
  padding: 6px 12px;
}

@media (max-width: 860px) {
  .capture-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
