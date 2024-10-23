<template>
<section class="post-cards">
    <mylCard class="mylImg"
        v-for="card in cards" :key="card.id"
        :card="card"
        :edid="card.edid"
    />
</section>
</template>

<script>
import mylCard from '../myl-card.vue';

export default {
    components: {
        mylCard,
    },
    props: {
        cards: {
        type: Array,
        required: true
        }
    }
};
</script>

<style scoped>
.post-cards {
    position: absolute;
    right: 20px;
    bottom: 20px;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    gap: 10px;
}

.mylImg {
    width: 110px;
}
</style>
