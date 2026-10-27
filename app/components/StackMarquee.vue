<script setup lang="ts">

const props = defineProps<{ items: string[]; duration?: number }>()

const track = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(async () => {
  if (!track.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap } = await import('gsap')

  const loop = gsap.to(track.value, {
    xPercent: -50,
    duration: props.duration ?? 30,
    ease: 'none',
    repeat: -1,
  })

  let direction = 1
  let hovered = false
  let lastY = window.scrollY
  let idle: ReturnType<typeof setTimeout> | undefined

  const baseSpeed = () => (hovered ? 0.25 : 1) * direction

  const onScroll = () => {
    const delta = window.scrollY - lastY
    lastY = window.scrollY
    if (delta === 0) return
    direction = delta > 0 ? 1 : -1
    const boost = Math.min(Math.abs(delta) / 12, 4)
    gsap.to(loop, { timeScale: (1 + boost) * baseSpeed(), duration: 0.2, overwrite: true })
    clearTimeout(idle)
    idle = setTimeout(() => {
      gsap.to(loop, { timeScale: baseSpeed(), duration: 0.8, overwrite: true })
    }, 120)
  }

  const setHover = (value: boolean) => () => {
    hovered = value
    gsap.to(loop, { timeScale: baseSpeed(), duration: 0.5, overwrite: true })
  }
  const enter = setHover(true)
  const leave = setHover(false)

  window.addEventListener('scroll', onScroll, { passive: true })
  track.value.addEventListener('mouseenter', enter)
  track.value.addEventListener('mouseleave', leave)

  cleanup = () => {
    clearTimeout(idle)
    window.removeEventListener('scroll', onScroll)
    track.value?.removeEventListener('mouseenter', enter)
    track.value?.removeEventListener('mouseleave', leave)
    loop.kill()
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <section class="band" :aria-label="`Technologies : ${items.join(', ')}`">
    <div ref="track" class="track" aria-hidden="true">
      <div v-for="copy in 2" :key="copy" class="group">
        <template v-for="item in items" :key="`${copy}-${item}`">
          <span>{{ item }}</span>
          <span class="dot" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band {
  border-block: 1px solid var(--line);
  padding-block: 28px;
  overflow: hidden;
}

.track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.group {
  display: flex;
  align-items: center;
  gap: 48px;
  padding-right: 48px;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  font-stretch: 70%;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}

.dot {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--ink);
}
</style>
