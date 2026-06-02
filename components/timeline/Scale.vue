<script setup>
const props = defineProps({
    totalDays: Array,
    exercices: Array,
    progress: Number,
    maxTranslate: Number

})

function formatDate(date) {
    return new Date(date).toISOString().split('T')[0]
}

function getExerciceForDay(day) {
    const dayStr = formatDate(day)

    return props.exercices.find(ex => ex.date === dayStr) || null
}
</script>

<template>
    <div class="scale-viewport">

        <div class="scale-track" :style="{
            transform: `translateX(${-progress * maxTranslate}px)`
        }">

            <TimelineScaleDayContainer v-for="day in totalDays" :key="formatDate(day)" :dayDate="day"
                :exercice="getExerciceForDay(day)" />

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