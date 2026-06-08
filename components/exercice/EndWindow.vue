<script setup>
const props = defineProps({
    frameIndex: Number,
    exercice: Object
})

const base = useRuntimeConfig().app.baseURL

const emits = defineEmits(['returnToHub', 'repeatExercice'])

</script>

<template>
    <div class="end-container" :style="{
        backgroundColor: `var(${props.exercice.color})`
    }">
        <div class="title-container medium-text">
            <img class="text-box-background title"
                :src="`${base}/dessins/exerciceExplications/textBlocks/title_background_${frameIndex}.png`">
            <img class="text-box-border title"
                :src="`${base}/dessins/exerciceExplications/textBlocks/title_border_${frameIndex}.png`">
            <span class="text-content">{{ exercice.title }}</span>
        </div>
        <div class="description-container medium-text">
            <img class="text-box-background description"
                :src="`${base}/dessins/exerciceExplications/textBlocks/description_background_${frameIndex}.png`">
            <img class="text-box-border description"
                :src="`${base}/dessins/exerciceExplications/textBlocks/description_border_${frameIndex}.png`">
            <span class="text-content">You did it!<br><br>A sprout has appeared in your garden, go take a look!<br><br>Repeat the exercise as many times as necessary.</span>
        </div>
        <div class="buttons-container">
            <div class="button back" @click="$emit('returnToHub')">
                <img class="button-background back"
                    :src="`${base}/dessins/exerciceExplications/buttons/back_button_background_${frameIndex}.png`">
                <img class="button-border back"
                    :src="`${base}/dessins/exerciceExplications/buttons/back_button_border_${frameIndex}.png`">
                <span class="button-text">Return to the garden</span>
            </div>
            <div class="button repeat" @click="$emit('repeatExercice', exercice.id)">
                <img class="button-background repeat"
                    :src="`${base}/dessins/exerciceExplications/buttons/start_button_background_${frameIndex}.png`">
                <img class="button-border repeat"
                    :src="`${base}/dessins/exerciceExplications/buttons/start_button_border_${frameIndex}.png`">
                <span class="button-text">Repeat exercise</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

.end-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 144px);
    height: calc(100% - 144px);
    padding: 72px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    justify-content: space-between;
}

/* ------------------- TEXT BLOCKS ----------------------- */
.title-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    min-height: 80px;
    padding: 20px 60px;
}

.description-container {
    position: relative;
    width: calc(100% - 114px);
    padding: 20px 60px;
    min-height: 250px;
}

.text-box-background,
.text-box-border {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
}

.text-box-background {
    inset: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
}

.text-content {
    position: relative;
    z-index: 1;
    font-size: 36px;
}

.title-container .text-content {
    white-space: nowrap;
}

.description-container .text-content {
    white-space: pre-line;
    display: block;
    max-width: 100%;
}

.medium-text {
    font-family: "Lexend Medium";
}

/* ------------------ BUTTONS --------------------- */
.buttons-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 25px;
}

.button {
    position: relative;
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