<template>
<div class="post">
    <profilePhoto class="pfp" :userId="this.post.author"/>

    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>

    <valoration 
        :valoration="parseInt(this.valoration)" 
        @update:valoration="update"
    />

    <postCards class="post-cards" :cards="post.cards"/>

    <deleteButton class="delete_button"/>
    
    <postPreviewRouter :postId="this.post.id"/>
</div>
</template>

<script>
import axios from 'axios';

import postPreviewRouter from './post-preview-router.vue';
import deleteButton from '../delete-button.vue';
import profilePhoto from '../profile-photo.vue';
import valoration from './post-valoration.vue';
import postCards from './post-cards.vue';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            valoration: this.post.valoration
        };
    },
    components: {
        postPreviewRouter,
        deleteButton,
        profilePhoto,
        valoration,
        postCards,
    },
    methods: {
        update(valoration) {
            this.valoration = valoration;
            this.jsonUpdate();
        },
        async jsonUpdate() {
            try {
                await axios.put(`http://localhost:3000/posts/${this.post.id}`, {
                    title: this.post.title,
                    content: this.post.content,
                    author: this.post.author,
                    valoration: this.valoration,
                    cards: this.post.cards,
                    comments: this.post.comments
                });
            } catch (error) {
                console.error('Error al actualizar la valoración del post:', error);
            }
        },
    }
}
</script>

<style scoped>
.post {
    width: 90%;
    max-width: 1103px;
    height: 184px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    margin-bottom: 10px;
    background: var(--primary-background-color);
    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
}

.pfp {
    width: 90px;
    height: 90px;
    position: absolute;
    left: 10px;
    top: 10px;
}

h1 {
    left: 130px;
    top: 5px;
    position: absolute;
    
    color: var(--primary-border-color);
    font-size: 36px;
    font-weight: 400;
    word-wrap: break-word;
}
p {
    left: 130px;
    top: 60px;
    position: absolute;

    text-align: right;
    color: var(--primary-border-color);
    font-size: 24px;
    font-weight: 400;
    word-wrap: break-word;
}

.delete_button {
    width: fit-content;
    height: fit-content;
    position: absolute;
    right: -35px;
    top: 37%;

    display: none;
    rotate: -90deg;
}

.post-cards {
    position: absolute;
    top: 13px;
    right: 13px;
}
</style>
