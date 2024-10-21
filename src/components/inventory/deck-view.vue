<template>
<section class="deck">
        <div class="name">
            {{ this.deck.name }}
        </div>
        <div class="card-count">
            {{ deckLength }} Cartas
        </div>
        <div>
            <menuButton/>
        </div>

        <figure class="cards">
            <div class="cards-foreach" v-for="card in this.deck.cards" :key="card.ide">
                <MylCard :card="card" :edid="card.edid"/>
                <!-- <div class="card">{{ card }}</div> -->
            </div>
        </figure>
</section>
</template>

<script>
import MylCard from '../MylCard.vue';
import menuButton from '../menu-button.vue';

export default {
    components: {
        MylCard,
        menuButton
    },
    props: {
        deck: {
            type: Object,
            required: true
        },
        owner: {
            type: String,
            required: false
        }
    },
    computed: {
        deckLength() {
            var length = 0;
            try {
                this.deck.cards.forEach(card => {
                    length += card.count;
                });
            } catch (error) {
                console.error('Error al contar las cartas del mazo:', error);
            }
            return length;
        }
    },
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

.deckExpanded {
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
.card {
    width: 15%;
    height: fit-content;
    
    margin: 0 5px;
}
</style>
