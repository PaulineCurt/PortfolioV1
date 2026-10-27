<script setup lang="ts">
import type { ProcessStep } from '~/data/projects'

const props = withDefaults(defineProps<{ steps: ProcessStep[]; tint: string; logo?: string; level?: number }>(), { level: 4 })

const titleTag = `h${props.level}`
const stepTag = `h${props.level + 1}`
</script>

<template>
  <div class="process" :style="{ background: tint }">
    <div class="process-head">
      <component :is="titleTag" class="process-title">La démarche</component>
      <img v-if="logo" class="process-logo" :src="logo" alt="" />
    </div>
    <ol class="plain-list process-list">
      <li v-for="step in steps" :key="step.title">
        <component :is="stepTag" class="caps step-title">{{ step.title }}</component>
        <p>{{ step.text }}</p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.process {
  border-radius: var(--radius);
  padding: clamp(24px, 4vw, 48px);
}

.process-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.process-logo {
  width: auto;
  height: clamp(48px, 6vw, 72px);
}

.process-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-2);
}

.process-list {
  margin-top: 24px;
  counter-reset: step;
}

.process-list li {
  counter-increment: step;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  column-gap: 16px;
  padding: 20px 0;
  border-top: 1px solid rgb(20 20 20 / 0.12);
}

.process-list li::before {
  content: counter(step, decimal-leading-zero);
  grid-row: span 2;
  font-size: 32px;
  font-weight: 800;
  font-stretch: 68%;
  line-height: 1;
}

.process-list .step-title {
  font-size: 20px;
}

.process-list p {
  margin-top: 8px;
  max-width: 68ch;
  color: var(--ink-2);
}
</style>
