<template>
<div class="collection_card">
    <div class="frame">
        <mylCard :card="card" :edid="edid"/>
    </div>
    <input type="checkbox" class="check" name="" id="">
</div>
</template>

<script>
import mylCard from '../myl-card.vue';

export default {
    components: {
        mylCard
    },
    props: {
        card: {
            type: Object,
            required: true
        },
        edid: {
            type: String,
            required: true
        },
    }
};
</script>

<style scoped>
.collection_card {
    width: 100%;
    height: 100%;

    position: relative;
    
    overflow: visible;
}

.frame {
    width: fit-content;
    height: fit-content;

    padding: 10px;
    overflow: visible;

    background-color: var(--secondary-background-color);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.check {
    width: 30px;
    height: 30px;
    position: absolute;
    right: -40px;
    top: 52px;
}
</style>
