<script setup>
const props = defineProps({
    dayDate: Date,
    exercice: Object
})

function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date))
}
</script>

<template>
    <div class="day-container">
        <div class="circle-container">
            <div v-if="exercice" class="circle-exercice" :style="{backgroundColor: `var(${props.exercice.color})`}"></div>
            <div v-else class="circle-blank"></div>
        </div>

        <div class="date-container">
            <p v-if="exercice">{{ formatDate(dayDate) }}</p>
            <p v-else>|</p>
        </div>
    </div>
</template>

<style scoped>
.day-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
}

.circle-container {
    height: calc(100% - 25px);
    display: flex;
    align-items: center;
}

.date-container {
    height: 25px;
    display: flex;
    justify-content: center;
}

.circle-blank {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: var(--color-grey);
}

.circle-exercice {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: red;
}
</style>