<script setup>
const props = defineProps({
    frameIndex: Number
})

const base = useRuntimeConfig().app.baseURL

const emits = defineEmits(['endExercice'])
</script>

<template>
    <div class="exercice-video-container">
        <video class="exercice-video" :src="`${base}/videos/cognitive_exercice_video.mp4`" preload="auto" autoplay
            @ended="$emit('endExercice')"></video>
        <div class="exit-button-container" @click="$emit('endExercice')">
            <img class="button-background"
                :src="`${base}/dessins/exerciceExplications/buttons/start_button_background_${frameIndex}.png`">
            <img class="button-border"
                :src="`${base}/dessins/exerciceExplications/buttons/start_button_border_${frameIndex}.png`">
            <span class="button-text">Stop the exercice</span>
        </div>
    </div>
</template>

<style scoped>
.exercice-video-container {
    height: 100%;
    width: 100%;
    background-color: #e5e5e5;
    display: flex;
    justify-content: end;
}

.exercice-video {
    height: 100%;
}

.exit-button-container {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 260px;
    height: 100px;
}

.button-background,
.button-border {
    position: absolute;
    height: 100%;
    width: 100%;
}

.button-background {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    transform: translate(2px, 2px);
}

.button-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 24px;
}
</style>