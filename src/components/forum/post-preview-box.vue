<template>
    <router-link :to="'/forum/'
    //  + post.id
    " class="post_box"></router-link>
</template>

<script setup>
</script>

<style scoped>
.post_box {
    /* width: 1103px; */
    width: calc(100% - 4px);
    height: 180px;
    position: absolute;
    top: 0px;
    left: 0px;

    border-radius: 30px;
    border: 2px solid var(--primary-border-color);
}
</style>
