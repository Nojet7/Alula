<script setup>
const props = defineProps({
    currentDateTime: Date
})

const base = useRuntimeConfig().app.baseURL

const TOTAL_FRAMES = 52

const currentFrame = computed(() => {
    if (!props.currentDateTime) return 1

    const date = new Date(props.currentDateTime)

    const hours = date.getHours()
    const minutes = date.getMinutes()

    // convertir en fraction de journée (0 → 1)
    const progressOfDay = (hours * 60 + minutes) / 1440

    // mapping vers frames
    const frame = Math.floor(progressOfDay * TOTAL_FRAMES)

    return Math.min(TOTAL_FRAMES, Math.max(1, frame))
})
</script>

<template>
    <div class="sky-container">
        <img class="sky-frame" :src="`${base}/dessins/timelineSky/sky_${currentFrame}.png`" />
    </div>
</template>

<style scoped>
.sky-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    justify-content: center;
}

.sky-frame {
    height: 120%;
    width: 100%;
}
</style>