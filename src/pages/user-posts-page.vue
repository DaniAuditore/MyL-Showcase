<template>
<div class="body">
    <nav>
        <SideBar/>
    </nav>

    <div class="content">
        <header>
            <router-link to="/forum/create-post">
                <createButton/>
            </router-link>
        </header>

        <main class="posts">
            <postPreview v-for="post in posts" :key="post.id"
                :post="post"
            />
        </main>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import SideBar from '@/components/Side-bar.vue';
import createButton from '@/components/create-button.vue';
import postPreview from '@/components/forum/post-preview.vue';

// To get owners posts
const route = useRoute();
const ownerId = ref(route.params.userId);

const posts = ref([]);

onMounted(async () => {
    const owner = ref({});
    try {   // Fetching ids of posts from user
        console.log("consiguiendo datos del id", ownerId.value);
        const response = await axios.get(`http://localhost:3000/users/${ownerId.value}`);
        owner.value = response.data;
    } catch (error) {
        console.error('Error al cargar la lista de posts del usuario:', error);
    }
    try {   // Fetching posts from ids
        owner.value.posts.forEach(async element => {
            const response = await axios.get(`http://localhost:3000/posts/${element}`);
            posts.value.push(response.data);
        });
    } catch (error) {
        console.error('Error al cargar los posts del usuario:', error);
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
}

header {
    width: 90%;
    max-width: 1103px;
    height: fit-content;
    position: absolute;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);

    margin: 0;
    text-align: left;
}

.posts {
    width: 100%;
    height: 83%;
    position: absolute;
    top: 160px;
    right: inherit;

    overflow-y: scroll;
    scrollbar-width: none;
}
</style>
