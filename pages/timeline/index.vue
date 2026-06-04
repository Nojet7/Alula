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

/* --------------------- CONFIG ----------------- */
const pixelsPerNormalDay = 100
const pixelsPerExerciseDay = 150

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

/* -------------------- TIMELINE ----------------------- */

const timeline = computed(() => {
    let x = 0

    return allDays.value.map(day => {
        const dayString = day.toISOString().split('T')[0]

        const exercice = exercices.find(
            e => e.date === dayString
        )

        const width = exercice
            ? pixelsPerExerciseDay
            : pixelsPerNormalDay

        const item = {
            date: day,
            x,
            exercice,
            width
        }

        x += width

        return item
    })
})

const timelineWidth = computed(() => {
    const last = timeline.value.at(-1)

    if (!last) return 0

    return last.x + last.width
})

/* -------------------- VIEWPORT -------------------- */
const viewportWidth = ref(0)


/* -------------------- SCROLL ENGINE -------------------- */

const scrollValue = ref(0)

const maxScroll = computed(() => {
    if (!viewportWidth.value) return 0
    return Math.max(0, timelineWidth.value - viewportWidth.value)
})

let lastX = null
let lastY = null
let lockAxis = null
let velocity = 0
let animationId = null

const centerX = computed(() => {
    return (scrollValue.value + viewportWidth.value / 2)
})

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

    if (lockAxis === 'y') {
        delta = -dy
    }
    if (lockAxis === 'x') {
        delta = -dx
    }

    scrollValue.value += delta

    scrollValue.value = Math.min(maxScroll.value, Math.max(0, scrollValue.value))

    velocity = delta
}

function onTouchEnd() {
    lastX = null
    lastY = null
    lockAxis = null
    startInertia()
    setTimeout(() => {
        snapToClosest()
    }, 250)
}

/* -------------------- INERTIA (iOS FEEL) -------------------- */
function startInertia() {
    const friction = 0.92

    function step() {
        velocity *= friction
        scrollValue.value += velocity

        scrollValue.value = Math.min(
            maxScroll.value,
            Math.max(0, scrollValue.value)
        )

        const atMin = scrollValue.value <= 0
        const atMax = scrollValue.value >= maxScroll.value

        if ((atMin && velocity < 0) || (atMax && velocity > 0)) {
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

/* --------------------- SNAP DES JOURS AU CENTRE ------------ */
function getItemCenter(item) {
    return item.x + item.width / 2
}

function findClosestToCenter() {
    const centerScroll = scrollValue.value + viewportWidth.value / 2

    let closest = null
    let bestDist = Infinity

    for (const item of timeline.value) {
        if(!item.exercice) continue

        const itemCenter = getItemCenter(item)
        const dist = Math.abs(itemCenter - centerScroll)

        if (dist < 150 && dist < bestDist) {
            bestDist = dist
            closest = item
        }
    }

    return closest
}

function snapToClosest() {
    const target = findClosestToCenter()
    if (!target) return

    const targetCenter = target.x + target.width / 2
    const newScroll = targetCenter - viewportWidth.value / 2

    animateScrollTo(Math.min(maxScroll.value, Math.max(0, newScroll)))
}

/* animation smooth */
function animateScrollTo(target) {
    const start = scrollValue.value
    const diff = target - start
    const duration = 250
    const startTime = performance.now()

    function step(t) {
        const p = Math.min(1, (t - startTime) / duration)
        const ease = 1 - Math.pow(1 - p, 3)

        scrollValue.value = start + diff * ease

        if (p < 1) {
            requestAnimationFrame(step)
        }
    }

    requestAnimationFrame(step)
}

/* -------------------- PROGRESS -------------------- */

const progress = computed(() => {
    if (!maxScroll.value) return 0

    return scrollValue.value / maxScroll.value
})

/* -------------------- CURRENT DATE ------------------ */
const currentTimelineItem = computed(() => {
    if (!timeline.value.length) return null

    let closest = null
    let closestDistance = Infinity

    for (const item of timeline.value) {
        const itemCenter = item.x + item.width / 2
        const distance = Math.abs(itemCenter - centerX.value)

        if (distance < closestDistance) {
            closestDistance = distance
            closest = item
        }
    }

    return closest
})

const currentDate = computed(() => {
    return currentTimelineItem.value?.date
})

/* -------------------- LIFECYCLE -------------------- */
onMounted(() => {
    viewportWidth.value = window.innerWidth

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

        <TimelineScale :timeline="timeline" :scroll-value="scrollValue" :timeline-width="timelineWidth" />
    </section>
</template>

<!-- CSS -->
<style scoped></style>