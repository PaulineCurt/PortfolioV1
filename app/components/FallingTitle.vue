<script setup lang="ts">
// Collapsing title: shown normally, then its letters fall in a heap at the bottom of the stage,
// i.e. the first positioned parent (position: relative), which acts as floor and walls. They can then
// be grabbed and thrown; a letter released in mid-air falls back down. Without JS, the title simply
// stays in place. The full text stays readable by screen readers; the letters are decorative.
const props = defineProps<{ lines: string[] }>()

const words = computed(() => props.lines.map((line) => line.split(' ').map((word) => [...word])))

const title = ref<HTMLElement>()
let cleanup: (() => void) | undefined
let unmounted = false

onMounted(async () => {
  const el = title.value
  const stage = el?.offsetParent
  if (!el || !(stage instanceof HTMLElement)) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  const [{ gsap }, { Draggable }, { InertiaPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/Draggable'),
    import('gsap/InertiaPlugin'),
  ])
  gsap.registerPlugin(Draggable, InertiaPlugin)
  await document.fonts.ready
  if (unmounted) return // unmounted while loading

  const letters = [...el.querySelectorAll<HTMLElement>('.letter')]
  const box = stage.getBoundingClientRect()

  // 1. Pin each letter where it currently is, in absolute position: `stage` being the first positioned
  //    parent, they are placed relative to it while keeping the title's styles.
  //    The title keeps its height so the text below doesn't jump up.
  el.style.height = `${el.offsetHeight}px`
  const origins = letters.map((l) => {
    const r = l.getBoundingClientRect()
    return { left: r.left - box.left, top: r.top - box.top, width: r.width, height: r.height }
  })
  letters.forEach((l, i) => {
    const o = origins[i]!
    Object.assign(l.style, { position: 'absolute', left: `${o.left}px`, top: `${o.top}px`, width: `${o.width}px` })
  })

  // The floor must stay below everything in the stage (text, button): enlarge the stage if needed
  const contentBottom = Math.max(...[...stage.children].map((c) => c.getBoundingClientRect().bottom - box.top))
  const tallest = Math.max(...origins.map((o) => o.height))
  stage.style.minHeight = `${Math.max(stage.clientHeight, contentBottom + tallest * 1.3 + 8)}px`

  // Vertical offset that puts letter i on the floor. A letter's box is shorter than its glyph
  // (tight title line-height): keep a margin so the bottom of the letters isn't clipped.
  const floorY = (i: number) => stage.clientHeight - origins[i]!.height * 1.25 - 16 - origins[i]!.top

  // Floor spots: spread across the full width, shuffled, with a bit of randomness
  const slot = (stage.clientWidth - 32) / letters.length
  const slots = gsap.utils.shuffle(letters.map((_, i) => 16 + i * slot))

  // 2. Fall: each letter drops to its floor spot, askew, bouncing
  letters.forEach((l, i) => {
    const o = origins[i]!
    const left = gsap.utils.clamp(0, stage.clientWidth - o.width, slots[i]! + gsap.utils.random(-slot * 0.3, slot * 0.3))
    const target = { x: left - o.left, y: floorY(i), rotation: gsap.utils.random(-28, 28) }
    if (reduce) gsap.set(l, target)
    else gsap.to(l, { ...target, duration: gsap.utils.random(0.9, 1.4), delay: 0.6 + i * 0.07, ease: 'bounce.out' })
  })

  // 3. Letters can be grabbed and thrown; in mid-air, they fall back down
  let z = 1
  const drop = (l: HTMLElement, i: number) => {
    const y = Number(gsap.getProperty(l, 'y'))
    if (reduce || y >= floorY(i) - 2) return
    gsap.to(l, {
      y: floorY(i),
      rotation: gsap.utils.random(-28, 28),
      duration: 0.5 + Math.sqrt((floorY(i) - y) / 900),
      ease: 'bounce.out',
    })
  }
  const draggables = letters.map((l, i) =>
    Draggable.create(l, {
      type: 'x,y',
      bounds: stage,
      inertia: !reduce,
      edgeResistance: 0.85,
      zIndexBoost: false,
      onPress() {
        gsap.killTweensOf(l)
        l.style.zIndex = String(++z) // the grabbed letter comes to the front
        stage.classList.add('is-grabbing') // no text selection while dragging
      },
      onRelease() {
        stage.classList.remove('is-grabbing')
        if (reduce || !this.tween) drop(l, i)
      },
      onThrowComplete: () => drop(l, i),
    })[0]!,
  )

  cleanup = () => {
    draggables.forEach((d) => d.kill())
    gsap.killTweensOf(letters)
  }
})

onBeforeUnmount(() => {
  unmounted = true
  cleanup?.()
})
</script>

<template>
  <span class="visually-hidden">{{ lines.join(' ') }}</span>
  <span ref="title" class="falling" aria-hidden="true">
    <span v-for="(line, l) in words" :key="l" class="line">
      <template v-for="(word, w) in line" :key="w">
        <span class="word"><span v-for="(char, c) in word" :key="c" class="letter">{{ char }}</span></span>
        <template v-if="w < line.length - 1">{{ ' ' }}</template>
      </template>
    </span>
  </span>
</template>

<style scoped>
.falling {
  display: block;
}

.line {
  display: block;
}

.word {
  white-space: nowrap;
}

.letter {
  display: inline-block;
  cursor: grab;
  touch-action: none; /* on mobile, grabbing a letter doesn't scroll the page */
  user-select: none;
}

.letter:active {
  cursor: grabbing;
}
</style>
