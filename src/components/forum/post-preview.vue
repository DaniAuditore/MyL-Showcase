<template>
    <!-- Template post
        "id": "1",
        "title": "Post 1",
        "content": "Content 1",
        "author": "1" 
    -->
<div class="post">
    <profilePhoto class="pfp" :user-id="this.post.author"/>

    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>

    <div class="valoration">

    </div>

    <div class="cards">

    </div>

    <deleteButton class="delete_button"/>
    
    <postPreviewBox/>
</div>
</template>

<script>
import postPreviewBox from './post-preview-box.vue';
import deleteButton from '../delete-button.vue';
import profilePhoto from '../profile-photo.vue';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    components: {
        postPreviewBox,
        deleteButton,
        profilePhoto,
    }
}
</script>

<style scoped>
.post {
    width: 90%;
    max-width: 1103px;

    height: 184px;
    position: relative;
    left: calc(50% - 551px);

    margin-bottom: 10px;
    background: var(--primary-background-color);
    /* overflow: hidden; */
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

.delete_Button {
    position: absolute;
    left: 100px;
    top: 0;

    rotate: -90deg;
}
</style>
