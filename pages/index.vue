<script setup>
</script>

<template>
    <div class="nav-container">
        <nuxt-link to="/timeline" class="timeline-nav">
            <h1>TIMELINE</h1>
        </nuxt-link>
        <nuxt-link to="/exercice" class="exercice-nav">
            <h1>EXERCICE</h1>
        </nuxt-link>
        <nuxt-link to="/archive" class="archive-nav">
            <h1>ARCHIVE</h1>
        </nuxt-link>
    </div>
</template>

<style scoped>
.nav-container {
    display: flex;
    gap: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.nav-container>* {
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.archive-nav {
    background-image: url(/dessins/circles/color-yellow.png);
}

.exercice-nav {
    background-image: url(/dessins/circles/color-green.png);
}

.timeline-nav {
    background-image: url(/dessins/circles/color-blue.png);
}

.nav-circle {
    height: 100%;
    width: 100%;
}

h1 {
    color: black;
}
</style>