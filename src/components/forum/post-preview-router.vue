<template>
    <router-link :to="'/forum/post/'+ this.postId" 
        class="post_router"
    ></router-link>
</template>

<script>
export default {
    props: {
        postId: {
            type: String,
            required: true
        },
    },
}
</script>

<style scoped>
.post_router {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;

    cursor: default;

    border-radius: 30px;
}
</style>
