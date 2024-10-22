<template>
<div class="body">
    <nav><SideBar/></nav>

    <div class="content">
        <main>
            <postFullview :post="post"/>
        </main>

        <div class="coment">

        </div>

        <div class="coments">
            
        </div>
    </div>
</div>
</template>

<script setup>
import SideBar from '@/components/Side-bar.vue';
import postFullview from '@/components/forum/post-fullview.vue';
</script>

<style scoped>
</style>
