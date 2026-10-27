<script setup lang="ts">
// Dot cursor that inverts the colours beneath it (mix-blend-mode: difference):
// dark on light backgrounds, white on black. Mouse only; without JS, the native cursor stays.
const dot = ref<HTMLElement>()

const CLICKABLE = 'a, button, label, summary'

let frame = 0
let target = { x: 0, y: 0 }
let pos = { x: 0, y: 0 }
let follow = 0.35 // share of the distance covered each frame: a slight glide, no trail
let cleanup: (() => void) | undefined

function render() {
  pos.x += (target.x - pos.x) * follow
  pos.y += (target.y - pos.y) * follow
  if (dot.value) dot.value.style.translate = `${pos.x}px ${pos.y}px`
  // Keep the loop running only until the dot has caught up with the mouse
  frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(render) : 0
}

onMounted(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) follow = 1

  const root = document.documentElement
  root.classList.add('has-custom-cursor')

  const onMove = (e: PointerEvent) => {
    target = { x: e.clientX, y: e.clientY }
    if (!dot.value?.classList.contains('is-visible')) {
      pos = { ...target } // first appearance: no glide in from the corner
      dot.value?.classList.add('is-visible')
    }
    if (!frame) frame = requestAnimationFrame(render)
  }
  const onOver = (e: PointerEvent) => {
    dot.value?.classList.toggle('is-hover', !!(e.target as Element).closest?.(CLICKABLE))
  }
  const onDown = () => dot.value?.classList.add('is-down')
  const onUp = () => dot.value?.classList.remove('is-down')
  const onLeave = () => dot.value?.classList.remove('is-visible')

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver)
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  document.documentElement.addEventListener('pointerleave', onLeave)

  cleanup = () => {
    cancelAnimationFrame(frame)
    root.classList.remove('has-custom-cursor')
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    window.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointerup', onUp)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="dot" class="cursor" aria-hidden="true" />
</template>

<style scoped>
.cursor {
  position: fixed;
  top: -7px;
  left: -7px;
  z-index: 2147483647; /* maximum value: always on top of everything (404 button, thrown letters…) */
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    scale 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.is-visible {
  opacity: 1;
}

/* Grows over clickable elements, shrinks on click */
.is-hover {
  scale: 2.2;
}

.is-down {
  scale: 0.7;
}

.is-hover.is-down {
  scale: 1.8;
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    transition: none;
  }
}
</style>
