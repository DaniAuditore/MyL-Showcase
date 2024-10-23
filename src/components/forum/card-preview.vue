<template>
<div class="card">
    <mylCard class="mylImg" :card="card" :edid="edid"/>

    <main>
        <h1 class="name">  {{ card.name }}   </h1>
        <p class="type">   {{ this.type }}   </p>
    </main>

    <div class="specs">
        <p class="damage"> {{ card.damage }} </p>
        <p class="gold">   {{ card.cost }}   </p>
        <p class="race">   {{ this.race }}   </p>
        <p class="rarity"> {{ this.rarity }} </p>
        <p class="edition">{{ this.edition }}</p>
    </div>


    <p class="description">
        {{ card.ability }}
    </p>

    <button class="add-button"
        :class="{ 'alt-add-button' : isThere }"
        @click="select"
    >Añadir
    </button>
</div>
</template>

<script>
import axios from 'axios';

import mylCard from '../myl-card.vue';

export default {
    components: {
        mylCard,
    },
    props: {
        /** Card object needed for mylCard.vue */
        card: { Object, required: true },
        /** Card edition id needed for mylCard.vue */
        edid: { String, required: true },
    },
    data() {
        return {
            /** Marks if the card is already on the post */
            isThere: false,

            type: '',
            race: '',
            rarity: '',
            edition: '',
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        select() {
            this.isThere = !this.isThere;
            this.$emit('update:selectedCard', this.card);
        },
        async getData() {
            try {
                const response = await axios.get("http://localhost:3000/filtersData");
                this.getType(response);
                this.getRace(response);
                this.getRarity(response);
                this.getEdition(response);
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        },
        getType(response) {
            try {
            this.type = response.data.types[this.card.type].name;
            } catch (error) {
                console.error('Error fetching card type:', error);
            }
        },
        getRace(response) {
            try {
                this.race = response.data.races[this.card.race].name;
            } catch (error) {
                console.error('Error fetching card race:', error);
            }
        },
        getRarity(response) {
            try {
                this.rarity = response.data.rarities[this.card.rarity].name;
            } catch (error) {
                console.error('Error fetching card rarity:', error);
            }
        },
        getEdition(response) {
            try {
                this.edition = response.data.editions[this.edid].name;
            } catch (error) {
                console.error('Error fetching card edition:', error);
            }
        }
    },
};
</script>

<style scoped>
.card {
    width: 900%;
    max-width: 1103px;
    height: 437px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    background-color: var(--primary-background-color);
    border-bottom: 1px solid var(--primary-border-color);
}

.mylImg {
    width: 262px;
    height: fit-content;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
}

main {
    width: fit-content;
    height: 45px;
    position: absolute;
    left: 312px;
    top: 40px;
    display: flex;
    flex-direction: row;
}

.name {
    /* position: absolute; */
    /* left: 312px; */
    /* top: 15px; */

    margin: 0 64px 0 0;

    font-size: 40px;
    color: #fff;
}

.type {
    margin: 0;
    
    font-size: 40px;
    color: var(--primary-border-color);
}

.description {
    width: 791px;
    height: 130px;
    position: absolute;
    left: 312px;
    top: 204px;

    text-align: left;
    font-size: 20px;
    color: #fff;
}   

.specs {
    width: 791px;
    height: 47px;
    position: absolute;
    left: 312px;
    top: 140px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.damage {
    margin: 0 30px 0 0;

    font-size: 40px;
    color: var(--secondary-text-color);
}

.gold {
    margin: 0 30px;

    font-size: 40px;
    color: #ffd700;
}

.race {
    margin: 0 30px;

    font-size: 40px;
    color: var(--primary-border-color);
}

.rarity {
    right: 0px;
    margin: 0 0 0 30px;
    
    font-size: 40px;
    color: var(--primary-border-color);
}

.add-button {
    width: 121px;
    height: 70px;
    position: absolute;
    left: 313px;
    top: 336px;

    font-size: 20px;
    cursor: pointer;

    color: var(--primary-text-color);
    background-color: var(--primary-background-color);
    border: 3px solid var(--primary-border-color);
    border-radius: 30px;
}
.add-button:hover {
    filter: brightness(125%);
}
.add-button:active {
    color: var(--primary-border-color);
}

.alt-add-button {
    width: 121px;
    height: 70px;
    position: absolute;
    left: 313px;
    top: 336px;

    color: #0c0;
    background-color: var(--primary-background-color);
    border: 3px solid var(--primary-border-color);
    border-radius: 30px;
}
.alt-add-button:hover {
    filter: brightness(125%);
}
.alt-add-button:active {
    color: var(--primary-border-color);
}
</style>
