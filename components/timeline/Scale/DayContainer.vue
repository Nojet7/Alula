<script setup>
const props = defineProps({
    dayDate: Date,
    exercice: Object,
    width: Number,
    frameIndex: Number
})

const base = useRuntimeConfig().app.baseURL

function formatDate(date) {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date))
}

</script>

<template>
    <div class="day-container" :style="{
        width: width + 'px'
    }">
        <div class="circle-container">
            <div v-if="exercice" class="circle-exercice">
                <img :src="`${base}/dessins/circles/${exercice.color.replace('--','')}.png`">
            </div>
            <div v-else class="circle-blank"></div>
        </div>

        <div class="date-container">
            <p v-if="exercice">{{ formatDate(dayDate) }}</p>
            <img v-else :src="`${base}/dessins/timelineScale/trait_timeline_${frameIndex}.png`">
        </div>
    </div>
</template>

<style scoped>
.day-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    will-change: transform;
}

.circle-container {
    height: calc(100% - 25px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.date-container {
    height: 35px;

    display: flex;
    justify-content: center;
}

.date-container img {
    height: 15px;
}

.circle-blank {
    border-radius: 50%;
    height: 20px;
    width: 20px;
    background-color: var(--color-grey);
}

.circle-exercice {
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.circle-exercice img {
    width: 100%;
    height: 100%;
}
</style>