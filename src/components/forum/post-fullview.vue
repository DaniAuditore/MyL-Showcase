<template>
    <section class="post">
        <profilePhoto class="pfp" :user="this.post.author"/>

        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>


    </section>
</template>

<script>
import profilePhoto from '../profile-photo.vue';

export default {
    components: {
        profilePhoto,
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
</style>