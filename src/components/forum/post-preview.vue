<template>
<div class="post">


    <postPreviewBox/>
</div>    
</template>

<script setup>
import postPreviewBox from './post-preview-box.vue';
</script>

<style scoped>
.post {
    width: 1107px;
    height: 184px;
    position: relative;
    left: calc(50% - 551px);

    margin-bottom: 10px;
    background: var(--primary-background-color);
    overflow: hidden;
}
</style>
