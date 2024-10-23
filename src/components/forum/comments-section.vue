<template>
    <section>
        <commentView
            v-for="comment in comments" :key="comment.id"
            :comment="comment"
        />
    </section>
</template>

<script>
import commentView from './comment-view.vue';

export default {
    props: {
        /** Array of comments */
        comments: {
            type: Object,
            required: true
        }
    },
    components: {
        commentView,
    },
}
</script>

<style scoped>
section {
    width: 100%;
}
</style>
