<script setup>
const props = defineProps({
    timeline: Array,
    scrollValue: Number,
    timelineWidth: Number

})

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
</script>

<template>
    <div ref="viewport" class="scale-viewport">

        <div class="scale-track" :style="{
            width: timelineWidth + 'px',
            transform: `translateX(${-translateX}px)`
        }">

            <TimelineScaleDayContainer v-for="item in timeline" :key="item.date" :day-date="item.date"
                :exercice="item.exercice" :width="item.width" />

        </div>

    </div>
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
}

.scale-track {
    display: flex;
    height: 100%;
    will-change: transform;
}
</style>