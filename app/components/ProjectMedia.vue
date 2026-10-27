<script setup lang="ts">
defineProps<{
  logo?: string
  tint: string
  ratio: string
  placeholder?: string
}>()
</script>

<template>
  <div class="media" :style="{ aspectRatio: ratio, background: tint }">
    <img v-if="logo" class="logo" :src="logo" alt="" loading="lazy" />
    <span v-else-if="placeholder" class="placeholder">{{ placeholder }}</span>
  </div>
</template>

<style scoped>
.media {
  border-radius: var(--radius);
  overflow: hidden;
  display: grid;
  place-items: center;
}

.logo {
  width: 40%;
  max-height: 60%;
  object-fit: contain;
}

.placeholder {
  font-size: 15px;
  color: var(--ink-2);
}
</style>
