<!-- JS -->
<script setup>

const base = useRuntimeConfig().app.baseURL

const exercices = [
    {
        "id": "cognitive", "color": "--color-blue", "title": "Cognitive exercise", "subtitle": "Block out distractions and sustain concentration", "description": "A warm light will move through you to help you relax and connect with your body.\n\nA voice will guide you through this exercise.\n\nWhen you finish this exercise, you will reveive a seed.\nPlant it in your garden, and see it sprout within a day."
    },
    {
        "id": "sensory", "color": "--color-yellow", "title": "Sensory exercise", "subtitle": "Reduce anxiety, frustration, and calms overload", "description": "A light will shine on your screen. You will be encouraged to focus on this light.\n\nSounds will guide you through this exercise.\n\nWhen you finish this exercise, you will receive a seed.\nPlant it in your garden, and see it sprout within a day."
    },
    {
        "id": "bodily", "color": "--color-green", "title": "Bodily exercise", "subtitle": "Reconnect with your body, return to the present moment", "description": "You'll see a circle slowly expand, then contract. Follow the circle with your breathing.\n\nYou can also close your eyes as sounds will guide you through this exercise.\n\nWhen you finish this exercise, you will receive a seen.\nPlant it in your garden, and see it sprout within a day."
    },
    {
        "id": "surroundings", "color": "--color-red", "title": "Surroundings", "subtitle": "Get out of your head, improve communication", "description": "You will be asked to look around you and identify some objects. You may be invited to listen, touch or name these objects.\n\nWhen you finish this exercise, you will receive a seed.\nPlant it in your garden, and see it sprout within a day."
    }
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
const preloadedVideos = new Set()
function preloadVideo(exerciceId) {
    const url = `${base}/videos/${exerciceId}_exercice_video.mp4`

    if (preloadedVideos.has(url)) {
        return
    }

    const link = document.createElement('link')

    link.rel = 'preload'
    link.as = 'fetch'
    link.href = url
    link.crossOrigin = 'anonymous'

    document.head.appendChild(link)
    preloadedVideos.add(url)
}

const currentExplanations = ref(null)
function openExerciceExplanations(exercice) {
    exercices.forEach(e => {
        if (e.id === exercice) {
            currentExplanations.value = e
            if (exercice === 'cognitive') {
                preloadVideo(e.id)
            }
            return
        }
    })
}

function closeExplanations() {
    currentExplanations.value = null
}

/* --------------------- EXERCICE LAUNCH ---------------------------------- */
const currentExercicePlaying = ref(null)
function startExercice(exercice) {
    currentExercicePlaying.value = exercice
    closeExplanations()
}

const currentExerciceEnding = ref(null)
function endOfExercice() {
    exercices.forEach(e => {
        if (e.id === currentExercicePlaying.value) {
            currentExerciceEnding.value = e
            return
        }
    })
    currentExercicePlaying.value = null
}

function returnToHub() {
    currentExerciceEnding.value = null
}

function repeatExercice(exercice) {
    currentExerciceEnding.value = null
    startExercice(exercice)
}
</script>

<!-- HTML -->
<template>
    <section class="page-container exercice-page">
        <ExerciceMainHub v-if="!currentExercicePlaying && !currentExerciceEnding" :frame-index="frameIndex"
            @open-explanations="openExerciceExplanations"></ExerciceMainHub>
        <ExerciceExplanationsWindow v-if="currentExplanations" :frame-index="frameIndex" :exercice="currentExplanations"
            @close-explanations="closeExplanations" @start-exercice="startExercice"></ExerciceExplanationsWindow>
        <ExerciceVideo v-if="currentExercicePlaying" :frame-index="frameIndex" @end-exercice="endOfExercice">
        </ExerciceVideo>
        <ExerciceEndWindow v-if="currentExerciceEnding" :frame-index="frameIndex" :exercice="currentExerciceEnding"
            @return-to-hub="returnToHub" @repeat-exercice="repeatExercice"></ExerciceEndWindow>
    </section>
</template>

<!-- CSS -->
<style scoped></style>