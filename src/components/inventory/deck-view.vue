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
                <div v-for="index in card.count" :key="index">
                    <MylCard class="card" :card="card" :edid="card.edid" 
                        v-if="index < 4"
                        :class="{ card_small: isRepeated(index, card.count) }" 
                    />
                    <label class="group_card_count" for="card" v-if="index === 1 && card.count > 3">{{ card.count }}</label>
                </div>
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
    methods: {
        async isRepeated(index, count) {
            return await index < count;
        }
    }
}
</script>

<style scoped>
.deck {
    width: 90%;
    max-width: 1103px;
    height: 100px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

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

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(auto, 100px);

    overflow-y: scroll;
    scrollbar-width: none;

    border-top: 1px solid var(--primary-border-color);
}
.cards-foreach {
    position: relative;
    float: left;
    
    width: auto;
    height: auto;
    
    margin: 0 5px;
}
.card_small {
    width: auto;
    height: 30px;
}

.group_card_count {
    position: absolute;
    top: 0;
    left: 50%;

    transform: translateX(-50%);
    
    color: var(--primary-background-color);
    background-image: radial-gradient(circle, rgb(163 163 163 / 80%) 39%, rgb(255 255 255 / 0%) 96%);
}
</style>
