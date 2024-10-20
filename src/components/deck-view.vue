<template>
<!-- <section class="deck"> -->
<section class="deck" @click="toggleView">
        <div class="name">
            Hola Mundo
        </div>
        <div class="card-count">
            {{ cards.length }} Cartas
        </div>
        <div>
            <menuButton/>
        </div>

        <figure class="cards">
            <MylCard v-for="card in cards" :key="card.ide" :card="card" :edid="edid"/>
            <div>{{ card }}</div>
        </figure>
</section>
</template>

<script setup>
import MylCard from './MylCard.vue';
import menuButton from './menu-button.vue';

const cards = [ // Sample array of cards
    {ide: '009'}, {ide: '010'},
    {ide: '011'}, {ide: '012'},
    {ide: '013'}, {ide: '014'},
    {ide: '015'}, {ide: '016'},
    {ide: '017'}, {ide: '018'},
    {ide: '019'}, {ide: '020'},
    {ide: '021'}, {ide: '022'},
    {ide: '023'}, {ide: '024'},
    {ide: '025'}, {ide: '026'},
    {ide: '027'}, {ide: '028'},
    {ide: '029'}, {ide: '030'},
    {ide: '031'}, {ide: '032'},
    {ide: '033'}, {ide: '034'},
    {ide: '035'}, {ide: '036'},
    {ide: '037'}, {ide: '038'},
    {ide: '039'}, {ide: '040'},
    {ide: '041'}, {ide: '042'},
    {ide: '043'}, {ide: '044'},
    {ide: '045'}, {ide: '046'},
    {ide: '047'}, {ide: '048'}
];
const edid = '125'; // Sample edition ID

const toggleView = () => {
    document.querySelector('.deck').classList.toggle('deck-expanded');
}
</script>

<style scoped>
.deck {
    width: 1103px;
    height: 100px;
    position: relative;
    left: calc(50% - 551px);

    margin-bottom: 20px;
    overflow: hidden;
    font-size: 32px;
    
    color: var(--primary-border-color);
    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
    
    cursor: pointer;
    transition: height 0.5s ease-in-out;
}

.deck-expanded {
    height: 435px;
    transition: height 0.4s ease-in-out;
}

.name {
    position: absolute;
    left: 50px;
    top: 33px;
}

.card-count {
    position: absolute;
    right: 90px;
    top: 33px;
    text-align: right;
}

.cards {
    width: 90%;
    height: 320px;
    position: absolute;
    top: 70px;
    padding: 10px 0;

    overflow-y: scroll;
    scrollbar-width: none;

    border-top: 1px solid var(--primary-border-color);
}
.cards div {
    width: 15%;
    height: fit-content;
    
    margin: 0 5px;
}
</style>
