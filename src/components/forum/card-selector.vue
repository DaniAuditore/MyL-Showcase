<template>
<section class="card_selector">
    <header class="searcher">
        <input type="text" placeholder="Buscar" class="searcher_input">
        <filterButton/>
    </header>

    <div class="cards">
        <cardPreview v-for="card in sampleCards" :key="card.ide"
            :card="card" :edid="card.edid"
            @update:selectedCard="upDate"
        />
    </div>
</section>
</template>

<script>
import filterButton from '../filter-button.vue';
import cardPreview from './card-preview.vue';

const sampleCards = [
    {   "ide": "005", "edid": "125", "slug": "Kitsune", "name": "Kitsune", "rarity": "0", "race": "0", "type": "3", "keywords": null, "cost": "2", "damage": "0",
        "ability": "Cuando entre o salga del juego, Baraja una carta oponente de coste 3 o menos. Una vez por turno, tu oponente Descarta una carta al azar. Busca en tu Castillo una carta del mismo tipo, ponla en tu mano y Roba una carta. Los Aliados oponentes pierden 2 de Fuerza.",
        "flavour": null, "ed_edid": "126", "ed_slug": "zodiaco"
    },
    {   "ide": "006", "edid": "125", "slug": "hattori hanzo", "name": "hattori hanzo", "rarity": "2", "race": "4", "type": "3", "keywords": null, "cost": "2", "damage": "4",
        "ability": "Furia. Imbloqueable. Una vez por turno, un Aliado gana 2 de Fuerza y hace daño al Destierro este turno. Cuando fuera a ser afectado, puedes subirlo a tu mano para mostrar cartas del tope de tu Castillo hasta mostrar un Aliado de coste 2. Ponlo en juego y Baraja el resto.",
        "flavour": null, "ed_edid": "126", "ed_slug": "zodiaco"
    }
]

export default {
    components: {
        filterButton,
        cardPreview,
    },
    data() {
        return {
            sampleCards: sampleCards,
        };
    },
    methods: {
        upDate(card) {
            this.$emit('update:selectedCard', card);
        },
    },
};
</script>

<style scoped>
.searcher {
    width: 90%;
    max-width: 1103px;
    height: 85px;
    position: absolute;
    /* top: 535px; */
    left: 50%;
    transform: translateX(-50%);
}

.searcher_input {
    width: calc(100% - 180px);
    height: 81px;
    position: absolute;
    left: 0px;

    margin: 0 5px 0 0;
    padding: 1px 10px;
    font-size: 24px;
    color: var(--primary-border-color);

    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
    background-color: transparent;
}

.cards {
    width: 100%;
    height: 870px;
    position: absolute;
    /* top: 622px; */
    top: 90px;
    left: 0px;

    overflow-y: scroll;
    scrollbar-width: none;
}
</style>
