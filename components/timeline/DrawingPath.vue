<script setup>
const props = defineProps({
    frameIndex: Number,
    progress: Number,
    timeline: Array
})

const base = useRuntimeConfig().app.baseURL

/* -------------------- POINTS RÉELS -------------------- */
const points = [
    { p: 0, frame: 1 },
    { p: 0.19024780175859313, frame: 32 },
    { p: 0.3701039168665068, frame: 50 },
    { p: 0.47002398081534774, frame: 70 },
    { p: 0.9696243005595524, frame: 87 },
    { p: 1, frame: 88 }
]

/* -------------------- INTERPOLATION -------------------- */
function lerp(a, b, t) {
    return a + (b - a) * t
}

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v))
}

/* -------------------- FRAME -------------------- */
const currentFrame = computed(() => {
    const p = clamp(props.progress, 0, 1)

    // trouver segment
    for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]
        const b = points[i + 1]

        if (p >= a.p && p <= b.p) {
            const t = (p - a.p) / (b.p - a.p)
            const frame = Math.round(lerp(a.frame, b.frame, t))
            return frame

        }
    }

    return 88
})

/* --------------------- ACTIVE CHECKPOINT ----------------- */

const activeCheckpoint = computed(() =>
    getActiveCheckpoint(props.progress)
)
function getActiveCheckpoint(progress) {
    const EPSILON = 0.01 // ajustable (1% de tolérance)

    const checkpoints = [
        { id: 1, p: 0.19024780175859313, frame: 32 },
        { id: 2, p: 0.3701039168665068, frame: 50 },
        { id: 3, p: 0.47002398081534774, frame: 70 },
        { id: 4, p: 0.9696243005595524, frame: 87 }
    ]

    for (const cp of checkpoints) {
        if (Math.abs(progress - cp.p) <= EPSILON) {
            return cp
        }
    }

    return false
}

const checkpointFrame = computed(() => {
    return (activeCheckpoint.value.frame - 2) + props.frameIndex
})
</script>

<template>
    <div class="timeline-path-container">
        <img class="path-frame" :src="activeCheckpoint ? `${base}/dessins/timelinePath/chemin_${checkpointFrame}.png` : `${base}/dessins/timelinePath/chemin_${currentFrame}.png`" />
    </div>
</template>

<style scoped>
.timeline-path-container {
    height: 100%;
    width: 100%;

    z-index: 2;

    display: flex;
    justify-content: center;
}

.path-frame {
    width: calc(100% - 50px);
    object-fit: cover;
    object-position: center top;
    pointer-events: none;
    transform: translateY(80px);
}
</style>