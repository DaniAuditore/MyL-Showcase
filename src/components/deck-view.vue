<template>
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
    {ide: '013'}
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
    transition: height 0.5s ease-in-out;
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
    height: 100%;
    position: absolute;
    padding: 10px;
    top: 70px;

    border-top: 1px solid var(--primary-border-color);
    
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
}

</style>
