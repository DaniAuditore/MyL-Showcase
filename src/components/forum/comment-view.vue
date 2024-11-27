<template>
    <div class="comment">
        <profilePhoto class="pfp" :userId="comment.author"/>
        <h1 class="authorName">
            {{ authorName }}
        </h1>

        <p class="content">
            {{ comment.content }}
        </p>

        <valoration 
            :valoration="parseInt(this.valoration)" 
            @update:valoration="update"
        />

        <deleteButton class="delete_button" v-if="isAdmin || currentUser === comment.author"/>
    </div>
</template>

<script>
import axios from 'axios';

import profilePhoto from '../profile-photo.vue';
import valoration from './post-valoration.vue';
import deleteButton from '../delete-button.vue';

export default {
    props: {
        /** Comment object */
        comment: {
            type: Object,
            required: true
        },
        /** Post id */
        postId: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            authorName: '',
            valoration: this.comment.valoration,
        };
    },
    components: {
        profilePhoto,
        valoration,
        deleteButton,
    },
    mounted() {
        this.getAuthorName();
    },
    methods: {
        async getAuthorName() {
            try {   // Fetching author name
                const response = await axios.get(`http://localhost:3000/users/${this.comment.author}`);
                this.authorName = response.data.name;
            } catch (error) {
                console.error('Error fetching author name:', error);
                this.authorName = 'Comentante';
            }
        },
        update(valoration) {
            this.valoration = valoration;
            this.jsonUpdate();
        },
        async jsonUpdate() {
            try {
                await axios.put(`http://localhost:3000/posts/${this.postId}/comments/${this.comment.id}`, {
                    content: this.comment.content,
                    author: this.comment.author,
                    valoration: this.valoration
                });
            } catch (error) {
                console.error('Error al actualizar la valoración del post:', error);
            }
        },
    }
}
</script>

<style scoped>
.comment {
    width: 90%;
    max-width: 1103px;
    height: fit-content;
    min-height: 225px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    margin: 0 0 10px;
    padding: 0 0 10px 0;

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

.authorName {
    left: 140px;
    top: 15px;
    position: absolute;
    
    font-size: 36px;
    font-weight: 400;
    word-wrap: break-word;
    color: var(--primary-border-color);
}

.content {
    width: calc(100% - 40px);
    height: fit-content;
    left: 20px;
    top: 110px;
    position: absolute;
    
    text-align: left;
    font-size: 24px;
    font-weight: 400;
    
    color: var(--primary-border-color);
    background-color: transparent;
    border: 0;
}

.delete_button {
    width: fit-content;
    height: fit-content;
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>
