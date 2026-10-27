<script setup lang="ts">
import type { Project } from '~/data/projects'

// Numbered project list. On hover (mouse), the project logo floats under the cursor,
// tilting with the speed. On click, it morphs into the project page's colour block
// (page transition, see [slug].vue).
defineProps<{ projects: Project[] }>()

// A row is a link only if the project has a page
const NuxtLink = resolveComponent('NuxtLink')

const list = ref<HTMLElement>()
const card = ref<HTMLElement>()
const active = ref<string>()

let frame = 0
let target = { x: 0, y: 0 }
let pos = { x: 0, y: 0 }
let tilt = 0
let follow = 0.18 // share of the distance covered each frame: the logo glides behind the mouse
let cleanup: (() => void) | undefined

function render() {
  const dx = target.x - pos.x
  pos.x += dx * follow
  pos.y += (target.y - pos.y) * follow
  // Tilts in the direction of movement, straightens up when still
  tilt += (Math.max(-10, Math.min(10, dx * 0.08)) - tilt) * 0.15
  if (card.value) {
    card.value.style.translate = `${pos.x}px ${pos.y}px`
    card.value.style.rotate = `${tilt}deg`
  }
  frame = Math.abs(dx) + Math.abs(target.y - pos.y) + Math.abs(tilt) > 0.1 ? requestAnimationFrame(render) : 0
}

onMounted(() => {
  if (!list.value || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) follow = 1
  const el = list.value

  const onMove = (e: PointerEvent) => {
    const box = el.getBoundingClientRect()
    target = { x: e.clientX - box.left, y: e.clientY - box.top }
    if (!active.value) pos = { ...target } // first appearance: right under the mouse
    const row = (e.target as Element).closest<HTMLElement>('[data-slug]')
    active.value = row?.dataset.slug
    if (!frame && !reduce) frame = requestAnimationFrame(render)
    else if (reduce) render()
  }
  const onLeave = () => (active.value = undefined)

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', onLeave)
  cleanup = () => {
    cancelAnimationFrame(frame)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="list" class="index" :class="{ 'has-active': active }">
    <ol class="plain-list rows">
      <li v-for="(p, i) in projects" :id="p.slug" :key="p.slug" :data-slug="p.slug" class="row" :class="{ 'is-active': active === p.slug }">
        <component :is="p.details ? NuxtLink : 'div'" :to="p.details ? `/projets/${p.slug}` : undefined" class="row-link">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <!-- The transition name links this title to the project page's big title -->
          <h3 class="display row-title" :style="{ viewTransitionName: `title-${p.slug}` }">{{ p.title }}</h3>
          <span class="row-text">
            <span class="tagline">{{ p.tagline }}</span>
            <span class="context">{{ p.context }}</span>
          </span>
          <span v-if="p.details" class="arrow" aria-hidden="true">→</span>
          <!-- Touch screens: no hover, so the logo shows in the row instead of the arrow -->
          <img v-if="p.logo" class="row-logo" :src="p.logo" alt="" />
        </component>
      </li>
    </ol>

    <!-- Logo following the mouse: one per project, only the hovered one is visible -->
    <div ref="card" class="card-follow" aria-hidden="true">
      <template v-for="p in projects" :key="p.slug">
        <img
          v-if="p.logo"
          class="floating-logo"
          :class="{ 'is-shown': active === p.slug }"
          :src="p.logo"
          alt=""
          :style="{ viewTransitionName: active === p.slug ? `project-${p.slug}` : undefined, viewTransitionClass: 'project-block' }"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.index {
  position: relative;
}

.rows {
  border-bottom: 1px solid var(--line);
}

.row {
  border-top: 1px solid var(--line);
  scroll-margin-top: 24px; /* back from a project page: /#<slug> */
  transition: opacity 0.4s ease;
}

/* The other rows fade while one is hovered */
.has-active .row:not(.is-active) {
  opacity: 0.35;
}

.row-link {
  display: grid;
  grid-template-columns: 64px minmax(0, 6fr) minmax(0, 5fr) 40px;
  gap: 24px;
  align-items: center;
  padding: 32px 0;
  text-decoration: none;
}

.num {
  font-size: 15px;
  font-weight: 600;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.row-title {
  font-size: clamp(36px, 4.6vw, 64px); /* about half the section title */
  transition: translate 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.row-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tagline {
  font-size: 19px;
  line-height: 1.35;
}

.context {
  font-size: 15px;
  color: var(--muted);
}

.arrow {
  justify-self: end;
  font-size: 28px;
  transition: translate 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.is-active .row-title {
  translate: 12px 0;
}

.is-active .arrow {
  translate: 6px 0;
}

/* Area following the mouse (positioned in JS, centred on the cursor) */
.card-follow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 160px; /* roughly the height of a row */
  height: 140px;
  margin: -70px 0 0 -80px;
  pointer-events: none;
}

/* The logo alone, no card: it fits the area without being distorted */
.floating-logo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  scale: 0.6;
  transition:
    opacity 0.3s ease,
    scale 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.floating-logo.is-shown {
  opacity: 1;
  scale: 1;
}

@media (max-width: 860px) {
  .row-link {
    grid-template-columns: 40px minmax(0, 1fr) 24px;
    gap: 8px 16px;
    padding: 24px 0;
  }
  .row-text {
    grid-column: 2 / -1;
  }
  .arrow {
    grid-row: 1;
    grid-column: 3;
  }
  .card-follow {
    display: none;
  }
}

.row-logo {
  display: none;
}

@media (hover: none) {
  .row-link {
    grid-template-columns: 64px minmax(0, 6fr) minmax(0, 5fr) 56px;
  }
  .row-logo {
    display: block;
    justify-self: end;
    width: 56px;
    height: 56px;
    object-fit: contain;
  }
  .arrow {
    display: none;
  }
}

@media (hover: none) and (max-width: 860px) {
  .row-link {
    grid-template-columns: 40px minmax(0, 1fr) 48px;
  }
  .row-logo {
    grid-row: 1;
    grid-column: 3;
    width: 48px;
    height: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .row,
  .row-title,
  .arrow,
  .floating-logo {
    transition: none;
  }
}
</style>
