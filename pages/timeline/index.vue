<!-- JS -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* -------------------- DATA -------------------- */
const exercices = [
    { date: "2026-05-29", categoryId: "bodily", color: "--color-green" },
    { date: "2026-06-02", categoryId: "cognitive", color: "--color-blue" },
    { date: "2026-06-04", categoryId: "affective", color: "--color-red" },
    { date: "2026-06-16", categoryId: "sensory", color: "--color-yellow" }
]

/* -------------------- DATES -------------------- */
const dates = computed(() =>
    exercices.map(e => new Date(e.date))
)

const minDate = computed(() => {
    const d = new Date(Math.min(...dates.value))
    d.setDate(d.getDate() - 10)
    return d
})

const maxDate = computed(() => {
    const d = new Date(Math.max(...dates.value))
    d.setDate(d.getDate() + 10)
    return d
})

const totalRangeMs = computed(() =>
    maxDate.value - minDate.value
)

const allDays = computed(() => {
    const start = new Date(minDate.value)
    const end = new Date(maxDate.value)

    const days = []
    const current = new Date(start)

    while (current <= end) {
        days.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }

    return days
})


/* -------------------- SCROLL ENGINE -------------------- */
const scrollValue = ref(0)

const maxScroll = 2000

let lastX = null
let lastY = null
let lockAxis = null
let velocity = 0
let animationId = null

function onTouchStart(e) {
    const t = e.touches[0]
    lastX = t.clientX
    lastY = t.clientY

    lockAxis = null

    cancelInertia()
}

function onTouchMove(e) {
    const t = e.touches[0]

    const dx = t.clientX - lastX
    const dy = t.clientY - lastY

    if (!lockAxis) {
        if (Math.abs(dx) > Math.abs(dy)) {
            lockAxis = 'x'
        } else {
            lockAxis = 'y'
        }
    }

    lastX = t.clientX
    lastY = t.clientY

    let delta = 0

    if(lockAxis === 'y') {
        delta = -dy
    }
    if(lockAxis === 'x') {
        delta = -dx
    }

    scrollValue.value += delta

    scrollValue.value = Math.min(
        maxScroll,
        Math.max(0, scrollValue.value)
    )

    velocity = delta
}

function onTouchEnd() {
    lastX = null
    lastY = null
    lockAxis = null
    startInertia()
}

/* -------------------- INERTIA (iOS FEEL) -------------------- */
function startInertia() {
    const friction = 0.92

    function step() {
        velocity *= friction
        scrollValue.value += velocity

        scrollValue.value = Math.min(
            maxScroll,
            Math.max(0, scrollValue.value)
        )

        const atMin = scrollValue.value <=0
        const atMax = scrollValue.value >= maxScroll

        if((atMin && velocity < 0) || (atMax && velocity > 0)) {
            velocity = 0
            return
        }

        if (Math.abs(velocity) > 0.1) {
            animationId = requestAnimationFrame(step)
        }
    }

    animationId = requestAnimationFrame(step)
}

function cancelInertia() {
    if (animationId) cancelAnimationFrame(animationId)
    velocity = 0
}

/* -------------------- PROGRESS -------------------- */

const progress = computed(() => {
    return Math.min(
        1,
        Math.max(0, scrollValue.value / maxScroll)
    )
})

const currentDate = computed(() => {
    return new Date(
        minDate.value.getTime() +
        progress.value * totalRangeMs.value
    )
})

const maxTranslate = computed(() => {
    return allDays.value.length * 74 // 74px (au piffe pour fonctionner avec la maquette)
})

/* -------------------- LIFECYCLE -------------------- */
onMounted(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
})

onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
})

/* -------------------- DEBUG -------------------- */
watchEffect(() => {
    console.log('progress:', progress.value)
    console.log('date:', currentDate.value)
})
</script>

<!-- HTML -->
<template>
    <section class="page-container timeline-page">
        <TimelineBackgroundSky />
        <TimelineDrawingPath />

        <TimelineScale :total-days="allDays" :exercices="exercices" :progress="progress"
            :max-translate="maxTranslate" />
    </section>
</template>

<!-- CSS -->
<style scoped></style>