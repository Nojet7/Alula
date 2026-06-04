<script setup>
const props = defineProps({
    exercices: Array,
    frameIndex: Number
})

const base = useRuntimeConfig().app.baseURL

const sidePanelMaskUrl = computed(() =>
    `${base}/dessins/archivesSidePanel/side_pannel_fond_${props.frameIndex}.png`
)

/* ---------------- PANEL POSITION ---------------- */

const panelProgress = ref(0)

const panelWidth = 900
const visibleHandle = 40

const translateX = computed(() => {
    return (panelWidth - visibleHandle) * (1 - panelProgress.value)
})

/* ----------------------- DRAG DU SIDEPANEL -------------------------------- */
const handle = ref(null)

let startX = null
let dragging = false

function onTouchStart(e) {
    if (e.target !== handle.value) return

    dragging = true
    startX = e.touches[0].clientX
}

function onTouchMove(e) {
    if (!dragging) return

    const currentX = e.touches[0].clientX

    const delta = startX - currentX

    panelProgress.value += delta / 400

    panelProgress.value = Math.min(
        1,
        Math.max(0, panelProgress.value)
    )

    startX = currentX
}

function onTouchEnd() {
    if (!dragging) return

    dragging = false
    startX = null

    /* SNAP OUVERT / FERMÉ */

    if (panelProgress.value > 0.5) {
        panelProgress.value = 1
    } else {
        panelProgress.value = 0
    }
}

/* --------------------- LIFECICLE --------------------- */
onMounted(() => {
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
})

onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
    <div class="sidePanel-container" :style="{
        transform: `translateX(${translateX}px)`
    }">
        <div class="sidePanel-content-container" :style="{
            WebkitMaskImage: `url(${sidePanelMaskUrl})`,
            maskImage: `url(${sidePanelMaskUrl})`
        }">
            <h1 class="content-title">My achievements</h1>
            <div class="tab-container">
                <div class="tab-header">
                    <p class="header-title date">Date</p>
                    <p class="header-title time">Time period</p>
                    <p class="header-title type">Exercise type</p>
                    <p class="header-title note">Note</p>
                </div>
                <img class="row-separator" :src="`${base}/dessins/archivesSidePanel/row_separator_${frameIndex}.png`">
                <div class="tab-content">
                    <div class="exercice-entry-row" v-for="exercice in exercices">
                        <p class="exercice-entry date">{{ exercice.date }}</p>
                        <p class="exercice-entry time">{{ exercice.timePeriod }}</p>
                        <div class="exercice-entry type">
                            <img class="exercice-circle"
                                :src="`${base}/dessins/circles/${exercice.color.replace('--', '')}.png`">
                        </div>
                        <p class="exercice-entry note">{{ exercice.note }}</p>
                    </div>
                    <img class="col-separator col-1" :src="`${base}/dessins/archivesSidePanel/col_separator1_${frameIndex}.png`">
                    <img class="col-separator col-2" :src="`${base}/dessins/archivesSidePanel/col_separator2_${frameIndex}.png`">
                    <img class="col-separator col-3" :src="`${base}/dessins/archivesSidePanel/col_separator3_${frameIndex}.png`">
                </div>
            </div>
        </div>
        <img ref="handle" class="sidePanel-border"
            :src="`${base}/dessins/archivesSidePanel/side_pannel_${frameIndex}.png`">
    </div>
</template>

<style scoped>
.sidePanel-container {
    height: 100%;
    width: 900px;
    display: flex;

    position: absolute;
    top: 0;
    right: 0;
    transition: transform 0.25s ease;
    transform: translateX(calc(100% - 40px));
}

.sidePanel-border {
    position: absolute;
    height: 100%;
    transform: translateX(-35px);
    touch-action: none;
}

.sidePanel-content-container {
    height: calc(100% - 300px);
    width: 100%;
    padding: 150px 50px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    background-color: white;


    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;

    mask-size: 100% 100%;
    mask-repeat: no-repeat;
}

.content-title {
    text-decoration: underline;
    font-weight: normal;
    font-size: 24px;
}

.tab-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
}

.row-separator {
    position: absolute;
    width: 100%;
    height: 12px;
    top: 25px;
}

.col-separator {
    position: absolute;
    height: 100%;
    width: 12px;
}

.tab-header {
    display: flex;
}

.header-title {
    display: flex;
    justify-content: center;
    padding: 0 10px;
}

.tab-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.exercice-entry-row {
    display: flex;
    padding: 20px 0px;
}

.exercice-entry {
    display: flex;
    justify-content: center;
    padding: 0 10px;
}

.date {
    flex: 1;
}

.time {
    flex: 2;
}

.type {
    flex: 2;
}

.note {
    flex: 3;
}

.exercice-circle {
    width: 20px;
    height: 20px;
}

.col-1 {
    transform: translateX(104px);
}

.col-2 {
    transform: translateX(304px);
}

.col-3 {
    transform: translateX(494px);
}
</style>