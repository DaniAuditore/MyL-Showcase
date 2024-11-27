<template>
    <section class="post">
        <profilePhoto class="pfp" :userId="post.author"/>
        <h1 class="authorName">
            {{ authorName }}
        </h1>
        
        <h1 class="title">
            {{ post.title }}
        </h1>
        <p>{{ post.content }}</p>

        <valoration 
            :valoration="parseInt(this.valoration)" 
            @update:valoration="update"
        />

        <postCards class="post-cards" :cards="post.cards"/>

        <deleteButton class="delete" v-if="isAdmin || currentUser === post.author"/>
    </section>
</template>

<script>
import axios from 'axios';

import profilePhoto from '../profile-photo.vue';
import valoration from './post-valoration.vue';
import deleteButton from '../delete-button.vue';
import postCards from './post-cards.vue';

export default {
    components: {
        profilePhoto,
        valoration,
        deleteButton,
        postCards,
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false
        },
        currentUser: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            authorName: 'Participante',
            valoration: this.post.valoration,
        };
    },
    mounted() {
        this.getAuthorName();
    },
    methods: {
        async getAuthorName() {
            try {
                const response = await axios.get(`http://localhost:3000/users/${this.post.author}`);
                this.authorName = response.data.name;
            } catch (error) {
                console.error('Error fetching author name:', error);
                this.authorName = 'Participante';
            }
        },
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
    height: fit-content;
    min-height: 580px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    margin: 90px 0 10px;
    background: var(--primary-background-color);
    border: 2px solid var(--primary-border-color);
    border-radius: 30px;

    overflow: hidden;
}

.pfp {
    width: 90px;
    height: 90px;
    position: absolute;
    left: 10px;
    top: 10px;
}

.authorName {
    left: 140px;
    top: 15px;
    position: absolute;
    
    color: var(--primary-border-color);
    font-size: 36px;
    font-weight: 400;
    word-wrap: break-word;
}

.title {
    width: fit-content;
    height: fit-content;
    left: 20px;
    top: 110px;
    position: absolute;
    
    font-size: 36px;
    font-weight: 400;
    word-wrap: break-word;
    
    color: var(--primary-border-color);
    border: 0;
    background-color: transparent;
}
p {
    left: 20px;
    top: 180px;
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
    right: 10px;
    top: 10px;
}
</style>
