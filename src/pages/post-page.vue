<template>
<div class="body">
    <nav><SideBar/></nav>

    <div class="content">
        <main>
            <postFullview :post="post"/>
        </main>

        <div class="coment">
            <textarea></textarea>
            <button>Comentar</button>
        </div>

        <div class="coments">

        </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import SideBar from '@/components/Side-bar.vue';
import postFullview from '@/components/forum/post-fullview.vue';

const route = useRoute();
const postId = ref(route.params.postId);
const post = ref({});

onMounted( async () => {
    try {
        const response = await axios.get(`http://localhost:3000/posts/${postId.value}`);
        post.value = response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
});
</script>

<style scoped>
.body {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    z-index: -2;
    background-color: var(--primary-background-color);
}

.content {
    height: 99%;
    width: calc(100% - 130px);
    position: absolute;
    right: 0;
    top: 0;
    
    z-index: -1;
    text-align: center;
    overflow-y: scroll;
}

main {
    width: 100%;
    position: absolute;
    top: 0;
    display: block;
}

.coment {
    width: 100%;
    height: 100px;
    display: block;
}
</style>
