<script setup>
const props = defineProps({
    frameIndex: Number
})

const base = useRuntimeConfig().app.baseURL

const emits = defineEmits(['openExplanations'])
</script>

<template>
    <div class="hub-container">
        <div class="path-container">
            <img class="path-background" :src="`${base}/dessins/exerciceHub/path_sans_graine_fond_${frameIndex}.png`">
            <img class="path-border" :src="`${base}/dessins/exerciceHub/path_sans_graine_${frameIndex}.png`">
        </div>
        <div class="buttons-container">
            <div class="cognitive-button button" @click="$emit('openExplanations', 'cognitive')">
                <img class="button-background cognitive"
                    :src="`${base}/dessins/exerciceHub/cognitive_button_background_${frameIndex}.png`">
                <img class="button-border cognitive"
                    :src="`${base}/dessins/exerciceHub/cognitive_button_border_${frameIndex}.png`">
                <span class="button-text">Cognitive</span>
            </div>
            <div class="sensory-button button" @click="$emit('openExplanations', 'sensory')">
                <img class="button-background sensory"
                    :src="`${base}/dessins/exerciceHub/sensory_button_background_${frameIndex}.png`">
                <img class="button-border sensory"
                    :src="`${base}/dessins/exerciceHub/sensory_button_border_${frameIndex}.png`">
                <span class="button-text">Sensory</span>
            </div>
            <div class="bodily-button button" @click="$emit('openExplanations', 'bodily')">
                <img class="button-background bodily"
                    :src="`${base}/dessins/exerciceHub/bodily_button_background_${frameIndex}.png`">
                <img class="button-border bodily"
                    :src="`${base}/dessins/exerciceHub/bodily_button_border_${frameIndex}.png`">
                <span class="button-text">Bodily</span>
            </div>
            <div class="surroundings-button button" @click="$emit('openExplanations', 'surroundings')">
                <img class="button-background surroundings"
                    :src="`${base}/dessins/exerciceHub/surroundings_button_background_${frameIndex}.png`">
                <img class="button-border bodily"
                    :src="`${base}/dessins/exerciceHub/surroundings_button_border_${frameIndex}.png`">
                <span class="button-text">Surroundings</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hub-container {
    height: 100%;
    width: 100%;
}

.path-container {
    position: absolute;
    height: 600px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.path-border,
.path-background {
    position: absolute;
    height: 100%;
}

.path-background {
    height: calc(100% - 12px);
    transform: translateY(6px);
}

/* ------------------------------------- BUTTONS -------------------------------------- */
.buttons-container {
    position: absolute;
    right: 50px;
    left: 200px;
    top: 50%;
    transform: translateY(-50%);
    height: 90%;
}

.button {
    position: absolute;
    height: 200px;
    width: 230px;
}

.button-background, .button-border {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
}

.button-background {
    height: calc(100% - 6px);
    transform: translate(3px, 3px);
}

.button-text {
    position: absolute;
    font-size: 24px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.cognitive-button {
    top: 0;
    left: 0;
}

.sensory-button {
    top: 100px;
    right: 0;
}

.bodily-button {
    bottom: 100px;
    left: 0;
}

.surroundings-button {
    bottom: 150px;
    right: 0;
}
</style>