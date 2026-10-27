<script setup lang="ts">
// Text split into letters that bounce when hovered (or touched).
// The full text stays readable by screen readers; the split letters are hidden from them.
const props = defineProps<{ lines: string[] }>()

// lines → words → letters; each word stays on one line
const words = computed(() => props.lines.map((line) => line.split(' ').map((word) => [...word])))

const root = ref<HTMLElement>()
let cleanup: (() => void) | undefined
let unmounted = false

onMounted(async () => {
  const el = root.value
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { gsap } = await import('gsap')
  if (unmounted) return // unmounted while GSAP was loading

  const bounce = (e: PointerEvent) => {
    const letter = (e.target as Element).closest<HTMLElement>('.letter')
    // A letter already in the air finishes its bounce before it can go again
    if (!letter || gsap.isTweening(letter)) return
    gsap
      .timeline()
      .to(letter, { y: '-0.22em', rotation: gsap.utils.random(-8, 8), duration: 0.22, ease: 'power2.out' })
      .to(letter, { y: 0, rotation: 0, duration: 0.7, ease: 'bounce.out' })
  }

  el.addEventListener('pointerover', bounce)
  cleanup = () => {
    el.removeEventListener('pointerover', bounce)
    gsap.killTweensOf(el.querySelectorAll('.letter'))
  }
})

onBeforeUnmount(() => {
  unmounted = true
  cleanup?.()
})
</script>

<template>
  <span class="visually-hidden">{{ lines.join(' ') }}</span>
  <span ref="root" aria-hidden="true">
    <span v-for="(line, l) in words" :key="l" class="line">
      <template v-for="(word, w) in line" :key="w">
        <span class="word"><span v-for="(char, c) in word" :key="c" class="letter">{{ char }}</span></span>
        <template v-if="w < line.length - 1">{{ ' ' }}</template>
      </template>
    </span>
  </span>
</template>

<style scoped>
.line {
  display: block;
}

.word {
  white-space: nowrap;
}

.letter {
  display: inline-block;
}
</style>
