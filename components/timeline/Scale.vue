<script setup>
const props = defineProps({
    timeline: Array,
    scrollValue: Number,
    timelineWidth: Number,
    frameIndex: Number
})

const base = useRuntimeConfig().app.baseURL

const viewportWidth = ref(0)
const viewport = ref(null)

onMounted(() => {
    if (viewport.value) {
        viewportWidth.value = viewport.value.offsetWidth
    }
})

const maxTranslate = computed(() => {
    return Math.max(
        0, props.timelineWidth - viewportWidth.value
    )
})

const translateX = computed(() => {
    return Math.min(
        maxTranslate.value, props.scrollValue
    )
})

const maskUrl = computed(() =>
    `${base}/dessins/timelineScale/interieur_fond_blanc_${props.frameIndex}.png`
)
</script>

<template>
    <div ref="viewport" class="scale-viewport" :style="{
        WebkitMaskImage: `url(${maskUrl})`,
        maskImage: `url(${maskUrl})`
    }">

        <div class="scale-track" :style="{
            width: timelineWidth + 'px',
            transform: `translateX(${-translateX}px)`
        }">

            <TimelineScaleDayContainer v-for="(item, index) in timeline" :key="item.date" :day-date="item.date"
                :exercice="item.exercice" :width="item.width" :frame-index="frameIndex"/>

        </div>

    </div>
    <img class="scale-border" :src="`${base}/dessins/timelineScale/fond_transparent_${frameIndex}.png`">
</template>

<style scoped>
.scale-viewport {
    width: calc(100% - 144px);
    height: 200px;
    overflow: hidden;
    position: absolute;
    bottom: 72px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 50px;

    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;

    mask-size: 100% 100%;
    mask-repeat: no-repeat;
}

.scale-track {
    display: flex;
    height: 100%;
    will-change: transform;
}

.scale-border {
    position: absolute;
    bottom: calc(72px - 2px);
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 144px + 4px);
    height: calc(200px + 4px);
}
</style>