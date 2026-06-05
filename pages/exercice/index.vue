<!-- JS -->
<script setup>

const exercices = [
    { "id": "cognitive", "color": "--color-blue", "title": "Cognitive exercise", "subtitle": "Block out distractions and sustain concentration.", "description": "A warm light will move through you to help you relax and connect with your body.\n\nA voice will guide you through this exercise.\n\nWhen you finish this exercise, you will reveive a seed.\nPlant it in your garden, and see it sprout within a day." }
]

/* ----------------------- JIGGLE EFFECT -------------------------------- */
const frameIndex = ref(1)

onMounted(() => {
    const fps = 6 // slow = dessin animé / organique

    setInterval(() => {
        frameIndex.value = frameIndex.value % 3 + 1
    }, 1000 / fps)
})

/* -------------------- MANAGE POP UP FOR EXPLANATIONS -------------------------- */
const currentExplanations = ref(null)
function openExerciceExplanations(exercice) {
    exercices.forEach(e => {
        if (e.id === exercice) {
            currentExplanations.value = e
            return
        }
    })
}

function closeExplanations() {
    currentExplanations.value = null
}
</script>

<!-- HTML -->
<template>
    <section class="page-container exercice-page">
        <ExerciceMainHub :frame-index="frameIndex" @open-explanations="openExerciceExplanations"></ExerciceMainHub>
        <ExerciceExplanationsWindow v-if="currentExplanations" :frame-index="frameIndex" :exercice="currentExplanations"
            @close-explanations="closeExplanations"></ExerciceExplanationsWindow>
    </section>
</template>

<!-- CSS -->
<style scoped></style>