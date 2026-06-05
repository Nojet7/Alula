<!-- JS -->
<script setup>
const base = useRuntimeConfig().app.baseURL

const exercices = [
    { date: "16.06.2026", categoryId: "sensory", color: "--color-yellow", "timePeriod": "Morning", "note": "I have a presentation at school and I am stressed." },
    { date: "04.06.2026", categoryId: "affective", color: "--color-red", "timePeriod": "Morning", "note": "I have to take the train and there will be lots of people." },
    { date: "02.06.2026", categoryId: "cognitive", color: "--color-blue", "timePeriod": "Afternoon", "note": "-" },
    { date: "29.05.2026", categoryId: "bodily", color: "--color-green", "timePeriod": "Evening", "note": "There is too much noise outside." }
]

/* --------------------- ANIMATION DE JITTER (SECOUSSE DU DESSIN) ------------------------- */
const frameIndex = ref(1)

onMounted(() => {
    const fps = 6 // slow = dessin animé / organique

    setInterval(() => {
        frameIndex.value = frameIndex.value % 3 + 1
    }, 1000 / fps)
})

</script>

<!-- HTML -->
<template>
    <section class="page-container archive-page">
        <div class="background-container">
            <img class="background" :src="`${base}/dessins/archivesBackground/arriere_plan_ipad3_${frameIndex}.png`">
        </div>
        <ArchiveSidePanel :exercices="exercices" :frame-index="frameIndex">
        </ArchiveSidePanel>
    </section>
</template>

<!-- CSS -->
<style scoped>
.archive-page {
    position: relative;
    overflow: hidden;
}

.background-container {
    width: 100%;
    height: 100%;
}

.background {
    height: 100%;
    width: 100%;
}
</style>