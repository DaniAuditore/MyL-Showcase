<template>
<div class="body">
    <nav><SideBar/></nav>

    <div class="content">
        <main>
            <postFullview class="post"
                :post="post"
                :isAdmin="isAdmin"
                :currentUser="currentUser"
            />
        </main>

        <div class="comment">
            <input type="text" placeholder="Escribe un comentario aquí">
            <button>Comentar</button>
        </div>

        <commentsSection class="commentSection" :comments="post.comments" :postId="postId"/>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

import SideBar from '@/components/Side-bar.vue';
import postFullview from '@/components/forum/post-fullview.vue';
import commentsSection from '@/components/forum/comments-section.vue';

// To access post id from path
const route = useRoute();
const postId = ref(route.params.postId);
const post = ref({});

// To check permissions
const store = useStore();
const currentUser = store.getters.currentUser.id;
const isAdmin = ref(false);

onMounted( async () => {
    try {   // Fetching post data
        const response = await axios.get(`http://localhost:3000/posts/${postId.value}`);
        post.value = response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }

    try {   // Checking admin permissions
        isAdmin.value = store.getters.currentUser.role === 'admin';
    } catch (error) {
        console.error('Error checking permissions:', error);
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
    overflow-y: scroll;
}

main {
    width: 100%;
    position: relative;
    top: 0px;
}

.comment {
    width: 90%;
    max-width: 1103px;
    height: 71px;
    position: relative;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);

    text-align: left;
    margin: 0 0 10px;
}

input {
    width: calc(100% - 180px);
    height: 63px;
    left: 0px;

    margin: 0 5px 0 0;
    padding: 1px 10px;
    font-size: 24px;
    color: var(--primary-border-color);

    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
    background-color: transparent;
}

button {
    width: 150px;
    height: 100%;
    position: absolute;
    right: 0px;

    cursor: pointer;
    color: var(--primary-background-color);
    font-size: 24px;

    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
    background-color: var(--primary-border-color);
}
button:hover {
    color: var(--primary-border-color);
    border-color: var(--secondary-border-color);
    background-color: var(--secondary-background-color);
}

.commentSection {
    width: 100%;
    height: fit-content;
    position: relative;
    top: 0px;
}
</style>
