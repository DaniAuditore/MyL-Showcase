<template>
    <section class="post">
        <profilePhoto class="pfp" :userId="post.author"/>
        
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>

        <valoration 
            :valoration="parseInt(this.post.valoration)" 
            @update:valoration="update"
        />

        <div class="cards">

        </div>

        <deleteButton class="delete"/>
    </section>
</template>

<script>
import profilePhoto from '../profile-photo.vue';
import valoration from './post-valoration.vue';
import deleteButton from '../delete-button.vue';

export default {
    components: {
        profilePhoto,
        valoration,
        deleteButton,
    },
    props: {
        post: {
            type: Object,
            required: true
        },
    },
}
</script>

<style scoped>
.post {
    width: 90%;
    max-width: 1103px;
    height: 580px;
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
    right: 10px;
    top: 10px;
}
</style>
